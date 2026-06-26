/**
 * SellerInfo — server component.
 * INFORM Act seller disclosure. Renders available contact fields for the brand.
 * Gracefully omits null/undefined fields. Always shows "Report a problem" link.
 */
import { MapPin, Mail, Building2, Flag } from 'lucide-react'

interface SellerInfoProps {
  brand: {
    name: string
    legal_name?: string | null
    business_address?: string | null
    contact_email?: string | null
  }
}

export default function SellerInfo({ brand }: SellerInfoProps) {
  const reportSubject = encodeURIComponent(`Report — ${brand.name}`)

  return (
    <aside
      aria-label="Seller information"
      className="rounded-[3px] border border-border bg-bg-surface px-5 py-4 text-[13px] text-text-secondary"
    >
      <p className="font-semibold text-text-primary">Sold by {brand.name}</p>

      {(brand.legal_name || brand.business_address || brand.contact_email) && (
        <ul className="mt-3 flex flex-col gap-2">
          {brand.legal_name && (
            <li className="flex items-start gap-2.5">
              <Building2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-text-tertiary" />
              <span>{brand.legal_name}</span>
            </li>
          )}
          {brand.business_address && (
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-text-tertiary" />
              <span>{brand.business_address}</span>
            </li>
          )}
          {brand.contact_email && (
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-text-tertiary" />
              <a
                href={`mailto:${brand.contact_email}`}
                className="underline underline-offset-2 transition-colors hover:text-text-primary"
              >
                {brand.contact_email}
              </a>
            </li>
          )}
        </ul>
      )}

      <div className="mt-3 border-t border-border/60 pt-3">
        <a
          href={`mailto:admin@phyzik.app?subject=${reportSubject}`}
          className="inline-flex items-center gap-1.5 text-[12px] text-text-tertiary underline underline-offset-2 transition-colors hover:text-text-secondary"
        >
          <Flag className="h-3 w-3" />
          Report a problem
        </a>
      </div>
    </aside>
  )
}
