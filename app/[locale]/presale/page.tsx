import type { Metadata } from 'next'
import { getAllPresale } from '@/lib/content/presale'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Label } from '@/components/ui/Label'
import { TextReveal } from '@/components/animation/TextReveal'
import { SectionReveal } from '@/components/animation/SectionReveal'
import { PreSaleCard } from '@/components/content/PreSaleCard'
import { StatCounter } from '@/components/content/StatCounter'
import { Button } from '@/components/ui/Button'
import type { Locale } from '@/lib/content/types'

const FONT_BARLOW = `var(--font-barlow), 'Barlow', sans-serif`

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale === 'fr-ca'
  return {
    title: isFr
      ? 'Marketing Prévente pour Promoteurs | 50+ Domaines, 14K Courtiers — Jeremy Soares'
      : 'Pre-Sale Marketing for Developers | 50+ Domains, 14K Brokers — Jeremy Soares',
    description: isFr
      ? 'Votre partenaire en marketing de prévente à Montréal. Infrastructure de 50 domaines, réseau de 14 000 courtiers, plateforme aimmo. Spécialiste nouvelles constructions au Québec.'
      : 'Your pre-sale marketing partner in Montreal. 50 domain infrastructure, 14,000 broker network, aimmo platform. New construction marketing specialist in Quebec.',
    keywords: isFr
      ? ['marketing prévente Montréal', 'marketing promoteur Québec', 'nouvelles constructions marketing', 'aimmo plateforme', 'courtiers réseau Montréal']
      : ['pre-sale marketing Montreal', 'developer marketing Quebec', 'new construction marketing', 'aimmo platform', 'broker network Montreal'],
    alternates: {
      canonical: `https://jeremysoares.com/${locale}/presale`,
      languages: {
        'en-CA': 'https://jeremysoares.com/en-ca/presale',
        'fr-CA': 'https://jeremysoares.com/fr-ca/presale',
      },
    },
    openGraph: {
      type: 'website',
      url: `https://jeremysoares.com/${locale}/presale`,
      title: isFr
        ? 'Marketing Prévente pour Promoteurs — Jeremy Soares'
        : 'Pre-Sale Marketing for Developers — Jeremy Soares',
      description: isFr
        ? 'Infrastructure complète : 50 domaines, 14 000 courtiers, plateforme aimmo.'
        : 'Full infrastructure: 50 domains, 14,000 brokers, aimmo platform.',
      siteName: 'Jeremy Soares',
      locale: isFr ? 'fr_CA' : 'en_CA',
    },
  }
}

