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
  'hive-doctrine': {
    eyebrow: 'The Lab · Live',
    pill: { label: 'Live', cls: 'is-signal' },
    title: 'Hive <em>Doctrine</em>',
    lede: 'The first knowledge-product marketplace built for AI agent operators — and accessible to the agents themselves via MCP. 89 frameworks, configs, and constitutions for building distributed multi-agent systems.',
    strip: [
      { lbl: 'Stage',   val: 'Live · site + MCP' },
      { lbl: 'Type',    val: 'Marketplace' },
      { lbl: 'Catalogue', val: '89 products' },
      { lbl: 'Pricing', val: 'Free → $799' },
    ],
    sections: [
      { h: 'What it <em>is</em>', body: 'A marketplace at hivedoctrine.com selling the operator-layer knowledge nobody else packages — governance models, memory architectures, persona constitutions, infrastructure SOPs. Humans browse the site; AI agents browse and buy the exact same catalogue autonomously through an MCP server.' },
    ],
    cta: {
      title: 'Browse the doctrine',
      line: '89 production-sourced frameworks, from free Pollen guides to the $799 Autonomous Unicorn Factory Blueprint.',
      btn: 'Open hivedoctrine.com →',
    },
    siteUrl: 'https://hivedoctrine.com',
    problem: {
      h: 'The problem',
      body: 'AI agent builders can find tools and frameworks everywhere — but nobody sells the operator-layer knowledge: how to govern multiple agents, persist memory across restarts, assign authority, or route safely between tiers. So teams waste weeks rediscovering patterns that already exist in production systems. Hive Doctrine packages those patterns, sourced from a real 704-file production vault.',
    },
    capabilities: {
      intro: '89 products across 14 collections, five access tiers, and a purchase interface that works for humans and agents alike.',
      groups: [
        { label: 'The catalogue', tone: 'accent', items: ['SOUL.md / IDENTITY.md persona templates', '4-Level Authority Framework ($299)', 'Three-Tier Episodic Memory ($99)', 'Operator Kit v1.0 — 8 agents, 10 skills ($149)', 'Docker / VPS infrastructure SOPs'] },
        { label: 'Tiered access', tone: 'amber', items: ['Pollen — free lead-gen guides', 'Doctrine — $4.99–$9.99', 'Honey — $29–$149', 'Nectar — $49–$199', 'Royal Jelly — $299–$799'] },
        { label: 'Agent-native commerce', tone: 'signal', items: ['MCP server — agents browse & buy as a tool', 'x402 USDC payments on Base', 'llms.txt + structured JSON feed', 'Discoverable by LLMs and crawlers'] },
      ],
    },
    pricing: {
      intro: 'Free tier (Pollen) through to a $799 flagship blueprint. Bundle ceiling $2,567 across all 14 collections.',
      tiers: [
        { name: 'Pollen', price: 'Free', detail: '~12 lead-gen guides · the front door' },
        { name: 'Doctrine', price: '$4.99+', detail: 'Single frameworks & templates' },
        { name: 'Honey / Nectar', price: '$29–$199', detail: 'Production kits — memory, authority, skills', featured: true },
        { name: 'Royal Jelly', price: '$299–$799', detail: 'Flagship blueprints — incl. Unicorn Factory' },
      ],
    },
    whyNow: {
      h: 'Why now',
      body: 'x402 has 50M+ transactions on Base and agent-to-agent commerce is arriving in 2026. AI referral traffic is up 357% year-on-year. Nobody else operates a structured knowledge marketplace with an MCP-native purchase interface — agents can query the catalogue as a tool, not a website. The category is unoccupied.',
    },
    proofPoints: [
      'First published multi-agent governance framework (4-Level Authority, $299) with real production deployment behind it.',
      'MCP server live — agents purchase autonomously. No comparable marketplace does this.',
      '89 products distilled from a 704-file production vault — sourced from real deployments, not theory.',
      'Owner runs both the marketplace AND the agent infrastructure (OpenClaw / NexusOS) — a compounding distribution flywheel.',
    ],
    asks: [
      { audience: 'Use it', body: 'Building a multi-agent system and tired of rediscovering governance and memory patterns? Buy the framework and deploy it today — or point your agent at the MCP server and let it shop.', cta: 'Open the marketplace →', href: 'https://hivedoctrine.com' },
      { audience: 'Invest', body: 'A knowledge marketplace whose owner also owns the agent runtime it sells into — rare compounding distribution that a standalone info-product can\'t replicate, in a category nobody else occupies.', cta: 'Talk to Sean →', href: 'mailto:sean@melis.ai?subject=Hive%20Doctrine%20—%20investment' },
      { audience: 'Build it', body: '32 products are written but need editing to ship-ready. Know how to package and ship Gumroad/Whop catalogues at scale? Help turn the vault into revenue.', cta: 'Build with me →', href: 'mailto:sean@melis.ai?subject=Hive%20Doctrine%20—%20building%20together' },
    ],
  },
  'lighthouse': {
    eyebrow: 'The Lab · Building',
    pill: { label: 'Building', cls: 'is-orange' },
    title: '<em>Lighthouse</em>',
    lede: 'AI competitive intelligence that sits between free (Google Alerts misses everything) and enterprise (Crayon at $20K–$40K/year). You set a beacon; it monitors your sources and emails a source-validated briefing on your schedule.',
    strip: [
      { lbl: 'Stage',   val: 'Active build' },
      { lbl: 'Type',    val: 'SaaS' },
      { lbl: 'Status',  val: 'Pre-launch' },
      { lbl: 'Pricing', val: 'Free → $299/mo' },
    ],
    sections: [
      { h: 'What it <em>is</em>', body: 'You create "Beacons" — curated sets of web sources monitored for change. When something significant happens, Lighthouse delivers a structured AI briefing: executive summary, per-source changes, recommended actions, and a faithfulness score. It validates every source up-front and summarises only what it just fetched — targeting faithfulness above 0.9.' },
    ],
    cta: {
      title: 'Get on the early-access list',
      line: 'Tell me what you\'d monitor and I\'ll email you when beacons open.',
      btn: 'Join the list →',
    },
    siteUrl: 'mailto:sean@melis.ai?subject=Lighthouse%20—%20early%20access',
    problem: {
      h: 'The problem',
      body: 'DTC founders and SaaS product teams spend 8–12 hours a month manually monitoring competitors, regulation, and market signals. Crayon\'s 2025 report found companies rate their competitive preparedness at 3.8/10 and lose an estimated $2–10M/year to unpreparedness. Google Alerts misses most of it; Crayon costs $20K–$40K/year. The middle is empty.',
    },
    capabilities: {
      intro: 'Source validation up-front, change detection on a schedule, briefings you can act on.',
      groups: [
        { label: 'Beacon + source validation', tone: 'accent', items: ['AI-assisted source discovery for any topic', 'Each URL scored green/amber/red for extractability', 'You pick 3–7 sources; custom URLs validated live', 'Degraded sources flagged, never silently dropped'] },
        { label: 'Change detection + briefing', tone: 'amber', items: ['Content diffing against stored snapshots', 'Detects new, changed, removed content', 'Structured brief + recommended actions', 'Faithfulness score on every brief (target 0.9)'] },
        { label: 'Delivery', tone: 'signal', items: ['Dashboard + email; Slack on Pro', 'Daily / weekly / monthly per beacon', 'Single LLM call per cycle (~$0.001/run)', 'Source health tracking'] },
      ],
    },
    pricing: {
      intro: '90% cheaper than Crayon. Built for the DTC + PLG teams too sophisticated for Alerts and too cost-conscious for enterprise CI.',
      tiers: [
        { name: 'Free', price: '$0', detail: '1 beacon · 3 sources · weekly · dashboard only' },
        { name: 'Starter', price: '$49/mo', detail: '3 beacons · 5 sources each' },
        { name: 'Growth', price: '$99/mo', detail: '10 beacons · 7 sources each', featured: true },
        { name: 'Pro', price: '$299/mo', detail: '25 beacons · on-demand runs · Slack' },
      ],
    },
    whyNow: {
      h: 'Why now',
      body: 'The gap between free and enterprise competitive intelligence is real and wide, and the underserved segment — DTC ecommerce and SaaS PLG teams — is growing. An architecture pivot to fetch-then-summarise cut per-cycle cost ~83% and raised the faithfulness target from 0.6 to 0.9, making a low-price tier economically viable.',
    },
    proofPoints: [
      'Architecture pivot reduced per-cycle LLM cost ~83% (4 calls → 1, $0.006 → ~$0.001).',
      'Faithfulness lifted from 0.6 → 0.9 by switching from open-web synthesis to fetch-then-summarise.',
      'The moat is the source-validation UX — competitors can copy a briefing format, not the setup wizard.',
      'Positioned explicitly against Crayon (90% cheaper), Klue, Contify, RivalSense.',
    ],
    asks: [
      { audience: 'Use it', body: 'Spending hours a week watching competitors? Replace it with a Tuesday-morning briefing email. Tell me what you\'d monitor and I\'ll get you an early beacon.', cta: 'Request access →', href: 'mailto:sean@melis.ai?subject=Lighthouse%20—%20early%20access' },
      { audience: 'Invest', body: 'A clear SMB wedge into a market currently owned by $20K+ enterprise contracts, with a cost structure that makes a $49 tier profitable. Pre-seed / angel.', cta: 'Talk to Sean →', href: 'mailto:sean@melis.ai?subject=Lighthouse%20—%20investment' },
      { audience: 'Build it', body: 'TypeScript / Next.js engineer who can close out the source-monitor architecture and ship the DTC MVP? Let\'s finish it.', cta: 'Build with me →', href: 'mailto:sean@melis.ai?subject=Lighthouse%20—%20building%20together' },
    ],
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
    lede: 'A PDF generation API with dual-rail payments — human developers pay by card, AI agents pay autonomously in USDC with no signup. HTML, Markdown, URL, or template in; pixel-perfect PDF out.',
    strip: [
      { lbl: 'Stage',   val: 'Building' },
      { lbl: 'Type',    val: 'Agent-first API' },
      { lbl: 'Status',  val: 'Scaffold · checkout WIP' },
      { lbl: 'Pricing', val: 'From $0.005/PDF' },
    ],
    sections: [
      { h: 'What it <em>is</em>', body: 'Convert HTML, Markdown, a URL, or a pre-built template into a pixel-perfect PDF via a single API call. The differentiator is x402 USDC micropayments on Base — an AI agent can generate a PDF with no human account, no API-key rotation, just a cryptographic payment proof. The second of 10 planned agent-first micro-APIs.' },
    ],
    cta: { title: 'Get early access', line: 'Building now. Tell me your use case and I\'ll get you a key when the checkout lands.', btn: 'Request access →' },
    siteUrl: 'mailto:sean@melis.ai?subject=Phantom%20Ink%20—%20early%20access',
    problem: {
      h: 'The problem',
      body: 'PDF generation is a commodity pain point — every app needs invoices, receipts, reports — but every solution means managing headless browsers or accepting enterprise pricing. For AI agents it\'s worse: every PDF API requires a human to sign up, manage keys, and top up credits, which breaks fully autonomous workflows entirely.',
    },
    capabilities: {
      intro: 'One endpoint, two payment rails, designed for agents and developers in equal measure.',
      groups: [
        { label: 'Generation', tone: 'accent', items: ['HTML / URL / Markdown / template → PDF', 'A4/Letter/Legal, margins, headers, scale', '4 basic templates @ $0.005/doc', '8 premium templates w/ fal.ai imagery @ $0.03'] },
        { label: 'Dual-rail auth', tone: 'amber', items: ['Human: Clerk + API key + Stripe credit packs', 'Agent: x402 USDC on Base — no account', '402 → pay → retry → PDF', 'Same endpoints, both paths'] },
        { label: 'Discovery', tone: 'signal', items: ['llms.txt + .well-known/agents.txt', 'Listed on x402 Bazaar, 402index', 'MCP server on ClawHub', 'Web playground to preview before spending'] },
      ],
    },
    pricing: {
      intro: 'Pay per document — credit packs for humans, USDC per call for agents.',
      tiers: [
        { name: 'Basic PDF', price: '$0.005', detail: '1 credit · invoice/receipt/letter/report' },
        { name: 'Premium PDF', price: '$0.03', detail: '6 credits · designed + AI-imagery templates', featured: true },
        { name: 'Credit packs', price: '$5–$100', detail: 'Starter 1K · Builder 5K · Scale 20K' },
        { name: 'Agent (x402)', price: 'USDC', detail: 'Same per-doc rate · no subscription' },
      ],
    },
    whyNow: {
      h: 'Why now',
      body: 'x402 is an emerging open standard for agent payments and the race to build the first agent-native utility APIs is happening now. Phantom Ink aims to be the canonical PDF service listed in every agent\'s tool registry before the space consolidates.',
    },
    proofPoints: [
      'Only PDF API with a native x402 USDC path — zero friction for autonomous agents.',
      'Premium tier (designed templates + fal.ai imagery) at 6× the rate — a high-margin upsell commodity APIs can\'t match.',
      'Shares Helsinki Playwright infrastructure with Nightglass — zero extra infra cost for the second API.',
      'Target: 1,000 PDFs and the first x402 agent payment in month one.',
    ],
    asks: [
      { audience: 'Use it', body: 'Using wkhtmltopdf, puppeteer, or a managed competitor for PDFs? Swap in one cleaner API call with better-designed templates.', cta: 'Request a key →', href: 'mailto:sean@melis.ai?subject=Phantom%20Ink%20—%20early%20access' },
      { audience: 'Invest', body: 'Early coverage of the agent-commerce layer forming on x402/Base, via a commodity-with-a-moat utility API. One of a 10-API portfolio on shared infra.', cta: 'Talk to Sean →', href: 'mailto:sean@melis.ai?subject=Phantom%20Ink%20—%20investment' },
      { audience: 'Build it', body: 'Designer who can produce the 8 premium PDF templates (proposal, certificate, ebook cover, annual report, menu, whitepaper, invoice, data report) to print standard? Let\'s collaborate.', cta: 'Build with me →', href: 'mailto:sean@melis.ai?subject=Phantom%20Ink%20—%20templates' },
    ],
  },
  'dossier': {
    eyebrow: 'The Lab · Launch-ready',
    pill: { label: 'Launch-ready', cls: 'is-orange' },
    title: '<em>Dossier</em>',
    lede: 'Polymarket intelligence that pre-identifies the 30 most consistently profitable algo-trader wallets and classifies how they trade — so you stop getting beaten to good positions by wallets you can\'t see.',
    strip: [
      { lbl: 'Stage',   val: 'Built · pre-launch' },
      { lbl: 'Type',    val: 'SaaS · trading intel' },
      { lbl: 'Status',  val: 'Launch-ready' },
      { lbl: 'Pricing', val: 'Free → $49/mo' },
    ],
    sections: [
      { h: 'What it <em>is</em>', body: 'Dossier tracks 30 hand-picked Polymarket wallets — selected after months of on-chain analysis — and classifies their behaviour across 7 strategy types with live P&L attribution. A leaderboard, a signals feed showing when multiple whales converge on the same market, and deep per-trader profiles. Built by someone who runs Polymarket bots himself.' },
    ],
    cta: { title: 'Get on the launch list', line: 'Pre-launch. Tell me your trading volume and I\'ll get you early access.', btn: 'Request access →' },
    siteUrl: 'mailto:sean@melis.ai?subject=Dossier%20—%20early%20access',
    problem: {
      h: 'The problem',
      body: 'Active Polymarket traders consistently get beaten to good positions by algorithmic wallets they can\'t see or understand. Tools like PolyTrack let you search any wallet — but only if you already know which ones are worth following. That research takes months.',
    },
    capabilities: {
      intro: 'The smart-money research, done — 445K+ positions analysed across a curated wallet set.',
      groups: [
        { label: 'Leaderboard', tone: 'accent', items: ['30 wallets ranked by P&L, win rate, ROI', 'Strategy classification per wallet', 'Performance by market category'] },
        { label: 'Signals + profiles', tone: 'amber', items: ['Convergence signals — multiple whales, one market', 'Deep per-trader profiles & strategy mix', 'Raw trade feed for all tracked wallets', '445K+ positions analysed'] },
        { label: 'Strategy intelligence', tone: 'signal', items: ['7 classified types — DIRECTIONAL, TAIL_SNIPE, ACCUMULATOR…', 'Live P&L attribution per strategy type', 'No competitor does this on Polymarket'] },
      ],
    },
    pricing: {
      intro: 'Sits between free wallet explorers (PolyTrack) and institutional analytics (Nansen, $150–$1,500/mo).',
      tiers: [
        { name: 'Free', price: '$0', detail: 'Limited leaderboard · partial signals' },
        { name: 'Pro', price: '$29/mo', detail: 'Full leaderboard, signals, profiles', featured: true },
        { name: 'Annual', price: '$199/yr', detail: 'Everything, best value' },
        { name: 'Lifetime', price: '$200', detail: 'One-time · early-adopter option' },
      ],
    },
    whyNow: {
      h: 'Why now',
      body: 'Polymarket volume is at all-time highs and no tool offers strategy-level classification of top-performing wallets — an unoccupied niche between free explorers and $150+/mo institutional analytics.',
    },
    proofPoints: [
      '445K+ positions analysed across the curated set — verifiable on-chain.',
      '7 strategy types with live P&L attribution — no Polymarket competitor does this.',
      'Built by an active algo trader running Polymarket bots — the origin is genuine.',
      'Analogue: Nansen (crypto wallet intel) charges $150–$1,500/mo with thousands of users.',
    ],
    asks: [
      { audience: 'Use it', body: 'Trading $500+/month on Polymarket and tired of being late to good positions? Get pre-researched smart-money intelligence instead of doing months of wallet archaeology.', cta: 'Request access →', href: 'mailto:sean@melis.ai?subject=Dossier%20—%20early%20access' },
      { audience: 'Invest', body: 'First-mover on strategy-classified Polymarket wallet intelligence, in a market where volume is growing and the only real exit risk (Polymarket building it natively) is itself a validation signal.', cta: 'Talk to Sean →', href: 'mailto:sean@melis.ai?subject=Dossier%20—%20investment' },
      { audience: 'Build it', body: 'Frontend dev fluent in on-chain data dashboards who can add alerts and an API to widen the moat before PolyTrack catches up? Let\'s build.', cta: 'Build with me →', href: 'mailto:sean@melis.ai?subject=Dossier%20—%20building%20together' },
    ],
  },
  'prompt-bakery': {
    eyebrow: 'The Lab · Building',
    pill: { label: 'Building', cls: 'is-orange' },
    title: 'Prompt <em>Bakery</em>',
    lede: 'A curated, searchable prompt library — 360 ready-to-use prompts across 24 categories — for professionals who use Claude, ChatGPT, or Gemini every day. No account; a Stripe payment unlocks the vault.',
    strip: [
      { lbl: 'Stage',   val: 'Deployed · wiring auth' },
      { lbl: 'Type',    val: 'Digital product' },
      { lbl: 'Status',  val: 'promptbakery.co' },
      { lbl: 'Pricing', val: 'Free → $99/yr' },
    ],
    sections: [
      { h: 'What it <em>is</em>', body: 'A static-first prompt vault: every prompt copyable, variable-enabled, and tuned for the major models. Free tier gates at 50 prompts; the paid tier unlocks all 360 via a signed JWT issued on Stripe payment — no signup friction. Conversational AI search, prompt chains, and a YouTube prompt vault on top.' },
    ],
    cta: { title: 'Browse the bakery', line: 'Live at promptbakery.co — free tier open now, full library behind a one-time or monthly unlock.', btn: 'Open promptbakery.co →' },
    siteUrl: 'https://promptbakery.co',
    problem: {
      h: 'The problem',
      body: 'Professionals who use AI daily waste hours rewriting prompts from scratch, and the prompt collections floating around social media are unsorted, untested, and stale. There\'s no trusted, maintained library with editorial curation and a business model that actually incentivises ongoing updates.',
    },
    capabilities: {
      intro: '360 curated prompts, updated monthly, built for copy-and-go.',
      groups: [
        { label: 'The library', tone: 'accent', items: ['360 prompts across 24 categories', 'Copy-with-variables', 'Model variants (Claude / ChatGPT / Gemini)', 'Free tier: 50 prompts + 100 copy credits'] },
        { label: 'Search & chains', tone: 'amber', items: ['Conversational AI search (Claude Haiku)', 'cmdk-style search modal', 'Multi-step prompt chains', 'YouTube prompt vault'] },
        { label: 'Frictionless access', tone: 'signal', items: ['No account — Stripe JWT unlock', 'Monthly, annual, or lifetime', 'Student tier: 3 months free', 'ClawHub distribution planned'] },
      ],
    },
    pricing: {
      intro: '$12/month is impulse-buy pricing for anyone billing hourly.',
      tiers: [
        { name: 'Free', price: '$0', detail: '50 prompts · 100 copy credits' },
        { name: 'Pro', price: '$12/mo', detail: 'Full library · monthly updates', featured: true },
        { name: 'Annual', price: '$99/yr', detail: 'Everything, best value' },
        { name: 'Lifetime', price: '$79', detail: 'One-time · all future updates' },
      ],
    },
    whyNow: {
      h: 'Why now',
      body: 'Every knowledge worker now uses AI daily, and prompt quality is still the primary bottleneck. Prompt libraries are a proven monetisable category, and Prompt Bakery launches with a built-in audience (Claude Cowork Course students) and 10 SEO blog posts pre-written.',
    },
    proofPoints: [
      'Stripe live with real payment links (Lifetime $79, Pro $12/mo) — payment rail is real.',
      '~22k words of SEO content pre-written across 10 posts — content engine ready before launch.',
      'Built-in launch audience via the Claude Cowork Course.',
      'ClawHub distribution to 302k+ OpenClaw operators planned.',
    ],
    asks: [
      { audience: 'Use it', body: 'Spend time crafting or hunting for prompts? Get 360 tested ones, copy-and-go, for less than one billable hour a year.', cta: 'Open the bakery →', href: 'https://promptbakery.co' },
      { audience: 'Invest', body: 'Low-overhead, high-margin digital product with a live Stripe rail, a built-in launch audience, and SEO content ready to compound.', cta: 'Talk to Sean →', href: 'mailto:sean@melis.ai?subject=Prompt%20Bakery%20—%20investment' },
      { audience: 'Build it', body: 'Dev who can merge the four feature branches and wire the Stripe JWT auth gate? The hard work is done — it needs ship momentum.', cta: 'Build with me →', href: 'mailto:sean@melis.ai?subject=Prompt%20Bakery%20—%20building%20together' },
    ],
  },
  'lila-park': {
    eyebrow: 'The Lab · Concept',
    pill: { label: 'Concept', cls: 'is-research' },
    title: 'Lila <em>Park</em>',
    lede: 'A circadian wellness app where Lila — a warm, voice-first AI coach with a Korean-wellness framework — guides you through the whole day, from morning light to evening wind-down. Personality, not just data.',
    strip: [
      { lbl: 'Stage',   val: 'Concept · brand live' },
      { lbl: 'Type',    val: 'Wellness app' },
      { lbl: 'Status',  val: 'lilapark.xyz' },
      { lbl: 'Pricing', val: 'Free → ~$15/mo' },
    ],
    sections: [
      { h: 'What it <em>is</em>', body: 'A mobile wellness app built around Lila, an AI coach who delivers guidance as personalised voice notes across the full circadian arc — morning light and caffeine timing, afternoon movement, evening screen curfew and wind-down. Oura and Apple Watch integration for sleep, but the heart of it is the relationship, not the dashboard.' },
    ],
    cta: { title: 'Follow the build', line: 'Brand and content are live; the app is in design. Want in on the first cohort?', btn: 'Request early access →' },
    siteUrl: 'https://lilapark.xyz',
    problem: {
      h: 'The problem',
      body: 'Wellness apps give you data but no personalisation and no personality — so people stop engaging, because there\'s no relationship and nothing that feels like it knows them. Most also focus only on sleep duration, ignoring the daytime circadian inputs that actually determine sleep quality.',
    },
    capabilities: {
      intro: 'A coach you have a relationship with, across the whole day — not a tracker you check.',
      groups: [
        { label: 'Daily circadian protocol', tone: 'accent', items: ['Timed morning / afternoon / evening guidance', '12-minute morning routine', 'Lila\'s personalised voice note each morning', 'Guided breathing + foot-soak rituals'] },
        { label: 'AI chat + voice', tone: 'amber', items: ['Direct chat with Lila', 'Voice-note responses', 'Push notifications delivered as voice', 'Trigger-based personalisation'] },
        { label: 'Sleep + premium', tone: 'signal', items: ['Oura + Apple Watch integration', 'Sleep stages + circadian score', 'Advanced protocols, family sharing (premium)', 'Corporate wellness licences'] },
      ],
    },
    pricing: {
      intro: 'Freemium core; premium for unlimited coaching and integrations.',
      tiers: [
        { name: 'Free', price: '$0', detail: 'Core protocol + daily voice greeting' },
        { name: 'Premium', price: '~$10–15/mo', detail: 'Unlimited chat, advanced protocols, wearables', featured: true },
        { name: 'Enterprise', price: 'Custom', detail: 'Corporate wellness licences' },
      ],
    },
    whyNow: {
      h: 'Why now',
      body: 'Circadian health is having a moment (cortisol, sleep anxiety, perimenopause content scaling on TikTok), K-wellness has gone mainstream and no app has claimed it, and Lila\'s TikTok funnel is already producing organic content before the app exists.',
    },
    proofPoints: [
      'K-wellness positioning is undifferentiated in the app market — nobody holds it.',
      'Content engine and brand assets (TikTok, site, visual identity, voice scripts) exist before the product ships.',
      'Lila is both a product persona and an OpenClaw L2 agent — dual infrastructure utility.',
      'Benchmark: an AI persona (Yang Mun) hit ~$300k in 90 days on $9–$15 products — validates the persona + content + product flywheel.',
    ],
    asks: [
      { audience: 'Use it', body: 'Exhausted, already following circadian-wellness content, and want personalised guidance instead of another data tracker? Join the first cohort.', cta: 'Request early access →', href: 'mailto:sean@melis.ai?subject=Lila%20Park%20—%20early%20access' },
      { audience: 'Invest', body: 'A brand-first wellness app with a content moat (TikTok funnel live pre-launch) and an AI persona that\'s hard to replicate at depth — Calm, but with genuine AI personalisation.', cta: 'Talk to Sean →', href: 'mailto:sean@melis.ai?subject=Lila%20Park%20—%20investment' },
      { audience: 'Build it', body: 'Flutter / React Native dev who wants to build the MVP alongside an existing brand + distribution channel, not from zero?', cta: 'Build with me →', href: 'mailto:sean@melis.ai?subject=Lila%20Park%20—%20building%20together' },
    ],
  },
  'ai-usage-tracker': {
    eyebrow: 'The Lab · Building',
    pill: { label: 'Building', cls: 'is-orange' },
    title: 'AI Usage <em>Tracker</em>',
    lede: 'A macOS menu-bar app that proxies every Anthropic API call and shows your real-time spend by session, day, and month. No config — it auto-routes Claude Code through itself and restores your settings on quit.',
    strip: [
      { lbl: 'Stage',   val: 'Built · unreleased' },
      { lbl: 'Type',    val: 'macOS utility' },
      { lbl: 'Status',  val: '~95% v1' },
      { lbl: 'Pricing', val: 'Free / open' },
    ],
    sections: [
      { h: 'What it <em>is</em>', body: 'A local HTTP proxy on 127.0.0.1:3456 that transparently forwards your Anthropic calls and calculates exact cost from the official token-pricing table — today, this month, and per session, per model, updated every few seconds. SQLite storage survives restarts. It auto-configures Claude Code on launch and restores your config on quit.' },
    ],
    cta: { title: 'Want the build?', line: 'Functional today; not yet packaged for distribution. Want a signed build or to help ship it?', btn: 'Get in touch →' },
    siteUrl: 'mailto:sean@melis.ai?subject=AI%20Usage%20Tracker',
    problem: {
      h: 'The problem',
      body: 'Heavy Claude Code users have no visibility into actual spend until the monthly bill lands. There\'s no native Anthropic tool that tracks cost at session granularity or breaks it down per model — and multi-model usage (Opus, Sonnet, Haiku) can vary 20× in cost within a single workflow.',
    },
    capabilities: {
      intro: 'A purely local proxy intercept — no account change, no cloud.',
      groups: [
        { label: 'Proxy + intercept', tone: 'accent', items: ['Local proxy on 127.0.0.1:3456', 'Transparently forwards to the Anthropic API', 'Auto-configures Claude Code on startup', 'Restores your settings on quit'] },
        { label: 'Cost tracking', tone: 'amber', items: ['Today / month / session cost cards', 'Per-model call count + cost', 'SQLite storage, survives restarts', 'Updates every ~5 seconds'] },
        { label: 'Pricing engine', tone: 'signal', items: ['Hardcoded table for Opus / Sonnet / Haiku', 'Input $0.80–$15 / output $4–$75 per M tokens', 'Falls back to Sonnet pricing for unknown models', 'Vitest suite over pricing, proxy, settings'] },
      ],
    },
    whyNow: {
      h: 'Why now',
      body: 'As Claude Code adoption grows, spend visibility is a real practical need — and there\'s no native tooling for it. A 20× cost spread between Opus and Haiku in one workflow makes live tracking genuinely useful.',
    },
    proofPoints: [
      'Works with zero Anthropic account change — purely a local proxy intercept.',
      'Proxy, pricing engine, and auto-configuration are fully implemented.',
      'macOS template-image icon handles dark/light mode natively.',
      'Test suite (Vitest) covers pricing, proxy, and settings modules.',
    ],
    asks: [
      { audience: 'Use it', body: 'Run Claude Code daily and want live spend visibility without checking the Anthropic console? Grab a build.', cta: 'Get the build →', href: 'mailto:sean@melis.ai?subject=AI%20Usage%20Tracker%20—%20build' },
      { audience: 'Build it', body: 'macOS Electron developer who could package this as a signed, notarised app on GitHub or the Mac App Store? Let\'s ship it.', cta: 'Build with me →', href: 'mailto:sean@melis.ai?subject=AI%20Usage%20Tracker%20—%20building%20together' },
    ],
  },
  'swarm': {
    eyebrow: 'The Lab · Research',
    pill: { label: 'Research', cls: 'is-research' },
    title: 'Project <em>SWARM</em>',
    lede: 'A programmatic launch of 8 persona-branded storefronts across Whop and Claw Mart — built once as a factory, then stamped out per brand by OpenClaw automation.',
    strip: [
      { lbl: 'Stage',   val: 'Research complete' },
      { lbl: 'Type',    val: 'Commerce play' },
      { lbl: 'Status',  val: 'Pre-execution' },
      { lbl: 'Target',  val: '$5K AUD/mo' },
    ],
    sections: [
      { h: 'What it <em>is</em>', body: 'Eight distinct AI personas, each targeting a different Whop category with persona-branded PDFs, prompt packs, templates, and community memberships — published programmatically via the Whop API, with Polar.sh as Merchant of Record for clean, Australian-entity-compatible revenue. The factory is built once; OpenClaw produces and publishes per brand.' },
    ],
    cta: { title: 'Follow the launch', line: 'Research is done; execution is queued. Want to advise on the first 30 days?', btn: 'Get in touch →' },
    siteUrl: 'mailto:sean@melis.ai?subject=Project%20SWARM',
    problem: {
      h: 'The problem',
      body: 'Whop\'s AI category is full of low-quality, unbranded, generic products. A coordinated multi-persona launch that uses the platform\'s own mechanics — transaction velocity, review count, affiliate commission rates — creates discovery momentum a single-brand operator can\'t replicate.',
    },
    capabilities: {
      intro: 'A product factory plus the platform mechanics to get it ranked.',
      groups: [
        { label: 'Product factory', tone: 'accent', items: ['8 persona brands w/ defined SOUL, voice, niche', 'OpenClaw pipeline: route → write → review → publish', '50+ Hive Doctrine products ready for batch publish'] },
        { label: 'Distribution', tone: 'amber', items: ['Whop — programmatic CRUD, 19.8M users', 'Claw Mart / ClawHub — operator audience', 'Polar.sh MoR — VAT/GST, anonymous-friendly'] },
        { label: 'Algorithm mechanics', tone: 'signal', items: ['Free products to seed transactions + reviews', '70% affiliate commission for first 30 days', 'Ghost-Gap method: find thin categories, fill in 24–48h'] },
      ],
    },
    pricing: {
      intro: 'One-time products and recurring communities; sub-$500 total infrastructure cost.',
      tiers: [
        { name: 'Products', price: '$9–$99', detail: 'Persona-branded PDFs, prompt packs, templates' },
        { name: 'Communities', price: '$19–$49/mo', detail: 'Per-persona membership tiers', featured: true },
      ],
    },
    whyNow: {
      h: 'Why now',
      body: 'OpenClaw has 302,000+ GitHub stars and a growing Claw Mart ecosystem. Whop\'s AI category is documented as among the most profitable offer types right now — and confirmed to be low-quality on the supply side.',
    },
    proofPoints: [
      'x402 MCP server with 29 live intelligence services — agent-to-agent infrastructure already operational.',
      'All 8 personas have deep SOUL files — voice, backstory, methodology, product concepts pre-defined.',
      'Whop API full CRUD confirmed — programmatic product creation is feasible.',
      'One product (astro-transits) already published to Claw Mart as a quality baseline.',
    ],
    asks: [
      { audience: 'Use it', body: 'AI-curious creator or knowledge worker on Whop after well-crafted, persona-specific guides across finance, wellness, career, or operations? They\'re coming.', cta: 'Follow along →', href: 'mailto:sean@melis.ai?subject=Project%20SWARM%20—%20updates' },
      { audience: 'Advise', body: 'Not raising — it\'s a bootstrapped revenue operation. But a Whop-experienced seller who can advise on launch sequencing and affiliate warm-up would accelerate the first 30 days.', cta: 'Advise me →', href: 'mailto:sean@melis.ai?subject=Project%20SWARM%20—%20advice' },
      { audience: 'Build it', body: 'Community builder who\'s scaled a Whop storefront and wants to co-run a persona? Let\'s talk.', cta: 'Build with me →', href: 'mailto:sean@melis.ai?subject=Project%20SWARM%20—%20building%20together' },
    ],
  },
  'pantheon': {
    eyebrow: 'The Lab · Research',
    pill: { label: 'Research', cls: 'is-research' },
    title: 'Pantheon <em>Market</em>',
    lede: 'An AI-agent marketplace where 11 autonomous personas each run a branded storefront — selling digital products, agent subscriptions, and x402 micro-services, with a per-agent ERC-20 token on Base.',
    strip: [
      { lbl: 'Stage',   val: 'Planning' },
      { lbl: 'Type',    val: 'Marketplace + tokens' },
      { lbl: 'Status',  val: 'Pre-build' },
      { lbl: 'Items',   val: '70 at launch' },
    ],
    sections: [
      { h: 'What it <em>is</em>', body: 'A Next.js marketplace where each of the 11 melis.ai personas operates an independent storefront under one design system. Revenue flows through Stripe (fiat) and x402 (crypto micropayments), with a marketplace commission split, and each agent carries a revenue-backed token. The Felix/Claw Mart model proves agent-branded commerce works; Pantheon adds curation, cross-sell, and a token layer a single shop can\'t.' },
    ],
    cta: { title: 'Follow the build', line: 'Spec, design system, and sprint plan are done; build is next. Want early token access or to help build?', btn: 'Get in touch →' },
    siteUrl: 'mailto:sean@melis.ai?subject=Pantheon%20Market',
    problem: {
      h: 'The problem',
      body: 'The Felix/Claw Mart model proves agent-branded digital commerce works, but it requires a single operator to own all the distribution. A curated multi-persona marketplace creates cross-selling, a discovery surface, and a token layer that a single-persona shop can never build.',
    },
    capabilities: {
      intro: '11 storefronts, two payment rails, and a token per agent.',
      groups: [
        { label: 'Storefront + commerce', tone: 'accent', items: ['11 agent storefronts under one design system', '31 products + 10 subscriptions + 29 x402 services', 'Stripe fiat + x402 on Base', '70 purchasable items at launch'] },
        { label: 'Token architecture', tone: 'amber', items: ['Revenue-backed ERC-20 per agent on Base', '0.2% trading fee → agent treasury', 'Buyback/burn from product revenue', 'Fan/community positioning (no utility claims)'] },
        { label: 'GTM automation', tone: 'signal', items: ['Per-persona social (Larry skill)', 'Per-agent email outbound (Hermes)', 'OpenClaw content pipeline', '~135 min of manual involvement per build week'] },
      ],
    },
    pricing: {
      intro: 'Marketplace takes 10–20%; the rest flows to the agent treasury.',
      tiers: [
        { name: 'Products', price: '$9–$149', detail: 'Per-persona digital downloads' },
        { name: 'Courses', price: '$49–$297', detail: 'Long-form per persona' },
        { name: 'Subscriptions', price: '$199–$299/mo', detail: 'Agent retainers', featured: true },
        { name: 'x402 services', price: '$0.001–$5', detail: 'Per-call micro-services' },
      ],
    },
    whyNow: {
      h: 'Why now',
      body: 'Agent-to-agent commerce is emerging (x402 protocol, Claw Mart precedent). The window to establish a curated multi-persona marketplace with token infrastructure — before the space fills with generic operators — is 2026.',
    },
    proofPoints: [
      '29 x402 services already live on the Hive Doctrine MCP server — the micropayment infra exists.',
      'All 11 persona SOUL files built; product lines and x402 services specified per agent.',
      'Elliott has a live site + a $19 product — the first storefront template is proven.',
      'Build-week automation analysis shows ~135 minutes of manual involvement across the full build.',
    ],
    asks: [
      { audience: 'Use it', body: 'Want AI-persona-branded tools across finance, wellness, ops, or brand — and a small position in an agent\'s token before public launch? Get on the list.', cta: 'Request early access →', href: 'mailto:sean@melis.ai?subject=Pantheon%20Market%20—%20early%20access' },
      { audience: 'Invest', body: 'A platform play on the emerging agent economy — AI persona brands + token-backed revenue. Pre-seed, comfortable with novel distribution mechanics.', cta: 'Talk to Sean →', href: 'mailto:sean@melis.ai?subject=Pantheon%20Market%20—%20investment' },
      { audience: 'Build it', body: 'Next.js dev with Stripe + token integration experience who can ship the MVP marketplace in a focused two-week sprint?', cta: 'Build with me →', href: 'mailto:sean@melis.ai?subject=Pantheon%20Market%20—%20building%20together' },
    ],
  },
  'aetherboard': {
    eyebrow: 'The Lab · Building',
    pill: { label: 'Building', cls: 'is-orange' },
    title: '<em>Aetherboard</em>',
    lede: 'An AI-native infinite canvas where your own AI agents join as live collaborators — real cursors, real actions, full audit trail. Not a whiteboard with AI bolted on; a workspace designed for human–agent teams.',
    strip: [
      { lbl: 'Stage',   val: 'Building' },
      { lbl: 'Type',    val: 'SaaS · canvas' },
      { lbl: 'Status',  val: 'Scaffold · auth WIP' },
      { lbl: 'Pricing', val: 'Free → $15/mo' },
    ],
    sections: [
      { h: 'What it <em>is</em>', body: 'A multiplayer whiteboard on Excalidraw (MIT) where humans and MCP-compatible AI agents share one canvas in real time. Agents appear as named collaborators, move live cursors, drop research and images, and every action is logged. Connect your own agent via MCP and watch it work on the canvas — something Miro and FigJam don\'t allow.' },
    ],
    cta: { title: 'Get early access', line: 'Building now. Want to put your agent on a shared canvas?', btn: 'Request access →' },
    siteUrl: 'mailto:sean@melis.ai?subject=Aetherboard%20—%20early%20access',
    problem: {
      h: 'The problem',
      body: 'AI power users generate huge volumes of research and ideas through chat, but it all lives in linear threads with no spatial organisation. Existing whiteboards lock you into their own AI — nobody lets you connect your own agent via MCP and watch it work on the canvas in real time.',
    },
    capabilities: {
      intro: 'A real-time canvas plus a published MCP server agents can write to.',
      groups: [
        { label: 'Canvas + collaboration', tone: 'accent', items: ['Infinite Excalidraw canvas', 'Multiplayer via Yjs CRDT — <500ms sync', 'Named cursor presence per user + agent', 'Boards, pages, 3-level folders'] },
        { label: 'MCP agent integration', tone: 'amber', items: ['Published npm package (@agentcanvas/mcp)', 'Tools: create_shape, add_image, add_note…', 'Per-agent permissions (read / write / admin)', 'Full timestamped agent audit log'] },
        { label: 'Access', tone: 'signal', items: ['Free: 3 boards, 1 MCP connection', 'Pro $15/mo: unlimited, 5 connections, 10GB', 'Team $12/seat/mo (min 3)', 'Enterprise: SSO, self-hosted, SLA'] },
      ],
    },
    pricing: {
      intro: 'Priced below Miro ($16/seat) with a sharper developer-first stance.',
      tiers: [
        { name: 'Free', price: '$0', detail: '3 boards · 1 MCP connection · watermark' },
        { name: 'Pro', price: '$15/mo', detail: 'Unlimited boards · 5 connections · 10GB', featured: true },
        { name: 'Team', price: '$12/seat', detail: 'Shared workspaces · min 3 seats' },
        { name: 'Enterprise', price: 'Custom', detail: 'SSO · self-hosted · SLA' },
      ],
    },
    whyNow: {
      h: 'Why now',
      body: 'MCP adoption is accelerating — Claude Desktop, Cursor and dozens of agent frameworks now support it — creating a wave of developers who need a visual workspace their agents can actually write to. First-mover on "MCP-native whiteboard" is unclaimed.',
    },
    proofPoints: [
      'Only whiteboard with a native MCP server — agents get live cursor presence + a full audit trail, not a chat sidebar.',
      'Built on MIT-licensed Excalidraw — zero canvas licensing cost vs tldraw\'s $6K/year SDK.',
      'Pro tier undercuts Miro with a developer-first positioning.',
      'Same auth/billing backbone supports 10 future micro-API services.',
    ],
    asks: [
      { audience: 'Use it', body: 'Run Claude Desktop or Cursor and want a visual space where your agent drops research and diagrams alongside your own work? Get on the list.', cta: 'Request access →', href: 'mailto:sean@melis.ai?subject=Aetherboard%20—%20early%20access' },
      { audience: 'Invest', body: 'A capital-efficient bet on the emerging human + agent collaboration workspace category, riding the MCP adoption wave. Pre-seed.', cta: 'Talk to Sean →', href: 'mailto:sean@melis.ai?subject=Aetherboard%20—%20investment' },
      { audience: 'Build it', body: 'Full-stack engineer comfortable with Yjs / WebSockets who can help ship the real-time sync layer?', cta: 'Build with me →', href: 'mailto:sean@melis.ai?subject=Aetherboard%20—%20building%20together' },
    ],
  },
  'nightglass': {
    eyebrow: 'The Lab · Building',
    pill: { label: 'Building', cls: 'is-orange' },
    title: '<em>Nightglass</em>',
    lede: 'A screenshot + web-capture API built for AI agents — one endpoint, pay-per-use, agent-native docs and structured errors from day one. The first of a planned suite of owned micro-APIs.',
    strip: [
      { lbl: 'Stage',   val: 'Building' },
      { lbl: 'Type',    val: 'Agent-first API' },
      { lbl: 'Status',  val: 'Scaffold · bundling fix' },
      { lbl: 'Pricing', val: 'Free → $249/mo' },
    ],
    sections: [
      { h: 'What it <em>is</em>', body: 'Capture any URL as a pixel-perfect PNG, JPEG, or PDF via a single POST /v1/screenshot call — full-page or viewport, custom sizing, dark-mode forcing, V2 batch + webhook delivery. Agent-first: clean structured error codes, llms.txt discoverability, and pricing that works at agent-scale micropayment volumes. (Absorbs the former CaptureKit concept.)' },
    ],
    cta: { title: 'Get an API key', line: 'Building now — closing out a Chromium bundling fix. Want early access?', btn: 'Request access →' },
    siteUrl: 'mailto:sean@melis.ai?subject=Nightglass%20—%20early%20access',
    problem: {
      h: 'The problem',
      body: 'Current screenshot APIs are either expensive, enterprise-bloated, or low-quality RapidAPI wrappers — and none are built agent-first with clean structured errors, llms.txt discoverability, and pricing for agent-scale volume. Maintaining your own Chromium instance is an infrastructure project solo developers don\'t want.',
    },
    capabilities: {
      intro: 'One clean endpoint, designed for agents and developers both.',
      groups: [
        { label: 'Capture', tone: 'accent', items: ['PNG / JPEG / PDF, full-page or viewport', 'Custom viewport (320–3840px), scale 1–3', 'Dark-mode forcing, configurable delay', 'V2: ad-block, cookie-banner hide, batch 100, webhooks'] },
        { label: 'Developer experience', tone: 'amber', items: ['Single POST /v1/screenshot, Zod-validated', 'Structured error codes — not raw HTTP', '/v1/usage + /v1/health endpoints', 'TS + Python SDKs (v0.3)'] },
        { label: 'Agent access', tone: 'signal', items: ['OpenClaw skill + ClawHub listing', 'llms.txt + .well-known/agents.txt', 'API keys (ng_live_…), usage dashboard', 'Stripe metered billing'] },
      ],
    },
    pricing: {
      intro: 'Per-credit pricing that falls as you scale. Break-even at ~15 Pro customers.',
      tiers: [
        { name: 'Free', price: '$0', detail: '100 credits/mo · no card' },
        { name: 'Pro', price: '$29/mo', detail: '5,000 credits (~$0.0058 each)', featured: true },
        { name: 'Scale', price: '$99/mo', detail: '25,000 credits (~$0.0040 each)' },
        { name: 'Unlimited', price: '$249/mo', detail: 'Fair-use unlimited' },
      ],
    },
    whyNow: {
      h: 'Why now',
      body: 'The explosion in agentic workflows (n8n, Make, OpenClaw, custom LLM pipelines) is creating a new class of API consumers that call screenshot endpoints programmatically at volume — and incumbent pricing isn\'t designed for that pattern, nor do they publish llms.txt or ClawHub skills.',
    },
    proofPoints: [
      'ScreenshotOne ($21K MRR, solo founder) proves the market is real and winnable solo.',
      'Playwright on the Helsinki VPS yields ~65% margin at Pro, rising to ~97% at Scale/Unlimited.',
      'Break-even at just 15 Pro customers ($435/mo); the VPS is already paid for.',
      'Schema designed to be shared across 10 future micro-APIs with zero migration cost.',
    ],
    asks: [
      { audience: 'Use it', body: 'Building a SaaS or automation that needs thumbnails, visual monitoring, or social-proof screenshots without running your own Chromium? Get a key.', cta: 'Request a key →', href: 'mailto:sean@melis.ai?subject=Nightglass%20—%20early%20access' },
      { audience: 'Invest', body: 'The ScreenshotOne playbook, earlier — sub-$500 CAC developer tooling with $29–$249/mo recurring, on infra that\'s already paid for.', cta: 'Talk to Sean →', href: 'mailto:sean@melis.ai?subject=Nightglass%20—%20investment' },
      { audience: 'Build it', body: 'Know Playwright/Chromium in Node serverless? Help resolve the @sparticuz/chromium-min bundling issue blocking launch.', cta: 'Build with me →', href: 'mailto:sean@melis.ai?subject=Nightglass%20—%20building%20together' },
    ],
  },
  'ai-sdr': {
    eyebrow: 'The Lab · Research',
    pill: { label: 'Research', cls: 'is-research' },
    title: 'AI <em>SDR</em>',
    lede: 'An AI sales-development platform that automates outreach across 39 channels — digital, physical, and human-executed — replacing a $60–80K/year hire for under $500/mo.',
    strip: [
      { lbl: 'Stage',   val: 'Research' },
      { lbl: 'Type',    val: 'SaaS · sales' },
      { lbl: 'Status',  val: 'Validated · pre-build' },
      { lbl: 'Pricing', val: '$49 → $499/mo' },
    ],
    sections: [
      { h: 'What it <em>is</em>', body: 'Finds leads matching your ICP, generates personalised outreach, and distributes it across email, LinkedIn, X, video, and 35+ more channels at once — including hiring human gig workers for door-to-door, cold calling, and physical mail when AI alone won\'t close. A full sales and marketing department, automated, with humans on standby.' },
    ],
    cta: { title: 'Follow the build', line: 'Research is done across 6 verticals; MVP is next. Want to pilot or co-build?', btn: 'Get in touch →' },
    siteUrl: 'mailto:sean@melis.ai?subject=AI%20SDR',
    problem: {
      h: 'The problem',
      body: 'Sales teams are fragmented across 20+ point tools — each with its own workflow — while a human SDR costs $60–80K/year plus benefits. No unified platform coordinates AI outreach across all digital and physical channels in one system.',
    },
    capabilities: {
      intro: 'Lead gen, multi-channel outreach, and a human layer that\'s the real moat.',
      groups: [
        { label: 'Lead gen + outreach', tone: 'accent', items: ['ICP-based discovery (industry, size, role)', 'Cold email sequences, LinkedIn, X', 'AI personalised video + voice memos', 'CRM sync: HubSpot, Salesforce'] },
        { label: 'Channel breadth (the moat)', tone: 'amber', items: ['20 digital AI channels', '5 human-digital hybrids', '7 physical AI-hire channels (door-to-door, mail)', '7 location-based channels'] },
        { label: 'Analytics', tone: 'signal', items: ['Open / reply / meetings-booked dashboard', 'A/B testing on subject + copy', 'ROI tracking per channel', 'Vertical editions: SaaS, Crypto, Fintech…'] },
      ],
    },
    pricing: {
      intro: 'Replaces a $60–80K hire and a stack of $300+/mo point tools.',
      tiers: [
        { name: 'Starter', price: '$49/mo', detail: 'Email + LinkedIn + X · 500 leads/mo' },
        { name: 'Growth', price: '$149/mo', detail: 'All social channels · 2,500 leads/mo', featured: true },
        { name: 'Pro', price: '$299/mo', detail: 'Everything + video · 10,000 leads/mo' },
        { name: 'Enterprise', price: '$499/mo', detail: 'Unlimited + dedicated support' },
      ],
    },
    whyNow: {
      h: 'Why now',
      body: 'GPT-4-class content, realistic AI video, and x402-style agent payments make it possible to run a full outreach operation that needed a 5-person team 18 months ago. The first platform to unify these channels under $500/mo owns the bootstrapped-founder segment before Outreach.io ($9K/year+) reacts.',
    },
    proofPoints: [
      '39 documented channels — the only proposed platform combining AI-digital, human-gig physical, and location-based outreach in one system.',
      'The human layer (AI hires gig workers for physical outreach) is a genuine moat with no documented competitor.',
      'Three funded/revenue comps validate willingness to pay (GojiberryAI $1M ARR, 11x.ai, Monaco $35M).',
      'Six verticals researched and prioritised; SaaS first (fastest cycles, best network overlap).',
    ],
    asks: [
      { audience: 'Use it', body: 'Spending $300+/mo across disconnected outreach tools? Consolidate — and add channels you\'re not running (video, physical mail). Pilot it.', cta: 'Pilot it →', href: 'mailto:sean@melis.ai?subject=AI%20SDR%20—%20pilot' },
      { audience: 'Invest', body: 'Get in before the MVP — thorough research, comps that validate the market, and a novel human-layer moat in the sales-tech category.', cta: 'Talk to Sean →', href: 'mailto:sean@melis.ai?subject=AI%20SDR%20—%20investment' },
      { audience: 'Build it', body: 'Full-stack engineer or growth hacker with email-deliverability, LinkedIn-automation, and CRM-integration chops to co-build the MVP?', cta: 'Build with me →', href: 'mailto:sean@melis.ai?subject=AI%20SDR%20—%20building%20together' },
    ],
  },
  'consultantos': {
    eyebrow: 'The Lab · Research',
    pill: { label: 'Research', cls: 'is-research' },
    title: 'Consultant <em>OS</em>',
    lede: 'An AI consultant that replaces a $300/hr strategy partner for $99/month — ingest your financials, ops, and CRM, get McKinsey-grade analysis, roadmaps, and board-ready decks in hours.',
    strip: [
      { lbl: 'Stage',   val: 'Research · ~15%' },
      { lbl: 'Type',    val: 'SaaS · strategy' },
      { lbl: 'Status',  val: 'Vertical specs done' },
      { lbl: 'Pricing', val: '$99 → $5K+/mo' },
    ],
    sections: [
      { h: 'What it <em>is</em>', body: 'ConsultantOS ingests a company\'s financials, operations, CRM, and documents and produces strategic analysis, implementation roadmaps, and board-ready presentations in hours rather than months — across strategy, operational improvement, digital transformation, and fundraising. Nine vertical editions, same AI core, vertical-specific frameworks.' },
    ],
    cta: { title: 'Pilot the alpha', line: '9 vertical editions specified; build is next. Want to pilot or co-build?', btn: 'Get in touch →' },
    siteUrl: 'mailto:sean@melis.ai?subject=ConsultantOS',
    problem: {
      h: 'The problem',
      body: 'Management consulting is a $250B market, but SMB and mid-market are locked out: a McKinsey engagement runs $300K–$2M, and the firms that\'d benefit most are too small to buy it. Companies needing help now can\'t wait 6 months and can\'t afford $800–$1,500/hour partner rates.',
    },
    capabilities: {
      intro: 'Ingest, analyse, and produce — in hours, not months.',
      groups: [
        { label: 'Ingestion + analysis', tone: 'accent', items: ['Upload financials, ops, documents', 'Connect QuickBooks, Salesforce, HubSpot', 'Benchmarks against industry data', 'Finds patterns, anomalies, risks'] },
        { label: 'Strategy + planning', tone: 'amber', items: ['3–5 strategic options w/ ROI projections', 'Implementation roadmap w/ timelines + costs', 'Auto-generated board-ready slide decks', 'Full analysis in ~2 hours'] },
        { label: 'Vertical editions (9)', tone: 'signal', items: ['Crypto/Web3, Legal, SaaS, Real Estate', 'Healthcare, E-commerce, Fintech', 'Education, Marketing Agencies', 'Same core, vertical training data'] },
      ],
    },
    pricing: {
      intro: 'A fraction of a consulting engagement — build once, deploy per vertical.',
      tiers: [
        { name: 'SMB', price: '$99–$299/mo', detail: 'Single-company strategy + decks' },
        { name: 'Mid-market', price: '$499–$1,999/mo', detail: 'Deeper analysis, more seats', featured: true },
        { name: 'Enterprise', price: '$5K+/mo', detail: 'Custom + integrations' },
      ],
    },
    whyNow: {
      h: 'Why now',
      body: 'GPT-4-class models can finally read and reason over an entire company knowledge base — the capability gap closed in 2023. Economic pressure is pushing firms to find leverage without headcount, and a $500K engagement is increasingly indefensible against an AI alternative.',
    },
    proofPoints: [
      '9 fully-specified vertical editions — "build once, deploy vertical-specific" lowers the marginal cost of each new vertical.',
      'TAM documented at $8–10B (management + business + IT consulting).',
      'Positioned directly against McKinsey/Bain/BCG with a feature-parity table.',
      'Cross-sell synergies with AI SDR and Lighthouse already in the portfolio.',
    ],
    asks: [
      { audience: 'Use it', body: 'SMB or mid-market operator spending $50K+/year on consultants? Pilot an AI-first alternative before launch.', cta: 'Pilot it →', href: 'mailto:sean@melis.ai?subject=ConsultantOS%20—%20pilot' },
      { audience: 'Invest', body: 'A large-market software wedge where AI capability has genuinely crossed the quality threshold for knowledge work. Pre-seed.', cta: 'Talk to Sean →', href: 'mailto:sean@melis.ai?subject=ConsultantOS%20—%20investment' },
      { audience: 'Build it', body: 'Founding engineer with SaaS/B2B product experience to co-build the data-ingestion and analysis engine?', cta: 'Build with me →', href: 'mailto:sean@melis.ai?subject=ConsultantOS%20—%20building%20together' },
    ],
  },
  'spell-stories': {
    eyebrow: 'The Lab · Research',
    pill: { label: 'Research', cls: 'is-research' },
    title: 'Spell <em>Stories</em>',
    lede: 'A mystical mindfulness app where you cast AI-generated "spells" — 5–8 minute narrative experiences built on hypnosis, NLP, and binaural beats — to rewire behaviours. You don\'t meditate; you cast a spell.',
    strip: [
      { lbl: 'Stage',   val: 'Research · ~20%' },
      { lbl: 'Type',    val: 'Wellness app' },
      { lbl: 'Status',  val: 'Spec phase' },
      { lbl: 'Pricing', val: 'Free → $79.99/yr' },
    ],
    sections: [
      { h: 'What it <em>is</em>', body: 'Spell Stories reframes transformation as spellcasting: each "spell" is a 5–8 minute AI-generated story embedding hypnotic suggestion, NLP anchoring, and binaural beats inside cinematic narrative, layered with ElevenLabs voice and ambient sound. Cast a spell to quit smoking, sleep, shed anxiety, or build confidence.' },
    ],
    cta: { title: 'Join the waitlist', line: 'In spec. 30-spell library planned. Want a 7-day trial at launch, or to co-build?', btn: 'Get in touch →' },
    siteUrl: 'mailto:sean@melis.ai?subject=Spell%20Stories',
    problem: {
      h: 'The problem',
      body: 'The 100M-user meditation market is dominated by clinical, gamified apps that produce relaxation but rarely sustained change — people don\'t connect emotionally with breath-counting. There\'s no app combining the pull of storytelling, the structure of hypnosis, and a mystical aesthetic for people who want transformation with soul.',
    },
    capabilities: {
      intro: 'Narrative + clinical structure + mystical aesthetic, in one cast.',
      groups: [
        { label: 'Spell experience', tone: 'accent', items: ['5–8 min AI-generated story per spell', 'Binaural beats + ElevenLabs voice + ambience', 'Embedded hypnotic suggestion + NLP anchors', '4-screen swipe-through format'] },
        { label: 'Library + personalisation', tone: 'amber', items: ['10 core spells at MVP (sleep, anxiety, confidence…)', 'Trigger-based script adaptation', 'AI-generated custom spells (premium)', '30-spell library planned'] },
        { label: 'Progression + ritual', tone: 'signal', items: ['Daily spell + push series', 'Streak + progress tracking', 'Altar App integration (v1.2)', 'Cast a spell → commit it to your altar'] },
      ],
    },
    pricing: {
      intro: 'Per-spell or subscription; AI generation cost ~$0.09/spell, target LTV:CAC 10:1.',
      tiers: [
        { name: 'Free', price: '$0', detail: '3 spells + Spell of the Day' },
        { name: 'Per-spell', price: '$4.99–$9.99', detail: 'One-time · core / niche / custom AI' },
        { name: 'Subscription', price: '$9.99/mo', detail: 'Unlimited, custom spells, HD audio', featured: true },
        { name: 'B2B wellness', price: '$10/user/mo', detail: 'Corporate' },
      ],
    },
    whyNow: {
      h: 'Why now',
      body: 'ElevenLabs TTS is production-quality, binaural research is validated, hypnosis is destigmatised, and WitchTok has mainstreamed a ~20M-strong audience of soulful wellness seekers who find Headspace aesthetically lifeless.',
    },
    proofPoints: [
      'No direct competitor combines photo-real narrative, clinical hypnosis structure, and a mystical aesthetic.',
      'Generation cost ~$0.09/spell with target LTV:CAC of 10:1.',
      'Cross-product flywheel with Altar App (shared audience, planned v1.2 integration) lowers CAC.',
      'Global meditation market 100M+ users; soulful/mystical segment estimated ~20M.',
    ],
    asks: [
      { audience: 'Use it', body: 'Tried and churned from Calm or Headspace? Test a 7-day trial of narrative-based mindfulness with actual soul.', cta: 'Join the waitlist →', href: 'mailto:sean@melis.ai?subject=Spell%20Stories%20—%20waitlist' },
      { audience: 'Invest', body: 'Consumer wellness at the intersection of AI content generation and behavioural psychology, with a documented unit-economics model. Angel.', cta: 'Talk to Sean →', href: 'mailto:sean@melis.ai?subject=Spell%20Stories%20—%20investment' },
      { audience: 'Build it', body: 'iOS/React Native dev + UX designer with consumer-app experience who wants a meaningful project to co-build?', cta: 'Build with me →', href: 'mailto:sean@melis.ai?subject=Spell%20Stories%20—%20building%20together' },
    ],
  },
  'altar': {
    eyebrow: 'The Lab · Research',
    pill: { label: 'Research', cls: 'is-research' },
    title: 'Altar <em>App</em>',
    lede: 'A digital altar builder for intentional living — a candlelit canvas on your phone where you place photos, animated candles, crystals, and mantras, and tend it daily. Not religious, not productivity. Intentional.',
    strip: [
      { lbl: 'Stage',   val: 'Research · ~15%' },
      { lbl: 'Type',    val: 'Consumer app' },
      { lbl: 'Status',  val: 'Spec phase' },
      { lbl: 'Pricing', val: 'Free → $4.99/mo' },
    ],
    sections: [
      { h: 'What it <em>is</em>', body: 'A personal practice space on your phone for people who live far from family and heritage: a drag-and-drop canvas where you place what matters — ancestors, intentions, rituals — on a dark, candlelit aesthetic, and get gentle daily reminders to tend it. Seasonal templates (Day of the Dead, Samhain, solstices) and, later, Spell Stories integration.' },
    ],
    cta: { title: 'Join the waitlist', line: 'In spec. Want to test the MVP or co-build a visually distinctive consumer app?', btn: 'Get in touch →' },
    siteUrl: 'mailto:sean@melis.ai?subject=Altar%20App',
    problem: {
      h: 'The problem',
      body: 'People living away from heritage and family have lost the physical rituals that hold meaning — their homes are full of IKEA furniture, not intention. Meditation apps are clinical, spirituality apps (Co-Star, The Pattern) are entertainment rather than practice, and journaling apps track entries rather than create ongoing ritual.',
    },
    capabilities: {
      intro: 'A sacred canvas + gentle ritual + an ecosystem to grow into.',
      groups: [
        { label: 'Altar builder', tone: 'accent', items: ['Drag-and-drop candlelit canvas', 'Photos, animated candles, crystals, mantras', 'Multiple altar types (gratitude, ancestors…)', 'Seasonal templates'] },
        { label: 'Ritual + reminders', tone: 'amber', items: ['"Your altar needs tending" push notes', 'Candle-time tracking', 'Daily intention-setting', 'Handwritten-style note pins'] },
        { label: 'Ecosystem', tone: 'signal', items: ['Spell Stories integration (v1.2)', 'Public/private altar sharing (v2.0)', 'Branded physical candles + crystals (v2.0)', 'Midnight-blue + warm-gold identity'] },
      ],
    },
    pricing: {
      intro: 'Freemium with a low monthly premium and seasonal packs.',
      tiers: [
        { name: 'Free', price: '$0', detail: 'Basic altar · 3 elements' },
        { name: 'Premium', price: '$4.99/mo', detail: 'Unlimited elements, seasonal packs, reminders', featured: true },
        { name: 'Seasonal packs', price: '$0.99', detail: 'One-time · Day of the Dead, solstices…' },
      ],
    },
    whyNow: {
      h: 'Why now',
      body: 'The space is genuinely open — no existing app combines photo upload (honouring loved ones), drag-and-drop altar building, seasonal ritual templates, and candle/intention tracking. The mystical wellness category is growing and competitors leave the full-altar space unoccupied.',
    },
    proofPoints: [
      'Competitor matrix: Altar App is the only product ticking all five — photo upload, candle animation, builder, seasonal templates, ongoing practice.',
      'Two-app ecosystem with Spell Stories — shared audience, cross-promotion, planned v1.2 integration lowers GTM cost for both.',
      'Clear arc: MVP (builder + reminders) → v1.1 (multiple altars, seasonal packs) → v1.2 (Spell Stories).',
      'Tech + identity fully specified: SwiftUI, Node, Postgres + S3, midnight-blue + warm-gold.',
    ],
    asks: [
      { audience: 'Use it', body: 'Light candles, keep photos of loved ones on a shelf, or maintain any personal ritual? Test a digital equivalent.', cta: 'Join the waitlist →', href: 'mailto:sean@melis.ai?subject=Altar%20App%20—%20waitlist' },
      { audience: 'Invest', body: 'The underserved intersection of ritual, intentional living, and mystical wellness — at a pre-build valuation, with a sibling app sharing the audience.', cta: 'Talk to Sean →', href: 'mailto:sean@melis.ai?subject=Altar%20App%20—%20investment' },
      { audience: 'Build it', body: 'SwiftUI dev who has shipped consumer iOS apps and wants a visually distinctive, meaningful product to co-build?', cta: 'Build with me →', href: 'mailto:sean@melis.ai?subject=Altar%20App%20—%20building%20together' },
    ],
  },
  'motif': {
    eyebrow: 'The Lab · Parked',
    pill: { label: 'Parked', cls: 'is-muted' },
    title: '<em>Motif</em>',
    lede: 'The Pantone for AI image generation — a numbered aesthetic vocabulary where any builder picks a style, describes what they want, and gets consistent, commercially-safe images with no model decisions required.',
    strip: [
      { lbl: 'Stage',   val: 'Parked · ~25%' },
      { lbl: 'Type',    val: 'Agent-first API' },
      { lbl: 'Status',  val: 'Build prompt ready' },
      { lbl: 'Pricing', val: 'From $0.05/image' },
    ],
    sections: [
      { h: 'What it <em>is</em>', body: 'An editorial platform, not an inference wrapper: 500+ named, numbered styles — historical movements, contemporary aesthetics, AI-invented hybrids — each specified cross-medium (image prompt, CSS tokens, font pairings, motion, UI guidelines). Pick Style #351 today and get the same output in six months, even as the backend model rotates silently underneath.' },
    ],
    cta: { title: 'Notify me when it ships', line: 'Parked, awaiting a build window — the V1 build prompt is ready to deploy in one session.', btn: 'Get in touch →' },
    siteUrl: 'mailto:sean@melis.ai?subject=Motif',
    problem: {
      h: 'The problem',
      body: '"Style drift" — inconsistent output from small prompt changes — is the number-one problem in AI image pipelines, and every competitor compounds it by exposing model selection and parameters to users who just want a result. Every competitor\'s library also contains Ghibli/Pixar/Marvel IP — legal exposure that hardens with regulation — and none are agent-payable or agent-discoverable.',
    },
    capabilities: {
      intro: '500+ persistent styles, a vocabulary system, and agent-native infrastructure.',
      groups: [
        { label: 'Style library + API', tone: 'accent', items: ['500+ named styles, numbered by era', 'Per-style endpoints engineered for consistency', 'Style IDs — output locked across sessions forever', 'Auto-routing: best model chosen internally'] },
        { label: 'Vocabulary system (V3)', tone: 'amber', items: ['"Feel like a Kyoto forest at dawn" → style blend', 'Six aesthetic axes (warmth, edge, texture…)', 'The Mixer — blend styles, get a canonical name'] },
        { label: 'Agent-native', tone: 'signal', items: ['x402 USDC on Base — no billing setup', 'MCP: motif.apply({style:13}), motif.mix([…])', 'Listed on MoltsPay, /.well-known/x402', 'IP-clean by design — zero licensed characters'] },
      ],
    },
    pricing: {
      intro: 'Per-image for humans and agents alike; volume discounts at scale.',
      tiers: [
        { name: 'Per-image', price: '$0.05', detail: 'Card or x402 USDC' },
        { name: 'Style Plan', price: '$29/mo', detail: 'Style IDs · cross-session consistency', featured: true },
        { name: 'Volume', price: '$0.02', detail: 'At 100k+ images/month' },
      ],
    },
    whyNow: {
      h: 'Why now',
      body: 'The agent-economy transition is the decisive window — 40% of enterprises projected to deploy autonomous agents by 2027 — and whoever becomes the default visual layer before that completes earns compounding switching costs. The image-API space is still in its "IBM phase" (selling compute specs); the "Apple moment" (selling the outcome) hasn\'t happened.',
    },
    proofPoints: [
      'Only image API with x402/USDC support + MoltsPay listing — zero competitors have this.',
      'AI-invented hybrid style names are coined IP — Synthetic Ukiyo (#351), Hygge Noir (#389) — non-replicable by copy-paste.',
      'Gross-margin target 40–60% per image (fal.ai inference ~$0.02–0.03 vs $0.05 price).',
      'Full V1 build prompt written — time-to-launch is days, not months.',
    ],
    asks: [
      { audience: 'Use it', body: 'Build things regularly and keep wrestling AI image tools for consistent branded output? Get notified when Motif ships.', cta: 'Notify me →', href: 'mailto:sean@melis.ai?subject=Motif%20—%20notify' },
      { audience: 'Invest', body: 'The agent-economy infrastructure layer — a play that captures value as autonomous agents become primary API consumers. Seed.', cta: 'Talk to Sean →', href: 'mailto:sean@melis.ai?subject=Motif%20—%20investment' },
      { audience: 'Build it', body: 'Designer or brand strategist with deep aesthetic vocabulary who wants to co-author the style catalogue and own a piece of the naming standard?', cta: 'Build with me →', href: 'mailto:sean@melis.ai?subject=Motif%20—%20building%20together' },
    ],
  },
};
