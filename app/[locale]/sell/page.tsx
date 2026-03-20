import type { Metadata } from 'next'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Label } from '@/components/ui/Label'
import { TextReveal } from '@/components/animation/TextReveal'
import { SectionReveal } from '@/components/animation/SectionReveal'
import { Button } from '@/components/ui/Button'

const SITE_URL = 'https://jeremysoares.com'
const FONT_BARLOW = `var(--font-barlow), 'Barlow', sans-serif`
const FONT_DM_SANS = `var(--font-dm-sans), 'DM Sans', sans-serif`

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
      ? 'Vendre ma Maison à Montréal | Courtier Vendeur — Jeremy Soares OACIQ H2731'
      : 'Sell My Home in Montreal | Listing Broker — Jeremy Soares OACIQ H2731',
    description: isFr
      ? 'Vendez votre propriété au meilleur prix à Montréal. Mise en scène IA aimmo, réseau de 14 000 courtiers, 50+ domaines. Évaluation gratuite. OACIQ H2731.'
      : 'Sell your Montreal property for maximum value. aimmo AI staging, 14,000-broker network, 50+ domain reach. Free evaluation. OACIQ H2731.',
    keywords: isFr
      ? ['vendre maison montréal', 'courtier vendeur montréal', 'évaluation propriété gratuite', 'OACIQ H2731', 'vendre condo montréal', 'aimmo mise en scène']
      : ['sell home montreal', 'listing broker montreal', 'free home evaluation', 'OACIQ H2731', 'sell condo montreal', 'aimmo staging'],
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
      title: isFr ? 'Vendre à Montréal — Jeremy Soares' : 'Sell in Montréal — Jeremy Soares',
      description: isFr ? 'Le meilleur prix. Le bon réseau. OACIQ H2731.' : 'Maximum price. The right network. OACIQ H2731.',
      siteName: 'Jeremy Soares',
    },
    robots: { index: true, follow: true },
  }
}

