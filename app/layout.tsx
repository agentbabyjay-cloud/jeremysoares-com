import type { Metadata } from 'next'
import { DM_Sans, Barlow, DM_Serif_Display } from 'next/font/google'
import TypekitLoader from '@/components/TypekitLoader'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['700', '900'],
  variable: '--font-barlow',
  display: 'swap',
})

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
  variable: '--font-dm-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://jeremysoares.com'),
  title: {
    default: 'Jeremy Soares — Montreal Real Estate Agent | Buy, Sell & Rent',
    template: '%s | Jeremy Soares Real Estate',
  },
  description:
    'Jeremy Soares is a trusted Montreal real estate agent specializing in residential, commercial, and investment properties. Bilingual services in English and French across Downtown, Old Port, and the Plateau.',
  keywords: [
    'Montreal real estate agent',
    'courtier immobilier Montréal',
    'buy property Montreal',
    'sell home Montreal',
    'commercial real estate Montreal',
    'Jeremy Soares',
    'Plateau real estate',
    'Old Port condos',
    'Downtown Montreal realtor',
    'Montreal Realtor',
  ],
  authors: [{ name: 'Jeremy Soares', url: 'https://jeremysoares.com' }],
  creator: 'Jeremy Soares',
  publisher: 'Jeremy Soares',
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    alternateLocale: 'fr_CA',
    url: 'https://jeremysoares.com',
    siteName: 'Jeremy Soares Real Estate',
    title: 'Jeremy Soares — Montreal Real Estate Agent',
    description:
      'Personalized real estate strategies for buyers, sellers, and investors in Montreal. Backed by local expertise and proven results.',
    images: [
      {
        url: 'https://cdn.prod.website-files.com/68ba28534a070e692e441089/68baf35dc28553a17f2d6d78_8-IMG_6610.jpg',
        width: 1218,
        height: 813,
        alt: 'Jeremy Soares Montreal Real Estate',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jeremy Soares — Montreal Real Estate Agent',
    description:
      'Personalized real estate strategies for buyers, sellers, and investors in Montreal.',
    images: [
      'https://cdn.prod.website-files.com/68ba28534a070e692e441089/68baf35dc28553a17f2d6d78_8-IMG_6610.jpg',
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: 'https://cdn.prod.website-files.com/68ba28534a070e692e441089/68fff8dcd0f8efcc6e1aa9e1_Untitled-5.png',
    apple:
      'https://cdn.prod.website-files.com/68ba28534a070e692e441089/68bcc66d5ba5fbacdf665853_JNJB-01.png',
  },
  verification: {
    google: '7b1nlA6nQkgyF_MZ28W9yNXbZWQyu_zIyNIrm8Mw1sM',
  },
  alternates: {
    canonical: 'https://jeremysoares.com',
    languages: {
      'en-CA': 'https://jeremysoares.com/en-ca',
      'fr-CA': 'https://jeremysoares.com/fr-ca',
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['RealEstateAgent', 'LocalBusiness'],
      '@id': 'https://jeremysoares.com/#agent',
      name: 'Jeremy Soares',
      legalName: 'Jeremy Soares Real Estate',
      url: 'https://jeremysoares.com',
      telephone: '+15145198177',
      email: 'JeremySoares@icloud.com',
      image: {
        '@type': 'ImageObject',
        url: 'https://cdn.prod.website-files.com/68ba28534a070e692e441089/68ba5e4e80122c482c8397a9_Jeremy-Soares-Montreal-Realtor.webp',
        width: 800,
        height: 800,
      },
      logo: {
        '@type': 'ImageObject',
        url: 'https://cdn.prod.website-files.com/68ba28534a070e692e441089/68bcc66d5ba5fbacdf665853_JNJB-01.png',
      },
      description:
        'Jeremy Soares is a trusted Montreal real estate agent (OACIQ licence H2731) specializing in residential, commercial, and investment properties. Bilingual services in English and French.',
      slogan: 'Soares Agency — Precision Real Estate',
      priceRange: '$$',
      currenciesAccepted: 'CAD',
      areaServed: [
        { '@type': 'City', name: 'Montreal', sameAs: 'https://www.wikidata.org/wiki/Q340' },
        { '@type': 'City', name: 'Laval', sameAs: 'https://www.wikidata.org/wiki/Q193380' },
        { '@type': 'City', name: 'Longueuil' },
        { '@type': 'AdministrativeArea', name: 'Greater Montreal Area' },
      ],
      knowsLanguage: ['en', 'fr'],
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        name: 'OACIQ Real Estate Broker Licence',
        credentialCategory: 'licence',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Organisme d\'autoréglementation du courtage immobilier du Québec (OACIQ)',
          url: 'https://www.oaciq.com',
        },
        identifier: 'H2731',
      },
      memberOf: {
        '@type': 'Organization',
        name: 'OACIQ',
        url: 'https://www.oaciq.com',
      },
      sameAs: [
        'https://www.linkedin.com/in/jeremysoaresrealestate/',
        'https://www.instagram.com/jeremysoares.re/',
        'https://www.facebook.com/jeremysoares.re/',
        'https://www.centris.ca/fr/courtier-immobilier~jeremy-soares~jeremy-soares/h2731',
        'https://www.realtor.ca/agent/2079722/jeremy-soares-106-220-av-des-pins-o-montreal-quebec-h2w1r9',
        'https://www.oaciq.com/en/find-a-broker/broker-details?id=H2731',
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: '106-220 Av des Pins O',
        addressLocality: 'Montreal',
        addressRegion: 'QC',
        addressCountry: 'CA',
        postalCode: 'H2W1R9',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 45.5203,
        longitude: -73.5773,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Saturday'],
          opens: '10:00',
          closes: '16:00',
        },
      ],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+15145198177',
          contactType: 'customer service',
          availableLanguage: ['English', 'French'],
          areaServed: 'CA',
        },
        {
          '@type': 'ContactPoint',
          email: 'JeremySoares@icloud.com',
          contactType: 'sales',
          availableLanguage: ['English', 'French'],
        },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://jeremysoares.com/#website',
      url: 'https://jeremysoares.com',
      name: 'Jeremy Soares Real Estate',
      alternateName: 'Soares Agency',
      publisher: { '@id': 'https://jeremysoares.com/#agent' },
      author: { '@id': 'https://jeremysoares.com/#agent' },
      inLanguage: ['en-CA', 'fr-CA'],
      copyrightYear: 2024,
      potentialAction: [
        {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://jeremysoares.com/en-ca/blog?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
        {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://jeremysoares.com/fr-ca/blog?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      ],
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${barlow.variable} ${dmSerifDisplay.variable}`}>
      <head>
        {/* Adobe Typekit — Avenir Next LT Pro Condensed */}
        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Analytics 4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-2GWNP83S4J" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-2GWNP83S4J', { send_page_view: true });
              gtag('config', 'G-C44LY9E9TK', { send_page_view: true });
            `,
          }}
        />
      </head>
      <body>{children}</body>
      {/* Adobe Typekit — load after interactive so it never blocks render */}
      <TypekitLoader />
    </html>
  )
}
