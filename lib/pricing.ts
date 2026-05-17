/**
 * Single source of truth for PHYZIK Pro membership pricing.
 *
 * Web prices are intentionally lower than the in-app StoreKit prices
 * because the web subscription bypasses Apple's commission.
 */

export type PlanId = 'monthly' | 'annual'
export type PlanInterval = 'month' | 'year'

export interface Plan {
  id: PlanId
  interval: PlanInterval
  intervalLabel: string

  /** Display string, e.g. "$3.99" */
  webPrice: string
  /** Billed amount in cents (used to create Stripe price). */
  webPriceCents: number

  /** What the same plan costs in-app (for comparison only). */
  inAppPrice: string
  inAppPriceCents: number

  /** % saved versus in-app. */
  savingsPct: number

  description: string
  badge?: string
}

export const PLANS: readonly Plan[] = [
  {
    id: 'monthly',
    interval: 'month',
    intervalLabel: 'per month',
    webPrice: '$3.99',
    webPriceCents: 399,
    inAppPrice: '$4.99',
    inAppPriceCents: 499,
    savingsPct: 20,
    description: 'Billed monthly. Cancel any time.',
  },
  {
    id: 'annual',
    interval: 'year',
    intervalLabel: 'per year',
    webPrice: '$34.99',
    webPriceCents: 3499,
    inAppPrice: '$39.99',
    inAppPriceCents: 3999,
    savingsPct: 13,
    description: 'Billed once a year.',
    badge: 'Best value',
  },
] as const

/**
 * Member-ownership voice. Used on /pricing and /account.
 * Drives both the flat list (account page) and the clusters (pricing page).
 */
export const PRO_FEATURES: readonly string[] = [
  'Your AI coach watches every set',
  'Your program adapts to your real performance',
  'Your week rebalances when life gets in the way',
  'Your nutrition stays aligned with your training',
  'You get priority support',
] as const

/**
 * Same features re-cast into three thematic editorial clusters
 * for the pricing page. Mirrors how luxury membership pages
 * group benefits under short verbed labels.
 */
export const FEATURE_CLUSTERS: readonly {
  label: string
  items: readonly string[]
}[] = [
  {
    label: 'Coach.',
    items: [
      'Real-time AI form-check on every set.',
      'Programming that adapts to your real performance — auto deloads, exercise swaps.',
    ],
  },
  {
    label: 'Plan.',
    items: [
      'Your training week rebalances when life gets in the way.',
      'Cycle-based periodization that knows when you peak and when to back off.',
    ],
  },
  {
    label: 'Fuel.',
    items: [
      'Macros and meal advice that follow your training load.',
    ],
  },
] as const

/**
 * Helper: per-month equivalent of an annual plan, formatted as a string.
 * Used to soften the upfront cost without hiding the actual amount billed.
 */
export function perMonthEquivalent(plan: Plan): string {
  if (plan.interval === 'month') return plan.webPrice
  const cents = Math.round(plan.webPriceCents / 12)
  return `$${(cents / 100).toFixed(2)}`
}

export function getPlan(id: PlanId): Plan {
  const p = PLANS.find((p) => p.id === id)
  if (!p) throw new Error(`Unknown plan id: ${id}`)
  return p
}

/**
 * Resolve the Stripe Price ID for a plan from env at runtime.
 * Throws a clear error if the env var is missing (handy in dev).
 */
export function priceIdFor(planId: PlanId): string {
  const envKey =
    planId === 'monthly'
      ? 'NEXT_PUBLIC_STRIPE_PRICE_MONTHLY'
      : 'NEXT_PUBLIC_STRIPE_PRICE_ANNUAL'
  const id = process.env[envKey]
  if (!id) {
    throw new Error(
      `Missing Stripe price ID. Set ${envKey} in .env.local once products are created.`,
    )
  }
  return id
}
