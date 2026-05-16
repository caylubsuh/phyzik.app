import type { Metadata } from 'next'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import FinalCTA from '@/components/cta/FinalCTA'
import AudienceHero from '@/components/audience/AudienceHero'
import AudienceBenefits from '@/components/audience/AudienceBenefits'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'PHYZIK for Bodybuilding',
  description:
    'Hypertrophy science in your pocket. Mesocycle design, volume landmarks, and evidence-based programming for bodybuilders.',
  alternates: { canonical: `${SITE_URL}/for/bodybuilding` },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'PHYZIK for Bodybuilding — Hypertrophy science in your pocket',
    description:
      'MEV/MAV/MRV, mesocycle structure, deload triggers, progressive overload — automatic.',
    url: `${SITE_URL}/for/bodybuilding`,
  },
}

const BENEFITS = [
  {
    title: 'MEV / MAV / MRV, calibrated.',
    body:
      'Volume landmarks mapped per muscle group. The program keeps you above maintenance, below recovery ceiling, and moving toward the top of your adaptation window.',
  },
  {
    title: 'Mesocycle design, handled.',
    body:
      'Volume cycles across blocks. Deloads trigger when recovery calls for them. Exercise rotation keeps stimulus novel without burning technique.',
  },
  {
    title: 'Progressive overload, automatic.',
    body:
      'Every set proposes weight and reps based on last session. Hit the top of your rep range, the number goes up. Stall twice, you get a variation.',
  },
]

export default function BodybuildingPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <AudienceHero
          pill="FOR BODYBUILDING"
          headline={
            <>
              Hypertrophy <span className="text-accent">science</span> in your
              pocket.
            </>
          }
          sub="Built on the peer-reviewed literature that informs elite coaching. Volume landmarks. Mesocycle structure. Proximity to failure. PHYZIK turns the science into a program you can actually follow on a Tuesday."
        />
        <AudienceBenefits
          pill="THE PROGRAMMING BRAIN"
          heading="Every variable that moves hypertrophy, tracked."
          benefits={BENEFITS}
        />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
