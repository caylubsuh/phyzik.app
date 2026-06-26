/**
 * Owner-scoped single-order fetch for the merchant web portal.
 * Uses the server client so RLS + the mkt_orders_sel_brand_owner policy
 * scope the row to the authenticated brand owner.
 */
import 'server-only'
import { createClient } from '@/lib/supabase/server'
import type { Order, OrderItem } from './types'

const ORDER_DETAIL_COLS =
  'id,buyer_id,brand_id,status,amount_subtotal_cents,shipping_cents,tax_cents,amount_total_cents,currency,tracking_carrier,tracking_number,ship_to,created_at,updated_at'

export async function getMerchantOrder(
  brandId: string,
  orderId: string,
): Promise<Order | null> {
  const sb = await createClient()

  const { data: order, error } = await sb
    .from('marketplace_orders')
    .select(ORDER_DETAIL_COLS)
    .eq('id', orderId)
    .eq('brand_id', brandId)
    .maybeSingle()

  if (error || !order) return null

  const { data: items } = await sb
    .from('marketplace_order_items')
    .select('id,order_id,variant_id,product_id,name_snapshot,qty,unit_price_cents')
    .eq('order_id', orderId)

  return {
    ...(order as Order),
    items: (items ?? []) as OrderItem[],
  }
}
