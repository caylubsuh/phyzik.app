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
                size="founding"
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
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            <TeamMemberCard
              member={TEAM.find((m) => m.slug === 'ten')!}
              size="founding"
            />
            <TeamMemberCard
              member={TEAM.find((m) => m.slug === 'sophia')!}
              size="founding"
              photos={[
                { src: '/team/sophia.jpg', alt: 'Sophia Guagliano training' },
                {
                  src: '/team/sophia-stage.jpg',
                  alt: 'Sophia Guagliano at Daytona bodybuilding competition',
                },
                {
                  src: '/team/sophia-training.jpg',
                  alt: 'Sophia Guagliano performing dumbbell curls',
                },
              ]}
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
