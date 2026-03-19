'use client'
import React from 'react'

type ButtonVariant = 'primary' | 'ghost' | 'link'
type ButtonTheme = 'light' | 'dark'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  variant?: ButtonVariant
  theme?: ButtonTheme
  size?: ButtonSize
  href?: string
  external?: boolean
  onClick?: () => void
  children: React.ReactNode
  className?: string
}

const sizeMap: Record<ButtonSize, string> = {
  sm: 'px-5 py-2 text-[0.75rem]',
  md: 'px-8 py-3 text-[0.875rem]',
  lg: 'px-10 py-4 text-[1rem]',
}

export function Button({
  variant = 'primary',
  theme = 'dark',
  size = 'md',
  href,
  external = false,
  onClick,
  children,
  className = '',
}: ButtonProps) {
  const baseClasses = [
    'inline-flex items-center justify-center',
    'font-bold tracking-[0.1em] uppercase',
    "font-['avenir-next-lt-pro-condensed','Avenir_Next_Condensed',sans-serif]",
    'cursor-pointer transition-all duration-300',
    'rounded-none',
  ]

  const variantClasses: Record<ButtonVariant, Record<ButtonTheme, string>> = {
    primary: {
      dark: 'bg-[#eceae5] text-[#0e1011] hover:bg-[#d8d4cb]',
      light: 'bg-[#0e1011] text-[#eceae5] hover:bg-[#1a1d1f]',
    },
    ghost: {
      dark: 'border border-[#eceae5] text-[#eceae5] hover:bg-[rgba(236,234,229,0.08)]',
      light: 'border border-[#0e1011] text-[#0e1011] hover:bg-[rgba(14,16,17,0.06)]',
    },
    link: {
      dark: 'text-[#eceae5] relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#eceae5] after:transition-all after:duration-300 hover:after:w-full',
      light: 'text-[#0e1011] relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#0e1011] after:transition-all after:duration-300 hover:after:w-full',
    },
  }

  const classes = [
    ...baseClasses,
    sizeMap[size],
    variantClasses[variant][theme],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  )
}
