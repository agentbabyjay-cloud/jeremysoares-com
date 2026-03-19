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
      <Section theme="cream" className="py-24 md:py-32">
        <Container size="lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <StatCounter value={50} suffix="+" label={isFr ? 'Domaines' : 'Domains'} />
            <StatCounter value={14000} label={isFr ? 'Courtiers' : 'Brokers'} />
            <StatCounter value={10} suffix="+" label={isFr ? "Années d'exp." : 'Years Exp.'} />
            <StatCounter value={2} label={isFr ? 'Marchés' : 'Markets'} />
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
