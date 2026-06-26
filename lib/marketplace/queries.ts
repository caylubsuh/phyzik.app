/**
 * Server-side marketplace reads for the web storefront + merchant portal.
 * Reads the SAME Supabase project as the PHYZIK app. Storefront uses the anon
 * public client (anon-safe views); buyer/merchant reads use the cookie-session
 * server client so RLS scopes rows to the signed-in user.
 */
import 'server-only'
import { createPublicClient } from '@/lib/supabase/public'
import { createClient } from '@/lib/supabase/server'
import { CATEGORY_COMMISSION_BPS } from './format'
import type {
  Brand,
  BrandStatus,
  MarketplaceCategory,
  Order,
  OrderItem,
  Payout,
  Product,
  ProductDetail,
  ProductImage,
  ProductOption,
  ProductReview,
  ProductVariant,
  StorefrontProduct,
  VariantInventory,
  MerchantEarnings,
} from './types'

export interface ManagedBrand extends Brand {
  status: BrandStatus
  charges_enabled: boolean
  payouts_enabled: boolean
  stripe_account_id: string | null
  commission_bps: number
}

const BRAND_COLS =
  'id,name,slug,logo_url,banner_url,description,categories,website_url,affiliate_url,promo_code,promo_description,featured,verified,sort_order'
const PRODUCT_COLS =
  'id,brand_id,name,description,image_url,price_cents,compare_at_cents,currency,category,handle,is_drop,drop_starts_at,drop_ends_at,sort_order'
const ORDER_COLS =
  'id,buyer_id,brand_id,status,amount_subtotal_cents,shipping_cents,tax_cents,amount_total_cents,currency,tracking_carrier,tracking_number,ship_to,created_at'

/** Attach min/max variant price to a list of products. */
async function withPriceRanges(
  sb: ReturnType<typeof createPublicClient>,
  products: Product[],
): Promise<StorefrontProduct[]> {
  if (products.length === 0) return []
  const ids = products.map((p) => p.id)
  const { data: variants } = await sb
    .from('marketplace_product_variants')
    .select('product_id,price_cents,is_active')
    .in('product_id', ids)
    .eq('is_active', true)

  const ranges = new Map<string, { min: number; max: number }>()
  for (const v of (variants ?? []) as { product_id: string; price_cents: number }[]) {
    const r = ranges.get(v.product_id)
    if (!r) ranges.set(v.product_id, { min: v.price_cents, max: v.price_cents })
    else
      ranges.set(v.product_id, {
        min: Math.min(r.min, v.price_cents),
        max: Math.max(r.max, v.price_cents),
      })
  }

  return products.map((p) => {
    const r = ranges.get(p.id)
    return {
      ...p,
      priceMinCents: r?.min ?? p.price_cents ?? null,
      priceMaxCents: r?.max ?? p.price_cents ?? null,
    }
  })
}

// ─────────────────────────── STOREFRONT (public) ───────────────────────────

export async function getBrands(category?: MarketplaceCategory): Promise<Brand[]> {
  const sb = createPublicClient()
  let q = sb
    .from('marketplace_brands_public')
    .select(BRAND_COLS)
    .eq('is_active', true)
    .order('featured', { ascending: false })
    .order('sort_order', { ascending: true })
    .limit(200)
  if (category) q = q.contains('categories', [category])
  const { data, error } = await q
  if (error) return []
  return (data ?? []) as Brand[]
}

export async function getFeaturedBrands(): Promise<Brand[]> {
  const all = await getBrands()
  const featured = all.filter((b) => b.featured)
  return (featured.length > 0 ? featured : all).slice(0, 8)
}

export async function getBrand(slug: string): Promise<Brand | null> {
  const sb = createPublicClient()
  const { data, error } = await sb
    .from('marketplace_brands_public')
    .select(BRAND_COLS)
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle()
  if (error || !data) return null
  return data as Brand
}

export async function getProducts(opts?: {
  brandId?: string
  category?: MarketplaceCategory
}): Promise<StorefrontProduct[]> {
  const sb = createPublicClient()
  let q = sb
    .from('marketplace_products')
    .select(PRODUCT_COLS)
    .eq('is_active', true)
    .eq('status', 'published')
    .order('sort_order', { ascending: true })
    .limit(200)
  if (opts?.brandId) q = q.eq('brand_id', opts.brandId)
  if (opts?.category) q = q.eq('category', opts.category)
  const { data, error } = await q
  if (error) return []
  return withPriceRanges(sb, (data ?? []) as Product[])
}

export async function getDrops(): Promise<StorefrontProduct[]> {
  const sb = createPublicClient()
  const { data, error } = await sb
    .from('marketplace_products')
    .select(PRODUCT_COLS)
    .eq('is_active', true)
    .eq('is_drop', true)
    .eq('status', 'published')
    .order('sort_order', { ascending: true })
    .limit(200)
  if (error) return []
  const now = Date.now()
  const live = ((data ?? []) as Product[]).filter((p) => {
    const startsOk = !p.drop_starts_at || new Date(p.drop_starts_at).getTime() <= now
    const endsOk = !p.drop_ends_at || new Date(p.drop_ends_at).getTime() >= now
    return startsOk && endsOk
  })
  return withPriceRanges(sb, live)
}

