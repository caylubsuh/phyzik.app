// Web-facing types for the PHYZIK Shop marketplace.
// Mirrors the live Supabase schema (same project as the app). The storefront
// reads the anon-safe views marketplace_brands_public / marketplace_inventory_public.

export type MarketplaceCategory = 'supplements' | 'apparel' | 'equipment' | 'food'

export type BrandStatus = 'pending' | 'approved' | 'live' | 'suspended'
export type ProductStatus = 'draft' | 'review' | 'published' | 'archived'

export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'fulfilled'
  | 'shipped'
  | 'delivered'
  | 'refunded'
  | 'partially_refunded'
  | 'disputed'
  | 'failed'
  | 'cancelled'

export type Availability = 'in_stock' | 'low_stock' | 'out_of_stock'

export interface Brand {
  id: string
  name: string
  slug: string
  logo_url: string | null
  banner_url: string | null
  description: string | null
  categories: MarketplaceCategory[]
  website_url: string | null
  affiliate_url: string | null
  promo_code: string | null
  promo_description: string | null
  featured: boolean
  verified: boolean
  sort_order: number
  legal_name?: string | null
  business_address?: string | null
  contact_email?: string | null
  contact_phone?: string | null
}

export interface Product {
  id: string
  brand_id: string
  name: string
  description: string | null
  image_url: string | null
  price_cents: number | null
  compare_at_cents: number | null
  currency: string
  category: MarketplaceCategory
  handle: string | null
  is_drop: boolean
  drop_starts_at: string | null
  drop_ends_at: string | null
  sort_order: number
}

export interface ProductVariant {
  id: string
  product_id: string
  sku: string | null
  price_cents: number
  compare_at_cents: number | null
  option1_value: string | null
  option2_value: string | null
  option3_value: string | null
  position: number
  is_active: boolean
}

export interface VariantInventory {
  variant_id: string
  track_inventory: boolean
  qty_available: number
  availability: Availability
}

export interface ProductImage {
  id: string
  product_id: string
  variant_id: string | null
  url: string
  position: number
  alt_text: string | null
}

export interface ProductOption {
  id: string
  product_id: string
  name: string
  position: number
  values: string[]
}

export interface StorefrontProduct extends Product {
  priceMinCents: number | null
  priceMaxCents: number | null
}

export interface ProductDetail extends StorefrontProduct {
  brand: Brand | null
  variants: ProductVariant[]
  inventory: Record<string, VariantInventory>
  images: ProductImage[]
  options: ProductOption[]
  reviewAvg: number | null
  reviewCount: number
}

export interface ShipTo {
  name?: string
  line1?: string
  line2?: string
  city?: string
  state?: string
  zip?: string
  country?: string
}

export interface OrderItem {
  id: string
  order_id: string
  variant_id: string | null
  product_id: string | null
  name_snapshot: string
  qty: number
  unit_price_cents: number
}

export interface Order {
  id: string
  buyer_id: string
  brand_id: string
  status: OrderStatus
  amount_subtotal_cents: number
  shipping_cents: number
  tax_cents: number
  amount_total_cents: number
  currency: string
  tracking_carrier: string | null
  tracking_number: string | null
  ship_to: ShipTo | null
  created_at: string
  items?: OrderItem[]
  brandName?: string
  buyerName?: string
}

export interface Payout {
  id: string
  brand_id: string
  amount_cents: number
  status: string | null
  arrival_date: string | null
  created_at: string
}

export interface MerchantEarnings {
  gmvCents: number
  commissionCents: number
  processingCents: number
  netCents: number
  paidOrderCount: number
  pendingFulfillment: number
  payoutPaidCents: number
}

export interface ProductReview {
  id: string
  product_id: string
  buyer_id: string
  rating: number
  body: string | null
  created_at: string
}
