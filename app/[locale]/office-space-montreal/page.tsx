import type { Metadata } from 'next'
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

// ─── SEO ──────────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale === 'fr-ca'
  const canonical = `${SITE_URL}/${locale}/office-space-montreal`

  const title = isFr
    ? 'Bureau \u00e0 Vendre Montr\u00e9al | Espace Bureau — Jeremy Soares'
    : 'Office Space Montreal | Buy or Lease — Jeremy Soares'

  const description = isFr
    ? "Achetez ou louez un espace bureau \u00e0 Montr\u00e9al. Classe A, B, C, analyse du march\u00e9, taux de vacance. Courtier OACIQ H2731."
    : 'Buy or lease office space in Montreal. Class A, B, C analysis, vacancy rates, downtown to Mile End. OACIQ broker H2731.'

  return {
    title,
    description,
    keywords: isFr
      ? ['bureau \u00e0 vendre montr\u00e9al', 'espace bureau montr\u00e9al', 'louer bureau montr\u00e9al', 'immobilier commercial montr\u00e9al', 'courtier immobilier bureau', 'OACIQ H2731']
      : ['office space montreal', 'office for sale montreal', 'office lease montreal', 'commercial real estate broker montreal', 'class A office montreal', 'OACIQ H2731'],
    alternates: {
      canonical,
      languages: { 'en-CA': `${SITE_URL}/en-ca/office-space-montreal`, 'fr-CA': `${SITE_URL}/fr-ca/office-space-montreal` },
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title,
      description,
      images: [{ url: 'https://cdn.prod.website-files.com/68ba28534a070e692e441089/68baf35dc28553a17f2d6d78_8-IMG_6610.jpg', width: 1218, height: 813, alt: isFr ? 'Bureau Montr\u00e9al Jeremy Soares' : 'Office Space Montreal Jeremy Soares' }],
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

// ─── JSON-LD ──────────────────────────────────────────────────────────────────
function OfficeJsonLd({ locale }: { locale: string }) {
  const isFr = locale === 'fr-ca'
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/${locale}/office-space-montreal#service`,
        name: isFr ? 'Courtage Bureaux Montr\u00e9al' : 'Office Space Brokerage Montreal',
        description: isFr
          ? "Services de courtage pour espaces bureaux \u00e0 Montr\u00e9al. Achat, vente et location d\u2019immeubles de bureaux."
          : 'Office space brokerage services in Montreal. Buy, sell, and lease office buildings across Greater Montreal.',
        provider: { '@type': 'RealEstateAgent', '@id': `${SITE_URL}/#agent`, name: 'Jeremy Soares' },
        areaServed: { '@type': 'City', name: 'Montreal' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: isFr ? 'Quel est le prix moyen du bureau au pied carr\u00e9 \u00e0 Montr\u00e9al ?' : 'What is the average office price per sq ft in Montreal?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: isFr
                ? "Le prix varie de 15\u00a0$/pi\u00b2 en banlieue \u00e0 45\u00a0$/pi\u00b2 et plus au centre-ville pour la classe\u00a0A."
                : 'Prices range from $15/sq ft in suburban areas to $45+/sq ft for Class A downtown space.',
            },
          },
          {
            '@type': 'Question',
            name: isFr ? 'Vaut-il mieux acheter ou louer un bureau ?' : 'Should I buy or lease office space?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: isFr
                ? "L\u2019achat convient aux entreprises stables; la location offre de la flexibilit\u00e9. Jeremy analyse votre situation pour recommander la meilleure option."
                : 'Buying suits stable businesses building equity; leasing offers flexibility. Jeremy analyzes your situation to recommend the best approach.',
            },
          },
          {
            '@type': 'Question',
            name: isFr ? 'Quels sont les meilleurs quartiers pour les bureaux \u00e0 Montr\u00e9al ?' : 'What are the best areas for office space in Montreal?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: isFr
                ? 'Centre-ville pour prestige, Mile End pour cr\u00e9ativit\u00e9, Griffintown pour tech, Saint-Laurent pour co\u00fbt avantageux.'
                : 'Downtown for prestige, Mile End for creative industries, Griffintown for tech, Saint-Laurent for cost efficiency.',
            },
          },
          {
            '@type': 'Question',
            name: isFr ? 'Quel est le taux de vacance des bureaux \u00e0 Montr\u00e9al ?' : 'What is the office vacancy rate in Montreal?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: isFr
                ? "Le taux de vacance est d\u2019environ 13-17\u00a0% au centre-ville, cr\u00e9ant des opportunit\u00e9s pour les acheteurs avertis."
                : 'Downtown vacancy sits around 13-17%, creating opportunities for savvy buyers and tenants negotiating favorable terms.',
            },
          },
          {
            '@type': 'Question',
            name: isFr ? 'Jeremy peut-il m\u2019aider avec un bail commercial ?' : 'Can Jeremy help with commercial lease negotiation?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: isFr
                ? "Oui. Jeremy n\u00e9gocie les baux commerciaux, les clauses de renouvellement et les am\u00e9liorations locatives pour prot\u00e9ger vos int\u00e9r\u00eats."
                : 'Yes. Jeremy negotiates commercial leases, renewal clauses, and tenant improvements to protect your interests.',
            },
          },
        ],
      },
    ],
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
}

