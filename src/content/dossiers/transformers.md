---
title: "Transformers"
titleHtml: "<em>Transformers</em>"
eyebrow: "Dossiers · AI Concept · AI-led breakdown"
byline: "Vaswani et al. · 2017 · architecture"
category: "ai-concepts"
lede: "The neural-network architecture that displaced everything else for sequence modelling — and the substrate of every major large language model in production today."
quote:
  text: "Attention is all you need."
  cite: "Vaswani et al. · paper title, 2017"
whyItMatters: "Every LLM the public has used — Claude, GPT, Gemini, Llama, Mistral — is a Transformer. Understanding the architecture, at least at the level of what it can and cannot do, is the difference between being able to reason about an AI system's behaviour and being limited to vibes. For any operator building with LLMs, the half-day spent understanding the architecture pays back across every prompt design, context-window decision, and latency conversation."
keyIdeas:
  - "**Self-attention is the engine.** Each token attends to every other token in the input, learning which positions matter for understanding the current one."
  - "**No recurrence, no sequentiality.** Unlike RNNs and LSTMs, Transformers process the entire input in parallel. The parallelism is what makes large-scale training tractable."
  - "**Multi-head attention.** The model runs many attention passes in parallel, each focusing on different kinds of relationships — syntactic, semantic, positional, coreference."
  - "**Quadratic cost in sequence length.** Attention scales as the square of the context window. This is the single most operationally important constraint on the architecture and the reason long-context models are expensive."
  - "**Decoder-only is the dominant pattern.** GPT, Claude, Llama and most modern LLMs use only the decoder half of the original architecture, trained to predict the next token autoregressively."
  - "**Encoder-only models still matter.** BERT and its descendants — used for classification, search, embedding — use the encoder half. Different jobs; same family."
takeForward: "Apply this when designing any LLM-based system. Knowing the architecture surfaces the constraints: context windows are bounded by quadratic attention cost; the model has no memory between calls; the model has no concept of \"now\" beyond what is in its training data and current input. The framework rewards architectural literacy — most operational mistakes with LLMs come from misunderstanding what kind of system the model actually is."
keyConcept:
  name: "Attention-based architecture"
  desc: "Parallel sequence modelling without recurrence."
---

The Transformer architecture was introduced in the June 2017 Google Brain paper Attention Is All You Need. Before that paper, sequence modelling — translation, summarisation, language generation — was dominated by recurrent neural networks and convolutional networks, both of which struggled to capture long-range dependencies and were slow to train because of their inherent sequentiality. The Transformer paper replaced both with a single mechanism — attention — and an architecture built around it.

The mechanic is, in plain terms, a learned weighting. For each token in the input, the model computes a set of attention weights over all other tokens. These weights decide how much each other token contributes to the representation of the current one. The weights are learned during training; they vary by layer and by attention head; together they form a representation of the input that captures relationships at multiple levels — local syntactic dependencies, longer-range semantic links, coreference across paragraphs. The architecture is, at its core, a stack of these attention layers interleaved with simple feed-forward networks.

The architecture's afterlife is the public-facing AI of the 2020s. OpenAI's GPT series, Anthropic's Claude, Google's Gemini, Meta's Llama, Mistral, DeepSeek, Qwen — all use Transformer-derived architectures, mostly with the decoder half of the original design. The scaling curve has held: bigger Transformers trained on more data produce qualitatively better outputs, and the limit of that curve has not yet been found. Alternative architectures — state-space models, Mamba, recurrent revivals — keep appearing, and none has yet displaced the Transformer from production-scale LLMs. The architecture is now eight years old and shows no immediate sign of being replaced.
