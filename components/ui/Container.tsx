import React from 'react'

type ContainerSize = 'sm' | 'md' | 'lg' | 'full'

interface ContainerProps {
  size?: ContainerSize
  padded?: boolean
  className?: string
  children: React.ReactNode
}

const sizeMap: Record<ContainerSize, string> = {
  sm: 'max-w-[960px]',
  md: 'max-w-[1280px]',
  lg: 'max-w-[1440px]',
  full: 'max-w-full',
}

export function Container({
  size = 'lg',
  padded = true,
  className = '',
  children,
}: ContainerProps) {
  const classes = [
    'mx-auto w-full',
    sizeMap[size],
    padded ? 'px-6 md:px-10 lg:px-16' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <div className={classes}>{children}</div>
}
