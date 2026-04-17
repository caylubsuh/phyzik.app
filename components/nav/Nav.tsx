'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'motion/react'
import { Menu, X } from 'lucide-react'
import AppStoreBadge from '@/components/ui/AppStoreBadge'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import Wordmark from '@/components/brand/Wordmark'
import { APP_STORE_URL } from '@/lib/constants'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Community', href: '#community' },
  { label: 'Privacy', href: '/privacy' },
] as const

export default function Nav() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 80)
  })

  const bgAlpha = useTransform(scrollY, [0, 120], [0, 0.7], { clamp: true })
  const blur = useTransform(scrollY, [0, 120], [0, 20], { clamp: true })
  const borderOpacity = useTransform(scrollY, [40, 100], [0, 1], { clamp: true })
  const height = useTransform(scrollY, [0, 100], [80, 64], { clamp: true })

  const background = useTransform(bgAlpha, (a) => `rgba(10, 10, 11, ${a})`)
  const backdropFilter = useTransform(blur, (b) => `blur(${b}px)`)
  const borderColor = useTransform(
    borderOpacity,
    (o) => `rgba(255, 255, 255, ${o * 0.07})`,
  )

  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background,
          backdropFilter,
          WebkitBackdropFilter: backdropFilter as unknown as string,
          height,
          borderBottomColor: borderColor,
        }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b transition-shadow',
          scrolled && 'shadow-[0_1px_0_0_rgba(255,255,255,0.03)]',
        )}
      >
        <Container className="flex h-full items-center justify-between">
          <Link
            href="/"
            aria-label="PHYZIK — Home"
            className="flex items-center rounded-sm transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
          >
            <Wordmark variant="nav" />
          </Link>

          <nav className="hidden items-center gap-10 md:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-sm text-[14px] text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <AppStoreBadge size="sm" />
            </div>
            <Button size="sm" className="md:hidden" asChild>
              <a href={APP_STORE_URL} target="_blank" rel="noopener">
                Download
              </a>
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-text-primary transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </Container>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}

type MobileMenuProps = {
  open: boolean
  onClose: () => void
}

function MobileMenu({ open, onClose }: MobileMenuProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    closeBtnRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const root = containerRef.current
      if (!root) return
      const focusables = root.querySelectorAll<HTMLElement>(
        'a, button, [tabindex]:not([tabindex="-1"])',
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Use motion presence only when open.
  return (
    <motion.div
      id="mobile-menu"
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile menu"
      initial={false}
      animate={
        open
          ? { opacity: 1, y: 0, pointerEvents: 'auto' }
          : { opacity: 0, y: -24, pointerEvents: 'none' }
      }
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'fixed inset-0 z-[60] flex flex-col bg-bg/95 backdrop-blur-xl md:hidden',
      )}
    >
      <div className="flex h-20 items-center justify-between px-6">
        <Wordmark variant="nav" />
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-text-primary transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav
        className="flex flex-1 flex-col items-center justify-center gap-10"
        aria-label="Mobile primary"
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={onClose}
            className="rounded-sm text-3xl font-semibold text-text-primary transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
          >
            {link.label}
          </Link>
        ))}
        <div className="mt-6">
          <AppStoreBadge size="md" />
        </div>
      </nav>
    </motion.div>
  )
}
