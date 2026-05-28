/**
 * Single source of truth for PHYZIK Pro + Pro Max membership pricing.
 *
 * Two tiers, two intervals = 4 plans. Web prices are intentionally ~15%
 * lower than the in-app StoreKit prices because the web subscription
 * bypasses Apple's commission and only pays Stripe's ~3%.
 *
 * Plan IDs match the iOS Edge Function's PRODUCT_TIER_MAP scheme
 * (pro_monthly, pro_annual, pro_max_monthly, pro_max_annual) so a single
 * normalized tier string survives across StoreKit + Stripe + Supabase.
 */

export type Tier = 'pro' | 'pro_max'
export type PlanInterval = 'month' | 'year'
export type PlanId =
  | 'pro_monthly'
  | 'pro_annual'
  | 'pro_max_monthly'
  | 'pro_max_annual'

export interface Plan {
  id: PlanId
  tier: Tier
  interval: PlanInterval
  intervalLabel: string

  /** Display string, e.g. "$5.99" */
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
  // ─── Pro ─────────────────────────────────────────────────────────────
  {
    id: 'pro_monthly',
    tier: 'pro',
    interval: 'month',
    intervalLabel: 'per month',
    webPrice: '$5.99',
    webPriceCents: 599,
    inAppPrice: '$6.99',
    inAppPriceCents: 699,
    savingsPct: 14,
    description: 'Billed monthly. Cancel any time.',
  },
  {
    id: 'pro_annual',
    tier: 'pro',
    interval: 'year',
    intervalLabel: 'per year',
    webPrice: '$50.99',
    webPriceCents: 5099,
    inAppPrice: '$59.99',
    inAppPriceCents: 5999,
    savingsPct: 15,
    description: 'Billed once a year.',
    badge: 'Best value',
  },
  // ─── Pro Max ─────────────────────────────────────────────────────────
  {
    id: 'pro_max_monthly',
    tier: 'pro_max',
    interval: 'month',
    intervalLabel: 'per month',
    webPrice: '$9.34',
    webPriceCents: 934,
    inAppPrice: '$10.99',
    inAppPriceCents: 1099,
    savingsPct: 15,
    description: 'Billed monthly. Cancel any time.',
  },
  {
    id: 'pro_max_annual',
    tier: 'pro_max',
    interval: 'year',
    intervalLabel: 'per year',
    webPrice: '$84.99',
    webPriceCents: 8499,
    inAppPrice: '$99.99',
    inAppPriceCents: 9999,
    savingsPct: 15,
    description: 'Billed once a year.',
    badge: 'Best value',
  },
] as const

// ─── Features ────────────────────────────────────────────────────────────
// Mirrors the iOS paywall (components/paywall/PaywallScreen.tsx) so the
// web and app stay aligned. Update both at the same time.

/** Three Pro features — the AI capture tools available to every paid tier. */
export const PRO_FEATURES: readonly string[] = [
  'AI food scanning — snap a meal, get macros in seconds',
  'Voice workout logging — log every set hands-free',
  'Exercise camera ID — point at any machine, logged in one tap',
] as const

/** Four Pro Max additions on top of everything in Pro. */
export const PRO_MAX_DELTA_FEATURES: readonly string[] = [
  'AI Coach Chat — ask anything, grounded in everything you logged',
  'Daily Coach insights — recovery, nutrition, volume takeaways',
  'Weekly check-ins — adaptive plan tuning that evolves with you',
  'Priority on new AI features — Pro Max ships first',
] as const

/**
 * Editorial clusters for the pricing page. Mirrors the iOS paywall's
 * two-section layout: "Everything in Pro" then "Pro Max adds".
 */
export const FEATURE_CLUSTERS: readonly {
  label: string
  tier: Tier
  items: readonly string[]
}[] = [
  {
    label: 'Everything in Pro.',
    tier: 'pro',
    items: PRO_FEATURES,
  },
  {
    label: 'Pro Max adds.',
    tier: 'pro_max',
    items: PRO_MAX_DELTA_FEATURES,
  },
] as const

// ─── Helpers ─────────────────────────────────────────────────────────────

/**
 * Per-month equivalent of an annual plan, formatted as a string.
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

export function getPlanByTierInterval(tier: Tier, interval: PlanInterval): Plan {
  const p = PLANS.find((p) => p.tier === tier && p.interval === interval)
  if (!p) {
    throw new Error(`No plan for tier=${tier} interval=${interval}`)
  }
  return p
}

/** Convenience: all plans within a single tier. */
export function plansForTier(tier: Tier): readonly Plan[] {
  return PLANS.filter((p) => p.tier === tier)
}

/** True when this plan is Pro Max (either interval). */
export function isProMax(planId: PlanId): boolean {
  return planId === 'pro_max_monthly' || planId === 'pro_max_annual'
}

/** Human-readable tier name (for badges, status copy). */
export function tierLabel(tier: Tier): string {
  return tier === 'pro_max' ? 'Pro Max' : 'Pro'
}

/**
 * Resolve the Stripe Price ID for a plan from env at runtime.
 * Throws a clear error if the env var is missing.
 */
export function priceIdFor(planId: PlanId): string {
  const envKey =
    planId === 'pro_monthly'
      ? 'NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY'
      : planId === 'pro_annual'
        ? 'NEXT_PUBLIC_STRIPE_PRICE_PRO_ANNUAL'
        : planId === 'pro_max_monthly'
          ? 'NEXT_PUBLIC_STRIPE_PRICE_PRO_MAX_MONTHLY'
          : 'NEXT_PUBLIC_STRIPE_PRICE_PRO_MAX_ANNUAL'
  const id = process.env[envKey]
  if (!id) {
    throw new Error(
      `Missing Stripe price ID. Set ${envKey} in .env.local once products are created.`,
    )
  }
  return id
}

/**
 * Reverse mapping: Stripe Price ID → PlanId. Used by the webhook handler
 * to write the correct tier string to public.subscriptions. Returns null
 * if the price ID matches no configured plan (treat as unknown).
 */
export function planFromPriceId(priceId: string | null | undefined): PlanId | null {
  if (!priceId) return null
  if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY) return 'pro_monthly'
  if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_ANNUAL) return 'pro_annual'
  if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_MAX_MONTHLY) return 'pro_max_monthly'
  if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_MAX_ANNUAL) return 'pro_max_annual'
  return null
}
