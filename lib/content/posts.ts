import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import type { BlogPost, Locale } from './types'

const POSTS_DIR = path.join(process.cwd(), 'content/posts')

export function getPostSlugs(locale: Locale): string[] {
  const dir = path.join(POSTS_DIR, locale)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

export function getPostBySlug(slug: string, locale: Locale): BlogPost | null {
  const filePath = path.join(POSTS_DIR, locale, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const { minutes } = readingTime(content)

  return {
    slug,
    title: data.title ?? '',
    date: data.date ?? '',
    tag: data.tag ?? '',
    excerpt: data.excerpt ?? '',
    coverImage: data.coverImage,
    locale,
    readTime: Math.ceil(minutes),
    content,
  }
}

export function getAllPosts(locale: Locale): BlogPost[] {
  return getPostSlugs(locale)
    .map((slug) => getPostBySlug(slug, locale))
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostsByTag(locale: Locale, tag: string): BlogPost[] {
  return getAllPosts(locale).filter((p) => p.tag === tag)
}
