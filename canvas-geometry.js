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
  }
};
