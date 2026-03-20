import type { Metadata } from 'next'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Label } from '@/components/ui/Label'
import { TextReveal } from '@/components/animation/TextReveal'
import { SectionReveal } from '@/components/animation/SectionReveal'
import { Button } from '@/components/ui/Button'

// ─── Font helpers ──────────────────────────────────────────────────────────────
const FONT_BARLOW = `var(--font-barlow), 'Barlow', sans-serif`
const FONT_DM_SANS = `var(--font-dm-sans), 'DM Sans', sans-serif`

const SITE_URL = 'https://jeremysoares.com'

// ─── SEO ───────────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale === 'fr-ca'
  const canonical = `${SITE_URL}/${locale}/land-for-sale-montreal`

  const title = isFr
    ? 'Terrain \u00e0 Vendre Montr\u00e9al | Sites de D\u00e9veloppement \u2014 Jeremy Soares OACIQ H2731'
    : 'Land for Sale in Montreal | Development Sites \u2014 Jeremy Soares OACIQ H2731'

  const description = isFr
    ? 'Achetez un terrain ou site de d\u00e9veloppement \u00e0 Montr\u00e9al. Terrains r\u00e9sidentiels, commerciaux, opportunit\u00e9s d\u2019infill. Courtier commercial OACIQ H2731.'
    : 'Buy land or development sites in Montreal. Residential lots, commercial land, infill development opportunities. OACIQ H2731 commercial broker.'

  return {
    title,
    description,
    keywords: isFr
      ? [
          'terrain \u00e0 vendre montr\u00e9al',
          'site de d\u00e9veloppement montr\u00e9al',
          'terrain r\u00e9sidentiel montr\u00e9al',
          'terrain commercial montr\u00e9al',
          'd\u00e9veloppement infill montr\u00e9al',
          'courtier terrain montr\u00e9al',
          'OACIQ H2731',
        ]
      : [
          'land for sale montreal',
          'development site montreal',
          'residential lot montreal',
          'commercial land montreal',
          'infill development montreal',
          'terrain \u00e0 vendre',
          'OACIQ H2731',
        ],
    alternates: {
      canonical,
      languages: {
        'en-CA': `${SITE_URL}/en-ca/land-for-sale-montreal`,
        'fr-CA': `${SITE_URL}/fr-ca/land-for-sale-montreal`,
      },
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title,
      description,
      images: [
        {
          url: 'https://cdn.prod.website-files.com/68ba28534a070e692e441089/68baf35dc28553a17f2d6d78_8-IMG_6610.jpg',
          width: 1218,
          height: 813,
          alt: isFr ? 'Terrain Montr\u00e9al Jeremy Soares' : 'Land for Sale Montreal Jeremy Soares',
        },
      ],
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

// ─── JSON-LD ───────────────────────────────────────────────────────────────────
function LandJsonLd({ locale }: { locale: string }) {
  const isFr = locale === 'fr-ca'
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/${locale}/land-for-sale-montreal#service`,
        serviceType: 'Land Acquisition Brokerage',
        name: isFr ? 'Courtage Acquisition de Terrains Montr\u00e9al' : 'Land Acquisition Brokerage Montreal',
        description: isFr
          ? "Services de courtage pour l\u2019acquisition de terrains et sites de d\u00e9veloppement \u00e0 Montr\u00e9al. Terrains r\u00e9sidentiels, commerciaux et industriels."
          : 'Brokerage services for land and development site acquisition in Montreal. Residential, commercial, and industrial lots.',
        provider: {
          '@type': 'RealEstateAgent',
          '@id': `${SITE_URL}/#agent`,
          name: 'Jeremy Soares',
        },
        areaServed: { '@type': 'City', name: 'Montreal' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: isFr
              ? 'Comment est d\u00e9termin\u00e9 le zonage d\u2019un terrain \u00e0 Montr\u00e9al ?'
              : 'How is land zoned in Montreal?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: isFr
                ? "Le zonage est d\u00e9termin\u00e9 par le Plan d\u2019urbanisme de la Ville de Montr\u00e9al et les r\u00e8glements d\u2019arrondissement. Chaque lot a des d\u00e9signations pour l\u2019utilisation, la hauteur, la densit\u00e9 et les marges de recul. Jeremy analyse le zonage et les possibilit\u00e9s de d\u00e9rogation avant toute acquisition."
                : "Zoning is determined by the City of Montreal\u2019s Plan d\u2019urbanisme and borough regulations. Each lot carries designations for use, height, density, and setbacks. Jeremy analyzes zoning and variance potential before any acquisition.",
            },
          },
          {
            '@type': 'Question',
            name: isFr ? "Qu\u2019est-ce que le d\u00e9veloppement infill ?" : 'What is infill development?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: isFr
                ? "Le d\u00e9veloppement infill consiste \u00e0 construire sur des terrains vacants ou sous-utilis\u00e9s dans des quartiers existants. Montr\u00e9al offre de nombreuses opportunit\u00e9s d\u2019infill, notamment dans les arrondissements en densification comme Rosemont, C\u00f4te-des-Neiges et Saint-Laurent."
                : "Infill development means building on vacant or underutilized lots within existing neighbourhoods. Montreal offers numerous infill opportunities, particularly in densifying boroughs like Rosemont, C\u00f4te-des-Neiges, and Saint-Laurent.",
            },
          },
          {
            '@type': 'Question',
            name: isFr
              ? "Combien de temps prend l\u2019acquisition d\u2019un terrain \u00e0 Montr\u00e9al ?"
              : 'How long does land acquisition take in Montreal?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: isFr
                ? "L\u2019acquisition d\u2019un terrain \u00e0 Montr\u00e9al prend g\u00e9n\u00e9ralement 60 \u00e0 120 jours selon la complexit\u00e9 de la diligence raisonnable, les conditions de financement et les \u00e9tudes environnementales requises. Jeremy coordonne toutes les parties pour respecter les \u00e9ch\u00e9ances."
                : "Land acquisition in Montreal typically takes 60 to 120 days depending on due diligence complexity, financing conditions, and required environmental studies. Jeremy coordinates all parties to keep the timeline on track.",
            },
          },
        ],
      },
    ],
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
}

