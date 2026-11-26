// Rabbit hole view: one "room" per concept, doors to dive deeper, tunnels sideways,
// a burrow map of what you've discovered, and links to the 18 exam flashcards.
(() => {
  'use strict';
  const atlas = window.RFA_DATA, hd = window.CT_HOLE_DATA;
  const section = document.querySelector('#rabbit-hole-view');
  if (!atlas || !hd || !section) return;
  const $ = s => section.querySelector(s), $$ = s => [...section.querySelectorAll(s)];
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const math = el => window.renderMathInElement?.(el, { delimiters: [{ left: '\\[', right: '\\]', display: true }, { left: '\\(', right: '\\)', display: false }, { left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }], throwOnError: false, strict: 'ignore', trust: false });

  // ---------- Build the tree ----------
  const cards = new Map(atlas.nodes.map(n => [n.id, n]));
  const H = new Map();
  hd.tree.forEach(t => {
    const base = cards.get(t.id) || hd.extra[t.id];
    if (!base) { console.warn('Rabbit hole: unknown node', t.id); return; }
    H.set(t.id, { ...base, id: t.id, parent: t.parent, hook: t.hook, children: [] });
  });
  H.forEach(n => { if (n.parent && H.has(n.parent)) H.get(n.parent).children.push(n.id); });
  const depthOf = id => { let d = 0, n = H.get(id); while (n?.parent) { d++; n = H.get(n.parent); } return d; };
  const pathTo = id => { const p = []; let n = H.get(id); while (n) { p.unshift(n.id); n = H.get(n.parent); } return p; };
  const subtree = id => [id, ...H.get(id).children.flatMap(subtree)];
  const MAXDEPTH = Math.max(...[...H.keys()].map(depthOf));

  // Flashcards that test a node (question O<n> in data.js is card G<n>).
  const cardIdOf = q => q.replace(/^O/, 'G');
  const tests = new Map();
  atlas.oralExam.questions.forEach(q => q.nodeIds.forEach(id => {
    if (!tests.has(id)) tests.set(id, []);
    tests.get(id).push({ id: cardIdOf(q.id), proof: q.kind === 'long-form', title: q.title });
  }));

  // Tunnels: graph edges to nodes that are not parent/child.
  const tunnels = id => {
    const n = H.get(id), seen = new Set([id, n.parent, ...n.children]);
    const out = [];
    atlas.edges.forEach(e => {
      const other = e.from === id ? e.to : e.to === id ? e.from : null;
      if (!other || seen.has(other) || !H.has(other)) return;
      seen.add(other); out.push({ id: other, reason: e.reason });
    });
    return out;
  };

  // ---------- In-text links ----------
  const termMap = new Map(Object.entries(hd.terms || {}).filter(([, id]) => H.has(id)).map(([t, id]) => [t.toLowerCase(), id]));
  const termRe = termMap.size ? new RegExp('(?<![\\p{L}\\p{N}-])(' + [...termMap.keys()].sort((a, b) => b.length - a.length).map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')(?![\\p{L}\\p{N}-])', 'giu') : null;
  const SKIP = '.katex,a,button,summary,h1,h2,h3,code,.rh-hook,.proof-note';
  // Turn the first mention of each known term inside `root` into a link. `skip` = ids not to link (e.g. the page itself).
  function linkify(root, skip = []) {
    if (!root || !termRe) return;
    const used = new Set(skip);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: t => t.parentElement.closest(SKIP) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
    const texts = []; while (walker.nextNode()) texts.push(walker.currentNode);
    texts.forEach(t => {
      const s = t.nodeValue; termRe.lastIndex = 0;
      let m, last = 0, frag = null;
      while ((m = termRe.exec(s))) {
        const id = termMap.get(m[1].toLowerCase());
        if (used.has(id)) continue;
        used.add(id);
        frag ||= document.createDocumentFragment();
        frag.append(s.slice(last, m.index));
        const a = document.createElement('a');
        a.href = '#'; a.className = 'rh-link' + (found.has(id) ? '' : ' is-new'); a.dataset.link = id;
        a.title = H.get(id).title + ' — ' + H.get(id).hook;
        a.textContent = m[1];
        frag.append(a); last = m.index + m[1].length;
      }
      if (frag) { frag.append(s.slice(last)); t.replaceWith(frag); }
    });
  }
  const dirTo = id => subtree(at).includes(id) ? 'down' : pathTo(at).includes(id) ? 'up' : 'side';
  section.addEventListener('click', e => {
    const a = e.target.closest('a.rh-link'); if (!a) return;
    e.preventDefault(); go(a.dataset.link, dirTo(a.dataset.link));
  });

  // ---------- State ----------
  const STORE = 'ct-hole-v1';
  let st = { found: ['root'], at: 'root' };
  try { const s = JSON.parse(localStorage.getItem(STORE) || 'null'); if (s?.found) st = { found: s.found.filter(id => H.has(id)), at: H.has(s.at) ? s.at : 'root' }; } catch {}
  const found = new Set(st.found.length ? st.found : ['root']);
  let at = st.at, lastDir = 'none', mapOpen = new Set(pathTo(at));
  const save = () => { try { localStorage.setItem(STORE, JSON.stringify({ found: [...found], at })); } catch {} };
  const foundIn = id => subtree(id).filter(x => found.has(x)).length;

  // ---------- Render ----------
  const typeLabel = n => n.type === 'topic' ? (n.children.length ? 'Topic' : 'Overview') : n.type[0].toUpperCase() + n.type.slice(1);
  function door(cid, i) {
    const c = H.get(cid), total = subtree(cid).length, f = foundIn(cid), isNew = !found.has(cid);
    const done = f === total;
    return `<button class="rh-door ${isNew ? 'is-new' : ''} ${done ? 'is-done' : ''}" data-go="${esc(cid)}" data-dir="down">
      <span class="rh-door-top"><span class="rh-key">${i < 9 ? i + 1 : ''}</span>${isNew ? '<span class="rh-new">unexplored</span>' : done ? '<span class="rh-doneflag">✓ fully explored</span>' : `<span class="rh-count">${f}/${total} found</span>`}${tests.has(cid) ? '<span class="rh-cardmark" title="A flashcard tests this">🃏</span>' : ''}</span>
      <span class="rh-door-hook">${esc(c.hook)}</span>
      <span class="rh-door-title">${esc(c.title)}${total > 1 ? ` <small>· ${total - 1} deeper</small>` : ''}</span>
    </button>`;
  }
  function part(label, html, open = false) {
    if (!html) return '';
    return `<details class="rh-part" ${open ? 'open' : ''}><summary>${label}</summary><div class="rh-part-body">${html}</div></details>`;
  }
  function mapTree(id) {
    const n = H.get(id);
    if (!found.has(id)) return `<li class="rh-map-unknown" title="Not discovered yet">· · ·</li>`;
    const kids = n.children, open = mapOpen.has(id);
    const f = foundIn(id), total = subtree(id).length;
    return `<li class="${id === at ? 'here' : ''}"><div class="rh-map-row">${kids.length ? `<button class="rh-map-tog" data-tog="${esc(id)}" aria-label="${open ? 'Collapse' : 'Expand'} ${esc(n.title)}" aria-expanded="${open}">${open ? '▾' : '▸'}</button>` : '<span class="rh-map-leaf">·</span>'}<button class="rh-map-name" data-go="${esc(id)}">${esc(n.title)}</button>${kids.length ? `<small>${f}/${total}</small>` : ''}</div>${kids.length && open ? `<ul>${kids.map(mapTree).join('')}</ul>` : ''}</li>`;
  }
  function render() {
    const n = H.get(at), d = depthOf(at), path = pathTo(at);
    const parent = n.parent ? H.get(n.parent) : null;
    const siblings = parent ? parent.children.filter(x => x !== at) : [];
    const tn = tunnels(at), fc = tests.get(at) || [];
    const total = H.size, f = found.size;
    const bottom = !n.children.length;
    const fresh = [...H.keys()].filter(id => !found.has(id) && found.has(H.get(id).parent));
    section.style.setProperty('--d', d / Math.max(1, MAXDEPTH));

    section.innerHTML = `
    <div class="rh-shell">
      <div class="rh-main">
        <nav class="rh-trail" aria-label="Your path down">${path.map((id, i) => i === path.length - 1 ? `<span aria-current="page">${esc(H.get(id).title)}</span>` : `<button data-go="${esc(id)}" data-dir="up">${esc(H.get(id).title)}</button><span class="rh-sep">›</span>`).join('')}</nav>
        <div class="rh-depth" aria-label="Depth ${d} of ${MAXDEPTH}"><span>DEPTH ${d}</span><span class="rh-depth-bar">${Array.from({ length: MAXDEPTH + 1 }, (_, i) => `<i class="${i <= d ? 'on' : ''}"></i>`).join('')}</span></div>
        <article class="rh-room rh-anim-${lastDir}">
          <div class="rh-meta"><span class="type-badge ${esc(n.type)}">${esc(typeLabel(n))}</span>${n.section ? `<span class="subtle">§ ${esc(n.section)}${n.reference ? ' · ' + esc(n.reference) : ''}${n.page ? ' · p. ' + esc(n.page) : ''}</span>` : ''}</div>
          <h2 class="rh-title">${esc(n.title)}</h2>
          <p class="rh-hook">${esc(n.hook)}</p>
          ${fc.length ? `<div class="rh-tests">${fc.map(c => `<button class="rh-test" data-card="${esc(c.id)}" title="${esc(c.title)}">🃏 Test yourself · <b>${esc(c.id)}</b>${c.proof ? ' <span>with proof</span>' : ''} →</button>`).join('')}</div>` : ''}
          <div class="rh-intuition">${n.intuition || ''}</div>
          ${part('Precise statement', n.precise, !n.intuition)}
          ${part('Example', n.example)}
          ${part('Proof sketch', n.proofSketch ? n.proofSketch + '<p class="proof-note">AI-written study sketch, not a full proof.</p>' : '')}
        </article>

        ${bottom ? `<div class="rh-bottom"><span class="rh-bottom-icon">◉</span><div><strong>Bottom of this hole.</strong> Nothing deeper here. ${tn.length ? 'Take a tunnel sideways, or climb back up.' : 'Climb back up.'}</div></div>`
        : `<h3 class="rh-h">Dive deeper <small>${n.children.length} door${n.children.length > 1 ? 's' : ''} · press 1–${Math.min(9, n.children.length)}</small></h3><div class="rh-doors">${n.children.map(door).join('')}</div>`}

        ${tn.length ? `<h3 class="rh-h">Tunnels <small>same idea, elsewhere in the hole</small></h3><div class="rh-tunnels">${tn.map(t => `<button class="rh-tunnel ${found.has(t.id) ? '' : 'is-new'}" data-go="${esc(t.id)}" data-dir="side"><span class="rh-tunnel-path">${esc(pathTo(t.id).slice(1, -1).map(x => H.get(x).title).join(' › ') || 'Top')}</span><strong>${esc(H.get(t.id).title)}</strong><span class="rh-tunnel-why">${esc(t.reason)}</span></button>`).join('')}</div>` : ''}

        <div class="rh-foot">
          ${parent ? `<button class="secondary" data-go="${esc(parent.id)}" data-dir="up">↑ Climb up to ${esc(parent.title)} <kbd>↑</kbd></button>` : ''}
          ${siblings.length ? `<span class="rh-siblings"><span class="subtle">Next door:</span> ${siblings.map(s => `<button class="rh-sib ${found.has(s) ? '' : 'is-new'}" data-go="${esc(s)}" data-dir="side">${esc(H.get(s).title)}</button>`).join('')}</span>` : ''}
        </div>
      </div>

      <aside class="rh-map" aria-label="Burrow map">
        <div class="eyebrow">YOUR BURROW</div>
        <div class="rh-progress"><strong>${f}</strong> / ${total} discovered<div class="progress-track"><div style="width:${f / total * 100}%"></div></div></div>
        ${fresh.length ? `<button class="primary rh-surprise" id="rh-surprise">Surprise me: an unexplored door</button>` : '<p class="rh-all">You have discovered everything. ✓</p>'}
        <ul class="rh-map-tree">${mapTree('root')}</ul>
        <div class="rh-map-tools"><button class="quiet" id="rh-reset" title="Forget which nodes you have discovered">Reset discoveries</button></div>
      </aside>
    </div>`;
    math(section);
    linkify($('.rh-room'), [at]);
    $$('[data-go]').forEach(b => b.addEventListener('click', () => go(b.dataset.go, b.dataset.dir)));
    $$('[data-tog]').forEach(b => b.addEventListener('click', () => { const id = b.dataset.tog; mapOpen.has(id) ? mapOpen.delete(id) : mapOpen.add(id); lastDir = 'none'; render(); }));
    $$('[data-card]').forEach(b => b.addEventListener('click', () => window.CT_VIEWS?.openExamCard(b.dataset.card)));
    $('#rh-surprise')?.addEventListener('click', () => go(fresh[Math.floor(Math.random() * fresh.length)], 'down'));
    $('#rh-reset')?.addEventListener('click', () => { if (confirm('Forget all discoveries and start again at the top?')) { found.clear(); found.add('root'); at = 'root'; mapOpen = new Set(['root']); save(); lastDir = 'up'; render(); } });
    lastDir = 'none';
  }

  function go(id, dir) {
    if (!H.has(id)) return;
    at = id; lastDir = dir || 'down';
    const wasNew = !found.has(id);
    pathTo(id).forEach(x => { found.add(x); mapOpen.add(x); });
    save(); render();
    section.scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    // A new node can only complete branches above it, so any complete ancestor just became complete.
    if (wasNew) {
      const done = pathTo(id).find(x => subtree(x).length > 2 && foundIn(x) === subtree(x).length);
      if (done) window.CT_VIEWS?.toast?.(done === 'root' ? '✓ You discovered the whole hole.' : `✓ You explored all of “${H.get(done).title}”.`);
    }
  }

  // Keys: ↑ climb up, 1–9 dive into a door. Stop the hidden graph view from reacting.
  document.addEventListener('keydown', e => {
    if (section.hidden || e.altKey || e.ctrlKey || e.metaKey || e.target.closest('input,select,textarea')) return;
    if ([' ', 'ArrowRight', 'ArrowLeft', '/'].includes(e.key)) { e.stopImmediatePropagation(); return; }
    const n = H.get(at);
    if (e.key === 'ArrowUp' && n.parent) { e.preventDefault(); e.stopImmediatePropagation(); go(n.parent, 'up'); }
    else if (/^[1-9]$/.test(e.key) && n.children[+e.key - 1]) { e.preventDefault(); e.stopImmediatePropagation(); go(n.children[+e.key - 1], 'down'); }
  }, true);

  window.CT_HOLE = {
    current: () => at,
    render: () => { lastDir = 'none'; render(); },
    open: (id, dir = 'side') => go(id, dir),
    has: id => H.has(id),
    parentOf: id => H.get(id)?.parent,
    title: id => H.get(id)?.title,
    home: cardId => hd.cardHome[cardId],
    linkify,
  };
})();
