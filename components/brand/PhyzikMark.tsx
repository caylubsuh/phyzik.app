import Image from 'next/image'
import { cn } from '@/lib/utils'

type PhyzikMarkProps = {
  /** Visual size — Tailwind height utility (e.g. 'h-7', 'h-12', 'h-20'). */
  sizeClass?: string
  /** Defaults to the metallic-gold wordmark (gold-forward brand). */
  src?: string
  priority?: boolean
  className?: string
}

const INTRINSIC_WIDTH = 2046
const INTRINSIC_HEIGHT = 307

/**
 * Inline PHYZIK wordmark image. Use anywhere the brand name would otherwise
 * be typed as text — e.g. hero headlines, account cards, membership stamps.
 */
export default function PhyzikMark({
  sizeClass = 'h-7 w-auto',
  src = '/brand/phyzik-wordmark-gold.png',
  priority = false,
  className,
}: PhyzikMarkProps) {
  return (
    <Image
      src={src}
      alt="PHYZIK"
      width={INTRINSIC_WIDTH}
      height={INTRINSIC_HEIGHT}
      draggable={false}
      priority={priority}
      sizes="(max-width: 768px) 240px, 360px"
      className={cn('select-none', sizeClass, className)}
    />
  )
}
