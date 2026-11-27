// Run with Playwright CLI: run-code "$(cat tests/browser/battle-arena.js)"
// Requires the app served at http://localhost:8765. No production dependencies.
async (page) => {
  const check = (condition, message) => { if (!condition) throw new Error(message); };
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  // Routing disables HTTP cache so repeated local runs use the current sources.
  await page.route('**/*', route => route.continue());
  await page.goto('http://localhost:8765');
  await page.locator('#battle-arena-tab').click();
  const arena = page.locator('#battle-arena-view');
  const action = name => arena.locator(`[data-ba-action="${name}"]`);
  const hp = who => arena.getByRole('progressbar', { name: who }).getAttribute('aria-valuenow');
  const roster = async i => {
    if (await arena.locator('.ba-roster').getAttribute('open') === null) await arena.locator('.ba-roster summary').click();
    await arena.locator(`[data-ba-encounter="${i}"]`).click();
  };
  const choose = async (step, wrong = false) => {
    if (step.type === 'flaw') return arena.locator(`[data-ba-move="${wrong ? (step.flawIndex + 1) % step.lines.length : step.flawIndex}"]`).click();
    const idx = await page.evaluate(({ move, wrong }) => {
      const el = document.createElement('span'); el.textContent = move;
      window.renderMathInElement(el, { delimiters: [{left:'$',right:'$',display:false}], throwOnError:false });
      return [...document.querySelectorAll('.ba-moves button')].findIndex(button => (button.lastElementChild.textContent === el.textContent) !== wrong);
    }, { move: step.move, wrong });
    check(idx >= 0, 'Could not locate answer');
    await arena.locator(`[data-ba-move="${idx}"]`).click();
  };
  const data = await page.evaluate(() => window.CT_BATTLE);
  const noOverflow = async () => check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Horizontal page overflow');
  const sort = async () => {
    const count = await arena.locator('[data-ba-card]').count();
    for (let target = 0; target < count; target++) {
      let slot = Number(await arena.locator(`[data-ba-card="${target}"]`).getAttribute('data-ba-slot'));
      while (slot > target) {
        await arena.locator(`[data-ba-from="${slot}"][data-ba-to="${slot - 1}"]`).click();
        slot--;
        check(await page.evaluate(() => document.activeElement.matches('.ba-reorder button')), 'Reorder lost keyboard focus');
      }
    }
  };
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    // Reload resets session progress so each viewport exercises a full run.
    await page.reload(); await page.locator('#battle-arena-tab').click();
    for (let i = 0; i < data.length; i++) {
      await roster(i);
      check(await hp('Monster') === '100', 'Monster must start at 100');
      check(await hp('Player') === '100', 'Player must start at 100');
      for (let n = 0; n < data[i].steps.length; n++) {
        const step = data[i].steps[n];
        await noOverflow();
        if (step.type === 'order') {
          // Repeated keyboard activation must retain the requested direction.
          const moving = await arena.locator('[data-ba-slot="0"]').getAttribute('data-ba-card');
          await arena.locator('[data-ba-from="0"][data-ba-to="1"]').focus();
          await page.keyboard.press('Enter');
          await page.keyboard.press('Enter');
          check(await arena.locator(`[data-ba-card="${moving}"]`).getAttribute('data-ba-slot') === '2', 'Repeated Down activation reversed direction');
          // Exercise actual HTML5 dragging, then keyboard-compatible buttons.
          const before = await arena.locator('[data-ba-card]').evaluateAll(cards => cards.map(c => c.dataset.baCard));
          await arena.locator('.ba-order').scrollIntoViewIfNeeded();
          await arena.locator('[data-ba-slot="0"]').dragTo(arena.locator('[data-ba-slot="1"]'), { sourcePosition: { x: 12, y: 12 }, targetPosition: { x: 12, y: 12 } });
          const after = await arena.locator('[data-ba-card]').evaluateAll(cards => cards.map(c => c.dataset.baCard));
          check(before.join() !== after.join(), 'Drag did not reorder cards');
          await sort();
          // Swap only the first two, leaving correct slots to highlight.
          await arena.locator('[data-ba-from="0"][data-ba-to="1"]').click();
          const submitted = await arena.locator('[data-ba-card]').evaluateAll(cards => cards.map(c => c.dataset.baCard));
          await action('strike').click();
          check(await arena.locator('.ba-slot-correct').count() === step.items.length - 2, 'Partial correct slots not highlighted');
          check(submitted.join() === (await arena.locator('[data-ba-card]').evaluateAll(cards => cards.map(c => c.dataset.baCard))).join(), 'Wrong submission reset cards');
          await sort(); await action('strike').click();
          check((await arena.locator('#ba-feedback').textContent()).includes('Combo!'), 'Missing combo celebration');
        } else {
          if (i === 0 && n === 0) {
            for (let hit = 0; hit < 7; hit++) await choose(step, true);
            check(await hp('Player') === '1', 'Missing 1-HP floor');
            check((await arena.locator('#ba-feedback').textContent()).includes('Hanging on at 1 HP'), 'Missing floor quip');
            await roster(1); await roster(0);
            check(await hp('Player') === '1', 'Roster lost HP state');
          }
          await choose(step);
          if (step.type === 'flaw') check((await arena.locator('#ba-feedback').textContent()).includes('Counter!'), 'Missing flaw feedback');
        }
        check(await hp('Monster') === String(Math.round(100 * (1 - (n + 1) / data[i].steps.length))), 'Wrong proportional damage');
        check(await arena.locator('.ba-log li').count() === n + 1, 'Log does not accumulate');
        check(await arena.locator('.katex-error').count() === 0, 'KaTeX error');
        check(await arena.locator('.ba-log .katex').count() > 0, 'Math missing from log');
        if (n + 1 < data[i].steps.length) await action('step').click();
      }
      await arena.locator('.ba-solution summary').click();
      await noOverflow();
      if (i === 0) {
        await action('route').click();
        check(await page.locator('#problem-canvas-view').isVisible(), 'Canvas route did not open');
        await page.locator('[data-action="arena"]').click();
        check(await arena.isVisible(), 'Canvas to Arena failed');
        await arena.locator('[data-ba-board="all"]').click();
        await roster(i);
        check(await hp('Monster') === '0', 'Navigation lost completed encounter');
      }
    }
    await action('next').click();
    check(await arena.locator('#ba-summary-title').isVisible(), 'Missing run summary');
    check((await arena.locator('.ba-results').textContent()).includes('13/13'), 'Clears counted incorrectly');
    const expectedClean = data.filter((e, i) => i !== 0 && !e.steps.some(s => s.type === 'order')).length;
    check(await arena.locator('.ba-results strong').nth(1).textContent() === `${expectedClean}/13`, 'Clean clears counted incorrectly');
    await action('retry').click();
    check(await hp('Player') === '100', 'Retry did not reset HP');
    check(await hp('Monster') === '100', 'Retry did not reset monster');
    await action('hint').click(); await action('reveal').click();
    check(await arena.locator('.ba-log li').count() === 1, 'Reveal did not log step');
    await action('step').click();
    check(await action('hint').isEnabled(), 'Hint was not reset for new step');
    await action('next').click();
    await arena.locator('[data-ba-board="pignotti"]').click();
    check(await arena.locator('[data-ba-encounter]').count() === 6, 'Pignotti roster filter');
    await arena.locator('[data-ba-board="palladino"]').click();
    check(await arena.locator('[data-ba-encounter]').count() === 7, 'Palladino roster filter');
    console.log(`PASS ${width}px: all 13 encounters, every turn, drag/drop, buttons, HP floor, log, roster, filters, retry, navigation, math, overflow`);
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  check(await arena.locator('.ba-opponent').evaluate(el => getComputedStyle(el).animationName) === 'none', 'Reduced motion ignored');
  check(errors.length === 0, errors.join('\n'));
  return 'PASS desktop 1440px and phone 390px: all 13 encounters, all turn types, DnD, reorder focus, partial slots, HP floor, roster, filters, retry, hints/reveals, math, navigation, no overflow, reduced motion and no browser errors';
}
