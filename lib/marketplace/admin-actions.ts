'use server'

/**
 * Admin mutations (Next server actions). Every action re-checks the is_admin
 * gate, mutates via the service-role client, writes a best-effort audit row,
 * and revalidates the affected admin route. Refunds are delegated to the
 * gated `marketplace-refund` edge function (money never moves from here).
 */
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getAdminUser } from './admin'
import type { ActionResult } from './admin-types'

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
}

async function audit(
  actorId: string,
  action: string,
  table: string,
  targetId: string,
  after: Record<string, unknown>,
): Promise<void> {
  try {
    const sb = createAdminClient()
    await sb.from('marketplace_audit_log').insert({
      actor_user_id: actorId,
      action,
      target_table: table,
      target_id: targetId,
      after,
    })
  } catch {
    /* audit is best-effort; never block the operator action */
  }
}

export async function approveApplication(id: string): Promise<ActionResult> {
  const { user, isAdmin } = await getAdminUser()
  if (!user || !isAdmin) return { ok: false, error: 'Not authorized.' }
  const sb = createAdminClient()

  const { data: app, error: readErr } = await sb
    .from('marketplace_applications')
    .select('*')
    .eq('id', id)
    .maybeSingle()
  if (readErr || !app) return { ok: false, error: 'Application not found.' }
  const a = app as Record<string, unknown>

  const { error: updErr } = await sb
    .from('marketplace_applications')
    .update({ status: 'approved' })
    .eq('id', id)
  if (updErr) return { ok: false, error: updErr.message }

  // Best-effort: create a brand if one doesn't already exist for this applicant.
  let message = 'Application approved.'
  const ownerId = (a.user_id as string | null) ?? null
  const brandName = (a.brand_name as string | null) ?? null
  if (brandName) {
    const slug = slugify(brandName)
    const { data: existing } = await sb
      .from('marketplace_brands')
      .select('id')
      .or(`slug.eq.${slug}${ownerId ? `,owner_user_id.eq.${ownerId}` : ''}`)
      .limit(1)
    if (!existing || existing.length === 0) {
      const category = (a.category as string | null) ?? null
      const { error: insErr } = await sb.from('marketplace_brands').insert({
        name: brandName,
        slug,
        categories: category ? [category] : [],
        status: 'approved',
        is_active: true,
        owner_user_id: ownerId,
      })
      if (insErr) {
        message =
          'Application approved. Could not auto-create the brand — create it manually in Brands.'
      } else {
        message = ownerId
          ? 'Application approved and brand created.'
          : 'Application approved and brand created. Link the owner on their first login.'
      }
    } else {
      message = 'Application approved. A brand already exists for this seller.'
    }
  }

  await audit(user.id, 'application.approve', 'marketplace_applications', id, { status: 'approved' })
  revalidatePath('/admin/applications')
  revalidatePath('/admin/brands')
  revalidatePath('/admin')
  return { ok: true, message }
}

export async function rejectApplication(id: string): Promise<ActionResult> {
  const { user, isAdmin } = await getAdminUser()
  if (!user || !isAdmin) return { ok: false, error: 'Not authorized.' }
  const sb = createAdminClient()
  const { error } = await sb
    .from('marketplace_applications')
    .update({ status: 'rejected' })
    .eq('id', id)
  if (error) return { ok: false, error: error.message }
  await audit(user.id, 'application.reject', 'marketplace_applications', id, { status: 'rejected' })
  revalidatePath('/admin/applications')
  revalidatePath('/admin')
  return { ok: true, message: 'Application rejected.' }
}

interface BrandPatch {
  status?: string
  commission_bps?: number
  is_active?: boolean
  featured?: boolean
  verified?: boolean
}

export async function updateBrand(id: string, patch: BrandPatch): Promise<ActionResult> {
  const { user, isAdmin } = await getAdminUser()
  if (!user || !isAdmin) return { ok: false, error: 'Not authorized.' }
  const clean: Record<string, unknown> = {}
  if (typeof patch.status === 'string') clean.status = patch.status
  if (typeof patch.commission_bps === 'number' && Number.isFinite(patch.commission_bps)) {
    clean.commission_bps = Math.max(0, Math.min(10000, Math.round(patch.commission_bps)))
  }
  if (typeof patch.is_active === 'boolean') clean.is_active = patch.is_active
  if (typeof patch.featured === 'boolean') clean.featured = patch.featured
  if (typeof patch.verified === 'boolean') clean.verified = patch.verified
  if (Object.keys(clean).length === 0) return { ok: false, error: 'Nothing to update.' }

  const sb = createAdminClient()
  const { error } = await sb.from('marketplace_brands').update(clean).eq('id', id)
  if (error) return { ok: false, error: error.message }
  await audit(user.id, 'brand.update', 'marketplace_brands', id, clean)
  revalidatePath(`/admin/brands/${id}`)
  revalidatePath('/admin/brands')
  return { ok: true, message: 'Brand updated.' }
}

export async function moderateProduct(
  id: string,
  decision: 'publish' | 'reject',
): Promise<ActionResult> {
  const { user, isAdmin } = await getAdminUser()
  if (!user || !isAdmin) return { ok: false, error: 'Not authorized.' }
  const status = decision === 'publish' ? 'published' : 'draft'
  const sb = createAdminClient()
  const { error } = await sb.from('marketplace_products').update({ status }).eq('id', id)
  if (error) return { ok: false, error: error.message }
  await audit(user.id, `product.${decision}`, 'marketplace_products', id, { status })
  revalidatePath('/admin/products')
  revalidatePath('/admin')
  return {
    ok: true,
    message: decision === 'publish' ? 'Product published.' : 'Product sent back to draft.',
  }
}

export async function updateReturn(
  id: string,
  status: 'approved' | 'denied',
  note: string,
): Promise<ActionResult> {
  const { user, isAdmin } = await getAdminUser()
  if (!user || !isAdmin) return { ok: false, error: 'Not authorized.' }
  const sb = createAdminClient()
  const { error } = await sb
    .from('marketplace_return_requests')
    .update({ status, resolution_note: note || null, updated_at: new Date().toISOString() })
    .eq('id', id)
  if (error) return { ok: false, error: error.message }
  await audit(user.id, `return.${status}`, 'marketplace_return_requests', id, { status })
  revalidatePath('/admin/returns')
  revalidatePath('/admin')
  return { ok: true, message: status === 'approved' ? 'Return approved.' : 'Return denied.' }
}

export async function refundOrder(orderId: string): Promise<ActionResult> {
  const { user, isAdmin } = await getAdminUser()
  if (!user || !isAdmin) return { ok: false, error: 'Not authorized.' }
  // Use the cookie-session client so the user's JWT authorizes the edge function.
  const sb = await createClient()
  const { data, error } = await sb.functions.invoke('marketplace-refund', {
    body: { orderId },
  })
  if (error) return { ok: false, error: error.message }
  const payload = (data ?? {}) as { error?: string }
  if (payload.error) return { ok: false, error: payload.error }
  await audit(user.id, 'order.refund', 'marketplace_orders', orderId, { refunded: true })
  revalidatePath(`/admin/orders/${orderId}`)
  revalidatePath('/admin/orders')
  return { ok: true, message: 'Refund issued.' }
}
