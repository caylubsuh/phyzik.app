import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'PHYZIK — The social training platform built for lifters'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Generate on first request, not at build time. The fetches below (Google Fonts
// + our own brand asset) sometimes time out from the build sandbox, which
// previously broke the entire deploy.
export const dynamic = 'force-dynamic'

/** Fetch with a short timeout and a null-safe fallback. */
async function safeFetch(
  url: string,
  init?: RequestInit,
  timeoutMs = 3500,
): Promise<Response | null> {
  const controller = new AbortController()
  const t = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(url, { ...init, signal: controller.signal })
    if (!res.ok) return null
    return res
  } catch {
    return null
  } finally {
    clearTimeout(t)
  }
}

async function loadInterFont(weight: 400 | 700): Promise<ArrayBuffer | null> {
  const cssRes = await safeFetch(
    `https://fonts.googleapis.com/css2?family=Inter:wght@${weight}&display=swap`,
  )
  if (!cssRes) return null
  const css = await cssRes.text()
  const url = css.match(/src: url\((.+?)\) format/)?.[1]
  if (!url) return null
  const fontRes = await safeFetch(url)
  if (!fontRes) return null
  return fontRes.arrayBuffer()
}

export default async function OpengraphImage() {
  const [interRegular, interBold] = await Promise.all([
    loadInterFont(400),
    loadInterFont(700),
  ])

  // Resolve brand asset URLs against whatever deployment is rendering us.
  // VERCEL_URL is set on Vercel (preview + prod); fall back to phyzik.app.
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'https://www.phyzik.app'

  const wordmarkUrl = `${baseUrl}/brand/phyzik-wordmark-white.png`
  const iconUrl = `${baseUrl}/brand/phyzik-icon.png`

  const taglineWords: Array<{ text: string; accent?: boolean }> = [
    { text: 'The' },
    { text: 'social', accent: true },
    { text: 'training' },
    { text: 'platform' },
    { text: 'built' },
    { text: 'for' },
    { text: 'lifters.', accent: true },
  ]

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0A0A0B',
          position: 'relative',
          fontFamily: 'Inter',
          padding: '80px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '42%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '1100px',
            height: '700px',
            background:
              'radial-gradient(ellipse at center, rgba(184,151,106,0.38) 0%, rgba(184,151,106,0.14) 32%, rgba(184,151,106,0) 68%)',
            display: 'flex',
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'radial-gradient(ellipse 140% 100% at 50% 100%, rgba(184,151,106,0.08) 0%, rgba(184,151,106,0) 60%)',
            display: 'flex',
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: 40,
            left: 48,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            zIndex: 2,
          }}
        >
          <img
            src={iconUrl}
            alt=""
            width={52}
            height={52}
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              display: 'flex',
            }}
          />
        </div>

        <div
          style={{
            position: 'absolute',
            top: 56,
            right: 56,
            fontSize: 16,
            color: 'rgba(255, 255, 255, 0.5)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            fontWeight: 500,
            display: 'flex',
          }}
        >
          phyzik.app
        </div>

        <img
          src={wordmarkUrl}
          alt="PHYZIK"
          width={720}
          height={108}
          style={{
            width: 720,
            height: 108,
            zIndex: 1,
            marginBottom: 40,
          }}
        />

        <div
          style={{
            width: 80,
            height: 2,
            background: '#B8976A',
            marginBottom: 36,
            zIndex: 1,
            display: 'flex',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.32em',
            maxWidth: '940px',
            fontSize: 44,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            textAlign: 'center',
            zIndex: 1,
          }}
        >
          {taglineWords.map((word, i) => (
            <span
              key={i}
              style={{
                color: word.accent ? '#B8976A' : '#F2F2F3',
                display: 'flex',
              }}
            >
              {word.text}
            </span>
          ))}
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 48,
            left: 52,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            zIndex: 2,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              background: '#B8976A',
              display: 'flex',
            }}
          />
          <div
            style={{
              fontSize: 14,
              color: 'rgba(255, 255, 255, 0.55)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 500,
              display: 'flex',
            }}
          >
            Available on iOS
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 48,
            right: 52,
            fontSize: 14,
            color: 'rgba(255, 255, 255, 0.55)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontWeight: 500,
            display: 'flex',
          }}
        >
          Free. For every lifter.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        ...(interRegular
          ? [{ name: 'Inter', data: interRegular, weight: 400 as const, style: 'normal' as const }]
          : []),
        ...(interBold
          ? [{ name: 'Inter', data: interBold, weight: 700 as const, style: 'normal' as const }]
          : []),
      ],
    }
  )
}
