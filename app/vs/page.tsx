import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, X } from 'lucide-react'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import Container from '@/components/ui/Container'
import FadeUp from '@/components/motion/FadeUp'
import PhyzikMark from '@/components/brand/PhyzikMark'
import {
  COMPARISON_MATRIX,
  MATRIX_COLUMNS,
  type MatrixCellValue,
  type MatrixRow,
} from '@/lib/comparisons'
import { SITE_URL } from '@/lib/constants'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'PHYZIK vs Hevy vs Strong vs Fitbod vs Jefit — honest comparison',
  description:
    'Every major lifting app, in one chart. Pricing, features, programming intelligence, social, and platform support — side by side.',
  alternates: { canonical: `${SITE_URL}/vs` },
  openGraph: {
    title: 'Compare PHYZIK to every lifting app, in one chart',
    description:
      'PHYZIK vs Hevy vs Strong vs Fitbod vs Jefit — pricing, features, programming, social, platform.',
    url: `${SITE_URL}/vs`,
  },
}

function renderCell(value: MatrixCellValue, isUs: boolean) {
  if (value === true) {
    return (
      <Check
        className={cn(
          'mx-auto h-4 w-4',
          isUs ? 'text-accent' : 'text-text-secondary',
        )}
        aria-label="Yes"
      />
    )
  }
  if (value === false) {
    return (
      <X className="mx-auto h-4 w-4 text-text-tertiary/40" aria-label="No" />
    )
  }
  return (
    <span
      className={cn(
        'text-[13.5px] tabular-nums',
        isUs ? 'font-semibold text-text-primary' : 'text-text-secondary',
      )}
    >
      {value}
    </span>
  )
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

        {/* ─── HERO ─── */}
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
                  Five lifting apps.{' '}
                  <span className="text-shimmer-gold">One honest chart.</span>
                </h1>

                <p className="max-w-[640px] text-[15.5px] leading-relaxed text-text-secondary md:text-[17px]">
                  Pricing, features, programming intelligence, social, and
                  platform support — laid out side by side. No
                  cherry-picking, no asterisks. If a competitor wins a row,
                  it shows.
                </p>
              </div>
            </FadeUp>
          </Container>
        </section>

        {/* ─── MATRIX ─── */}
        <section className="relative border-t border-border/60 py-14 md:py-20">
          <Container>
            <FadeUp>
              <div className="mx-auto max-w-[1100px]">
                {/* Mobile hint — table will scroll horizontally on small screens */}
                <p className="mb-3 text-[11.5px] uppercase tracking-[0.22em] text-text-tertiary md:hidden">
                  Swipe →
                </p>

                <div className="overflow-x-auto rounded-2xl border border-border">
                  <table className="w-full min-w-[680px] border-collapse text-left">
                    {/* Sticky-header design */}
                    <thead>
                      <tr className="bg-bg-high/60">
                        <th
                          scope="col"
                          className="sticky left-0 z-10 min-w-[200px] bg-bg-high/95 px-5 py-4 text-[10.5px] font-bold uppercase tracking-[0.22em] text-text-tertiary backdrop-blur-sm md:min-w-[240px]"
                        >
                          Feature
                        </th>
                        {MATRIX_COLUMNS.map((col) => (
                          <th
                            key={col.key}
                            scope="col"
                            className={cn(
                              'min-w-[100px] px-4 py-4 text-center text-[10.5px] font-bold uppercase tracking-[0.22em]',
                              col.isUs
                                ? 'border-x border-accent/30 bg-accent/[0.06] text-accent'
                                : 'text-text-tertiary',
                            )}
                          >
                            {col.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {COMPARISON_MATRIX.map((category) => (
                        <CategorySection key={category.label} label={category.label} rows={category.rows} />
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="mt-6 text-[12px] leading-relaxed text-text-tertiary">
                  Prices reflect each app&apos;s public web pricing where
                  available; in-app prices may differ. Feature data was
                  current at time of publication; competitors ship frequently
                  and may have changed since.
                </p>
              </div>
            </FadeUp>
          </Container>
        </section>

        {/* ─── BOTTOM LINE + CTA ─── */}
        <section className="relative border-t border-border/60 py-20 md:py-28">
          <Container>
            <div className="mx-auto flex max-w-[680px] flex-col items-center gap-6 text-center">
              <FadeUp>
                <h2 className="text-balance text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.05] tracking-tightest text-text-primary">
                  Cheaper than most.{' '}
                  <span className="text-shimmer-gold">More than all.</span>
                </h2>
              </FadeUp>

              <FadeUp delay={0.05}>
                <p className="max-w-[520px] text-[15px] leading-relaxed text-text-secondary md:text-[16.5px]">
                  Hevy and Strong nail set-logging. Fitbod and Jefit do
                  templates well. PHYZIK is the one app where intelligent
                  programming, AI form-check, and nutrition all live
                  together — at less than half the price of the closest
                  full-feature competitor.
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

/**
 * One category band in the matrix: a label row that spans all columns,
 * followed by the feature rows under it.
 */
function CategorySection({ label, rows }: { label: string; rows: MatrixRow[] }) {
  return (
    <>
      <tr>
        <td
          colSpan={MATRIX_COLUMNS.length + 1}
          className="sticky left-0 border-y border-border bg-bg-low/40 px-5 py-3 text-[10.5px] font-bold uppercase tracking-[0.26em] text-text-tertiary"
        >
          {label}
        </td>
      </tr>
      {rows.map((row, i) => (
        <tr
          key={row.feature}
          className={cn(
            'border-b border-border/60 last:border-b-0',
            i % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.012]',
          )}
        >
          <th
            scope="row"
            className="sticky left-0 z-[1] bg-bg/95 px-5 py-3.5 text-left text-[14px] font-normal text-text-primary backdrop-blur-sm"
          >
            {row.feature}
          </th>
          {MATRIX_COLUMNS.map((col) => (
            <td
              key={col.key}
              className={cn(
                'px-4 py-3.5 text-center',
                col.isUs && 'border-x border-accent/15 bg-accent/[0.04]',
              )}
            >
              {renderCell(row[col.key], col.isUs)}
            </td>
          ))}
        </tr>
      ))}
    </>
  )
}
