import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Store, Check, X } from 'lucide-react'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import FadeUp from '@/components/motion/FadeUp'
import StatusChip from '@/components/merchant/StatusChip'
import MerchantEmptyState from '@/components/merchant/MerchantEmptyState'
import { createClient } from '@/lib/supabase/server'
import { getManagedBrands } from '@/lib/marketplace/queries'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Merchant Portal — PHYZIK',
  description: 'Manage your brand store on the PHYZIK Shop.',
  alternates: { canonical: `${SITE_URL}/merchant` },
  robots: { index: false, follow: false },
}

function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main id="main-content" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(168,137,46,0.10) 0%, transparent 60%), linear-gradient(180deg, #0A0A0B 0%, #050506 100%)',
          }}
        />
        <section className="pb-24 pt-28 md:pt-36">
          <Container>{children}</Container>
        </section>
      </main>
      <Footer />
    </>
  )
}

function ReadyFlag({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span
      className={
        'inline-flex items-center gap-1.5 text-[12px] font-medium ' +
        (ok ? 'text-[#9FC4AC]' : 'text-text-tertiary')
      }
    >
      {ok ? (
        <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
      ) : (
        <X className="h-3.5 w-3.5" strokeWidth={2.5} />
      )}
      {label}
    </span>
  )
}

export default async function MerchantPortalPage() {
  const sb = await createClient()
  const {
    data: { user },
  } = await sb.auth.getUser()

  // ── Signed out ──
  if (!user) {
    return (
      <PageFrame>
        <FadeUp className="mx-auto flex max-w-[560px] flex-col items-center text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-[3px] border border-accent/25 bg-accent/[0.06] text-accent-bright">
            <Store className="h-6 w-6" />
          </span>
          <span className="mt-7 text-[10.5px] font-bold uppercase tracking-[0.32em] text-text-tertiary">
            Merchant Portal
          </span>
          <h1 className="mt-3 font-display text-[34px] font-bold leading-[1.05] tracking-tightest text-text-primary md:text-[44px]">
            Sign in to your merchant portal
          </h1>
          <p className="mt-4 max-w-[440px] text-[15px] leading-relaxed text-text-secondary">
            Track orders, earnings, and Stripe Connect readiness for every brand
            you manage on the PHYZIK Shop.
          </p>
          <div className="mt-8">
            <Button variant="gold" size="lg" asChild>
              <Link href="/login?next=/merchant">
                Sign in
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <p className="mt-6 text-[13.5px] text-text-tertiary">
            New here?{' '}
            <Link
              href="/for-brands"
              className="font-semibold text-accent underline-offset-4 transition-colors hover:text-accent-bright"
            >
              Sell on PHYZIK
            </Link>
          </p>
        </FadeUp>
      </PageFrame>
    )
  }

  const brands = await getManagedBrands()

  // ── Signed in, no brands ──
  if (brands.length === 0) {
    return (
      <PageFrame>
        <FadeUp className="mx-auto max-w-[640px]">
          <div className="mb-8 flex flex-col items-center text-center">
            <span className="text-[10.5px] font-bold uppercase tracking-[0.32em] text-text-tertiary">
              Merchant Portal
            </span>
            <h1 className="mt-3 font-display text-[32px] font-bold tracking-tightest text-text-primary md:text-[40px]">
              You don&apos;t manage any brands yet
            </h1>
          </div>
          <MerchantEmptyState
            icon={<Store className="h-5 w-5" />}
            title="Apply to sell on PHYZIK"
            description="The PHYZIK Shop puts your products in front of lifters mid-session. Apply to open a store and we'll get you set up."
            cta={{ label: 'Sell on PHYZIK', href: '/for-brands' }}
            note="Questions? admin@phyzik.app"
          />
        </FadeUp>
      </PageFrame>
    )
  }

  // ── Signed in, with brands ──
  return (
    <PageFrame>
      <FadeUp className="mb-10 flex flex-col gap-2">
        <span className="text-[10.5px] font-bold uppercase tracking-[0.32em] text-text-tertiary">
          Merchant Portal
        </span>
        <h1 className="font-display text-[32px] font-bold tracking-tightest text-text-primary md:text-[42px]">
          Your brands
        </h1>
        <p className="max-w-[560px] text-[15px] leading-relaxed text-text-secondary">
          Select a brand to view its dashboard — orders, earnings, products, and
          payout readiness.
        </p>
      </FadeUp>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {brands.map((brand, i) => (
          <FadeUp key={brand.id} delay={i * 0.05}>
            <Link
              href={`/merchant/${brand.id}`}
              className="group flex h-full flex-col gap-4 rounded-[3px] border border-border bg-bg-surface p-5 transition-colors hover:border-accent/35 hover:bg-bg-high focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  {brand.logo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={brand.logo_url}
                      alt={brand.name}
                      className="h-11 w-11 shrink-0 rounded-[3px] border border-border object-cover"
                    />
                  ) : (
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[3px] border border-border bg-bg-high font-display text-[16px] font-bold text-text-secondary">
                      {brand.name.slice(0, 1).toUpperCase()}
                    </span>
                  )}
                  <div className="flex min-w-0 flex-col gap-1">
                    <span className="truncate font-display text-[17px] font-bold leading-none tracking-tight text-text-primary">
                      {brand.name}
                    </span>
                    <StatusChip kind="brand" status={brand.status} />
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-text-tertiary transition-colors group-hover:text-accent-bright" />
              </div>

              <div className="flex items-center gap-4 border-t border-border/60 pt-3.5">
                <ReadyFlag ok={brand.charges_enabled} label="Charges" />
                <ReadyFlag ok={brand.payouts_enabled} label="Payouts" />
              </div>
            </Link>
          </FadeUp>
        ))}
      </div>
    </PageFrame>
  )
}
