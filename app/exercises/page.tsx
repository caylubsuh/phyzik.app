import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import Container from '@/components/ui/Container'
import FadeUp from '@/components/motion/FadeUp'
import PhyzikMark from '@/components/brand/PhyzikMark'
import { createPublicClient } from '@/lib/supabase/public'
import { SITE_URL } from '@/lib/constants'

// Refresh the page once a day. Public catalog, no auth needed.
export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Exercise library — PHYZIK',
  description:
    '730+ catalogued exercises with form cues, muscle group targeting, and equipment notes. Every major compound, isolation, and variation.',
  alternates: { canonical: `${SITE_URL}/exercises` },
  openGraph: {
    title: 'Exercise library — PHYZIK',
    description:
      '730+ catalogued lifts. Search by muscle group, equipment, or movement pattern.',
    url: `${SITE_URL}/exercises`,
  },
}

type ExerciseRow = {
  id: string
  name: string
  muscle_group: string | null
  slug?: string | null
  /** Some installs of this schema use `equipment`; tolerate either name. */
  equipment?: string | null
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

async function loadExercises(): Promise<ExerciseRow[]> {
  const supabase = createPublicClient()
  const { data, error } = await supabase
    .from('exercises')
    .select('id, name, muscle_group, equipment')
    .order('muscle_group', { ascending: true })
    .order('name', { ascending: true })

  if (error) {
    console.error('[exercises] supabase error', error)
    return []
  }
  return (data ?? []) as ExerciseRow[]
}

export default async function ExercisesIndexPage() {
  const exercises = await loadExercises()

  // Group by muscle for editorial layout.
  const grouped = exercises.reduce<Record<string, ExerciseRow[]>>((acc, ex) => {
    const key = ex.muscle_group ?? 'Other'
    if (!acc[key]) acc[key] = []
    acc[key].push(ex)
    return acc
  }, {})

  const groups = Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b))
  const totalCount = exercises.length

  return (
    <>
      <Nav />
      <main id="main-content" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-30 h-[1100px]"
          style={{
            background:
              'radial-gradient(ellipse 70% 45% at 50% 0%, rgba(184,151,106,0.14) 0%, transparent 60%), linear-gradient(180deg, #0A0A0B 0%, #050506 100%)',
          }}
        />

        {/* ─── Hero ─── */}
        <section className="relative pb-10 pt-28 md:pb-14 md:pt-36">
          <Container>
            <FadeUp>
              <div className="mx-auto flex max-w-[820px] flex-col items-start gap-6">
                <span className="text-[10.5px] font-bold uppercase tracking-[0.4em] text-text-tertiary">
                  Library
                </span>

                <div className="flex items-center gap-3">
                  <PhyzikMark sizeClass="h-7 w-auto md:h-9" priority />
                  <span className="text-[12px] font-bold uppercase tracking-[0.32em] text-text-tertiary md:text-[14px]">
                    Exercises
                  </span>
                </div>

                <h1 className="text-balance text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold leading-[0.96] tracking-tightest text-text-primary">
                  {totalCount > 0 ? (
                    <>
                      <span className="text-shimmer-gold tabular-nums">
                        {totalCount.toLocaleString()}
                      </span>{' '}
                      lifts.{' '}
                      <span className="text-text-tertiary">
                        Properly catalogued.
                      </span>
                    </>
                  ) : (
                    <>Every lift. <span className="text-text-tertiary">Properly catalogued.</span></>
                  )}
                </h1>

                <p className="max-w-[600px] text-[15.5px] leading-relaxed text-text-secondary md:text-[17px]">
                  Every major compound, isolation, and variation — indexed by
                  muscle group and movement pattern. Each lift gets a real
                  page with form cues and equipment notes.
                </p>
              </div>
            </FadeUp>
          </Container>
        </section>

        {/* ─── Listing by muscle group ─── */}
        {groups.length === 0 ? (
          <section className="relative border-t border-border/60 py-20">
            <Container>
              <div className="mx-auto max-w-[680px] text-center">
                <p className="text-[14px] italic text-text-tertiary">
                  The exercise catalogue is loading. Check back shortly.
                </p>
              </div>
            </Container>
          </section>
        ) : (
          <section className="relative border-t border-border/60 py-16 md:py-24">
            <Container>
              <div className="mx-auto max-w-[920px]">
                {groups.map(([muscle, items], gi) => (
                  <FadeUp key={muscle} delay={0.03 + gi * 0.03}>
                    <section className="mb-14 md:mb-20">
                      <header className="mb-6 flex items-baseline justify-between border-b border-border/60 pb-4">
                        <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold leading-none tracking-tight text-text-primary">
                          {muscle}
                        </h2>
                        <span className="font-mono text-[12px] tabular-nums text-accent/80">
                          {String(items.length).padStart(2, '0')}
                        </span>
                      </header>
                      <ul className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
                        {items.map((ex) => {
                          const slug = ex.slug ?? slugify(ex.name)
                          return (
                            <li key={ex.id}>
                              <Link
                                href={`/exercises/${slug}`}
                                className="group flex items-baseline justify-between gap-3 border-b border-border/40 py-2.5 transition-colors hover:border-border-mid"
                              >
                                <span className="text-[15px] text-text-primary transition-colors group-hover:text-accent">
                                  {ex.name}
                                </span>
                                {ex.equipment && (
                                  <span className="hidden text-[11.5px] uppercase tracking-[0.16em] text-text-tertiary group-hover:text-text-secondary md:inline">
                                    {ex.equipment}
                                  </span>
                                )}
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    </section>
                  </FadeUp>
                ))}
              </div>
            </Container>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
