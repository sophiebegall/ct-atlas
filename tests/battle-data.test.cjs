const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const context = { window: {} };
for (const file of ['canvas-data.js', 'battle-data.js']) {
  vm.runInNewContext(fs.readFileSync(file, 'utf8'), context);
}
const { CT_BATTLE: encounters, CT_CANVAS: canvas } = context.window;
const text = value => assert.ok(typeof value === 'string' && value.trim());

test('all 13 encounters have valid routes and three or four solution steps', () => {
  assert.equal(encounters.length, 13);
  assert.equal(new Set(encounters.map(e => `${e.board}/${e.node}`)).size, 13);
  for (const e of encounters) {
    text(e.name);
    assert.ok(canvas[e.board]?.nodes.some(n => n.id === e.node), e.name);
    assert.ok(Array.isArray(e.problem) && e.problem.length);
    e.problem.forEach(text);
    text(e.solution);
    assert.ok(Array.isArray(e.steps) && [3, 4].includes(e.steps.length), e.name);
  }
});

test('every turn has a valid schema and all three turn types are represented', () => {
  const types = new Set();
  for (const e of encounters) {
    assert.ok(Array.isArray(e.steps), `${e.name} needs steps`);
    for (const s of e.steps) {
      types.add(s.type);
      text(s.prompt); text(s.hint); text(s.logEntry);
      if (s.counterattack !== undefined) text(s.counterattack);
      if (s.type === 'choice') {
        text(s.move);
        assert.equal(s.decoys.length, 3);
        s.decoys.forEach(text);
        assert.equal(new Set([s.move, ...s.decoys]).size, 4);
      } else if (s.type === 'order') {
        assert.ok([3, 4].includes(s.items.length));
        s.items.forEach(text);
        assert.equal(new Set(s.items).size, s.items.length);
      } else if (s.type === 'flaw') {
        assert.ok([3, 4].includes(s.lines.length));
        s.lines.forEach(text);
        assert.ok(Number.isInteger(s.flawIndex) && s.flawIndex >= 0 && s.flawIndex < s.lines.length);
        text(s.whyFlawed);
      } else assert.fail(`Unknown turn type: ${s.type}`);
    }
  }
  assert.deepEqual([...types].sort(), ['choice', 'flaw', 'order']);
});
