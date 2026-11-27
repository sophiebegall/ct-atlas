window.CTCanvasGeometry = {
  zoomAt(view, x, y, factor) {
    const scale = Math.min(1.8, Math.max(.12, view.scale * factor));
    return { scale, x: x - (x-view.x)*scale/view.scale, y: y - (y-view.y)*scale/view.scale };
  },
  fit(points, width, height) {
    const left = Math.min(...points.map(p=>p.x)), top = Math.min(...points.map(p=>p.y));
    const w = Math.max(...points.map(p=>p.x+260))-left;
    const h = Math.max(...points.map(p=>p.y+160))-top;
    const scale = Math.min(1, (width-48)/w, (height-48)/h);
    return {scale, x:(width-w*scale)/2-left*scale, y:(height-h*scale)/2-top*scale};
  },
  edgeRoute(from, to, obstacles) {
    const vertical = Math.abs(to.x - from.x) < 150 && Math.abs(to.y - from.y) >= 160;
    const primary = vertical ? 'y' : 'x';
    const secondary = vertical ? 'x' : 'y';
    const length = vertical ? 160 : 260;
    const breadth = vertical ? 260 : 160;
    const coordinate = (a, b) => vertical ? `${b},${a}` : `${a},${b}`;
    const direction = to[primary] >= from[primary] ? 1 : -1;
    const start = from[primary] + (direction > 0 ? length : 0);
    const end = to[primary] + (direction > 0 ? 0 : length);
    const fromCenter = from[secondary] + breadth / 2;
    const toCenter = to[secondary] + breadth / 2;
    const middle = (start + end) / 2;
    const intersects = (p1, s1, p2, s2, card) =>
      Math.max(p1, p2) > card[primary] && Math.min(p1, p2) < card[primary] + length &&
      Math.max(s1, s2) > card[secondary] && Math.min(s1, s2) < card[secondary] + breadth;
    const blockers = obstacles.filter(card => intersects(start, fromCenter, end, toCenter, card));

    if (blockers.length && direction * (end - start) > 0) {
      const bounds = [from, to, ...blockers].map(card => card[secondary]);
      const lanes = [Math.max(...bounds) + breadth + 22, Math.min(...bounds) - 22];
      const fromMiddle = from[primary] + length / 2;
      const toMiddle = to[primary] + length / 2;
      const paths = lanes.map((lane, i) => {
        const fromSide = from[secondary] + (i === 0 ? breadth : 0);
        const toSide = to[secondary] + (i === 0 ? breadth : 0);
        const crossings = obstacles.filter(card =>
          intersects(fromMiddle, fromSide, fromMiddle, lane, card) ||
          intersects(fromMiddle, lane, toMiddle, lane, card) ||
          intersects(toMiddle, lane, toMiddle, toSide, card)).length;
        return { lane, fromSide, toSide, crossings, distance: Math.abs(lane - fromSide) + Math.abs(lane - toSide) };
      });
      paths.sort((a, b) => a.crossings - b.crossings || a.distance - b.distance);
      const { lane, fromSide, toSide } = paths[0];
      return {
        path: `M${coordinate(fromMiddle, fromSide)} L${coordinate(fromMiddle, lane)} L${coordinate(toMiddle, lane)} L${coordinate(toMiddle, toSide)}`,
        labelX: vertical ? lane + (lane > fromSide ? 6 : -6) : (fromMiddle + toMiddle) / 2,
        labelY: vertical ? (fromMiddle + toMiddle) / 2 - 9 : lane - 9,
        anchor: vertical ? (lane > fromSide ? 'start' : 'end') : 'middle'
      };
    }

    const bend = direction * Math.min(65, Math.max(0, direction * (end - start) / 2));
    const center = (fromCenter + toCenter) / 2;
    return {
      path: `M${coordinate(start, fromCenter)} C${coordinate(start + bend, fromCenter)} ${coordinate(end - bend, toCenter)} ${coordinate(end, toCenter)}`,
      labelX: vertical ? center : middle,
      labelY: (vertical ? middle : center) - 9,
      anchor: 'middle'
    };
  }
};
