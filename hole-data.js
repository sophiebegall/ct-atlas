// Rabbit hole: the atlas as a tree you dive into, from "Control theory" down to single lemmas.
// Each entry: [id, parentId, hook]. The id is a card in data.js, except the few branch
// nodes defined in `extra` below. The hook is the question that makes you want to open the door.
// Edit this file to rearrange the hole. Cards keep their content in data.js.
(function () {
  const R = String.raw;
  const tree = [
    ['root', null, 'You can push a system around. Where can it go, and what is the best way to get there?'],

    // ───────── Controllability (Palladino)
    ['ctrl', 'root', 'Where can you get to?'],
    ['basics-topic', 'ctrl', 'What does "you can get there" even mean?'],
    ['reachable-set', 'basics-topic', 'From x₀, in time T: which points can you actually hit?'],
    ['global-ctrl', 'reachable-set', 'Can you get from anywhere to anywhere, eventually?'],
    ['complete-ctrl', 'global-ctrl', '…and in any time you like?'],
    ['local-ctrl', 'reachable-set', 'Can you at least move a little in every direction?'],
    ['stlc', 'local-ctrl', 'Even if you only have a split second?'],

    ['ctrl-linear', 'ctrl', 'x′ = Ax + Bu: where a rank check settles everything.'],
    ['linear-auto-topic', 'ctrl-linear', 'A and B constant: the cleanest yes/no answer in the course.'],
    ['kalman-cor', 'linear-auto-topic', 'One rank check decides controllability. Why does that work?'],
    ['kalman-thm', 'kalman-cor', 'Why is the reachable set exactly a span?'],
    ['kalman-matrix', 'kalman-thm', 'Why B, AB, A²B, … and why stop at Aⁿ⁻¹B?'],
    ['hautus', 'kalman-cor', 'The same condition in other disguises.'],
    ['linear-constrained', 'kalman-cor', 'What if u is not allowed to be huge?'],
    ['tv-topic', 'ctrl-linear', 'What if A and B change with time?'],
    ['gramian', 'tv-topic', 'One matrix that measures how hard the control can push.'],
    ['fundamental-matrix', 'gramian', 'How the uncontrolled system carries states forward.'],
    ['tv-constrained', 'gramian', 'Bounded controls again, now time-varying.'],
    ['bk-test', 'tv-topic', 'A Kalman test with derivatives instead of powers of A.'],

    ['ctrl-nonlinear', 'ctrl', 'Curved dynamics, no matrix to test. So what do you check?'],
    ['lin-topic', 'ctrl-nonlinear', 'Zoom in until the system looks linear.'],
    ['linearization-thm', 'lin-topic', 'If the linear approximation is controllable, is the real system?'],
    ['tech-lemma', 'linearization-thm', 'The derivative of "where you end up".'],
    ['lin-not-necessary', 'linearization-thm', 'And if the linearization fails, are you stuck?'],
    ['brockett', 'lin-not-necessary', 'A system that fails the linear test and is still controllable.'],
    ['lie-topic', 'ctrl-nonlinear', 'Forward, sideways, back, back: and you have moved somewhere new.'],
    ['lie-bracket', 'lie-topic', 'The new direction you get from wiggling.'],
    ['lie-limits', 'lie-bracket', 'Why does the wiggle move you by ε² and not ε?'],
    ['lie-rules', 'lie-bracket', 'How to compute brackets without pain.'],
    ['driftless-topic', 'ctrl-nonlinear', 'No drift: the system only moves when you push.'],
    ['chow-local', 'driftless-topic', 'Brackets span ℝⁿ ⇒ you can reach everything nearby.'],
    ['lie-algebra', 'chow-local', 'Keep bracketing until nothing new appears.'],
    ['chow-global', 'chow-local', 'From "everything nearby" to "everything".'],
    ['drift-topic', 'ctrl-nonlinear', 'Now the system moves even when you do not push.'],
    ['drift-unconstrained', 'drift-topic', 'With unbounded controls, can you simply overpower the drift?'],
    ['recurrent-drift', 'drift-topic', 'If the drift always brings you back, it is not your enemy.'],
    ['weakly-recurrent', 'recurrent-drift', 'What does "brings you back" mean, precisely?'],
    ['krener', 'drift-topic', 'No recurrence: what is left?'],
    ['krener-not-ctrl', 'krener', 'The reachable set has interior. Still not controllable?'],

    ['q2-topic', 'ctrl', 'How all of this turns into exam points (Q2).'],
    ['which-theorem', 'q2-topic', 'Given a system: which theorem do you reach for?'],
    ['q2-recipe', 'q2-topic', 'The recurrent-drift proof as a checklist.'],
    ['steering', 'q2-topic', 'Actually drive from A to B with explicit controls.'],

    // ───────── Optimal control (Pignotti)
    ['opt', 'root', 'You can get there. What is the best way?'],
    ['nc-topic', 'opt', 'Maximise ∫f subject to x′ = g. What must the best u satisfy?'],
    ['optimal-pair', 'nc-topic', 'What exactly counts as "best"?'],
    ['necessary-cond', 'nc-topic', 'Wiggle the optimal u a little: J cannot go up. What does that force?'],
    ['variation-lemma', 'necessary-cond', 'Why a small change in u gives a small change in x.'],
    ['hamiltonian', 'necessary-cond', 'Pack all the conditions into one function H.'],
    ['scheme', 'nc-topic', 'The 5-step recipe for actual problems.'],
    ['pmp-topic', 'opt', 'The big theorem of the course.'],
    ['pmp', 'pmp-topic', 'The optimal u maximises H at every single instant.'],
    ['pmp-concave', 'pmp', 'When the proof is short: concavity in u.'],
    ['pmp-min', 'pmp', 'Minimising instead of maximising?'],
    ['sufficient', 'pmp-topic', 'When are the conditions enough, not only necessary?'],
    ['ham-topic', 'opt', 'What does H do along the optimal path?'],
    ['ham-lipschitz', 'ham-topic', 'H along the optimum cannot jump.'],
    ['ham-constant', 'ham-lipschitz', 'No t in the problem ⇒ H is conserved. Like energy?'],
    ['dpp-topic', 'opt', 'Is the end piece of a best path itself a best path?'],
    ['dpp', 'dpp-topic', 'Tails of optimal controls are optimal. Why?'],
    ['dpp-unique', 'dpp', 'Does the tail inherit uniqueness too?'],
    ['dpp-head', 'dpp', 'And the beginning piece? Surprisingly, no.'],
    ['opt-variants', 'opt', 'Change the rules of the game: what breaks, what survives?'],
    ['payoff-topic', 'opt-variants', 'A reward for where you end up.'],
    ['transversality', 'payoff-topic', 'Add a final payoff: which single condition changes?'],
    ['pest', 'transversality', 'A worked example: controlling a pest population.'],
    ['bounded-topic', 'opt-variants', 'u ∈ [a, b]: the optimum can sit against a wall.'],
    ['bounded-conditions', 'bounded-topic', 'The sign of H_u tells you which wall.'],
    ['one-sided', 'bounded-conditions', 'At a wall you can only vary u in one direction.'],
    ['bang-bang', 'bounded-conditions', 'H linear in u: always slam to a bound.'],
    ['bounded-example', 'bounded-conditions', 'A worked example: first the bound, then the interior formula.'],
    ['rn-topic', 'opt-variants', 'Many states, a convex set of controls.'],
    ['adjoint-rn', 'rn-topic', 'The costate becomes a vector p(t).'],
    ['normal-cone-cond', 'rn-topic', 'One geometric condition that covers all the cases.'],
    ['normal-cone', 'normal-cone-cond', 'The directions that point out of a convex set.'],
    ['q3-topic', 'opt', 'How all of this turns into exam points (Q3).'],
    ['which-case', 'q3-topic', 'Given a problem: which case are you in?'],
    ['q3-traps', 'q3-topic', 'The mistakes that cost points.'],
  ];

  // Branch nodes that are not cards in data.js.
  const extra = {
    root: { title: 'Control theory', type: 'topic',
      intuition: R`<p>A control system is an ODE with a knob: the state moves according to the dynamics, and you choose the control \(u(t)\) from a set \(U\). Part I asks two questions about it.</p><p><strong>Controllability</strong> (Palladino): which states can you reach at all? <strong>Optimal control</strong> (Pignotti): among the controls that work, which one is best for a given payoff?</p>`,
      precise: R`<p>\(x'(t)=f(x(t),u(t))\), \(x(0)=x_0\), \(u(t)\in U\subseteq\mathbb R^m\). Each admissible control \(u\) gives a trajectory \(x^u\).</p><p><small>Notation: Palladino writes the dynamics as \(f\). Pignotti writes them as \(g(t,x,u)\) and uses \(f\) for the running payoff.</small></p>` },
    ctrl: { title: 'Controllability', type: 'topic', chapter: '1',
      intuition: R`<p>Fix a start \(x_0\). Every control gives a path, and the endpoints at time \(T\) form the <em>reachable set</em>. Controllability asks how big that set is: everything (global), or at least a neighbourhood (local).</p><p>The tool depends on the system. Linear: a rank test. Nonlinear: linearise at an equilibrium, or use Lie brackets.</p>` },
    'ctrl-linear': { title: 'Linear systems', type: 'topic', chapter: '1',
      intuition: R`<p>For \(x'=Ax+Bu\) the reachable set from \(0\) is a linear subspace, so controllability becomes linear algebra. Constant \(A,B\): Kalman. Time-varying: the Gramian or the \(B_k\) test.</p>` },
    'ctrl-nonlinear': { title: 'Nonlinear systems', type: 'topic', chapter: '1',
      intuition: R`<p>Two tools. (1) Linearise at an equilibrium and check Kalman: sufficient, not necessary. (2) Lie brackets: alternating pushes along \(g_1\) and \(g_2\) create motion in the new direction \([g_1,g_2]\). If the brackets span \(\mathbb R^n\), you can move in every direction (Chow–Rashevskii). With drift you need more: recurrence, or you only get Krener's weaker conclusion.</p>` },
    opt: { title: 'Optimal control', type: 'topic', chapter: '2',
      intuition: R`<p>Now there is a payoff \(J(u)=\int_{t_0}^{t_1} f(t,x,u)\,dt\) to maximise, subject to \(x'=g(t,x,u)\). The key idea is a costate \(\lambda(t)\) that puts a price on the state. Everything gets packed into the Hamiltonian \(H=f+\lambda g\): the optimal \(u\) maximises \(H\), and \(\lambda'=-H_x\).</p><p>Then: when are these conditions enough, what does \(H\) do along the optimum, why tails of optimal paths are optimal, and what changes when the rules change.</p>` },
    'opt-variants': { title: 'Changing the rules', type: 'topic', chapter: '2',
      intuition: R`<p>Three changes to the basic problem. A final payoff \(\varphi(x(t_1))\) changes only the end condition for \(\lambda\). Bounds \(a\le u\le b\) turn \(H_u=0\) into sign conditions. States in \(\mathbb R^n\) make the costate a vector \(p\), and the condition on \(u\) becomes a normal-cone condition.</p>` },
  };

  // Which flashcard to open when you "dive in" from a flashcard.
  const cardHome = { P1: 'local-ctrl', P2: 'global-ctrl', P3: 'kalman-cor', P4: 'gramian', P5: 'linearization-thm', P6: 'lie-bracket', P7: 'chow-local', P8: 'weakly-recurrent', P9: 'recurrent-drift', P10: 'krener', G1: 'necessary-cond', G2: 'pmp', G3: 'sufficient', G4: 'dpp', G5: 'ham-lipschitz', G6: 'ham-constant', G7: 'transversality', G8: 'bounded-conditions' };

  // Words in the text that become links to a room. Case-insensitive, whole words, first mention per page.
  // Longer phrases win over shorter ones ("Kalman matrix" before "Kalman").
  const terms = {
    'reachable set': 'reachable-set', 'reachable sets': 'reachable-set',
    'global controllability': 'global-ctrl', 'globally controllable': 'global-ctrl',
    'complete controllability': 'complete-ctrl', 'completely controllable': 'complete-ctrl',
    'local controllability': 'local-ctrl', 'locally controllable': 'local-ctrl',
    'small-time local controllability': 'stlc', 'STLC': 'stlc',
    'controllability': 'ctrl',
    'Kalman matrix': 'kalman-matrix', 'controllability matrix': 'kalman-matrix',
    'Kalman rank condition': 'kalman-cor', 'Kalman condition': 'kalman-cor', 'Kalman': 'kalman-cor',
    'Hautus': 'hautus',
    'fundamental matrix': 'fundamental-matrix', 'Gramian': 'gramian',
    'linearization theorem': 'linearization-thm', 'linearization': 'lin-topic', 'linearisation': 'lin-topic', 'linearise': 'lin-topic', 'linearize': 'lin-topic', 'linearized system': 'lin-topic', 'linearised system': 'lin-topic',
    'endpoint map': 'tech-lemma',
    'Brockett': 'brockett',
    'Lie brackets': 'lie-bracket', 'Lie bracket': 'lie-bracket', 'brackets': 'lie-bracket',
    'Lie algebra': 'lie-algebra',
    'Chow–Rashevskii': 'chow-local', 'Chow-Rashevskii': 'chow-local', 'Chow': 'chow-local',
    'driftless': 'driftless-topic', 'systems with drift': 'drift-topic',
    'weakly recurrent': 'weakly-recurrent', 'recurrent': 'weakly-recurrent', 'recurrence': 'weakly-recurrent',
    'Krener': 'krener',
    'piecewise-constant controls': 'steering', 'steering': 'steering',
    'optimal control': 'opt', 'optimal pair': 'optimal-pair', 'optimal pairs': 'optimal-pair',
    'necessary conditions': 'necessary-cond', 'costate': 'necessary-cond',
    'Gronwall': 'variation-lemma',
    'Hamiltonian': 'hamiltonian',
    'Pontryagin': 'pmp', 'maximum principle': 'pmp', 'PMP': 'pmp',
    'sufficient conditions': 'sufficient',
    'dynamic programming': 'dpp', 'DPP': 'dpp',
    'transversality': 'transversality', 'final payoff': 'payoff-topic',
    'bang-bang': 'bang-bang', 'normal cone': 'normal-cone', 'adjoint equation': 'adjoint-rn',
    'bounded controls': 'bounded-topic', 'bounds on the control': 'bounded-topic',
  };

  window.CT_HOLE_DATA = { tree: tree.map(([id, parent, hook]) => ({ id, parent, hook })), extra, cardHome, terms };
})();
