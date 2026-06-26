import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import StatusChip from './StatusChip'
import { CATEGORY_LABEL, formatCents, priceRange } from '@/lib/marketplace/format'
import type { Product, ProductStatus } from '@/lib/marketplace/types'

/**
 * Merchant products table. Each row links to the product editor at
 * /merchant/[brandId]/products/[id]. Squared, tabular pricing.
 *
 * getMerchantProducts() returns rows widened with `status`, so we read it via
 * a local row type rather than mutating the shared Product interface.
 */
type ProductRow = Product & { status?: ProductStatus }

export default function ProductTable({
  products,
  brandId,
}: {
  products: Product[]
  brandId: string
}) {
  const rows = products as ProductRow[]

  return (
    <div className="overflow-hidden rounded-[3px] border border-border bg-bg-surface">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-[10.5px] font-bold uppercase tracking-[0.16em] text-text-tertiary">
                Product
              </th>
              <th className="px-4 py-3 text-[10.5px] font-bold uppercase tracking-[0.16em] text-text-tertiary">
                Category
              </th>
              <th className="px-4 py-3 text-right text-[10.5px] font-bold uppercase tracking-[0.16em] text-text-tertiary">
                Price
              </th>
              <th className="px-4 py-3 text-right text-[10.5px] font-bold uppercase tracking-[0.16em] text-text-tertiary">
                Status
              </th>
              <th className="w-10 px-4 py-3" aria-hidden />
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr
                key={p.id}
                className="group border-b border-border/50 transition-colors last:border-b-0 hover:bg-white/[0.02]"
              >
                <td className="px-4 py-3.5">
                  <Link
                    href={`/merchant/${brandId}/products/${p.id}`}
                    className="flex flex-col gap-0.5 rounded-[3px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <span className="text-[14px] font-medium leading-tight text-text-primary transition-colors group-hover:text-accent-bright">
                      {p.name}
                    </span>
                    {p.is_drop && (
                      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-bright">
                        Drop
                      </span>
                    )}
                  </Link>
                </td>
                <td className="px-4 py-3.5 text-[13px] text-text-secondary">
                  {CATEGORY_LABEL[p.category]}
                </td>
                <td className="px-4 py-3.5 text-right font-mono text-[13px] tabular-nums text-text-primary">
                  {p.compare_at_cents && p.price_cents
                    ? priceRange(p.price_cents, p.compare_at_cents, p.currency)
                    : formatCents(p.price_cents, p.currency)}
                </td>
                <td className="px-4 py-3.5 text-right">
                  <StatusChip kind="product" status={p.status ?? 'draft'} />
                </td>
                <td className="px-4 py-3.5 text-right">
                  <Link
                    href={`/merchant/${brandId}/products/${p.id}`}
                    aria-label={`Edit ${p.name}`}
                    className="inline-flex text-text-tertiary transition-colors hover:text-accent-bright"
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
  )
}
