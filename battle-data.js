/* Original exam-style exercises keyed to the methods in CT_CANVAS. */
window.CT_BATTLE = (() => {
  const encounter = (board, node, name, problem, move, decoys, hint, firstStep, why, solution) =>
    ({ board, node, name, problem, move, decoys, hint, firstStep, why, solution });

  return [
    encounter('palladino', 'linear', 'Rank Warden', [
      'Let $a\\in\\mathbb R$. Consider the system',
      '\\[\\begin{gathered}\\dot x=Ax+Bu,\\quad u\\in\\mathbb R,\\\\ A=\\begin{pmatrix}0&1\\\\0&0\\end{pmatrix},\\quad B=\\begin{pmatrix}0\\\\a\\end{pmatrix}.\\end{gathered}\\]',
      'Determine all values of $a$ for which the system is controllable on $[0,T]$ for every $T>0$.'
    ],
      'Kalman rank', ['Linearize at an equilibrium', 'Chow–Rashevskii', 'Check the rank of $B$ alone'],
      'The drift can generate new directions by acting on the columns of $B$.',
      'Compute $AB$ and test whether the two columns of $[B,AB]$ are independent.',
      'The Kalman columns span the directions the input can generate through the constant dynamics.',
      '$AB=(a,0)^\\top$, so $\\det[B,AB]=-a^2$. The system is controllable exactly when $a\\ne0$.'),
    encounter('pignotti', 'quadratic', 'Boundkeeper', [
      'Consider the optimal control problem on $[0,1]$ with free terminal state.',
      '\\[\\begin{aligned}&\\min_{0\\le u(t)\\le1}\\int_0^1\\left(\\tfrac12 u(t)^2-2x(t)\\right)\\,dt\\\\&\\dot x=u,\\quad x(0)=0.\\end{aligned}\\]',
      'Find an optimal control and determine when the upper bound is active.'
    ],
      'Solve, then clip', ['Pick a bound by the switching sign', 'Always use the stationary control', 'Compare only the two bounds'],
      'The Hamiltonian is strictly convex in $u$. Its stationary point can lie outside $[0,1]$.',
      'With $H=\\tfrac12u^2-2x+\\lambda u$, solve $\\dot\\lambda=2$ with $\\lambda(1)=0$, then project $-\\lambda(t)$ onto $[0,1]$.',
      'A strictly convex quadratic is minimized over an interval at the feasible point closest to its vertex.',
      '$\\lambda(t)=2(t-1)$ gives $u^*(t)=\\min\\{1,2(1-t)\\}$. The upper bound is active for $0\\le t\\le\\tfrac12$. Indeed, $\\int_0^1 x(t)\\,dt=\\int_0^1(1-t)u(t)\\,dt$, so this control minimizes the original cost pointwise after substitution.'),
    encounter('palladino', 'bounded', 'Drift Gate', [
      'Consider the scalar system',
      '\\[\\dot x=x+u,\\qquad u(t)\\in[-1,1].\\]',
      'Is the system small-time locally controllable at $x=0$? Can it be steered from $x(0)=2$ to $0$ in any positive time?'
    ],
      'Compute the reachable intervals from both initial states', ['Infer global controllability from full Kalman rank', 'Infer STLC at every state from full Kalman rank', 'Conclude that bounded controls rule out STLC'],
      'The drift vanishes at the origin. Starting from $2$, try the smallest admissible input.',
      'Compute the reachable interval at time $T$ using $x(T)=e^Tx(0)+\\int_0^T e^{T-s}u(s)\\,ds$.',
      'The kernel is positive, so the extreme constant controls give the endpoints of the reachable interval.',
      'From $0$ that interval is $[-(e^T-1),e^T-1]$, which contains a neighborhood of $0$ for each $T>0$. From $2$ the smallest reachable state is $2e^T-(e^T-1)=e^T+1>0$.'),
    encounter('pignotti', 'payoff', 'Terminal Echo', [
      'Consider the optimal control problem on $[0,1]$ with free terminal state.',
      '\\[\\begin{aligned}&\\min_{u(t)\\in\\mathbb R}\\left[\\tfrac12\\int_0^1 u(t)^2\\,dt+\\tfrac12(x(1)-2)^2\\right]\\\\&\\dot x=u,\\quad x(0)=0.\\end{aligned}\\]',
      'Write the terminal condition for the costate and determine the optimal pair $(x^*,u^*)$.'
    ],
      'Use the terminal-payoff condition', ['Set $\\lambda(1)=0$', 'Prescribe $x(1)=2$', 'Set $H(1)=0$'],
      'The final state can move, and moving it changes the terminal penalty.',
      'With $H=\\tfrac12u^2+\\lambda u$, impose $\\lambda(1)=x(1)-2$ and use $u=-\\lambda$.',
      'The costate boundary term balances the first-order variation of the terminal payoff.',
      'The costate is constant, hence $x(1)=-\\lambda$. The terminal condition gives $\\lambda=-1$, so $u^*(t)=1$ and $x^*(t)=t$. Convexity of the Hamiltonian and terminal penalty gives global optimality.'),
    encounter('palladino', 'time', 'Clock Shifter', [
      'Let $T>0$. Consider the time-dependent system on $[0,T]$.',
      '\\[\\dot x_1=u,\\qquad \\dot x_2=t\\,u,\\qquad u(t)\\in\\mathbb R.\\]',
      'Compute the controllability Gramian and determine for which $T>0$ the system is controllable.'
    ],
      'Test Gramian invertibility', ['Freeze $A,B$ at $T$ and apply Kalman', 'Test the eigenvalues of $A(t)$', 'Check the rank of $B(T)$ alone'],
      'Here $A(t)=0$, so the state-transition matrix is the identity.',
      'Integrate $B(t)B(t)^\\top$ from $0$ to $T$, with $B(t)=(1,t)^\\top$.',
      'The Gramian measures the span of the input directions collected over the entire interval.',
      '\\[G_T=\\begin{pmatrix}T&T^2/2\\\\T^2/2&T^3/3\\end{pmatrix},\\qquad \\det G_T=T^4/12.\\] Thus the system is controllable for every $T>0$.'),
    encounter('pignotti', 'affine', 'Switch Phantom', [
      'Consider the optimal control problem on $[0,1]$ with free terminal state.',
      '\\[\\begin{aligned}&\\min_{-1\\le u(t)\\le1}\\left[\\int_0^1 x(t)\\,dt-\\tfrac12x(1)\\right]\\\\&\\dot x=u,\\quad x(0)=0.\\end{aligned}\\]',
      'Determine the optimal control and any switching time.'
    ],
      'Use the sign of the switching function', ['Find and clip a quadratic minimizer', 'Set $H_u=0$ throughout', 'Use the midpoint of the bounds'],
      'The Hamiltonian is affine in $u$. The coefficient of $u$ determines which bound minimizes it.',
      'For $H=x+\\lambda u$, solve $\\dot\\lambda=-1$ with $\\lambda(1)=-\\tfrac12$.',
      'A linear function on an interval is minimized at the endpoint opposite the direction of increase.',
      '$\\lambda(t)=\\tfrac12-t$. Take $u^*(t)=-1$ before $t=\\tfrac12$ and $u^*(t)=1$ after it. The value at the switch has no effect. Substituting $x(t)=\\int_0^t u(s)\\,ds$ reduces the cost to $\\int_0^1(\\tfrac12-t)u(t)\\,dt$.'),
    encounter('palladino', 'equilibrium', 'Equilibrium Mimic', [
      'Consider the system in $\\mathbb R^2$ with $u(t)\\in[-1,1]$.',
      '\\[\\dot x_1=x_2+x_1^2,\\qquad \\dot x_2=u.\\]',
      'Determine whether the system is small-time locally controllable at the origin.'
    ],
      'Linearize at the equilibrium, then test Kalman rank', ['Apply Kalman directly to the nonlinear dynamics', 'Assume equilibrium implies STLC', 'Apply Chow–Rashevskii without checking for drift'],
      'First check that $(x,u)=(0,0)$ is an equilibrium pair with interior control.',
      'Compute $D_xF$ and $D_uF$ at $(x,u)=(0,0)$ and form $[B,AB]$.',
      'Full rank makes the linearized endpoint map onto, so small admissible perturbations reach a neighborhood.',
      '$A=\\left(\\begin{smallmatrix}0&1\\\\0&0\\end{smallmatrix}\\right)$ and $B=(0,1)^\\top$, so $AB=(1,0)^\\top$ and the linearization has rank $2$. The nonlinear system is STLC at the origin.'),
    encounter('pignotti', 'fixed', 'Endpoint Lock', [
      'Consider the fixed-endpoint problem',
      '\\[\\begin{aligned}&\\min_{u(t)\\in\\mathbb R}\\ \\tfrac12\\int_0^2u(t)^2\\,dt\\\\&\\dot x=u,\\quad x(0)=0,\\quad x(2)=3.\\end{aligned}\\]',
      'Using the state and costate equations, find the optimal pair $(x^*,u^*)$.'
    ],
      'Enforce the terminal state constraint', ['Impose $\\lambda(2)=0$', 'Impose the free-state payoff condition', 'Set $H(2)=0$'],
      'The prescribed value $x(2)=3$ fixes the total integral of the control.',
      'For $H=\\tfrac12u^2+\\lambda u$, the costate is constant and $u=-\\lambda$. Use $x(2)=3$ to determine that constant.',
      'The fixed endpoint supplies a state condition and leaves the costate free of a separate terminal equality.',
      '$x(2)=-2\\lambda=3$, so $\\lambda=-\\tfrac32$, $u^*(t)=\\tfrac32$ and $x^*(t)=\\tfrac32t$. Cauchy–Schwarz gives $\\int_0^2u^2\\,dt\\ge(\\int_0^2u\\,dt)^2/2$ with equality for this constant control.'),
    encounter('palladino', 'driftless', 'Bracket Weaver', [
      'Consider the system in $\\mathbb R^3$ with $u_1,u_2\\in[-1,1]$.',
      '\\[\\dot x_1=u_1,\\qquad \\dot x_2=u_2,\\qquad \\dot x_3=x_1u_2.\\]',
      'Determine whether it is small-time locally controllable at the origin.'
    ],
      'Generate brackets and apply Chow–Rashevskii', ['Require the original fields alone to span', 'Apply the linear Kalman criterion to the vector fields', 'Check recurrence of a drift'],
      'One control moves $x_1$. The effect of the other control on $x_3$ depends on $x_1$.',
      'Write $g_1=(1,0,0)$ and $g_2=(0,1,x_1)$. Compute their bracket and evaluate the three directions at the origin.',
      'Short forward and reverse motions along the controlled fields create displacements in bracket directions.',
      'Using $[g_1,g_2]=Dg_2\\,g_1-Dg_1\\,g_2$, the bracket is $(0,0,1)$. Together with $g_1(0)$ and $g_2(0)$ it spans $\\mathbb R^3$, so Chow–Rashevskii gives STLC at the origin.'),
    encounter('palladino', 'drift', 'One-Way Current', [
      'Consider the control-affine system',
      '\\[\\begin{gathered}\\dot x_1=1,\\quad \\dot x_2=u,\\\\u(t)\\in[-1,1],\\quad x(0)=(0,0).\\end{gathered}\\]',
      'The drift and control vector fields span $\\mathbb R^2$ at every point. Does the reachable set in time at most $T>0$ have nonempty interior? Can the system reach $(-1,0)$?'
    ],
      'Check accessibility and the one-way drift separately', ['Infer global controllability from full Lie rank', 'Infer STLC from full Lie rank', 'Require the reachable set at each fixed time to have interior'],
      'Integrate the first equation. The control can only change the second coordinate.',
      'At each time $t>0$, $x_1(t)=t$ and $x_2(t)\\in[-t,t]$. Take the union over $0\\le t\\le T$.',
      'A reachable set can have interior while the drift prevents motion in one direction.',
      'The union contains the open region $0<x_1<T$, $|x_2|<x_1$. Thus it has interior, but $(-1,0)$ is unreachable because $x_1(t)=t\\ge0$.'),
    encounter('pignotti', 'base', 'Freehand', [
      'Consider the optimal control problem on $[0,1]$ with free terminal state.',
      '\\[\\begin{aligned}&\\min_{u(t)\\in\\mathbb R}\\int_0^1\\left(\\tfrac12u(t)^2+x(t)\\right)\\,dt\\\\&\\dot x=u,\\quad x(0)=0.\\end{aligned}\\]',
      'Find the optimal state and control using the Hamiltonian equations.'
    ],
      'Use the state, adjoint and stationarity equations', ['Clip the control to an interval', 'Prescribe the terminal state', 'Enforce $H(1)=0$'],
      'The control is unrestricted and there is no terminal payoff.',
      'For $H=\\tfrac12u^2+x+\\lambda u$, use $\\dot\\lambda=-1$, $\\lambda(1)=0$ and $u=-\\lambda$.',
      'The free endpoint gives zero terminal costate, and the strictly convex Hamiltonian has a unique minimizing stationary control.',
      '$\\lambda(t)=1-t$, so $u^*(t)=t-1$ and $x^*(t)=t^2/2-t$. Substituting the state into the objective gives a pointwise strictly convex quadratic in $u$, minimized by this control.'),
    encounter('palladino', 'construct', 'Steering Trial', [
      'Consider the double integrator with bounded control.',
      '\\[\\begin{gathered}\\dot x=v,\\quad \\dot v=u,\\\\|u(t)|\\le1,\\quad (x(0),v(0))=(0,0).\\end{gathered}\\]',
      'Steer the system to $(4,0)$ using $u=1$ for a duration $s$ followed by $u=-1$ for a duration $r$. Determine $s,r\\ge0$.'
    ],
      'Integrate the arcs and solve for their durations', ['Report full Kalman rank', 'Report full Lie rank', 'Check the instantaneous control directions at the target'],
      'Use the final velocity to relate the two durations before solving for position.',
      'After the first arc the state is $(s^2/2,s)$. Integrate the second arc from that state.',
      'Matching the composed endpoint to the target verifies the actual steering control.',
      'At the end, $v=s-r$ and $x=s^2/2+sr-r^2/2$. Setting $v=0$ gives $r=s$, so $x=s^2=4$ gives $s=r=2$.'),
    encounter('pignotti', 'verify', 'Convexity Judge', [
      'Consider the following problem with free terminal state and unrestricted control.',
      '\\[\\begin{aligned}&\\min_u\\left[\\int_0^1u(t)^2\\,dt+(x(1)-3)^2\\right]\\\\&\\dot x=u,\\quad x(0)=0.\\end{aligned}\\]',
      'The candidate $u^*(t)=\\tfrac32$, $x^*(t)=\\tfrac32t$ satisfies the necessary conditions. Prove that it is a global minimizer.'
    ],
      'Apply the convex sufficiency theorem', ['Use $H_u=0$ alone', 'Use constancy of the Hamiltonian', 'Check convexity of the running cost in $u$ alone'],
      'Check convexity of both $H$ at the candidate costate and the terminal payoff.',
      'Use $\\lambda=-3$. Then $H=u^2-3u$ is jointly convex in $(x,u)$ and $\\varphi(x)=(x-3)^2$ is convex.',
      'The supporting inequalities bound the cost difference below, and the adjoint equation and terminal condition cancel the state variation terms.',
      '$u^*=\\tfrac32$ minimizes $H$ pointwise, and $\\varphi^\\prime(x^*(1))=-3=\\lambda(1)$. The convex sufficiency theorem gives global optimality.')
  ];
})();
