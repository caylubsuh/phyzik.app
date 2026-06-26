'use client'

/**
 * ConnectButton — triggers Stripe Connect onboarding for a brand. Calls the
 * marketplace-connect-onboarding edge function and redirects to the hosted
 * Stripe Account Link URL (`onboardingUrl`). Shown when charges_enabled or
 * payouts_enabled is false.
 */
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/Button'
import { ExternalLink, Loader2 } from 'lucide-react'

type ConnectButtonProps = {
  brandId: string
}

export default function ConnectButton({ brandId }: ConnectButtonProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleClick() {
    setLoading(true)
    setError(null)
    try {
      const supabase = createClient()
      const { data, error: fnErr } = await supabase.functions.invoke(
        'marketplace-connect-onboarding',
        { body: { brandId } },
      )
      if (fnErr) {
        setError(fnErr.message ?? 'Failed to start onboarding. Please try again.')
        return
      }
      const url = (data as { onboardingUrl?: string } | null)?.onboardingUrl
      if (!url) {
        setError('No onboarding URL returned. Please try again.')
        return
      }
      window.location.href = url
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Button variant="gold" size="sm" onClick={handleClick} disabled={loading}>
        {loading ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <ExternalLink className="h-3.5 w-3.5" />
        )}
        {loading ? 'Loading…' : 'Complete Stripe onboarding'}
      </Button>
      {error && (
        <p className="text-[12px] text-red-400">{error}</p>
      )}
    </div>
  )
}
