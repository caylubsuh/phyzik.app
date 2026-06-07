/**
 * Create a Stripe Checkout Session for the signed-in user.
 *
 * Flow:
 *   1. Auth-check via Supabase server client.
 *   2. Look up / create the user's Stripe customer (by email, with a Supabase
 *      user_id stored on the customer's metadata for the webhook).
 *   3. Create a subscription-mode Checkout Session with the selected plan's
 *      Stripe price.
 *   4. Redirect the browser to the hosted Stripe Checkout URL.
 *
 * Two routing styles accepted:
 *
 *   New (tier+interval — preferred):
 *     GET  /api/checkout?tier=pro&interval=year
 *     POST /api/checkout  body: { tier: 'pro', interval: 'month'|'year' }
 *
 *   Legacy (planId direct):
 *     GET  /api/checkout?plan=pro_monthly
 *     GET  /api/checkout?plan=pro_annual
 *
 *   Backwards-compat (old monthly/annual single-tier):
 *     GET  /api/checkout?plan=monthly   → routes to pro_monthly
 *     GET  /api/checkout?plan=annual    → routes to pro_annual
 */
import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getStripe } from '@/lib/stripe'
import {
  getPlan,
  getPlanByTierInterval,
  priceIdFor,
  type PlanId,
  type Tier,
  type PlanInterval,
} from '@/lib/pricing'

function isPlanId(v: unknown): v is PlanId {
  return v === 'pro_monthly' || v === 'pro_annual'
}

function isTier(v: unknown): v is Tier {
  return v === 'pro'
}

function isInterval(v: unknown): v is PlanInterval {
  return v === 'month' || v === 'year'
}

/**
 * Normalize an inbound request's plan/tier/interval params into a PlanId.
 * Returns null if the params are missing or invalid.
 */
function resolvePlanId(params: {
  plan?: unknown
  tier?: unknown
  interval?: unknown
}): PlanId | null {
  // Direct planId path
  if (isPlanId(params.plan)) return params.plan

  // Legacy single-tier path: 'monthly' / 'annual' → assume Pro tier
  if (params.plan === 'monthly') return 'pro_monthly'
  if (params.plan === 'annual') return 'pro_annual'

  // Tier + interval path (preferred)
  if (isTier(params.tier) && isInterval(params.interval)) {
    return getPlanByTierInterval(params.tier, params.interval).id
  }

  return null
}

async function startCheckout(request: NextRequest, planId: PlanId) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    const { origin, pathname, search } = new URL(request.url)
    const next = encodeURIComponent(`${pathname}${search}`)
    return NextResponse.redirect(`${origin}/login?next=${next}&plan=${planId}`)
  }

  const stripe = getStripe()
  const { origin } = new URL(request.url)

  // Reuse an existing Stripe customer if we have one on a previous subscription row.
  const { data: existing } = await supabase
    .from('subscriptions')
    .select('stripe_customer_id')
    .eq('user_id', user.id)
    .not('stripe_customer_id', 'is', null)
    .limit(1)
    .maybeSingle()

  let customerId = existing?.stripe_customer_id ?? null

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email ?? undefined,
      metadata: { supabase_user_id: user.id },
    })
    customerId = customer.id
  }

  const plan = getPlan(planId)
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer: customerId,
    line_items: [{ price: priceIdFor(plan.id), quantity: 1 }],
    success_url: `${origin}/account?success=1`,
    cancel_url: `${origin}/pricing?cancel=1`,
    allow_promotion_codes: true,
    subscription_data: {
      metadata: {
        supabase_user_id: user.id,
        plan: plan.id,
        tier: plan.tier,
      },
    },
    client_reference_id: user.id,
  })

  if (!session.url) {
    return NextResponse.json({ error: 'Stripe did not return a Checkout URL' }, { status: 502 })
  }

  return { url: session.url }
}

export async function GET(request: NextRequest) {
  const search = new URL(request.url).searchParams
  const planId = resolvePlanId({
    plan: search.get('plan'),
    tier: search.get('tier'),
    interval: search.get('interval'),
  })
  if (!planId) {
    return NextResponse.redirect(new URL('/pricing', request.url))
  }
  const result = await startCheckout(request, planId)
  if (result instanceof NextResponse) return result
  return NextResponse.redirect(result.url)
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }
  const planId = resolvePlanId({
    plan: body.plan,
    tier: body.tier,
    interval: body.interval,
  })
  if (!planId) {
    return NextResponse.json({ error: 'Invalid plan / tier / interval' }, { status: 400 })
  }
  const result = await startCheckout(request, planId)
  if (result instanceof NextResponse) return result
  return NextResponse.json({ url: result.url })
}
