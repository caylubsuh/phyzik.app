/**
 * Competitor comparison data for /vs/[slug] pages.
 *
 * Editorial principle: lead with where THEY win, not just where we win.
 * Honest tradeoff sections out-rank and out-convert the puff piece.
 * (PostHog "vs" playbook.)
 */

export type ComparisonRow = {
  feature: string
  phyzik: string | boolean
  competitor: string | boolean
  /** Optional context shown on hover/expand. */
  note?: string
}

export type Competitor = {
  /** URL slug for /vs/[slug]. */
  slug: string
  /** Display name (e.g. "Hevy"). */
  name: string
  /** Their tagline / positioning, in their own words where possible. */
  tagline: string
  /** Their public website URL. */
  url: string
  /** Headline pricing — e.g. "Free / $4.99 mo · $39.99 yr". */
  pricing: string
  /** 2-3 sentence honest summary of their product. */
  summary: string
  /** Where the competitor genuinely beats PHYZIK. Be specific. */
  whereTheyWin: { title: string; body: string }[]
  /** Where PHYZIK beats the competitor. Be specific. */
  wherePhyzikWins: { title: string; body: string }[]
  /** Feature matrix. */
  matrix: ComparisonRow[]
  /** Bottom-line recommendation in one sentence. */
  bottomLine: string
}

