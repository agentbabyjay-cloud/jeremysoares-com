'use client'

import { use, useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/* ── Image sets for hero cycling ── */
const HERO_SETS = [
  [
    'https://cdn.prod.website-files.com/68ba28534a070e692e441089/68baf35dc28553a17f2d6d78_8-IMG_6610.jpg',
    'https://cdn.prod.website-files.com/68ba28534a070e692e441089/68bb1433116d7d6929d3342a_1-48912126-F1AA-4FAE-8511-3BF6A11A8D99-3483-00000108D3E4BAC8.jpg',
    'https://cdn.prod.website-files.com/68ba28534a070e692e441089/68ba5ef5db548016dd9a1ed9_old port.jpg',
    'https://cdn.prod.website-files.com/68ba28534a070e692e441089/68ba5ef402a2ead761e430cb_espace a loeur centre ville.jpg',
  ],
  [
    'https://cdn.prod.website-files.com/68ba28534a070e692e441089/68ba5ef471476cae93101dd4_Mockup.jpg',
    'https://cdn.prod.website-files.com/68ba28534a070e692e441089/68baf4f3abc4421a49d880e1_Screenshot 2025-09-05 at 8.44.57 AM.png',
    '/images/headshots/68ba5e4e80122c482c8397a9_Jeremy-Soares-Montreal-Realtor.webp',
    'https://cdn.prod.website-files.com/68ba28534a070e692e441089/68ba65353f6375253f22cf04_a9469e95-6544-4610-acf4-f1f58a1605ec.png',
  ],
]

/* ── Sold images (with city metadata for filtering) ── */
const SOLD_TILES = [
  { src: '/images/sold/68bb145e2a0cb00a93b87ea4_sold template 2025-13.png', city: 'mtl' },
  { src: '/images/sold/68bb145e55f3e2770f820520_sold template 2025-08.png', city: 'mtl' },
  { src: '/images/sold/68bb145e776d050d93a364c8_sold template 2025-02.png', city: 'van' },
  { src: '/images/sold/68bb145e7778d884a103ce78_sold template 2025-12.png', city: 'mtl' },
  { src: '/images/sold/68bb145e7f790635cac62e1d_sold template 2025-15.png', city: 'van' },
  { src: '/images/sold/68bb145eb12f941c4fda1c25_sold template 2025-04.png', city: 'mtl' },
  { src: '/images/sold/68bb145ec0d42c717de5d522_sold template 2025-06.png', city: 'mtl' },
  { src: '/images/sold/68bb145ecffbc57c718a99bc_sold template 2025-10.png', city: 'van' },
  { src: '/images/sold/68bc7b3aa8714105bb1b64ae_SOLDS TEMPLATE-14.png', city: 'mtl' },
  { src: '/images/sold/68ba2bf227d34e40571de5e2_SOLDS-13 2.jpg', city: 'mtl' },
  { src: '/images/sold/68ba2bf39335b05e6d614165_SOLDS-04 2.jpg', city: 'van' },
  { src: '/images/sold/68fae94629b92afc8b3f85b6_454 de la gauchetiere 808-01.png', city: 'mtl' },
  { src: '/images/sold/68ba2bf381b1995bf8e6a127_SOLDS TEMPLATE-01 copy.png', city: 'mtl' },
  { src: '/images/sold/68bb145ec0d42c717de5d522_sold template 2025-06-1.png', city: 'mtl' },
]

/* ── Project cards ── */
const PROJECTS = [
  { name: 'ALouerMTL.com', type: 'Rental Platform \u2014 Montreal', url: 'https://alouermtl.com', img: '/images/Project alouermtl/68eeccc553553fc8809febaf_ALOUERMTL.jpg' },
  { name: 'LePetitMatane.com', type: 'Development \u2014 Gasp\u00e9sie', url: 'https://lepetitmatane.com', img: '/images/Project alouermtl/68eeccc57fe5eef0deb8fab3_A LOUER MONTREAL.jpg' },
  { name: 'aimmo', type: 'AI Staging Platform', url: 'https://aimmo.ca', img: '/images/Project alouermtl/68eeccc5145dc9b2b7e043c1_ALOUERMTL.COM.jpg' },
  { name: 'AgentMTL.ca', type: 'Broker Directory \u2014 Montreal', url: 'https://agentmtl.ca', img: '/images/Project alouermtl/68eeccc58563b4ce7e867a40_PSD_4.jpg' },
  { name: 'ForSaleMTL.com', type: 'Listings Platform \u2014 Montreal', url: 'https://forsalemtl.com', img: '/images/brand/68eecd92a89fcbc80184bdc2_MAGAZINE.jpg' },
]

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = use(params)
  const isFr = locale === 'fr-ca'
  const heroRef = useRef<HTMLElement>(null)
  const soldGridRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [soldFilter, setSoldFilter] = useState<'all' | 'mtl' | 'van'>('all')
  const heroSetRef = useRef(0)
  const contactFormRef = useRef<HTMLFormElement>(null)

  /* ── GSAP Animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {

      /* Hero entrance (triggered after preloader completes — delay accounts for preloader) */
      const heroTl = gsap.timeline({ delay: 2.8 })
      heroTl
        .to('#mainNav', { y: 0, duration: 1, ease: 'power3.out' })
        .to('.hero-f1', { clipPath: 'inset(0% 0 0 0)', duration: 1.4, ease: 'power4.inOut' }, '-=0.6')
        .to('.hero-f1 img', { scale: 1, duration: 2.5, ease: 'power3.out' }, '-=1')
        .to('.hero-f2', { clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'power4.inOut' }, '-=1.6')
        .to('.hero-f2 img', { scale: 1, duration: 2.5, ease: 'power3.out' }, '-=0.8')
        .to('.hero-jeremy', { opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=1.2')
        .to('.hero-name span', { y: 0, duration: 0.8, stagger: 0.06, ease: 'power4.out' }, '-=0.5')
        .to('.hero-label', { opacity: 0.3, duration: 0.8, ease: 'power2.out' }, '-=0.8')
        .to('.hero-line', { scaleX: 1, duration: 0.8, ease: 'power3.inOut' }, '-=0.6')
        .to('.hero-f4', { clipPath: 'inset(0 0 0% 0)', duration: 1, ease: 'power4.inOut' }, '-=0.8')
        .to('.hero-f4 img', { scale: 1, duration: 1.8, ease: 'power3.out' }, '-=0.6')
        .to('.hero-f3', { clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: 'power4.inOut' }, '-=1')
        .to('.hero-f3 img', { scale: 1, duration: 2, ease: 'power3.out' }, '-=0.8')
        .to('.hero-subline', { opacity: 0.45, duration: 0.8, ease: 'power2.out' }, '-=1')
        .to('.hero-scroll', { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.4')

      /* Hero parallax on scroll */
      gsap.to('.hero-f1 img', { y: -80, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } })
      gsap.to('.hero-f2 img', { y: -50, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } })
      gsap.to('.hero-f3 img', { y: -30, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } })
      gsap.to('.hero-f4 img', { y: -40, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } })
      gsap.to('.hero-content', { y: -120, opacity: 0, scrollTrigger: { trigger: '.hero', start: 'top top', end: '60% top', scrub: 1 } })

      /* Cream section wipe reveals */
      document.querySelectorAll<HTMLElement>('.wipe').forEach(wipe => {
        gsap.to(wipe, {
          scaleY: 0,
          duration: 1.2,
          ease: 'power4.inOut',
          scrollTrigger: { trigger: wipe.parentElement!, start: 'top 70%', toggleActions: 'play none none reverse' },
        })
      })

      /* Split panel parallax */
      document.querySelectorAll<HTMLElement>('.split-panel img').forEach(img => {
        gsap.to(img, { y: -50, scrollTrigger: { trigger: img.parentElement!, start: 'top bottom', end: 'bottom top', scrub: 1 } })
      })

      /* About image clip reveal */
      gsap.to('.about-image', {
        clipPath: 'inset(0 0 0% 0)',
        duration: 1.6,
        ease: 'power4.inOut',
        scrollTrigger: { trigger: '.about-image', start: 'top 75%', toggleActions: 'play none none reverse' },
      })

      /* Art image clip reveal */
      gsap.to('.art-image', {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.6,
        ease: 'power4.inOut',
        scrollTrigger: { trigger: '.art-image', start: 'top 80%', toggleActions: 'play none none reverse' },
      })

      /* Sold mosaic stagger */
      ScrollTrigger.create({
        trigger: '.sold-mosaic',
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to('.sold-tile', { opacity: 1, scale: 1, duration: 0.55, stagger: { amount: 1.8, from: 'random' }, ease: 'power3.out' })
        },
      })

      /* Sold tile parallax */
      document.querySelectorAll<HTMLElement>('.sold-tile').forEach((t, i) => {
        gsap.to(t, {
          y: -(10 + (i % 5) * 8),
          scrollTrigger: { trigger: '.sold-mosaic', start: 'top bottom', end: 'bottom top', scrub: 1 },
        })
      })

      /* General reveals */
      document.querySelectorAll<HTMLElement>('.reveal').forEach(el => {
        gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 87%', toggleActions: 'play none none reverse' } })
      })
      document.querySelectorAll<HTMLElement>('.reveal-scale').forEach(el => {
        gsap.to(el, { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 87%', toggleActions: 'play none none reverse' } })
      })
      document.querySelectorAll<HTMLElement>('.reveal-left').forEach(el => {
        gsap.to(el, {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 87%', toggleActions: 'play none none reverse' },
        })
      })

      /* Carousel parallax */
      gsap.to('.carousel-track', {
        x: -200,
        scrollTrigger: { trigger: '.section-projects', start: 'top bottom', end: 'bottom top', scrub: 1 },
      })

      /* Stats counter */
      ScrollTrigger.create({
        trigger: '.stats-band',
        start: 'top 80%',
        once: true,
        onEnter: () => {
          document.querySelectorAll<HTMLElement>('.stat-number').forEach(el => {
            const text = el.textContent || ''
            const num = parseInt(text.replace(/[^0-9]/g, ''))
            const suffix = text.replace(/[0-9,]/g, '')
            const obj = { val: 0 }
            gsap.to(obj, {
              val: num,
              duration: 2,
              ease: 'power2.out',
              onUpdate: () => {
                el.textContent = Math.floor(obj.val).toLocaleString() + suffix
              },
            })
          })
        },
      })

      /* Contact watermark parallax */
      gsap.to('.contact-watermark', {
        y: -100,
        scrollTrigger: { trigger: '.section-contact', start: 'top bottom', end: 'bottom top', scrub: 1 },
      })

      /* Contact reveals */
      ScrollTrigger.create({
        trigger: '.section-contact',
        start: 'top 70%',
        once: true,
        onEnter: () => {
          gsap.to('.section-contact .reveal', { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' })
        },
      })
    })

    return () => ctx.revert()
  }, [])

  /* ── Hero image cycling ── */
  useEffect(() => {
    const interval = setInterval(() => {
      heroSetRef.current = (heroSetRef.current + 1) % HERO_SETS.length
      const set = HERO_SETS[heroSetRef.current]
      const ids = ['hf1', 'hf2', 'hf3', 'hf4']
      ids.forEach((id, i) => {
        const el = document.getElementById(id)
        if (!el) return
        const img = el.querySelector('img') as HTMLImageElement | null
        if (!img) return
        gsap.to(img, {
          opacity: 0,
          duration: 0.6,
          delay: i * 0.08,
          ease: 'power2.out',
          onComplete: () => {
            img.src = set[i]
            gsap.to(img, { opacity: 1, duration: 1.1, ease: 'power2.inOut' })
          },
        })
      })
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  /* ── Drag carousel ── */
  useEffect(() => {
    const track = carouselRef.current
    if (!track) return
    let isDown = false
    let startX = 0
    let scrollLeft = 0
    const wrap = track.parentElement!

    const onMouseDown = (e: MouseEvent) => {
      isDown = true
      track.style.transition = 'none'
      startX = e.pageX - track.offsetLeft
      scrollLeft = wrap.scrollLeft
    }
    const onMouseUp = () => { isDown = false }
    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - track.offsetLeft
      const walk = (x - startX) * 1.5
      wrap.scrollLeft = scrollLeft - walk
    }

    track.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mousemove', onMouseMove)

    return () => {
      track.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  /* ── Sold filter ── */
  const filteredSold = soldFilter === 'all' ? SOLD_TILES : SOLD_TILES.filter(t => t.city === soldFilter)

  const handleFilterSold = useCallback((filter: 'all' | 'mtl' | 'van') => {
    setSoldFilter(filter)
    // Re-animate tiles
    requestAnimationFrame(() => {
      gsap.fromTo('.sold-tile', { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.5, stagger: { amount: 0.8, from: 'random' }, ease: 'power3.out' })
    })
  }, [])

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="hero" ref={heroRef} style={{ height: '100svh', position: 'relative', display: 'flex', overflow: 'hidden' }}>
        {/* Fragment 1 — large left */}
        <div id="hf1" className="hero-fragment hero-f1" style={{ position: 'absolute', overflow: 'hidden', left: 0, top: 0, width: '42%', height: '100%', clipPath: 'inset(100% 0 0 0)' }}>
          <Image src={HERO_SETS[0][0]} alt="" fill sizes="42vw" style={{ objectFit: 'cover', transform: 'scale(1.15)', filter: 'brightness(0.6) contrast(1.05)' }} priority />
          <div style={{ content: '', position: 'absolute', top: 0, right: 0, width: '45%', height: '100%', background: 'linear-gradient(to left,var(--color-void),transparent)' }} />
        </div>

        {/* Fragment 2 — top right */}
        <div id="hf2" className="hero-fragment hero-f2" style={{ position: 'absolute', overflow: 'hidden', right: 0, top: 0, width: '35%', height: '55%', clipPath: 'inset(0 100% 0 0)' }}>
          <Image src={HERO_SETS[0][1]} alt="" fill sizes="35vw" style={{ objectFit: 'cover', transform: 'scale(1.15)', filter: 'brightness(0.55) contrast(1.1)' }} priority />
          <div style={{ position: 'absolute', top: 0, left: 0, width: '30%', height: '100%', background: 'linear-gradient(to right,var(--color-void),transparent)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%', background: 'linear-gradient(to top,var(--color-void),transparent)', zIndex: 1 }} />
        </div>

        {/* Fragment 3 — bottom right */}
        <div id="hf3" className="hero-fragment hero-f3" style={{ position: 'absolute', overflow: 'hidden', right: '8%', bottom: 0, width: '32%', height: '42%', clipPath: 'inset(100% 0 0 0)' }}>
          <Image src={HERO_SETS[0][2]} alt="" fill sizes="32vw" style={{ objectFit: 'cover', transform: 'scale(1.15)', filter: 'brightness(0.5) contrast(1.1)' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to bottom,var(--color-void),transparent)', zIndex: 1 }} />
        </div>

        {/* Fragment 4 — small center accent */}
        <div id="hf4" className="hero-fragment hero-f4" style={{ position: 'absolute', overflow: 'hidden', left: '48%', top: '12%', width: '14%', height: '25%', clipPath: 'inset(0 0 100% 0)' }}>
          <Image src={HERO_SETS[0][3]} alt="" fill sizes="14vw" style={{ objectFit: 'cover', transform: 'scale(1.15)', filter: 'brightness(0.45) contrast(1.1)' }} />
        </div>

        {/* Hero content */}
        <div className="hero-content" style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: 'clamp(3rem,8vw,10rem)', paddingTop: '80px' }}>
          <div className="hero-jeremy" style={{ fontFamily: "var(--font-dm-serif), 'DM Serif Display', serif", fontStyle: 'italic', fontSize: 'clamp(1rem,1.8vw,1.4rem)', letterSpacing: '0.08em', opacity: 0, marginBottom: '0.5rem', paddingLeft: '2ch', color: 'rgba(236,234,229,0.5)' }}>
            Jeremy
          </div>
          <div className="hero-label" style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0, marginBottom: '0.8rem' }}>
            ({isFr ? 'Montréal, QC' : 'Montreal, QC'})
          </div>
          <h1 className="hero-name" style={{ fontFamily: "var(--font-barlow), 'Barlow', sans-serif", fontWeight: 900, fontSize: 'clamp(4.5rem,9vw,10rem)', lineHeight: 0.88, letterSpacing: '0.06em', textTransform: 'uppercase', paddingLeft: '2ch', marginBottom: '1.5rem', overflow: 'hidden' }}>
            {'SOARES'.split('').map((c, i) => (
              <span key={i} style={{ display: 'inline-block', transform: 'translateY(110%)' }}>{c}</span>
            ))}
          </h1>
          <p className="hero-subline" style={{ fontFamily: "var(--font-dm-serif), 'DM Serif Display', serif", fontStyle: 'italic', fontSize: 'clamp(1.2rem,2vw,1.5rem)', opacity: 0, paddingLeft: '2ch' }}>
            {isFr ? "L'immobilier, raffiné." : 'Real estate, refined.'}
          </p>
        </div>

        <div className="hero-line" style={{ position: 'absolute', bottom: '30%', left: 'clamp(3rem,8vw,10rem)', width: '60px', height: '1px', background: 'var(--color-cream)', opacity: 0.15, transform: 'scaleX(0)', transformOrigin: 'left' }} />
        <div className="hero-scroll" style={{ position: 'absolute', bottom: '3rem', left: 'clamp(3rem,8vw,10rem)', display: 'flex', alignItems: 'center', gap: '1rem', opacity: 0 }}>
          <div style={{ width: '60px', height: '1px', background: 'rgba(236,234,229,0.15)' }} />
          <div style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.25 }}>SCROLL</div>
        </div>
      </section>

      {/* ═══ BUY / SELL / RENT (cream) ═══ */}
      <section className="section-bsr" style={{ background: 'var(--color-cream)', color: 'var(--color-void)', padding: 'clamp(6rem,10vw,8rem) 0', position: 'relative' }}>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(2rem,5vw,6rem)' }}>
          <div className="reveal" style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.3, marginBottom: '1.5rem' }}>(01)</div>
          <h2 className="reveal" style={{ fontFamily: "var(--font-barlow), 'Barlow', sans-serif", fontWeight: 900, fontSize: 'clamp(3rem,6vw,5.5rem)', lineHeight: 1, letterSpacing: 0, textTransform: 'uppercase', marginBottom: '4rem' }}>
            {isFr ? <>Que pouvons-nous<br />faire pour vous</> : <>What can we<br />do for you</>}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(14,16,17,0.08)' }} className="bsr-grid-responsive">
            {[
              { title: isFr ? 'Acheter' : 'Buy', desc: isFr ? "Trouver la bonne propriété. Analyse de marché, négociation et accompagnement de la première visite à la signature." : 'Find the right property. Market analysis, negotiation, and guidance from first visit to closing.' },
              { title: isFr ? 'Vendre' : 'Sell', desc: isFr ? "Positionner votre propriété. Prix stratégique, mise en scène professionnelle et marketing de marque." : 'Position your property. Strategic pricing, professional staging, and brand-level marketing.' },
              { title: isFr ? 'Louer' : 'Rent', desc: isFr ? "Location résidentielle ou commerciale. Filtrage, prix du marché, gestion de portefeuille." : 'Lease residential or commercial space. Screening, market pricing, portfolio management.' },
            ].map((card, i) => (
              <div key={i} className="reveal" style={{ background: 'var(--color-cream)', padding: 'clamp(2.5rem,4vw,4rem)', cursor: 'pointer', position: 'relative', transition: 'background 0.4s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-cream-dim)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-cream)')}
              >
                <h3 style={{ fontFamily: "var(--font-barlow), 'Barlow', sans-serif", fontWeight: 900, fontSize: 'clamp(2.5rem,4vw,3.5rem)', letterSpacing: '0.02em', textTransform: 'uppercase', marginBottom: '1rem', transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)' }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.7, opacity: 0.4, maxWidth: '300px' }}>{card.desc}</p>
                <span style={{ position: 'absolute', top: 'clamp(2.5rem,4vw,4rem)', right: 'clamp(2rem,3vw,3rem)', fontSize: '18px', opacity: 0.12 }}>&rarr;</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ RESIDENTIAL / COMMERCIAL SPLIT ═══ */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '70vh' }} className="section-split-responsive">
        {[
          { label: isFr ? 'Résidentiel' : 'Residential', title: isFr ? 'Résidentiel' : 'Residential', desc: isFr ? "Maisons, condos, plex — achat ou vente avec une stratégie sur mesure." : 'Homes, condos, plexes — buying or selling with a tailored strategy.', img: 'https://cdn.prod.website-files.com/68ba28534a070e692e441089/68baf35dc28553a17f2d6d78_8-IMG_6610.jpg' },
          { label: 'Commercial', title: 'Commercial', desc: isFr ? "Espaces de bureaux, commerces de détail, et projets mixtes." : 'Office space, retail, and mixed-use projects.', img: '/images/Commercial Real Estate/68ba5ef5db548016dd9a1ed9_old port.jpg' },
        ].map((panel, i) => (
          <div key={i} className="split-panel" style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
            <Image
              src={panel.img}
              alt={panel.title}
              fill
              sizes="50vw"
              style={{ objectFit: 'cover', filter: 'brightness(0.4) contrast(1.05)', transition: 'transform 1s cubic-bezier(0.16,1,0.3,1), filter 0.8s' }}
            />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(2rem,4vw,4rem)', zIndex: 2 }}>
              <div style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.3, marginBottom: '1rem', color: 'var(--color-cream)' }}>{panel.label}</div>
              <h3 style={{ fontFamily: "var(--font-barlow), 'Barlow', sans-serif", fontWeight: 900, fontSize: 'clamp(2rem,4vw,3.5rem)', letterSpacing: '0.02em', textTransform: 'uppercase', marginBottom: '0.5rem', color: 'var(--color-cream)' }}>{panel.title}</h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.4, maxWidth: '320px', lineHeight: 1.7, color: 'var(--color-cream)' }}>{panel.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ═══ PROJECTS CAROUSEL ═══ */}
      <section className="section-projects" style={{ background: 'var(--color-void)', padding: 'clamp(5rem,8vw,7rem) 0', borderTop: '1px solid rgba(236,234,229,0.06)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(2rem,5vw,6rem)', marginBottom: '2.5rem' }}>
          <div className="reveal" style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.3, marginBottom: '1.5rem' }}>(02) &mdash; {isFr ? 'Projets' : 'Projects'}</div>
          <h2 className="reveal" style={{ fontFamily: "var(--font-barlow), 'Barlow', sans-serif", fontWeight: 900, fontSize: 'clamp(3rem,6vw,5.5rem)', lineHeight: 1, letterSpacing: 0, textTransform: 'uppercase' }}>
            {isFr ? 'Bâti par nous' : 'Built by us'}
          </h2>
        </div>
        <div style={{ overflow: 'hidden', padding: '0 clamp(2rem,5vw,6rem)' }}>
          <div ref={carouselRef} className="carousel-track" style={{ display: 'flex', gap: '2rem', cursor: 'grab', userSelect: 'none' }}>
            {PROJECTS.map((p, i) => (
              <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" className="reveal" style={{ flex: '0 0 380px', cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>
                <div style={{ overflow: 'hidden', marginBottom: '1.2rem', aspectRatio: '16/10', background: 'rgba(236,234,229,0.03)' }}>
                  <Image src={p.img} alt={p.name} width={380} height={238} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.75)', transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1)' }} />
                </div>
                <h3 style={{ fontWeight: 800, fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.4rem', color: 'var(--color-cream)' }}>{p.name}</h3>
                <div style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.25, marginBottom: '0.6rem', color: 'var(--color-cream)' }}>{p.type}</div>
              </a>
            ))}
          </div>
        </div>
        <div className="reveal" style={{ padding: '1.5rem clamp(2rem,5vw,6rem) 0', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.2 }}>
          &larr; {isFr ? 'Glissez pour explorer' : 'Drag to explore'} &rarr;
        </div>
      </section>

      {/* ═══ SERVICES (cream) ═══ */}
      <section style={{ background: 'var(--color-cream)', color: 'var(--color-void)', padding: 'clamp(6rem,10vw,8rem) 0', position: 'relative' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(2rem,5vw,6rem)', position: 'relative', zIndex: 2 }}>
          <div className="reveal" style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.3, marginBottom: '1.5rem' }}>(03) &mdash; Services</div>
          <h2 className="reveal" style={{ fontFamily: "var(--font-barlow), 'Barlow', sans-serif", fontWeight: 900, fontSize: 'clamp(3rem,5vw,4.5rem)', lineHeight: 1, letterSpacing: 0, textTransform: 'uppercase', marginBottom: '3rem' }}>
            {isFr ? 'Service complet' : 'Full service'}
          </h2>
          <div style={{ borderTop: '1px solid rgba(14,16,17,0.08)' }}>
            {[
              { num: '01', title: isFr ? 'Conseil Préconstruction' : 'Pre-Construction Advisory', desc: isFr ? "Accès anticipé, analyse des plans, potentiel d'investissement." : 'Early access, floor plan analysis, investment potential.' },
              { num: '02', title: isFr ? 'Marketing Immobilier' : 'Property Marketing', desc: isFr ? "Photographie, mise en scène IA, publicités numériques, optimisation des annonces." : 'Photography, AI staging, digital ads, listing optimization.' },
              { num: '03', title: isFr ? "Stratégie d'Investissement" : 'Investment Strategy', desc: isFr ? "Évaluation du taux de capitalisation, analyse de portefeuille, recherche de transactions." : 'Cap rate evaluation, portfolio analysis, deal sourcing.' },
              { num: '04', title: isFr ? 'Location Commerciale' : 'Commercial Leasing', desc: isFr ? "Commerce de détail, bureaux, usage mixte. Conseil locataire et propriétaire." : 'Retail, office, mixed-use. Tenant and landlord advisory.' },
              { num: '05', title: isFr ? 'Services de Relocalisation' : 'Relocation Services', desc: isFr ? "Vancouver à Montréal. Support intermarché de bout en bout." : 'Vancouver to Montreal. End-to-end cross-market support.' },
            ].map((s, i) => (
              <div key={i} className="reveal" style={{ display: 'grid', gridTemplateColumns: '50px 1fr 1.2fr 30px', gap: '2rem', alignItems: 'center', padding: '2rem 0', borderBottom: '1px solid rgba(14,16,17,0.08)', cursor: 'pointer', transition: 'background 0.3s, padding-left 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(14,16,17,0.02)'; e.currentTarget.style.paddingLeft = '12px' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.paddingLeft = '0' }}
              >
                <span style={{ fontSize: '10px', letterSpacing: '0.18em', opacity: 0.2 }}>({s.num})</span>
                <h3 style={{ fontWeight: 800, fontSize: 'clamp(0.9rem,1.8vw,1.25rem)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{s.title}</h3>
                <p style={{ fontSize: '0.85rem', opacity: 0.35, lineHeight: 1.6 }} className="service-desc-responsive">{s.desc}</p>
                <span style={{ fontSize: '14px', opacity: 0.1 }}>&rarr;</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section style={{ background: 'var(--color-void)', padding: 'clamp(8rem,14vw,12rem) 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(2rem,5vw,6rem)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(3rem,6vw,8rem)', alignItems: 'center' }} className="about-grid-responsive">
          <div>
            <div className="reveal" style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.3, marginBottom: '2rem' }}>(04) &mdash; {isFr ? 'À Propos' : 'About'}</div>
            <h2 className="reveal" style={{ fontFamily: "var(--font-barlow), 'Barlow', sans-serif", fontWeight: 900, fontSize: 'clamp(2.5rem,5vw,4.5rem)', lineHeight: 1, letterSpacing: '0.02em', textTransform: 'uppercase', marginBottom: '2rem' }}>
              {isFr ? (
                <>Architecture<br />par formation.<br />Immobilier<br />par <em style={{ fontFamily: "var(--font-dm-serif), 'DM Serif Display', serif", fontStyle: 'italic', fontWeight: 400, fontSize: '0.9em', textTransform: 'none', letterSpacing: 0 }}>conviction.</em></>
              ) : (
                <>Architecture<br />by training.<br />Real estate<br />by <em style={{ fontFamily: "var(--font-dm-serif), 'DM Serif Display', serif", fontStyle: 'italic', fontWeight: 400, fontSize: '0.9em', textTransform: 'none', letterSpacing: 0 }}>conviction.</em></>
              )}
            </h2>
            <p className="reveal" style={{ fontSize: '1.05rem', lineHeight: 1.8, opacity: 0.4, maxWidth: '480px', marginBottom: '2rem' }}>
              {isFr
                ? "Une décennie entre Vancouver et Montréal. Architecture, pratique artistique, et plus de 50 domaines immobiliers. Un cabinet où la pensée design rencontre l'exécution immobilière."
                : 'A decade between Vancouver and Montreal. Architecture school, art practice, and over 50 real estate domains. A firm where design thinking meets real estate execution.'}
            </p>
            <Link href={`/${locale}/about`} className="reveal link-under" style={{ fontWeight: 700, fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-cream)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '12px', opacity: 0.45 }}>
              {isFr ? 'Parcours complet et historique' : 'Full story & timeline'} <span>&rarr;</span>
            </Link>
          </div>
          <div className="about-image" style={{ overflow: 'hidden', clipPath: 'inset(0 0 100% 0)' }}>
            <Image
              src="/images/headshots/68ba5e4e80122c482c8397a9_Jeremy-Soares-Montreal-Realtor.webp"
              alt="Jeremy Soares"
              width={600}
              height={800}
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', filter: 'brightness(0.8) contrast(1.05)' }}
            />
          </div>
        </div>
      </section>

      {/* ═══ SOLD MOSAIC ═══ */}
      <section className="section-sold" style={{ background: 'var(--color-void)', padding: 'clamp(5rem,8vw,7rem) 0', borderTop: '1px solid rgba(236,234,229,0.06)', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(2rem,5vw,6rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.3, marginBottom: '1rem' }}>(05) &mdash; {isFr ? 'Bilan' : 'Track Record'}</div>
            <h2 style={{ fontFamily: "var(--font-barlow), 'Barlow', sans-serif", fontWeight: 900, fontSize: 'clamp(2.5rem,5vw,4.5rem)', lineHeight: 1, letterSpacing: '0.02em', textTransform: 'uppercase' }}>
              {isFr ? (
                <>Vendu. Loué.<br /><em style={{ fontFamily: "var(--font-dm-serif), 'DM Serif Display', serif", fontStyle: 'italic', fontWeight: 400, fontSize: '0.9em', letterSpacing: 0, textTransform: 'none' }}>Livré.</em></>
              ) : (
                <>Sold. Leased.<br /><em style={{ fontFamily: "var(--font-dm-serif), 'DM Serif Display', serif", fontStyle: 'italic', fontWeight: 400, fontSize: '0.9em', letterSpacing: 0, textTransform: 'none' }}>Delivered.</em></>
              )}
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {(['all', 'mtl', 'van'] as const).map(f => (
              <button
                key={f}
                onClick={() => handleFilterSold(f)}
                style={{
                  fontWeight: 700, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase',
                  background: soldFilter === f ? 'var(--color-cream)' : 'transparent',
                  border: `1px solid ${soldFilter === f ? 'var(--color-cream)' : 'rgba(236,234,229,0.2)'}`,
                  color: soldFilter === f ? 'var(--color-void)' : 'var(--color-cream)',
                  padding: '8px 18px', cursor: 'pointer', transition: 'all 0.3s',
                  opacity: soldFilter === f ? 1 : 0.45,
                }}
              >
                {f === 'all' ? (isFr ? 'Tout' : 'All') : f === 'mtl' ? (isFr ? 'Montréal' : 'Montreal') : 'Vancouver'}
              </button>
            ))}
            <Link href={`/${locale}/real-estate`} style={{ fontWeight: 700, fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-cream)', textDecoration: 'none', opacity: 0.2 }}>
              {isFr ? 'Voir tout' : 'View all'} &rarr;
            </Link>
          </div>
        </div>
        <div ref={soldGridRef} className="sold-mosaic" style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(2rem,5vw,6rem)', display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
          {filteredSold.map((tile, i) => (
            <div key={`${soldFilter}-${i}`} className="sold-tile" style={{ aspectRatio: '1', overflow: 'hidden', position: 'relative', opacity: 0, transform: 'scale(0.85)' }}>
              <Image
                src={tile.src}
                alt={`Sold property ${i + 1}`}
                fill
                sizes="(max-width: 768px) 25vw, 14vw"
                style={{ objectFit: 'cover', transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)' }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ═══ TOOLS (cream) ═══ */}
      <section style={{ background: 'var(--color-cream)', color: 'var(--color-void)', padding: 'clamp(6rem,10vw,8rem) 0', position: 'relative' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(2rem,5vw,6rem)', position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 'clamp(3rem,6vw,6rem)', alignItems: 'center' }} className="tools-grid-responsive">
          <div>
            <div className="reveal" style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.3, marginBottom: '2rem' }}>(06) &mdash; {isFr ? 'Outils' : 'Tools'}</div>
            <h2 className="reveal" style={{ fontFamily: "var(--font-barlow), 'Barlow', sans-serif", fontWeight: 900, fontSize: 'clamp(2.5rem,4vw,4rem)', lineHeight: 1, letterSpacing: 0, textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              {isFr ? <>Bâti pour<br />l&apos;immobilier</> : <>Built for<br />real estate</>}
            </h2>
            <p className="reveal" style={{ fontSize: '1rem', lineHeight: 1.8, opacity: 0.45, marginBottom: '2rem' }}>
              {isFr
                ? "Les outils que nous aurions aimé avoir. Mise en scène IA, calculatrices, données de marché — gratuits sur tools.jeremysoares.com."
                : 'The tools we wished existed. AI staging, calculators, market data \u2014 free at tools.jeremysoares.com.'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[
                { label: 'aimmo \u2014 AI Virtual Staging', url: 'https://aimmo.ca' },
                { label: isFr ? 'Calculateur Hypothécaire' : 'Mortgage Calculator', url: 'https://tools.jeremysoares.com/mortgage' },
                { label: isFr ? 'Évaluation de Propriété' : 'Property Valuation', url: 'https://tools.jeremysoares.com/valuation' },
                { label: isFr ? "Guide de l'Acheteur" : "Buyer\u2019s Guide", url: 'https://tools.jeremysoares.com/buyer-guide' },
                { label: isFr ? 'Rapports de Marché' : 'Market Reports', url: 'https://tools.jeremysoares.com/reports' },
              ].map((tool, i) => (
                <a key={i} href={tool.url} target="_blank" rel="noopener noreferrer" className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: '1px solid rgba(14,16,17,0.08)', textDecoration: 'none', color: 'var(--color-void)', transition: 'padding-left 0.3s' }}
                  onMouseEnter={e => (e.currentTarget.style.paddingLeft = '8px')}
                  onMouseLeave={e => (e.currentTarget.style.paddingLeft = '0')}
                >
                  <span style={{ fontWeight: 700, fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.5 }}>{tool.label}</span>
                  <span style={{ fontSize: '14px', opacity: 0.15 }}>&rarr;</span>
                </a>
              ))}
            </div>
          </div>
          {/* Before/After compare images */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
            <div className="reveal-scale" style={{ overflow: 'hidden', position: 'relative' }}>
              <Image src="/images/ART/68ffd81b8713b52534974207_AdobeStock_200635254-p-2600.jpg" alt="Before staging" width={400} height={300} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: '12px', left: '12px', fontSize: '8px', letterSpacing: '0.18em', textTransform: 'uppercase', background: 'var(--color-void)', color: 'var(--color-cream)', padding: '4px 10px', fontWeight: 700 }}>Before</div>
            </div>
            <div className="reveal-scale" style={{ overflow: 'hidden', position: 'relative' }}>
              <Image src="/images/brand/68eecd92a89fcbc80184bdc2_MAGAZINE.jpg" alt="After staging" width={400} height={300} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: '12px', left: '12px', fontSize: '8px', letterSpacing: '0.18em', textTransform: 'uppercase', background: 'var(--color-void)', color: 'var(--color-cream)', padding: '4px 10px', fontWeight: 700 }}>After</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ART (slim banner) ═══ */}
      <section style={{ background: 'var(--color-void)', padding: 'clamp(2rem,4vw,3.5rem) 0', borderTop: '1px solid rgba(236,234,229,0.06)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(2rem,5vw,6rem)', display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: 'clamp(2rem,4vw,4rem)', alignItems: 'center' }} className="art-grid-responsive">
          <div className="art-image" style={{ overflow: 'hidden', clipPath: 'inset(0 100% 0 0)' }}>
            <Image src="/images/ART/68ffd81b8713b52534974207_AdobeStock_200635254-p-2600.jpg" alt="Art by Jeremy Soares" width={400} height={171} style={{ width: '100%', aspectRatio: '21/9', objectFit: 'cover', filter: 'brightness(0.75)' }} />
          </div>
          <div>
            <div className="reveal" style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.3, marginBottom: '1rem' }}>(07) &mdash; Art</div>
            <h2 className="reveal" style={{ fontFamily: "var(--font-barlow), 'Barlow', sans-serif", fontWeight: 900, fontSize: 'clamp(1.5rem,2.5vw,2.2rem)', lineHeight: 1.05, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              {isFr ? "L'autre\npratique" : 'The Other\nPractice'}
            </h2>
            <p className="reveal" style={{ fontSize: '0.9rem', lineHeight: 1.7, opacity: 0.35, marginBottom: '1.2rem' }}>
              {isFr
                ? "Avant l'immobilier, il y avait l'art. Couleur audacieuse, forme brute, identité explorée à travers la peinture."
                : 'Before real estate, there was art. Bold color, raw form, identity explored through paint.'}
            </p>
            <Link href={`/${locale}/studio`} className="reveal link-under" style={{ fontWeight: 700, fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-cream)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '12px', opacity: 0.45 }}>
              studio.jeremysoares.com <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ STATS BAND ═══ */}
      <section className="stats-band" style={{ background: 'var(--color-void)', borderTop: '1px solid rgba(236,234,229,0.06)', borderBottom: '1px solid rgba(236,234,229,0.06)', padding: 'clamp(3rem,5vw,5rem) 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(2rem,5vw,6rem)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', textAlign: 'center' }} className="stats-grid-responsive">
          {[
            { num: '10+', label: isFr ? 'Années' : 'Years' },
            { num: '50+', label: 'Domains' },
            { num: '14,000', label: isFr ? 'Réseau de Courtiers' : 'Brokers Network' },
            { num: '2', label: isFr ? 'Marchés' : 'Markets' },
          ].map((stat, i) => (
            <div key={i} className="reveal" style={{ opacity: 0, transform: 'translateY(50px)' }}>
              <div className="stat-number" style={{ fontFamily: "var(--font-dm-serif), 'DM Serif Display', serif", fontStyle: 'italic', fontSize: 'clamp(2.5rem,4vw,3.5rem)', marginBottom: '0.5rem' }}>
                {stat.num}
              </div>
              <div style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.2 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CONTACT (full-screen footer) ═══ */}
      <section className="section-contact" style={{ background: 'var(--color-void)', minHeight: '100svh', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '5rem 2rem' }}>
        <div className="contact-watermark" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontFamily: "var(--font-barlow), 'Barlow', sans-serif", fontWeight: 900, fontSize: 'clamp(7rem,18vw,18rem)', letterSpacing: '0.04em', textTransform: 'uppercase', opacity: 0.03, pointerEvents: 'none', userSelect: 'none', whiteSpace: 'nowrap' }}>
          SOARES
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '640px', width: '100%', textAlign: 'center' }}>
          <h2 className="reveal" style={{ fontFamily: "var(--font-dm-serif), 'DM Serif Display', serif", fontStyle: 'italic', fontSize: 'clamp(2rem,4vw,3.5rem)', opacity: 0.9, marginBottom: '8px' }}>
            {isFr ? 'Discutons.' : "Let\u2019s talk."}
          </h2>
          <p className="reveal" style={{ fontSize: '15px', lineHeight: 1.7, opacity: 0.3, maxWidth: '520px', margin: '0 auto 2rem' }}>
            {isFr ? "Achat, vente, ou simplement curieux du marché." : 'Buying, selling, or curious about the market.'}
          </p>

          {/* Quick contact buttons */}
          <div className="reveal" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap' }}>
            <a href="tel:+15145198177" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-cream)', border: '1px solid rgba(236,234,229,0.2)', background: 'transparent', padding: '12px 24px', textDecoration: 'none', transition: 'all 0.3s' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.6 }}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
              514 519-8177
            </a>
            <a href="mailto:jeremy@jeremysoares.com" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-cream)', border: '1px solid rgba(236,234,229,0.2)', background: 'transparent', padding: '12px 24px', textDecoration: 'none', transition: 'all 0.3s' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.6 }}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 7l-10 6L2 7" /></svg>
              Email
            </a>
          </div>

          {/* Interest tags */}
          <div className="reveal" style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
            {[
              isFr ? 'Acheter' : 'Buy',
              isFr ? 'Vendre' : 'Sell',
              isFr ? 'Louer' : 'Rent',
              'Commercial',
              isFr ? 'Investissement' : 'Investment',
              'Urgent',
            ].map(tag => (
              <button
                key={tag}
                onClick={e => e.currentTarget.classList.toggle('selected')}
                style={{ fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, border: '1px solid rgba(236,234,229,0.12)', color: 'var(--color-cream)', padding: '5px 12px', cursor: 'pointer', transition: 'all 0.25s', opacity: 0.35, background: 'transparent' }}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Contact form */}
          <form ref={contactFormRef} action={`/${locale}/api/contact`} method="POST">
            <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div style={{ textAlign: 'left' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.5, marginBottom: '10px' }}>
                  {isFr ? 'NOM' : 'NAME'}
                </label>
                <input name="name" type="text" placeholder={isFr ? 'Votre nom' : 'Your name'} style={{ width: '100%', background: 'rgba(236,234,229,0.04)', border: 'none', borderBottom: '1px solid rgba(236,234,229,0.2)', color: 'var(--color-cream)', fontFamily: 'inherit', fontSize: '16px', padding: '10px 0 12px', outline: 'none' }} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.5, marginBottom: '10px' }}>EMAIL</label>
                <input name="email" type="email" placeholder={isFr ? 'Votre courriel' : 'Your email'} style={{ width: '100%', background: 'rgba(236,234,229,0.04)', border: 'none', borderBottom: '1px solid rgba(236,234,229,0.2)', color: 'var(--color-cream)', fontFamily: 'inherit', fontSize: '16px', padding: '10px 0 12px', outline: 'none' }} />
              </div>
            </div>
            <div className="reveal" style={{ marginBottom: '20px' }}>
              <div style={{ textAlign: 'left' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.5, marginBottom: '10px' }}>
                  {isFr ? 'TÉLÉPHONE' : 'PHONE'} <span style={{ opacity: 0.5 }}>({isFr ? 'OPTIONNEL' : 'OPTIONAL'})</span>
                </label>
                <input name="phone" type="tel" placeholder={isFr ? 'Votre téléphone' : 'Your phone'} style={{ width: '100%', background: 'rgba(236,234,229,0.04)', border: 'none', borderBottom: '1px solid rgba(236,234,229,0.2)', color: 'var(--color-cream)', fontFamily: 'inherit', fontSize: '16px', padding: '10px 0 12px', outline: 'none' }} />
              </div>
            </div>
            <div className="reveal" style={{ marginBottom: '20px' }}>
              <div style={{ textAlign: 'left' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.5, marginBottom: '10px' }}>MESSAGE</label>
                <textarea name="message" placeholder={isFr ? 'Parlez-nous de votre projet' : 'Tell us about your project'} style={{ width: '100%', background: 'rgba(236,234,229,0.04)', border: 'none', borderBottom: '1px solid rgba(236,234,229,0.2)', color: 'var(--color-cream)', fontFamily: 'inherit', fontSize: '16px', padding: '10px 0 12px', outline: 'none', minHeight: '100px', resize: 'vertical', lineHeight: 1.6 }} />
              </div>
            </div>
            <button type="submit" className="reveal" style={{ marginTop: '32px', fontWeight: 700, fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-cream)', border: '1px solid rgba(236,234,229,0.25)', background: 'transparent', padding: '16px 40px', cursor: 'pointer', transition: 'all 0.3s' }}>
              {isFr ? 'ENVOYER LE MESSAGE' : 'SEND MESSAGE'}
            </button>
          </form>
        </div>

        {/* Big SOARES wordmark */}
        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '1440px', overflow: 'hidden', lineHeight: 1, marginTop: '4rem' }}>
          <p style={{ fontFamily: "var(--font-barlow), 'Barlow', sans-serif", fontWeight: 900, fontSize: 'clamp(5rem, 16vw, 16rem)', letterSpacing: '-0.03em', textTransform: 'uppercase', color: 'var(--color-cream)', opacity: 0.06, margin: 0, userSelect: 'none' }}>
            SOARES
          </p>
        </div>

        {/* Footer links */}
        <div className="reveal footer-links-responsive" style={{ position: 'relative', zIndex: 1, maxWidth: '1440px', width: '100%', marginTop: '0', paddingTop: '2rem', borderTop: '1px solid rgba(236,234,229,0.04)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
          <div>
            <h4 style={{ fontWeight: 700, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.2, marginBottom: '1.5rem' }}>{isFr ? 'Immobilier' : 'Real Estate'}</h4>
            <Link href={`/${locale}/real-estate`} style={{ display: 'block', color: 'var(--color-cream)', textDecoration: 'none', fontSize: '13px', opacity: 0.28, marginBottom: '0.7rem' }}>{isFr ? 'Acheter' : 'Buy'}</Link>
            <Link href={`/${locale}/real-estate`} style={{ display: 'block', color: 'var(--color-cream)', textDecoration: 'none', fontSize: '13px', opacity: 0.28, marginBottom: '0.7rem' }}>{isFr ? 'Vendre' : 'Sell'}</Link>
            <Link href={`/${locale}/real-estate`} style={{ display: 'block', color: 'var(--color-cream)', textDecoration: 'none', fontSize: '13px', opacity: 0.28, marginBottom: '0.7rem' }}>{isFr ? 'Louer' : 'Rent'}</Link>
            <Link href={`/${locale}/real-estate`} style={{ display: 'block', color: 'var(--color-cream)', textDecoration: 'none', fontSize: '13px', opacity: 0.28, marginBottom: '0.7rem' }}>{isFr ? 'Investir' : 'Invest'}</Link>
          </div>
          <div>
            <h4 style={{ fontWeight: 700, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.2, marginBottom: '1.5rem' }}>Services</h4>
            <Link href={`/${locale}/services`} style={{ display: 'block', color: 'var(--color-cream)', textDecoration: 'none', fontSize: '13px', opacity: 0.28, marginBottom: '0.7rem' }}>{isFr ? 'Préconstruction' : 'Pre-Construction'}</Link>
            <Link href={`/${locale}/services`} style={{ display: 'block', color: 'var(--color-cream)', textDecoration: 'none', fontSize: '13px', opacity: 0.28, marginBottom: '0.7rem' }}>Marketing</Link>
            <Link href={`/${locale}/services`} style={{ display: 'block', color: 'var(--color-cream)', textDecoration: 'none', fontSize: '13px', opacity: 0.28, marginBottom: '0.7rem' }}>Commercial</Link>
            <Link href={`/${locale}/services`} style={{ display: 'block', color: 'var(--color-cream)', textDecoration: 'none', fontSize: '13px', opacity: 0.28, marginBottom: '0.7rem' }}>{isFr ? 'Relocalisation' : 'Relocation'}</Link>
          </div>
          <div>
            <h4 style={{ fontWeight: 700, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.2, marginBottom: '1.5rem' }}>{isFr ? 'Outils & Guides' : 'Tools & Guides'}</h4>
            <a href="https://aimmo.ca" target="_blank" rel="noopener noreferrer" style={{ display: 'block', color: 'var(--color-cream)', textDecoration: 'none', fontSize: '13px', opacity: 0.28, marginBottom: '0.7rem' }}>aimmo AI Staging</a>
            <a href="https://tools.jeremysoares.com/mortgage" target="_blank" rel="noopener noreferrer" style={{ display: 'block', color: 'var(--color-cream)', textDecoration: 'none', fontSize: '13px', opacity: 0.28, marginBottom: '0.7rem' }}>{isFr ? 'Calculateur Hypothécaire' : 'Mortgage Calculator'}</a>
            <a href="https://tools.jeremysoares.com/buyer-guide" target="_blank" rel="noopener noreferrer" style={{ display: 'block', color: 'var(--color-cream)', textDecoration: 'none', fontSize: '13px', opacity: 0.28, marginBottom: '0.7rem' }}>{isFr ? "Guide de l'Acheteur" : "Buyer\u2019s Guide"}</a>
            <a href="https://tools.jeremysoares.com/seller-guide" target="_blank" rel="noopener noreferrer" style={{ display: 'block', color: 'var(--color-cream)', textDecoration: 'none', fontSize: '13px', opacity: 0.28, marginBottom: '0.7rem' }}>{isFr ? "Guide du Vendeur" : "Seller\u2019s Guide"}</a>
          </div>
          <div>
            <h4 style={{ fontWeight: 700, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.2, marginBottom: '1.5rem' }}>{isFr ? 'Connecter' : 'Connect'}</h4>
            <a href="https://www.linkedin.com/in/jeremysoaresrealestate/" target="_blank" rel="noopener noreferrer" style={{ display: 'block', color: 'var(--color-cream)', textDecoration: 'none', fontSize: '13px', opacity: 0.28, marginBottom: '0.7rem' }}>LinkedIn</a>
            <a href="https://instagram.com/jeremysoares" target="_blank" rel="noopener noreferrer" style={{ display: 'block', color: 'var(--color-cream)', textDecoration: 'none', fontSize: '13px', opacity: 0.28, marginBottom: '0.7rem' }}>Instagram</a>
            <Link href={`/${locale}/blog`} style={{ display: 'block', color: 'var(--color-cream)', textDecoration: 'none', fontSize: '13px', opacity: 0.28, marginBottom: '0.7rem' }}>{isFr ? 'Blogue' : 'News'}</Link>
            <Link href={`/${locale}/contact`} style={{ display: 'block', color: 'var(--color-cream)', textDecoration: 'none', fontSize: '13px', opacity: 0.28, marginBottom: '0.7rem' }}>Contact</Link>
          </div>
        </div>

        {/* Footer bottom */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px clamp(2rem,4vw,4rem)', borderTop: '1px solid rgba(236,234,229,0.03)', display: 'flex', justifyContent: 'space-between', fontSize: '10px', letterSpacing: '0.08em', opacity: 0.15 }}>
          <span>&copy; 2026 Soares. {isFr ? 'Tous droits réservés.' : 'All rights reserved.'}</span>
          <span>{isFr ? 'Courtier immobilier résidentiel' : 'Residential real estate broker'} &mdash; OACIQ Permit H2731</span>
        </div>
      </section>

      {/* ═══ Responsive CSS ═══ */}
      <style jsx global>{`
        /* Hide global footer on home — contact section IS the footer */
        #global-footer { display: none !important; }
        @media (max-width: 768px) {
          .section-split-responsive { grid-template-columns: 1fr !important; }
          .bsr-grid-responsive { grid-template-columns: 1fr !important; }
          .about-grid-responsive { grid-template-columns: 1fr !important; }
          .tools-grid-responsive { grid-template-columns: 1fr !important; }
          .art-grid-responsive { grid-template-columns: 1fr !important; }
          .stats-grid-responsive { grid-template-columns: repeat(2, 1fr) !important; }
          .footer-links-responsive { grid-template-columns: repeat(2, 1fr) !important; }
          .service-desc-responsive { display: none; }
          .sold-mosaic { grid-template-columns: repeat(4, 1fr) !important; gap: 4px !important; }
        }
        @media (max-width: 480px) {
          .sold-mosaic { grid-template-columns: repeat(3, 1fr) !important; gap: 3px !important; }
        }
        .link-under:hover { opacity: 0.85 !important; gap: 20px !important; }
        .split-panel:hover img { transform: scale(1.04) !important; filter: brightness(0.5) !important; }
        .sold-tile:hover img { transform: scale(1.1) !important; }
        .tag.selected { border-color: rgba(236,234,229,0.5) !important; opacity: 0.85 !important; background: rgba(236,234,229,0.08) !important; }
        .form-submit:hover, button[type="submit"]:hover { background: var(--color-cream) !important; color: var(--color-void) !important; border-color: var(--color-cream) !important; }
        .quick-btn:hover { border-color: var(--color-cream) !important; background: rgba(236,234,229,0.06) !important; }
      `}</style>
    </>
  )
}
