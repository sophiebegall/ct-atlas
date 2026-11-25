(() => {
  'use strict';
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const examCards = window.CT_EXAM_CARDS || [];
  const homeworks = window.CT_HOMEWORKS || [];
  if (!examCards.length && !homeworks.length) return;

  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const norm = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const renderMath = el => {
    if (!el || !window.renderMathInElement) return;
    window.renderMathInElement(el, {
      delimiters: [
        { left: '\\[', right: '\\]', display: true },
        { left: '\\(', right: '\\)', display: false },
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false },
      ],
      throwOnError: false,
      strict: 'ignore',
      trust: false,
    });
  };

  // ==================== TOP-LEVEL VIEW SEPARATION ====================
  // Keeps Graph view completely separate from the 18-card Exam Flashcards (Proof) view
  // and from the isolated list-only Homeworks view.
  const shell = $('.app-shell');
  const examSection = $('#exam-flashcards-view');
  const hwSection = $('#homeworks-view');
  let activeTopView = 'graph'; // 'graph' | 'split' | 'exam' | 'homeworks'

  function setTopView(view) {
    activeTopView = view;
    const isAtlas = view === 'graph' || view === 'split';
    shell.hidden = !isAtlas;
    examSection.hidden = view !== 'exam';
    hwSection.hidden = view !== 'homeworks';

    if (view === 'graph') {
      $('#graph-view')?.click();
    } else if (view === 'split') {
      $('#split-view')?.click();
    }

    const map = {
      graph: '#graph-only-view',
      split: '#split-view',
      exam: '#exam-cards-view',
      homeworks: '#homeworks-tab-view',
    };
    Object.entries(map).forEach(([k, sel]) => {
      const btn = $(sel);
      if (!btn) return;
      btn.classList.toggle('active', k === view);
      btn.setAttribute('aria-pressed', String(k === view));
    });

    if (view === 'exam') renderExamView();
    if (view === 'homeworks') renderHomeworksView();
  }

  $('#graph-only-view')?.addEventListener('click', () => setTopView('graph'));
  $('#split-view')?.addEventListener('click', () => {
    if (activeTopView !== 'split') setTopView('split');
  });
  $('#exam-cards-view')?.addEventListener('click', () => setTopView('exam'));
  $('#homeworks-tab-view')?.addEventListener('click', () => setTopView('homeworks'));

  // Start in Graph-only mode so Graph stays separate from the Proof/Flashcards view by default
  setTopView('graph');

  // ==================== EXAM FLASHCARDS (STRICTLY THE 18 ITEMS) ====================
  const EXAM_STORE = 'ct-atlas-exam18-v1';
  let examProgress = {};
  try { examProgress = JSON.parse(localStorage.getItem(EXAM_STORE) || '{}') || {}; } catch {}
  const saveExamProgress = () => {
    try { localStorage.setItem(EXAM_STORE, JSON.stringify(examProgress)); } catch {}
  };

  let examProf = 'all';      // 'all' | 'palladino' | 'pignotti'
  let examProof = 'all';     // 'all' | 'proof' | 'noproof'
  let examStatus = 'all';    // 'all' | 'new' | 'again' | 'known'
  let examQuery = '';
  let examDisplay = 'cards'; // 'cards' | 'list'
  let examOrder = examCards.map(c => c.id);
  let examIdx = 0;
  let examRevealed = false;

  function filteredExamCards() {
    const byId = new Map(examCards.map(c => [c.id, c]));
    return examOrder
      .map(id => byId.get(id))
      .filter(c => examProf === 'all' || c.prof === examProf)
      .filter(c => examProof === 'all' || (examProof === 'proof' ? c.withProof : !c.withProof))
      .filter(c => examStatus === 'all' || (examStatus === 'new' ? !examProgress[c.id] : examProgress[c.id] === examStatus))
      .filter(c => !examQuery || norm(c.id + ' ' + c.title + ' ' + c.profLabel + ' ' + c.dates).includes(norm(examQuery)));
  }

  function renderExamView() {
    const cards = filteredExamCards();
    if (examIdx >= cards.length) examIdx = Math.max(0, cards.length - 1);
    const totalProof = examCards.filter(c => c.withProof).length;
    const totalNoProof = examCards.length - totalProof;
    const knownCount = examCards.filter(c => examProgress[c.id] === 'known').length;
    const againCount = examCards.filter(c => examProgress[c.id] === 'again').length;

    const headerHtml = `
      <div class="sv-header">
        <div>
          <div class="eyebrow">OFFICIAL PART I QUESTION SHEET · 18 EXAM FLASHCARDS</div>
          <h2>Exam Flashcards</h2>
          <p class="subtle">Strictly the 18 exam-list items: <strong>${totalProof} with proof</strong> (P3, P5, G1–G4) and <strong>${totalNoProof} without proof</strong> (P1, P2, P4, P6–P10, G5–G8). P3 uses Palladino's orthogonal-complement proof.</p>
        </div>
        <div class="sv-header-actions">
          <div class="mode-switch" role="group" aria-label="Flashcard display mode">
            <button id="ex-mode-cards" class="${examDisplay === 'cards' ? 'active' : ''}" aria-pressed="${examDisplay === 'cards'}">Cards</button>
            <button id="ex-mode-list" class="${examDisplay === 'list' ? 'active' : ''}" aria-pressed="${examDisplay === 'list'}">List view</button>
          </div>
          <button id="ex-shuffle" class="secondary">Shuffle</button>
        </div>
      </div>

      <div class="sv-filters">
        <div class="sv-pill-group" role="group" aria-label="Filter by proof requirement">
          <button class="sv-pill ${examProof === 'all' ? 'active' : ''}" data-ex-proof="all">All (${examCards.length})</button>
          <button class="sv-pill sv-pill-proof ${examProof === 'proof' ? 'active' : ''}" data-ex-proof="proof">With proof (${totalProof})</button>
          <button class="sv-pill sv-pill-noproof ${examProof === 'noproof' ? 'active' : ''}" data-ex-proof="noproof">No proof (${totalNoProof})</button>
        </div>
        <div class="sv-filter-controls">
          <select id="ex-prof-filter" aria-label="Filter by professor">
            <option value="all" ${examProf === 'all' ? 'selected' : ''}>Both professors (18)</option>
            <option value="palladino" ${examProf === 'palladino' ? 'selected' : ''}>Palladino (10)</option>
            <option value="pignotti" ${examProf === 'pignotti' ? 'selected' : ''}>Pignotti (8)</option>
          </select>
          <select id="ex-status-filter" aria-label="Filter by review status">
            <option value="all" ${examStatus === 'all' ? 'selected' : ''}>All statuses</option>
            <option value="new" ${examStatus === 'new' ? 'selected' : ''}>Not reviewed</option>
            <option value="again" ${examStatus === 'again' ? 'selected' : ''}>Review again (${againCount})</option>
            <option value="known" ${examStatus === 'known' ? 'selected' : ''}>Got it (${knownCount})</option>
          </select>
          <input id="ex-search" type="search" value="${esc(examQuery)}" placeholder="Filter 18 flashcards…" aria-label="Filter exam flashcards" />
          <span class="subtle sv-count">${cards.length} / ${examCards.length} shown · ${knownCount}/${examCards.length} mastered</span>
        </div>
      </div>
    `;

    let bodyHtml = '';
    if (!cards.length) {
      bodyHtml = `<div class="sv-empty"><h3>No matching exam flashcards</h3><p class="subtle">Adjust your filters or search query.</p><button id="ex-clear-filters" class="secondary">Clear filters</button></div>`;
    } else if (examDisplay === 'cards') {
      const c = cards[examIdx];
      const st = examProgress[c.id];
      const badge = c.withProof
        ? `<span class="sv-badge sv-badge-proof">WITH PROOF</span>`
        : `<span class="sv-badge sv-badge-noproof">NO PROOF</span>`;
      const stBadge = st === 'known'
        ? `<span class="sv-badge sv-badge-known">✓ Got it</span>`
        : st === 'again'
        ? `<span class="sv-badge sv-badge-again">↻ Review again</span>`
        : '';
      bodyHtml = `
        <div class="sv-card-wrap">
          <article class="sv-flashcard ${c.withProof ? 'is-proof' : 'is-noproof'}">
            <div class="sv-card-meta">
              <div class="sv-badges">
                <span class="sv-id">${esc(c.id)}</span>
                ${badge}
                <span class="sv-badge sv-badge-muted">${esc(c.profLabel)}</span>
                <span class="sv-badge sv-badge-date">Notes: ${esc(c.dates)}</span>
                ${stBadge}
              </div>
              <span class="subtle">${examIdx + 1} / ${cards.length}</span>
            </div>
            <h3 class="sv-card-title">${esc(c.title)}</h3>
            <div class="sv-prompt">${c.prompt}</div>
            <div class="sv-reveal-bar">
              <button id="ex-reveal" class="primary">${examRevealed ? 'Hide answer' : 'Reveal answer'} <kbd>Space</kbd></button>
            </div>
            ${examRevealed ? `
              <div class="sv-answer">
                <section class="sv-part">
                  <div class="part-label"><b>01</b> Statement / Definition</div>
                  ${c.statement}
                </section>
                ${c.withProof && c.proof ? `
                  <section class="sv-part sv-proof-box">
                    <div class="part-label"><b>02</b> Exam Proof (Required)</div>
                    ${c.proof}
                  </section>
                ` : ''}
                ${c.notes ? `
                  <section class="sv-part">
                    <div class="part-label"><b>${c.withProof ? '03' : '02'}</b> Key Notes &amp; Remarks</div>
                    ${c.notes}
                  </section>
                ` : ''}
                <div class="sv-rating">
                  <button id="ex-again" class="secondary">↻ Review again</button>
                  <button id="ex-known" class="secondary positive">✓ Got it</button>
                </div>
              </div>
            ` : ''}
          </article>
          <div class="sv-nav">
            <button id="ex-prev" class="secondary" ${examIdx === 0 ? 'disabled' : ''}>← Previous</button>
            <div class="sv-dots">
              ${cards.map((item, i) => `<button class="sv-dot ${i === examIdx ? 'current' : ''} ${examProgress[item.id] || ''} ${item.withProof ? 'proof' : ''}" data-ex-idx="${i}" title="${esc(item.id + ' · ' + item.title)}"></button>`).join('')}
            </div>
            <button id="ex-next" class="secondary" ${examIdx === cards.length - 1 ? 'disabled' : ''}>Next →</button>
          </div>
        </div>
      `;
    } else {
      // List view strictly for the filtered exam flashcards (out of the 18)
      bodyHtml = `
        <div class="sv-list">
          ${cards.map((c, idx) => {
            const st = examProgress[c.id];
            const badge = c.withProof
              ? `<span class="sv-badge sv-badge-proof">WITH PROOF</span>`
              : `<span class="sv-badge sv-badge-noproof">NO PROOF</span>`;
            const stBadge = st === 'known'
              ? `<span class="sv-badge sv-badge-known">✓ Got it</span>`
              : st === 'again'
              ? `<span class="sv-badge sv-badge-again">↻ Review again</span>`
              : '';
            return `
              <details class="sv-list-item ${c.withProof ? 'is-proof' : 'is-noproof'}">
                <summary class="sv-list-summary">
                  <div class="sv-list-top">
                    <div class="sv-badges">
                      <span class="sv-id">${esc(c.id)}</span>
                      ${badge}
                      <span class="sv-badge sv-badge-muted">${esc(c.profLabel)}</span>
                      <span class="sv-badge sv-badge-date">Notes: ${esc(c.dates)}</span>
                      ${stBadge}
                    </div>
                    <span class="sv-toggle-hint">Reveal answer ▾</span>
                  </div>
                  <strong class="sv-list-title">${idx + 1}. ${esc(c.title)}</strong>
                  <div class="sv-list-prompt">${c.prompt}</div>
                </summary>
                <div class="sv-list-body">
                  <section class="sv-part">
                    <div class="part-label"><b>01</b> Statement / Definition</div>
                    ${c.statement}
                  </section>
                  ${c.withProof && c.proof ? `
                    <section class="sv-part sv-proof-box">
                      <div class="part-label"><b>02</b> Exam Proof (Required)</div>
                      ${c.proof}
                    </section>
                  ` : ''}
                  ${c.notes ? `
                    <section class="sv-part">
                      <div class="part-label"><b>${c.withProof ? '03' : '02'}</b> Key Notes &amp; Remarks</div>
                      ${c.notes}
                    </section>
                  ` : ''}
                </div>
              </details>
            `;
          }).join('')}
        </div>
      `;
    }

    examSection.innerHTML = `<div class="sv-container">${headerHtml}${bodyHtml}</div>`;
    renderMath(examSection);

    // Wire events
    $('#ex-mode-cards')?.addEventListener('click', () => { examDisplay = 'cards'; renderExamView(); });
    $('#ex-mode-list')?.addEventListener('click', () => { examDisplay = 'list'; renderExamView(); });
    $('#ex-shuffle')?.addEventListener('click', () => {
      for (let i = examOrder.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [examOrder[i], examOrder[j]] = [examOrder[j], examOrder[i]];
      }
      examIdx = 0; examRevealed = false; renderExamView();
    });
    $$('[data-ex-proof]').forEach(b => b.addEventListener('click', () => {
      examProof = b.dataset.exProof; examIdx = 0; examRevealed = false; renderExamView();
    }));
    $('#ex-prof-filter')?.addEventListener('change', e => {
      examProf = e.target.value; examIdx = 0; examRevealed = false; renderExamView();
    });
    $('#ex-status-filter')?.addEventListener('change', e => {
      examStatus = e.target.value; examIdx = 0; examRevealed = false; renderExamView();
    });
    $('#ex-search')?.addEventListener('input', e => {
      const pos = e.target.selectionStart;
      examQuery = e.target.value; examIdx = 0; examRevealed = false; renderExamView();
      const inp = $('#ex-search'); if (inp) { inp.focus(); inp.setSelectionRange(pos, pos); }
    });
    $('#ex-clear-filters')?.addEventListener('click', () => {
      examProf = 'all'; examProof = 'all'; examStatus = 'all'; examQuery = ''; examIdx = 0; examRevealed = false; renderExamView();
    });
    $('#ex-reveal')?.addEventListener('click', () => { examRevealed = !examRevealed; renderExamView(); });
    $('#ex-prev')?.addEventListener('click', () => { if (examIdx > 0) { examIdx--; examRevealed = false; renderExamView(); } });
    $('#ex-next')?.addEventListener('click', () => { if (examIdx < cards.length - 1) { examIdx++; examRevealed = false; renderExamView(); } });
    $$('[data-ex-idx]').forEach(b => b.addEventListener('click', () => {
      examIdx = +b.dataset.exIdx; examRevealed = false; renderExamView();
    }));
    $('#ex-known')?.addEventListener('click', () => {
      const c = cards[examIdx]; if (!c) return;
      examProgress[c.id] = 'known'; saveExamProgress();
      if (examIdx < cards.length - 1) examIdx++;
      examRevealed = false; renderExamView();
    });
    $('#ex-again')?.addEventListener('click', () => {
      const c = cards[examIdx]; if (!c) return;
      examProgress[c.id] = 'again'; saveExamProgress();
      if (examIdx < cards.length - 1) examIdx++;
      examRevealed = false; renderExamView();
    });
  }

  // Keyboard shortcuts when Exam Flashcards view is active
  document.addEventListener('keydown', e => {
    if (activeTopView !== 'exam' || examDisplay !== 'cards') return;
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.target.closest('input,select,textarea')) return;
    const cards = filteredExamCards();
    if (!cards.length) return;
    if (e.code === 'Space') {
      e.preventDefault(); e.stopImmediatePropagation();
      examRevealed = !examRevealed; renderExamView();
    } else if (e.code === 'ArrowRight') {
      e.preventDefault(); e.stopImmediatePropagation();
      if (examIdx < cards.length - 1) { examIdx++; examRevealed = false; renderExamView(); }
    } else if (e.code === 'ArrowLeft') {
      e.preventDefault(); e.stopImmediatePropagation();
      if (examIdx > 0) { examIdx--; examRevealed = false; renderExamView(); }
    }
  }, true);

  // ==================== HOMEWORKS VIEW (ISOLATED, LIST-ONLY) ====================
  let hwProf = 'all';   // 'all' | 'pignotti' | 'palladino'
  let hwSheet = 'all';  // 'all' | sheet.id

  function renderHomeworksView() {
    const sheetsByProf = homeworks.filter(s => hwProf === 'all' || s.prof === hwProf);
    const visibleSheets = sheetsByProf.filter(s => hwSheet === 'all' || s.id === hwSheet);
    const totalProblems = visibleSheets.reduce((acc, s) => acc + s.problems.length, 0);

    const headerHtml = `
      <div class="sv-header">
        <div>
          <div class="eyebrow">ISOLATED PRACTICE PROBLEMS · LIST VIEW ONLY</div>
          <h2>Homework Problems &amp; Solutions</h2>
          <p class="subtle">Organized by homework date and sheet. Each problem displays the full statement, followed by a <strong>Hint</strong> accordion and a <strong>Reveal Answer</strong> accordion.</p>
        </div>
      </div>

      <div class="sv-filters">
        <div class="sv-pill-group" role="group" aria-label="Filter homeworks by professor">
          <button class="sv-pill ${hwProf === 'all' ? 'active' : ''}" data-hw-prof="all">All sheets (${homeworks.length})</button>
          <button class="sv-pill ${hwProf === 'pignotti' ? 'active' : ''}" data-hw-prof="pignotti">Prof. Pignotti (4)</button>
          <button class="sv-pill ${hwProf === 'palladino' ? 'active' : ''}" data-hw-prof="palladino">Prof. Palladino (2)</button>
        </div>
        <div class="sv-filter-controls">
          <select id="hw-sheet-select" aria-label="Filter by homework sheet">
            <option value="all" ${hwSheet === 'all' ? 'selected' : ''}>All homework sheets</option>
            ${sheetsByProf.map(s => `<option value="${esc(s.id)}" ${hwSheet === s.id ? 'selected' : ''}>${esc(s.date + ' · ' + s.title)}</option>`).join('')}
          </select>
          <span class="subtle sv-count">${totalProblems} problems across ${visibleSheets.length} sheet${visibleSheets.length === 1 ? '' : 's'}</span>
        </div>
      </div>
    `;

    const sheetsHtml = visibleSheets.map(sheet => `
      <section class="hw-sheet">
        <header class="hw-sheet-head">
          <div class="sv-badges">
            <span class="sv-badge sv-badge-date">${esc(sheet.date)}</span>
            <span class="sv-badge sv-badge-muted">${esc(sheet.profLabel)}</span>
            <span class="sv-badge sv-badge-muted">${esc(sheet.source)}</span>
          </div>
          <h3>${esc(sheet.title)}</h3>
        </header>
        <div class="hw-problem-list">
          ${sheet.problems.map(p => `
            <article class="hw-problem-card">
              <div class="hw-problem-head">
                <span class="hw-num">Problem ${esc(p.num)}</span>
                <h4>${esc(p.title)}</h4>
              </div>
              <div class="hw-statement">${p.problem}</div>
              <div class="hw-accordions">
                <details class="hw-accordion hw-hint">
                  <summary><span>Hint</span><span class="hw-chev">▾</span></summary>
                  <div class="hw-accordion-body">${p.hint}</div>
                </details>
                <details class="hw-accordion hw-answer">
                  <summary><span>Reveal Answer</span><span class="hw-chev">▾</span></summary>
                  <div class="hw-accordion-body">${p.answer}</div>
                </details>
              </div>
            </article>
          `).join('')}
        </div>
      </section>
    `).join('');

    hwSection.innerHTML = `<div class="sv-container">${headerHtml}${sheetsHtml}</div>`;
    renderMath(hwSection);

    $$('[data-hw-prof]').forEach(b => b.addEventListener('click', () => {
      hwProf = b.dataset.hwProf; hwSheet = 'all'; renderHomeworksView();
    }));
    $('#hw-sheet-select')?.addEventListener('change', e => {
      hwSheet = e.target.value; renderHomeworksView();
    });
  }
})();
