import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import Container from '@/components/ui/Container'
import FadeUp from '@/components/motion/FadeUp'
import PhyzikMark from '@/components/brand/PhyzikMark'
import {
  getPlan,
  perMonthEquivalent,
  PRO_FEATURES,
  PRO_MAX_DELTA_FEATURES,
} from '@/lib/pricing'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Membership — PHYZIK Pro & Pro Max',
  description:
    'Two tiers. Pro from $5.99/mo unlocks AI food scanning, voice workout logging, and exercise camera ID. Pro Max from $9.34/mo adds AI Coach chat and personalized insights. Save 15% vs the App Store.',
  alternates: { canonical: `${SITE_URL}/pricing` },
  openGraph: {
    title: 'Membership — PHYZIK Pro & Pro Max',
    description:
      'Two tiers. Save 15% vs the App Store by subscribing here.',
    url: `${SITE_URL}/pricing`,
  },
}

export default function PricingPage() {
  const proAnnual = getPlan('pro_annual')
  const proMonthly = getPlan('pro_monthly')
  const proMaxAnnual = getPlan('pro_max_annual')
  const proMaxMonthly = getPlan('pro_max_monthly')

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
                  Two tiers.
                  <br />
                  <span className="text-shimmer-gold">
                    Pick how deep you go.
                  </span>
                </h1>

                <p className="max-w-[560px] text-[15.5px] leading-relaxed text-text-secondary md:text-[17px]">
                  Pro for the AI capture tools. Pro Max for the coaching brain
                  on top. Both are 15% cheaper here than in the App Store
                  because subscribing direct skips Apple&apos;s commission.
                </p>
              </div>
            </FadeUp>
          </Container>
        </section>

        {/* ─────────── TIER CARDS ─────────── */}
        <section className="relative pb-20 md:pb-28">
          <Container>
            <div className="mx-auto grid w-full max-w-[1080px] grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
              {/* ─── PRO CARD ─── */}
              <FadeUp delay={0.05}>
                <div className="relative flex h-full flex-col overflow-hidden rounded-[28px] border border-border bg-bg-high/40 p-8 md:p-10">
                  {/* subtle gold hairline at top */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent 0%, rgba(184,151,106,0.30) 50%, transparent 100%)',
                    }}
                  />

                  <div className="flex items-center gap-3">
                    <PhyzikMark sizeClass="h-6 w-auto" />
                    <span className="text-[12px] font-bold uppercase tracking-[0.32em] text-text-secondary">
                      Pro
                    </span>
                  </div>

                  <p className="mt-4 text-[14px] leading-relaxed text-text-tertiary">
                    The AI capture stack. Everything you need to log without
                    typing.
                  </p>

                  {/* Price */}
                  <div className="mt-8 flex items-baseline gap-2">
                    <span className="text-[40px] font-bold leading-none text-text-tertiary">
                      $
                    </span>
                    <span
                      className="font-bold leading-none tabular-nums tracking-tightest text-text-primary"
                      style={{ fontSize: 'clamp(4.5rem, 9vw, 6.5rem)' }}
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
                      className="group relative inline-flex h-13 w-full items-center justify-center overflow-hidden rounded-full border border-accent/40 bg-transparent py-3 text-[14px] font-semibold tracking-wide text-text-primary transition-all hover:border-accent hover:bg-accent/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                    >
                      Start with Pro · {proAnnual.webPrice}/yr
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

              {/* ─── PRO MAX CARD (highlighted) ─── */}
              <FadeUp delay={0.1}>
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

                  {/* Badge */}
                  <div className="absolute right-6 top-6">
                    <span
                      className="rounded-full border border-accent/60 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em]"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(184,151,106,0.15) 0%, rgba(245,220,170,0.10) 100%)',
                        color: '#f5dcaa',
                      }}
                    >
                      Most complete
                    </span>
                  </div>

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
                      Pro Max
                    </span>
                  </div>

                  <p className="mt-4 text-[14px] leading-relaxed text-text-tertiary">
                    Everything in Pro, plus the coaching brain that learns from
                    every workout you log.
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
                      {proMaxAnnual.webPrice.replace('$', '')}
                    </span>
                  </div>
                  <p className="mt-2 text-[12px] font-bold uppercase tracking-[0.28em] text-text-tertiary">
                    Per year · {perMonthEquivalent(proMaxAnnual)}/mo equivalent
                  </p>
                  <p className="mt-2 text-[12.5px] text-text-tertiary">
                    Save {proMaxAnnual.savingsPct}% vs the App Store&apos;s{' '}
                    {proMaxAnnual.inAppPrice}/yr.
                  </p>

                  {/* Features — show Pro first, then "+ Pro Max" */}
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

                  <div className="mt-6 flex items-center gap-3">
                    <span className="h-px flex-1 bg-border" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent/80">
                      + Pro Max
                    </span>
                    <span className="h-px flex-1 bg-border" />
                  </div>

                  <ul className="mt-6 flex flex-col gap-3">
                    {PRO_MAX_DELTA_FEATURES.map((feature) => (
                      <li
                        key={feature}
                        data-tier="pro-max"
                        className="flex items-start gap-3 text-[14.5px] leading-snug text-text-primary"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full"
                          style={{ backgroundColor: '#f5dcaa' }}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTAs */}
                  <div className="mt-auto flex flex-col gap-3 pt-10">
                    <Link
                      href={`/signup?plan=${proMaxAnnual.id}`}
                      className="group relative inline-flex h-13 w-full items-center justify-center overflow-hidden rounded-full bg-accent py-3 text-[14px] font-semibold tracking-wide text-bg shadow-[0_22px_60px_-18px_rgba(184,151,106,0.55)] transition-all hover:bg-accent-dark hover:shadow-[0_22px_70px_-18px_rgba(184,151,106,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                    >
                      <span className="relative z-10">
                        Become a Pro Max member · {proMaxAnnual.webPrice}/yr
                      </span>
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-full group-hover:opacity-100"
                      />
                    </Link>
                    <Link
                      href={`/signup?plan=${proMaxMonthly.id}`}
                      className="text-center text-[12.5px] text-text-tertiary transition-colors hover:text-accent"
                    >
                      Or {proMaxMonthly.webPrice}/mo, billed monthly
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
                  Why two tiers
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
                    Most lifters need the capture tools — fast meal logging,
                    voice-driven workouts, machine recognition. That&apos;s
                    Pro. If you want the AI to talk back, build context, and
                    actually coach you between sessions, that&apos;s Pro Max.
                  </p>
                  <p>
                    Pro Max is also what we ship new AI features into first.
                    Voice modes, new coach personalities, smarter weekly
                    check-ins — Pro Max members get them weeks before they
                    ever appear on Pro.
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
                No surprise increases for 12 months from your first charge on
                either tier.
              </div>
            </div>

            <p className="mx-auto mt-12 max-w-[860px] text-[12px] leading-relaxed text-text-tertiary/80">
              Already subscribed via the App Store? Your existing subscription
              keeps working — there&apos;s no need to switch. You can upgrade
              from Pro to Pro Max at any time from inside the app.
            </p>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  )
}
