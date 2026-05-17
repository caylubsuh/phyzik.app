import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import Container from '@/components/ui/Container'
import FadeUp from '@/components/motion/FadeUp'
import PhyzikMark from '@/components/brand/PhyzikMark'
import CountUpNumber from '@/components/motion/CountUpNumber'
import { getPlan, FEATURE_CLUSTERS } from '@/lib/pricing'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Membership — PHYZIK Pro',
  description:
    'Become a PHYZIK Pro member for $34.99/year — every AI feature, lowest price we can offer. Cancel anytime.',
  alternates: { canonical: `${SITE_URL}/pricing` },
  openGraph: {
    title: 'Membership — PHYZIK Pro',
    description:
      'Become a member for $34.99/year. All the AI features at the lowest price we can offer.',
    url: `${SITE_URL}/pricing`,
  },
}

export default function PricingPage() {
  const annual = getPlan('annual')
  const monthly = getPlan('monthly')
  const annualNumber = annual.webPriceCents / 100

  return (
    <>
      <Nav />

      <main id="main-content" className="relative overflow-hidden">
        {/* ─────────── Atmosphere ─────────── */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-30 h-[1400px]"
          style={{
            background:
              'radial-gradient(ellipse 70% 45% at 50% 0%, rgba(184,151,106,0.16) 0%, transparent 60%), linear-gradient(180deg, #0A0A0B 0%, #050506 100%)',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[8%] -z-20 h-[720px] w-[1100px] -translate-x-1/2 animate-slow-drift opacity-90 blur-3xl"
          style={{
            background:
              'radial-gradient(ellipse 50% 55% at 50% 50%, rgba(184,151,106,0.20) 0%, rgba(184,151,106,0.06) 35%, transparent 70%)',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.45]"
          style={{
            backgroundImage:
              'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '34px 34px',
            maskImage:
              'radial-gradient(ellipse 70% 60% at 50% 20%, black 0%, transparent 75%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 70% 60% at 50% 20%, black 0%, transparent 75%)',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[14vh] -z-10 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(184,151,106,0.30) 50%, transparent 100%)',
          }}
        />

        {/* ─────────── HERO ─────────── */}
        <section className="relative pb-10 pt-28 md:pb-14 md:pt-36">
          <Container>
            <FadeUp>
              <div className="mx-auto flex max-w-[820px] flex-col items-center gap-7 text-center">
                <span className="text-[10.5px] font-bold uppercase tracking-[0.4em] text-text-tertiary">
                  Membership
                </span>

                <div className="flex items-center gap-3">
                  <PhyzikMark sizeClass="h-9 w-auto md:h-12" priority />
                  <span className="text-[14px] font-bold uppercase tracking-[0.36em] text-accent md:text-[17px]">
                    Pro
                  </span>
                </div>

                <h1 className="text-balance text-[clamp(2.75rem,6.5vw,5.5rem)] font-bold leading-[0.95] tracking-tightest text-text-primary">
                  Everything intelligent.
                  <br />
                  <span className="text-shimmer-gold">
                    Built for who you&apos;re becoming.
                  </span>
                </h1>

                <p className="max-w-[540px] text-[15.5px] leading-relaxed text-text-secondary md:text-[17px]">
                  Become a Pro member and unlock every AI feature. Subscribing
                  here — not the App Store — keeps the full price on our side
                  and lets us pass the difference back to you.
                </p>
              </div>
            </FadeUp>
          </Container>
        </section>

        {/* ─────────── PRICE ARTIFACT ─────────── */}
        <section className="relative pb-16 md:pb-24">
          <Container>
            <FadeUp delay={0.05}>
              <div className="mx-auto flex max-w-[820px] flex-col items-center">
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-accent to-transparent" />

                <div className="relative mt-10 flex items-baseline gap-2 md:gap-3">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10 scale-110 blur-3xl"
                    style={{
                      background:
                        'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(184,151,106,0.22) 0%, transparent 65%)',
                    }}
                  />
                  <span className="text-[clamp(2.5rem,4.5vw,4rem)] font-bold leading-none text-text-tertiary">
                    $
                  </span>
                  <span
                    className="font-bold leading-none tabular-nums tracking-tightest text-text-primary"
                    style={{
                      fontSize: 'clamp(7rem, 17vw, 14rem)',
                      textShadow:
                        '0 4px 32px rgba(184,151,106,0.20), 0 1px 0 rgba(255,255,255,0.04)',
                    }}
                  >
                    <CountUpNumber to={annualNumber} duration={1.8} />
                    <noscript>{annual.webPrice.replace('$', '')}</noscript>
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.32em] text-text-tertiary">
                  <span className="h-px w-8 bg-border-mid" />
                  Per year, billed once
                  <span className="h-px w-8 bg-border-mid" />
                </div>

                <p className="mt-6 max-w-[480px] text-center text-[13px] leading-relaxed text-text-tertiary">
                  Less than the App Store charges for the same membership.
                  Less than a single month of most fitness apps.
                </p>
              </div>
            </FadeUp>

            {/* CTA */}
            <FadeUp delay={0.15}>
              <div className="mx-auto mt-12 flex max-w-[520px] flex-col items-center gap-4">
                <Link
                  href={`/signup?plan=${annual.id}`}
                  className="group relative inline-flex h-14 w-full items-center justify-center overflow-hidden rounded-full bg-accent text-[15px] font-semibold tracking-wide text-bg shadow-[0_22px_60px_-18px_rgba(184,151,106,0.55)] transition-all hover:bg-accent-dark hover:shadow-[0_22px_70px_-18px_rgba(184,151,106,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  <span className="relative z-10">Become a member</span>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-full group-hover:opacity-100"
                  />
                </Link>

                <p className="text-[12.5px] text-text-tertiary">
                  Or pay month-to-month at{' '}
                  <Link
                    href={`/signup?plan=${monthly.id}`}
                    className="text-text-secondary underline decoration-text-tertiary/40 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                  >
                    {monthly.webPrice} / month
                  </Link>
                </p>
              </div>
            </FadeUp>
          </Container>
        </section>

        {/* ─────────── MISSION ─────────── */}
        <section className="relative border-t border-border/60 py-20 md:py-28">
          <Container>
            <div className="mx-auto max-w-[820px]">
              <FadeUp>
                <span className="text-[10.5px] font-bold uppercase tracking-[0.36em] text-text-tertiary">
                  Mission
                </span>
              </FadeUp>

              <FadeUp delay={0.05}>
                <h2 className="mt-6 text-balance text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05] tracking-tightest text-text-primary">
                  Everyone deserves{' '}
                  <span className="text-shimmer-gold">the tools.</span>
                </h2>
              </FadeUp>

              <FadeUp delay={0.1}>
                <div className="mt-8 space-y-5 text-[16px] leading-relaxed text-text-secondary md:text-[18px]">
                  <p>
                    PHYZIK is built on the belief that every lifter should have
                    access to the same tools that used to live behind paywalls
                    and personal coaches. Elite-level programming. Real
                    progressive overload. Form feedback. Recovery science. The
                    things that actually move you forward.
                  </p>
                  <p>
                    This isn&apos;t a promotion. It isn&apos;t a discount. The
                    membership price covers the bare minimum we need to keep
                    the servers running, the AI improving, and the platform
                    free for everyone who can&apos;t afford a paid
                    subscription.
                  </p>
                  <p className="text-text-primary">
                    No margin. No markup. The fairest price we can offer for
                    what the app actually does.
                  </p>
                </div>
              </FadeUp>
            </div>
          </Container>
        </section>

        {/* ─────────── FEATURE CLUSTERS ─────────── */}
        <section className="relative border-t border-border/60 py-20 md:py-28">
          <Container>
            <div className="mx-auto max-w-[860px]">
              <FadeUp>
                <div className="flex items-baseline justify-between">
                  <h2 className="text-[clamp(2.25rem,4.5vw,3.5rem)] font-bold leading-none tracking-tightest text-text-primary">
                    What you{' '}
                    <span className="text-shimmer-gold">get.</span>
                  </h2>
                  <span className="hidden text-[10.5px] font-bold uppercase tracking-[0.28em] text-text-tertiary md:inline">
                    Three pillars
                  </span>
                </div>
              </FadeUp>

              <div className="mt-14 flex flex-col gap-12 md:mt-20 md:gap-16">
                {FEATURE_CLUSTERS.map((cluster, i) => (
                  <FadeUp key={cluster.label} delay={0.08 + i * 0.06}>
                    <div className="grid grid-cols-1 items-baseline gap-6 border-b border-border/60 pb-12 last:border-b-0 last:pb-0 md:grid-cols-[220px_1fr] md:gap-12">
                      <div className="flex flex-col gap-1.5">
                        <span className="font-mono text-[11px] tabular-nums text-accent/70">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <h3 className="text-[32px] font-bold leading-none tracking-tightest text-text-primary md:text-[42px]">
                          {cluster.label}
                        </h3>
                      </div>

                      <ul className="flex flex-col gap-4">
                        {cluster.items.map((item) => (
                          <li
                            key={item}
                            className="text-[17px] leading-snug text-text-secondary md:text-[19px]"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </FadeUp>
                ))}
              </div>

              <FadeUp delay={0.4}>
                <p className="mt-12 text-[12.5px] leading-relaxed text-text-tertiary">
                  Plus priority support, included.
                </p>
              </FadeUp>
            </div>
          </Container>
        </section>

        {/* ─────────── Fine print strip ─────────── */}
        <section className="border-t border-border/60 py-14">
          <Container>
            <div className="mx-auto grid max-w-[860px] grid-cols-1 gap-8 text-[12.5px] leading-relaxed text-text-tertiary md:grid-cols-3 md:gap-10">
              <div>
                <div className="mb-2 text-[10.5px] font-bold uppercase tracking-[0.22em] text-text-secondary">
                  Membership begins immediately
                </div>
                AI features unlock the next time you open the app. No waiting,
                no activation period.
              </div>
              <div>
                <div className="mb-2 text-[10.5px] font-bold uppercase tracking-[0.22em] text-text-secondary">
                  Billed by Stripe
                </div>
                Card data never touches our servers. Receipts arrive in your
                inbox.
              </div>
              <div>
                <div className="mb-2 text-[10.5px] font-bold uppercase tracking-[0.22em] text-text-secondary">
                  Price locked
                </div>
                No surprise increases for 12 months from your first charge.
              </div>
            </div>

            <p className="mx-auto mt-12 max-w-[860px] text-[12px] leading-relaxed text-text-tertiary/80">
              Already subscribed via the App Store? Your existing subscription
              keeps working — there&apos;s no need to switch. Cancel anytime
              from your account page.
            </p>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  )
}
