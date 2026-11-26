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
