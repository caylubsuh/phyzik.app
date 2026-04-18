import Section from '@/components/ui/Section'
import Pill from '@/components/ui/Pill'
import FadeUp from '@/components/motion/FadeUp'

export type Benefit = {
  title: string
  body: string
}

type Props = {
  pill: string
  heading: string
  benefits: Benefit[]
}

export default function AudienceBenefits({ pill, heading, benefits }: Props) {
  return (
    <Section spacing="medium">
      <FadeUp>
        <Pill>{pill}</Pill>
        <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
          {heading}
        </h2>
      </FadeUp>
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {benefits.map((b) => (
          <div
            key={b.title}
            className="rounded-2xl border border-border bg-bg-high p-7"
          >
            <h3 className="text-lg font-semibold text-text-primary">
              {b.title}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">
              {b.body}
            </p>
          </div>
        ))}
      </div>
    </Section>
  )
}
