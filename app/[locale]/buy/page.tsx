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
      ? 'Acheter une maison à Montréal | Courtier Acheteur — Jeremy Soares'
      : "Buy a Home in Montreal | Buyer's Broker — Jeremy Soares",
    description: isFr
      ? 'Représentation acheteur à Montréal. Plateau, Mile-End, Outremont, NDG et plus. OACIQ H2731 — vos intérêts, pleinement protégés.'
      : 'Expert buyer representation in Montreal. Plateau, Mile-End, Outremont, NDG and beyond. OACIQ H2731 — your interests, fully protected.',
    keywords: isFr
      ? [
          'acheter maison montréal',
          'courtier acheteur montréal',
          'agent immobilier montréal',
          'OACIQ H2731',
          'représentation acheteur montréal',
          'plateau immobilier',
          'mile-end maisons',
        ]
      : [
          'buy home montreal',
          'buyer broker montreal',
          'montreal real estate agent',
          'OACIQ H2731',
          'buyer representation montreal',
          'plateau real estate',
          'mile-end homes',
        ],
    alternates: {
      canonical: `${SITE_URL}/${locale}/buy`,
      languages: {
        'en-CA': `${SITE_URL}/en-ca/buy`,
        'fr-CA': `${SITE_URL}/fr-ca/buy`,
      },
    },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}/${locale}/buy`,
      title: isFr
        ? 'Acheter une maison à Montréal — Jeremy Soares'
        : 'Buy a Home in Montréal — Jeremy Soares',
      description: isFr
        ? 'Représentation acheteur experte à Montréal. OACIQ H2731.'
        : 'Expert buyer representation in Montreal. OACIQ H2731.',
      siteName: 'Jeremy Soares',
      locale: isFr ? 'fr_CA' : 'en_CA',
    },
  }
}

export default async function BuyPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr-ca'

  const steps = isFr
    ? [
        {
          num: '01',
          title: 'Recherche & Stratégie',
          desc: "Analyse de vos besoins, définition du budget et ciblage des quartiers qui correspondent à votre style de vie.",
        },
        {
          num: '02',
          title: 'Visites de propriétés',
          desc: "Sélection rigoureuse des propriétés, accompagnement lors des visites et conseils objectifs à chaque étape.",
        },
        {
          num: '03',
          title: 'Offre & Négociation',
          desc: "Rédaction d'une offre stratégique, négociation pour obtenir le meilleur prix et les meilleures conditions.",
        },
        {
          num: '04',
          title: 'Clôture',
          desc: "Coordination avec les notaires, inspecteurs et prêteurs pour une transaction fluide jusqu'à la remise des clés.",
        },
      ]
    : [
        {
          num: '01',
          title: 'Search & Strategy',
          desc: 'Deep-dive on your needs, budget, and lifestyle to identify the right neighbourhoods and property types.',
        },
        {
          num: '02',
          title: 'Property Visits',
          desc: 'Curated shortlists, accompanied visits, and honest assessments on every property — no pressure, ever.',
        },
        {
          num: '03',
          title: 'Offer & Negotiation',
          desc: 'Strategic offer structuring and skilled negotiation to get you the best price and conditions.',
        },
        {
          num: '04',
          title: 'Closing',
          desc: 'Full coordination with notaries, inspectors, and lenders for a seamless transaction from offer to keys.',
        },
      ]

  const neighbourhoods = isFr
    ? [
        { name: 'Plateau-Mont-Royal', desc: 'Duplexes, triplexes et condos branchés dans le coeur culturel de la ville.' },
        { name: 'Mile-End', desc: 'Quartier créatif avec une offre immobilière diversifiée et une vie de quartier unique.' },
        { name: 'Outremont', desc: 'Maisons unifamiliales prestigieuses et condos de luxe dans un cadre verdoyant.' },
        { name: 'NDG', desc: 'Voisinage familial avec de grandes maisons, écoles renommées et bon rapport qualité-prix.' },
        { name: 'Rosemont', desc: "En plein essor : un mix de propriétés abordables et d'un tissu communautaire vivant." },
        { name: 'Westmount', desc: "L'immobilier haut de gamme par excellence — prestige, architecture et emplacement." },
      ]
    : [
        { name: 'Plateau-Mont-Royal', desc: 'Duplexes, triplexes, and trendy condos in the cultural heart of the city.' },
        { name: 'Mile-End', desc: 'Creative, eclectic neighbourhood with a diverse property mix and vibrant street life.' },
        { name: 'Outremont', desc: 'Prestigious single-family homes and luxury condos in a leafy, quiet setting.' },
        { name: 'NDG', desc: 'Family-friendly enclave with generous homes, top schools, and strong value.' },
        { name: 'Rosemont', desc: 'Up-and-coming with a mix of affordable properties and a thriving local community.' },
        { name: 'Westmount', desc: 'Premium real estate at its finest — prestige, architecture, and location combined.' },
      ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: isFr
      ? 'Représentation Acheteur — Jeremy Soares'
      : 'Buyer Representation — Jeremy Soares',
    description: isFr
      ? "Représentation acheteur experte à Montréal. OACIQ H2731. Vos intérêts, pleinement protégés."
      : 'Expert buyer representation in Montreal. OACIQ H2731. Your interests, fully protected.',
    url: `${SITE_URL}/${locale}/buy`,
    provider: {
      '@type': 'Person',
      name: 'Jeremy Soares',
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'Place',
      name: 'Montréal, QC, Canada',
    },
    serviceType: isFr ? 'Représentation Acheteur' : 'Buyer Representation',
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
            {isFr ? '(Représentation Acheteur)' : '(Buyer Representation)'}
          </Label>
          <TextReveal
            as="h1"
            split="words"
            immediate
            delay={0.2}
            className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-tight tracking-tight text-[#eceae5] uppercase"
            style={{ fontFamily: FONT_BARLOW }}
          >
            {isFr ? 'Acheter à Montréal' : 'Buy a Home in Montréal'}
          </TextReveal>
          <SectionReveal delay={0.4} className="mt-6">
            <p className="text-[1rem] text-[#eceae5] opacity-50 leading-relaxed max-w-xl">
              {isFr
                ? "Trouver la bonne propriété à Montréal demande expertise, réseau et timing. Nous vous accompagnons à chaque étape — de la première visite jusqu'à la remise des clés."
                : "Finding the right property in Montréal takes expertise, network, and timing. We guide you through every step — from first visit to key handover."}
            </p>
          </SectionReveal>
        </Container>
      </Section>

      {/* Hero Image */}
      <Section theme="cream" className="py-0">
        <Container size="full" padded={false}>
          <img
            src="/images/buy-sell-rent/interior-1.jpg"
            alt="Modern Montreal home interior — Jeremy Soares buyer broker"
            style={{ width: '100%', height: '480px', objectFit: 'cover' }}
          />
        </Container>
      </Section>

      {/* How It Works */}
      <Section theme="void" className="py-24 md:py-32">
        <Container size="lg">
          <TextReveal
            as="h2"
            split="lines"
            className="text-[clamp(2rem,5vw,3.75rem)] font-black leading-none tracking-tight text-[#eceae5] uppercase mb-12"
            style={{ fontFamily: FONT_BARLOW }}
          >
            {isFr ? 'Comment ça fonctionne' : 'How It Works'}
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
                    style={{ fontFamily: FONT_BARLOW }}
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

      {/* Meet Your Broker */}
      <Section theme="cream" className="py-24 md:py-32">
        <Container size="lg">
          <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">
            <SectionReveal className="flex-shrink-0">
              <img
                src="/images/headshots/jeremy-soares.jpg"
                alt="Jeremy Soares — Montreal real estate broker OACIQ H2731"
                style={{
                  width: '320px',
                  height: '400px',
                  objectFit: 'cover',
                  objectPosition: 'top',
                }}
              />
            </SectionReveal>
            <div className="flex flex-col justify-center">
              <Label theme="light" className="mb-6">
                {isFr ? '(Votre courtier)' : '(Meet Your Broker)'}
              </Label>
              <TextReveal
                as="h2"
                split="words"
                className="text-[clamp(2rem,5vw,3.75rem)] font-black leading-none tracking-tight text-[#0e1011] uppercase mb-6"
                style={{ fontFamily: FONT_BARLOW }}
              >
                Jeremy Soares
              </TextReveal>
              <SectionReveal delay={0.2}>
                <p className="text-[1rem] text-[#0e1011] opacity-60 leading-relaxed max-w-lg mb-4">
                  {isFr
                    ? "Jeremy Soares représente des acheteurs à Montréal depuis plus d'une décennie. Courtier agréé OACIQ H2731, parfaitement bilingue, il connaît chaque quartier, chaque dynamique de marché — et met cette expertise entièrement à votre service."
                    : "Jeremy Soares has been representing buyers in Montreal for over a decade. Licensed OACIQ broker H2731, fluent in English and French, he knows every neighbourhood, every market dynamic — and puts that knowledge entirely in your corner."}
                </p>
                <p className="text-[1rem] text-[#0e1011] opacity-60 leading-relaxed max-w-lg mb-8">
                  {isFr
                    ? "Son approche : pas de pression, pas de précipitation. Seulement la bonne propriété, au bon prix, au bon moment."
                    : "His approach: no pressure, no rushing. Just the right property, at the right price, at the right time."}
                </p>
                <span className="text-[0.625rem] tracking-[0.18em] uppercase text-[#0e1011] opacity-30">
                  OACIQ H2731 — {isFr ? 'Courtier immobilier agréé' : 'Chartered Real Estate Broker'}
                </span>
              </SectionReveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Neighbourhoods */}
      <Section theme="void" className="py-24 md:py-32">
        <Container size="lg">
          <TextReveal
            as="h2"
            split="lines"
            className="text-[clamp(2rem,5vw,3.75rem)] font-black leading-none tracking-tight text-[#eceae5] uppercase mb-12"
            style={{ fontFamily: FONT_BARLOW }}
          >
            {isFr ? 'Quartiers desservis' : 'Neighbourhoods We Cover'}
          </TextReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {neighbourhoods.map((n, i) => (
              <SectionReveal key={n.name} delay={i * 0.05}>
                <div className="border-t border-[rgba(236,234,229,0.1)] pt-6">
                  <h3
                    className="text-[1rem] font-black tracking-tight text-[#eceae5] uppercase mb-3"
                    style={{ fontFamily: FONT_BARLOW }}
                  >
                    {n.name}
                  </h3>
                  <p className="text-[0.75rem] text-[#eceae5] opacity-50 leading-relaxed">
                    {n.desc}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section theme="cream" className="py-20 border-t border-[rgba(14,16,17,0.06)]">
        <Container size="sm" className="text-center">
          <TextReveal
            as="h2"
            split="words"
            className="text-[clamp(2rem,5vw,3.75rem)] font-black leading-tight tracking-tight text-[#0e1011] uppercase mb-4"
            style={{ fontFamily: FONT_BARLOW }}
          >
            {isFr ? 'Prêt à commencer?' : 'Ready to Start?'}
          </TextReveal>
          <SectionReveal delay={0.2}>
            <p className="text-[0.875rem] text-[#0e1011] opacity-60 leading-relaxed max-w-md mx-auto mb-8">
              {isFr
                ? "La première consultation est gratuite. Parlez-nous de votre projet et nous trouverons la propriété qui vous correspond."
                : "The first consultation is free. Tell us what you're looking for and we'll find the property that fits."}
            </p>
          </SectionReveal>
          <Button variant="primary" theme="light" href={`/${locale}/contact`} size="lg">
            {isFr ? 'Contactez-nous' : 'Get in Touch'}
          </Button>
        </Container>
      </Section>
    </>
  )
}
