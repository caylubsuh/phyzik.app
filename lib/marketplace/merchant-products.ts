/**
 * Server-only reads for the merchant product editor. Loads a single product
 * with everything the editor needs (variants + inventory + options + images),
 * scoped through the cookie-session server client so RLS limits rows to the
 * brand owner (and admins via the is_admin overlay). Step-by-step queries —
 * no PostgREST nested embeds.
 */
import 'server-only'
import { createClient } from '@/lib/supabase/server'
import type {
  MarketplaceCategory,
  ProductImage,
  ProductStatus,
  ProductVariant,
} from './types'

const EDIT_PRODUCT_COLS =
  'id,brand_id,name,description,image_url,price_cents,compare_at_cents,currency,category,handle,is_drop,drop_starts_at,drop_ends_at,sort_order,status,commission_bps'

const VARIANT_COLS =
  'id,product_id,sku,price_cents,compare_at_cents,option1_value,option2_value,option3_value,position,is_active'

/** A variant joined with its inventory row, ready for the editor. */
export interface EditVariant extends ProductVariant {
  qtyAvailable: number
  trackInventory: boolean
}

/** Shape consumed by ProductEditor in edit mode. */
export interface EditProduct {
  id: string
  brandId: string
  name: string
  description: string | null
  imageUrl: string | null
  category: MarketplaceCategory
  status: ProductStatus
  commissionBps: number | null
  /** Option dimension name when this product has options (else null). */
  optionName: string | null
  variants: EditVariant[]
  images: ProductImage[]
}

/** "Chocolate Whey 2lb" -> "chocolate-whey-2lb" (max 60 chars). */
export function slugifyHandle(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
}

/** The brand's default catalog category — used to pre-fill a new product. */
export async function getBrandPrimaryCategory(
  brandId: string,
): Promise<MarketplaceCategory | null> {
  const sb = await createClient()
  const { data, error } = await sb
    .from('marketplace_brands')
    .select('primary_category')
    .eq('id', brandId)
    .maybeSingle()
  if (error) return null
  return (
    ((data as { primary_category?: MarketplaceCategory | null } | null)
      ?.primary_category) ?? null
  )
}

/**
 * Load a single product owned by `brandId` for editing. Returns null when the
 * product is missing or RLS hides it (caller -> notFound()).
 */
export async function getMerchantProductForEdit(
  brandId: string,
  productId: string,
): Promise<EditProduct | null> {
  const sb = await createClient()

  const { data: productRow, error: productErr } = await sb
    .from('marketplace_products')
    .select(EDIT_PRODUCT_COLS)
    .eq('id', productId)
    .eq('brand_id', brandId)
    .maybeSingle()
  if (productErr || !productRow) return null
  const product = productRow as {
    id: string
    brand_id: string
    name: string
    description: string | null
    image_url: string | null
    category: MarketplaceCategory
    status: ProductStatus
    commission_bps: number | null
  }

  // Variants (ordered by position).
  const { data: variantRows } = await sb
    .from('marketplace_product_variants')
    .select(VARIANT_COLS)
    .eq('product_id', productId)
    .order('position', { ascending: true })
  const variants = (variantRows ?? []) as ProductVariant[]

  // Inventory for those variants, mapped by variant_id.
  const variantIds = variants.map((v) => v.id)
  const invByVariant = new Map<
    string,
    { qty_available: number; track_inventory: boolean }
  >()
  if (variantIds.length > 0) {
    const { data: invRows } = await sb
      .from('marketplace_inventory')
      .select('variant_id,qty_available,track_inventory')
      .in('variant_id', variantIds)
    for (const r of (invRows ?? []) as {
      variant_id: string
      qty_available: number | null
      track_inventory: boolean | null
    }[]) {
      invByVariant.set(r.variant_id, {
        qty_available: r.qty_available ?? 0,
        track_inventory: r.track_inventory ?? true,
      })
    }
  }

  // Single option dimension (v1 supports one). Lowest position wins.
  const { data: optionRows } = await sb
    .from('marketplace_product_options')
    .select('id,name,position')
    .eq('product_id', productId)
    .order('position', { ascending: true })
  const optionName =
    ((optionRows ?? [])[0] as { name?: string } | undefined)?.name ?? null

  // Images (ordered by position).
  const { data: imageRows } = await sb
    .from('marketplace_product_images')
    .select('id,product_id,variant_id,url,position,alt_text')
    .eq('product_id', productId)
    .order('position', { ascending: true })
  const images = (imageRows ?? []) as ProductImage[]

  return {
    id: product.id,
    brandId: product.brand_id,
    name: product.name,
    description: product.description,
    imageUrl: product.image_url,
    category: product.category,
    status: product.status,
    commissionBps: product.commission_bps,
    optionName,
    variants: variants.map((v) => {
      const inv = invByVariant.get(v.id)
      return {
        ...v,
        qtyAvailable: inv?.qty_available ?? 0,
        trackInventory: inv?.track_inventory ?? true,
      }
    }),
    images,
  }
}
