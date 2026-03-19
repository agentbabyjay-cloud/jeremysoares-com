'use client'

import { useState } from 'react'
import type { PropertyListing } from '@/lib/content/types'
import { PropertyCard } from './PropertyCard'
import { FilterBar } from './FilterBar'

interface PropertyGridProps {
  listings: PropertyListing[]
  locale: string
  showFilter?: boolean
  filters?: { label: string; value: string }[]
  columns?: 4 | 5 | 7
}

export function PropertyGrid({
  listings,
  locale,
  showFilter = false,
  filters,
  columns = 4,
}: PropertyGridProps) {
  const [filter, setFilter] = useState('all')

  const filtered =
    filter === 'all'
      ? listings
      : listings.filter(
          (l) => l.status === filter || l.city === filter || l.type === filter
        )

  const colClass =
    columns === 7
      ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7'
      : columns === 5
        ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5'
        : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'

  return (
    <div>
      {showFilter && filters && (
        <div className="mb-10">
          <FilterBar filters={filters} onChange={setFilter} />
        </div>
      )}
      <div className={`grid ${colClass} gap-3`}>
        {filtered.map((listing) => (
          <PropertyCard key={listing.id} listing={listing} locale={locale} />
        ))}
      </div>
    </div>
  )
}