export default async function SellPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr-ca'

  const steps = isFr
    ? [
        { num: '01', title: 'Évaluation gratuite', desc: "Analyse comparative approfondie du marché pour établir le prix optimal — pas trop bas, pas trop haut." },
        { num: '02', title: 'Mise en scène IA', desc: "Notre plateforme aimmo produit des visuels de mise en scène professionnelle qui font vendre plus vite et plus cher." },
        { num: '03', title: 'Photos & contenu', desc: "Photographie professionnelle, plans de floor, vidéo et matériel marketing haut de gamme inclus." },
        { num: '04', title: 'Distribution maximale', desc: "Centris, Realtor.ca, 50+ domaines et diffusion directe aux 14 000 courtiers de notre réseau." },
        { num: '05', title: 'Négociation & clôture', desc: "Gestion des offres, négociation experte et coordination jusqu'à la signature finale chez le notaire." },
      ]
    : [
        { num: '01', title: 'Free Evaluation', desc: "Deep comparative market analysis to price your property right — not too low, not too high." },
        { num: '02', title: 'AI Staging', desc: "Our aimmo platform produces professional staging visuals that sell faster and command higher prices." },
        { num: '03', title: 'Photos & Content', desc: "Professional photography, floor plans, video, and high-end marketing materials — all included." },
        { num: '04', title: 'Maximum Distribution', desc: "Centris, Realtor.ca, 50+ domains, and direct push to 14,000 brokers in our network." },
        { num: '05', title: 'Negotiation & Closing', desc: "Offer management, expert negotiation, and full coordination through to the notarial deed." },
      ]

  const differentiators = isFr
    ? [
        { label: '14 000+', sublabel: 'Courtiers dans notre réseau', desc: "Votre propriété est diffusée à l'ensemble du réseau dès le jour de la mise en marché." },
        { label: '50+', sublabel: 'Domaines web dédiés', desc: "Un réseau de sites immobiliers génère du trafic organique directement vers votre propriété." },
        { label: 'aimmo', sublabel: 'Mise en scène IA', desc: "La technologie qui transforme les espaces vides en intérieurs stylisés — sans délai, sans coût supplémentaire." },
        { label: '10+', sublabel: 'Années d\'expérience', desc: "Une décennie de ventes à Montréal dans tous les marchés, toutes les conditions." },
      ]
    : [
        { label: '14,000+', sublabel: 'Brokers in our network', desc: "Your property reaches the full broker network on day one of listing." },
        { label: '50+', sublabel: 'Dedicated web domains', desc: "A network of real estate sites drives organic traffic directly to your listing." },
        { label: 'aimmo', sublabel: 'AI Staging platform', desc: "Technology that transforms empty or dated spaces into styled interiors — fast, included." },
        { label: '10+', sublabel: 'Years of experience', desc: "A decade of Montreal sales across every market condition and neighbourhood." },
      ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: isFr ? 'Représentation Vendeur — Jeremy Soares' : 'Seller Representation — Jeremy Soares',
    description: isFr
      ? 'Marketing stratégique pour vendre votre propriété au meilleur prix à Montréal. OACIQ H2731.'
      : 'Strategic property marketing to sell your Montreal home for maximum value. OACIQ H2731.',
    url: `${SITE_URL}/${locale}/sell`,
    provider: { '@type': 'RealEstateAgent', name: 'Jeremy Soares', url: SITE_URL, telephone: '+15145198177' },
    areaServed: { '@type': 'City', name: 'Montréal' },
    serviceType: isFr ? 'Représentation Vendeur' : 'Seller Representation',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <Section theme="void" className="pt-32 pb-20 md:pt-44 md:pb-24">
        <Container size="lg">
          <Label className="mb-6">{isFr ? '(Vendeurs)' : '(Sellers)'}</Label>
          <TextReveal
            as="h1"
            split="words"
            immediate
            delay={0.15}
            className="text-[clamp(3rem,7vw,6rem)] font-black leading-none tracking-tight text-[#eceae5] uppercase"
            style={{ fontFamily: FONT_BARLOW }}
          >
            {isFr ? 'Vendez\nau bon prix' : 'Sell for\nmaximum value'}
          </TextReveal>
          <SectionReveal delay={0.35} className="mt-8 max-w-lg">
            <p className="text-[1rem] text-[#eceae5] opacity-50 leading-relaxed">
              {isFr
                ? "Mise en scène IA, réseau de 14 000 courtiers et 50+ domaines web — votre propriété mérite une stratégie marketing complète, pas juste une fiche sur Centris."
                : "AI staging, 14,000 brokers, and 50+ web domains — your property deserves a full marketing strategy, not just a Centris listing."}
            </p>
          </SectionReveal>
          <SectionReveal delay={0.5} className="mt-8 flex flex-wrap gap-4">
            <Button variant="primary" theme="dark" href={`/${locale}/contact`} size="lg">
              {isFr ? 'Évaluation gratuite' : 'Free Evaluation'}
            </Button>
            <Button variant="ghost" theme="dark" href={`tel:+15145198177`} size="lg">
              514 519-8177
            </Button>
          </SectionReveal>
          <SectionReveal delay={0.6} className="mt-10">
            <p className="text-[0.625rem] tracking-[0.2em] uppercase text-[#eceae5] opacity-25" style={{ fontFamily: FONT_DM_SANS }}>
              OACIQ H2731 &nbsp;·&nbsp; {isFr ? 'Courtier licencié au Québec' : 'Licensed broker in Québec'}
            </p>
          </SectionReveal>
        </Container>
      </Section>

      {/* Hero Image */}
      <img
        src="/images/buy-sell-rent/montreal-view.jpg"
        alt={isFr ? 'Propriété à vendre Montréal — Jeremy Soares courtier vendeur' : 'Property for sale Montreal — Jeremy Soares listing broker'}
        style={{ width: '100%', height: '55vh', objectFit: 'cover', display: 'block' }}
      />

      {/* Differentiators */}
      <Section theme="cream" className="py-24 md:py-32">
        <Container size="lg">
          <Label theme="light" className="mb-8">{isFr ? '(Ce qui fait la différence)' : '(What Makes the Difference)'}</Label>
          <TextReveal
            as="h2"
            split="words"
            className="text-[clamp(2rem,4vw,3.25rem)] font-black leading-none tracking-tight text-[#0e1011] uppercase mb-16"
            style={{ fontFamily: FONT_BARLOW }}
          >
            {isFr ? 'Plus que Centris.\nBeaucoup plus.' : 'More than Centris.\nMuch more.'}
          </TextReveal>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
            {differentiators.map((d, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div className="border-t border-[rgba(14,16,17,0.1)] pt-6 pr-8">
                  <div className="text-[2.5rem] font-black leading-none text-[#0e1011] mb-1" style={{ fontFamily: FONT_BARLOW }}>{d.label}</div>
                  <div className="text-[0.625rem] tracking-[0.18em] uppercase text-[#f55f00] font-bold mb-3" style={{ fontFamily: FONT_DM_SANS }}>{d.sublabel}</div>
                  <p className="text-[0.8rem] text-[#0e1011] opacity-55 leading-relaxed" style={{ fontFamily: FONT_DM_SANS }}>{d.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* aimmo Staging */}
      <Section theme="void" className="py-24 md:py-32">
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <Label className="mb-4">{isFr ? '(aimmo — Mise en scène IA)' : '(aimmo — AI Staging)'}</Label>
              <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-black leading-tight tracking-tight text-[#eceae5] uppercase mb-6" style={{ fontFamily: FONT_BARLOW }}>
                {isFr ? 'Des visuels qui\nfont vendre' : 'Visuals that\nmake sales'}
              </h2>
              <p className="text-[0.9375rem] text-[#eceae5] opacity-50 leading-relaxed mb-4" style={{ fontFamily: FONT_DM_SANS }}>
                {isFr
                  ? "aimmo est notre plateforme interne de mise en scène virtuelle par intelligence artificielle. En quelques heures, vos espaces sont transformés en intérieurs stylisés et photo-réalistes."
                  : "aimmo is our in-house AI virtual staging platform. In hours, your spaces are transformed into styled, photo-realistic interiors that buyers connect with immediately."}
              </p>
              <p className="text-[0.9375rem] text-[#eceae5] opacity-50 leading-relaxed mb-8" style={{ fontFamily: FONT_DM_SANS }}>
                {isFr
                  ? "Les propriétés avec mise en scène professionnelle se vendent en moyenne 20% plus vite et commandent des prix plus élevés. C'est inclus dans votre mandat."
                  : "Professionally staged listings sell on average 20% faster and command higher prices. It's included in your listing agreement."}
              </p>
              <Button variant="primary" theme="dark" href="https://aimmo.ca" size="md">
                {isFr ? 'Voir aimmo' : 'See aimmo'}
              </Button>
            </SectionReveal>
            <SectionReveal delay={0.15}>
              <img
                src="/images/buy-sell-rent/nice-indoor.jpg"
                alt={isFr ? 'Mise en scène IA aimmo — propriété à vendre Montréal' : 'aimmo AI staging — Montreal property listing'}
                style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }}
              />
            </SectionReveal>
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section theme="cream" className="py-24 md:py-32">
        <Container size="lg">
          <Label theme="light" className="mb-8">{isFr ? '(Le processus de vente)' : '(The Selling Process)'}</Label>
          <TextReveal
            as="h2"
            split="words"
            className="text-[clamp(2rem,4vw,3.25rem)] font-black leading-none tracking-tight text-[#0e1011] uppercase mb-16"
            style={{ fontFamily: FONT_BARLOW }}
          >
            {isFr ? 'De l\'évaluation\nà la signature' : 'From evaluation\nto signature'}
          </TextReveal>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {steps.map((step) => (
              <SectionReveal key={step.num}>
                <div className="border-t border-[rgba(14,16,17,0.1)] pt-5">
                  <span className="text-[0.625rem] tracking-[0.22em] uppercase text-[#0e1011] opacity-25 font-bold" style={{ fontFamily: FONT_DM_SANS }}>{step.num}</span>
                  <h3 className="text-[1rem] font-black tracking-tight text-[#0e1011] uppercase mt-3 mb-2" style={{ fontFamily: FONT_BARLOW }}>{step.title}</h3>
                  <p className="text-[0.75rem] text-[#0e1011] opacity-55 leading-relaxed" style={{ fontFamily: FONT_DM_SANS }}>{step.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section theme="void" className="py-24 md:py-32">
        <Container size="sm" className="text-center">
          <TextReveal
            as="h2"
            split="words"
            className="text-[clamp(2.5rem,5vw,4rem)] font-black leading-tight tracking-tight text-[#eceae5] uppercase mb-4"
            style={{ fontFamily: FONT_BARLOW }}
          >
            {isFr ? 'Combien vaut\nvotre propriété?' : 'What is your\nproperty worth?'}
          </TextReveal>
          <SectionReveal delay={0.2}>
            <p className="text-[0.9375rem] text-[#eceae5] opacity-50 leading-relaxed max-w-sm mx-auto mb-8" style={{ fontFamily: FONT_DM_SANS }}>
              {isFr
                ? "Évaluation gratuite et sans engagement. Je vous remets une analyse complète du marché pour votre propriété."
                : "Free evaluation, no commitment. I provide a complete market analysis specific to your property."}
            </p>
          </SectionReveal>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="primary" theme="dark" href={`/${locale}/contact`} size="lg">
              {isFr ? 'Obtenir mon évaluation' : 'Get My Evaluation'}
            </Button>
            <Button variant="ghost" theme="dark" href={`tel:+15145198177`} size="lg">
              514 519-8177
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
