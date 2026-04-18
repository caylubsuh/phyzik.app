import type { Metadata } from 'next'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import Section from '@/components/ui/Section'
import Pill from '@/components/ui/Pill'
import CommunityHero from '@/components/community/CommunityHero'
import MissionBlock from '@/components/community/MissionBlock'
import TeamMemberCard from '@/components/community/TeamMemberCard'
import FloorScaffold from '@/components/community/FloorScaffold'
import AmbassadorCTA from '@/components/community/AmbassadorCTA'
import FadeUp from '@/components/motion/FadeUp'
import { FOUNDERS, ATHLETES, TEAM } from '@/lib/team'

export const metadata: Metadata = {
  title: 'Community — PHYZIK',
  description:
    'The people building PHYZIK are the people using PHYZIK. Founders, athletes, ambassadors, and the lifestyle community making the platform real.',
  openGraph: {
    title: 'Community — PHYZIK',
    description:
      'The people building PHYZIK are the people using PHYZIK.',
  },
}

export default function CommunityPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <CommunityHero />
        <MissionBlock />

        <Section spacing="medium">
          <FadeUp>
            <Pill>FOUNDERS</Pill>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
              The people who started it.
            </h2>
          </FadeUp>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {FOUNDERS.map((member) => (
              <TeamMemberCard
                key={member.slug}
                member={member}
                size="large"
              />
            ))}
          </div>
        </Section>

        <Section spacing="medium">
          <FadeUp>
            <Pill>FOUNDING TEAM</Pill>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
              The people who shape what it becomes.
            </h2>
          </FadeUp>
          {/* Road to Stockholm banner */}
          <div className="mt-6 mb-8 rounded-2xl border border-white/[0.08] bg-bg-surface p-5 md:p-6">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                ROAD TO STOCKHOLM
              </span>
              <p className="text-sm text-text-secondary">
                Ten is training for the Stockholm International Hyrox — June 14, 2026. Follow along on The Floor.
              </p>
            </div>
          </div>

          {/* Ten + Sophia in matching cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <TeamMemberCard
              member={TEAM.find((m) => m.slug === 'ten')!}
              size="large"
            />
            <TeamMemberCard
              member={TEAM.find((m) => m.slug === 'sophia')!}
              size="large"
            />
          </div>
        </Section>

        <Section spacing="medium">
          <FadeUp>
            <Pill>ATHLETES</Pill>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
              The people training on it.
            </h2>
          </FadeUp>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {ATHLETES.map((member) => (
              <TeamMemberCard
                key={member.slug}
                member={member}
                size="default"
              />
            ))}
          </div>
        </Section>

        <FloorScaffold />
        <AmbassadorCTA />
      </main>
      <Footer />
    </>
  )
}
