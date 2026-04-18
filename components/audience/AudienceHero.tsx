import type { ReactNode } from 'react'
import Container from '@/components/ui/Container'
import Pill from '@/components/ui/Pill'
import AppStoreBadge from '@/components/ui/AppStoreBadge'
import AccentGlow from '@/components/motion/AccentGlow'
import FadeUp from '@/components/motion/FadeUp'

type Props = {
  pill: string
  headline: ReactNode
  sub: string
}

export default function AudienceHero({ pill, headline, sub }: Props) {
  return (
    <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
      <AccentGlow position="top-right" size="lg" intensity={0.28} />
      <Container className="relative z-10">
        <FadeUp className="flex flex-col items-start">
          <Pill>{pill}</Pill>
          <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-[1.03] tracking-tight text-text-primary md:text-6xl lg:text-7xl">
            {headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-text-primary/70 md:text-xl">
            {sub}
          </p>
          <div className="mt-10">
            <AppStoreBadge size="lg" />
          </div>
        </FadeUp>
      </Container>
    </section>
  )
}
