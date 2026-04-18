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
    role: 'CEO, co-founder',
    tier: 'founder',
    bio: "Soccer, military, bodybuilding — every chapter of Caleb's life has been grounded in fitness. PHYZIK exists because he believes every lifter, regardless of background or budget, deserves tools built for them.",
    photoPath: '/team/caleb.jpg',
  },
  {
    slug: 'vijay',
    name: 'Vijay Jagarapu',
    role: 'CTO, co-founder',
    tier: 'founder',
    bio: "A tennis recruit turned ultramarathoner, Vijay built the engineering behind PHYZIK so the infrastructure disappears and the training takes center stage.",
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
    bio: "D1 soccer, national stage bodybuilding, now a full-time coach. Sophia makes sure PHYZIK reflects how serious athletes actually train — without the gatekeeping.",
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
