'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Loader2,
  Lock,
} from 'lucide-react'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { ZMark } from '@/components/brand/BrandMarks'
import { useCart, type CartItem } from '@/components/shop/CartContext'
import { createClient } from '@/lib/supabase/client'
import { formatCents } from '@/lib/marketplace/format'
import type { ShipTo } from '@/lib/marketplace/types'

type AuthState = 'checking' | 'authed' | 'anon'

interface CreatedOrder {
  orderId?: string
  clientSecret?: string
  amountTotalCents?: number
  amountSubtotalCents?: number
  shippingCents?: number
  taxCents?: number
  currency?: string
}

const EMPTY_SHIP: ShipTo = {
  name: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  zip: '',
  country: 'US',
}

function Field({
  label,
  value,
  onChange,
  required,
  autoComplete,
  className,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  required?: boolean
  autoComplete?: string
  className?: string
}) {
  return (
    <label className={className}>
      <span className="mb-1.5 block text-[11.5px] font-bold uppercase tracking-[0.16em] text-text-tertiary">
        {label}
        {required && <span className="ml-1 text-accent">*</span>}
      </span>
      <input
        type="text"
        value={value}
        required={required}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-[3px] border border-border bg-bg-deep/70 px-3.5 text-[14px] text-text-primary outline-none transition-colors placeholder:text-text-tertiary focus:border-accent/60 focus-visible:ring-2 focus-visible:ring-accent/40"
      />
    </label>
  )
}

