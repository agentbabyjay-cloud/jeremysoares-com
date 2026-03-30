'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { PropertyListing } from '@/lib/content/types'

interface PropertyCardProps {
  listing: PropertyListing
  locale: string
}

const statusLabels: Record<string, Record<string, string>> = {
  sold: { en: 'Sold', fr: 'Vendu' },
  rented: { en: 'Rented', fr: 'Loué' },
  active: { en: 'Active', fr: 'Actif' },
}

export function PropertyCard({ listing, locale }: PropertyCardProps) {
  const lang = locale === 'fr-ca' ? 'fr' : 'en'
  const badge = statusLabels[listing.status]?.[lang] ?? listing.status

  return (
    <Link
      href={`/${locale}/real-estate/${listing.id}`}
      className="group relative block overflow-hidden"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[rgba(236,234,229,0.06)]">
        {listing.images[0] && (
          <Image
            src={listing.images[0]}
            alt={listing.address}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <span className="absolute top-3 left-3 text-[0.625rem] tracking-[0.22em] uppercase font-bold bg-[#0e1011] text-[#eceae5] px-3 py-1.5">
          {badge}
        </span>
      </div>
      <div className="mt-3">
        <p className="text-[0.75rem] tracking-[0.1em] uppercase text-[#eceae5] opacity-70">
          {listing.neighbourhood}
        </p>
        <div className="flex items-center justify-between mt-1 gap-2">
          <p className="text-[0.625rem] tracking-[0.15em] uppercase text-[#eceae5] opacity-40">
            {listing.bedrooms != null ? `${listing.bedrooms} bd` : listing.type}
            {listing.bathrooms != null ? ` · ${listing.bathrooms} ba` : ''}
            {listing.area ? ` · ${listing.area}` : ''}
          </p>
          {listing.price && (
            <p className="text-[0.625rem] tracking-[0.1em] font-bold text-[#eceae5] opacity-60 whitespace-nowrap">
              {listing.price}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
