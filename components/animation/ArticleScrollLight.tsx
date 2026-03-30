'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Dims all prose blocks in [data-article-body] to 0.18 opacity,
 * then scrubs each element to full opacity as it passes through the
 * reading zone (center of the viewport), fading back out as it leaves.
 * Renders nothing — purely a scroll-driven side effect.
 */
export function ArticleScrollLight() {
  useEffect(() => {
    const article = document.querySelector('[data-article-body]')
    if (!article) return

    const elements = article.querySelectorAll<HTMLElement>('p, h2, h3, h4, li, blockquote')
    if (!elements.length) return

    // Dim everything to start
    gsap.set(elements, { opacity: 0.18 })

    const timelines: gsap.core.Timeline[] = []

    elements.forEach((el) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          end: 'top 12%',
          scrub: 0.5,
        },
      })
      // Bell curve: dim → bright at midpoint → dim
      tl.fromTo(el, { opacity: 0.18 }, { opacity: 1, ease: 'none', duration: 0.45 })
        .to(el, { opacity: 0.18, ease: 'none', duration: 0.55 })

      timelines.push(tl)
    })

    return () => {
      timelines.forEach((tl) => tl.scrollTrigger?.kill())
      gsap.set(elements, { clearProps: 'opacity' })
    }
  }, [])

  return null
}
