import type { Metadata } from 'next'
import './globals.css'

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
      '@type': 'RealEstateAgent',
      '@id': 'https://jeremysoares.com/#agent',
      name: 'Jeremy Soares',
      url: 'https://jeremysoares.com',
      telephone: '+15145198177',
      email: 'JeremySoares@icloud.com',
      image:
        'https://cdn.prod.website-files.com/68ba28534a070e692e441089/68ba5e4e80122c482c8397a9_Jeremy-Soares-Montreal-Realtor.webp',
      description:
        'Trusted Montreal real estate agent specializing in residential, commercial, and investment properties.',
      areaServed: [
        { '@type': 'City', name: 'Montreal', '@id': 'https://www.wikidata.org/wiki/Q340' },
      ],
      knowsLanguage: ['en', 'fr'],
      sameAs: [
        'https://www.linkedin.com/in/jeremysoaresrealestate/',
        'https://www.centris.ca/fr/courtier-immobilier~jeremy-soares~jeremy-soares/h2731',
        'https://www.realtor.ca/agent/2079722/jeremy-soares-106-220-av-des-pins-o-montreal-quebec-h2w1r9',
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Montreal',
        addressRegion: 'QC',
        addressCountry: 'CA',
        postalCode: 'H2W1R9',
        streetAddress: '106-220 Av des Pins O',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://jeremysoares.com/#website',
      url: 'https://jeremysoares.com',
      name: 'Jeremy Soares Real Estate',
      publisher: { '@id': 'https://jeremysoares.com/#agent' },
      inLanguage: ['en-CA', 'fr-CA'],
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://jeremysoares.com/en-ca/blog?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* ORIGINAL WEBFLOW CSS — exact fonts, spacing, colors */}
        <link
          href="https://cdn.prod.website-files.com/68ba28534a070e692e441089/css/jeremy-soares-immobilier-montreal.webflow.shared.a06ab2d6d.css"
          rel="stylesheet"
          type="text/css"
        />
        {/* Adobe Typekit — Avenir Next LT Pro Condensed */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://use.typekit.net/mfd0qkm.js" />
        <script dangerouslySetInnerHTML={{ __html: 'try{Typekit.load();}catch(e){}' }} />
        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Analytics 4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-C44LY9E9TK" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-C44LY9E9TK', { send_page_view: true });
            `,
          }}
        />
        <style>{`* { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }`}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
