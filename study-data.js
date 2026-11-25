// Dedicated Part I Exam Flashcards (strictly the 18 official items)
// and Isolated Homework Problem Sets (organized by date & sheet, with hints & answers).
// Uses KaTeX delimiters \( ... \) and \[ ... \].

window.CT_EXAM_CARDS = [
  // ===================== PALLADINO (10 ITEMS: 2 WITH PROOF, 8 NO PROOF) =====================
  {
    id: 'P1',
    prof: 'palladino',
    profLabel: 'Prof. Palladino',
    withProof: false,
    dates: '2026-09-21 & 2026-09-28',
    title: 'Definition of Local Controllability & STLC',
    prompt: 'State the definition of <strong>local controllability (in time \\(T\\))</strong> and <strong>small-time local controllability (STLC)</strong> at an equilibrium \\((\\bar x, \\bar u)\\).',
    statement: '<p>Let \\((\\bar x, \\bar u)\\) be an equilibrium of \\(x\' = f(x,u)\\), i.e., \\(f(\\bar x, \\bar u) = 0\\). The system is <strong>locally controllable in time \\(T\\)</strong> at \\(\\bar x\\) if</p>\\[\\bar x \\in \\operatorname{int} \\mathcal{R}_{\\bar x}(T),\\]<p>meaning there exists a neighborhood of \\(\\bar x\\) whose points can all be reached from \\(\\bar x\\) in time \\(T\\) (equivalently, steered to \\(\\bar x\\)).</p><p>It is <strong>small-time locally controllable (STLC)</strong> if \\(\\bar x \\in \\operatorname{int} \\mathcal{R}_{\\bar x}(T)\\) holds for <strong>every \\(T > 0\\)</strong>.</p>',
    notes: '<p><strong>Stronger version (if time):</strong> for every \\(\\varepsilon > 0\\) there exists \\(\\delta > 0\\) such that any \\(x_0, x_1 \\in B(\\bar x, \\delta)\\) can be joined in time \\(T\\) by an admissible control with \\(\\|u - \\bar u\\|_{L^\\infty} < \\varepsilon\\).</p>'
  },
  {
    id: 'P2',
    prof: 'palladino',
    profLabel: 'Prof. Palladino',
    withProof: false,
    dates: '2026-09-21 & 2026-09-28',
    title: 'Definition of Global Controllability',
    prompt: 'State the definition of <strong>global controllability</strong> for \\(x\' = f(x,u)\\), \\(x \\in \\mathbb{R}^n\\), \\(u \\in U\\).',
    statement: '<p>The system is <strong>globally controllable</strong> if for all \\(x_0, x_1 \\in \\mathbb{R}^n\\) there exist \\(T > 0\\) and an admissible control \\(u : [0,T] \\to U\\) whose trajectory starting from \\(x(0) = x_0\\) satisfies \\(x(T) = x_1\\). Equivalently:</p>\\[\\bigcup_{T > 0} \\mathcal{R}_{x_0}(T) = \\mathbb{R}^n \\qquad \\forall\\, x_0 \\in \\mathbb{R}^n.\\]',
    notes: '<p><strong>Complete controllability:</strong> stronger requirement where the time \\(T > 0\\) can be chosen arbitrarily small (every target reachable in any given time \\(T > 0\\), as in unconstrained controllable linear systems).</p>'
  },
  {
    id: 'P3',
    prof: 'palladino',
    profLabel: 'Prof. Palladino',
    withProof: true,
    dates: '2026-09-28',
    title: 'Global Controllability of Autonomous Linear Systems (Kalman Rank Condition)',
    prompt: 'State and <strong>prove</strong> (using the <strong>orthogonal-complement / subspace proof</strong>) the <strong>Kalman rank condition</strong> for \\(x\' = Ax + Bu\\), \\(A \\in \\mathbb{R}^{n\\times n}\\), \\(B \\in \\mathbb{R}^{n\\times m}\\), \\(u \\in \\mathbb{R}^m\\).',
    statement: '<p>Let \\(x\' = Ax + Bu\\) with \\(u \\in \\mathbb{R}^m\\) unconstrained and \\(x(0) = 0\\). Define the Kalman controllability matrix \\(C(A,B) = [B \\mid AB \\mid A^2B \\mid \\cdots \\mid A^{n-1}B]\\). Then for every \\(T > 0\\):</p>\\[\\mathcal{R}_0(T) = \\operatorname{Im} C(A,B) = \\operatorname{span}\\{A^k b_j : 0 \\le k \\le n-1,\\; 1 \\le j \\le m\\}.\\]<p>In particular, the system is globally controllable (in any time \\(T > 0\\)) <strong>if and only if</strong> \\(\\operatorname{rank} C(A,B) = n\\).</p>',
    proof: '<ol><li><strong>Subspace &amp; orthogonal complement:</strong> By linearity of the variation-of-constants formula \\(x_u(T) = \\int_0^T e^{(T-s)A}Bu(s)\\,ds\\), \\(\\mathcal{R}_0(T)\\) is a linear subspace of \\(\\mathbb{R}^n\\). To prove \\(\\mathcal{R}_0(T) = \\operatorname{Im} C(A,B)\\), it suffices to show their orthogonal complements coincide: \\[p \\perp \\mathcal{R}_0(T) \\iff p^\\top A^k b_j = 0 \\quad \\forall\\, 0 \\le k \\le n-1,\\; 1 \\le j \\le m.\\]</li><li><strong>(\\(\\Leftarrow\\)) Cayley–Hamilton:</strong> Suppose \\(p^\\top A^k b_j = 0\\) for all \\(k = 0, \\dots, n-1\\) and all \\(j\\). By the Cayley–Hamilton theorem, \\(A^n = \\sum_{i=0}^{n-1} c_i A^i\\), so by induction \\(A^k\\) is a linear combination of \\(I, A, \\dots, A^{n-1}\\) for every \\(k \\ge n\\). Hence \\(p^\\top A^k b_j = 0\\) for all \\(k \\ge 0\\), and by the power series of the matrix exponential, \\(p^\\top e^{tA} b_j = 0\\) for all \\(t \\in \\mathbb{R}\\). Therefore, for any control \\(u\\), \\[p^\\top x_u(T) = \\int_0^T \\sum_{j=1}^m p^\\top e^{(T-s)A} b_j u_j(s)\\,ds = 0,\\] so \\(p \\perp \\mathcal{R}_0(T)\\).</li><li><strong>(\\(\\Rightarrow\\)) Differentiating at \\(t=0\\):</strong> Suppose \\(p \\perp \\mathcal{R}_0(T)\\). For any \\(t \\in [0,T]\\) and any constant control \\(u \\equiv e_j\\) (the \\(j\\)-th standard basis vector), wait until \\(T-t\\) with \\(u=0\\) and then apply \\(e_j\\) on \\([T-t, T]\\) (or note \\(\\mathcal{R}_0(t) \\subseteq \\mathcal{R}_0(T)\\)): thus \\(p^\\top x(t) = 0\\) for all \\(t \\in [0,T]\\), where \\(x\' = Ax + b_j\\), \\(x(0)=0\\). Differentiating repeatedly w.r.t. \\(t\\): \\[0 = p^\\top x\'(t) = p^\\top(Ax(t) + b_j), \\quad 0 = p^\\top x\'\'(t) = p^\\top A(Ax(t)+b_j), \\quad \\dots, \\quad 0 = p^\\top x^{(k+1)}(t) = p^\\top A^k(Ax(t)+b_j).\\] Evaluating at \\(t = 0\\) (where \\(x(0) = 0\\)) yields \\(p^\\top A^k b_j = 0\\) for all \\(k \\ge 0\\) and all \\(j\\).</li><li><strong>Conclusion:</strong> \\(\\mathcal{R}_0(T)^\\perp = (\\operatorname{Im} C(A,B))^\\perp\\), so \\(\\mathcal{R}_0(T) = \\operatorname{Im} C(A,B)\\). Steering from any \\(x_0\\) to \\(x_1\\) means \\(x_1 - e^{TA}x_0 \\in \\mathcal{R}_0(T)\\), which holds for all \\(x_0, x_1\\) iff \\(\\operatorname{rank} C(A,B) = n\\). \\(\\blacksquare\\)</li></ol>',
    notes: '<p><strong>Bounded controls:</strong> If \\(0 \\in \\operatorname{int} U\\) and \\(\\operatorname{rank} C(A,B) = n\\), the system is <em>locally</em> controllable (STLC), not necessarily globally controllable.</p>'
  },
  {
    id: 'P4',
    prof: 'palladino',
    profLabel: 'Prof. Palladino',
    withProof: false,
    dates: '2026-09-28 & 2026-10-01',
    title: 'Global Controllability of Non-Autonomous Linear Systems',
    prompt: 'For \\(x\' = A(t)x + B(t)u\\) on \\([t_0, t_1]\\) with state-transition matrix \\(\\Phi(t,s)\\), state both the <strong>Gramian criterion</strong> and the <strong>\\(B_k\\) differential rank condition</strong>.',
    statement: '<p><strong>1. Gramian criterion:</strong> The system is controllable on \\([t_0, t_1]\\) <strong>if and only if</strong> the controllability Gramian</p>\\[G(t_0, t_1) = \\int_{t_0}^{t_1} \\Phi(t_0, s) B(s) B(s)^\\top \\Phi(t_0, s)^\\top\\,ds\\]<p>is invertible. (Steering control: \\(u(s) = B(s)^\\top \\Phi(t_0, s)^\\top G(t_0,t_1)^{-1}(\\Phi(t_0,t_1)x_1 - x_0)\\).)</p><p><strong>2. Differential rank condition (\\(B_k\\) test):</strong> Assume \\(A, B \\in C^{n-1}\\). Define recursively \\(B_0(t) = B(t)\\) and \\(B_k(t) = A(t)B_{k-1}(t) - B\'_{k-1}(t)\\). If there exists \\(\\bar t \\in [t_0, t_1]\\) such that</p>\\[\\operatorname{rank}[B_0(\\bar t) \\mid B_1(\\bar t) \\mid \\cdots \\mid B_{n-1}(\\bar t)] = n,\\]<p>then the system is controllable on \\([t_0, t_1]\\). If \\(A, B\\) are <strong>analytic</strong>, this condition is also <strong>necessary</strong> (for some \\(\\bar t\\)).</p>',
    notes: '<p><strong>Key identity:</strong> \\(\\frac{d^k}{dt^k}[\\Phi(t_0, t)B(t)] = (-1)^k \\Phi(t_0, t) B_k(t)\\).</p>'
  },
  {
    id: 'P5',
    prof: 'palladino',
    profLabel: 'Prof. Palladino',
    withProof: true,
    dates: '2026-10-05',
    title: 'Local Controllability of Nonlinear Systems by Linearization',
    prompt: 'State and <strong>prove</strong> the theorem on <strong>local controllability (STLC) of nonlinear systems by linearization</strong> at an equilibrium \\((\\bar x, \\bar u)\\).',
    statement: '<p>Let \\(x\' = f(x,u)\\) with \\(f \\in C^1\\), \\(f(\\bar x, \\bar u) = 0\\), and <strong>\\(\\bar u \\in \\operatorname{int} U\\)</strong>. Set \\(A = \\partial_x f(\\bar x, \\bar u)\\) and \\(B = \\partial_u f(\\bar x, \\bar u)\\). If</p>\\[\\operatorname{rank}[B \\mid AB \\mid \\cdots \\mid A^{n-1}B] = n,\\]<p>then the nonlinear system is <strong>STLC</strong> at \\((\\bar x, \\bar u)\\): \\(\\bar x \\in \\operatorname{int} \\mathcal{R}_{\\bar x}(T)\\) for every \\(T > 0\\).</p>',
    proof: '<ol><li><strong>End-point map:</strong> Fix \\(T > 0\\). For \\(u \\in L^\\infty([0,T]; \\mathbb{R}^m)\\) near the constant control \\(\\bar u\\) (admissible since \\(\\bar u \\in \\operatorname{int} U\\)), define \\(E_T(u) = x_u(T)\\), where \\(x_u\' = f(x_u, u)\\), \\(x_u(0) = \\bar x\\). By differentiable dependence on data (Gronwall), \\(E_T\\) is \\(C^1\\) near \\(\\bar u\\) and \\(E_T(\\bar u) = \\bar x\\).</li><li><strong>Derivative of \\(E_T\\):</strong> The directional derivative in direction \\(v\\) is \\(dE_T(\\bar u)v = y(T)\\), where \\(y\' = Ay + Bv\\), \\(y(0) = 0\\), i.e., \\[dE_T(\\bar u)v = \\int_0^T e^{(T-s)A} B v(s)\\,ds.\\]</li><li><strong>Surjectivity via Kalman:</strong> By P3, \\(\\operatorname{rank} C(A,B) = n\\) implies the linear system is controllable on \\([0,T]\\), so \\(dE_T(\\bar u)\\) is surjective onto \\(\\mathbb{R}^n\\).</li><li><strong>Inverse Function Theorem:</strong> Choose \\(v_1, \\dots, v_n\\) such that \\(y_i = dE_T(\\bar u)v_i\\) form a basis of \\(\\mathbb{R}^n\\), and define \\(F : \\mathbb{R}^n \\to \\mathbb{R}^n\\) by \\(F(a) = E_T\\bigl(\\bar u + \\sum_{i=1}^n a_i v_i\\bigr)\\). Then \\(F(0) = \\bar x\\) and \\(DF(0) = [y_1 \\cdots y_n]\\) is invertible. By the Inverse Function Theorem, \\(F\\) maps a small neighborhood of \\(0\\) onto a neighborhood of \\(\\bar x\\). For small \\(a\\), \\(\\bar u + \\sum a_i v_i \\in U\\) because \\(\\bar u \\in \\operatorname{int} U\\), so \\(\\bar x \\in \\operatorname{int} \\mathcal{R}_{\\bar x}(T)\\). \\(\\blacksquare\\)</li></ol>',
    notes: '<p><strong>Remark:</strong> Linearization is only <em>sufficient</em>, not necessary (e.g., Brockett integrator or \\(\\dot x = y^3, \\dot y = u\\) fail Kalman yet are controllable via Lie brackets).</p>'
  },
  {
    id: 'P6',
    prof: 'palladino',
    profLabel: 'Prof. Palladino',
    withProof: false,
    dates: '2026-10-12',
    title: 'Lie Brackets and Their Limit Characterizations',
    prompt: 'Define the <strong>Lie bracket</strong> \\([f,g](x)\\) of smooth vector fields \\(f,g\\) on \\(\\mathbb{R}^n\\), and state its <strong>two limit characterizations</strong> using the flows \\(\\Phi_t^f, \\Phi_t^g\\).',
    statement: '<p><strong>Definition:</strong> For smooth vector fields \\(f, g : \\mathbb{R}^n \\to \\mathbb{R}^n\\),</p>\\[[f, g](x) = Dg(x)\\,f(x) - Df(x)\\,g(x).\\]<p><strong>Limit characterizations:</strong></p><ol><li><strong>Derivative of \\(g\\) along the flow of \\(f\\):</strong>\\[[f,g](x) = \\lim_{t\\to 0} \\frac{D\\Phi_{-t}^f\\bigl(\\Phi_t^f(x)\\bigr)\\,g\\bigl(\\Phi_t^f(x)\\bigr) - g(x)}{t}.\\]</li><li><strong>Commutator of flows:</strong>\\[\\Phi_{-t}^g \\circ \\Phi_{-t}^f \\circ \\Phi_t^g \\circ \\Phi_t^f(x) = x + t^2 [f,g](x) + o(t^2).\\]</li></ol>',
    notes: '<p><strong>Geometric meaning:</strong> \\([f,g] = 0\\) iff the flows commute; otherwise switching back and forth between \\(f\\) and \\(g\\) produces second-order motion in the new direction \\([f,g]\\).</p>'
  },
  {
    id: 'P7',
    prof: 'palladino',
    profLabel: 'Prof. Palladino',
    withProof: false,
    dates: '2026-10-12',
    title: 'Chow–Rashevskii Theorem',
    prompt: 'State the <strong>Chow–Rashevskii Theorem</strong> for driftless control-affine systems.',
    statement: '<p>Consider the driftless control-affine system on a connected manifold (e.g. \\(\\mathbb{R}^n\\)):</p>\\[x\' = \\sum_{i=1}^m u_i\\, g_i(x), \\qquad g_i \\text{ smooth}, \\quad u \\in U = \\mathbb{R}^m.\\]<p>Let \\(\\mathcal{L}\\) be the Lie algebra generated by \\(g_1, \\dots, g_m\\) (all iterated Lie brackets). If the Lie Algebra Rank Condition (LARC) holds everywhere:</p>\\[\\operatorname{span} \\mathcal{L}(x) = \\mathbb{R}^n \\qquad \\forall\\, x,\\]<p>then the system is <strong>globally controllable in any time \\(T > 0\\)</strong>: for all \\(x_0, x_1\\) and every \\(T > 0\\) there is a control steering \\(x_0\\) to \\(x_1\\) in time \\(T\\) (in particular, \\(x_0 \\in \\operatorname{int} \\mathcal{R}_{x_0}(T)\\)).</p>',
    notes: '<p><strong>Classic example:</strong> Brockett\'s nonholonomic integrator \\(\\dot x_1 = u_1, \\dot x_2 = u_2, \\dot x_3 = x_1 u_2 - x_2 u_1\\) has \\([g_1, g_2] = (0,0,2)^\\top\\), spanning \\(\\mathbb{R}^3\\).</p>'
  },
  {
    id: 'P8',
    prof: 'palladino',
    profLabel: 'Prof. Palladino',
    withProof: false,
    dates: '2026-10-26',
    title: 'Definition of a Weakly Recurrent Vector Field',
    prompt: 'Define a <strong>weakly recurrent</strong> vector field \\(f\\) on \\(\\mathbb{R}^n\\) and give a standard example.',
    statement: '<p>A smooth vector field \\(f\\) on \\(\\mathbb{R}^n\\) is <strong>weakly recurrent</strong> if for every \\(x_0 \\in \\mathbb{R}^n\\), every neighborhood \\(V\\) of \\(x_0\\), and every \\(t > 0\\), there exist \\(\\bar x \\in V\\) and \\(t^* > t\\) such that</p>\\[\\Phi_{t^*}^f(\\bar x) \\in V.\\]<p>(The flow of \\(f\\) returns arbitrarily close to every point at arbitrarily large times.)</p>',
    notes: '<p><strong>Example:</strong> Any periodic flow, such as the planar rotation \\(f(x) = \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix} x\\).</p>'
  },
  {
    id: 'P9',
    prof: 'palladino',
    profLabel: 'Prof. Palladino',
    withProof: false,
    dates: '2026-10-26',
    title: 'Controllability of Control-Affine Systems with Recurrent Drift',
    prompt: 'State the global controllability theorem for nonlinear <strong>control-affine systems with weakly recurrent drift</strong>: \\(x\' = f(x) + \\sum_{i=1}^m u_i g_i(x)\\), \\(u \\in U \\subseteq \\mathbb{R}^m\\).',
    statement: '<p>Assume:</p><ul><li>\\(f, g_1, \\dots, g_m\\) are smooth;</li><li><strong>\\(0 \\in \\operatorname{int} U\\)</strong>;</li><li>\\(f\\) is <strong>weakly recurrent</strong>;</li><li>\\(\\operatorname{span} \\mathcal{L}_f(x) = \\mathbb{R}^n\\) for every \\(x \\in \\mathbb{R}^n\\), where \\(\\mathcal{L}_f\\) is the Lie algebra generated by \\(f, g_1, \\dots, g_m\\).</li></ul><p>Then the system is <strong>globally controllable</strong>:</p>\\[\\bigcup_{T > 0} \\mathcal{R}_{x_0}(T) = \\mathbb{R}^n \\qquad \\forall\\, x_0 \\in \\mathbb{R}^n.\\]',
    notes: '<p><strong>Unconstrained variant:</strong> If \\(U = \\mathbb{R}^m\\) and the Lie algebra generated by \\(g_1, \\dots, g_m\\) alone has full rank, the system is controllable even with non-recurrent drift (using arbitrarily large controls to overpower \\(f\\)).</p>'
  },
  {
    id: 'P10',
    prof: 'palladino',
    profLabel: 'Prof. Palladino',
    withProof: false,
    dates: '2026-10-26',
    title: "Krener's Theorem",
    prompt: "State <strong>Krener's Theorem</strong> for control-affine systems and explain the crucial <strong>warning</strong> (with counterexample) on why it does <em>not</em> imply STLC.",
    statement: '<p>Let \\(x\' = f(x) + \\sum_{i=1}^m u_i g_i(x)\\) with \\(f, g_1, \\dots, g_m\\) smooth, <strong>\\(0 \\in \\operatorname{int} U\\)</strong>, and \\(\\operatorname{span} \\mathcal{L}_f(x) = \\mathbb{R}^n\\) for every \\(x\\). Then for every \\(T > 0\\):</p>\\[\\operatorname{int}\\!\\left(\\bigcup_{0 \\le t \\le T} \\mathcal{R}_{\\bar x}(t)\\right) \\neq \\emptyset \\qquad \\text{and} \\qquad \\bar x \\in \\overline{\\operatorname{int} \\mathcal{R}_{\\bar x}(\\le T)}.\\]',
    notes: '<p><strong>Warning:</strong> Krener does <strong>NOT</strong> say \\(\\bar x \\in \\operatorname{int} \\mathcal{R}_{\\bar x}(T)\\) (STLC requires an extra argument, such as direct computation). <strong>Counterexample:</strong> \\(x\' = 1,\\; y\' = u\\) satisfies full rank (\\(f=(1,0)^\\top, g=(0,1)^\\top\\)), yet the reachable set is a forward cone \\(x \\ge x_0\\), not a neighborhood of \\(\\bar x\\).</p>'
  },

  // ===================== PIGNOTTI (8 ITEMS: 4 WITH PROOF, 4 NO PROOF) =====================
  {
    id: 'G1',
    prof: 'pignotti',
    profLabel: 'Prof. Pignotti',
    withProof: true,
    dates: '2026-10-08 & 2026-10-15',
    title: 'Optimality Conditions in the Scalar Case',
    prompt: 'State the basic unconstrained scalar optimal control problem, state and <strong>prove</strong> the <strong>first-order necessary optimality conditions</strong> (including uniform convergence via Gronwall), and write the Hamiltonian form and 5-step solving scheme.',
    statement: '<p>Consider \\(\\max_u J(u) = \\int_{t_0}^{t_1} f(t, x^u(t), u(t))\\,dt\\) subject to \\(x\' = g(t,x,u)\\), \\(x(t_0) = x_0\\), with \\(f,g \\in C^1\\) and \\(u\\) piecewise continuous. If \\((x^*, u^*)\\) is optimal, there exists a piecewise differentiable costate \\(\\lambda : [t_0, t_1] \\to \\mathbb{R}\\) such that, with \\(H(t,x,u,\\lambda) = f + \\lambda g\\):</p>\\[H_u(t,x^*,u^*,\\lambda) = f_u + \\lambda g_u = 0, \\qquad \\begin{cases} \\lambda\' = -H_x = -f_x - \\lambda g_x, \\\\ \\lambda(t_1) = 0, \\end{cases} \\qquad \\begin{cases} x^{*\\prime} = H_\\lambda = g, \\\\ x^*(t_0) = x_0. \\end{cases}\\]',
    proof: '<ol><li><strong>Control variation &amp; Gronwall lemma:</strong> Take bounded piecewise continuous \\(h\\) (\\(|h|\\le M\\)), \\(u_\\varepsilon = u^* + \\varepsilon h\\), \\(x_\\varepsilon = x^{u_\\varepsilon}\\). Using the integral ODE and MVT on \\(g \\in C^1\\), \\(|x_\\varepsilon(t) - x^*(t)| \\le CM(t_1-t_0)|\\varepsilon| + C\\int_{t_0}^t |x_\\varepsilon - x^*|\\,ds\\). By <strong>Gronwall\'s Lemma</strong>, \\(|x_\\varepsilon(t) - x^*(t)| \\le CM(t_1-t_0)e^{C(t_1-t_0)}|\\varepsilon|\\), so \\(x_\\varepsilon \\to x^*\\) uniformly (justifying differentiation under the integral).</li><li><strong>First variation:</strong> Since \\(u\\) is unconstrained, \\(\\varepsilon \\mapsto J(u_\\varepsilon)\\) has an extremum at \\(\\varepsilon = 0\\), so \\(\\left.\\frac{d}{d\\varepsilon}J(u_\\varepsilon)\\right|_{\\varepsilon=0} = 0\\).</li><li><strong>Add zero identity with costate \\(\\lambda\\):</strong> For any piecewise differentiable \\(\\lambda\\), \\(\\int_{t_0}^{t_1}(\\lambda x_\\varepsilon)\'\\,dt - \\lambda(t_1)x_\\varepsilon(t_1) + \\lambda(t_0)x_0 = 0\\). Adding this to \\(J(u_\\varepsilon)\\) and using \\(x_\\varepsilon\' = g\\): \\[J(u_\\varepsilon) = \\int_{t_0}^{t_1} \\bigl[f(t,x_\\varepsilon,u_\\varepsilon) + \\lambda\' x_\\varepsilon + \\lambda g(t,x_\\varepsilon,u_\\varepsilon)\\bigr]\\,dt - \\lambda(t_1)x_\\varepsilon(t_1) + \\lambda(t_0)x_0.\\]</li><li><strong>Differentiate at \\(\\varepsilon=0\\):</strong> \\[0 = \\int_{t_0}^{t_1} \\Bigl[(f_x + \\lambda\' + \\lambda g_x)\\left.\\partial_\\varepsilon x_\\varepsilon\\right|_0 + (f_u + \\lambda g_u)h\\Bigr]\\,dt - \\lambda(t_1)\\left.\\partial_\\varepsilon x_\\varepsilon(t_1)\\right|_0.\\]</li><li><strong>Cancel state variation:</strong> Choose \\(\\lambda\\) solving \\(\\lambda\' = -f_x - \\lambda g_x\\), \\(\\lambda(t_1) = 0\\). Then \\(\\int_{t_0}^{t_1}(f_u + \\lambda g_u)h\\,dt = 0\\) for all \\(h\\). Taking \\(h = f_u + \\lambda g_u\\) gives \\(\\int_{t_0}^{t_1}(f_u + \\lambda g_u)^2\\,dt = 0\\), hence \\(f_u + \\lambda g_u = 0\\) at continuity points (a.e.). \\(\\blacksquare\\)</li></ol>',
    notes: '<p><strong>5-step scheme:</strong> (1) write \\(H_u = 0\\); (2) solve \\(u^* = u^*(x^*,\\lambda)\\); (3) plug into BVP for \\((x^*,\\lambda)\\); (4) solve BVP with \\(x^*(t_0)=x_0, \\lambda(t_1)=0\\); (5) recover \\(u^*\\). Same equations hold for minimization.</p>'
  },
  {
    id: 'G2',
    prof: 'pignotti',
    profLabel: 'Prof. Pignotti',
    withProof: true,
    dates: '2026-10-15',
    title: 'Pontryagin Maximum Principle: General Statement & Proof Under Concavity / Convexity',
    prompt: 'State the general <strong>Pontryagin Maximum Principle (PMP)</strong>, and <strong>prove</strong> it under <strong>concavity</strong> assumptions w.r.t. \\(u\\) (maximization) and <strong>convexity</strong> assumptions w.r.t. \\(u\\) (minimization).',
    statement: '<p><strong>General PMP (Maximization):</strong> Let \\(f, g \\in C^1\\) and let \\((x^*, u^*)\\) be optimal (with \\(u(t) \\in U \\subseteq \\mathbb{R}\\)). Then there exists a piecewise differentiable \\(\\lambda : [t_0,t_1] \\to \\mathbb{R}\\) such that, with \\(H(t,x,u,\\lambda) = f + \\lambda g\\):</p><ul><li>(i) \\(x^{*\\prime} = H_\\lambda = g(t,x^*,u^*)\\), \\(x^*(t_0) = x_0\\);</li><li>(ii) \\(\\lambda\' = -H_x(t,x^*,u^*,\\lambda)\\), \\(\\lambda(t_1) = 0\\);</li><li>(iii) \\(H(t, x^*(t), u, \\lambda(t)) \\le H(t, x^*(t), u^*(t), \\lambda(t))\\) for all admissible \\(u \\in U\\) (at continuity points of \\(u^*\\)). <em>(For minimization with \\(H=f+\\lambda g\\), reverse to \\(H^* \\le H\\).)</em></li></ul>',
    proof: '<ol><li><strong>Hypotheses (maximization):</strong> Assume \\(f, g \\in C^1\\) are <strong>concave in \\(u\\)</strong>, \\(H_u(t,x^*,u^*,\\lambda) = 0\\) (from G1), and <strong>\\(\\lambda(t) \\ge 0\\)</strong> (no sign needed if \\(g\\) is affine in \\(u\\)).</li><li><strong>Tangent-line inequalities:</strong> Since a \\(C^1\\) concave function lies below its tangent line, \\[f(t,x^*,u^*) - f(t,x^*,u) \\ge f_u(t,x^*,u^*)(u^* - u),\\] \\[g(t,x^*,u^*) - g(t,x^*,u) \\ge g_u(t,x^*,u^*)(u^* - u).\\]</li><li><strong>Combine using \\(\\lambda \\ge 0\\):</strong> Multiply the second inequality by \\(\\lambda(t) \\ge 0\\) and add: \\[H(\\dots, u^*) - H(\\dots, u) = (f^* - f) + \\lambda(g^* - g) \\ge (f_u^* + \\lambda g_u^*)(u^* - u) = H_u^*(u^* - u) = 0.\\] Thus \\(H(t,x^*,u,\\lambda) \\le H(t,x^*,u^*,\\lambda)\\). \\(\\blacksquare\\)</li></ol>',
    notes: '<p><strong>Minimization version (Convexity):</strong> Assume \\(f,g\\) are <strong>convex in \\(u\\)</strong> and \\(\\lambda(t) \\ge 0\\). Both tangent inequalities reverse, giving \\(H^* - H \\le H_u^*(u^* - u) = 0 \\implies H^* \\le H\\).</p>'
  },
  {
    id: 'G3',
    prof: 'pignotti',
    profLabel: 'Prof. Pignotti',
    withProof: true,
    dates: '2026-10-15 & 2026-10-19',
    title: 'Theorem with Sufficient Conditions for Optimality',
    prompt: 'State and <strong>prove</strong> the theorem giving <strong>sufficient conditions for global optimality</strong> (maximization under joint concavity in \\((x,u)\\), and note minimization under joint convexity).',
    statement: '<p><strong>Sufficient Conditions (Maximization):</strong> Let \\(f, g \\in C^1\\) be <strong>jointly concave in \\((x, u)\\)</strong>. Let \\((x^*, u^*)\\) be admissible and suppose there exists a piecewise differentiable \\(\\lambda\\) satisfying</p>\\[H_u(t,x^*,u^*,\\lambda) = 0, \\qquad \\lambda\' = -H_x(t,x^*,u^*,\\lambda), \\qquad \\lambda(t_1) = 0, \\qquad \\lambda(t) \\ge 0.\\]<p>(No sign on \\(\\lambda\\) is needed if \\(g\\) is affine in \\((x,u)\\).) Then \\(J(u^*) \\ge J(u)\\) for every admissible control \\(u\\).</p>',
    proof: '<ol><li><strong>Concavity of \\(f\\):</strong> For any admissible \\((x,u)\\), \\[J(u^*) - J(u) = \\int_{t_0}^{t_1} (f^* - f)\\,dt \\ge \\int_{t_0}^{t_1} \\bigl[f_x^*(x^* - x) + f_u^*(u^* - u)\\bigr]\\,dt.\\]</li><li><strong>Substitute optimality equations:</strong> Using \\(f_u^* = -\\lambda g_u^*\\) (from \\(H_u^*=0\\)) and \\(f_x^* = -\\lambda\' - \\lambda g_x^*\\) (from \\(\\lambda\' = -H_x^*\\)): \\[J(u^*) - J(u) \\ge \\int_{t_0}^{t_1} \\Bigl[-\\lambda\'(x^* - x) - \\lambda\\bigl(g_x^*(x^* - x) + g_u^*(u^* - u)\\bigr)\\Bigr]\\,dt.\\]</li><li><strong>Integrate by parts:</strong> Since \\(\\lambda(t_1) = 0\\) and \\(x^*(t_0) = x(t_0) = x_0\\), boundary terms vanish: \\[\\int_{t_0}^{t_1} -\\lambda\'(x^* - x)\\,dt = -\\bigl[\\lambda(x^* - x)\\bigr]_{t_0}^{t_1} + \\int_{t_0}^{t_1} \\lambda(x^{*\\prime} - x\')\\,dt = \\int_{t_0}^{t_1} \\lambda(g^* - g)\\,dt.\\]</li><li><strong>Concavity of \\(g\\) &amp; \\(\\lambda \\ge 0\\):</strong> \\[J(u^*) - J(u) \\ge \\int_{t_0}^{t_1} \\lambda(t)\\bigl[g^* - g - g_x^*(x^* - x) - g_u^*(u^* - u)\\bigr]\\,dt \\ge 0,\\] because the bracket is \\(\\ge 0\\) by joint concavity of \\(g\\) and \\(\\lambda(t) \\ge 0\\). \\(\\blacksquare\\)</li></ol>',
    notes: '<p><strong>Minimization version:</strong> Replace concavity with <strong>joint convexity</strong> of \\(f, g\\) in \\((x,u)\\) (with \\(\\lambda \\ge 0\\)); every inequality reverses to give \\(J(u^*) \\le J(u)\\). <em>Difference from G2:</em> G2 only needs concavity in \\(u\\); G3 needs joint concavity in \\((x,u)\\).</p>'
  },
  {
    id: 'G4',
    prof: 'pignotti',
    profLabel: 'Prof. Pignotti',
    withProof: true,
    dates: '2026-10-19',
    title: 'Dynamic Programming Principle',
    prompt: 'State and <strong>prove</strong> the <strong>Dynamic Programming Principle</strong>: optimality &amp; uniqueness of the tail restriction \\((x^*|_{[\\hat t, t_1]}, u^*|_{[\\hat t, t_1]})\\), why restricting to \\([t_0, \\hat t]\\) fails, and the value-function formulation \\(V(t,x)\\).',
    statement: '<p><strong>Principle of Optimality:</strong> If \\((x^*, u^*)\\) is optimal for \\((P)\\) on \\([t_0, t_1]\\) and \\(\\hat t \\in (t_0, t_1)\\), then the restriction \\((x^*|_{[\\hat t, t_1]}, u^*|_{[\\hat t, t_1]})\\) is optimal for the tail problem \\((\\hat P)\\):</p>\\[\\max_u \\hat J(u) = \\int_{\\hat t}^{t_1} f(t, x^u, u)\\,dt \\quad \\text{subject to} \\quad x\' = g(t,x,u), \\; x(\\hat t) = x^*(\\hat t).\\]<p>Moreover, if \\(u^*\\) is the <strong>unique</strong> optimal control for \\((P)\\), then \\(u^*|_{[\\hat t, t_1]}\\) is the <strong>unique</strong> optimal control for \\((\\hat P)\\).</p><p><strong>Value-function form:</strong> For \\(V(t,x) = \\sup_u \\int_t^{t_1} f(s,y,u)\\,ds\\) (\\(y(t)=x\\)) and \\(t \\le \\tau \\le t_1\\): \\[V(t,x) = \\sup_u \\left\\{\\int_t^\\tau f(s,y,u)\\,ds + V(\\tau, y(\\tau))\\right\\}.\\]</p>',
    proof: '<ol><li><strong>Optimality of restriction (by contradiction &amp; splicing):</strong> Suppose \\((x^*|_{[\\hat t, t_1]}, u^*|_{[\\hat t, t_1]})\\) is not optimal for \\((\\hat P)\\). Then there exists an admissible \\(\\hat u : [\\hat t, t_1] \\to \\mathbb{R}\\) with \\(\\hat J(\\hat u) > \\hat J(u^*|_{[\\hat t, t_1]})\\). Define the spliced control \\[\\hat u_1(t) = \\begin{cases} u^*(t), & t \\in [t_0, \\hat t), \\\\ \\hat u(t), & t \\in [\\hat t, t_1]. \\end{cases}\\] Then \\(\\hat u_1\\) is piecewise continuous, \\(x^{\\hat u_1} = x^*\\) on \\([t_0, \\hat t]\\), and \\(x^{\\hat u_1} = x^{\\hat u}\\) on \\([\\hat t, t_1]\\). The integrals on \\([t_0, \\hat t]\\) cancel: \\[J(\\hat u_1) - J(u^*) = \\hat J(\\hat u) - \\hat J(u^*|_{[\\hat t, t_1]}) > 0,\\] contradicting optimality of \\(u^*\\).</li><li><strong>Uniqueness:</strong> If \\(u^*\\) is unique for \\((P)\\) and another \\(\\hat u \\neq u^*|_{[\\hat t, t_1]}\\) achieves \\(\\hat J(\\hat u) = \\hat J(u^*|_{[\\hat t, t_1]})\\), the same spliced control \\(\\hat u_1 \\neq u^*\\) satisfies \\(J(\\hat u_1) = J(u^*)\\), contradicting uniqueness. \\(\\blacksquare\\)</li></ol>',
    notes: '<p><strong>Why restricting to \\([t_0, \\hat t]\\) fails:</strong> With free terminal state at \\(\\hat t\\), the shortened problem requires \\(\\lambda(\\hat t) = 0\\), whereas the full problem imposes \\(\\lambda(t_1) = 0\\) and generally \\(\\lambda(\\hat t) \\neq 0\\).</p><p><strong>Value-function proof idea:</strong> (\\(\\le\\)) split \\(\\int_t^\\tau + \\int_\\tau^{t_1} \\le \\int_t^\\tau + V(\\tau, y(\\tau))\\); (\\(\\ge\\)) splice any \\(u_1\\) on \\([t,\\tau]\\) with an \\(\\varepsilon\\)-optimal \\(u_2\\) on \\([\\tau, t_1]\\) and let \\(\\varepsilon \\to 0\\).</p>'
  },
  {
    id: 'G5',
    prof: 'pignotti',
    profLabel: 'Prof. Pignotti',
    withProof: false,
    dates: '2026-10-19',
    title: 'Lipschitz Continuity of the Hamiltonian',
    prompt: 'State the theorem on <strong>Lipschitz continuity of the Hamiltonian</strong> along an optimal pair \\((x^*, u^*)\\).',
    statement: '<p>Let \\(H(t,x,u,\\lambda) = f(t,x,u) + \\lambda g(t,x,u)\\) with \\(f,g \\in C^1\\), \\(u^*\\) piecewise continuous taking values in a compact set \\(U\\), and \\(x^*, \\lambda\\) continuous and piecewise differentiable with bounded derivatives. If \\((x^*, u^*)\\) is optimal with adjoint \\(\\lambda\\) satisfying PMP, then</p>\\[\\widetilde H(t) := H\\bigl(t, x^*(t), u^*(t), \\lambda(t)\\bigr)\\]<p>is <strong>Lipschitz continuous</strong> on \\([t_0, t_1]\\): there exists \\(L > 0\\) such that \\(|\\widetilde H(t) - \\widetilde H(s)| \\le L|t - s|\\) for all \\(t, s \\in [t_0, t_1]\\).</p>',
    notes: '<p>Even when \\(u^*\\) has jump discontinuities (e.g., bang-bang controls), \\(\\widetilde H(t)\\) remains Lipschitz continuous (hence differentiable a.e. and absolutely continuous).</p>'
  },
  {
    id: 'G6',
    prof: 'pignotti',
    profLabel: 'Prof. Pignotti',
    withProof: false,
    dates: '2026-10-22',
    title: 'Autonomous Case: Hamiltonian is Constant Along Optimal Pairs',
    prompt: 'What is an <strong>autonomous</strong> optimal control problem, and what theorem holds for \\(\\widetilde H(t)\\) along optimal pairs?',
    statement: '<p>A problem is <strong>autonomous</strong> when \\(f = f(x,u)\\) and \\(g = g(x,u)\\) do not depend explicitly on \\(t\\) (so \\(H_t \\equiv 0\\)).</p><p><strong>Theorem:</strong> Under the regularity and PMP hypotheses of G5, for an autonomous problem the Hamiltonian is <strong>constant</strong> along any optimal pair \\((x^*, u^*)\\) with costate \\(\\lambda\\):</p>\\[\\widetilde H(t) = H\\bigl(x^*(t), u^*(t), \\lambda(t)\\bigr) = c \\qquad \\forall\\, t \\in [t_0, t_1].\\]',
    notes: '<p><strong>Intuition &amp; exam check:</strong> Formally \\(\\frac{d}{dt}\\widetilde H = H_x x^{*\\prime} + H_\\lambda \\lambda\' + H_u u^{*\\prime} + H_t = H_x H_\\lambda - H_\\lambda H_x + 0 + 0 = 0\\) a.e. Useful to verify your algebra in autonomous exercises: \\(H(x^*, u^*, \\lambda)\\) must simplify to a constant independent of \\(t\\).</p>'
  },
  {
    id: 'G7',
    prof: 'pignotti',
    profLabel: 'Prof. Pignotti',
    withProof: false,
    dates: '2026-10-22 & 2026-11-05',
    title: 'Problems with Final Payoff & Transversality Condition',
    prompt: 'How do the optimality conditions change when the objective includes a \\(C^1\\) terminal payoff \\(\\varphi(x(t_1))\\): \\(J(u) = \\int_{t_0}^{t_1} f(t,x,u)\\,dt + \\varphi(x(t_1))\\)? (Also note what happens if \\(x(t_1) = x_1\\) is fixed.)',
    statement: '<p>The Hamiltonian \\(H = f + \\lambda g\\), stationarity \\(H_u = 0\\), state ODE \\(x^{*\\prime} = g\\), and adjoint ODE \\(\\lambda\' = -H_x\\) remain <strong>unchanged</strong>. Only the <strong>transversality condition</strong> at \\(t = t_1\\) changes from \\(\\lambda(t_1) = 0\\) to:</p>\\[\\lambda(t_1) = \\varphi\'\\bigl(x^*(t_1)\\bigr).\\]',
    notes: '<p><strong>Fixed terminal state \\(x(t_1) = x_1\\) (Nov 5 notes):</strong> There is <strong>no transversality condition on \\(\\lambda(t_1)\\)</strong>; the free constant in \\(\\lambda(t)\\) is determined by enforcing \\(x^*(t_1) = x_1\\).</p>'
  },
  {
    id: 'G8',
    prof: 'pignotti',
    profLabel: 'Prof. Pignotti',
    withProof: false,
    dates: '2026-10-22 & 2026-10-29',
    title: 'Bounds on the Control: Optimality Conditions',
    prompt: 'For bounded controls \\(\\mathcal{A} = \\{u : a \\le u(t) \\le b\\}\\), state the first-order necessary sign conditions on \\(H_u = f_u + \\lambda g_u\\) for <strong>maximization</strong> and <strong>minimization</strong>.',
    statement: '<p>The state equation, adjoint ODE \\(\\lambda\' = -H_x\\), and transversality condition stay the same. At every continuity point \\(t\\) of \\(u^*\\):</p><ul><li><strong>Maximization (\\(\\max J\\)):</strong> \\(u^*(t) = a \\implies H_u \\le 0\\); &nbsp; \\(a < u^*(t) < b \\implies H_u = 0\\); &nbsp; \\(u^*(t) = b \\implies H_u \\ge 0\\).<br>(Operationally: \\(H_u < 0 \\implies u^* = a\\), \\(H_u > 0 \\implies u^* = b\\).)</li><li><strong>Minimization (\\(\\min J\\)):</strong> \\(u^*(t) = a \\implies H_u \\ge 0\\); &nbsp; \\(a < u^*(t) < b \\implies H_u = 0\\); &nbsp; \\(u^*(t) = b \\implies H_u \\le 0\\).<br>(Operationally: \\(H_u > 0 \\implies u^* = a\\), \\(H_u < 0 \\implies u^* = b\\).)</li></ul>',
    notes: '<p><strong>Common forms:</strong> If \\(H\\) is quadratic in \\(u\\), \\(u^*\\) is the projection (clipping) of the unconstrained solution onto \\([a,b]\\). If \\(H\\) is affine in \\(u\\), \\(u^*\\) is <strong>bang-bang</strong> (jumps between \\(a\\) and \\(b\\) according to the sign of \\(H_u\\)).</p>'
  }
];