// ─── Data ──────────────────────────────────────────────────────────────────────
const landTypes = [
  {
    titleEn: 'Residential Lots',
    titleFr: 'Terrains r\u00e9sidentiels',
    descEn: 'Single-family and multi-unit residential lots across Montreal boroughs. Ideal for custom home builds, semi-detached projects, or small multiplex development.',
    descFr: 'Terrains r\u00e9sidentiels unifamiliaux et multi-unit\u00e9s dans les arrondissements de Montr\u00e9al. Id\u00e9al pour maisons sur mesure, jumel\u00e9s ou petits immeubles \u00e0 logements.',
  },
  {
    titleEn: 'Commercial Land',
    titleFr: 'Terrains commerciaux',
    descEn: 'Zoned commercial or mixed-use sites in high-traffic corridors. Suited for retail plazas, mixed-use buildings, or sale to commercial developers seeking strategic locations.',
    descFr: 'Sites zon\u00e9s commerciaux ou usages mixtes dans des corridors \u00e0 fort achalandage. Convient aux centres commerciaux, immeubles mixtes ou vente \u00e0 des promoteurs commerciaux.',
  },
  {
    titleEn: 'Infill Development',
    titleFr: 'D\u00e9veloppement infill',
    descEn: 'Underutilized or vacant lots embedded in established neighbourhoods. Infill sites benefit from existing infrastructure, transit access, and neighbourhood demand without greenfield risk.',
    descFr: 'Terrains vacants ou sous-utilis\u00e9s dans des quartiers \u00e9tablis. Les sites infill b\u00e9n\u00e9ficient d\u2019infrastructures existantes, du transport en commun et de la demande du quartier.',
  },
  {
    titleEn: 'Industrial Land',
    titleFr: 'Terrains industriels',
    descEn: 'Serviced industrial land in Saint-Laurent, LaSalle, and the East End. Suitable for logistics, light manufacturing, or conversion to mixed-use and creative workspace.',
    descFr: 'Terrains industriels viabilis\u00e9s \u00e0 Saint-Laurent, LaSalle et dans l\u2019est. Convient \u00e0 la logistique, \u00e0 la fabrication l\u00e9g\u00e8re ou \u00e0 la conversion en usage mixte.',
  },
]

