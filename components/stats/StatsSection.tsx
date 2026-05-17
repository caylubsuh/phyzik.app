import Section from '@/components/ui/Section'
import Pill from '@/components/ui/Pill'
import FadeUp from '@/components/motion/FadeUp'

type Pillar = {
  /** Optional big number visual (e.g. "730+"). */
  numeral?: string
  /** Optional unit after the numeral (e.g. "Exercises"). */
  unit?: string
  /** Main pillar title. Used when numeral isn't supplied. */
  headline?: string
  description: string
}

const PILLARS: readonly Pillar[] = [
  {
    numeral: '730+',
    unit: 'Exercises',
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
] as const

export default function StatsSection() {
  return (
    <Section spacing="loose" className="relative overflow-hidden">
      {/* Page atmosphere — drifting bronze blob anchored to the section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 -z-10 h-[520px] w-[820px] translate-x-1/4 animate-slow-drift opacity-80 blur-3xl"
        style={{
          background:
            'radial-gradient(ellipse 50% 55% at 50% 50%, rgba(184,151,106,0.18) 0%, rgba(184,151,106,0.04) 40%, transparent 70%)',
        }}
      />

      <div className="mx-auto max-w-[920px]">
        <FadeUp>
          <Pill>WHAT POWERS PHYZIK</Pill>
        </FadeUp>

        <FadeUp delay={0.05}>
          <h2 className="mt-8 max-w-[760px] text-balance text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.02] tracking-tightest text-text-primary">
            Four foundations.{' '}
            <span className="text-shimmer-gold">One training system.</span>
          </h2>
        </FadeUp>

        <ol className="mt-16 flex flex-col">
          {PILLARS.map((pillar, i) => (
            <FadeUp key={i} delay={0.05 + i * 0.06}>
              <li className="group grid grid-cols-1 items-baseline gap-x-10 gap-y-4 border-b border-border/60 py-8 first:border-t md:grid-cols-[260px_1fr] md:gap-x-14 md:py-10">
                {/* Left column: number + title */}
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[12px] tabular-nums tracking-tight text-accent/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {pillar.numeral ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-shimmer-gold font-bold leading-none tracking-tightest text-[44px] md:text-[56px]">
                        {pillar.numeral}
                      </span>
                      <span className="text-[15px] uppercase tracking-[0.18em] text-text-secondary">
                        {pillar.unit}
                      </span>
                    </div>
                  ) : (
                    <h3 className="text-[20px] font-bold leading-snug tracking-tight text-text-primary md:text-[26px]">
                      {pillar.headline}
                    </h3>
                  )}
                </div>

                {/* Right column: description */}
                <p className="text-[15.5px] leading-relaxed text-text-secondary md:text-[17px]">
                  {pillar.description}
                </p>
              </li>
            </FadeUp>
          ))}
        </ol>

        <FadeUp delay={0.4}>
          <p className="mt-12 max-w-[640px] text-[14px] leading-relaxed text-text-tertiary md:text-[15px]">
            Every algorithm — progression, volume cycling, deload timing,
            recovery modeling — is grounded in the peer-reviewed exercise
            science that shapes elite coaching.
          </p>
        </FadeUp>
      </div>
    </Section>
  )
}
