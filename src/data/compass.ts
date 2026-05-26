// The Compass · 15 modern conceptual frames sharp enough to invoke, often.
// Distinct from the Lexicon (concepts to preserve) — these are working
// frames with English names, already in circulation, sharp enough to
// invoke in dispatch/courses/essays. Source: brand-guidelines.html
// lines 4755-4799. Rule: no Compass entry gets a glyph — the power
// is in the language; glyphs would dilute them.

export interface CompassFrame {
  title: string;
  gloss: string;   // may contain inline <em> markup for emphasis
}

export interface CompassGroup {
  label: string;   // e.g. "Reasoning frames · 4"
  frames: CompassFrame[];
}

export const COMPASS: CompassGroup[] = [
  {
    label: 'Reasoning frames · 4',
    frames: [
      { title: 'First principles',     gloss: 'Reasoning from indivisible truths of a domain rather than analogy or convention. Aristotle\'s <em>archē</em>, Descartes\'s method, Musk\'s mantra.' },
      { title: 'Second-order thinking', gloss: 'Considering the consequences of consequences — what happens <em>after</em> what happens. The discipline of asking <em>and then what?</em>' },
      { title: 'Inversion',             gloss: 'Solving by working backward from failure. Charlie Munger\'s signature move, descended from Carl Jacobi.' },
      { title: 'Steelmanning',          gloss: 'Stating an opposing argument in its strongest form before disagreeing. The discipline of someone who would rather be right than win.' },
    ],
  },
  {
    label: 'Decision frames · 4',
    frames: [
      { title: 'Opportunity cost',  gloss: 'Every yes is a no to everything else you could have done with the time. Saying yes is therefore an act of valuing this above all alternatives.' },
      { title: 'Sunk cost fallacy', gloss: 'The mistake of letting past investment determine future action. <em>We\'ve spent so much already</em> is never a reason to keep going.' },
      { title: 'Asymmetric bets',   gloss: 'Choices where the upside is large and the downside is small. Bet aggressively on these. Avoid the inverse.' },
      { title: 'Reversibility test', gloss: 'Before any major decision: is this reversible? If yes, decide fast and adjust. If no, slow down. Bezos\'s Type 1 / Type 2.' },
    ],
  },
  {
    label: 'Time frames · 3',
    frames: [
      { title: 'Lindy effect',  gloss: 'A non-perishable thing\'s expected future life is proportional to its current age. Prefer the durable over the new.' },
      { title: 'Compounding',   gloss: 'The most underrated force in finance, fitness, skill, relationships. Small consistent inputs, nonlinear outputs over long horizons.' },
      { title: 'Long horizon',  gloss: 'The discipline of asking <em>will this matter in ten years?</em> before deciding whether it matters now. Most things won\'t.' },
    ],
  },
  {
    label: 'Action frames · 4',
    frames: [
      { title: "Beginner's mind",  gloss: 'Approaching a familiar thing as if for the first time. The expert\'s curse is that they stop seeing.' },
      { title: 'Anti-fragility',   gloss: 'Getting <em>stronger</em> under stress, not just surviving it. Distinct from resilience. Taleb\'s contribution.' },
      { title: 'Margin of safety', gloss: 'Building extra room beyond what the calculation says is needed. Reality has a surprising amount of detail.' },
      { title: 'OODA loop',        gloss: 'Observe, orient, decide, act — the speed of cycling through that loop determines who wins under uncertainty. Boyd\'s model.' },
    ],
  },
];
