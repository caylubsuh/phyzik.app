import type { Metadata } from 'next'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import Container from '@/components/ui/Container'
import FadeUp from '@/components/motion/FadeUp'
import AppStoreBadge from '@/components/ui/AppStoreBadge'
import QRCode from '@/components/ui/QRCode'
import PhyzikMark from '@/components/brand/PhyzikMark'
import { APP_STORE_URL, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Get PHYZIK — Download',
  description:
    'Download PHYZIK on iOS and Android. The social training app built for lifters — track every workout, follow real athletes, and compete.',
  alternates: { canonical: `${SITE_URL}/download` },
  openGraph: {
    title: 'Get PHYZIK — Download',
    description: 'Download PHYZIK on iOS and Android.',
    url: `${SITE_URL}/download`,
  },
}

const PLATFORMS = [
  {
    title: 'iOS',
    body: 'iPhone, App Store. Optimized for iOS 16 and later.',
    status: 'Available now',
    live: true,
  },
  {
    title: 'Android',
    body: 'Phones running Android 9 and later, via the Play Store.',
    status: 'Available now',
    live: true,
  },
]

export default function DownloadPage() {
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
        <section className="relative pb-16 pt-28 md:pb-24 md:pt-36">
          <Container>
            <FadeUp>
              <div className="mx-auto flex max-w-[860px] flex-col items-center gap-7 text-center">
                <span className="text-[10.5px] font-bold uppercase tracking-[0.4em] text-text-tertiary">
                  Download
                </span>

                <PhyzikMark sizeClass="h-9 w-auto md:h-12" priority />

                <h1 className="text-balance text-[clamp(2.75rem,6.5vw,5.5rem)] font-bold leading-[0.95] tracking-tightest text-text-primary">
                  Get PHYZIK.
                  <br />
                  <span className="text-shimmer-gold">Start training.</span>
                </h1>

                <p className="max-w-[540px] text-[15.5px] leading-relaxed text-text-secondary md:text-[17px]">
                  The social training app built for lifters. Track every
                  workout, follow real athletes, and compete. Free to download
                  on iOS and Android.
                </p>

                {/* Badges */}
                <div className="mt-3 flex flex-col items-center gap-4 sm:flex-row sm:gap-5">
                  <AppStoreBadge size="lg" />

                  {/* Google Play badge */}
                  <a
                    href="#"
                    aria-label="Get it on Google Play"
                    data-track="google-play-badge"
                    className="group inline-flex h-14 items-center gap-3 rounded-xl bg-black px-5 text-white transition-colors hover:bg-[#1C1C1F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-7 w-7 shrink-0"
                      aria-hidden="true"
                    >
                      <path
                        fill="#34A853"
                        d="M3.6 2.4 13.4 12 3.6 21.6c-.36-.2-.6-.58-.6-1.05V3.45c0-.47.24-.85.6-1.05z"
                        opacity="0"
                      />
                      <path
                        fill="currentColor"
                        d="M3.05 2.3a1.2 1.2 0 0 0-.35.86v17.68c0 .35.13.66.35.86l9.34-9.7-9.34-9.7z"
                      />
                      <path
                        fill="currentColor"
                        d="m16.4 8.62-3.04-1.76L4.1 1.86c-.2-.12-.4-.18-.6-.18l9.18 9.53 3.72-2.59z"
                      />
                      <path
                        fill="currentColor"
                        d="m19.7 11.04-2.6-1.5-3.96 2.46 3.96 2.46 2.6-1.5c.78-.45.78-1.47 0-1.92z"
                      />
                      <path
                        fill="currentColor"
                        d="m12.68 12-9.18 9.53c.2 0 .4-.06.6-.18l12.3-7.13-3.72-2.22z"
                      />
                    </svg>
                    <span className="flex flex-col items-start leading-none">
                      <span className="text-[10px] font-medium uppercase tracking-wide opacity-90">
                        Get it on
                      </span>
                      <span className="text-[19px] font-semibold tracking-tight">
                        Google Play
                      </span>
                    </span>
                  </a>
                </div>

                <p className="text-[12px] text-text-tertiary">
                  Coming to Google Play (confirm)
                </p>
              </div>
            </FadeUp>

            {/* QR */}
            <FadeUp delay={0.1}>
              <div className="mt-14 flex justify-center">
                <QRCode size={150} hideOnMobile />
              </div>
            </FadeUp>
          </Container>
        </section>

        {/* ─────────── PLATFORM AVAILABILITY ─────────── */}
        <section className="relative border-t border-border/60 py-20 md:py-28">
          <Container>
            <div className="mx-auto max-w-[820px]">
              <FadeUp>
                <span className="text-[10.5px] font-bold uppercase tracking-[0.36em] text-text-tertiary">
                  Availability
                </span>
              </FadeUp>
              <FadeUp delay={0.05}>
                <h2 className="mt-6 text-balance text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05] tracking-tightest text-text-primary">
                  On every phone in{' '}
                  <span className="text-shimmer-gold">your gym.</span>
                </h2>
              </FadeUp>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
              {PLATFORMS.map((p, i) => (
                <FadeUp key={p.title} delay={0.05 * i}>
                  <div className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-[3px] border border-border/70 bg-bg-low/60 p-7 transition-colors hover:border-accent/40 md:p-8">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-[22px] font-bold tracking-tightest text-text-primary">
                        {p.title}
                      </h3>
                      <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-accent-bright">
                        <span
                          aria-hidden="true"
                          className="inline-block h-1.5 w-1.5 rounded-full bg-accent-bright"
                        />
                        {p.status}
                      </span>
                    </div>
                    <p className="text-[14.5px] leading-relaxed text-text-secondary">
                      {p.body}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </Container>
        </section>

        {/* ─────────── DEEP LINK NOTE ─────────── */}
        <section className="relative border-t border-border/60 py-20 md:py-28">
          <Container>
            <div className="mx-auto max-w-[820px]">
              <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-14">
                <FadeUp>
                  <div>
                    <span className="text-[10.5px] font-bold uppercase tracking-[0.36em] text-text-tertiary">
                      Universal links
                    </span>
                    <h3 className="mt-5 text-[20px] font-bold tracking-tighter text-text-primary">
                      Links open the app
                    </h3>
                    <p className="mt-4 text-[14.5px] leading-relaxed text-text-secondary">
                      Tap a phyzik.app link — a workout, an athlete, a product
                      — and it opens straight in PHYZIK if you have it
                      installed. No copy-pasting, no detours through the
                      browser.
                    </p>
                  </div>
                </FadeUp>
                <FadeUp delay={0.05}>
                  <div>
                    <span className="text-[10.5px] font-bold uppercase tracking-[0.36em] text-text-tertiary">
                      No account wall
                    </span>
                    <h3 className="mt-5 text-[20px] font-bold tracking-tighter text-text-primary">
                      Browse before you sign up
                    </h3>
                    <p className="mt-4 text-[14.5px] leading-relaxed text-text-secondary">
                      Download free and explore the floor, the exercise
                      library, and shop without committing. Create an account
                      when you&apos;re ready to log your first session.
                    </p>
                  </div>
                </FadeUp>
              </div>
            </div>
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
              <div className="mx-auto flex max-w-[720px] flex-col items-center gap-8 text-center">
                <h2 className="text-balance text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1] tracking-tightest text-text-primary">
                  Your next set{' '}
                  <span className="text-shimmer-gold">starts here.</span>
                </h2>
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener"
                  data-track="download-cta-app-store"
                  className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-[3px] px-9 text-[15px] font-semibold tracking-wide text-bg shadow-[0_22px_60px_-18px_rgba(168,137,46,0.6)] transition-[filter,box-shadow] hover:brightness-110 hover:shadow-[0_22px_70px_-18px_rgba(168,137,46,0.75)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                  style={{
                    background:
                      'linear-gradient(135deg, #E8D9A8 0%, #C9A94E 38%, #A8892E 70%, #856A1F 100%)',
                  }}
                >
                  <span className="relative z-10">Download free</span>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-full group-hover:opacity-100"
                  />
                </a>
                <p className="text-[12.5px] text-text-tertiary">
                  Free on the App Store and Google Play.
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
