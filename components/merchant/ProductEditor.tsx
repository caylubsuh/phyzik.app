'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Save, Send, Upload, ImageIcon } from 'lucide-react'
import Button from '@/components/ui/Button'
import ActionFeedback from '@/components/admin/ActionFeedback'
import VariantRows from './VariantRows'
import { createClient } from '@/lib/supabase/client'
import { CATEGORIES, CATEGORY_LABEL } from '@/lib/marketplace/format'
import { saveProduct } from '@/app/merchant/[brandId]/products/actions'
import type {
  ProductPayload,
  SaveResult,
  VariantInput,
} from '@/app/merchant/[brandId]/products/types'
import type { EditProduct } from '@/lib/marketplace/merchant-products'
import type { MarketplaceCategory } from '@/lib/marketplace/types'

/**
 * Create / edit form for a merchant product. Mirrors BrandEditForm: a
 * 'use client' form driving a server action via useTransition with inline
 * feedback. Published listings require PHYZIK review — the DB trigger forces
 * status='review' on any merchant write, so the actions are "Save draft" and
 * "Submit for review".
 */
type ProductEditorProps = {
  brandId: string
  /** Brand's default category — pre-fills a NEW product. */
  brandPrimaryCategory: MarketplaceCategory | null
  /** Present in edit mode. */
  initial?: EditProduct
}

const inputCls =
  'w-full rounded-[3px] border border-border bg-bg-high px-3.5 py-2.5 text-[14.5px] text-text-primary focus:border-accent/50 focus:outline-none'
const labelCls =
  'text-[10.5px] font-bold uppercase tracking-[0.18em] text-text-tertiary'

function blankVariant(): VariantInput {
  return {
    value: null,
    priceCents: 0,
    sku: null,
    qtyAvailable: 0,
    trackInventory: true,
    isActive: true,
  }
}

/** Derive the editor's initial variant rows from a loaded product. */
function variantsFromInitial(initial: EditProduct, hasOptions: boolean): VariantInput[] {
  const active = initial.variants.filter((v) => v.is_active)
  const pool = active.length > 0 ? active : initial.variants
  if (pool.length === 0) return [blankVariant()]
  return pool.map((v) => ({
    id: v.id,
    value: hasOptions ? v.option1_value : null,
    priceCents: v.price_cents,
    sku: v.sku,
    qtyAvailable: v.qtyAvailable,
    trackInventory: v.trackInventory,
    isActive: v.is_active,
  }))
}

