'use client'

import { QRCodeSVG } from 'qrcode.react'
import { APP_STORE_URL } from '@/lib/constants'
import { cn } from '@/lib/utils'

type QRCodeProps = {
  size?: number
  hideOnMobile?: boolean
  className?: string
}

export default function QRCode({
  size = 120,
  hideOnMobile = true,
  className,
}: QRCodeProps) {
  return (
    <div
      className={cn(
        'flex-col items-center gap-3 rounded-2xl border border-border bg-bg-high/60 p-4 backdrop-blur',
        hideOnMobile ? 'hidden md:flex' : 'flex',
        className,
      )}
    >
      <QRCodeSVG
        value={APP_STORE_URL}
        size={size}
        bgColor="transparent"
        fgColor="#ffffff"
        marginSize={0}
        level="M"
      />
      <span className="text-[11px] uppercase tracking-[0.15em] text-text-tertiary">
        Scan to download
      </span>
    </div>
  )
}
