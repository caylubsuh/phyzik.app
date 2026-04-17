import type { NextConfig } from 'next'

const config: NextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['motion', 'lucide-react'],
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'is1-ssl.mzstatic.com' }],
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
