---
title: "Context Window"
titleHtml: "Context <em>Window</em>"
eyebrow: "Dossiers · AI Concept · AI-led breakdown"
byline: "Transformer architecture · 2017–present · structural constraint"
category: "ai-concepts"
lede: "The maximum amount of text an LLM can attend to at once — the single most operationally important constraint on what current AI systems can do, and the parameter that has driven the public scaling race of the last three years."
quote:
  text: "A language model with a million-token context window is a different kind of tool from one with eight thousand."
  cite: "Industry observation · widely attributed"
whyItMatters: "Every conversation about what LLMs can and cannot do bumps into the context window. The size determines whether a model can read a whole codebase, a whole book, a year of email threads, or only a single paragraph. For operators, the context window is the most important capacity decision in any model selection — and the most expensive parameter at inference time. Knowing how it works prevents most of the standard mistakes."
keyIdeas:
  - "**Hard upper bound.** The window is set during training. A model trained with an 8k window cannot read more than 8k tokens at inference, no matter how much hardware is available."
  - "**Quadratic cost.** Attention scales as the square of the window size. Doubling the window roughly quadruples the compute cost per token of input."
  - "**Effective context is smaller than nominal.** Models advertise large windows but often degrade past the middle of the input — the \"lost in the middle\" phenomenon. The advertised number is the ceiling, not the working capacity."
  - "**Position encoding is the technical lever.** Long-context models depend on positional encodings that generalise beyond training-time lengths — RoPE, ALiBi, YaRN. Most of the recent context-window scaling has come from improvements here."
  - "**Tokens, not words.** Context windows are measured in tokens, which are roughly subword units. A 100k-token window is roughly 75,000 English words — a short novel."
  - "**The window is not memory.** Each call to the model receives a fresh window. There is no persistence between calls unless the operator manually re-inserts prior context."
takeForward: "Apply this when designing any LLM-powered system. Ask: what is the actual token budget per call, what is being spent on prompt versus output, and what is being re-sent on every request that could be cached? The framework rewards instrumentation: most systems are using more context than necessary on the obvious calls and not enough on the load-bearing ones. Worth auditing before any cost optimisation."
keyConcept:
  name: "Hard token limit per call"
  desc: "The window is the working memory, and it resets each time."
---

The context window is a property of the Transformer architecture. During training, the model is shown sequences of a fixed maximum length and learns to attend across that range. At inference, the model cannot attend to anything outside that range — the architecture has no mechanism to reach further back. The size of the window is therefore the most fundamental operational parameter of a given LLM.

The progression of context windows over the past five years has been one of the field's most visible scaling curves. GPT-3 in 2020 had a 2,048-token window. GPT-4 in 2023 launched with 8k and was extended to 32k. Claude 2 in 2023 introduced 100k. The 1-million-token windows of Gemini 1.5 Pro and Claude 3 in 2024–25 represented a shift in what models could be asked to do — read whole codebases, whole books, multi-hour transcripts. The technical advances behind the curve are in positional encodings, in attention kernels (FlashAttention, ring attention), and in inference-time scaling techniques.

The catch is that nominal context size is not the same as effective context size. Empirical work consistently finds that models pay less attention to information in the middle of their input than at the start or end — the "lost in the middle" effect. A model with a 200k-token window may answer questions about content in the first 20k and the last 20k accurately while missing content in the middle entirely. This is not a defect that can be fully papered over; it is a property of how attention distributes itself across long inputs. The practical upshot for operators is that the advertised window is the upper bound on what can be done, not a guarantee of what will be done well. Most production systems still operate within a fraction of the maximum window for this reason.
