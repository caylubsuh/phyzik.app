'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export type ShippingProfileInput = {
  name: string
  flat_rate_cents: number
  free_over_cents: number | null
  processing_days: number
  ships_from_zip: string
}

export async function upsertShippingProfile(
  brandId: string,
  input: ShippingProfileInput,
): Promise<{ error?: string }> {
  const sb = await createClient()

  // Check ownership
  const {
    data: { user },
  } = await sb.auth.getUser()
  if (!user) return { error: 'Not authenticated.' }

  const { data: brand } = await sb
    .from('marketplace_brands')
    .select('id,owner_user_id')
    .eq('id', brandId)
    .maybeSingle()

  // Also allow admins
  if (!brand) return { error: 'Brand not found.' }
  if (brand.owner_user_id !== user.id) {
    const { data: prof } = await sb
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .maybeSingle()
    if (!(prof as { is_admin?: boolean } | null)?.is_admin) {
      return { error: 'Not authorized.' }
    }
  }

  // Load existing row to decide upsert
  const { data: existing } = await sb
    .from('marketplace_shipping_profiles')
    .select('id')
    .eq('brand_id', brandId)
    .maybeSingle()

  const payload = {
    brand_id: brandId,
    name: input.name.trim() || 'Standard',
    flat_rate_cents: input.flat_rate_cents,
    free_over_cents: input.free_over_cents,
    processing_days: input.processing_days,
    ships_from_zip: input.ships_from_zip.trim() || null,
  }

  let err
  if (existing?.id) {
    const { error } = await sb
      .from('marketplace_shipping_profiles')
      .update(payload)
      .eq('id', existing.id)
    err = error
  } else {
    const { error } = await sb
      .from('marketplace_shipping_profiles')
      .insert(payload)
    err = error
  }

  if (err) return { error: err.message }
  revalidatePath(`/merchant/${brandId}/shipping`)
  return {}
}
