// Verbatim lift of SERVICES_DETAIL from the v6 mockup (line 11889).
// Keyed by slug so the [slug] template can resolve via params.slug.

export interface ServiceStrip {
  lbl: string;
  val: string;
}

export interface ServiceStep {
  num: string;
  title: string;
  line: string;
}

export interface ServiceCta {
  title: string;
  line: string;
  btn: string;
}

export interface ServiceDetail {
  eyebrow: string;
  title: string;
  lede: string;
  strip: ServiceStrip[];
  whatYouGet: ServiceStep[];
  cta: ServiceCta;
}

export const SERVICES_DETAIL: Record<string, ServiceDetail> = {
  'strategy-print-sprint': {
    eyebrow: 'Work With Me · Strategy',
    title: 'Strategy <em>Print Sprint</em>',
    lede: 'Two weeks. We map your AI surface area — what to build, what to buy, what to skip. You leave with an opinionated 60-page strategy print and a 90-day roadmap.',
    strip: [
      { lbl: 'Length',  val: '2 weeks' },
      { lbl: 'Price',   val: 'From $12,500' },
      { lbl: 'Format',  val: 'Async + 3 live' },
      { lbl: 'Outcome', val: 'Printed brief' },
    ],
    whatYouGet: [
      { num: '01', title: 'A structured AI-audit interview', line: 'Two structured 90-minute calls. We map your full surface area — goals, blockers, existing tools, blind spots.' },
      { num: '02', title: 'AI-assisted synthesis', line: 'I run the transcripts through a custom multi-agent analysis stack — generates targeted follow-up questions and surface tension points.' },
      { num: '03', title: 'A 60-page strategy print', line: 'Tailored to your business. Maps your situation, opportunities, and a prioritised 90-day action plan. Beautifully designed; meant to be read once, then re-read.' },
      { num: '04', title: '90-day roadmap walkthrough', line: 'A final 90-minute session walking you through the plan. You leave with a clear sequence of bets and the data behind each one.' },
    ],
    cta: {
      title: 'Want to talk first?',
      line: 'Twenty minutes, no slides. Walk through what you are working on, and I will tell you honestly whether I am the right fit.',
      btn: 'Email me →',
    },
  },
  'business-ai-blueprint': {
    eyebrow: 'Work With Me · Blueprint',
    title: 'Business AI <em>Blueprint</em>',
    lede: 'SMBs and startup founders — AI-assisted discovery maps your leverage points, then we build.',
    strip: [
      { lbl: 'Length',  val: '3–4 weeks' },
      { lbl: 'Price',   val: '$3k – $8k' },
      { lbl: 'Format',  val: 'Hybrid' },
      { lbl: 'Outcome', val: 'Blueprint + build' },
    ],
    whatYouGet: [
      { num: '01', title: 'Extract',     line: 'Structured calls extract your full context — goals, blockers, existing tools, blind spots.' },
      { num: '02', title: 'Synthesise',  line: 'AI analyses the transcript, identifies gaps, generates targeted follow-up questions.' },
      { num: '03', title: 'Strategy',    line: 'A tailored strategy pack maps your situation, opportunities, and a prioritised action plan.' },
      { num: '04', title: 'Build',       line: 'Highest-impact items get built — tools, automations or frameworks — priced per project.' },
    ],
    cta: {
      title: 'Apply for a slot',
      line: 'Two new clients per quarter. Apply with 5 lines about what you are stuck on and I will reply within 48h.',
      btn: 'Apply now →',
    },
  },
  'ai-builds-on-tap': {
    eyebrow: 'Work With Me · Subscription',
    title: 'AI Builds <em>on Tap</em>',
    lede: 'Your AI build team on a monthly subscription. Websites, tools, agents and automations — shipped fast, no agency overhead.',
    strip: [
      { lbl: 'Cadence', val: 'Monthly' },
      { lbl: 'Price',   val: '$10k / month' },
      { lbl: 'Slots',   val: '2 left' },
      { lbl: 'Format',  val: 'Async-first' },
    ],
    whatYouGet: [
      { num: '01', title: 'Submit unlimited build requests', line: 'Any AI build — agent, automation, internal tool, microsite. You queue them; I prioritise weekly.' },
      { num: '02', title: 'Shipped, not pitched',            line: 'Each week ships at least one production-grade build. No decks. No agency theatre.' },
      { num: '03', title: 'Same operator end-to-end',         line: 'You work directly with me, not a project manager. Same person scopes, builds, and ships.' },
      { num: '04', title: 'Pause or cancel any month',        line: 'Subscription; not a contract. Pause when you are between builds, restart when you have new work.' },
    ],
    cta: {
      title: 'Apply for a slot',
      line: '2 slots left for 2026. Apply with what you are trying to ship in the next 6 months.',
      btn: 'Apply now →',
    },
  },
};
