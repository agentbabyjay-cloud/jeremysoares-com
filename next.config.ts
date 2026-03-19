import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.prod.website-files.com' },
      { protocol: 'https', hostname: 'jeremysoares.com' },
      { protocol: 'https', hostname: '*.jeremysoares.com' },
      { protocol: 'https', hostname: 'aimmo.ca' },
    ],
  },
}

export default nextConfig
