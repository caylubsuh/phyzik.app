import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import Container from '@/components/ui/Container'
import FadeUp from '@/components/motion/FadeUp'
import PhyzikMark from '@/components/brand/PhyzikMark'
import { getPlan, perMonthEquivalent, PRO_FEATURES } from '@/lib/pricing'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Membership — PHYZIK Pro',
  description:
    'PHYZIK Pro from $5.99/mo unlocks AI food scanning, voice workout logging, and exercise camera ID. Save 15% vs the App Store by subscribing here.',
  alternates: { canonical: `${SITE_URL}/pricing` },
  openGraph: {
    title: 'Membership — PHYZIK Pro',
    description: 'One membership. Every AI tool. Save 15% vs the App Store by subscribing here.',
    url: `${SITE_URL}/pricing`,
  },
}

export default function PricingPage() {
  const proAnnual = getPlan('pro_annual')
  const proMonthly = getPlan('pro_monthly')

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
              <div className="mx-auto flex max-w-[860px] flex-col items-center gap-7 text-center">
                <span className="text-[10.5px] font-bold uppercase tracking-[0.4em] text-text-tertiary">
                  Membership
                </span>

                <PhyzikMark sizeClass="h-9 w-auto md:h-12" priority />

                <h1 className="text-balance text-[clamp(2.75rem,6.5vw,5.5rem)] font-bold leading-[0.95] tracking-tightest text-text-primary">
                  One membership.
                  <br />
                  <span className="text-shimmer-gold">Everything AI.</span>
                </h1>

                <p className="max-w-[560px] text-[15.5px] leading-relaxed text-text-secondary md:text-[17px]">
                  Every AI tool in PHYZIK — food scanning, voice logging,
                  machine recognition. 15% cheaper here than in the App Store
                  because subscribing direct skips Apple&apos;s commission.
                </p>
              </div>
            </FadeUp>
          </Container>
        </section>

        {/* ─────────── PRICING CARD ─────────── */}
        <section className="relative pb-20 md:pb-28">
          <Container>
            <div className="mx-auto w-full max-w-[480px]">
              <FadeUp delay={0.05}>
                <div className="relative flex h-full flex-col overflow-hidden rounded-[28px] border border-accent/40 bg-bg-high/60 p-8 md:p-10">
                  {/* gold inset glow */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10"
                    style={{
                      background:
                        'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(184,151,106,0.18) 0%, transparent 60%)',
                    }}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent 0%, rgba(245,220,170,0.85) 50%, transparent 100%)',
                    }}
                  />

                  <div className="flex items-center gap-3">
                    <PhyzikMark sizeClass="h-6 w-auto" />
                    <span
                      className="text-[12px] font-bold uppercase tracking-[0.32em]"
                      style={{
                        background:
                          'linear-gradient(135deg, #d4b47c 0%, #f5dcaa 35%, #b8976a 70%, #997b54 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        color: 'transparent',
                      }}
                    >
                      Pro
                    </span>
                  </div>

                  <p className="mt-4 text-[14px] leading-relaxed text-text-tertiary">
                    The full AI stack. Everything you need to log a workout
                    without typing.
                  </p>

                  {/* Price */}
                  <div className="mt-8 flex items-baseline gap-2">
                    <span className="text-[40px] font-bold leading-none text-text-tertiary">
                      $
                    </span>
                    <span
                      className="font-bold leading-none tabular-nums tracking-tightest text-text-primary"
                      style={{
                        fontSize: 'clamp(4.5rem, 9vw, 6.5rem)',
                        textShadow:
                          '0 4px 32px rgba(184,151,106,0.25), 0 1px 0 rgba(255,255,255,0.04)',
                      }}
                    >
                      {proAnnual.webPrice.replace('$', '')}
                    </span>
                  </div>
                  <p className="mt-2 text-[12px] font-bold uppercase tracking-[0.28em] text-text-tertiary">
                    Per year · {perMonthEquivalent(proAnnual)}/mo equivalent
                  </p>
                  <p className="mt-2 text-[12.5px] text-text-tertiary">
                    Save {proAnnual.savingsPct}% vs the App Store&apos;s{' '}
                    {proAnnual.inAppPrice}/yr.
                  </p>

                  {/* Features */}
                  <ul className="mt-8 flex flex-col gap-3">
                    {PRO_FEATURES.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-[14.5px] leading-snug text-text-secondary"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-accent/60"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTAs */}
                  <div className="mt-auto flex flex-col gap-3 pt-10">
                    <Link
                      href={`/signup?plan=${proAnnual.id}`}
                      className="group relative inline-flex h-13 w-full items-center justify-center overflow-hidden rounded-full bg-accent py-3 text-[14px] font-semibold tracking-wide text-bg shadow-[0_22px_60px_-18px_rgba(184,151,106,0.55)] transition-all hover:bg-accent-dark hover:shadow-[0_22px_70px_-18px_rgba(184,151,106,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                    >
                      <span className="relative z-10">
                        Become a member · {proAnnual.webPrice}/yr
                      </span>
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-full group-hover:opacity-100"
                      />
                    </Link>
                    <Link
                      href={`/signup?plan=${proMonthly.id}`}
                      className="text-center text-[12.5px] text-text-tertiary transition-colors hover:text-accent"
                    >
                      Or {proMonthly.webPrice}/mo, billed monthly
                    </Link>
                  </div>
                </div>
              </FadeUp>
            </div>
          </Container>
        </section>

        {/* ─────────── MISSION ─────────── */}
        <section className="relative border-t border-border/60 py-20 md:py-28">
          <Container>
            <div className="mx-auto max-w-[820px]">
              <FadeUp>
                <span className="text-[10.5px] font-bold uppercase tracking-[0.36em] text-text-tertiary">
                  Why Pro
                </span>
              </FadeUp>

              <FadeUp delay={0.05}>
                <h2 className="mt-6 text-balance text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05] tracking-tightest text-text-primary">
                  Pay for what you{' '}
                  <span className="text-shimmer-gold">actually use.</span>
                </h2>
              </FadeUp>

              <FadeUp delay={0.1}>
                <div className="mt-8 space-y-5 text-[16px] leading-relaxed text-text-secondary md:text-[18px]">
                  <p>
                    One membership unlocks the whole AI stack — fast meal
                    logging, voice-driven workouts, machine recognition. No
                    add-ons, no upsells, no deciding which features you can
                    afford.
                  </p>
                  <p className="text-text-primary">
                    No margin on the membership. Subscription revenue covers
                    AI compute and infrastructure so PHYZIK stays free for the
                    lifters who can&apos;t afford to pay.
                  </p>
                </div>
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
                Features unlock the next time you open PHYZIK on your phone.
                No waiting, no activation period.
              </div>
              <div>
                <div className="mb-2 text-[10.5px] font-bold uppercase tracking-[0.22em] text-text-secondary">
                  Billed by Stripe
                </div>
                Card data never touches our servers. Receipts arrive in your
                inbox. Cancel anytime from your account page.
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
              keeps working — there&apos;s no need to switch.
            </p>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  )
}
