'use server'

/**
 * Merchant product mutations (Next server actions). Every action re-verifies
 * that the caller owns the brand via getManagedBrand() (which also grants
 * admins), then writes through the cookie-session server client so RLS scopes
 * every row to the brand owner. A DB trigger forces any non-admin product
 * write to status='review' — merchants cannot self-publish, so the UI offers
 * "Save draft" and "Submit for review" only.
 *
 * No hard deletes: order_items FK-reference variants, so removed variants are
 * deactivated (is_active=false), and archive flips status rather than deleting.
 * supabase-js v2 returns { data, error } and never throws — always check error.
 */
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { getManagedBrand } from '@/lib/marketplace/queries'
import { slugifyHandle } from '@/lib/marketplace/merchant-products'
import type { ProductPayload, SaveResult } from './types'

type Sb = Awaited<ReturnType<typeof createClient>>

function revalidateProduct(brandId: string, productId: string | null): void {
  revalidatePath(`/merchant/${brandId}/products`)
  if (productId) revalidatePath(`/merchant/${brandId}/products/${productId}`)
}

/** Validate the incoming payload before any write. */
function validate(payload: ProductPayload): string | null {
  if (!payload.name || payload.name.trim() === '') return 'Product name is required.'
  if (!payload.variants || payload.variants.length === 0)
    return 'Add at least one variant with a price.'
  if (payload.hasOptions && (!payload.optionName || payload.optionName.trim() === ''))
    return 'Name the option (e.g. Flavor or Size).'
  for (const v of payload.variants) {
    if (!Number.isFinite(v.priceCents) || v.priceCents < 0)
      return 'Every variant needs a valid price.'
    if (payload.hasOptions && (!v.value || v.value.trim() === ''))
      return 'Every option row needs a value.'
  }
  return null
}

/** Lowest active variant price (falls back to first). Drives products.price_cents. */
function minPriceCents(payload: ProductPayload): number {
  const active = payload.variants.filter((v) => v.isActive)
  const pool = active.length > 0 ? active : payload.variants
  return pool.reduce((min, v) => Math.min(min, v.priceCents), pool[0].priceCents)
}

/** Replace this product's options + option_values to match the payload. */
async function syncOptions(
  sb: Sb,
  productId: string,
  payload: ProductPayload,
): Promise<string | null> {
  // Clear existing option_values (via option ids) then options.
  const { data: existingOpts } = await sb
    .from('marketplace_product_options')
    .select('id')
    .eq('product_id', productId)
  const optIds = (existingOpts ?? []).map((o) => (o as { id: string }).id)
  if (optIds.length > 0) {
    await sb.from('marketplace_product_option_values').delete().in('option_id', optIds)
    await sb.from('marketplace_product_options').delete().eq('product_id', productId)
  }
  if (!payload.hasOptions) return null

  const { data: optRow, error: optErr } = await sb
    .from('marketplace_product_options')
    .insert({ product_id: productId, name: payload.optionName, position: 1 })
    .select('id')
    .maybeSingle()
  if (optErr || !optRow) return optErr?.message ?? 'Could not save the option.'
  const optionId = (optRow as { id: string }).id

  const valueRows = payload.variants.map((v, i) => ({
    option_id: optionId,
    value: v.value,
    position: i,
  }))
  const { error: valErr } = await sb
    .from('marketplace_product_option_values')
    .insert(valueRows)
  return valErr?.message ?? null
}

/** Upsert one variant's inventory row (variant_id is the PK). */
async function upsertInventory(
  sb: Sb,
  variantId: string,
  qtyAvailable: number,
  trackInventory: boolean,
): Promise<string | null> {
  const { error } = await sb
    .from('marketplace_inventory')
    .upsert(
      {
        variant_id: variantId,
        qty_available: Math.max(0, Math.round(qtyAvailable)),
        track_inventory: trackInventory,
        reorder_threshold: 0,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'variant_id' },
    )
  return error?.message ?? null
}

/** Insert variants (+ inventory) for a freshly created product. */
async function insertVariants(
  sb: Sb,
  productId: string,
  payload: ProductPayload,
): Promise<string | null> {
  for (let i = 0; i < payload.variants.length; i++) {
    const v = payload.variants[i]
    const { data: vRow, error: vErr } = await sb
      .from('marketplace_product_variants')
      .insert({
        product_id: productId,
        sku: v.sku,
        price_cents: Math.round(v.priceCents),
        option1_value: payload.hasOptions ? v.value : null,
        option2_value: null,
        option3_value: null,
        position: i,
        is_active: v.isActive,
      })
      .select('id')
      .maybeSingle()
    if (vErr || !vRow) return vErr?.message ?? 'Could not create a variant.'
    const invErr = await upsertInventory(
      sb,
      (vRow as { id: string }).id,
      v.qtyAvailable,
      v.trackInventory,
    )
    if (invErr) return invErr
  }
  return null
}

