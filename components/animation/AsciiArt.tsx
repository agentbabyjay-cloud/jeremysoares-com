'use client'

import { useEffect, useRef } from 'react'

const CHARS = ' .,:;-=+*#%@'

interface AsciiArtProps {
  src: string
  /** Character columns (width resolution) */
  cols?: number
  /** Character rows (height resolution) */
  rows?: number
  color?: string
  opacity?: number
  className?: string
  style?: React.CSSProperties
}

/**
 * Renders an image as ASCII art using canvas pixel sampling.
 * Characters fade in left-to-right on scroll-into-view.
 */
export function AsciiArt({
  src,
  cols = 110,
  rows = 52,
  color = '#eceae5',
  opacity = 0.1,
  className,
  style,
}: AsciiArtProps) {
  const preRef = useRef<HTMLPreElement>(null)

  useEffect(() => {
    const pre = preRef.current
    if (!pre) return

    const img = new window.Image()
    img.src = src

    img.onload = () => {
      // Sample the image into a cols×rows grid
      const canvas = document.createElement('canvas')
      canvas.width = cols
      canvas.height = rows
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.drawImage(img, 0, 0, cols, rows)
      const { data } = ctx.getImageData(0, 0, cols, rows)

      const lines: string[] = []
      for (let y = 0; y < rows; y++) {
        let line = ''
        for (let x = 0; x < cols; x++) {
          const idx = (y * cols + x) * 4
          const r = data[idx], g = data[idx + 1], b = data[idx + 2]
          // Perceived brightness (Rec. 709)
          const bright = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 255
          line += CHARS[Math.floor(bright * (CHARS.length - 1))]
        }
        lines.push(line)
      }

      // Render chars — each line as a <span> that fades in with a stagger
      pre.innerHTML = ''
      lines.forEach((line, li) => {
        const span = document.createElement('span')
        span.style.cssText = `display:block;opacity:0;transition:opacity 0.6s ease ${li * 18}ms`
        span.textContent = line
        pre.appendChild(span)
      })

      // Trigger on scroll-into-view
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return
          obs.disconnect()
          pre.querySelectorAll<HTMLElement>('span').forEach(s => {
            s.style.opacity = '1'
          })
        },
        { threshold: 0.1 }
      )
      obs.observe(pre)
    }
  }, [src, cols, rows])

  return (
    <pre
      ref={preRef}
      className={className}
      aria-hidden
      style={{
        fontFamily: '"Courier New", Courier, monospace',
        fontSize: 'clamp(4px, 0.55vw, 7.5px)',
        lineHeight: 1.15,
        letterSpacing: '0.04em',
        color,
        opacity,
        userSelect: 'none',
        whiteSpace: 'pre',
        overflow: 'hidden',
        pointerEvents: 'none',
        margin: 0,
        ...style,
      }}
    />
  )
}
