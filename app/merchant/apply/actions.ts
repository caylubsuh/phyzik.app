'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

/**
 * Submit a brand application. Inserts into marketplace_applications scoped to
 * the signed-in user (RLS: applicant may insert their own row). Admins review
 * it in /admin/applications; approval creates the brand.
 */
export async function submitApplication(input: {
  brandName: string
  contactName: string
  contactEmail: string
  website: string
  category: string
  message: string
}): Promise<{ ok: boolean; error?: string; message?: string }> {
  const sb = await createClient()
  const {
    data: { user },
  } = await sb.auth.getUser()
  if (!user) return { ok: false, error: 'Please sign in to apply.' }

  const brandName = input.brandName.trim()
  const contactName = input.contactName.trim()
  const contactEmail = input.contactEmail.trim()
  if (!brandName || !contactName || !contactEmail) {
    return { ok: false, error: 'Brand name, contact name, and email are required.' }
  }
  const valid = ['supplements', 'apparel', 'equipment', 'food']
  const category = valid.includes(input.category) ? input.category : null

  const { error } = await sb.from('marketplace_applications').insert({
    user_id: user.id,
    brand_name: brandName,
    contact_name: contactName,
    contact_email: contactEmail,
    website: input.website.trim() || null,
    category,
    message: input.message.trim() || null,
    status: 'pending',
  })
  if (error) return { ok: false, error: error.message }

  revalidatePath('/merchant/apply')
  revalidatePath('/merchant')
  return { ok: true, message: 'Application submitted.' }
}
