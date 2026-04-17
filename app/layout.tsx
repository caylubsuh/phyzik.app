import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import SmoothScroll from '@/components/SmoothScroll'
import GrainOverlay from '@/components/motion/GrainOverlay'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://phyzik.app'),
  title: 'PHYZIK — The training platform built for lifters',
  description:
    'Structured programs. Automatic progressive overload. A social feed where every post is a real workout.',
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'PHYZIK — The training platform built for lifters',
    description:
      'Structured programs. Automatic progressive overload. A social feed where every post is a real workout.',
    url: 'https://phyzik.app',
    siteName: 'PHYZIK',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'PHYZIK',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PHYZIK — The training platform built for lifters',
    description:
      'Structured programs. Automatic progressive overload. A social feed where every post is a real workout.',
    images: ['/og.png'],
  },
}

export const viewport: Viewport = {
  themeColor: '#0A0A0B',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-bg text-text-primary antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-bg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg"
        >
          Skip to content
        </a>
        <GrainOverlay />
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
      </body>
    </html>
  )
}
