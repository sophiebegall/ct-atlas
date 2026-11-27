(() => {
  'use strict';
  const root = document.querySelector('#problem-canvas-view');
  if (!root || !window.CT_CANVAS) return;
  const geometry = window.CTCanvasGeometry;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const math = el => window.renderMathInElement?.(el, {delimiters:[{left:'$',right:'$',display:false}],throwOnError:false,trust:false});
  const storageKey = 'ct-atlas-problem-canvas-v1';
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(storageKey)) || {}; } catch {}
  if (typeof saved !== 'object' || Array.isArray(saved)) saved = {};
  let boardKey = 'pignotti', points = {}, selected = null, view = {x:0,y:0,scale:1}, gesture = null;
  let fitted = true;
  root.innerHTML = `<header class="pc-heading"><div><span class="eyebrow">PROBLEM CANVAS</span><h1>How do I solve this?</h1><p>Follow a branch. Change an assumption. Find the next step.</p></div><div class="pc-heading-actions"><button type="button" class="secondary" data-action="arena">Practice in Method Arena <span aria-hidden="true">↗</span></button><div class="pc-boards" role="group" aria-label="Choose coursework"><button data-board="pignotti" aria-pressed="true">Pignotti</button><button data-board="palladino" aria-pressed="false">Palladino</button></div></div></header>
    <div class="pc-toolbar"><div><strong id="pc-title"></strong><p id="pc-subtitle"></p></div><div class="pc-tools"><button data-action="out" aria-label="Zoom canvas out">−</button><output id="pc-zoom" aria-label="Canvas zoom"></output><button data-action="in" aria-label="Zoom canvas in">+</button><button data-action="fit">Fit</button><button data-action="reset">Reset layout</button></div></div>
    <div class="pc-body"><div class="pc-stage" tabindex="0" aria-label="Problem canvas. Drag background to pan; scroll to zoom. Tab to a card and press Enter for details. Alt and arrow keys move cards."><div class="pc-world"><svg class="pc-edges" aria-hidden="true"><defs><marker id="pc-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10z" fill="#809b91"/></marker></defs><g></g></svg><div class="pc-cards"></div></div></div><aside class="pc-details" aria-label="Selected problem details" hidden></aside></div>
    <footer class="pc-footer"><span>Drag cards to arrange · Drag background to pan · Scroll to zoom · Alt + arrows to move a focused card</span><span id="pc-save" role="status">Layouts stay in this browser.</span></footer>`;
  const stage = root.querySelector('.pc-stage'), world = root.querySelector('.pc-world'), cards = root.querySelector('.pc-cards'), edges = root.querySelector('.pc-edges g'), details = root.querySelector('.pc-details');
  const board = () => window.CT_CANVAS[boardKey];
  const persist = () => {
    saved[boardKey] = points;
    try { localStorage.setItem(storageKey, JSON.stringify(saved)); root.querySelector('#pc-save').textContent='Layout saved in this browser.'; }
    catch { root.querySelector('#pc-save').textContent='Layout works for this visit; browser storage is unavailable.'; }
  };
  function transform() {
    world.style.transform=`translate(${view.x}px,${view.y}px) scale(${view.scale})`;
    root.querySelector('#pc-zoom').textContent=`${Math.round(view.scale*100)}%`;
  }
  function fit() {
    fitted = true;
    if (!stage.clientWidth || !stage.clientHeight) return;
    view=geometry.fit(Object.values(points),stage.clientWidth,stage.clientHeight); transform();
  }
  function drawEdges() {
    const positions = Object.values(points);
    edges.innerHTML=board().edges.map(([a,b,label])=>{
      const from = points[a], to = points[b];
      const route = geometry.edgeRoute(from, to, positions.filter(p => p !== from && p !== to));
      return `<g class="${selected&&(a===selected||b===selected)?'pc-connected':''}"><path d="${route.path}" marker-end="url(#pc-arrow)"/><text x="${route.labelX}" y="${route.labelY}" text-anchor="${route.anchor}">${esc(label)}</text></g>`;
    }).join('');
  }
  function position(id) {
    const card=cards.querySelector(`[data-node="${id}"]`), p=points[id];
    card.style.left=p.x+'px'; card.style.top=p.y+'px';
  }
  function studyLinks(id) {
    const links = window.CT_CANVAS_LINKS?.[boardKey]?.[id];
    if (!links) return '';
    const button = (kind, target, label, num='') => `<button data-study-kind="${kind}" data-study-id="${esc(target)}" data-study-num="${esc(num)}">${esc(label)} <span aria-hidden="true">↗</span></button>`;
    const cards = links.cards.map(id => { const c=window.CT_EXAM_CARDS.find(c=>c.id===id); return c ? button('exam',id,`${id} · ${c.title}`) : ''; }).join('');
    const concepts = links.concepts.filter(id=>window.CT_HOLE?.has(id)).map(id=>button('hole',id,window.CT_HOLE.title(id))).join('');
    const problems = links.problems.map(([id,num])=>{const s=window.CT_HOMEWORKS.find(s=>s.id===id), p=s?.problems.find(p=>p.num===num);return p?button('homework',id,`${s.profLabel} · ${s.date} · Problem ${num}: ${p.title}`,num):'';}).join('');
    return `<section class="pc-study-links" aria-label="Related study material"><h3>Flashcards</h3>${cards}<h3>Explore in Rabbit hole</h3>${concepts}${problems?`<h3>Practice problems</h3>${problems}`:''}</section>`;
  }
  function select(id) {
    selected=id;
    const n=board().nodes.find(n=>n.id===id);
    const stageWidth = stage.clientWidth;
    details.hidden=false;
    details.innerHTML=`<button class="pc-close" aria-label="Close problem details">×</button><span class="eyebrow">${esc(boardKey)} · METHOD & ASSUMPTIONS</span><h2>${esc(n.title)}</h2><div class="pc-detail-formula">$${esc(n.formula)}$</div><p>${esc(n.detail)}</p><h3>Follow a connection</h3><div class="pc-neighbours">${board().edges.filter(([a,b])=>a===id||b===id).map(([a,b,label])=>{const other=board().nodes.find(n=>n.id===(a===id?b:a));return `<button data-follow="${other.id}"><small>${a===id?'Next':'From'} · ${esc(label)}</small>${esc(other.title)} <span>→</span></button>`;}).join('')}</div>${studyLinks(id)}<p class="pc-source"><strong>Study source</strong><br>${esc(n.source)}<br><small>Coursework synthesis; not an additional official exam question.</small></p>`;
    math(details);
    if (stage.clientWidth !== stageWidth) {
      if (fitted) fit();
      else {
        // Keep the selected card in view if the details panel takes its space.
        const center = (points[id].x + 130) * view.scale + view.x;
        const margin = Math.min(130 * view.scale, stage.clientWidth / 2);
        const visibleCenter = Math.max(margin, Math.min(stage.clientWidth - margin, center));
        view.x += visibleCenter - center;
        transform();
      }
    }
    if (window.matchMedia("(max-width: 900px)").matches) requestAnimationFrame(() => details.scrollIntoView({block:"nearest", behavior:"smooth"}));
    cards.querySelectorAll('button').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.node===id)));
    drawEdges();
  }
  function load(key) {
    boardKey=key; selected=null; details.hidden=true;
    points=Object.fromEntries(board().nodes.map(n=>{
      const p=saved[key]?.[n.id];
      return [n.id,p&&Number.isFinite(p.x)&&Number.isFinite(p.y)&&Math.abs(p.x)<10000&&Math.abs(p.y)<10000?{x:p.x,y:p.y}:{x:n.x,y:n.y}];
    }));
    root.querySelector('#pc-title').textContent=board().title;
    root.querySelector('#pc-subtitle').textContent=board().subtitle;
    root.querySelectorAll('[data-board]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.board===key)));
    cards.innerHTML=board().nodes.map((n,i)=>`<button class="pc-card" data-node="${n.id}" aria-pressed="false"><span class="pc-card-no">${String(i+1).padStart(2,'0')} / ${esc(boardKey)}</span><strong>${esc(n.title)}</strong><span class="pc-formula">$${esc(n.formula)}$</span><span class="pc-summary">${esc(n.summary)}</span></button>`).join('');
    board().nodes.forEach(n=>position(n.id)); math(cards); drawEdges(); requestAnimationFrame(fit);
  }
  root.addEventListener('click',e=>{
    const b=e.target.closest('button'); if(!b)return;
    if(b.dataset.studyKind){window.CT_VIEWS?.openStudy(b.dataset.studyKind,b.dataset.studyId,b.dataset.studyNum);return;}
    if(b.dataset.board)load(b.dataset.board);
    if(b.dataset.node)select(b.dataset.node);
    if(b.dataset.follow){fitted=false;select(b.dataset.follow);const p=points[selected];view.x=stage.clientWidth/2-(p.x+130)*view.scale;view.y=stage.clientHeight/2-(p.y+80)*view.scale;transform();cards.querySelector(`[data-node="${selected}"]`).focus({preventScroll:true});}
    if(b.classList.contains('pc-close')){const old=selected;selected=null;details.hidden=true;cards.querySelectorAll('button').forEach(c=>c.setAttribute('aria-pressed','false'));drawEdges();cards.querySelector(`[data-node="${old}"]`)?.focus({preventScroll:true});}
    if (b.dataset.action === 'arena') {
      window.CT_VIEWS?.setTopView('arena');
      window.CT_BATTLE_ARENA?.openBoard(boardKey);
    }
    if(b.dataset.action==='fit')fit();
    if(b.dataset.action==='reset'){delete saved[boardKey];load(boardKey);persist();}
    if(['in','out'].includes(b.dataset.action)){fitted=false;view=geometry.zoomAt(view,stage.clientWidth/2,stage.clientHeight/2,b.dataset.action==='in'?1.2:1/1.2);transform();}
  });
  stage.addEventListener('wheel',e=>{
    e.preventDefault(); const r=stage.getBoundingClientRect();
    fitted=false;view=geometry.zoomAt(view,e.clientX-r.left,e.clientY-r.top,Math.exp(-e.deltaY*.002));transform();
  },{passive:false});
  stage.addEventListener('pointerdown',e=>{
    if(e.button!==0||gesture)return;
    const card=e.target.closest('[data-node]');
    gesture={pointer:e.pointerId,id:card?.dataset.node,x:e.clientX,y:e.clientY,start:card?{...points[card.dataset.node]}:{x:view.x,y:view.y},moved:false};
    stage.setPointerCapture(e.pointerId);
  });
  stage.addEventListener('pointermove',e=>{
    if(!gesture||gesture.pointer!==e.pointerId)return;
    const dx=e.clientX-gesture.x,dy=e.clientY-gesture.y;
    if(Math.hypot(dx,dy)<4&&!gesture.moved)return;
    gesture.moved=true;
    fitted=false;
    if(gesture.id){points[gesture.id]={x:Math.max(-9000,Math.min(9000,gesture.start.x+dx/view.scale)),y:Math.max(-9000,Math.min(9000,gesture.start.y+dy/view.scale))};position(gesture.id);drawEdges();}
    else {view.x=gesture.start.x+dx;view.y=gesture.start.y+dy;transform();}
  });
  function end(e) {
    if(!gesture||gesture.pointer!==e.pointerId)return;
    const g=gesture;gesture=null;
    if(g.id&&g.moved)persist();
    // Pointer capture retargets clicks to the stage; activate a stationary card here.
    if(g.id&&!g.moved&&e.type==='pointerup')select(g.id);
  }
  stage.addEventListener('pointerup',end);stage.addEventListener('pointercancel',end);stage.addEventListener('lostpointercapture',end);
  stage.addEventListener('focusin',e=>{
    const id=e.target.dataset.node;if(!id)return;
    const p=points[id],x=p.x*view.scale+view.x,y=p.y*view.scale+view.y;
    if(x<0||y<0||x+260*view.scale>stage.clientWidth||y+160*view.scale>stage.clientHeight){fitted=false;view.x=stage.clientWidth/2-(p.x+130)*view.scale;view.y=stage.clientHeight/2-(p.y+80)*view.scale;transform();}
  });
  root.addEventListener('keydown',e=>{
    if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown',' ','/'].includes(e.key))e.stopPropagation();
    const id=e.target.dataset.node;
    if(e.altKey&&id&&e.key.startsWith('Arrow')){e.preventDefault();fitted=false;const step=e.shiftKey?50:20;points[id].x+=e.key==='ArrowRight'?step:e.key==='ArrowLeft'?-step:0;points[id].y+=e.key==='ArrowDown'?step:e.key==='ArrowUp'?-step:0;position(id);drawEdges();persist();}
    else if(e.target===stage&&e.key.startsWith('Arrow')){e.preventDefault();fitted=false;view.x+=e.key==='ArrowRight'?-40:e.key==='ArrowLeft'?40:0;view.y+=e.key==='ArrowDown'?-40:e.key==='ArrowUp'?40:0;transform();}
  });
  new ResizeObserver(()=>{if(!root.hidden && fitted)fit();}).observe(stage);
  window.CT_PROBLEM_CANVAS = {
    render: () => requestAnimationFrame(fit),
    restore: () => requestAnimationFrame(transform),
    openRoute(key, id) {
      if (boardKey !== key) load(key);
      fitted = true;
      select(id);
      fit();
    }
  };
  load(boardKey);
})();
