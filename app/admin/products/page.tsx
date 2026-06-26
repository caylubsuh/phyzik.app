import { PackageCheck } from 'lucide-react'
import AdminShell from '@/components/admin/AdminShell'
import ProductModerationActions from '@/components/admin/ProductModerationActions'
import { listReviewProducts } from '@/lib/marketplace/admin'
import { formatCents, CATEGORY_LABEL } from '@/lib/marketplace/format'
import type { MarketplaceCategory } from '@/lib/marketplace/types'

export default async function AdminProductsPage() {
  const products = await listReviewProducts()

  return (
    <AdminShell
      eyebrow="Moderation"
      title="Product review"
      subtitle="Listings submitted for review. Publishing makes them live on the Shop; sending back returns them to the seller as a draft."
    >
      {products.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-[3px] border border-border bg-bg-surface px-6 py-16 text-center">
          <PackageCheck className="h-6 w-6 text-[#9FC4AC]" />
          <p className="text-[14.5px] font-semibold text-text-primary">Queue is clear</p>
          <p className="max-w-[360px] text-[13px] text-text-secondary">
            No products are awaiting review. New submissions from merchants show up here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {products.map((p) => (
            <div
              key={p.id}
              className="flex flex-col gap-4 rounded-[3px] border border-border bg-bg-surface p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex min-w-0 items-center gap-4">
                {p.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image_url} alt="" className="h-14 w-14 shrink-0 rounded-[3px] border border-border object-cover" />
                ) : (
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[3px] border border-border bg-bg-high">
                    <PackageCheck className="h-5 w-5 text-text-tertiary" />
                  </span>
                )}
                <div className="flex min-w-0 flex-col gap-1">
                  <span className="truncate font-display text-[16px] font-bold tracking-tight text-text-primary">
                    {p.name}
                  </span>
                  <span className="text-[12.5px] text-text-tertiary">
                    {p.brandName ?? 'Unknown brand'} · {CATEGORY_LABEL[p.category as MarketplaceCategory] ?? p.category} ·{' '}
                    {formatCents(p.price_cents)}
                  </span>
                </div>
              </div>
              <ProductModerationActions id={p.id} />
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  )
}
