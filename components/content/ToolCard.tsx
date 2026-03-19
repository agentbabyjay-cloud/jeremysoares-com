import type { ToolLink } from '@/lib/content/types'

interface ToolCardProps {
  tool: ToolLink
  locale: string
}

export function ToolCard({ tool, locale }: ToolCardProps) {
  const lang = locale === 'fr-ca' ? 'fr' : 'en'

  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block p-6 border border-[rgba(236,234,229,0.1)] hover:border-[rgba(236,234,229,0.3)] transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-[1rem] font-bold tracking-[0.05em] uppercase text-[#eceae5] font-['avenir-next-lt-pro-condensed','Avenir_Next_Condensed',sans-serif]">
          {tool.name}
        </h3>
        <span className="text-[#eceae5] opacity-30 group-hover:opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 text-sm">
          &nearr;
        </span>
      </div>
      <p className="text-[0.75rem] text-[#eceae5] opacity-50 leading-relaxed">
        {tool.description[lang]}
      </p>
      <p className="text-[0.625rem] tracking-[0.22em] uppercase text-[#eceae5] opacity-25 mt-4">
        {tool.category}
      </p>
    </a>
  )
}