export const COMPETITORS: readonly Competitor[] = [
  {
    slug: 'hevy',
    name: 'Hevy',
    tagline: 'Track your workouts. Beat your records.',
    url: 'https://www.hevyapp.com',
    pricing: 'Free / $4.99 mo · $39.99 yr',
    summary:
      'Hevy is the clean, fast workout tracker beloved by lifters who want minimal UI and no fluff. It logs sets and reps well, has an exercise library, and supports template-based routines.',
    whereTheyWin: [
      {
        title: 'Cleanest set-logging UI in the category',
        body: 'Hevy nailed the act of logging a set. Number pad, plate calculator, rest timer — all dialed. If your only job is "log my workout, fast," Hevy wins.',
      },
      {
        title: 'Larger active social network',
        body: 'Hevy has been shipping years longer. More users means more existing routines to follow and more people in their social feed today.',
      },
      {
        title: 'Apple Watch app is more mature',
        body: 'Hevy ships a polished standalone Apple Watch app for off-phone logging. Worth the upgrade if your phone stays in the locker.',
      },
    ],
    wherePhyzikWins: [
      {
        title: 'Adaptive programming, not just logging',
        body: 'Hevy is a notebook. PHYZIK writes the program for you: cycle-based periodization, auto deloads, exercise swaps tied to your actual performance. Your week rebalances when you miss a session.',
      },
      {
        title: 'AI form-check on every set',
        body: 'PHYZIK runs real-time form feedback. Hevy logs the set; PHYZIK tells you what went wrong with it.',
      },
      {
        title: 'Nutrition lives in the same app',
        body: "Hevy doesn't track nutrition. PHYZIK's macro tracking is tied to your training load — protein/carbs/fat shift with your block.",
      },
      {
        title: 'Lower web subscription price',
        body: 'PHYZIK Pro on the web is $34.99/yr. Hevy Pro on iOS is $39.99/yr (after the App Store cut). You pay less; we keep more.',
      },
    ],
    matrix: [
      { feature: 'Workout logging',           phyzik: true,  competitor: true },
      { feature: 'Exercise library',          phyzik: '730+', competitor: '400+' },
      { feature: 'Rest timer',                phyzik: true,  competitor: true },
      { feature: 'Plate calculator',          phyzik: true,  competitor: true },
      { feature: 'Custom routines',           phyzik: true,  competitor: true },
      { feature: 'Adaptive programming',      phyzik: true,  competitor: false },
      { feature: 'Auto deload detection',     phyzik: true,  competitor: false },
      { feature: 'AI form-check',             phyzik: true,  competitor: false },
      { feature: 'Nutrition tracking',        phyzik: true,  competitor: false },
      { feature: 'Volume landmarks (MEV/MAV/MRV)', phyzik: true, competitor: false },
      { feature: 'Recovery scoring',          phyzik: true,  competitor: false },
      { feature: 'Squads / shared schedules', phyzik: true,  competitor: false },
      { feature: 'Apple Watch app',           phyzik: 'coming', competitor: true },
      { feature: 'Annual price (web)',        phyzik: '$34.99', competitor: '$39.99' },
    ],
    bottomLine:
      'If you just want to log sets, Hevy is excellent. If you want an app that actually programs your training and adapts to your performance, PHYZIK.',
  },
  {
    slug: 'strong',
    name: 'Strong',
    tagline: 'Workout Tracker & Gym Log',
    url: 'https://www.strong.app',
    pricing: 'Free / $4.99 mo · $29.99 yr',
    summary:
      'Strong is one of the original strength-training trackers — iconic minimal UI, deep customization on templates, and a loyal long-time user base.',
    whereTheyWin: [
      {
        title: 'Long track record + stable feature set',
        body: "Strong has been around since 2015. If you've used it for years, switching costs are real. The product is stable and predictable.",
      },
      {
        title: 'Template customization depth',
        body: "Strong's template editor is exceptionally flexible — granular control over warm-up sets, supersets, drop sets, and rest-pause configurations.",
      },
      {
        title: 'Cheapest annual price in the category',
        body: 'Strong Pro is $29.99/yr — that\'s genuinely cheap. If price is the only variable, Strong is hard to beat.',
      },
    ],
    wherePhyzikWins: [
      {
        title: 'You don\'t have to design your own program',
        body: 'Strong gives you a template editor. PHYZIK writes the program — periodization, deloads, exercise rotation — tuned to your actual performance week over week.',
      },
      {
        title: 'AI form-check, nutrition coach, recovery scoring',
        body: 'Strong is a tracker. PHYZIK is a coach. Form feedback, macro guidance, fatigue mapping — all in one app.',
      },
      {
        title: 'Built-in social feed where every post is a real workout',
        body: 'Strong has no social layer. PHYZIK\'s Floor is built on completed sessions — squads, shared schedules, leaderboards.',
      },
      {
        title: 'Modern, actively-developed UI',
        body: 'Strong\'s UI has aged. PHYZIK ships frequently with a contemporary feel.',
      },
    ],
    matrix: [
      { feature: 'Workout logging',           phyzik: true,  competitor: true },
      { feature: 'Exercise library',          phyzik: '730+', competitor: '300+' },
      { feature: 'Rest timer',                phyzik: true,  competitor: true },
      { feature: 'Plate calculator',          phyzik: true,  competitor: true },
      { feature: 'Custom routines',           phyzik: true,  competitor: true },
      { feature: 'Adaptive programming',      phyzik: true,  competitor: false },
      { feature: 'Auto deload detection',     phyzik: true,  competitor: false },
      { feature: 'AI form-check',             phyzik: true,  competitor: false },
      { feature: 'Nutrition tracking',        phyzik: true,  competitor: false },
      { feature: 'Recovery scoring',          phyzik: true,  competitor: false },
      { feature: 'Social feed',               phyzik: true,  competitor: false },
      { feature: 'Squads / shared schedules', phyzik: true,  competitor: false },
      { feature: 'Annual price (web)',        phyzik: '$34.99', competitor: '$29.99' },
    ],
    bottomLine:
      'Strong is the cheapest and most familiar choice. PHYZIK is the choice if you want the app to do the programming work for you.',
  },
  {
    slug: 'fitbod',
    name: 'Fitbod',
    tagline: 'Your personalized workout plan, in your pocket.',
    url: 'https://www.fitbod.me',
    pricing: 'Free trial / $12.99 mo · $79.99 yr',
    summary:
      'Fitbod was an early mover in algorithmic workout generation. Its AI suggests your next workout based on recovery and equipment available, and that core mechanic still works.',
    whereTheyWin: [
      {
        title: 'Equipment-aware workout generation',
        body: 'Fitbod\'s "what equipment do you have today" filter is excellent for travel and home gyms. PHYZIK assumes you have your usual setup.',
      },
      {
        title: 'Beginner-friendly onboarding',
        body: 'Fitbod walks first-time lifters through every concept. PHYZIK assumes you know what a deload is.',
      },
    ],
    wherePhyzikWins: [
      {
        title: 'Less than half the annual price',
        body: 'PHYZIK Pro: $34.99/yr. Fitbod Elite: $79.99/yr. Same category, dramatically different cost.',
      },
      {
        title: 'Real periodization, not just next-workout',
        body: 'Fitbod plans one session at a time. PHYZIK plans 12-week blocks with mesocycle structure — volume cycling, deload weeks, peaking.',
      },
      {
        title: 'Social layer + squads',
        body: 'Fitbod is solo. PHYZIK has The Floor — squads, leaderboards, shared schedules.',
      },
      {
        title: 'AI form-check + nutrition coach',
        body: 'Neither is in Fitbod. Both are in PHYZIK Pro.',
      },
      {
        title: 'Modern UI',
        body: "Fitbod's UI is functional but dated. PHYZIK is built on the current design language.",
      },
    ],
    matrix: [
      { feature: 'Workout generation',        phyzik: true,  competitor: true },
      { feature: 'Equipment-aware filtering', phyzik: true,  competitor: true },
      { feature: 'Adaptive progression',      phyzik: true,  competitor: true },
      { feature: 'Mesocycle / block periodization', phyzik: true, competitor: false },
      { feature: 'AI form-check',             phyzik: true,  competitor: false },
      { feature: 'Nutrition tracking',        phyzik: true,  competitor: false },
      { feature: 'Recovery scoring',          phyzik: true,  competitor: false },
      { feature: 'Social feed',               phyzik: true,  competitor: false },
      { feature: 'Squads',                    phyzik: true,  competitor: false },
      { feature: 'Annual price (web)',        phyzik: '$34.99', competitor: '$79.99' },
    ],
    bottomLine:
      'Fitbod is great for travelers and beginners. PHYZIK does more, costs less than half, and is built for lifters who know what they\'re training for.',
  },
  {
    slug: 'jefit',
    name: 'Jefit',
    tagline: 'Workout planner and gym tracker.',
    url: 'https://www.jefit.com',
    pricing: 'Free / $12.99 mo · $69.99 yr',
    summary:
      'Jefit pioneered the strength-tracker category and has one of the largest exercise libraries and community libraries of routines on the market.',
    whereTheyWin: [
      {
        title: 'Massive exercise library + community routines',
        body: 'Jefit has the deepest exercise catalog and the largest library of user-shared programs in the space. If you want every variation of every lift, Jefit wins.',
      },
      {
        title: 'Web app + cross-platform sync',
        body: 'Jefit has a long-standing desktop and web companion. PHYZIK is iOS-first today.',
      },
    ],
    wherePhyzikWins: [
      {
        title: 'Half the price, intelligently programmed',
        body: 'Jefit Elite: $69.99/yr. PHYZIK Pro: $34.99/yr. Jefit gives you templates; PHYZIK writes and adapts the program for you.',
      },
      {
        title: 'AI form-check + recovery + nutrition',
        body: 'Jefit is a tracker with a community. PHYZIK is a coach. AI feedback, recovery scoring, and nutrition all integrated.',
      },
      {
        title: 'Modern UI',
        body: 'Jefit\'s UI is information-dense and dated. PHYZIK is contemporary.',
      },
      {
        title: 'Squads-based social, not pure feed',
        body: 'Jefit\'s social is broad and noisy. PHYZIK\'s squads are tight: 3-10 lifters with shared schedules and leaderboards.',
      },
    ],
    matrix: [
      { feature: 'Exercise library',          phyzik: '730+', competitor: '1,400+' },
      { feature: 'Workout logging',           phyzik: true,  competitor: true },
      { feature: 'Community routines',        phyzik: true,  competitor: true },
      { feature: 'Adaptive programming',      phyzik: true,  competitor: false },
      { feature: 'AI form-check',             phyzik: true,  competitor: false },
      { feature: 'Nutrition tracking',        phyzik: true,  competitor: false },
      { feature: 'Recovery scoring',          phyzik: true,  competitor: false },
      { feature: 'Squads',                    phyzik: true,  competitor: false },
      { feature: 'Web companion',             phyzik: 'coming', competitor: true },
      { feature: 'Annual price (web)',        phyzik: '$34.99', competitor: '$69.99' },
    ],
    bottomLine:
      "Jefit wins on library breadth and cross-platform. PHYZIK wins on intelligent programming and price.",
  },
] as const

export function getCompetitor(slug: string): Competitor | undefined {
  return COMPETITORS.find((c) => c.slug === slug)
}
