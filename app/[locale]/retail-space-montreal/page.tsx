import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Label } from '@/components/ui/Label'
import { TextReveal } from '@/components/animation/TextReveal'
import { SectionReveal } from '@/components/animation/SectionReveal'
import { Button } from '@/components/ui/Button'

// ─── Font helpers ──────────────────────────────────────────────────────────────
const FONT_BARLOW = `var(--font-barlow), 'Barlow', sans-serif`
const FONT_DM_SERIF = `var(--font-dm-serif), 'DM Serif Display', serif`
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
  const slug = 'retail-space-montreal'
  const canonical = `${SITE_URL}/${locale}/${slug}`

  const title = isFr
    ? 'Espace Commercial \u00e0 Vendre Montr\u00e9al | Local Commercial — Jeremy Soares'
    : 'Retail Space for Sale Montreal | Commercial Broker — Jeremy Soares'

  const description = isFr
    ? "Achetez ou louez un espace commercial \u00e0 Montr\u00e9al. Analyse de l\u2019achalandage, corridors commerciaux, baux triple net. Courtier OACIQ H2731 sp\u00e9cialis\u00e9 en immobilier commercial."
    : 'Buy or lease retail space in Montreal. Foot traffic analysis, prime retail corridors, triple net leases. OACIQ broker H2731 specializing in commercial real estate.'

  const keywords = isFr
    ? [
        'espace commercial \u00e0 vendre montr\u00e9al',
        'local commercial montr\u00e9al',
        'louer espace commercial montr\u00e9al',
        'immobilier commercial montr\u00e9al',
        'courtier commercial montr\u00e9al',
        'bail commercial montr\u00e9al',
        'local \u00e0 louer sainte-catherine',
        'Jeremy Soares courtier',
        'OACIQ H2731',
      ]
    : [
        'retail space for sale montreal',
        'commercial space for lease montreal',
        'storefront for rent montreal',
        'montreal commercial real estate broker',
        'retail property montreal',
        'commercial lease montreal',
        'sainte-catherine street retail',
        'Jeremy Soares broker',
        'OACIQ H2731',
      ]

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
      languages: {
        'en-CA': `${SITE_URL}/en-ca/${slug}`,
        'fr-CA': `${SITE_URL}/fr-ca/${slug}`,
      },
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title,
      description,
      siteName: 'Jeremy Soares',
      locale: isFr ? 'fr_CA' : 'en_CA',
      alternateLocale: isFr ? 'en_CA' : 'fr_CA',
      images: [
        {
          url: 'https://cdn.prod.website-files.com/68ba28534a070e692e441089/68baf35dc28553a17f2d6d78_8-IMG_6610.jpg',
          width: 1218,
          height: 813,
          alt: isFr
            ? 'Espace commercial \u00e0 vendre Montr\u00e9al — Jeremy Soares'
            : 'Retail space for sale Montreal — Jeremy Soares',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

// ─── JSON-LD structured data ───────────────────────────────────────────────────
function RetailJsonLd({ locale }: { locale: string }) {
  const isFr = locale === 'fr-ca'
  const slug = 'retail-space-montreal'

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/${locale}/${slug}`,
    name: isFr
      ? 'Courtage Espace Commercial Montr\u00e9al'
      : 'Montreal Retail Space Brokerage',
    description: isFr
      ? "Service de courtage sp\u00e9cialis\u00e9 dans l\u2019achat, la vente et la location d\u2019espaces commerciaux \u00e0 Montr\u00e9al."
      : 'Specialized brokerage for buying, selling, and leasing retail commercial space in Montreal.',
    url: `${SITE_URL}/${locale}/${slug}`,
    serviceType: isFr ? 'Courtage Immobilier Commercial' : 'Commercial Real Estate Brokerage',
    provider: {
      '@type': 'RealEstateAgent',
      '@id': `${SITE_URL}/#agent`,
      name: 'Jeremy Soares',
      telephone: '+15145198177',
      email: 'JeremySoares@icloud.com',
      url: SITE_URL,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Montreal',
        addressRegion: 'QC',
        addressCountry: 'CA',
      },
      sameAs: [
        'https://www.centris.ca/fr/courtier-immobilier~jeremy-soares~jeremy-soares/h2731',
        'https://www.realtor.ca/agent/2079722/jeremy-soares-106-220-av-des-pins-o-montreal-quebec-h2w1r9',
        'https://aimmo.ca',
      ],
    },
    areaServed: {
      '@type': 'City',
      name: 'Montreal',
      '@id': 'https://www.wikidata.org/wiki/Q340',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: isFr
      ? [
          {
            '@type': 'Question',
            name: 'Quel est le prix moyen au pied carr\u00e9 pour un espace commercial \u00e0 Montr\u00e9al?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Le prix varie selon le corridor. La rue Sainte-Catherine atteint 80\u2013140 $\u00a0CA/pi\u00b2 pour les locaux de premier plan, tandis que les rues secondaires comme Mont-Royal ou Saint-Denis oscillent entre 35\u201365 $\u00a0CA/pi\u00b2. Le Vieux-Montr\u00e9al peut d\u00e9passer 100 $\u00a0CA/pi\u00b2 pour les espaces touristiques.",
            },
          },
          {
            '@type': 'Question',
            name: "Quelle est la diff\u00e9rence entre un bail brut et un bail triple net pour un local commercial?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Dans un bail brut, le propri\u00e9taire couvre les taxes, l\u2019assurance et l\u2019entretien. Dans un bail triple net (NNN), le locataire paie ces charges en plus du loyer de base. La plupart des espaces commerciaux de qualit\u00e9 \u00e0 Montr\u00e9al sont propos\u00e9s en bail triple net ou semi-brut.",
            },
          },
          {
            '@type': 'Question',
            name: "Quels sont les meilleurs corridors commerciaux \u00e0 Montr\u00e9al pour un d\u00e9taillant?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Sainte-Catherine (centre-ville) reste le plus achaland\u00e9 pour la mode et la restauration. Mont-Royal attire une client\u00e8le locale fid\u00e8le dans le Plateau. Saint-Laurent offre des espaces plus abordables avec un trafic pi\u00e9tonnier fort le week-end. Le Vieux-Montr\u00e9al est id\u00e9al pour le tourisme et la restauration haut de gamme.",
            },
          },
          {
            '@type': 'Question',
            name: 'Faut-il mieux acheter ou louer un espace commercial \u00e0 Montr\u00e9al?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "L\u2019achat est avantageux si vous pr\u00e9voyez occuper l\u2019espace plus de 7\u201310 ans ou si vous souhaitez b\u00e9n\u00e9ficier de l\u2019appr\u00e9ciation immobili\u00e8re. La location offre plus de flexibilit\u00e9 pour les commerces en croissance ou dont les besoins d\u2019espace \u00e9voluent rapidement. Un courtier sp\u00e9cialis\u00e9 peut mod\u00e9liser les deux sc\u00e9narios.",
            },
          },
          {
            '@type': 'Question',
            name: 'Comment \u00e9valuer le potentiel d\u2019achalandage d\u2019un local commercial?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "L\u2019analyse inclut le comptage pi\u00e9tonnier (donn\u00e9es municipales et propri\u00e9taires), la proximit\u00e9 des stations de m\u00e9tro, la densit\u00e9 r\u00e9sidentielle du p\u00e9rim\u00e8tre, la visibilit\u00e9 de la devanture et le mix de commerces voisins. Ces donn\u00e9es orientent la n\u00e9gociation du loyer.",
            },
          },
          {
            '@type': 'Question',
            name: "Quels frais de CAM (common area maintenance) sont typiques dans un immeuble commercial \u00e0 Montr\u00e9al?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Les frais CAM varient de 8 \u00e0 22 $\u00a0CA/pi\u00b2 selon l\u2019\u00e2ge et la qualit\u00e9 de l\u2019immeuble. Ils couvrent g\u00e9n\u00e9ralement l\u2019entretien des espaces communs, le chauffage, le d\u00e9neigement et la s\u00e9curit\u00e9. Il est essentiel de les inclure dans le calcul du co\u00fbt total d\u2019occupation.",
            },
          },
          {
            '@type': 'Question',
            name: 'Quelle est la dur\u00e9e typique d\u2019un bail commercial \u00e0 Montr\u00e9al?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Les baux commerciaux standards \u00e0 Montr\u00e9al vont de 3 \u00e0 10 ans, avec option de renouvellement. Les propri\u00e9taires pr\u00e9f\u00e8rent g\u00e9n\u00e9ralement des engagements de 5 ans minimum pour les espaces prime. Des p\u00e9riodes de gr\u00e2ce pour les r\u00e9novations (fixturing period) peuvent \u00eatre n\u00e9goci\u00e9es.",
            },
          },
        ]
      : [
          {
            '@type': 'Question',
            name: 'What is the average price per square foot for retail space in Montreal?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Pricing varies significantly by corridor. Sainte-Catherine Street commands $80\u2013$140 CA/sq ft for prime storefronts, while secondary streets like Mont-Royal or Saint-Denis range from $35\u2013$65 CA/sq ft. Old Montreal can exceed $100 CA/sq ft for tourist-facing retail.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between a gross lease and a triple net lease for retail space?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'In a gross lease, the landlord covers property taxes, insurance, and maintenance. In a triple net (NNN) lease, the tenant pays those costs on top of base rent. Most quality retail space in Montreal is offered as triple net or modified gross. Understanding total occupancy cost is critical before signing.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which are the best retail corridors in Montreal for a new business?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Sainte-Catherine Street (downtown) remains Montreal's highest-traffic retail strip for fashion and food. Mont-Royal Avenue offers a loyal local clientele in the Plateau. Saint-Laurent Boulevard provides more affordable rents with strong weekend foot traffic. Old Montreal is ideal for tourism-driven and fine dining concepts.",
            },
          },
          {
            '@type': 'Question',
            name: 'Should I buy or lease retail space in Montreal?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Buying makes sense if you plan to occupy the space for 7\u201310+ years or want to benefit from property appreciation. Leasing offers flexibility for growing businesses or those with evolving space needs. A commercial broker can model both scenarios based on your specific financials.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I evaluate foot traffic potential for a retail location in Montreal?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Foot traffic analysis includes pedestrian count data (municipal and landlord-provided), proximity to metro stations, residential density within walking radius, storefront visibility, and the mix of neighboring businesses. These factors directly influence your negotiating position on rent.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are typical CAM (common area maintenance) charges in Montreal commercial buildings?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'CAM charges in Montreal range from $8 to $22 CA/sq ft depending on building age and quality. They typically cover common area upkeep, heating, snow removal, and security. Always include CAM in your total occupancy cost calculation when comparing spaces.',
            },
          },
          {
            '@type': 'Question',
            name: 'How long is a typical commercial lease term in Montreal?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Standard commercial leases in Montreal run 3 to 10 years with renewal options. Landlords in prime corridors generally prefer minimum 5-year commitments. Fixturing periods (rent-free build-out time) of 1\u20133 months can often be negotiated into new leases.',
            },
          },
        ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default async function RetailSpaceMontrealPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr-ca'

  const corridors = isFr
    ? [
        {
          number: '01',
          name: 'Sainte-Catherine',
          tag: 'Centre-ville',
          description:
            "L\u2019artère commerciale la plus achaland\u00e9e du Qu\u00e9bec avec plus de 40\u202F000 pi\u00e9tons par jour en haute saison. Id\u00e9ale pour la mode, la restauration rapide et les grandes enseignes. Loyers prime entre 80 et 140\u00a0$\u00a0CA/pi\u00b2.",
        },
        {
          number: '02',
          name: 'Mont-Royal',
          tag: 'Plateau',
          description:
            "Corridor de proximit\u00e9 avec une client\u00e8le locale fid\u00e8le et un profil d\u00e9mographique \u00e9duqu\u00e9 et \u00e0 revenus moyens-sup\u00e9rieurs. Forte concentration de boutiques ind\u00e9pendantes, caf\u00e9s et restaurants. Loyers entre 35 et 65\u00a0$\u00a0CA/pi\u00b2.",
        },
        {
          number: '03',
          name: 'Saint-Laurent',
          tag: 'Main',
          description:
            "Boulevard historique \u00e0 double vocation : diurne (restaurants, \u00e9piceries fines) et nocturne (bars, clubs). Bonne visibilit\u00e9, trafic pi\u00e9tonnier fort le week-end et abordabilit\u00e9 relative. Loyers entre 30 et 55\u00a0$\u00a0CA/pi\u00b2.",
        },
        {
          number: '04',
          name: 'Saint-Denis',
          tag: 'Latin',
          description:
            "Rue cultuelle et \u00e9tudiante tr\u00e8s fr\u00e9quent\u00e9e, id\u00e9ale pour les librairies, caf\u00e9s, restaurants \u00e9tudiants et boutiques de niche. Proximit\u00e9 UQAM et march\u00e9 locatif serr\u00e9. Loyers entre 28 et 50\u00a0$\u00a0CA/pi\u00b2.",
        },
        {
          number: '05',
          name: 'Vieux-Montr\u00e9al',
          tag: 'Tourisme',
          description:
            "Destination touristique de premier plan avec 10 millions de visiteurs annuels. Parfait pour les restaurants gastronomiques, galeries d\u2019art et boutiques de luxe. Loyers premium d\u00e9passant 100\u00a0$\u00a0CA/pi\u00b2 en saison.",
        },
      ]
    : [
        {
          number: '01',
          name: 'Sainte-Catherine',
          tag: 'Downtown',
          description:
          "Quebec's highest-traffic commercial artery with 40,000+ pedestrians daily at peak season. Ideal for fashion, quick-service food, and major retail chains. Prime rents range from $80 to $140 CA/sq ft.",
        },
        {
          number: '02',
          name: 'Mont-Royal',
          tag: 'Plateau',
          description:
            'Neighbourhood corridor with a loyal, educated demographic and above-average household incomes. Strong concentration of independent boutiques, cafes, and restaurants. Rents ranging $35 to $65 CA/sq ft.',
        },
        {
          number: '03',
          name: 'Saint-Laurent',
          tag: 'The Main',
          description:
            'Historic boulevard with dual character: daytime (restaurants, specialty grocers) and nighttime (bars, entertainment). Good visibility, strong weekend foot traffic, and relative affordability at $30\u2013$55 CA/sq ft.',
        },
        {
          number: '04',
          name: 'Saint-Denis',
          tag: 'Latin Quarter',
          description:
            'Cultural and student street with heavy foot traffic. Ideal for bookstores, cafes, student restaurants, and niche boutiques. Close to UQAM, tight rental market, rents between $28 and $50 CA/sq ft.',
        },
        {
          number: '05',
          name: 'Old Montreal',
          tag: 'Tourism',
          description:
            'Premier tourist destination attracting 10 million visitors annually. Best suited for fine dining, art galleries, and luxury retail concepts. Premium rents exceeding $100 CA/sq ft in peak season.',
        },
      ]

  const propertyTypes = isFr
    ? [
        { label: 'Local en rez-de-chauss\u00e9e', body: "Visibilit\u00e9 maximale, acc\u00e8s direct de la rue. Convient \u00e0 la grande majorit\u00e9 des enseignes de d\u00e9tail. Superficie typique : 500 \u00e0 3\u202F000\u00a0pi\u00b2." },
        { label: 'Centre commercial', body: "Acc\u00e8s \u00e0 un bassin de clients captif, stationnement inclus et marketing collectif. Baux g\u00e9n\u00e9ralement plus longs avec clauses de pourcentage de ventes." },
        { label: 'Strip mall / Power centre', body: "Format b\u00e9n\u00e9ficiant d\u2019un ancrage (supermarch\u00e9, pharmacie) qui g\u00e9n\u00e8re du trafic additionnel. Loyers inf\u00e9rieurs aux corridors prime, stationnement abondant." },
        { label: '\u00c0 usage mixte', body: "Immeuble r\u00e9sidentiel-commercial. Le commerce baille le rez-de-chauss\u00e9e, cr\u00e9ant une synergie avec les r\u00e9sidents. En forte croissance \u00e0 Griffintown et dans le Mile Ex." },
      ]
    : [
        { label: 'Street-level storefront', body: 'Maximum visibility, direct street access. Suits the vast majority of retail concepts. Typical size: 500 to 3,000 sq ft.' },
        { label: 'Shopping centre', body: 'Access to a captive customer base, included parking, and collective marketing. Leases generally longer with percentage-of-sales clauses.' },
        { label: 'Strip mall / Power centre', body: 'Format anchored by a grocery store or pharmacy that generates additional foot traffic. Below-prime rents with abundant parking — strong for convenience retail.' },
        { label: 'Mixed-use', body: 'Residential-commercial building where retail occupies the ground floor, creating synergy with residents above. Rapidly expanding in Griffintown and Mile Ex.' },
      ]

  const faqs = isFr
    ? [
        {
          q: "Quel est le prix moyen au pied carr\u00e9 pour un espace commercial \u00e0 Montr\u00e9al?",
          a: "Le prix varie selon le corridor. La rue Sainte-Catherine atteint 80\u2013140\u00a0$\u00a0CA/pi\u00b2 pour les locaux de premier plan, tandis que les rues secondaires comme Mont-Royal ou Saint-Denis oscillent entre 35\u201365\u00a0$\u00a0CA/pi\u00b2. Le Vieux-Montr\u00e9al peut d\u00e9passer 100\u00a0$\u00a0CA/pi\u00b2 pour les espaces touristiques.",
        },
        {
          q: "Quelle est la diff\u00e9rence entre un bail brut et un bail triple net?",
          a: "Dans un bail brut, le propri\u00e9taire couvre taxes, assurance et entretien. Dans un bail triple net (NNN), ces charges s\u2019ajoutent au loyer de base. La plupart des espaces commerciaux prime \u00e0 Montr\u00e9al sont en triple net ou semi-brut.",
        },
        {
          q: "Quels sont les meilleurs corridors commerciaux \u00e0 Montr\u00e9al?",
          a: "Sainte-Catherine (centre-ville) est la plus achaland\u00e9e. Mont-Royal offre une client\u00e8le locale fid\u00e8le. Saint-Laurent est plus abordable avec un fort trafic le week-end. Le Vieux-Montr\u00e9al convient aux concepts touristiques.",
        },
        {
          q: "Faut-il mieux acheter ou louer un espace commercial?",
          a: "L\u2019achat est avantageux si vous occupez l\u2019espace 7\u201310 ans ou plus. La location offre la flexibilit\u00e9 n\u00e9cessaire aux commerces en croissance. Un courtier peut mod\u00e9liser les deux sc\u00e9narios selon votre situation.",
        },
        {
          q: "Comment \u00e9valuer le potentiel d\u2019achalandage d\u2019un local?",
          a: "L\u2019analyse inclut le comptage pi\u00e9tonnier, la proximit\u00e9 du m\u00e9tro, la densit\u00e9 r\u00e9sidentielle, la visibilit\u00e9 de la devanture et le mix de commerces voisins. Ces donn\u00e9es orientent la n\u00e9gociation du loyer.",
        },
        {
          q: "Quels frais CAM sont typiques dans un immeuble commercial?",
          a: "Les frais CAM varient de 8 \u00e0 22\u00a0$\u00a0CA/pi\u00b2 selon l\u2019\u00e2ge et la qualit\u00e9 de l\u2019immeuble. Ils incluent entretien des aires communes, chauffage, d\u00e9neigement et s\u00e9curit\u00e9. \u00c0 int\u00e9grer dans le co\u00fbt total d\u2019occupation.",
        },
        {
          q: "Quelle est la dur\u00e9e typique d\u2019un bail commercial \u00e0 Montr\u00e9al?",
          a: "Les baux commerciaux vont g\u00e9n\u00e9ralement de 3 \u00e0 10 ans avec option de renouvellement. Les propri\u00e9taires en corridors prime pr\u00e9f\u00e8rent des engagements de 5 ans minimum. Des p\u00e9riodes de gr\u00e2ce pour r\u00e9novations peuvent \u00eatre n\u00e9goci\u00e9es.",
        },
      ]
    : [
        {
          q: 'What is the average price per square foot for retail space in Montreal?',
          a: 'Pricing varies significantly by corridor. Sainte-Catherine Street commands $80\u2013$140 CA/sq ft for prime storefronts, while secondary streets like Mont-Royal or Saint-Denis range from $35\u2013$65 CA/sq ft. Old Montreal can exceed $100 CA/sq ft for tourist-facing retail.',
        },
        {
          q: 'What is the difference between a gross lease and a triple net lease?',
          a: 'In a gross lease, the landlord covers property taxes, insurance, and maintenance. In a triple net (NNN) lease, the tenant pays those costs on top of base rent. Most quality retail in Montreal is offered as triple net or modified gross.',
        },
        {
          q: 'Which are the best retail corridors in Montreal?',
          a: "Sainte-Catherine Street (downtown) is Montreal's highest-traffic retail strip. Mont-Royal offers loyal local clientele in the Plateau. Saint-Laurent provides more affordable rents with strong weekend foot traffic. Old Montreal suits tourism-driven concepts.",
        },
        {
          q: 'Should I buy or lease retail space in Montreal?',
          a: 'Buying makes sense if you plan to occupy the space for 7\u201310+ years or want to benefit from property appreciation. Leasing offers flexibility for growing businesses. A commercial broker can model both scenarios based on your financials.',
        },
        {
          q: 'How do I evaluate foot traffic potential for a retail location?',
          a: 'Foot traffic analysis includes pedestrian count data, proximity to metro stations, residential density within walking radius, storefront visibility, and neighboring business mix. These factors directly influence your negotiating position on rent.',
        },
        {
          q: 'What are typical CAM charges in Montreal commercial buildings?',
          a: 'CAM charges range from $8 to $22 CA/sq ft depending on building age and quality. They typically cover common area upkeep, heating, snow removal, and security. Always include CAM in your total occupancy cost calculation when comparing spaces.',
        },
        {
          q: 'How long is a typical commercial lease term in Montreal?',
          a: 'Standard commercial leases run 3 to 10 years with renewal options. Landlords in prime corridors prefer minimum 5-year commitments. Fixturing periods of 1\u20133 months can often be negotiated into new leases.',
        },
      ]

  return (
    <>
      <RetailJsonLd locale={locale} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <Section theme="void" className="pt-32 pb-20 md:pt-44 md:pb-28">
        <Container size="lg">
          <Label className="mb-8">
            {isFr ? '(Immobilier commercial)' : '(Commercial Real Estate)'}
          </Label>

          <div
            style={{
              fontFamily: FONT_BARLOW,
              fontWeight: 900,
              fontSize: 'clamp(3.5rem, 9vw, 8rem)',
              letterSpacing: '-0.02em',
            }}
          >
            <TextReveal
              as="h1"
              split="lines"
              immediate
              delay={0.15}
              className="leading-none uppercase text-[var(--color-cream)]"
            >
              {isFr
                ? 'Espace Commercial'
                : 'Retail Space'}
            </TextReveal>
            <TextReveal
              as="div"
              split="lines"
              immediate
              delay={0.25}
              className="leading-none uppercase text-[var(--color-cream)]"
            >
              {isFr ? '\u00e0 Vendre Montr\u00e9al' : 'Montreal'}
            </TextReveal>
          </div>

          <SectionReveal delay={0.4} className="mt-6">
            <p
              className="text-[var(--color-cream)] opacity-35"
              style={{
                fontFamily: FONT_DM_SERIF,
                fontStyle: 'italic',
                fontSize: 'clamp(1rem, 1.8vw, 1.4rem)',
              }}
            >
              {isFr
                ? 'Achat, vente et location de locaux commerciaux — analyse de march\u00e9, n\u00e9gociation de bail et strat\u00e9gie d\u2019implantation.'
                : 'Buying, selling, and leasing retail space \u2014 market analysis, lease negotiation, and location strategy.'}
            </p>
          </SectionReveal>

          <SectionReveal delay={0.55} className="mt-5 max-w-xl">
            <p
              className="leading-relaxed text-[var(--color-cream)] opacity-45"
              style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
            >
              {isFr
                ? "Courtier commercial sp\u00e9cialis\u00e9 dans les espaces commerciaux montr\u00e9alais. Analyse de l\u2019achalandage, des baux et des corridors commerciaux pour maximiser votre retour sur investissement. OACIQ H2731."
                : 'Commercial broker specializing in Montreal retail properties. Foot traffic analysis, lease structuring, and corridor expertise to maximize your return on investment. OACIQ H2731.'}
            </p>
          </SectionReveal>

          <SectionReveal delay={0.65} className="mt-8 flex flex-wrap gap-4">
            <Button variant="primary" theme="dark" href={`/${locale}/contact`} size="md">
              {isFr ? 'Discuter de votre projet' : 'Discuss Your Project'}
            </Button>
            <Button variant="ghost" theme="dark" href={`/${locale}/commercial-real-estate-montreal`} size="md">
              {isFr ? 'Immobilier commercial' : 'Commercial Real Estate'}
            </Button>
          </SectionReveal>
        </Container>
      </Section>

      {/* ── Montreal Retail Market — cream ───────────────────────────────── */}
      <Section theme="cream" className="py-24 md:py-36 relative overflow-hidden">
        <Container size="lg">
          <Label theme="light" className="mb-8">
            {isFr ? '(Le march\u00e9)' : '(The Market)'}
          </Label>

          <div
            className="mb-12"
            style={{
              fontFamily: FONT_BARLOW,
              fontWeight: 900,
              fontSize: 'clamp(2.25rem, 5vw, 4.5rem)',
              letterSpacing: '-0.02em',
            }}
          >
            <TextReveal
              as="h2"
              split="words"
              className="leading-none uppercase text-[var(--color-void)]"
            >
              {isFr ? 'Le march\u00e9 commercial montr\u00e9alais' : 'Montreal Retail Market'}
            </TextReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
            <SectionReveal className="md:col-span-7">
              <p
                className="text-[var(--color-void)] opacity-65 leading-relaxed mb-6"
                style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
              >
                {isFr
                  ? "Montr\u00e9al compte pr\u00e8s de 2 millions de m\u00e8tres carr\u00e9s d\u2019espaces commerciaux r\u00e9partis entre les corridors de rue, les centres commerciaux et les \u00e9difices \u00e0 usage mixte. En 2024, le taux d\u2019inoccupation du commerce de d\u00e9tail dans les rues principales a r\u00e9cup\u00e9r\u00e9 significativement apr\u00e8s le creux post-pand\u00e9mique, port\u00e9 par le tourisme retrouv\u00e9 et la croissance r\u00e9sidentielle des quartiers centraux."
                  : "Montreal has approximately 2 million square meters of retail space distributed across street-level corridors, shopping centres, and mixed-use buildings. In 2024, main street vacancy rates recovered significantly from their post-pandemic low, driven by rebounding tourism and residential growth in central neighborhoods."}
              </p>
              <p
                className="text-[var(--color-void)] opacity-65 leading-relaxed mb-6"
                style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
              >
                {isFr
                  ? "La transformation du commerce de d\u00e9tail n\u2019est pas une menace pour Montr\u00e9al \u2014 c\u2019est une opportunit\u00e9. Les enseignes qui int\u00e8grent l\u2019exp\u00e9rience en magasin \u00e0 leur pr\u00e9sence num\u00e9rique r\u00e9alisent des performances sup\u00e9rieures aux moyennes nationales dans les corridors de premi\u00e8re main. La demande de la part de la restauration, des services et des d\u00e9taillants ind\u00e9pendants reste tr\u00e8s solide."
                  : "The retail transformation is not a threat in Montreal \u2014 it is an opportunity. Retailers integrating in-store experience with digital presence are outperforming national averages in prime corridors. Demand from food service, personal services, and independent retailers remains exceptionally strong."}
              </p>
              <p
                className="text-[var(--color-void)] opacity-65 leading-relaxed"
                style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
              >
                {isFr
                  ? "Les acheteurs institutionnels et les investisseurs priv\u00e9s continuent de cibler les immeubles \u00e0 revenus mixtes r\u00e9sidentiel-commercial, en particulier dans les quartiers en cours de densification comme Griffintown, le Mile Ex et Rosemont. Le commerce de rez-de-chauss\u00e9e dans ces secteurs affiche des taux de capitalisation entre 4,5 % et 6,5 %."
                  : "Institutional buyers and private investors continue targeting mixed-use residential-commercial income buildings, particularly in densifying neighborhoods like Griffintown, Mile Ex, and Rosemont. Ground-floor retail in these areas posts cap rates between 4.5% and 6.5%."}
              </p>
            </SectionReveal>

            <SectionReveal delay={0.15} className="md:col-span-5">
              <div
                className="border-t"
                style={{ borderColor: 'rgba(14,16,17,0.1)' }}
              >
                {[
                  {
                    stat: isFr ? '4,5\u20136,5\u00a0%' : '4.5\u20136.5%',
                    label: isFr ? 'Taux de capitalisation moyen' : 'Average cap rate',
                  },
                  {
                    stat: isFr ? '35\u2013140\u00a0$\u00a0CA/pi\u00b2' : '$35\u2013$140 CA/sq ft',
                    label: isFr ? 'Fourchette de loyers, corridors prime' : 'Rent range, prime corridors',
                  },
                  {
                    stat: isFr ? '3\u201310 ans' : '3\u201310 yrs',
                    label: isFr ? 'Dur\u00e9e typique des baux' : 'Typical lease duration',
                  },
                  {
                    stat: isFr ? '10M+' : '10M+',
                    label: isFr ? 'Visiteurs annuels, Vieux-Montr\u00e9al' : 'Annual visitors, Old Montreal',
                  },
                ].map((item) => (
                  <div
                    key={item.stat}
                    className="py-6 border-b"
                    style={{ borderColor: 'rgba(14,16,17,0.1)' }}
                  >
                    <span
                      className="block text-[var(--color-void)]"
                      style={{
                        fontFamily: FONT_BARLOW,
                        fontWeight: 900,
                        fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {item.stat}
                    </span>
                    <span
                      className="block text-[var(--color-void)] opacity-45 mt-1 uppercase"
                      style={{
                        fontFamily: FONT_DM_SANS,
                        fontSize: '10px',
                        letterSpacing: '0.18em',
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-2">
                <a
                  href="https://www.centris.ca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 uppercase text-[var(--color-void)] opacity-40 hover:opacity-80 transition-opacity duration-200"
                  style={{
                    fontFamily: FONT_DM_SANS,
                    fontSize: '10px',
                    letterSpacing: '0.18em',
                    fontWeight: 500,
                  }}
                >
                  Centris.ca <span aria-hidden="true" className="text-[0.6rem]">↗</span>
                </a>
                <a
                  href="https://www.realtor.ca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 uppercase text-[var(--color-void)] opacity-40 hover:opacity-80 transition-opacity duration-200"
                  style={{
                    fontFamily: FONT_DM_SANS,
                    fontSize: '10px',
                    letterSpacing: '0.18em',
                    fontWeight: 500,
                  }}
                >
                  Realtor.ca <span aria-hidden="true" className="text-[0.6rem]">↗</span>
                </a>
              </div>
            </SectionReveal>
          </div>
        </Container>
      </Section>

      {/* ── Property Types — void ─────────────────────────────────────────── */}
      <Section theme="void" className="py-24 md:py-36">
        <Container size="lg">
          <Label className="mb-10">
            {isFr ? '(Types de propri\u00e9t\u00e9s)' : '(Property Types)'}
          </Label>

          <div
            className="mb-16"
            style={{
              fontFamily: FONT_BARLOW,
              fontWeight: 900,
              fontSize: 'clamp(2.25rem, 5vw, 4.5rem)',
              letterSpacing: '-0.02em',
            }}
          >
            <TextReveal
              as="h2"
              split="words"
              className="leading-none uppercase text-[var(--color-cream)]"
            >
              {isFr ? 'Types d\u2019espaces commerciaux' : 'Retail Property Types'}
            </TextReveal>
          </div>

          <div
            className="border-t"
            style={{ borderColor: 'rgba(236,234,229,0.08)' }}
          >
            {propertyTypes.map((item, i) => (
              <SectionReveal key={item.label} delay={i * 0.07}>
                <div
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 py-10 border-b"
                  style={{ borderColor: 'rgba(236,234,229,0.08)' }}
                >
                  <div className="md:col-span-1 flex items-start pt-1">
                    <span
                      className="uppercase text-[var(--color-cream)] opacity-25"
                      style={{
                        fontFamily: FONT_DM_SANS,
                        fontSize: '10px',
                        letterSpacing: '0.22em',
                        fontWeight: 500,
                      }}
                    >
                      0{i + 1}
                    </span>
                  </div>
                  <div className="md:col-span-4">
                    <h3
                      className="text-[var(--color-cream)] leading-tight"
                      style={{
                        fontFamily: FONT_DM_SERIF,
                        fontStyle: 'italic',
                        fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)',
                      }}
                    >
                      {item.label}
                    </h3>
                  </div>
                  <div className="md:col-span-7">
                    <p
                      className="text-[var(--color-cream)] opacity-50 leading-relaxed"
                      style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                    >
                      {item.body}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Retail Corridors — cream ──────────────────────────────────────── */}
      <Section theme="cream" className="py-0 relative overflow-hidden">
        <Container size="lg">
          <div className="pt-24 md:pt-36 pb-12">
            <Label theme="light" className="mb-10">
              {isFr ? '(Corridors commerciaux)' : '(Retail Corridors)'}
            </Label>
            <div
              className="mb-4"
              style={{
                fontFamily: FONT_BARLOW,
                fontWeight: 900,
                fontSize: 'clamp(2.25rem, 5vw, 4.5rem)',
                letterSpacing: '-0.02em',
              }}
            >
              <TextReveal
                as="h2"
                split="words"
                className="leading-none uppercase text-[var(--color-void)]"
              >
                {isFr ? 'Corridors cl\u00e9s de Montr\u00e9al' : 'Key Montreal Corridors'}
              </TextReveal>
            </div>
          </div>

          <div
            className="border-t"
            style={{ borderColor: 'rgba(14,16,17,0.1)' }}
          >
            {corridors.map((c) => (
              <div
                key={c.number}
                className="group py-14 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 border-b transition-all duration-300 hover:pl-1 md:hover:pl-2"
                style={{ borderColor: 'rgba(14,16,17,0.1)' }}
              >
                <div className="md:col-span-1 flex items-start pt-1">
                  <span
                    className="uppercase text-[var(--color-void)] opacity-25 group-hover:opacity-40 transition-opacity duration-200"
                    style={{
                      fontFamily: FONT_DM_SANS,
                      fontSize: '10px',
                      letterSpacing: '0.22em',
                    }}
                  >
                    {c.number}
                  </span>
                </div>
                <div className="md:col-span-4">
                  <span
                    className="block mb-2 uppercase text-[var(--color-void)] opacity-30"
                    style={{
                      fontFamily: FONT_DM_SANS,
                      fontSize: '10px',
                      letterSpacing: '0.22em',
                    }}
                  >
                    {c.tag}
                  </span>
                  <h3
                    className="leading-tight uppercase text-[var(--color-void)] group-hover:opacity-70 transition-opacity duration-200"
                    style={{
                      fontFamily: FONT_BARLOW,
                      fontWeight: 900,
                      fontSize: 'clamp(1.5rem, 3vw, 2.75rem)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {c.name}
                  </h3>
                </div>
                <div className="md:col-span-7">
                  <p
                    className="text-[var(--color-void)] opacity-55 leading-relaxed"
                    style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                  >
                    {c.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="pb-24 md:pb-36" />
        </Container>
      </Section>

      {/* ── Lease vs Buy — void ───────────────────────────────────────────── */}
      <Section theme="void" className="py-24 md:py-36">
        <Container size="lg">
          <Label className="mb-10">
            {isFr ? '(Achat vs location)' : '(Buy vs Lease)'}
          </Label>

          <div
            className="mb-16"
            style={{
              fontFamily: FONT_BARLOW,
              fontWeight: 900,
              fontSize: 'clamp(2.25rem, 5vw, 4.5rem)',
              letterSpacing: '-0.02em',
            }}
          >
            <TextReveal
              as="h2"
              split="words"
              className="leading-none uppercase text-[var(--color-cream)]"
            >
              {isFr ? 'Acheter ou louer?' : 'Buy or Lease?'}
            </TextReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {[
              {
                side: isFr ? 'Acheter' : 'Buy',
                color: '#e8762a' as CSSProperties['color'],
                points: isFr
                  ? [
                      "Constitution d\u2019un patrimoine \u00e0 long terme",
                      "B\u00e9n\u00e9fice de l\u2019appr\u00e9ciation immobili\u00e8re",
                      "Contr\u00f4le total : r\u00e9novations, sous-location, cession",
                      "Effet de levier : hypoth\u00e8que commerciale \u00e0 55\u201365\u00a0% LTV",
                      "Avantage fiscal : amortissement, d\u00e9ductions d\u2019int\u00e9r\u00eats",
                      "Id\u00e9al si horizon \u2265 7\u201310 ans",
                    ]
                  : [
                      'Long-term wealth building',
                      'Benefit from property appreciation',
                      'Full control: renovations, subleasing, assignment',
                      'Leverage: commercial mortgage at 55\u201365% LTV',
                      'Tax advantages: depreciation, interest deductions',
                      'Ideal if horizon is 7\u201310+ years',
                    ],
              },
              {
                side: isFr ? 'Louer' : 'Lease',
                color: 'rgba(236,234,229,0.35)' as CSSProperties['color'],
                points: isFr
                  ? [
                      "Flexibilit\u00e9 pour s\u2019adapter \u00e0 la croissance",
                      'Capital pr\u00e9serv\u00e9 pour les op\u00e9rations',
                      'Engagement initial moins \u00e9lev\u00e9',
                      'Acc\u00e8s aux corridors prime inaccessibles \u00e0 l\u2019achat',
                      'Loyer : d\u00e9pense d\u2019exploitation d\u00e9ductible',
                      'Id\u00e9al si les besoins d\u2019espace \u00e9voluent vite',
                    ]
                  : [
                      'Flexibility to scale as the business grows',
                      'Capital preserved for operations',
                      'Lower upfront commitment',
                      'Access to prime corridors unavailable for purchase',
                      'Rent: fully deductible operating expense',
                      'Ideal when space needs evolve rapidly',
                    ],
              },
            ].map((col) => (
              <SectionReveal key={col.side} className="p-8 md:p-12 border border-[rgba(236,234,229,0.08)]">
                <h3
                  className="mb-8 uppercase"
                  style={{
                    fontFamily: FONT_BARLOW,
                    fontWeight: 900,
                    fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
                    letterSpacing: '-0.01em',
                    color: col.color,
                  }}
                >
                  {col.side}
                </h3>
                <ul className="space-y-4">
                  {col.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-[var(--color-cream)] opacity-55 leading-relaxed"
                      style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                    >
                      <span className="mt-1.5 flex-shrink-0 w-1 h-1 rounded-full bg-[var(--color-cream)] opacity-40" />
                      {point}
                    </li>
                  ))}
                </ul>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.2} className="mt-10">
            <p
              className="text-[var(--color-cream)] opacity-40 leading-relaxed max-w-2xl"
              style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
            >
              {isFr
                ? "La d\u00e9cision d\u00e9pend de votre horizon temporel, de votre liquidit\u00e9 et de la dynamique du march\u00e9 dans votre corridor cible. Un courtier commercial mod\u00e9lise les deux sc\u00e9narios avec vos chiffres r\u00e9els avant de recommander une direction."
                : 'The decision depends on your time horizon, liquidity, and market dynamics in your target corridor. A commercial broker models both scenarios with your real numbers before recommending a direction.'}
            </p>
          </SectionReveal>
        </Container>
      </Section>

      {/* ── Services — cream ─────────────────────────────────────────────── */}
      <Section theme="cream" className="py-24 md:py-36 relative overflow-hidden">
        <Container size="lg">
          <Label theme="light" className="mb-10">
            {isFr ? '(Services)' : '(Services)'}
          </Label>

          <div
            className="mb-16"
            style={{
              fontFamily: FONT_BARLOW,
              fontWeight: 900,
              fontSize: 'clamp(2.25rem, 5vw, 4.5rem)',
              letterSpacing: '-0.02em',
            }}
          >
            <TextReveal
              as="h2"
              split="words"
              className="leading-none uppercase text-[var(--color-void)]"
            >
              {isFr ? 'Ce que j\u2019offre' : 'What I Offer'}
            </TextReveal>
          </div>

          <div
            className="border-t"
            style={{ borderColor: 'rgba(14,16,17,0.1)' }}
          >
            {(isFr
              ? [
                  { n: '01', title: 'Analyse de march\u00e9 et de corridor', body: "Identification des corridors commerciaux les mieux align\u00e9s avec votre concept, votre client\u00e8le cible et votre budget. Analyse comparative des loyers, taux d\u2019inoccupation et dynamiques de quartier." },
                  { n: '02', title: "Analyse d\u2019achalandage", body: "Donn\u00e9es de comptage pi\u00e9tonnier, d\u00e9mographie du secteur, proximit\u00e9 des g\u00e9n\u00e9rateurs de trafic (m\u00e9tro, march\u00e9s, \u00e9coles, bureaux) et cartographie des commerces voisins." },
                  { n: '03', title: 'N\u00e9gociation de bail', body: "R\u00e9vision et n\u00e9gociation des conditions de bail : loyer de base, p\u00e9riode de gr\u00e2ce, frais CAM, clauses d\u2019exclusivit\u00e9, options de renouvellement et de cession." },
                  { n: '04', title: 'Acquisition et disposition', body: "Achat ou vente d\u2019immeubles commerciaux \u00e0 revenus. Mod\u00e9lisation du rendement, due diligence et coordination avec notaires et inspecteurs sp\u00e9cialis\u00e9s." },
                  { n: '05', title: 'Strat\u00e9gie d\u2019implantation', body: "Accompagnement dans la s\u00e9lection du local id\u00e9al en tenant compte du zonage, des heures d\u2019ouverture, de la concurrence directe et du potentiel de croissance du quartier." },
                ]
              : [
                  { n: '01', title: 'Market & Corridor Analysis', body: "Identification of retail corridors best aligned with your concept, target demographic, and budget. Comparative analysis of rents, vacancy rates, and neighborhood dynamics." },
                  { n: '02', title: 'Foot Traffic Analysis', body: "Pedestrian count data, area demographics, proximity to traffic generators (metro, markets, schools, offices), and neighboring business mapping." },
                  { n: '03', title: 'Lease Negotiation', body: 'Review and negotiation of lease terms: base rent, fixturing period, CAM charges, exclusivity clauses, renewal options, and assignment rights.' },
                  { n: '04', title: 'Acquisition & Disposition', body: 'Buying or selling commercial income properties. Return modelling, due diligence coordination with specialized notaries and inspectors.' },
                  { n: '05', title: 'Location Strategy', body: 'Advisory on selecting the optimal space considering zoning, operating hours, direct competition, and neighborhood growth potential.' },
                ]
            ).map((s, i) => (
              <SectionReveal key={s.n} delay={i * 0.07}>
                <div
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 py-10 border-b"
                  style={{ borderColor: 'rgba(14,16,17,0.1)' }}
                >
                  <div className="md:col-span-1 flex items-start pt-1">
                    <span
                      className="uppercase text-[var(--color-void)] opacity-25"
                      style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em' }}
                    >
                      {s.n}
                    </span>
                  </div>
                  <div className="md:col-span-4">
                    <h3
                      className="text-[var(--color-void)] leading-tight"
                      style={{
                        fontFamily: FONT_DM_SERIF,
                        fontStyle: 'italic',
                        fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)',
                      }}
                    >
                      {s.title}
                    </h3>
                  </div>
                  <div className="md:col-span-7">
                    <p
                      className="text-[var(--color-void)] opacity-55 leading-relaxed"
                      style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                    >
                      {s.body}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.1} className="mt-12 flex flex-wrap gap-5">
            <Button variant="primary" theme="light" href={`/${locale}/services`} size="md">
              {isFr ? 'Tous les services' : 'All Services'}
            </Button>
            <Button variant="ghost" theme="light" href={`/${locale}/real-estate`} size="md">
              {isFr ? 'Voir le portfolio' : 'View Portfolio'}
            </Button>
          </SectionReveal>
        </Container>
      </Section>

      {/* ── FAQ — void ───────────────────────────────────────────────────── */}
      <Section theme="void" className="py-24 md:py-36">
        <Container size="lg">
          <Label className="mb-10">
            {isFr ? '(Questions fr\u00e9quentes)' : '(FAQ)'}
          </Label>

          <div
            className="mb-16"
            style={{
              fontFamily: FONT_BARLOW,
              fontWeight: 900,
              fontSize: 'clamp(2.25rem, 5vw, 4.5rem)',
              letterSpacing: '-0.02em',
            }}
          >
            <TextReveal
              as="h2"
              split="words"
              className="leading-none uppercase text-[var(--color-cream)]"
            >
              {isFr ? 'Questions fr\u00e9quentes' : 'Frequently Asked Questions'}
            </TextReveal>
          </div>

          <div
            className="border-t"
            style={{ borderColor: 'rgba(236,234,229,0.08)' }}
          >
            {faqs.map((faq, i) => (
              <SectionReveal key={i} delay={i * 0.06}>
                <div
                  className="py-10 border-b grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10"
                  style={{ borderColor: 'rgba(236,234,229,0.08)' }}
                >
                  <div className="md:col-span-5">
                    <h3
                      className="text-[var(--color-cream)] leading-snug"
                      style={{
                        fontFamily: FONT_DM_SERIF,
                        fontStyle: 'italic',
                        fontSize: 'clamp(1rem, 1.6vw, 1.25rem)',
                      }}
                    >
                      {faq.q}
                    </h3>
                  </div>
                  <div className="md:col-span-7">
                    <p
                      className="text-[var(--color-cream)] opacity-50 leading-relaxed"
                      style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                    >
                      {faq.a}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Internal nav band — cream ────────────────────────────────────── */}
      <Section theme="cream" className="py-16 md:py-20 relative overflow-hidden">
        <Container size="lg">
          <SectionReveal>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <p
                className="text-[var(--color-void)] opacity-40 uppercase"
                style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em' }}
              >
                {isFr ? 'Explorer' : 'Explore'}
              </p>
              <div className="flex flex-wrap gap-x-10 gap-y-3">
                {[
                  { label: isFr ? 'Services' : 'Services', href: `/${locale}/services` },
                  { label: isFr ? 'Outils' : 'Tools', href: `/${locale}/tools` },
                  { label: isFr ? 'Immobilier' : 'Real Estate', href: `/${locale}/real-estate` },
                  { label: isFr ? 'Commercial' : 'Commercial', href: `/${locale}/commercial-real-estate-montreal` },
                  { label: isFr ? 'Contact' : 'Contact', href: `/${locale}/contact` },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-[var(--color-void)] opacity-60 hover:opacity-100 transition-opacity duration-200 uppercase"
                    style={{
                      fontFamily: FONT_DM_SANS,
                      fontSize: '0.75rem',
                      letterSpacing: '0.12em',
                      fontWeight: 500,
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </SectionReveal>
        </Container>
      </Section>

      {/* ── CTA — void ───────────────────────────────────────────────────── */}
      <Section theme="void" className="py-28 md:py-36">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12">
            <div className="flex-1 max-w-2xl">
              <SectionReveal>
                <span
                  className="block mb-6 uppercase"
                  style={{
                    fontFamily: FONT_DM_SANS,
                    fontSize: '10px',
                    letterSpacing: '0.22em',
                    color: '#e8762a',
                  }}
                >
                  {isFr ? '— Prochaine \u00e9tape' : '— Next step'}
                </span>
              </SectionReveal>

              <div
                style={{
                  fontFamily: FONT_BARLOW,
                  fontWeight: 900,
                  fontSize: 'clamp(2.75rem, 7vw, 6rem)',
                  letterSpacing: '-0.02em',
                }}
              >
                <TextReveal
                  as="h2"
                  split="words"
                  className="leading-none uppercase text-[var(--color-cream)]"
                >
                  {isFr ? 'Trouvons votre local.' : 'Find Your Space.'}
                </TextReveal>
              </div>

              <SectionReveal delay={0.2} className="mt-6 max-w-lg">
                <p
                  className="text-[var(--color-cream)] opacity-40 leading-relaxed"
                  style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                >
                  {isFr
                    ? "Courtier OACIQ H2731 sp\u00e9cialis\u00e9 dans l\u2019immobilier commercial montr\u00e9alais. Contactez-nous pour une analyse de march\u00e9 personnalis\u00e9e."
                    : 'OACIQ broker H2731 specializing in Montreal commercial real estate. Contact us for a personalized market analysis.'}
                </p>
                <div className="mt-5 flex flex-col gap-2">
                  <a
                    href="tel:+15145198177"
                    className="text-[var(--color-cream)] opacity-50 hover:opacity-80 transition-opacity duration-200"
                    style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                  >
                    514-519-8177
                  </a>
                  <a
                    href="mailto:JeremySoares@icloud.com"
                    className="text-[var(--color-cream)] opacity-50 hover:opacity-80 transition-opacity duration-200"
                    style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                  >
                    JeremySoares@icloud.com
                  </a>
                </div>
              </SectionReveal>
            </div>

            <SectionReveal delay={0.15} className="flex-shrink-0">
              <Button variant="primary" theme="dark" href={`/${locale}/contact`} size="lg">
                {isFr ? 'Discutons' : "Let's Talk"}
              </Button>
            </SectionReveal>
          </div>
        </Container>
      </Section>
    </>
  )
}
