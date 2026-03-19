import type { Metadata } from 'next'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Label } from '@/components/ui/Label'
import { TextReveal } from '@/components/animation/TextReveal'
import { SectionReveal } from '@/components/animation/SectionReveal'
import { Button } from '@/components/ui/Button'

// ─── Font helpers ──────────────────────────────────────────────────────────────
const FONT_BARLOW  = `var(--font-barlow), 'Barlow', sans-serif`
const FONT_DM_SERIF = `var(--font-dm-serif), 'DM Serif Display', serif`
const FONT_DM_SANS  = `var(--font-dm-sans), 'DM Sans', sans-serif`

// ─── SEO ───────────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale === 'fr-ca'
  const canonical = `https://jeremysoares.com/${locale}/data-center-real-estate-canada`

  const title = isFr
    ? 'Centre de données à vendre Canada | Courtier spécialisé'
    : 'Data Center for Sale Canada | Specialist Broker'

  const description = isFr
    ? "Achat, vente et location de centres de données au Canada. Accès à l'énergie hydroélectrique, climat froid, stabilité politique. Courtier spécialisé — OACIQ H2731."
    : 'Buy, sell or lease data center real estate across Canada. Hydroelectric power, cool climate, political stability. Specialist broker Jeremy Soares — OACIQ H2731.'

  return {
    title,
    description,
    keywords: isFr
      ? [
          'centre de données à vendre Canada',
          'data center immobilier Canada',
          'achat data center Montréal',
          'énergie hydroélectrique centres de données',
          'data center Québec',
          'courtier immobilier commercial data center',
          'infrastructure numérique Canada',
          'data center Calgary Toronto Vancouver',
        ]
      : [
          'data center for sale Canada',
          'data center real estate Canada',
          'buy data center Montreal',
          'data center hydroelectric power Canada',
          'data center Quebec',
          'commercial real estate broker data center',
          'digital infrastructure Canada',
          'data center Calgary Toronto Vancouver',
          'Canadian data center investment',
          'colocation facility for sale Canada',
        ],
    alternates: {
      canonical,
      languages: {
        'en-CA': 'https://jeremysoares.com/en-ca/data-center-real-estate-canada',
        'fr-CA': 'https://jeremysoares.com/fr-ca/data-center-real-estate-canada',
      },
    },
    openGraph: {
      type: 'website',
      url: canonical,
      siteName: 'Jeremy Soares',
      locale: isFr ? 'fr_CA' : 'en_CA',
      title: isFr
        ? 'Centre de données à vendre Canada — Jeremy Soares'
        : 'Data Center for Sale Canada — Jeremy Soares',
      description: isFr
        ? "Achat, vente et location de centres de données au Canada. Énergie hydroélectrique, climat froid, stabilité politique."
        : 'Buy, sell or lease data center properties across Canada. Hydroelectric power, cool climate, political stability.',
      images: [
        {
          url: 'https://jeremysoares.com/images/og/data-center-canada.jpg',
          width: 1200,
          height: 630,
          alt: isFr
            ? 'Centres de données au Canada — Jeremy Soares Courtier'
            : 'Data Center Real Estate Canada — Jeremy Soares Broker',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://jeremysoares.com/images/og/data-center-canada.jpg'],
    },
  }
}

// ─── JSON-LD structured data ───────────────────────────────────────────────────
function DataCenterJsonLd({ locale }: { locale: string }) {
  const isFr = locale === 'fr-ca'
  const baseUrl = 'https://jeremysoares.com'
  const pageUrl = `${baseUrl}/${locale}/data-center-real-estate-canada`

  const agent = {
    '@type': 'RealEstateAgent',
    '@id': `${baseUrl}/#agent`,
    name: 'Jeremy Soares',
    description: isFr
      ? "Courtier immobilier spécialisé dans les actifs d'infrastructure numérique au Canada. OACIQ H2731."
      : 'Real estate broker specializing in digital infrastructure assets across Canada. OACIQ H2731.',
    telephone: '+15145198177',
    email: 'JeremySoares@icloud.com',
    url: baseUrl,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Montreal',
      addressRegion: 'QC',
      addressCountry: 'CA',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Canada',
    },
    sameAs: [
      'https://www.centris.ca/en/brokers~jeremy-soares~H2731',
      'https://www.realtor.ca/agent/2079722/jeremy-soares',
      'https://aimmo.ca',
    ],
  }

  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': pageUrl,
    name: isFr
      ? 'Courtage Immobilier — Centres de données au Canada'
      : 'Real Estate Brokerage — Data Centers in Canada',
    description: isFr
      ? "Accompagnement complet pour l'achat, la vente et la location de centres de données, d'installations de colocation et d'actifs d'infrastructure numérique partout au Canada."
      : 'Full-service representation for buying, selling, and leasing data centers, colocation facilities, and digital infrastructure assets across Canada.',
    url: pageUrl,
    provider: agent,
    areaServed: {
      '@type': 'Country',
      name: 'Canada',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: isFr ? 'Services — Centres de données' : 'Data Center Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: isFr ? 'Acquisition de centres de données' : 'Data Center Acquisition' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: isFr ? 'Vente de centres de données' : 'Data Center Disposition' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: isFr ? 'Location et colocation' : 'Leasing & Colocation' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: isFr ? "Analyse d'investissement" : 'Investment Analysis' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: isFr ? 'Diligence raisonnable' : 'Due Diligence Advisory' } },
      ],
    },
  }

  const faqItems = isFr
    ? [
        {
          question: "Quels sont les avantages du Canada pour héberger un centre de données?",
          answer: "Le Canada offre l'électricité la moins chère d'Amérique du Nord grâce à l'hydroélectricité, un climat naturellement froid qui réduit les coûts de refroidissement, une stabilité politique et juridique, une proximité avec les marchés américains, et une main-d'œuvre technologique hautement qualifiée.",
        },
        {
          question: "Quelles villes canadiennes accueillent les principaux centres de données?",
          answer: "Montréal est la capitale des centres de données au Canada grâce à son électricité hydroélectrique à faible coût et sa connexion aux câbles de fibre transatlantiques. Toronto est le hub financier avec une forte connectivité. Calgary offre de l'énergie abordable et un marché croissant. Vancouver assure la connexion avec les marchés Asie-Pacifique.",
        },
        {
          question: "Qu'est-ce que le PUE et pourquoi est-ce important pour l'évaluation d'un centre de données?",
          answer: "Le PUE (Power Usage Effectiveness) mesure l'efficacité énergétique d'un centre de données. Un PUE de 1.0 est parfait. Les centres de données au Québec atteignent souvent des PUE de 1.2 à 1.3 grâce au free cooling naturel, comparé à 1.5+ dans les régions chaudes. Un PUE plus bas signifie des coûts d'exploitation moindres et une valeur d'actif plus élevée.",
        },
        {
          question: "Comment évaluer la valeur d'un centre de données?",
          answer: "L'évaluation d'un centre de données repose sur plusieurs facteurs : la capacité électrique disponible (MW), la classification Tier (I à IV), le PUE, les accords de colocation en place, la connectivité fibre, les droits fonciers et le potentiel d'expansion. Nous fournissons une analyse complète de ces paramètres avant toute transaction.",
        },
        {
          question: "Jeremy Soares dessert-il les clients en dehors de Montréal?",
          answer: "Oui. Bien que basé à Montréal, nous accompagnons des clients à travers tout le Canada — Montréal, Toronto, Calgary, Vancouver — ainsi que des investisseurs américains et internationaux cherchant à acquérir des actifs d'infrastructure numérique au Canada.",
        },
        {
          question: "Quelle est la différence entre un centre de données Tier I et Tier IV?",
          answer: "Les centres de données sont classifiés de Tier I (infrastructure basique, 99.671% de disponibilité) à Tier IV (infrastructure entièrement redondante, 99.995% de disponibilité). Les actifs Tier III et IV commandent des primes significatives et attirent les locataires institutionnels comme les banques, les opérateurs cloud et les gouvernements.",
        },
        {
          question: "Comment contacter Jeremy Soares pour un projet de centre de données?",
          answer: "Appelez directement au 514-519-8177, écrivez à JeremySoares@icloud.com, ou utilisez le formulaire de contact sur jeremysoares.com/fr-ca/contact. Une première conversation de 15 minutes permet généralement de cadrer votre projet et de définir les prochaines étapes.",
        },
      ]
    : [
        {
          question: 'What are the main advantages of Canada for data center real estate?',
          answer: "Canada offers some of the cheapest electricity in North America thanks to hydroelectric power, a naturally cool climate that dramatically reduces cooling costs and improves PUE ratings, political and legal stability, proximity to US markets with cross-border fiber connectivity, and a highly skilled technical workforce. Quebec's electricity rates are among the lowest on the continent.",
        },
        {
          question: 'Which Canadian cities have the strongest data center markets?',
          answer: 'Montreal is Canada\'s data center capital — low-cost hydroelectric power, transatlantic fiber cable landing points, and a growing tech ecosystem. Toronto is the financial hub with highest tenant demand. Calgary offers affordable energy and a growing market driven by oil & gas sector digital transformation. Vancouver connects to Asia-Pacific markets via submarine cable networks.',
        },
        {
          question: 'What is PUE and why does it matter for data center valuation?',
          answer: "Power Usage Effectiveness (PUE) measures a data center's energy efficiency. A perfect PUE is 1.0. Quebec data centers routinely achieve PUE of 1.2–1.3 through natural free cooling — compared to 1.5+ in warm-climate regions. Lower PUE means lower operating costs, which directly improves NOI and asset valuation multiples.",
        },
        {
          question: 'How is a data center property valued differently from standard commercial real estate?',
          answer: 'Data centers are valued primarily on power capacity (available MW), Tier classification (I–IV), existing colocation agreements (NOI from tenants), fiber connectivity (number of carriers, latency to key markets), PUE efficiency, and land rights for expansion. We analyze all these technical and financial parameters as part of every engagement.',
        },
        {
          question: 'Does Jeremy Soares serve clients outside of Montreal?',
          answer: 'Yes. While headquartered in Montreal, we work with clients across Canada — Montreal, Toronto, Calgary, Vancouver — as well as American and international investors seeking to acquire or disposition digital infrastructure assets in Canada. Cross-border mandates are a core part of the practice.',
        },
        {
          question: 'What is the difference between a Tier I and Tier IV data center?',
          answer: 'Data centers are classified Tier I (basic infrastructure, 99.671% uptime) through Tier IV (fully fault-tolerant, 99.995% uptime). Tier III and IV assets command significant valuation premiums and attract institutional tenants — banks, cloud operators, government agencies. Tier classification is one of the first due diligence filters applied in any acquisition analysis.',
        },
        {
          question: 'How do I get started with Jeremy Soares on a data center transaction?',
          answer: 'Call 514-519-8177 directly, email JeremySoares@icloud.com, or use the contact form at jeremysoares.com/en-ca/contact. A 15-minute conversation is typically enough to scope the mandate — whether you are buying, selling, or exploring a lease — and outline the next steps.',
        },
      ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default async function DataCenterRealEstateCanadaPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr-ca'

  // ── Data ─────────────────────────────────────────────────────────────────────

  const keyMarkets = isFr
    ? [
        {
          number: '01',
          city: 'Montréal',
          tag: 'Québec',
          headline: "La capitale canadienne des centres de données.",
          body: "L'électricité hydroélectrique d'Hydro-Québec est parmi les moins chères en Amérique du Nord. Le climat froid réduit les coûts de refroidissement à des niveaux imbattables. Les câbles de fibre transatlantiques atterrissent à proximité. Un pôle croissant d'IA et de technologie crée une demande institutionnelle soutenue.",
          stats: [
            { label: "Électricité (¢/kWh)", value: "~4¢" },
            { label: "PUE moyen", value: "1.2–1.3" },
          ],
        },
        {
          number: '02',
          city: 'Toronto',
          tag: 'Ontario',
          headline: "Le hub financier et de colocation.",
          body: "Toronto concentre la demande institutionnelle la plus forte du Canada — banques, assureurs, opérateurs cloud régionaux. Les marchés de colocation sont matures, les occupancies élevées. Le marché d'acquisition est compétitif mais offre des rendements stables pour les détenteurs à long terme.",
          stats: [
            { label: "Marché colocation", value: "Mature" },
            { label: "Occupancy", value: ">90%" },
          ],
        },
        {
          number: '03',
          city: 'Calgary',
          tag: 'Alberta',
          headline: "Énergie abordable. Marché en croissance.",
          body: "Portée par la transformation numérique du secteur pétrolier et gazier, Calgary voit émerger une nouvelle génération de centres de données à haute capacité énergétique. L'énergie y est abordable, le foncier disponible, et la demande institutionnelle en hausse.",
          stats: [
            { label: "Croissance annuelle", value: "~18%" },
            { label: "Énergie", value: "Abordable" },
          ],
        },
        {
          number: '04',
          city: 'Vancouver',
          tag: 'Colombie-Britannique',
          headline: "La porte d'entrée vers l'Asie-Pacifique.",
          body: "Vancouver est reliée aux marchés d'Asie-Pacifique par des réseaux de câbles sous-marins stratégiques. La demande de latence faible vers Tokyo, Seoul et Hong Kong génère un intérêt croissant de la part des opérateurs asiatiques. Marché premium avec contraintes foncières.",
          stats: [
            { label: "Connexions câbles", value: "Trans-Pacifique" },
            { label: "Marché", value: "Premium" },
          ],
        },
      ]
    : [
        {
          number: '01',
          city: 'Montreal',
          tag: 'Quebec',
          headline: "Canada's data center capital.",
          body: "Hydro-Québec electricity is among the cheapest in North America — routinely under 4¢/kWh. The cold climate enables free cooling for a significant portion of the year, pushing PUE ratings to 1.2–1.3. Transatlantic fiber landing points sit within reach. A growing AI and tech ecosystem sustains institutional demand.",
          stats: [
            { label: "Power rate (¢/kWh)", value: "~4¢" },
            { label: "Avg PUE", value: "1.2–1.3" },
          ],
        },
        {
          number: '02',
          city: 'Toronto',
          tag: 'Ontario',
          headline: "The financial and colocation hub.",
          body: "Toronto concentrates Canada's strongest institutional demand — banks, insurers, regional cloud operators. Colocation markets are mature with occupancy consistently above 90%. The acquisition market is competitive, but long-hold fundamentals remain strong driven by sustained enterprise demand.",
          stats: [
            { label: "Colo market", value: "Mature" },
            { label: "Occupancy", value: ">90%" },
          ],
        },
        {
          number: '03',
          city: 'Calgary',
          tag: 'Alberta',
          headline: "Affordable energy. Growing market.",
          body: "Driven by the oil & gas sector's digital transformation, Calgary is seeing a new generation of high-capacity data center developments. Energy is affordable, land is available, and institutional demand is accelerating. One of the fastest-growing data center markets in the country.",
          stats: [
            { label: "Annual growth", value: "~18%" },
            { label: "Energy cost", value: "Competitive" },
          ],
        },
        {
          number: '04',
          city: 'Vancouver',
          tag: 'British Columbia',
          headline: "The Asia-Pacific gateway.",
          body: "Vancouver connects North American data center operators to Asia-Pacific markets via strategic submarine cable networks. Low-latency demand from Tokyo, Seoul, and Hong Kong is generating growing interest from Asian hyperscalers and colocation operators. A premium market with significant land constraints.",
          stats: [
            { label: "Cable connections", value: "Trans-Pacific" },
            { label: "Market tier", value: "Premium" },
          ],
        },
      ]

  const services = isFr
    ? [
        {
          number: '01',
          title: 'Acquisition',
          tag: 'Achat',
          description: "Identification d'actifs hors marché et sur marché — centres de données en exploitation, terrains avec accès électrique haute capacité, immeubles industriels convertibles. Analyse technique complète (MW disponibles, Tier, PUE, fibre) avant toute offre.",
        },
        {
          number: '02',
          title: 'Cession',
          tag: 'Vente',
          description: "Positionnement et mise en marché d'actifs de centres de données auprès d'acquéreurs institutionnels, de fonds d'infrastructure et d'opérateurs stratégiques. Confidentialité garantie. Accès à un réseau d'acheteurs pré-qualifiés.",
        },
        {
          number: '03',
          title: 'Location & Colocation',
          tag: 'Bail',
          description: "Structuration des baux pour locataires ancrés (banques, gouvernement, cloud) et opérateurs de colocation. Négociation des conditions — SLA, redondance, capacité réservée — alignée sur vos objectifs d'exploitation.",
        },
        {
          number: '04',
          title: "Analyse d'investissement",
          tag: 'Investissement',
          description: "Modélisation du rendement sur actifs d'infrastructure numérique : NOI, cap rate, TRI sur 10 ans, analyse de sensibilité au prix de l'énergie. Utilisation des calculateurs tools.jeremysoares.com pour des projections précises.",
        },
        {
          number: '05',
          title: 'Diligence raisonnable',
          tag: 'Due Diligence',
          description: "Vérification technique et commerciale avant acquisition : capacité électrique réelle, état de l'infrastructure, contrats existants, conformité réglementaire, risques environnementaux. Coordination avec avocats et experts techniques.",
        },
      ]
    : [
        {
          number: '01',
          title: 'Acquisition',
          tag: 'Buy Side',
          description: "Identification of on-market and off-market assets — operating data centers, high-capacity power-served land, convertible industrial buildings. Full technical analysis (available MW, Tier classification, PUE, fiber connectivity) before any offer is structured.",
        },
        {
          number: '02',
          title: 'Disposition',
          tag: 'Sell Side',
          description: "Positioning and marketing of data center assets to institutional acquirers, infrastructure funds, and strategic operators. Confidentiality maintained throughout. Access to a qualified buyer network that does not exist on public listing platforms.",
        },
        {
          number: '03',
          title: 'Leasing & Colocation',
          tag: 'Leasing',
          description: "Lease structuring for anchor tenants (banks, government, cloud operators) and colocation operators. Negotiation of terms — SLA, redundancy, reserved capacity — aligned to your operational requirements and investment thesis.",
        },
        {
          number: '04',
          title: 'Investment Analysis',
          tag: 'Investment',
          description: "Return modeling on digital infrastructure assets: NOI, cap rate, 10-year IRR, energy price sensitivity analysis. Integrated with tools.jeremysoares.com calculators for precise underwriting of power costs, operating expenses, and exit assumptions.",
        },
        {
          number: '05',
          title: 'Due Diligence Advisory',
          tag: 'Due Diligence',
          description: "Technical and commercial verification before acquisition: actual power capacity, infrastructure condition, existing contracts, regulatory compliance, environmental risk. Coordinated with legal counsel and technical specialists as required.",
        },
      ]

  const faqItems = isFr
    ? [
        {
          q: "Quels sont les avantages du Canada pour héberger un centre de données?",
          a: "Le Canada offre l'électricité la moins chère d'Amérique du Nord grâce à l'hydroélectricité, un climat naturellement froid qui réduit les coûts de refroidissement, une stabilité politique et juridique, une proximité avec les marchés américains et une main-d'œuvre technologique hautement qualifiée. Le Québec affiche des tarifs parmi les plus bas du continent.",
        },
        {
          q: "Quelles villes canadiennes accueillent les principaux centres de données?",
          a: "Montréal est la capitale des centres de données au Canada grâce à son électricité hydroélectrique à faible coût. Toronto est le hub financier avec une forte demande institutionnelle. Calgary affiche une croissance rapide portée par la transformation numérique du secteur énergétique. Vancouver assure la connexion avec les marchés Asie-Pacifique.",
        },
        {
          q: "Qu'est-ce que le PUE et pourquoi est-ce important pour l'évaluation?",
          a: "Le PUE (Power Usage Effectiveness) mesure l'efficacité énergétique d'un centre de données. Un PUE de 1.0 est parfait. Les centres de données au Québec atteignent souvent des PUE de 1.2 à 1.3 grâce au free cooling naturel, contre 1.5+ dans les régions chaudes. Un PUE plus bas signifie des coûts d'exploitation moindres et une valeur d'actif plus élevée.",
        },
        {
          q: "Comment évaluer la valeur d'un centre de données?",
          a: "L'évaluation repose sur la capacité électrique (MW), la classification Tier (I à IV), les accords de colocation en place, la connectivité fibre, le PUE, les droits fonciers et le potentiel d'expansion. Nous analysons l'ensemble de ces paramètres techniques et financiers avant chaque transaction.",
        },
        {
          q: "Quelle est la différence entre Tier I et Tier IV?",
          a: "Les centres de données sont classifiés de Tier I (infrastructure basique, 99.671% de disponibilité) à Tier IV (infrastructure entièrement redondante, 99.995% de disponibilité). Les actifs Tier III et IV commandent des primes significatives et attirent des locataires institutionnels — banques, opérateurs cloud, gouvernements.",
        },
        {
          q: "Jeremy Soares dessert-il les clients en dehors de Montréal?",
          a: "Oui. Bien que basé à Montréal, nous accompagnons des clients partout au Canada — Montréal, Toronto, Calgary, Vancouver — ainsi que des investisseurs américains et internationaux. Les mandats transfrontaliers font partie intégrante de notre pratique.",
        },
        {
          q: "Comment contacter Jeremy Soares pour un projet de centre de données?",
          a: "Appelez directement au 514-519-8177, écrivez à JeremySoares@icloud.com, ou utilisez le formulaire de contact. Une première conversation de 15 minutes permet de cadrer votre projet et de définir les prochaines étapes.",
        },
      ]
    : [
        {
          q: 'What are the main advantages of Canada for data center real estate?',
          a: "Canada offers some of the cheapest electricity in North America through hydroelectric generation, a naturally cool climate that dramatically reduces cooling costs and improves PUE, political and legal stability, proximity to US markets with cross-border fiber, and a highly skilled technical workforce. Quebec's electricity rates are among the lowest on the continent.",
        },
        {
          q: 'Which Canadian cities have the strongest data center markets?',
          a: "Montreal is Canada's data center capital — low-cost hydroelectric power, transatlantic fiber landing points, and a growing AI ecosystem. Toronto is the financial hub with the highest institutional tenant demand. Calgary is one of the fastest-growing markets driven by energy sector digitization. Vancouver connects to Asia-Pacific via submarine cable networks.",
        },
        {
          q: 'What is PUE and why does it matter for data center valuation?',
          a: "Power Usage Effectiveness (PUE) measures energy efficiency. A perfect PUE is 1.0. Quebec data centers routinely achieve 1.2–1.3 through natural free cooling, versus 1.5+ in warm-climate regions. Lower PUE means lower operating costs, which directly improves NOI and asset valuation multiples — a critical underwriting input.",
        },
        {
          q: 'How is a data center valued differently from standard commercial real estate?',
          a: 'Data centers are valued primarily on power capacity (available MW), Tier classification (I–IV), existing colocation agreements (NOI from tenants), fiber connectivity (carriers, latency), PUE efficiency, and land rights for expansion. We analyze all technical and financial parameters as part of every engagement, not just comparable sales.',
        },
        {
          q: 'What is the difference between a Tier I and Tier IV data center?',
          a: 'Tier I provides basic infrastructure with 99.671% uptime. Tier IV is fully fault-tolerant with 99.995% uptime. Tier III and IV assets command significant valuation premiums and attract institutional tenants — banks, cloud operators, government agencies. Tier classification is one of the first due diligence filters in any acquisition analysis.',
        },
        {
          q: 'Does Jeremy Soares serve clients outside of Montreal?',
          a: 'Yes. While headquartered in Montreal, we work with clients across Canada — Montreal, Toronto, Calgary, Vancouver — as well as American and international investors seeking to acquire or disposition digital infrastructure assets in Canada. Cross-border mandates are a core part of the practice.',
        },
        {
          q: 'How do I get started on a data center transaction?',
          a: 'Call 514-519-8177 directly, email JeremySoares@icloud.com, or use the contact form. A 15-minute conversation is typically enough to scope the mandate — whether buying, selling, or exploring a lease — and define the next steps.',
        },
      ]

  return (
    <>
      <DataCenterJsonLd locale={locale} />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <Section theme="void" className="pt-32 pb-20 md:pt-44 md:pb-28" height="tall">
        <Container size="lg">
          <Label className="mb-8">
            {isFr ? '(Infrastructure Numérique)' : '(Digital Infrastructure)'}
          </Label>

          {/* H1 — Barlow 900 */}
          <div
            style={{
              fontFamily: FONT_BARLOW,
              fontWeight: 900,
              fontSize: 'clamp(3.5rem, 9.5vw, 8.5rem)',
              letterSpacing: '-0.025em',
            }}
          >
            <TextReveal
              as="h1"
              split="lines"
              immediate
              delay={0.1}
              className="leading-none uppercase text-[var(--color-cream)]"
            >
              {isFr ? 'Centres de\nDonnées Canada' : 'Data Center\nReal Estate\nCanada'}
            </TextReveal>
          </div>

          {/* Decorative italic line — DM Serif Display */}
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
                ? "Achat, vente, location — l'expertise rare qu'exigent ces actifs."
                : 'Acquisition, disposition, leasing — the specialized expertise these assets demand.'}
            </p>
          </SectionReveal>

          {/* Body descriptor */}
          <SectionReveal delay={0.55} className="mt-4 max-w-xl">
            <p
              className="leading-relaxed text-[var(--color-cream)] opacity-45"
              style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
            >
              {isFr
                ? "Jeremy Soares est l'un des seuls courtiers immobiliers au Canada à se spécialiser dans les actifs d'infrastructure numérique — centres de données, installations de colocation et terrains haute tension. OACIQ H2731."
                : "Jeremy Soares is one of Canada's only real estate brokers specializing in digital infrastructure assets — data centers, colocation facilities, and high-capacity power-served land. OACIQ H2731."}
            </p>
          </SectionReveal>

          {/* CTA row */}
          <SectionReveal delay={0.7} className="mt-10 flex flex-wrap gap-4">
            <Button variant="primary" theme="dark" href={`/${locale}/contact`} size="lg">
              {isFr ? 'Discutons de votre projet' : 'Discuss Your Project'}
            </Button>
            <Button variant="ghost" theme="dark" href={`/${locale}/tools`} size="lg">
              {isFr ? 'Outils financiers' : 'Financial Tools'}
            </Button>
          </SectionReveal>
        </Container>
      </Section>

      {/* ── Market Overview — cream ───────────────────────────────────────────── */}
      <Section theme="cream" className="py-24 md:py-36 relative overflow-hidden">
        <div
          className="wipe pointer-events-none absolute inset-0 bg-[var(--color-cream)] z-10"
          aria-hidden="true"
          style={{ transformOrigin: 'top' }}
        />
        <Container size="lg">
          <Label className="mb-10">
            {isFr ? '(Aperçu du marché)' : '(Market Overview)'}
          </Label>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
            {/* Left: H2 */}
            <div className="md:col-span-5">
              <div
                style={{
                  fontFamily: FONT_BARLOW,
                  fontWeight: 900,
                  fontSize: 'clamp(2.2rem, 5vw, 4.25rem)',
                  letterSpacing: '-0.02em',
                }}
              >
                <TextReveal
                  as="h2"
                  split="words"
                  className="leading-none uppercase text-[var(--color-void)]"
                >
                  {isFr
                    ? 'Un marché en explosion. Presque personne ne le couvre.'
                    : 'A market exploding. Almost no one covers it.'}
                </TextReveal>
              </div>
            </div>

            {/* Right: body copy */}
            <div className="md:col-span-7 space-y-6">
              <SectionReveal delay={0.15}>
                <p
                  className="text-[var(--color-void)] opacity-60 leading-relaxed"
                  style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                >
                  {isFr
                    ? "Le marché canadien des centres de données devrait dépasser 10 milliards de dollars d'ici 2028, porté par l'IA générative, l'informatique en nuage et la souveraineté des données. Pourtant, la quasi-totalité des transactions immobilières dans ce secteur passent par des groupes institutionnels — CBRE, JLL, WiredRE — qui servent exclusivement les hypercalouers et les fonds d'infrastructure."
                    : "Canada's data center market is projected to exceed $10 billion by 2028, driven by generative AI compute demand, cloud migration, and data sovereignty requirements. Yet virtually all real estate transaction activity in this sector runs through institutional groups — CBRE, JLL, WiredRE — serving only hyperscalers and infrastructure funds."}
                </p>
              </SectionReveal>

              <SectionReveal delay={0.25}>
                <p
                  className="text-[var(--color-void)] opacity-60 leading-relaxed"
                  style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                >
                  {isFr
                    ? "Le segment intermédiaire — centres de données de 2 à 50 MW, installations régionales, actifs de colocation à vendre — est largement sous-servi. C'est précisément là qu'intervient Jeremy Soares. Capacité institutionnelle. Service personnalisé. Accès aux deux marchés."
                    : "The mid-market — 2 to 50 MW facilities, regional data centers, colocation assets for sale or lease — is chronically underserved. That is exactly where Jeremy Soares operates. Institutional-grade capability. Direct broker access. Coverage across both markets."}
                </p>
              </SectionReveal>

              {/* Market stats band */}
              <SectionReveal delay={0.35}>
                <div
                  className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t"
                  style={{ borderColor: 'rgba(14,16,17,0.1)' }}
                >
                  {[
                    { value: '$10B+', label: isFr ? 'Marché 2028' : 'Market by 2028' },
                    { value: '~4¢', label: isFr ? 'kWh Montréal' : 'kWh Montreal' },
                    { value: '1.2–1.3', label: isFr ? 'PUE Québec moy.' : 'Avg QC PUE' },
                    { value: '18%', label: isFr ? 'Croissance ann.' : 'Annual growth' },
                  ].map((stat) => (
                    <div key={stat.value}>
                      <p
                        className="text-[var(--color-void)] leading-none mb-1"
                        style={{
                          fontFamily: FONT_BARLOW,
                          fontWeight: 900,
                          fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {stat.value}
                      </p>
                      <p
                        className="text-[var(--color-void)] opacity-40 uppercase"
                        style={{
                          fontFamily: FONT_DM_SANS,
                          fontSize: '10px',
                          letterSpacing: '0.18em',
                        }}
                      >
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </SectionReveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Why Canada — void ─────────────────────────────────────────────────── */}
      <Section theme="void" className="py-24 md:py-36">
        <Container size="lg">
          <Label className="mb-10">
            {isFr ? '(Pourquoi le Canada)' : '(Why Canada)'}
          </Label>

          <div
            className="mb-16"
            style={{
              fontFamily: FONT_BARLOW,
              fontWeight: 900,
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              letterSpacing: '-0.02em',
            }}
          >
            <TextReveal
              as="h2"
              split="words"
              className="leading-none uppercase text-[var(--color-cream)]"
            >
              {isFr
                ? "L'avantage structurel canadien"
                : "Canada's structural advantage"}
            </TextReveal>
          </div>

          {/* Advantage grid */}
          <div
            className="border-t"
            style={{ borderColor: 'rgba(236,234,229,0.08)' }}
          >
            {(isFr
              ? [
                  {
                    number: '01',
                    headline: "Énergie hydroélectrique. La moins chère en Amérique du Nord.",
                    body: "Le Québec produit plus de 95% de son électricité à partir d'énergie hydroélectrique renouvelable. Les tarifs industriels d'Hydro-Québec se situent autour de 4¢/kWh — comparés à 8–14¢/kWh aux États-Unis. Pour un centre de données consommant 10 MW, cela représente une économie de plusieurs millions de dollars par an.",
                  },
                  {
                    number: '02',
                    headline: "Climat froid. Free cooling naturel.",
                    body: "Le Canada dispose d'un avantage climatique massif pour le refroidissement des centres de données. Les températures extérieures froides permettent d'utiliser le free cooling naturel pendant la majeure partie de l'année, réduisant la consommation des systèmes de refroidissement mécaniques et améliorant le PUE à des niveaux que les régions chaudes ne peuvent pas atteindre.",
                  },
                  {
                    number: '03',
                    headline: "Stabilité politique et juridique.",
                    body: "Le Canada offre un cadre juridique prévisible, une protection des droits de propriété robuste et une stabilité politique que peu de marchés mondiaux peuvent égaler. Pour les investisseurs en infrastructure à long terme, cette stabilité se traduit directement en prime de valorisation et en coût du capital réduit.",
                  },
                  {
                    number: '04',
                    headline: "Proximité des marchés américains.",
                    body: "Les principaux marchés canadiens — Montréal, Toronto — sont connectés aux marchés américains (New York, Boston, Chicago) par des réseaux de fibre à très faible latence. Les opérateurs peuvent servir des clients américains depuis des infrastructures canadiennes, bénéficiant des avantages de coût sans compromis sur la performance.",
                  },
                  {
                    number: '05',
                    headline: "Souveraineté des données. Un argument croissant.",
                    body: "La réglementation sur la souveraineté des données pousse de nombreuses organisations à localiser leurs infrastructures au Canada plutôt qu'aux États-Unis — tout en maintenant une faible latence vers les marchés nord-américains. La Loi 25 au Québec et les cadres fédéraux renforcent cette tendance.",
                  },
                ]
              : [
                  {
                    number: '01',
                    headline: "Hydroelectric power. Cheapest in North America.",
                    body: "Quebec generates over 95% of its electricity from renewable hydroelectric sources. Hydro-Québec industrial rates run approximately 4¢/kWh — compared to 8–14¢/kWh across most US markets. For a 10 MW data center, that differential represents millions of dollars in annual operating savings that flow directly to NOI.",
                  },
                  {
                    number: '02',
                    headline: "Cold climate. Natural free cooling.",
                    body: "Canada holds a massive climatic advantage for data center cooling. Cold ambient temperatures enable natural free cooling for the majority of the year, dramatically reducing mechanical cooling system consumption and improving PUE to levels warm-climate markets cannot replicate at scale.",
                  },
                  {
                    number: '03',
                    headline: "Political and legal stability.",
                    body: "Canada offers a predictable legal framework, robust property rights protections, and political stability that few global markets can match. For long-duration infrastructure investors, this stability translates directly into valuation premiums and reduced cost of capital compared to emerging markets.",
                  },
                  {
                    number: '04',
                    headline: "Proximity to US markets.",
                    body: "Montreal and Toronto are connected to New York, Boston, and Chicago via ultra-low-latency fiber networks. Operators can serve US clients from Canadian infrastructure — capturing cost advantages without compromising performance. Cross-border fiber routes are mature, redundant, and expanding.",
                  },
                  {
                    number: '05',
                    headline: "Data sovereignty. A growing argument.",
                    body: "Data sovereignty regulation is pushing organizations to locate infrastructure in Canada rather than the US — while maintaining low latency to North American markets. Quebec's Law 25 and federal privacy frameworks are strengthening this trend, creating durable demand from regulated sectors: finance, healthcare, government.",
                  },
                ]
            ).map((item, i) => (
              <SectionReveal key={item.number} delay={i * 0.07}>
                <div
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 py-10 border-b"
                  style={{ borderColor: 'rgba(236,234,229,0.08)' }}
                >
                  <div className="md:col-span-1 flex items-start pt-1">
                    <span
                      className="uppercase text-[var(--color-cream)] opacity-25"
                      style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em' }}
                    >
                      {item.number}
                    </span>
                  </div>
                  <div className="md:col-span-4">
                    <h3
                      className="text-[var(--color-cream)] leading-tight"
                      style={{
                        fontFamily: FONT_DM_SERIF,
                        fontStyle: 'italic',
                        fontSize: 'clamp(1rem, 1.7vw, 1.35rem)',
                      }}
                    >
                      {item.headline}
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

      {/* ── Services Offered — cream ──────────────────────────────────────────── */}
      <Section theme="cream" className="py-0 relative overflow-hidden">
        <div
          className="wipe pointer-events-none absolute inset-0 bg-[var(--color-cream)] z-10"
          aria-hidden="true"
          style={{ transformOrigin: 'top' }}
        />
        <Container size="lg">
          <div className="pt-24 md:pt-32 pb-4">
            <Label className="mb-10">
              {isFr ? '(Services)' : '(Services Offered)'}
            </Label>
            <div
              style={{
                fontFamily: FONT_BARLOW,
                fontWeight: 900,
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                letterSpacing: '-0.02em',
              }}
            >
              <TextReveal
                as="h2"
                split="words"
                className="leading-none uppercase text-[var(--color-void)]"
              >
                {isFr ? "Ce que nous faisons" : 'What we do'}
              </TextReveal>
            </div>
          </div>

          <div
            className="border-t mt-12"
            style={{ borderColor: 'rgba(14,16,17,0.1)' }}
          >
            {services.map((s, i) => (
              <SectionReveal key={s.number} delay={i * 0.06}>
                <div
                  className="group py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 border-b transition-all duration-300"
                  style={{ borderColor: 'rgba(14,16,17,0.1)' }}
                >
                  {/* Number */}
                  <div className="md:col-span-1 flex items-start pt-1">
                    <span
                      className="uppercase text-[var(--color-void)] opacity-25"
                      style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em' }}
                    >
                      {s.number}
                    </span>
                  </div>

                  {/* Title + tag */}
                  <div className="md:col-span-4">
                    <span
                      className="block mb-2 uppercase text-[var(--color-void)] opacity-30"
                      style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em' }}
                    >
                      {s.tag}
                    </span>
                    <h3
                      className="leading-tight uppercase text-[var(--color-void)]"
                      style={{
                        fontFamily: FONT_BARLOW,
                        fontWeight: 900,
                        fontSize: 'clamp(1.5rem, 3vw, 2.75rem)',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {s.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-7">
                    <p
                      className="text-[var(--color-void)] opacity-55 leading-relaxed"
                      style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                    >
                      {s.description}
                    </p>
                    {/* Internal link to tools */}
                    {i === 3 && (
                      <a
                        href={`/${locale}/tools`}
                        className="inline-flex items-center gap-1.5 mt-4 uppercase text-[var(--color-void)] opacity-40 hover:opacity-80 transition-opacity duration-200"
                        style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.18em', fontWeight: 500 }}
                      >
                        {isFr ? 'Accéder aux outils financiers' : 'Access financial tools'}
                        <span aria-hidden="true" className="text-[0.6rem]">→</span>
                      </a>
                    )}
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          <div className="pb-24 md:pb-32" />
        </Container>
      </Section>

      {/* ── Key Markets — void ────────────────────────────────────────────────── */}
      <Section theme="void" className="py-24 md:py-36">
        <Container size="lg">
          <Label className="mb-10">
            {isFr ? '(Marchés clés)' : '(Key Markets)'}
          </Label>

          <div
            className="mb-16"
            style={{
              fontFamily: FONT_BARLOW,
              fontWeight: 900,
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              letterSpacing: '-0.02em',
            }}
          >
            <TextReveal
              as="h2"
              split="words"
              className="leading-none uppercase text-[var(--color-cream)]"
            >
              {isFr ? 'Montréal. Toronto. Calgary. Vancouver.' : 'Montreal. Toronto. Calgary. Vancouver.'}
            </TextReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[rgba(236,234,229,0.06)]">
            {keyMarkets.map((market, i) => (
              <SectionReveal key={market.number} delay={i * 0.08}>
                <div className="bg-[#0e1011] p-8 md:p-10 h-full">
                  {/* City header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <span
                        className="block mb-1 uppercase text-[var(--color-cream)] opacity-25"
                        style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em' }}
                      >
                        {market.number} — {market.tag}
                      </span>
                      <h3
                        className="leading-none uppercase text-[var(--color-cream)]"
                        style={{
                          fontFamily: FONT_BARLOW,
                          fontWeight: 900,
                          fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {market.city}
                      </h3>
                    </div>
                  </div>

                  {/* Headline */}
                  <p
                    className="text-[var(--color-cream)] opacity-70 mb-4 leading-snug"
                    style={{
                      fontFamily: FONT_DM_SERIF,
                      fontStyle: 'italic',
                      fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)',
                    }}
                  >
                    {market.headline}
                  </p>

                  {/* Body */}
                  <p
                    className="text-[var(--color-cream)] opacity-40 leading-relaxed mb-8"
                    style={{ fontFamily: FONT_DM_SANS, fontSize: '0.875rem' }}
                  >
                    {market.body}
                  </p>

                  {/* Stats */}
                  <div
                    className="flex gap-8 pt-6 border-t"
                    style={{ borderColor: 'rgba(236,234,229,0.08)' }}
                  >
                    {market.stats.map((stat) => (
                      <div key={stat.label}>
                        <p
                          className="text-[var(--color-cream)] leading-none mb-1"
                          style={{
                            fontFamily: FONT_BARLOW,
                            fontWeight: 900,
                            fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                            letterSpacing: '-0.01em',
                          }}
                        >
                          {stat.value}
                        </p>
                        <p
                          className="text-[var(--color-cream)] opacity-30 uppercase"
                          style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.18em' }}
                        >
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Investment Analysis — cream ───────────────────────────────────────── */}
      <Section theme="cream" className="py-24 md:py-36 relative overflow-hidden">
        <div
          className="wipe pointer-events-none absolute inset-0 bg-[var(--color-cream)] z-10"
          aria-hidden="true"
          style={{ transformOrigin: 'top' }}
        />
        <Container size="lg">
          <Label className="mb-10">
            {isFr ? "(Analyse d'investissement)" : '(Investment Analysis)'}
          </Label>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
            <div className="md:col-span-5">
              <div
                style={{
                  fontFamily: FONT_BARLOW,
                  fontWeight: 900,
                  fontSize: 'clamp(2.2rem, 5vw, 4.25rem)',
                  letterSpacing: '-0.02em',
                }}
              >
                <TextReveal
                  as="h2"
                  split="words"
                  className="leading-none uppercase text-[var(--color-void)]"
                >
                  {isFr ? 'Modéliser avant de signer.' : 'Model before you sign.'}
                </TextReveal>
              </div>

              <SectionReveal delay={0.25} className="mt-8">
                <a
                  href={`/${locale}/tools`}
                  className="inline-flex items-center gap-2 uppercase text-[var(--color-void)] opacity-50 hover:opacity-90 transition-opacity duration-200"
                  style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.2em', fontWeight: 500 }}
                >
                  {isFr ? 'Outils financiers →' : 'Financial tools →'}
                </a>
              </SectionReveal>
            </div>

            <div className="md:col-span-7 space-y-6">
              <SectionReveal delay={0.15}>
                <p
                  className="text-[var(--color-void)] opacity-60 leading-relaxed"
                  style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                >
                  {isFr
                    ? "Les centres de données sont des actifs complexes dont la valorisation va bien au-delà du prix au mètre carré. La capacité électrique disponible (MW), la classification Tier, le PUE, les contrats de colocation en place et la connectivité fibre déterminent la valeur réelle — et potentiellement l'écart considérable entre prix demandé et valeur fondamentale."
                    : "Data centers are complex assets whose valuation extends far beyond price per square foot. Available power capacity (MW), Tier classification, PUE efficiency, existing colocation contracts, and fiber connectivity collectively determine real value — and potentially a significant gap between asking price and fundamental value."}
                </p>
              </SectionReveal>

              <SectionReveal delay={0.25}>
                <p
                  className="text-[var(--color-void)] opacity-60 leading-relaxed"
                  style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                >
                  {isFr
                    ? "Notre approche intègre la modélisation financière complète — NOI, taux de capitalisation, TRI sur 10 ans, analyse de sensibilité au prix de l'énergie — avec les calculateurs disponibles sur tools.jeremysoares.com. Chaque acquisition est soumise à une analyse rigoureuse avant que toute offre soit déposée."
                    : "Our approach integrates full financial modeling — NOI, cap rate, 10-year IRR, energy price sensitivity analysis — with the calculators available at tools.jeremysoares.com. Every acquisition is subjected to rigorous underwriting before any offer is structured."}
                </p>
              </SectionReveal>

              {/* Underwriting checklist */}
              <SectionReveal delay={0.35}>
                <div
                  className="mt-8 pt-8 border-t space-y-4"
                  style={{ borderColor: 'rgba(14,16,17,0.1)' }}
                >
                  <p
                    className="uppercase text-[var(--color-void)] opacity-35 mb-6"
                    style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em' }}
                  >
                    {isFr ? 'Paramètres analysés' : 'Underwriting parameters'}
                  </p>
                  {(isFr
                    ? [
                        'Capacité électrique disponible (MW)',
                        'Classification Tier (I–IV) et infrastructure de redondance',
                        'PUE actuel et potentiel d\'amélioration',
                        'Contrats de colocation — durée, taux, escalade',
                        'Connectivité fibre (nombre de porteurs, latence)',
                        'Droits fonciers et capacité d\'expansion',
                        'Conformité réglementaire et risques environnementaux',
                      ]
                    : [
                        'Available power capacity (MW)',
                        'Tier classification (I–IV) and redundancy infrastructure',
                        'Current PUE and improvement potential',
                        'Colocation contracts — term, rate, escalation',
                        'Fiber connectivity (carrier count, latency to key markets)',
                        'Land rights and expansion capacity',
                        'Regulatory compliance and environmental risk',
                      ]
                  ).map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 py-3 border-b"
                      style={{ borderColor: 'rgba(14,16,17,0.07)' }}
                    >
                      <span
                        className="text-[var(--color-void)] mt-0.5 flex-shrink-0"
                        aria-hidden="true"
                        style={{ color: '#e8762a', fontSize: '0.65rem' }}
                      >
                        ◆
                      </span>
                      <p
                        className="text-[var(--color-void)] opacity-60 leading-relaxed"
                        style={{ fontFamily: FONT_DM_SANS, fontSize: '0.875rem' }}
                      >
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </SectionReveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Differentiation — void ────────────────────────────────────────────── */}
      <Section theme="void" className="py-24 md:py-32">
        <Container size="lg">
          <Label className="mb-10">
            {isFr ? '(Positionnement)' : '(Positioning)'}
          </Label>

          <div
            className="mb-16"
            style={{
              fontFamily: FONT_BARLOW,
              fontWeight: 900,
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              letterSpacing: '-0.02em',
            }}
          >
            <TextReveal
              as="h2"
              split="words"
              className="leading-none uppercase text-[var(--color-cream)]"
            >
              {isFr
                ? "CBRE et JLL ne vous rappelleront pas."
                : "CBRE and JLL won't call you back."}
            </TextReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[rgba(236,234,229,0.06)]">
            {/* Institutional group */}
            <SectionReveal>
              <div className="bg-[#0e1011] p-8 md:p-10 h-full border border-[rgba(236,234,229,0.06)]">
                <p
                  className="uppercase text-[var(--color-cream)] opacity-25 mb-6"
                  style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em' }}
                >
                  {isFr ? 'Groupes institutionnels' : 'Institutional groups'}
                </p>
                <p
                  className="text-[var(--color-cream)] opacity-40 leading-relaxed mb-4"
                  style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                >
                  {isFr
                    ? "WiredRE, CBRE Data Centers, JLL Technologies — des plateformes excellentes pour les hyperscalouers et les fonds d'infrastructure de plusieurs milliards. Si vous avez besoin de 200 MW à Toronto pour un déploiement Azure, ils peuvent vous aider."
                    : "WiredRE, CBRE Data Centers, JLL Technologies — excellent platforms for hyperscalers and multi-billion infrastructure funds. If you need 200 MW in Toronto for an Azure deployment, they can help."}
                </p>
                <p
                  className="text-[var(--color-cream)] opacity-40 leading-relaxed"
                  style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                >
                  {isFr
                    ? "Si votre projet est en dessous de ce seuil — 5 MW à Montréal, un centre de données régional à vendre, une installation de colocation à acquérir — vous n'êtes pas leur cible. Votre appel entre dans la file d'attente."
                    : "If your project is below that threshold — 5 MW in Montreal, a regional data center for sale, a colocation facility to acquire — you are not their target client. Your call goes into a queue."}
                </p>
              </div>
            </SectionReveal>

            {/* Jeremy Soares */}
            <SectionReveal delay={0.1}>
              <div className="bg-[#0e1011] p-8 md:p-10 h-full border border-[rgba(236,234,229,0.06)]">
                <p
                  className="uppercase mb-6"
                  style={{
                    fontFamily: FONT_DM_SANS,
                    fontSize: '10px',
                    letterSpacing: '0.22em',
                    color: '#e8762a',
                  }}
                >
                  Jeremy Soares — OACIQ H2731
                </p>
                <p
                  className="text-[var(--color-cream)] opacity-70 leading-relaxed mb-4"
                  style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                >
                  {isFr
                    ? "Courtier immobilier licencié avec une connaissance technique approfondie des actifs d'infrastructure numérique. Accès direct — pas de gestionnaire de compte intermédiaire. Capacité à structurer des transactions mid-market que les groupes institutionnels refusent de regarder."
                    : "Licensed real estate broker with deep technical knowledge of digital infrastructure assets. Direct access — no account manager in between. Capacity to structure mid-market transactions that institutional groups decline to look at."}
                </p>
                <p
                  className="text-[var(--color-cream)] opacity-70 leading-relaxed"
                  style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                >
                  {isFr
                    ? "Acheteurs hors marché. Vendeurs qui cherchent la discrétion. Investisseurs qui ont besoin d'une analyse rigoureuse avant de déployer du capital. C'est ce segment que nous servons — et que personne d'autre ne couvre vraiment."
                    : "Off-market buyers. Sellers who need discretion. Investors who require rigorous analysis before deploying capital. That is the segment we serve — and the one no one else truly covers."}
                </p>
              </div>
            </SectionReveal>
          </div>

          {/* Internal links band */}
          <SectionReveal delay={0.2} className="mt-16">
            <div
              className="flex flex-wrap gap-x-10 gap-y-4 pt-10 border-t"
              style={{ borderColor: 'rgba(236,234,229,0.08)' }}
            >
              <p
                className="text-[var(--color-cream)] opacity-25 uppercase w-full md:w-auto"
                style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em' }}
              >
                {isFr ? 'Explorer' : 'Explore'}
              </p>
              {[
                { label: isFr ? 'Services' : 'Services', href: `/${locale}/services` },
                { label: isFr ? 'Outils' : 'Tools', href: `/${locale}/tools` },
                { label: isFr ? 'À propos' : 'About', href: `/${locale}/about` },
                { label: 'Contact', href: `/${locale}/contact` },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[var(--color-cream)] opacity-40 hover:opacity-80 transition-opacity duration-200 uppercase"
                  style={{ fontFamily: FONT_DM_SANS, fontSize: '0.75rem', letterSpacing: '0.12em', fontWeight: 500 }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </SectionReveal>
        </Container>
      </Section>

      {/* ── FAQ — cream ───────────────────────────────────────────────────────── */}
      <Section theme="cream" className="py-24 md:py-36 relative overflow-hidden">
        <div
          className="wipe pointer-events-none absolute inset-0 bg-[var(--color-cream)] z-10"
          aria-hidden="true"
          style={{ transformOrigin: 'top' }}
        />
        <Container size="lg">
          <Label className="mb-10">
            {isFr ? '(Questions fréquentes)' : '(FAQ)'}
          </Label>

          <div
            className="mb-14"
            style={{
              fontFamily: FONT_BARLOW,
              fontWeight: 900,
              fontSize: 'clamp(2.2rem, 5vw, 4.25rem)',
              letterSpacing: '-0.02em',
            }}
          >
            <TextReveal
              as="h2"
              split="words"
              className="leading-none uppercase text-[var(--color-void)]"
            >
              {isFr ? 'Questions fréquentes' : 'Frequently asked questions'}
            </TextReveal>
          </div>

          <div
            className="border-t"
            style={{ borderColor: 'rgba(14,16,17,0.1)' }}
          >
            {faqItems.map((item, i) => (
              <SectionReveal key={i} delay={i * 0.05}>
                <div
                  className="py-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 border-b"
                  style={{ borderColor: 'rgba(14,16,17,0.1)' }}
                >
                  {/* Q */}
                  <div className="md:col-span-5">
                    <h3
                      className="text-[var(--color-void)] leading-snug"
                      style={{
                        fontFamily: FONT_DM_SERIF,
                        fontStyle: 'italic',
                        fontSize: 'clamp(1rem, 1.6vw, 1.25rem)',
                      }}
                    >
                      {item.q}
                    </h3>
                  </div>
                  {/* A */}
                  <div className="md:col-span-7">
                    <p
                      className="text-[var(--color-void)] opacity-55 leading-relaxed"
                      style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                    >
                      {item.a}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── CTA — void ────────────────────────────────────────────────────────── */}
      <Section theme="void" className="py-28 md:py-40">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12">
            <div className="flex-1 max-w-2xl">
              {/* Accent label */}
              <SectionReveal>
                <span
                  className="block mb-6 uppercase"
                  style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em', color: '#e8762a' }}
                >
                  {isFr ? '— Prochaine étape' : '— Next step'}
                </span>
              </SectionReveal>

              <div
                style={{
                  fontFamily: FONT_BARLOW,
                  fontWeight: 900,
                  fontSize: 'clamp(2.75rem, 7.5vw, 6.5rem)',
                  letterSpacing: '-0.025em',
                }}
              >
                <TextReveal
                  as="h2"
                  split="words"
                  className="leading-none uppercase text-[var(--color-cream)]"
                >
                  {isFr ? "Parlons de votre projet." : "Let's talk about your project."}
                </TextReveal>
              </div>

              <SectionReveal delay={0.2} className="mt-6 max-w-lg">
                <p
                  className="text-[var(--color-cream)] opacity-40 leading-relaxed"
                  style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                >
                  {isFr
                    ? "Achat, vente, location ou analyse préliminaire — une première conversation de 15 minutes permet de cadrer le projet et de définir les prochaines étapes. Accès direct. Aucun intermédiaire."
                    : "Acquisition, disposition, leasing, or preliminary analysis — a 15-minute first conversation is enough to scope the mandate and define next steps. Direct access. No account manager."}
                </p>
              </SectionReveal>

              {/* Contact details */}
              <SectionReveal delay={0.3} className="mt-8">
                <div className="flex flex-col gap-2">
                  <a
                    href="tel:+15145198177"
                    className="text-[var(--color-cream)] opacity-50 hover:opacity-90 transition-opacity duration-200 uppercase"
                    style={{ fontFamily: FONT_DM_SANS, fontSize: '0.8125rem', letterSpacing: '0.1em' }}
                  >
                    514-519-8177
                  </a>
                  <a
                    href="mailto:JeremySoares@icloud.com"
                    className="text-[var(--color-cream)] opacity-50 hover:opacity-90 transition-opacity duration-200"
                    style={{ fontFamily: FONT_DM_SANS, fontSize: '0.8125rem', letterSpacing: '0.05em' }}
                  >
                    JeremySoares@icloud.com
                  </a>
                </div>
              </SectionReveal>
            </div>

            <SectionReveal delay={0.15} className="flex-shrink-0 flex flex-col gap-4">
              <Button variant="primary" theme="dark" href={`/${locale}/contact`} size="lg">
                {isFr ? 'Nous contacter' : 'Get in Touch'}
              </Button>
              <Button variant="ghost" theme="dark" href={`/${locale}/services`} size="lg">
                {isFr ? 'Voir tous les services' : 'All Services'}
              </Button>
            </SectionReveal>
          </div>
        </Container>
      </Section>
    </>
  )
}