// Isolated Homework Problem Sets (LIST-ONLY, NOT flashcards)
window.CT_HOMEWORKS = [
  {
    id: 'pignotti-2026-10-16',
    prof: 'pignotti',
    profLabel: 'Prof. Pignotti',
    date: '2026-10-16',
    title: 'Pignotti Homework 1 — Unconstrained Scalar Optimal Control',
    source: 'Homework-Pignotti_2026-10-16.pdf',
    problems: [
      {
        num: '1',
        title: 'Minimum Quadratic Effort & State',
        problem: '\\[\\min_u \\int_0^1 (x^2 + u^2)\\,dt \\qquad \\text{subject to} \\quad \\begin{cases} x\' = u, \\\\ x(0) = 1. \\end{cases}\\]<p>Find the optimal pair \\((x^*, u^*)\\).</p>',
        hint: 'Write \\(H = x^2 + u^2 + \\lambda u\\). From \\(H_u = 0\\) express \\(u^* = -\\lambda/2\\), then differentiate \\(x\' = -\\lambda/2\\) and substitute \\(\\lambda\' = -H_x = -2x\\) to get a second-order ODE \\(x\'\' = x\\).',
        answer: '<p>\\(H = x^2 + u^2 + \\lambda u\\), \\(H_u = 2u + \\lambda = 0 \\implies u^* = -\\frac{\\lambda}{2}\\), and \\(\\lambda\' = -2x\\) with \\(\\lambda(1) = 0\\).</p><p>Differentiating \\(x\' = -\\lambda/2\\) gives \\(x\'\' = x\\), so \\(x^*(t) = c_1 e^t + c_2 e^{-t}\\) and \\(\\lambda(t) = -2(c_1 e^t - c_2 e^{-t})\\).</p><p>Imposing \\(x(0) = c_1 + c_2 = 1\\) and \\(\\lambda(1) = 0 \\implies c_2 = c_1 e^2\\) gives \\(c_1 = \\frac{1}{1+e^2}\\), \\(c_2 = \\frac{e^2}{1+e^2}\\):</p>\\[x^*(t) = \\frac{e^t + e^{2-t}}{1+e^2} = \\frac{\\cosh(1-t)}{\\cosh 1}, \\qquad u^*(t) = \\frac{e^t - e^{2-t}}{1+e^2} = -\\frac{\\sinh(1-t)}{\\cosh 1}.\\]'
      },
      {
        num: '2',
        title: 'Coupled Linear BVP (Maximization)',
        problem: '\\[\\max_u \\int_0^1 (xu - u^2)\\,dt \\qquad \\text{subject to} \\quad \\begin{cases} x\' = x + u, \\\\ x(0) = 1. \\end{cases}\\]<p>Find the optimal pair \\((x^*, u^*)\\).</p>',
        hint: 'Solve \\(H_u = x - 2u + \\lambda = 0\\) for \\(u^* = (x+\\lambda)/2\\) and substitute into the \\(2\\times 2\\) linear system for \\((x, \\lambda)^\\top\\). Find its eigenvalues \\(\\pm\\sqrt{2}\\) and eigenvectors, then apply \\(x(0)=1, \\lambda(1)=0\\).',
        answer: '<p>\\(H = xu - u^2 + \\lambda(x+u)\\), \\(u^* = \\frac{x+\\lambda}{2}\\), giving the coupled BVP</p>\\[\\begin{pmatrix} x\' \\\\ \\lambda\' \\end{pmatrix} = \\begin{pmatrix} 3/2 & 1/2 \\\\ -1/2 & -3/2 \\end{pmatrix} \\begin{pmatrix} x \\\\ \\lambda \\end{pmatrix}, \\qquad x(0)=1,\\; \\lambda(1)=0.\\]<p>Eigenvalues \\(\\mu = \\pm\\sqrt{2}\\) with eigenvectors \\((1, 2\\sqrt{2}-3)^\\top\\) and \\((1, -2\\sqrt{2}-3)^\\top\\). Solving \\(c_1 + c_2 = 1\\) and \\(\\lambda(1) = 0\\):</p>\\[c_1 = \\frac{(2\\sqrt{2}+3)e^{-\\sqrt{2}}}{(2\\sqrt{2}-3)e^{\\sqrt{2}} + (2\\sqrt{2}+3)e^{-\\sqrt{2}}}, \\qquad c_2 = 1 - c_1,\\]\\[x^*(t) = c_1 e^{\\sqrt{2}t} + c_2 e^{-\\sqrt{2}t}, \\qquad u^*(t) = c_1(\\sqrt{2}-1)e^{\\sqrt{2}t} - c_2(\\sqrt{2}+1)e^{-\\sqrt{2}t}.\\]'
      },
      {
        num: '3',
        title: 'Quadratic Regulator with Eigenvalues ±2',
        problem: '\\[\\min_u \\frac{1}{2}\\int_0^1 (3x^2 + u^2)\\,dt \\qquad \\text{subject to} \\quad \\begin{cases} x\' = x + u, \\\\ x(0) = 1. \\end{cases}\\]<p>Find the optimal pair \\((x^*, u^*)\\).</p>',
        hint: '\\(H_u = u + \\lambda = 0 \\implies u^* = -\\lambda\\). The matrix for \\((x\', \\lambda\')^\\top\\) is \\(\\begin{pmatrix} 1 & -1 \\\\ -3 & -1 \\end{pmatrix}\\), which has clean integer eigenvalues \\(\\pm 2\\).',
        answer: '<p>\\(H = \\frac{1}{2}(3x^2+u^2) + \\lambda(x+u)\\), \\(u^* = -\\lambda\\), \\(\\lambda\' = -3x - \\lambda\\), \\(\\lambda(1)=0\\).</p><p>Eigenvalues \\(2, -2\\) with eigenvectors \\((1,-1)^\\top\\) and \\((1,3)^\\top\\). From \\(c_1+c_2=1\\) and \\(-c_1 e^2 + 3c_2 e^{-2} = 0\\), we get \\(c_1 = \\frac{3}{3+e^4}\\), \\(c_2 = \\frac{e^4}{3+e^4}\\):</p>\\[x^*(t) = \\frac{3e^{2t} + e^{4-2t}}{3+e^4}, \\qquad u^*(t) = -\\lambda(t) = \\frac{3e^{2t} - 3e^{4-2t}}{3+e^4}.\\]'
      },
      {
        num: '4',
        title: 'Inhomogeneous Second-Order BVP by Substitution',
        problem: '\\[\\min_u \\int_0^1 (x^2 + x + u^2 + u)\\,dt \\qquad \\text{subject to} \\quad \\begin{cases} x\' = u, \\\\ x(0) = 0. \\end{cases}\\]<p>Find \\((x^*, u^*)\\). <em>(Hint on sheet: solve by substitution.)</em></p>',
        hint: 'From \\(H_u = 2u + 1 + \\lambda = 0\\), get \\(u^* = -(1+\\lambda)/2\\). Differentiate \\(x\' = u^*\\) and plug in \\(\\lambda\' = -2x - 1\\) to obtain \\(x\'\' - x = \\frac{1}{2}\\), whose particular solution is \\(-\\frac{1}{2}\\).',
        answer: '<p>\\(u^* = -\\frac{1+\\lambda}{2}\\), \\(\\lambda\' = -2x - 1\\), \\(\\lambda(1)=0\\). Substituting gives \\(x\'\' = x + \\frac{1}{2}\\), so \\(x^*(t) = c_1 e^t + c_2 e^{-t} - \\frac{1}{2}\\) and \\(\\lambda(t) = -1 - 2(c_1 e^t - c_2 e^{-t})\\).</p><p>Using \\(x(0) = 0 \\implies c_1 + c_2 = \\frac{1}{2}\\) and \\(\\lambda(1) = 0 \\implies 2(c_1 e - c_2 e^{-1}) = -1\\) yields \\(c_1 = \\frac{1-e}{2(e^2+1)}\\), \\(c_2 = \\frac{e^2+e}{2(e^2+1)}\\):</p>\\[x^*(t) = \\frac{(1-e)e^t + (e^2+e)e^{-t}}{2(e^2+1)} - \\frac{1}{2}, \\qquad u^*(t) = \\frac{(1-e)e^t - (e^2+e)e^{-t}}{2(e^2+1)}.\\]'
      },
      {
        num: '5',
        title: 'Decoupled Adjoint on [1, 2]',
        problem: '\\[\\max_u \\int_1^2 (x - u^2)\\,dt \\qquad \\text{subject to} \\quad \\begin{cases} x\' = x + 2u, \\\\ x(1) = 0. \\end{cases}\\]<p>Find \\((x^*, u^*)\\).</p>',
        hint: 'Notice \\(H_x = 1 + \\lambda\\) does not depend on \\(x\\)! Solve \\(\\lambda\' = -1 - \\lambda\\), \\(\\lambda(2) = 0\\) first, then plug \\(u^* = \\lambda\\) into \\(x\' - x = 2u^*\\) using integrating factor \\(e^{-t}\\).',
        answer: '<p>\\(H = x - u^2 + \\lambda(x + 2u)\\), \\(H_u = -2u + 2\\lambda = 0 \\implies u^* = \\lambda\\). The adjoint \\(\\lambda\' = -1 - \\lambda\\), \\(\\lambda(2)=0\\) gives \\(\\lambda(t) = e^{2-t} - 1\\).</p><p>Solving \\(x\' - x = 2e^{2-t} - 2\\) with \\(x(1) = 0\\) via integrating factor \\(e^{-t}\\):</p>\\[u^*(t) = e^{2-t} - 1, \\qquad x^*(t) = (1 - 2e^{-1})e^t - e^{2-t} + 2.\\]'
      },
      {
        num: '6',
        title: 'Time-Dependent Cost on [1, 3]',
        problem: '\\[\\min_u \\int_1^3 (u^2 - 2tx)\\,dt \\qquad \\text{subject to} \\quad \\begin{cases} x\' = -u, \\\\ x(1) = 2. \\end{cases}\\]<p>Find \\((x^*, u^*)\\).</p>',
        hint: 'The adjoint equation is simply \\(\\lambda\' = -H_x = 2t\\) with \\(\\lambda(3) = 0\\). Integrate directly for \\(\\lambda\\), then \\(u^* = \\lambda/2\\), then integrate \\(x\' = -u^*\\).',
        answer: '<p>\\(H = u^2 - 2tx - \\lambda u\\), \\(u^* = \\lambda/2\\), \\(\\lambda\' = 2t\\), \\(\\lambda(3)=0 \\implies \\lambda(t) = t^2 - 9\\).</p>\\[u^*(t) = \\frac{t^2 - 9}{2}, \\qquad x^*(t) = 2 + \\int_1^t \\frac{9 - s^2}{2}\\,ds = \\frac{9t}{2} - \\frac{t^3}{6} - \\frac{7}{3}.\\]'
      }
    ]
  },
  {
    id: 'pignotti-2026-10-23',
    prof: 'pignotti',
    profLabel: 'Prof. Pignotti',
    date: '2026-10-23',
    title: 'Pignotti Homework 2 — Terminal Payoff & Transversality',
    source: 'Homework_2026_10_23_Pignotti.pdf',
    problems: [
      {
        num: '1',
        title: 'Tumor Growth Drug Therapy Model',
        problem: '\\[\\min_u \\left[x(T) + \\int_0^T u^2(t)\\,dt\\right] \\qquad \\text{subject to} \\quad \\begin{cases} x\'(t) = \\alpha x(t) - u(t), & t \\in [0,T], \\\\ x(0) = x_0, \\end{cases}\\]<p>with \\(\\alpha > 0\\), \\(x_0 > 0\\), unconstrained \\(u\\). Determine \\((x^*, u^*)\\).</p>',
        hint: 'Terminal payoff is \\(\\varphi(x) = x\\), so the transversality condition is \\(\\lambda(T) = \\varphi\'(x^*(T)) = 1\\). The adjoint \\(\\lambda\' = -\\alpha\\lambda\\) decouples immediately.',
        answer: '<p>\\(H = u^2 + \\lambda(\\alpha x - u)\\), \\(H_u = 2u - \\lambda = 0 \\implies u^* = \\lambda/2\\). Adjoint: \\(\\lambda\' = -\\alpha\\lambda\\), \\(\\lambda(T) = 1 \\implies \\lambda(t) = e^{\\alpha(T-t)}\\).</p>\\[u^*(t) = \\frac{1}{2}e^{\\alpha(T-t)}, \\qquad x^*(t) = x_0 e^{\\alpha t} - \\frac{e^{\\alpha T}}{4\\alpha}\\bigl(e^{\\alpha t} - e^{-\\alpha t}\\bigr).\\]'
      },
      {
        num: '2',
        title: 'Decaying State with Terminal Penalty',
        problem: '\\[\\min_u \\left[x(1) + \\int_0^1 u^2(t)\\,dt\\right] \\qquad \\text{subject to} \\quad \\begin{cases} x\'(t) = -x(t) + u(t), & t \\in [0,1], \\\\ x(0) = 2. \\end{cases}\\]<p>Determine \\((x^*, u^*)\\).</p>',
        hint: 'Here \\(\\lambda\' = -H_x = \\lambda\\) with \\(\\lambda(1) = 1\\), so \\(\\lambda(t) = e^{t-1}\\). Watch the sign in \\(H_u = 2u + \\lambda = 0\\).',
        answer: '<p>\\(H = u^2 + \\lambda(-x+u)\\), \\(u^* = -\\lambda/2\\), \\(\\lambda\' = \\lambda\\), \\(\\lambda(1) = 1 \\implies \\lambda(t) = e^{t-1}\\).</p><p>Solving \\(x\' + x = -\\frac{1}{2}e^{t-1}\\), \\(x(0)=2\\):</p>\\[u^*(t) = -\\frac{1}{2}e^{t-1}, \\qquad x^*(t) = 2e^{-t} - \\frac{1}{4e}\\bigl(e^t - e^{-t}\\bigr).\\]'
      },
      {
        num: '3',
        title: 'Quadratic Cost + Terminal Penalty',
        problem: '\\[\\min_u \\left[x(1) + \\int_0^1 (x^2(t) + u^2(t))\\,dt\\right] \\qquad \\text{subject to} \\quad \\begin{cases} x\'(t) = u(t), & t \\in [0,1], \\\\ x(0) = 0. \\end{cases}\\]<p>Determine \\((x^*, u^*)\\).</p>',
        hint: 'Just like HW1 Ex. 1, eliminate \\(\\lambda\\) to get \\(x\'\' = x\\). Since \\(x(0) = 0\\), write \\(x^*(t) = 2c\\sinh t\\), then use \\(\\lambda(1) = -2x\'(1) = 1\\) to find \\(c\\).',
        answer: '<p>\\(u^* = -\\lambda/2\\), \\(\\lambda\' = -2x\\), \\(\\lambda(1) = 1\\), so \\(x\'\' = x\\) with \\(x(0) = 0 \\implies x^*(t) = 2c\\sinh t\\) and \\(\\lambda(t) = -4c\\cosh t\\).</p><p>Imposing \\(\\lambda(1) = 1\\) gives \\(c = -\\frac{1}{4\\cosh 1} = -\\frac{e}{2(e^2+1)}\\):</p>\\[x^*(t) = -\\frac{\\sinh t}{2\\cosh 1} = -\\frac{e(e^t - e^{-t})}{2(e^2+1)}, \\qquad u^*(t) = -\\frac{\\cosh t}{2\\cosh 1}.\\]'
      }
    ]
  },
  {
    id: 'pignotti-2026-11-06',
    prof: 'pignotti',
    profLabel: 'Prof. Pignotti',
    date: '2026-11-06',
    title: 'Pignotti Homework 3 — Bounded Controls & Bang-Bang',
    source: 'Homework_2026_11_6_Pignotti.pdf',
    problems: [
      {
        num: '1',
        title: 'Bounded Maximization with Two Switching Times',
        problem: '\\[\\max_{u \\in \\mathcal{A}} \\int_0^2 (2x - 3u - u^2)\\,dt \\qquad \\text{subject to} \\quad \\begin{cases} x\' = x + u, \\\\ x(0) = 5, \\end{cases} \\quad \\mathcal{A} = \\{0 \\le u(t) \\le 2\\}.\\]<p>Determine \\(u^*\\) and show how to compute \\(x^*\\).</p>',
        hint: 'Solve \\(\\lambda\' = -2 - \\lambda\\), \\(\\lambda(2)=0\\) first (\\(\\lambda(t) = 2e^{2-t}-2\\)). Clip the unconstrained maximizer \\((\\lambda - 3)/2\\) to \\([0,2]\\) and find the two times where \\(\\lambda = 7\\) and \\(\\lambda = 3\\).',
        answer: '<p>\\(H = 2x - 3u - u^2 + \\lambda(x+u)\\), \\(H_u = -3 - 2u + \\lambda\\). Adjoint: \\(\\lambda(t) = 2e^{2-t} - 2\\) (decreases from \\(2e^2-2\\) to \\(0\\)).</p><p>Switching times: \\(\\lambda(t_1)=7 \\implies t_1 = 2 - \\ln\\frac{9}{2}\\), and \\(\\lambda(t_2)=3 \\implies t_2 = 2 - \\ln\\frac{5}{2}\\):</p>\\[u^*(t) = \\begin{cases} 2, & t \\in [0, 2 - \\ln(9/2)], \\\\ e^{2-t} - \\frac{5}{2}, & t \\in (2 - \\ln(9/2),\\, 2 - \\ln(5/2)), \\\\ 0, & t \\in [2 - \\ln(5/2),\\, 2]. \\end{cases}\\]<p>To compute \\(x^*\\), solve three consecutive IVPs matching values at \\(t_1\\) and \\(t_2\\): (1) \\(x\'=x+2, x(0)=5 \\implies 7e^t-2\\) on \\([0,t_1]\\); (2) \\(x\'=x+e^{2-t}-\\frac{5}{2}\\) on \\([t_1,t_2]\\); (3) \\(x\'=x\\) on \\([t_2,2]\\).</p>'
      },
      {
        num: '2',
        title: 'Bang-Bang Control with Fixed Endpoints',
        problem: '\\[\\min_{u \\in \\mathcal{A}} \\int_0^1 u(t)\\,dt \\qquad \\text{subject to} \\quad \\begin{cases} x\' = x - u, \\\\ x(0) = 1,\\; x(1) = 0, \\end{cases} \\quad \\mathcal{A} = \\{0 \\le u(t) \\le 2\\}.\\]<p>Determine the optimal pair \\((x^*, u^*)\\).</p>',
        hint: '\\(H_u = 1 - \\lambda\\) is linear in \\(u\\) (bang-bang!), and because \\(x(1)=0\\) is fixed there is <strong>no transversality condition</strong> on \\(\\lambda(1)\\). So \\(\\lambda(t) = ce^{-t}\\); rule out \\(c \\le 1\\) and \\(c \\ge e\\), then find the switch \\(\\tau = \\ln c\\) from \\(x^*(1) = 0\\).',
        answer: '<p>\\(H = u + \\lambda(x-u)\\), \\(H_u = 1 - \\lambda\\). Minimization rule: \\(\\lambda < 1 \\implies u^*=0\\), \\(\\lambda > 1 \\implies u^*=2\\). Adjoint \\(\\lambda\' = -\\lambda \\implies \\lambda(t) = ce^{-t}\\) (no transversality).</p><p>If \\(c \\le 1\\), \\(u^*\\equiv 0 \\implies x(1)=e \\neq 0\\); if \\(c \\ge e\\), \\(u^*\\equiv 2 \\implies x(1)=2-e \\neq 0\\). Thus \\(c \\in (1,e)\\) with switch \\(\\tau = \\ln c\\): \\(u^*=2\\) on \\([0,\\ln c)\\) gives \\(x^*(t) = 2 - e^t\\), and \\(u^*=0\\) on \\([\\ln c, 1]\\) gives \\(x^*(t) = (2-c)e^{t-\\ln c}\\). Setting \\(x^*(1)=0\\) forces \\(c=2\\), \\(\\tau = \\ln 2\\):</p>\\[u^*(t) = \\begin{cases} 2, & t \\in [0, \\ln 2), \\\\ 0, & t \\in [\\ln 2, 1], \\end{cases} \\qquad x^*(t) = \\begin{cases} 2 - e^t, & t \\in [0, \\ln 2), \\\\ 0, & t \\in [\\ln 2, 1]. \\end{cases}\\]'
      },
      {
        num: '3',
        title: 'Time-Dependent Unconstrained Minimization',
        problem: '\\[\\min_u \\int_1^2 (tu^2 + t^2 x)\\,dt \\qquad \\text{subject to} \\quad \\begin{cases} x\' = -u, \\\\ x(1) = 1. \\end{cases}\\]<p>Determine \\((x^*, u^*)\\).</p>',
        hint: 'Solve \\(\\lambda\' = -H_x = -t^2\\) with \\(\\lambda(2) = 0\\), then \\(u^* = \\lambda/(2t)\\), then integrate \\(x\' = -u^*\\).',
        answer: '<p>\\(H = tu^2 + t^2 x - \\lambda u\\), \\(u^* = \\frac{\\lambda}{2t}\\), \\(\\lambda\' = -t^2\\), \\(\\lambda(2)=0 \\implies \\lambda(t) = \\frac{8-t^3}{3}\\).</p>\\[u^*(t) = \\frac{4}{3t} - \\frac{t^2}{6}, \\qquad x^*(t) = -\\frac{4}{3}\\ln t + \\frac{t^3 + 17}{18}.\\]'
      },
      {
        num: '4',
        title: 'Bounded Control + Terminal Payoff',
        problem: '\\[\\max_{u \\in \\mathcal{A}} \\left\\{\\int_0^1 \\left(u - \\frac{1}{2}u^2\\right)dt + x(1)\\right\\} \\qquad \\text{subject to} \\quad \\begin{cases} x\' = u - x, \\\\ x(0) = 0, \\end{cases} \\quad \\mathcal{A} = \\left\\{0 \\le u(t) \\le \\frac{3}{2}\\right\\}.\\]<p>Determine \\((x^*, u^*)\\).</p>',
        hint: 'Transversality gives \\(\\lambda(1) = 1\\) with \\(\\lambda\' = \\lambda \\implies \\lambda(t) = e^{t-1}\\). Check where the unconstrained maximizer \\(1 + \\lambda(t)\\) crosses the upper bound \\(3/2\\).',
        answer: '<p>\\(H = u - \\frac{1}{2}u^2 + \\lambda(u-x)\\), \\(H_u = 1 - u + \\lambda\\), \\(\\lambda(t) = e^{t-1}\\). The unconstrained maximizer \\(1 + e^{t-1}\\) hits \\(\\frac{3}{2}\\) at \\(t = 1 - \\ln 2\\):</p>\\[u^*(t) = \\begin{cases} 1 + e^{t-1}, & t \\in [0, 1 - \\ln 2], \\\\ \\frac{3}{2}, & t \\in (1 - \\ln 2, 1], \\end{cases}\\]\\[x^*(t) = \\begin{cases} 1 - e^{-t} + \\frac{1}{2}e^{t-1} - \\frac{1}{2}e^{-t-1}, & t \\in [0, 1 - \\ln 2], \\\\ \\frac{3}{2} - \\left(\\frac{e}{8} + 1 + \\frac{1}{2e}\\right)e^{-t}, & t \\in (1 - \\ln 2, 1]. \\end{cases}\\]'
      }
    ]
  },
  {
    id: 'pignotti-2026-11-14',
    prof: 'pignotti',
    profLabel: 'Prof. Pignotti',
    date: '2026-11-14',
    title: 'Pignotti Homework 4 — Bounded Controls, Bang-Bang & Payoff',
    source: 'Homework_Pignotti_2026_11_14.pdf',
    problems: [
      {
        num: '1',
        title: 'Bounded Maximization on [0, 3]',
        problem: '\\[\\max_{u \\in \\mathcal{A}} \\int_0^3 (4x - u - u^2)\\,dt \\qquad \\text{subject to} \\quad \\begin{cases} x\' = u - x, \\\\ x(0) = 2, \\end{cases} \\quad \\mathcal{A} = \\{0 \\le u(t) \\le 1\\}.\\]<p>Determine \\(u^*\\) and compute \\(x^*\\).</p>',
        hint: 'Solve \\(\\lambda\' = -4 + \\lambda\\), \\(\\lambda(3) = 0\\) to get \\(\\lambda(t) = 4 - 4e^{t-3}\\). Clip \\((\\lambda - 1)/2\\) to \\([0,1]\\): switches occur at \\(\\lambda = 3\\) and \\(\\lambda = 1\\).',
        answer: '<p>\\(\\lambda(t) = 4 - 4e^{t-3}\\). Switches at \\(t_1 = 3 - \\ln 4\\) (\\(\\lambda = 3\\)) and \\(t_2 = 3 - \\ln(4/3)\\) (\\(\\lambda = 1\\)):</p>\\[u^*(t) = \\begin{cases} 1, & t \\in [0, 3 - \\ln 4], \\\\ \\frac{3}{2} - 2e^{t-3}, & t \\in (3 - \\ln 4,\\, 3 - \\ln(4/3)), \\\\ 0, & t \\in [3 - \\ln(4/3),\\, 3], \\end{cases}\\]\\[x^*(t) = \\begin{cases} 1 + e^{-t}, & t \\in [0, 3 - \\ln 4], \\\\ \\frac{3}{2} - e^{t-3} + \\left(1 - \\frac{e^3}{16}\\right)e^{-t}, & t \\in (3 - \\ln 4,\\, 3 - \\ln(4/3)), \\\\ \\left(\\frac{e^3}{2} + 1\\right)e^{-t}, & t \\in [3 - \\ln(4/3),\\, 3]. \\end{cases}\\]'
      },
      {
        num: '2',
        title: 'Bang-Bang with Fixed Endpoints (0 to 1)',
        problem: '\\[\\min_{u \\in \\mathcal{A}} \\int_0^1 u(t)\\,dt \\qquad \\text{subject to} \\quad \\begin{cases} x\' = u - 2x, \\\\ x(0) = 0,\\; x(1) = 1, \\end{cases} \\quad \\mathcal{A} = \\{0 \\le u(t) \\le 3\\}.\\]<p>Determine \\((x^*, u^*)\\).</p>',
        hint: '\\(H_u = 1 + \\lambda\\), \\(\\lambda\' = 2\\lambda \\implies \\lambda(t) = ce^{2t}\\) (no transversality). Must have \\(c < 0\\) so \\(\\lambda\\) decreases past \\(-1\\) at some \\(\\tau \\in (0,1)\\): \\(u^* = 0\\) then \\(u^* = 3\\). Solve for \\(\\tau\\) from \\(x^*(1) = 1\\).',
        answer: '<p>Minimization rule: \\(\\lambda > -1 \\implies u^* = 0\\), \\(\\lambda < -1 \\implies u^* = 3\\). With \\(\\lambda(t) = ce^{2t}\\) and \\(c < 0\\), \\(u^* = 0\\) on \\([0,\\tau)\\) (so \\(x^* \\equiv 0\\)) and \\(u^* = 3\\) on \\([\\tau, 1]\\), giving \\(x^*(t) = \\frac{3}{2}(1 - e^{-2(t-\\tau)})\\).</p><p>Imposing \\(x^*(1) = 1\\) gives \\(e^{-2(1-\\tau)} = \\frac{1}{3} \\implies \\tau = 1 - \\frac{1}{2}\\ln 3\\):</p>\\[u^*(t) = \\begin{cases} 0, & t \\in [0, 1 - \\frac{1}{2}\\ln 3), \\\\ 3, & t \\in [1 - \\frac{1}{2}\\ln 3, 1], \\end{cases} \\qquad x^*(t) = \\begin{cases} 0, & t \\in [0, 1 - \\frac{1}{2}\\ln 3), \\\\ \\frac{3}{2}\\bigl(1 - \\frac{1}{3}e^{2(1-t)}\\bigr), & t \\in [1 - \\frac{1}{2}\\ln 3, 1]. \\end{cases}\\]'
      },
      {
        num: '3',
        title: 'Bounded Minimization + Terminal Payoff',
        problem: '\\[\\min_{u \\in \\mathcal{A}} \\left\\{\\int_0^2 (u^2 + 2tx)\\,dt + x(2)\\right\\} \\qquad \\text{subject to} \\quad \\begin{cases} x\' = -u, \\\\ x(0) = 2, \\end{cases} \\quad \\mathcal{A} = \\{0 \\le u(t) \\le 2\\}.\\]<p>Determine \\((x^*, u^*)\\).</p>',
        hint: 'Adjoint \\(\\lambda\' = -2t\\) with \\(\\lambda(2) = 1\\) gives \\(\\lambda(t) = 5 - t^2\\). Compare \\(\\lambda(t)/2\\) against the bounds \\([0, 2]\\) — it saturates at \\(2\\) for \\(t \\le 1\\).',
        answer: '<p>\\(H = u^2 + 2tx - \\lambda u\\), \\(H_u = 2u - \\lambda\\), \\(\\lambda(t) = 5 - t^2 \\in [1, 5]\\), crossing \\(4\\) at \\(t = 1\\):</p>\\[u^*(t) = \\begin{cases} 2, & t \\in [0, 1], \\\\ \\frac{5 - t^2}{2}, & t \\in (1, 2], \\end{cases} \\qquad x^*(t) = \\begin{cases} 2 - 2t, & t \\in [0, 1], \\\\ \\frac{t^3}{6} - \\frac{5t}{2} + \\frac{7}{3}, & t \\in (1, 2]. \\end{cases}\\]'
      }
    ]
  },
  {
    id: 'palladino-hw1',
    prof: 'palladino',
    profLabel: 'Prof. Palladino',
    date: '2026-10-16',
    title: 'Palladino Homework 1 — Kalman, Linearization & Trélat Examples',
    source: 'IMCT_Homework1_Palladino.pdf',
    problems: [
      {
        num: '1',
        title: 'Parameter-Dependent Kalman Controllability',
        problem: '<p>Prove that the linear control system</p>\\[\\begin{cases} \\dot x_1 = 2x_1 + (\\alpha - 3)x_2 + u_1 + u_2, \\\\ \\dot x_2 = 2x_2 + \\alpha(\\alpha - 1)u_1, \\end{cases} \\qquad (u_1, u_2) \\in \\mathbb{R}^2,\\; \\alpha \\in \\mathbb{R}\\]<p>is completely controllable if and only if \\(\\alpha(\\alpha - 1) \\neq 0\\).</p>',
        hint: 'Write \\(\\dot x = Ax + Bu\\) and form the \\(2\\times 4\\) Kalman matrix \\([B \\mid AB]\\). Look at its second row when \\(\\alpha(\\alpha-1)=0\\) vs. the determinant of \\(B\\) when \\(\\alpha(\\alpha-1)\\neq 0\\).',
        answer: '<p>With \\(A = \\begin{pmatrix} 2 & \\alpha-3 \\\\ 0 & 2 \\end{pmatrix}\\) and \\(B = \\begin{pmatrix} 1 & 1 \\\\ \\alpha(\\alpha-1) & 0 \\end{pmatrix}\\):</p>\\[AB = \\begin{pmatrix} 2 + \\alpha(\\alpha-1)(\\alpha-3) & 2 \\\\ 2\\alpha(\\alpha-1) & 0 \\end{pmatrix}.\\]<p>If \\(\\alpha(\\alpha-1) = 0\\), the entire second row of \\([B \\mid AB]\\) is zero, so \\(\\operatorname{rank}[B \\mid AB] = 1 < 2\\) (not controllable). If \\(\\alpha(\\alpha-1) \\neq 0\\), \\(\\det B = -\\alpha(\\alpha-1) \\neq 0\\), so \\(\\operatorname{rank}[B \\mid AB] = 2\\) (completely controllable). \\(\\blacksquare\\)</p>'
      },
      {
        num: 'Ex. 1.4',
        title: 'Controlled Car: Straight Segments & Circular Arcs',
        problem: '\\[\\dot x = v(t)\\cos\\theta(t), \\qquad \\dot y = v(t)\\sin\\theta(t), \\qquad \\dot\\theta = u(t), \\qquad |u|, |v| \\le 1.\\]<p>Check local controllability along (a) straight segments (\\(u \\equiv 0, v \\equiv \\bar v \\neq 0\\)) and (b) circular arcs (\\(\\bar u \\neq 0, \\bar v \\neq 0\\)).</p>',
        hint: 'For (a), \\(A, B\\) are constant — compute \\([B \\mid AB]\\). For (b), \\(\\theta(t) = \\theta_0 + t\\bar u\\) varies in time, so use the time-varying rank test \\(B_1(t) = A(t)B(t) - \\dot B(t)\\).',
        answer: '<p><strong>(a) Straight segments</strong> (with \\(0 < |\\bar v| < 1\\) so controls are interior): \\(A = \\begin{pmatrix} 0 & 0 & -\\bar v\\sin\\theta_0 \\\\ 0 & 0 & \\bar v\\cos\\theta_0 \\\\ 0 & 0 & 0 \\end{pmatrix}\\), \\(B = \\begin{pmatrix} \\cos\\theta_0 & 0 \\\\ \\sin\\theta_0 & 0 \\\\ 0 & 1 \\end{pmatrix}\\). Columns \\(b_1, Ab_2, b_2\\) have determinant \\(\\bar v(\\cos^2\\theta_0 + \\sin^2\\theta_0) = \\bar v \\neq 0\\) \\(\\implies\\) rank 3 \\(\\implies\\) locally controllable along the segment.</p><p><strong>(b) Circular arcs:</strong> \\(B_1(t) = A(t)B(t) - \\dot B(t) = \\begin{pmatrix} \\bar u\\sin\\theta(t) & -\\bar v\\sin\\theta(t) \\\\ -\\bar u\\cos\\theta(t) & \\bar v\\cos\\theta(t) \\\\ 0 & 0 \\end{pmatrix}\\). Together with \\(B(t)\\), \\(\\operatorname{rank}[B(t) \\mid B_1(t)] = 3\\) \\(\\implies\\) locally controllable along circular arcs.</p>'
      },
      {
        num: 'Ex. 1.6',
        title: 'Inverted Pendulum on a Cart',
        problem: '\\[\\ddot\\xi = \\frac{m\\ell\\dot\\theta^2\\sin\\theta - mg\\cos\\theta\\sin\\theta + u}{M + m\\sin^2\\theta}, \\qquad \\ddot\\theta = \\frac{-m\\ell\\dot\\theta^2\\sin\\theta\\cos\\theta + (M+m)g\\sin\\theta - u\\cos\\theta}{\\ell(M + m\\sin^2\\theta)}.\\]<p>Is the system locally controllable in any time \\(T > 0\\) around the upright equilibrium \\(\\bar x = (\\bar\\xi, 0, 0, 0)^\\top\\)?</p>',
        hint: 'Write in first-order state form \\(x = (\\xi, \\dot\\xi, \\theta, \\dot\\theta)^\\top\\), linearize at \\((\\bar\\xi,0,0,0)^\\top, \\bar u = 0\\), and compute the \\(4\\times 4\\) Kalman matrix \\(K = [B, AB, A^2B, A^3B]\\). Reorder rows/columns into two \\(2\\times 2\\) blocks to find \\(\\det K\\).',
        answer: '<p>Linearization at \\(\\bar x\\) gives</p>\\[A = \\begin{pmatrix} 0 & 1 & 0 & 0 \\\\ 0 & 0 & -\\frac{mg}{M} & 0 \\\\ 0 & 0 & 0 & 1 \\\\ 0 & 0 & \\frac{(M+m)g}{\\ell M} & 0 \\end{pmatrix}, \\qquad B = \\begin{pmatrix} 0 \\\\ \\frac{1}{M} \\\\ 0 \\\\ -\\frac{1}{\\ell M} \\end{pmatrix}.\\]<p>Computing \\(K = [B, AB, A^2B, A^3B]\\) and grouping odd/even rows into two \\(2\\times 2\\) blocks yields</p>\\[\\det K = \\left(\\frac{g}{\\ell^2 M^2}\\right)^2 \\neq 0 \\implies \\operatorname{rank} K = 4.\\]<p>By the linearization theorem (P5), the inverted pendulum is <strong>locally controllable in any time \\(T > 0\\)</strong> around the upright equilibrium.</p>'
      },
      {
        num: 'Ex. 1.8',
        title: 'Fixed-Speed Steering (Dubins Car)',
        problem: '\\[\\dot x_1 = \\cos\\theta, \\qquad \\dot x_2 = \\sin\\theta, \\qquad \\dot\\theta = u.\\]<p>Linearize along the circular trajectory \\(\\theta(t) = t\\) (\\(u \\equiv 1\\)), check controllability of the linearization, and contrast this with STLC at \\((0,0,0)\\).</p>',
        hint: 'Compute \\(B_0 = (0,0,1)^\\top\\), \\(B_1 = A(t)B_0 - \\dot B_0\\), and \\(B_2 = A(t)B_1 - \\dot B_1\\), then take \\(\\det(B_1, B_2, B_0)\\). Remember \\((0,0,0)\\) is not an equilibrium!',
        answer: '<p>Along \\(\\theta(t) = t\\), \\(A(t) = \\begin{pmatrix} 0 & 0 & -\\sin t \\\\ 0 & 0 & \\cos t \\\\ 0 & 0 & 0 \\end{pmatrix}\\), \\(B_0 = (0,0,1)^\\top\\):</p>\\[B_1 = (-\\sin t, \\cos t, 0)^\\top, \\qquad B_2 = (\\cos t, \\sin t, 0)^\\top, \\qquad \\det(B_1, B_2, B_0) = -1 \\neq 0.\\]<p>Thus the linearization is controllable on any \\([0,T]\\), giving local controllability near the <strong>moving endpoint</strong> \\((x(T),\\theta(T))\\). However, it is <strong>not STLC at \\((0,0,0)\\)</strong> because speed is fixed at 1 (sideways targets with the same heading require a full loop).</p>'
      }
    ]
  },
  {
    id: 'palladino-hw3',
    prof: 'palladino',
    profLabel: 'Prof. Palladino',
    date: '2026-11-09',
    title: 'Palladino Homework 3 — Reachable Sets, Krener & Nonlinear Control (+ Midterm 2025 Q1)',
    source: 'IMCT-Homework3-Palladino.pdf & 2026-11-09 Class Notes',
    problems: [
      {
        num: '1',
        title: 'Flat Coefficient ("Hairy Reachable Set") & Reaching (−1, 0)',
        problem: '\\[\\begin{cases} \\dot x_1 = u_1, & x_1(0) = -1, \\\\ \\dot x_2 = u_2 f(x_1), & x_2(0) = 1, \\end{cases} \\qquad |u_i(t)| \\le 1, \\qquad f(x) = \\begin{cases} 0, & x \\le 0, \\\\ e^{-1/x^2}, & x > 0. \\end{cases}\\]<p>(i) Describe the reachable set for different \\(T > 0\\). (ii) Is it possible to reach \\((-1, 0)\\)? If yes, give an explicit bounded control.</p>',
        hint: 'For \\(T \\le 1\\), \\(x_1\\) cannot become positive so \\(\\dot x_2 \\equiv 0\\). For (ii), move right to \\(x_1 = \\varepsilon > 0\\) with \\(u_1 = 1\\), hold \\(u_1 = 0\\) and set \\(u_2 = -1\\) long enough to drop \\(x_2\\) from \\(1\\) to \\(0\\), then move left back to \\(x_1 = -1\\).',
        answer: '<p><strong>(i) Reachable set:</strong> For \\(0 < T \\le 1\\), \\(x_1(t) \\le -1 + t \\le 0\\), so \\(f(x_1) \\equiv 0\\) and \\(\\mathcal{R}_{(-1,1)}(T) = [-1-T, -1+T] \\times \\{1\\}\\) (not STLC). For \\(T > 1\\), trajectories can enter \\(x_1 > 0\\), change \\(x_2\\), and return left ("hairy reachable set"). Over all time, \\(\\bigcup_{T>0} \\mathcal{R}_{(-1,1)}(T) = \\mathbb{R}^2\\).</p><p><strong>(ii) Bounded control reaching \\((-1,0)\\):</strong> Fix \\(\\varepsilon > 0\\) and set \\(\\Delta t = 1/f(\\varepsilon) = e^{1/\\varepsilon^2}\\):</p><ol><li>On \\([0, 1+\\varepsilon)\\): \\(u_1 = 1,\\; u_2 = 0\\) (moves to \\((\\varepsilon, 1)\\)).</li><li>On \\([1+\\varepsilon, 1+\\varepsilon+\\Delta t)\\): \\(u_1 = 0,\\; u_2 = -1\\) (moves vertically to \\((\\varepsilon, 0)\\)).</li><li>On \\([1+\\varepsilon+\\Delta t, 2+2\\varepsilon+\\Delta t]\\): \\(u_1 = -1,\\; u_2 = 0\\) (returns to \\((-1, 0)\\)).</li></ol>'
      },
      {
        num: '2',
        title: 'Cubic Drift: Krener & Direct STLC Computation',
        problem: '\\[\\begin{cases} \\dot x = y^3, & x(0) = 0, \\\\ \\dot y = u, & y(0) = 0, \\end{cases} \\qquad |u| \\le 1.\\]<p>(i) Show why earlier controllability theorems fail. (ii) Verify Krener\'s Theorem applies. (iii) Compute the trajectories for \\(u_1 = +1\\) on \\([0,\\lambda]\\), \\(-1\\) on \\([\\lambda,\\eta]\\) (and \\(u_2 = -u_1\\)) to verify STLC at \\((0,0)\\).</p>',
        hint: 'Linearization has \\(A=0\\) (rank 1), and drift \\(f=(y^3,0)^\\top\\) is not recurrent. Compute three brackets \\([f,g], [[f,g],g], [[[f,g],g],g]\\). For (iii), integrate \\(\\dot y = u_1\\) then \\(\\dot x = y^3\\) carefully matching at \\(t = \\lambda\\).',
        answer: '<p><strong>(i)</strong> Linearization has \\(A = 0, B = (0,1)^\\top\\) (Kalman rank 1); system has non-recurrent drift \\(f = (y^3, 0)^\\top\\).</p><p><strong>(ii) Krener:</strong> With \\([f,g] = Dg\\,f - Df\\,g\\):</p>\\[[f,g] = \\begin{pmatrix} -3y^2 \\\\ 0 \\end{pmatrix}, \\qquad [[f,g],g] = \\begin{pmatrix} 6y \\\\ 0 \\end{pmatrix}, \\qquad [[[f,g],g],g] = \\begin{pmatrix} -6 \\\\ 0 \\end{pmatrix}.\\]<p>Together with \\(g = (0,1)^\\top\\), these span \\(\\mathbb{R}^2\\) and \\(0 \\in \\operatorname{int}[-1,1]\\).</p><p><strong>(iii) Direct computation for \\(u_1\\) (\\(0 < \\lambda < \\eta\\)):</strong></p>\\[y(t) = \\begin{cases} t, & t \\in [0,\\lambda], \\\\ 2\\lambda - t, & t \\in [\\lambda,\\eta], \\end{cases} \\qquad x(t) = \\begin{cases} \\frac{t^4}{4}, & t \\in [0,\\lambda], \\\\ \\frac{\\lambda^4}{2} - \\frac{(2\\lambda - t)^4}{4}, & t \\in [\\lambda,\\eta]. \\end{cases}\\]<p>By oddness, \\(u_2 = -u_1\\) gives \\((-x(\\eta), -y(\\eta))\\). Varying small \\((\\lambda,\\eta)\\) covers a full neighborhood of \\((0,0)\\) in arbitrarily small time \\(\\implies\\) STLC.</p>'
      },
      {
        num: '3',
        title: 'Nonlinear Control Dependence (u²): Linearization at Origin',
        problem: '\\[\\begin{cases} \\dot x_1 = x_1 + x_2^2 + u, \\\\ \\dot x_2 = \\sin x_3 + u^2, \\\\ \\dot x_3 = x_1 + \\sin x_2 + \\cos x_3 - 1, \\end{cases} \\qquad x(0) = (0,0,0), \\quad |u| \\le 1.\\]<p>Prove that the system is locally controllable at the origin.</p>',
        hint: 'Because of \\(u^2\\), it is not control-affine, so use linearization at the equilibrium \\((x,u) = (0,0)\\). Notice \\(\\partial_u(u^2)|_0 = 0\\), so \\(B = (1,0,0)^\\top\\).',
        answer: '<p>\\(F(0,0) = 0\\) and \\(0 \\in \\operatorname{int}[-1,1]\\). Linearizing at \\((0,0)\\):</p>\\[A = D_x F(0,0) = \\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & 0 & 1 \\\\ 1 & 1 & 0 \\end{pmatrix}, \\qquad B = D_u F(0,0) = \\begin{pmatrix} 1 \\\\ 0 \\\\ 0 \\end{pmatrix}.\\]\\[C(A,B) = [B, AB, A^2 B] = \\begin{pmatrix} 1 & 1 & 1 \\\\ 0 & 0 & 1 \\\\ 0 & 1 & 1 \\end{pmatrix}, \\qquad \\det C(A,B) = -1 \\neq 0.\\]<p>By the linearization theorem (P5), the system is locally controllable (STLC) at the origin. \\(\\blacksquare\\)</p>'
      },
      {
        num: 'Midterm 2025 Q1',
        title: 'Recurrent Drift + Lie Brackets in ℝ²',
        problem: '\\[\\begin{cases} \\dot x_1 = -(1 - u)x_2 + u, & x_1(0) = 1, \\\\ \\dot x_2 = (1 - u)x_1, & x_2(0) = 0, \\end{cases} \\qquad u \\in [-1, 1].\\]<p>Show that \\(\\bigcup_{T>0} \\mathcal{R}_{x_0}(T) = \\mathbb{R}^2\\).</p>',
        hint: 'Rewrite as \\(\\dot x = f(x) + g(x)u\\) with \\(f = (-x_2, x_1)^\\top\\) (periodic rotation = weakly recurrent!). Compute \\([f,g]\\) and \\([f,[f,g]]\\) to show full Lie rank everywhere, including \\((0,-1)\\) where \\(g=0\\).',
        answer: '<p>Write \\(\\dot x = f(x) + g(x)u\\) with \\(f(x) = (-x_2, x_1)^\\top\\) and \\(g(x) = (x_2+1, -x_1)^\\top\\). Since \\(f\\) generates periodic rotations, \\(f\\) is weakly recurrent, and \\(0 \\in \\operatorname{int}[-1,1]\\).</p><p>Compute Lie brackets:</p>\\[[f,g] = Dg\\,f - Df\\,g = \\begin{pmatrix} 0 \\\\ -1 \\end{pmatrix}, \\qquad [f,[f,g]] = -Df\\begin{pmatrix} 0 \\\\ -1 \\end{pmatrix} = \\begin{pmatrix} -1 \\\\ 0 \\end{pmatrix}.\\]<p>These two constant vectors span \\(\\mathbb{R}^2\\) at every \\(x \\in \\mathbb{R}^2\\). By the recurrent-drift controllability theorem (P9), \\(\\bigcup_{T>0} \\mathcal{R}_{x_0}(T) = \\mathbb{R}^2\\). \\(\\blacksquare\\)</p>'
      }
    ]
  }
];
