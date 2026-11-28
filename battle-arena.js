(() => {
  'use strict';
  const root = document.querySelector('#battle-arena-view');
  const encounters = window.CT_BATTLE;
  if (!root || !encounters?.length) return;

  const boards = { all: 'Mixed', palladino: 'Palladino', pignotti: 'Pignotti' };
  const accents = ['#b8e471', '#f5bf78', '#8cddc9', '#cbb3f3'];
  const sprites = {
    palladino: [
      '...33333333...', '..3222222223..', '.322222222223.', '.321111111123.',
      '32114111411223', '32114111411223', '32111111111223', '32211111112223',
      '.322222222223.', '..3333333333..', '....333333....'
    ],
    pignotti: [
      '......33......', '.....3223.....', '....322223....', '...32222223...',
      '..3221111223..', '.322141141223.', '32221411412223', '32221111112223',
      '.322222222223.', '..3333333333..', '...33....33...'
    ]
  };
  const esc = value => String(value).replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
  const math = element => window.renderMathInElement?.(element, {
    delimiters: [
      { left: '\\[', right: '\\]', display: true },
      { left: '$', right: '$', display: false }
    ],
    throwOnError: false
  });
  function drawOpponent(encounter, accent) {
    const canvas = root.querySelector('.ba-opponent');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const palette = [null, '#233732', accent, '#547363', '#f6ffde'];
    (sprites[encounter.board] || sprites.palladino).forEach((row, y) => {
      [...row].forEach((pixel, x) => {
        if (pixel === '.') return;
        ctx.fillStyle = palette[pixel];
        ctx.fillRect(2 + x, 2 + y, 1, 1);
      });
    });
  }

  const labels = { choice: 'Choice', order: 'Combo Order', flaw: 'Spot the Flaw' };
  // Progress belongs to encounters, not positions in a filtered/retry deck.
  const progress = new Map();
  let board = 'all', deck, index = 0, rosterOpen = false, dragged = null;
  const pool = () => encounters.filter(e => board === 'all' || e.board === board);
  const current = () => deck?.[index];
  const complete = (e, s = progress.get(e)) => !!s && s.resolved && s.step === e.steps.length - 1;
  const clean = e => complete(e) && progress.get(e).clean;
  const shuffle = items => {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  };
  function prepare(e, s) {
    const step = e.steps[s.step];
    s.options = step.type === 'choice' ? shuffle([step.move, ...step.decoys]) : step.lines;
    s.order = step.type === 'order' ? shuffle(step.items.map((_, i) => i)) : [];
    // A combo should always start as a puzzle, including when random returns identity.
    if (s.order.length && s.order.every((value, i) => value === i)) s.order.push(s.order.shift());
    s.resolved = false;
    s.hint = false;
    s.checked = false;
    s.rejected = new Set();
    s.feedback = '';
    s.effect = '';
  }
  function state(e) {
    if (!progress.has(e)) {
      const s = { step: 0, hp: 100, clean: true, log: [], skipped: false };
      prepare(e, s);
      progress.set(e, s);
    }
    return progress.get(e);
  }
  function start(nextBoard = board, rounds) {
    board = nextBoard;
    deck = rounds || pool();
    index = 0;
    render('#ba-encounter');
  }
  function status(e) {
    const s = progress.get(e);
    return clean(e) ? '★ Clean clear' : complete(e) ? '✓ Cleared' : s?.skipped ? 'Skipped' : s ? 'In progress' : 'Unplayed';
  }
  function hurt(e, s) {
    s.clean = false;
    const damage = Math.min(18, s.hp - 1);
    s.hp -= damage;
    s.feedback = `${e.steps[s.step].counterattack || 'The monster bonks you with a misplaced minus sign.'} −${damage} HP.${s.hp === 1 ? ' Hanging on at 1 HP — powered entirely by stubbornness!' : ' Adjust your answer and strike again.'}`;
    s.effect = 'player';
    render('#ba-feedback');
  }
  function resolve(e, s, revealed = false) {
    if (s.resolved) return;
    const step = e.steps[s.step];
    s.resolved = true;
    if (revealed) s.clean = false;
    s.skipped = false;
    s.log.push({ text: step.logEntry, revealed });
    s.feedback = `${revealed ? 'Step revealed.' : step.type === 'order' ? 'Combo! A perfectly timed derivation.' : step.type === 'flaw' ? 'Counter! Flaw spotted.' : 'Direct hit!'} ${step.type === 'flaw' ? step.whyFlawed : step.logEntry}`;
    s.effect = 'monster';
    render('#ba-feedback');
  }
  function reorder(from, to) {
    const e = current(), s = e && state(e);
    if (!s || s.resolved || e.steps[s.step].type !== 'order' || !Number.isInteger(from) || !Number.isInteger(to) || from < 0 || to < 0 || from >= s.order.length || to >= s.order.length || from === to) return;
    const [item] = s.order.splice(from, 1);
    s.order.splice(to, 0, item);
    s.checked = false; // Slot feedback describes the last submission only.
    s.feedback = `Moved card to slot ${to + 1}. Strike when ready.`;
    const nextSlot = to + Math.sign(to - from);
    const direction = nextSlot >= 0 && nextSlot < s.order.length ? `[data-ba-to="${nextSlot}"]` : 'button:not(:disabled)';
    render(`[data-ba-card="${item}"] ${direction}`);
  }
  function turn(e, s) {
    const step = e.steps[s.step];
    if (s.resolved) return '';
    if (step.type === 'order') return `<ol class="ba-order" aria-label="Derivation order">
      ${s.order.map((item, slot) => `<li draggable="true" data-ba-slot="${slot}" data-ba-card="${item}" class="${s.checked && item === slot ? 'ba-slot-correct' : ''}">
        <div class="ba-card-text"><span class="ba-slot">${slot + 1}${s.checked && item === slot ? ' · ✓ Correct slot' : ''}</span>${esc(step.items[item])}</div>
        <div class="ba-reorder"><button type="button" data-ba-from="${slot}" data-ba-to="${slot - 1}" aria-label="Move slot ${slot + 1} up" ${slot === 0 ? 'disabled' : ''}>↑</button><button type="button" data-ba-from="${slot}" data-ba-to="${slot + 1}" aria-label="Move slot ${slot + 1} down" ${slot === s.order.length - 1 ? 'disabled' : ''}>↓</button></div>
      </li>`).join('')}</ol><div class="ba-actions"><button class="ba-primary" type="button" data-ba-action="strike">Strike</button></div>`;
    return `<div class="ba-moves">${s.options.map((option, i) => `<button type="button" data-ba-move="${i}" class="${s.rejected.has(i) ? 'ba-rejected' : ''}"><span class="ba-key" aria-hidden="true">${step.type === 'flaw' ? i + 1 : ['A', 'B', 'C', 'D'][i]}</span><span>${esc(option)}</span></button>`).join('')}</div>`;
  }
  function meter(label, value, key) {
    return `<div class="ba-health ba-${key}"><span>${label} <strong>${value}${key === 'monster' ? '%' : ' HP'}</strong></span><div role="progressbar" aria-label="${label}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${value}"><div class="ba-health-fill" data-ba-health="${key}" style="width:${value}%"></div></div></div>`;
  }
  function render(focus) {
    const e = current();
    const previous = Object.fromEntries([...root.querySelectorAll('[data-ba-health]')].map(el => [el.dataset.baHealth, el.style.width]));
    const header = `<header class="ba-header"><div><h1>Method Arena</h1><p>Work through the problem. Every step lands a hit.</p></div><div class="ba-board" role="group" aria-label="Choose encounter pool">${Object.entries(boards).map(([key, name]) => `<button type="button" data-ba-board="${key}" aria-pressed="${key === board}">${name}</button>`).join('')}</div></header>`;
    const roster = `<details class="ba-roster" ${rosterOpen ? 'open' : ''}><summary>Monster roster · ${pool().filter(e => complete(e)).length}/${pool().length} cleared</summary><div>${pool().map(e => `<button type="button" data-ba-encounter="${encounters.indexOf(e)}" aria-current="${e === current() ? 'true' : 'false'}"><span>${esc(e.name)}</span><small>${status(e)}</small></button>`).join('')}</div></details>`;
    if (!e) {
      root.innerHTML = `${header}${roster}<section class="ba-summary"><h2 tabindex="-1" id="ba-summary-title">Run complete</h2><div class="ba-results"><div><strong>${deck.filter(e => complete(e)).length}/${deck.length}</strong><span>Cleared</span></div><div><strong>${deck.filter(clean).length}/${deck.length}</strong><span>Clean clears · no mistakes or help</span></div></div><p>Retry unfinished encounters or those where you used a hint, reveal, or extra attempt.</p><div class="ba-actions">${deck.some(e => !clean(e)) ? '<button type="button" class="ba-primary" data-ba-action="retry">Retry encounters</button>' : ''}<button type="button" data-ba-action="restart">Play again</button></div></section>`;
      root.querySelector('#ba-summary-title').focus();
      return;
    }
    const s = state(e), step = e.steps[s.step], done = complete(e, s);
    const monsterHP = Math.round(100 * (1 - (s.step + Number(s.resolved)) / e.steps.length));
    const accent = accents[encounters.indexOf(e) % accents.length];
    root.innerHTML = `${header}${roster}<div class="ba-game" style="--ba-accent:${accent}">
      <section class="ba-stage ${s.effect === 'monster' ? 'ba-hit' : ''}" data-state="${done ? 'cleared' : 'active'}" aria-labelledby="ba-encounter">
        <div class="ba-hud"><span>${esc(boards[e.board] || e.board)}</span><span>Encounter ${index + 1} / ${deck.length}</span></div>
        ${meter('Monster', monsterHP, 'monster')}
        <div class="ba-scene" aria-hidden="true"><div class="ba-orbit"></div><div class="ba-platform"></div><canvas class="ba-opponent" width="18" height="15"></canvas><span class="ba-spark">✦</span><span class="ba-spark">✧</span><span class="ba-spark">·</span></div>
        <div class="ba-encounter"><h2 id="ba-encounter" tabindex="-1">${esc(e.name)} ${done ? 'cleared!' : 'attacks!'}</h2><div class="ba-problem">${e.problem.map(line => `<p>${esc(line)}</p>`).join('')}</div></div>
      </section>
      <section class="ba-console" aria-labelledby="ba-moves-title">
        <div class="ba-player-hud ${s.effect === 'player' ? 'ba-hit' : ''}">${meter('Player', s.hp, 'player')}</div>
        <header class="ba-console-head"><h2 id="ba-moves-title" tabindex="-1">Step ${s.step + 1} / ${e.steps.length}</h2><span class="ba-type">${labels[step.type]}</span></header>
        <p class="ba-prompt">${esc(step.prompt)}</p>
        ${s.feedback ? `<div id="ba-feedback" class="ba-hint" tabindex="-1" role="status">${esc(s.feedback)}</div>` : ''}
        ${s.hint ? `<p class="ba-hint"><strong>Hint.</strong> ${esc(step.hint)}</p>` : ''}
        ${turn(e, s)}
        <div class="ba-actions">${s.resolved
          ? done ? `<button type="button" class="ba-primary" data-ba-action="next">${index + 1 === deck.length ? 'See results' : 'Next encounter'} →</button><button type="button" data-ba-action="route">View canvas route ↗</button>`
            : '<button type="button" class="ba-primary" data-ba-action="step">Next step →</button>'
          : `<button type="button" data-ba-action="hint" ${s.hint ? 'disabled' : ''}>Hint</button><button type="button" data-ba-action="reveal">Reveal step</button><button type="button" data-ba-action="next">Skip encounter →</button>`}</div>
        <section class="ba-log" aria-label="Work so far"><h3>Work so far</h3>${s.log.length ? `<ol>${s.log.map(entry => `<li>${entry.revealed ? '<small>Revealed · </small>' : ''}${esc(entry.text)}</li>`).join('')}</ol>` : '<p>Your solution builds here after each hit.</p>'}</section>
        ${done ? `<details class="ba-solution"><summary>Worked answer</summary><p>${esc(e.solution)}</p></details>` : ''}
      </section></div>`;
    drawOpponent(e, accent);
    math(root.querySelector('.ba-game'));
    // Keep transitions even though the console is rendered from session state.
    if (s.effect) root.querySelectorAll('[data-ba-health]').forEach(el => {
      const target = el.style.width;
      el.style.width = previous[el.dataset.baHealth] || target;
      void el.offsetWidth;
      el.style.width = target;
    });
    s.effect = '';
    if (focus) root.querySelector(focus)?.focus();
  }
  root.addEventListener('toggle', event => {
    if (event.target.matches('.ba-roster') && event.target.isConnected) rosterOpen = event.target.open;
  }, true);
  root.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button || button.disabled) return;
    const { baBoard, baMove, baAction, baEncounter, baFrom, baTo } = button.dataset;
    if (baBoard && baBoard !== board) { start(baBoard); return; }
    if (baEncounter !== undefined) {
      const target = encounters[Number(baEncounter)];
      if (!pool().includes(target)) return;
      if (!deck.includes(target)) deck = pool();
      index = deck.indexOf(target);
      render('#ba-encounter');
      return;
    }
    if (baAction === 'restart') { pool().forEach(e => progress.delete(e)); start(); return; }
    if (baAction === 'retry') {
      const retry = deck.filter(e => !clean(e));
      retry.forEach(e => progress.delete(e));
      start(board, retry);
      return;
    }
    const e = current();
    if (!e) return;
    const s = state(e), step = e.steps[s.step];
    if (baFrom !== undefined) { reorder(Number(baFrom), Number(baTo)); return; }
    if (baMove !== undefined && !s.resolved) {
      const choice = Number(baMove);
      if (step.type === 'choice' ? s.options[choice] === step.move : choice === step.flawIndex) resolve(e, s);
      else { s.rejected.add(choice); hurt(e, s); }
      return;
    }
    switch (baAction) {
      case 'strike':
        if (s.resolved || step.type !== 'order') break;
        if (s.order.every((value, slot) => value === slot)) resolve(e, s);
        else { s.checked = true; hurt(e, s); }
        break;
      case 'hint':
        if (s.resolved) break;
        s.hint = true; s.clean = false; s.feedback = 'Hint unlocked — a little backup for this step.';
        render('#ba-feedback'); break;
      case 'reveal': resolve(e, s, true); break;
      case 'step':
        if (!s.resolved || complete(e, s)) break;
        s.step++; prepare(e, s); render('#ba-moves-title'); break;
      case 'next':
        if (!complete(e, s)) { s.skipped = true; s.clean = false; }
        index++; render('#ba-encounter'); break;
      case 'route': window.CT_VIEWS?.openStudy('canvas', e.board, e.node); break;
    }
  });
  root.addEventListener('dragstart', event => {
    const card = event.target.closest('[data-ba-slot]');
    if (!card) return;
    dragged = Number(card.dataset.baSlot);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', String(dragged));
  });
  root.addEventListener('dragover', event => {
    if (dragged !== null && event.target.closest('[data-ba-slot]')) {
      event.preventDefault(); event.dataTransfer.dropEffect = 'move';
    }
  });
  root.addEventListener('drop', event => {
    const card = event.target.closest('[data-ba-slot]');
    if (!card || dragged === null) return;
    event.preventDefault();
    reorder(dragged, Number(card.dataset.baSlot));
    dragged = null;
  });
  root.addEventListener('dragend', () => { dragged = null; });
  root.addEventListener('keydown', event => {
    if (['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', ' ', '/'].includes(event.key)) event.stopPropagation();
  });
  window.CT_BATTLE_ARENA = {
    render: () => { if (!deck) start('all'); },
    openBoard: nextBoard => {
      if (!deck || board !== nextBoard) start(nextBoard);
      root.querySelector('#ba-encounter, #ba-summary-title')?.focus();
    }
  };
})();
