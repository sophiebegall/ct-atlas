/* Original exam-style exercises keyed to CT_CANVAS.
 * Each encounter is self-contained: board/node identify its canvas route, while
 * steps describe the battle independently of its source or encounter pool.
 * Order items are authored in solution order; flawIndex is zero-based.
 */
window.CT_BATTLE = [
  {
    "board": "palladino",
    "node": "linear",
    "name": "Rank Warden",
    "problem": [
      "Let $a\\in\\mathbb R$. Consider the system",
      "\\[\\begin{gathered}\\dot x=Ax+Bu,\\quad u\\in\\mathbb R,\\\\ A=\\begin{pmatrix}0&1\\\\0&0\\end{pmatrix},\\quad B=\\begin{pmatrix}0\\\\a\\end{pmatrix}.\\end{gathered}\\]",
      "Determine all values of $a$ for which the system is controllable on $[0,T]$ for every $T>0$."
    ],
    "solution": "$AB=(a,0)^\\top$, so $\\det[B,AB]=-a^2$. The system is controllable exactly when $a\\ne0$.",
    "steps": [
      {
        "type": "choice",
        "prompt": "Compute the missing Kalman column $AB$.",
        "move": "$AB=(a,0)^\\top$",
        "decoys": [
          "$AB=(0,a)^\\top$",
          "$AB=(1,0)^\\top$",
          "$AB=(0,0)^\\top$"
        ],
        "hint": "Multiply A by the input column, not by itself.",
        "logEntry": "The drift creates $AB=(a,0)^\\top$ from $B=(0,a)^\\top$."
      },
      {
        "type": "choice",
        "prompt": "What is $\\det[B,AB]$?",
        "move": "$-a^2$",
        "decoys": [
          "$a^2$",
          "$a$",
          "$0$"
        ],
        "hint": "Keep the columns in the order B, then AB.",
        "logEntry": "$[B,AB]=\\begin{pmatrix}0&a\\\\a&0\\end{pmatrix}$ has determinant $-a^2$."
      },
      {
        "type": "flaw",
        "prompt": "Counter the bogus derivation: select the buggy line.",
        "lines": [
          "For $a\\ne0$, the Kalman matrix has rank $2$.",
          "For $a=0$, the input matrix vanishes.",
          "The system is controllable for every $a$ because $A\\ne0$."
        ],
        "flawIndex": 2,
        "whyFlawed": "A nonzero drift cannot replace a missing control input.",
        "hint": "What happens to $Bu$ at $a=0$?",
        "logEntry": "Kalman gives controllability for every $T>0$ exactly when $a\\ne0$."
      }
    ]
  },
  {
    "board": "pignotti",
    "node": "quadratic",
    "name": "Boundkeeper",
    "problem": [
      "Consider the optimal control problem on $[0,1]$ with free terminal state.",
      "\\[\\begin{aligned}&\\min_{0\\le u(t)\\le1}\\int_0^1\\left(\\tfrac12 u(t)^2-2x(t)\\right)\\,dt\\\\&\\dot x=u,\\quad x(0)=0.\\end{aligned}\\]",
      "Find an optimal control and determine when the upper bound is active."
    ],
    "solution": "$\\lambda(t)=2(t-1)$ gives $u^*(t)=\\min\\{1,2(1-t)\\}$. The upper bound is active for $0\\le t\\le\\tfrac12$. Indeed, $\\int_0^1 x(t)\\,dt=\\int_0^1(1-t)u(t)\\,dt$, so this control minimizes the original cost pointwise after substitution.",
    "steps": [
      {
        "type": "choice",
        "prompt": "For $H=\\tfrac12u^2-2x+\\lambda u$, solve the adjoint boundary problem.",
        "move": "$\\lambda(t)=2(t-1)$",
        "decoys": [
          "$\\lambda(t)=2t$",
          "$\\lambda(t)=2(1-t)$",
          "$\\lambda(t)=0$"
        ],
        "hint": "Use $\\dot\\lambda=-H_x=2$ and $\\lambda(1)=0$.",
        "logEntry": "The free endpoint gives $\\lambda(1)=0$, hence $\\lambda(t)=2(t-1)$."
      },
      {
        "type": "flaw",
        "prompt": "Counter the bogus derivation: select the buggy line.",
        "lines": [
          "$H_u=u+\\lambda$.",
          "The unconstrained minimizer is $\\widehat u=2(1-t)$.",
          "Use $u=2(1-t)$ on all of $[0,1]$, since stationarity guarantees admissibility."
        ],
        "flawIndex": 2,
        "whyFlawed": "For $t<1/2$, this exceeds $1$. Minimize over the allowed interval by clipping.",
        "hint": "Check the proposed control at $t=0$.",
        "logEntry": "Strict convexity gives $u^*(t)=\\min\\{1,2(1-t)\\}$."
      },
      {
        "type": "choice",
        "prompt": "When is the upper bound active?",
        "move": "$0\\le t\\le1/2$",
        "decoys": [
          "$1/2\\le t\\le1$",
          "Only at $t=1$",
          "Throughout $[0,1]$"
        ],
        "hint": "Solve $2(1-t)\\ge1$.",
        "logEntry": "The upper bound is active on $[0,1/2]$. Substituting $x$ gives the pointwise convex cost $\\int_0^1[\\tfrac12u^2-2(1-t)u]\\,dt$, proving optimality."
      }
    ]
  },
  {
    "board": "palladino",
    "node": "bounded",
    "name": "Drift Gate",
    "problem": [
      "Consider the scalar system",
      "\\[\\dot x=x+u,\\qquad u(t)\\in[-1,1].\\]",
      "Is the system small-time locally controllable at $x=0$? Can it be steered from $x(0)=2$ to $0$ in any positive time?"
    ],
    "solution": "From $0$ that interval is $[-(e^T-1),e^T-1]$, which contains a neighborhood of $0$ for each $T>0$. From $2$ the smallest reachable state is $2e^T-(e^T-1)=e^T+1>0$.",
    "steps": [
      {
        "type": "choice",
        "prompt": "Find the reachable interval from the origin at time T.",
        "move": "$[-(e^T-1),e^T-1]$",
        "decoys": [
          "$[-T,T]$",
          "$[-e^T,e^T]$",
          "$[0,e^T-1]$"
        ],
        "hint": "Integrate the positive kernel $e^{T-s}$ against $u\\in[-1,1]$.",
        "logEntry": "From $0$, $x(T)\\in[-(e^T-1),e^T-1]$, a neighborhood of $0$ for every $T>0$: STLC holds."
      },
      {
        "type": "choice",
        "prompt": "Starting from $2$, what is the smallest reachable value at time $T$?",
        "move": "$e^T+1$",
        "decoys": [
          "$e^T-1$",
          "$2e^T-T$",
          "$0$"
        ],
        "hint": "Use $u=-1$ in $x(T)=2e^T+\\int_0^T e^{T-s}u(s)\\,ds$.",
        "logEntry": "The minimum from $2$ is $2e^T-(e^T-1)=e^T+1>0$."
      },
      {
        "type": "flaw",
        "prompt": "Counter the bogus derivation: select the buggy line.",
        "lines": [
          "The unrestricted linear pair has full Kalman rank.",
          "With $u\\in[-1,1]$, Kalman rank therefore guarantees global controllability.",
          "At the origin, the reachable intervals contain neighborhoods."
        ],
        "flawIndex": 1,
        "whyFlawed": "The global Kalman equivalence assumes unrestricted controls; here the bounded input cannot overcome the drift from 2.",
        "hint": "Separate local reachability at an equilibrium from global reachability.",
        "logEntry": "STLC at $0$ does not imply global controllability: $2$ cannot be steered to $0$."
      }
    ]
  },
  {
    "board": "pignotti",
    "node": "payoff",
    "name": "Terminal Echo",
    "problem": [
      "Consider the optimal control problem on $[0,1]$ with free terminal state.",
      "\\[\\begin{aligned}&\\min_{u(t)\\in\\mathbb R}\\left[\\tfrac12\\int_0^1 u(t)^2\\,dt+\\tfrac12(x(1)-2)^2\\right]\\\\&\\dot x=u,\\quad x(0)=0.\\end{aligned}\\]",
      "Write the terminal condition for the costate and determine the optimal pair $(x^*,u^*)$."
    ],
    "solution": "The costate is constant, hence $x(1)=-\\lambda$. The terminal condition gives $\\lambda=-1$, so $u^*(t)=1$ and $x^*(t)=t$. Convexity of the Hamiltonian and terminal penalty gives global optimality.",
    "steps": [
      {
        "type": "flaw",
        "prompt": "Counter the bogus derivation: select the buggy line.",
        "lines": [
          "The terminal state is free.",
          "Therefore $\\lambda(1)=0$, even with the terminal penalty.",
          "$H=\\tfrac12u^2+\\lambda u$ gives $\\dot\\lambda=0$."
        ],
        "flawIndex": 1,
        "whyFlawed": "A free endpoint with payoff $\\varphi$ requires $\\lambda(1)=\\varphi'(x(1))=x(1)-2$.",
        "hint": "Differentiate the terminal penalty.",
        "logEntry": "The correct transversality condition is $\\lambda(1)=x(1)-2$."
      },
      {
        "type": "order",
        "prompt": "Combo attack: put this solution procedure in order.",
        "items": [
          "Use $\\dot\\lambda=0$ to write $\\lambda=c$.",
          "Minimize $H$ to obtain $u=-c$.",
          "Integrate from $x(0)=0$ to get $x(1)=-c$.",
          "Substitute in the terminal condition: $c=-c-2$."
        ],
        "hint": "Solve the costate, then the control and state, then close the boundary condition.",
        "logEntry": "The coupled endpoint equation $c=-c-2$ gives $\\lambda=-1$."
      },
      {
        "type": "choice",
        "prompt": "Which optimal pair follows?",
        "move": "$u^*(t)=1,\\quad x^*(t)=t$",
        "decoys": [
          "$u^*(t)=2,\\quad x^*(t)=2t$",
          "$u^*(t)=0,\\quad x^*(t)=0$",
          "$u^*(t)=-1,\\quad x^*(t)=-t$"
        ],
        "hint": "Use $u=-\\lambda$ and integrate from zero.",
        "logEntry": "$u^*=1$ and $x^*=t$ satisfy PMP; convexity of $H$ and the terminal penalty proves global optimality."
      }
    ]
  },
  {
    "board": "palladino",
    "node": "time",
    "name": "Clock Shifter",
    "problem": [
      "Let $T>0$. Consider the time-dependent system on $[0,T]$.",
      "\\[\\dot x_1=u,\\qquad \\dot x_2=t\\,u,\\qquad u(t)\\in\\mathbb R.\\]",
      "Compute the controllability Gramian and determine for which $T>0$ the system is controllable."
    ],
    "solution": "\\[G_T=\\begin{pmatrix}T&T^2/2\\\\T^2/2&T^3/3\\end{pmatrix},\\qquad \\det G_T=T^4/12.\\] Thus the system is controllable for every $T>0$.",
    "steps": [
      {
        "type": "flaw",
        "prompt": "Counter the bogus derivation: select the buggy line.",
        "lines": [
          "$A(t)=0$ and $B(t)=(1,t)^\\top$.",
          "At any fixed time, $B(t)$ has only one column.",
          "Freezing $B$ and applying Kalman proves the time-dependent system uncontrollable."
        ],
        "flawIndex": 2,
        "whyFlawed": "Freezing discards the input directions accumulated over time. Use the time-dependent Gramian.",
        "hint": "The direction of B changes during the interval.",
        "logEntry": "Since $A=0$, $\\Phi(T,t)=I$ and $G_T=\\int_0^T B(t)B(t)^\\top\\,dt$."
      },
      {
        "type": "choice",
        "prompt": "Compute the Gramian.",
        "move": "$G_T=\\begin{pmatrix}T&T^2/2\\\\T^2/2&T^3/3\\end{pmatrix}$",
        "decoys": [
          "$G_T=\\begin{pmatrix}T&T^2\\\\T^2&T^3\\end{pmatrix}$",
          "$G_T=\\begin{pmatrix}1&T\\\\T&T^2\\end{pmatrix}$",
          "$G_T=\\begin{pmatrix}T&0\\\\0&T\\end{pmatrix}$"
        ],
        "hint": "Integrate each entry of $\\begin{pmatrix}1&t\\\\t&t^2\\end{pmatrix}$.",
        "logEntry": "$G_T=\\begin{pmatrix}T&T^2/2\\\\T^2/2&T^3/3\\end{pmatrix}$."
      },
      {
        "type": "choice",
        "prompt": "Evaluate the determinant and conclude.",
        "move": "$\\det G_T=T^4/12>0$ for every $T>0$",
        "decoys": [
          "$\\det G_T=0$ for every $T$",
          "$\\det G_T=-T^4/12<0$",
          "Invertible only for $T>1$"
        ],
        "hint": "Subtract $(T^2/2)^2$ from $T\\cdot T^3/3$.",
        "logEntry": "$\\det G_T=T^4/12$: controllable on every positive time interval."
      }
    ]
  },
  {
    "board": "pignotti",
    "node": "affine",
    "name": "Switch Phantom",
    "problem": [
      "Consider the optimal control problem on $[0,1]$ with free terminal state.",
      "\\[\\begin{aligned}&\\min_{-1\\le u(t)\\le1}\\left[\\int_0^1 x(t)\\,dt-\\tfrac12x(1)\\right]\\\\&\\dot x=u,\\quad x(0)=0.\\end{aligned}\\]",
      "Determine the optimal control and any switching time."
    ],
    "solution": "$\\lambda(t)=\\tfrac12-t$. Take $u^*(t)=-1$ before $t=\\tfrac12$ and $u^*(t)=1$ after it. The value at the switch has no effect. Substituting $x(t)=\\int_0^t u(s)\\,ds$ reduces the cost to $\\int_0^1(\\tfrac12-t)u(t)\\,dt$.",
    "steps": [
      {
        "type": "choice",
        "prompt": "Find the costate including its terminal condition.",
        "move": "$\\lambda(t)=1/2-t$",
        "decoys": [
          "$\\lambda(t)=1-t$",
          "$\\lambda(t)=t-1/2$",
          "$\\lambda(t)=-1/2$"
        ],
        "hint": "Use $\\dot\\lambda=-1$ and $\\lambda(1)=-1/2$.",
        "logEntry": "For $H=x+\\lambda u$, $\\lambda(t)=1/2-t$ is the switching function."
      },
      {
        "type": "choice",
        "prompt": "Which bound minimizes $\\lambda u$ when $t<1/2$?",
        "move": "$u=-1$",
        "decoys": [
          "$u=1$",
          "$u=0$",
          "$u=-\\lambda$"
        ],
        "hint": "Here $\\lambda>0$, so choose the smallest admissible control.",
        "logEntry": "Use $u=-1$ before $1/2$, and $u=1$ after $1/2$, where $\\lambda<0$."
      },
      {
        "type": "flaw",
        "prompt": "Counter the bogus derivation: select the buggy line.",
        "lines": [
          "The switching function vanishes only at $t=1/2$.",
          "This isolated zero forces a singular arc on the entire interval.",
          "Changing a control at a single time leaves the state integral unchanged."
        ],
        "flawIndex": 1,
        "whyFlawed": "An isolated zero is not a singular interval; the optimal bounds are determined on either side.",
        "hint": "A singular arc requires a vanishing switching function over an interval.",
        "logEntry": "The switch is at $1/2$; its single-time value is immaterial. The cost becomes $\\int_0^1(1/2-t)u(t)\\,dt$, proving the bound choices optimal."
      }
    ]
  },
  {
    "board": "palladino",
    "node": "equilibrium",
    "name": "Equilibrium Mimic",
    "problem": [
      "Consider the system in $\\mathbb R^2$ with $u(t)\\in[-1,1]$.",
      "\\[\\dot x_1=x_2+x_1^2,\\qquad \\dot x_2=u.\\]",
      "Determine whether the system is small-time locally controllable at the origin."
    ],
    "solution": "$A=\\left(\\begin{smallmatrix}0&1\\\\0&0\\end{smallmatrix}\\right)$ and $B=(0,1)^\\top$, so $AB=(1,0)^\\top$ and the linearization has rank $2$. The nonlinear system is STLC at the origin.",
    "steps": [
      {
        "type": "choice",
        "prompt": "Which hypothesis licenses equilibrium linearization here?",
        "move": "$F(0,0)=0$ and $0\\in\\operatorname{int}[-1,1]$",
        "decoys": [
          "Every point is an equilibrium",
          "The control must be unbounded",
          "$x_1^2$ makes linearization impossible"
        ],
        "hint": "Check both the equilibrium pair and the allowed control perturbations.",
        "logEntry": "The smooth dynamics satisfy $F(0,0)=0$ with interior equilibrium control $u=0$."
      },
      {
        "type": "choice",
        "prompt": "Compute the linearized matrices at the origin.",
        "move": "$A=\\begin{pmatrix}0&1\\\\0&0\\end{pmatrix},\\ B=(0,1)^\\top$",
        "decoys": [
          "$A=\\begin{pmatrix}1&1\\\\0&0\\end{pmatrix},\\ B=(0,1)^\\top$",
          "$A=0,\\ B=(0,1)^\\top$",
          "$A=\\begin{pmatrix}0&1\\\\0&0\\end{pmatrix},\\ B=(1,0)^\\top$"
        ],
        "hint": "Differentiate $x_1^2$ before evaluating at $x_1=0$.",
        "logEntry": "$A=\\begin{pmatrix}0&1\\\\0&0\\end{pmatrix}$ and $B=(0,1)^\\top$."
      },
      {
        "type": "choice",
        "prompt": "What does the rank test prove?",
        "move": "$AB=(1,0)^\\top$: rank $2$, hence STLC at the origin",
        "decoys": [
          "Rank $1$, hence no nonlinear controllability",
          "Global controllability at every state",
          "Only accessibility, never STLC"
        ],
        "hint": "Apply the local equilibrium linearization theorem.",
        "logEntry": "Full linearized Kalman rank yields STLC of the nonlinear system at the origin; it does not assert global controllability."
      }
    ]
  },
  {
    "board": "pignotti",
    "node": "fixed",
    "name": "Endpoint Lock",
    "problem": [
      "Consider the fixed-endpoint problem",
      "\\[\\begin{aligned}&\\min_{u(t)\\in\\mathbb R}\\ \\tfrac12\\int_0^2u(t)^2\\,dt\\\\&\\dot x=u,\\quad x(0)=0,\\quad x(2)=3.\\end{aligned}\\]",
      "Using the state and costate equations, find the optimal pair $(x^*,u^*)$."
    ],
    "solution": "$x(2)=-2\\lambda=3$, so $\\lambda=-\\tfrac32$, $u^*(t)=\\tfrac32$ and $x^*(t)=\\tfrac32t$. Cauchy–Schwarz gives $\\int_0^2u^2\\,dt\\ge(\\int_0^2u\\,dt)^2/2$ with equality for this constant control.",
    "steps": [
      {
        "type": "flaw",
        "prompt": "Counter the bogus derivation: select the buggy line.",
        "lines": [
          "The terminal state is fixed at $x(2)=3$.",
          "A fixed endpoint additionally requires $\\lambda(2)=0$.",
          "The adjoint equation gives a constant costate."
        ],
        "flawIndex": 1,
        "whyFlawed": "A fixed terminal state does not impose the free-endpoint condition on the costate.",
        "hint": "The endpoint constraint determines the integration constant.",
        "logEntry": "Use $x(2)=3$ instead of a free-endpoint costate condition."
      },
      {
        "type": "choice",
        "prompt": "With $\\lambda=c$ and $u=-c$, which equation determines $c$?",
        "move": "$-2c=3$",
        "decoys": [
          "$c=0$",
          "$-c=3$",
          "$2c=3$"
        ],
        "hint": "Integrate $u=-c$ over the interval of length $2$.",
        "logEntry": "$x(2)=-2c=3$, so $\\lambda=-3/2$, $u^*=3/2$ and $x^*(t)=3t/2$."
      },
      {
        "type": "choice",
        "prompt": "Which bound proves global optimality?",
        "move": "$\\int_0^2u^2\\,dt\\ge(\\int_0^2u\\,dt)^2/2=9/2$",
        "decoys": [
          "$\\int_0^2u^2\\,dt\\ge9$",
          "Stationarity alone always proves optimality",
          "$\\int_0^2u^2\\,dt\\le9/2$"
        ],
        "hint": "Apply Cauchy–Schwarz to u and the constant function 1.",
        "logEntry": "Cauchy–Schwarz gives $J\\ge9/4$, attained by the constant control $u^*=3/2$."
      }
    ]
  },
  {
    "board": "palladino",
    "node": "driftless",
    "name": "Bracket Weaver",
    "problem": [
      "Consider the system in $\\mathbb R^3$ with $u_1,u_2\\in[-1,1]$.",
      "\\[\\dot x_1=u_1,\\qquad \\dot x_2=u_2,\\qquad \\dot x_3=x_1u_2.\\]",
      "Determine whether it is small-time locally controllable at the origin."
    ],
    "solution": "Using $[g_1,g_2]=Dg_2\\,g_1-Dg_1\\,g_2$, the bracket is $(0,0,1)$. Together with $g_1(0)$ and $g_2(0)$ it spans $\\mathbb R^3$, so Chow–Rashevskii gives STLC at the origin.",
    "steps": [
      {
        "type": "choice",
        "prompt": "For $g_1=(1,0,0)$ and $g_2=(0,1,x_1)$, compute $[g_1,g_2]=Dg_2g_1-Dg_1g_2$.",
        "move": "$(0,0,1)$",
        "decoys": [
          "$(0,0,0)$",
          "$(0,0,-1)$",
          "$(1,1,x_1)$"
        ],
        "hint": "Only the third component of g2 depends on x1.",
        "logEntry": "The bracket is $[g_1,g_2]=(0,0,1)$."
      },
      {
        "type": "order",
        "prompt": "Combo attack: put this solution procedure in order.",
        "items": [
          "Identify the smooth controlled fields and absence of drift.",
          "Generate $[g_1,g_2]$ from the controlled fields.",
          "Evaluate the fields and bracket at $0$: they span $\\mathbb R^3$.",
          "Use symmetric controls and bracket generation to conclude STLC."
        ],
        "hint": "Check the system class before applying its rank theorem.",
        "logEntry": "At $0$, the directions are $e_1,e_2,e_3$. Symmetric controls near $0$ allow the driftless bracket-generation theorem."
      },
      {
        "type": "flaw",
        "prompt": "Counter the bogus derivation: select the buggy line.",
        "lines": [
          "The fields and their bracket span $\\mathbb R^3$ at the origin.",
          "The system is STLC at the origin.",
          "Bounded controls therefore reach every point in every prescribed positive time."
        ],
        "flawIndex": 2,
        "whyFlawed": "STLC reaches a local neighborhood. Since $|\\dot x_1|\\le1$, a distant target cannot be reached in arbitrarily short time.",
        "hint": "Distinguish a small reachable neighborhood from all of space.",
        "logEntry": "STLC holds, but bounded speed prevents global reachability in every prescribed positive time."
      }
    ]
  },
  {
    "board": "palladino",
    "node": "drift",
    "name": "One-Way Current",
    "problem": [
      "Consider the control-affine system",
      "\\[\\begin{gathered}\\dot x_1=1,\\quad \\dot x_2=u,\\\\u(t)\\in[-1,1],\\quad x(0)=(0,0).\\end{gathered}\\]",
      "The drift and control vector fields span $\\mathbb R^2$ at every point. Does the reachable set in time at most $T>0$ have nonempty interior? Can the system reach $(-1,0)$?"
    ],
    "solution": "The union contains the open region $0<x_1<T$, $|x_2|<x_1$. Thus it has interior, but $(-1,0)$ is unreachable because $x_1(t)=t\\ge0$.",
    "steps": [
      {
        "type": "choice",
        "prompt": "Integrate the system from the origin at a fixed time t.",
        "move": "$x_1(t)=t,\\quad x_2(t)\\in[-t,t]$",
        "decoys": [
          "$x_1(t)\\in[-t,t],\\quad x_2(t)=t$",
          "$x_1(t)=0,\\quad x_2(t)\\in[-t,t]$",
          "$(x_1,x_2)\\in[-t,t]^2$"
        ],
        "hint": "The first coordinate is independent of the control.",
        "logEntry": "At fixed $t$, the reachable set is $\\{t\\}\\times[-t,t]$."
      },
      {
        "type": "choice",
        "prompt": "What happens when time is allowed to vary up to T?",
        "move": "The union contains $0<x_1<T,\\ |x_2|<x_1$",
        "decoys": [
          "The union is still a single vertical segment",
          "The union contains a neighborhood of $(0,0)$",
          "The union is all of $\\mathbb R^2$"
        ],
        "hint": "Take the union of the vertical segments as t varies.",
        "logEntry": "The reachable set in time at most $T$ has nonempty interior: the open wedge $0<x_1<T$, $|x_2|<x_1$."
      },
      {
        "type": "flaw",
        "prompt": "Counter the bogus derivation: select the buggy line.",
        "lines": [
          "The drift and control fields span $\\mathbb R^2$.",
          "The reachable set in variable time has interior.",
          "Full Lie rank therefore gives STLC and reachability of $(-1,0)$."
        ],
        "flawIndex": 2,
        "whyFlawed": "The one-way drift forces $x_1(t)=t\\ge0$. Accessibility does not imply STLC or global controllability.",
        "hint": "Can the first coordinate ever become negative?",
        "logEntry": "$(-1,0)$ is unreachable, and no reachable neighborhood of $0$ exists: accessibility is weaker than STLC."
      }
    ]
  },
  {
    "board": "pignotti",
    "node": "base",
    "name": "Freehand",
    "problem": [
      "Consider the optimal control problem on $[0,1]$ with free terminal state.",
      "\\[\\begin{aligned}&\\min_{u(t)\\in\\mathbb R}\\int_0^1\\left(\\tfrac12u(t)^2+x(t)\\right)\\,dt\\\\&\\dot x=u,\\quad x(0)=0.\\end{aligned}\\]",
      "Find the optimal state and control using the Hamiltonian equations."
    ],
    "solution": "$\\lambda(t)=1-t$, so $u^*(t)=t-1$ and $x^*(t)=t^2/2-t$. Substituting the state into the objective gives a pointwise strictly convex quadratic in $u$, minimized by this control.",
    "steps": [
      {
        "type": "order",
        "prompt": "Combo attack: put this solution procedure in order.",
        "items": [
          "Form $H=\\tfrac12u^2+x+\\lambda u$.",
          "Solve $\\dot\\lambda=-1$ with $\\lambda(1)=0$.",
          "Minimize $H$ using $u=-\\lambda$.",
          "Integrate $\\dot x=u$ with $x(0)=0$."
        ],
        "hint": "Set up the Hamiltonian before solving the costate and control.",
        "logEntry": "The free endpoint without payoff gives $\\lambda(1)=0$; the PMP pipeline yields $\\lambda(t)=1-t$."
      },
      {
        "type": "choice",
        "prompt": "Which state-control pair results?",
        "move": "$u=t-1,\\quad x=t^2/2-t$",
        "decoys": [
          "$u=1-t,\\quad x=t-t^2/2$",
          "$u=t-1,\\quad x=t^2/2$",
          "$u=0,\\quad x=0$"
        ],
        "hint": "Negate the costate, then integrate with zero initial state.",
        "logEntry": "$u^*(t)=t-1$ and $x^*(t)=t^2/2-t$."
      },
      {
        "type": "choice",
        "prompt": "How can we prove this candidate minimizes the original cost?",
        "move": "Substitute $x$: minimize $\\tfrac12u^2+(1-t)u$ pointwise",
        "decoys": [
          "Impose the extra condition $x(1)=0$",
          "Clip $u$ to $[0,1]$",
          "Require $H(1)=0$"
        ],
        "hint": "Swap the integrals in $\\int_0^1x(t)\\,dt$.",
        "logEntry": "$J=\\int_0^1[\\tfrac12u^2+(1-t)u]\\,dt$ is strictly convex and minimized pointwise by $u=t-1$."
      }
    ]
  },
  {
    "board": "palladino",
    "node": "construct",
    "name": "Steering Trial",
    "problem": [
      "Consider the double integrator with bounded control.",
      "\\[\\begin{gathered}\\dot x=v,\\quad \\dot v=u,\\\\|u(t)|\\le1,\\quad (x(0),v(0))=(0,0).\\end{gathered}\\]",
      "Steer the system to $(4,0)$ using $u=1$ for a duration $s$ followed by $u=-1$ for a duration $r$. Determine $s,r\\ge0$."
    ],
    "solution": "At the end, $v=s-r$ and $x=s^2/2+sr-r^2/2$. Setting $v=0$ gives $r=s$, so $x=s^2=4$ gives $s=r=2$.",
    "steps": [
      {
        "type": "choice",
        "prompt": "Where does the first arc end?",
        "move": "$(x,v)=(s^2/2,s)$",
        "decoys": [
          "$(x,v)=(s,s^2/2)$",
          "$(x,v)=(s^2,s)$",
          "$(x,v)=(0,s)$"
        ],
        "hint": "Integrate $\\dot v=1$, then $\\dot x=v$, both from zero.",
        "logEntry": "After the first arc, $v=s$ and $x=s^2/2$."
      },
      {
        "type": "order",
        "prompt": "Combo attack: put this solution procedure in order.",
        "items": [
          "Start arc two at $(s^2/2,s)$.",
          "Integrate $\\dot v=-1$: $v(\\tau)=s-\\tau$.",
          "Integrate position: $x(\\tau)=s^2/2+s\\tau-\\tau^2/2$.",
          "Set $\\tau=r$ and impose $v=0$, $x=4$."
        ],
        "hint": "The second arc inherits its initial state from the first.",
        "logEntry": "The endpoint is $v=s-r$, $x=s^2/2+sr-r^2/2$."
      },
      {
        "type": "choice",
        "prompt": "Solve for nonnegative arc durations.",
        "move": "$s=r=2$",
        "decoys": [
          "$s=r=4$",
          "$s=2,\\ r=0$",
          "$s=r=\\sqrt2$"
        ],
        "hint": "First $r=s$ from velocity; then $s^2=4$ from position.",
        "logEntry": "$s=r=2$ gives $(x,v)=(4,0)$ in total time $4$, using admissible controls $\\pm1$."
      }
    ]
  },
  {
    "board": "pignotti",
    "node": "verify",
    "name": "Convexity Judge",
    "problem": [
      "Consider the following problem with free terminal state and unrestricted control.",
      "\\[\\begin{aligned}&\\min_u\\left[\\int_0^1u(t)^2\\,dt+(x(1)-3)^2\\right]\\\\&\\dot x=u,\\quad x(0)=0.\\end{aligned}\\]",
      "The candidate $u^*(t)=\\tfrac32$, $x^*(t)=\\tfrac32t$ satisfies the necessary conditions. Prove that it is a global minimizer."
    ],
    "solution": "$u^*=\\tfrac32$ minimizes $H$ pointwise, and $\\varphi^\\prime(x^*(1))=-3=\\lambda(1)$. The convex sufficiency theorem gives global optimality.",
    "steps": [
      {
        "type": "choice",
        "prompt": "Which costate matches the candidate terminal state?",
        "move": "$\\lambda=-3$",
        "decoys": [
          "$\\lambda=0$",
          "$\\lambda=3$",
          "$\\lambda=-3/2$"
        ],
        "hint": "Differentiate $\\varphi(x)=(x-3)^2$ at $x(1)=3/2$.",
        "logEntry": "$\\lambda(1)=2(3/2-3)=-3$; the adjoint equation makes it constant."
      },
      {
        "type": "order",
        "prompt": "Combo attack: put this solution procedure in order.",
        "items": [
          "Check feasibility of $x^*(t)=3t/2$, $u^*=3/2$.",
          "Verify adjoint and terminal conditions with $\\lambda=-3$.",
          "Check joint convexity of $H=u^2-3u$ and convexity of $\\varphi$.",
          "Verify $u^*=3/2$ minimizes $H$; apply convex sufficiency."
        ],
        "hint": "Establish an admissible PMP candidate before invoking sufficiency.",
        "logEntry": "$H$ is jointly convex in $(x,u)$, $\\varphi$ is convex, and $u^*$ minimizes $H$ pointwise, so the candidate is globally optimal."
      },
      {
        "type": "flaw",
        "prompt": "Counter the bogus derivation: select the buggy line.",
        "lines": [
          "$H_u=2u-3$ vanishes at the candidate.",
          "Stationarity alone proves global optimality for every optimal control problem.",
          "Here the convex sufficiency hypotheses hold."
        ],
        "flawIndex": 1,
        "whyFlawed": "Stationarity is only a necessary condition in general; this problem has the additional convexity and boundary conditions needed for sufficiency.",
        "hint": "A stationary point need not minimize a nonconvex objective.",
        "logEntry": "The proof uses convexity plus feasibility, adjoint, transversality and Hamiltonian minimization—not stationarity alone."
      }
    ]
  }
];
