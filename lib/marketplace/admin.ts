/**
 * Server-side ADMIN data layer for the PHYZIK Shop platform console.
 *
 * Auth: getAdminUser() checks the cookie-session user's profiles.is_admin.
 * Reads/writes then use the service-role client (server-only, never shipped to
 * the browser) so the console can see every brand/order/application regardless
 * of per-owner RLS — but only AFTER the is_admin gate passes.
 */
import 'server-only'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import type { Order, OrderItem } from './types'

import type { AdminBrand } from './admin-types'

export interface Application {
  id: string
  user_id: string | null
  brand_name: string | null
  contact_name: string | null
  contact_email: string | null
  website: string | null
  category: string | null
  message: string | null
  legal_business_name: string | null
  entity_type: string | null
  tax_id_last4: string | null
  has_product_liability_insurance: boolean | null
  supplement_attestation: boolean | null
  agreement_version: string | null
  agreement_accepted_at: string | null
  status: string
  created_at: string
  [key: string]: unknown
}

export interface ReturnRequest {
  id: string
  order_id: string
  order_item_id: string | null
  buyer_id: string
  brand_id: string
  reason: string
  details: string | null
  status: string
  resolution_note: string | null
  created_at: string
  brandName?: string
}

export interface PayoutRow {
  id: string
  brand_id: string
  amount_cents: number
  status: string | null
  arrival_date: string | null
  created_at: string
  brandName?: string
}

export interface AdminOverview {
  pendingApplications: number
  productsInReview: number
  openOrders: number
  totalBrands: number
  liveBrands: number
  openReturns: number
}

export interface ModerationProduct {
  id: string
  brand_id: string
  name: string
  category: string
  price_cents: number | null
  image_url: string | null
  status: string
  created_at: string | null
  brandName?: string
}

const BRAND_COLS_ADMIN =
  'id,name,slug,logo_url,banner_url,description,categories,website_url,affiliate_url,promo_code,promo_description,featured,verified,sort_order,status,charges_enabled,payouts_enabled,stripe_account_id,commission_bps,owner_user_id,is_active'
const ORDER_COLS_ADMIN =
  'id,buyer_id,brand_id,status,amount_subtotal_cents,shipping_cents,tax_cents,amount_total_cents,currency,tracking_carrier,tracking_number,ship_to,created_at'

/** Returns { user, isAdmin }. user is null when signed out. */
export async function getAdminUser(): Promise<{
  user: { id: string; email?: string } | null
  isAdmin: boolean
}> {
  const sb = await createClient()
  const {
    data: { user },
  } = await sb.auth.getUser()
  if (!user) return { user: null, isAdmin: false }
  const { data } = await sb
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .maybeSingle()
  return {
    user: { id: user.id, email: user.email ?? undefined },
    isAdmin: Boolean((data as { is_admin?: boolean } | null)?.is_admin),
  }
}

/** Map brand ids -> name for label joins (avoids PostgREST embeds). */
async function brandNames(
  sb: ReturnType<typeof createAdminClient>,
  ids: string[],
): Promise<Map<string, string>> {
  const out = new Map<string, string>()
  const unique = Array.from(new Set(ids)).filter(Boolean)
  if (unique.length === 0) return out
  const { data } = await sb.from('marketplace_brands').select('id,name').in('id', unique)
  for (const b of (data ?? []) as { id: string; name: string }[]) out.set(b.id, b.name)
  return out
}

export async function getAdminOverview(): Promise<AdminOverview> {
  const sb = createAdminClient()
  const head = { count: 'exact' as const, head: true }
  const [apps, review, brandsAll, brandsLive, returns, orders] = await Promise.all([
    sb.from('marketplace_applications').select('id', head).eq('status', 'pending'),
    sb.from('marketplace_products').select('id', head).eq('status', 'review'),
    sb.from('marketplace_brands').select('id', head),
    sb.from('marketplace_brands').select('id', head).eq('status', 'live'),
    sb.from('marketplace_return_requests').select('id', head).eq('status', 'requested'),
    sb
      .from('marketplace_orders')
      .select('id', head)
      .in('status', ['paid', 'fulfilled']),
  ])
  return {
    pendingApplications: apps.count ?? 0,
    productsInReview: review.count ?? 0,
    openOrders: orders.count ?? 0,
    totalBrands: brandsAll.count ?? 0,
    liveBrands: brandsLive.count ?? 0,
    openReturns: returns.count ?? 0,
  }
}

export async function listApplications(): Promise<Application[]> {
  const sb = createAdminClient()
  const { data } = await sb
    .from('marketplace_applications')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(300)
  const rows = (data ?? []) as Application[]
  const rank = (s: string) => (s === 'pending' ? 0 : s === 'approved' ? 1 : 2)
  return rows.sort((a, b) => rank(a.status) - rank(b.status))
}

export async function listBrands(): Promise<AdminBrand[]> {
  const sb = createAdminClient()
  const { data } = await sb
    .from('marketplace_brands')
    .select(BRAND_COLS_ADMIN)
    .order('name', { ascending: true })
    .limit(500)
  return (data ?? []) as AdminBrand[]
}

export async function getAdminBrand(id: string): Promise<AdminBrand | null> {
  const sb = createAdminClient()
  const { data } = await sb
    .from('marketplace_brands')
    .select(BRAND_COLS_ADMIN)
    .eq('id', id)
    .maybeSingle()
  return (data as AdminBrand | null) ?? null
}

