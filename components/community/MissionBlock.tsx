import Section from '@/components/ui/Section'
import Pill from '@/components/ui/Pill'
import FadeUp from '@/components/motion/FadeUp'

export default function MissionBlock() {
  return (
    <Section spacing="medium">
      <FadeUp>
        <Pill>OUR MISSION</Pill>
        <h2 className="mt-4 max-w-4xl text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
          A training platform built around one principle.
        </h2>
        <p className="mt-8 max-w-4xl text-xl leading-relaxed text-text-primary/80 md:text-2xl">
          Every lifter deserves tools actually built for them. Not repackaged
          spreadsheets. Not diluted consumer apps. Not premium subscriptions
          locked behind paywalls that exclude the majority of people who train.
          PHYZIK is <span className="text-accent">free</span>. PHYZIK is{' '}
          <span className="text-accent">private</span> — no data sold, shared,
          or monetized. PHYZIK is{' '}
          <span className="text-accent">grounded in science</span> — the same
          hypertrophy research that shapes elite coaching. And PHYZIK
          is <span className="text-accent">social</span> — because training is
          better when the people around you are doing it too.
        </p>
      </FadeUp>
    </Section>
  )
}
