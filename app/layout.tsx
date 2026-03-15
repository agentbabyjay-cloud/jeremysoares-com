import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'JEREMY SOARES - Real Estate Services Montreal',
  description:
    'Discover luxury real estate in Montreal with Jeremy Soares. Personalized strategies for buyers, sellers, and investors, backed by local expertise and proven results.',
  icons: {
    icon: 'https://cdn.prod.website-files.com/68ba28534a070e692e441089/68fff8dcd0f8efcc6e1aa9e1_Untitled-5.png',
    apple:
      'https://cdn.prod.website-files.com/68ba28534a070e692e441089/68bcc66d5ba5fbacdf665853_JNJB-01.png',
  },
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
        {/* Google Fonts preconnect */}
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
        {/* Adobe Typekit — Avenir Next LT Pro Condensed */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://use.typekit.net/mfd0qkm.js" />
        <script dangerouslySetInnerHTML={{ __html: 'try{Typekit.load();}catch(e){}' }} />
        <style>{`* { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }`}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
