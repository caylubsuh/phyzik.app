/**
 * Service-role Supabase client. Bypasses Row-Level Security.
 *
 * ⚠️  SERVER ONLY. Never import this from a 'use client' file.
 *    Only the Stripe webhook handler and other trusted server code
 *    should use this — it can read/write any row in the database.
 */
import 'server-only'
import { createClient as createSupabaseClient, type SupabaseClient } from '@supabase/supabase-js'

let _admin: SupabaseClient | null = null

export function createAdminClient(): SupabaseClient {
  if (_admin) return _admin

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url) throw new Error('Missing env: NEXT_PUBLIC_SUPABASE_URL')
  if (!serviceKey) throw new Error('Missing env: SUPABASE_SERVICE_ROLE_KEY')

  _admin = createSupabaseClient(url, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })

  return _admin
}
