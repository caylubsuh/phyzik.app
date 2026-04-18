import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Pill from '@/components/ui/Pill'
import AccentGlow from '@/components/motion/AccentGlow'
import FadeUp from '@/components/motion/FadeUp'
import AppStoreBadge from '@/components/ui/AppStoreBadge'
import { BRAND, SITE_URL } from '@/lib/constants'
import { FOUNDERS } from '@/lib/team'

export const metadata: Metadata = {
  title: 'Press & Media Kit',
  description:
    'PHYZIK media kit — press contact, founder bios, logos, screenshots, and recent coverage.',
  alternates: { canonical: `${SITE_URL}/press` },
  openGraph: {
    title: 'Press & Media Kit — PHYZIK',
    description: 'Media kit, founder bios, logos, and press contact.',
    url: `${SITE_URL}/press`,
  },
}

const LOGOS = [
  {
    name: 'Wordmark (white)',
    file: '/brand/phyzik-wordmark-white.png',
    use: 'Dark backgrounds',
  },
  {
    name: 'Wordmark (black)',
    file: '/brand/phyzik-wordmark-black.png',
    use: 'Light backgrounds',
  },
  {
    name: 'Wordmark (gradient)',
    file: '/brand/phyzik-wordmark-gradient.png',
    use: 'Editorial / feature placement',
  },
  {
    name: 'App icon',
    file: '/brand/phyzik-icon.png',
    use: 'Thumbnails, stories, small contexts',
  },
]

const SCREENSHOTS = [
  { file: '/screenshots/marketing/01-floor-post.png', label: 'The Floor — social feed' },
  { file: '/screenshots/marketing/02-squad.png', label: 'Squad leaderboard' },
  { file: '/screenshots/marketing/03-active-tracker.png', label: 'Active workout' },
  { file: '/screenshots/marketing/04-analytics.png', label: 'Analytics dashboard' },
  { file: '/screenshots/marketing/05-discover.png', label: 'Programs' },
  { file: '/screenshots/marketing/06-recovery.png', label: 'Recovery map' },
  { file: '/screenshots/marketing/07-scheduler.png', label: 'Weekly scheduler' },
]

