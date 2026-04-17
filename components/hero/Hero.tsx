import Container from '@/components/ui/Container'
import ScrollIndicator from '@/components/ui/ScrollIndicator'
import { BRAND } from '@/lib/constants'
import HeroBackground from './HeroBackground'
import HeroContent from './HeroContent'
import HeroPhoneShowcase from './HeroPhoneShowcase'

export default function Hero() {
  return (
    <section
      role="banner"
      aria-label={`${BRAND.name} — ${BRAND.tagline}`}
      className="relative flex min-h-screen flex-col items-center justify-start overflow-hidden pb-20 pt-32 md:pt-40"
    >
      <HeroBackground />

      <Container className="relative z-10 flex flex-col items-center gap-16 md:gap-20">
        <HeroContent />
        <HeroPhoneShowcase />
      </Container>

      <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <ScrollIndicator />
      </div>
    </section>
  )
}
