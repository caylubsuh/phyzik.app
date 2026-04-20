export type TeamTier = 'founder' | 'team' | 'athlete'

export interface TeamMember {
  slug: string
  name: string
  role: string
  tier: TeamTier
  bio: string
  photoPath?: string
}

export const TEAM: TeamMember[] = [
  {
    slug: 'caleb',
    name: 'Caleb Suh',
    role: 'CEO, Co-Founder',
    tier: 'founder',
    bio: "From high school soccer to military service to his first bodybuilding stage in 2025, Caleb brings a conviction forged through failure to PHYZIK — that discipline, resilience, and the people around you are what turn work into something that lasts.",
    photoPath: '/team/caleb.jpg',
  },
  {
    slug: 'vijay',
    name: 'Vijay Jagarapu',
    role: 'CTO, Co-Founder',
    tier: 'founder',
    bio: "From D1 tennis aspirations to ultramarathon finishes, Vijay brings the discipline that carried him through to PHYZIK — the belief that if you show up and do the reps, the work always compounds.",
    photoPath: '/team/vijay.jpg',
  },
  {
    slug: 'ten',
    name: 'Ten Takeda',
    role: 'Hyrox Athlete',
    tier: 'team',
    bio: "Football in Singapore, military service, now Hyrox. Ten's presence is the living proof that PHYZIK is built for anyone training with intent — not just one sport.",
    photoPath: '/team/ten.jpg',
  },
  {
    slug: 'sophia',
    name: 'Sophia Guagliano',
    role: 'Head of Bodybuilding',
    tier: 'team',
    bio: "From D1 soccer to nationally qualified bikini bodybuilder and full-time coach, Sophia brings the standard of how serious athletes actually train to PHYZIK — and makes sure every lifter gets access to it, without the gatekeeping.",
    photoPath: '/team/sophia.jpg',
  },
  {
    slug: 'hannah',
    name: 'Hannah Clark',
    role: 'Lifestyle Lead',
    tier: 'athlete',
    bio: "Hannah's story is the one most lifters actually live. No stage, no sponsorship — just the gym as a constant. She leads lifestyle content so PHYZIK feels built for the Tuesday-after-work lifter too.",
    photoPath: '/team/hannah.jpg',
  },
  {
    slug: 'ethan',
    name: 'Ethan Nagasako',
    role: 'Ambassador',
    tier: 'athlete',
    bio: "Six years of casual lifting, then a decision to compete. Ethan represents the lifter PHYZIK was built for — the one ready to stop guessing and start training with purpose.",
    photoPath: '/team/ethan.jpg',
  },
]

export const FOUNDERS = TEAM.filter((m) => m.tier === 'founder')
export const FOUNDING_TEAM = TEAM.filter((m) => m.tier === 'team')
export const ATHLETES = TEAM.filter((m) => m.tier === 'athlete')