export async function listReviewProducts(): Promise<ModerationProduct[]> {
  const sb = createAdminClient()
  const { data } = await sb
    .from('marketplace_products')
    .select('id,brand_id,name,category,price_cents,image_url,status,created_at')
    .eq('status', 'review')
    .order('created_at', { ascending: true })
    .limit(300)
  const rows = (data ?? []) as ModerationProduct[]
  const names = await brandNames(sb, rows.map((r) => r.brand_id))
  return rows.map((r) => ({ ...r, brandName: names.get(r.brand_id) }))
}

export async function listOrders(opts?: { status?: string }): Promise<Order[]> {
  const sb = createAdminClient()
  let q = sb.from('marketplace_orders').select(ORDER_COLS_ADMIN).order('created_at', {
    ascending: false,
  })
  if (opts?.status) q = q.eq('status', opts.status)
  const { data } = await q.limit(300)
  const orders = (data ?? []) as Order[]
  const names = await brandNames(sb, orders.map((o) => o.brand_id))
  return orders.map((o) => ({ ...o, brandName: names.get(o.brand_id) }))
}

export async function getAdminOrder(id: string): Promise<Order | null> {
  const sb = createAdminClient()
  const { data } = await sb
    .from('marketplace_orders')
    .select(ORDER_COLS_ADMIN)
    .eq('id', id)
    .maybeSingle()
  if (!data) return null
  const order = data as Order
  const [{ data: items }, names] = await Promise.all([
    sb
      .from('marketplace_order_items')
      .select('id,order_id,variant_id,product_id,name_snapshot,qty,unit_price_cents')
      .eq('order_id', id),
    brandNames(sb, [order.brand_id]),
  ])
  return {
    ...order,
    items: (items ?? []) as OrderItem[],
    brandName: names.get(order.brand_id),
  }
}

export async function listPayouts(): Promise<PayoutRow[]> {
  const sb = createAdminClient()
  const { data } = await sb
    .from('marketplace_brand_payouts')
    .select('id,brand_id,amount_cents,status,arrival_date,created_at')
    .order('created_at', { ascending: false })
    .limit(300)
  const rows = (data ?? []) as PayoutRow[]
  const names = await brandNames(sb, rows.map((r) => r.brand_id))
  return rows.map((r) => ({ ...r, brandName: names.get(r.brand_id) }))
}

export interface BrandGmvRow {
  brandId: string
  brandName: string
  gmvCents: number
  orders: number
}

export async function getBrandGmv(): Promise<BrandGmvRow[]> {
  const sb = createAdminClient()
  const { data } = await sb
    .from('marketplace_orders')
    .select('brand_id,amount_subtotal_cents,status')
    .in('status', ['paid', 'fulfilled', 'shipped', 'delivered', 'partially_refunded'])
    .limit(5000)
  const rows = (data ?? []) as { brand_id: string; amount_subtotal_cents: number }[]
  const agg = new Map<string, { gmv: number; orders: number }>()
  for (const r of rows) {
    const cur = agg.get(r.brand_id) ?? { gmv: 0, orders: 0 }
    cur.gmv += r.amount_subtotal_cents ?? 0
    cur.orders += 1
    agg.set(r.brand_id, cur)
  }
  const names = await brandNames(sb, Array.from(agg.keys()))
  return Array.from(agg.entries())
    .map(([brandId, v]) => ({
      brandId,
      brandName: names.get(brandId) ?? brandId.slice(0, 8),
      gmvCents: v.gmv,
      orders: v.orders,
    }))
    .sort((a, b) => b.gmvCents - a.gmvCents)
}

export async function listReturns(): Promise<ReturnRequest[]> {
  const sb = createAdminClient()
  const { data } = await sb
    .from('marketplace_return_requests')
    .select(
      'id,order_id,order_item_id,buyer_id,brand_id,reason,details,status,resolution_note,created_at',
    )
    .order('created_at', { ascending: false })
    .limit(300)
  const rows = (data ?? []) as ReturnRequest[]
  const names = await brandNames(sb, rows.map((r) => r.brand_id))
  const rank = (s: string) => (s === 'requested' ? 0 : s === 'approved' ? 1 : 2)
  return rows
    .map((r) => ({ ...r, brandName: names.get(r.brand_id) }))
    .sort((a, b) => rank(a.status) - rank(b.status))
}

export interface AdminProductRow {
  id: string
  name: string
  image_url: string | null
  price_cents: number | null
  category: string
  status: string
  commission_bps: number | null
}

/** All of a brand's products (any status) for the admin per-item commission UI. */
export async function getBrandProductsForAdmin(brandId: string): Promise<AdminProductRow[]> {
  const sb = createAdminClient()
  const { data } = await sb
    .from('marketplace_products')
    .select('id,name,image_url,price_cents,category,status,commission_bps')
    .eq('brand_id', brandId)
    .order('name', { ascending: true })
  return (data ?? []) as AdminProductRow[]
}

export interface AuditLogRow {
  id: string
  actor_user_id: string | null
  actor_is_admin: boolean | null
  action: string
  target_table: string | null
  target_id: string | null
  created_at: string
  after: Record<string, unknown> | null
}

export async function listAuditLog(): Promise<AuditLogRow[]> {
  const sb = createAdminClient()
  const { data } = await sb
    .from('marketplace_audit_log')
    .select('id,actor_user_id,actor_is_admin,action,target_table,target_id,created_at,after')
    .order('created_at', { ascending: false })
    .limit(200)
  return (data ?? []) as AuditLogRow[]
}
