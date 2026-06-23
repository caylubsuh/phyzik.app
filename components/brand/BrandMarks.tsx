import Image from 'next/image'
import { cn } from '@/lib/utils'

/**
 * Stylized "Z" monogram. Use for compact brand moments (nav badge, favicons,
 * loading states, section dividers). Defaults to the metallic-gold treatment.
 */
export function ZMark({
  sizeClass = 'h-7 w-auto',
  src = '/brand/phyzik-z-gold.png',
  priority = false,
  className,
}: {
  sizeClass?: string
  src?: string
  priority?: boolean
  className?: string
}) {
  return (
    <Image
      src={src}
      alt="PHYZIK"
      width={2001}
      height={1607}
      draggable={false}
      priority={priority}
      sizes="64px"
      className={cn('select-none', sizeClass, className)}
    />
  )
}

/**
 * Stacked PHYZIK / SHOP lockup. The brand mark for everything marketplace.
 */
export function ShopLockup({
  sizeClass = 'h-12 w-auto',
  priority = false,
  className,
}: {
  sizeClass?: string
  priority?: boolean
  className?: string
}) {
  return (
    <Image
      src="/brand/phyzik-shop-lockup.png"
      alt="PHYZIK Shop"
      width={2000}
      height={800}
      draggable={false}
      priority={priority}
      sizes="(max-width: 768px) 180px, 260px"
      className={cn('select-none', sizeClass, className)}
    />
  )
}
