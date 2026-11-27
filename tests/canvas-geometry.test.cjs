const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const context = { window: {} };
if (fs.existsSync('canvas-geometry.js')) vm.runInNewContext(fs.readFileSync('canvas-geometry.js', 'utf8'), context);
test('zoom keeps the world point under the pointer fixed and clamps scale', () => {
  assert.ok(context.window.CTCanvasGeometry, 'canvas geometry is available');
  const { zoomAt } = context.window.CTCanvasGeometry;
  const v = { x: 30, y: 20, scale: 1 };
  const z = zoomAt(v, 230, 120, 2);
  assert.equal((230-z.x)/z.scale, 200);
  assert.equal((120-z.y)/z.scale, 100);
  assert.equal(zoomAt(v, 0, 0, 100).scale, 1.8);
});
test('fit contains moved cards inside a padded viewport', () => {
  assert.ok(context.window.CTCanvasGeometry);
  const { fit } = context.window.CTCanvasGeometry;
  const cards = [{x:-300,y:-200},{x:1200,y:800}];
  const v = fit(cards, 900, 600);
  for(const p of cards) {
    assert.ok(p.x*v.scale+v.x >= 23);
    assert.ok((p.x+260)*v.scale+v.x <= 877);
    assert.ok(p.y*v.scale+v.y >= 23);
    assert.ok((p.y+160)*v.scale+v.y <= 577);
  }
});

test('upward and leftward arrows attach to the facing sides', () => {
  const { edgeRoute } = context.window.CTCanvasGeometry;
  assert.match(edgeRoute({ x: 20, y: 400 }, { x: 20, y: 20 }, []).path, /^M150,400 C.* 150,180$/);
  assert.match(edgeRoute({ x: 400, y: 20 }, { x: 20, y: 20 }, []).path, /^M400,100 C.* 280,100$/);
});

test('the Palladino trajectory arrow goes around the equilibrium card', () => {
  vm.runInNewContext(fs.readFileSync('canvas-data.js', 'utf8'), context);
  const { edgeRoute } = context.window.CTCanvasGeometry;
  const nodes = context.window.CT_CANVAS.palladino.nodes;
  const from = nodes.find(node => node.id === 'trajectory');
  const to = nodes.find(node => node.id === 'rank');
  const equilibrium = nodes.find(node => node.id === 'equilibrium');
  const route = edgeRoute(from, to, nodes.filter(node => node !== from && node !== to));
  assert.match(route.path, /^M640,850 L662,850 L662,360 L640,360$/);
  assert.ok(route.labelX > equilibrium.x + 260);
});
