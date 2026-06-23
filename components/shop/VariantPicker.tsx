'use client'

import { useMemo, useState } from 'react'
import type {
  ProductOption,
  ProductVariant,
  VariantInventory,
  Availability,
} from '@/lib/marketplace/types'
import { publicAssetUrl } from '@/lib/marketplace/format'
import { cn } from '@/lib/utils'
import PriceTag from './PriceTag'
import AvailabilityBadge from './AvailabilityBadge'
import AddToCartButton from './AddToCartButton'

/**
 * The purchase panel: option selectors → resolved variant → price, stock, and
 * add-to-cart. Owns the selection state so price/availability/add stay in sync.
 *
 * Variants carry option1/2/3_value in option `position` order. We resolve the
 * active variant by matching every selected option value against the variant's
 * positional slots.
 */
export default function VariantPicker({
  productId,
  productName,
  productImage,
  brandId,
  brandName,
  variants,
  options,
  inventory,
  fallbackMinCents,
  fallbackMaxCents,
  currency = 'USD',
}: {
  productId: string
  productName: string
  productImage: string | null
  brandId: string
  brandName: string
  variants: ProductVariant[]
  options: ProductOption[]
  inventory: Record<string, VariantInventory>
  fallbackMinCents: number | null
  fallbackMaxCents: number | null
  currency?: string
}) {
  // Options are ordered by position (slot 1 → option1_value, etc.).
  const orderedOptions = useMemo(
    () => [...options].sort((a, b) => a.position - b.position).slice(0, 3),
    [options],
  )

  // Default selection: first variant's values, so the panel opens "resolved".
  const firstVariant = variants[0]
  const [selected, setSelected] = useState<(string | null)[]>(() => {
    if (orderedOptions.length === 0) return []
    if (firstVariant) {
      return [
        firstVariant.option1_value,
        firstVariant.option2_value,
        firstVariant.option3_value,
      ].slice(0, orderedOptions.length)
    }
    return orderedOptions.map(() => null)
  })

  function pick(slot: number, value: string) {
    setSelected((prev) => {
      const next = [...prev]
      next[slot] = next[slot] === value ? null : value
      return next
    })
  }

  // Resolve the active variant. With no options, the single variant wins.
  const activeVariant = useMemo<ProductVariant | null>(() => {
    if (orderedOptions.length === 0) return firstVariant ?? null
    if (selected.some((s) => s == null)) return null
    return (
      variants.find((v) => {
        const slots = [v.option1_value, v.option2_value, v.option3_value]
        return orderedOptions.every((_, i) => slots[i] === selected[i])
      }) ?? null
    )
  }, [orderedOptions, selected, variants, firstVariant])

  const inv = activeVariant ? inventory[activeVariant.id] : undefined
  const availability: Availability | null = inv?.availability ?? null
  const soldOut = availability === 'out_of_stock'

  // Whether a given option value is part of at least one purchasable variant.
  function valueAvailable(slot: number, value: string): boolean {
    return variants.some((v) => {
      const slots = [v.option1_value, v.option2_value, v.option3_value]
      if (slots[slot] !== value) return false
      const vi = inventory[v.id]
      return !vi || vi.availability !== 'out_of_stock'
    })
  }

  const priceCents = activeVariant?.price_cents ?? fallbackMinCents
  const compareAt = activeVariant?.compare_at_cents ?? null

  const variantLabel =
    orderedOptions.length > 0
      ? selected.filter(Boolean).join(' / ') || null
      : null

  const resolvedImg = publicAssetUrl(productImage)

  return (
    <div className="flex flex-col gap-7">
      {/* Price + stock */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <PriceTag
          minCents={priceCents}
          maxCents={activeVariant ? priceCents : fallbackMaxCents}
          compareAtCents={compareAt}
          currency={currency}
          size="lg"
        />
        {availability && <AvailabilityBadge availability={availability} />}
      </div>

      {/* Option selectors */}
      {orderedOptions.map((opt, slot) => (
        <div key={opt.id} className="flex flex-col gap-3">
          <div className="flex items-baseline justify-between">
            <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-text-tertiary">
              {opt.name}
            </span>
            {selected[slot] && (
              <span className="text-[13px] text-text-secondary">
                {selected[slot]}
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2.5">
            {opt.values.map((value) => {
              const isActive = selected[slot] === value
              const usable = valueAvailable(slot, value)
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => pick(slot, value)}
                  aria-pressed={isActive}
                  className={cn(
                    'min-w-[3rem] rounded-[3px] border px-4 py-2.5 text-[13.5px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
                    isActive
                      ? 'border-accent bg-accent/10 text-text-primary'
                      : 'border-border bg-bg-high/40 text-text-secondary hover:border-border-strong hover:text-text-primary',
                    !usable && 'opacity-40',
                  )}
                >
                  {value}
                </button>
              )
            })}
          </div>
        </div>
      ))}

      {orderedOptions.length > 0 && !activeVariant && (
        <p className="text-[13px] text-accent-bright">
          Select an option to continue.
        </p>
      )}

      <AddToCartButton
        variantId={activeVariant?.id ?? null}
        productId={productId}
        name={productName}
        priceCents={priceCents}
        brandId={brandId}
        brandName={brandName}
        image={resolvedImg}
        variantLabel={variantLabel}
        soldOut={soldOut}
        disabled={orderedOptions.length > 0 && !activeVariant}
      />
    </div>
  )
}
