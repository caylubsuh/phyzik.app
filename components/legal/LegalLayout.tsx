import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import Container from '@/components/ui/Container'

type LegalLayoutProps = {
  title: string
  lastUpdated: string
  children: ReactNode
}

export default function LegalLayout({
  title,
  lastUpdated,
  children,
}: LegalLayoutProps) {
  return (
    <>
      <Nav />
      <main id="main-content" className="pb-32 pt-32 md:pt-40">
        <Container>
          <div className="mx-auto max-w-[720px]">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-sm text-sm text-text-tertiary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to home
            </Link>
            <h1 className="mt-8 text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
              {title}
            </h1>
            <p className="mt-3 text-sm text-text-tertiary">
              Last updated: {lastUpdated}
            </p>
            <div className="mt-16 h-px w-full bg-border" />
            <article className="legal-prose mt-16">{children}</article>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
