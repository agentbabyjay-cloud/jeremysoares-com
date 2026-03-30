'use client'

import { use, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrambleText } from '@/components/animation/ScrambleText'
import { AsciiArt } from '@/components/animation/AsciiArt'
import { SplitReveal } from '@/components/animation/SplitReveal'
import { TextReveal } from '@/components/animation/TextReveal'
import { SectionReveal } from '@/components/animation/SectionReveal'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

const FONT_BARLOW = "var(--font-barlow),'Barlow',sans-serif"
const ORANGE = '#f55f00'
const CREAM = '#eceae5'
const VOID = '#0e1011'

const SERVICES = [
  {
    cat: 'Real Estate',
    catFr: 'Immobilier',
    title: 'Real Estate Platforms',
    titleFr: 'Plateformes Immobilières',
    desc: 'Listing portals, broker tools, pre-sale microsites, virtual staging integrations.',
    descFr: "Portails d'annonces, outils de courtage, microsites prévente, intégrations de mise en scène virtuelle.",
    img: '/images/buy-sell-rent/montreal-view.jpg',
  },
  {
    cat: 'Hospitality',
    catFr: 'Restauration',
    title: 'Hospitality & Food',
    titleFr: 'Hôtellerie & Restauration',
    desc: 'Reservation flows, online ordering, loyalty programs, multi-location dashboards.',
    descFr: 'Systèmes de réservation, commandes en ligne, programmes de fidélité, tableaux de bord multi-sites.',
    img: '/images/buy-sell-rent/nice-indoor.jpg',
  },
  {
    cat: 'Retail',
    catFr: 'Commerce',
    title: 'Retail & E-Commerce',
    titleFr: 'Commerce & E-Commerce',
    desc: 'Shopify storefronts, inventory systems, email automation, abandoned-cart recovery.',
    descFr: "Boutiques Shopify, systèmes d'inventaire, automatisation email, récupération de paniers abandonnés.",
    img: '/images/retail/commercial-orange.jpg',
  },
  {
    cat: 'Professional',
    catFr: 'Professionnel',
    title: 'Professional Services',
    titleFr: 'Services Professionnels',
    desc: 'Firm sites, CRM integrations, client portals, automated onboarding sequences.',
    descFr: 'Sites de cabinet, intégrations CRM, portails clients, séquences d\'onboarding automatisées.',
    img: '/images/Commercial Real Estate/68ba5ef5db548016dd9a1ed9_old port.jpg',
  },
  {
    cat: 'Industrial',
    catFr: 'Industriel',
    title: 'Industrial & B2B',
    titleFr: 'Industriel & B2B',
    desc: 'Lead funnels, quote generators, ERP-connected catalogs, operational dashboards.',
    descFr: 'Entonnoirs de leads, générateurs de devis, catalogues connectés ERP, tableaux de bord opérationnels.',
    img: '/images/Commercial Real Estate/68ba5ef402a2ead761e430cb_espace a loeur centre ville.jpg',
  },
  {
    cat: 'Developer',
    catFr: 'Promoteur',
    title: 'Pre-Sale & Developer',
    titleFr: 'Prévente & Promoteur',
    desc: 'Launch-day sites, VIP registration portals, floor plan tools, deposit tracking.',
    descFr: "Sites de lancement, portails d'enregistrement VIP, outils de plans d'étage, suivi des dépôts.",
    img: '/images/presale/heritage-facade.png',
  },
]

const STACK_ITEMS = [
  'Next.js', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Supabase', 'Vercel', 'Railway',
  'Claude AI', 'OpenClaw', 'ElevenLabs', 'Vapi', 'Twilio', 'Resend', 'PostHog',
  'HubSpot', 'Stripe', 'Tailwind CSS', 'GSAP', 'Docker', 'GitHub Actions',
]

const AGENTS = [
  'Marcus — PM', 'Julian — Frontend', 'Toby — Backend', 'Harper — DevOps',
  'Amélie — Copy EN/FR', 'Wei — SEO', 'Hunter — Ads', 'Jax — Social',
  'Flash — AI Photo', 'Pixel — Creative', 'Zara — Brand', 'Echo — Support',
  'Gatsby — Finance', 'Victoria — Tax', 'Arthur — Legal', 'Sterling — Strategy',
  'Digit — Analytics', 'Rex — Trading', 'Nix — QA', 'Brenda — HR', 'Dash — CEO',
]