export async function getProductDetail(id: string): Promise<ProductDetail | null> {
  const sb = createPublicClient()
  const { data: product, error } = await sb
    .from('marketplace_products')
    .select(PRODUCT_COLS)
    .eq('id', id)
    .eq('status', 'published')
    .maybeSingle()
  if (error || !product) return null
  const p = product as Product

  const [brandRes, optionsRes, variantsRes, imagesRes, reviewsRes] = await Promise.all([
    sb.from('marketplace_brands_public').select(BRAND_COLS).eq('id', p.brand_id).maybeSingle(),
    sb
      .from('marketplace_product_options')
      .select('id,product_id,name,position')
      .eq('product_id', id)
      .order('position'),
    sb
      .from('marketplace_product_variants')
      .select(
        'id,product_id,sku,price_cents,compare_at_cents,option1_value,option2_value,option3_value,position,is_active',
      )
      .eq('product_id', id)
      .eq('is_active', true)
      .order('position'),
    sb
      .from('marketplace_product_images')
      .select('id,product_id,variant_id,url,position,alt_text')
      .eq('product_id', id)
      .order('position'),
    sb.from('marketplace_product_reviews').select('rating').eq('product_id', id),
  ])

  const variants = (variantsRes.data ?? []) as ProductVariant[]

  const options: ProductOption[] = []
  for (const opt of (optionsRes.data ?? []) as Omit<ProductOption, 'values'>[]) {
    const { data: vals } = await sb
      .from('marketplace_product_option_values')
      .select('value,position')
      .eq('option_id', opt.id)
      .order('position')
    options.push({
      ...opt,
      values: ((vals ?? []) as { value: string }[]).map((v) => v.value),
    })
  }

  const inventory: Record<string, VariantInventory> = {}
  if (variants.length > 0) {
    const { data: inv } = await sb
      .from('marketplace_inventory_public')
      .select('variant_id,track_inventory,qty_available,availability')
      .in(
        'variant_id',
        variants.map((v) => v.id),
      )
    for (const row of (inv ?? []) as VariantInventory[]) inventory[row.variant_id] = row
  }

  const ratings = ((reviewsRes.data ?? []) as { rating: number }[]).map((r) => r.rating)
  const reviewCount = ratings.length
  const reviewAvg = reviewCount > 0 ? ratings.reduce((a, b) => a + b, 0) / reviewCount : null

  const prices = variants.map((v) => v.price_cents)
  const priceMinCents = prices.length ? Math.min(...prices) : p.price_cents
  const priceMaxCents = prices.length ? Math.max(...prices) : p.price_cents

  return {
    ...p,
    priceMinCents,
    priceMaxCents,
    brand: (brandRes.data as Brand | null) ?? null,
    variants,
    inventory,
    images: (imagesRes.data ?? []) as ProductImage[],
    options,
    reviewAvg,
    reviewCount,
  }
}

export async function getProductReviews(productId: string): Promise<ProductReview[]> {
  const sb = createPublicClient()
  const { data, error } = await sb
    .from('marketplace_product_reviews')
    .select('id,product_id,buyer_id,rating,body,created_at')
    .eq('product_id', productId)
    .order('created_at', { ascending: false })
    .limit(50)
  if (error) return []
  return (data ?? []) as ProductReview[]
}

// ─────────────────────────── BUYER (authed) ───────────────────────────

async function attachItemsAndBrand(
  sb: Awaited<ReturnType<typeof createClient>>,
  orders: Order[],
): Promise<Order[]> {
  if (orders.length === 0) return []
  const orderIds = orders.map((o) => o.id)
  const brandIds = Array.from(new Set(orders.map((o) => o.brand_id)))
  const [itemsRes, brandsRes] = await Promise.all([
    sb
      .from('marketplace_order_items')
      .select('id,order_id,variant_id,product_id,name_snapshot,qty,unit_price_cents')
      .in('order_id', orderIds),
    sb.from('marketplace_brands_public').select('id,name').in('id', brandIds),
  ])
  const itemsByOrder = new Map<string, OrderItem[]>()
  for (const it of (itemsRes.data ?? []) as OrderItem[]) {
    const arr = itemsByOrder.get(it.order_id) ?? []
    arr.push(it)
    itemsByOrder.set(it.order_id, arr)
  }
  const brandName = new Map<string, string>()
  for (const b of (brandsRes.data ?? []) as { id: string; name: string }[]) brandName.set(b.id, b.name)
  return orders.map((o) => ({
    ...o,
    items: itemsByOrder.get(o.id) ?? [],
    brandName: brandName.get(o.brand_id),
  }))
}