export default function PressPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
          <AccentGlow position="top-right" size="lg" intensity={0.25} />
          <Container className="relative z-10">
            <FadeUp className="flex flex-col items-start">
              <Pill>PRESS</Pill>
              <h1 className="mt-6 text-5xl font-bold tracking-tight text-text-primary md:text-6xl lg:text-7xl">
                Media <span className="text-accent">kit.</span>
              </h1>
              <p className="mt-6 max-w-3xl text-lg text-text-primary/70 md:text-xl">
                Covering PHYZIK? Everything you need is here. Boilerplate,
                founders, logos, screenshots. For anything else —{' '}
                <a
                  href="mailto:press@phyzik.app"
                  className="text-accent underline-offset-4 hover:underline"
                >
                  press@phyzik.app
                </a>
                .
              </p>
            </FadeUp>
          </Container>
        </section>

        <Section spacing="medium">
          <FadeUp>
            <Pill>ABOUT</Pill>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
              In a paragraph.
            </h2>
          </FadeUp>
          <div className="mt-10 max-w-3xl space-y-4 text-lg text-text-secondary">
            <p>
              {BRAND.name} is the social training platform built for lifters.
              Structured programs, automatic progressive overload, and a social
              feed where every post is a real workout.
            </p>
            <p>
              Built on evidence-based training science —{' '}
              volume landmarks, periodization, and progressive overload — PHYZIK
              gives every lifter the tools that until now lived behind paywalls
              or personal coaches. Free. For every lifter.
            </p>
            <p className="text-sm text-text-tertiary">
              Founded 2024 · {BRAND.legalName} · Based in Ithaca, NY and Vienna, VA
            </p>
          </div>
        </Section>

        <Section spacing="medium">
          <FadeUp>
            <Pill>FACTS</Pill>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
              The quick-reference.
            </h2>
          </FadeUp>
          <dl className="mt-10 grid max-w-3xl grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
            {[
              ['Founded', '2024'],
              ['Legal entity', BRAND.legalName],
              ['Category', 'Health & Fitness'],
              ['Platform', 'iOS (Android in development)'],
              ['Pricing', 'Free'],
              ['Exercises', '730+'],
              ['Exercise aliases', '3,145+'],
              ['Program combinations', '5,000+'],
              ['Headquarters', 'Ithaca, NY · Vienna, VA'],
              ['App Store', 'apps.apple.com/us/app/phyzik/id6760412488'],
            ].map(([k, v]) => (
              <div key={k} className="flex flex-col gap-1">
                <dt className="text-[11px] uppercase tracking-[0.15em] text-text-tertiary">
                  {k}
                </dt>
                <dd className="text-base text-text-primary">{v}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section spacing="medium">
          <FadeUp>
            <Pill>FOUNDERS</Pill>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
              The people behind it.
            </h2>
          </FadeUp>
          <div className="mt-10 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
            {FOUNDERS.map((founder) => (
              <div key={founder.slug} className="flex flex-col gap-3">
                <div className="text-[11px] uppercase tracking-[0.15em] text-text-tertiary">
                  {founder.role}
                </div>
                <h3 className="text-2xl font-semibold text-text-primary">
                  {founder.name}
                </h3>
                <p className="text-[15px] leading-relaxed text-text-secondary">
                  {founder.bio}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section spacing="medium">
          <FadeUp>
            <Pill>LOGOS</Pill>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
              Brand assets.
            </h2>
            <p className="mt-3 max-w-2xl text-text-secondary">
              Right-click any logo below to download. Use the white wordmark on
              dark backgrounds, black on light. Don&apos;t stretch, recolor, or
              place on low-contrast backgrounds.
            </p>
          </FadeUp>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {LOGOS.map((logo) => (
              <div
                key={logo.file}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-bg-high p-6"
              >
                <div className="flex h-24 items-center justify-center rounded-lg bg-bg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo.file}
                    alt={logo.name}
                    className="max-h-14 w-auto"
                  />
                </div>
                <div>
                  <div className="text-sm font-semibold text-text-primary">
                    {logo.name}
                  </div>
                  <div className="mt-1 text-xs text-text-tertiary">
                    {logo.use}
                  </div>
                </div>
                <a
                  href={logo.file}
                  download
                  className="text-xs text-accent underline-offset-4 hover:underline"
                >
                  Download PNG →
                </a>
              </div>
            ))}
          </div>
        </Section>

        <Section spacing="medium">
          <FadeUp>
            <Pill>SCREENSHOTS</Pill>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
              Product imagery.
            </h2>
            <p className="mt-3 max-w-2xl text-text-secondary">
              High-resolution app screenshots. Free to use for editorial
              coverage.
            </p>
          </FadeUp>
          <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
            {SCREENSHOTS.map((shot) => (
              <a
                key={shot.file}
                href={shot.file}
                target="_blank"
                rel="noopener"
                className="group flex flex-col gap-2"
              >
                <div className="overflow-hidden rounded-2xl border border-border bg-bg-high">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={shot.file}
                    alt={shot.label}
                    className="w-full transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="text-xs text-text-tertiary">{shot.label}</div>
              </a>
            ))}
          </div>
        </Section>

        <Section spacing="medium">
          <FadeUp>
            <Pill>COVERAGE</Pill>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
              In the press.
            </h2>
            <p className="mt-3 max-w-2xl text-text-secondary">
              Coverage lands here as it comes in.
            </p>
          </FadeUp>
          <div className="mt-10 rounded-2xl border border-border bg-bg-high/50 p-10 text-center">
            <p className="text-sm text-text-tertiary">
              New app, new story. First pieces coming soon.
            </p>
          </div>
        </Section>

        <Section spacing="medium">
          <div className="flex flex-col items-start gap-6 rounded-3xl border border-border bg-bg-high p-10 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <Pill>CONTACT</Pill>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-text-primary md:text-3xl">
                Interviews, review units, partnerships.
              </h2>
              <p className="mt-3 text-text-secondary">
                Email{' '}
                <a
                  href="mailto:press@phyzik.app"
                  className="text-accent underline-offset-4 hover:underline"
                >
                  press@phyzik.app
                </a>{' '}
                or{' '}
                <a
                  href="mailto:admin@phyzik.app"
                  className="text-accent underline-offset-4 hover:underline"
                >
                  admin@phyzik.app
                </a>
                . Usually same-day.
              </p>
              <p className="mt-4 text-sm text-text-tertiary">
                Also on <Link href="/community" className="text-accent underline-offset-4 hover:underline">community</Link>:
                full team, athlete roster, ambassadors.
              </p>
            </div>
            <AppStoreBadge size="lg" />
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
