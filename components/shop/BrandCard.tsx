import Image from 'next/image'
import Link from 'next/link'
import { BadgeCheck } from 'lucide-react'
import { ZMark } from '@/components/brand/BrandMarks'
import { publicAssetUrl, CATEGORY_LABEL } from '@/lib/marketplace/format'
import type { Brand } from '@/lib/marketplace/types'
import { cn } from '@/lib/utils'

/**
 * Brand tile for the featured row and brands index. Banner backdrop + logo
 * chip + verified mark. Squared corners, gold hover. Server-safe.
 */
export default function BrandCard({
  brand,
  className,
}: {
  brand: Brand
  className?: string
}) {
  const banner = publicAssetUrl(brand.banner_url)
  const logo = publicAssetUrl(brand.logo_url)
  const cats = brand.categories.slice(0, 3)

  return (
    <Link
      href={`/shop/${brand.slug}`}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-[3px] border border-border bg-bg-surface/60 transition-colors duration-300 hover:border-accent/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
        className,
      )}
    >
      <div className="relative aspect-[16/7] overflow-hidden bg-bg-deep">
        {banner ? (
          <Image
            src={banner}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, 360px"
            className="object-cover opacity-90 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 90% at 30% 0%, rgba(168,137,46,0.16) 0%, transparent 60%), #0A0A0B',
            }}
          />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-bg-surface via-bg-surface/20 to-transparent"
        />
      </div>

      <div className="flex items-center gap-3 px-4 pb-4 -mt-7">
        <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[3px] border border-border-strong bg-bg-deep">
          {logo ? (
            <Image
              src={logo}
              alt={brand.name}
              width={56}
              height={56}
              className="h-full w-full object-cover"
            />
          ) : (
            <ZMark sizeClass="h-7 w-auto opacity-50" />
          )}
        </span>
        <div className="min-w-0 flex-1 pt-7">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate text-[15px] font-semibold tracking-tight text-text-primary">
              {brand.name}
            </h3>
            {brand.verified && (
              <BadgeCheck
                className="h-4 w-4 shrink-0 text-accent-bright"
                aria-label="Verified brand"
              />
            )}
          </div>
          <p className="truncate text-[11.5px] uppercase tracking-[0.14em] text-text-tertiary">
            {cats.map((c) => CATEGORY_LABEL[c]).join(' · ') || 'Brand'}
          </p>
        </div>
      </div>
    </Link>
  )
}
