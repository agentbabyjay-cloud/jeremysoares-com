'use client'
import React from 'react'

type TextSize =
  | 'xs'
  | 'sm'
  | 'base'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | 'display'
  | 'giant'

type TextWeight = 'light' | 'regular' | 'bold' | 'black'
type TextTracking = 'tight' | 'normal' | 'wide' | 'widest'
type TextLeading = 'display' | 'heading' | 'body'
type TextColor = 'cream' | 'void' | 'muted' | 'gold'
type TextAs = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'

interface TextProps {
  as?: TextAs
  size?: TextSize
  weight?: TextWeight
  tracking?: TextTracking
  leading?: TextLeading
  color?: TextColor
  uppercase?: boolean
  className?: string
  children: React.ReactNode
}

const sizeMap: Record<TextSize, string> = {
  xs: 'text-[0.625rem]',
  sm: 'text-[0.75rem]',
  base: 'text-[1rem]',
  lg: 'text-[1.25rem]',
  xl: 'text-[1.5rem]',
  '2xl': 'text-[2rem]',
  '3xl': 'text-[2.75rem]',
  '4xl': 'text-[3.75rem]',
  '5xl': 'text-[clamp(4rem,7vw,7rem)]',
  display: 'text-[clamp(5rem,10vw,11rem)]',
  giant: 'text-[clamp(7rem,16vw,18rem)]',
}

const weightMap: Record<TextWeight, string> = {
  light: 'font-light',
  regular: 'font-normal',
  bold: 'font-bold',
  black: 'font-black',
}

const trackingMap: Record<TextTracking, string> = {
  tight: 'tracking-tight',
  normal: 'tracking-normal',
  wide: 'tracking-wide',
  widest: 'tracking-widest',
}

const leadingMap: Record<TextLeading, string> = {
  display: 'leading-none',
  heading: 'leading-tight',
  body: 'leading-relaxed',
}

const colorMap: Record<TextColor, string> = {
  cream: 'text-[#eceae5]',
  void: 'text-[#0e1011]',
  muted: 'text-[rgba(236,234,229,0.4)]',
  gold: 'text-[#c9a84c]',
}

const displaySizes: TextSize[] = ['5xl', 'display', 'giant']
const headingSizes: TextSize[] = ['2xl', '3xl', '4xl']

export function Text({
  as: Tag = 'p',
  size = 'base',
  weight = 'regular',
  tracking = 'normal',
  leading = 'body',
  color = 'cream',
  uppercase = false,
  className = '',
  children,
}: TextProps) {
  const isDisplay = displaySizes.includes(size)
  const isHeading = headingSizes.includes(size)
  const fontFamily =
    isDisplay || isHeading
      ? "font-['avenir-next-lt-pro-condensed','Avenir_Next_Condensed',sans-serif]"
      : "font-['dm-sans','DM_Sans',system-ui,sans-serif]"

  const classes = [
    sizeMap[size],
    weightMap[weight],
    trackingMap[tracking],
    leadingMap[leading],
    colorMap[color],
    fontFamily,
    uppercase ? 'uppercase' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <Tag className={classes}>{children}</Tag>
}
