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
  title: 'PHYZIK for Hyrox',
  description:
    'Hyrox training in one app. Strength, running, and functional work — every discipline logged, every progression tracked.',
  alternates: { canonical: `${SITE_URL}/for/hyrox` },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'PHYZIK for Hyrox — Every discipline, one app',
    description:
      'Sled, sandbag, wall ball, row, run, lift. Every discipline logged, every progression tracked.',
    url: `${SITE_URL}/for/hyrox`,
  },
}

const BENEFITS = [
  {
    title: 'Every station. Every modality.',
    body:
      'Sled push, sled pull, farmer\'s carry, sandbag lunges, burpee broad jumps, rowing, ski erg, wall balls — all tracked in the same app as your strength and run work.',
  },
  {
    title: 'Hybrid programming, not hybrid compromise.',
    body:
      'Strength and conditioning blocks that respect each other. Volume landmarks on the lifts, pacing targets on the runs, station-by-station work capacity benchmarks.',
  },
  {
    title: 'Pace and performance, in one view.',
    body:
      'See how your 1km pace is moving against your sled push capacity. Stop guessing which discipline is bottlenecking your finish time.',
  },
]

export default function HyroxPage() {
  const ten = TEAM.find((m) => m.slug === 'tenkara')!
  return (
    <>
      <Nav />
      <main id="main-content">
        <AudienceHero
          pill="FOR HYROX"
          headline={
            <>
              Every discipline, <span className="text-accent">one app.</span>
            </>
          }
          sub="Hyrox is eight stations and eight kilometers. Your app should cover all of it. PHYZIK tracks strength, run, and functional work in the same session — so you can actually train like the race."
        />
        <AudienceBenefits
          pill="WHY HYROX ATHLETES TRAIN ON PHYZIK"
          heading="Built for the sport that refuses to specialize."
          benefits={BENEFITS}
        />
        <AudienceFeatureFeature
          pill="PROOF"
          heading="Training block in progress."
          member={ten}
          body="Ten Takeda is 16 weeks out from Stockholm International Hyrox (June 14, 2026). Six sessions a week. Every sled push, every wall ball, every kilometer logged on PHYZIK. The block, the pacing, the progression — open on The Floor."
        />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
