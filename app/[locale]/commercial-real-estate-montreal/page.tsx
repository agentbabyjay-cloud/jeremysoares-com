import type { Metadata } from 'next'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Label } from '@/components/ui/Label'
import { TextReveal } from '@/components/animation/TextReveal'
import { SectionReveal } from '@/components/animation/SectionReveal'
import { Button } from '@/components/ui/Button'

// ─── Font helpers ─────────────────────────────────────────────────────────────
const FONT_BARLOW = `var(--font-barlow), 'Barlow', sans-serif`
const FONT_DM_SERIF = `var(--font-dm-serif), 'DM Serif Display', serif`
const FONT_DM_SANS = `var(--font-dm-sans), 'DM Sans', sans-serif`

// ─── SEO ──────────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale === 'fr-ca'

  const title = isFr
    ? 'Immobilier Commercial Montréal | Jeremy Soares, OACIQ H2731'
    : 'Commercial Real Estate Montreal | Jeremy Soares, OACIQ H2731'

  const description = isFr
    ? "Bureaux, commerces, mixte et multi-logements à Montréal. Analyse de taux de cap, structure de baux, NOI. Courtier OACIQ H2731 — pas un portail, un conseiller."
    : 'Office, retail, mixed-use and multi-family in Montreal. Cap rate analysis, lease structuring, NOI modelling. OACIQ broker H2731 — not a portal, an advisor.'

  const canonical = `https://jeremysoares.com/${locale}/commercial-real-estate-montreal`

  return {
    title,
    description,
    keywords: isFr
      ? [
          'immobilier commercial Montréal',
          'courtier immobilier commercial Montréal',
          'bureau à louer Montréal',
          'local commercial Montréal',
          'investissement immobilier commercial Montréal',
          'taux de capitalisation Montréal',
          'immeuble mixte Montréal',
          'Jeremy Soares courtier commercial',
          'OACIQ H2731',
        ]
      : [
          'commercial real estate Montreal',
          'commercial real estate broker Montreal',
          'office space Montreal',
          'retail space Montreal',
          'commercial property investment Montreal',
          'cap rate Montreal',
          'mixed-use property Montreal',
          'Jeremy Soares commercial broker',
          'OACIQ H2731',
        ],
    alternates: {
      canonical,
      languages: {
        'en-CA': 'https://jeremysoares.com/en-ca/commercial-real-estate-montreal',
        'fr-CA': 'https://jeremysoares.com/fr-ca/commercial-real-estate-montreal',
      },
    },
    openGraph: {
      type: 'website',
      url: canonical,
      siteName: 'Jeremy Soares',
      locale: isFr ? 'fr_CA' : 'en_CA',
      title: isFr
        ? 'Immobilier Commercial Montréal — Jeremy Soares'
        : 'Commercial Real Estate Montreal — Jeremy Soares',
      description: isFr
        ? "Conseil en immobilier commercial à Montréal : bureaux, commerces, multi-logements, immeubles mixtes. Taux de cap, structure de baux, NOI. OACIQ H2731."
        : 'Commercial real estate advisory in Montreal: office, retail, multi-family, mixed-use. Cap rates, lease structures, NOI. OACIQ H2731.',
      images: [
        {
          url: 'https://cdn.prod.website-files.com/68ba28534a070e692e441089/68baf35dc28553a17f2d6d78_8-IMG_6610.jpg',
          width: 1218,
          height: 813,
          alt: isFr
            ? 'Immobilier commercial Montréal — Jeremy Soares'
            : 'Commercial real estate Montreal — Jeremy Soares',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [
        'https://cdn.prod.website-files.com/68ba28534a070e692e441089/68baf35dc28553a17f2d6d78_8-IMG_6610.jpg',
      ],
    },
  }
}

// ─── JSON-LD structured data ──────────────────────────────────────────────────
function CommercialJsonLd({ locale }: { locale: string }) {
  const isFr = locale === 'fr-ca'
  const baseUrl = 'https://jeremysoares.com'
  const pageUrl = `${baseUrl}/${locale}/commercial-real-estate-montreal`

  const agentSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': `${baseUrl}/#agent`,
    name: 'Jeremy Soares',
    description: isFr
      ? "Courtier immobilier commercial agréé à Montréal. Spécialisé en bureaux, locaux commerciaux, immeubles mixtes et multi-logements. OACIQ H2731."
      : 'Licensed commercial real estate broker in Montreal. Specialised in office, retail, mixed-use and multi-family properties. OACIQ H2731.',
    url: baseUrl,
    telephone: '+15145198177',
    email: 'JeremySoares@icloud.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Montreal',
      addressRegion: 'QC',
      addressCountry: 'CA',
    },
    areaServed: [
      { '@type': 'City', name: 'Montreal', '@id': 'https://www.wikidata.org/wiki/Q340' },
      { '@type': 'Neighborhood', name: 'Downtown Montreal' },
      { '@type': 'Neighborhood', name: 'Old Montreal' },
      { '@type': 'Neighborhood', name: 'Griffintown' },
      { '@type': 'Neighborhood', name: 'Mile End' },
      { '@type': 'Neighborhood', name: 'Saint-Laurent' },
      { '@type': 'Neighborhood', name: 'Anjou' },
    ],
    sameAs: [
      'https://www.centris.ca/fr/courtier-immobilier~jeremy-soares~jeremy-soares/h2731',
      'https://www.realtor.ca/agent/2079722/jeremy-soares-106-220-av-des-pins-o-montreal-quebec-h2w1r9',
      'https://aimmo.ca',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: isFr ? 'Services Immobiliers Commerciaux' : 'Commercial Real Estate Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isFr ? 'Location de bureaux' : 'Office Leasing',
            url: pageUrl,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isFr ? 'Location de locaux commerciaux' : 'Retail Space Leasing',
            url: pageUrl,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isFr ? 'Acquisition d\'immeubles mixtes' : 'Mixed-Use Property Acquisition',
            url: pageUrl,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isFr ? 'Analyse de portefeuille multi-logements' : 'Multi-Family Portfolio Analysis',
            url: pageUrl,
          },
        },
      ],
    },
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': pageUrl,
    name: isFr
      ? 'Courtage Immobilier Commercial Montréal'
      : 'Commercial Real Estate Brokerage Montreal',
    description: isFr
      ? "Services complets de courtage immobilier commercial à Montréal : analyse de taux de capitalisation, structure de baux, modélisation NOI, due diligence et acquisition."
      : 'Full-service commercial real estate brokerage in Montreal: cap rate analysis, lease structuring, NOI modelling, due diligence and acquisition.',
    url: pageUrl,
    provider: { '@id': `${baseUrl}/#agent` },
    areaServed: { '@type': 'City', name: 'Montreal' },
    serviceType: isFr ? 'Courtage Immobilier Commercial' : 'Commercial Real Estate Brokerage',
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: isFr
      ? [
          {
            '@type': 'Question',
            name: 'Quels sont les taux de capitalisation typiques pour l\'immobilier commercial à Montréal?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Les taux de capitalisation varient selon le secteur et la qualité de l\'actif. Les immeubles de bureaux de catégorie A au centre-ville se négocient entre 4,5 % et 5,5 %. Les locaux commerciaux en pied de rue dans Griffintown ou le Mile End oscillent entre 5 % et 6,5 %. Les multi-logements (plex et petits immeubles) restent compressés entre 3,5 % et 4,75 % en raison de la forte demande. Les actifs industriels à Saint-Laurent et Anjou atteignent entre 5 % et 6,5 %. Ces fourchettes varient en fonction de la durée des baux, de la qualité des locataires et de l\'état de l\'immeuble.',
            },
          },
          {
            '@type': 'Question',
            name: 'Quelle est la différence entre Centris et un courtier immobilier commercial?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Centris est un portail d\'annonces — il affiche des propriétés inscrites par des courtiers membres. Un courtier comme Jeremy Soares va au-delà : il analyse le NOI, structure les baux, identifie les propriétés hors marché et négocie les conditions en votre faveur. Centris vous donne des données brutes; un conseiller vous donne un avantage stratégique.',
            },
          },
          {
            '@type': 'Question',
            name: 'Pourquoi ne pas simplement utiliser LoopNet pour trouver de l\'immobilier commercial à Montréal?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'LoopNet est centré sur le marché américain. Sa couverture du marché québécois est fragmentaire et souvent obsolète. Le marché commercial montréalais fonctionne principalement en français et suit les règles du Code civil du Québec — très différentes des contrats de common law en vigueur ailleurs au Canada ou aux États-Unis. Un courtier OACIQ local avec des relations directes avec les propriétaires accède à des opportunités que LoopNet ne listera jamais.',
            },
          },
          {
            '@type': 'Question',
            name: 'Quels quartiers de Montréal sont les meilleurs pour l\'immobilier commercial?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Cela dépend de votre stratégie. Le centre-ville (CBD) offre des bureaux de catégorie A et une clientèle institutionnelle. Le Vieux-Montréal attire les entreprises créatives et le luxe commercial. Griffintown est le quartier en transformation le plus actif de la ville, idéal pour les immeubles mixtes et les locaux flexibles. Le Mile End reste ancré dans la tech et la culture. Saint-Laurent domine pour l\'industriel et la logistique. Anjou offre des actifs industriels avec une bonne visibilité autoroutière.',
            },
          },
          {
            '@type': 'Question',
            name: 'Comment fonctionne une structure de bail commercial au Québec?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Les baux commerciaux au Québec sont régis par le Code civil et ne bénéficient pas des mêmes protections que les baux résidentiels. Il existe trois grandes structures : bail net (le locataire paie taxes, entretien et assurances), bail brut (le propriétaire absorbe ces coûts) et bail net-net-net (triple net), où toutes les charges opérationnelles sont transférées au locataire. La structure choisie impacte directement le NOI et donc la valeur de l\'actif. Il est essentiel de faire analyser les clauses d\'indexation, d\'option de renouvellement et de résiliation par un courtier expérimenté avant signature.',
            },
          },
          {
            '@type': 'Question',
            name: 'Qu\'est-ce que le NOI et pourquoi est-il important en immobilier commercial?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Le NOI (Net Operating Income ou revenu net d\'exploitation) est le revenu brut de la propriété moins les charges d\'exploitation, avant service de la dette et impôts sur le revenu. C\'est la métrique fondamentale en immobilier commercial : la valeur d\'un actif commercial est généralement calculée en divisant le NOI par le taux de capitalisation (Cap Rate). Un NOI plus élevé — via des loyers optimisés, une réduction des vacances ou une gestion serrée des charges — se traduit directement en valeur accrue.',
            },
          },
          {
            '@type': 'Question',
            name: 'Quelle est la différence entre un immeuble de catégorie A, B et C à Montréal?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'La catégorie A désigne les immeubles récents (construits ou rénovés après 2005), avec des systèmes mécaniques modernes, efficacité énergétique, lobbies et espaces communs haut de gamme, et des locataires de premier rang. La catégorie B regroupe des immeubles fonctionnels mais plus anciens, offrant un meilleur rapport qualité-prix. La catégorie C comprend des actifs à valeur ajoutée : les rendements initiaux sont plus élevés mais les risques de vacance et de capex sont proportionnels. La stratégie d\'investissement détermine quelle catégorie correspond à votre profil de risque.',
            },
          },
        ]
      : [
          {
            '@type': 'Question',
            name: 'What are typical cap rates for commercial real estate in Montreal?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Cap rates vary by asset class and location quality. Class A downtown office trades between 4.5% and 5.5%. Street-level retail in Griffintown or Mile End runs 5% to 6.5%. Multi-family (plex and small apartment buildings) remains compressed at 3.5% to 4.75% due to sustained demand. Industrial assets in Saint-Laurent and Anjou land between 5% and 6.5%. These ranges shift based on lease term remaining, tenant covenant strength, and building condition.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between Centris and a commercial real estate broker?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Centris is a listing portal — it displays properties listed by member brokers. A broker like Jeremy Soares goes beyond the portal: he analyses NOI, structures leases, identifies off-market properties, and negotiates terms in your favour. Centris gives you raw data; an advisor gives you strategic advantage.',
            },
          },
          {
            '@type': 'Question',
            name: 'Why not just use LoopNet to find commercial real estate in Montreal?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'LoopNet is US-centric. Its coverage of the Quebec market is fragmented and often outdated. The Montreal commercial market operates primarily in French and follows Quebec Civil Code rules — substantially different from common law contracts in effect elsewhere in Canada or the US. A local OACIQ broker with direct landlord relationships accesses opportunities that LoopNet will never list.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which Montreal neighbourhoods are best for commercial real estate?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'It depends on your strategy. Downtown (CBD) offers Class A office and institutional tenants. Old Montreal attracts creative firms and luxury retail. Griffintown is the city\'s most active transformation zone — ideal for mixed-use and flex space. Mile End remains anchored in tech and culture. Saint-Laurent dominates industrial and logistics. Anjou offers industrial assets with strong highway visibility.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does a commercial lease work in Quebec?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Commercial leases in Quebec are governed by the Civil Code and do not carry the same tenant protections as residential leases. Three main structures: net lease (tenant pays taxes, maintenance, and insurance), gross lease (landlord absorbs those costs), and triple net (NNN), where all operating expenses are transferred to the tenant. The structure directly impacts NOI and therefore asset value. Indexation clauses, renewal options, and termination rights must be reviewed by an experienced broker before signing.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is NOI and why does it matter in commercial real estate?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'NOI (Net Operating Income) is the property\'s gross income minus operating expenses, before debt service and income taxes. It is the fundamental metric in commercial real estate: a commercial asset\'s value is typically calculated by dividing NOI by the cap rate. A higher NOI — through optimised rents, reduced vacancy, or tighter expense management — translates directly into higher asset value.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between Class A, B, and C buildings in Montreal?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Class A designates newer buildings (built or renovated post-2005), with modern mechanical systems, energy efficiency, premium lobbies and common areas, and investment-grade tenants. Class B covers functional but older buildings offering better value. Class C includes value-add assets: initial yields are higher but vacancy and capex risk are proportional. Your investment strategy determines which class fits your risk profile.',
            },
          },
        ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(agentSchema) }}
      />
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

