'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function markShipped(
  brandId: string,
  orderId: string,
  carrier: string,
  tracking: string,
): Promise<{ error?: string }> {
  const sb = await createClient()
  const { error } = await sb.rpc('merchant_mark_shipped', {
    p_order_id: orderId,
    p_carrier: carrier,
    p_tracking: tracking,
  })
  if (error) return { error: error.message }
  revalidatePath(`/merchant/${brandId}/orders/${orderId}`)
  revalidatePath(`/merchant/${brandId}/orders`)
  return {}
}

export async function markDelivered(
  brandId: string,
  orderId: string,
): Promise<{ error?: string }> {
  const sb = await createClient()
  const { error } = await sb.rpc('merchant_mark_delivered', {
    p_order_id: orderId,
  })
  if (error) return { error: error.message }
  revalidatePath(`/merchant/${brandId}/orders/${orderId}`)
  revalidatePath(`/merchant/${brandId}/orders`)
  return {}
}
