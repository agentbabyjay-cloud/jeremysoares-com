import Image from 'next/image'
import Link from 'next/link'
import type { PreSaleProject } from '@/lib/content/types'

interface PreSaleCardProps {
  project: PreSaleProject
  locale: string
}

const statusColors: Record<string, string> = {
  upcoming: 'bg-[#eceae5] text-[#0e1011]',
  active: 'bg-[#eceae5] text-[#0e1011]',
  'sold-out': 'bg-[#0e1011] text-[#eceae5]',
}

export function PreSaleCard({ project, locale }: PreSaleCardProps) {
  const lang = locale === 'fr-ca' ? 'fr' : 'en'

  return (
    <Link
      href={`/${locale}/presale/${project.slug}`}
      className="group block"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[rgba(236,234,229,0.06)]">
        {project.coverImage && (
          <Image
            src={project.coverImage}
            alt={project.projectName}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <span
          className={`absolute top-3 left-3 text-[0.625rem] tracking-[0.22em] uppercase font-bold px-3 py-1.5 ${statusColors[project.status] ?? statusColors.active}`}
        >
          {project.status.replace('-', ' ')}
        </span>
      </div>
      <div className="mt-4">
        <h3 className="text-[1.25rem] font-bold tracking-tight text-[#eceae5] font-['avenir-next-lt-pro-condensed','Avenir_Next_Condensed',sans-serif]">
          {project.projectName}
        </h3>
        <p className="text-[0.75rem] text-[#eceae5] opacity-50 mt-1">
          {project.developer} &middot; {project.neighbourhood}
        </p>
        <p className="text-[0.625rem] tracking-[0.1em] uppercase text-[#eceae5] opacity-30 mt-2">
          {project.units} {lang === 'fr' ? 'unités' : 'units'} &middot; {project.priceRange}
        </p>
      </div>
    </Link>
  )
}
