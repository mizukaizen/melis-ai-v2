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

// ── Optional rich "sales page" blocks. When present, the [slug]
// template renders the full triple-whammy treatment (problem →
// capabilities → pricing → why-now → proof → the ask). Ventures
// without these fields fall back to the simple sections layout.
export interface VentureCapabilityGroup {
  label: string;
  /** css colour token name fragment: 'signal' | 'accent' | 'amber' */
  tone: 'signal' | 'accent' | 'amber';
  weight?: string;
  items: string[];
}
export interface VenturePricingTier {
  name: string;
  price: string;
  detail: string;
  featured?: boolean;
}
export interface VentureAsk {
  audience: string;
  body: string;
  cta: string;
  href: string;
}

export interface VentureDetail {
  eyebrow: string;
  pill: VenturePill;
  title: string;
  lede: string;
  strip: VentureStrip[];
  sections: VentureSection[];
  cta: VentureCta;
  // optional rich blocks
  problem?: VentureSection;
  capabilities?: { intro?: string; groups: VentureCapabilityGroup[] };
  pricing?: { intro?: string; tiers: VenturePricingTier[] };
  whyNow?: VentureSection;
  proofPoints?: string[];
  asks?: VentureAsk[];
  siteUrl?: string;
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
    eyebrow: 'The Lab · Launch-ready',
    pill: { label: 'Launch-ready', cls: 'is-orange' },
    title: 'Holy <em>Signal</em>',
    lede: 'The first audit built for the new search reality. Score any URL on three signals at once — classic SEO, answer-engine optimisation, and whether AI agents can find and parse it. One verdict, 56 checks, ~40 seconds.',
    strip: [
      { lbl: 'Stage',   val: 'Feature-complete' },
      { lbl: 'Type',    val: 'SaaS · audit tool' },
      { lbl: 'Status',  val: 'Launch-ready' },
      { lbl: 'Pricing', val: 'Free → $199/mo' },
    ],
    sections: [
      { h: 'What it <em>is</em>', body: 'A single-pass audit that scores any URL on three axes at once — classic SEO, answer-engine optimisation (how citable you are to ChatGPT, Perplexity, Gemini and Claude), and agent discoverability (can AI crawlers actually find and parse the page). 56 checks, one overall verdict, every gap ranked by impact with a copy-paste fix.' },
    ],
    cta: {
      title: 'Run a free audit',
      line: 'One free audit on any URL, no signup — see your three scores and your top gaps in under a minute.',
      btn: 'Run audit →',
    },
    siteUrl: 'https://holy-signal.vercel.app/',
    problem: {
      h: 'The problem',
      body: 'Every SEO tool you know — Yoast, RankMath, Semrush, Ahrefs — was built for a world where Google was the only crawler that mattered. That world is gone. In 2026 your customers find you through at least four ranking systems — Google, ChatGPT, Perplexity, Claude — each weighted on completely different signals. Optimise for one and you go invisible to the other three. No mainstream tool audits all three dimensions in a single pass. Holy Signal is the one that does.',
    },
    capabilities: {
      intro: 'Three audit systems, one report. 56 checks, weighted into a single score: 40% traditional SEO · 40% AEO · 20% agent discovery.',
      groups: [
        {
          label: 'Traditional SEO', tone: 'amber', weight: '40%',
          items: ['Core Web Vitals — LCP, INP, CLS', 'JSON-LD structured data', 'E-E-A-T + author markup', 'Canonicals & on-page hygiene', '19 on-page checks'],
        },
        {
          label: 'Answer-engine (AEO)', tone: 'accent', weight: '40%',
          items: ['Citability across ChatGPT, Perplexity, Gemini, Claude', 'Answer-first content structure', 'Per-model citation strategy', 'External citation density', 'UGC & community signals'],
        },
        {
          label: 'Agent discovery', tone: 'signal', weight: '20%',
          items: ['llms.txt quality & completeness', 'agents.txt capability declaration', 'AI-bot robots.txt permissions', 'Sitemap health', 'Can agents parse the page at all?'],
        },
      ],
    },
    pricing: {
      intro: 'Undercuts the incumbents 10–100×. Semrush API entry is $499.95/mo; Holy Signal Pro is $49.',
      tiers: [
        { name: 'Free', price: '$0', detail: '1 audit/month · SEO + agent discovery · top 5 gaps · shareable report' },
        { name: 'Pay as you go', price: '$9', detail: '10 audits · all 3 systems · full gaps + fix snippets · credits never expire' },
        { name: 'Pro', price: '$49/mo', detail: 'Unlimited audits · all 56 checks · history, alerts, CSV · up to 5 sites', featured: true },
        { name: 'Agency', price: '$199/mo', detail: '20 client sites · white-label PDF · REST API · 3 team seats' },
      ],
    },
    whyNow: {
      h: 'Why now',
      body: 'AI-referred traffic is up 527% year-on-year and accelerating. Search has fractured across ChatGPT (200M+ monthly users), Perplexity, and Claude. The llms.txt and agents.txt standards are being adopted right now — and no mainstream SEO tool audits them yet. There is a 12–18 month window before RankMath or Semrush ships an AEO feature. That window is the moat.',
    },
    proofPoints: [
      'Zero direct competition on AEO — none of Yoast, RankMath, Semrush, Ahrefs or Moz audit answer-engine readiness or agent discovery. You own the future; they own the past.',
      '56 checks across three systems in a single pass — no other tool returns this in one verdict.',
      'CMS-plugin distribution mirrors how Yoast & RankMath grew to $50M+ with no paid acquisition — WordPress is 43% of the web.',
      'Pricing undercuts incumbents 10–100× — Semrush API starts at $499.95/mo.',
      'Production stack, done: Next.js 15, Neon Postgres, Clerk, Stripe, Vercel. Nothing technical blocking launch.',
    ],
    asks: [
      {
        audience: 'Use it',
        body: 'Running on WordPress, Shopify or Webflow and watching organic traffic flatten while AI tools quietly route around you? Run one free audit and see exactly why — with copy-paste fixes, in under a minute.',
        cta: 'Run a free audit →',
        href: 'https://holy-signal.vercel.app/',
      },
      {
        audience: 'Invest',
        body: 'Pre-revenue, feature-complete SaaS sitting in a category that is forming in real time, with a documented 12–18 month first-mover window and a CMS-plugin growth model with proven precedent. Seed-stage entry ahead of the wave.',
        cta: 'Talk to Sean →',
        href: 'mailto:sean@melis.ai?subject=Holy%20Signal%20—%20investment',
      },
      {
        audience: 'Build it',
        body: 'The audit engine is done; the distribution moat is CMS plugins — a WordPress PHP plugin and a Shopify app are next. Know that world, or have an audience in SEO/AEO? Let\'s co-launch.',
        cta: 'Build with me →',
        href: 'mailto:sean@melis.ai?subject=Holy%20Signal%20—%20building%20together',
      },
    ],
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
