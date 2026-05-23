---
title: "Occam's Razor"
titleHtml: "Occam's <em>Razor</em>"
eyebrow: "Dossiers · Mental Model · AI-led breakdown"
byline: "William of Ockham · 14th century · mental model"
category: "mental-models"
lede: "Of competing explanations, prefer the one with the fewest moving parts — the medieval principle that became the working default of modern science."
quote:
  text: "Entities should not be multiplied beyond necessity."
  cite: "William of Ockham, attributed · 14th century"
whyItMatters: "Most debugging, diagnosis, and post-mortem work fails because the investigator reaches for the elaborate explanation before exhausting the simple one. The razor is the cheapest possible discipline: list the explanations, count the moving parts, and start from the bottom. It is the working assumption of science, software engineering, and medicine because in practice it is almost always right."
keyIdeas:
  - "**Simpler explanations are more often correct.** Not always, but often enough that the simpler hypothesis is the right place to start."
  - "**Parsimony, not laziness.** The razor does not say the simple explanation is true; it says it is the one to test first."
  - "**Beware the elaborate story.** The conspiracy theory, the multi-step organisational plot, the bug requiring six unlikely things to all be true at once — these are nearly always wrong."
  - "**The razor is a prior, not a verdict.** Evidence that contradicts the simple explanation should defeat it. The razor is the starting bet, not the final word."
  - "**It applies recursively.** Once a simple explanation has been ruled out, the next simplest one becomes the new working hypothesis. The discipline is repeated."
takeForward: "Apply this at the start of any investigation — a bug, a missed deadline, an unexplained outcome. List the possible explanations and rank them by the number of independent assumptions each requires. Start at the bottom. The framework rewards patience: the elaborate explanation is rarely needed, and reaching for it first wastes the time of everyone involved."
keyConcept:
  name: "Fewest moving parts"
  desc: "Prefer the explanation requiring fewest assumptions."
---

William of Ockham was a fourteenth-century English Franciscan friar and philosopher whose work in logic, theology, and political theory marked one of the breaks between medieval scholasticism and early modern thought. The principle now called Occam's Razor is not a single quotation but a stance threaded through his work: the rejection of unnecessary metaphysical entities, the preference for explanations that did not multiply hypothetical causes.

The principle predates Ockham — Aristotle held a version, as did several earlier scholastics — and survives him in forms he would not recognise. The razor as it is now used is a methodological rule of thumb in science, engineering, and medicine. Faced with multiple explanations consistent with the evidence, the simpler one should be preferred until further evidence forces revision. The rule is heuristic, not absolute; nature is sometimes elaborate, and the razor will cut against the truth in those cases.

The deeper utility of the razor is psychological. The human mind is unusually good at generating elaborate explanations and unusually poor at noticing when the simple one was sufficient. The razor compensates for this asymmetry. It is not a tool for finding truth but a tool for managing the mind's bias toward complexity, which in software, in diagnosis, and in interpersonal misunderstanding is by far the more common failure mode.
