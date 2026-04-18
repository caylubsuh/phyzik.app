import type { Metadata } from 'next'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import Section from '@/components/ui/Section'
import Pill from '@/components/ui/Pill'
import CommunityHero from '@/components/community/CommunityHero'
import MissionBlock from '@/components/community/MissionBlock'
import TeamMemberCard from '@/components/community/TeamMemberCard'
import AthleteFeatureCard from '@/components/community/AthleteFeatureCard'
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
          <div className="mt-12">
            <AthleteFeatureCard
              member={TEAM.find((m) => m.slug === 'ten')!}
              arcTitle="ROAD TO STOCKHOLM"
              arcSubtitle="Stockholm International Hyrox — June 14, 2026"
              arcStats={[
                { label: 'Training block', value: '16 weeks' },
                {
                  label: 'Disciplines',
                  value: 'Strength + run + functional',
                },
                { label: 'Sessions / week', value: '6' },
              ]}
            />
            <div className="mt-6">
              <TeamMemberCard
                member={TEAM.find((m) => m.slug === 'sophia')!}
                size="large"
              />
            </div>
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
