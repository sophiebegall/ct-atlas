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
  let board = 'all';
  let deck, index, moves, rejected, hint, solved, review, results;

  function start(nextBoard, rounds) {
    board = nextBoard;
    deck = rounds ?? encounters.filter(e => board === 'all' || e.board === board);
    index = -1;
    results = [];
    advance();
  }

  function advance() {
    index++;
    const encounter = deck[index];
    if (!encounter) {
      render();
      return;
    }
    moves = [encounter.move, ...encounter.decoys];
    for (let i = moves.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [moves[i], moves[j]] = [moves[j], moves[i]];
    }
    rejected = new Set();
    hint = false;
    solved = false;
    review = false;
    render();
  }

  function drawOpponent(encounter, accent) {
    const canvas = root.querySelector('.ba-opponent');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const palette = [null, '#233732', accent, '#547363', '#f6ffde'];
    sprites[encounter.board].forEach((row, y) => {
      [...row].forEach((pixel, x) => {
        if (pixel === '.') return;
        ctx.fillStyle = palette[pixel];
        ctx.fillRect(2 + x, 2 + y, 1, 1);
      });
    });
  }

  function render(focus) {
    const encounter = deck[index];
    const cleared = results.filter(result => result.solved).length;
    const accent = accents[index % accents.length];
    const header = `<header class="ba-header">
      <div><h1>Method Arena</h1><p>An exam question attacks. Choose your move.</p></div>
      <div class="ba-board" role="group" aria-label="Choose encounter pool">
        ${Object.entries(boards).map(([key, name]) => `<button type="button" data-ba-board="${key}" aria-pressed="${key === board}">${name}</button>`).join('')}
      </div>
    </header>`;

    if (!encounter) {
      const clean = results.filter(result => result.clean).length;
      const retry = results.filter(result => !result.clean).map(result => result.encounter);
      root.innerHTML = `${header}<section class="ba-summary">
        <h2 tabindex="-1" id="ba-summary-title">Run complete</h2>
        <div class="ba-results"><div><strong>${cleared}/${deck.length}</strong><span>Cleared</span></div><div><strong>${clean}/${deck.length}</strong><span>First try, no hint</span></div></div>
        ${retry.length ? '<p>Revisit encounters you missed, skipped, or used a hint on.</p>' : ''}
        <div class="ba-actions">
          ${retry.length ? `<button type="button" class="ba-primary" data-ba-action="retry">Retry ${retry.length} ${retry.length === 1 ? 'encounter' : 'encounters'}</button>` : ''}
          <button type="button" data-ba-action="restart">Play again</button>
        </div></section>`;
      root.querySelector('#ba-summary-title').focus();
      return;
    }

    const feedback = solved || review
      ? `<div class="ba-answer" tabindex="-1" id="ba-feedback">
          <h3>${solved ? 'Effective move' : 'Move revealed'} <span>·</span> ${esc(encounter.move)}</h3>
          <p><strong>First step.</strong> ${esc(encounter.firstStep)}</p>
          <p><strong>Why it works.</strong> ${esc(encounter.why)}</p>
          <details class="ba-solution">
            <summary>Worked answer</summary>
            <p>${esc(encounter.solution)}</p>
          </details>
        </div>`
      : hint || rejected.size
        ? `<div class="ba-hint" tabindex="-1" id="ba-feedback"><strong>${rejected.size ? 'That move misses. ' : ''}Hint.</strong> ${esc(encounter.hint)}</div>`
        : '';

    root.innerHTML = `${header}<div class="ba-game" style="--ba-accent:${accent}">
      <section class="ba-stage" data-state="${solved ? 'cleared' : 'active'}" aria-labelledby="ba-encounter">
        <div class="ba-hud"><span>${boards[encounter.board]}</span><span>Encounter ${index + 1} / ${deck.length}</span></div>
        <div class="ba-scene" aria-hidden="true">
          <div class="ba-orbit"></div><div class="ba-platform"></div>
          <canvas class="ba-opponent" width="18" height="15"></canvas>
          <span class="ba-spark">✦</span><span class="ba-spark">✧</span><span class="ba-spark">·</span>
        </div>
        <div class="ba-encounter">
          <h2 id="ba-encounter" tabindex="-1">${esc(encounter.name)} ${solved ? 'cleared' : review ? 'revealed' : 'attacks!'}</h2>
          <div class="ba-problem">${encounter.problem.map(line => `<p>${esc(line)}</p>`).join('')}</div>
        </div>
      </section>
      <section class="ba-console" aria-labelledby="ba-moves-title">
        <header class="ba-console-head"><h2 id="ba-moves-title">Choose your move</h2><span>${cleared + Number(solved)}/${deck.length} cleared</span></header>
        ${!solved && !review ? feedback : ''}
        <div class="ba-moves">
          ${moves.map((move, i) => {
            const wrong = rejected.has(i);
            const correct = (solved || review) && move === encounter.move;
            return `<button type="button" data-ba-move="${i}" ${wrong || solved || review ? 'disabled' : ''} class="${correct ? 'ba-correct' : wrong ? 'ba-rejected' : ''}">
              <span class="ba-key" aria-hidden="true">${correct ? '✓' : wrong ? '×' : ['A', 'B', 'C', 'D'][i]}</span><span>${esc(move)}</span>
            </button>`;
          }).join('')}
        </div>
        ${solved || review ? feedback : ''}
        <div class="ba-actions">
          ${solved || review
            ? `<button type="button" class="ba-primary" data-ba-action="next">${index + 1 === deck.length ? 'See results' : 'Next encounter'} <span aria-hidden="true">→</span></button>
               <button type="button" data-ba-action="route">View canvas route <span aria-hidden="true">↗</span></button>`
            : `<button type="button" data-ba-action="hint" ${hint || rejected.size ? 'disabled' : ''}>Hint</button>
               <button type="button" data-ba-action="reveal">Reveal move</button>
               <button type="button" data-ba-action="next">Skip <span aria-hidden="true">→</span></button>`}
        </div>
      </section>
    </div>`;
    drawOpponent(encounter, accent);
    math(root.querySelector('.ba-game'));
    if (focus) root.querySelector(focus)?.focus();
  }

  root.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    const { baBoard, baMove, baAction } = button.dataset;
    const encounter = deck[index];
    if (baBoard && baBoard !== board) {
      start(baBoard);
      root.querySelector('#ba-encounter').focus();
    }
    if (baMove !== undefined && !solved && !review) {
      const choice = Number(baMove);
      if (rejected.has(choice)) return;
      if (moves[choice] === encounter.move) {
        solved = true;
      } else {
        rejected.add(choice);
      }
      render('#ba-feedback');
    }
    switch (baAction) {
      case 'hint':
        hint = true;
        render('#ba-feedback');
        break;
      case 'reveal':
        review = true;
        render('#ba-feedback');
        break;
      case 'next':
        results.push({ encounter, solved, clean: solved && !rejected.size && !hint });
        advance();
        root.querySelector('#ba-encounter')?.focus();
        break;
      case 'retry':
        start(board, results.filter(result => !result.clean).map(result => result.encounter));
        root.querySelector('#ba-encounter').focus();
        break;
      case 'restart':
        start(board);
        root.querySelector('#ba-encounter').focus();
        break;
      case 'route':
        window.CT_VIEWS?.openStudy('canvas', encounter.board, encounter.node);
        break;
    }
  });
  root.addEventListener('keydown', event => {
    if (['ArrowRight', 'ArrowLeft', ' ', '/'].includes(event.key)) event.stopPropagation();
  });
  window.CT_BATTLE_ARENA = {
    render: () => { if (!deck) start('all'); },
    openBoard: nextBoard => {
      if (!deck || board !== nextBoard) start(nextBoard);
      root.querySelector('#ba-encounter, #ba-summary-title')?.focus();
    }
  };
})();
