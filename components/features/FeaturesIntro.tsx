import Section from '@/components/ui/Section'
import Pill from '@/components/ui/Pill'
import FadeUp from '@/components/motion/FadeUp'

export default function FeaturesIntro() {
  return (
    <Section spacing="medium">
      <div className="flex flex-col items-start gap-5 md:max-w-3xl">
        <FadeUp>
          <Pill>FEATURES</Pill>
        </FadeUp>

        <FadeUp delay={0.05}>
          <h2 className="text-balance text-4xl font-bold leading-[1.02] tracking-tightest text-text-primary md:text-5xl lg:text-6xl">
            Everything you need.{' '}
            <span className="text-text-tertiary">Nothing you don&apos;t.</span>
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
