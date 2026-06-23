'use client'

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { useCart } from './CartContext'

/**
 * Floating cart link, shown only once the cart has items. Sits clear of the
 * fixed Nav. Squared, gold-bordered.
 */
export default function CartIndicator() {
  const { count, hydrated } = useCart()
  if (!hydrated || count === 0) return null

  return (
    <Link
      href="/shop/cart"
      aria-label={`Cart, ${count} item${count === 1 ? '' : 's'}`}
      className="fixed right-5 top-[88px] z-40 inline-flex items-center gap-2 rounded-[3px] border border-accent/50 bg-bg-deep/90 px-3.5 py-2.5 text-[13px] font-semibold text-text-primary shadow-[0_12px_32px_-12px_rgba(168,137,46,0.5)] backdrop-blur-md transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    >
      <ShoppingBag className="h-4 w-4 text-accent-bright" />
      <span className="tabular-nums">{count}</span>
    </Link>
  )
}
