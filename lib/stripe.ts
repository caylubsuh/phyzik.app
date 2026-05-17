/**
 * Stripe SDK init (server-side only).
 */
import 'server-only'
import Stripe from 'stripe'

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (_stripe) return _stripe

  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('Missing env: STRIPE_SECRET_KEY')

  _stripe = new Stripe(key, {
    apiVersion: '2024-11-20.acacia' as Stripe.LatestApiVersion,
    typescript: true,
  })
  return _stripe
}
