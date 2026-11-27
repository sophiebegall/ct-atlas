// Explicit atlas IDs keep study links stable when titles change.
window.CT_CANVAS_LINKS = {
  pignotti: {
    base: {cards:['G1','G2'], concepts:['hamiltonian','scheme'], problems:[['pignotti-2026-10-16','1']]},
    bounds: {cards:['G8'], concepts:['bounded-topic'], problems:[['pignotti-2026-11-14','1']]},
    payoff: {cards:['G7'], concepts:['transversality'], problems:[['pignotti-2026-10-23','1'],['pignotti-2026-11-14','3']]},
    fixed: {cards:['G1'], concepts:['scheme'], problems:[['pignotti-2026-11-14','2']]},
    quadratic: {cards:['G8'], concepts:['bounded-topic'], problems:[['pignotti-2026-11-14','1'],['pignotti-2026-11-14','3']]},
    affine: {cards:['G8'], concepts:['bang-bang'], problems:[['pignotti-2026-11-14','2']]},
    structure: {cards:['G1'], concepts:['scheme'], problems:[['pignotti-2026-10-16','4']]},
    decoupled: {cards:['G1','G7'], concepts:['hamiltonian'], problems:[['pignotti-2026-11-14','3']]},
    coupled: {cards:['G1'], concepts:['scheme'], problems:[['pignotti-2026-10-23','3'],['pignotti-2026-10-16','2']]},
    verify: {cards:['G3'], concepts:['sufficient'], problems:[['pignotti-2026-10-16','1']]},
    hjb: {cards:['G4'], concepts:['dpp'], problems:[]}
  },
  palladino: {
    linear: {cards:['P3'], concepts:['kalman-cor'], problems:[['palladino-hw1','1']]},
    bounded: {cards:['P1','P3'], concepts:['linear-constrained'], problems:[]},
    time: {cards:['P4'], concepts:['gramian','tv-topic'], problems:[['palladino-hw1','Ex. 1.4']]},
    rank: {cards:['P4'], concepts:['bk-test'], problems:[['palladino-hw1','Ex. 1.4']]},
    nonlinear: {cards:['P5'], concepts:['ctrl-nonlinear'], problems:[['palladino-hw3','3']]},
    equilibrium: {cards:['P5'], concepts:['linearization-thm'], problems:[['palladino-hw3','3']]},
    trajectory: {cards:['P4','P5'], concepts:['lin-topic','bk-test'], problems:[['palladino-hw1','Ex. 1.4']]},
    driftless: {cards:['P6','P7'], concepts:['chow-local','chow-global'], problems:[]},
    drift: {cards:['P9','P10'], concepts:['drift-topic'], problems:[['palladino-hw3','2']]},
    recurrent: {cards:['P8','P9'], concepts:['weakly-recurrent','recurrent-drift'], problems:[['palladino-hw3','Midterm 2025 Q1']]},
    unbounded: {cards:['P9'], concepts:['drift-unconstrained'], problems:[]},
    construct: {cards:['P1','P10'], concepts:['steering','lin-not-necessary'], problems:[['palladino-hw3','1'],['palladino-hw3','2']]}
  }
};
