import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import Container from '@/components/ui/Container'
import FadeUp from '@/components/motion/FadeUp'
import PhyzikMark from '@/components/brand/PhyzikMark'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Method — PHYZIK',
  description:
    'How PHYZIK is built, what we refuse to build, and the belief that everyone should have access to the tools to become the best version of themselves.',
  alternates: { canonical: `${SITE_URL}/method` },
  openGraph: {
    title: 'Method — PHYZIK',
    description:
      'How PHYZIK is built — and what we refuse to build. The principles behind every decision.',
    url: `${SITE_URL}/method`,
  },
}

const BELIEFS = [
  {
    title: 'Everyone deserves the tools.',
    body: 'Elite-level coaching used to live behind paywalls and personal trainers. We refuse to let financial gating decide who gets to take their training seriously. The free version is real. The Pro membership is priced at the lowest number that keeps the lights on.',
  },
  {
    title: 'The app should do the program, not the lifter.',
    body: 'You shouldn\'t need a spreadsheet, a Google search, or a $200/mo coach to know what to do this Tuesday. Mesocycle periodization, volume landmarks, deload timing — the science is settled. The app does the planning. You do the work.',
  },
  {
    title: 'Every feature must serve the set.',
    body: 'If a feature doesn\'t make you log a better set, push a better number, or recover for the next session — it doesn\'t ship. We delete more features than we add. Anti-bloat is a position.',
  },
  {
    title: 'Real workouts, or nothing.',
    body: 'Every post on The Floor is attached to a completed session. No motivation graphics, no influencer content, no before/after ads. If you didn\'t do the work, you don\'t post.',
  },
  {
    title: 'Your data is yours.',
    body: 'We do not sell user data. We do not share workout history with advertisers. We do not run ads inside the app. Ever. The membership fee is the entire business model — that\'s by design.',
  },
  {
    title: 'Built by lifters who train.',
    body: 'Every person building PHYZIK trains seriously. The features are the features we wished existed. The pricing is what we ourselves would pay. The voice is the voice we use in our own gym chats.',
  },
] as const

const WONT_BUILD = [
  'Streak shame loops',
  'Push notifications designed to manufacture guilt',
  'Premium-tier features locked behind a higher subscription',
  'Sponsored programs from supplement brands',
  'Ads — anywhere',
  'Influencer-of-the-month content',
  'Sold or shared workout data',
  'Bloat features added to look feature-rich in App Store screenshots',
] as const

const WILL_BUILD = [
  'Programming that adapts to your actual performance',
  'Honest progressive overload, not vanity progression',
  'Form feedback that catches mistakes before they cost you progress',
  'Recovery and fatigue tracking grounded in published exercise science',
  'A social feed that only shows real, completed work',
  'Squads — small training groups with shared schedules and leaderboards',
  'A nutrition coach tied to your training load, not to your calorie deficit',
  'A web subscription that costs less than the App Store price, because we can',
] as const

