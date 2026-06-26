import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  Inbox,
  PackageCheck,
  ShoppingBag,
  Store,
  RotateCcw,
  BadgeCheck,
  ArrowRight,
} from 'lucide-react'
import AdminShell from '@/components/admin/AdminShell'
import StatCard from '@/components/merchant/StatCard'
import { getAdminOverview, getAdminUser } from '@/lib/marketplace/admin'

export default async function AdminOverviewPage() {
  const { isAdmin } = await getAdminUser()
  if (!isAdmin) notFound()

  const o = await getAdminOverview()

  const attention = [
    o.pendingApplications > 0 && {
      href: '/admin/applications',
      label: `${o.pendingApplications} application${o.pendingApplications === 1 ? '' : 's'} awaiting review`,
      icon: Inbox,
    },
    o.productsInReview > 0 && {
      href: '/admin/products',
      label: `${o.productsInReview} product${o.productsInReview === 1 ? '' : 's'} in the moderation queue`,
      icon: PackageCheck,
    },
    o.openReturns > 0 && {
      href: '/admin/returns',
      label: `${o.openReturns} return${o.openReturns === 1 ? '' : 's'} to resolve`,
      icon: RotateCcw,
    },
  ].filter(Boolean) as { href: string; label: string; icon: typeof Inbox }[]

  return (
    <AdminShell
      eyebrow="Overview"
      title="Platform"
      subtitle="Everything that needs a human decision, in one place."
    >
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          <StatCard
            label="Pending applications"
            value={String(o.pendingApplications)}
            hint="Sellers waiting to be approved"
            icon={<Inbox className="h-4 w-4" />}
            emphasis={o.pendingApplications > 0}
          />
          <StatCard
            label="Products in review"
            value={String(o.productsInReview)}
            hint="Awaiting moderation"
            icon={<PackageCheck className="h-4 w-4" />}
            emphasis={o.productsInReview > 0}
          />
          <StatCard
            label="Open returns"
            value={String(o.openReturns)}
            hint="Requested, not yet resolved"
            icon={<RotateCcw className="h-4 w-4" />}
            emphasis={o.openReturns > 0}
          />
          <StatCard
            label="Open orders"
            value={String(o.openOrders)}
            hint="Paid, awaiting fulfillment"
            icon={<ShoppingBag className="h-4 w-4" />}
          />
          <StatCard
            label="Live brands"
            value={String(o.liveBrands)}
            hint="Selling on the Shop"
            icon={<BadgeCheck className="h-4 w-4" />}
          />
          <StatCard
            label="Total brands"
            value={String(o.totalBrands)}
            hint="All statuses"
            icon={<Store className="h-4 w-4" />}
          />
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-text-tertiary">
            Needs attention
          </span>
          {attention.length === 0 ? (
            <div className="rounded-[3px] border border-border bg-bg-surface px-5 py-6 text-[14px] text-text-secondary">
              You&apos;re all caught up. Nothing is waiting on you right now.
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              {attention.map((a) => {
                const Icon = a.icon
                return (
                  <Link
                    key={a.href}
                    href={a.href}
                    className="group flex items-center justify-between gap-3 rounded-[3px] border border-border bg-bg-surface px-4 py-3.5 transition-colors hover:border-accent/35 hover:bg-bg-high"
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-[3px] border border-accent/25 bg-accent/[0.06] text-accent-bright">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-[14px] font-medium text-text-primary">{a.label}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 text-text-tertiary transition-colors group-hover:text-accent-bright" />
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  )
}
