import Section from '@/components/ui/Section'
import Pill from '@/components/ui/Pill'
import FadeUp from '@/components/motion/FadeUp'

export default function FeaturesIntro() {
  return (
    <Section spacing="loose">
      <div className="mx-auto flex max-w-[900px] flex-col items-center gap-8 text-center">
        <FadeUp>
          <Pill>Features</Pill>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h2 className="text-4xl font-bold leading-[1.05] tracking-tightest text-text-primary md:text-6xl lg:text-7xl">
            Everything you need.{' '}
            <span className="text-text-tertiary">Nothing you don&apos;t.</span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="mx-auto max-w-[620px] text-lg leading-relaxed text-text-secondary md:text-xl">
            Built by lifters who lift. Every feature exists to make sure
            you&apos;re stronger next month than you are today.
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div
            aria-hidden="true"
            className="mx-auto mt-24 h-px w-16 bg-gradient-to-r from-transparent via-border-mid to-transparent"
          />
        </FadeUp>
      </div>
    </Section>
  )
}
