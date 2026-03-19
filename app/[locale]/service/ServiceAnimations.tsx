'use client'

import { useEffect } from 'react'

export default function ServiceAnimations() {
  useEffect(() => {
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger)

        // Section header reveal
        gsap.utils.toArray<HTMLElement>('.js-service-header').forEach((el) => {
          gsap.from(el, {
            y: 32,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          })
        })

        // Service rows stagger from left
        gsap.utils.toArray<HTMLElement>('.js-service-row').forEach((el, i) => {
          gsap.from(el, {
            x: -40,
            opacity: 0,
            duration: 0.7,
            delay: i * 0.06,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          })
        })
      }
    )
  }, [])

  return null
}
