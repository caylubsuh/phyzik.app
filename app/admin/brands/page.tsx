import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import AdminShell from '@/components/admin/AdminShell'
import StatusChip from '@/components/merchant/StatusChip'
import { listBrands, getAdminUser } from '@/lib/marketplace/admin'
import type { BrandStatus } from '@/lib/marketplace/types'

function Flag({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span className={'text-[12px] ' + (ok ? 'text-[#9FC4AC]' : 'text-text-tertiary')}>
      {ok ? '●' : '○'} {label}
    </span>
  )
}

export default async function AdminBrandsPage() {
  const { isAdmin } = await getAdminUser()
  if (!isAdmin) notFound()

  const brands = await listBrands()

  return (
    <AdminShell
      eyebrow="Catalog"
      title="Brands"
      subtitle={`${brands.length} brand${brands.length === 1 ? '' : 's'}. Click a brand to edit status, commission, and flags.`}
    >
      <div className="overflow-hidden rounded-[3px] border border-border bg-bg-surface">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-border">
                {['Brand', 'Status', 'Stripe', 'Commission', 'Flags', ''].map((h, i) => (
                  <th
                    key={h || i}
                    className="px-4 py-3 text-[10.5px] font-bold uppercase tracking-[0.16em] text-text-tertiary"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {brands.map((b) => (
                <tr
                  key={b.id}
                  className="border-b border-border/50 last:border-b-0 hover:bg-white/[0.02]"
                >
                  <td className="px-4 py-3.5">
                    <Link href={`/admin/brands/${b.id}`} className="flex items-center gap-3">
                      {b.logo_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={b.logo_url}
                          alt=""
                          className="h-8 w-8 rounded-[3px] border border-border object-cover"
                        />
                      ) : (
                        <span className="flex h-8 w-8 items-center justify-center rounded-[3px] border border-border bg-bg-high text-[12px] font-bold text-text-secondary">
                          {b.name.slice(0, 1).toUpperCase()}
                        </span>
                      )}
                      <span className="font-medium text-text-primary">{b.name}</span>
                    </Link>
                  </td>
                  <td className="px-4 py-3.5">
                    <StatusChip kind="brand" status={b.status as BrandStatus} />
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex flex-col gap-0.5">
                      <Flag ok={b.charges_enabled} label="Charges" />
                      <Flag ok={b.payouts_enabled} label="Payouts" />
                    </div>
                  </td>
                  <td className="px-4 py-3.5 font-mono text-[13px] text-text-secondary tabular-nums">
                    {((b.commission_bps ?? 0) / 100).toFixed(1)}%
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex flex-col gap-0.5">
                      <Flag ok={b.is_active} label="Active" />
                      <span className="text-[12px] text-text-tertiary">
                        {b.featured ? 'Featured · ' : ''}
                        {b.verified ? 'Verified' : ''}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <Link
                      href={`/admin/brands/${b.id}`}
                      className="inline-flex text-text-tertiary hover:text-accent-bright"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  )
}