export default async function PreSalePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr-ca'
  const contentLocale: Locale = isFr ? 'fr' : 'en'
  const projects = getAllPresale(contentLocale)

  const steps = isFr
    ? [
        { num: '01', title: 'Stratégie', desc: "Analyse du marché, positionnement du projet, identification de l'audience cible." },
        { num: '02', title: 'Infrastructure', desc: "Création du site web, déploiement des domaines, configuration des campagnes courriel." },
        { num: '03', title: 'Lancement', desc: "Distribution au réseau de 14 000 courtiers, campagnes ciblées, événements de lancement." },
        { num: '04', title: 'Résultats', desc: "Suivi des conversions, rapports de performance, optimisation continue jusqu'à la vente complète." },
      ]
    : [
        { num: '01', title: 'Strategy', desc: 'Market analysis, project positioning, target audience identification.' },
        { num: '02', title: 'Infrastructure', desc: 'Website creation, domain deployment, email campaign configuration.' },
        { num: '03', title: 'Launch', desc: '14,000 broker distribution, targeted campaigns, launch events.' },
        { num: '04', title: 'Results', desc: 'Conversion tracking, performance reports, continuous optimization to sell-out.' },
      ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: isFr ? 'Marketing Prévente — Jeremy Soares' : 'Pre-Sale Marketing — Jeremy Soares',
    description: isFr
      ? 'Services complets de marketing prévente pour promoteurs immobiliers au Québec.'
      : 'Full-service pre-sale marketing for real estate developers in Quebec.',
    url: `https://jeremysoares.com/${locale}/presale`,
    provider: {
      '@type': 'Person',
      name: 'Jeremy Soares',
      url: 'https://jeremysoares.com',
    },
    areaServed: {
      '@type': 'Place',
      name: 'Montréal, QC, Canada',
    },
    serviceType: isFr ? 'Marketing immobilier prévente' : 'Pre-sale real estate marketing',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      url: `https://jeremysoares.com/${locale}/contact`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <Section theme="void" className="pt-32 pb-16 md:pt-40 md:pb-20">
        <Container size="lg">
          <Label className="mb-6">{isFr ? '(Prévente)' : '(Pre-Sale)'}</Label>
          <TextReveal
            as="h1"
            split="words"
            immediate
            delay={0.2}
            className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-tight tracking-tight text-[#eceae5] uppercase"
            style={{ fontFamily: "var(--font-barlow), 'Barlow', sans-serif" }}
          >
            {isFr ? 'Votre partenaire en prévente' : 'Your Pre-Sale Marketing Partner'}
          </TextReveal>
          <SectionReveal delay={0.4} className="mt-6">
            <p className="text-[1rem] text-[#eceae5] opacity-50 leading-relaxed max-w-xl">
              {isFr
                ? "Infrastructure marketing complète : 50 domaines, 14 000 courtiers, plateforme aimmo. Tout ce qu'il faut pour vendre votre projet avant la compétition."
                : 'Full marketing infrastructure: 50 domains, 14,000 brokers, aimmo platform. Everything needed to sell your project before the competition.'}
            </p>
          </SectionReveal>
        </Container>
      </Section>

      {/* Stats */}
      <Section theme="void" className="py-20 border-t border-[rgba(236,234,229,0.06)]">
        <Container size="lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-0">
            <StatCounter value={50} suffix="+" label={isFr ? 'Domaines' : 'Domains'} />
            <StatCounter value={14000} label={isFr ? 'Courtiers' : 'Brokers'} />
            <StatCounter value={10} suffix="+" label={isFr ? "Années d'exp." : 'Years Exp.'} />
            <StatCounter value={2} label={isFr ? 'Marchés' : 'Markets'} />
          </div>
        </Container>
      </Section>

      {/* Services detail */}
      <Section theme="cream" className="py-24 md:py-32">
        <Container size="lg">
          <SectionReveal>
            <p style={{ fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', opacity: 0.4, marginBottom: '1.5rem' }}>
              — {isFr ? 'Ce que nous faisons' : 'What we do'}
            </p>
          </SectionReveal>
          <TextReveal
            as="h2"
            split="words"
            className="text-[clamp(2rem,5vw,3.75rem)] font-black leading-none tracking-tight text-[#0e1011] uppercase mb-16"
            style={{ fontFamily: FONT_BARLOW }}
          >
            {isFr ? 'Deux offres. Un seul partenaire.' : 'Two offers. One partner.'}
          </TextReveal>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2rem,5vw,6rem)', borderTop: '1px solid rgba(14,16,17,0.1)' }} className="service-cols-responsive">
            {/* Service 1 */}
            <SectionReveal>
              <div style={{ paddingTop: '2.5rem' }}>
                <span style={{ fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', opacity: 0.3, fontWeight: 700 }}>01</span>
                <h3 style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(1.5rem,2.5vw,2rem)', textTransform: 'uppercase', letterSpacing: '0.03em', color: '#0e1011', margin: '1rem 0' }}>
                  {isFr ? 'Marketing & Vente Prévente' : 'Pre-Sale Marketing & Sales'}
                </h3>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.8, opacity: 0.55, color: '#0e1011', marginBottom: '1.5rem' }}>
                  {isFr
                    ? "De l'identité visuelle jusqu'à la vente complète — nous gérons l'intégralité de votre campagne de prévente. Accès direct à 14 000 courtiers actifs à Montréal, une infrastructure de 50+ domaines immobiliers thématiques, et des campagnes ciblées sur Google, Meta et les portails immobiliers."
                    : "From visual identity to sell-out — we manage your entire pre-sale campaign. Direct access to 14,000 active brokers in Montreal, an infrastructure of 50+ thematic real estate domains, and targeted campaigns across Google, Meta, and listing portals."}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {(isFr ? [
                    'Identité visuelle & branding du projet',
                    'Site web dédié de prévente',
                    'Distribution à 14 000 courtiers',
                    'Campagnes Google & Meta ciblées',
                    'Rendus architecturaux IA (aimmo)',
                    'Événements de lancement & suivi des ventes',
                  ] : [
                    'Project visual identity & branding',
                    'Dedicated pre-sale website',
                    '14,000-broker distribution',
                    'Targeted Google & Meta campaigns',
                    'AI architectural renders (aimmo)',
                    'Launch events & sales tracking',
                  ]).map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.85rem', opacity: 0.6, color: '#0e1011' }}>
                      <span style={{ marginTop: '2px', opacity: 0.5 }}>—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </SectionReveal>

            {/* Service 2 */}
            <SectionReveal delay={0.15}>
              <div style={{ paddingTop: '2.5rem' }}>
                <span style={{ fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', opacity: 0.3, fontWeight: 700 }}>02</span>
                <h3 style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(1.5rem,2.5vw,2rem)', textTransform: 'uppercase', letterSpacing: '0.03em', color: '#0e1011', margin: '1rem 0' }}>
                  {isFr ? 'Sites Web IA pour Petits Promoteurs' : 'AI-Powered Websites for Developers'}
                </h3>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.8, opacity: 0.55, color: '#0e1011', marginBottom: '1.5rem' }}>
                  {isFr
                    ? "Nous créons des sites web de projet complets assistés par IA — en quelques jours, pas en semaines — pour les promoteurs de petits et moyens projets partout au Québec. Chaque site est optimisé pour le SEO, le bilinguisme EN/FR, et la conversion de leads, avec un formulaire de réservation intégré et un tableau de bord de suivi des intérêts."
                    : "We build complete AI-assisted project websites — in days, not weeks — for small-to-medium developers across Quebec. Every site is SEO-optimized, bilingual EN/FR, built for lead conversion, with an integrated reservation form and interest-tracking dashboard."}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {(isFr ? [
                    'Site web bilingue EN/FR clé en main',
                    'SEO optimisé — Google & portails locaux',
                    'Formulaire de réservation & liste d\'intérêt',
                    'Galerie de rendus & plans d\'étage interactifs',
                    'Tableau de bord de suivi en temps réel',
                    'Hébergement, maintenance & mises à jour inclus',
                  ] : [
                    'Turnkey bilingual EN/FR website',
                    'SEO-optimized — Google & local portals',
                    'Reservation form & interest list',
                    'Interactive render gallery & floor plans',
                    'Real-time lead tracking dashboard',
                    'Hosting, maintenance & updates included',
                  ]).map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.85rem', opacity: 0.6, color: '#0e1011' }}>
                      <span style={{ marginTop: '2px', opacity: 0.5 }}>—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </SectionReveal>
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section theme="void" className="py-24 md:py-32">
        <Container size="lg">
          <TextReveal
            as="h2"
            split="lines"
            className="text-[clamp(2rem,5vw,3.75rem)] font-black leading-none tracking-tight text-[#eceae5] uppercase mb-12"
            style={{ fontFamily: "var(--font-barlow), 'Barlow', sans-serif" }}
          >
            {isFr ? 'Le processus' : 'The Process'}
          </TextReveal>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step) => (
              <SectionReveal key={step.num}>
                <div className="border-t border-[rgba(236,234,229,0.1)] pt-6">
                  <span className="text-[0.625rem] tracking-[0.22em] uppercase text-[#eceae5] opacity-30 font-bold">
                    {step.num}
                  </span>
                  <h3
                    className="text-[1.25rem] font-black tracking-tight text-[#eceae5] uppercase mt-4 mb-3"
                    style={{ fontFamily: "var(--font-barlow), 'Barlow', sans-serif" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[0.75rem] text-[#eceae5] opacity-50 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Projects */}
      {projects.length > 0 && (
        <Section theme="void" className="pb-24">
          <Container size="lg">
            <Label className="mb-8">{isFr ? '(Projets)' : '(Projects)'}</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <PreSaleCard key={project.slug} project={project} locale={locale} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* L'Émeraude Gallery */}
      <Section theme="cream" className="py-24 md:py-32">
        <Container size="lg">
          <SectionReveal>
            <Label className="mb-4">{isFr ? '(Vitrine — Résidentiel boutique)' : '(Showcase — Boutique Residential)'}</Label>
          </SectionReveal>
          <TextReveal
            as="h2"
            split="words"
            className="text-[clamp(2rem,5vw,3.75rem)] font-black leading-none tracking-tight text-[#0e1011] uppercase mb-12"
            style={{ fontFamily: FONT_BARLOW }}
          >
            {isFr ? "L'Émeraude" : "L'Émeraude"}
          </TextReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <div className="col-span-2 row-span-2">
              <img
                src="/images/presale/emeraude-exterior.png"
                alt="L'Émeraude — exterior render, Plateau-Mont-Royal Montreal"
                style={{ width: '100%', height: '420px', objectFit: 'cover' }}
              />
            </div>
            <img
              src="/images/presale/emeraude-aerial.png"
              alt="L'Émeraude — aerial render"
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <img
              src="/images/presale/emeraude-side.png"
              alt="L'Émeraude — side elevation render"
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <img
              src="/images/presale/emeraude-detail.png"
              alt="L'Émeraude — architectural detail render"
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
          </div>
          <SectionReveal>
            <p className="text-[0.875rem] text-[#0e1011] opacity-60 leading-relaxed max-w-2xl mt-6">
              {isFr
                ? "Exemple de campagne prévente : identité visuelle, rendus architecturaux, site web dédié et distribution à notre réseau de 14 000 courtiers. Ceci est une vitrine de ce que votre projet pourrait ressembler."
                : "Sample pre-sale campaign: visual identity, architectural renders, dedicated website, and distribution to our 14,000-broker network. This is a showcase of what your project could look like."}
            </p>
          </SectionReveal>
        </Container>
      </Section>

      {/* L'Héritage Gallery */}
      <Section theme="void" className="py-24 md:py-32">
        <Container size="lg">
          <SectionReveal>
            <Label className="mb-4">{isFr ? '(Vitrine — Résidentiel luxe)' : '(Showcase — Luxury Residential)'}</Label>
          </SectionReveal>
          <TextReveal
            as="h2"
            split="words"
            className="text-[clamp(2rem,5vw,3.75rem)] font-black leading-none tracking-tight text-[#eceae5] uppercase mb-12"
            style={{ fontFamily: FONT_BARLOW }}
          >
            {isFr ? "L'Héritage" : "L'Héritage"}
          </TextReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <div className="col-span-2 row-span-2">
              <img
                src="/images/presale/heritage-facade.png"
                alt="L'Héritage — facade render, Outremont Montreal"
                style={{ width: '100%', height: '420px', objectFit: 'cover' }}
              />
            </div>
            <img
              src="/images/presale/heritage-pool.png"
              alt="L'Héritage — rooftop pool render"
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <img
              src="/images/presale/heritage-wide.png"
              alt="L'Héritage — wide exterior render"
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <img
              src="/images/presale/heritage-sauna.png"
              alt="L'Héritage — spa and sauna amenity render"
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
          </div>
          <SectionReveal>
            <p className="text-[0.875rem] text-[#eceae5] opacity-50 leading-relaxed max-w-2xl mt-6">
              {isFr
                ? "Exemple de campagne prévente luxe : image de marque, rendus architecturaux haut de gamme et stratégie de mise en marché. Ceci est une vitrine de ce que votre projet pourrait ressembler."
                : "Sample luxury pre-sale campaign: branding, high-end architectural renders, and go-to-market strategy. This is a showcase of what your project could look like."}
            </p>
          </SectionReveal>
        </Container>
      </Section>

      {/* CTA */}
      <Section theme="void" className="py-20 border-t border-[rgba(236,234,229,0.06)]">
        <Container size="sm" className="text-center">
          <TextReveal
            as="h2"
            split="words"
            className="text-[clamp(2rem,5vw,3.75rem)] font-black leading-tight tracking-tight text-[#eceae5] uppercase mb-4"
            style={{ fontFamily: "var(--font-barlow), 'Barlow', sans-serif" }}
          >
            {isFr ? 'Collaborons' : 'Partner With Us'}
          </TextReveal>
          <SectionReveal delay={0.2}>
            <p className="text-[0.875rem] text-[#eceae5] opacity-50 leading-relaxed max-w-md mx-auto mb-8">
              {isFr
                ? "Que vous soyez un promoteur cherchant à maximiser la portée ou un agent voulant accéder à notre infrastructure — discutons."
                : "Whether you're a developer seeking reach or an agent wanting access to our infrastructure — let's talk."}
            </p>
          </SectionReveal>
          <Button variant="primary" href={`/${locale}/contact`} size="lg">
            {isFr ? 'Contactez-nous' : 'Get in Touch'}
          </Button>
        </Container>
      </Section>
    </>
  )
}
