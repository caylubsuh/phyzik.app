import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import { BRAND, INSTAGRAM_URL } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="border-t border-border py-16">
      <Container>
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <Image
              src="/brand/phyzik-wordmark-white.png"
              alt="PHYZIK"
              width={2046}
              height={307}
              draggable={false}
              sizes="133px"
              className="h-5 w-auto select-none"
            />
            <p className="mt-3 text-[13px] text-text-secondary">
              © 2026 {BRAND.legalName}
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="flex flex-col gap-4 md:flex-row md:gap-8"
          >
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm text-[13px] text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
            >
              Instagram
            </a>
            <Link
              href="/press"
              className="rounded-sm text-[13px] text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
            >
              Press
            </Link>
            <Link
              href="/changelog"
              className="rounded-sm text-[13px] text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
            >
              Changelog
            </Link>
            <Link
              href="/privacy"
              className="rounded-sm text-[13px] text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="rounded-sm text-[13px] text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
            >
              Terms
            </Link>
            <Link
              href="/delete-account"
              className="rounded-sm text-[13px] text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
            >
              Delete account
            </Link>
            <a
              href="mailto:admin@phyzik.app"
              className="rounded-sm text-[13px] text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
            >
              Contact
            </a>
          </nav>
        </div>

        <div className="mt-12 border-t border-border/50 pt-6">
          <p className="text-center text-[11px] uppercase tracking-[0.15em] text-text-tertiary/80">
            Made in Ithaca and Vienna. Built for everyone everywhere.
          </p>
        </div>
      </Container>
    </footer>
  )
}
