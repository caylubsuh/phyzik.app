import Container from '@/components/ui/Container'
import Pill from '@/components/ui/Pill'
import AccentGlow from '@/components/motion/AccentGlow'
import FadeUp from '@/components/motion/FadeUp'

export default function CommunityHero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
      <AccentGlow position="top-right" size="lg" intensity={0.25} />

      <Container className="relative z-10">
        <FadeUp className="flex flex-col items-start">
          <Pill>COMMUNITY</Pill>
          <h1 className="mt-6 text-5xl font-bold tracking-tight text-text-primary md:text-6xl lg:text-7xl">
            Built by lifters.{' '}
            <span className="text-accent">For lifters.</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-text-primary/70 md:text-xl">
            The people building PHYZIK are the people using PHYZIK. Founders,
            athletes, ambassadors, and the lifestyle community making the
            platform real — every day, in real gyms, with real weight on real
            bars.
          </p>
        </FadeUp>
      </Container>
    </section>
  )
}
