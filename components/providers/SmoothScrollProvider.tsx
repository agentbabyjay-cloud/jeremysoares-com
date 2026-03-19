'use client'
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

type LenisInstance = import('lenis').default

interface SmoothScrollContextValue {
  lenis: LenisInstance | null
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({ lenis: null })

export function useLenis() {
  return useContext(SmoothScrollContext)
}

interface SmoothScrollProviderProps {
  children: React.ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const [lenis, setLenis] = useState<LenisInstance | null>(null)
  const lenisRef = useRef<LenisInstance | null>(null)

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    if (isMobile) return

    let stopped = false

    async function init() {
      const { default: Lenis } = await import('lenis')
      gsap.registerPlugin(ScrollTrigger)

      if (stopped) return

      const instance = new Lenis()
      lenisRef.current = instance
      setLenis(instance)

      gsap.ticker.lagSmoothing(0)

      const tick = (time: number) => {
        instance.raf(time * 1000)
      }
      gsap.ticker.add(tick)

      instance.on('scroll', () => ScrollTrigger.update())

      // Pause/resume on preloader events
      const onStart = () => instance.stop()
      const onDone = () => instance.start()
      window.addEventListener('preloader:start', onStart)
      window.addEventListener('preloader:done', onDone)

      return () => {
        gsap.ticker.remove(tick)
        window.removeEventListener('preloader:start', onStart)
        window.removeEventListener('preloader:done', onDone)
        instance.destroy()
        lenisRef.current = null
      }
    }

    let cleanup: (() => void) | undefined

    init().then((fn) => {
      cleanup = fn
    })

    return () => {
      stopped = true
      cleanup?.()
    }
  }, [])

  return (
    <SmoothScrollContext.Provider value={{ lenis }}>
      {children}
    </SmoothScrollContext.Provider>
  )
}
