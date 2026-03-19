'use client'
/**
 * @deprecated Replaced by lib/useGSAP + components/animation/*
 * Kept as a shim so page.tsx imports don't break during Phase 0.
 * Remove when page content is migrated to new animation components.
 */
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useAnimations() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

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

    // ── PARALLAX IMAGES ──────────────────────────────────
    gsap.utils.toArray<HTMLElement>('.image-cover-parallax').forEach((img) => {
      gsap.to(img, {
        y: '8%',
        ease: 'none',
        scrollTrigger: {
          trigger: img.closest('.home-services-item-image') || img,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })
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
