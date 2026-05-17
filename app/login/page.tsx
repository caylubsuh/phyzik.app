import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import Container from '@/components/ui/Container'
import AccentGlow from '@/components/motion/AccentGlow'
import { createClient } from '@/lib/supabase/server'
import { SITE_URL } from '@/lib/constants'
import AuthForm from './AuthForm'

export const metadata: Metadata = {
  title: 'Log in — PHYZIK',
  description: 'Log in to manage your PHYZIK Pro subscription.',
  alternates: { canonical: `${SITE_URL}/login` },
  robots: { index: false, follow: false },
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; plan?: string; error?: string }>
}) {
  const params = await searchParams

  // If already signed in, redirect onward.
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (user) {
    redirect(params.next || '/account')
  }

  return (
    <>
      <Nav />
      <main id="main-content" className="pb-24 pt-28 md:pt-32">
        <section className="relative overflow-hidden">
          <AccentGlow position="top-center" size="lg" intensity={0.2} />
          <Container className="relative z-10">
            <div className="mx-auto flex w-full max-w-[440px] flex-col gap-8">
              <header className="flex flex-col gap-3">
                <h1 className="text-4xl font-bold tracking-tightest text-text-primary md:text-5xl">
                  Welcome back.
                </h1>
                <p className="text-[15px] text-text-secondary">
                  Log in to manage your subscription or pick up where you left
                  off.
                </p>
              </header>

              <AuthForm
                mode="login"
                next={params.next}
                plan={params.plan}
                error={params.error}
              />

              <p className="text-[14px] text-text-secondary">
                Don&apos;t have an account?{' '}
                <Link
                  href={{
                    pathname: '/signup',
                    query: { ...(params.next ? { next: params.next } : {}), ...(params.plan ? { plan: params.plan } : {}) },
                  }}
                  className="text-accent underline-offset-4 hover:underline"
                >
                  Create one
                </Link>
                .
              </p>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
