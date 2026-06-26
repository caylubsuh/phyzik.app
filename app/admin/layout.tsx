import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ShieldAlert } from 'lucide-react'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { getAdminUser } from '@/lib/marketplace/admin'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Admin — PHYZIK Shop',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/admin` },
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAdmin } = await getAdminUser()

  if (!user) redirect('/login?next=/admin')

  if (!isAdmin) {
    return (
      <>
        <Nav />
        <main id="main-content" className="relative">
          <section className="pb-24 pt-32">
            <Container>
              <div className="mx-auto flex max-w-[480px] flex-col items-center text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-[3px] border border-red-500/30 bg-red-500/[0.06] text-red-300">
                  <ShieldAlert className="h-6 w-6" />
                </span>
                <h1 className="mt-7 font-display text-[28px] font-bold tracking-tightest text-text-primary">
                  Not authorized
                </h1>
                <p className="mt-3 text-[14.5px] leading-relaxed text-text-secondary">
                  This area is for PHYZIK platform administrators. If you manage a brand, head to your
                  merchant portal instead.
                </p>
                <div className="mt-7">
                  <Button variant="secondary" size="md" asChild>
                    <Link href="/merchant">Go to merchant portal</Link>
                  </Button>
                </div>
              </div>
            </Container>
          </section>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  )
}
