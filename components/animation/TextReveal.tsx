'use client'
import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { EASE, DUR } from '@/lib/motion'

type RevealAs = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
type SplitMode = 'chars' | 'words' | 'lines'

interface TextRevealProps {
  children: string
  as?: RevealAs
  split?: SplitMode
  delay?: number
  duration?: number
  stagger?: number
  immediate?: boolean
  start?: string
  className?: string
  style?: React.CSSProperties
}

function splitText(text: string, mode: SplitMode): string[] {
  if (mode === 'chars') return text.split('')
  if (mode === 'words') return text.split(' ')
  return [text]
}

export function TextReveal({
  children,
  as: Tag = 'p',
  split = 'lines',
  delay = 0,
  duration = DUR.slow,
  stagger,
  immediate = false,
  start = 'top 88%',
  className = '',
  style: externalStyle,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement | null>(null)
  const prefersReduced =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  const defaultStagger = stagger ?? (split === 'chars' ? 0.02 : 0.07)

  const units = splitText(children, split)

  useEffect(() => {
    if (prefersReduced) return
    if (!containerRef.current) return

    gsap.registerPlugin(ScrollTrigger)

    const innerSpans = containerRef.current.querySelectorAll<HTMLElement>('.tr-inner')
    if (!innerSpans.length) return

    const animProps = {
      y: '0%',
      duration,
      delay,
      ease: EASE.outQuart,
      stagger: defaultStagger,
    }

    if (immediate) {
      gsap.fromTo(
        innerSpans,
        { y: '105%' },
        animProps
      )
    } else {
      gsap.fromTo(
        innerSpans,
        { y: '105%' },
        {
          ...animProps,
          scrollTrigger: {
            trigger: containerRef.current,
            start,
          },
        }
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === containerRef.current) t.kill()
      })
    }
  }, [children, duration, delay, defaultStagger, immediate, start, prefersReduced])

  const style: React.CSSProperties = { display: 'inline-block', overflow: 'hidden' }
  const innerStyle: React.CSSProperties = prefersReduced
    ? { display: 'inline-block' }
    : { display: 'inline-block', transform: 'translateY(105%)' }

  if (split === 'chars') {
    return (
      <Tag ref={containerRef as React.RefObject<never>} className={className} style={externalStyle}>
        {units.map((char, i) => (
          <span key={i} style={style}>
            <span className="tr-inner" style={innerStyle}>
              {char === ' ' ? '\u00a0' : char}
            </span>
          </span>
        ))}
      </Tag>
    )
  }

  if (split === 'words') {
    return (
      <Tag ref={containerRef as React.RefObject<never>} className={className} style={externalStyle}>
        {units.map((word, i) => (
          <React.Fragment key={i}>
            <span style={style}>
              <span className="tr-inner" style={innerStyle}>
                {word}
              </span>
            </span>
            {i < units.length - 1 && '\u00a0'}
          </React.Fragment>
        ))}
      </Tag>
    )
  }

  // lines mode — treat entire children as one line
  return (
    <Tag ref={containerRef as React.RefObject<never>} className={className} style={{ overflow: 'hidden', ...externalStyle }}>
      <span className="tr-inner" style={innerStyle}>
        {children}
      </span>
    </Tag>
  )
}
