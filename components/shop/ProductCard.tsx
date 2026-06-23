import Image from 'next/image'
import Link from 'next/link'
import { ZMark } from '@/components/brand/BrandMarks'
import { publicAssetUrl, CATEGORY_LABEL } from '@/lib/marketplace/format'
import type { StorefrontProduct } from '@/lib/marketplace/types'
import { cn } from '@/lib/utils'
import PriceTag from './PriceTag'

/**
 * Catalog product tile. Squared corners, gold hover ring. Falls back to a
 * gold-monogram placeholder when there's no image. Server-safe.
 */
export default function ProductCard({
  product,
  brandName,
  className,
}: {
  product: StorefrontProduct
  brandName?: string | null
  className?: string
}) {
  const img = publicAssetUrl(product.image_url)
  const onSale =
    product.compare_at_cents != null &&
    product.priceMinCents != null &&
    product.compare_at_cents > product.priceMinCents

  return (
    <Link
      href={`/shop/product/${product.id}`}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-[3px] border border-border bg-bg-surface/60 transition-colors duration-300 hover:border-accent/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
        className,
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-bg-deep">
        {img ? (
          <Image
            src={img}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center">
            <ZMark sizeClass="h-12 w-auto opacity-30" />
          </span>
        )}

        {product.is_drop && (
          <span className="absolute left-3 top-3 inline-flex items-center rounded-[3px] border border-accent/50 bg-bg-deep/80 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-accent-bright backdrop-blur-sm">
            Drop
          </span>
        )}
        {onSale && (
          <span className="absolute right-3 top-3 inline-flex items-center rounded-[3px] bg-[linear-gradient(135deg,#C9A94E,#A8892E)] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-bg">
            Sale
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        {brandName ? (
          <span className="truncate text-[11px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">
            {brandName}
          </span>
        ) : (
          <span className="truncate text-[11px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">
            {CATEGORY_LABEL[product.category]}
          </span>
        )}
        <h3 className="line-clamp-2 text-[14.5px] font-medium leading-snug text-text-primary transition-colors group-hover:text-white">
          {product.name}
        </h3>
        <div className="mt-auto pt-2">
          <PriceTag
            minCents={product.priceMinCents}
            maxCents={product.priceMaxCents}
            compareAtCents={product.compare_at_cents}
            currency={product.currency}
          />
        </div>
      </div>
    </Link>
  )
}
