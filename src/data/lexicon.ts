// The Lexicon · 33 terms drawn from Greek, Latin, Japanese, Sanskrit,
// Chinese, Arabic, Portuguese, Hebrew. Each paired with a hand-coded
// W500 geometric glyph. Canonical source: brand-guidelines.html lines
// 4690–4752. Glyph markup is the INNER content of a 24×24 viewBox SVG —
// the Lexicon component wraps it with the outer <svg>.

export interface LexiconTerm {
  num: string;
  language: 'Greek' | 'Latin' | 'Japanese' | 'Sanskrit' | 'Chinese' | 'Arabic' | 'Portuguese' | 'Hebrew';
  term: string;          // native script (or romanised for Latin/Portuguese)
  translit?: string;     // romanised reading where the term is non-Latin
  gloss: string;
  sigil: string;         // inner SVG markup (paths/circles only)
}

export const LEXICON: LexiconTerm[] = [
  // ─── Greek · the spine · 18 ───────────────────────────────
  { num: '01', language: 'Greek', term: 'λόγος', translit: 'lógos',
    gloss: 'The rational principle beneath events. The pattern, not the noise.',
    sigil: '<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/>' },

  { num: '02', language: 'Greek', term: 'μῦθος', translit: 'mŷthos',
    gloss: 'Story as meaning. The bow of narrative, holding what cannot be said directly.',
    sigil: '<path d="M 5 15 A 7 7 0 0 1 19 15"/><circle cx="12" cy="9" r="1.25" fill="currentColor" stroke="none"/>' },

  { num: '03', language: 'Greek', term: 'σοφία', translit: 'sophía',
    gloss: 'Wisdom that sees the whole. The lens where two perspectives meet.',
    sigil: '<path d="M 12 7 A 5.5 5.5 0 0 1 12 17"/><path d="M 12 7 A 5.5 5.5 0 0 0 12 17"/><circle cx="12" cy="12" r="1.25" fill="currentColor" stroke="none"/>' },

  { num: '04', language: 'Greek', term: 'φρόνησις', translit: 'phrónēsis',
    gloss: 'Practical wisdom. Judgement in the moment. The descent into the situation.',
    sigil: '<path d="M 5 7 L 19 7 L 12 19 Z"/><circle cx="12" cy="11" r="1.25" fill="currentColor" stroke="none"/>' },

  { num: '05', language: 'Greek', term: 'νοῦς', translit: 'noûs',
    gloss: 'Intuitive intellect. The flash that arrives before reasoning. Insight rising.',
    sigil: '<path d="M 5 17 L 19 17 L 12 5 Z"/><circle cx="12" cy="13" r="1.25" fill="currentColor" stroke="none"/>' },

  { num: '06', language: 'Greek', term: 'ἀρετή', translit: 'aretḗ',
    gloss: 'Excellence. Form fitted exactly to its bound. Nothing missing, nothing excess.',
    sigil: '<circle cx="12" cy="12" r="8"/><path d="M 12 4 L 20 12 L 12 20 L 4 12 Z"/>' },

  { num: '07', language: 'Greek', term: 'εὐδαιμονία', translit: 'eudaimonía',
    gloss: 'Flourishing. Life-force radiating from a settled centre, in every direction.',
    sigil: '<circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/><path d="M 12 7 V 4"/><path d="M 12 17 V 20"/><path d="M 16.33 9.5 L 18.93 8"/><path d="M 7.67 14.5 L 5.07 16"/><path d="M 16.33 14.5 L 18.93 16"/><path d="M 7.67 9.5 L 5.07 8"/>' },

  { num: '08', language: 'Greek', term: 'σωφροσύνη', translit: 'sōphrosýnē',
    gloss: 'Self-mastery. The cut self-applied. The form held within its bound.',
    sigil: '<circle cx="12" cy="12" r="7"/><path d="M 3 12 H 21"/>' },

  { num: '09', language: 'Greek', term: 'ἀταραξία', translit: 'ataraxía',
    gloss: 'Untroubled calm. Two horizons, the still self between them.',
    sigil: '<path d="M 5 9 H 19"/><path d="M 5 15 H 19"/><circle cx="12" cy="12" r="1.25" fill="currentColor" stroke="none"/>' },

  { num: '10', language: 'Greek', term: 'καιρός', translit: 'kairós',
    gloss: 'The right moment. The crystalline instant cut by the line of time.',
    sigil: '<path d="M 12 7 L 17 12 L 12 17 L 7 12 Z"/><path d="M 3 12 H 21"/>' },

  { num: '11', language: 'Greek', term: 'τέλος', translit: 'télos',
    gloss: 'Purpose. The path becoming the form. The acorn becoming the oak.',
    sigil: '<path d="M 12 4 L 20 18 L 4 18 Z"/><path d="M 12 11 L 16 18 L 8 18 Z"/>' },

  { num: '12', language: 'Greek', term: 'τέχνη', translit: 'téchnē',
    gloss: 'Skilled craft. The square — the most fundamental made form.',
    sigil: '<path d="M 5 5 H 19 V 19 H 5 Z"/><circle cx="12" cy="12" r="1.25" fill="currentColor" stroke="none"/>' },

  { num: '13', language: 'Greek', term: 'ἔρως', translit: 'érōs',
    gloss: 'Generative force. The flame in three tongues, rising — desire made creative.',
    sigil: '<circle cx="12" cy="18" r="1.75" fill="currentColor" stroke="none"/><path d="M 12 16 Q 7 12 12 5"/><path d="M 12 16 Q 17 12 12 5"/>' },

  { num: '14', language: 'Greek', term: 'θῦμος', translit: 'thŷmos',
    gloss: 'Spirited courage. The lance held high. The will that refuses to be overrun.',
    sigil: '<path d="M 12 5 V 20"/><path d="M 7 10 L 12 5 L 17 10"/>' },

  { num: '15', language: 'Greek', term: 'ψυχή', translit: 'psychḗ',
    gloss: 'Soul, breath, animating principle. Two breath-curves cradling the still self.',
    sigil: '<path d="M 7 8 A 4 4 0 0 1 7 16"/><path d="M 17 8 A 4 4 0 0 0 17 16"/><circle cx="12" cy="12" r="1.25" fill="currentColor" stroke="none"/>' },

  { num: '16', language: 'Greek', term: 'παρρησία', translit: 'parrhēsía',
    gloss: 'Fearless truth-telling. The arrow of speech, launched outward at risk.',
    sigil: '<path d="M 4 12 H 18"/><path d="M 13 7 L 18 12 L 13 17"/>' },

  { num: '17', language: 'Greek', term: 'κλέος', translit: 'kléos',
    gloss: 'What survives, what is remembered. The monument that outlasts the maker.',
    sigil: '<path d="M 12 6 V 18"/><path d="M 7 6 H 17"/><path d="M 7 18 H 17"/>' },

  { num: '18', language: 'Greek', term: 'ἡσυχία', translit: 'hēsychía',
    gloss: 'Inner stillness. The settled point at rest on the horizon. No agitation.',
    sigil: '<circle cx="12" cy="10" r="1.5" fill="currentColor" stroke="none"/><path d="M 4 14 H 20"/>' },

  // ─── Latin · the Stoic-Renaissance line · 5 ────────────────
  { num: '19', language: 'Latin', term: 'memento mori',
    gloss: 'Remember you must die. The form with the mortality-mark at its foot.',
    sigil: '<circle cx="12" cy="12" r="7"/><circle cx="12" cy="17" r="1.25" fill="currentColor" stroke="none"/>' },

  { num: '20', language: 'Latin', term: 'amor fati',
    gloss: 'Love of fate. The self and what comes — overlapping, embraced.',
    sigil: '<circle cx="9" cy="12" r="4"/><circle cx="15" cy="12" r="4"/>' },

  { num: '21', language: 'Latin', term: 'festina lente',
    gloss: 'Make haste slowly. The Aldine motto. Motion held by the stake driven down.',
    sigil: '<path d="M 12 4 V 14"/><path d="M 9 14 L 15 14 L 12 19 Z"/>' },

  { num: '22', language: 'Latin', term: 'solvitur ambulando',
    gloss: 'It is solved by walking. Three steps — the body\'s reasoning.',
    sigil: '<circle cx="6" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="18" cy="12" r="1.5" fill="currentColor" stroke="none"/>' },

  { num: '23', language: 'Latin', term: 'sub specie aeternitatis',
    gloss: 'Under the aspect of eternity. The self within the form, under the long horizon.',
    sigil: '<path d="M 2 12 H 22"/><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="1.25" fill="currentColor" stroke="none"/>' },

  // ─── Japanese · the contemplative line · 4 ─────────────────
  { num: '24', language: 'Japanese', term: '物の哀れ', translit: 'mono no aware',
    gloss: 'The gentle sadness at impermanence. The leaf detaches; the curve traces its descent.',
    sigil: '<circle cx="9" cy="7" r="1.5" fill="currentColor" stroke="none"/><path d="M 9 9 Q 12 14 18 17"/>' },

  { num: '25', language: 'Japanese', term: '侘寂', translit: 'wabi-sabi',
    gloss: 'Beauty in imperfection. The form deliberately incomplete.',
    sigil: '<path d="M 17 7 A 7 7 0 1 0 17 17"/>' },

  { num: '26', language: 'Japanese', term: '間', translit: 'ma',
    gloss: 'Meaningful negative space. The gates with the form held between them.',
    sigil: '<path d="M 7 5 V 19"/><path d="M 17 5 V 19"/><circle cx="12" cy="12" r="2.5"/>' },

  { num: '27', language: 'Japanese', term: '生き甲斐', translit: 'ikigai',
    gloss: 'Reason for being. The centred self extending into all four directions.',
    sigil: '<circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/><path d="M 12 7 V 4"/><path d="M 12 17 V 20"/><path d="M 7 12 H 4"/><path d="M 17 12 H 20"/>' },

  // ─── Sanskrit · the dharmic line · 2 ───────────────────────
  { num: '28', language: 'Sanskrit', term: 'धर्म', translit: 'dharma',
    gloss: 'Duty, the way, the right path. The wheel of becoming, the chosen direction within it.',
    sigil: '<circle cx="12" cy="12" r="7"/><path d="M 12 8 V 5"/><path d="M 12 16 V 19"/><path d="M 8 12 H 5"/><path d="M 16 12 H 19"/><circle cx="12" cy="12" r="1.25" fill="currentColor" stroke="none"/>' },

  { num: '29', language: 'Sanskrit', term: 'अहिंसा', translit: 'ahimsa',
    gloss: 'Non-harm as active practice. The dome of protection, the staying hand.',
    sigil: '<path d="M 4 18 A 8 8 0 0 1 20 18"/><path d="M 7 18 A 5 5 0 0 1 17 18"/>' },

  // ─── Other singles · 4 ─────────────────────────────────────
  { num: '30', language: 'Chinese', term: '無為', translit: 'wu wei',
    gloss: 'Effortless action. The water finds its shape without forcing.',
    sigil: '<path d="M 6 5 C 18 8 6 16 18 19"/>' },

  { num: '31', language: 'Arabic', term: 'صبر', translit: 'sabr',
    gloss: 'Patient endurance with grace. The pillar with the still self at its centre.',
    sigil: '<path d="M 12 4 V 20"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/>' },

  { num: '32', language: 'Portuguese', term: 'saudade',
    gloss: 'Bittersweet longing. The form with the absent thing held just beyond reach.',
    sigil: '<circle cx="10" cy="14" r="5"/><circle cx="18" cy="8" r="1.5" fill="currentColor" stroke="none"/>' },

  { num: '33', language: 'Hebrew', term: 'תיקון עולם', translit: 'tikkun olam',
    gloss: 'Repair of the world. Two halves bridged by the active stitch.',
    sigil: '<path d="M 4 14 H 10"/><path d="M 14 14 H 20"/><path d="M 10 14 A 2 2 0 0 1 14 14"/>' },
];

// Grouping shown in source: Greek 18 · Latin 5 · Japanese 4 · Sanskrit 2 · Other 4 = 33
export const LEXICON_GROUPS: { label: string; languages: LexiconTerm['language'][] }[] = [
  { label: 'Greek · the spine · 18',                            languages: ['Greek'] },
  { label: 'Latin · the Stoic-Renaissance line · 5',            languages: ['Latin'] },
  { label: 'Japanese · the contemplative line · 4',             languages: ['Japanese'] },
  { label: 'Sanskrit · the dharmic line · 2',                   languages: ['Sanskrit'] },
  { label: 'Other singles · the strongest from each tradition · 4', languages: ['Chinese', 'Arabic', 'Portuguese', 'Hebrew'] },
];