function CheckoutInner() {
  const params = useSearchParams()
  const brandId = params.get('brand')
  const { items, clearBrand, hydrated } = useCart()

  const [auth, setAuth] = useState<AuthState>('checking')
  const [ship, setShip] = useState<ShipTo>(EMPTY_SHIP)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [order, setOrder] = useState<CreatedOrder | null>(null)

  // Scope the cart to the brand being checked out.
  const brandItems = useMemo<CartItem[]>(
    () => (brandId ? items.filter((i) => i.brandId === brandId) : []),
    [items, brandId],
  )
  const brandName = brandItems[0]?.brandName ?? 'this brand'
  const subtotalCents = brandItems.reduce(
    (sum, i) => sum + i.priceCents * i.qty,
    0,
  )

  // Auth gate via the browser client.
  useEffect(() => {
    let active = true
    const sb = createClient()
    sb.auth.getSession().then(({ data }) => {
      if (!active) return
      setAuth(data.session ? 'authed' : 'anon')
    })
    return () => {
      active = false
    }
  }, [])

  function update(key: keyof ShipTo, value: string) {
    setShip((prev) => ({ ...prev, [key]: value }))
  }

  const canSubmit =
    auth === 'authed' &&
    brandItems.length > 0 &&
    !submitting &&
    !!ship.name?.trim() &&
    !!ship.line1?.trim() &&
    !!ship.city?.trim() &&
    !!ship.state?.trim() &&
    !!ship.zip?.trim()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit || !brandId) return
    setSubmitting(true)
    setError(null)

    try {
      const sb = createClient()
      const { data, error: fnError } = await sb.functions.invoke(
        'marketplace-create-payment-intent',
        {
          body: {
            items: brandItems.map((i) => ({ variantId: i.variantId, qty: i.qty })),
            shipTo: ship,
            brandId,
            checkoutId: crypto.randomUUID(),
          },
        },
      )

      if (fnError) {
        setError(
          'We could not start this order. Payments are still being switched on for the web — try again shortly or check out in the app.',
        )
        return
      }

      const result = (data ?? {}) as CreatedOrder
      setOrder(result)
      // Order created on the backend — clear this brand from the local cart.
      clearBrand(brandId)
    } catch {
      setError(
        'Something went wrong starting checkout. Please try again in a moment.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Nav />

      <main id="main-content" className="relative min-h-[60vh] pb-24 pt-28 md:pt-32">
        <Container>
          <Link
            href="/shop/cart"
            className="mb-8 inline-flex items-center gap-1.5 text-[13px] font-semibold text-text-secondary transition-colors hover:text-text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to cart
          </Link>

          <div className="mb-10">
            <span className="block text-[10.5px] font-bold uppercase tracking-[0.36em] text-text-tertiary">
              Checkout
            </span>
            <h1 className="mt-3 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-bold tracking-tightest text-text-primary">
              {order ? 'Order started' : 'Secure checkout'}
            </h1>
          </div>

          {/* No brand specified */}
          {!brandId ? (
            <EmptyNotice
              title="Pick a brand to check out"
              message="Checkout happens one brand at a time. Head back to your cart and choose a brand's Checkout button."
              cta={{ href: '/shop/cart', label: 'Back to cart' }}
            />
          ) : auth === 'checking' || !hydrated ? (
            <div className="flex items-center gap-3 rounded-[3px] border border-border/70 bg-bg-surface/50 px-6 py-8 text-[14px] text-text-secondary">
              <Loader2 className="h-4 w-4 animate-spin text-accent" />
              Loading checkout…
            </div>
          ) : auth === 'anon' ? (
            // Auth required
            <div className="relative flex flex-col items-center gap-6 overflow-hidden rounded-[3px] border border-accent/40 bg-bg-high/50 px-8 py-16 text-center">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(245,220,170,0.7), transparent)',
                }}
              />
              <span className="flex h-14 w-14 items-center justify-center rounded-[3px] border border-border bg-bg-deep/80">
                <Lock className="h-6 w-6 text-accent" />
              </span>
              <div className="flex flex-col items-center gap-2">
                <h2 className="font-display text-[20px] font-bold tracking-tightest text-text-primary">
                  Sign in to check out
                </h2>
                <p className="max-w-[380px] text-[14px] leading-relaxed text-text-secondary">
                  Use the same account as the PHYZIK app so your orders, tracking,
                  and receipts live in one place.
                </p>
              </div>
              <Button variant="gold" size="lg" asChild>
                <Link href="/login?next=/shop/checkout">
                  Sign in to continue
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          ) : order ? (
            // Order created — summary + complete-payment panel
            <OrderConfirmation
              order={order}
              brandName={brandName}
              fallbackSubtotal={subtotalCents}
            />
          ) : brandItems.length === 0 ? (
            <EmptyNotice
              title="Nothing to check out"
              message="There are no items from this brand in your cart."
              cta={{ href: '/shop', label: 'Browse the shop' }}
            />
          ) : (
            // Shipping form + summary
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-10 lg:grid-cols-[1.5fr_1fr]"
            >
              <div className="flex flex-col gap-7">
                <div>
                  <h2 className="font-display text-[17px] font-bold tracking-tightest text-text-primary">
                    Ship to
                  </h2>
                  <p className="mt-1 text-[13px] text-text-secondary">
                    Order ships direct from{' '}
                    <span className="text-text-primary">{brandName}</span>.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Field
                    label="Full name"
                    value={ship.name ?? ''}
                    onChange={(v) => update('name', v)}
                    required
                    autoComplete="name"
                    className="col-span-2"
                  />
                  <Field
                    label="Address"
                    value={ship.line1 ?? ''}
                    onChange={(v) => update('line1', v)}
                    required
                    autoComplete="address-line1"
                    className="col-span-2"
                  />
                  <Field
                    label="Apt, suite (optional)"
                    value={ship.line2 ?? ''}
                    onChange={(v) => update('line2', v)}
                    autoComplete="address-line2"
                    className="col-span-2"
                  />
                  <Field
                    label="City"
                    value={ship.city ?? ''}
                    onChange={(v) => update('city', v)}
                    required
                    autoComplete="address-level2"
                  />
                  <Field
                    label="State"
                    value={ship.state ?? ''}
                    onChange={(v) => update('state', v)}
                    required
                    autoComplete="address-level1"
                  />
                  <Field
                    label="ZIP"
                    value={ship.zip ?? ''}
                    onChange={(v) => update('zip', v)}
                    required
                    autoComplete="postal-code"
                  />
                  <Field
                    label="Country"
                    value={ship.country ?? ''}
                    onChange={(v) => update('country', v)}
                    required
                    autoComplete="country-name"
                  />
                </div>

                {error && (
                  <p
                    role="alert"
                    className="rounded-[3px] border border-border-strong bg-bg-surface/60 px-4 py-3 text-[13.5px] text-text-secondary"
                  >
                    {error}
                  </p>
                )}

                <Button
                  variant="gold"
                  size="lg"
                  type="submit"
                  disabled={!canSubmit}
                  className="w-full sm:w-auto"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Starting order…
                    </>
                  ) : (
                    <>
                      Continue to payment
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>

              {/* Summary */}
              <aside className="lg:sticky lg:top-28 lg:self-start">
                <div className="rounded-[3px] border border-border bg-bg-surface/60 p-6">
                  <h2 className="font-display text-[16px] font-bold tracking-tightest text-text-primary">
                    {brandName}
                  </h2>
                  <ul className="mt-5 flex flex-col gap-4">
                    {brandItems.map((item) => (
                      <li key={item.variantId} className="flex items-center gap-3">
                        <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-[3px] border border-border bg-bg-deep">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          ) : (
                            <span className="flex h-full w-full items-center justify-center">
                              <ZMark sizeClass="h-5 w-auto opacity-30" />
                            </span>
                          )}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="line-clamp-1 text-[13px] text-text-primary">
                            {item.name}
                          </span>
                          <span className="text-[12px] text-text-tertiary">
                            Qty {item.qty}
                            {item.variantLabel ? ` · ${item.variantLabel}` : ''}
                          </span>
                        </span>
                        <span className="text-[13px] tabular-nums text-text-secondary">
                          {formatCents(item.priceCents * item.qty)}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div
                    aria-hidden="true"
                    className="my-5 h-px w-full"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent, rgba(168,137,46,0.35), transparent)',
                    }}
                  />
                  <div className="flex items-center justify-between text-[14px]">
                    <span className="text-text-secondary">Subtotal</span>
                    <span className="font-semibold tabular-nums text-text-primary">
                      {formatCents(subtotalCents)}
                    </span>
                  </div>
                  <p className="mt-2 text-[12px] text-text-tertiary">
                    Shipping and tax calculated on the next step.
                  </p>
                </div>
              </aside>
            </form>
          )}
        </Container>
      </main>

      <Footer />
    </>
  )
}

