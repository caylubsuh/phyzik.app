import Link from 'next/link'
import Container from '@/components/ui/Container'
import FadeUp from '@/components/motion/FadeUp'
import AppStoreBadge from '@/components/ui/AppStoreBadge'
import QRCode from '@/components/ui/QRCode'

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* ── Atmospheric backdrop — matches the pricing page editorial direction ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-30"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(184,151,106,0.16) 0%, transparent 65%), linear-gradient(180deg, #0A0A0B 0%, #050506 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-20 h-[640px] w-[1100px] -translate-x-1/2 -translate-y-1/2 animate-slow-drift opacity-90 blur-3xl"
        style={{
          background:
            'radial-gradient(ellipse 50% 55% at 50% 50%, rgba(184,151,106,0.22) 0%, rgba(184,151,106,0.05) 38%, transparent 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '34px 34px',
          maskImage:
            'radial-gradient(ellipse 60% 60% at 50% 50%, black 0%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 60% 60% at 50% 50%, black 0%, transparent 75%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(184,151,106,0.3) 50%, transparent 100%)',
        }}
      />

      <Container className="relative z-10">
        <div className="flex flex-col items-center gap-8 text-center md:gap-10">
          <FadeUp>
            <span className="text-[10.5px] font-bold uppercase tracking-[0.36em] text-text-tertiary">
              Begin
            </span>
          </FadeUp>

          <FadeUp delay={0.05}>
            <h2 className="text-balance text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.95] tracking-tightest text-text-primary">
              Start{' '}
              <span className="text-shimmer-gold">tonight.</span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="mx-auto max-w-[560px] text-lg leading-relaxed text-text-secondary md:text-xl">
              Download PHYZIK. Log your first set. Let the data do the rest.
            </p>
          </FadeUp>

          <FadeUp delay={0.18}>
            <div className="flex flex-col items-center gap-6 md:flex-row md:gap-7">
              <AppStoreBadge size="lg" />
              <QRCode />
            </div>
          </FadeUp>

          <FadeUp delay={0.24}>
            <div className="flex items-center gap-3 text-[11.5px] uppercase tracking-[0.22em] text-text-tertiary">
              <span>Free</span>
              <span aria-hidden="true">·</span>
              <span>No ads</span>
              <span aria-hidden="true">·</span>
              <span>Built by lifters</span>
            </div>
          </FadeUp>

          <FadeUp delay={0.3}>
            <p className="mt-2 text-[12.5px] text-text-tertiary">
              Want every AI feature?{' '}
              <Link
                href="/pricing"
                className="text-text-secondary underline decoration-text-tertiary/40 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                Become a member
              </Link>
            </p>
          </FadeUp>
        </div>
      </Container>
    </section>
  )
}
