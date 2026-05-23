---
title: "Attention Is All You Need"
titleHtml: "Attention Is <em>All You Need</em>"
eyebrow: "Dossiers · Scientific Paper · AI-led breakdown"
byline: "Vaswani et al. · Google Brain · June 2017 · 15 pages"
category: "scientific-papers"
lede: "The 2017 Google Brain paper that introduced the Transformer architecture — the single most consequential machine-learning paper of the last decade and the substrate of every large language model in production today."
quote:
  text: "We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely."
  cite: "Vaswani et al. · Attention Is All You Need, NeurIPS 2017"
whyItMatters: "Every major large language model — GPT, Claude, Gemini, LLaMA, Mistral — is a Transformer at its core. The paper is therefore the closest thing the current AI moment has to a founding document. Operators who want to understand what their tools actually are, and what they can and cannot do, will read it once even if the mathematics is uncomfortable."
keyIdeas:
  - "**Attention replaces recurrence.** The paper's central move — discard the recurrent and convolutional layers that had dominated sequence modelling, and build the entire architecture on the attention mechanism."
  - "**Self-attention.** Each token in the input attends to every other token. The model learns which other positions matter for understanding a given position."
  - "**Multi-head attention.** Instead of one attention pass, the model runs many in parallel, each focusing on a different kind of relationship. The parallelism is what makes the architecture practical at scale."
  - "**Parallelisable training.** Unlike recurrent networks, the Transformer's attention layers can be computed in parallel — which is what allowed the architecture to be scaled to billions of parameters in the years that followed."
  - "**Positional encoding.** Because the architecture has no inherent notion of sequence order, position is encoded as an explicit additive signal. The fix is unobtrusive and load-bearing."
  - "**The original task was translation.** The paper benchmarked on English-to-German translation. The general-purpose language-model use case came later."
takeForward: "Apply this as the first paper to read for anyone trying to understand current AI from the ground up. The mathematics is approachable for anyone with linear algebra; the conceptual moves are short and named. The framework rewards going to source — every secondary explanation of how a Transformer works has its own simplifications, and the original notation is cleaner than most of them. Worth reading alongside the paper's official annotated implementation."
keyConcept:
  name: "Attention is the engine"
  desc: "Sequence modelling without recurrence, in parallel, at scale."
---

The paper was submitted to NeurIPS 2017 by eight authors at Google Brain and Google Research, led by Ashish Vaswani and Noam Shazeer. The team had spent the previous year searching for a way to remove the recurrence bottleneck that had constrained sequence models since the 1990s. The proposed solution was a clean separation: discard recurrence entirely, build the model out of stacked attention layers and feed-forward networks, and let the attention mechanism handle the long-range dependencies that recurrent networks had been used for.

The architecture has two halves. The encoder reads the input sequence; the decoder generates the output. Each half is a stack of identical layers, each layer combining a multi-head self-attention sub-layer with a position-wise feed-forward sub-layer. The attention mechanism itself is a few lines of matrix multiplication — queries, keys, values, a softmax over scaled dot products. The originality is not in any single component but in the architecture's clean composability and its capacity to scale.

The paper's afterlife dwarfs almost any other in the field. By 2018, OpenAI's GPT-1 had adapted the decoder half for autoregressive language modelling. By 2019, BERT had adapted the encoder half for understanding tasks. By 2020, GPT-3 had demonstrated that scaling the architecture to hundreds of billions of parameters produced emergent capabilities. Every model in the 2020s public conversation — Claude, ChatGPT, Gemini, Llama, Mistral, DeepSeek — descends architecturally from this single 2017 paper. The authors have since dispersed across the industry; most run their own AI labs. The paper itself has been cited over 130,000 times.
