import {
  APP_STORE_URL,
  BUNDLE_ID,
  INSTAGRAM_URL,
  SITE_URL,
  BRAND,
} from './constants'

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND.name,
    legalName: BRAND.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/phyzik-icon.png`,
    description: BRAND.description,
    sameAs: [INSTAGRAM_URL, APP_STORE_URL],
    foundingDate: '2024',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'support@phyzik.app',
        availableLanguage: ['English'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'press',
        email: 'press@phyzik.app',
        availableLanguage: ['English'],
      },
    ],
  }
}

export function softwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: BRAND.name,
    alternateName: 'PHYZIK: Lifting & Gym Tracker',
    operatingSystem: 'iOS 15.1+',
    applicationCategory: 'HealthApplication',
    applicationSubCategory: 'FitnessApplication',
    description: BRAND.description,
    url: SITE_URL,
    downloadUrl: APP_STORE_URL,
    installUrl: APP_STORE_URL,
    identifier: BUNDLE_ID,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    screenshot: [
      `${SITE_URL}/screenshots/marketing/01-floor-post.png`,
      `${SITE_URL}/screenshots/marketing/02-squad.png`,
      `${SITE_URL}/screenshots/marketing/03-active-tracker.png`,
      `${SITE_URL}/screenshots/marketing/04-analytics.png`,
      `${SITE_URL}/screenshots/marketing/05-discover.png`,
      `${SITE_URL}/screenshots/marketing/06-recovery.png`,
      `${SITE_URL}/screenshots/marketing/07-scheduler.png`,
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      ratingCount: '1',
      bestRating: '5',
      worstRating: '1',
    },
    publisher: {
      '@type': 'Organization',
      name: BRAND.legalName,
    },
    author: {
      '@type': 'Organization',
      name: BRAND.legalName,
    },
  }
}

export function personSchema(options: {
  name: string
  jobTitle: string
  description: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: options.name,
    jobTitle: options.jobTitle,
    description: options.description,
    ...(options.image ? { image: `${SITE_URL}${options.image}` } : {}),
    worksFor: {
      '@type': 'Organization',
      name: BRAND.legalName,
      url: SITE_URL,
    },
  }
}

export function faqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BRAND.name,
    url: SITE_URL,
    publisher: {
      '@type': 'Organization',
      name: BRAND.legalName,
    },
  }
}

export function jsonLdScriptProps(data: unknown) {
  return {
    type: 'application/ld+json',
    dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
  } as const
}
