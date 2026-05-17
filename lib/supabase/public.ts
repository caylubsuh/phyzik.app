/**
 * Public-data Supabase client. Uses the anon key — never bypasses RLS.
 *
 * Use for server-rendered pages that read PUBLIC data (e.g. exercise library)
 * and don't need the visitor's cookie session. Cookies are stubbed out so the
 * client can run inside generateStaticParams() and ISR functions where there's
 * no request context.
 */
import 'server-only'
import { createServerClient } from '@supabase/ssr'

export function createPublicClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return []
        },
        setAll() {
          /* no-op — public client never writes cookies */
        },
      },
    },
  )
}
