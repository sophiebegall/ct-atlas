// Discoverable proofs for the rabbit hole. Each room reveals its proof in layers:
//   1. idea   — the one picture that makes the theorem true (no computation).
//   2. steps  — the skeleton: one short claim per step, revealed one at a time.
//   3. detail — the full argument behind each claim, opened on demand.
// Keys are hole ids (hole-data.js). Links into other rooms: <a href="#" class="rh-link" data-link="ID">…</a>.
// Full proofs follow the exam flashcards (study-data.js) where one exists; the rest expand the old sketches.
(function () {
  const R = String.raw;
  const dive = (id, text) => `<a href="#" class="rh-link rh-dive" data-link="${id}">${text} ↓</a>`;

  const proofs = {
    // ───────── Controllability
    'kalman-cor': {
      idea: R`<p>The columns of \(C(A,B)\) are all the directions the control can ever push in. From \(x_0\), the system drifts on its own to \(e^{AT}x_0\), and the control adds <em>any</em> vector of \(\operatorname{span}C(A,B)\), nothing more and nothing less. So the reachable set is a shifted copy of that span, and a shifted subspace is all of \(\mathbb R^n\) exactly when the subspace is: \(\operatorname{rank}C=n\).</p>`,
      steps: [
        { claim: R`Split the endpoint into "drift" + "what the control adds".`,
          detail: R`<p>Variation of constants: \[x(T)=e^{AT}x_0+\int_0^Te^{A(T-s)}Bu(s)\,ds.\] The integral is exactly the endpoint of the same control started from \(0\). Hence \(\mathcal R_{x_0}(T)=e^{AT}x_0+\mathcal R_0(T)\).</p>` },
        { claim: R`What the control adds is exactly \(\operatorname{span}C(A,B)\), for every \(T>0\).`,
          detail: R`<p>This is the Kalman theorem: \(\mathcal R_0(T)=\operatorname{Im}C(A,B)\). It is the real content of the proof and has its own proof one level down.</p><p>${dive('kalman-thm', 'Why is the reachable set exactly the span?')}</p>` },
        { claim: R`A shifted subspace is \(\mathbb R^n\) iff the subspace is.`,
          detail: R`<p>\(x_1\) is reachable from \(x_0\) in time \(T\) \(\iff x_1-e^{AT}x_0\in\operatorname{Im}C\).</p><p>(⇐) If \(\operatorname{rank}C=n\), then \(\operatorname{Im}C=\mathbb R^n\) and every \(x_1\) is reachable from every \(x_0\), in every time \(T>0\): complete controllability.</p><p>(⇒) If the system is controllable, take \(x_0=0\): every \(x_1\) lies in \(\operatorname{Im}C\), so \(\operatorname{Im}C=\mathbb R^n\).</p><p>Neither \(T\) nor \(x_0\) appears in \(\operatorname{rank}C=n\), which is why the condition is independent of both. \(\blacksquare\)</p>` },
      ],
    },

    'kalman-thm': {
      idea: R`<p>Two inclusions.</p><p><strong>You can't leave the span.</strong> The control only enters through \(e^{A(T-s)}B=\sum_k\frac{(T-s)^k}{k!}A^kB\), so every reachable point is a combination of the vectors \(A^kb_j\). Cayley–Hamilton says \(A^n,A^{n+1},\dots\) are combinations of \(I,\dots,A^{n-1}\): nothing new after \(A^{n-1}B\).</p><p><strong>You reach all of it.</strong> If a direction \(p\) were invisible to every reachable point (\(p\perp\mathcal R\)), differentiate \(p\cdot x(t)=0\) along a constant control: each derivative at \(t=0\) spits out \(p\cdot A^kb_j=0\). So \(p\) is orthogonal to all of \(C\) too.</p><p>The proof packages both halves at once: two subspaces are equal iff their orthogonal complements are.</p>`,
      steps: [
        { claim: R`\(\mathcal R_0(T)\) is a subspace, so compare orthogonal complements.`,
          detail: R`<p>\(u\mapsto x_u(T)=\int_0^Te^{(T-s)A}Bu(s)\,ds\) is linear, so its image \(\mathcal R_0(T)\) is a linear subspace of \(\mathbb R^n\). In finite dimensions \(V=(V^\perp)^\perp\), so it suffices to show \[p\perp\mathcal R_0(T)\iff p^\top A^kb_j=0\quad\forall\,0\le k\le n-1,\ 1\le j\le m,\] where the right side says exactly \(p\perp\operatorname{Im}C(A,B)\) (its columns are the \(A^kb_j\)).</p>` },
        { claim: R`(⇐) Nothing outside the span is reachable: Cayley–Hamilton.`,
          detail: R`<p>Suppose \(p^\top A^kb_j=0\) for \(k=0,\dots,n-1\) and all \(j\). Cayley–Hamilton: \(A^n=\sum_{i=0}^{n-1}c_iA^i\), so by induction every \(A^k\), \(k\ge n\), is a combination of \(I,A,\dots,A^{n-1}\). Hence \(p^\top A^kb_j=0\) for <em>all</em> \(k\ge0\), and by the power series of the exponential \(p^\top e^{tA}b_j=0\) for all \(t\). Therefore for every control \(u\) \[p^\top x_u(T)=\int_0^T\sum_{j=1}^mp^\top e^{(T-s)A}b_j\,u_j(s)\,ds=0,\] i.e. \(p\perp\mathcal R_0(T)\). This shows \(\mathcal R_0(T)\subseteq\operatorname{Im}C\).</p>` },
        { claim: R`(⇒) Everything in the span is reachable: differentiate at \(t=0\).`,
          detail: R`<p>Suppose \(p\perp\mathcal R_0(T)\). Fix \(j\) and \(t\in[0,T]\). Use \(u=0\) on \([0,T-t]\) (the state stays at \(0\)) and \(u\equiv e_j\) on \([T-t,T]\). The system is autonomous, so the endpoint is \(x(t)\), where \(x'=Ax+b_j\), \(x(0)=0\). Hence \(p^\top x(t)=0\) for all \(t\in[0,T]\). Differentiate repeatedly: \[0=p^\top x'=p^\top(Ax+b_j),\quad 0=p^\top x''=p^\top A(Ax+b_j),\quad\dots,\quad0=p^\top A^k(Ax+b_j).\] At \(t=0\), \(x(0)=0\), so \(p^\top A^kb_j=0\) for all \(k\ge0\) and all \(j\). This shows \(\operatorname{Im}C\subseteq\mathcal R_0(T)\).</p>` },
        { claim: R`Conclude: equal complements, equal subspaces.`,
          detail: R`<p>\(\mathcal R_0(T)^\perp=(\operatorname{Im}C(A,B))^\perp\), so \(\mathcal R_0(T)=\operatorname{Im}C(A,B)\), for every \(T>0\). \(\blacksquare\)</p><p>${dive('kalman-matrix', 'Why stop at \\(A^{n-1}B\\)?')}</p>` },
      ],
    },

    gramian: {
      idea: R`<p>Guess a control: push along the directions the system actually responds to, \(u(t)=B(t)^\top M(T,t)^\top\psi\). Plugging it in, the endpoint is \(x^*+G_T\psi\), where \(x^*\) is where you'd drift without control. If \(G_T\) is invertible, solve for \(\psi\) and you hit any target.</p><p>Conversely, if \(G_T\psi=0\) for some \(\psi\neq0\), then \(\psi\) is a direction no control can touch: every endpoint lies in one hyperplane.</p>`,
      steps: [
        { claim: R`Write the endpoint with the fundamental matrix.`,
          detail: R`<p>Variation of constants for \(x'=A(t)x+B(t)u\): \[x_u(T)=x^*+\int_{t_0}^TM(T,t)B(t)u(t)\,dt,\qquad x^*=M(T,t_0)x_0.\]</p>` },
        { claim: R`(⇐) The guessed control lands at \(x^*+G_T\psi\); choose \(\psi\).`,
          detail: R`<p>With \(\tilde u(t)=B(t)^\top M(T,t)^\top\psi\): \[x(T)=x^*+\Bigl(\int_{t_0}^TM(T,t)B(t)B(t)^\top M(T,t)^\top dt\Bigr)\psi=x^*+G_T\psi.\] If \(G_T\) is invertible, \(\psi=G_T^{-1}(x_1-x^*)\) gives \(x(T)=x_1\). Every \(x_1\) is reachable from every \(x_0\).</p>` },
        { claim: R`(⇒, contrapositive) A kernel vector of \(G_T\) is invisible to the control.`,
          detail: R`<p>If \(G_T\) is singular, take \(\psi\neq0\) with \(G_T\psi=0\). Then \[0=\psi^\top G_T\psi=\int_{t_0}^T\bigl\|B(t)^\top M(T,t)^\top\psi\bigr\|^2dt,\] and the integrand is continuous and \(\ge0\), so \(\psi^\top M(T,t)B(t)=0\) for all \(t\).</p>` },
        { claim: R`So all endpoints lie in a hyperplane: not controllable.`,
          detail: R`<p>For every control \(u\): \(\psi^\top(x_u(T)-x^*)=\int_{t_0}^T\psi^\top M(T,t)B(t)u(t)\,dt=0\). All endpoints lie in \(\{y:\psi\cdot(y-x^*)=0\}\), so e.g. \(x^*+\psi\) is never reached. \(\blacksquare\)</p>` },
      ],
    },

    'linearization-thm': {
      idea: R`<p>Look at the endpoint map "control \(\mapsto\) where you are at time \(\tau\)". At the equilibrium, its derivative <em>is</em> the endpoint map of the linearised system. Kalman says that linear map is onto \(\mathbb R^n\). A map whose derivative is onto covers a whole neighbourhood (inverse function theorem). So the nonlinear system reaches every point near \(\bar x\).</p><p>To use the finite-dimensional inverse function theorem, the proof first shrinks the controls to an \(n\)-parameter family.</p>`,
      steps: [
        { claim: R`Pick \(n\) controls that the linear system turns into a basis.`,
          detail: R`<p>Fix \(\tau>0\). Kalman for \(y'=Ay+Bv\), \(y(0)=0\) gives \(\mathcal R_0(\tau)=\mathbb R^n\), so there are bounded controls \(v_1,\dots,v_n\) with \[y_i=\int_0^\tau e^{(\tau-s)A}Bv_i(s)\,ds\] a basis of \(\mathbb R^n\).</p><p>${dive('kalman-cor', 'Why Kalman gives this')}</p>` },
        { claim: R`Build an \(n\)-parameter family of controls and its endpoint map \(F\).`,
          detail: R`<p>For \(a\in\mathbb R^n\) let \(u_a=\sum_ia_iv_i\) and \(F(a)=x(\tau;u_a)\), the endpoint from \(x(0)=\bar x\). Since the \(v_i\) are bounded and \(U\) contains a neighbourhood of \(0\), \(u_a\) is admissible for \(|a|\) small. \(F(0)=\bar x\), because \(f(\bar x,0)=0\): with \(u=0\) you stay put.</p>` },
        { claim: R`The derivative of \(F\) at \(0\) is \([y_1\cdots y_n]\).`,
          detail: R`<p>The technical lemma (differentiable dependence on parameters): \(z_i=\partial_{a_i}x(\cdot;u_a)|_{a=0}\) solves the variational equation \[z_i'=D_xf\,z_i+D_uf\,v_i,\qquad z_i(0)=0,\] along the reference trajectory. Here the reference is \(x\equiv\bar x\), \(u\equiv0\), so the coefficients are the constants \(A\), \(B\), and \[\partial_{a_i}F(0)=z_i(\tau)=\int_0^\tau e^{(\tau-s)A}Bv_i\,ds=y_i.\]</p><p>${dive('tech-lemma', 'The derivative of "where you end up"')}</p>` },
        { claim: R`Inverse function theorem: \(F\) covers a neighbourhood of \(\bar x\).`,
          detail: R`<p>\(DF(0)=[y_1\cdots y_n]\) is invertible, so \(F\) maps a neighbourhood of \(0\) onto a neighbourhood of \(\bar x\). Every point there is \(x(\tau;u_a)\) for an admissible \(u_a\): \(\bar x\in\operatorname{int}\mathcal R_{\bar x}(\tau)\). Since \(\tau>0\) was arbitrary, the system is small-time locally controllable at \(\bar x\). \(\blacksquare\)</p>` },
      ],
    },

    'lie-limits': {
      idea: R`<p>Flow along \(f\) for time \(\varepsilon\), then along \(g\); compare with the other order. To first order both land at \(\bar x+\varepsilon(f+g)\): order doesn't matter. The difference appears at order \(\varepsilon^2\): running \(g\) <em>after</em> \(f\), you evaluate \(g\) at a point \(f\) has already moved, which adds \(\varepsilon^2Dg\,f\). The other order adds \(\varepsilon^2Df\,g\). The gap divided by \(\varepsilon^2\) is \(Dg\,f-Df\,g=[f,g]\).</p>`,
      steps: [
        { claim: R`Taylor-expand one flow to second order.`,
          detail: R`<p>\(\frac{d}{dt}\phi^f_t=f(\phi^f_t)\) and \(\frac{d^2}{dt^2}\phi^f_t=Df(\phi^f_t)f(\phi^f_t)\), so \[\phi^f_\varepsilon(\bar x)=\bar x+\varepsilon f+\tfrac{\varepsilon^2}2Df\,f+O(\varepsilon^3)\] (everything evaluated at \(\bar x\)).</p>` },
        { claim: R`Compose: \(g\) after \(f\) picks up \(\varepsilon^2Dg\,f\).`,
          detail: R`<p>Let \(y=\phi^f_\varepsilon(\bar x)\). Then \(\phi^g_\varepsilon(y)=y+\varepsilon g(y)+\tfrac{\varepsilon^2}2Dg\,g(y)+O(\varepsilon^3)\), with \(g(y)=g+\varepsilon Dg\,f+O(\varepsilon^2)\) and \(Dg\,g(y)=Dg\,g+O(\varepsilon)\). Collecting: \[\phi^g_\varepsilon\phi^f_\varepsilon(\bar x)=\bar x+\varepsilon(f+g)+\tfrac{\varepsilon^2}2(Df\,f+Dg\,g)+\varepsilon^2Dg\,f+O(\varepsilon^3).\]</p>` },
        { claim: R`Swap the order, subtract, divide by \(\varepsilon^2\): first formula.`,
          detail: R`<p>Exchanging \(f\) and \(g\), the only change is \(\varepsilon^2Df\,g\) in place of \(\varepsilon^2Dg\,f\). Subtracting, \[\frac{\phi^g_\varepsilon\phi^f_\varepsilon(\bar x)-\phi^f_\varepsilon\phi^g_\varepsilon(\bar x)}{\varepsilon^2}=Dg\,f-Df\,g+O(\varepsilon)\to[f,g](\bar x).\]</p>` },
        { claim: R`The loop formula: undo the reverse order.`,
          detail: R`<p>Let \(Q=\phi^f_\varepsilon\circ\phi^g_\varepsilon\). Then \(\phi^g_{-\varepsilon}\phi^f_{-\varepsilon}=Q^{-1}\), and by the previous step \[\phi^g_\varepsilon\phi^f_\varepsilon(\bar x)=Q(\bar x)+\delta,\qquad\delta=\varepsilon^2[f,g](\bar x)+O(\varepsilon^3).\] \(Q\) is \(\varepsilon\)-close to the identity with \(DQ=I+O(\varepsilon)\), so \(Q^{-1}(Q(\bar x)+\delta)=\bar x+(I+O(\varepsilon))\delta+O(|\delta|^2)=\bar x+\varepsilon^2[f,g](\bar x)+O(\varepsilon^3)\). Subtract \(\bar x\), divide by \(\varepsilon^2\). \(\blacksquare\)</p><p><small>This last step is a short way to get the loop version; the notes may expand all four flows instead. Same result.</small></p>` },
      ],
    },

    // ───────── Optimal control
    'necessary-cond': {
      idea: R`<p>If \(u^*\) is best, wiggling it to \(u^*+\varepsilon h\) cannot help, so \(\frac{d}{d\varepsilon}J=0\) at \(\varepsilon=0\). The trouble: the wiggle also moves the state, and that change is hard to compute.</p><p>The trick: add a clever zero involving a free function \(\lambda\) (the costate), then <em>choose</em> \(\lambda\) so that every term with the state's change cancels. What's left says \(\int(f_u+\lambda g_u)h=0\) for every \(h\), so \(f_u+\lambda g_u=0\).</p>`,
      steps: [
        { claim: R`A small wiggle in \(u\) gives a small change in \(x\) (Gronwall).`,
          detail: R`<p>Take a bounded piecewise continuous \(h\) (\(|h|\le M\)), \(u_\varepsilon=u^*+\varepsilon h\), \(x_\varepsilon=x^{u_\varepsilon}\). From the integral form of the ODE and the mean value theorem on \(g\in C^1\): \[|x_\varepsilon(t)-x^*(t)|\le CM(t_1-t_0)|\varepsilon|+C\int_{t_0}^t|x_\varepsilon-x^*|\,ds.\] Gronwall: \(|x_\varepsilon(t)-x^*(t)|\le CM(t_1-t_0)e^{C(t_1-t_0)}|\varepsilon|\). So \(x_\varepsilon\to x^*\) uniformly, which justifies differentiating under the integral.</p><p>${dive('variation-lemma', 'More on this lemma')}</p>` },
        { claim: R`Best \(u^*\) ⇒ \(\frac{d}{d\varepsilon}J(u_\varepsilon)=0\) at \(\varepsilon=0\).`,
          detail: R`<p>\(u\) is unconstrained, so every \(u_\varepsilon\) is admissible and \(\varepsilon\mapsto J(u_\varepsilon)\) has a maximum at \(\varepsilon=0\).</p>` },
        { claim: R`Add a zero built from a free function \(\lambda\).`,
          detail: R`<p>For any piecewise differentiable \(\lambda\): \(\int_{t_0}^{t_1}(\lambda x_\varepsilon)'\,dt-\lambda(t_1)x_\varepsilon(t_1)+\lambda(t_0)x_0=0\). Expand \((\lambda x_\varepsilon)'=\lambda'x_\varepsilon+\lambda g\) and add to \(J\): \[J(u_\varepsilon)=\int_{t_0}^{t_1}\bigl[f+\lambda'x_\varepsilon+\lambda g\bigr]dt-\lambda(t_1)x_\varepsilon(t_1)+\lambda(t_0)x_0.\]</p>` },
        { claim: R`Differentiate at \(\varepsilon=0\).`,
          detail: R`<p>\[0=\int_{t_0}^{t_1}\Bigl[(f_x+\lambda'+\lambda g_x)\,\partial_\varepsilon x_\varepsilon\big|_0+(f_u+\lambda g_u)\,h\Bigr]dt-\lambda(t_1)\,\partial_\varepsilon x_\varepsilon(t_1)\big|_0.\] (The term \(\lambda(t_0)x_0\) does not depend on \(\varepsilon\).)</p>` },
        { claim: R`Choose \(\lambda\) to kill the state terms; then choose \(h\) cleverly.`,
          detail: R`<p>Let \(\lambda\) solve \(\lambda'=-f_x-\lambda g_x\), \(\lambda(t_1)=0\) (a linear ODE, so it has a solution). Both state terms vanish: \(\int_{t_0}^{t_1}(f_u+\lambda g_u)h\,dt=0\) for <em>every</em> \(h\). Take \(h=f_u+\lambda g_u\): \(\int(f_u+\lambda g_u)^2=0\), so \(f_u+\lambda g_u=0\) at continuity points. \(\blacksquare\)</p>` },
      ],
    },

    'pmp-concave': {
      idea: R`<p>A concave function lies below its tangent line. \(H=f+\lambda g\) is concave in \(u\) (\(f\), \(g\) concave and \(\lambda\ge0\) keeps the sign), and its tangent at \(u^*\) is flat because \(H_u=0\) there. A concave function with a flat tangent sits at its maximum.</p>`,
      steps: [
        { claim: R`Hypotheses.`,
          detail: R`<p>\(f,g\in C^1\) concave in \(u\); \(H_u(t,x^*,u^*,\lambda)=0\) from the necessary conditions; \(\lambda(t)\ge0\) (not needed if \(g\) is affine in \(u\)).</p><p>${dive('necessary-cond', 'Where \\(H_u=0\\) comes from')}</p>` },
        { claim: R`Tangent-line inequalities for \(f\) and \(g\).`,
          detail: R`<p>A \(C^1\) concave function lies below its tangent: \[f(t,x^*,u^*)-f(t,x^*,u)\ge f_u(t,x^*,u^*)(u^*-u),\] \[g(t,x^*,u^*)-g(t,x^*,u)\ge g_u(t,x^*,u^*)(u^*-u).\]</p>` },
        { claim: R`Multiply the second by \(\lambda\ge0\) and add.`,
          detail: R`<p>\[H(\dots,u^*)-H(\dots,u)=(f^*-f)+\lambda(g^*-g)\ge(f_u^*+\lambda g_u^*)(u^*-u)=H_u^*(u^*-u)=0.\] So \(H(t,x^*,u,\lambda)\le H(t,x^*,u^*,\lambda)\) for every \(u\). \(\blacksquare\)</p>` },
      ],
    },

    sufficient: {
      idea: R`<p>Compare \(J(u^*)\) with any \(J(u)\) directly. Concavity bounds \(f^*-f\) from below by its linear part. The costate equations rewrite that linear part in terms of \(\lambda\), an integration by parts moves \(\lambda'\) onto the state, and what's left is \(\lambda\times\)(the concavity gap of \(g\)), which is \(\ge0\).</p>`,
      steps: [
        { claim: R`Concavity of \(f\): lower bound by the linear part.`,
          detail: R`<p>For any admissible \((x,u)\): \[J(u^*)-J(u)=\int_{t_0}^{t_1}(f^*-f)\,dt\ge\int_{t_0}^{t_1}\bigl[f_x^*(x^*-x)+f_u^*(u^*-u)\bigr]dt.\]</p>` },
        { claim: R`Substitute the optimality equations.`,
          detail: R`<p>\(H_u^*=0\) gives \(f_u^*=-\lambda g_u^*\); \(\lambda'=-H_x^*\) gives \(f_x^*=-\lambda'-\lambda g_x^*\). So \[J(u^*)-J(u)\ge\int_{t_0}^{t_1}\Bigl[-\lambda'(x^*-x)-\lambda\bigl(g_x^*(x^*-x)+g_u^*(u^*-u)\bigr)\Bigr]dt.\]</p>` },
        { claim: R`Integrate by parts; the boundary terms vanish.`,
          detail: R`<p>\(\lambda(t_1)=0\) and \(x^*(t_0)=x(t_0)=x_0\): \[\int_{t_0}^{t_1}-\lambda'(x^*-x)\,dt=-\bigl[\lambda(x^*-x)\bigr]_{t_0}^{t_1}+\int_{t_0}^{t_1}\lambda(x^{*\prime}-x')\,dt=\int_{t_0}^{t_1}\lambda(g^*-g)\,dt.\]</p>` },
        { claim: R`What's left is \(\lambda\times\)(concavity gap of \(g\)) \(\ge0\).`,
          detail: R`<p>\[J(u^*)-J(u)\ge\int_{t_0}^{t_1}\lambda\bigl[g^*-g-g_x^*(x^*-x)-g_u^*(u^*-u)\bigr]dt\ge0:\] the bracket is \(\ge0\) by joint concavity of \(g\), and \(\lambda\ge0\). \(\blacksquare\)</p>` },
      ],
    },

    'ham-lipschitz': {
      idea: R`<p>By the PMP, \(\tilde H(t)\) is the <em>maximum</em> over \(u\) of \(H(t,x^*(t),u,\lambda(t))\). For each fixed \(u\), that is Lipschitz in \(t\), with one constant for all \(u\) (\(x^*\), \(\lambda\) are Lipschitz and \(H\) has bounded derivatives). A maximum of functions that are all Lipschitz with the same constant is Lipschitz. The proof does this by hand: compare at \(s\) and \(t\), using the PMP once in each direction.</p>`,
      steps: [
        { claim: R`Everything stays in a compact set where \(H\)'s derivatives are bounded.`,
          detail: R`<p>On \([t_0,t_1]\), \(x^*\), \(\lambda\) and \(u^*\) are bounded, so all points \((t,x^*(t),u,\lambda(t))\) with \(u\) in the range of \(u^*\) lie in a compact box \(K\). \(H\in C^1\), so \(|H_t|,|H_x|,|H_\lambda|\le C\) on \(K\). Also \(x^{*\prime}=g\) and \(\lambda'=-H_x\) are bounded, so \(x^*\) and \(\lambda\) are Lipschitz.</p>` },
        { claim: R`For a fixed control value \(\bar u\): Lipschitz in \(t\).`,
          detail: R`<p>Mean value theorem in each variable (the box is convex): \[|H(t,x^*(t),\bar u,\lambda(t))-H(s,x^*(s),\bar u,\lambda(s))|\le\tilde C|t-s|,\qquad\tilde C=C(1+\mathrm{Lip}_{x^*}+\mathrm{Lip}_\lambda).\]</p>` },
        { claim: R`PMP at \(s\), then PMP at \(t\).`,
          detail: R`<p>\(u^*(s)\) maximises \(H\) at time \(s\), so it beats \(u^*(t)\) there: \[\tilde H(s)\ge H(s,x^*(s),u^*(t),\lambda(s))\ge H(t,x^*(t),u^*(t),\lambda(t))-\tilde C|t-s|=\tilde H(t)-\tilde C|t-s|.\] Swapping \(s\) and \(t\): \(\tilde H(t)\ge\tilde H(s)-\tilde C|t-s|\). Together \(|\tilde H(t)-\tilde H(s)|\le\tilde C|t-s|\). \(\blacksquare\)</p>` },
      ],
    },

    'ham-constant': {
      idea: R`<p>Along the optimum, the state and the costate push \(H\) in exactly opposite directions (\(x'=H_\lambda\), \(\lambda'=-H_x\), as with energy in mechanics), and the control cannot change \(H\) to first order because \(u^*\) maximises it. With no explicit \(t\), nothing else moves \(H\). Lipschitz then upgrades "derivative \(0\) almost everywhere" to "constant".</p>`,
      steps: [
        { claim: R`\(\tilde H\) is Lipschitz, so differentiable almost everywhere.`,
          detail: R`<p>From the previous theorem. A Lipschitz function on an interval is absolutely continuous: differentiable a.e. and \(\tilde H(t)-\tilde H(t_0)=\int_{t_0}^t\tilde H'\).</p><p>${dive('ham-lipschitz', 'Why \\(\\tilde H\\) is Lipschitz')}</p>` },
        { claim: R`Where it is differentiable, \(\tilde H'=0\).`,
          detail: R`<p><strong>Quick version (chain rule)</strong>, where \(u^*\) is differentiable: \[\tilde H'=H_x x^{*\prime}+H_\lambda\lambda'+H_uu^{*\prime}+H_t=H_xH_\lambda-H_\lambda H_x+0+0=0,\] using \(x^{*\prime}=g=H_\lambda\), \(\lambda'=-H_x\), \(H_u=0\), and \(H_t=0\) (autonomous).</p><p><strong>Without differentiating \(u^*\)</strong>: fix such a \(t\) (also a continuity point of \(u^*\), so \(x^*\), \(\lambda\) are differentiable there) and put \(\varphi(s)=H(x^*(s),u^*(t),\lambda(s))\). By the PMP, \(\tilde H(s)\ge\varphi(s)\) with equality at \(s=t\), so \(\tilde H-\varphi\) has a minimum at \(t\) and \(\tilde H'(t)=\varphi'(t)=H_xH_\lambda+H_\lambda(-H_x)=0\).</p>` },
        { claim: R`Lipschitz + derivative \(0\) a.e. ⇒ constant.`,
          detail: R`<p>\(\tilde H(t)-\tilde H(t_0)=\int_{t_0}^t\tilde H'=0\). \(\blacksquare\)</p><p>Lipschitz is really needed: the Cantor function has derivative \(0\) a.e. and is not constant.</p>` },
      ],
    },

    dpp: {
      idea: R`<p>If a better tail existed, splice it into the optimal path at time \(\hat t\): same beginning, better ending, so the whole thing beats the optimum. Contradiction.</p>`,
      steps: [
        { claim: R`Suppose some \(\hat u\) beats the tail of \(u^*\).`,
          detail: R`<p>Suppose \(u^*|_{[\hat t,t_1]}\) is not optimal for the tail problem \((\hat P)\): there is an admissible \(\hat u:[\hat t,t_1]\to\mathbb R\) with \(\hat J(\hat u)>\hat J(u^*|_{[\hat t,t_1]})\).</p>` },
        { claim: R`Splice: \(u^*\) up to \(\hat t\), then \(\hat u\).`,
          detail: R`<p>\[\hat u_1(t)=\begin{cases}u^*(t),&t\in[t_0,\hat t),\\\hat u(t),&t\in[\hat t,t_1].\end{cases}\] \(\hat u_1\) is piecewise continuous. Its trajectory equals \(x^*\) on \([t_0,\hat t]\), so it reaches \(x^*(\hat t)\) at time \(\hat t\) and then follows \(x^{\hat u}\), the tail problem's trajectory.</p>` },
        { claim: R`Compare: the heads cancel, the tails don't.`,
          detail: R`<p>The integrals over \([t_0,\hat t]\) agree, so \[J(\hat u_1)-J(u^*)=\hat J(\hat u)-\hat J(u^*|_{[\hat t,t_1]})>0,\] contradicting optimality of \(u^*\). \(\blacksquare\)</p>` },
      ],
    },

    'dpp-unique': {
      idea: R`<p>Same splice. If the tail had a second optimal control, gluing it on gives a second control that is just as good for the whole problem, but \(u^*\) was the only one.</p>`,
      steps: [
        { claim: R`Suppose another optimal \(\hat u\neq u^*|_{[\hat t,t_1]}\) for the tail.`,
          detail: R`<p>Then \(\hat J(\hat u)=\hat J(u^*|_{[\hat t,t_1]})\) (the tail of \(u^*\) is optimal by the DPP).</p><p>${dive('dpp', 'Why the tail is optimal')}</p>` },
        { claim: R`Splice as before: an equally good control, different from \(u^*\).`,
          detail: R`<p>\(\hat u_1=u^*\) on \([t_0,\hat t)\), \(\hat u\) on \([\hat t,t_1]\). As in the DPP, \(J(\hat u_1)-J(u^*)=\hat J(\hat u)-\hat J(u^*|)=0\), so \(\hat u_1\) is optimal for \((P)\) and \(\hat u_1\neq u^*\). This contradicts uniqueness. \(\blacksquare\)</p>` },
      ],
    },

    transversality: {
      idea: R`<p>Exactly the basic derivation, but \(J\) now has an end term \(\varphi(x(t_1))\). Differentiating it leaves one extra boundary term: \([\varphi'(x^*(t_1))-\lambda(t_1)]\cdot\)(change of the endpoint). Before, we killed the boundary term with \(\lambda(t_1)=0\); now we kill it with \(\lambda(t_1)=\varphi'(x^*(t_1))\). Nothing else changes.</p>`,
      steps: [
        { claim: R`Same setup, plus the term \(\varphi(x_\varepsilon(t_1))\).`,
          detail: R`<p>With \(u_\varepsilon=u^*+\varepsilon h\) and the same added zero: \[J(u_\varepsilon)=\int_{t_0}^{t_1}\bigl[f+\lambda'x_\varepsilon+\lambda g\bigr]dt-\lambda(t_1)x_\varepsilon(t_1)+\lambda(t_0)x_0+\varphi(x_\varepsilon(t_1)).\]</p><p>${dive('necessary-cond', 'The basic derivation')}</p>` },
        { claim: R`Differentiate at \(\varepsilon=0\): one extra boundary term.`,
          detail: R`<p>Chain rule on \(\varphi\in C^1\): \[0=\int_{t_0}^{t_1}\Bigl[(f_x+\lambda'+\lambda g_x)\,\partial_\varepsilon x_\varepsilon+(f_u+\lambda g_u)h\Bigr]dt+\bigl[\varphi'(x^*(t_1))-\lambda(t_1)\bigr]\partial_\varepsilon x_\varepsilon(t_1).\]</p>` },
        { claim: R`Kill it with \(\lambda(t_1)=\varphi'(x^*(t_1))\).`,
          detail: R`<p>Choose \(\lambda'=-(f_x+\lambda g_x)\), \(\lambda(t_1)=\varphi'(x^*(t_1))\). Then \(\int(f_u+\lambda g_u)h=0\) for all \(h\), and \(h=f_u+\lambda g_u\) gives \(f_u+\lambda g_u=0\) as before. \(\blacksquare\)</p><p>In \(\mathbb R^n\) the same computation gives \(p(T)=\nabla_x\varphi(x^*(T))\).</p>` },
      ],
    },

    'bounded-conditions': {
      idea: R`<p>In the interior you can wiggle \(u\) both ways, so \(H_u\) must be \(0\). At a wall you can only wiggle inwards. If \(H_u>0\) somewhere with \(u^*<b\), pushing \(u\) up a little there would increase \(J\), which is impossible. So \(H_u>0\) forces \(u^*=b\), and \(H_u<0\) forces \(u^*=a\).</p>`,
      steps: [
        { claim: R`One-sided first variation: \(\int H_u h\le0\) for every inward \(h\).`,
          detail: R`<p>If \(u^*+\varepsilon h\) is admissible for \(0<\varepsilon\le\varepsilon_0\), then \(J(u^*+\varepsilon h)\le J(u^*)\), so the right derivative at \(0\) is \(\le0\). With the costate chosen as in the unbounded case, that derivative is \(\int_{t_0}^{t_1}(f_u+\lambda g_u)h\,dt=\int H_uh\,dt\). So \(\int H_uh\le0\).</p><p>${dive('one-sided', 'One-sided variations')}</p>` },
        { claim: R`Case \(u^*(s)<b\): suppose \(H_u(s)>0\) and localise.`,
          detail: R`<p>\(s\) is a continuity point of \(u^*\), and \(H_u\) is continuous there. So there is a closed interval \(I\ni s\) of positive length on which \(H_u>0\) and \(u^*\) is continuous with \(u^*<b\). Let \(M=\max_Iu^*<b\).</p>` },
        { claim: R`Push up on \(I\): \(h=(b-M)\mathbf 1_I\) is an admissible direction.`,
          detail: R`<p>\(h\ge0\), and on \(I\): \(u^*+\varepsilon h\le M+\varepsilon(b-M)\le b\) for \(0<\varepsilon\le1\). Off \(I\) nothing changes. So \(u^*+\varepsilon h\in[a,b]\).</p>` },
        { claim: R`Contradiction; the lower wall is symmetric.`,
          detail: R`<p>\(0\ge\int H_uh=(b-M)\int_IH_u>0\). Contradiction, so \(u^*(s)<b\Rightarrow H_u(s)\le0\). Symmetrically (push down with \(h=-(m-a)\mathbf 1_I\), \(m=\min_Iu^*>a\)): \(u^*(s)>a\Rightarrow H_u(s)\ge0\).</p><p>Read off: interior \(\Rightarrow H_u=0\); \(u^*=a\Rightarrow H_u\le0\); \(u^*=b\Rightarrow H_u\ge0\). For minimisation, all signs flip. \(\blacksquare\)</p>` },
      ],
    },

    'normal-cone-cond': {
      idea: R`<p>The first-order condition says: moving from \(u^*\) towards any admissible \(v\) cannot increase \(J\), i.e. the gradient makes an angle \(\ge90°\) with every direction \(v-u^*\) that stays in \(K\). That is literally the definition of "the gradient lies in the normal cone of \(K\) at \(u^*\)". The normal cone just packages "you can't go uphill without leaving \(K\)".</p>`,
      steps: [
        { claim: R`\(K\) convex ⇒ every \(v-u^*\) is an admissible direction.`,
          detail: R`<p>For \(v\in K\) and \(\varepsilon\in[0,1]\): \(u^*+\varepsilon(v-u^*)=(1-\varepsilon)u^*+\varepsilon v\in K\).</p>` },
        { claim: R`First variation in direction \(v-u^*\), with the adjoint vector \(p\).`,
          detail: R`<p>As in the scalar case, choose \(p'=-f_x-g_x^\top p\), \(p(T)=\varphi_x(x^*(T))\) to kill every term with the state's change. The right derivative is \[\frac{d}{d\varepsilon}J\bigl(u^*+\varepsilon(v-u^*)\bigr)\Big|_{0^+}=\bigl\langle f_u+g_u^\top p,\ v-u^*\bigr\rangle_{L^2}.\] Optimality makes it \(\le0\) for every \(v\in K\).</p><p>${dive('adjoint-rn', 'The adjoint vector')}</p>` },
        { claim: R`That inequality is the definition of the normal cone.`,
          detail: R`<p>\(N_K(u^*)=\{w:\langle w,v-u^*\rangle\le0\ \forall v\in K\}\). So \(f_u+g_u^\top p\in N_K(u^*)\). \(\blacksquare\)</p><p>Special cases: \(K=L^2\) (free): \(N_K=\{0\}\), so \(f_u+g_u^\top p=0\). \(K=\{a\le u\le b\}\): pointwise, \(<0\Rightarrow u^*=a\) and \(>0\Rightarrow u^*=b\).</p><p>${dive('normal-cone', 'What the normal cone looks like')}</p>` },
      ],
    },
  };

  window.CT_PROOFS = proofs;
})();
