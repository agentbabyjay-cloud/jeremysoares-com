import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Label } from '@/components/ui/Label'
import { TextReveal } from '@/components/animation/TextReveal'
import { SectionReveal } from '@/components/animation/SectionReveal'
import { Button } from '@/components/ui/Button'

const FONT_BARLOW = `var(--font-barlow), 'Barlow', sans-serif`
const FONT_DM_SERIF = `var(--font-dm-serif), 'DM Serif Display', serif`
const FONT_DM_SANS = `var(--font-dm-sans), 'DM Sans', sans-serif`
const SITE_URL = 'https://jeremysoares.com'

interface Neighborhood {
  slug: string
  name: string
  nameFr: string
  descEn: string
  descFr: string
  propertyTypesEn: string[]
  propertyTypesFr: string[]
  keyStreetsEn: string[]
  keyStreetsFr: string[]
  transitEn: string
  transitFr: string
  investmentEn: string
  investmentFr: string
  avgPriceEn: string
  avgPriceFr: string
  faqEn: { q: string; a: string }[]
  faqFr: { q: string; a: string }[]
}

const neighborhoods: Neighborhood[] = [
  {
    slug: 'plateau-mont-royal',
    name: 'Plateau Mont-Royal',
    nameFr: 'Plateau Mont-Royal',
    descEn: "The Plateau Mont-Royal is Montreal\u2019s most iconic residential neighborhood \u2014 a dense, walkable borough of Victorian triplexes, converted industrial lofts, independent boutiques, and some of the city\u2019s best restaurants. Bounded by Mont-Royal Park to the north and Sherbrooke Street to the south, it\u2019s the cultural heart of francophone Montreal. Avenue du Mont-Royal is the commercial spine, while Boulevard Saint-Laurent and Rue Saint-Denis offer nightlife and dining. Parc La Fontaine provides 36 hectares of green space in the borough\u2019s southeast corner. The Plateau consistently ranks as one of Canada\u2019s most walkable neighborhoods, with a Walk Score above 95. Property values have appreciated steadily, driven by limited inventory, heritage building protections, and relentless demand from young professionals, artists, and families who refuse to leave the island.",
    descFr: "Le Plateau Mont-Royal est le quartier r\u00e9sidentiel le plus embl\u00e9matique de Montr\u00e9al \u2014 un arrondissement dense et pi\u00e9tonnier de triplex victoriens, de lofts industriels convertis, de boutiques ind\u00e9pendantes et de certains des meilleurs restaurants de la ville. Bord\u00e9 par le parc du Mont-Royal au nord et la rue Sherbrooke au sud, c\u2019est le c\u0153ur culturel du Montr\u00e9al francophone. L\u2019avenue du Mont-Royal est l\u2019art\u00e8re commerciale principale, tandis que le boulevard Saint-Laurent et la rue Saint-Denis offrent vie nocturne et restauration. Le parc La Fontaine offre 36\u00a0hectares d\u2019espace vert. Le Plateau se classe constamment parmi les quartiers les plus marchables au Canada, avec un Walk Score sup\u00e9rieur \u00e0 95. Les valeurs immobili\u00e8res ont augment\u00e9 r\u00e9guli\u00e8rement, port\u00e9es par un inventaire limit\u00e9, la protection du patrimoine et une demande constante de jeunes professionnels, artistes et familles.",
    propertyTypesEn: ['Victorian triplexes (classic Plateau)', 'Converted industrial lofts', 'Walk-up condos in heritage buildings', 'New-build boutique condos', 'Duplexes with rental income potential'],
    propertyTypesFr: ['Triplex victoriens (classique du Plateau)', 'Lofts industriels convertis', 'Condos dans b\u00e2timents patrimoniaux', 'Condos boutique nouvelle construction', 'Duplex avec potentiel de revenus locatifs'],
    keyStreetsEn: ['Avenue du Mont-Royal \u2014 Commercial heart, boutiques, restaurants, metro access', 'Boulevard Saint-Laurent \u2014 The Main, nightlife, cultural divide EN/FR', 'Rue Saint-Denis \u2014 Caf\u00e9s, terrasses, francophone culture', 'Rue Rachel \u2014 Access to Parc La Fontaine, residential calm', 'Avenue Duluth \u2014 BYOB restaurants, pedestrian-friendly'],
    keyStreetsFr: ['Avenue du Mont-Royal \u2014 C\u0153ur commercial, boutiques, restaurants, acc\u00e8s m\u00e9tro', 'Boulevard Saint-Laurent \u2014 La Main, vie nocturne', 'Rue Saint-Denis \u2014 Caf\u00e9s, terrasses, culture francophone', 'Rue Rachel \u2014 Acc\u00e8s au parc La Fontaine', 'Avenue Duluth \u2014 Restaurants apportez votre vin'],
    transitEn: 'Three metro stations (Mont-Royal, Sherbrooke, Laurier on the Orange Line) provide direct access to downtown in under 10 minutes. Extensive bike lane network including the Rachel bike path.',
    transitFr: "Trois stations de m\u00e9tro (Mont-Royal, Sherbrooke, Laurier sur la ligne Orange) offrent un acc\u00e8s direct au centre-ville en moins de 10\u00a0minutes. R\u00e9seau cyclable \u00e9tendu incluant la piste Rachel.",
    investmentEn: "The Plateau offers strong long-term appreciation driven by supply constraints (heritage protections limit new construction), cultural cachet, and walkability. Triplexes remain the gold standard for owner-occupied investment: live in one unit, rent two. Cap rates are modest (3\u20134%) but equity growth is consistent. Rental demand is relentless \u2014 vacancy below 1%. Best for: buy-and-hold investors, first-time buyers seeking rental offset, professionals wanting lifestyle + investment in one.",
    investmentFr: "Le Plateau offre une appr\u00e9ciation solide \u00e0 long terme gr\u00e2ce aux contraintes d\u2019offre (protections patrimoniales), au cachet culturel et \u00e0 la marchabilit\u00e9. Les triplex restent l\u2019\u00e9talon-or pour l\u2019investissement occup\u00e9 par le propri\u00e9taire : habitez un logement, louez deux. Les taux de capitalisation sont modestes (3\u20134\u00a0%) mais la croissance de l\u2019\u00e9quit\u00e9 est constante. La demande locative est sans r\u00e9pit \u2014 vacance sous 1\u00a0%. Id\u00e9al pour : investisseurs achat-d\u00e9tention, premiers acheteurs, professionnels cherchant style de vie + investissement.",
    avgPriceEn: '$550K\u2013$900K (condos), $1.2M\u2013$2.5M+ (triplexes)',
    avgPriceFr: '550\u00a0K\u2013900\u00a0K\u00a0$ (condos), 1,2\u00a0M\u20132,5\u00a0M\u00a0$+ (triplex)',
    faqEn: [
      { q: 'What is the average condo price on the Plateau?', a: 'Condos on the Plateau range from $550K for a one-bedroom to $900K+ for larger units in heritage buildings. Triplexes start around $1.2M and can exceed $2.5M for fully renovated properties.' },
      { q: 'Is the Plateau good for investment?', a: 'Yes. Limited supply, heritage protections, and relentless rental demand make the Plateau one of Montreal\u2019s strongest long-term investment neighborhoods. Vacancy rates sit below 1%.' },
      { q: 'What metro stations serve the Plateau?', a: 'Mont-Royal, Sherbrooke, and Laurier stations (Orange Line) are all within the Plateau, providing downtown access in under 10 minutes.' },
      { q: 'Are there lofts available on the Plateau?', a: 'Yes. The Plateau has numerous converted industrial lofts, particularly along Saint-Laurent and in the Mile End border area. These are highly sought after for their character and open layouts.' },
      { q: 'How walkable is the Plateau?', a: 'Extremely. The Plateau has a Walk Score above 95, with grocery stores, restaurants, parks, and transit all within walking distance of most addresses.' },
    ],
    faqFr: [
      { q: 'Quel est le prix moyen d\u2019un condo sur le Plateau ?', a: 'Les condos sur le Plateau vont de 550\u00a0K\u00a0$ pour un une chambre \u00e0 900\u00a0K\u00a0$+ pour des unit\u00e9s plus grandes dans des b\u00e2timents patrimoniaux. Les triplex commencent autour de 1,2\u00a0M\u00a0$.' },
      { q: 'Le Plateau est-il bon pour l\u2019investissement ?', a: "Oui. L\u2019offre limit\u00e9e, les protections patrimoniales et la demande locative constante font du Plateau l\u2019un des quartiers les plus solides pour l\u2019investissement \u00e0 long terme." },
      { q: 'Quelles stations de m\u00e9tro desservent le Plateau ?', a: "Les stations Mont-Royal, Sherbrooke et Laurier (ligne Orange) sont toutes dans le Plateau, offrant un acc\u00e8s au centre-ville en moins de 10\u00a0minutes." },
      { q: 'Y a-t-il des lofts disponibles sur le Plateau ?', a: "Oui. Le Plateau compte de nombreux lofts industriels convertis, particuli\u00e8rement le long de Saint-Laurent et \u00e0 la fronti\u00e8re du Mile End." },
      { q: 'Le Plateau est-il marchable ?', a: "Extr\u00eamement. Le Plateau a un Walk Score sup\u00e9rieur \u00e0 95, avec \u00e9piceries, restaurants, parcs et transport en commun \u00e0 distance de marche." },
    ],
  },
  // Template for other neighborhoods — shorter content
  ...['griffintown', 'old-montreal', 'downtown', 'mile-end', 'saint-laurent', 'westmount', 'outremont', 'verdun', 'rosemont', 'villeray', 'ndg', 'lachine', 'anjou', 'laval', 'south-shore'].map((slug): Neighborhood => {
    const names: Record<string, [string, string]> = {
      griffintown: ['Griffintown', 'Griffintown'],
      'old-montreal': ['Old Montreal', 'Vieux-Montr\u00e9al'],
      downtown: ['Downtown', 'Centre-ville'],
      'mile-end': ['Mile End', 'Mile End'],
      'saint-laurent': ['Saint-Laurent', 'Saint-Laurent'],
      westmount: ['Westmount', 'Westmount'],
      outremont: ['Outremont', 'Outremont'],
      verdun: ['Verdun', 'Verdun'],
      rosemont: ['Rosemont', 'Rosemont'],
      villeray: ['Villeray', 'Villeray'],
      ndg: ['Notre-Dame-de-Gr\u00e2ce', 'Notre-Dame-de-Gr\u00e2ce'],
      lachine: ['Lachine', 'Lachine'],
      anjou: ['Anjou', 'Anjou'],
      laval: ['Laval', 'Laval'],
      'south-shore': ['South Shore', 'Rive-Sud'],
    }
    const [name, nameFr] = names[slug] || [slug, slug]
    return {
      slug,
      name,
      nameFr,
      descEn: `${name} is a dynamic Montreal-area neighborhood offering diverse real estate opportunities. From residential condos to investment properties, ${name} attracts buyers and investors seeking value, transit access, and community character. Contact Jeremy Soares for a personalized market analysis and property tour of ${name}.`,
      descFr: `${nameFr} est un quartier dynamique de la r\u00e9gion de Montr\u00e9al offrant des opportunit\u00e9s immobili\u00e8res diversifi\u00e9es. Des condos r\u00e9sidentiels aux propri\u00e9t\u00e9s d\u2019investissement, ${nameFr} attire acheteurs et investisseurs. Contactez Jeremy Soares pour une analyse de march\u00e9 personnalis\u00e9e.`,
      propertyTypesEn: ['Condominiums', 'Single-family homes', 'Multi-unit investment properties', 'Commercial spaces'],
      propertyTypesFr: ['Condominiums', 'Maisons unifamiliales', 'Immeubles \u00e0 revenus', 'Espaces commerciaux'],
      keyStreetsEn: [`Main commercial arteries of ${name}`, 'Residential side streets', 'Transit corridors'],
      keyStreetsFr: [`Art\u00e8res commerciales principales de ${nameFr}`, 'Rues r\u00e9sidentielles secondaires', 'Corridors de transport'],
      transitEn: `${name} is well-served by Montreal\u2019s public transit network, with metro and bus connections providing access across the island.`,
      transitFr: `${nameFr} est bien desservi par le r\u00e9seau de transport en commun de Montr\u00e9al, avec des connexions m\u00e9tro et autobus.`,
      investmentEn: `${name} presents solid investment fundamentals with steady appreciation, rental demand, and development potential. Contact Jeremy for current cap rates and market data specific to ${name}.`,
      investmentFr: `${nameFr} pr\u00e9sente des fondamentaux d\u2019investissement solides avec une appr\u00e9ciation stable, une demande locative et un potentiel de d\u00e9veloppement. Contactez Jeremy pour les taux de capitalisation actuels.`,
      avgPriceEn: 'Contact Jeremy for current pricing',
      avgPriceFr: 'Contactez Jeremy pour les prix actuels',
      faqEn: [
        { q: `What types of properties are available in ${name}?`, a: `${name} offers condos, single-family homes, multi-unit investment properties, and commercial spaces. Jeremy can identify the best options for your budget and goals.` },
        { q: `Is ${name} a good area for investment?`, a: `${name} has shown consistent market fundamentals. Contact Jeremy at 514-519-8177 for a detailed investment analysis of the area.` },
        { q: `How do I buy property in ${name}?`, a: 'Start with a free consultation with Jeremy Soares (OACIQ H2731). He will guide you through the Quebec buying process, from search to closing.' },
      ],
      faqFr: [
        { q: `Quels types de propri\u00e9t\u00e9s sont disponibles \u00e0 ${nameFr}\u00a0?`, a: `${nameFr} offre des condos, maisons unifamiliales, immeubles \u00e0 revenus et espaces commerciaux. Jeremy peut identifier les meilleures options.` },
        { q: `${nameFr} est-il un bon quartier pour investir\u00a0?`, a: `${nameFr} a d\u00e9montr\u00e9 des fondamentaux de march\u00e9 constants. Contactez Jeremy au 514\u00a0519-8177 pour une analyse d\u2019investissement d\u00e9taill\u00e9e.` },
        { q: `Comment acheter une propri\u00e9t\u00e9 \u00e0 ${nameFr}\u00a0?`, a: "Commencez par une consultation gratuite avec Jeremy Soares (OACIQ\u00a0H2731). Il vous guidera \u00e0 travers le processus d\u2019achat au Qu\u00e9bec." },
      ],
    }
  }),
]

