// Verbatim lift of COURSES_DETAIL from the v6 mockup (line 12008).
// Keyed by slug for [slug] template lookup.

export interface CourseProblem {
  eyebrow: string;
  h2: string;
  lede: string;
  items: string[];
}

export interface CourseOutcomeCard {
  icon: string;
  title: string;
  body: string;
}

export interface CourseOutcomes {
  eyebrow: string;
  h2: string;
  cards: CourseOutcomeCard[];
}

export interface CourseFit {
  eyebrow: string;
  h2: string;
  forYou: string[];
  notForYou: string[];
}

export interface CourseClosing {
  eyebrow: string;
  h3: string;
  line: string;
  btn: string;
}

export interface CourseTrailer {
  eyebrow: string;
  caption: string;
}

export interface CourseDetail {
  comingSoon?: boolean;
  flagship?: boolean;
  soonLine?: string;
  subtitle1?: string;
  subtitle2?: string;
  trailer?: CourseTrailer;
  problem?: CourseProblem;
  outcomes?: CourseOutcomes;
  fit?: CourseFit;
  closing?: CourseClosing;
}

export const COURSES_DETAIL: Record<string, CourseDetail> = {
  'ai-mastery-2026': {
    subtitle1: 'Future-Proof Your Career,',
    subtitle2: 'Income & Decisions',
    trailer: {
      eyebrow: 'COURSE TRAILER',
      caption: 'AI for Salary Negotiations — Module 2, Lesson 3',
    },
    problem: {
      eyebrow: 'THE PROBLEM',
      h2: 'Everyone’s using AI. Almost nobody is using it right.',
      lede: 'Most professionals are running 147 prompts a week and still feel behind. The issue isn’t effort — it’s the model. Treating AI like a search engine when it’s actually a thinking partner.',
      items: [
        'You use ChatGPT daily but can’t point to a real outcome it created',
        'You worry AI will replace your role — but don’t know what to do',
        '40% of your week is work AI could do — but you can’t hand it over',
        'Your teammates are getting AI wins you can’t explain or replicate',
        'You’ve tried "prompt tips" courses and still don’t feel capable',
        'You feel behind not because you’re lazy — because nobody taught leverage',
      ],
    },
    outcomes: {
      eyebrow: 'WHAT YOU’LL WALK AWAY WITH',
      h2: 'Concrete outcomes. Not just knowledge.',
      cards: [
        { icon: 'ph-currency-dollar', title: 'Salary leverage',     body: 'Benchmark your value, script the conversation, and pre-empt every objection — with AI doing the heavy lifting.' },
        { icon: 'ph-shield-check',    title: 'Career protection',   body: 'Become the AI-fluent expert on your team before anyone else does. Own the role that can’t be automated.' },
        { icon: 'ph-lightning',       title: 'Sharper decisions',   body: 'Run an advisor panel, stress-test your plans, and scenario-plan any decision — career, business, or life.' },
        { icon: 'ph-clock',           title: 'Time reclaimed',      body: 'Build systems — not just habits. Shift from task-mode to leverage-mode and reclaim 10–14 hrs per week.' },
        { icon: 'ph-briefcase',       title: 'Income without code', body: 'Productise your expertise, charge $100–300/hr for AI services, and land your first client in a weekend.' },
        { icon: 'ph-compass',         title: 'Stay ahead',          body: 'A personal AI stack and signal-filtering system so you compound knowledge without drowning in noise.' },
      ],
    },
    fit: {
      eyebrow: 'THE RIGHT FIT',
      h2: 'Built for professionals, not developers.',
      forYou: [
        'You’re a knowledge worker — consultant, manager, designer, analyst, marketer, founder',
        'You use AI daily but feel you’re scratching the surface',
        'You want to compound career capital, not just learn another tool',
        'You don’t want to code — and don’t need to',
        'You’d rather pay $29 for clarity than waste 40 hours on YouTube',
      ],
      notForYou: [
        'You want a programming course (this is leverage, not Python)',
        'You want "10 ChatGPT prompts to make you a millionaire" (this is real)',
        'You’re already running multi-agent systems in production (you don’t need this)',
      ],
    },
    closing: {
      eyebrow: 'READY TO START',
      h3: 'Lifetime access. 30-day money-back guarantee.',
      line: '20,000+ professionals enrolled. 4.4 stars from 2,400+ reviews.',
      btn: 'Enrol — be the first',
    },
  },
  'claude-cowork-for-professionals': {
    comingSoon: true,
    flagship: true,
    soonLine: 'The operator-grade companion to AI Mastery 2026 — Cowork mode end-to-end, Skills authoring, MCPs from scratch, multi-agent orchestration. Now recording.',
  },
  'ai-for-management-consultants':    { comingSoon: true, soonLine: 'Decks, data analysis & client work.' },
  'ai-for-creatives':                 { comingSoon: true, soonLine: 'Figma AI, Adobe Firefly, image generation & video editing.' },
  'ai-audio-voice-music-and-sound':   { comingSoon: true, soonLine: 'ElevenLabs, Suno & AI sound design.' },
  'build-your-first-ai-agent':        { comingSoon: true, soonLine: 'Automate your business without code.' },
  'vibe-coding':                      { comingSoon: true, soonLine: 'Build a real app without code.' },
  'ai-for-solopreneurs':              { comingSoon: true, soonLine: 'Build your one-person company on OpenClaw — multi-agent ops, async work, real systems.' },
};
