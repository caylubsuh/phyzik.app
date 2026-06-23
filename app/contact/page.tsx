import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import Container from '@/components/ui/Container'
import FadeUp from '@/components/motion/FadeUp'
import PhyzikMark from '@/components/brand/PhyzikMark'
import { INSTAGRAM_URL, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Get in Touch — Contact',
  description:
    'Contact PHYZIK. Reach us at admin@phyzik.app for support, brand and seller inquiries, press, and legal. Built by Physique Technologies LLC.',
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: 'Get in Touch — Contact PHYZIK',
    description: 'Reach PHYZIK for support, brand inquiries, press, and legal.',
    url: `${SITE_URL}/contact`,
  },
}

const REASONS = [
  {
    title: 'Support',
    body: 'App issues, account help, billing, or anything that broke. Email us and include your account email.',
    actionLabel: 'admin@phyzik.app',
    href: 'mailto:admin@phyzik.app?subject=PHYZIK%20Support',
    external: false,
  },
  {
    title: 'Brand & seller inquiries',
    body: 'Want to sell supplements, apparel, food, or equipment on PHYZIK Shop? Start with For Brands.',
    actionLabel: 'For Brands',
    href: '/for-brands',
    external: false,
  },
  {
    title: 'Press',
    body: 'Media requests, logos, screenshots, and the full media kit live on the press page.',
    actionLabel: 'Press kit',
    href: '/press',
    external: false,
  },
  {
    title: 'Legal & privacy',
    body: 'Privacy questions, data requests, and policy details are covered in our privacy policy.',
    actionLabel: 'Privacy policy',
    href: '/privacy',
    external: false,
  },
]

export default function ContactPage() {
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
        <section className="relative pb-12 pt-28 md:pb-16 md:pt-36">
          <Container>
            <FadeUp>
              <div className="mx-auto flex max-w-[860px] flex-col items-center gap-7 text-center">
                <span className="text-[10.5px] font-bold uppercase tracking-[0.4em] text-text-tertiary">
                  Contact
                </span>

                <PhyzikMark sizeClass="h-9 w-auto md:h-12" priority />

                <h1 className="text-balance text-[clamp(2.75rem,6.5vw,5.5rem)] font-bold leading-[0.95] tracking-tightest text-text-primary">
                  Get in touch.
                </h1>

                <p className="max-w-[520px] text-[15.5px] leading-relaxed text-text-secondary md:text-[17px]">
                  One inbox for everything — support, partnerships, press, and
                  legal. We read every message.
                </p>
              </div>
            </FadeUp>
          </Container>
        </section>

        {/* ─────────── PRIMARY EMAIL CARD ─────────── */}
        <section className="relative pb-20 md:pb-28">
          <Container>
            <div className="mx-auto w-full max-w-[760px]">
              <FadeUp delay={0.05}>
                <a
                  href="mailto:admin@phyzik.app"
                  data-track="contact-email-primary"
                  className="group relative block overflow-hidden rounded-[3px] border border-accent/40 bg-bg-high/60 p-9 transition-colors hover:border-accent/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg md:p-12"
                >
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
                        'radial-gradient(ellipse 80% 70% at 50% 0%, rgba(184,151,106,0.16) 0%, transparent 60%)',
                    }}
                  />
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.3em] text-text-tertiary">
                    Email us
                  </span>
                  <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-2">
                    <span
                      className="font-display text-[clamp(1.75rem,5vw,3rem)] font-bold leading-none tracking-tightest"
                      style={{
                        background:
                          'linear-gradient(135deg, #E8D9A8 0%, #C9A94E 38%, #A8892E 70%, #856A1F 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        color: 'transparent',
                      }}
                    >
                      admin@phyzik.app
                    </span>
                  </div>
                  <p className="mt-5 max-w-[460px] text-[14.5px] leading-relaxed text-text-secondary">
                    The fastest way to reach us. Tell us what you need and we
                    will route it to the right place.
                  </p>
                  <span className="mt-7 inline-flex items-center gap-2 text-[13px] font-semibold text-accent transition-colors group-hover:text-accent-bright">
                    Compose email
                    <span
                      aria-hidden="true"
                      className="transition-transform group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </span>
                </a>
              </FadeUp>

              {/* Instagram + company row */}
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <FadeUp delay={0.1}>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener"
                    data-track="contact-instagram"
                    className="group flex h-full flex-col justify-between gap-6 rounded-[3px] border border-border/70 bg-bg-low/60 p-7 transition-colors hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg md:p-8"
                  >
                    <div>
                      <span className="text-[10.5px] font-bold uppercase tracking-[0.26em] text-text-tertiary">
                        Instagram
                      </span>
                      <p className="mt-3 text-[18px] font-bold tracking-tighter text-text-primary">
                        @phyzik.app
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-accent transition-colors group-hover:text-accent-bright">
                      Follow
                      <span
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-x-1"
                      >
                        &rarr;
                      </span>
                    </span>
                  </a>
                </FadeUp>

                <FadeUp delay={0.15}>
                  <div className="flex h-full flex-col justify-between gap-6 rounded-[3px] border border-border/70 bg-bg-low/60 p-7 md:p-8">
                    <div>
                      <span className="text-[10.5px] font-bold uppercase tracking-[0.26em] text-text-tertiary">
                        Company
                      </span>
                      <p className="mt-3 text-[18px] font-bold tracking-tighter text-text-primary">
                        Physique Technologies LLC
                      </p>
                    </div>
                    <p className="text-[13px] leading-relaxed text-text-tertiary">
                      The team behind PHYZIK.
                    </p>
                  </div>
                </FadeUp>
              </div>
            </div>
          </Container>
        </section>

        {/* ─────────── CONTACT REASONS ─────────── */}
        <section className="relative border-t border-border/60 py-20 md:py-28">
          <Container>
            <div className="mx-auto max-w-[820px]">
              <FadeUp>
                <span className="text-[10.5px] font-bold uppercase tracking-[0.36em] text-text-tertiary">
                  Where to start
                </span>
              </FadeUp>
              <FadeUp delay={0.05}>
                <h2 className="mt-6 text-balance text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05] tracking-tightest text-text-primary">
                  Pick the right{' '}
                  <span className="text-shimmer-gold">door.</span>
                </h2>
              </FadeUp>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
              {REASONS.map((reason, i) => (
                <FadeUp key={reason.title} delay={0.05 * i}>
                  <Link
                    href={reason.href}
                    {...(reason.external
                      ? { target: '_blank', rel: 'noopener' }
                      : {})}
                    className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-[3px] border border-border/70 bg-bg-low/60 p-7 transition-colors hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg md:p-8"
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity group-hover:opacity-100"
                      style={{
                        background:
                          'linear-gradient(90deg, transparent 0%, rgba(201,169,78,0.6) 50%, transparent 100%)',
                      }}
                    />
                    <h3 className="text-[18px] font-bold tracking-tighter text-text-primary">
                      {reason.title}
                    </h3>
                    <p className="text-[14.5px] leading-relaxed text-text-secondary">
                      {reason.body}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-2 text-[13px] font-semibold text-accent transition-colors group-hover:text-accent-bright">
                      {reason.actionLabel}
                      <span
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-x-1"
                      >
                        &rarr;
                      </span>
                    </span>
                  </Link>
                </FadeUp>
              ))}
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  )
}
