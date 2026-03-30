'use client'

import { useEffect, useRef, useCallback } from 'react'

const DENSITY = ' .,:;-=+*?%S#@'
const SCRAMBLE = '.-:=+*#@!?%&~<>$/'

function lerp(a: number, b: number, t: number) { return a + (b - a) * t }
function hexToRgb(hex: string): [number, number, number] {
  return [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)]
}
function lerpColor(c1: string, c2: string, t: number) {
  const [r1, g1, b1] = hexToRgb(c1)
  const [r2, g2, b2] = hexToRgb(c2)
  return `rgb(${Math.round(lerp(r1, r2, t))},${Math.round(lerp(g1, g2, t))},${Math.round(lerp(b1, b2, t))})`
}

interface AsciiScrambleProps {
  src: string
  cols?: number
  rows?: number
  color?: string
  highlightColor?: string
  /** Base opacity for non-hovered characters (0–1) */
  baseOpacity?: number
  /** Radius in px around cursor where scramble + color effect applies */
  radius?: number
  invertBrightness?: boolean
  /** Fraction of image height to skip from the top (0–1) */
  cropTop?: number
  /** Fraction of image height to skip from the bottom (0–1) */
  cropBottom?: number
  className?: string
  style?: React.CSSProperties
}

/**
 * Canvas-based interactive ASCII art.
 * Characters near the mouse cursor scramble and shift toward highlightColor.
 * The effect falls off smoothly with distance.
 */
export function AsciiScramble({
  src,
  cols = 130,
  rows = 56,
  color = '#eceae5',
  highlightColor = '#f55f00',
  baseOpacity = 0.2,
  radius = 130,
  invertBrightness = true,
  cropTop = 0,
  cropBottom = 0,
  className,
  style,
}: AsciiScrambleProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const charsRef = useRef<string[]>([])
  const mouseRef = useRef({ x: -99999, y: -99999 })
  const smoothRef = useRef({ x: -99999, y: -99999 })
  const rafRef = useRef(0)
  const metricsRef = useRef({ charW: 0, charH: 0, fs: 0 })

  const applySize = useCallback(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const dpr = window.devicePixelRatio || 1
    const cssW = wrap.clientWidth
    const cssH = wrap.clientHeight
    // Fit characters into both dimensions — use whichever axis is more constrained
    const charW = cssW / cols
    const charH = cssH > 0 ? cssH / rows : charW / 0.6 * 1.2
    const fs = charH / 1.2
    metricsRef.current = { charW, charH, fs }
    canvas.width = Math.round(cssW * dpr)
    canvas.height = Math.round(cssH > 0 ? cssH * dpr : charH * rows * dpr)
    canvas.style.width = `${cssW}px`
    canvas.style.height = cssH > 0 ? `${cssH}px` : `${charH * rows}px`
  }, [cols, rows])

  const startLoop = useCallback(() => {
    cancelAnimationFrame(rafRef.current)

    const tick = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const { charW, charH, fs } = metricsRef.current
      const chars = charsRef.current
      if (!fs || !chars.length) { rafRef.current = requestAnimationFrame(tick); return }

      const dpr = window.devicePixelRatio || 1
      // Smooth mouse — gentle lag without being sluggish
      const LERP = 0.14
      smoothRef.current.x += (mouseRef.current.x - smoothRef.current.x) * LERP
      smoothRef.current.y += (mouseRef.current.y - smoothRef.current.y) * LERP
      const mx = smoothRef.current.x
      const my = smoothRef.current.y

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.save()
      ctx.scale(dpr, dpr)
      ctx.font = `${fs}px "Courier New", Courier, monospace`
      ctx.textBaseline = 'top'
      ctx.globalAlpha = 1

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const orig = chars[row * cols + col]
          if (!orig || orig === ' ') continue

          const cx = col * charW
          const cy = row * charH
          const ccx = cx + charW * 0.5
          const ccy = cy + charH * 0.5

          const dist = Math.sqrt((ccx - mx) ** 2 + (ccy - my) ** 2)
          const proximity = Math.max(0, 1 - dist / radius)

          // Alpha: dim for resting chars, full brightness for hovered
          const alpha = proximity > 0
            ? baseOpacity + (1 - baseOpacity) * Math.min(1, proximity * 3)
            : baseOpacity
          ctx.globalAlpha = alpha

          // Color: snap to orange aggressively in the affected zone
          const colorT = proximity > 0 ? Math.min(1, Math.pow(proximity, 0.4) * 2) : 0
          ctx.fillStyle = colorT > 0 ? lerpColor(color, highlightColor, Math.min(1, colorT)) : color

          const ch = proximity > 0.05
            ? SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)]
            : orig

          ctx.fillText(ch, cx, cy)
        }
      }

      ctx.restore()
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
  }, [cols, rows, color, highlightColor, radius])

  useEffect(() => {
    const img = new window.Image()
    img.src = src
    img.onload = () => {
      const off = document.createElement('canvas')
      off.width = cols
      off.height = rows
      const octx = off.getContext('2d')!
      const srcY = img.naturalHeight * cropTop
      const srcH = img.naturalHeight * (1 - cropTop - cropBottom)
      octx.drawImage(img, 0, srcY, img.naturalWidth, srcH, 0, 0, cols, rows)
      const { data } = octx.getImageData(0, 0, cols, rows)

      const chars: string[] = []
      for (let i = 0; i < rows * cols; i++) {
        const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2], a = data[i * 4 + 3]
        if (a < 20) { chars.push(' '); continue }
        const bright = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 255
        const t = invertBrightness ? 1 - bright : bright
        chars.push(DENSITY[Math.max(0, Math.min(DENSITY.length - 1, Math.floor(t * (DENSITY.length - 1))))])
      }
      charsRef.current = chars
      applySize()
      startLoop()
    }
    return () => cancelAnimationFrame(rafRef.current)
  }, [src, cols, rows, invertBrightness, applySize, startLoop])

  useEffect(() => {
    window.addEventListener('resize', applySize)
    return () => window.removeEventListener('resize', applySize)
  }, [applySize])

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{ userSelect: 'none', cursor: 'crosshair', lineHeight: 0, ...style }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
      }}
      onMouseLeave={() => { mouseRef.current = { x: -99999, y: -99999 } }}
    >
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%' }} />
    </div>
  )
}
