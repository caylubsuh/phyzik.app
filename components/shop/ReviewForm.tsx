'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { submitReview } from '@/app/shop/product/[id]/review-actions'

interface ReviewFormProps {
  productId: string
  isSignedIn: boolean
}

export default function ReviewForm({ productId, isSignedIn }: ReviewFormProps) {
  const [rating, setRating] = useState<number>(0)
  const [hovered, setHovered] = useState<number>(0)
  const [body, setBody] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isSignedIn) {
    return (
      <p className="text-[13.5px] text-text-tertiary">
        <a
          href="/login"
          className="font-semibold text-text-secondary underline underline-offset-2 transition-colors hover:text-text-primary"
        >
          Sign in
        </a>{' '}
        to leave a review.
      </p>
    )
  }

  if (done) {
    return (
      <p className="rounded-[3px] border border-border bg-bg-surface px-5 py-4 text-[13.5px] text-text-secondary">
        Thanks for your review! It will appear after a brief check.
      </p>
    )
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (rating === 0) {
      setError('Please select a star rating.')
      return
    }
    setError(null)
    setSubmitting(true)
    try {
      const result = await submitReview(productId, rating, body.trim())
      if (result?.error) {
        setError(result.error)
      } else {
        setDone(true)
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const displayRating = hovered || rating

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Star picker */}
      <fieldset>
        <legend className="mb-2 text-[12px] font-semibold uppercase tracking-widest text-text-tertiary">
          Your rating
        </legend>
        <div
          className="flex gap-1"
          onMouseLeave={() => setHovered(0)}
          role="group"
          aria-label="Star rating"
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              aria-label={`${n} star${n !== 1 ? 's' : ''}`}
              aria-pressed={rating === n}
              onClick={() => setRating(n)}
              onMouseEnter={() => setHovered(n)}
              className="rounded-[3px] p-0.5 transition-transform active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-bg"
            >
              <Star
                className={cn(
                  'h-6 w-6 transition-colors',
                  n <= displayRating
                    ? 'fill-[#A8892E] text-[#A8892E]'
                    : 'fill-transparent text-border',
                )}
              />
            </button>
          ))}
        </div>
      </fieldset>

      {/* Body */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="review-body"
          className="text-[12px] font-semibold uppercase tracking-widest text-text-tertiary"
        >
          Review <span className="normal-case tracking-normal font-normal">(optional)</span>
        </label>
        <textarea
          id="review-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={4}
          maxLength={2000}
          placeholder="Share your experience…"
          className="w-full rounded-[3px] border border-border bg-bg-high px-3.5 py-2.5 text-[14px] text-text-primary placeholder:text-text-tertiary focus:border-accent/60 focus:outline-none focus:ring-1 focus:ring-accent/40 resize-none"
        />
      </div>

      {error && (
        <p role="alert" className="text-[13px] text-red-400">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className={cn(
          'inline-flex h-10 items-center justify-center gap-2 rounded-[3px] px-5 text-[14px] font-semibold transition-[transform,filter,opacity] active:scale-[0.98]',
          'bg-[linear-gradient(135deg,#E8D9A8_0%,#C9A94E_38%,#A8892E_70%,#856A1F_100%)] text-bg shadow-[0_10px_32px_-12px_rgba(168,137,46,0.55)] hover:brightness-110',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
          'disabled:pointer-events-none disabled:opacity-50',
        )}
      >
        {submitting ? 'Submitting…' : 'Submit Review'}
      </button>
    </form>
  )
}