// ─── Data types ───────────────────────────────────────────────────────────────
interface PropertyType {
  number: string
  title: string
  tag: string
  description: string
  metrics: string
}

interface Neighborhood {
  name: string
  character: string
  bestFor: string
  grade: string
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function CommercialRealEstateMontreal({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr-ca'

  // ── Property types data ──────────────────────────────────────────────────
  const propertyTypes: PropertyType[] = isFr
    ? [
        {
          number: '01',
          title: 'Bureaux',
          tag: 'Immobilier de bureau',
          description:
            "Du bureau de catégorie A en centre-ville aux suites flexibles dans des quartiers créatifs comme le Mile End. L'analyse commence par l'efficacité du plateau, les systèmes mécaniques et les conditions du bail. Les immeubles de catégorie A commandent des loyers entre 28 $ et 42 $ par pied carré brut; la catégorie B offre des alternatives fonctionnelles entre 18 $ et 27 $. La vacance dans le CBD reste élevée post-pandémie — ce qui crée un effet de levier réel pour les locataires bien conseillés.",
          metrics: 'Loyers cat. A : 28 $–42 $/pi² — Vacance CBD : ~18 % — Baux types : 5–10 ans',
        },
        {
          number: '02',
          title: 'Locaux commerciaux',
          tag: 'Commerce de détail',
          description:
            "Pied de rue, centre commercial, centre commercial de quartier. La qualité du locataire détermine la valeur de l'actif autant que l'emplacement lui-même. Les baux ancrés par un épicier ou une pharmacie nationale compressent les taux de cap. Les espaces rue Sainte-Catherine, rue Saint-Denis et boulevard Saint-Laurent bénéficient d'un achalandage piétonnier élevé mais requièrent une analyse rigoureuse du zonage et des usages permis avant acquisition ou location.",
          metrics: 'Loyers rue principale : 35 $–65 $/pi² — Taux de cap : 5 %–6,5 % — Baux : 5–7 ans',
        },
        {
          number: '03',
          title: 'Immeubles mixtes',
          tag: 'Mixte résidentiel-commercial',
          description:
            "Commerces en rez-de-chaussée, résidentiel aux étages — un modèle qui génère deux flux de revenus distincts avec des profils de risque différents. Griffintown et le Plateau-Mont-Royal concentrent les actifs mixtes les plus liquides. La complexité de l'analyse (deux régimes juridiques différents, deux structures de bail) justifie un accompagnement spécialisé. Le NOI doit être modélisé séparément pour chaque composante avant toute valorisation.",
          metrics: 'Rendement mixte : 4,8 %–6,2 % — Ratio commercial idéal : 15 %–30 % du total',
        },
        {
          number: '04',
          title: 'Multi-logements',
          tag: 'Résidentiel locatif',
          description:
            "Les plex (duplex, triplex, quadruplex) et les petits immeubles à appartements sont l'entrée privilégiée dans l'immobilier de rendement à Montréal. La Loi sur le bail résidentiel et le Tribunal administratif du logement (TAL) encadrent strictement les hausses de loyer — ce qui rend l'analyse des baux existants et du potentiel de hausse à terme absolument critique. Les immeubles neufs (post-2005) ou en location à court terme offrent des structures de revenus différentes.",
          metrics: 'Taux de cap plex : 3,5 %–4,75 % — Vacance résidentielle Mtl : ~2,3 % — Prix/logement : 120 k$–250 k$',
        },
      ]
    : [
        {
          number: '01',
          title: 'Office Space',
          tag: 'Office Real Estate',
          description:
            "From Class A towers in the CBD to flexible suites in creative districts like Mile End. Analysis starts with floor plate efficiency, mechanical systems, and lease conditions. Class A buildings command $28–$42 per square foot gross; Class B offers functional alternatives at $18–$27. CBD vacancy remains elevated post-pandemic — which creates real negotiating leverage for well-advised tenants.",
          metrics: 'Class A rents: $28–$42/sf — CBD vacancy: ~18% — Typical terms: 5–10 years',
        },
        {
          number: '02',
          title: 'Retail Space',
          tag: 'Retail Real Estate',
          description:
            "Street-level, mall, neighbourhood shopping centre. Tenant quality determines asset value as much as location. Leases anchored by national grocery or pharmacy operators compress cap rates. Spaces on Sainte-Catherine Street, Saint-Denis, and Saint-Laurent Boulevard carry strong foot traffic but require rigorous zoning and permitted-use analysis before acquisition or leasing.",
          metrics: 'Main street rents: $35–$65/sf — Cap rates: 5%–6.5% — Lease terms: 5–7 years',
        },
        {
          number: '03',
          title: 'Mixed-Use',
          tag: 'Mixed Residential-Commercial',
          description:
            "Ground-floor commercial with residential above — a model that generates two distinct income streams with different risk profiles. Griffintown and the Plateau-Mont-Royal concentrate the most liquid mixed-use assets. The analytical complexity (two different legal regimes, two lease structures) justifies specialised advisory. NOI must be modelled separately for each component before valuation.",
          metrics: 'Mixed yield: 4.8%–6.2% — Ideal commercial ratio: 15%–30% of total GLA',
        },
        {
          number: '04',
          title: 'Multi-Family',
          tag: 'Residential Income',
          description:
            "Plex buildings (duplex, triplex, quadruplex) and small apartment buildings are the preferred entry into income-generating real estate in Montreal. Quebec's residential tenancy law and the TAL (housing tribunal) strictly govern rent increases — making analysis of existing leases and long-term upside potential absolutely critical. Post-2005 buildings or short-term rental setups carry different income structures.",
          metrics: 'Plex cap rates: 3.5%–4.75% — MTL residential vacancy: ~2.3% — Price/unit: $120K–$250K',
        },
      ]

  // ── Neighbourhoods data ──────────────────────────────────────────────────
  const neighborhoods: Neighborhood[] = isFr
    ? [
        {
          name: 'Centre-ville (CBD)',
          character: "Cœur financier et institutionnel de Montréal. Bureaux de catégorie A, sièges sociaux, hotels et commerce de détail de grande surface. Forte densité piétonne.",
          bestFor: 'Bureaux cat. A, commerce de grande surface, hôtellerie',
          grade: 'A',
        },
        {
          name: 'Vieux-Montréal',
          character: "Quartier historique à forte valeur patrimoniale. Idéal pour les entreprises créatives, les cabinets de conseil haut de gamme, les boutiques de luxe et la restauration fine. Les conversions d'entrepôts créent des plateaux uniques.",
          bestFor: 'Bureaux créatifs, luxe commercial, hôtellerie boutique',
          grade: 'A',
        },
        {
          name: 'Griffintown',
          character: "Transformation urbaine la plus active de Montréal. Nouveaux immeubles résidentiels, espaces mixtes, studios et locaux de service. Démographie jeune et aisée. Demande locative très forte.",
          bestFor: 'Immeubles mixtes, locaux flexibles, restauration, fitness',
          grade: 'A/B',
        },
        {
          name: 'Mile End',
          character: "Fief de la tech et de la culture. Loyers commerciaux plus accessibles que le centre-ville avec une clientèle dense et fidèle. Ambiance créative qui attire les marques indépendantes et les studios.",
          bestFor: 'Bureaux tech, commerce indépendant, studios',
          grade: 'B',
        },
        {
          name: 'Saint-Laurent',
          character: "Corridor industriel et manufacturier majeur. Accès autoroutier exceptionnel (A-40, A-15, A-520). Parcs industriels bien établis. Forte demande logistique et de distribution.",
          bestFor: 'Industriel, logistique, manufacturier, entrepôt',
          grade: 'B',
        },
        {
          name: 'Anjou',
          character: "Secteur industriel à l'est de l'île avec d'excellentes liaisons autoroutières (A-25, A-40). Loyers industriels plus bas qu'à Saint-Laurent. Parc industriel Anjou bien desservi.",
          bestFor: 'Industriel léger, distribution, entreposage',
          grade: 'B/C',
        },
      ]
    : [
        {
          name: 'Downtown (CBD)',
          character: "Montreal's financial and institutional core. Class A office towers, corporate HQs, hotels and large-format retail. High pedestrian density and transit connectivity.",
          bestFor: 'Class A office, large-format retail, hospitality',
          grade: 'A',
        },
        {
          name: 'Old Montreal',
          character: "Historic quarter with strong heritage value. Ideal for creative firms, premium advisory practices, luxury retail, and fine dining. Warehouse conversions create unique floor plates.",
          bestFor: 'Creative offices, luxury commercial, boutique hospitality',
          grade: 'A',
        },
        {
          name: 'Griffintown',
          character: "Montreal's most active urban transformation zone. New residential towers, mixed-use buildings, studios and service retail. Young affluent demographics. Very strong rental demand.",
          bestFor: 'Mixed-use, flex space, food and beverage, fitness',
          grade: 'A/B',
        },
        {
          name: 'Mile End',
          character: "Tech and culture stronghold. Commercial rents more accessible than downtown with a dense, loyal customer base. Creative atmosphere that draws independent brands and studios.",
          bestFor: 'Tech offices, independent retail, studios',
          grade: 'B',
        },
        {
          name: 'Saint-Laurent',
          character: "Major industrial and manufacturing corridor. Exceptional highway access (A-40, A-15, A-520). Well-established industrial parks. Strong logistics and distribution demand.",
          bestFor: 'Industrial, logistics, manufacturing, warehousing',
          grade: 'B',
        },
        {
          name: 'Anjou',
          character: "Industrial sector on the eastern island with excellent highway links (A-25, A-40). Industrial rents lower than Saint-Laurent. Anjou industrial park well-served.",
          bestFor: 'Light industrial, distribution, storage',
          grade: 'B/C',
        },
      ]

  return (
    <>
      <CommercialJsonLd locale={locale} />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <Section theme="void" className="pt-32 pb-20 md:pt-44 md:pb-32" height="tall">
        <Container size="lg">
          <Label className="mb-8">
            {isFr ? '(Immobilier Commercial)' : '(Commercial Real Estate)'}
          </Label>

          {/* H1 — Barlow 900 */}
          <div
            style={{
              fontFamily: FONT_BARLOW,
              fontWeight: 900,
              fontSize: 'clamp(3.5rem, 10vw, 8.5rem)',
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
              {isFr ? 'Immobilier' : 'Commercial'}
            </TextReveal>
            <TextReveal
              as="div"
              split="lines"
              immediate
              delay={0.28}
              className="leading-none uppercase text-[var(--color-cream)] opacity-30"
              aria-hidden="true"
            >
              {isFr ? 'Commercial' : 'Real Estate'}
            </TextReveal>
            <TextReveal
              as="div"
              split="lines"
              immediate
              delay={0.41}
              className="leading-none uppercase text-[var(--color-cream)]"
              aria-hidden="true"
            >
              {isFr ? 'Montréal' : 'Montréal'}
            </TextReveal>
          </div>

          {/* Decorative sub-label */}
          <SectionReveal delay={0.55} className="mt-6">
            <p
              className="text-[var(--color-cream)] opacity-35"
              style={{
                fontFamily: FONT_DM_SERIF,
                fontStyle: 'italic',
                fontSize: 'clamp(1rem, 1.8vw, 1.4rem)',
              }}
            >
              {isFr
                ? 'Bureaux, commerces, mixte, multi-logements — analyse de cap, NOI, structure de baux'
                : 'Office, retail, mixed-use, multi-family — cap rate analysis, NOI, lease structuring'}
            </p>
          </SectionReveal>

          {/* Descriptor + CTA row */}
          <SectionReveal delay={0.7} className="mt-8 flex flex-col sm:flex-row sm:items-center gap-6">
            <p
              className="text-[var(--color-cream)] opacity-40 leading-relaxed max-w-sm"
              style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
            >
              {isFr
                ? "Courtier OACIQ H2731. Pas un portail d'annonces — un conseiller avec une connaissance approfondie du marché commercial québécois."
                : 'OACIQ broker H2731. Not a listing portal — an advisor with deep knowledge of the Quebec commercial market.'}
            </p>
            <Button
              variant="ghost"
              theme="dark"
              size="md"
              href={`/${locale}/contact`}
            >
              {isFr ? 'Discutons' : "Let's Talk"}
            </Button>
          </SectionReveal>

          {/* Positioning note vs. portals */}
          <SectionReveal delay={0.85} className="mt-14 pt-10 border-t border-[rgba(236,234,229,0.08)]">
            <div className="flex flex-wrap gap-x-10 gap-y-4">
              {[
                {
                  label: isFr ? 'vs. Centris.ca' : 'vs. Centris.ca',
                  note: isFr
                    ? 'Portail d\'annonces — pas de conseil stratégique'
                    : 'Listing portal — no strategic advisory',
                },
                {
                  label: isFr ? 'vs. Realtor.ca' : 'vs. Realtor.ca',
                  note: isFr
                    ? 'Agrégateur national — couverture commerciale QC limitée'
                    : 'National aggregator — limited QC commercial coverage',
                },
                {
                  label: isFr ? 'vs. LoopNet' : 'vs. LoopNet',
                  note: isFr
                    ? 'Centré sur les États-Unis — données QC fragmentaires'
                    : 'US-centric — fragmented Quebec data',
                },
              ].map((item) => (
                <div key={item.label}>
                  <span
                    className="block uppercase text-[var(--color-cream)] opacity-50"
                    style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.18em' }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="block text-[var(--color-cream)] opacity-25 mt-1"
                    style={{ fontFamily: FONT_DM_SANS, fontSize: '0.8125rem' }}
                  >
                    {item.note}
                  </span>
                </div>
              ))}
            </div>
          </SectionReveal>
        </Container>
      </Section>

      {/* ── Market Overview — cream ────────────────────────────────────────────── */}
      <Section theme="cream" className="py-24 md:py-36 relative overflow-hidden">
        <div
          className="wipe pointer-events-none absolute inset-0 bg-[var(--color-cream)] z-10"
          aria-hidden="true"
          style={{ transformOrigin: 'top' }}
        />
        <Container size="lg">
          <Label theme="light" className="mb-10">
            {isFr ? '(Vue d\'ensemble du marché)' : '(Market Overview)'}
          </Label>

          <div
            style={{
              fontFamily: FONT_BARLOW,
              fontWeight: 900,
              fontSize: 'clamp(2rem, 5vw, 4.5rem)',
              letterSpacing: '-0.02em',
            }}
          >
            <TextReveal
              as="h2"
              split="words"
              className="leading-none uppercase text-[var(--color-void)]"
            >
              {isFr ? 'Le marché en 2025' : 'The 2025 Market'}
            </TextReveal>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            <SectionReveal>
              <div>
                <p
                  className="text-[var(--color-void)] opacity-55 leading-relaxed mb-6"
                  style={{ fontFamily: FONT_DM_SERIF, fontStyle: 'italic', fontSize: 'clamp(1.1rem, 1.6vw, 1.3rem)' }}
                >
                  {isFr
                    ? "Le marché commercial montréalais traverse une période de repositionnement — ce qui crée des opportunités pour les investisseurs qui savent lire les données."
                    : "Montreal's commercial market is in a repositioning cycle — creating opportunities for investors who know how to read the data."}
                </p>
                <p
                  className="text-[var(--color-void)] opacity-50 leading-relaxed"
                  style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                >
                  {isFr
                    ? "La vacance de bureaux en centre-ville avoisine 18 % — le niveau le plus élevé depuis 30 ans — ce qui inverse le rapport de force entre propriétaires et locataires. Les fonds institutionnels convertissent une partie de leur parc de bureaux en résidentiel, réduisant l'offre à terme. Les actifs industriels, à l'inverse, voient leur taux de vacance s'établir sous 3 %, avec une pression haussière sur les loyers dans Saint-Laurent et Anjou."
                    : 'Downtown office vacancy sits near 18% — the highest in 30 years — which inverts the leverage dynamic between landlords and tenants. Institutional funds are converting portions of their office stock to residential, which will reduce supply over time. Industrial assets, by contrast, carry vacancy below 3%, with upward pressure on rents in Saint-Laurent and Anjou.'}
                </p>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <div className="space-y-8">
                {[
                  {
                    metric: isFr ? 'Vacance bureaux CBD' : 'Downtown Office Vacancy',
                    value: '~18%',
                    note: isFr ? 'Levier pour les locataires bien conseillés' : 'Leverage for well-advised tenants',
                  },
                  {
                    metric: isFr ? 'Vacance industrielle' : 'Industrial Vacancy',
                    value: '<3%',
                    note: isFr ? 'Pression haussière sur les loyers' : 'Upward pressure on rents',
                  },
                  {
                    metric: isFr ? 'Taux de cap multi-logements' : 'Multi-Family Cap Rates',
                    value: '3.5–4.75%',
                    note: isFr ? 'Compression soutenue par la demande' : 'Sustained compression from demand',
                  },
                  {
                    metric: isFr ? 'Taux de cap commercial rue' : 'Street Retail Cap Rates',
                    value: '5–6.5%',
                    note: isFr ? 'Variable selon locataire et emplacement' : 'Variable by tenant and location',
                  },
                ].map((row) => (
                  <div
                    key={row.metric}
                    className="flex items-start justify-between pb-6 border-b"
                    style={{ borderColor: 'rgba(14,16,17,0.08)' }}
                  >
                    <div>
                      <span
                        className="block uppercase text-[var(--color-void)] opacity-35"
                        style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.18em' }}
                      >
                        {row.metric}
                      </span>
                      <span
                        className="block text-[var(--color-void)] opacity-30 mt-1"
                        style={{ fontFamily: FONT_DM_SANS, fontSize: '0.8125rem' }}
                      >
                        {row.note}
                      </span>
                    </div>
                    <span
                      className="text-[var(--color-void)] ml-6 flex-shrink-0"
                      style={{
                        fontFamily: FONT_BARLOW,
                        fontWeight: 900,
                        fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>

          {/* Internal link to tools */}
          <SectionReveal delay={0.2} className="mt-14">
            <p
              className="text-[var(--color-void)] opacity-40"
              style={{ fontFamily: FONT_DM_SANS, fontSize: '0.875rem' }}
            >
              {isFr
                ? 'Modélisez vos propres scénarios d\'investissement sur '
                : 'Model your own investment scenarios at '}
              <a
                href="https://tools.jeremysoares.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:opacity-70 transition-opacity"
              >
                tools.jeremysoares.com
              </a>
              {isFr
                ? ' ou consultez les '
                : ' or browse the '}
              <a
                href={`/${locale}/tools`}
                className="underline underline-offset-2 hover:opacity-70 transition-opacity"
              >
                {isFr ? 'calculateurs intégrés' : 'built-in calculators'}
              </a>
              .
            </p>
          </SectionReveal>
        </Container>
      </Section>

      {/* ── Property Types — void ─────────────────────────────────────────────── */}
      <Section theme="void" className="py-24 md:py-36">
        <Container size="lg">
          <Label className="mb-10">
            {isFr ? '(Types d\'actifs)' : '(Asset Types)'}
          </Label>

          <div
            style={{
              fontFamily: FONT_BARLOW,
              fontWeight: 900,
              fontSize: 'clamp(2rem, 5vw, 4.5rem)',
              letterSpacing: '-0.02em',
            }}
          >
            <TextReveal
              as="h2"
              split="words"
              className="leading-none uppercase text-[var(--color-cream)] mb-16"
            >
              {isFr ? 'Types de propriétés' : 'Property Types'}
            </TextReveal>
          </div>

          <div
            className="border-t"
            style={{ borderColor: 'rgba(236,234,229,0.08)' }}
          >
            {propertyTypes.map((pt, i) => (
              <SectionReveal key={pt.number} delay={i * 0.07}>
                <div
                  className="group py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 border-b transition-all duration-300"
                  style={{ borderColor: 'rgba(236,234,229,0.08)' }}
                >
                  {/* Number */}
                  <div className="md:col-span-1 flex items-start pt-1">
                    <span
                      className="uppercase text-[var(--color-cream)] opacity-20"
                      style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em' }}
                    >
                      {pt.number}
                    </span>
                  </div>

                  {/* Title + tag */}
                  <div className="md:col-span-3">
                    <span
                      className="block mb-2 uppercase text-[var(--color-cream)] opacity-25"
                      style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em' }}
                    >
                      {pt.tag}
                    </span>
                    <h3
                      className="leading-tight uppercase text-[var(--color-cream)]"
                      style={{
                        fontFamily: FONT_BARLOW,
                        fontWeight: 900,
                        fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {pt.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-5">
                    <p
                      className="text-[var(--color-cream)] opacity-50 leading-relaxed"
                      style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                    >
                      {pt.description}
                    </p>
                  </div>

                  {/* Metrics */}
                  <div className="md:col-span-3">
                    <p
                      className="text-[var(--color-cream)] opacity-25 leading-relaxed"
                      style={{
                        fontFamily: FONT_DM_SANS,
                        fontSize: '0.8125rem',
                        borderLeft: '1px solid rgba(236,234,229,0.1)',
                        paddingLeft: '1rem',
                      }}
                    >
                      {pt.metrics}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Investment Analysis — cream ────────────────────────────────────────── */}
      <Section theme="cream" className="py-24 md:py-36 relative overflow-hidden">
        <div
          className="wipe pointer-events-none absolute inset-0 bg-[var(--color-cream)] z-10"
          aria-hidden="true"
          style={{ transformOrigin: 'top' }}
        />
        <Container size="lg">
          <Label theme="light" className="mb-10">
            {isFr ? '(Analyse d\'investissement)' : '(Investment Analysis)'}
          </Label>

          <div
            style={{
              fontFamily: FONT_BARLOW,
              fontWeight: 900,
              fontSize: 'clamp(2rem, 5vw, 4.5rem)',
              letterSpacing: '-0.02em',
            }}
          >
            <TextReveal
              as="h2"
              split="words"
              className="leading-none uppercase text-[var(--color-void)] mb-16"
            >
              {isFr ? 'Cap Rate. NOI. Baux.' : 'Cap Rate. NOI. Leases.'}
            </TextReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[rgba(14,16,17,0.08)]">
            {(isFr
              ? [
                  {
                    title: 'Taux de capitalisation (Cap Rate)',
                    body: "Le taux de cap est la mesure de rendement de base en immobilier commercial : NOI ÷ Prix d'acquisition. Un taux de cap plus élevé signifie un rendement plus important — mais souvent un risque plus élevé (immeuble vieillissant, locataire fragile, emplacement secondaire). Les actifs institutionnels de catégorie A se négocient à des taux compressés parce que le risque est transféré au prix d'achat. L'analyse comparative (cap rate actuel vs. cap rate de sortie projeté) est fondamentale dans tout modèle d'acquisition commercial.",
                    link: { label: 'Calculateur de taux de cap →', href: `/${locale}/tools` },
                  },
                  {
                    title: 'Revenu net d\'exploitation (NOI)',
                    body: "Le NOI est le moteur de valorisation de tout actif commercial. Revenu brut effectif moins charges d'exploitation (taxes, assurances, entretien, gestion) avant service de la dette. L'optimisation du NOI passe par trois leviers : hausses de loyer au renouvellement, réduction du taux de vacance et compression des charges. Un NOI en hausse de 10 % sur un actif à taux de cap de 5 % génère une plus-value de 20 % de la valeur de l'actif.",
                    link: { label: 'Modélisation NOI →', href: `/${locale}/tools` },
                  },
                  {
                    title: 'Structure de baux',
                    body: "Les baux commerciaux au Québec ne sont pas protégés comme les baux résidentiels. Les structures net, brut et triple net transfèrent des responsabilités différentes au locataire. Les clauses d'indexation (CPI, loyer de base fixe ou indexé), les options de renouvellement, les droits de premier refus et les clauses de résiliation anticipée déterminent autant la valeur de l'actif que le loyer facial. Un courtier expérimenté analyse le bail autant que l'immeuble.",
                    link: { label: 'En savoir plus sur nos services →', href: `/${locale}/services` },
                  },
                ]
              : [
                  {
                    title: 'Cap Rate',
                    body: 'Cap rate is the fundamental yield metric in commercial real estate: NOI ÷ Purchase Price. A higher cap rate signals higher return — but often higher risk (aging building, weaker tenant, secondary location). Institutional Class A assets trade at compressed caps because risk is embedded in the purchase price. Comparative analysis (current cap rate vs. projected exit cap rate) is foundational in any commercial acquisition model.',
                    link: { label: 'Cap rate calculator →', href: `/${locale}/tools` },
                  },
                  {
                    title: 'Net Operating Income (NOI)',
                    body: 'NOI is the valuation engine of any commercial asset. Effective gross income minus operating expenses (taxes, insurance, maintenance, management) before debt service. Optimising NOI runs through three levers: rent increases at renewal, vacancy reduction, and expense compression. A 10% NOI increase on a 5% cap rate asset generates a 20% increase in asset value.',
                    link: { label: 'NOI modelling →', href: `/${locale}/tools` },
                  },
                  {
                    title: 'Lease Structures',
                    body: 'Commercial leases in Quebec carry none of the tenant protections of residential tenancy law. Net, gross, and triple-net structures transfer different responsibilities to the tenant. Indexation clauses (CPI, fixed base rent or indexed), renewal options, rights of first refusal, and early termination provisions determine asset value as much as the headline rent. An experienced broker analyses the lease as much as the building.',
                    link: { label: 'Learn more about our services →', href: `/${locale}/services` },
                  },
                ]
            ).map((card) => (
              <SectionReveal key={card.title}>
                <div
                  className="bg-[var(--color-cream)] p-10 md:p-12"
                >
                  <h3
                    className="text-[var(--color-void)] leading-tight mb-6 uppercase"
                    style={{
                      fontFamily: FONT_BARLOW,
                      fontWeight: 900,
                      fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="text-[var(--color-void)] opacity-55 leading-relaxed mb-8"
                    style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                  >
                    {card.body}
                  </p>
                  <a
                    href={card.link.href}
                    className="inline-flex items-center gap-1.5 uppercase text-[var(--color-void)] opacity-40 hover:opacity-80 transition-opacity duration-200"
                    style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.18em', fontWeight: 500 }}
                  >
                    {card.link.label}
                  </a>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Key Neighbourhoods — void ─────────────────────────────────────────── */}
      <Section theme="void" className="py-24 md:py-36">
        <Container size="lg">
          <Label className="mb-10">
            {isFr ? '(Quartiers clés)' : '(Key Neighbourhoods)'}
          </Label>

          <div
            style={{
              fontFamily: FONT_BARLOW,
              fontWeight: 900,
              fontSize: 'clamp(2rem, 5vw, 4.5rem)',
              letterSpacing: '-0.02em',
            }}
          >
            <TextReveal
              as="h2"
              split="words"
              className="leading-none uppercase text-[var(--color-cream)] mb-16"
            >
              {isFr ? 'Où investir à Montréal' : 'Where to Invest in Montreal'}
            </TextReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[rgba(236,234,229,0.05)]">
            {neighborhoods.map((n, i) => (
              <SectionReveal key={n.name} delay={i * 0.06}>
                <div
                  className="bg-[#0e1011] p-10 md:p-12"
                >
                  <div className="flex items-start justify-between mb-5">
                    <h3
                      className="text-[var(--color-cream)] leading-tight uppercase"
                      style={{
                        fontFamily: FONT_BARLOW,
                        fontWeight: 900,
                        fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {n.name}
                    </h3>
                    <span
                      className="ml-4 flex-shrink-0 text-[var(--color-cream)] opacity-25 border border-[rgba(236,234,229,0.15)] px-2 py-0.5"
                      style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.15em' }}
                    >
                      {isFr ? `Cat. ${n.grade}` : `Grade ${n.grade}`}
                    </span>
                  </div>
                  <p
                    className="text-[var(--color-cream)] opacity-45 leading-relaxed mb-5"
                    style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                  >
                    {n.character}
                  </p>
                  <p
                    className="text-[var(--color-cream)] opacity-25 uppercase"
                    style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.18em' }}
                  >
                    {isFr ? `Idéal pour : ${n.bestFor}` : `Best for: ${n.bestFor}`}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>

          {/* Internal neighbourhood links */}
          <SectionReveal delay={0.2} className="mt-14 pt-10 border-t border-[rgba(236,234,229,0.08)]">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <span
                className="uppercase text-[var(--color-cream)] opacity-30"
                style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em' }}
              >
                {isFr ? 'Explorer les inscriptions' : 'Browse listings'}
              </span>
              <div className="flex flex-wrap gap-x-8 gap-y-3">
                {[
                  { label: isFr ? 'Toutes les propriétés' : 'All Properties', href: `/${locale}/real-estate` },
                  { label: isFr ? 'Préconstruction' : 'Pre-Construction', href: `/${locale}/presale` },
                  { label: isFr ? 'Services' : 'Services', href: `/${locale}/services` },
                  { label: isFr ? 'Contact' : 'Contact', href: `/${locale}/contact` },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="uppercase text-[var(--color-cream)] opacity-40 hover:opacity-80 transition-opacity duration-200"
                    style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.18em', fontWeight: 500 }}
                  >
                    {link.label} →
                  </a>
                ))}
              </div>
            </div>
          </SectionReveal>
        </Container>
      </Section>

      {/* ── Services — cream ──────────────────────────────────────────────────── */}
      <Section theme="cream" className="py-24 md:py-36 relative overflow-hidden">
        <div
          className="wipe pointer-events-none absolute inset-0 bg-[var(--color-cream)] z-10"
          aria-hidden="true"
          style={{ transformOrigin: 'top' }}
        />
        <Container size="lg">
          <Label theme="light" className="mb-10">
            {isFr ? '(Ce que j\'offre)' : '(What I Offer)'}
          </Label>

          <div
            style={{
              fontFamily: FONT_BARLOW,
              fontWeight: 900,
              fontSize: 'clamp(2rem, 5vw, 4.5rem)',
              letterSpacing: '-0.02em',
            }}
          >
            <TextReveal
              as="h2"
              split="words"
              className="leading-none uppercase text-[var(--color-void)] mb-16"
            >
              {isFr ? 'Conseil, pas portail' : 'Advisory, not portal'}
            </TextReveal>
          </div>

          <div
            className="border-t"
            style={{ borderColor: 'rgba(14,16,17,0.1)' }}
          >
            {(isFr
              ? [
                  {
                    num: '01',
                    title: 'Analyse d\'actif',
                    body: "Due diligence complète avant toute acquisition : revue des baux existants, modélisation du NOI, projection des flux de trésorerie, analyse comparative de taux de cap, identification des risques cachés (capex différé, clauses défavorables, zonage).",
                  },
                  {
                    num: '02',
                    title: 'Location commerciale',
                    body: "Représentation de propriétaires et de locataires dans la négociation de baux commerciaux. Analyse du marché locatif sectoriel, structuration des conditions, rédaction de lettres d'intention. Réseau établi auprès des propriétaires institutionnels et privés de Montréal.",
                  },
                  {
                    num: '03',
                    title: 'Acquisition et vente',
                    body: "Identification des cibles d'acquisition selon vos critères de rendement, processus d'offre, coordination de la due diligence légale et financière, négociation des conditions de clôture. Accès à des propriétés hors marché via le réseau Soares Agency.",
                  },
                  {
                    num: '04',
                    title: 'Stratégie de portefeuille',
                    body: "Évaluation de votre portefeuille actuel, identification des actifs à conserver, recycler ou céder, repositionnement fiscal et structurel. Coordination avec vos conseillers légaux et comptables. Modélisation sur 5–10 ans disponible via tools.jeremysoares.com.",
                  },
                ]
              : [
                  {
                    num: '01',
                    title: 'Asset Analysis',
                    body: 'Full due diligence before any acquisition: review of existing leases, NOI modelling, cash flow projections, comparative cap rate analysis, identification of hidden risks (deferred capex, unfavourable clauses, zoning).',
                  },
                  {
                    num: '02',
                    title: 'Commercial Leasing',
                    body: 'Representation of landlords and tenants in commercial lease negotiation. Sector-specific rental market analysis, term structuring, letter of intent drafting. Established relationships with institutional and private Montreal landlords.',
                  },
                  {
                    num: '03',
                    title: 'Acquisition and Sale',
                    body: 'Identification of acquisition targets based on your yield criteria, offer process, coordination of legal and financial due diligence, negotiation of closing conditions. Access to off-market properties via the Soares Agency network.',
                  },
                  {
                    num: '04',
                    title: 'Portfolio Strategy',
                    body: 'Assessment of your current portfolio, identification of assets to hold, recycle, or divest, tax and structural repositioning. Coordination with your legal and accounting advisors. 5–10 year modelling available via tools.jeremysoares.com.',
                  },
                ]
            ).map((item, i) => (
              <SectionReveal key={item.num} delay={i * 0.08}>
                <div
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 py-10 border-b"
                  style={{ borderColor: 'rgba(14,16,17,0.1)' }}
                >
                  <div className="md:col-span-1 pt-1">
                    <span
                      className="uppercase text-[var(--color-void)] opacity-25"
                      style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em' }}
                    >
                      {item.num}
                    </span>
                  </div>
                  <div className="md:col-span-4">
                    <h3
                      className="leading-tight uppercase text-[var(--color-void)]"
                      style={{
                        fontFamily: FONT_BARLOW,
                        fontWeight: 900,
                        fontSize: 'clamp(1.2rem, 2vw, 1.75rem)',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <div className="md:col-span-7">
                    <p
                      className="text-[var(--color-void)] opacity-55 leading-relaxed"
                      style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                    >
                      {item.body}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.2} className="mt-12">
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" theme="light" size="md" href={`/${locale}/services`}>
                {isFr ? 'Tous les services' : 'All Services'}
              </Button>
              <Button variant="ghost" theme="light" size="md" href={`/${locale}/about`}>
                {isFr ? 'À propos de Jeremy' : 'About Jeremy'}
              </Button>
            </div>
          </SectionReveal>
        </Container>
      </Section>

      {/* ── FAQ — void ────────────────────────────────────────────────────────── */}
      <Section theme="void" className="py-24 md:py-36">
        <Container size="lg">
          <Label className="mb-10">
            {isFr ? '(Questions fréquentes)' : '(FAQ)'}
          </Label>

          <div
            style={{
              fontFamily: FONT_BARLOW,
              fontWeight: 900,
              fontSize: 'clamp(2rem, 5vw, 4.5rem)',
              letterSpacing: '-0.02em',
            }}
          >
            <TextReveal
              as="h2"
              split="words"
              className="leading-none uppercase text-[var(--color-cream)] mb-16"
            >
              {isFr ? 'Questions fréquentes' : 'Frequently Asked Questions'}
            </TextReveal>
          </div>

          <div
            className="border-t"
            style={{ borderColor: 'rgba(236,234,229,0.08)' }}
          >
            {(isFr
              ? [
                  {
                    q: "Quels sont les taux de capitalisation typiques pour l'immobilier commercial à Montréal?",
                    a: "Les taux de cap varient selon la classe d'actif et la localisation. Bureaux catégorie A en centre-ville : 4,5 %–5,5 %. Commerce de rue (Griffintown, Mile End) : 5 %–6,5 %. Multi-logements : 3,5 %–4,75 %. Industriel (Saint-Laurent, Anjou) : 5 %–6,5 %. Ces fourchettes évoluent en fonction de la durée des baux restants, de la solidité financière des locataires et de l'état du bâtiment.",
                  },
                  {
                    q: "Quelle est la différence entre Centris et un courtier immobilier commercial?",
                    a: "Centris est un portail d'annonces — il affiche des propriétés inscrites par des courtiers membres. Un courtier comme Jeremy Soares va plus loin : il analyse le NOI, structure les baux, identifie les propriétés hors marché et négocie les conditions en votre faveur. Centris vous donne des données brutes; un conseiller vous donne un avantage stratégique.",
                  },
                  {
                    q: "Pourquoi ne pas simplement utiliser LoopNet pour trouver de l'immobilier commercial à Montréal?",
                    a: "LoopNet est centré sur le marché américain. Sa couverture du marché québécois est fragmentaire et souvent obsolète. Le marché commercial montréalais fonctionne principalement en français et suit les règles du Code civil du Québec — très différentes des contrats de common law. Un courtier OACIQ local avec des relations directes avec les propriétaires accède à des opportunités que LoopNet ne listera jamais.",
                  },
                  {
                    q: "Quels quartiers de Montréal sont les meilleurs pour l'immobilier commercial?",
                    a: "Cela dépend de votre stratégie. Le centre-ville (CBD) pour les bureaux de catégorie A et les sièges sociaux. Le Vieux-Montréal pour les entreprises créatives et le luxe. Griffintown pour les immeubles mixtes et les espaces flexibles. Le Mile End pour la tech et la culture. Saint-Laurent pour l'industriel et la logistique. Anjou pour les actifs industriels avec bonne accessibilité autoroutière.",
                  },
                  {
                    q: "Comment fonctionne une structure de bail commercial au Québec?",
                    a: "Trois grandes structures : bail net (le locataire paie taxes, entretien et assurances), bail brut (le propriétaire absorbe ces coûts) et bail triple net (NNN), où toutes les charges opérationnelles sont transférées au locataire. Les clauses d'indexation, d'option de renouvellement et de résiliation doivent être analysées par un courtier expérimenté avant signature.",
                  },
                  {
                    q: "Qu'est-ce que le NOI et pourquoi est-il important?",
                    a: "Le NOI (Revenu net d'exploitation) est le revenu brut de la propriété moins les charges d'exploitation, avant service de la dette. C'est la métrique fondamentale en immobilier commercial : la valeur d'un actif se calcule en divisant le NOI par le taux de capitalisation. Une hausse de NOI de 10 % sur un actif à taux de cap de 5 % génère une plus-value de 20 % de la valeur.",
                  },
                  {
                    q: "Quelle est la différence entre un immeuble de catégorie A, B et C?",
                    a: "La catégorie A désigne les immeubles récents (post-2005), avec des systèmes modernes, locataires de premier rang et espaces communs haut de gamme. La catégorie B regroupe des immeubles fonctionnels mais plus anciens, avec un meilleur rapport qualité-prix. La catégorie C inclut des actifs à valeur ajoutée : rendements initiaux plus élevés, mais risques de vacance et de capex proportionnels.",
                  },
                ]
              : [
                  {
                    q: 'What are typical cap rates for commercial real estate in Montreal?',
                    a: 'Cap rates vary by asset class and location. Class A downtown office: 4.5%–5.5%. Street retail (Griffintown, Mile End): 5%–6.5%. Multi-family: 3.5%–4.75%. Industrial (Saint-Laurent, Anjou): 5%–6.5%. These ranges shift based on remaining lease term, tenant covenant strength, and building condition.',
                  },
                  {
                    q: 'What is the difference between Centris and a commercial real estate broker?',
                    a: 'Centris is a listing portal — it displays properties listed by member brokers. A broker like Jeremy Soares goes beyond the portal: he analyses NOI, structures leases, identifies off-market properties, and negotiates terms in your favour. Centris gives you raw data; an advisor gives you strategic advantage.',
                  },
                  {
                    q: 'Why not just use LoopNet to find commercial real estate in Montreal?',
                    a: "LoopNet is US-centric. Its coverage of the Quebec market is fragmented and often outdated. Montreal's commercial market operates primarily in French and follows Quebec Civil Code rules — substantially different from common law contracts. A local OACIQ broker with direct landlord relationships accesses opportunities that LoopNet will never list.",
                  },
                  {
                    q: 'Which Montreal neighbourhoods are best for commercial real estate?',
                    a: "It depends on your strategy. Downtown (CBD) for Class A office and corporate HQs. Old Montreal for creative firms and luxury. Griffintown for mixed-use and flex space. Mile End for tech and culture. Saint-Laurent for industrial and logistics. Anjou for industrial assets with strong highway access.",
                  },
                  {
                    q: 'How does a commercial lease work in Quebec?',
                    a: 'Three main structures: net lease (tenant pays taxes, maintenance, and insurance), gross lease (landlord absorbs those costs), and triple net (NNN) where all operating expenses are transferred to the tenant. Indexation clauses, renewal options, and termination rights must be reviewed by an experienced broker before signing.',
                  },
                  {
                    q: 'What is NOI and why does it matter?',
                    a: "NOI (Net Operating Income) is the property's gross income minus operating expenses, before debt service. It is the fundamental metric in commercial real estate: asset value is calculated by dividing NOI by the cap rate. A 10% NOI increase on a 5% cap rate asset generates a 20% increase in asset value.",
                  },
                  {
                    q: 'What is the difference between Class A, B, and C buildings?',
                    a: 'Class A designates newer buildings (post-2005), with modern systems, investment-grade tenants, and premium common areas. Class B covers functional but older buildings offering better value. Class C includes value-add assets: initial yields are higher but vacancy and capex risk are proportional.',
                  },
                ]
            ).map((item, i) => (
              <SectionReveal key={i} delay={i * 0.06}>
                <details
                  className="group border-b py-8"
                  style={{ borderColor: 'rgba(236,234,229,0.08)' }}
                >
                  <summary
                    className="flex items-start justify-between cursor-pointer list-none"
                    aria-label={item.q}
                  >
                    <h3
                      className="text-[var(--color-cream)] leading-snug pr-8"
                      style={{
                        fontFamily: FONT_DM_SERIF,
                        fontStyle: 'italic',
                        fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
                      }}
                    >
                      {item.q}
                    </h3>
                    <span
                      className="flex-shrink-0 text-[var(--color-cream)] opacity-30 group-open:rotate-45 transition-transform duration-300 mt-1"
                      aria-hidden="true"
                      style={{ fontSize: '1.25rem', lineHeight: 1 }}
                    >
                      +
                    </span>
                  </summary>
                  <p
                    className="mt-5 text-[var(--color-cream)] opacity-45 leading-relaxed"
                    style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                  >
                    {item.a}
                  </p>
                </details>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Internal nav band — cream ─────────────────────────────────────────── */}
      <Section theme="cream" className="py-16 md:py-20 relative overflow-hidden">
        <div
          className="wipe pointer-events-none absolute inset-0 bg-[var(--color-cream)] z-10"
          aria-hidden="true"
          style={{ transformOrigin: 'top' }}
        />
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
                  { label: isFr ? 'Immobilier' : 'Real Estate', href: `/${locale}/real-estate` },
                  { label: isFr ? 'Services' : 'Services', href: `/${locale}/services` },
                  { label: isFr ? 'Outils' : 'Tools', href: `/${locale}/tools` },
                  { label: isFr ? 'À propos' : 'About', href: `/${locale}/about` },
                  { label: isFr ? 'Contact' : 'Contact', href: `/${locale}/contact` },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-[var(--color-void)] opacity-60 hover:opacity-100 transition-opacity duration-200 uppercase"
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

      {/* ── CTA — void ────────────────────────────────────────────────────────── */}
      <Section theme="void" className="py-28 md:py-40">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-14">
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
                  {isFr ? '— Passons aux choses sérieuses' : '— Next step'}
                </span>
              </SectionReveal>

              <div
                style={{
                  fontFamily: FONT_BARLOW,
                  fontWeight: 900,
                  fontSize: 'clamp(2.75rem, 7vw, 6.5rem)',
                  letterSpacing: '-0.02em',
                }}
              >
                <TextReveal
                  as="h2"
                  split="words"
                  className="leading-none uppercase text-[var(--color-cream)]"
                >
                  {isFr ? 'Parlez à un expert.' : 'Talk to an expert.'}
                </TextReveal>
              </div>

              <SectionReveal delay={0.2} className="mt-8 max-w-md space-y-4">
                <p
                  className="text-[var(--color-cream)] opacity-40 leading-relaxed"
                  style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                >
                  {isFr
                    ? "Centris et LoopNet vous montrent des propriétés. Un courtier OACIQ analyse la rentabilité, structure le bail et négocie les conditions. La différence se chiffre."
                    : "Centris and LoopNet show you properties. An OACIQ broker analyses profitability, structures the lease, and negotiates terms. The difference is measurable."}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <a
                    href="tel:+15145198177"
                    className="inline-flex items-center gap-2 text-[var(--color-cream)] opacity-50 hover:opacity-90 transition-opacity duration-200"
                    style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                  >
                    <span aria-hidden="true" style={{ color: '#e8762a' }}>↗</span>
                    514-519-8177
                  </a>
                  <a
                    href="mailto:JeremySoares@icloud.com"
                    className="inline-flex items-center gap-2 text-[var(--color-cream)] opacity-50 hover:opacity-90 transition-opacity duration-200"
                    style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                  >
                    <span aria-hidden="true" style={{ color: '#e8762a' }}>↗</span>
                    JeremySoares@icloud.com
                  </a>
                </div>
              </SectionReveal>
            </div>

            <SectionReveal delay={0.15} className="flex-shrink-0 flex flex-col gap-4">
              <Button variant="primary" theme="dark" href={`/${locale}/contact`} size="lg">
                {isFr ? 'Commencer' : 'Get Started'}
              </Button>
              <Button variant="ghost" theme="dark" href={`/${locale}/real-estate`} size="lg">
                {isFr ? 'Voir les propriétés' : 'Browse Properties'}
              </Button>
            </SectionReveal>
          </div>

          {/* OACIQ footnote */}
          <SectionReveal delay={0.3} className="mt-20 pt-10 border-t border-[rgba(236,234,229,0.06)]">
            <p
              className="text-[var(--color-cream)] opacity-20"
              style={{ fontFamily: FONT_DM_SANS, fontSize: '0.75rem', lineHeight: 1.7 }}
            >
              {isFr
                ? "Jeremy Soares est courtier immobilier agréé au Québec, numéro de permis OACIQ H2731. Toutes les transactions immobilières commerciales au Québec sont encadrées par le Code civil du Québec et la Loi sur le courtage immobilier (OACIQ). Les données de marché citées sont fournies à titre indicatif et peuvent varier. Pour les inscriptions actives, consultez "
                : "Jeremy Soares is a licensed real estate broker in Quebec, OACIQ permit number H2731. All commercial real estate transactions in Quebec are governed by the Civil Code of Quebec and the Real Estate Brokerage Act (OACIQ). Market data cited is indicative and subject to change. For active listings, see "}
              <a
                href="https://www.centris.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:opacity-50 transition-opacity"
              >
                Centris.ca
              </a>
              {isFr ? ' et ' : ' and '}
              <a
                href="https://www.realtor.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:opacity-50 transition-opacity"
              >
                Realtor.ca
              </a>
              .
            </p>
          </SectionReveal>
        </Container>
      </Section>
    </>
  )
}
