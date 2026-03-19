'use client'
import React, { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'

export function PageTransitionOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const isFirst = useRef(true)

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false
      return
    }

    const overlay = overlayRef.current
    if (!overlay) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const tl = gsap.timeline()

    tl.set(overlay, { scaleX: 0, transformOrigin: 'left center' })
    tl.to(overlay, {
      scaleX: 1,
      duration: 0.55,
      ease: 'expo.inOut',
    })
    tl.to({}, { duration: 0.1 })
    tl.to(overlay, {
      scaleX: 0,
      duration: 0.55,
      ease: 'expo.inOut',
      transformOrigin: 'right center',
    })

    return () => {
      tl.kill()
    }
  }, [pathname])

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#eceae5',
        zIndex: 9998,
        pointerEvents: 'none',
        transform: 'scaleX(0)',
        transformOrigin: 'left center',
      }}
      aria-hidden="true"
    />
  )
}
