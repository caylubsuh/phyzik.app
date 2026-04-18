import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import SmoothScroll from '@/components/SmoothScroll'
import GrainOverlay from '@/components/motion/GrainOverlay'
import {
  organizationSchema,
  websiteSchema,
  jsonLdScriptProps,
} from '@/lib/structured-data'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://phyzik.app'),
  title: {
    default: 'PHYZIK — The social training platform built for lifters',
    template: '%s — PHYZIK',
  },
  description:
    'Structured programs. Automatic progressive overload. A social feed where every post is a real workout. Free on iOS.',
  applicationName: 'PHYZIK',
  keywords: [
    'lifting app',
    'gym tracker',
    'workout log',
    'hypertrophy',
    'strength training',
    'progressive overload',
    'social fitness',
    'bodybuilding app',
    'Hyrox training',
    'powerlifting',
    'squad training',
  ],
  authors: [{ name: 'Physique Technologies LLC', url: 'https://phyzik.app' }],
  creator: 'Physique Technologies LLC',
  publisher: 'Physique Technologies LLC',
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  alternates: {
    canonical: 'https://phyzik.app',
  },
  openGraph: {
    title: 'PHYZIK — The social training platform built for lifters',
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
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PHYZIK — The social training platform built for lifters',
    description:
      'Structured programs. Automatic progressive overload. A social feed where every post is a real workout.',
    images: ['/og.png'],
    site: '@phyzikapp',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'health',
}

export const viewport: Viewport = {
  themeColor: '#0A0A0B',
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script {...jsonLdScriptProps(organizationSchema())} />
        <script {...jsonLdScriptProps(websiteSchema())} />
      </head>
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
