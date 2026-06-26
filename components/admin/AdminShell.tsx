import type { ReactNode } from 'react'
import { ShieldCheck } from 'lucide-react'
import Container from '@/components/ui/Container'
import AdminNav from './AdminNav'

/**
 * Shared layout for every admin page: ambient gold wash, console header, a
 * sidebar AdminNav, and a content column. Mirrors MerchantShell so the two
 * back-office surfaces feel identical.
 */
type AdminShellProps = {
  eyebrow: string
  title: string
  subtitle?: string
  headerAside?: ReactNode
  children: ReactNode
}

export default function AdminShell({
  eyebrow,
  title,
  subtitle,
  headerAside,
  children,
}: AdminShellProps) {
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
          {/* Console header */}
          <div className="flex flex-col gap-4 border-b border-border/70 pb-7 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[3px] border border-accent/25 bg-accent/[0.06] text-accent-bright">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div className="flex flex-col gap-1.5">
                <h1 className="font-display text-[22px] font-bold leading-none tracking-tightest text-text-primary md:text-[26px]">
                  PHYZIK Shop
                </h1>
                <span className="text-[12.5px] text-text-tertiary">Platform admin console</span>
              </div>
            </div>
          </div>

          {/* Body: sidebar + content */}
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[208px_1fr] lg:gap-10">
            <AdminNav />

            <div className="min-w-0">
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex flex-col gap-1.5">
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
                {headerAside}
              </div>
              {children}
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