export default function MethodPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="relative overflow-hidden">
        {/* ─── Atmosphere ─── */}
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
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.4]"
          style={{
            backgroundImage:
              'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '34px 34px',
            maskImage:
              'radial-gradient(ellipse 65% 55% at 50% 20%, black 0%, transparent 75%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 65% 55% at 50% 20%, black 0%, transparent 75%)',
          }}
        />

        {/* ─── HERO ─── */}
        <section className="relative pb-12 pt-28 md:pb-20 md:pt-36">
          <Container>
            <FadeUp>
              <div className="mx-auto flex max-w-[820px] flex-col items-start gap-7">
                <span className="text-[10.5px] font-bold uppercase tracking-[0.4em] text-text-tertiary">
                  Method
                </span>

                <div className="flex items-center gap-3">
                  <PhyzikMark sizeClass="h-7 w-auto md:h-9" priority />
                  <span className="text-[12px] font-bold uppercase tracking-[0.32em] text-text-tertiary md:text-[14px]">
                    How we build
                  </span>
                </div>

                <h1 className="text-balance text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.96] tracking-tightest text-text-primary">
                  What we will{' '}
                  <span className="text-shimmer-gold">always build.</span>
                  <br />
                  What we{' '}
                  <span className="text-text-tertiary">refuse to.</span>
                </h1>

                <p className="max-w-[600px] text-[16px] leading-relaxed text-text-secondary md:text-[18px]">
                  Every product decision in PHYZIK runs through the same six
                  beliefs. They&apos;re the reason the app looks the way it
                  looks, the reason the pricing is what it is, and the reason
                  certain features will never ship — no matter how much they
                  would help us grow.
                </p>
              </div>
            </FadeUp>
          </Container>
        </section>

        {/* ─── BELIEFS ─── */}
        <section className="relative border-t border-border/60 py-20 md:py-28">
          <Container>
            <div className="mx-auto max-w-[860px]">
              <FadeUp>
                <div className="flex items-baseline justify-between">
                  <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-none tracking-tightest text-text-primary">
                    What we{' '}
                    <span className="text-shimmer-gold">believe.</span>
                  </h2>
                  <span className="hidden text-[10.5px] font-bold uppercase tracking-[0.28em] text-text-tertiary md:inline">
                    {String(BELIEFS.length).padStart(2, '0')} principles
                  </span>
                </div>
              </FadeUp>

              <ol className="mt-14 flex flex-col">
                {BELIEFS.map((b, i) => (
                  <FadeUp key={b.title} delay={0.05 + i * 0.04}>
                    <li className="grid grid-cols-1 items-baseline gap-x-10 gap-y-3 border-b border-border/60 py-8 first:border-t md:grid-cols-[140px_1fr] md:gap-x-12 md:py-10">
                      <span className="font-mono text-[12px] tabular-nums tracking-tight text-accent/80">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="flex flex-col gap-3">
                        <h3 className="text-[22px] font-bold leading-snug tracking-tight text-text-primary md:text-[28px]">
                          {b.title}
                        </h3>
                        <p className="text-[15.5px] leading-relaxed text-text-secondary md:text-[17px]">
                          {b.body}
                        </p>
                      </div>
                    </li>
                  </FadeUp>
                ))}
              </ol>
            </div>
          </Container>
        </section>

        {/* ─── WHAT WE WILL ALWAYS BUILD vs WON'T BUILD ─── */}
        <section className="relative border-t border-border/60 py-20 md:py-28">
          <Container>
            <div className="mx-auto grid max-w-[1040px] grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
              <FadeUp>
                <div className="flex flex-col gap-6">
                  <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-tight tracking-tightest text-text-primary">
                    What we will{' '}
                    <span className="text-shimmer-gold">always build.</span>
                  </h2>
                  <ul className="flex flex-col">
                    {WILL_BUILD.map((item) => (
                      <li
                        key={item}
                        className="border-b border-border/60 py-3.5 text-[15.5px] leading-snug text-text-primary first:border-t"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>

              <FadeUp delay={0.1}>
                <div className="flex flex-col gap-6">
                  <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-tight tracking-tightest text-text-primary">
                    What we{' '}
                    <span className="text-text-tertiary">refuse to build.</span>
                  </h2>
                  <ul className="flex flex-col">
                    {WONT_BUILD.map((item) => (
                      <li
                        key={item}
                        className="border-b border-border/60 py-3.5 text-[15.5px] leading-snug text-text-tertiary line-through decoration-text-tertiary/40 first:border-t"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            </div>
          </Container>
        </section>

        {/* ─── CTA ─── */}
        <section className="relative border-t border-border/60 py-20 md:py-28">
          <Container>
            <div className="mx-auto flex max-w-[680px] flex-col items-center gap-6 text-center">
              <FadeUp>
                <h2 className="text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.05] tracking-tightest text-text-primary">
                  Built for who{' '}
                  <span className="text-shimmer-gold">you&apos;re becoming.</span>
                </h2>
              </FadeUp>

              <FadeUp delay={0.05}>
                <p className="max-w-[520px] text-[15.5px] leading-relaxed text-text-secondary md:text-[17px]">
                  If the principles above sound right, the membership exists
                  for the same reason: to get the tools in your hands at the
                  fairest price we can offer.
                </p>
              </FadeUp>

              <FadeUp delay={0.1}>
                <Link
                  href="/pricing"
                  className="group relative mt-2 inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-accent px-7 text-[14.5px] font-semibold tracking-wide text-bg shadow-[0_22px_60px_-18px_rgba(184,151,106,0.55)] transition-all hover:bg-accent-dark hover:shadow-[0_22px_70px_-18px_rgba(184,151,106,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  <span className="relative z-10">See membership</span>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-full group-hover:opacity-100"
                  />
                </Link>
              </FadeUp>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
