export const APP_STORE_URL = 'https://apps.apple.com/us/app/phyzik/id6760412488'
export const APP_STORE_ID = 'id6760412488'
export const BUNDLE_ID = 'com.physiquetech.physiqueai'
export const INSTAGRAM_URL = 'https://www.instagram.com/phyzik.app'
export const SITE_URL = 'https://phyzik.app'

export const BRAND = {
  name: 'PHYZIK',
  legalName: 'Physique Technologies LLC',
  tagline: 'The training platform built for lifters.',
  description:
    'Structured programs. Automatic progressive overload. A social feed where every post is a real workout.',
} as const

export const STATS = [
  { value: 730, suffix: '+', label: 'Exercises' },
  { value: 5000, suffix: '+', label: 'Program combinations' },
  { value: 35, suffix: '', label: 'Challenges' },
  { value: 3145, suffix: '', label: 'Exercise aliases' },
] as const
