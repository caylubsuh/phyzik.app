import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import { BRAND, INSTAGRAM_URL, APP_STORE_URL } from '@/lib/constants'

type FooterLink = { label: string; href: string; external?: boolean }

const COLUMNS: { heading: string; links: FooterLink[] }[] = [
  {
    heading: 'Platform',
    links: [
      { label: 'Features', href: '/#features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Download', href: '/download' },
      { label: 'Method', href: '/method' },
      { label: 'Changelog', href: '/changelog' },
    ],
  },
  {
    heading: 'Shop',
    links: [
      { label: 'Browse the Shop', href: '/shop' },
      { label: 'Brands', href: '/shop/brands' },
      { label: 'Drops', href: '/shop/drops' },
      { label: 'Sell on PHYZIK', href: '/for-brands' },
      { label: 'Merchant portal', href: '/merchant' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Press', href: '/press' },
      { label: 'Compare', href: '/vs' },
      { label: 'Exercises', href: '/exercises' },
      { label: 'Account', href: '/account' },
      { label: 'Contact', href: 'mailto:admin@phyzik.app', external: true },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Terms of Sale', href: '/legal/terms-of-sale' },
      { label: 'Returns & Refunds', href: '/legal/returns' },
      { label: 'Seller Agreement', href: '/legal/seller-agreement' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-border/70 pb-12 pt-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(168,137,46,0.35) 50%, transparent 100%)',
        }}
      />
      <Container>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_repeat(4,1fr)] md:gap-8">
          <div className="flex flex-col gap-5">
            <Image
              src="/brand/phyzik-wordmark-gold.png"
              alt="PHYZIK"
              width={2046}
              height={307}
              draggable={false}
              sizes="150px"
              className="h-6 w-auto select-none"
            />
            <p className="max-w-[260px] text-[13.5px] leading-relaxed text-text-secondary">
              The social training platform for lifters. Where every post is a
              real workout.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener"
                className="rounded-[3px] text-[13px] font-semibold text-accent underline-offset-4 transition-colors hover:text-accent-bright"
              >
                App Store
              </a>
              <span aria-hidden className="text-text-tertiary">
                ·
              </span>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[3px] text-[13px] font-semibold text-text-secondary transition-colors hover:text-text-primary"
              >
                @phyzik.app
              </a>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.heading} aria-label={col.heading} className="flex flex-col gap-4">
              <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-text-tertiary">
                {col.heading}
              </span>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        className="rounded-[3px] text-[13.5px] text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="rounded-[3px] text-[13.5px] text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border/60 pt-7 text-[12px] text-text-tertiary md:flex-row md:items-center md:justify-between">
          <p>© 2026 {BRAND.legalName}. All rights reserved.</p>
          <p className="max-w-[520px] md:text-right">
            PHYZIK Pro subscriptions are billed by Apple, Google, or Stripe. Shop
            purchases are sold by independent brands and processed via Stripe.
          </p>
        </div>
      </Container>
    </footer>
  )
}
