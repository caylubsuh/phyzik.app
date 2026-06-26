'use server'

import { createClient } from '@/lib/supabase/server'

interface SubmitResult {
  error?: string
}

export async function submitReview(
  productId: string,
  rating: number,
  body: string,
): Promise<SubmitResult | null> {
  if (!productId || rating < 1 || rating > 5) {
    return { error: 'Invalid review data.' }
  }

  const sb = await createClient()

  const {
    data: { user },
  } = await sb.auth.getUser()

  if (!user) {
    return { error: 'You must be signed in to leave a review.' }
  }

  const { error } = await sb.from('marketplace_product_reviews').insert({
    product_id: productId,
    buyer_id: user.id,
    rating,
    body: body.length > 0 ? body : null,
  })

  if (error) {
    // RLS will block non-verified-purchase inserts with a policy violation
    const isRlsBlock =
      error.code === '42501' ||
      error.message?.toLowerCase().includes('policy') ||
      error.message?.toLowerCase().includes('permission')

    if (isRlsBlock) {
      return {
        error:
          'Only verified buyers who purchased this item can review it.',
      }
    }

    return { error: 'Failed to submit review. Please try again.' }
  }

  return null
}
