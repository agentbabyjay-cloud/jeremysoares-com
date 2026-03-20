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
      ? 'Louer à Montréal | Courtier Locatif — Jeremy Soares'
      : 'Rent in Montreal | Rental Broker — Jeremy Soares',
    description: isFr
      ? 'Trouvez votre location à Montréal avec un courtier expert. Appartements, condos, lofts dans tous les quartiers. OACIQ H2731.'
      : 'Find your rental in Montreal with an expert broker. Apartments, condos, lofts across all neighbourhoods. OACIQ H2731.',
    keywords: isFr
      ? [
          'louer appartement montréal',
          'location montréal courtier',
          'condo à louer montréal',
          'OACIQ H2731',
          'courtier locatif montréal',
          'loft montréal location',
          'appartement plateau mile-end',
        ]
      : [
          'rent apartment montreal',
          'montreal rental broker',
          'condo for rent montreal',
          'OACIQ H2731',
          'rental brokerage montreal',
          'loft montreal rental',
          'plateau mile-end apartments',
        ],
    alternates: {
      canonical: `${SITE_URL}/${locale}/rent`,
      languages: {
        'en-CA': `${SITE_URL}/en-ca/rent`,
        'fr-CA': `${SITE_URL}/fr-ca/rent`,
      },
    },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}/${locale}/rent`,
      title: isFr
        ? 'Louer une propriété à Montréal — Jeremy Soares'
        : 'Rent a Property in Montréal — Jeremy Soares',
      description: isFr
        ? 'Appartements, condos, lofts dans tous les quartiers. OACIQ H2731.'
        : 'Apartments, condos, lofts across all neighbourhoods. OACIQ H2731.',
      siteName: 'Jeremy Soares',
      locale: isFr ? 'fr_CA' : 'en_CA',
    },
  }
}

export default async function RentPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr-ca'

  const rentalTypes = isFr
    ? [
        {
          num: '01',
          title: 'Appartements',
          desc: "Des studios aux grands 5½, nous avons accès à un vaste inventaire d'appartements dans tous les quartiers de Montréal.",
        },
        {
          num: '02',
          title: 'Condos & Lofts',
          desc: "Condos modernes avec services, lofts industriels reconvertis, penthouses — pour ceux qui recherchent un style de vie urbain distinctif.",
        },
        {
          num: '03',
          title: 'Locations commerciales',
          desc: "Bureaux, locaux commerciaux et espaces industriels pour les entreprises qui cherchent à s'établir ou s'agrandir à Montréal.",
        },
      ]
    : [
        {
          num: '01',
          title: 'Apartments',
          desc: 'From studios to large 5½s, we have access to a wide inventory of apartments across every Montreal neighbourhood.',
        },
        {
          num: '02',
          title: 'Condos & Lofts',
          desc: 'Modern condos with amenities, converted industrial lofts, penthouses — for those seeking a distinctive urban lifestyle.',
        },
        {
          num: '03',
          title: 'Commercial Rentals',
          desc: 'Office space, retail units, and industrial premises for businesses looking to establish or expand in Montreal.',
        },
      ]

  const rentalAreas = isFr
    ? [
        {
          name: 'Plateau-Mont-Royal',
          desc: "Le quartier le plus demandé. Appartements de charme et ambiance de village. Loyers moyens : 1 500 – 2 800 $/mois.",
        },
        {
          name: 'Mile-End',
          desc: "Créatif et branché. Lofts, appartements anciens et nouvelles constructions. Loyers moyens : 1 600 – 3 000 $/mois.",
        },
        {
          name: 'Ville-Marie / Centre-Ville',
          desc: "Condos haut de gamme et studios modernes au coeur du centre-ville. Loyers moyens : 1 800 – 4 000 $/mois.",
        },
        {
          name: 'Rosemont',
          desc: "Quartier en plein essor, offre diversifiée et prix plus accessibles. Loyers moyens : 1 300 – 2 400 $/mois.",
        },
        {
          name: 'Outremont',
          desc: "Appartements spacieux dans un cadre verdoyant et résidentiel. Loyers moyens : 1 800 – 3 500 $/mois.",
        },
        {
          name: 'NDG',
          desc: "Grands appartements familiaux, ambiance de quartier. Loyers moyens : 1 400 – 2 600 $/mois.",
        },
      ]
    : [
        {
          name: 'Plateau-Mont-Royal',
          desc: 'The most sought-after neighbourhood. Charming apartments, village feel. Average rent: $1,500 – $2,800/mo.',
        },
        {
          name: 'Mile-End',
          desc: 'Creative and eclectic. Lofts, heritage apartments, new builds. Average rent: $1,600 – $3,000/mo.',
        },
        {
          name: 'Ville-Marie / Downtown',
          desc: 'Premium condos and modern studios at the heart of it all. Average rent: $1,800 – $4,000/mo.',
        },
        {
          name: 'Rosemont',
          desc: 'Up-and-coming neighbourhood with diverse options and accessible pricing. Average rent: $1,300 – $2,400/mo.',
        },
        {
          name: 'Outremont',
          desc: 'Spacious apartments in a leafy, residential setting. Average rent: $1,800 – $3,500/mo.',
        },
        {
          name: 'NDG',
          desc: 'Large family apartments with strong community feel. Average rent: $1,400 – $2,600/mo.',
        },
      ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: isFr
      ? 'Courtage Locatif — Jeremy Soares'
      : 'Rental Brokerage — Jeremy Soares',
    description: isFr
      ? 'Trouvez votre location à Montréal avec un courtier expert. OACIQ H2731.'
      : 'Find your rental in Montreal with an expert broker. OACIQ H2731.',
    url: `${SITE_URL}/${locale}/rent`,
    provider: {
      '@type': 'Person',
      name: 'Jeremy Soares',
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'Place',
      name: 'Montréal, QC, Canada',
    },
    serviceType: isFr ? 'Courtage Locatif' : 'Rental Brokerage',
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
            {isFr ? '(Location)' : '(Rental)'}
          </Label>
          <TextReveal
            as="h1"
            split="words"
            immediate
            delay={0.2}
            className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-tight tracking-tight text-[#eceae5] uppercase"
            style={{ fontFamily: FONT_BARLOW }}
          >
            {isFr ? 'Louer à Montréal' : 'Rent in Montréal'}
          </TextReveal>
          <SectionReveal delay={0.4} className="mt-6">
            <p className="text-[1rem] text-[#eceae5] opacity-50 leading-relaxed max-w-xl">
              {isFr
                ? "Appartements, condos, lofts — nous connaissons le marché locatif montréalais mieux que quiconque. Trouvez votre prochain chez-vous avec un courtier qui travaille pour vous."
                : "Apartments, condos, lofts — we know the Montreal rental market better than anyone. Find your next home with a broker who works for you."}
            </p>
          </SectionReveal>
        </Container>
      </Section>

      {/* Hero Image */}
      <Section theme="cream" className="py-0">
        <Container size="full" padded={false}>
          <img
            src="/images/buy-sell-rent/condo.jpg"
            alt="Modern condo rental in Montreal — Jeremy Soares"
            style={{ width: '100%', height: '480px', objectFit: 'cover' }}
          />
        </Container>
      </Section>

      {/* Rental Types */}
      <Section theme="void" className="py-24 md:py-32">
        <Container size="lg">
          <TextReveal
            as="h2"
            split="lines"
            className="text-[clamp(2rem,5vw,3.75rem)] font-black leading-none tracking-tight text-[#eceae5] uppercase mb-12"
            style={{ fontFamily: FONT_BARLOW }}
          >
            {isFr ? 'Types de location' : 'Rental Types'}
          </TextReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rentalTypes.map((type) => (
              <SectionReveal key={type.num}>
                <div className="border-t border-[rgba(236,234,229,0.1)] pt-6">
                  <span className="text-[0.625rem] tracking-[0.22em] uppercase text-[#eceae5] opacity-30 font-bold">
                    {type.num}
                  </span>
                  <h3
                    className="text-[1.25rem] font-black tracking-tight text-[#eceae5] uppercase mt-4 mb-3"
                    style={{ fontFamily: FONT_BARLOW }}
                  >
                    {type.title}
                  </h3>
                  <p className="text-[0.75rem] text-[#eceae5] opacity-50 leading-relaxed">
                    {type.desc}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Popular Rental Areas */}
      <Section theme="cream" className="py-24 md:py-32">
        <Container size="lg">
          <TextReveal
            as="h2"
            split="lines"
            className="text-[clamp(2rem,5vw,3.75rem)] font-black leading-none tracking-tight text-[#0e1011] uppercase mb-12"
            style={{ fontFamily: FONT_BARLOW }}
          >
            {isFr ? 'Quartiers populaires' : 'Popular Rental Areas'}
          </TextReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {rentalAreas.map((area, i) => (
              <SectionReveal key={area.name} delay={i * 0.05}>
                <div className="border-t border-[rgba(14,16,17,0.1)] pt-6">
                  <h3
                    className="text-[1rem] font-black tracking-tight text-[#0e1011] uppercase mb-3"
                    style={{ fontFamily: FONT_BARLOW }}
                  >
                    {area.name}
                  </h3>
                  <p className="text-[0.75rem] text-[#0e1011] opacity-60 leading-relaxed">
                    {area.desc}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* For Landlords */}
      <Section theme="void" className="py-24 md:py-32">
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <Label className="mb-6">
                {isFr ? '(Propriétaires)' : '(For Landlords)'}
              </Label>
              <TextReveal
                as="h2"
                split="words"
                className="text-[clamp(2rem,5vw,3.75rem)] font-black leading-none tracking-tight text-[#eceae5] uppercase mb-6"
                style={{ fontFamily: FONT_BARLOW }}
              >
                {isFr ? 'Vous louez votre propriété?' : 'Renting Out Your Property?'}
              </TextReveal>
            </div>
            <SectionReveal className="flex flex-col justify-center pt-4 md:pt-8">
              <p className="text-[1rem] text-[#eceae5] opacity-50 leading-relaxed mb-6">
                {isFr
                  ? "Nous gérons tout : recherche de locataires qualifiés, vérification de crédit, révision du bail et placement complet. Louez plus vite, avec plus de confiance."
                  : "We handle everything: qualified tenant search, credit checks, lease drafting review, and full placement. Rent faster, with greater confidence."}
              </p>
              <p className="text-[0.875rem] text-[#eceae5] opacity-40 leading-relaxed">
                {isFr
                  ? "Propriétaires résidentiels et commerciaux bienvenus. Service bilingue EN/FR."
                  : "Residential and commercial landlords welcome. Fully bilingual EN/FR service."}
              </p>
            </SectionReveal>
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
            {isFr ? 'Trouvez votre prochain chez-vous' : 'Find Your Next Home'}
          </TextReveal>
          <SectionReveal delay={0.2}>
            <p className="text-[0.875rem] text-[#0e1011] opacity-60 leading-relaxed max-w-md mx-auto mb-8">
              {isFr
                ? "Dites-nous ce que vous cherchez — quartier, budget, style de vie — et nous trouvons les options qui correspondent."
                : "Tell us what you're looking for — neighbourhood, budget, lifestyle — and we find the options that fit."}
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
