import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'PHYZIK — The social training platform built for lifters'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  const [interRegular, interBold] = await Promise.all([
    fetch('https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap')
      .then((r) => r.text())
      .then((css) => {
        const url = css.match(/src: url\((.+?)\) format/)?.[1]
        return url ? fetch(url).then((r) => r.arrayBuffer()) : null
      }),
    fetch('https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap')
      .then((r) => r.text())
      .then((css) => {
        const url = css.match(/src: url\((.+?)\) format/)?.[1]
        return url ? fetch(url).then((r) => r.arrayBuffer()) : null
      }),
  ])

  const wordmarkUrl = 'https://www.phyzik.app/brand/phyzik-wordmark-white.png'
  const iconUrl = 'https://www.phyzik.app/brand/phyzik-icon.png'

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
