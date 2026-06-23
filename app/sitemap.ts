import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  type Freq = MetadataRoute.Sitemap[number]['changeFrequency']
  const routes: Array<{ path: string; priority: number; changeFrequency: Freq }> = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/shop', priority: 0.9, changeFrequency: 'daily' },
    { path: '/shop/brands', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/shop/drops', priority: 0.7, changeFrequency: 'daily' },
    { path: '/for-brands', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/pricing', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/download', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/method', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/vs', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/exercises', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/press', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.5, changeFrequency: 'yearly' },
    { path: '/changelog', priority: 0.6, changeFrequency: 'weekly' },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/legal/terms-of-sale', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/legal/returns', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/legal/seller-agreement', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/legal/prohibited-items', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/legal/supplement-disclaimer', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/delete-account', priority: 0.3, changeFrequency: 'yearly' },
  ]

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))
}
