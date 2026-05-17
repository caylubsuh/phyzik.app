/**
 * OAuth + email confirmation callback.
 *
 * Supabase Auth redirects users here with a `code` query param after
 * social sign-in (Apple / Google) or email-confirmation links.
 * We exchange the code for a session, then forward the user to
 * the `next` destination (e.g. /api/checkout?plan=monthly).
 */
import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') || '/account'

  if (!code) {
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent('Missing auth code')}`,
    )
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(error.message)}`,
    )
  }

  // Use relative redirect — same origin only — to avoid open-redirect bugs.
  const safeNext = next.startsWith('/') ? next : '/account'
  return NextResponse.redirect(`${origin}${safeNext}`)
}
