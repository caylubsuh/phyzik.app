import Section from '@/components/ui/Section'
import Pill from '@/components/ui/Pill'
import FadeUp from '@/components/motion/FadeUp'
import StatBlock from '@/components/ui/StatBlock'
import { STATS } from '@/lib/constants'

export default function StatsSection() {
  return (
    <Section spacing="loose">
      <div className="flex flex-col items-center">
        <FadeUp>
          <Pill>BY THE NUMBERS</Pill>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h2 className="mx-auto mt-8 max-w-[800px] text-center text-4xl font-bold leading-[1.05] tracking-tightest text-text-primary md:text-6xl lg:text-7xl">
            Built to match how hard you train.
          </h2>
        </FadeUp>

        <FadeUp delay={0.2} className="mt-20 w-full">
          <div className="grid grid-cols-1 place-items-center gap-12 md:grid-cols-2 md:gap-16 lg:grid-cols-4 lg:gap-8">
            {STATS.map((s) => (
              <StatBlock
                key={s.label}
                value={s.value}
                suffix={s.suffix}
                label={s.label}
                className="items-center text-center"
              />
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.4}>
          <p className="mx-auto mt-20 max-w-[640px] text-center text-base leading-relaxed text-text-secondary md:text-lg">
            Every exercise, cross-referenced. Every rep range, backed by research.
            Every program, built on evidence.
          </p>
        </FadeUp>
      </div>
    </Section>
  )
}
