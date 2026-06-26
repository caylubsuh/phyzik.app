'use client'

/**
 * ShippingForm — edit a brand's flat-rate shipping profile.
 * Dollar amounts are entered/displayed as $ strings and converted to cents
 * before submitting.
 */
import { useState, useTransition } from 'react'
import { Save, Loader2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import { upsertShippingProfile, type ShippingProfileInput } from './actions'

type ShippingFormProps = {
  brandId: string
  initial: {
    name: string
    flat_rate_cents: number
    free_over_cents: number | null
    processing_days: number
    ships_from_zip: string
  }
}

function centsToDisplay(cents: number): string {
  return (cents / 100).toFixed(2)
}

function parseDollars(val: string): number {
  const n = parseFloat(val.replace(/[^0-9.]/g, ''))
  if (isNaN(n) || n < 0) return 0
  return Math.round(n * 100)
}

export default function ShippingForm({ brandId, initial }: ShippingFormProps) {
  const [name, setName] = useState(initial.name)
  const [flatRate, setFlatRate] = useState(centsToDisplay(initial.flat_rate_cents))
  const [freeOver, setFreeOver] = useState(
    initial.free_over_cents != null ? centsToDisplay(initial.free_over_cents) : '',
  )
  const [processingDays, setProcessingDays] = useState(String(initial.processing_days))
  const [shipsFromZip, setShipsFromZip] = useState(initial.ships_from_zip)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaved(false)
    setError(null)
    const input: ShippingProfileInput = {
      name,
      flat_rate_cents: parseDollars(flatRate),
      free_over_cents: freeOver.trim() ? parseDollars(freeOver) : null,
      processing_days: Math.max(0, parseInt(processingDays, 10) || 0),
      ships_from_zip: shipsFromZip,
    }
    startTransition(async () => {
      const res = await upsertShippingProfile(brandId, input)
      if (res.error) {
        setError(res.error)
      } else {
        setSaved(true)
      }
    })
  }

  const inputCls =
    'h-10 w-full rounded-[3px] border border-border bg-bg-high px-3 text-[13.5px] text-text-primary placeholder:text-text-tertiary focus:border-accent/60 focus:outline-none focus:ring-1 focus:ring-accent/40'
  const labelCls =
    'text-[11.5px] font-semibold uppercase tracking-[0.14em] text-text-tertiary'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Profile name */}
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="sp-name" className={labelCls}>
            Profile name
          </label>
          <input
            id="sp-name"
            type="text"
            placeholder="Standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputCls}
          />
        </div>

        {/* Flat rate */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="sp-flat" className={labelCls}>
            Flat rate
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-text-tertiary">
              $
            </span>
            <input
              id="sp-flat"
              type="text"
              inputMode="decimal"
              placeholder="5.99"
              value={flatRate}
              onChange={(e) => setFlatRate(e.target.value)}
              className={`${inputCls} pl-6`}
            />
          </div>
          <p className="text-[11.5px] text-text-tertiary">
            Charged at checkout. Set 0 for free shipping.
          </p>
        </div>

        {/* Free over */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="sp-free" className={labelCls}>
            Free shipping over (optional)
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-text-tertiary">
              $
            </span>
            <input
              id="sp-free"
              type="text"
              inputMode="decimal"
              placeholder="50.00"
              value={freeOver}
              onChange={(e) => setFreeOver(e.target.value)}
              className={`${inputCls} pl-6`}
            />
          </div>
          <p className="text-[11.5px] text-text-tertiary">
            Leave blank to always charge flat rate.
          </p>
        </div>

        {/* Processing days */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="sp-days" className={labelCls}>
            Processing days
          </label>
          <input
            id="sp-days"
            type="number"
            min={0}
            max={30}
            placeholder="2"
            value={processingDays}
            onChange={(e) => setProcessingDays(e.target.value)}
            className={inputCls}
          />
          <p className="text-[11.5px] text-text-tertiary">
            Business days before the order ships.
          </p>
        </div>

        {/* Ships from ZIP */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="sp-zip" className={labelCls}>
            Ships from ZIP
          </label>
          <input
            id="sp-zip"
            type="text"
            placeholder="90210"
            maxLength={10}
            value={shipsFromZip}
            onChange={(e) => setShipsFromZip(e.target.value)}
            className={inputCls}
          />
          <p className="text-[11.5px] text-text-tertiary">
            Used to calculate estimated delivery windows.
          </p>
        </div>
      </div>

      {error && <p className="text-[12.5px] text-red-400">{error}</p>}
      {saved && (
        <p className="text-[12.5px] font-semibold text-[#9FC4AC]">
          Shipping profile saved.
        </p>
      )}

      <div className="flex justify-end">
        <Button type="submit" variant="gold" size="sm" disabled={isPending}>
          {isPending ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Save className="h-3.5 w-3.5" />
          )}
          Save shipping profile
        </Button>
      </div>
    </form>
  )
}
