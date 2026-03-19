import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { PreSaleProject, Locale } from './types'

const PRESALE_DIR = path.join(process.cwd(), 'content/presale')

export function getPresaleSlugs(locale: Locale): string[] {
  const dir = path.join(PRESALE_DIR, locale)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

export function getPresaleBySlug(
  slug: string,
  locale: Locale,
): (PreSaleProject & { content: string }) | null {
  const filePath = path.join(PRESALE_DIR, locale, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug,
    projectName: data.projectName ?? '',
    developer: data.developer ?? '',
    neighbourhood: data.neighbourhood ?? '',
    units: data.units ?? 0,
    priceRange: data.priceRange ?? '',
    status: data.status ?? 'upcoming',
    coverImage: data.coverImage ?? '',
    description: data.description,
    content,
  }
}

export function getAllPresale(locale: Locale): PreSaleProject[] {
  return getPresaleSlugs(locale)
    .map((slug) => getPresaleBySlug(slug, locale))
    .filter((p): p is PreSaleProject & { content: string } => p !== null)
}
