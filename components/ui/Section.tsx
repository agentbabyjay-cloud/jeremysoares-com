import React from 'react'

type SectionTheme = 'void' | 'cream' | 'navy'
type SectionHeight = 'auto' | 'screen' | 'half' | 'tall'

interface SectionProps {
  theme?: SectionTheme
  height?: SectionHeight
  className?: string
  id?: string
  children: React.ReactNode
}

const themeMap: Record<SectionTheme, string> = {
  void: 'bg-[#0e1011] text-[#eceae5]',
  cream: 'bg-[#eceae5] text-[#0e1011]',
  navy: 'bg-[#0e1011] text-[#eceae5]',
}

const heightMap: Record<SectionHeight, string> = {
  auto: '',
  screen: 'min-h-screen',
  half: 'min-h-[50vh]',
  tall: 'min-h-[75vh]',
}

export function Section({
  theme = 'void',
  height = 'auto',
  className = '',
  id,
  children,
}: SectionProps) {
  const classes = [themeMap[theme], heightMap[height], className]
    .filter(Boolean)
    .join(' ')

  return (
    <section id={id} className={classes}>
      {children}
    </section>
  )
}
