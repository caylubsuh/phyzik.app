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

  const wordmarkUrl = 'https://phyzik.app/brand/phyzik-wordmark-white.png'

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
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '1400px',
            height: '900px',
            background:
              'radial-gradient(ellipse at center, rgba(167,139,250,0.35) 0%, rgba(167,139,250,0.12) 35%, rgba(167,139,250,0) 70%)',
            display: 'flex',
          }}
        />

        <img
          src={wordmarkUrl}
          alt="PHYZIK"
          width={640}
          height={96}
          style={{
            width: '640px',
            height: 'auto',
            marginBottom: '48px',
            zIndex: 1,
          }}
        />

        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            color: '#F2F2F3',
            textAlign: 'center',
            letterSpacing: '-0.02em',
            maxWidth: '900px',
            lineHeight: 1.2,
            zIndex: 1,
            display: 'flex',
          }}
        >
          <span>
            The{' '}
            <span style={{ color: '#A78BFA' }}>social</span>
            {' '}training platform built for{' '}
            <span style={{ color: '#A78BFA' }}>lifters.</span>
          </span>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '48px',
            fontSize: 18,
            color: '#8A8A8E',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontWeight: 400,
            display: 'flex',
          }}
        >
          phyzik.app
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
