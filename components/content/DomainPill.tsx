interface DomainPillProps {
  domain: string
  href?: string
}

export function DomainPill({ domain, href }: DomainPillProps) {
  const classes =
    'inline-block text-[0.625rem] tracking-[0.15em] uppercase font-bold px-4 py-2 border border-[rgba(236,234,229,0.15)] text-[#eceae5] opacity-50 hover:opacity-100 hover:bg-[rgba(236,234,229,0.06)] transition-all duration-300'

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {domain}
      </a>
    )
  }

  return <span className={classes}>{domain}</span>
}
