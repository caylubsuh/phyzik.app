import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import Container from '@/components/ui/Container'
import PhyzikMark from '@/components/brand/PhyzikMark'
import { createClient } from '@/lib/supabase/server'
import { SITE_URL } from '@/lib/constants'
import {
  PRO_FEATURES,
  PRO_MAX_DELTA_FEATURES,
  getPlan,
  isProMax,
  tierLabel,
  type PlanId,
} from '@/lib/pricing'

export const metadata: Metadata = {
  title: 'Member — PHYZIK',
  description: 'Manage your PHYZIK Pro membership.',
  alternates: { canonical: `${SITE_URL}/account` },
  robots: { index: false, follow: false },
}

type SubStatus =
  | 'active'
  | 'trialing'
  | 'past_due'
  | 'canceled'
  | 'unpaid'
  | 'incomplete'
  | 'incomplete_expired'
  | 'paused'

const STATUS_LABEL: Record<SubStatus, string> = {
  active: 'Active',
  trialing: 'Trial',
  past_due: 'Past due',
  canceled: 'Canceled',
  unpaid: 'Unpaid',
  incomplete: 'Incomplete',
  incomplete_expired: 'Expired',
  paused: 'Paused',
}

function fmtMonthYear(iso: string | null): string | null {
  if (!iso) return null
  const d = new Date(iso)
  return d.toLocaleDateString(undefined, { month: '2-digit', year: '2-digit' }).replace('/', ' / ')
}

function fmtLongDate(iso: string | null): string | null {
  if (!iso) return null
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function fmtMemberSince(iso: string | null): string | null {
  if (!iso) return null
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric',
  })
}

