import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import AdminShell from '@/components/admin/AdminShell'
import Button from '@/components/ui/Button'
import BrandEditForm from '@/components/admin/BrandEditForm'
import BrandOwnerLink from '@/components/admin/BrandOwnerLink'
import ProductCommissionRow from '@/components/admin/ProductCommissionRow'
import { getAdminBrand, getBrandProductsForAdmin, getAdminUser } from '@/lib/marketplace/admin'

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border/50 py-2.5 last:border-b-0">
      <span className="text-[12.5px] text-text-tertiary">{label}</span>
      <span className="text-right text-[13.5px] text-text-primary">
        {value || <span className="text-text-tertiary">—</span>}
      </span>
    </div>
  )
}

export default async function AdminBrandDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { isAdmin } = await getAdminUser()
  if (!isAdmin) notFound()

  const { id } = await params
  const brand = await getAdminBrand(id)
  if (!brand) notFound()
  const products = await getBrandProductsForAdmin(id)

  return (
    <AdminShell eyebrow="Catalog" title={brand.name} subtitle="Edit status, commission, and visibility flags.">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/admin/brands"
          className="inline-flex items-center gap-2 text-[12.5px] font-semibold text-text-secondary hover:text-text-primary"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All brands
        </Link>
        <Button variant="secondary" size="sm" asChild>
          <Link href={`/merchant/${brand.id}`}>
            View merchant dashboard
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr]">
        <BrandEditForm brand={brand} />

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3 rounded-[3px] border border-border bg-bg-surface p-5">
            <span className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-text-tertiary">
              Stripe Connect (read-only)
            </span>
            <div className="flex flex-col">
              <Row
                label="Account ID"
                value={
                  brand.stripe_account_id ? (
                    <span className="font-mono text-[12px]">{brand.stripe_account_id}</span>
                  ) : (
                    'Not connected'
                  )
                }
              />
              <Row label="Charges enabled" value={brand.charges_enabled ? 'Yes' : 'No'} />
              <Row label="Payouts enabled" value={brand.payouts_enabled ? 'Yes' : 'No'} />
              <Row label="Slug" value={<span className="font-mono text-[12px]">{brand.slug}</span>} />
              <Row
                label="Owner"
                value={
                  brand.owner_user_id ? (
                    <span className="font-mono text-[12px] text-text-secondary">
                      {brand.owner_user_id.slice(0, 8)}&hellip;
                    </span>
                  ) : (
                    'Not linked'
                  )
                }
              />
              <Row label="Categories" value={brand.categories?.join(', ')} />
              <Row label="Website" value={brand.website_url} />
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-[3px] border border-border bg-bg-surface p-5">
            <span className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-text-tertiary">
              Owner
            </span>
            <p className="text-[13px] text-text-secondary">
              {brand.owner_user_id
                ? 'This brand has an owner linked. Enter a new email below to reassign it.'
                : "No owner is linked. Enter the seller's account email to connect them."}
            </p>
            <BrandOwnerLink brandId={brand.id} currentOwnerId={brand.owner_user_id} />
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-3">
        <span className="text-[10.5px] font-bold uppercase tracking-[0.28em] text-text-tertiary">
          Products &amp; commission
        </span>
        <p className="text-[13px] text-text-secondary">
          Set a per-item commission to override the brand default of{' '}
          {(brand.commission_bps / 100).toFixed(1)}%. Leave blank to inherit it.
        </p>
        {products.length === 0 ? (
          <div className="rounded-[3px] border border-border bg-bg-surface px-5 py-6 text-[13px] text-text-tertiary">
            This brand has no products yet.
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {products.map((p) => (
              <ProductCommissionRow key={p.id} product={p} brandDefaultBps={brand.commission_bps} />
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  )
}
