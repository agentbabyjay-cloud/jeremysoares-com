'use client'
import { useEffect } from 'react'

export function useAnimations() {
  useEffect(() => {
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger)

        // ── PAGE LOADER ──────────────────────────────────────
        // 1. Slide the "SOARES" text up into view
        // 2. Hold for a beat
        // 3. Fade the whole loader out
        const loader = document.getElementById('pageloader')
        const loaderHeading = loader?.querySelector('.pageloader-heading')
        if (loader && loaderHeading) {
          const tl = gsap.timeline()
          tl.to(loaderHeading, {
            y: '0%',
            duration: 0.9,
            ease: 'power3.out',
          })
          .to(loaderHeading, {
            y: '-110%',
            duration: 0.7,
            delay: 0.5,
            ease: 'power3.in',
          })
          .to(loader, {
            opacity: 0,
            duration: 0.4,
            ease: 'power2.inOut',
            onComplete: () => {
              loader.style.display = 'none'
            },
          })
        }

        // ── HERO TEXT CLIP REVEAL ────────────────────────────
        gsap.utils.toArray<HTMLElement>('.js-animate-up').forEach((el, i) => {
          const parent = el.closest('.overflow-hidden')
          if (parent) {
            gsap.from(el, {
              y: '105%',
              duration: 0.9,
              delay: 0.3 + i * 0.08,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: parent,
                start: 'top 90%',
              },
            })
          }
        })

        // ── FADE UP ──────────────────────────────────────────
        gsap.utils.toArray<HTMLElement>('.js-fade-up').forEach((el) => {
          gsap.from(el, {
            y: 20,
            opacity: 0,
            duration: 0.7,
            delay: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
            },
          })
        })

        // ── SOLD GRID ITEMS ──────────────────────────────────
        gsap.utils.toArray<HTMLElement>('.sold-grid-item').forEach((el, i) => {
          gsap.from(el, {
            y: 40,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 92%',
            },
          })
        })
      }
    )
  }, [])
}

export function useMobileMenu() {
  useEffect(() => {
    const toggle = document.getElementById('menu-toggle')
    const menu = document.getElementById('mobile-menu')
    const body = document.body

    if (!toggle || !menu) return

    const handleToggle = (e: Event) => {
      e.preventDefault()
      const isOpen = menu.classList.contains('is-open')
      if (isOpen) {
        menu.classList.remove('is-open')
        body.classList.remove('menu-is-open')
        body.style.overflow = ''
      } else {
        menu.classList.add('is-open')
        body.classList.add('menu-is-open')
        body.style.overflow = 'hidden'
      }
    }

    toggle.addEventListener('click', handleToggle)

    // Close on nav item click
    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menu.classList.remove('is-open')
        body.classList.remove('menu-is-open')
        body.style.overflow = ''
      })
    })

    return () => {
      toggle.removeEventListener('click', handleToggle)
    }
  }, [])
}
