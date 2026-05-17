import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import Container from '@/components/ui/Container'
import FadeUp from '@/components/motion/FadeUp'
import PhyzikMark from '@/components/brand/PhyzikMark'
import { COMPETITORS } from '@/lib/comparisons'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Compare PHYZIK — vs other lifting apps',
  description:
    'Honest, side-by-side comparisons between PHYZIK and the other major lifting apps. Where each one wins. Where each one falls short.',
  alternates: { canonical: `${SITE_URL}/vs` },
}

export default function VsIndexPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-30 h-[1200px]"
          style={{
            background:
              'radial-gradient(ellipse 70% 45% at 50% 0%, rgba(184,151,106,0.14) 0%, transparent 60%), linear-gradient(180deg, #0A0A0B 0%, #050506 100%)',
          }}
        />

        <section className="relative pb-12 pt-28 md:pb-16 md:pt-36">
          <Container>
            <FadeUp>
              <div className="mx-auto flex max-w-[820px] flex-col items-start gap-6">
                <span className="text-[10.5px] font-bold uppercase tracking-[0.4em] text-text-tertiary">
                  Compare
                </span>

                <div className="flex items-center gap-3">
                  <PhyzikMark sizeClass="h-7 w-auto md:h-9" priority />
                  <span className="text-[12px] font-bold uppercase tracking-[0.32em] text-text-tertiary md:text-[14px]">
                    vs the rest of the category
                  </span>
                </div>

                <h1 className="text-balance text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold leading-[0.96] tracking-tightest text-text-primary">
                  Honest comparisons.{' '}
                  <span className="text-shimmer-gold">Where each app wins.</span>
                </h1>

                <p className="max-w-[600px] text-[15.5px] leading-relaxed text-text-secondary md:text-[17px]">
                  We use these apps too. Each does something well that PHYZIK
                  doesn&apos;t. We call that out first — then show the gap
                  PHYZIK closes.
                </p>
              </div>
            </FadeUp>
          </Container>
        </section>

        <section className="relative border-t border-border/60 py-16 md:py-20">
          <Container>
            <div className="mx-auto max-w-[860px]">
              <ul className="flex flex-col">
                {COMPETITORS.map((c, i) => (
                  <FadeUp key={c.slug} delay={0.05 + i * 0.05}>
                    <li className="border-b border-border/60 first:border-t">
                      <Link
                        href={`/vs/${c.slug}`}
                        className="group grid grid-cols-1 items-baseline gap-x-10 gap-y-2 py-8 transition-colors hover:bg-white/[0.02] md:grid-cols-[200px_1fr_auto] md:gap-x-12 md:py-10"
                      >
                        <span className="font-mono text-[12px] tabular-nums tracking-tight text-accent/80">
                          {String(i + 1).padStart(2, '0')} — vs
                        </span>
                        <div className="flex flex-col gap-1.5">
                          <h2 className="text-[24px] font-bold leading-none tracking-tight text-text-primary transition-colors group-hover:text-accent md:text-[32px]">
                            PHYZIK vs {c.name}
                          </h2>
                          <p className="text-[14px] leading-relaxed text-text-secondary md:text-[15px]">
                            {c.bottomLine}
                          </p>
                        </div>
                        <ArrowRight
                          className="hidden h-5 w-5 shrink-0 text-text-tertiary transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent md:block"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  </FadeUp>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
