import fs from 'fs'
import path from 'path'
import type { PropertyListing } from './types'

const LISTINGS_DIR = path.join(process.cwd(), 'content/listings')

function readJsonFiles<T>(dir: string): T[] {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8')) as T)
}

export function getAllListings(): PropertyListing[] {
  const dirs = ['active', 'sold', 'rented']
  return dirs.flatMap((sub) => readJsonFiles<PropertyListing>(path.join(LISTINGS_DIR, sub)))
}

export function getListingById(id: string): PropertyListing | null {
  return getAllListings().find((l) => l.id === id) ?? null
}

export function getListingsByStatus(status: PropertyListing['status']): PropertyListing[] {
  return getAllListings().filter((l) => l.status === status)
}

export function getListingsByCity(city: PropertyListing['city']): PropertyListing[] {
  return getAllListings().filter((l) => l.city === city)
}

export function getListingsByType(type: PropertyListing['type']): PropertyListing[] {
  return getAllListings().filter((l) => l.type === type)
}

export function getFeaturedListings(): PropertyListing[] {
  return getAllListings().filter((l) => l.featured)
}
