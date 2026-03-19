'use client'
import React, { useEffect, useRef } from 'react'

export function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number | null>(null)
  const sizeRef = useRef(24)
  const targetSizeRef = useRef(24)

  useEffect(() => {
    // Only on non-touch pointer devices
    const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!hasHover || prefersReduced) return

    const cursor = cursorRef.current
    if (!cursor) return

    cursor.style.display = 'block'

    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('[data-cursor="expand"]')) {
        targetSizeRef.current = 64
      } else if (target.closest('a, button, [role="button"]')) {
        targetSizeRef.current = 40
      } else {
        targetSizeRef.current = 24
      }
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const tick = () => {
      const lag = 0.12
      currentRef.current.x = lerp(currentRef.current.x, posRef.current.x, lag)
      currentRef.current.y = lerp(currentRef.current.y, posRef.current.y, lag)
      sizeRef.current = lerp(sizeRef.current, targetSizeRef.current, 0.15)

      if (cursor) {
        const half = sizeRef.current / 2
        cursor.style.transform = `translate(${currentRef.current.x - half}px, ${currentRef.current.y - half}px)`
        cursor.style.width = `${sizeRef.current}px`
        cursor.style.height = `${sizeRef.current}px`

        if (targetSizeRef.current === 64) {
          cursor.style.mixBlendMode = 'difference'
        } else {
          cursor.style.mixBlendMode = 'normal'
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      style={{
        display: 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        width: 24,
        height: 24,
        borderRadius: '50%',
        backgroundColor: 'rgba(236, 234, 229, 0.80)',
        pointerEvents: 'none',
        zIndex: 9997,
        willChange: 'transform, width, height',
      }}
      aria-hidden="true"
    />
  )
}
