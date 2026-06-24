import type { NextConfig } from 'next'

const config: NextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['motion', 'lucide-react'],
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'is1-ssl.mzstatic.com' },
      // PHYZIK Shop product/brand images live in Supabase Storage (public buckets).
      {
        protocol: 'https',
        hostname: 'vawfcizelppxfhffflgs.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      // Brand/product images served from the app's CloudFront CDN.
      { protocol: 'https', hostname: '**.cloudfront.net' },
    ],
  },
  async rewrites() {
    return [
      { source: '/post/:slug*', destination: '/redirect' },
      { source: '/workout/:slug*', destination: '/redirect' },
      { source: '/squad/:slug*', destination: '/redirect' },
      { source: '/community/:slug*', destination: '/redirect' },
      { source: '/gym/:slug*', destination: '/redirect' },
      { source: '/challenge/:slug*', destination: '/redirect' },
      { source: '/@:username', destination: '/redirect' },
    ]
  },
  async redirects() {
    return [
      { source: '/privacy.html', destination: '/privacy', permanent: true },
      { source: '/terms.html', destination: '/terms', permanent: true },
      // Community page hidden - keep source files for future, redirect visits home.
      { source: '/community', destination: '/', permanent: false },
    ]
  },
  async headers() {
    return [
      {
        source: '/.well-known/apple-app-site-association',
        headers: [{ key: 'Content-Type', value: 'application/json' }],
      },
    ]
  },
}

export default config
