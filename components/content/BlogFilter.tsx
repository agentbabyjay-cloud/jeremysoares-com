'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { BlogPost } from '@/lib/content/types'

const FONT_BARLOW = "var(--font-barlow), 'Barlow', sans-serif"

interface BlogFilterProps {
  posts: BlogPost[]
  locale: string
  isFr: boolean
}

export function BlogFilter({ posts, locale, isFr }: BlogFilterProps) {
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const tags = useMemo(() => {
    const set = new Set<string>()
    posts.forEach((p) => { if (p.tag) set.add(p.tag) })
    return Array.from(set).sort()
  }, [posts])

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchTag = !activeTag || p.tag === activeTag
      const q = query.toLowerCase().trim()
      const matchSearch = !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tag.toLowerCase().includes(q)
      return matchTag && matchSearch
    })
  }, [posts, query, activeTag])

  return (
    <>
      {/* Search + filters */}
      <div style={{ marginBottom: '3rem' }}>
        {/* Search bar */}
        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ position: 'absolute', left: '0', top: '50%', transform: 'translateY(-50%)', opacity: 0.3, color: '#eceae5', pointerEvents: 'none' }}>
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isFr ? 'Rechercher un article…' : 'Search articles…'}
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              borderBottom: '1px solid rgba(236,234,229,0.15)',
              color: '#eceae5',
              fontFamily: 'inherit',
              fontSize: '1rem',
              padding: '10px 0 12px 24px',
              outline: 'none',
              caretColor: '#eceae5',
            }}
          />
        </div>

        {/* Tag pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveTag(null)}
            style={{
              fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700,
              background: !activeTag ? 'var(--color-cream)' : 'transparent',
              color: !activeTag ? 'var(--color-void)' : '#eceae5',
              border: `1px solid ${!activeTag ? 'var(--color-cream)' : 'rgba(236,234,229,0.18)'}`,
              padding: '6px 14px', cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            {isFr ? 'Tous' : 'All'}
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              style={{
                fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700,
                background: activeTag === tag ? 'var(--color-cream)' : 'transparent',
                color: activeTag === tag ? 'var(--color-void)' : '#eceae5',
                border: `1px solid ${activeTag === tag ? 'var(--color-cream)' : 'rgba(236,234,229,0.18)'}`,
                padding: '6px 14px', cursor: 'pointer', transition: 'all 0.2s',
                opacity: activeTag === tag ? 1 : 0.55,
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      {(query || activeTag) && (
        <p style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.3, marginBottom: '1.5rem' }}>
          {filtered.length} {isFr ? 'résultat(s)' : 'result(s)'}
        </p>
      )}

      {/* Post list */}
      {filtered.length > 0 ? (
        <div>
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/${locale}/blog/${post.slug}`}
              style={{ display: 'grid', gridTemplateColumns: post.coverImage ? '120px 1fr auto' : '1fr auto', gap: '1.5rem', alignItems: 'center', padding: '1.5rem 0', borderBottom: '1px solid rgba(236,234,229,0.08)', textDecoration: 'none', transition: 'border-color 0.2s' }}
            >
              {/* Cover thumbnail */}
              {post.coverImage && (
                <div style={{ position: 'relative', width: '120px', height: '80px', overflow: 'hidden', background: 'rgba(236,234,229,0.04)', flexShrink: 0 }}>
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="120px"
                    style={{ objectFit: 'cover', filter: 'brightness(0.7)' }}
                  />
                  {/* Tag overlay */}
                  <span style={{ position: 'absolute', bottom: '6px', left: '6px', fontSize: '7px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, background: 'rgba(14,16,17,0.8)', color: '#eceae5', padding: '3px 7px' }}>
                    {post.tag}
                  </span>
                </div>
              )}

              {/* Text */}
              <div style={{ minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                  {!post.coverImage && (
                    <span style={{ fontSize: '8px', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, background: 'rgba(236,234,229,0.08)', color: '#eceae5', padding: '3px 8px', opacity: 0.7 }}>
                      {post.tag}
                    </span>
                  )}
                  <span style={{ fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#eceae5', opacity: 0.3 }}>
                    {post.date}
                  </span>
                  <span style={{ fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#eceae5', opacity: 0.25 }}>
                    {post.readTime} min
                  </span>
                </div>
                <h3 style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(1rem,1.8vw,1.3rem)', textTransform: 'uppercase', letterSpacing: '0.02em', color: '#eceae5', margin: '0 0 0.4rem', lineHeight: 1.1 }}>
                  {post.title}
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#eceae5', opacity: 0.35, margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                  {post.excerpt}
                </p>
              </div>

              {/* Arrow */}
              <span style={{ color: '#eceae5', opacity: 0.25, fontSize: '1.2rem', flexShrink: 0 }}>→</span>
            </Link>
          ))}
        </div>
      ) : (
        <p style={{ fontSize: '0.9rem', color: '#eceae5', opacity: 0.3, fontStyle: 'italic' }}>
          {isFr ? 'Aucun article trouvé.' : 'No articles found.'}
        </p>
      )}
    </>
  )
}
