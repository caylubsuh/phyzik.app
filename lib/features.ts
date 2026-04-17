export type FeatureData = {
  id: string
  pill: string
  body: string
  image: string
  imageAlt: string
  imagePosition: 'left' | 'right'
  bullets?: string[]
  accent?: boolean
}

export const FEATURES: FeatureData[] = [
  {
    id: 'squads',
    pill: 'SQUADS',
    body: 'Train with your crew. Compete with the room. Shared schedules make missed sessions visible. Weekly leaderboards for volume and frequency. Private group chat for PRs and check-ins.',
    image: '/screenshots/marketing/02-squad.png',
    imageAlt: 'PHYZIK squads with leaderboard and shared schedule',
    imagePosition: 'right',
    accent: true,
  },
  {
    id: 'scheduling',
    pill: 'SCHEDULING',
    body: "Your week, structured. Cycle-based periodization rotates your program intelligently — see what's ahead, mark rest days, swap workouts without breaking progress.",
    image: '/screenshots/marketing/07-scheduler.png',
    imageAlt: 'PHYZIK weekly training scheduler',
    imagePosition: 'left',
    accent: true,
  },
  {
    id: 'active-workout',
    pill: 'ACTIVE WORKOUT',
    body: 'Log every set. Hit every number. All sets visible in a clean table. Rest timer at the top. Swipe between exercises. Auto-populated targets that adapt to last session.',
    image: '/screenshots/marketing/03-active-tracker.png',
    imageAlt: 'PHYZIK active workout logging with sets and rest timer',
    imagePosition: 'right',
  },
  {
    id: 'analytics',
    pill: 'ANALYTICS',
    body: 'Training, measured in every dimension. Intensity distribution across rep ranges. Muscle group volume tracked against evidence-based landmarks. The data your coach would kill for — yours for free.',
    image: '/screenshots/marketing/04-analytics.png',
    imageAlt: 'PHYZIK deep analytics dashboard',
    imagePosition: 'left',
    accent: true,
  },
  {
    id: 'recovery',
    pill: 'RECOVERY',
    body: "Fatigue mapped. Recovery timed. Anatomical muscle recovery updated after every session. Systemic fatigue scoring. Deload recommendations when you're redlining.",
    image: '/screenshots/marketing/06-recovery.png',
    imageAlt: 'PHYZIK recovery and fatigue map',
    imagePosition: 'right',
  },
  {
    id: 'programs',
    pill: 'PROGRAMS',
    body: 'Proven splits, ready to go. 12-week hypertrophy, strength, and recomp programs with volume cycling, exercise rotation, and deload weeks. Built on Schoenfeld, Israetel, and the MEV/MAV/MRV framework.',
    image: '/screenshots/marketing/05-discover.png',
    imageAlt: 'PHYZIK curated programs and featured workouts',
    imagePosition: 'left',
    accent: true,
  },
  {
    id: 'floor',
    pill: 'THE FLOOR',
    body: 'Every post is a real workout. No motivation content. No ads. The Floor only shows actual sessions from people you follow — duration, volume, exercises, PRs, auto-logged.',
    image: '/screenshots/marketing/01-floor-post.png',
    imageAlt: 'PHYZIK social feed post',
    imagePosition: 'right',
  },
]
