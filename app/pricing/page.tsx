import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Check } from 'lucide-react'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import Container from '@/components/ui/Container'
import FadeUp from '@/components/motion/FadeUp'
import { getPlan, perMonthEquivalent, PRO_FEATURES } from '@/lib/pricing'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Membership — PHYZIK Pro',
  description:
    'PHYZIK Pro unlocks the full platform — from $4.25/mo billed annually, or $5.99 month to month. Subscribe on the web and save 15% vs the App Store.',
  alternates: { canonical: `${SITE_URL}/pricing` },
  openGraph: {
    title: 'Membership — PHYZIK Pro',
    description: 'One membership. The whole platform unlocked. Save by subscribing on the web.',
    url: `${SITE_URL}/pricing`,
  },
}

export default function PricingPage() {
  const proAnnual = getPlan('pro_annual')
  const proMonthly = getPlan('pro_monthly')
  const perMonth = perMonthEquivalent(proAnnual) // "$4.25"

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
              'radial-gradient(ellipse 70% 45% at 50% 0%, rgba(168,137,46,0.16) 0%, transparent 60%), linear-gradient(180deg, #0A0A0B 0%, #050506 100%)',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[8%] -z-20 h-[720px] w-[1100px] -translate-x-1/2 animate-slow-drift opacity-90 blur-3xl"
          style={{
            background:
              'radial-gradient(ellipse 50% 55% at 50% 50%, rgba(168,137,46,0.20) 0%, rgba(168,137,46,0.06) 35%, transparent 70%)',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[14vh] -z-10 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(168,137,46,0.30) 50%, transparent 100%)',
          }}
        />

        {/* ─────────── HERO ─────────── */}
        <section className="relative pb-12 pt-28 md:pb-16 md:pt-36">
          <Container>
            <FadeUp>
              <div className="mx-auto flex max-w-[760px] flex-col items-center gap-6 text-center">
                <span className="text-[10.5px] font-bold uppercase tracking-[0.4em] text-text-tertiary">
                  Membership
                </span>
                <h1 className="text-balance font-display text-[clamp(2.75rem,6.5vw,5.25rem)] font-extrabold leading-[0.95] tracking-tightest text-text-primary">
                  One membership.
                  <br />
                  <span className="text-shimmer-gold">The whole platform.</span>
                </h1>
                <p className="max-w-[540px] text-[15.5px] leading-relaxed text-text-secondary md:text-[17px]">
                  PHYZIK is free to start. Pro unlocks everything — the full
                  tracker, nutrition, analytics, and the capture tools — for less
                  than a protein shake a month.
                </p>
              </div>
            </FadeUp>
          </Container>
        </section>

        {/* ─────────── PRICING CARD ─────────── */}
        <section className="relative pb-20 md:pb-28">
          <Container>
            <FadeUp delay={0.05}>
              <div className="mx-auto w-full max-w-[440px] overflow-hidden rounded-[10px] border border-accent/30 bg-bg-high/50 shadow-[0_40px_120px_-40px_rgba(168,137,46,0.35)]">
                {/* gold top hairline */}
                <div
                  aria-hidden="true"
                  className="h-px w-full"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent 0%, rgba(245,228,176,0.8) 50%, transparent 100%)',
                  }}
                />

                {/* Identity + price */}
                <div className="relative p-8 md:p-10">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10"
                    style={{
                      background:
                        'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(168,137,46,0.14) 0%, transparent 60%)',
                    }}
                  />

                  <div className="flex items-center gap-3">
                    <Image
                      src="/brand/phyzik-wordmark-white.png"
                      alt="PHYZIK"
                      width={2046}
                      height={307}
                      draggable={false}
                      sizes="120px"
                      className="h-5 w-auto select-none"
                    />
                    <span className="rounded-[3px] border border-accent/50 px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.24em] text-accent">
                      Pro
                    </span>
                  </div>

                  <div className="mt-7 flex items-end gap-1.5">
                    <span className="mb-2 text-[26px] font-bold leading-none text-text-tertiary">
                      $
                    </span>
                    <span className="font-display text-[68px] font-extrabold leading-[0.85] tracking-tightest text-text-primary">
                      {perMonth.replace('$', '')}
                    </span>
                    <span className="mb-2.5 text-[17px] font-semibold text-text-secondary">
                      /mo
                    </span>
                  </div>

                  <p className="mt-3 text-[13.5px] leading-relaxed text-text-secondary">
                    Billed annually at {proAnnual.webPrice} —{' '}
                    <span className="text-accent">
                      save {proAnnual.savingsPct}% vs the App Store.
                    </span>
                  </p>

                  <Link
                    href={`/signup?plan=${proAnnual.id}`}
                    className="group relative mt-7 inline-flex h-12 w-full items-center justify-center overflow-hidden rounded-[3px] text-[14.5px] font-semibold tracking-wide text-bg transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                    style={{
                      background:
                        'linear-gradient(135deg, #E8D9A8 0%, #C9A94E 38%, #A8892E 70%, #856A1F 100%)',
                      boxShadow: '0 18px 48px -16px rgba(168,137,46,0.55)',
                    }}
                  >
                    Start membership
                  </Link>

                  <Link
                    href={`/signup?plan=${proMonthly.id}`}
                    className="mt-3 block text-center text-[12.5px] text-text-tertiary transition-colors hover:text-accent"
                  >
                    Prefer monthly? {proMonthly.webPrice}/mo
                  </Link>
                </div>

                {/* Features */}
                <div className="border-t border-border/60 p-8 md:p-10">
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.26em] text-text-tertiary">
                    Everything in Pro
                  </span>
                  <ul className="mt-6 flex flex-col gap-4">
                    {PRO_FEATURES.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-[3px] bg-accent/15 text-accent">
                          <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                        </span>
                        <span className="text-[14.5px] leading-snug text-text-secondary">
                          {feature}
                        </span>
                      </li>
                    ))}
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-[3px] bg-accent/15 text-accent">
                        <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                      </span>
                      <span className="text-[14.5px] leading-snug text-text-secondary">
                        The full analytics suite, unlimited history, and every
                        new feature as it ships.
                      </span>
                    </li>
                  </ul>
                  <p className="mt-7 text-[12px] leading-relaxed text-text-tertiary">
                    Cancel anytime. Billed securely by Stripe on the web, or via
                    Apple / Google in the app (7-day free trial on mobile).
                  </p>
                </div>
              </div>
            </FadeUp>
          </Container>
        </section>

        {/* ─────────── Fine print strip ─────────── */}
        <section className="border-t border-border/60 py-14">
          <Container>
            <div className="mx-auto grid max-w-[860px] grid-cols-1 gap-8 text-[12.5px] leading-relaxed text-text-tertiary md:grid-cols-3 md:gap-10">
              <div>
                <div className="mb-2 text-[10.5px] font-bold uppercase tracking-[0.22em] text-text-secondary">
                  Unlocks instantly
                </div>
                Your membership activates the next time you open PHYZIK on your
                phone. No waiting, no activation period.
              </div>
              <div>
                <div className="mb-2 text-[10.5px] font-bold uppercase tracking-[0.22em] text-text-secondary">
                  Cheaper on the web
                </div>
                Subscribing here saves {proAnnual.savingsPct}% versus the App
                Store, because the web checkout skips Apple&apos;s commission.
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
