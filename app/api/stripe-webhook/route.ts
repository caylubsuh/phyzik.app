/**
 * Stripe webhook handler.
 *
 * Receives subscription lifecycle events and mirrors them into the Supabase
 * `public.subscriptions` table using the service-role client (bypasses RLS).
 *
 * Configure the endpoint URL in Stripe Dashboard -> Developers -> Webhooks
 * (or via Stripe CLI for local dev):
 *
 *   Production:  https://phyzik.app/api/stripe-webhook
 *   Dev (CLI):   stripe listen --forward-to localhost:3000/api/stripe-webhook
 *
 * Subscribe to at minimum:
 *   - checkout.session.completed
 *   - customer.subscription.created
 *   - customer.subscription.updated
 *   - customer.subscription.deleted
 *   - invoice.payment_failed
 *   - invoice.payment_succeeded
 *
 * Then put the signing secret in STRIPE_WEBHOOK_SECRET.
 */
import { NextResponse, type NextRequest } from 'next/server'
import type Stripe from 'stripe'
import { getStripe } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase/admin'

// Stripe sends raw bytes — we need the body untouched for signature verification.
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

type PlanId = 'monthly' | 'annual'

function planFromPriceId(priceId: string | null): PlanId {
  if (priceId && priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_ANNUAL) return 'annual'
  return 'monthly'
}

function isoOrNull(ts: number | null | undefined): string | null {
  return ts ? new Date(ts * 1000).toISOString() : null
}

/**
 * Read current_period_start / current_period_end with version-agnostic access.
 *
 * In Stripe API versions 2025-04-30 and later these fields moved from the
 * subscription root onto each subscription item. We check the item first and
 * fall back to the root for older API versions.
 */
function readPeriod(subscription: Stripe.Subscription): {
  start: number | null
  end: number | null
} {
  type WithPeriod = {
    current_period_start?: number | null
    current_period_end?: number | null
  }
  const item = subscription.items?.data?.[0] as
    | (Stripe.SubscriptionItem & WithPeriod)
    | undefined
  const root = subscription as Stripe.Subscription & WithPeriod
  return {
    start: item?.current_period_start ?? root.current_period_start ?? null,
    end: item?.current_period_end ?? root.current_period_end ?? null,
  }
}

async function upsertSubscription(subscription: Stripe.Subscription) {
  const admin = createAdminClient()
  const stripe = getStripe()

  // Resolve the Supabase user id from the subscription or the customer.
  let userId = (subscription.metadata?.supabase_user_id as string | undefined) ?? null

  if (!userId) {
    const customerId =
      typeof subscription.customer === 'string'
        ? subscription.customer
        : subscription.customer.id
    const customer = await stripe.customers.retrieve(customerId)
    if (!customer.deleted) {
      userId = (customer.metadata?.supabase_user_id as string | undefined) ?? null
    }
  }

  if (!userId) {
    console.error(
      '[stripe-webhook] No supabase_user_id on subscription or customer',
      subscription.id,
    )
    return
  }

  const priceId = subscription.items.data[0]?.price?.id ?? null
  const plan = planFromPriceId(priceId)
  const customerId =
    typeof subscription.customer === 'string' ? subscription.customer : subscription.customer.id

  const { start, end } = readPeriod(subscription)

  const row = {
    user_id: userId,
    stripe_customer_id: customerId,
    stripe_subscription_id: subscription.id,
    price_id: priceId ?? '',
    status: subscription.status,
    plan,
    current_period_start: isoOrNull(start),
    current_period_end: isoOrNull(end),
    cancel_at_period_end: subscription.cancel_at_period_end ?? false,
    canceled_at: isoOrNull(subscription.canceled_at),
    trial_end: isoOrNull(subscription.trial_end),
  }

  const { error } = await admin
    .from('subscriptions')
    .upsert(row, { onConflict: 'stripe_subscription_id' })

  if (error) {
    console.error('[stripe-webhook] upsert failed', error)
  }
}

export async function POST(request: NextRequest) {
  const sig = request.headers.get('stripe-signature')
  const secret = process.env.STRIPE_WEBHOOK_SECRET

  if (!sig || !secret) {
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 400 })
  }

  const body = await request.text()
  const stripe = getStripe()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'invalid signature'
    return NextResponse.json({ error: `Webhook signature failed: ${message}` }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        if (session.subscription) {
          const subId =
            typeof session.subscription === 'string'
              ? session.subscription
              : session.subscription.id
          const sub = await stripe.subscriptions.retrieve(subId)
          await upsertSubscription(sub)
        }
        break
      }
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        await upsertSubscription(event.data.object as Stripe.Subscription)
        break
      }
      case 'invoice.payment_failed':
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        const subRef = (invoice as Stripe.Invoice & { subscription?: string | Stripe.Subscription })
          .subscription
        if (subRef) {
          const subId = typeof subRef === 'string' ? subRef : subRef.id
          const sub = await stripe.subscriptions.retrieve(subId)
          await upsertSubscription(sub)
        }
        break
      }
      default:
        // No-op for unhandled events.
        break
    }
  } catch (err) {
    console.error('[stripe-webhook] handler error', err)
    return NextResponse.json({ error: 'Handler failed' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
