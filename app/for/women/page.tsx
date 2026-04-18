import type { Metadata } from 'next'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import FinalCTA from '@/components/cta/FinalCTA'
import AudienceHero from '@/components/audience/AudienceHero'
import AudienceBenefits from '@/components/audience/AudienceBenefits'
import AudienceFeatureFeature from '@/components/audience/AudienceFeatureFeature'
import { TEAM } from '@/lib/team'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'PHYZIK for Women',
  description:
    'Training built for you. Inclusive, science-backed programming. No pastel palette, no patronizing copy — just real tools for real lifting.',
  alternates: { canonical: `${SITE_URL}/for/women` },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'PHYZIK for Women — Training built for you',
    description:
      'Inclusive, evidence-based programming. Same tools, same depth, same respect — without the patronizing UX.',
    url: `${SITE_URL}/for/women`,
  },
}

const BENEFITS = [
  {
    title: 'Same science. Same programs.',
    body:
      'No "pink dumbbell" version of the app. The same MEV/MAV/MRV landmarks, the same progressive overload, the same analytics. Respect, expressed as equal tools.',
  },
  {
    title: 'Build the plan around your life.',
    body:
      'Programs that fit 3, 4, or 5 days a week. Swap sessions without breaking the cycle. The schedule follows you — not the other way around.',
  },
  {
    title: 'A feed you can actually look at.',
    body:
      'The Floor is real workouts, real progression, real people. No motivation content. No before/after ads. No noise dressed as inspiration.',
  },
]

export default function WomenPage() {
  const sophia = TEAM.find((m) => m.slug === 'sophia')!
  const hannah = TEAM.find((m) => m.slug === 'hannah')!
  return (
    <>
      <Nav />
      <main id="main-content">
        <AudienceHero
          pill="FOR WOMEN"
          headline={
            <>
              Training built <span className="text-accent">for you.</span>
            </>
          }
          sub="Same tools. Same depth. Same respect. PHYZIK doesn't build a dumber version of the app for women — it builds one app, for every lifter, and means it."
        />
        <AudienceBenefits
          pill="WHAT'S DIFFERENT"
          heading="Inclusion isn't a color palette. It's what the app actually does."
          benefits={BENEFITS}
        />
        <AudienceFeatureFeature
          pill="HEAD OF BODYBUILDING"
          heading="Leading programming and athlete recruitment."
          member={sophia}
          body="Sophia makes sure the athlete roster you see building on PHYZIK reflects the lifters actually on the platform — not the ones marketing says should be."
        />
        <AudienceFeatureFeature
          pill="LIFESTYLE LEAD"
          heading="Content for the Tuesday-after-work lifter."
          member={hannah}
          body="Not every lifter trains for a podium. Most just want to feel strong, show up consistently, and have a plan they can follow on a Tuesday after work. Hannah's content pod is for them — PHYZIK's depth, without the intensity tax."
        />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
