'use client'

import { useState, useTransition } from 'react'
import { Loader2, Check } from 'lucide-react'
import Button from '@/components/ui/Button'
import { CATEGORIES, CATEGORY_LABEL } from '@/lib/marketplace/format'
import { submitApplication } from '@/app/merchant/apply/actions'

const inputCls =
  'w-full rounded-[3px] border border-border bg-bg-high px-3.5 py-2.5 text-[14.5px] text-text-primary placeholder:text-text-tertiary focus:border-accent/50 focus:outline-none'
const labelCls = 'text-[10.5px] font-bold uppercase tracking-[0.18em] text-text-tertiary'

type Result = { ok: boolean; error?: string; message?: string }

export default function ApplyForm({ defaultEmail }: { defaultEmail?: string }) {
  const [brandName, setBrandName] = useState('')
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState(defaultEmail ?? '')
  const [website, setWebsite] = useState('')
  const [category, setCategory] = useState<string>(CATEGORIES[0])
  const [message, setMessage] = useState('')
  const [pending, start] = useTransition()
  const [result, setResult] = useState<Result | null>(null)

  if (result?.ok) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-[3px] border border-[#5A7A64]/40 bg-[#5A7A64]/[0.08] px-6 py-10 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-[3px] border border-[#5A7A64]/45 bg-[#5A7A64]/[0.12] text-[#9FC4AC]">
          <Check className="h-5 w-5" />
        </span>
        <h3 className="font-display text-[20px] font-bold tracking-tight text-text-primary">
          Application submitted
        </h3>
        <p className="max-w-[420px] text-[14px] leading-relaxed text-text-secondary">
          Thanks — we&apos;ll review your brand for fit and compliance and email you at{' '}
          <span className="text-text-primary">{contactEmail}</span>. Once approved, you&apos;ll be able
          to list products from your merchant portal.
        </p>
      </div>
    )
  }

  const submit = () =>
    start(async () =>
      setResult(
        await submitApplication({ brandName, contactName, contactEmail, website, category, message }),
      ),
    )

  return (
    <div className="flex flex-col gap-5 rounded-[3px] border border-border bg-bg-surface p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className={labelCls}>Brand name *</span>
          <input className={inputCls} value={brandName} onChange={(e) => setBrandName(e.target.value)} placeholder="e.g. Relyv" />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelCls}>Primary category *</span>
          <select className={inputCls} value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {CATEGORY_LABEL[c]}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelCls}>Contact name *</span>
          <input className={inputCls} value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="Your name" />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelCls}>Contact email *</span>
          <input className={inputCls} type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="you@brand.com" />
        </label>
        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className={labelCls}>Website</span>
          <input className={inputCls} value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://" />
        </label>
        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className={labelCls}>Tell us about your brand</span>
          <textarea
            className={inputCls + ' min-h-[110px] resize-y'}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What you sell, catalog size, and anything about compliance (COAs, cGMP, insurance) we should know."
          />
        </label>
      </div>
      <p className="text-[12.5px] leading-relaxed text-text-tertiary">
        Your primary category becomes the default for items you list — you can change it per item. We review
        every brand for fit and compliance before onboarding.
      </p>
      <div className="flex items-center gap-3">
        <Button variant="gold" size="lg" disabled={pending} onClick={submit}>
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Submit application
        </Button>
        {result && !result.ok && <span className="text-[13px] font-medium text-red-300">{result.error}</span>}
      </div>
    </div>
  )
}