// ─── Data ─────────────────────────────────────────────────────────────────────
interface OfficeDistrict { name: string; nameFr: string; classGrade: string; priceRange: string; priceRangeFr: string; highlights: string; highlightsFr: string }

const districts: OfficeDistrict[] = [
  { name: 'Downtown / Centre-ville', nameFr: 'Centre-ville', classGrade: 'A / B', priceRange: '$30\u2013$55/sq ft', priceRangeFr: '30\u201355\u00a0$/pi\u00b2', highlights: 'Prestige addresses, transit hub, institutional tenants, convention centre proximity', highlightsFr: 'Adresses prestigieuses, p\u00f4le de transport, locataires institutionnels' },
  { name: 'Mile End', nameFr: 'Mile End', classGrade: 'B / C', priceRange: '$18\u2013$30/sq ft', priceRangeFr: '18\u201330\u00a0$/pi\u00b2', highlights: 'Creative economy, tech startups, converted industrial, walkable', highlightsFr: '\u00c9conomie cr\u00e9ative, startups tech, industriel converti, pieds nus' },
  { name: 'Griffintown', nameFr: 'Griffintown', classGrade: 'A / B', priceRange: '$25\u2013$45/sq ft', priceRangeFr: '25\u201345\u00a0$/pi\u00b2', highlights: 'New builds, tech corridor, condo adjacency, ETS proximity', highlightsFr: 'Nouvelles constructions, corridor tech, proximit\u00e9 \u00c9TS' },
  { name: 'Old Montreal', nameFr: 'Vieux-Montr\u00e9al', classGrade: 'B+', priceRange: '$22\u2013$40/sq ft', priceRangeFr: '22\u201340\u00a0$/pi\u00b2', highlights: 'Heritage buildings, tourism adjacency, character spaces', highlightsFr: 'B\u00e2timents patrimoniaux, proximit\u00e9 touristique, espaces de caract\u00e8re' },
  { name: 'Saint-Laurent', nameFr: 'Saint-Laurent', classGrade: 'B / C', priceRange: '$12\u2013$22/sq ft', priceRangeFr: '12\u201322\u00a0$/pi\u00b2', highlights: 'Cost-efficient, highway access, parking, flex space', highlightsFr: 'Co\u00fbt avantageux, acc\u00e8s autoroute, stationnement' },
  { name: 'Laval', nameFr: 'Laval', classGrade: 'B / C', priceRange: '$10\u2013$20/sq ft', priceRangeFr: '10\u201320\u00a0$/pi\u00b2', highlights: 'Suburban value, Autoroute 15/440 access, growing tech parks', highlightsFr: 'Valeur suburbaine, acc\u00e8s autoroutes 15/440, parcs technologiques' },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function OfficeSpacePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr-ca'

  return (
    <>
      <OfficeJsonLd locale={locale} />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <Section theme="void" className="pt-32 pb-20 md:pt-44 md:pb-28">
        <Container size="lg">
          <Label className="mb-8">{isFr ? '(Bureaux)' : '(Office)'}</Label>
          <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(3.5rem,9vw,7.5rem)', letterSpacing: '-0.02em' }}>
            <TextReveal as="h1" split="words" immediate delay={0.15} className="leading-none uppercase text-[var(--color-cream)]">
              {isFr ? 'Espace Bureau Montr\u00e9al' : 'Office Space Montreal'}
            </TextReveal>
          </div>
          <SectionReveal delay={0.35} className="mt-5">
            <p className="text-[var(--color-cream)] opacity-35" style={{ fontFamily: FONT_DM_SERIF, fontStyle: 'italic', fontSize: 'clamp(1.1rem,2vw,1.5rem)' }}>
              {isFr ? "Achetez, vendez ou louez des espaces de bureaux \u00e0 travers le Grand Montr\u00e9al" : 'Buy, sell, or lease office space across Greater Montreal'}
            </p>
          </SectionReveal>
          <SectionReveal delay={0.5} className="mt-6 flex flex-wrap gap-4">
            <Button variant="primary" href={`/${locale}/contact`} size="lg">
              {isFr ? 'Consultation gratuite' : 'Free Consultation'}
            </Button>
            <Button variant="ghost" href="tel:+15145198177">514 519-8177</Button>
          </SectionReveal>
        </Container>
      </Section>

      {/* ── Market Overview — cream ────────────────────────────────────────── */}
      <Section theme="cream" className="py-24 md:py-32 relative overflow-hidden">
        <div className="wipe pointer-events-none absolute inset-0 bg-[var(--color-cream)] z-10" aria-hidden="true" style={{ transformOrigin: 'top' }} />
        <Container size="lg">
          <Label className="mb-8">{isFr ? '(March\u00e9)' : '(Market)'}</Label>
          <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(2rem,5vw,4rem)', letterSpacing: '-0.02em' }}>
            <TextReveal as="h2" split="words" className="leading-none uppercase text-[var(--color-void)]">
              {isFr ? "Le March\u00e9 des Bureaux" : 'The Office Market'}
            </TextReveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            <SectionReveal>
              <p className="text-[var(--color-void)] opacity-55 leading-relaxed" style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}>
                {isFr
                  ? "Le march\u00e9 des bureaux de Montr\u00e9al traverse une transformation. Avec des taux de vacance autour de 13\u201317\u00a0% au centre-ville \u2014 un niveau historiquement \u00e9lev\u00e9 \u2014 les locataires et acheteurs disposent d\u2019un pouvoir de n\u00e9gociation exceptionnel. Les propri\u00e9taires offrent des am\u00e9liorations locatives g\u00e9n\u00e9reuses, des p\u00e9riodes de gratuit\u00e9 et des conditions flexibles pour attirer des locataires de qualit\u00e9."
                  : "Montreal\u2019s office market is undergoing a structural shift. With downtown vacancy rates hovering around 13\u201317% \u2014 historically elevated \u2014 tenants and buyers hold exceptional negotiating power. Landlords are offering generous tenant improvements, free-rent periods, and flexible terms to attract quality tenants."}
              </p>
            </SectionReveal>
            <SectionReveal delay={0.15}>
              <p className="text-[var(--color-void)] opacity-55 leading-relaxed" style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}>
                {isFr
                  ? "La transition vers le travail hybride a cr\u00e9\u00e9 un march\u00e9 \u00e0 deux vitesses : la classe\u00a0A au centre-ville maintient sa demande tandis que les immeubles de classe\u00a0B et C voient des opportunit\u00e9s de conversion. Les quartiers cr\u00e9atifs comme le Mile End et Griffintown attirent les entreprises technologiques avec des espaces de caract\u00e8re et des loyers inf\u00e9rieurs au centre-ville."
                  : "The shift to hybrid work has created a two-speed market: Class A downtown maintains demand while Class B and C buildings present conversion opportunities. Creative districts like Mile End and Griffintown attract tech companies with character spaces at below-downtown rents."}
              </p>
            </SectionReveal>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {[
              { value: isFr ? '13\u201317\u00a0%' : '13\u201317%', label: isFr ? 'Taux de vacance centre-ville' : 'Downtown vacancy rate' },
              { value: isFr ? '30\u201355\u00a0$' : '$30\u2013$55', label: isFr ? 'Classe A / pi\u00b2' : 'Class A / sq ft' },
              { value: isFr ? '12\u201322\u00a0$' : '$12\u2013$22', label: isFr ? 'Banlieue / pi\u00b2' : 'Suburban / sq ft' },
              { value: '6+', label: isFr ? 'Districts couverts' : 'Districts covered' },
            ].map((stat, i) => (
              <SectionReveal key={i} delay={i * 0.08}>
                <div className="text-center">
                  <p className="text-[var(--color-void)]" style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(2rem,4vw,3rem)' }}>{stat.value}</p>
                  <p className="text-[var(--color-void)] opacity-40 uppercase mt-2" style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em' }}>{stat.label}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Office Classes — void ──────────────────────────────────────────── */}
      <Section theme="void" className="py-24 md:py-32">
        <Container size="lg">
          <Label className="mb-8">{isFr ? '(Classification)' : '(Classification)'}</Label>
          <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(2rem,5vw,4rem)', letterSpacing: '-0.02em' }}>
            <TextReveal as="h2" split="words" className="leading-none uppercase text-[var(--color-cream)]">
              {isFr ? 'Classes de Bureaux' : 'Office Classes Explained'}
            </TextReveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                grade: 'A',
                titleEn: 'Class A \u2014 Premium',
                titleFr: 'Classe A \u2014 Premium',
                descEn: 'New or recently renovated buildings with top-tier finishes, LEED certification, full amenities, and premium lobby presence. Downtown core, $30\u2013$55/sq ft. Attracts law firms, financial institutions, and corporate HQs.',
                descFr: "Immeubles neufs ou r\u00e9cemment r\u00e9nov\u00e9s avec finitions haut de gamme, certification LEED, commodit\u00e9s compl\u00e8tes. Centre-ville, 30\u201355\u00a0$/pi\u00b2. Attire cabinets d\u2019avocats, institutions financi\u00e8res.",
              },
              {
                grade: 'B',
                titleEn: 'Class B \u2014 Value',
                titleFr: 'Classe B \u2014 Valeur',
                descEn: 'Well-maintained buildings with good infrastructure but older finishes. Often in transitional neighborhoods offering character and lower rents. $18\u2013$30/sq ft. Popular with growing companies and creative agencies.',
                descFr: "Immeubles bien entretenus avec infrastructure solide mais finitions plus anciennes. Quartiers en transition, loyers inf\u00e9rieurs. 18\u201330\u00a0$/pi\u00b2. Populaires aupr\u00e8s d\u2019entreprises en croissance.",
              },
              {
                grade: 'C',
                titleEn: 'Class C \u2014 Budget',
                titleFr: 'Classe C \u2014 \u00c9conomique',
                descEn: 'Older buildings, basic finishes, minimal amenities. Lowest cost entry point at $10\u2013$18/sq ft. Ideal for startups, small businesses, and value-conscious tenants. Often present conversion opportunity.',
                descFr: "Immeubles plus anciens, finitions de base. Point d\u2019entr\u00e9e le plus abordable \u00e0 10\u201318\u00a0$/pi\u00b2. Id\u00e9al pour startups et petites entreprises. Opportunit\u00e9s de conversion.",
              },
            ].map((cls, i) => (
              <SectionReveal key={cls.grade} delay={i * 0.1}>
                <div className="p-8 border border-[rgba(236,234,229,0.08)] h-full">
                  <span className="block mb-4" style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '3rem', color: '#e8762a' }}>{cls.grade}</span>
                  <h3 className="text-[var(--color-cream)] mb-4" style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {isFr ? cls.titleFr : cls.titleEn}
                  </h3>
                  <p className="text-[var(--color-cream)] opacity-50 leading-relaxed" style={{ fontFamily: FONT_DM_SANS, fontSize: '0.875rem' }}>
                    {isFr ? cls.descFr : cls.descEn}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Key Districts — cream ──────────────────────────────────────────── */}
      <Section theme="cream" className="py-24 md:py-32 relative overflow-hidden">
        <div className="wipe pointer-events-none absolute inset-0 bg-[var(--color-cream)] z-10" aria-hidden="true" style={{ transformOrigin: 'top' }} />
        <Container size="lg">
          <Label className="mb-8">{isFr ? '(Districts)' : '(Districts)'}</Label>
          <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(2rem,5vw,4rem)', letterSpacing: '-0.02em' }}>
            <TextReveal as="h2" split="words" className="leading-none uppercase text-[var(--color-void)]">
              {isFr ? 'Districts cl\u00e9s' : 'Key Office Districts'}
            </TextReveal>
          </div>
          <div className="mt-12 border-t" style={{ borderColor: 'rgba(14,16,17,0.1)' }}>
            {districts.map((d, i) => (
              <SectionReveal key={d.name} delay={i * 0.06}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-10 border-b" style={{ borderColor: 'rgba(14,16,17,0.1)' }}>
                  <div className="md:col-span-3">
                    <h3 className="text-[var(--color-void)]" style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(1.1rem,2vw,1.5rem)', textTransform: 'uppercase' }}>
                      {isFr ? d.nameFr : d.name}
                    </h3>
                    <span className="block mt-1 text-[var(--color-void)] opacity-30" style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
                      {isFr ? 'Classe' : 'Class'} {d.classGrade}
                    </span>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-[var(--color-void)]" style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '1.1rem' }}>
                      {isFr ? d.priceRangeFr : d.priceRange}
                    </p>
                  </div>
                  <div className="md:col-span-7">
                    <p className="text-[var(--color-void)] opacity-55 leading-relaxed" style={{ fontFamily: FONT_DM_SANS, fontSize: '0.875rem' }}>
                      {isFr ? d.highlightsFr : d.highlights}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Buy vs Lease — void ────────────────────────────────────────────── */}
      <Section theme="void" className="py-24 md:py-32">
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <Label className="mb-8">{isFr ? '(Analyse)' : '(Analysis)'}</Label>
              <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(2rem,5vw,3.5rem)', letterSpacing: '-0.02em' }}>
                <TextReveal as="h2" split="words" className="leading-none uppercase text-[var(--color-cream)]">
                  {isFr ? 'Acheter ou Louer ?' : 'Buy or Lease?'}
                </TextReveal>
              </div>
              <SectionReveal delay={0.2} className="mt-8">
                <p className="text-[var(--color-cream)] opacity-50 leading-relaxed mb-6" style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}>
                  {isFr
                    ? "Le choix entre acheter et louer un bureau d\u00e9pend de votre stade de croissance, vos flux de tr\u00e9sorerie et votre horizon de planification. Jeremy analyse votre situation financi\u00e8re et op\u00e9rationnelle pour recommander l\u2019approche optimale."
                    : "The buy-vs-lease decision depends on your growth stage, cash flow, and planning horizon. Jeremy analyzes your financial and operational situation to recommend the optimal approach."}
                </p>
              </SectionReveal>
              <SectionReveal delay={0.3}>
                <Button variant="ghost" href={`/${locale}/services`}>{isFr ? 'Nos services' : 'Our Services'}</Button>
              </SectionReveal>
            </div>
            <div>
              {[
                { labelEn: 'Buying advantages', labelFr: 'Avantages de l\u2019achat', items: isFr ? ['\u00c9quit\u00e9 \u00e0 long terme', 'Co\u00fbts fixes pr\u00e9visibles', 'Amortissement fiscal', 'Contr\u00f4le total des r\u00e9novations'] : ['Long-term equity building', 'Predictable fixed costs', 'Tax depreciation benefits', 'Full renovation control'] },
                { labelEn: 'Leasing advantages', labelFr: 'Avantages de la location', items: isFr ? ['Flexibilit\u00e9 op\u00e9rationnelle', 'Capital pr\u00e9serv\u00e9', 'Am\u00e9liorations locatives n\u00e9gociables', 'D\u00e9placement facile'] : ['Operational flexibility', 'Capital preservation', 'Negotiable tenant improvements', 'Easy relocation'] },
              ].map((group, i) => (
                <SectionReveal key={i} delay={i * 0.15 + 0.1}>
                  <div className={i > 0 ? 'mt-8' : ''}>
                    <h3 className="text-[var(--color-cream)] opacity-40 uppercase mb-4" style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em' }}>
                      {isFr ? group.labelFr : group.labelEn}
                    </h3>
                    <ul className="flex flex-col gap-3">
                      {group.items.map((item) => (
                        <li key={item} className="text-[var(--color-cream)] opacity-60 flex items-start gap-3" style={{ fontFamily: FONT_DM_SANS, fontSize: '0.875rem' }}>
                          <span className="text-[#e8762a] mt-0.5" aria-hidden="true">\u2192</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Services — cream ───────────────────────────────────────────────── */}
      <Section theme="cream" className="py-24 md:py-32 relative overflow-hidden">
        <div className="wipe pointer-events-none absolute inset-0 bg-[var(--color-cream)] z-10" aria-hidden="true" style={{ transformOrigin: 'top' }} />
        <Container size="lg">
          <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(2rem,5vw,3.5rem)', letterSpacing: '-0.02em' }}>
            <TextReveal as="h2" split="words" className="leading-none uppercase text-[var(--color-void)]">
              {isFr ? 'Comment Jeremy Peut Aider' : 'How Jeremy Can Help'}
            </TextReveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
            {[
              { titleEn: 'For Tenants', titleFr: 'Pour les locataires', descEn: 'Space search, lease negotiation, tenant improvement coordination, renewal strategy, and relocation planning.', descFr: "Recherche d\u2019espaces, n\u00e9gociation de bail, coordination des am\u00e9liorations locatives, strat\u00e9gie de renouvellement." },
              { titleEn: 'For Buyers', titleFr: 'Pour les acheteurs', descEn: 'Building identification, due diligence, financial analysis (cap rate, NOI, cash flow), and acquisition execution.', descFr: "Identification d\u2019immeubles, diligence raisonnable, analyse financi\u00e8re (taux de capitalisation, RNE, flux de tr\u00e9sorerie)." },
              { titleEn: 'For Sellers', titleFr: 'Pour les vendeurs', descEn: 'Property valuation, marketing strategy, tenant retention analysis, buyer qualification, and deal structuring.', descFr: "\u00c9valuation immobili\u00e8re, strat\u00e9gie de mise en march\u00e9, analyse de r\u00e9tention des locataires, qualification des acheteurs." },
              { titleEn: 'For Investors', titleFr: 'Pour les investisseurs', descEn: 'Portfolio analysis, value-add opportunity identification, rent optimization, and exit strategy planning.', descFr: "Analyse de portefeuille, identification d\u2019opportunit\u00e9s de valeur ajout\u00e9e, optimisation des loyers, strat\u00e9gie de sortie." },
            ].map((svc, i) => (
              <SectionReveal key={i} delay={i * 0.08}>
                <div className="p-6 border border-[rgba(14,16,17,0.08)]">
                  <h3 className="text-[var(--color-void)] mb-3" style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {isFr ? svc.titleFr : svc.titleEn}
                  </h3>
                  <p className="text-[var(--color-void)] opacity-55 leading-relaxed" style={{ fontFamily: FONT_DM_SANS, fontSize: '0.875rem' }}>
                    {isFr ? svc.descFr : svc.descEn}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Post-Pandemic Insight — void ───────────────────────────────────── */}
      <Section theme="void" className="py-24 md:py-32">
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-0.02em' }}>
                <TextReveal as="h2" split="words" className="leading-none uppercase text-[var(--color-cream)]">
                  {isFr ? "L\u2019Opportunit\u00e9 Post-Pand\u00e9mie" : 'The Post-Pandemic Opportunity'}
                </TextReveal>
              </div>
            </div>
            <SectionReveal delay={0.15}>
              <div>
                <p className="text-[var(--color-cream)] opacity-50 leading-relaxed mb-6" style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}>
                  {isFr
                    ? "Le travail hybride a fondamentalement chang\u00e9 la dynamique du march\u00e9 des bureaux de Montr\u00e9al. Les entreprises recherchent d\u00e9sormais des espaces plus petits mais de meilleure qualit\u00e9, avec des commodit\u00e9s qui attirent les employ\u00e9s au bureau. Les immeubles qui offrent flexibilit\u00e9, technologie et qualit\u00e9 de vie surperforment le march\u00e9."
                    : "Hybrid work has fundamentally changed Montreal\u2019s office market dynamics. Companies now seek smaller but higher-quality spaces with amenities that attract employees back to the office. Buildings offering flexibility, technology, and quality of life are outperforming the market."}
                </p>
                <p className="text-[var(--color-cream)] opacity-50 leading-relaxed mb-8" style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}>
                  {isFr
                    ? "Pour les investisseurs, c\u2019est le moment. Les propri\u00e9taires motiv\u00e9s, les conversions de classe B/C en r\u00e9sidentiel ou en usage mixte, et les n\u00e9gociations favorables aux acheteurs cr\u00e9ent des opportunit\u00e9s rares."
                    : "For investors, the timing is right. Motivated sellers, Class B/C conversion to residential or mixed-use, and buyer-favorable negotiations are creating rare opportunities."}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="link" href={`/${locale}/commercial-real-estate-montreal`}>{isFr ? 'Immobilier commercial' : 'Commercial Real Estate'}</Button>
                  <Button variant="link" href={`/${locale}/tools`}>{isFr ? 'Nos outils' : 'Our Tools'}</Button>
                </div>
              </div>
            </SectionReveal>
          </div>
        </Container>
      </Section>

      {/* ── FAQ — cream ────────────────────────────────────────────────────── */}
      <Section theme="cream" className="py-24 md:py-32 relative overflow-hidden">
        <div className="wipe pointer-events-none absolute inset-0 bg-[var(--color-cream)] z-10" aria-hidden="true" style={{ transformOrigin: 'top' }} />
        <Container size="lg">
          <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(2rem,5vw,3.5rem)', letterSpacing: '-0.02em' }}>
            <TextReveal as="h2" split="words" className="leading-none uppercase text-[var(--color-void)]">
              {isFr ? 'Questions Fr\u00e9quentes' : 'Frequently Asked Questions'}
            </TextReveal>
          </div>
          <div className="mt-12 border-t" style={{ borderColor: 'rgba(14,16,17,0.1)' }}>
            {[
              { q: isFr ? 'Quel est le prix moyen du bureau au pied carr\u00e9 \u00e0 Montr\u00e9al ?' : 'What is the average office price per sq ft in Montreal?', a: isFr ? "Le prix varie de 15\u00a0$/pi\u00b2 en banlieue \u00e0 45\u00a0$/pi\u00b2 et plus au centre-ville pour la classe\u00a0A. Jeremy analyse votre budget et vos besoins pour identifier les meilleures options." : "Prices range from $15/sq ft in suburban areas to $45+/sq ft for Class A downtown. Jeremy analyzes your budget and needs to identify the best options." },
              { q: isFr ? 'Vaut-il mieux acheter ou louer un bureau ?' : 'Should I buy or lease office space?', a: isFr ? "L\u2019achat convient aux entreprises stables cherchant \u00e0 b\u00e2tir de l\u2019\u00e9quit\u00e9. La location offre flexibilit\u00e9 et pr\u00e9servation du capital. Jeremy mod\u00e9lise les deux sc\u00e9narios pour votre situation sp\u00e9cifique." : "Buying suits stable businesses building equity. Leasing offers flexibility and capital preservation. Jeremy models both scenarios for your specific situation." },
              { q: isFr ? 'Quels sont les meilleurs quartiers pour les bureaux \u00e0 Montr\u00e9al ?' : 'What are the best neighborhoods for office space in Montreal?', a: isFr ? "Centre-ville pour le prestige, Mile End pour la cr\u00e9ativit\u00e9, Griffintown pour la tech, Saint-Laurent pour les co\u00fbts r\u00e9duits. Chaque quartier convient \u00e0 un profil d\u2019entreprise diff\u00e9rent." : "Downtown for prestige, Mile End for creative industries, Griffintown for tech, Saint-Laurent for cost efficiency. Each district suits a different business profile." },
              { q: isFr ? 'Quel est le taux de vacance des bureaux \u00e0 Montr\u00e9al ?' : 'What is the office vacancy rate in Montreal?', a: isFr ? "Le taux de vacance est d\u2019environ 13\u201317\u00a0% au centre-ville, cr\u00e9ant des opportunit\u00e9s de n\u00e9gociation pour les locataires et acheteurs avertis." : "Downtown vacancy sits around 13\u201317%, creating negotiation opportunities for savvy tenants and buyers." },
              { q: isFr ? 'Jeremy peut-il m\u2019aider avec un bail commercial ?' : 'Can Jeremy help with lease negotiation?', a: isFr ? "Oui. Jeremy n\u00e9gocie les baux commerciaux, les clauses de renouvellement, les am\u00e9liorations locatives et les p\u00e9riodes de gratuit\u00e9 pour prot\u00e9ger vos int\u00e9r\u00eats." : "Yes. Jeremy negotiates commercial leases, renewal clauses, tenant improvements, and free-rent periods to protect your interests." },
            ].map((faq, i) => (
              <SectionReveal key={i} delay={i * 0.06}>
                <div className="py-8 border-b" style={{ borderColor: 'rgba(14,16,17,0.1)' }}>
                  <h3 className="text-[var(--color-void)] mb-3" style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                    {faq.q}
                  </h3>
                  <p className="text-[var(--color-void)] opacity-55 leading-relaxed max-w-3xl" style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}>
                    {faq.a}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── CTA — void ─────────────────────────────────────────────────────── */}
      <Section theme="void" className="py-28 md:py-36">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12">
            <div className="flex-1 max-w-2xl">
              <SectionReveal>
                <span className="block mb-6 uppercase" style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em', color: '#e8762a' }}>
                  {isFr ? '\u2014 Prochaine \u00e9tape' : '\u2014 Next step'}
                </span>
              </SectionReveal>
              <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(2.5rem,6vw,5rem)', letterSpacing: '-0.02em' }}>
                <TextReveal as="h2" split="words" className="leading-none uppercase text-[var(--color-cream)]">
                  {isFr ? 'Trouvez Votre Bureau' : 'Find Your Office'}
                </TextReveal>
              </div>
              <SectionReveal delay={0.2} className="mt-6 max-w-lg">
                <p className="text-[var(--color-cream)] opacity-40 leading-relaxed" style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}>
                  {isFr
                    ? "Que vous cherchiez \u00e0 louer, acheter ou investir, une conversation de 15\u00a0minutes suffit pour d\u00e9finir vos options. OACIQ\u00a0H2731."
                    : "Whether you\u2019re looking to lease, buy, or invest, a 15-minute conversation is enough to map your options. OACIQ H2731."}
                </p>
              </SectionReveal>
            </div>
            <SectionReveal delay={0.15} className="flex-shrink-0 flex flex-wrap gap-4">
              <Button variant="primary" theme="dark" href={`/${locale}/contact`} size="lg">
                {isFr ? 'Discutons' : "Let\u2019s Talk"}
              </Button>
              <Button variant="ghost" href="tel:+15145198177" size="lg">514 519-8177</Button>
            </SectionReveal>
          </div>
        </Container>
      </Section>

      {/* ── Internal links ─────────────────────────────────────────────────── */}
      <Section theme="void" className="py-14 md:py-16 border-t border-[rgba(236,234,229,0.06)]">
        <Container size="lg">
          <SectionReveal>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <p className="text-[var(--color-cream)] opacity-30 uppercase" style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em' }}>
                {isFr ? 'Explorer' : 'Explore'}
              </p>
              <div className="flex flex-wrap gap-x-10 gap-y-3">
                {[
                  { label: isFr ? 'Immobilier commercial' : 'Commercial', href: `/${locale}/commercial-real-estate-montreal` },
                  { label: isFr ? 'Industriel' : 'Industrial', href: `/${locale}/industrial-real-estate-montreal` },
                  { label: isFr ? 'Espace commercial' : 'Retail Space', href: `/${locale}/retail-space-montreal` },
                  { label: 'Services', href: `/${locale}/services` },
                  { label: 'Contact', href: `/${locale}/contact` },
                  { label: 'Centris.ca', href: 'https://www.centris.ca' },
                  { label: 'Realtor.ca', href: 'https://www.realtor.ca' },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-[var(--color-cream)] opacity-50 hover:opacity-100 transition-opacity duration-200 uppercase"
                    style={{ fontFamily: FONT_DM_SANS, fontSize: '0.75rem', letterSpacing: '0.12em', fontWeight: 500 }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </SectionReveal>
        </Container>
      </Section>
    </>
  )
}
