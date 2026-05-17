import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import Container from '@/components/ui/Container'
import AccentGlow from '@/components/motion/AccentGlow'
import { createClient } from '@/lib/supabase/server'
import { SITE_URL } from '@/lib/constants'
import AuthForm from '../login/AuthForm'

export const metadata: Metadata = {
  title: 'Sign up — PHYZIK',
  description: 'Create your PHYZIK account and subscribe to Pro on the web.',
  alternates: { canonical: `${SITE_URL}/signup` },
  robots: { index: false, follow: false },
}

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; plan?: string; error?: string }>
}) {
  const params = await searchParams

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (user) {
    redirect(params.plan ? `/api/checkout?plan=${params.plan}` : params.next || '/account')
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
                  Create your account.
                </h1>
                <p className="text-[15px] text-text-secondary">
                  {params.plan
                    ? 'One minute. Then you go straight to checkout.'
                    : 'Use the same email you use in the app — your subscription stays linked.'}
                </p>
              </header>

              <AuthForm
                mode="signup"
                next={params.next}
                plan={params.plan}
                error={params.error}
              />

              <p className="text-[14px] text-text-secondary">
                Already have an account?{' '}
                <Link
                  href={{
                    pathname: '/login',
                    query: { ...(params.next ? { next: params.next } : {}), ...(params.plan ? { plan: params.plan } : {}) },
                  }}
                  className="text-accent underline-offset-4 hover:underline"
                >
                  Log in
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
