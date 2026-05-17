/**
 * Create a Stripe Checkout Session for the signed-in user.
 *
 * Flow:
 *   1. Auth-check via Supabase server client.
 *   2. Look up / create the user's Stripe customer (by email, with a Supabase user_id
 *      stored on the customer's metadata for the webhook to dereference).
 *   3. Create a subscription-mode Checkout Session with the selected plan's price.
 *   4. Redirect the browser to the hosted Stripe Checkout URL.
 *
 * Called via:
 *   GET  /api/checkout?plan=monthly  -> redirect (used after signup)
 *   POST /api/checkout               -> JSON { plan } -> JSON { url }
 */
import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getStripe } from '@/lib/stripe'
import { getPlan, priceIdFor, type PlanId } from '@/lib/pricing'

function isPlanId(v: unknown): v is PlanId {
  return v === 'monthly' || v === 'annual'
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
  const planId = new URL(request.url).searchParams.get('plan')
  if (!isPlanId(planId)) {
    return NextResponse.redirect(new URL('/pricing', request.url))
  }
  const result = await startCheckout(request, planId)
  if (result instanceof NextResponse) return result
  return NextResponse.redirect(result.url)
}

export async function POST(request: NextRequest) {
  let planId: unknown
  try {
    const body = await request.json()
    planId = body.plan
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }
  if (!isPlanId(planId)) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
  }
  const result = await startCheckout(request, planId)
  if (result instanceof NextResponse) return result
  return NextResponse.json({ url: result.url })
}
