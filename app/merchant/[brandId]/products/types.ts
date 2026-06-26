/**
 * Shared merchant product-editor types. Kept FREE of 'use server' / 'server-only'
 * so both the client ProductEditor and the server action file can import them.
 * (Type-only imports are erased at compile time.)
 */
import type { MarketplaceCategory, ProductStatus } from '@/lib/marketplace/types'

/** Standard mutation result, mirrors the admin ActionResult shape. */
export interface SaveResult {
  ok: boolean
  productId?: string
  error?: string
  message?: string
}

/** One variant row as authored in the editor. `id` present => existing row. */
export interface VariantInput {
  /** Existing variant id (edit). Omitted/empty for newly added rows. */
  id?: string
  /** Option value for the single option dimension (e.g. "Chocolate"). Null for a simple product's lone variant. */
  value: string | null
  priceCents: number
  sku: string | null
  qtyAvailable: number
  trackInventory: boolean
  isActive: boolean
}

/** Full payload the client sends to saveProduct(). */
export interface ProductPayload {
  name: string
  description: string | null
  category: MarketplaceCategory
  imageUrl: string | null
  /** Target status. The DB trigger forces 'review' for non-admins on any write. */
  status: Extract<ProductStatus, 'draft' | 'review'>
  /** True when the product carries an option dimension (sizes / flavors). */
  hasOptions: boolean
  /** Option name when hasOptions (e.g. "Flavor"). Ignored otherwise. */
  optionName: string | null
  /** Ordered variant rows. Simple product => exactly one with value=null. */
  variants: VariantInput[]
}
