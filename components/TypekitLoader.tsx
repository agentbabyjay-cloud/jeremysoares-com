'use client'

import Script from 'next/script'

export default function TypekitLoader() {
  return (
    <Script
      src="https://use.typekit.net/mfd0qkm.js"
      strategy="afterInteractive"
      onLoad={() => {
        try {
          ;(window as any).Typekit.load()
        } catch (e) {}
      }}
    />
  )
}
