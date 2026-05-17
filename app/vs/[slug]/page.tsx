import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Check, X } from 'lucide-react'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import Container from '@/components/ui/Container'
import FadeUp from '@/components/motion/FadeUp'
import PhyzikMark from '@/components/brand/PhyzikMark'
import { COMPETITORS, getCompetitor, type ComparisonRow } from '@/lib/comparisons'
import { SITE_URL, BRAND } from '@/lib/constants'

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return COMPETITORS.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const c = getCompetitor(slug)
  if (!c) return { title: 'Comparison not found' }
  const title = `PHYZIK vs ${c.name} — honest comparison`
  return {
    title,
    description: c.bottomLine,
    alternates: { canonical: `${SITE_URL}/vs/${c.slug}` },
    openGraph: {
      title,
      description: c.bottomLine,
      url: `${SITE_URL}/vs/${c.slug}`,
    },
  }
}

function renderCell(value: ComparisonRow['phyzik'], side: 'phyzik' | 'competitor') {
  const baseColor = side === 'phyzik' ? 'text-accent' : 'text-text-tertiary'
  if (value === true) {
    return <Check className={`mx-auto h-4 w-4 ${baseColor}`} aria-label="Yes" />
  }
  if (value === false) {
    return <X className="mx-auto h-4 w-4 text-text-tertiary/40" aria-label="No" />
  }
  return (
    <span className={`text-[13.5px] font-medium tabular-nums ${side === 'phyzik' ? 'text-text-primary' : 'text-text-secondary'}`}>
      {value}
    </span>
  )
}

