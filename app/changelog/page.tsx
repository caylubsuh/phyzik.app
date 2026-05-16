import type { Metadata } from 'next'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Pill from '@/components/ui/Pill'
import AccentGlow from '@/components/motion/AccentGlow'
import FadeUp from '@/components/motion/FadeUp'
import { CHANGELOG } from '@/lib/changelog'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'What shipped in PHYZIK — release notes, feature drops, and fixes.',
  alternates: { canonical: `${SITE_URL}/changelog` },
  openGraph: {
    title: 'Changelog — PHYZIK',
    description: 'Release notes, feature drops, and fixes.',
    url: `${SITE_URL}/changelog`,
  },
}

export default function ChangelogPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
          <AccentGlow position="top-right" size="lg" intensity={0.25} />
          <Container className="relative z-10">
            <FadeUp className="flex flex-col items-start">
              <Pill>CHANGELOG</Pill>
              <h1 className="mt-6 text-5xl font-bold tracking-tight text-text-primary md:text-6xl lg:text-7xl">
                What <span className="text-tertiary">shipped.</span>
              </h1>
              <p className="mt-6 max-w-3xl text-lg text-text-primary/70 md:text-xl">
                Every release, every feature, every fix — in the order we
                shipped them. No filler.
              </p>
            </FadeUp>
          </Container>
        </section>

        <Section spacing="medium">
          <div className="mx-auto max-w-3xl">
            {CHANGELOG.map((entry, idx) => (
              <article
                key={entry.version}
                className="relative border-t border-border py-10 first:border-t-0 first:pt-0"
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-xs font-mono uppercase tracking-[0.15em] text-accent">
                    v{entry.version}
                  </span>
                  <span className="text-xs uppercase tracking-[0.15em] text-text-tertiary">
                    {entry.date}
                  </span>
                  {idx === 0 && (
                    <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-accent">
                      Latest
                    </span>
                  )}
                </div>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-text-primary md:text-3xl">
                  {entry.title}
                </h2>
                <ul className="mt-5 space-y-2.5">
                  {entry.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex gap-3 text-[15px] text-text-secondary"
                    >
                      <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
