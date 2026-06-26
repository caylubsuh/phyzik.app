'use client'

import { Plus, X } from 'lucide-react'
import type { VariantInput } from '@/app/merchant/[brandId]/products/types'

/**
 * Repeatable option-variant editor (single option dimension, v1). Each row is
 * one option value with its own price, inventory qty, SKU, and active toggle.
 * Controlled by ProductEditor — this component holds no state of its own.
 */
type VariantRowsProps = {
  optionName: string
  onOptionNameChange: (v: string) => void
  rows: VariantInput[]
  onChange: (rows: VariantInput[]) => void
  disabled?: boolean
}

const inputCls =
  'w-full rounded-[3px] border border-border bg-bg-high px-3.5 py-2.5 text-[14.5px] text-text-primary focus:border-accent/50 focus:outline-none'
const labelCls =
  'text-[10.5px] font-bold uppercase tracking-[0.18em] text-text-tertiary'

export default function VariantRows({
  optionName,
  onOptionNameChange,
  rows,
  onChange,
  disabled,
}: VariantRowsProps) {
  const update = (index: number, patch: Partial<VariantInput>) => {
    onChange(rows.map((r, i) => (i === index ? { ...r, ...patch } : r)))
  }

  const addRow = () => {
    onChange([
      ...rows,
      {
        value: '',
        priceCents: rows.length > 0 ? rows[0].priceCents : 0,
        sku: null,
        qtyAvailable: 0,
        trackInventory: true,
        isActive: true,
      },
    ])
  }

  const removeRow = (index: number) => {
    if (rows.length <= 1) return
    onChange(rows.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5">
        <span className={labelCls}>Option name</span>
        <input
          type="text"
          value={optionName}
          onChange={(e) => onOptionNameChange(e.target.value)}
          placeholder="Flavor, Size, Color…"
          disabled={disabled}
          className={inputCls + ' max-w-[260px]'}
        />
      </label>

      <div className="flex flex-col gap-3">
        {rows.map((row, i) => (
          <div
            key={i}
            className="flex flex-col gap-3 rounded-[3px] border border-border bg-bg-surface p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-text-tertiary">
                {optionName.trim() || 'Option'} {i + 1}
              </span>
              {rows.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeRow(i)}
                  disabled={disabled}
                  aria-label="Remove option"
                  className="text-text-tertiary transition-colors hover:text-red-300 disabled:opacity-50"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className={labelCls}>Value</span>
                <input
                  type="text"
                  value={row.value ?? ''}
                  onChange={(e) => update(i, { value: e.target.value })}
                  placeholder="e.g. Chocolate"
                  disabled={disabled}
                  className={inputCls}
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className={labelCls}>Price (USD)</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={row.priceCents === 0 ? '' : (row.priceCents / 100).toString()}
                  onChange={(e) =>
                    update(i, {
                      priceCents: Math.round((parseFloat(e.target.value) || 0) * 100),
                    })
                  }
                  placeholder="0.00"
                  disabled={disabled}
                  className={inputCls + ' tabular-nums'}
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className={labelCls}>Inventory qty</span>
                <input
                  type="number"
                  step="1"
                  min="0"
                  value={row.qtyAvailable.toString()}
                  onChange={(e) =>
                    update(i, { qtyAvailable: Math.max(0, parseInt(e.target.value, 10) || 0) })
                  }
                  disabled={disabled}
                  className={inputCls + ' tabular-nums'}
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className={labelCls}>SKU (optional)</span>
                <input
                  type="text"
                  value={row.sku ?? ''}
                  onChange={(e) => update(i, { sku: e.target.value || null })}
                  disabled={disabled}
                  className={inputCls}
                />
              </label>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                role="switch"
                aria-checked={row.isActive}
                onClick={() => update(i, { isActive: !row.isActive })}
                disabled={disabled}
                className="flex items-center gap-2 rounded-[3px] border border-border bg-bg-high px-3 py-2 text-[12.5px] font-medium text-text-primary transition-colors hover:border-accent/30 disabled:opacity-50"
              >
                <span
                  className={
                    'relative h-4 w-7 shrink-0 rounded-[3px] border transition-colors ' +
                    (row.isActive ? 'border-accent/50 bg-accent/30' : 'border-border bg-bg-top')
                  }
                >
                  <span
                    className={
                      'absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-[2px] transition-all ' +
                      (row.isActive ? 'left-[14px] bg-accent-bright' : 'left-[2px] bg-text-tertiary')
                    }
                  />
                </span>
                {row.isActive ? 'Active' : 'Hidden'}
              </button>

              <button
                type="button"
                role="switch"
                aria-checked={row.trackInventory}
                onClick={() => update(i, { trackInventory: !row.trackInventory })}
                disabled={disabled}
                className="flex items-center gap-2 rounded-[3px] border border-border bg-bg-high px-3 py-2 text-[12.5px] font-medium text-text-primary transition-colors hover:border-accent/30 disabled:opacity-50"
              >
                <span
                  className={
                    'relative h-4 w-7 shrink-0 rounded-[3px] border transition-colors ' +
                    (row.trackInventory ? 'border-accent/50 bg-accent/30' : 'border-border bg-bg-top')
                  }
                >
                  <span
                    className={
                      'absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-[2px] transition-all ' +
                      (row.trackInventory ? 'left-[14px] bg-accent-bright' : 'left-[2px] bg-text-tertiary')
                    }
                  />
                </span>
                Track inventory
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addRow}
        disabled={disabled}
        className="inline-flex items-center gap-2 self-start rounded-[3px] border border-border bg-bg-high px-3.5 py-2.5 text-[13px] font-semibold text-text-secondary transition-colors hover:border-accent/35 hover:text-text-primary disabled:opacity-50"
      >
        <Plus className="h-4 w-4 text-accent/70" />
        Add option
      </button>
    </div>
  )
}
