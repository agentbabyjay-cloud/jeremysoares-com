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
      ? 'Louer à Montréal | Courtier Locatif — Jeremy Soares OACIQ H2731'
      : 'Rent in Montreal | Rental Broker — Jeremy Soares OACIQ H2731',
    description: isFr
      ? "Trouvez votre appartement, condo ou loft à louer à Montréal avec un courtier OACIQ. Accompagnement complet du locataire — de la recherche à la signature du bail. OACIQ H2731."
      : 'Find your apartment, condo, or loft for rent in Montreal with an OACIQ broker. Complete tenant support from search to lease signing. OACIQ H2731.',
    keywords: isFr
      ? ['louer appartement montréal', 'courtier locatif montréal', 'condo à louer montréal', 'OACIQ H2731', 'location montréal plateau', 'appartement mile-end']
      : ['rent apartment montreal', 'rental broker montreal', 'condo for rent montreal', 'OACIQ H2731', 'plateau rental', 'mile-end apartment'],
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
      title: isFr ? 'Louer à Montréal — Jeremy Soares' : 'Rent in Montréal — Jeremy Soares',
      description: isFr ? 'Votre courtier locatif à Montréal. OACIQ H2731.' : 'Your rental broker in Montreal. OACIQ H2731.',
      siteName: 'Jeremy Soares',
    },
    robots: { index: true, follow: true },
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
        { title: 'Appartements', desc: "Studios, 3½, 4½, 5½ et plus dans tous les quartiers. Du logement étudiant au grand appartement familial." },
        { title: 'Condos & Lofts', desc: "Unités en copropriété avec services — gym, terrasse, stationnement. Idéal pour les professionnels." },
        { title: 'Maisons & Duplexes', desc: "Accès à un logement plus grand avec cour, garage et plus d'intimité — parfait pour les familles." },
        { title: 'Location commerciale', desc: "Bureaux, locaux commerciaux et espaces industriels disponibles à la location dans la région de Montréal." },
      ]
    : [
        { title: 'Apartments', desc: "Studios, 3½, 4½, 5½ and up across every neighbourhood — from student units to spacious family flats." },
        { title: 'Condos & Lofts', desc: "Condo units with building services — gym, rooftop, parking. Ideal for working professionals." },
        { title: 'Houses & Duplexes', desc: "More space, a yard, a garage, and more privacy — perfect for families or those who need room." },
        { title: 'Commercial Rentals', desc: "Offices, retail units, and light industrial spaces available for lease in the greater Montreal area." },
      ]

  const areas = isFr
    ? [
        { name: 'Plateau-Mont-Royal', range: '1 500 – 2 800 $/mois', desc: "Le quartier le plus demandé. Duplexes typiques, proximité des parcs et de la vie de quartier." },
        { name: 'Mile-End', range: '1 400 – 2 600 $/mois', desc: "Créatif et branché, avec un bon inventaire de logements dans des immeubles anciens rénovés." },
        { name: 'Ville-Marie (Centre-ville)', range: '1 800 – 3 500 $/mois', desc: "Condos modernes avec services complets. Parfait pour les professionnels en déplacement." },
        { name: 'Rosemont', range: '1 300 – 2 200 $/mois', desc: "Quartier résidentiel en hausse, abordable et bien desservi par le transport en commun." },
        { name: 'NDG', range: '1 200 – 2 400 $/mois', desc: "Familial, verdoyant et plus abordable que le Plateau. Excellent pour les familles." },
        { name: 'Griffintown', range: '1 700 – 3 200 $/mois', desc: "Condos neufs, accès rapide au centre-ville. Quartier en pleine transformation." },
      ]
    : [
        { name: 'Plateau-Mont-Royal', range: '$1,500 – $2,800/mo', desc: "The most in-demand neighbourhood. Classic duplexes, parks, and vibrant street life." },
        { name: 'Mile-End', range: '$1,400 – $2,600/mo', desc: "Creative and eclectic, with solid rental inventory in renovated older buildings." },
        { name: 'Ville-Marie (Downtown)', range: '$1,800 – $3,500/mo', desc: "Modern condo rentals with full building services. Ideal for business professionals." },
        { name: 'Rosemont', range: '$1,300 – $2,200/mo', desc: "Residential and rising, more affordable than the Plateau with great transit access." },
        { name: 'NDG', range: '$1,200 – $2,400/mo', desc: "Family-friendly, leafy, and more affordable. Excellent schools and quiet streets." },
        { name: 'Griffintown', range: '$1,700 – $3,200/mo', desc: "New condo buildings, fast downtown access. Montreal's fastest-transforming neighbourhood." },
      ]

  const forLandlords = isFr
    ? [
        { title: 'Mise en marché rapide', body: "Votre bien est diffusé sur tous les canaux le jour même — MLS, sites de location et notre réseau." },
        { title: 'Sélection de locataire', body: "Présélection rigoureuse : vérification de crédit, références d'emploi, historique de location." },
        { title: 'Bail & documentation', body: "Contrats de bail conformes au Code civil du Québec, préparés et expliqués en détail." },
      ]
    : [
        { title: 'Fast Market Exposure', body: "Your property hits all channels same day — MLS, rental platforms, and our direct network." },
        { title: 'Tenant Selection', body: "Rigorous screening: credit checks, employment references, and rental history verification." },
        { title: 'Lease & Documentation', body: "Lease agreements compliant with the Québec Civil Code, prepared and explained in full." },
      ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: isFr ? 'Courtage Locatif — Jeremy Soares' : 'Rental Brokerage — Jeremy Soares',
    description: isFr
      ? 'Courtier locatif à Montréal. Recherche, accompagnement et signature de bail. OACIQ H2731.'
      : 'Rental broker in Montreal. Search, guidance, and lease signing support. OACIQ H2731.',
    url: `${SITE_URL}/${locale}/rent`,
    provider: { '@type': 'RealEstateAgent', name: 'Jeremy Soares', url: SITE_URL, telephone: '+15145198177' },
    areaServed: { '@type': 'City', name: 'Montréal' },
    serviceType: isFr ? 'Courtage Locatif' : 'Rental Brokerage',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <Section theme="void" className="pt-32 pb-20 md:pt-44 md:pb-24">
        <Container size="lg">
          <Label className="mb-6">{isFr ? '(Location)' : '(Rentals)'}</Label>
          <TextReveal
            as="h1"
            split="words"
            immediate
            delay={0.15}
            className="text-[clamp(3rem,7vw,6rem)] font-black leading-none tracking-tight text-[#eceae5] uppercase"
            style={{ fontFamily: FONT_BARLOW }}
          >
            {isFr ? 'Louer\nà Montréal' : 'Rent in\nMontréal'}
          </TextReveal>
          <SectionReveal delay={0.35} className="mt-8 max-w-lg">
            <p className="text-[1rem] text-[#eceae5] opacity-50 leading-relaxed">
              {isFr
                ? "Que vous cherchiez votre prochain appartement ou que vous vouliez louer votre propriété, je vous accompagne avec une représentation complète et sans stress."
                : "Whether you're searching for your next apartment or looking to rent out your property, I guide you with full representation and zero stress."}
            </p>
          </SectionReveal>
          <SectionReveal delay={0.5} className="mt-8 flex flex-wrap gap-4">
            <Button variant="primary" theme="dark" href={`/${locale}/contact`} size="lg">
              {isFr ? 'Trouver un logement' : 'Find a Rental'}
            </Button>
            <Button variant="ghost" theme="dark" href={`tel:+15145198177`} size="lg">
              514 519-8177
            </Button>
          </SectionReveal>
          <SectionReveal delay={0.6} className="mt-10">
            <p className="text-[0.625rem] tracking-[0.2em] uppercase text-[#eceae5] opacity-25" style={{ fontFamily: FONT_DM_SANS }}>
              OACIQ H2731 &nbsp;·&nbsp; {isFr ? 'Locataires & Propriétaires' : 'Tenants & Landlords'}
            </p>
          </SectionReveal>
        </Container>
      </Section>

      {/* Hero Image */}
      <img
        src="/images/buy-sell-rent/condo.jpg"
        alt={isFr ? 'Condo à louer Montréal — Jeremy Soares courtier locatif' : 'Condo for rent Montreal — Jeremy Soares rental broker'}
        style={{ width: '100%', height: '55vh', objectFit: 'cover', display: 'block' }}
      />

      {/* Rental Types */}
      <Section theme="void" className="py-24 md:py-32">
        <Container size="lg">
          <Label className="mb-8">{isFr ? '(Types de location)' : '(Rental Types)'}</Label>
          <TextReveal
            as="h2"
            split="words"
            className="text-[clamp(2rem,4vw,3.25rem)] font-black leading-none tracking-tight text-[#eceae5] uppercase mb-16"
            style={{ fontFamily: FONT_BARLOW }}
          >
            {isFr ? 'Ce qu\'on\nvous trouve' : 'What we\nfind for you'}
          </TextReveal>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
            {rentalTypes.map((type, i) => (
              <SectionReveal key={i} delay={i * 0.08}>
                <div className="border-t border-[rgba(236,234,229,0.1)] pt-6 pr-6">
                  <h3 className="text-[1.1rem] font-black tracking-tight text-[#eceae5] uppercase mb-3" style={{ fontFamily: FONT_BARLOW }}>{type.title}</h3>
                  <p className="text-[0.8rem] text-[#eceae5] opacity-45 leading-relaxed" style={{ fontFamily: FONT_DM_SANS }}>{type.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Rental Areas */}
      <Section theme="cream" className="py-24 md:py-32">
        <Container size="lg">
          <Label theme="light" className="mb-8">{isFr ? '(Quartiers & loyers)' : '(Neighbourhoods & Rents)'}</Label>
          <TextReveal
            as="h2"
            split="words"
            className="text-[clamp(2rem,4vw,3.25rem)] font-black leading-none tracking-tight text-[#0e1011] uppercase mb-16"
            style={{ fontFamily: FONT_BARLOW }}
          >
            {isFr ? 'Où chercher\nà Montréal' : 'Where to rent\nin Montréal'}
          </TextReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {areas.map((area, i) => (
              <SectionReveal key={i} delay={i * 0.07}>
                <div className="border-t border-[rgba(14,16,17,0.08)] py-6 pr-8">
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="text-[1rem] font-black tracking-tight text-[#0e1011] uppercase" style={{ fontFamily: FONT_BARLOW }}>{area.name}</h3>
                    <span className="text-[0.625rem] tracking-[0.12em] uppercase text-[#0e1011] opacity-40 ml-4 shrink-0" style={{ fontFamily: FONT_DM_SANS }}>{area.range}</span>
                  </div>
                  <p className="text-[0.8rem] text-[#0e1011] opacity-55 leading-relaxed" style={{ fontFamily: FONT_DM_SANS }}>{area.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
          <SectionReveal delay={0.2} className="mt-6">
            <p className="text-[0.625rem] tracking-[0.14em] uppercase text-[#0e1011] opacity-30" style={{ fontFamily: FONT_DM_SANS }}>
              {isFr ? '* Fourchettes indicatives — varient selon la taille, le type et l\'état du logement.' : '* Indicative ranges — vary by size, type, and condition of unit.'}
            </p>
          </SectionReveal>
        </Container>
      </Section>

      {/* For Landlords */}
      <Section theme="void" className="py-24 md:py-32">
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <Label className="mb-4">{isFr ? '(Propriétaires)' : '(Landlords)'}</Label>
              <TextReveal
                as="h2"
                split="words"
                className="text-[clamp(2rem,4vw,3.25rem)] font-black leading-tight tracking-tight text-[#eceae5] uppercase"
                style={{ fontFamily: FONT_BARLOW }}
              >
                {isFr ? 'Vous louez\nvotre bien?' : 'Renting out\nyour property?'}
              </TextReveal>
            </div>
            <SectionReveal>
              <p className="text-[0.9375rem] text-[#eceae5] opacity-50 leading-relaxed mb-10" style={{ fontFamily: FONT_DM_SANS }}>
                {isFr
                  ? "Je gère la recherche de locataires, la présélection, la rédaction du bail et la mise en marché — pour que vous trouviez rapidement le bon locataire au bon loyer."
                  : "I handle tenant search, screening, lease drafting, and marketing — so you find the right tenant, at the right rent, without the hassle."}
              </p>
              <div className="space-y-6 mb-10">
                {forLandlords.map((item, i) => (
                  <SectionReveal key={i} delay={i * 0.1}>
                    <div className="border-l-2 border-[rgba(236,234,229,0.15)] pl-5">
                      <h3 className="text-[0.9375rem] font-black tracking-tight text-[#eceae5] uppercase mb-1" style={{ fontFamily: FONT_BARLOW }}>{item.title}</h3>
                      <p className="text-[0.8rem] text-[#eceae5] opacity-45 leading-relaxed" style={{ fontFamily: FONT_DM_SANS }}>{item.body}</p>
                    </div>
                  </SectionReveal>
                ))}
              </div>
              <Button variant="primary" theme="dark" href={`/${locale}/contact`} size="md">
                {isFr ? 'Discuter de ma propriété' : 'Discuss My Property'}
              </Button>
            </SectionReveal>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section theme="cream" className="py-24 md:py-32">
        <Container size="sm" className="text-center">
          <TextReveal
            as="h2"
            split="words"
            className="text-[clamp(2.5rem,5vw,4rem)] font-black leading-tight tracking-tight text-[#0e1011] uppercase mb-4"
            style={{ fontFamily: FONT_BARLOW }}
          >
            {isFr ? 'On trouve\nensemble' : "Let's find it\ntogether"}
          </TextReveal>
          <SectionReveal delay={0.2}>
            <p className="text-[0.9375rem] text-[#0e1011] opacity-55 leading-relaxed max-w-sm mx-auto mb-8" style={{ fontFamily: FONT_DM_SANS }}>
              {isFr
                ? "Dites-moi ce que vous cherchez — quartier, budget, type de logement — et on démarre la recherche immédiatement."
                : "Tell me what you're looking for — neighbourhood, budget, unit type — and we start the search right away."}
            </p>
          </SectionReveal>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="primary" theme="light" href={`/${locale}/contact`} size="lg">
              {isFr ? 'Décrire mon logement idéal' : 'Describe My Ideal Rental'}
            </Button>
            <Button variant="ghost" theme="light" href={`tel:+15145198177`} size="lg">
              514 519-8177
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
