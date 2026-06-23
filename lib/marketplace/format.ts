import type { MarketplaceCategory, Availability } from './types'

/** Format integer cents as a localized currency string. */
export function formatCents(
  cents: number | null | undefined,
  currency = 'USD',
): string {
  if (cents == null) return '—'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(cents / 100)
}

export const CATEGORIES: MarketplaceCategory[] = [
  'supplements',
  'apparel',
  'equipment',
  'food',
]

export const CATEGORY_LABEL: Record<MarketplaceCategory, string> = {
  supplements: 'Supplements',
  apparel: 'Apparel',
  equipment: 'Equipment',
  food: 'Food',
}

// Per-category platform commission (basis points) — mirrors the app's feeMath.ts.
export const CATEGORY_COMMISSION_BPS: Record<MarketplaceCategory, number> = {
  supplements: 1500,
  apparel: 1200,
  food: 1200,
  equipment: 1000,
}

export const AVAILABILITY_LABEL: Record<Availability, string> = {
  in_stock: 'In stock',
  low_stock: 'Low stock',
  out_of_stock: 'Sold out',
}

/** "$24.99" or "$24.99 – $39.99" for variant price ranges. */
export function priceRange(
  minCents: number | null,
  maxCents: number | null,
  currency = 'USD',
): string {
  if (minCents == null) return '—'
  if (maxCents == null || maxCents === minCents) {
    return formatCents(minCents, currency)
  }
  return `${formatCents(minCents, currency)} – ${formatCents(maxCents, currency)}`
}

/** Public storage URL for a Supabase object path (already-public buckets). */
export function publicAssetUrl(path: string | null): string | null {
  if (!path) return null
  if (path.startsWith('http')) return path
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  return `${base}/storage/v1/object/public/${path}`
}
