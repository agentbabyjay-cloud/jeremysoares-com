'use client'

import { useEffect } from 'react'

export default function BlogAnimations() {
  useEffect(() => {
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger)

        // Section header reveal
        gsap.utils.toArray<HTMLElement>('.js-blog-header').forEach((el) => {
          gsap.from(el, {
            y: 32,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          })
        })

        // Blog post articles stagger fade-up
        gsap.utils.toArray<HTMLElement>('.js-blog-post').forEach((el, i) => {
          gsap.from(el, {
            y: 40,
            opacity: 0,
            duration: 0.7,
            delay: i * 0.08,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          })
        })
      }
    )
  }, [])

  return null
}
