import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import FadeUp from '@/components/motion/FadeUp'
import { ShopLockup } from '@/components/brand/BrandMarks'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Sell on PHYZIK — For Brands',
  description:
    'Reach serious lifters where every post is a real workout. List supplements, apparel, food, and equipment on PHYZIK Shop with shoppable posts tied to training. Apply to sell.',
  alternates: { canonical: `${SITE_URL}/for-brands` },
  openGraph: {
    title: 'Sell on PHYZIK — For Brands',
    description:
      'An audience of serious lifters. Shoppable posts tied to real training. Apply to sell on PHYZIK Shop.',
    url: `${SITE_URL}/for-brands`,
  },
}

const APPLY_MAILTO =
  'mailto:admin@phyzik.app?subject=PHYZIK%20Shop%20%E2%80%94%20Brand%20application'

const REACH = [
  {
    title: 'Buyers who actually train',
    body: 'Every PHYZIK post is a logged workout — sets, weight, PRs. No lifestyle filler. You reach people in the gym, mid-program, deciding what to buy next.',
  },
  {
    title: 'Shoppable posts tied to training',
    body: 'Products surface in context — next to the workouts, athletes, and routines that use them. Intent is already there before the buyer sees your listing.',
  },
  {
    title: 'A focused, serious audience',
    body: 'Lifters chasing real progression, not a general fitness crowd. Higher intent, lower noise, and a feed built entirely around training.',
  },
]

const STEPS = [
  {
    n: '01',
    title: 'Apply',
    body: 'Send us your brand, catalog, and category. We review for fit, quality, and compliance with our seller standards.',
  },
  {
    n: '02',
    title: 'Onboard with Stripe Connect',
    body: 'Verify your business and banking through Stripe Connect. This is what enables payouts directly to your account.',
  },
  {
    n: '03',
    title: 'List products',
    body: 'Add your catalog — titles, variants, pricing, inventory, and imagery. Listings go live across PHYZIK Shop and shoppable posts.',
  },
  {
    n: '04',
    title: 'Fulfill & get paid',
    body: 'You ship orders as the seller of record. PHYZIK collects payment, deducts commission, and remits the balance to your Stripe account.',
  },
]

const COMMISSION = [
  { category: 'Supplements', rate: '15%' },
  { category: 'Apparel', rate: '12%' },
  { category: 'Food', rate: '12%' },
  { category: 'Equipment', rate: '10%' },
]

const REQUIREMENTS = [
  {
    title: 'Supplements',
    body: 'A current certificate of insurance and product claims that are DSHEA-compliant. No disease or drug claims.',
  },
  {
    title: 'All categories',
    body: 'Legitimate business in good standing, accurate listings, and the ability to lawfully sell and ship what you list.',
  },
  {
    title: 'Fulfillment',
    body: 'You are the seller of record — responsible for shipping, support, returns, chargebacks, and disputes on your orders.',
  },
]

