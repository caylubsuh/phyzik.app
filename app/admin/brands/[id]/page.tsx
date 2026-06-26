import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import AdminShell from '@/components/admin/AdminShell'
import BrandEditForm from '@/components/admin/BrandEditForm'
import { getAdminBrand } from '@/lib/marketplace/admin'

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border/50 py-2.5 last:border-b-0">
      <span className="text-[12.5px] text-text-tertiary">{label}</span>
      <span className="text-[13.5px] text-text-primary text-right">{value || <span className="text-text-tertiary">—</span>}</span>
    </div>
  )
}

export default async function AdminBrandDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const brand = await getAdminBrand(id)
  if (!brand) notFound()

  return (
    <AdminShell eyebrow="Catalog" title={brand.name} subtitle="Edit status, commission, and visibility flags.">
      <div className="mb-5">
        <Link href="/admin/brands" className="inline-flex items-center gap-2 text-[12.5px] font-semibold text-text-secondary hover:text-text-primary">
          <ArrowLeft className="h-3.5 w-3.5" /> All brands
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr]">
        <BrandEditForm brand={brand} />

        <div className="flex flex-col gap-3 rounded-[3px] border border-border bg-bg-surface p-5">
          <span className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-text-tertiary">
            Stripe Connect (read-only)
          </span>
          <div className="flex flex-col">
            <Row label="Account ID" value={brand.stripe_account_id ? <span className="font-mono text-[12px]">{brand.stripe_account_id}</span> : 'Not connected'} />
            <Row label="Charges enabled" value={brand.charges_enabled ? 'Yes' : 'No'} />
            <Row label="Payouts enabled" value={brand.payouts_enabled ? 'Yes' : 'No'} />
            <Row label="Slug" value={<span className="font-mono text-[12px]">{brand.slug}</span>} />
            <Row label="Owner linked" value={brand.owner_user_id ? 'Yes' : 'No — link on first login'} />
            <Row label="Categories" value={brand.categories?.join(', ')} />
            <Row label="Website" value={brand.website_url} />
          </div>
        </div>
      </div>
    </AdminShell>
  )
}