const PROCESS = [
  { num: '01', en: 'Discovery', fr: 'Découverte', desc: 'We map your business model, tech stack, and growth goals before writing a single line of code.', descFr: 'Nous cartographions votre modèle d\'affaires, votre stack et vos objectifs de croissance avant d\'écrire une seule ligne de code.' },
  { num: '02', en: 'Architecture', fr: 'Architecture', desc: 'Database schemas, API design, integration points, and deployment strategy — planned before you build.', descFr: 'Schémas de base de données, conception d\'API, points d\'intégration et stratégie de déploiement — planifiés avant de construire.' },
  { num: '03', en: 'Build', fr: 'Construction', desc: 'Frontend, backend, and automation layer developed in parallel by a coordinated agent team.', descFr: 'Frontend, backend et couche d\'automatisation développés en parallèle par une équipe d\'agents coordonnée.' },
  { num: '04', en: 'QA & Launch', fr: 'QA & Lancement', desc: 'Cross-browser testing, performance audits, and zero-downtime production deploys.', descFr: 'Tests cross-browser, audits de performance et déploiements en production sans interruption.' },
  { num: '05', en: 'Automate', fr: 'Automatiser', desc: 'Email flows, AI agents, CRM hooks, and analytics pipelines — running while you sleep.', descFr: "Flux email, agents IA, hooks CRM et pipelines analytiques — qui tournent pendant que vous dormez." },
  { num: '06', en: 'Scale', fr: 'Croissance', desc: 'SEO architecture, paid media integration, A/B testing, and conversion rate optimization.', descFr: 'Architecture SEO, intégration de médias payants, tests A/B et optimisation du taux de conversion.' },
]

const CASES = [
  {
    name: 'aimmo.ca',
    type: 'AI Staging Platform',
    typeFr: 'Plateforme de Mise en Scène IA',
    desc: 'Virtual staging platform powered by computer vision. Before/after comparison tool, agent onboarding flow, automated delivery pipeline.',
    descFr: 'Plateforme de mise en scène virtuelle propulsée par la vision par ordinateur. Outil de comparaison avant/après, flux d\'intégration d\'agents, pipeline de livraison automatisé.',
    tags: ['AI', 'FastAPI', 'Next.js', 'Stripe'],
    img: '/images/Commercial Real Estate/68ba5ef471476cae93101dd4_Mockup.jpg',
    url: 'https://aimmo.ca',
  },
  {
    name: 'ALouerMTL.com',
    type: 'Rental Listing Platform',
    typeFr: 'Plateforme d\'Annonces Locatives',
    desc: 'Bilingual rental portal for Montreal. Lead capture, automated follow-ups, broker routing, and Centris feed integration.',
    descFr: 'Portail locatif bilingue pour Montréal. Capture de leads, suivis automatisés, routage de courtiers et intégration de flux Centris.',
    tags: ['Bilingual', 'CRM', 'Automation'],
    img: '/images/Project alouermtl/68eeccc5145dc9b2b7e043c1_ALOUERMTL.COM.jpg',
    url: 'https://alouermtl.com',
  },
  {
    name: 'JeremySoares.com',
    type: 'Broker Hub + AI System',
    typeFr: 'Hub Courtier + Système IA',
    desc: 'This site. 50+ SEO landing pages, 42 satellite domains, AI voice agent, bilingual blog, virtual staging integration, and full analytics.',
    descFr: "Ce site. 50+ pages SEO, 42 domaines satellites, agent vocal IA, blogue bilingue, intégration de mise en scène virtuelle et analytique complète.",
    tags: ['21 Agents', 'SEO × 42', 'Voice AI', 'EN/FR'],
    img: '/images/brand/68eecd92a89fcbc80184bdc2_MAGAZINE.jpg',
    url: 'https://jeremysoares.com',
  },
]