export default function ForBrandsPage() {
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
        <section className="relative pb-14 pt-28 md:pb-20 md:pt-36">
          <Container>
            <FadeUp>
              <div className="mx-auto flex max-w-[920px] flex-col items-center gap-7 text-center">
                <span className="text-[10.5px] font-bold uppercase tracking-[0.4em] text-text-tertiary">
                  For Brands
                </span>

                <ShopLockup sizeClass="h-14 w-auto md:h-20" priority />

                <h1 className="text-balance text-[clamp(2.75rem,6.5vw,5.5rem)] font-bold leading-[0.95] tracking-tightest text-text-primary">
                  Sell where every post
                  <br />
                  <span className="text-shimmer-gold">is a real workout.</span>
                </h1>

                <p className="max-w-[600px] text-[15.5px] leading-relaxed text-text-secondary md:text-[17px]">
                  PHYZIK is a training app for serious lifters — every post a
                  logged session. Put your supplements, apparel, food, and
                  equipment in front of buyers who are already in the gym,
                  through shoppable posts tied to real training.
                </p>

                <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
                  <Button variant="gold" size="lg" asChild>
                    <a href={APPLY_MAILTO}>Apply to sell</a>
                  </Button>
                  <Button variant="secondary" size="lg" asChild>
                    <Link href="/merchant">Go to merchant portal</Link>
                  </Button>
                </div>
              </div>
            </FadeUp>
          </Container>
        </section>

        {/* ─────────── REACH ─────────── */}
        <section className="relative border-t border-border/60 py-20 md:py-28">
          <Container>
            <div className="mx-auto max-w-[820px]">
              <FadeUp>
                <span className="text-[10.5px] font-bold uppercase tracking-[0.36em] text-text-tertiary">
                  The audience
                </span>
              </FadeUp>
              <FadeUp delay={0.05}>
                <h2 className="mt-6 text-balance text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05] tracking-tightest text-text-primary">
                  Reach lifters,{' '}
                  <span className="text-shimmer-gold">not a feed.</span>
                </h2>
              </FadeUp>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-[3px] border border-border/70 bg-border/40 md:grid-cols-3">
              {REACH.map((item, i) => (
                <FadeUp key={item.title} delay={0.05 * i}>
                  <div className="flex h-full flex-col gap-3 bg-bg-low/80 p-7 md:p-8">
                    <span
                      aria-hidden="true"
                      className="h-1 w-8 rounded-[1px]"
                      style={{
                        background:
                          'linear-gradient(90deg, #C9A94E 0%, #A8892E 100%)',
                      }}
                    />
                    <h3 className="text-[18px] font-bold tracking-tighter text-text-primary">
                      {item.title}
                    </h3>
                    <p className="text-[14.5px] leading-relaxed text-text-secondary">
                      {item.body}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </Container>
        </section>

        {/* ─────────── HOW IT WORKS ─────────── */}
        <section className="relative border-t border-border/60 py-20 md:py-28">
          <Container>
            <div className="mx-auto max-w-[820px]">
              <FadeUp>
                <span className="text-[10.5px] font-bold uppercase tracking-[0.36em] text-text-tertiary">
                  How it works
                </span>
              </FadeUp>
              <FadeUp delay={0.05}>
                <h2 className="mt-6 text-balance text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05] tracking-tightest text-text-primary">
                  From apply to{' '}
                  <span className="text-shimmer-gold">payout.</span>
                </h2>
              </FadeUp>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
              {STEPS.map((step, i) => (
                <FadeUp key={step.n} delay={0.05 * i}>
                  <div className="group relative flex h-full gap-5 overflow-hidden rounded-[3px] border border-border/70 bg-bg-low/60 p-7 transition-colors hover:border-accent/40 md:p-8">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity group-hover:opacity-100"
                      style={{
                        background:
                          'linear-gradient(90deg, transparent 0%, rgba(201,169,78,0.6) 50%, transparent 100%)',
                      }}
                    />
                    <span
                      className="shrink-0 font-display text-[40px] font-bold leading-none tracking-tightest"
                      style={{
                        background:
                          'linear-gradient(135deg, #E8D9A8 0%, #C9A94E 38%, #A8892E 70%, #856A1F 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        color: 'transparent',
                      }}
                    >
                      {step.n}
                    </span>
                    <div className="flex flex-col gap-2 pt-1">
                      <h3 className="text-[18px] font-bold tracking-tighter text-text-primary">
                        {step.title}
                      </h3>
                      <p className="text-[14.5px] leading-relaxed text-text-secondary">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </Container>
        </section>

        {/* ─────────── COMMISSION ─────────── */}
        <section className="relative border-t border-border/60 py-20 md:py-28">
          <Container>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
              <div className="max-w-[460px]">
                <FadeUp>
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.36em] text-text-tertiary">
                    Commission
                  </span>
                </FadeUp>
                <FadeUp delay={0.05}>
                  <h2 className="mt-6 text-balance text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05] tracking-tightest text-text-primary">
                    Simple rates,{' '}
                    <span className="text-shimmer-gold">by category.</span>
                  </h2>
                </FadeUp>
                <FadeUp delay={0.1}>
                  <p className="mt-6 text-[15px] leading-relaxed text-text-secondary md:text-[16px]">
                    One commission per category, plus standard payment
                    processing. No listing fees, no monthly platform fee.
                    Payouts are sent to your connected Stripe account — PHYZIK
                    is the marketplace facilitator and collects payment on your
                    behalf.
                  </p>
                </FadeUp>
              </div>

              <FadeUp delay={0.05}>
                <div className="relative overflow-hidden rounded-[3px] border border-accent/40 bg-bg-high/60">
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent 0%, rgba(245,220,170,0.85) 50%, transparent 100%)',
                    }}
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10"
                    style={{
                      background:
                        'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(184,151,106,0.16) 0%, transparent 60%)',
                    }}
                  />
                  <div className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-border/70 px-7 py-4 md:px-8">
                    <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-text-tertiary">
                      Category
                    </span>
                    <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-text-tertiary">
                      Commission
                    </span>
                  </div>
                  {COMMISSION.map((row) => (
                    <div
                      key={row.category}
                      className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-border/50 px-7 py-5 last:border-b-0 md:px-8"
                    >
                      <span className="text-[16px] font-semibold tracking-tight text-text-primary">
                        {row.category}
                      </span>
                      <span
                        className="font-display text-[26px] font-bold leading-none tabular-nums tracking-tightest"
                        style={{
                          background:
                            'linear-gradient(135deg, #E8D9A8 0%, #C9A94E 40%, #A8892E 75%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          color: 'transparent',
                        }}
                      >
                        {row.rate}
                      </span>
                    </div>
                  ))}
                  <div className="px-7 py-4 md:px-8">
                    <p className="text-[12.5px] leading-relaxed text-text-tertiary">
                      Plus standard payment processing. Payouts via Stripe
                      Connect.
                    </p>
                  </div>
                </div>
              </FadeUp>
            </div>
          </Container>
        </section>

        {/* ─────────── REQUIREMENTS ─────────── */}
        <section className="relative border-t border-border/60 py-20 md:py-28">
          <Container>
            <div className="mx-auto max-w-[820px]">
              <FadeUp>
                <span className="text-[10.5px] font-bold uppercase tracking-[0.36em] text-text-tertiary">
                  Requirements
                </span>
              </FadeUp>
              <FadeUp delay={0.05}>
                <h2 className="mt-6 text-balance text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05] tracking-tightest text-text-primary">
                  What we ask of{' '}
                  <span className="text-shimmer-gold">sellers.</span>
                </h2>
              </FadeUp>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
              {REQUIREMENTS.map((item, i) => (
                <FadeUp key={item.title} delay={0.05 * i}>
                  <div className="flex h-full flex-col gap-3 rounded-[3px] border border-border/70 bg-bg-low/60 p-7 md:p-8">
                    <h3 className="text-[16px] font-bold tracking-tighter text-text-primary">
                      {item.title}
                    </h3>
                    <p className="text-[14px] leading-relaxed text-text-secondary">
                      {item.body}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={0.1}>
              <p className="mx-auto mt-10 max-w-[820px] text-[13px] leading-relaxed text-text-tertiary">
                Full terms — including compliance, payouts, and fulfillment
                obligations — are in the{' '}
                <Link
                  href="/legal/seller-agreement"
                  className="text-accent underline decoration-1 underline-offset-2 transition-colors hover:text-accent-bright"
                >
                  Seller Agreement
                </Link>
                .
              </p>
            </FadeUp>
          </Container>
        </section>

        {/* ─────────── FINAL CTA ─────────── */}
        <section className="relative border-t border-border/60 py-24 md:py-32">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[920px] -translate-x-1/2 -translate-y-1/2 opacity-80 blur-3xl"
            style={{
              background:
                'radial-gradient(ellipse 50% 55% at 50% 50%, rgba(184,151,106,0.18) 0%, transparent 70%)',
            }}
          />
          <Container>
            <FadeUp>
              <div className="mx-auto flex max-w-[720px] flex-col items-center gap-7 text-center">
                <h2 className="text-balance text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1] tracking-tightest text-text-primary">
                  Put your brand on{' '}
                  <span className="text-shimmer-gold">the floor.</span>
                </h2>
                <p className="max-w-[520px] text-[15.5px] leading-relaxed text-text-secondary md:text-[17px]">
                  Tell us about your catalog and category. We review every
                  brand for fit and compliance before onboarding.
                </p>
                <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
                  <Button variant="gold" size="lg" asChild>
                    <a href={APPLY_MAILTO}>Apply to sell</a>
                  </Button>
                  <Button variant="ghost" size="lg" asChild>
                    <Link href="/merchant">Merchant portal</Link>
                  </Button>
                </div>
                <p className="text-[12.5px] text-text-tertiary">
                  Questions? Email{' '}
                  <a
                    href="mailto:admin@phyzik.app"
                    className="text-accent underline decoration-1 underline-offset-2 transition-colors hover:text-accent-bright"
                  >
                    admin@phyzik.app
                  </a>
                </p>
              </div>
            </FadeUp>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  )
}