export default async function VsCompetitorPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const c = getCompetitor(slug)
  if (!c) notFound()

  return (
    <>
      <Nav />
      <main id="main-content" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-30 h-[1200px]"
          style={{
            background:
              'radial-gradient(ellipse 70% 45% at 50% 0%, rgba(184,151,106,0.16) 0%, transparent 60%), linear-gradient(180deg, #0A0A0B 0%, #050506 100%)',
          }}
        />

        {/* ─── Hero ─── */}
        <section className="relative pb-10 pt-28 md:pb-14 md:pt-36">
          <Container>
            <FadeUp>
              <div className="mx-auto flex max-w-[820px] flex-col items-start gap-6">
                <Link
                  href="/vs"
                  className="text-[12px] uppercase tracking-[0.28em] text-text-tertiary transition-colors hover:text-text-secondary"
                >
                  ← All comparisons
                </Link>

                <div className="flex flex-wrap items-center gap-4 md:gap-6">
                  <PhyzikMark sizeClass="h-7 w-auto md:h-9" priority />
                  <span className="text-[20px] font-bold uppercase tracking-[0.18em] text-text-tertiary md:text-[26px]">
                    vs
                  </span>
                  <span className="text-[28px] font-bold leading-none tracking-tight text-text-primary md:text-[40px]">
                    {c.name}
                  </span>
                </div>

                <h1 className="text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.02] tracking-tightest text-text-primary">
                  {c.bottomLine}
                </h1>

                <p className="max-w-[640px] text-[15.5px] leading-relaxed text-text-secondary md:text-[17px]">
                  {c.summary}
                </p>
              </div>
            </FadeUp>
          </Container>
        </section>

        {/* ─── Quick reference ─── */}
        <section className="relative border-t border-border/60 py-14">
          <Container>
            <div className="mx-auto grid max-w-[820px] grid-cols-1 gap-y-6 md:grid-cols-3 md:gap-x-10">
              <div className="flex flex-col gap-1">
                <span className="text-[10.5px] font-bold uppercase tracking-[0.28em] text-text-tertiary">
                  Tagline
                </span>
                <span className="text-[14px] text-text-primary">{c.tagline}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10.5px] font-bold uppercase tracking-[0.28em] text-text-tertiary">
                  Pricing
                </span>
                <span className="text-[14px] text-text-primary">{c.pricing}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10.5px] font-bold uppercase tracking-[0.28em] text-text-tertiary">
                  Website
                </span>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-[14px] text-accent underline-offset-4 hover:underline"
                >
                  {c.url.replace(/^https?:\/\//, '')}
                </a>
              </div>
            </div>
          </Container>
        </section>

        {/* ─── Where THEY win (lead with this — credibility) ─── */}
        <section className="relative border-t border-border/60 py-20 md:py-28">
          <Container>
            <div className="mx-auto max-w-[860px]">
              <FadeUp>
                <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-none tracking-tightest text-text-primary">
                  Where{' '}
                  <span className="text-shimmer-gold">{c.name} wins.</span>
                </h2>
                <p className="mt-4 max-w-[600px] text-[14.5px] leading-relaxed text-text-tertiary">
                  We use {c.name} too. Here&apos;s what it does that PHYZIK
                  doesn&apos;t — said plainly.
                </p>
              </FadeUp>

              <ol className="mt-12 flex flex-col">
                {c.whereTheyWin.map((row, i) => (
                  <FadeUp key={row.title} delay={0.05 + i * 0.04}>
                    <li className="grid grid-cols-1 items-baseline gap-x-10 gap-y-2 border-b border-border/60 py-7 first:border-t md:grid-cols-[100px_1fr] md:gap-x-12 md:py-8">
                      <span className="font-mono text-[12px] tabular-nums tracking-tight text-accent/70">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="flex flex-col gap-2">
                        <h3 className="text-[18px] font-bold leading-snug tracking-tight text-text-primary md:text-[22px]">
                          {row.title}
                        </h3>
                        <p className="text-[14.5px] leading-relaxed text-text-secondary md:text-[16px]">
                          {row.body}
                        </p>
                      </div>
                    </li>
                  </FadeUp>
                ))}
              </ol>
            </div>
          </Container>
        </section>

        {/* ─── Where PHYZIK wins ─── */}
        <section className="relative border-t border-border/60 py-20 md:py-28">
          <Container>
            <div className="mx-auto max-w-[860px]">
              <FadeUp>
                <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-none tracking-tightest text-text-primary">
                  Where{' '}
                  <span className="text-shimmer-gold">PHYZIK wins.</span>
                </h2>
              </FadeUp>

              <ol className="mt-12 flex flex-col">
                {c.wherePhyzikWins.map((row, i) => (
                  <FadeUp key={row.title} delay={0.05 + i * 0.04}>
                    <li className="grid grid-cols-1 items-baseline gap-x-10 gap-y-2 border-b border-border/60 py-7 first:border-t md:grid-cols-[100px_1fr] md:gap-x-12 md:py-8">
                      <span className="font-mono text-[12px] tabular-nums tracking-tight text-accent/70">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="flex flex-col gap-2">
                        <h3 className="text-[18px] font-bold leading-snug tracking-tight text-text-primary md:text-[22px]">
                          {row.title}
                        </h3>
                        <p className="text-[14.5px] leading-relaxed text-text-secondary md:text-[16px]">
                          {row.body}
                        </p>
                      </div>
                    </li>
                  </FadeUp>
                ))}
              </ol>
            </div>
          </Container>
        </section>

        {/* ─── Feature matrix ─── */}
        <section className="relative border-t border-border/60 py-20 md:py-24">
          <Container>
            <div className="mx-auto max-w-[860px]">
              <FadeUp>
                <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-none tracking-tightest text-text-primary">
                  Feature{' '}
                  <span className="text-shimmer-gold">matrix.</span>
                </h2>
              </FadeUp>

              <div className="mt-10 overflow-hidden rounded-2xl border border-border">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-border bg-bg-high/40">
                      <th className="px-5 py-4 text-[10.5px] font-bold uppercase tracking-[0.22em] text-text-tertiary">
                        Feature
                      </th>
                      <th className="px-5 py-4 text-center text-[10.5px] font-bold uppercase tracking-[0.22em] text-accent">
                        PHYZIK
                      </th>
                      <th className="px-5 py-4 text-center text-[10.5px] font-bold uppercase tracking-[0.22em] text-text-tertiary">
                        {c.name}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {c.matrix.map((row) => (
                      <tr
                        key={row.feature}
                        className="border-b border-border/60 last:border-b-0"
                      >
                        <td className="px-5 py-3.5 text-[14px] text-text-primary">
                          {row.feature}
                        </td>
                        <td className="px-5 py-3.5 text-center">
                          {renderCell(row.phyzik, 'phyzik')}
                        </td>
                        <td className="px-5 py-3.5 text-center">
                          {renderCell(row.competitor, 'competitor')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Container>
        </section>

        {/* ─── Bottom line + CTA ─── */}
        <section className="relative border-t border-border/60 py-20 md:py-28">
          <Container>
            <div className="mx-auto flex max-w-[680px] flex-col items-center gap-6 text-center">
              <FadeUp>
                <h2 className="text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.05] tracking-tightest text-text-primary">
                  {c.bottomLine}
                </h2>
              </FadeUp>

              <FadeUp delay={0.05}>
                <p className="max-w-[520px] text-[15px] leading-relaxed text-text-secondary md:text-[16.5px]">
                  {BRAND.description}
                </p>
              </FadeUp>

              <FadeUp delay={0.1}>
                <div className="mt-2 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                  <Link
                    href="/pricing"
                    className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-7 text-[14.5px] font-semibold tracking-wide text-bg transition-colors hover:bg-accent-dark"
                  >
                    See membership
                  </Link>
                  <Link
                    href="/vs"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-border-mid px-7 text-[14.5px] font-semibold text-text-primary transition-colors hover:border-border-strong hover:bg-white/5"
                  >
                    Compare another
                  </Link>
                </div>
              </FadeUp>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
