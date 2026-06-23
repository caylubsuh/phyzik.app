'use client'

import { useState } from 'react'
import { Check, ShoppingBag } from 'lucide-react'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { useCart } from './CartContext'

/**
 * Adds the resolved variant to the cart with a short confirmation state.
 * Disabled when no variant resolves (e.g. an unselected option combo) or the
 * variant is sold out.
 */
export default function AddToCartButton({
  variantId,
  productId,
  name,
  priceCents,
  brandId,
  brandName,
  image,
  variantLabel,
  disabled,
  soldOut,
  className,
}: {
  variantId: string | null
  productId: string
  name: string
  priceCents: number | null
  brandId: string
  brandName: string
  image: string | null
  variantLabel?: string | null
  disabled?: boolean
  soldOut?: boolean
  className?: string
}) {
  const { add } = useCart()
  const [added, setAdded] = useState(false)

  const canAdd =
    !disabled && !soldOut && variantId != null && priceCents != null

  function handleAdd() {
    if (!canAdd || variantId == null || priceCents == null) return
    add({
      variantId,
      productId,
      name,
      priceCents,
      brandId,
      brandName,
      image,
      variantLabel,
    })
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1800)
  }

  return (
    <Button
      variant="gold"
      size="lg"
      onClick={handleAdd}
      disabled={!canAdd}
      aria-live="polite"
      className={cn('w-full', className)}
    >
      {soldOut ? (
        'Sold out'
      ) : added ? (
        <>
          <Check className="h-5 w-5" />
          Added to cart
        </>
      ) : (
        <>
          <ShoppingBag className="h-5 w-5" />
          Add to cart
        </>
      )}
    </Button>
  )
}
