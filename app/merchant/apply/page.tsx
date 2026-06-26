import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Clock } from 'lucide-react'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import FadeUp from '@/components/motion/FadeUp'
import ApplyForm from '@/components/merchant/ApplyForm'
import { createClient } from '@/lib/supabase/server'
import { getManagedBrands } from '@/lib/marketplace/queries'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Apply to sell — PHYZIK Shop',
  description: 'Apply to open a brand store on the PHYZIK Shop.',
  alternates: { canonical: `${SITE_URL}/merchant/apply` },
  robots: { index: false, follow: false },
}

function Frame({ children }: { children: React.ReactNode }) {
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

export default async function MerchantApplyPage() {
  const sb = await createClient()
  const {
    data: { user },
  } = await sb.auth.getUser()
  if (!user) redirect('/login?next=/merchant/apply')

  const brands = await getManagedBrands()
  if (brands.length > 0) redirect('/merchant')

  const { data: existing } = await sb
    .from('marketplace_applications')
    .select('status,brand_name,created_at')
    .order('created_at', { ascending: false })
    .limit(1)
  const pendingApp = ((existing ?? []) as { status: string; brand_name: string }[]).find(
    (a) => a.status === 'pending',
  )

  return (
    <Frame>
      <FadeUp className="mx-auto max-w-[680px]">
        <div className="mb-8 flex flex-col gap-2">
          <span className="text-[10.5px] font-bold uppercase tracking-[0.32em] text-text-tertiary">
            Merchant Portal
          </span>
          <h1 className="font-display text-[32px] font-bold tracking-tightest text-text-primary md:text-[40px]">
            Apply to sell on PHYZIK
          </h1>
          <p className="max-w-[560px] text-[15px] leading-relaxed text-text-secondary">
            Tell us about your brand. Once approved by our team, you&apos;ll be able to list products — each
            item is reviewed before it goes live on the Shop.
          </p>
        </div>

        {pendingApp ? (
          <div className="flex flex-col items-center gap-3 rounded-[3px] border border-accent/30 bg-accent/[0.05] px-6 py-10 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-[3px] border border-accent/30 bg-accent/[0.08] text-accent-bright">
              <Clock className="h-5 w-5" />
            </span>
            <h3 className="font-display text-[20px] font-bold tracking-tight text-text-primary">
              Application under review
            </h3>
            <p className="max-w-[440px] text-[14px] leading-relaxed text-text-secondary">
              Your application for <span className="text-text-primary">{pendingApp.brand_name}</span> is in our
              queue. We&apos;ll email you once it&apos;s reviewed. Questions? admin@phyzik.app
            </p>
            <Button variant="secondary" size="md" asChild>
              <Link href="/merchant">Go to merchant portal</Link>
            </Button>
          </div>
        ) : (
          <ApplyForm defaultEmail={user.email ?? undefined} />
        )}
      </FadeUp>
    </Frame>
  )
}