const considerations = [
  {
    titleEn: 'Zoning Analysis',
    titleFr: 'Analyse du zonage',
    descEn: "Every land transaction begins with a thorough zoning review. Jeremy examines the borough\u2019s Plan d\u2019urbanisme, permitted uses, density ratios (FSI/COS), and height limits to establish true development potential.",
    descFr: "Toute transaction fonci\u00e8re commence par une analyse de zonage approfondie. Jeremy examine le plan d\u2019urbanisme de l\u2019arrondissement, les usages permis, les coefficients d\u2019occupation et les hauteurs pour \u00e9tablir le potentiel r\u00e9el.",
  },
  {
    titleEn: 'Permit Timeline',
    titleFr: '\u00c9ch\u00e9ancier des permis',
    descEn: 'Permit timelines in Montreal vary significantly by borough and project type. Jeremy\u2019s network of architects and planners provides realistic timelines before you commit capital, avoiding costly surprises.',
    descFr: "Les d\u00e9lais de permis varient consid\u00e9rablement selon l\u2019arrondissement et le type de projet. Le r\u00e9seau d\u2019architectes et d\u2019urbanistes de Jeremy fournit des \u00e9ch\u00e9anciers r\u00e9alistes avant tout engagement de capital.",
  },
  {
    titleEn: 'Servicing & Infrastructure',
    titleFr: 'Viabilisation & Infrastructure',
    descEn: 'Unserviced or under-serviced land requires significant investment before development can begin. Jeremy identifies existing service connections, capacity issues, and cost estimates for water, sewer, and electrical.',
    descFr: 'Les terrains non viabilis\u00e9s ou partiellement viabilis\u00e9s n\u00e9cessitent des investissements importants. Jeremy identifie les raccordements existants, les probl\u00e8mes de capacit\u00e9 et les estimations de co\u00fbts.',
  },
  {
    titleEn: 'Market Value',
    titleFr: 'Valeur march\u00e9',
    descEn: 'Raw land valuation requires analysis of comparables, development potential, carrying costs, and exit scenarios. Jeremy builds a financial model for every land acquisition to ensure price discipline and return clarity.',
    descFr: "L\u2019\u00e9valuation fonci\u00e8re exige une analyse des comparables, du potentiel de d\u00e9veloppement, des co\u00fbts de portage et des sc\u00e9narios de sortie. Jeremy mod\u00e9lise chaque acquisition pour assurer la discipline de prix.",
  },
]

