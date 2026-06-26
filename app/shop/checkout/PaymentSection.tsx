'use client'

// Client component that renders the Stripe PaymentElement and submits payment.
// Mounted only after the parent has a valid clientSecret from the edge function.

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Loader2, Lock } from 'lucide-react'
import Button from '@/components/ui/Button'
import { formatCents } from '@/lib/marketplace/format'

interface PaymentSectionProps {
  orderId: string
  amountTotalCents: number
  amountSubtotalCents: number
  shippingCents: number
  taxCents: number
  currency: string
  brandId: string
  onClearBrand: () => void
}

export default function PaymentSection({
  orderId,
  amountTotalCents,
  amountSubtotalCents,
  shippingCents,
  taxCents,
  currency,
  onClearBrand,
}: PaymentSectionProps) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()

  const [paying, setPaying] = useState(false)
  const [payError, setPayError] = useState<string | null>(null)

  async function handlePay(e: React.FormEvent) {
    e.preventDefault()
    if (!stripe || !elements) return
    setPaying(true)
    setPayError(null)

    const returnUrl =
      typeof window !== 'undefined'
        ? `${window.location.origin}/orders/${orderId}?success=1`
        : `/orders/${orderId}?success=1`

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: returnUrl },
      redirect: 'if_required',
    })

    if (error) {
      setPayError(
        error.message ??
          'Payment failed. Please check your card details and try again.',
      )
      setPaying(false)
      return
    }

    // No redirect means payment confirmed synchronously.
    onClearBrand()
    router.push(`/orders/${orderId}?success=1`)
  }

  return (
    <form onSubmit={handlePay} className="flex flex-col gap-6">
      <div className="rounded-[3px] border border-border bg-bg-deep/60 p-5">
        <PaymentElement
          options={{
            layout: 'tabs',
            wallets: { applePay: 'auto', googlePay: 'auto' },
          }}
        />
      </div>

      {/* Money breakdown */}
      <div className="rounded-[3px] border border-border bg-bg-surface/60 p-5">
        <dl className="flex flex-col gap-2 text-[14px]">
          <div className="flex items-center justify-between">
            <dt className="text-text-secondary">Subtotal</dt>
            <dd className="tabular-nums text-text-primary">
              {formatCents(amountSubtotalCents, currency)}
            </dd>
          </div>
          {shippingCents > 0 && (
            <div className="flex items-center justify-between">
              <dt className="text-text-secondary">Shipping</dt>
              <dd className="tabular-nums text-text-primary">
                {formatCents(shippingCents, currency)}
              </dd>
            </div>
          )}
          {taxCents > 0 && (
            <div className="flex items-center justify-between">
              <dt className="text-text-secondary">Tax</dt>
              <dd className="tabular-nums text-text-primary">
                {formatCents(taxCents, currency)}
              </dd>
            </div>
          )}
          <div
            aria-hidden="true"
            className="my-1 h-px w-full"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(168,137,46,0.35), transparent)',
            }}
          />
          <div className="flex items-center justify-between">
            <dt className="text-[13px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">
              Total
            </dt>
            <dd className="font-display text-[20px] font-bold tabular-nums tracking-tightest text-text-primary">
              {formatCents(amountTotalCents, currency)}
            </dd>
          </div>
        </dl>
      </div>

      {payError && (
        <p
          role="alert"
          className="rounded-[3px] border border-red-500/30 bg-red-500/[0.08] px-4 py-3 text-[13.5px] text-red-300"
        >
          {payError}
        </p>
      )}

      <Button
        variant="gold"
        size="lg"
        type="submit"
        disabled={!stripe || !elements || paying}
        className="w-full"
      >
        {paying ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Processing…
          </>
        ) : (
          <>
            <Lock className="h-4 w-4" />
            Pay now · {formatCents(amountTotalCents, currency)}
          </>
        )}
      </Button>

      <p className="flex items-center gap-2 text-[11.5px] text-text-tertiary">
        <Lock className="h-3.5 w-3.5 shrink-0" />
        Payments are encrypted and processed by Stripe. Your card details never
        touch our servers.
      </p>
    </form>
  )
}
