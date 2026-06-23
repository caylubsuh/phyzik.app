import Link from 'next/link'
import { CATEGORIES, CATEGORY_LABEL } from '@/lib/marketplace/format'
import type { MarketplaceCategory } from '@/lib/marketplace/types'
import { cn } from '@/lib/utils'

/**
 * Horizontal category selector. Squared tabs with a gold underline on the
 * active one. Links carry a `?category=` query the storefront reads.
 * Server-safe.
 */
export default function CategoryNav({
  active,
  basePath = '/shop',
  className,
}: {
  active?: MarketplaceCategory | 'all'
  basePath?: string
  className?: string
}) {
  const current = active ?? 'all'

  const tabs: { key: MarketplaceCategory | 'all'; label: string; href: string }[] =
    [
      { key: 'all', label: 'All', href: basePath },
      ...CATEGORIES.map((c) => ({
        key: c,
        label: CATEGORY_LABEL[c],
        href: `${basePath}?category=${c}`,
      })),
    ]

  return (
    <nav
      aria-label="Shop categories"
      className={cn(
        'flex flex-wrap items-center gap-x-7 gap-y-3 border-b border-border/70',
        className,
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.key === current
        return (
          <Link
            key={tab.key}
            href={tab.href}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'relative -mb-px py-3 text-[14px] font-medium tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg',
              isActive
                ? 'text-text-primary'
                : 'text-text-secondary hover:text-text-primary',
            )}
          >
            {tab.label}
            {isActive && (
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-px h-0.5 bg-[linear-gradient(90deg,#C9A94E,#A8892E)]"
              />
            )}
          </Link>
        )
      })}
    </nav>
  )
}
