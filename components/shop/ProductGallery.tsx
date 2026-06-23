'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ZMark } from '@/components/brand/BrandMarks'
import type { ProductImage } from '@/lib/marketplace/types'
import { publicAssetUrl } from '@/lib/marketplace/format'
import { cn } from '@/lib/utils'

/**
 * Product image gallery with thumbnail strip. `fallbackImage` is the product's
 * primary image_url, used when there are no gallery image rows. Renders a
 * gold-monogram placeholder when there's nothing at all.
 */
export default function ProductGallery({
  images,
  fallbackImage,
  productName,
}: {
  images: ProductImage[]
  fallbackImage: string | null
  productName: string
}) {
  // Build a unique, ordered list of resolvable URLs.
  const urls: string[] = []
  for (const im of images) {
    const u = publicAssetUrl(im.url)
    if (u && !urls.includes(u)) urls.push(u)
  }
  const fb = publicAssetUrl(fallbackImage)
  if (fb && !urls.includes(fb)) urls.unshift(fb)

  const [active, setActive] = useState(0)
  const current = urls[active] ?? urls[0] ?? null

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square overflow-hidden rounded-[3px] border border-border bg-bg-deep">
        {current ? (
          <Image
            src={current}
            alt={productName}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 560px"
            className="object-cover"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center">
            <ZMark sizeClass="h-20 w-auto opacity-25" />
          </span>
        )}
      </div>

      {urls.length > 1 && (
        <div className="grid grid-cols-5 gap-3">
          {urls.map((u, i) => (
            <button
              key={u}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              aria-current={i === active ? 'true' : undefined}
              className={cn(
                'relative aspect-square overflow-hidden rounded-[3px] border bg-bg-deep transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
                i === active
                  ? 'border-accent'
                  : 'border-border hover:border-border-strong',
              )}
            >
              <Image
                src={u}
                alt=""
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
