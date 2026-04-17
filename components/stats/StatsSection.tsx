import Section from '@/components/ui/Section'
import Pill from '@/components/ui/Pill'
import FadeUp from '@/components/motion/FadeUp'
import PillarBlock from './PillarBlock'

const PILLARS: { headline: React.ReactNode; description: string }[] = [
  {
    headline: (
      <>
        <span className="text-accent">730+</span> Exercises
      </>
    ),
    description:
      'Every major compound, isolation, and variation — properly catalogued, fatigue-indexed, and surfaced by intelligent search.',
  },
  {
    headline: 'Intelligent Adaptive Programming',
    description:
      'Volume cycles across mesocycles. Automatic deloads when recovery calls for them. Session-by-session adjustments tuned to your real performance.',
  },
  {
    headline: 'Social Functionality',
    description:
      'Every post on The Floor is attached to a completed workout. Squads, challenges, and community built into the training experience — not bolted on.',
  },
  {
    headline: 'Elite-Level Strength & Hypertrophy Analytics',
    description:
      'Strength progression curves. Volume landmark tracking. Recovery trends. Muscle-group distribution. The numbers serious coaches live by.',
  },
]

export default function StatsSection() {
  return (
    <Section spacing="loose">
      <div className="flex flex-col items-center">
        <FadeUp>
          <Pill>WHAT POWERS PHYZIK</Pill>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h2 className="mx-auto mt-8 max-w-[800px] text-center text-4xl font-bold leading-[1.05] tracking-tightest text-text-primary md:text-6xl lg:text-7xl">
            Four foundations. One training system.
          </h2>
        </FadeUp>

        <div className="mt-20 grid w-full grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 lg:grid-cols-4 lg:gap-12">
          {PILLARS.map((p, i) => (
            <FadeUp key={i} delay={0.2 + i * 0.1}>
              <PillarBlock headline={p.headline} description={p.description} />
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.5}>
          <p className="mx-auto mt-20 max-w-[640px] text-center text-base leading-relaxed text-text-secondary md:text-lg">
            Every algorithm — progression, volume cycling, deload timing,
            recovery modeling — is grounded in the peer-reviewed exercise
            science that shapes elite coaching.
          </p>
        </FadeUp>
      </div>
    </Section>
  )
}