export default function WebPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params)
  const isFr = locale === 'fr-ca'
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero clip reveal
      gsap.fromTo('.web-hero-img', { clipPath: 'inset(100% 0 0 0)' }, {
        clipPath: 'inset(0% 0 0 0)', duration: 1.6, ease: 'power4.inOut', delay: 0.3,
      })

      // Stagger reveal on .web-reveal elements
      gsap.utils.toArray<HTMLElement>('.web-reveal').forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true } }
        )
      })

      // Service cards stagger
      ScrollTrigger.create({
        trigger: '.web-services-grid',
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to('.web-service-card', { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' })
        },
      })
      gsap.set('.web-service-card', { opacity: 0, y: 32 })

      // Process steps stagger
      ScrollTrigger.create({
        trigger: '.web-process',
        start: 'top 75%',
        once: true,
        onEnter: () => {
          gsap.to('.web-process-step', { opacity: 1, x: 0, duration: 0.65, stagger: 0.1, ease: 'power3.out' })
        },
      })
      gsap.set('.web-process-step', { opacity: 0, x: -24 })

      // Case study images
      gsap.utils.toArray<HTMLElement>('.web-case-img').forEach(el => {
        gsap.fromTo(el,
          { clipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'power4.inOut',
            scrollTrigger: { trigger: el, start: 'top 80%', once: true } }
        )
      })

      // Agent tags scattered reveal
      ScrollTrigger.create({
        trigger: '.web-agents-grid',
        start: 'top 75%',
        once: true,
        onEnter: () => {
          gsap.to('.web-agent-tag', {
            opacity: 1, scale: 1, duration: 0.5,
            stagger: { amount: 1.2, from: 'random' }, ease: 'back.out(1.4)',
          })
        },
      })
      gsap.set('.web-agent-tag', { opacity: 0, scale: 0.8 })

      // Stack marquee (orange on hover already handled by CSS)
      // Tech marquee endless scroll
      gsap.to('.web-tech-track', {
        x: '-50%', duration: 30, ease: 'none', repeat: -1,
      })

      // Horizontal orange line drawn on scroll
      gsap.fromTo('.web-orange-line', { scaleX: 0 }, {
        scaleX: 1, duration: 1.2, ease: 'power3.inOut',
        scrollTrigger: { trigger: '.web-orange-line', start: 'top 85%', once: true },
      })

    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <main ref={heroRef as React.RefObject<HTMLElement>} style={{ background: VOID, color: CREAM, overflowX: 'hidden' }}>

      {/* ═══════════════════════════════════════════════
          HERO — H1
      ════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: '100svh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 'clamp(4rem,8vw,8rem)', overflow: 'hidden' }}>
        {/* Background image */}
        <div className="web-hero-img" style={{ position: 'absolute', inset: 0, clipPath: 'inset(100% 0 0 0)' }}>
          <Image
            src="/images/Commercial Real Estate/68ba5ef402a2ead761e430cb_espace a loeur centre ville.jpg"
            alt="Web & Technology — Soares Agency"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', filter: 'brightness(0.2) contrast(1.1) grayscale(0.4)' }}
          />
        </div>

        {/* ASCII art Easter egg — bottom-right corner */}
        <div style={{ position: 'absolute', right: 0, bottom: 0, width: 'clamp(200px,30vw,420px)', height: 'clamp(200px,30vw,420px)', overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
          <AsciiArt
            src="/images/headshots/jeremy-soares.jpg"
            cols={80}
            rows={48}
            color={CREAM}
            opacity={0.12}
          />
        </div>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(2rem,5vw,6rem)', width: '100%' }}>
          {/* H6 eyebrow */}
          <h6 style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: ORANGE, marginBottom: '2rem', opacity: 0.9 }}>
            <SplitReveal delay={400} stagger={28}>{isFr ? '(Studio — Web & Technologie)' : '(Studio — Web & Technology)'}</SplitReveal>
          </h6>

          {/* H1 */}
          <TextReveal
            as="h1"
            split="words"
            immediate
            delay={0.15}
            className="font-black uppercase leading-none tracking-tight"
            style={{
              fontFamily: FONT_BARLOW,
              fontSize: 'clamp(3.5rem,9vw,9.5rem)',
              maxWidth: '12ch',
              marginBottom: '3rem',
            }}
          >
            {isFr ? 'Nous bâtissons des systèmes qui vendent.' : 'We build systems that sell.'}
          </TextReveal>

          <div style={{ display: 'flex', gap: 'clamp(2rem,5vw,6rem)', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <p style={{ fontSize: 'clamp(0.95rem,1.5vw,1.15rem)', lineHeight: 1.75, opacity: 0.45, maxWidth: '480px' }}>
              {isFr
                ? "Sites bilingues, automatisation IA, entonnoirs marketing, systèmes opérationnels — construits par une équipe d'agents alimentée par OpenClaw."
                : 'Bilingual sites, AI automation, marketing funnels, operational systems — built by an agent team powered by OpenClaw.'}
            </p>
            <Link
              href={`/${locale}/contact`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', background: ORANGE, color: '#fff', padding: '16px 32px', textDecoration: 'none', flexShrink: 0, transition: 'opacity 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.8' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1' }}
            >
              {isFr ? 'Démarrer un projet →' : 'Start a project →'}
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          STATS BAND
      ════════════════════════════════════════════════ */}
      <section style={{ borderTop: `1px solid rgba(236,234,229,0.06)`, borderBottom: `1px solid rgba(236,234,229,0.06)`, padding: 'clamp(2rem,4vw,3rem) 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(2rem,5vw,6rem)', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '2rem', textAlign: 'center' }}>
          {[
            { n: '21', label: isFr ? 'Agents IA' : 'AI Agents', ai: true },
            { n: '50+', label: isFr ? 'Domaines SEO' : 'SEO Domains', ai: false },
            { n: '6', label: isFr ? 'Types d\'industrie' : 'Industry Types', ai: false },
            { n: '100%', label: isFr ? 'Bilingue' : 'Bilingual', ai: false },
          ].map((s, i) => (
            <div key={i} className="web-reveal">
              <div style={{ fontFamily: FONT_BARLOW, fontStyle: 'italic', fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 900, marginBottom: '0.4rem', color: s.ai ? ORANGE : CREAM }}>
                {s.ai ? <ScrambleText text={s.n} trigger="inview" duration={1000} /> : s.n}
              </div>
              <div style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.3 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          BUILT FOR EVERY BUSINESS — H2
      ════════════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(6rem,10vw,10rem) 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(2rem,5vw,6rem)' }}>
          <div style={{ marginBottom: 'clamp(3rem,5vw,5rem)' }}>
            <h5 style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: ORANGE, opacity: 0.8, marginBottom: '1rem' }}>
              <SplitReveal stagger={28}>{isFr ? '(01) — Industries' : '(01) — Industries'}</SplitReveal>
            </h5>
            <h2 className="web-reveal" style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(2.5rem,5vw,4.5rem)', lineHeight: 1, letterSpacing: 0, textTransform: 'uppercase', maxWidth: '14ch' }}>
              {isFr ? 'Conçu pour chaque industrie.' : 'Built for every industry.'}
            </h2>
          </div>

          <div className="web-services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '2px' }}>
            {SERVICES.map((s, i) => (
              <div
                key={i}
                className="web-service-card"
                style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', cursor: 'default', background: '#111' }}
                onMouseEnter={e => {
                  const img = e.currentTarget.querySelector('img') as HTMLImageElement
                  const overlay = e.currentTarget.querySelector('.web-card-overlay') as HTMLElement
                  if (img) gsap.to(img, { scale: 1.08, duration: 0.8, ease: 'power3.out' })
                  if (overlay) gsap.to(overlay, { opacity: 1, duration: 0.4 })
                }}
                onMouseLeave={e => {
                  const img = e.currentTarget.querySelector('img') as HTMLImageElement
                  const overlay = e.currentTarget.querySelector('.web-card-overlay') as HTMLElement
                  if (img) gsap.to(img, { scale: 1, duration: 0.8, ease: 'power3.out' })
                  if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.4 })
                }}
              >
                <Image src={s.img} alt={isFr ? s.titleFr : s.title} fill sizes="33vw"
                  style={{ objectFit: 'cover', filter: 'brightness(0.35) contrast(1.1) grayscale(0.3)', transition: 'filter 0.4s' }} />
                {/* Hover overlay */}
                <div className="web-card-overlay" style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, rgba(245,95,0,0.15), transparent)`, opacity: 0, pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(1.5rem,2.5vw,2.5rem)', zIndex: 2 }}>
                  {/* H6 category tag */}
                  <h6 style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '9px', letterSpacing: '0.26em', textTransform: 'uppercase', color: ORANGE, marginBottom: '0.6rem', opacity: 0.85 }}>
                    {isFr ? s.catFr : s.cat}
                  </h6>
                  {/* H3 */}
                  <h3 style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(1rem,1.8vw,1.35rem)', textTransform: 'uppercase', lineHeight: 1.05, marginBottom: '0.6rem' }}>
                    {isFr ? s.titleFr : s.title}
                  </h3>
                  <p style={{ fontSize: '0.8rem', lineHeight: 1.65, opacity: 0.45, maxWidth: '280px' }}>
                    {isFr ? s.descFr : s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          WHAT'S INCLUDED — H2
      ════════════════════════════════════════════════ */}
      <section style={{ background: CREAM, color: VOID, padding: 'clamp(6rem,10vw,10rem) 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(2rem,5vw,6rem)' }}>
          <div style={{ marginBottom: 'clamp(3rem,5vw,5rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
            <div>
              <h5 style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.4, marginBottom: '1rem' }}>
                <SplitReveal stagger={28}>{isFr ? '(02) — Inclus' : '(02) — Included'}</SplitReveal>
              </h5>
              <h2 style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(2.5rem,5vw,4.5rem)', lineHeight: 1, textTransform: 'uppercase' }} className="web-reveal">
                {isFr ? 'Tout le système.' : 'The whole system.'}
              </h2>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 'clamp(3rem,5vw,5rem) clamp(4rem,8vw,8rem)' }}>

            {/* H3: Backend Systems */}
            <div className="web-reveal">
              <div style={{ width: '100%', height: '1px', background: 'rgba(14,16,17,0.15)', marginBottom: '2rem', transformOrigin: 'left', overflow: 'hidden' }}>
                <div className="web-orange-line" style={{ height: '2px', background: ORANGE, transformOrigin: 'left', marginTop: '-0.5px' }} />
              </div>
              <h3 style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(1.2rem,2vw,1.5rem)', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
                {isFr ? 'Systèmes Backend' : 'Backend Systems'}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {[
                  ['H4', isFr ? 'Architecture de base de données' : 'Database Architecture', true],
                  ['H4', isFr ? 'Développement d\'API REST' : 'REST API Development', false],
                  ['H4', isFr ? 'Auth & Sécurité' : 'Auth & Security', false],
                  ['H4', 'CI/CD & Infrastructure', false],
                ].map(([level, item, isAI], i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '8px', letterSpacing: '0.18em', opacity: 0.2 }}>{level}</span>
                    <h4 style={{ fontWeight: 700, fontSize: '0.875rem', opacity: 0.6, letterSpacing: '0.04em' }}>
                      {isAI ? <ScrambleText text={item as string} trigger="hover" duration={500} /> : item as string}
                    </h4>
                  </div>
                ))}
              </div>
            </div>

            {/* H3: AI Automation */}
            <div className="web-reveal">
              <div style={{ width: '100%', height: '1px', background: 'rgba(14,16,17,0.15)', marginBottom: '2rem' }}>
                <div className="web-orange-line" style={{ height: '2px', background: ORANGE, transformOrigin: 'left', marginTop: '-0.5px' }} />
              </div>
              <h3 style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(1.2rem,2vw,1.5rem)', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
                <ScrambleText text={isFr ? 'Automatisation IA' : 'AI Automation'} trigger="hover" duration={700} as="span" />
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {[
                  ['H4', isFr ? 'OpenClaw — Système 21 agents' : 'OpenClaw — 21-Agent System', true],
                  ['H4', isFr ? 'Agents vocaux & chatbots' : 'Voice AI & Chatbots', true],
                  ['H4', isFr ? 'Qualification de leads automatisée' : 'Automated Lead Qualification', true],
                  ['H4', isFr ? 'Notifications & rapports' : 'Notifications & Reporting', false],
                ].map(([level, item, isAI], i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '8px', letterSpacing: '0.18em', opacity: 0.2 }}>{level}</span>
                    <h4 style={{ fontWeight: 700, fontSize: '0.875rem', opacity: 0.6, letterSpacing: '0.04em' }}>
                      {isAI ? <ScrambleText text={item as string} trigger="hover" duration={600} /> : item as string}
                    </h4>
                  </div>
                ))}
              </div>
            </div>

            {/* H3: Marketing Infrastructure */}
            <div className="web-reveal">
              <div style={{ width: '100%', height: '1px', background: 'rgba(14,16,17,0.15)', marginBottom: '2rem' }}>
                <div className="web-orange-line" style={{ height: '2px', background: ORANGE, transformOrigin: 'left', marginTop: '-0.5px' }} />
              </div>
              <h3 style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(1.2rem,2vw,1.5rem)', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
                {isFr ? 'Entonnoirs Marketing' : 'Marketing Funnels'}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {[
                  ['H4', isFr ? 'Séquences email automatisées' : 'Automated Email Sequences', false],
                  ['H4', isFr ? 'Architecture SEO (hub × satellites)' : 'SEO Architecture (hub × satellites)', false],
                  ['H4', isFr ? 'Intégration Google & Meta Ads' : 'Google & Meta Ads Integration', false],
                  ['H4', 'A/B Testing & CRO', false],
                ].map(([level, item], i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '8px', letterSpacing: '0.18em', opacity: 0.2 }}>{level}</span>
                    <h4 style={{ fontWeight: 700, fontSize: '0.875rem', opacity: 0.6, letterSpacing: '0.04em' }}>{item as string}</h4>
                  </div>
                ))}
              </div>
            </div>

            {/* H3: Bilingual by Default */}
            <div className="web-reveal">
              <div style={{ width: '100%', height: '1px', background: 'rgba(14,16,17,0.15)', marginBottom: '2rem' }}>
                <div className="web-orange-line" style={{ height: '2px', background: ORANGE, transformOrigin: 'left', marginTop: '-0.5px' }} />
              </div>
              <h3 style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(1.2rem,2vw,1.5rem)', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
                {isFr ? 'Bilingue par défaut' : 'Bilingual by Default'}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {[
                  ['H4', isFr ? 'EN/FR — routage de locale' : 'EN/FR Locale Routing'],
                  ['H4', isFr ? 'Hreflang & SEO bilingue' : 'Hreflang & Bilingual SEO'],
                  ['H4', isFr ? 'Traduction IA + révision humaine' : 'AI Translation + Human Review'],
                  ['H4', isFr ? 'Contenu localisé par marché' : 'Market-Specific Content'],
                ].map(([level, item], i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '8px', letterSpacing: '0.18em', opacity: 0.2 }}>{level}</span>
                    <h4 style={{ fontWeight: 700, fontSize: '0.875rem', opacity: 0.6, letterSpacing: '0.04em' }}>{item as string}</h4>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          OPENCLAW SECTION — H2
      ════════════════════════════════════════════════ */}
      <section id="openclaw" style={{ position: 'relative', padding: 'clamp(7rem,12vw,12rem) 0', overflow: 'hidden' }}>
        {/* ASCII art background — brand magazine */}
        <div style={{ position: 'absolute', right: '-5%', top: '50%', transform: 'translateY(-50%)', width: '55%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: 0.6 }}>
          <AsciiArt
            src="/images/brand/68eecd92a89fcbc80184bdc2_MAGAZINE.jpg"
            cols={120}
            rows={65}
            color={CREAM}
            opacity={0.15}
          />
        </div>

        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(2rem,5vw,6rem)', position: 'relative', zIndex: 2 }}>
          <h5 style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: ORANGE, marginBottom: '1.5rem', opacity: 0.85 }}>
            <SplitReveal stagger={28}>{isFr ? '(03) — Intelligence' : '(03) — Intelligence'}</SplitReveal>
          </h5>

          {/* H2 */}
          <div style={{ maxWidth: '700px', marginBottom: 'clamp(3rem,5vw,5rem)' }}>
            <h2 className="web-reveal" style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(2.5rem,5vw,4.5rem)', lineHeight: 1, textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              <ScrambleText text="OpenClaw" trigger="inview" duration={1200} />
            </h2>
            {/* H3 */}
            <h3 className="web-reveal" style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(1rem,2vw,1.4rem)', textTransform: 'uppercase', letterSpacing: '0.04em', opacity: 0.55, marginBottom: '1.5rem' }}>
              {isFr ? '21 agents. Un seul système.' : '21 Agents. One System.'}
            </h3>
            <SectionReveal delay={0.2}>
              <p style={{ fontSize: '1rem', lineHeight: 1.8, opacity: 0.45, marginBottom: '1rem' }}>
                {isFr
                  ? "OpenClaw est le système d'exploitation IA qui alimente Soares Agency. 21 agents spécialisés — chacun expert dans son domaine — travaillent en parallèle via Claude Code pour livrer des projets à une vitesse et une qualité impossibles avec une équipe humaine traditionnelle."
                  : 'OpenClaw is the AI operating system powering Soares Agency. 21 specialized agents — each expert in their domain — work in parallel via Claude Code to deliver projects at a speed and quality impossible with a traditional human team.'}
              </p>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.75, opacity: 0.35 }}>
                {isFr
                  ? "Stratégie, design, développement, SEO, copy EN/FR, devops, analytics — tout tourne en parallèle. Aucune réunion. Aucun délai de communication. Seulement des livrables."
                  : 'Strategy, design, development, SEO, EN/FR copy, devops, analytics — all running in parallel. No meetings. No communication delays. Only deliverables.'}
              </p>
            </SectionReveal>
          </div>

          {/* Agent grid */}
          <div className="web-agents-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', maxWidth: '800px' }}>
            {AGENTS.map((agent, i) => (
              <span
                key={i}
                className="web-agent-tag"
                style={{
                  fontFamily: FONT_BARLOW,
                  fontWeight: 900,
                  fontSize: '9px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  border: `1px solid rgba(236,234,229,${i < 5 ? '0.3' : '0.1'})`,
                  padding: '6px 14px',
                  cursor: 'default',
                  color: i < 3 ? ORANGE : CREAM,
                  opacity: i < 3 ? 0.9 : 0.5,
                  transition: 'all 0.25s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget
                  el.style.borderColor = ORANGE
                  el.style.color = ORANGE
                  el.style.opacity = '1'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget
                  el.style.borderColor = i < 5 ? 'rgba(236,234,229,0.3)' : 'rgba(236,234,229,0.1)'
                  el.style.color = i < 3 ? ORANGE : CREAM
                  el.style.opacity = i < 3 ? '0.9' : '0.5'
                }}
              >
                <ScrambleText text={agent} trigger="hover" duration={400} />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TECH STACK MARQUEE
      ════════════════════════════════════════════════ */}
      <section style={{ borderTop: `1px solid rgba(236,234,229,0.06)`, borderBottom: `1px solid rgba(236,234,229,0.06)`, padding: 'clamp(1.5rem,3vw,2.5rem) 0', overflow: 'hidden' }}>
        <div className="web-tech-track" style={{ display: 'flex', gap: '3rem', whiteSpace: 'nowrap', width: 'max-content' }}>
          {[...STACK_ITEMS, ...STACK_ITEMS].map((item, i) => (
            <span
              key={i}
              style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.25, cursor: 'default', transition: 'color 0.2s, opacity 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = ORANGE; (e.currentTarget as HTMLElement).style.opacity = '1' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = CREAM; (e.currentTarget as HTMLElement).style.opacity = '0.25' }}
            >
              <ScrambleText
                text={item}
                trigger="hover"
                duration={400}
              />
            </span>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CASE STUDIES — H2
      ════════════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(6rem,10vw,10rem) 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(2rem,5vw,6rem)' }}>
          <h5 style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: ORANGE, marginBottom: '1rem', opacity: 0.85 }}>
            <SplitReveal stagger={28}>{isFr ? '(04) — Travaux Récents' : '(04) — Recent Work'}</SplitReveal>
          </h5>
          <h2 className="web-reveal" style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(2.5rem,5vw,4.5rem)', lineHeight: 1, textTransform: 'uppercase', marginBottom: 'clamp(3rem,5vw,5rem)' }}>
            {isFr ? 'Ce que nous avons livré.' : 'What we\'ve shipped.'}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {CASES.map((c, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', minHeight: 'clamp(260px,28vw,400px)' }}>
                {/* Image */}
                <div
                  className="web-case-img"
                  style={{ position: 'relative', overflow: 'hidden', order: i % 2 === 0 ? 0 : 1 }}
                >
                  <Image src={c.img} alt={c.name} fill sizes="50vw"
                    style={{ objectFit: 'cover', filter: 'brightness(0.55) contrast(1.1) grayscale(0.2)', transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1)' }}
                  />
                </div>
                {/* Info */}
                <div style={{ background: 'rgba(236,234,229,0.03)', padding: 'clamp(2rem,4vw,4rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center', order: i % 2 === 0 ? 1 : 0 }}>
                  <h6 style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '9px', letterSpacing: '0.26em', textTransform: 'uppercase', color: ORANGE, marginBottom: '1rem', opacity: 0.8 }}>
                    {isFr ? c.typeFr : c.type}
                  </h6>
                  {/* H3 */}
                  <h3 className="web-reveal" style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(1.8rem,3vw,2.8rem)', textTransform: 'uppercase', lineHeight: 1, marginBottom: '1rem' }}>
                    <ScrambleText text={c.name} trigger="hover" duration={600} />
                  </h3>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.75, opacity: 0.4, marginBottom: '1.5rem', maxWidth: '380px' }}>
                    {isFr ? c.descFr : c.desc}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '2rem' }}>
                    {c.tags.map((tag, j) => (
                      <span key={j} style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', border: `1px solid rgba(236,234,229,0.2)`, padding: '5px 12px', color: CREAM, opacity: 0.6 }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a href={c.url} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: CREAM, textDecoration: 'none', opacity: 0.5, transition: 'opacity 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.5' }}
                  >
                    {isFr ? 'Voir le projet →' : 'View project →'}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          THE PROCESS — H2
      ════════════════════════════════════════════════ */}
      <section style={{ background: CREAM, color: VOID, padding: 'clamp(6rem,10vw,10rem) 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(2rem,5vw,6rem)' }}>
          <h5 style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.35, marginBottom: '1rem' }}>
            <SplitReveal stagger={28}>{isFr ? '(05) — Processus' : '(05) — Process'}</SplitReveal>
          </h5>
          <h2 className="web-reveal" style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(2.5rem,5vw,4.5rem)', lineHeight: 1, textTransform: 'uppercase', marginBottom: 'clamp(3rem,5vw,5rem)' }}>
            {isFr ? 'De l\'idée au lancement.' : 'From idea to launch.'}
          </h2>

          <div className="web-process" style={{ borderTop: '1px solid rgba(14,16,17,0.1)' }}>
            {PROCESS.map((step, i) => (
              <div
                key={i}
                className="web-process-step"
                style={{ display: 'grid', gridTemplateColumns: '60px 1fr 2fr', gap: '2rem', alignItems: 'start', padding: 'clamp(1.5rem,3vw,2.5rem) 0', borderBottom: '1px solid rgba(14,16,17,0.08)', cursor: 'default' }}
                onMouseEnter={e => { e.currentTarget.style.paddingLeft = '12px'; e.currentTarget.style.transition = 'padding 0.3s' }}
                onMouseLeave={e => { e.currentTarget.style.paddingLeft = '0' }}
              >
                <span style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '11px', letterSpacing: '0.12em', opacity: 0.2, paddingTop: '0.2em' }}>{step.num}</span>
                {/* H3 */}
                <h3 style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(1rem,1.8vw,1.3rem)', textTransform: 'uppercase', lineHeight: 1.1 }}>
                  {isFr ? step.fr : step.en}
                </h3>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.7, opacity: 0.45 }}>
                  {isFr ? step.descFr : step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CTA — H2
      ════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', padding: 'clamp(8rem,14vw,14rem) 0', overflow: 'hidden', textAlign: 'center' }}>
        {/* AsciiArt background */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 0 }}>
          <AsciiArt
            src="/images/headshots/jeremy-soares-bw.jpg"
            cols={130}
            rows={70}
            color={CREAM}
            opacity={0.05}
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Big watermark */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(8rem,20vw,22rem)', letterSpacing: '0.04em', textTransform: 'uppercase', opacity: 0.025, pointerEvents: 'none', userSelect: 'none', whiteSpace: 'nowrap', zIndex: 1 }}>
          BUILD
        </div>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '640px', margin: '0 auto', padding: '0 clamp(2rem,5vw,6rem)' }}>
          <h5 style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: ORANGE, opacity: 0.8, marginBottom: '1.5rem' }}>
            <SplitReveal stagger={28}>{isFr ? '(06) — Contact' : '(06) — Contact'}</SplitReveal>
          </h5>
          <h2 className="web-reveal" style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(2.5rem,6vw,5rem)', lineHeight: 1, textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            {isFr ? 'Démarrons quelque chose.' : "Let's build something."}
          </h2>
          <SectionReveal delay={0.2}>
            <p style={{ fontSize: '1rem', lineHeight: 1.75, opacity: 0.4, marginBottom: '2.5rem' }}>
              {isFr
                ? "Chaque projet commence par une conversation. Dites-nous ce que vous construisez — on vous dira comment l'alimenter."
                : "Every project starts with a conversation. Tell us what you're building — we'll tell you how to power it."}
            </p>
          </SectionReveal>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href={`/${locale}/contact`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', background: CREAM, color: VOID, padding: '16px 32px', textDecoration: 'none', transition: 'background 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#d8d4cb' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = CREAM }}
            >
              {isFr ? 'Parler du projet' : 'Talk about the project'}
            </Link>
            <a
              href="mailto:JeremySoares@icloud.com"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', border: `1px solid rgba(236,234,229,0.2)`, color: CREAM, padding: '16px 32px', textDecoration: 'none', transition: 'border-color 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(236,234,229,0.6)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(236,234,229,0.2)' }}
            >
              JeremySoares@icloud.com
            </a>
          </div>
        </div>
      </section>

    </main>
  )
}
