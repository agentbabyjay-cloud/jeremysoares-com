'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { ArtPiece } from '@/lib/content/types'

interface ArtCardProps {
  piece: ArtPiece
  locale: string
}

export function ArtCard({ piece, locale }: ArtCardProps) {
  const lang = locale === 'fr-ca' ? 'fr' : 'en'

  return (
    <Link
      href={`/${locale}/studio/${piece.slug}`}
      className="group block"
    >
      <div className="relative overflow-hidden bg-[rgba(236,234,229,0.06)]">
        <Image
          src={piece.coverImage}
          alt={piece.title}
          width={600}
          height={800}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[#0e1011] opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
      </div>
      <div className="mt-4">
        <p className="text-[0.75rem] tracking-[0.15em] uppercase text-[#eceae5] opacity-80 font-bold">
          {piece.title}
        </p>
        <p className="text-[0.625rem] tracking-[0.1em] text-[#eceae5] opacity-40 mt-1">
          {piece.medium} &middot; {piece.dimensions} &middot; {piece.year}
        </p>
        <p className="text-[0.75rem] text-[#eceae5] opacity-50 mt-2 leading-relaxed">
          {piece.description[lang]}
        </p>
      </div>
    </Link>
  )
}