function EmptyNotice({
  title,
  message,
  cta,
}: {
  title: string
  message: string
  cta: { href: string; label: string }
}) {
  return (
    <div className="flex flex-col items-center gap-5 rounded-[3px] border border-border/70 bg-bg-surface/50 px-8 py-16 text-center">
      <h2 className="font-display text-[19px] font-bold tracking-tightest text-text-primary">
        {title}
      </h2>
      <p className="max-w-[360px] text-[14px] leading-relaxed text-text-secondary">
        {message}
      </p>
      <Button variant="secondary" size="md" asChild>
        <Link href={cta.href}>{cta.label}</Link>
      </Button>
    </div>
  )
}

function OrderConfirmation({
  order,
  brandName,
  fallbackSubtotal,
}: {
  order: CreatedOrder
  brandName: string
  fallbackSubtotal: number
}) {
  const currency = order.currency ?? 'USD'
  const subtotal = order.amountSubtotalCents ?? fallbackSubtotal
  const total = order.amountTotalCents ?? subtotal

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.5fr_1fr]">
      {/* Complete payment panel */}
      <div className="relative overflow-hidden rounded-[3px] border border-accent/40 bg-bg-high/50 p-7 md:p-9">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(245,220,170,0.7), transparent)',
          }}
        />
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-[3px] border border-accent/40 bg-bg-deep/80">
            <CheckCircle2 className="h-5 w-5 text-accent-bright" />
          </span>
          <div>
            <h2 className="font-display text-[18px] font-bold tracking-tightest text-text-primary">
              Order reserved
            </h2>
            <p className="text-[13px] text-text-secondary">
              Your items from {brandName} are held.
            </p>
          </div>
        </div>

        {order.orderId && (
          <p className="mt-5 text-[12.5px] text-text-tertiary">
            Order reference{' '}
            <span className="font-mono text-text-secondary">
              {order.orderId}
            </span>
          </p>
        )}

        <div className="mt-7 rounded-[3px] border border-border bg-bg-deep/60 p-5">
          <div className="flex items-center gap-2.5">
            <CreditCard className="h-4 w-4 text-accent" />
            <span className="text-[13px] font-bold uppercase tracking-[0.16em] text-text-secondary">
              Complete payment
            </span>
          </div>
          <p className="mt-3 text-[13.5px] leading-relaxed text-text-secondary">
            Live card entry activates once Stripe web keys are configured. The
            checkout is running in test mode — your order has been created on the
            backend, and the payment step will open here the moment web payments
            go live.
          </p>
          <div className="mt-4 flex items-center gap-2 text-[12px] text-text-tertiary">
            <Lock className="h-3.5 w-3.5" />
            Card details are never collected on this page.
          </div>
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <Button variant="secondary" size="md" asChild>
            <Link href="/shop">Keep shopping</Link>
          </Button>
          <Button variant="ghost" size="md" asChild>
            <Link href="/account">View account</Link>
          </Button>
        </div>
      </div>

      {/* Totals */}
      <aside>
        <div className="rounded-[3px] border border-border bg-bg-surface/60 p-6">
          <h3 className="font-display text-[16px] font-bold tracking-tightest text-text-primary">
            Order total
          </h3>
          <dl className="mt-5 flex flex-col gap-3 text-[14px]">
            <div className="flex items-center justify-between">
              <dt className="text-text-secondary">Subtotal</dt>
              <dd className="tabular-nums text-text-primary">
                {formatCents(subtotal, currency)}
              </dd>
            </div>
            {order.shippingCents != null && (
              <div className="flex items-center justify-between">
                <dt className="text-text-secondary">Shipping</dt>
                <dd className="tabular-nums text-text-primary">
                  {formatCents(order.shippingCents, currency)}
                </dd>
              </div>
            )}
            {order.taxCents != null && (
              <div className="flex items-center justify-between">
                <dt className="text-text-secondary">Tax</dt>
                <dd className="tabular-nums text-text-primary">
                  {formatCents(order.taxCents, currency)}
                </dd>
              </div>
            )}
          </dl>
          <div
            aria-hidden="true"
            className="my-5 h-px w-full"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(168,137,46,0.35), transparent)',
            }}
          />
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">
              Total
            </span>
            <span className="font-display text-[22px] font-bold tabular-nums tracking-tightest text-text-primary">
              {formatCents(total, currency)}
            </span>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutInner />
    </Suspense>
  )
}
