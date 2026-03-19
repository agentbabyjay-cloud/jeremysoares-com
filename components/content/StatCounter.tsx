'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface StatCounterProps {
  value: number
  suffix?: string
  label: string
  duration?: number
}

export function StatCounter({ value, suffix = '', label, duration = 2 }: StatCounterProps) {
  const countRef = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!countRef.current || hasAnimated) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    gsap.registerPlugin(ScrollTrigger)

    if (prefersReduced) {
      countRef.current.textContent = `${value}${suffix}`
      return
    }

    const obj = { val: 0 }

    gsap.to(obj, {
      val: value,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: countRef.current,
        start: 'top 90%',
        once: true,
      },
      onUpdate: () => {
        if (countRef.current) {
          countRef.current.textContent = `${Math.round(obj.val).toLocaleString()}${suffix}`
        }
      },
      onComplete: () => setHasAnimated(true),
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === countRef.current) t.kill()
      })
    }
  }, [value, suffix, duration, hasAnimated])

  return (
    <div className="text-center">
      <span
        ref={countRef}
        className="block text-[clamp(3rem,6vw,5rem)] font-bold leading-none tracking-tight text-[#eceae5] font-['avenir-next-lt-pro-condensed','Avenir_Next_Condensed',sans-serif]"
      >
        0{suffix}
      </span>
      <p className="text-[0.625rem] tracking-[0.22em] uppercase text-[#eceae5] opacity-40 mt-3">
        {label}
      </p>
    </div>
  )
}
