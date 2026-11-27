const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm');
const c={window:{}};
for(const f of ['data.js','hole-data.js','proof-data.js'])vm.runInNewContext(fs.readFileSync(f,'utf8'),c);
const w=c.window, rooms=new Set(w.CT_HOLE_DATA.tree.map(t=>t.id));

test('every discoverable proof sits in a room and has an idea and full steps',()=>{
  for(const [id,p]of Object.entries(w.CT_PROOFS)){
    assert.ok(rooms.has(id),id);
    assert.ok(p.idea.length>40,id+' idea');
    assert.ok(p.steps.length>=2,id+' steps');
    for(const s of p.steps)assert.ok(s.claim&&s.detail,id);
  }
});

test('links inside proofs lead to existing rooms',()=>{
  for(const [id,p]of Object.entries(w.CT_PROOFS))
    for(const html of [p.idea,...p.steps.flatMap(s=>[s.claim,s.detail])])
      for(const [,to]of html.matchAll(/data-link="([^"]+)"/g))assert.ok(rooms.has(to),id+' → '+to);
});

test('every old proof sketch now has a discoverable proof',()=>{
  for(const n of w.RFA_DATA.nodes.filter(n=>n.proofSketch))assert.ok(w.CT_PROOFS[n.id],n.id);
});
