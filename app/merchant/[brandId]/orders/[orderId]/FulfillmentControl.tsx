'use client'

/**
 * FulfillmentControl — carrier + tracking inputs → Mark Shipped, plus a
 * separate Mark Delivered button. Calls the co-located server actions.
 * Only renders actionable buttons when the order status allows them.
 */
import { useState, useTransition } from 'react'
import { Truck, CheckCircle, Loader2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import { markShipped, markDelivered } from '../actions'
import type { OrderStatus } from '@/lib/marketplace/types'

type FulfillmentControlProps = {
  brandId: string
  orderId: string
  status: OrderStatus
}

export default function FulfillmentControl({
  brandId,
  orderId,
  status,
}: FulfillmentControlProps) {
  const [carrier, setCarrier] = useState('')
  const [tracking, setTracking] = useState('')
  const [shipErr, setShipErr] = useState<string | null>(null)
  const [delErr, setDelErr] = useState<string | null>(null)
  const [isPendingShip, startShip] = useTransition()
  const [isPendingDel, startDel] = useTransition()

  const canShip = status === 'paid' || status === 'fulfilled'
  const canDeliver = status === 'shipped'

  if (!canShip && !canDeliver) return null

  return (
    <div className="flex flex-col gap-4 rounded-[3px] border border-border bg-bg-surface p-5">
      <h3 className="font-display text-[15px] font-bold tracking-tight text-text-primary">
        Fulfillment
      </h3>

      {canShip && (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="carrier"
                className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-text-tertiary"
              >
                Carrier
              </label>
              <input
                id="carrier"
                type="text"
                placeholder="UPS, USPS, FedEx…"
                value={carrier}
                onChange={(e) => setCarrier(e.target.value)}
                className="h-10 rounded-[3px] border border-border bg-bg-high px-3 text-[13.5px] text-text-primary placeholder:text-text-tertiary focus:border-accent/60 focus:outline-none focus:ring-1 focus:ring-accent/40"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="tracking"
                className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-text-tertiary"
              >
                Tracking number
              </label>
              <input
                id="tracking"
                type="text"
                placeholder="1Z999AA10123456784"
                value={tracking}
                onChange={(e) => setTracking(e.target.value)}
                className="h-10 rounded-[3px] border border-border bg-bg-high px-3 font-mono text-[13px] text-text-primary placeholder:text-text-tertiary focus:border-accent/60 focus:outline-none focus:ring-1 focus:ring-accent/40"
              />
            </div>
          </div>
          {shipErr && <p className="text-[12px] text-red-400">{shipErr}</p>}
          <Button
            variant="gold"
            size="sm"
            disabled={isPendingShip || !carrier.trim() || !tracking.trim()}
            onClick={() => {
              setShipErr(null)
              startShip(async () => {
                const res = await markShipped(brandId, orderId, carrier.trim(), tracking.trim())
                if (res.error) setShipErr(res.error)
              })
            }}
          >
            {isPendingShip ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Truck className="h-3.5 w-3.5" />
            )}
            Mark Shipped
          </Button>
        </div>
      )}

      {canDeliver && (
        <div className="flex flex-col gap-2">
          {delErr && <p className="text-[12px] text-red-400">{delErr}</p>}
          <Button
            variant="secondary"
            size="sm"
            disabled={isPendingDel}
            onClick={() => {
              setDelErr(null)
              startDel(async () => {
                const res = await markDelivered(brandId, orderId)
                if (res.error) setDelErr(res.error)
              })
            }}
          >
            {isPendingDel ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <CheckCircle className="h-3.5 w-3.5" />
            )}
            Mark Delivered
          </Button>
        </div>
      )}
    </div>
  )
}
