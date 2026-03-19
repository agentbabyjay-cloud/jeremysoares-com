'use client'
import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { EASE, DUR } from '@/lib/motion'

interface SectionRevealProps {
  children: React.ReactNode
  delay?: number
  y?: number
  opacity?: boolean
  start?: string
  className?: string
}

export function SectionReveal({
  children,
  delay = 0,
  y = 32,
  opacity = true,
  start = 'top 85%',
  className = '',
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return
    if (!ref.current) return

    gsap.registerPlugin(ScrollTrigger)

    gsap.from(ref.current, {
      y,
      opacity: opacity ? 0 : 1,
      duration: DUR.medium,
      delay,
      ease: EASE.outQuad,
      scrollTrigger: {
        trigger: ref.current,
        start,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === ref.current) t.kill()
      })
    }
  }, [delay, y, opacity, start])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
