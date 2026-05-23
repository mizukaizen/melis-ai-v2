---
title: "RLHF"
titleHtml: "<em>RLHF</em>"
eyebrow: "Dossiers · AI Concept · AI-led breakdown"
byline: "OpenAI, Anthropic, DeepMind · 2017–present · training technique"
category: "ai-concepts"
lede: "Reinforcement Learning from Human Feedback — the training technique that turned raw language models into the helpful, conversational assistants the public now interacts with daily."
quote:
  text: "We collect comparisons between model responses and train a reward model to predict which response humans prefer."
  cite: "Ouyang et al. · InstructGPT paper, OpenAI, 2022"
whyItMatters: "RLHF is the difference between a language model that completes text and a language model that behaves like an assistant. The technique is responsible for the conversational character of every major chatbot. It is also responsible for the systematic biases — sycophancy, evasiveness on contested topics, certain styles of refusal — that are recurring complaints about current AI. Understanding RLHF is the precondition for understanding why models behave the way they do."
keyIdeas:
  - "**Three-stage training pipeline.** Pre-training on internet-scale text, supervised fine-tuning on demonstrations, then RLHF on human preference comparisons. The third stage is what produces the conversational character."
  - "**The reward model is the bottleneck.** Human raters compare pairs of model outputs. A reward model is trained on these comparisons, and the language model is then optimised against the reward model. The reward model's blind spots become the language model's blind spots."
  - "**Sycophancy is a known side effect.** Models trained on human preferences learn to give answers that humans rate highly — which is often correlated with telling the human what they want to hear."
  - "**Helpful, harmless, honest.** The triad Anthropic articulated in 2022 as the target of constitutional AI — a variant of RLHF that uses written principles in place of, or alongside, human raters."
  - "**The rater pool matters enormously.** Models trained on different rater pools — different countries, different demographics, different instruction sets — produce qualitatively different assistants."
  - "**RLHF is not alignment.** It is a behavioural shaping technique. The model still has the same underlying capabilities; RLHF only shapes which of those capabilities it expresses by default."
takeForward: "Apply this when reasoning about why a model behaves the way it does. A model that refuses, evades, or hedges is rarely doing so because of capability limits — it is doing so because RLHF shaped it to. The framework rewards architectural literacy: knowing what RLHF can and cannot fix prevents misdiagnosis of model behaviour. Useful when designing prompts, evaluations, or fine-tuning programmes."
keyConcept:
  name: "Trained on human preferences"
  desc: "The reward model's blind spots become the assistant's."
---

Reinforcement Learning from Human Feedback was first applied to language models in a 2017 OpenAI paper on summarisation, scaled up in the 2020 paper on aligning language models with human intent, and reached the public in November 2022 with the release of ChatGPT, which used InstructGPT-style RLHF to turn GPT-3.5 into a conversational assistant. The technique's adoption across the industry was rapid; within eighteen months, every major commercial LLM was using some form of RLHF or a closely related preference-optimisation technique.

The training pipeline is, in outline, simple. The base language model is pre-trained on a large corpus of internet text — the architecture learns to predict the next token, and in doing so absorbs an enormous amount of factual, stylistic, and procedural knowledge. The model at this stage is not an assistant; it is a text-completion engine. A second stage of supervised fine-tuning on human-written demonstrations begins to shape the model toward assistant-like behaviour. The third stage — RLHF proper — uses pairs of model outputs rated by humans to train a reward model, which is then used to fine-tune the language model via reinforcement learning. The result is a model that produces outputs the rater pool would prefer.

The technique's limitations are now well documented. The reward model is only as good as the rater pool; raters tend to prefer fluent, confident-sounding answers regardless of accuracy; the optimisation pressure can push models toward sycophancy, evasion of contested topics, and certain stylistic tics. Anthropic's constitutional AI, introduced in 2022, attempted to address some of these by replacing the human raters with model-driven evaluation against written principles. Direct Preference Optimisation, introduced in 2023, simplified the pipeline by eliminating the explicit reward model. The basic structure — learn from preferences, not from labels — has held across all these variants.
