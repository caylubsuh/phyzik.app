import type { ReactNode } from 'react'
import Container from '@/components/ui/Container'
import StatusChip from './StatusChip'
import MerchantNav from './MerchantNav'
import type { ManagedBrand } from '@/lib/marketplace/queries'

/**
 * Shared layout for the four brand dashboard pages: ambient gold wash, brand
 * header (logo + name + status), a sidebar MerchantNav, and a content column.
 * Keeps every sub-page visually identical without duplicating chrome.
 */
type MerchantShellProps = {
  brand: ManagedBrand
  /** Section eyebrow shown above the page title (e.g. "Products"). */
  eyebrow: string
  /** Page H1. */
  title: string
  /** Optional sub-line under the title. */
  subtitle?: string
  /** Optional right-aligned header slot. */
  headerAside?: ReactNode
  children: ReactNode
}

export default function MerchantShell({
  brand,
  eyebrow,
  title,
  subtitle,
  headerAside,
  children,
}: MerchantShellProps) {
  return (
    <main id="main-content" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 70% 45% at 50% 0%, rgba(168,137,46,0.09) 0%, transparent 58%), linear-gradient(180deg, #0A0A0B 0%, #050506 100%)',
        }}
      />

      <section className="pb-24 pt-28 md:pt-32">
        <Container>
          {/* Brand header */}
          <div className="flex flex-col gap-4 border-b border-border/70 pb-7 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              {brand.logo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={brand.logo_url}
                  alt={brand.name}
                  className="h-12 w-12 shrink-0 rounded-[3px] border border-border object-cover"
                />
              ) : (
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[3px] border border-border bg-bg-high font-display text-[18px] font-bold text-text-secondary">
                  {brand.name.slice(0, 1).toUpperCase()}
                </span>
              )}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2.5">
                  <h1 className="font-display text-[22px] font-bold leading-none tracking-tightest text-text-primary md:text-[26px]">
                    {brand.name}
                  </h1>
                  <StatusChip kind="brand" status={brand.status} />
                </div>
                <span className="text-[12.5px] text-text-tertiary">Merchant portal</span>
              </div>
            </div>
            {headerAside}
          </div>

          {/* Body: sidebar + content */}
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[208px_1fr] lg:gap-10">
            <MerchantNav brandId={brand.id} brandName={brand.name} />

            <div className="min-w-0">
              <div className="mb-6 flex flex-col gap-1.5">
                <span className="text-[10.5px] font-bold uppercase tracking-[0.28em] text-text-tertiary">
                  {eyebrow}
                </span>
                <h2 className="font-display text-[24px] font-bold tracking-tightest text-text-primary md:text-[28px]">
                  {title}
                </h2>
                {subtitle && (
                  <p className="max-w-[640px] text-[14px] leading-relaxed text-text-secondary">
                    {subtitle}
                  </p>
                )}
              </div>
              {children}
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
