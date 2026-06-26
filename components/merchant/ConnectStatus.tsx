import { Check, X, AlertTriangle, CreditCard } from 'lucide-react'
import StatusChip from './StatusChip'
import ConnectButton from './ConnectButton'
import type { BrandStatus } from '@/lib/marketplace/types'
import { cn } from '@/lib/utils'

/**
 * Stripe Connect readiness panel. Shows account status chip, capability flags
 * (charges / payouts), connected account id, and — when onboarding is
 * incomplete — a ConnectButton that redirects to the Stripe-hosted Account Link.
 */
type ConnectStatusProps = {
  brandId: string
  status: BrandStatus
  chargesEnabled: boolean
  payoutsEnabled: boolean
  stripeAccountId: string | null
}

function CapabilityRow({ label, enabled }: { label: string; enabled: boolean }) {
  return (
    <div className="flex items-center justify-between border-t border-border/60 py-3 first:border-t-0">
      <span className="text-[13.5px] text-text-secondary">{label}</span>
      <span
        className={cn(
          'inline-flex items-center gap-1.5 text-[12.5px] font-semibold',
          enabled ? 'text-[#9FC4AC]' : 'text-text-tertiary',
        )}
      >
        {enabled ? (
          <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
        ) : (
          <X className="h-3.5 w-3.5" strokeWidth={2.5} />
        )}
        {enabled ? 'Enabled' : 'Not yet'}
      </span>
    </div>
  )
}

export default function ConnectStatus({
  brandId,
  status,
  chargesEnabled,
  payoutsEnabled,
  stripeAccountId,
}: ConnectStatusProps) {
  const connected = Boolean(stripeAccountId)
  const needsOnboarding = !chargesEnabled || !payoutsEnabled

  return (
    <div className="flex flex-col gap-4 rounded-[3px] border border-border bg-bg-surface p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-[3px] border border-accent/25 bg-accent/[0.06] text-accent-bright">
            <CreditCard className="h-4 w-4" />
          </span>
          <h2 className="font-display text-[15px] font-bold tracking-tight text-text-primary">
            Stripe Connect
          </h2>
        </div>
        <StatusChip kind="brand" status={status} />
      </div>

      <div className="flex flex-col">
        <CapabilityRow label="Accept payments (charges)" enabled={chargesEnabled} />
        <CapabilityRow label="Receive payouts" enabled={payoutsEnabled} />
        <div className="flex items-center justify-between border-t border-border/60 py-3">
          <span className="text-[13.5px] text-text-secondary">Connected account</span>
          <span className="font-mono text-[12px] text-text-tertiary tabular-nums">
            {connected ? `${stripeAccountId!.slice(0, 11)}…` : 'None'}
          </span>
        </div>
      </div>

      {needsOnboarding && (
        <div className="flex flex-col gap-3 rounded-[3px] border border-accent/30 bg-accent/[0.06] px-3.5 py-3">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-accent-bright" />
            <p className="text-[13px] leading-snug text-text-primary">
              Complete Stripe identity verification to start accepting orders. You
              will be redirected to Stripe and returned here when done.
            </p>
          </div>
          <ConnectButton brandId={brandId} />
        </div>
      )}
    </div>
  )
}
