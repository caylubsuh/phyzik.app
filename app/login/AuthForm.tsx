'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

type Props = {
  mode: 'login' | 'signup'
  next?: string
  plan?: string
  error?: string
}

const PROVIDERS: { id: 'google' | 'apple'; label: string }[] = [
  { id: 'apple', label: 'Continue with Apple' },
  { id: 'google', label: 'Continue with Google' },
]

export default function AuthForm({ mode, next, plan, error: initialError }: Props) {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(initialError ?? null)
  const [notice, setNotice] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  const followUp = plan ? `/api/checkout?plan=${plan}` : next || '/account'

  function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setNotice(null)

    startTransition(async () => {
      try {
        if (mode === 'login') {
          const { error } = await supabase.auth.signInWithPassword({ email, password })
          if (error) {
            setError(error.message)
            return
          }
          router.push(followUp)
          router.refresh()
        } else {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo:
                typeof window !== 'undefined'
                  ? `${window.location.origin}/auth/callback?next=${encodeURIComponent(followUp)}`
                  : undefined,
            },
          })
          if (error) {
            setError(error.message)
            return
          }
          // If email confirmation is OFF in Supabase, session is created immediately.
          if (data.session) {
            router.push(followUp)
            router.refresh()
          } else {
            setNotice(
              'Check your email for a confirmation link. Open it on this device and you will be signed in.',
            )
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong.')
      }
    })
  }

  function handleOAuth(provider: 'google' | 'apple') {
    setError(null)
    setNotice(null)
    startTransition(async () => {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo:
            typeof window !== 'undefined'
              ? `${window.location.origin}/auth/callback?next=${encodeURIComponent(followUp)}`
              : undefined,
        },
      })
      if (error) setError(error.message)
    })
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2.5">
        {PROVIDERS.map((p) => (
          <button
            key={p.id}
            type="button"
            disabled={pending}
            onClick={() => handleOAuth(p.id)}
            className={cn(
              'inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-border-mid text-[14px] font-semibold text-text-primary transition-colors',
              'hover:bg-white/5 hover:border-border-strong',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
              'disabled:cursor-not-allowed disabled:opacity-60',
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-text-tertiary">
        <span className="h-px flex-1 bg-border" aria-hidden="true" />
        <span>or with email</span>
        <span className="h-px flex-1 bg-border" aria-hidden="true" />
      </div>

      <form onSubmit={handleEmailSubmit} className="flex flex-col gap-3">
        <label className="flex flex-col gap-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-tertiary">
            Email
          </span>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={pending}
            className="h-12 rounded-xl border border-border bg-bg-high px-4 text-[15px] text-text-primary placeholder:text-text-tertiary focus-visible:border-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            placeholder="you@example.com"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-tertiary">
            Password
          </span>
          <input
            type="password"
            required
            minLength={8}
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={pending}
            className="h-12 rounded-xl border border-border bg-bg-high px-4 text-[15px] text-text-primary placeholder:text-text-tertiary focus-visible:border-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            placeholder={mode === 'signup' ? '8+ characters' : 'Your password'}
          />
        </label>

        {error && (
          <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-[13px] text-red-300">
            {error}
          </p>
        )}
        {notice && (
          <p className="rounded-lg border border-accent/30 bg-accent/10 px-4 py-3 text-[13px] text-text-primary">
            {notice}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className={cn(
            'mt-2 inline-flex h-12 w-full items-center justify-center rounded-full bg-accent text-[15px] font-semibold text-bg transition-colors',
            'hover:bg-accent-dark',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
            'disabled:cursor-not-allowed disabled:opacity-60',
          )}
        >
          {pending ? 'Working…' : mode === 'login' ? 'Log in' : 'Create account'}
        </button>
      </form>
    </div>
  )
}
