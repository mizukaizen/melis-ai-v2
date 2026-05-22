// Verbatim lift of VENTURES_DETAIL from the v6 mockup (line 11947).
// Keyed by slug so the [slug] template can resolve via params.slug.

export interface VentureStrip {
  lbl: string;
  val: string;
}

export interface VentureSection {
  h: string;
  body: string;
}

export interface VenturePill {
  label: string;
  cls: string;
}

export interface VentureCta {
  title: string;
  line: string;
  btn: string;
}

export interface VentureDetail {
  eyebrow: string;
  pill: VenturePill;
  title: string;
  lede: string;
  strip: VentureStrip[];
  sections: VentureSection[];
  cta: VentureCta;
}

export const VENTURES_DETAIL: Record<string, VentureDetail> = {
  'lighthouse': {
    eyebrow: 'The Lab · Live',
    pill: { label: 'Live', cls: 'is-signal' },
    title: '<em>Lighthouse</em>',
    lede: 'AI-native intelligence briefings. You set a beacon — a topic, a domain, a competitor — the system scans, analyses, delivers. Daily, weekly, on-demand.',
    strip: [
      { lbl: 'Stage',  val: '82% complete' },
      { lbl: 'Type',   val: 'SaaS' },
      { lbl: 'Status', val: 'Live · paid' },
      { lbl: 'Site',   val: 'lighthouse.melis.ai' },
    ],
    sections: [
      { h: 'What it <em>is</em>',     body: 'A multi-agent research system that runs continuously, watching the internet for signals across whatever beacon you define. Each beacon delivers a structured brief — sources, claims, scores, and a Sean-curated take.' },
      { h: 'Why it <em>exists</em>',  body: 'Every operator I work with said the same thing: "I want a research analyst, but I cannot justify the headcount." Lighthouse is the third option — agent research, expert curation, weekly brief format.' },
      { h: 'Where it <em>is</em>',    body: '82% complete. Internal beta with 12 operators. Public launch Q3 2026. Pricing locks in for early users at $49/month per beacon.' },
    ],
    cta: {
      title: 'Get on the early-access list',
      line: 'Pricing locks at $49/month for the first 100 beacons. I will email you when slots open.',
      btn: 'Join the list →',
    },
  },
  'holy-signal': {
    eyebrow: 'The Lab · Live',
    pill: { label: 'Live', cls: 'is-signal' },
    title: 'Holy <em>Signal</em>',
    lede: 'SEO + AEO + agent-discoverability auditor. Three signals, one verdict.',
    strip: [
      { lbl: 'Stage',   val: 'Launch-ready' },
      { lbl: 'Type',    val: 'SaaS' },
      { lbl: 'Status',  val: 'Live · paid' },
      { lbl: 'Pricing', val: 'From $29' },
    ],
    sections: [
      { h: 'What it <em>is</em>',     body: 'A single audit tool that scores any URL on three axes: classic SEO, answer-engine optimisation (AEO), and agent discoverability — can AI agents find and parse this page?' },
      { h: 'Why it <em>exists</em>',  body: 'Every existing SEO tool was built for a world where Google was the only crawler. In 2026 the crawler list includes Claude, ChatGPT, Perplexity, and 30 more agents. The audit needs to match the new reality.' },
      { h: 'Where it <em>is</em>',    body: 'Live. Profitable. ~120 paying users.' },
    ],
    cta: {
      title: 'Try a free audit',
      line: 'Run one free audit on any URL. No signup. See your scores in 90 seconds.',
      btn: 'Run audit →',
    },
  },
  'phantom-ink': {
    eyebrow: 'The Lab · Building',
    pill: { label: 'Building', cls: 'is-orange' },
    title: 'Phantom <em>Ink</em>',
    lede: 'Editorial AI for serious writers. Voice-locked drafting; agent-assisted research; brand-faithful output.',
    strip: [
      { lbl: 'Stage',   val: '~60% built' },
      { lbl: 'Type',    val: 'SaaS' },
      { lbl: 'Status',  val: 'Closed beta' },
      { lbl: 'Pricing', val: 'TBD' },
    ],
    sections: [
      { h: 'What it <em>is</em>',     body: 'A drafting tool for writers who have a recognisable voice and need AI assistance that does not flatten it. You feed it your style guide and your published work; it drafts in your voice, not the model’s default.' },
      { h: 'Why it <em>exists</em>',  body: 'Existing AI writing tools all sound the same — because they are tuned to the same neutral assistant voice. Writers with brand value need the opposite.' },
      { h: 'Where it <em>is</em>',    body: 'Closed beta with 8 writers including 2 paid newsletter operators. Public launch Q4 2026.' },
    ],
    cta: {
      title: 'Get on the closed-beta list',
      line: 'Limited to operators with a meaningful published body of work. Tell me what you write and I will get back to you.',
      btn: 'Apply →',
    },
  },
};
