import fs from 'fs'
import path from 'path'
import type { ArtPiece } from './types'

const ART_DIR = path.join(process.cwd(), 'content/art')

export function getAllArt(): ArtPiece[] {
  if (!fs.existsSync(ART_DIR)) return []
  return fs
    .readdirSync(ART_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(fs.readFileSync(path.join(ART_DIR, f), 'utf-8')) as ArtPiece)
    .sort((a, b) => b.year - a.year)
}

export function getArtBySlug(slug: string): ArtPiece | null {
  return getAllArt().find((a) => a.slug === slug) ?? null
}

export function getArtSlugs(): string[] {
  return getAllArt().map((a) => a.slug)
}
