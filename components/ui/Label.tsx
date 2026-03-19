import React from 'react'

type LabelTheme = 'light' | 'dark'

interface LabelProps {
  children: React.ReactNode
  theme?: LabelTheme
  className?: string
}

export function Label({ children, theme = 'dark', className = '' }: LabelProps) {
  const color = theme === 'dark' ? 'text-[#eceae5]' : 'text-[#0e1011]'

  return (
    <span
      className={[
        'text-[0.625rem] tracking-[0.22em] uppercase opacity-40',
        color,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  )
}
