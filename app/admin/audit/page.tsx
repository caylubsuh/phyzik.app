import { notFound } from 'next/navigation'
import { ScrollText } from 'lucide-react'
import AdminShell from '@/components/admin/AdminShell'
import { listAuditLog, getAdminUser } from '@/lib/marketplace/admin'

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default async function AdminAuditPage() {
  const { isAdmin } = await getAdminUser()
  if (!isAdmin) notFound()

  const rows = await listAuditLog()

  return (
    <AdminShell
      eyebrow="Platform"
      title="Audit log"
      subtitle={`Last ${rows.length} admin actions, newest first.`}
    >
      {rows.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-[3px] border border-border bg-bg-surface px-6 py-16 text-center">
          <ScrollText className="h-6 w-6 text-text-tertiary" />
          <p className="text-[14.5px] font-semibold text-text-primary">No audit entries yet</p>
          <p className="max-w-[360px] text-[13px] text-text-secondary">
            Admin actions (approvals, refunds, brand edits) are recorded here.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-[3px] border border-border bg-bg-surface">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-border">
                  {['Action', 'Target table', 'Target ID', 'Actor', 'When'].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-[10.5px] font-bold uppercase tracking-[0.16em] text-text-tertiary"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b border-border/50 last:border-b-0 hover:bg-white/[0.02]"
                  >
                    <td className="px-4 py-3 font-mono text-[12.5px] text-accent-bright">
                      {r.action}
                    </td>
                    <td className="px-4 py-3 text-[12.5px] text-text-secondary">
                      {r.target_table ?? '—'}
                    </td>
                    <td className="px-4 py-3 font-mono text-[11.5px] text-text-tertiary tabular-nums">
                      {r.target_id ? r.target_id.slice(0, 8).toUpperCase() : '—'}
                    </td>
                    <td className="px-4 py-3 font-mono text-[11.5px] text-text-tertiary tabular-nums">
                      {r.actor_user_id ? r.actor_user_id.slice(0, 8) : '—'}
                      {r.actor_is_admin && (
                        <span className="ml-1.5 rounded-[2px] bg-accent/[0.12] px-1 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.12em] text-accent-bright">
                          admin
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-[12.5px] text-text-secondary tabular-nums">
                      {fmtDate(r.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminShell>
  )
}