function daysUntil(iso: string | null): number | null {
  if (!iso) return null
  const ms = new Date(iso).getTime() - Date.now()
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)))
}

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?next=/account')
  }

  const { data: subRow } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  const sub = subRow as
    | {
        plan: PlanId
        status: SubStatus
        current_period_end: string | null
        cancel_at_period_end: boolean
        created_at: string
        trial_end: string | null
      }
    | null

  const planMeta = sub ? getPlan(sub.plan) : null
  const isActive = sub ? sub.status === 'active' || sub.status === 'trialing' : false
  // Tier-aware label + features list. Pro Max card shows the full feature set
  // (Pro + Pro Max delta); Pro card shows just the Pro features.
  const memberTierLabel = sub ? tierLabel(getPlan(sub.plan).tier) : 'Pro'
  const memberFeatures: readonly string[] = sub && isProMax(sub.plan)
    ? [...PRO_FEATURES, ...PRO_MAX_DELTA_FEATURES]
    : PRO_FEATURES

  let banner: { tone: 'warn' | 'info' | 'danger'; text: string } | null = null
  if (sub) {
    if (sub.status === 'past_due' || sub.status === 'unpaid') {
      banner = {
        tone: 'danger',
        text: 'Your last charge failed. Update your card to keep your membership active.',
      }
    } else if (sub.status === 'trialing' && sub.trial_end) {
      const d = daysUntil(sub.trial_end)
      banner = {
        tone: 'warn',
        text: `Your free trial ends in ${d} day${d === 1 ? '' : 's'}.`,
      }
    } else if (sub.cancel_at_period_end && sub.current_period_end) {
      banner = {
        tone: 'warn',
        text: `Your membership ends ${fmtLongDate(sub.current_period_end)}. AI features deactivate after that.`,
      }
    } else if (sub.status === 'active' && sub.current_period_end) {
      const d = daysUntil(sub.current_period_end)
      if (d !== null && d <= 14) {
        banner = {
          tone: 'info',
          text: `Your membership renews in ${d} day${d === 1 ? '' : 's'} for ${planMeta?.webPrice}.`,
        }
      }
    }
  }

  const bannerToneClass: Record<'warn' | 'info' | 'danger', string> = {
    warn: 'border-yellow-500/30 bg-yellow-500/[0.06] text-yellow-100',
    info: 'border-accent/30 bg-accent/[0.06] text-text-primary',
    danger: 'border-red-500/30 bg-red-500/[0.06] text-red-100',
  }

  return (
    <>
      <Nav />

      <main id="main-content" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(184,151,106,0.10) 0%, transparent 60%), linear-gradient(180deg, #0A0A0B 0%, #050506 100%)',
          }}
        />

        <section className="pb-24 pt-28 md:pt-36">
          <Container>
            <div className="mx-auto flex w-full max-w-[640px] flex-col">
              {/* Top strip */}
              <div className="flex items-center justify-between gap-3">
                <span className="text-[10.5px] font-bold uppercase tracking-[0.32em] text-text-tertiary">
                  {sub ? 'Membership' : 'Account'}
                </span>
                <div className="flex items-center gap-4 text-[12.5px]">
                  <span className="hidden truncate text-text-tertiary sm:inline">
                    {user.email}
                  </span>
                  <form action="/auth/signout" method="post">
                    <button
                      type="submit"
                      className="rounded text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                    >
                      Sign out
                    </button>
                  </form>
                </div>
              </div>

              {banner && (
                <div
                  className={`mt-6 flex items-start gap-3 rounded-2xl border px-4 py-3.5 text-[13.5px] leading-snug ${bannerToneClass[banner.tone]}`}
                  role="status"
                >
                  <span
                    aria-hidden="true"
                    className={`mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full ${
                      banner.tone === 'danger'
                        ? 'bg-red-400'
                        : banner.tone === 'warn'
                          ? 'bg-yellow-400'
                          : 'bg-accent'
                    }`}
                  />
                  <span>{banner.text}</span>
                </div>
              )}

              {params.success && (
                <div className="mt-6 flex items-start gap-3 rounded-2xl border border-accent/30 bg-accent/[0.06] p-4 text-[14px] text-text-primary">
                  <span
                    aria-hidden="true"
                    className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-accent"
                  />
                  <span>
                    You&apos;re in. Open PHYZIK on your phone — the AI features
                    unlock the next time you log in.
                  </span>
                </div>
              )}

              {/* ─── MEMBERSHIP CARD (preserved) ─── */}
              {sub && planMeta && (
                <div className="relative mt-10 aspect-[1.586/1] w-full overflow-hidden rounded-[26px]">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      background:
                        'radial-gradient(circle at 0% 0%, #2a2418 0%, transparent 55%), radial-gradient(circle at 100% 100%, #3a2f1c 0%, transparent 55%), linear-gradient(160deg, #1c1813 0%, #0d0c0a 100%)',
                    }}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-30 mix-blend-overlay"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 3px)',
                    }}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 rounded-[26px] ring-1 ring-inset ring-accent/25"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent 0%, rgba(212,180,124,0.65) 35%, rgba(245,220,170,0.85) 50%, rgba(212,180,124,0.65) 65%, transparent 100%)',
                    }}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(135deg, transparent 0%, transparent 38%, rgba(212,180,124,0.10) 50%, transparent 62%, transparent 100%)',
                    }}
                  />

                  <div className="relative flex h-full flex-col justify-between p-6 md:p-8">
                    <div className="flex items-start justify-between">
                      <span className="text-[9.5px] font-bold uppercase tracking-[0.32em] text-accent/80">
                        Member
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 text-[9.5px] font-bold uppercase tracking-[0.22em] ${
                          isActive ? 'text-accent' : 'text-text-tertiary'
                        }`}
                      >
                        <span
                          className={`inline-flex h-1.5 w-1.5 rounded-full ${
                            isActive ? 'bg-accent' : 'bg-text-tertiary'
                          }`}
                        />
                        {STATUS_LABEL[sub.status]}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <PhyzikMark sizeClass="h-7 w-auto md:h-9" />
                      <span
                        className="text-[14px] font-bold uppercase tracking-[0.34em] md:text-[17px]"
                        style={{
                          background:
                            'linear-gradient(135deg, #d4b47c 0%, #f5dcaa 35%, #b8976a 70%, #997b54 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          color: 'transparent',
                        }}
                      >
                        {memberTierLabel}
                      </span>
                    </div>

                    <div className="flex items-end justify-between gap-4">
                      <div className="flex min-w-0 flex-col gap-1">
                        <span className="text-[9.5px] font-bold uppercase tracking-[0.28em] text-text-tertiary">
                          Plan
                        </span>
                        <span className="text-[16px] font-semibold leading-none tracking-tight text-text-primary md:text-[20px]">
                          {planMeta.interval === 'year' ? 'Annual' : 'Monthly'} ·{' '}
                          {planMeta.webPrice}
                        </span>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[9.5px] font-bold uppercase tracking-[0.28em] text-text-tertiary">
                          {sub.cancel_at_period_end ? 'Ends' : 'Renews'}
                        </span>
                        <span className="font-mono text-[16px] font-semibold leading-none tabular-nums tracking-tight text-text-primary md:text-[20px]">
                          {fmtMonthYear(sub.current_period_end) ?? '— / —'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Status sentence */}
              {sub && planMeta && sub.current_period_end && (
                <div className="mt-7 flex flex-col gap-1.5">
                  <p className="text-[18px] font-semibold leading-snug tracking-tight text-text-primary md:text-[20px]">
                    {isActive ? (
                      <>
                        <span className="text-accent">Active.</span>{' '}
                        {sub.cancel_at_period_end ? 'Ends' : 'Renews'} on{' '}
                        <span className="tabular-nums">{fmtLongDate(sub.current_period_end)}</span>
                        {!sub.cancel_at_period_end && (
                          <>
                            {' '}for{' '}
                            <span className="tabular-nums">{planMeta.webPrice}</span>
                          </>
                        )}
                        .
                      </>
                    ) : (
                      <>
                        <span className="text-text-tertiary">
                          {STATUS_LABEL[sub.status]}.
                        </span>{' '}
                        Manage below.
                      </>
                    )}
                  </p>
                  <p className="text-[12.5px] text-text-tertiary">
                    Member since{' '}
                    <span className="tabular-nums text-text-secondary">
                      {fmtMemberSince(sub.created_at)}
                    </span>
                    .
                  </p>
                </div>
              )}

              {!sub && (
                <div className="mt-10 flex flex-col gap-4 rounded-[26px] border border-border bg-bg-high/40 p-8">
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.28em] text-text-tertiary">
                    Free
                  </span>
                  <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-tight tracking-tightest text-text-primary">
                    Upgrade to <span className="text-shimmer-gold">Pro.</span>
                  </h1>
                  <p className="text-[15px] leading-relaxed text-text-secondary">
                    AI form-check, adaptive programming, smart scheduling, and
                    the nutrition coach unlock with a Pro membership.
                  </p>
                  <Link
                    href="/pricing"
                    className="mt-2 inline-flex h-11 w-fit items-center justify-center rounded-full bg-accent px-6 text-[14px] font-semibold text-bg transition-colors hover:bg-accent-dark"
                  >
                    See plans
                  </Link>
                </div>
              )}

              {sub && (
                <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                  <form action="/api/portal" method="post" className="contents">
                    <button
                      type="submit"
                      className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-accent text-[14px] font-semibold text-bg transition-colors hover:bg-accent-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                    >
                      Manage membership
                    </button>
                  </form>
                  <p className="text-[12px] text-text-tertiary sm:text-right">
                    Opens Stripe&apos;s billing portal
                    <br className="hidden sm:inline" />
                    {' '}— payment, plan, cancel
                  </p>
                </div>
              )}

              {/* Benefits panel */}
              {sub && (
                <section className="mt-16">
                  <div className="flex items-baseline justify-between">
                    <h2 className="text-[22px] font-bold leading-none tracking-tightest text-text-primary md:text-[28px]">
                      What you{' '}
                      <span className="text-shimmer-gold">own.</span>
                    </h2>
                    <span className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-accent/80">
                      {String(memberFeatures.length).padStart(2, '0')}
                    </span>
                  </div>

                  <ol className="mt-6 flex flex-col">
                    {memberFeatures.map((feature, i) => (
                      <li
                        key={feature}
                        className="group grid grid-cols-[auto_1fr] items-baseline gap-x-5 border-b border-border/60 py-5 first:border-t md:gap-x-10"
                      >
                        <span className="font-mono text-[12px] tabular-nums tracking-tight text-accent/70">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-[16px] font-medium leading-snug text-text-primary transition-colors group-hover:text-accent md:text-[18px]">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              <p className="mt-16 text-[11.5px] leading-relaxed text-text-tertiary">
                Billed by Stripe on behalf of Physique Technologies LLC. Cancel
                anytime — access continues until the end of the current
                period. Questions?{' '}
                <a
                  href="mailto:admin@phyzik.app"
                  className="text-accent underline-offset-4 hover:underline"
                >
                  admin@phyzik.app
                </a>
                .
              </p>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  )
}
