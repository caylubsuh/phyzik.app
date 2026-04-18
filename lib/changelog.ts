export type ChangelogEntry = {
  version: string
  date: string
  title: string
  highlights: string[]
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: '1.1.1',
    date: '2026-04',
    title: 'Stability pass',
    highlights: [
      'Now published under Physique Technologies LLC',
      'Performance improvements across workout logging',
      'Stability fixes in analytics rendering',
    ],
  },
  {
    version: '1.1.0',
    date: '2026-04',
    title: 'The Floor — social feed',
    highlights: [
      'Public launch of The Floor: every post is a real workout',
      'Squad leaderboards for weekly volume and session count',
      'Profile privacy controls (public / followers / private)',
    ],
  },
  {
    version: '1.0.0',
    date: '2026-04',
    title: 'Launch',
    highlights: [
      'Adaptive programs with MEV/MAV/MRV volume landmarks',
      'Automatic progressive overload across 730+ exercises',
      'Anatomical recovery map and systemic fatigue scoring',
      'Squad primitive with shared schedules',
      '12-week programs for hypertrophy, strength, and recomp',
      'Performance Index analytics',
    ],
  },
]
