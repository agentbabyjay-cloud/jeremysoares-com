'use client'

import { useEffect, useRef } from 'react'

interface SplitRevealProps {
  children: string
  /** Delay before first character starts (ms) */
  delay?: number
  /** Stagger between each character (ms) */
  stagger?: number
  className?: string
  style?: React.CSSProperties
  as?: keyof React.JSX.IntrinsicElements
}

/**
 * Splits text into individual characters.
 * Each char slides up from below a clipped container on scroll-into-view.
 * Inspired by distrategy.plastic.design char-level reveals.
 */
export function SplitReveal({
  children,
  delay = 0,
  stagger = 38,
  className,
  style,
  as: Tag = 'span',
}: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const chars = el.querySelectorAll<HTMLElement>('[data-char]')

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        obs.disconnect()
        chars.forEach((ch, i) => {
          const t = delay + i * stagger
          setTimeout(() => {
            ch.style.transform = 'translateY(0)'
            ch.style.opacity = '1'
          }, t)
        })
      },
      { threshold: 0.4 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay, stagger])

  const DynTag = Tag as React.ElementType

  return (
    <DynTag ref={ref} className={className} style={{ display: 'inline', ...style }}>
      {children.split('').map((ch, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'bottom',
            lineHeight: 'inherit',
          }}
        >
          <span
            data-char
            style={{
              display: 'inline-block',
              transform: 'translateY(110%)',
              opacity: 0,
              transition: `transform 0.55s cubic-bezier(0.33,1,0.68,1), opacity 0.3s ease`,
              whiteSpace: 'pre',
            }}
          >
            {ch === ' ' ? '\u00a0' : ch}
          </span>
        </span>
      ))}
    </DynTag>
  )
}
