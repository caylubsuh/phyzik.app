import { Inbox } from 'lucide-react'
import AdminShell from '@/components/admin/AdminShell'
import ApplicationActions from '@/components/admin/ApplicationActions'
import { listApplications, type Application } from '@/lib/marketplace/admin'

function fmtDate(iso: string | null): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-text-tertiary">{label}</span>
      <span className="text-[13.5px] text-text-primary">{value || <span className="text-text-tertiary">—</span>}</span>
    </div>
  )
}

function YesNo({ v }: { v: boolean | null }) {
  if (v == null) return <span className="text-text-tertiary">—</span>
  return <span className={v ? 'text-[#9FC4AC]' : 'text-red-300'}>{v ? 'Yes' : 'No'}</span>
}

export default async function AdminApplicationsPage() {
  const apps = await listApplications()
  const pending = apps.filter((a) => a.status === 'pending').length

  return (
    <AdminShell
      eyebrow="Sellers"
      title="Applications"
      subtitle={`${pending} pending · ${apps.length} total. Approving creates the brand automatically.`}
    >
      {apps.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-[3px] border border-border bg-bg-surface px-6 py-16 text-center">
          <Inbox className="h-6 w-6 text-text-tertiary" />
          <p className="text-[14.5px] font-semibold text-text-primary">No applications yet</p>
          <p className="max-w-[360px] text-[13px] text-text-secondary">
            Seller applications submitted from <span className="text-text-primary">/for-brands</span> land here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {apps.map((app: Application) => (
            <div
              key={app.id}
              className="flex flex-col gap-4 rounded-[3px] border border-border bg-bg-surface p-5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2.5">
                    <h3 className="font-display text-[18px] font-bold tracking-tight text-text-primary">
                      {app.brand_name ?? 'Unnamed brand'}
                    </h3>
                    <span className="rounded-[3px] border border-border-mid bg-white/[0.03] px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] capitalize text-text-secondary">
                      {app.status}
                    </span>
                  </div>
                  <span className="text-[12.5px] text-text-tertiary">
                    {app.contact_name ?? '—'} · {app.contact_email ?? '—'} · applied {fmtDate(app.created_at)}
                  </span>
                </div>
                <ApplicationActions id={app.id} status={app.status} />
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-3 border-t border-border/60 pt-4 sm:grid-cols-3 lg:grid-cols-4">
                <Field label="Category" value={app.category} />
                <Field label="Website" value={app.website} />
                <Field label="Legal name" value={app.legal_business_name} />
                <Field label="Entity" value={app.entity_type} />
                <Field label="Tax ID (last 4)" value={app.tax_id_last4} />
                <Field label="Liability insurance" value={<YesNo v={app.has_product_liability_insurance} />} />
                <Field label="Supplement attestation" value={<YesNo v={app.supplement_attestation} />} />
                <Field label="Agreement" value={app.agreement_version} />
              </div>

              {app.message && (
                <div className="border-t border-border/60 pt-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-text-tertiary">Message</span>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-text-secondary">{app.message}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  )
}
