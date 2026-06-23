import { TrendingUp, Receipt, Wallet, BadgeDollarSign, ShoppingBag, Truck } from 'lucide-react'
import StatCard from './StatCard'
import { formatCents } from '@/lib/marketplace/format'
import type { MerchantEarnings } from '@/lib/marketplace/types'

/**
 * The six headline earnings tiles, shared by the dashboard overview and the
 * earnings detail page so the numbers never drift between views.
 */
const ICON = 'h-4 w-4'

export default function EarningsStats({
  earnings,
  currency = 'USD',
}: {
  earnings: MerchantEarnings
  currency?: string
}) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
      <StatCard
        label="GMV"
        value={formatCents(earnings.gmvCents, currency)}
        hint="Gross merchandise value (paid)"
        icon={<TrendingUp className={ICON} />}
      />
      <StatCard
        label="PHYZIK commission"
        value={formatCents(earnings.commissionCents, currency)}
        hint="Platform fee on paid orders"
        icon={<BadgeDollarSign className={ICON} />}
      />
      <StatCard
        label="Your net"
        value={formatCents(earnings.netCents, currency)}
        hint="After commission & processing"
        icon={<Wallet className={ICON} />}
        emphasis
      />
      <StatCard
        label="Payouts paid"
        value={formatCents(earnings.payoutPaidCents, currency)}
        hint="Settled to your bank"
        icon={<Receipt className={ICON} />}
      />
      <StatCard
        label="Paid orders"
        value={String(earnings.paidOrderCount)}
        hint="Lifetime paid orders"
        icon={<ShoppingBag className={ICON} />}
      />
      <StatCard
        label="Pending fulfillment"
        value={String(earnings.pendingFulfillment)}
        hint="Awaiting shipment"
        icon={<Truck className={ICON} />}
      />
    </div>
  )
}
