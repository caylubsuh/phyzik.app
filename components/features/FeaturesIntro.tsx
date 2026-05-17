import Section from '@/components/ui/Section'
import Pill from '@/components/ui/Pill'
import FadeUp from '@/components/motion/FadeUp'

export default function FeaturesIntro() {
  return (
    <Section spacing="medium" className="relative overflow-hidden">
      {/* Faint metallic horizon hairline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(184,151,106,0.25) 50%, transparent 100%)',
        }}
      />
      {/* Subtle bronze blob behind the heading */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-1/2 -z-10 h-[420px] w-[640px] -translate-y-1/2 opacity-70 blur-3xl"
        style={{
          background:
            'radial-gradient(ellipse 55% 55% at 50% 50%, rgba(184,151,106,0.16) 0%, transparent 65%)',
        }}
      />

      <div className="flex flex-col items-start gap-6 md:max-w-3xl">
        <FadeUp>
          <Pill>Features</Pill>
        </FadeUp>

        <FadeUp delay={0.05}>
          <h2 className="text-balance text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.02] tracking-tightest text-text-primary">
            Everything you need.{' '}
            <span className="text-shimmer-gold">Nothing you don&apos;t.</span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="max-w-[560px] text-base leading-relaxed text-text-secondary md:text-lg">
            Every feature serves one purpose — equipping you with the tools to
            become the best version of yourself.
          </p>
        </FadeUp>
      </div>
    </Section>
  )
}