export async function generateStaticParams() {
  const locales = ['en-ca', 'fr-ca']
  return neighborhoods.flatMap((n) => locales.map((locale) => ({ locale, slug: n.slug })))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const isFr = locale === 'fr-ca'
  const n = neighborhoods.find((x) => x.slug === slug)
  if (!n) return {}

  const title = isFr
    ? `Immobilier ${n.nameFr} | Guide du Quartier \u2014 Jeremy Soares`
    : `${n.name} Real Estate | Neighborhood Guide \u2014 Jeremy Soares`

  const description = isFr
    ? `Guide immobilier de ${n.nameFr}. Prix, types de propri\u00e9t\u00e9s, transport, investissement. Courtier OACIQ H2731.`
    : `${n.name} real estate guide. Prices, property types, transit, investment potential. OACIQ broker H2731.`

  const canonical = `${SITE_URL}/${locale}/neighborhoods/${slug}`

  return {
    title,
    description,
    alternates: { canonical, languages: { 'en-CA': `${SITE_URL}/en-ca/neighborhoods/${slug}`, 'fr-CA': `${SITE_URL}/fr-ca/neighborhoods/${slug}` } },
    openGraph: { type: 'website', url: canonical, title, description },
  }
}

export default async function NeighborhoodPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const isFr = locale === 'fr-ca'
  const n = neighborhoods.find((x) => x.slug === slug)
  if (!n) notFound()

  const faqs = isFr ? n.faqFr : n.faqEn

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Place', name: isFr ? n.nameFr : n.name, containedInPlace: { '@type': 'City', name: 'Montreal' } },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <Section theme="void" className="pt-32 pb-20 md:pt-44 md:pb-28">
        <Container size="lg">
          <Label className="mb-8">{isFr ? '(Quartier)' : '(Neighborhood)'}</Label>
          <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(3rem,8vw,6.5rem)', letterSpacing: '-0.02em' }}>
            <TextReveal as="h1" split="words" immediate delay={0.15} className="leading-none uppercase text-[var(--color-cream)]">
              {isFr ? n.nameFr : n.name}
            </TextReveal>
          </div>
          <SectionReveal delay={0.35} className="mt-5">
            <p className="text-[var(--color-cream)] opacity-35" style={{ fontFamily: FONT_DM_SERIF, fontStyle: 'italic', fontSize: 'clamp(1.1rem,2vw,1.5rem)' }}>
              {isFr ? `Guide immobilier \u2014 ${n.nameFr}, Montr\u00e9al` : `Real estate guide \u2014 ${n.name}, Montreal`}
            </p>
          </SectionReveal>
        </Container>
      </Section>

      {/* Overview — cream */}
      <Section theme="cream" className="py-24 md:py-32 relative overflow-hidden">
        <Container size="lg">
          <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(2rem,5vw,3.5rem)', letterSpacing: '-0.02em' }}>
            <TextReveal as="h2" split="words" className="leading-none uppercase text-[var(--color-void)]">
              {isFr ? 'Aper\u00e7u' : 'Overview'}
            </TextReveal>
          </div>
          <SectionReveal delay={0.15} className="mt-8">
            <p className="text-[var(--color-void)] opacity-55 leading-relaxed max-w-3xl" style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}>
              {isFr ? n.descFr : n.descEn}
            </p>
          </SectionReveal>
          {n.avgPriceEn !== 'Contact Jeremy for current pricing' && (
            <SectionReveal delay={0.25} className="mt-8">
              <div className="inline-block px-6 py-4 border border-[rgba(14,16,17,0.1)]">
                <span className="block text-[var(--color-void)] opacity-40 uppercase mb-1" style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em' }}>
                  {isFr ? 'Fourchette de prix' : 'Price range'}
                </span>
                <span className="text-[var(--color-void)]" style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '1.1rem' }}>
                  {isFr ? n.avgPriceFr : n.avgPriceEn}
                </span>
              </div>
            </SectionReveal>
          )}
        </Container>
      </Section>

      {/* Property Types — void */}
      <Section theme="void" className="py-24 md:py-32">
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-0.02em' }}>
                <TextReveal as="h2" split="words" className="leading-none uppercase text-[var(--color-cream)]">
                  {isFr ? 'Types de Propri\u00e9t\u00e9s' : 'Property Types'}
                </TextReveal>
              </div>
              <SectionReveal delay={0.15} className="mt-8">
                <ul className="flex flex-col gap-4">
                  {(isFr ? n.propertyTypesFr : n.propertyTypesEn).map((type) => (
                    <li key={type} className="text-[var(--color-cream)] opacity-60 flex items-start gap-3" style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}>
                      <span className="text-[#e8762a] mt-0.5" aria-hidden="true">{'\u2192'}</span>
                      {type}
                    </li>
                  ))}
                </ul>
              </SectionReveal>
            </div>
            <div>
              <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-0.02em' }}>
                <TextReveal as="h2" split="words" className="leading-none uppercase text-[var(--color-cream)]">
                  {isFr ? 'Rues cl\u00e9s' : 'Key Streets'}
                </TextReveal>
              </div>
              <SectionReveal delay={0.15} className="mt-8">
                <ul className="flex flex-col gap-4">
                  {(isFr ? n.keyStreetsFr : n.keyStreetsEn).map((street) => (
                    <li key={street} className="text-[var(--color-cream)] opacity-60 flex items-start gap-3" style={{ fontFamily: FONT_DM_SANS, fontSize: '0.875rem', lineHeight: 1.7 }}>
                      <span className="text-[#e8762a] mt-0.5 flex-shrink-0" aria-hidden="true">{'\u2192'}</span>
                      {street}
                    </li>
                  ))}
                </ul>
              </SectionReveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Transit + Investment — cream */}
      <Section theme="cream" className="py-24 md:py-32 relative overflow-hidden">
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <Label className="mb-6">{isFr ? '(Transport)' : '(Transit)'}</Label>
              <h3 className="text-[var(--color-void)] mb-4" style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '1.5rem', textTransform: 'uppercase' }}>
                {isFr ? 'Transport en commun' : 'Transit Access'}
              </h3>
              <SectionReveal>
                <p className="text-[var(--color-void)] opacity-55 leading-relaxed" style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}>
                  {isFr ? n.transitFr : n.transitEn}
                </p>
              </SectionReveal>
            </div>
            <div>
              <Label className="mb-6">{isFr ? '(Investissement)' : '(Investment)'}</Label>
              <h3 className="text-[var(--color-void)] mb-4" style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '1.5rem', textTransform: 'uppercase' }}>
                {isFr ? 'Potentiel d\u2019investissement' : 'Investment Potential'}
              </h3>
              <SectionReveal>
                <p className="text-[var(--color-void)] opacity-55 leading-relaxed" style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}>
                  {isFr ? n.investmentFr : n.investmentEn}
                </p>
              </SectionReveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ — void */}
      <Section theme="void" className="py-24 md:py-32">
        <Container size="lg">
          <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(2rem,5vw,3.5rem)', letterSpacing: '-0.02em' }}>
            <TextReveal as="h2" split="words" className="leading-none uppercase text-[var(--color-cream)]">
              {isFr ? 'Questions Fr\u00e9quentes' : 'Frequently Asked Questions'}
            </TextReveal>
          </div>
          <div className="mt-12 border-t border-[rgba(236,234,229,0.08)]">
            {faqs.map((faq, i) => (
              <SectionReveal key={i} delay={i * 0.06}>
                <div className="py-8 border-b border-[rgba(236,234,229,0.08)]">
                  <h3 className="text-[var(--color-cream)] mb-3" style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                    {faq.q}
                  </h3>
                  <p className="text-[var(--color-cream)] opacity-50 leading-relaxed max-w-3xl" style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}>
                    {faq.a}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section theme="cream" className="py-20 md:py-28 relative overflow-hidden">
        <Container size="lg" className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h2 style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(1.5rem,3vw,2.5rem)', lineHeight: 1, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#0e1011' }}>
              {isFr ? (<>Pr\u00eat \u00e0 explorer <em style={{ fontFamily: FONT_DM_SERIF, fontStyle: 'italic', fontWeight: 400, textTransform: 'none', letterSpacing: 0, fontSize: '1em' }}>{n.nameFr}\u00a0?</em></>) : (<>Ready to explore <em style={{ fontFamily: FONT_DM_SERIF, fontStyle: 'italic', fontWeight: 400, textTransform: 'none', letterSpacing: 0, fontSize: '1em' }}>{n.name}?</em></>)}
            </h2>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" theme="light" href={`/${locale}/contact`} size="lg">
              {isFr ? 'Discutons' : "Let\u2019s Talk"}
            </Button>
            <Button variant="ghost" theme="light" href={`/${locale}/neighborhoods`}>
              {isFr ? 'Tous les quartiers' : 'All Neighborhoods'}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
