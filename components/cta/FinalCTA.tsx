import Image from 'next/image'
import Container from '@/components/ui/Container'
import AccentGlow from '@/components/motion/AccentGlow'
import FadeUp from '@/components/motion/FadeUp'
import AppStoreBadge from '@/components/ui/AppStoreBadge'
import QRCode from '@/components/ui/QRCode'

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-border py-24 md:py-32">
      <AccentGlow position="center" size="xl" intensity={0.5} />

      <Container className="relative z-10">
        <div className="flex flex-col items-center gap-10 text-center">
          <FadeUp>
            <Image
              src="/brand/phyzik-wordmark-white.png"
              alt="PHYZIK"
              width={2046}
              height={307}
              draggable={false}
              sizes="(max-width: 640px) 240px, (max-width: 768px) 360px, (max-width: 1024px) 480px, 560px"
              className="h-auto w-[240px] select-none sm:w-[360px] md:w-[480px] lg:w-[560px]"
            />
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2 className="text-4xl font-bold tracking-tightest text-text-primary md:text-6xl lg:text-7xl">
              Start tonight.
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="mx-auto max-w-[560px] text-lg leading-relaxed text-text-secondary md:text-xl">
              Download PHYZIK. Log your first set. Let the data do the rest.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <AppStoreBadge size="lg" />
              <QRCode />
            </div>
          </FadeUp>

          <FadeUp delay={0.4}>
            <p className="mt-4 text-[13px] uppercase tracking-[0.2em] text-text-tertiary">
              Free. No ads. Built by lifters, for lifters.
            </p>
          </FadeUp>
        </div>
      </Container>
    </section>
  )
}
