'use client'
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { gsap } from 'gsap'

interface PreloaderContextValue {
  loaded: boolean
}

const PreloaderContext = createContext<PreloaderContextValue>({ loaded: false })

export function usePreloader() {
  return useContext(PreloaderContext)
}

const CHARS = 'SOARES'.split('')

interface PreloaderProps {
  children?: React.ReactNode
}

export function Preloader({ children }: PreloaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const charRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const alreadyLoaded = sessionStorage.getItem('preloader-done') === '1'

    if (prefersReduced || alreadyLoaded) {
      setLoaded(true)
      if (overlayRef.current) overlayRef.current.style.display = 'none'
      return
    }

    const overlay = overlayRef.current
    const chars = charRefs.current.filter(Boolean) as HTMLSpanElement[]
    if (!overlay || !chars.length) return

    // Pause Lenis if available
    const lenisEvent = new CustomEvent('preloader:start')
    window.dispatchEvent(lenisEvent)

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('preloader-done', '1')
        setLoaded(true)
        // Resume Lenis
        window.dispatchEvent(new CustomEvent('preloader:done'))
      },
    })

    // Initial state — chars below
    gsap.set(chars, { y: '105%' })
    gsap.set(overlay, { opacity: 1 })

    // 1. SOARES rises char-by-char
    tl.to(chars, {
      y: '0%',
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.06,
    })
    // 2. Hold
    .to({}, { duration: 0.6 })
    // 3. Chars exit upward
    .to(chars, {
      y: '-110%',
      duration: 0.7,
      ease: 'power3.in',
      stagger: 0.04,
    })
    // 4. Overlay fades out
    .to(overlay, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut',
      onComplete: () => {
        overlay.style.display = 'none'
      },
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <PreloaderContext.Provider value={{ loaded }}>
      {children}
      <div
        ref={overlayRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          backgroundColor: '#0e1011',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        <div style={{ overflow: 'hidden', display: 'flex' }}>
          {CHARS.map((char, i) => (
            <span
              key={i}
              ref={(el) => { charRefs.current[i] = el }}
              style={{
                display: 'inline-block',
                fontFamily: "var(--font-barlow), 'Barlow', sans-serif",
                fontSize: 'clamp(4rem, 12vw, 10rem)',
                fontWeight: 900,
                letterSpacing: '0.15em',
                color: '#eceae5',
                textTransform: 'uppercase',
                transform: 'translateY(105%)',
                lineHeight: 1,
              }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
    </PreloaderContext.Provider>
  )
}