// ─── Page ──────────────────────────────────────────────────────────────────────
export default async function LandForSaleMontralPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr-ca'

  return (
    <>
      <LandJsonLd locale={locale} />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <Section theme="void" className="pt-32 pb-16 md:pt-40 md:pb-20">
        <Container size="lg">
          <Label className="mb-8">{isFr ? '(Terrain & D\u00e9veloppement)' : '(Land & Development)'}</Label>
          <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, letterSpacing: '-0.02em' }}>
            <TextReveal
              as="h1"
              split="words"
              immediate
              delay={0.15}
              className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-tight tracking-tight text-[#eceae5] uppercase"
            >
              {isFr ? 'Terrain \u00e0 Vendre\n\u00e0 Montr\u00e9al' : 'Land for Sale\nin Montr\u00e9al'}
            </TextReveal>
          </div>
          <SectionReveal delay={0.35} className="mt-6 max-w-lg">
            <p className="text-[#eceae5] opacity-50 leading-relaxed" style={{ fontFamily: FONT_DM_SANS, fontSize: 'clamp(0.9375rem,1.5vw,1.125rem)' }}>
              {isFr
                ? "Expertise en acquisition fonci\u00e8re \u00e0 Montr\u00e9al. Analyse du zonage, \u00e9valuation du potentiel de d\u00e9veloppement et n\u00e9gociation pour investisseurs et promoteurs. OACIQ H2731."
                : 'Land acquisition expertise in Montreal. Zoning analysis, development potential assessment, and negotiation for investors and developers. OACIQ H2731.'}
            </p>
          </SectionReveal>
          <SectionReveal delay={0.5} className="mt-8 flex flex-wrap gap-4">
            <Button variant="primary" href={`/${locale}/contact`} size="lg">
              {isFr ? 'Consultation gratuite' : 'Free Consultation'}
            </Button>
            <Button variant="ghost" href="tel:+15145198177">514 519-8177</Button>
          </SectionReveal>
        </Container>
      </Section>

      {/* ── Land types ─────────────────────────────────────────────────────── */}
      <Section theme="cream" className="py-24 md:py-32">
        <Container size="lg">
          <Label className="mb-8">{isFr ? '(Types de terrains)' : '(Land Types)'}</Label>
          <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, letterSpacing: '-0.02em' }}>
            <TextReveal as="h2" split="words" className="text-[clamp(2rem,5vw,3.75rem)] font-black leading-none tracking-tight text-[#0e1011] uppercase mb-12">
              {isFr ? 'Types de Terrains' : 'Land Types'}
            </TextReveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {landTypes.map((type, i) => (
              <SectionReveal key={i} delay={i * 0.08}>
                <div className="p-8 border border-[rgba(14,16,17,0.08)] h-full">
                  <h3
                    className="text-[#0e1011] mb-4 uppercase"
                    style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '1.25rem', letterSpacing: '0.04em' }}
                  >
                    {isFr ? type.titleFr : type.titleEn}
                  </h3>
                  <p className="text-[#0e1011] opacity-60 leading-relaxed" style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}>
                    {isFr ? type.descFr : type.descEn}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Key considerations ─────────────────────────────────────────────── */}
      <Section theme="void" className="py-24 md:py-32">
        <Container size="lg">
          <Label className="mb-8">{isFr ? '(Consid\u00e9rations cl\u00e9s)' : '(Key Considerations)'}</Label>
          <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, letterSpacing: '-0.02em' }}>
            <TextReveal as="h2" split="words" className="text-[clamp(2rem,5vw,3.75rem)] font-black leading-none tracking-tight text-[#eceae5] uppercase mb-12">
              {isFr ? 'Consid\u00e9rations Cl\u00e9s' : 'Key Considerations'}
            </TextReveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {considerations.map((item, i) => (
              <SectionReveal key={i} delay={i * 0.08}>
                <div className="p-8 border border-[rgba(236,234,229,0.08)] h-full">
                  <h3
                    className="text-[#eceae5] mb-4 uppercase"
                    style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '1.1rem', letterSpacing: '0.04em' }}
                  >
                    {isFr ? item.titleFr : item.titleEn}
                  </h3>
                  <p className="text-[#eceae5] opacity-50 leading-relaxed" style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}>
                    {isFr ? item.descFr : item.descEn}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Why Jeremy ─────────────────────────────────────────────────────── */}
      <Section theme="cream" className="py-24 md:py-32">
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <Label className="mb-8">{isFr ? '(Expertise)' : '(Expertise)'}</Label>
              <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, letterSpacing: '-0.02em' }}>
                <TextReveal as="h2" split="words" className="text-[clamp(2rem,5vw,3.75rem)] font-black leading-none tracking-tight text-[#0e1011] uppercase mb-12">
                  {isFr ? 'Pourquoi Travailler avec Jeremy' : 'Why Work with Jeremy'}
                </TextReveal>
              </div>
            </div>
            <SectionReveal delay={0.15}>
              <div className="flex flex-col gap-6">
                <p className="text-[#0e1011] opacity-60 leading-relaxed" style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}>
                  {isFr
                    ? "Avec plus de 10 ans d\u2019exp\u00e9rience dans l\u2019immobilier commercial montr\u00e9alais, Jeremy Soares ma\u00eetrise les r\u00e8glements de zonage de chaque arrondissement, les dynamiques de d\u00e9veloppement et les attentes du march\u00e9 foncier."
                    : "With over 10 years in Montreal commercial real estate, Jeremy Soares has mastered the zoning regulations of every borough, development dynamics, and land market expectations across the island."}
                </p>
                <p className="text-[#0e1011] opacity-60 leading-relaxed" style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}>
                  {isFr
                    ? "Son r\u00e9seau de promoteurs, d\u2019investisseurs institutionnels, d\u2019architectes et d\u2019urbanistes lui permet d\u2019\u00e9valuer rapidement le potentiel r\u00e9el d\u2019un terrain et de n\u00e9gocier des acquisitions complexes. Courtier agr\u00e9\u00e9 OACIQ H2731."
                    : "His network of developers, institutional investors, architects, and urban planners enables rapid assessment of true land potential and negotiation of complex acquisitions. OACIQ certified broker H2731."}
                </p>
                <div className="flex flex-wrap gap-4 mt-4">
                  {[
                    { labelEn: '10+ years', labelFr: '10+ ans', subEn: 'Montreal market', subFr: 'March\u00e9 montr\u00e9alais' },
                    { labelEn: 'OACIQ', labelFr: 'OACIQ', subEn: 'H2731', subFr: 'H2731' },
                    { labelEn: 'All boroughs', labelFr: 'Tous arrondissements', subEn: 'Island-wide coverage', subFr: 'Couverture \u00eele enti\u00e8re' },
                  ].map((stat, i) => (
                    <div key={i} className="border border-[rgba(14,16,17,0.1)] px-6 py-4">
                      <p className="text-[#0e1011]" style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '1.5rem' }}>
                        {isFr ? stat.labelFr : stat.labelEn}
                      </p>
                      <p className="text-[#0e1011] opacity-40 uppercase mt-1" style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.18em' }}>
                        {isFr ? stat.subFr : stat.subEn}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>
        </Container>
      </Section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <Section theme="void" className="py-24 md:py-32">
        <Container size="lg">
          <Label className="mb-8">{isFr ? '(FAQ)' : '(FAQ)'}</Label>
          <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, letterSpacing: '-0.02em' }}>
            <TextReveal as="h2" split="words" className="text-[clamp(2rem,5vw,3.75rem)] font-black leading-none tracking-tight text-[#eceae5] uppercase mb-12">
              {isFr ? 'Questions Fr\u00e9quentes' : 'Frequently Asked Questions'}
            </TextReveal>
          </div>
          <div className="mt-12 border-t border-[rgba(236,234,229,0.08)]">
            {[
              {
                q: isFr
                  ? 'Comment est d\u00e9termin\u00e9 le zonage d\u2019un terrain \u00e0 Montr\u00e9al ?'
                  : 'How is land zoned in Montreal?',
                a: isFr
                  ? "Le zonage est d\u00e9termin\u00e9 par le Plan d\u2019urbanisme de la Ville de Montr\u00e9al et les r\u00e8glements d\u2019arrondissement. Chaque lot porte des d\u00e9signations pour l\u2019utilisation permise, la hauteur maximale, les coefficients de densit\u00e9 (COS/CES) et les marges de recul. Jeremy analyse ces param\u00e8tres \u2014 ainsi que les possibilit\u00e9s de d\u00e9rogation \u2014 avant toute acquisition."
                  : "Zoning is set by the City of Montreal\u2019s Plan d\u2019urbanisme and each borough\u2019s by-laws. Every lot carries designations for permitted use, maximum height, density ratios (FSI/lot coverage), and setbacks. Jeremy analyzes these parameters \u2014 including variance potential \u2014 before any acquisition.",
              },
              {
                q: isFr ? "Qu\u2019est-ce que le d\u00e9veloppement infill ?" : 'What is infill development?',
                a: isFr
                  ? "Le d\u00e9veloppement infill consiste \u00e0 construire sur des terrains vacants ou sous-utilis\u00e9s dans des quartiers \u00e9tablis. Montr\u00e9al offre de nombreuses opportunit\u00e9s d\u2019infill, notamment dans les arrondissements en densification comme Rosemont, C\u00f4te-des-Neiges et Saint-Laurent. Ces sites b\u00e9n\u00e9ficient d\u2019infrastructures existantes et d\u2019une demande locative solide."
                  : "Infill development means building on vacant or underutilized lots within established neighbourhoods. Montreal offers significant infill opportunities, particularly in densifying boroughs like Rosemont, C\u00f4te-des-Neiges, and Saint-Laurent. These sites benefit from existing infrastructure and strong rental demand.",
              },
              {
                q: isFr
                  ? "Combien de temps prend l\u2019acquisition d\u2019un terrain \u00e0 Montr\u00e9al ?"
                  : 'How long does land acquisition take in Montreal?',
                a: isFr
                  ? "L\u2019acquisition d\u2019un terrain prend typiquement 60 \u00e0 120 jours selon la complexit\u00e9 de la diligence raisonnable, les conditions de financement et les \u00e9tudes environnementales requises. Les sites avec contamination potentielle ou enjeux de titre n\u00e9cessitent plus de temps. Jeremy coordonne toutes les parties pour respecter l\u2019\u00e9ch\u00e9ancier."
                  : "Land acquisition typically takes 60 to 120 days depending on due diligence complexity, financing conditions, and required environmental assessments. Sites with potential contamination or title issues require more time. Jeremy coordinates all parties to keep the process on schedule.",
              },
            ].map((faq, i) => (
              <SectionReveal key={i} delay={i * 0.06}>
                <div className="py-8 border-b border-[rgba(236,234,229,0.08)]">
                  <h3
                    className="text-[#eceae5] mb-3"
                    style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.02em' }}
                  >
                    {faq.q}
                  </h3>
                  <p className="text-[#eceae5] opacity-50 leading-relaxed max-w-3xl" style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}>
                    {faq.a}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <Section theme="cream" className="py-28 md:py-36">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12">
            <div className="flex-1 max-w-2xl">
              <SectionReveal>
                <span
                  className="block mb-6 uppercase"
                  style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em', color: '#f55f00' }}
                >
                  {isFr ? '\u2014 Prochaine \u00e9tape' : '\u2014 Next step'}
                </span>
              </SectionReveal>
              <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, letterSpacing: '-0.02em' }}>
                <TextReveal as="h2" split="words" className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-none tracking-tight text-[#0e1011] uppercase">
                  {isFr ? 'Vous cherchez un terrain ?' : 'Looking for Land?'}
                </TextReveal>
              </div>
              <SectionReveal delay={0.2} className="mt-6 max-w-lg">
                <p className="text-[#0e1011] opacity-60 leading-relaxed" style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}>
                  {isFr
                    ? "Partagez vos crit\u00e8res \u2014 superficie, secteur, budget, potentiel de d\u00e9veloppement \u2014 et Jeremy identifie les opportunit\u00e9s correspondantes, y compris les sites hors march\u00e9. OACIQ H2731."
                    : "Share your criteria \u2014 size, area, budget, development potential \u2014 and Jeremy identifies matching opportunities including off-market sites. OACIQ H2731."}
                </p>
              </SectionReveal>
            </div>
            <SectionReveal delay={0.15} className="flex-shrink-0 flex flex-wrap gap-4">
              <Button variant="primary" href={`/${locale}/contact`} size="lg">
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
              <p
                className="text-[#eceae5] opacity-30 uppercase"
                style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em' }}
              >
                {isFr ? 'Explorer' : 'Explore'}
              </p>
              <div className="flex flex-wrap gap-x-10 gap-y-3">
                {[
                  { label: isFr ? 'Immobilier commercial' : 'Commercial', href: `/${locale}/commercial-real-estate-montreal` },
                  { label: isFr ? 'Industriel' : 'Industrial', href: `/${locale}/industrial-real-estate-montreal` },
                  { label: isFr ? 'Condos & Lofts' : 'Condos & Lofts', href: `/${locale}/lofts-montreal` },
                  { label: isFr ? 'Services' : 'Services', href: `/${locale}/services` },
                  { label: 'Contact', href: `/${locale}/contact` },
                  { label: 'Centris.ca', href: 'https://www.centris.ca' },
                  { label: 'Realtor.ca', href: 'https://www.realtor.ca' },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-[#eceae5] opacity-50 hover:opacity-100 transition-opacity duration-200 uppercase"
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

export async function generateStaticParams() {
  return [{ locale: 'en-ca' }, { locale: 'fr-ca' }]
}
