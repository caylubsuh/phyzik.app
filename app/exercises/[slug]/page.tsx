import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import Container from '@/components/ui/Container'
import FadeUp from '@/components/motion/FadeUp'
import { createPublicClient } from '@/lib/supabase/public'
import { APP_STORE_URL, SITE_URL } from '@/lib/constants'

// Refresh once a day. Pages render on first request and cache.
export const revalidate = 86400
// Allow new exercise slugs not in generateStaticParams to be rendered on demand.
export const dynamicParams = true

type Params = { slug: string }

type ExerciseRow = {
  id: string
  name: string
  muscle_group: string | null
  slug?: string | null
  equipment?: string | null
  /** Tolerant — some installs store these as separate columns or JSONB. */
  description?: string | null
  cues?: string[] | string | null
  primary_muscle?: string | null
  secondary_muscles?: string[] | string | null
  mechanic?: string | null
  force?: string | null
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function deslugify(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

async function loadExercise(slug: string): Promise<ExerciseRow | null> {
  const supabase = createPublicClient()

  // Try `slug` column first, fall back to name-search using deslugify.
  const { data: bySlug } = await supabase
    .from('exercises')
    .select('*')
    .eq('slug', slug)
    .limit(1)
    .maybeSingle()

  if (bySlug) return bySlug as ExerciseRow

  const candidate = deslugify(slug)
  const { data: byName } = await supabase
    .from('exercises')
    .select('*')
    .ilike('name', candidate)
    .limit(1)
    .maybeSingle()

  return (byName as ExerciseRow | null) ?? null
}

// Pre-render the top ~80 exercises by alphabetical order; others build on demand.
export async function generateStaticParams(): Promise<Params[]> {
  try {
    const supabase = createPublicClient()
    const { data } = await supabase
      .from('exercises')
      .select('name, slug')
      .order('name', { ascending: true })
      .limit(80)

    if (!data) return []
    return (data as { name: string; slug?: string | null }[]).map((ex) => ({
      slug: ex.slug ?? slugify(ex.name),
    }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const ex = await loadExercise(slug)
  const name = ex?.name ?? deslugify(slug)
  const title = `${name} — exercise guide | PHYZIK`
  const description = ex?.description
    ? ex.description.slice(0, 160)
    : `${name} form cues, muscle group targeting, and equipment notes. From the PHYZIK exercise library.`
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/exercises/${slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/exercises/${slug}`,
    },
  }
}

function toArray(value: string[] | string | null | undefined): string[] {
  if (!value) return []
  if (Array.isArray(value)) return value
  return value
    .split(/\n|;|·|•/g)
    .map((s) => s.trim())
    .filter(Boolean)
}

export default async function ExercisePage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const ex = await loadExercise(slug)

  if (!ex) notFound()

  const cues = toArray(ex.cues)
  const secondary = toArray(ex.secondary_muscles)

  return (
    <>
      <Nav />
      <main id="main-content" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-30 h-[900px]"
          style={{
            background:
              'radial-gradient(ellipse 70% 45% at 50% 0%, rgba(184,151,106,0.12) 0%, transparent 60%), linear-gradient(180deg, #0A0A0B 0%, #050506 100%)',
          }}
        />

        <section className="relative pb-12 pt-28 md:pb-16 md:pt-36">
          <Container>
            <FadeUp>
              <div className="mx-auto flex max-w-[820px] flex-col items-start gap-6">
                <Link
                  href="/exercises"
                  className="text-[12px] uppercase tracking-[0.28em] text-text-tertiary transition-colors hover:text-text-secondary"
                >
                  ← Exercise library
                </Link>

                {ex.muscle_group && (
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.32em] text-accent/80">
                    {ex.muscle_group}
                  </span>
                )}

                <h1 className="text-balance text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold leading-[0.96] tracking-tightest text-text-primary">
                  {ex.name}
                </h1>

                {ex.description && (
                  <p className="max-w-[640px] text-[16px] leading-relaxed text-text-secondary md:text-[18px]">
                    {ex.description}
                  </p>
                )}
              </div>
            </FadeUp>
          </Container>
        </section>

        {/* ─── Facts grid ─── */}
        <section className="relative border-t border-border/60 py-12 md:py-16">
          <Container>
            <div className="mx-auto grid max-w-[820px] grid-cols-1 gap-y-6 md:grid-cols-3 md:gap-x-10">
              {ex.muscle_group && (
                <div className="flex flex-col gap-1">
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-text-tertiary">
                    Primary muscle
                  </span>
                  <span className="text-[15px] text-text-primary">{ex.muscle_group}</span>
                </div>
              )}
              {secondary.length > 0 && (
                <div className="flex flex-col gap-1">
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-text-tertiary">
                    Secondary
                  </span>
                  <span className="text-[15px] text-text-primary">{secondary.join(', ')}</span>
                </div>
              )}
              {ex.equipment && (
                <div className="flex flex-col gap-1">
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-text-tertiary">
                    Equipment
                  </span>
                  <span className="text-[15px] text-text-primary">{ex.equipment}</span>
                </div>
              )}
              {ex.mechanic && (
                <div className="flex flex-col gap-1">
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-text-tertiary">
                    Mechanic
                  </span>
                  <span className="text-[15px] text-text-primary">{ex.mechanic}</span>
                </div>
              )}
              {ex.force && (
                <div className="flex flex-col gap-1">
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-text-tertiary">
                    Force
                  </span>
                  <span className="text-[15px] text-text-primary">{ex.force}</span>
                </div>
              )}
            </div>
          </Container>
        </section>

        {/* ─── Form cues ─── */}
        {cues.length > 0 && (
          <section className="relative border-t border-border/60 py-20 md:py-24">
            <Container>
              <div className="mx-auto max-w-[820px]">
                <FadeUp>
                  <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-none tracking-tightest text-text-primary">
                    Form{' '}
                    <span className="text-shimmer-gold">cues.</span>
                  </h2>
                </FadeUp>
                <ol className="mt-10 flex flex-col">
                  {cues.map((cue, i) => (
                    <FadeUp key={i} delay={0.04 + i * 0.04}>
                      <li className="grid grid-cols-[auto_1fr] items-baseline gap-x-6 border-b border-border/60 py-6 first:border-t md:gap-x-10">
                        <span className="font-mono text-[12px] tabular-nums text-accent/80">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-[16px] leading-snug text-text-primary md:text-[18px]">
                          {cue}
                        </span>
                      </li>
                    </FadeUp>
                  ))}
                </ol>
              </div>
            </Container>
          </section>
        )}

        {/* ─── CTA ─── */}
        <section className="relative border-t border-border/60 py-20 md:py-28">
          <Container>
            <div className="mx-auto flex max-w-[680px] flex-col items-center gap-6 text-center">
              <FadeUp>
                <h2 className="text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.05] tracking-tightest text-text-primary">
                  Log {ex.name.toLowerCase()} in{' '}
                  <span className="text-shimmer-gold">PHYZIK.</span>
                </h2>
              </FadeUp>
              <FadeUp delay={0.05}>
                <p className="max-w-[520px] text-[15px] leading-relaxed text-text-secondary md:text-[16.5px]">
                  Every exercise in this library is built into the app — with
                  live rest timer, auto-suggested loads, and PRs flagged
                  automatically.
                </p>
              </FadeUp>
              <FadeUp delay={0.1}>
                <div className="mt-2 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                  <a
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-7 text-[14.5px] font-semibold tracking-wide text-bg transition-colors hover:bg-accent-dark"
                  >
                    Download on iOS
                  </a>
                  <Link
                    href="/exercises"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-border-mid px-7 text-[14.5px] font-semibold text-text-primary transition-colors hover:border-border-strong hover:bg-white/5"
                  >
                    Back to library
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
