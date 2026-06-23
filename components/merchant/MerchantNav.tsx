'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, ShoppingBag, Wallet, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Merchant dashboard navigation. Renders a vertical sidebar on lg+ and a
 * horizontal scroll-rail on small screens. Active item carries the gold
 * treatment (left gold bar on desktop, gold underline on mobile).
 */
type MerchantNavProps = {
  brandId: string
  brandName: string
}

export default function MerchantNav({ brandId, brandName }: MerchantNavProps) {
  const pathname = usePathname()
  const base = `/merchant/${brandId}`

  const items = [
    { label: 'Overview', href: base, icon: LayoutDashboard, exact: true },
    { label: 'Products', href: `${base}/products`, icon: Package, exact: false },
    { label: 'Orders', href: `${base}/orders`, icon: ShoppingBag, exact: false },
    { label: 'Earnings', href: `${base}/earnings`, icon: Wallet, exact: false },
  ]

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`)

  return (
    <nav aria-label="Merchant sections" className="lg:sticky lg:top-28">
      <Link
        href="/merchant"
        className="mb-6 hidden items-center gap-2 text-[12.5px] font-semibold text-text-secondary transition-colors hover:text-text-primary lg:inline-flex"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All brands
      </Link>

      <p className="mb-3 hidden truncate text-[10.5px] font-bold uppercase tracking-[0.2em] text-text-tertiary lg:block">
        {brandName}
      </p>

      <ul className="flex gap-1.5 overflow-x-auto pb-1 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
        {items.map((item) => {
          const active = isActive(item.href, item.exact)
          const Icon = item.icon
          return (
            <li key={item.href} className="shrink-0 lg:shrink">
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'group relative flex items-center gap-2.5 whitespace-nowrap rounded-[3px] px-3.5 py-2.5 text-[13.5px] font-semibold transition-colors',
                  'border-b-2 lg:border-b-0 lg:border-l-2',
                  active
                    ? 'border-accent bg-accent/[0.07] text-accent-bright'
                    : 'border-transparent text-text-secondary hover:bg-white/[0.03] hover:text-text-primary',
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
