'use client'

import { useEffect } from 'react'

const APP_STORE_URL = 'https://apps.apple.com/app/id6744116498'

export default function RedirectPage() {
  useEffect(() => {
    const path = window.location.pathname + window.location.search
    const ua = window.navigator.userAgent
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !(window as unknown as { MSStream?: unknown }).MSStream

    if (!isIOS) {
      window.location.replace(APP_STORE_URL)
      return
    }

    const scheme = `phyzik://${path.replace(/^\//, '')}`
    window.location.href = scheme

    const fallback = window.setTimeout(() => {
      window.location.replace(APP_STORE_URL)
    }, 1500)

    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        window.clearTimeout(fallback)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      window.clearTimeout(fallback)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <main className="min-h-screen bg-bg flex flex-col items-center justify-center gap-6 px-6">
      <div
        className="h-10 w-10 rounded-full border-2 border-border-strong border-t-accent animate-spin"
        aria-hidden="true"
      />
      <p className="text-text-secondary text-sm tracking-tight">Opening PHYZIK&hellip;</p>
    </main>
  )
}
