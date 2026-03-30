export type Locale = 'en' | 'fr'

export interface LocaleString {
  en: string
  fr: string
}

export interface BlogPost {
  slug: string
  title: string
  date: string
  tag: string
  excerpt: string
  coverImage?: string
  locale: Locale
  readTime: number
  content: string
}

export interface PropertyListing {
  id: string
  status: 'active' | 'sold' | 'rented'
  address: string
  neighbourhood: string
  city: 'Montreal' | 'Vancouver'
  type: 'residential' | 'commercial' | 'rental'
  images: string[]
  featured: boolean
  soldDate?: string
  price?: string
  bedrooms?: number
  bathrooms?: number
  area?: string
  description?: LocaleString
  amenities?: Amenity[]
}

export interface Amenity {
  icon: string
  en: string
  fr: string
}

export interface ArtPiece {
  id: string
  title: string
  slug: string
  medium: string
  dimensions: string
  year: number
  images: string[]
  coverImage: string
  editions?: number
  description: LocaleString
}

export interface ToolLink {
  id: string
  name: string
  description: LocaleString
  url: string
  icon: string
  category: string
}

export interface PreSaleProject {
  slug: string
  projectName: string
  developer: string
  neighbourhood: string
  units: number
  priceRange: string
  status: 'upcoming' | 'active' | 'sold-out'
  coverImage: string
  description?: LocaleString
}

export interface TimelineEntry {
  year: string
  role: string
  company: string
  description: LocaleString
}
