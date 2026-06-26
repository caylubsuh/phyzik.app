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
      actor_is_admin: true,
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
        primary_category: category,
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
  // Publishing must also make the product visible on the storefront (which
  // requires is_active = true); sending back to draft leaves visibility as-is.
  const patch = decision === 'publish' ? { status, is_active: true } : { status }
  const sb = createAdminClient()
  const { error } = await sb.from('marketplace_products').update(patch).eq('id', id)
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

export async function markReturnRefunded(id: string): Promise<ActionResult> {
  const { user, isAdmin } = await getAdminUser()
  if (!user || !isAdmin) return { ok: false, error: 'Not authorized.' }
  const sb = createAdminClient()
  const { error } = await sb
    .from('marketplace_return_requests')
    .update({ status: 'refunded', updated_at: new Date().toISOString() })
    .eq('id', id)
  if (error) return { ok: false, error: error.message }
  await audit(user.id, 'return.refunded', 'marketplace_return_requests', id, { status: 'refunded' })
  revalidatePath('/admin/returns')
  revalidatePath('/admin')
  return { ok: true, message: 'Return marked refunded.' }
}

/**
 * Trigger a refund through the marketplace-refund edge function.
 * Pass amountCents for a partial refund; omit for a full refund.
 */
export async function refundOrder(orderId: string, amountCents?: number): Promise<ActionResult> {
  const { user, isAdmin } = await getAdminUser()
  if (!user || !isAdmin) return { ok: false, error: 'Not authorized.' }
  // Use the cookie-session client so the user's JWT authorizes the edge function.
  const sb = await createClient()
  const body: Record<string, unknown> = { orderId }
  const safeAmount = (amountCents != null && Number.isFinite(amountCents) && amountCents > 0)
    ? Math.round(amountCents)
    : null
  if (safeAmount !== null) body.amountCents = safeAmount

  const { data, error } = await sb.functions.invoke('marketplace-refund', { body })
  if (error) return { ok: false, error: error.message }
  const payload = (data ?? {}) as { error?: string }
  if (payload.error) return { ok: false, error: payload.error }

  const isPartial = safeAmount !== null
  await audit(
    user.id,
    isPartial ? 'order.partial_refund' : 'order.refund',
    'marketplace_orders',
    orderId,
    isPartial ? { partial_refund: true, amount_cents: safeAmount } : { refunded: true },
  )
  revalidatePath(`/admin/orders/${orderId}`)
  revalidatePath('/admin/orders')

  if (isPartial) {
    const dollars = (safeAmount / 100).toFixed(2)
    return { ok: true, message: `Partial refund of $${dollars} issued.` }
  }
  return { ok: true, message: 'Full refund issued.' }
}

export async function setBrandOwner(brandId: string, email: string): Promise<ActionResult> {
  const { user, isAdmin } = await getAdminUser()
  if (!user || !isAdmin) return { ok: false, error: 'Not authorized.' }

  const trimmedEmail = email.trim().toLowerCase()
  if (!trimmedEmail) return { ok: false, error: 'Email is required.' }

  const sb = createAdminClient()

  // Resolve email → user id via the Supabase auth admin API.
  // Paginate through all users to find one matching the email.
  let targetUserId: string | null = null
  let page = 1
  const perPage = 1000
  let exhausted = false

  while (!exhausted && targetUserId === null) {
    const { data, error } = await sb.auth.admin.listUsers({ page, perPage })
    if (error) return { ok: false, error: `Auth lookup failed: ${error.message}` }
    const users = data?.users ?? []
    for (const u of users) {
      if ((u.email ?? '').toLowerCase() === trimmedEmail) {
        targetUserId = u.id
        break
      }
    }
    if (users.length < perPage) exhausted = true
    page++
  }

  if (!targetUserId) {
    return {
      ok: false,
      error: `No account found for ${trimmedEmail}. The user must sign up before being linked.`,
    }
  }

  const { error: updateErr } = await sb
    .from('marketplace_brands')
    .update({ owner_user_id: targetUserId })
    .eq('id', brandId)

  if (updateErr) return { ok: false, error: updateErr.message }

  await audit(user.id, 'brand.link_owner', 'marketplace_brands', brandId, {
    owner_user_id: targetUserId,
    linked_email: trimmedEmail,
  })
  revalidatePath(`/admin/brands/${brandId}`)
  return { ok: true, message: `Owner linked: ${trimmedEmail}` }
}

export async function setProductCommission(
  productId: string,
  bps: number | null,
): Promise<ActionResult> {
  const { user, isAdmin } = await getAdminUser()
  if (!user || !isAdmin) return { ok: false, error: 'Not authorized.' }
  const value = bps == null ? null : Math.max(0, Math.min(10000, Math.round(bps)))
  const sb = createAdminClient()
  const { error } = await sb
    .from('marketplace_products')
    .update({ commission_bps: value })
    .eq('id', productId)
  if (error) return { ok: false, error: error.message }
  await audit(user.id, 'product.commission', 'marketplace_products', productId, {
    commission_bps: value,
  })
  revalidatePath('/admin/brands')
  return { ok: true, message: value == null ? 'Reset to brand default.' : 'Commission updated.' }
}
