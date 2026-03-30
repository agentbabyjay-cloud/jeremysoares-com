'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'

const CHARS = '.:-=+*#@!?%&~<>'

interface ScrambleTextProps {
  text: string
  /** 'hover' — scrambles when mouse enters. 'inview' — scrambles once when scrolled into view. */
  trigger?: 'hover' | 'inview'
  /** Duration of the full scramble-to-resolve animation in ms */
  duration?: number
  className?: string
  style?: React.CSSProperties
  as?: keyof React.JSX.IntrinsicElements
}

export function ScrambleText({
  text,
  trigger = 'hover',
  duration = 700,
  className,
  style,
  as: Tag = 'span',
}: ScrambleTextProps) {
  const [display, setDisplay] = useState(text)
  const frameRef = useRef<number>(0)
  const startRef = useRef<number>(0)
  const elRef = useRef<HTMLElement>(null)

  const scramble = useCallback(() => {
    cancelAnimationFrame(frameRef.current)
    startRef.current = 0

    const step = (ts: number) => {
      if (!startRef.current) startRef.current = ts
      const elapsed = ts - startRef.current
      const revealed = Math.min(
        Math.floor((elapsed / duration) * text.length),
        text.length
      )

      const chars = text.split('').map((ch, i) => {
        if (ch === ' ' || ch === '\n') return ch
        if (i < revealed) return ch
        return CHARS[Math.floor(Math.random() * CHARS.length)]
      })
      setDisplay(chars.join(''))

      if (revealed < text.length) {
        frameRef.current = requestAnimationFrame(step)
      }
    }

    frameRef.current = requestAnimationFrame(step)
  }, [text, duration])

  // Inview: trigger once when element enters viewport
  useEffect(() => {
    if (trigger !== 'inview') return
    const el = elRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          scramble()
          obs.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [trigger, scramble])

  // Cleanup on unmount
  useEffect(() => () => cancelAnimationFrame(frameRef.current), [])

  const DynTag = Tag as React.ElementType

  return (
    <DynTag
      ref={elRef}
      className={className}
      style={{ ...style, fontVariantNumeric: 'tabular-nums', letterSpacing: 'inherit' }}
      onMouseEnter={trigger === 'hover' ? scramble : undefined}
    >
      {display}
    </DynTag>
  )
}