export async function getMyOrders(): Promise<Order[]> {
  const sb = await createClient()
  const {
    data: { user },
  } = await sb.auth.getUser()
  if (!user) return []
  const { data, error } = await sb
    .from('marketplace_orders')
    .select(ORDER_COLS)
    .order('created_at', { ascending: false })
    .limit(100)
  if (error) return []
  return attachItemsAndBrand(sb, (data ?? []) as Order[])
}

export async function getMyOrder(id: string): Promise<Order | null> {
  const sb = await createClient()
  const { data, error } = await sb.from('marketplace_orders').select(ORDER_COLS).eq('id', id).maybeSingle()
  if (error || !data) return null
  const [withExtras] = await attachItemsAndBrand(sb, [data as Order])
  return withExtras ?? null
}

// ─────────────────────────── MERCHANT (authed, RLS scopes to owner) ─────────

export async function getManagedBrands(): Promise<ManagedBrand[]> {
  const sb = await createClient()
  const {
    data: { user },
  } = await sb.auth.getUser()
  if (!user) return []
  const { data, error } = await sb
    .from('marketplace_brands')
    .select(`${BRAND_COLS},status,charges_enabled,payouts_enabled,stripe_account_id,commission_bps`)
    .eq('owner_user_id', user.id)
    .order('name', { ascending: true })
  if (error) return []
  return (data ?? []) as ManagedBrand[]
}

export async function getManagedBrand(brandId: string): Promise<ManagedBrand | null> {
  const all = await getManagedBrands()
  const owned = all.find((b) => b.id === brandId)
  if (owned) return owned
  // Platform admins can preview ANY brand's merchant dashboard (read-only).
  // Merchant reads below (orders/products/earnings) already pass for admins via
  // the is_admin RLS overlay; this lets the dashboard pages resolve the brand.
  const sb = await createClient()
  const {
    data: { user },
  } = await sb.auth.getUser()
  if (!user) return null
  const { data: prof } = await sb
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .maybeSingle()
  if (!(prof as { is_admin?: boolean } | null)?.is_admin) return null
  const { data } = await sb
    .from('marketplace_brands')
    .select(`${BRAND_COLS},status,charges_enabled,payouts_enabled,stripe_account_id,commission_bps`)
    .eq('id', brandId)
    .maybeSingle()
  return (data as ManagedBrand | null) ?? null
}

export async function getMerchantProducts(brandId: string): Promise<Product[]> {
  const sb = await createClient()
  const { data, error } = await sb
    .from('marketplace_products')
    .select(`${PRODUCT_COLS},status`)
    .eq('brand_id', brandId)
    .order('sort_order', { ascending: true })
  if (error) return []
  return (data ?? []) as Product[]
}

export async function getMerchantOrders(brandId: string): Promise<Order[]> {
  const sb = await createClient()
  const { data, error } = await sb
    .from('marketplace_orders')
    .select(ORDER_COLS)
    .eq('brand_id', brandId)
    .order('created_at', { ascending: false })
    .limit(200)
  if (error) return []
  return attachItemsAndBrand(sb, (data ?? []) as Order[])
}

export async function getMerchantEarnings(brandId: string): Promise<MerchantEarnings> {
  const sb = await createClient()
  const empty: MerchantEarnings = {
    gmvCents: 0,
    commissionCents: 0,
    processingCents: 0,
    netCents: 0,
    paidOrderCount: 0,
    pendingFulfillment: 0,
    payoutPaidCents: 0,
  }

  const { data: brand } = await sb
    .from('marketplace_brands')
    .select('commission_bps')
    .eq('id', brandId)
    .maybeSingle()
  const bps = (brand as { commission_bps?: number } | null)?.commission_bps ?? 1200

  const { data: orders } = await sb
    .from('marketplace_orders')
    .select('status,amount_subtotal_cents')
    .eq('brand_id', brandId)
  if (!orders) return empty

  const paidStatuses = new Set(['paid', 'fulfilled', 'shipped', 'delivered', 'partially_refunded'])
  const pendingStatuses = new Set(['paid', 'fulfilled'])
  let gmv = 0
  let paidCount = 0
  let pending = 0
  for (const o of orders as { status: string; amount_subtotal_cents: number }[]) {
    if (paidStatuses.has(o.status)) {
      gmv += o.amount_subtotal_cents
      paidCount += 1
    }
    if (pendingStatuses.has(o.status)) pending += 1
  }
  const commission = Math.round((gmv * bps) / 10000)
  const processing = Math.round(gmv * 0.029 + paidCount * 30)
  const net = Math.max(0, gmv - commission - processing)

  const { data: payouts } = await sb
    .from('marketplace_brand_payouts')
    .select('amount_cents,status')
    .eq('brand_id', brandId)
  const payoutPaid = ((payouts ?? []) as Payout[])
    .filter((p) => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount_cents, 0)

  return {
    gmvCents: gmv,
    commissionCents: commission,
    processingCents: processing,
    netCents: net,
    paidOrderCount: paidCount,
    pendingFulfillment: pending,
    payoutPaidCents: payoutPaid,
  }
}

export { CATEGORY_COMMISSION_BPS }