/** Reconcile variants on edit: update existing, insert new, deactivate removed. */
async function reconcileVariants(
  sb: Sb,
  productId: string,
  payload: ProductPayload,
): Promise<string | null> {
  const { data: existing } = await sb
    .from('marketplace_product_variants')
    .select('id')
    .eq('product_id', productId)
  const existingIds = new Set(
    (existing ?? []).map((r) => (r as { id: string }).id),
  )
  const keptIds = new Set<string>()

  for (let i = 0; i < payload.variants.length; i++) {
    const v = payload.variants[i]
    if (v.id && existingIds.has(v.id)) {
      keptIds.add(v.id)
      const { error: updErr } = await sb
        .from('marketplace_product_variants')
        .update({
          sku: v.sku,
          price_cents: Math.round(v.priceCents),
          option1_value: payload.hasOptions ? v.value : null,
          position: i,
          is_active: v.isActive,
        })
        .eq('id', v.id)
      if (updErr) return updErr.message
      const invErr = await upsertInventory(sb, v.id, v.qtyAvailable, v.trackInventory)
      if (invErr) return invErr
    } else {
      const { data: vRow, error: vErr } = await sb
        .from('marketplace_product_variants')
        .insert({
          product_id: productId,
          sku: v.sku,
          price_cents: Math.round(v.priceCents),
          option1_value: payload.hasOptions ? v.value : null,
          option2_value: null,
          option3_value: null,
          position: i,
          is_active: v.isActive,
        })
        .select('id')
        .maybeSingle()
      if (vErr || !vRow) return vErr?.message ?? 'Could not add a variant.'
      const invErr = await upsertInventory(
        sb,
        (vRow as { id: string }).id,
        v.qtyAvailable,
        v.trackInventory,
      )
      if (invErr) return invErr
    }
  }

  // Deactivate (never delete) variants the merchant removed.
  const removed = [...existingIds].filter((id) => !keptIds.has(id))
  if (removed.length > 0) {
    const { error: deactErr } = await sb
      .from('marketplace_product_variants')
      .update({ is_active: false })
      .in('id', removed)
    if (deactErr) return deactErr.message
  }
  return null
}

/** Replace the product's primary image row (position 0) to mirror image_url. */
async function syncPrimaryImage(
  sb: Sb,
  productId: string,
  imageUrl: string | null,
): Promise<void> {
  await sb
    .from('marketplace_product_images')
    .delete()
    .eq('product_id', productId)
    .is('variant_id', null)
  if (imageUrl) {
    await sb.from('marketplace_product_images').insert({
      product_id: productId,
      variant_id: null,
      url: imageUrl,
      position: 0,
      alt_text: null,
    })
  }
}

/**
 * Create (productId === null) or update a product and its full variant graph.
 */
export async function saveProduct(
  brandId: string,
  productId: string | null,
  payload: ProductPayload,
): Promise<SaveResult> {
  const brand = await getManagedBrand(brandId)
  if (!brand) return { ok: false, error: 'Not authorized for this brand.' }

  const invalid = validate(payload)
  if (invalid) return { ok: false, error: invalid }

  const sb = await createClient()
  const priceCents = minPriceCents(payload)
  const fields = {
    name: payload.name.trim(),
    description: payload.description,
    category: payload.category,
    image_url: payload.imageUrl,
    price_cents: priceCents,
    status: payload.status,
  }

  if (productId === null) {
    // CREATE — insert product, then options, variants+inventory, image.
    const { data: created, error: insErr } = await sb
      .from('marketplace_products')
      .insert({
        ...fields,
        brand_id: brandId,
        currency: 'usd',
        handle: slugifyHandle(payload.name),
        is_drop: false,
        sort_order: 0,
      })
      .select('id')
      .maybeSingle()
    if (insErr || !created) {
      return { ok: false, error: insErr?.message ?? 'Could not create the product.' }
    }
    const newId = (created as { id: string }).id

    const optErr = await syncOptions(sb, newId, payload)
    if (optErr) return { ok: false, error: optErr, productId: newId }
    const varErr = await insertVariants(sb, newId, payload)
    if (varErr) return { ok: false, error: varErr, productId: newId }
    await syncPrimaryImage(sb, newId, payload.imageUrl)

    revalidateProduct(brandId, newId)
    return {
      ok: true,
      productId: newId,
      message:
        payload.status === 'review'
          ? 'Submitted for review.'
          : 'Draft saved.',
    }
  }

  // EDIT — update product fields, then reconcile the variant graph.
  const { error: updErr } = await sb
    .from('marketplace_products')
    .update(fields)
    .eq('id', productId)
    .eq('brand_id', brandId)
  if (updErr) return { ok: false, error: updErr.message, productId }

  const optErr = await syncOptions(sb, productId, payload)
  if (optErr) return { ok: false, error: optErr, productId }
  const varErr = await reconcileVariants(sb, productId, payload)
  if (varErr) return { ok: false, error: varErr, productId }
  await syncPrimaryImage(sb, productId, payload.imageUrl)

  revalidateProduct(brandId, productId)
  return {
    ok: true,
    productId,
    message:
      payload.status === 'review' ? 'Submitted for review.' : 'Changes saved.',
  }
}

/** Archive a product (soft — never deleted). */
export async function archiveProduct(
  brandId: string,
  productId: string,
): Promise<SaveResult> {
  const brand = await getManagedBrand(brandId)
  if (!brand) return { ok: false, error: 'Not authorized for this brand.' }
  const sb = await createClient()
  const { error } = await sb
    .from('marketplace_products')
    .update({ status: 'archived' })
    .eq('id', productId)
    .eq('brand_id', brandId)
  if (error) return { ok: false, error: error.message, productId }
  revalidateProduct(brandId, productId)
  return { ok: true, productId, message: 'Product archived.' }
}

/** Restore an archived product back to draft. */
export async function unarchiveProduct(
  brandId: string,
  productId: string,
): Promise<SaveResult> {
  const brand = await getManagedBrand(brandId)
  if (!brand) return { ok: false, error: 'Not authorized for this brand.' }
  const sb = await createClient()
  const { error } = await sb
    .from('marketplace_products')
    .update({ status: 'draft' })
    .eq('id', productId)
    .eq('brand_id', brandId)
  if (error) return { ok: false, error: error.message, productId }
  revalidateProduct(brandId, productId)
  return { ok: true, productId, message: 'Product restored to draft.' }
}
