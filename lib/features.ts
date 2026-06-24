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
    id: 'floor',
    pill: 'THE FLOOR',
    body: 'Real sessions only. No motivation content, no ads. The Floor shows actual workouts from the people you follow — duration, volume, exercises, and PRs, auto-logged.',
    image: '/screenshots/marketing/01-floor-post.png',
    imageAlt: 'PHYZIK social feed post with a real logged workout',
    imagePosition: 'right',
    accent: true,
  },
  {
    id: 'active-workout',
    pill: 'ACTIVE WORKOUT',
    body: 'Log every set, hit every number. All sets in a clean table, rest timer up top, swipe between exercises, and auto-populated targets that adapt to your last session.',
    image: '/screenshots/marketing/03-active-tracker.png',
    imageAlt: 'PHYZIK active workout logging with sets and rest timer',
    imagePosition: 'left',
  },
  {
    id: 'recovery',
    pill: 'RECOVERY',
    body: "Fatigue mapped, recovery timed. An interactive muscle map updates after every session and a live readiness score tells you exactly what's ready to train — so you never waste a session on a muscle that isn't.",
    image: '/screenshots/marketing/06-recovery.png',
    imageAlt: 'PHYZIK recovery intelligence muscle map and readiness score',
    imagePosition: 'right',
    accent: true,
  },
  {
    id: 'squads',
    pill: 'SQUADS',
    body: 'Train with your crew, compete with the room. Shared schedules make missed sessions visible. Weekly leaderboards for volume, PRs, and consistency. A private group for check-ins.',
    image: '/screenshots/marketing/02-squad.png',
    imageAlt: 'PHYZIK squads with leaderboard and shared schedule',
    imagePosition: 'left',
  },
]
