import type { TimelineEntry } from '@/lib/content/types'

interface TimelineRowProps {
  entry: TimelineEntry
  locale: string
}

export function TimelineRow({ entry, locale }: TimelineRowProps) {
  const lang = locale === 'fr-ca' ? 'fr' : 'en'

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 py-6 border-b border-[rgba(236,234,229,0.1)]">
      <span className="text-[0.75rem] tracking-[0.15em] uppercase text-[#eceae5] opacity-40 font-bold">
        {entry.year}
      </span>
      <div>
        <p className="text-[1rem] font-bold tracking-tight text-[#eceae5] font-['avenir-next-lt-pro-condensed','Avenir_Next_Condensed',sans-serif]">
          {entry.role}
        </p>
        <p className="text-[0.75rem] text-[#eceae5] opacity-50 mt-0.5">
          {entry.company}
        </p>
        <p className="text-[0.875rem] text-[#eceae5] opacity-60 mt-2 leading-relaxed">
          {entry.description[lang]}
        </p>
      </div>
    </div>
  )
}
