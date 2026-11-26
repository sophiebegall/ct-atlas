const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm');
const c={window:{}};
for(const f of ['data.js','study-data.js','hole-data.js','canvas-data.js','canvas-links.js'])vm.runInNewContext(fs.readFileSync(f,'utf8'),c);
const w=c.window;
test('every canvas card has working flashcard and concept targets; homework links resolve to exact problems',()=>{
  for(const [board,b]of Object.entries(w.CT_CANVAS))for(const n of b.nodes){
    const links=w.CT_CANVAS_LINKS[board][n.id];
    assert.ok(links.cards.length && links.concepts.length,n.id);
    for(const id of links.cards)assert.ok(w.CT_EXAM_CARDS.some(c=>c.id===id),id);
    for(const id of links.concepts)assert.ok(w.CT_HOLE_DATA.tree.some(c=>c.id===id),id);
    for(const [sheet,num]of links.problems)assert.ok(w.CT_HOMEWORKS.find(s=>s.id===sheet)?.problems.some(p=>p.num===num),sheet+'/'+num);
  }
});