export default function ProductEditor({
  brandId,
  brandPrimaryCategory,
  initial,
}: ProductEditorProps) {
  const router = useRouter()
  const isEdit = Boolean(initial)

  const initialHasOptions = Boolean(initial && initial.optionName)

  const [name, setName] = useState(initial?.name ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [category, setCategory] = useState<MarketplaceCategory>(
    initial?.category ?? brandPrimaryCategory ?? 'supplements',
  )
  const [imageUrl, setImageUrl] = useState<string | null>(initial?.imageUrl ?? null)
  const [hasOptions, setHasOptions] = useState<boolean>(initialHasOptions)
  const [optionName, setOptionName] = useState<string>(initial?.optionName ?? 'Flavor')
  const [variants, setVariants] = useState<VariantInput[]>(
    initial ? variantsFromInitial(initial, initialHasOptions) : [blankVariant()],
  )

  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [pending, start] = useTransition()
  const [result, setResult] = useState<SaveResult | null>(null)

  // Single primary variant (simple product) is editable inline.
  const simple = variants[0] ?? blankVariant()
  const setSimple = (patch: Partial<VariantInput>) =>
    setVariants((prev) => {
      const next = prev.length > 0 ? [...prev] : [blankVariant()]
      next[0] = { ...next[0], ...patch }
      return next
    })

  const toggleOptions = (on: boolean) => {
    setHasOptions(on)
    setVariants((prev) => {
      if (on) {
        // Becoming a variants product: seed the first row with a value.
        const first = prev[0] ?? blankVariant()
        return [{ ...first, value: first.value ?? '' }]
      }
      // Collapsing to simple: keep only the first row, drop its option value.
      const first = prev[0] ?? blankVariant()
      return [{ ...first, value: null }]
    })
  }

  async function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadError(null)
    setUploading(true)
    try {
      const sb = createClient()
      const {
        data: { user },
      } = await sb.auth.getUser()
      if (!user) {
        setUploadError('Sign in again to upload.')
        return
      }
      const ext = (file.name.split('.').pop() || 'jpg').toLowerCase()
      const path = `${user.id}/product_${crypto.randomUUID()}.${ext}`
      const { error: upErr } = await sb.storage
        .from('workout-photos')
        .upload(path, file, { upsert: false, contentType: file.type })
      if (upErr) {
        setUploadError(upErr.message)
        return
      }
      const { data: pub } = sb.storage.from('workout-photos').getPublicUrl(path)
      setImageUrl(pub.publicUrl)
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed.')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const buildPayload = (
    status: 'draft' | 'review',
  ): ProductPayload => {
    return {
      name: name.trim(),
      description: description.trim() || null,
      category,
      imageUrl,
      status,
      hasOptions,
      optionName: hasOptions ? optionName.trim() : null,
      variants: hasOptions ? variants : [{ ...simple, value: null }],
    }
  }

  const submit = (status: 'draft' | 'review') =>
    start(async () => {
      const res = await saveProduct(brandId, initial?.id ?? null, buildPayload(status))
      setResult(res)
      if (res.ok && !isEdit && res.productId) {
        router.push(`/merchant/${brandId}/products/${res.productId}`)
      }
    })

  const busy = pending || uploading

  return (
    <div className="flex flex-col gap-7">
      {/* Details */}
      <section className="flex flex-col gap-5 rounded-[3px] border border-border bg-bg-surface p-5">
        <label className="flex flex-col gap-1.5">
          <span className={labelCls}>Product name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Whey Isolate — 2 lb"
            disabled={busy}
            className={inputCls}
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={labelCls}>Description</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="What makes this product worth buying?"
            disabled={busy}
            className={inputCls + ' resize-y leading-relaxed'}
          />
        </label>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className={labelCls}>Category</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as MarketplaceCategory)}
              disabled={busy}
              className={inputCls}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {CATEGORY_LABEL[c]}
                </option>
              ))}
            </select>
          </label>

        </div>
      </section>

      {/* Primary image */}
      <section className="flex flex-col gap-3 rounded-[3px] border border-border bg-bg-surface p-5">
        <span className={labelCls}>Primary image</span>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-[3px] border border-border bg-bg-high">
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imageUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              <ImageIcon className="h-6 w-6 text-text-tertiary" />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="inline-flex cursor-pointer items-center gap-2 self-start rounded-[3px] border border-border bg-bg-high px-3.5 py-2.5 text-[13px] font-semibold text-text-secondary transition-colors hover:border-accent/35 hover:text-text-primary">
              {uploading ? (
                <Loader2 className="h-4 w-4 animate-spin text-accent/70" />
              ) : (
                <Upload className="h-4 w-4 text-accent/70" />
              )}
              {imageUrl ? 'Replace image' : 'Upload image'}
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                disabled={busy}
                className="hidden"
              />
            </label>
            {imageUrl && (
              <button
                type="button"
                onClick={() => setImageUrl(null)}
                disabled={busy}
                className="self-start text-[12px] text-text-tertiary transition-colors hover:text-red-300 disabled:opacity-50"
              >
                Remove image
              </button>
            )}
            {uploadError && <ActionFeedback ok={false}>{uploadError}</ActionFeedback>}
          </div>
        </div>
      </section>

      {/* Pricing & options */}
      <section className="flex flex-col gap-5 rounded-[3px] border border-border bg-bg-surface p-5">
        <button
          type="button"
          role="switch"
          aria-checked={hasOptions}
          onClick={() => toggleOptions(!hasOptions)}
          disabled={busy}
          className="flex items-center justify-between gap-4 rounded-[3px] border border-border bg-bg-high px-4 py-3 text-left transition-colors hover:border-accent/30 disabled:opacity-50"
        >
          <span className="flex flex-col gap-0.5">
            <span className="text-[13.5px] font-medium text-text-primary">
              This product has options (sizes / flavors)
            </span>
            <span className="text-[12px] text-text-tertiary">
              Turn on to sell multiple variants with their own price &amp; stock.
            </span>
          </span>
          <span
            className={
              'relative h-5 w-9 shrink-0 rounded-[3px] border transition-colors ' +
              (hasOptions ? 'border-accent/50 bg-accent/30' : 'border-border bg-bg-top')
            }
          >
            <span
              className={
                'absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-[2px] transition-all ' +
                (hasOptions ? 'left-[18px] bg-accent-bright' : 'left-[2px] bg-text-tertiary')
              }
            />
          </span>
        </button>

        {hasOptions ? (
          <VariantRows
            optionName={optionName}
            onOptionNameChange={setOptionName}
            rows={variants}
            onChange={setVariants}
            disabled={busy}
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <label className="flex flex-col gap-1.5">
              <span className={labelCls}>Price (USD)</span>
              <input
                type="number"
                step="0.01"
                min="0"
                value={simple.priceCents === 0 ? '' : (simple.priceCents / 100).toString()}
                onChange={(e) =>
                  setSimple({
                    priceCents: Math.round((parseFloat(e.target.value) || 0) * 100),
                  })
                }
                placeholder="0.00"
                disabled={busy}
                className={inputCls + ' tabular-nums'}
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className={labelCls}>Inventory qty</span>
              <input
                type="number"
                step="1"
                min="0"
                value={simple.qtyAvailable.toString()}
                onChange={(e) =>
                  setSimple({ qtyAvailable: Math.max(0, parseInt(e.target.value, 10) || 0) })
                }
                disabled={busy}
                className={inputCls + ' tabular-nums'}
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className={labelCls}>SKU (optional)</span>
              <input
                type="text"
                value={simple.sku ?? ''}
                onChange={(e) => setSimple({ sku: e.target.value || null })}
                disabled={busy}
                className={inputCls}
              />
            </label>
          </div>
        )}
      </section>

      {/* Actions */}
      <div className="flex flex-col gap-3 border-t border-border/70 pt-5">
        <p className="text-[12.5px] text-text-tertiary">
          Published listings require PHYZIK review. Submitting moves this product to
          <span className="text-text-secondary"> In review</span> — our team approves it before it
          goes live on the Shop.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="gold" size="md" disabled={busy} onClick={() => submit('review')}>
            {pending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            Submit for review
          </Button>
          <Button variant="secondary" size="md" disabled={busy} onClick={() => submit('draft')}>
            <Save className="h-4 w-4" />
            Save draft
          </Button>
          {result && (
            <ActionFeedback ok={result.ok}>
              {result.ok ? result.message ?? 'Saved.' : result.error}
            </ActionFeedback>
          )}
        </div>
      </div>
    </div>
  )
}
