'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { ZMark } from '@/components/brand/BrandMarks'
import { useCart, type CartItem } from '@/components/shop/CartContext'
import { formatCents } from '@/lib/marketplace/format'

interface BrandGroup {
  brandId: string
  brandName: string
  items: CartItem[]
  subtotalCents: number
}

function groupByBrand(items: CartItem[]): BrandGroup[] {
  const map = new Map<string, BrandGroup>()
  for (const item of items) {
    const g = map.get(item.brandId)
    if (g) {
      g.items.push(item)
      g.subtotalCents += item.priceCents * item.qty
    } else {
      map.set(item.brandId, {
        brandId: item.brandId,
        brandName: item.brandName,
        items: [item],
        subtotalCents: item.priceCents * item.qty,
      })
    }
  }
  return Array.from(map.values())
}

function CartLine({ item }: { item: CartItem }) {
  const { setQty, remove } = useCart()
  return (
    <div className="flex items-center gap-4 py-5">
      <Link
        href={`/shop/product/${item.productId}`}
        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[3px] border border-border bg-bg-deep"
      >
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="80px"
            className="object-cover"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center">
            <ZMark sizeClass="h-7 w-auto opacity-30" />
          </span>
        )}
      </Link>

      <div className="min-w-0 flex-1">
        <Link
          href={`/shop/product/${item.productId}`}
          className="line-clamp-2 text-[14.5px] font-medium leading-snug text-text-primary transition-colors hover:text-white"
        >
          {item.name}
        </Link>
        {item.variantLabel && (
          <p className="mt-0.5 text-[12.5px] text-text-tertiary">
            {item.variantLabel}
          </p>
        )}
        <p className="mt-1 text-[13px] tabular-nums text-text-secondary">
          {formatCents(item.priceCents)}
        </p>
      </div>

      <div className="flex flex-col items-end gap-2.5">
        <div className="flex items-center rounded-[3px] border border-border">
          <button
            type="button"
            onClick={() => setQty(item.variantId, item.qty - 1)}
            aria-label="Decrease quantity"
            className="flex h-8 w-8 items-center justify-center text-text-secondary transition-colors hover:text-text-primary"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-8 text-center text-[13px] font-semibold tabular-nums text-text-primary">
            {item.qty}
          </span>
          <button
            type="button"
            onClick={() => setQty(item.variantId, item.qty + 1)}
            aria-label="Increase quantity"
            className="flex h-8 w-8 items-center justify-center text-text-secondary transition-colors hover:text-text-primary"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
        <button
          type="button"
          onClick={() => remove(item.variantId)}
          className="inline-flex items-center gap-1 text-[11.5px] text-text-tertiary transition-colors hover:text-text-secondary"
        >
          <X className="h-3 w-3" />
          Remove
        </button>
      </div>
    </div>
  )
}

export default function CartPage() {
  const { items, totalCents, clear, hydrated } = useCart()
  const groups = groupByBrand(items)
  const multiBrand = groups.length > 1

  return (
    <>
      <Nav />

      <main id="main-content" className="relative min-h-[60vh] pb-24 pt-28 md:pt-32">
        <Container>
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <span className="block text-[10.5px] font-bold uppercase tracking-[0.36em] text-text-tertiary">
                Your bag
              </span>
              <h1 className="mt-3 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-bold tracking-tightest text-text-primary">
                Cart
              </h1>
            </div>
            {hydrated && items.length > 0 && (
              <button
                type="button"
                onClick={clear}
                className="inline-flex items-center gap-1.5 text-[13px] text-text-tertiary transition-colors hover:text-text-secondary"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clear cart
              </button>
            )}
          </div>

          {!hydrated ? (
            <div className="h-40" aria-hidden />
          ) : items.length === 0 ? (
            <div className="relative flex flex-col items-center justify-center gap-6 overflow-hidden rounded-[3px] border border-border/70 bg-bg-surface/60 px-8 py-20 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-[3px] border border-border bg-bg-deep/80">
                <ShoppingBag className="h-7 w-7 text-accent" />
              </span>
              <div className="flex flex-col items-center gap-2">
                <h2 className="font-display text-[19px] font-bold tracking-tightest text-text-primary">
                  Your cart is empty
                </h2>
                <p className="max-w-[340px] text-[14px] leading-relaxed text-text-secondary">
                  Nothing in the bag yet. Find your next supplement, fit, or
                  piece of equipment.
                </p>
              </div>
              <Button variant="gold" size="lg" asChild>
                <Link href="/shop">
                  Browse the shop
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.6fr_1fr]">
              {/* Brand groups */}
              <div className="flex flex-col gap-6">
                {multiBrand && (
                  <p className="rounded-[3px] border border-border/70 bg-bg-surface/40 px-4 py-3 text-[12.5px] leading-relaxed text-text-tertiary">
                    Your items ship from {groups.length} brands. Each brand is a
                    separate order and a separate checkout.
                  </p>
                )}
                {groups.map((group) => (
                  <div
                    key={group.brandId}
                    className="overflow-hidden rounded-[3px] border border-border bg-bg-surface/50"
                  >
                    <div className="flex items-center justify-between border-b border-border/70 px-5 py-4">
                      <span className="text-[12.5px] font-bold uppercase tracking-[0.18em] text-text-secondary">
                        {group.brandName}
                      </span>
                      <span className="text-[13px] tabular-nums text-text-tertiary">
                        {formatCents(group.subtotalCents)}
                      </span>
                    </div>

                    <div className="divide-y divide-border/60 px-5">
                      {group.items.map((item) => (
                        <CartLine key={item.variantId} item={item} />
                      ))}
                    </div>

                    <div className="flex items-center justify-between gap-4 border-t border-border/70 bg-bg-high/30 px-5 py-4">
                      <div className="text-[13px] text-text-secondary">
                        Subtotal{' '}
                        <span className="font-semibold tabular-nums text-text-primary">
                          {formatCents(group.subtotalCents)}
                        </span>
                      </div>
                      <Button variant="gold" size="md" asChild>
                        <Link href={`/shop/checkout?brand=${group.brandId}`}>
                          Checkout
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <aside className="lg:sticky lg:top-28 lg:self-start">
                <div className="rounded-[3px] border border-border bg-bg-surface/60 p-6">
                  <h2 className="font-display text-[16px] font-bold tracking-tightest text-text-primary">
                    Order summary
                  </h2>
                  <dl className="mt-5 flex flex-col gap-3 text-[14px]">
                    {groups.map((g) => (
                      <div
                        key={g.brandId}
                        className="flex items-center justify-between gap-4"
                      >
                        <dt className="truncate text-text-secondary">
                          {g.brandName}
                        </dt>
                        <dd className="tabular-nums text-text-primary">
                          {formatCents(g.subtotalCents)}
                        </dd>
                      </div>
                    ))}
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
                      {formatCents(totalCents)}
                    </span>
                  </div>
                  <p className="mt-3 text-[12px] leading-relaxed text-text-tertiary">
                    Shipping and tax are calculated per brand at checkout.
                    Checkout each brand separately above.
                  </p>
                </div>
              </aside>
            </div>
          )}
        </Container>
      </main>

      <Footer />
    </>
  )
}
