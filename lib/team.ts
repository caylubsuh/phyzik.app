export type TeamTier = 'founder' | 'team' | 'athlete' | 'ambassador'

export interface TeamMember {
  slug: string
  name: string
  role: string
  tier: TeamTier
  bio: string
  credentials?: string
  photoPath?: string
}

export const TEAM: TeamMember[] = [
  {
    slug: 'caleb',
    name: 'Caleb Suh',
    role: 'CEO, co-founder',
    tier: 'founder',
    credentials: 'NPC Classic Physique competitor',
    bio: "Caleb leads product, design, and brand. He built PHYZIK because the training tools he wanted as a lifter didn't exist — apps asked him to do the programming or handed him a static PDF that ignored what he actually lifted. PHYZIK is his answer. Every design decision runs through one question: does this help lifters in the gym?",
    photoPath: '/team/caleb.jpg',
  },
  {
    slug: 'vijay',
    name: 'Vijay Jagarapu',
    role: 'CTO, co-founder',
    tier: 'founder',
    credentials: 'Built the platform from zero',
    bio: "Vijay built the engineering behind PHYZIK. Every workout you log, every program the app generates, every post on The Floor runs on infrastructure he designed and wrote. He owns the systems that make the product feel inevitable — fast, reliable, invisible when it's working.",
    photoPath: '/team/vijay.jpg',
  },
  {
    slug: 'sophia',
    name: 'Sophia Guagliano',
    role: 'Head of Bodybuilding',
    tier: 'team',
    credentials: 'Competitive bodybuilder',
    bio: "Sophia leads bodybuilding content and athlete recruitment. She makes sure PHYZIK reflects how people actually train — not a sanitized, productized version of it. The athlete roster you see building on the platform is the roster she's building.",
    photoPath: '/team/sophia.jpg',
  },
  {
    slug: 'hannah',
    name: 'Hannah Clark',
    role: 'Lifestyle Lead',
    tier: 'team',
    credentials: 'Everyday lifter, content pod lead',
    bio: "Hannah runs the lifestyle content pod. Not every lifter trains for a podium — most just want to feel strong, show up consistently, and have a plan they can follow on a Tuesday after work. Hannah's content is for them. PHYZIK's depth, without the intensity tax.",
    photoPath: '/team/hannah.jpg',
  },
  {
    slug: 'tenkara',
    name: 'Tenkara',
    role: 'Hyrox Athlete',
    tier: 'athlete',
    credentials: 'Stockholm International Hyrox — June 14, 2026',
    bio: "Tenkara is deep in a Hyrox training block. Eight stations of functional work alternating with one-kilometer runs: sled push, farmer's carry, sandbag lunges, wall balls, rowing, ski erg. Every discipline logged in PHYZIK. Every progression tracked. Tenkara's presence on the platform is the real-time proof that PHYZIK isn't just for bodybuilders — it's for anyone training with intent.",
    photoPath: '/team/tenkara.jpg',
  },
  {
    slug: 'ethan',
    name: 'Ethan Nagasako',
    role: 'Ambassador',
    tier: 'ambassador',
    credentials: 'Amateur bodybuilder, Mesocycle 2 in progress',
    bio: "Ethan's training is what real amateur bodybuilding progression looks like when the program handles the structural decisions. Eight weeks into his current block, his lifts are moving — incline bench +20 lb, deadlift +30 lb, weighted pull-up +20 lb on the chain. Follow his blocks on The Floor.",
    photoPath: '/team/ethan.jpg',
  },
]

export const FOUNDERS = TEAM.filter((m) => m.tier === 'founder')
export const TEAM_MEMBERS = TEAM.filter((m) => m.tier === 'team')
export const ATHLETES = TEAM.filter(
  (m) => m.tier === 'athlete' || m.tier === 'ambassador',
)
