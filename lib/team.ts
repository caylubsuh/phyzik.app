// Team data has been removed. Type retained in case future personalization is reintroduced.

export type TeamTier = 'team' | 'athlete'

export interface TeamMember {
  slug: string
  name: string
  role: string
  tier: TeamTier
  bio: string
  photoPath?: string
}

export const TEAM: TeamMember[] = []
