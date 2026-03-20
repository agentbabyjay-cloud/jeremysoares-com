import type { Metadata } from 'next'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Label } from '@/components/ui/Label'
import { TextReveal } from '@/components/animation/TextReveal'
import { SectionReveal } from '@/components/animation/SectionReveal'
import { Button } from '@/components/ui/Button'

const SITE_URL = 'https://jeremysoares.com'
const FONT_BARLOW = `var(--font-barlow), 'Barlow', sans-serif`

export async function generateStaticParams() {
  return [{ locale: 'en-ca' }, { locale: 'fr-ca' }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale === 'fr-ca'

  return {
    title: isFr
      ? 'Vendre votre maison à Montréal | Courtier Vendeur — Jeremy Soares'
      : 'Sell Your Home in Montreal | Listing Broker — Jeremy Soares',
    description: isFr
      ? 'Marketing stratégique à Montréal. Mise en scène IA, réseau de 50+ domaines, 14 000 courtiers. OACIQ H2731 — prix maximal, délai minimal.'
      : 'Strategic property marketing in Montreal. AI staging, 50+ domain network, 14,000 broker network. OACIQ H2731 — maximum price, minimum time.',
    keywords: isFr
      ? [
          'vendre maison montréal',
          'courtier vendeur montréal',
          'vendre propriété montréal',
          'OACIQ H2731',
          'marketing immobilier montréal',
          'mise en scène virtuelle',
          'évaluation gratuite montréal',
        ]
      : [
          'sell home montreal',
          'listing broker montreal',
          'sell property montreal',
          'OACIQ H2731',
          'real estate marketing montreal',
          'virtual staging montreal',
          'free home evaluation montreal',
        ],
    alternates: {
      canonical: `${SITE_URL}/${locale}/sell`,
      languages: {
        'en-CA': `${SITE_URL}/en-ca/sell`,
        'fr-CA': `${SITE_URL}/fr-ca/sell`,
      },
    },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}/${locale}/sell`,
      title: isFr
        ? 'Vendre votre propriété à Montréal — Jeremy Soares'
        : 'Sell Your Property in Montréal — Jeremy Soares',
      description: isFr
        ? 'Marketing stratégique. Mise en scène IA, 14 000 courtiers. OACIQ H2731.'
        : 'Strategic marketing. AI staging, 14,000 brokers. OACIQ H2731.',
      siteName: 'Jeremy Soares',
      locale: isFr ? 'fr_CA' : 'en_CA',
    },
  }
}

export default async function SellPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr-ca'

  const reasons = isFr
    ? [
        {
          num: '01',
          title: 'Mise en scène IA aimmo',
          desc: "La mise en scène virtuelle professionnelle par notre plateforme aimmo transforme vos espaces et accélère la vente.",
        },
        {
          num: '02',
          title: 'Réseau de 14 000 courtiers',
          desc: "Votre propriété est distribuée à l'ensemble de notre réseau de courtiers dès le premier jour — visibilité maximale garantie.",
        },
        {
          num: '03',
          title: 'Résultats prouvés',
          desc: "Plus de 10 ans à vendre l'immobilier montréalais dans tous les quartiers. Les chiffres parlent d'eux-mêmes.",
        },
      ]
    : [
        {
          num: '01',
          title: 'aimmo AI Staging',
          desc: 'Professional virtual staging through our aimmo platform transforms your spaces and makes listings sell faster.',
        },
        {
          num: '02',
          title: '14,000 Broker Network',
          desc: 'Your listing is distributed to every broker in our network from day one — maximum visibility from the start.',
        },
        {
          num: '03',
          title: 'Proven Results',
          desc: '10+ years selling Montreal real estate across every neighbourhood. The numbers speak for themselves.',
        },
      ]

  const sellingSteps = isFr
    ? [
        { num: '01', title: 'Évaluation', desc: "Analyse comparative du marché pour établir le juste prix — compétitif, mais maximisant votre rendement." },
        { num: '02', title: 'Préparation & Mise en scène', desc: "Conseils de présentation, mise en scène virtuelle aimmo et photographie professionnelle incluses." },
        { num: '03', title: 'Inscription & Distribution', desc: "Publication sur Centris, Realtor.ca, réseau de 50+ domaines et distribution aux 14 000 courtiers." },
        { num: '04', title: 'Négociation', desc: "Gestion et contre-offres stratégiques pour obtenir le meilleur prix dans les meilleures conditions." },
        { num: '05', title: 'Clôture', desc: "Coordination notariale, suivi des conditions et accompagnement jusqu'à l'acte de vente final." },
      ]
    : [
        { num: '01', title: 'Evaluation', desc: 'Comparative market analysis to price your property right — competitive, while maximising your return.' },
        { num: '02', title: 'Preparation & Staging', desc: 'Presentation advice, aimmo virtual staging, and professional photography — all included.' },
        { num: '03', title: 'Listing & Distribution', desc: 'Published on Centris, Realtor.ca, our 50+ domain network, and pushed to 14,000 brokers.' },
        { num: '04', title: 'Negotiation', desc: 'Strategic counter-offer management to secure the best price under the best conditions.' },
        { num: '05', title: 'Closing', desc: 'Notarial coordination, condition follow-through, and full support through to the final deed of sale.' },
      ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: isFr
      ? 'Représentation Vendeur — Jeremy Soares'
      : 'Seller Representation — Jeremy Soares',
    description: isFr
      ? 'Marketing stratégique pour vendre votre propriété à Montréal. OACIQ H2731.'
      : 'Strategic property marketing to sell your home in Montreal. OACIQ H2731.',
    url: `${SITE_URL}/${locale}/sell`,
    provider: {
      '@type': 'Person',
      name: 'Jeremy Soares',
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'Place',
      name: 'Montréal, QC, Canada',
    },
    serviceType: isFr ? 'Représentation Vendeur' : 'Seller Representation',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/${locale}/contact`,
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
          <Label className="mb-6">
            {isFr ? '(Représentation Vendeur)' : '(Seller Representation)'}
          </Label>
          <TextReveal
            as="h1"
            split="words"
            immediate
            delay={0.2}
            className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-tight tracking-tight text-[#eceae5] uppercase"
            style={{ fontFamily: FONT_BARLOW }}
          >
            {isFr ? 'Vendez votre propriété' : 'Sell Your Property'}
          </TextReveal>
          <SectionReveal delay={0.4} className="mt-6">
            <p className="text-[1rem] text-[#eceae5] opacity-50 leading-relaxed max-w-xl">
              {isFr
                ? "Prix maximal. Délai minimal. Une stratégie marketing complète — de l'évaluation à la remise des clés — avec l'infrastructure qui fait la différence."
                : "Maximum price. Minimum time. A complete marketing strategy — from evaluation to closing — backed by the infrastructure that makes the difference."}
            </p>
          </SectionReveal>
        </Container>
      </Section>

      {/* Hero Image */}
      <Section theme="cream" className="py-0">
        <Container size="full" padded={false}>
          <img
            src="/images/buy-sell-rent/montreal-view.jpg"
            alt="Montreal property listing by Jeremy Soares"
            style={{ width: '100%', height: '480px', objectFit: 'cover' }}
          />
        </Container>
      </Section>

      {/* Why Sell With Jeremy */}
      <Section theme="void" className="py-24 md:py-32">
        <Container size="lg">
          <TextReveal
            as="h2"
            split="lines"
            className="text-[clamp(2rem,5vw,3.75rem)] font-black leading-none tracking-tight text-[#eceae5] uppercase mb-12"
            style={{ fontFamily: FONT_BARLOW }}
          >
            {isFr ? 'Pourquoi vendre avec Jeremy' : 'Why Sell With Jeremy'}
          </TextReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reasons.map((reason) => (
              <SectionReveal key={reason.num}>
                <div className="border-t border-[rgba(236,234,229,0.1)] pt-6">
                  <span className="text-[0.625rem] tracking-[0.22em] uppercase text-[#eceae5] opacity-30 font-bold">
                    {reason.num}
                  </span>
                  <h3
                    className="text-[1.25rem] font-black tracking-tight text-[#eceae5] uppercase mt-4 mb-3"
                    style={{ fontFamily: FONT_BARLOW }}
                  >
                    {reason.title}
                  </h3>
                  <p className="text-[0.75rem] text-[#eceae5] opacity-50 leading-relaxed">
                    {reason.desc}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* The Selling Process */}
      <Section theme="cream" className="py-24 md:py-32">
        <Container size="lg">
          <TextReveal
            as="h2"
            split="lines"
            className="text-[clamp(2rem,5vw,3.75rem)] font-black leading-none tracking-tight text-[#0e1011] uppercase mb-12"
            style={{ fontFamily: FONT_BARLOW }}
          >
            {isFr ? 'Le processus de vente' : 'The Selling Process'}
          </TextReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
            {sellingSteps.map((step) => (
              <SectionReveal key={step.num}>
                <div className="border-t border-[rgba(14,16,17,0.1)] pt-6">
                  <span className="text-[0.625rem] tracking-[0.22em] uppercase text-[#0e1011] opacity-30 font-bold">
                    {step.num}
                  </span>
                  <h3
                    className="text-[1rem] font-black tracking-tight text-[#0e1011] uppercase mt-4 mb-3"
                    style={{ fontFamily: FONT_BARLOW }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[0.75rem] text-[#0e1011] opacity-60 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section theme="void" className="py-20 border-t border-[rgba(236,234,229,0.06)]">
        <Container size="sm" className="text-center">
          <TextReveal
            as="h2"
            split="words"
            className="text-[clamp(2rem,5vw,3.75rem)] font-black leading-tight tracking-tight text-[#eceae5] uppercase mb-4"
            style={{ fontFamily: FONT_BARLOW }}
          >
            {isFr ? 'Obtenez une évaluation gratuite' : 'Get a Free Evaluation'}
          </TextReveal>
          <SectionReveal delay={0.2}>
            <p className="text-[0.875rem] text-[#eceae5] opacity-50 leading-relaxed max-w-md mx-auto mb-8">
              {isFr
                ? "Aucun engagement. Une évaluation honnête de votre propriété et une stratégie claire pour maximiser votre vente."
                : "No commitment. An honest assessment of your property and a clear strategy to maximise your sale."}
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
