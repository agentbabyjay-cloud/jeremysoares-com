import type { Metadata } from 'next'
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

// ─── SEO ───────────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale === 'fr-ca'
  const slug = 'industrial-real-estate-montreal'
  const canonical = `https://jeremysoares.com/${locale}/${slug}`

  return {
    title: isFr
      ? 'Immobilier Industriel Montréal | Entrepôts, Usines — Jeremy Soares'
      : 'Industrial Real Estate Montreal | Warehouses & Flex — Jeremy Soares',
    description: isFr
      ? "Achat, vente et location d\u2019immobilier industriel à Montréal : entrepôts, usines, locaux flex. Courtier OACIQ H2731. Analyse de zonage, quais de chargement, hauteur libre."
      : 'Buy, sell or lease industrial real estate in Montreal: warehouses, manufacturing, flex space. OACIQ broker H2731. Zoning, loading docks, clear height analysis.',
    keywords: isFr
      ? [
          'immobilier industriel Montréal',
          'entrepôt à vendre Montréal',
          'local industriel Montréal',
          'bâtiment industriel Saint-Laurent',
          'logistique immobilier Montréal',
          'courtier immobilier industriel Québec',
          'Jeremy Soares courtier industriel',
          'OACIQ H2731',
        ]
      : [
          'industrial real estate Montreal',
          'warehouse for sale Montreal',
          'industrial space Montreal',
          'industrial building Saint-Laurent',
          'logistics real estate Montreal',
          'industrial real estate broker Quebec',
          'Jeremy Soares industrial broker',
          'OACIQ H2731',
        ],
    alternates: {
      canonical,
      languages: {
        'en-CA': `https://jeremysoares.com/en-ca/${slug}`,
        'fr-CA': `https://jeremysoares.com/fr-ca/${slug}`,
      },
    },
    openGraph: {
      type: 'website',
      url: canonical,
      siteName: 'Jeremy Soares',
      locale: isFr ? 'fr_CA' : 'en_CA',
      title: isFr
        ? 'Immobilier Industriel Montréal — Jeremy Soares'
        : 'Industrial Real Estate Montreal — Jeremy Soares',
      description: isFr
        ? "Spécialiste en immobilier industriel à Montréal : entrepôts, distribution, fabrication, flex. Courtier OACIQ H2731."
        : 'Industrial real estate specialist in Montreal: warehouses, distribution, manufacturing, flex. OACIQ broker H2731.',
      images: [
        {
          url: 'https://cdn.prod.website-files.com/68ba28534a070e692e441089/68baf35dc28553a17f2d6d78_8-IMG_6610.jpg',
          width: 1218,
          height: 813,
          alt: isFr
            ? 'Immobilier industriel Montréal — Jeremy Soares'
            : 'Industrial real estate Montreal — Jeremy Soares',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isFr
        ? 'Immobilier Industriel Montréal — Jeremy Soares'
        : 'Industrial Real Estate Montreal — Jeremy Soares',
      description: isFr
        ? "Entrepôts, usines, distribution, flex à Montréal. Courtier OACIQ H2731."
        : 'Warehouses, manufacturing, distribution, flex space in Montreal. OACIQ broker H2731.',
    },
  }
}

// ─── JSON-LD ───────────────────────────────────────────────────────────────────
function IndustrialJsonLd({ locale }: { locale: string }) {
  const isFr = locale === 'fr-ca'
  const baseUrl = 'https://jeremysoares.com'
  const pageUrl = `${baseUrl}/${locale}/industrial-real-estate-montreal`

  const agent = {
    '@type': 'RealEstateAgent',
    '@id': `${baseUrl}/#agent`,
    name: 'Jeremy Soares',
    telephone: '+15145198177',
    email: 'JeremySoares@icloud.com',
    url: baseUrl,
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
  }

  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': pageUrl,
    name: isFr
      ? 'Immobilier Industriel Montréal — Jeremy Soares'
      : 'Industrial Real Estate Montreal — Jeremy Soares',
    description: isFr
      ? 'Achat, vente et location de propriétés industrielles à Montréal : entrepôts, usines, centres de distribution, espaces flex.'
      : 'Buy, sell and lease industrial properties in Montreal: warehouses, manufacturing plants, distribution centres, flex space.',
    url: pageUrl,
    provider: agent,
    areaServed: [
      { '@type': 'City', name: 'Montreal', '@id': 'https://www.wikidata.org/wiki/Q340' },
      { '@type': 'City', name: 'Laval' },
      { '@type': 'City', name: 'Longueuil' },
    ],
    serviceType: isFr ? 'Courtage immobilier industriel' : 'Industrial real estate brokerage',
  }

  const faqData = isFr
    ? [
        {
          q: "Quelles sont les principales zones industrielles de Montréal?",
          a: "Les principaux secteurs industriels de Montréal sont Saint-Laurent (le plus grand parc industriel au Canada), Lachine, Anjou, ainsi que Laval et Longueuil sur les rives nord et sud.",
        },
        {
          q: "Qu'est-ce que la hauteur libre et pourquoi est-elle importante?",
          a: "La hauteur libre est la distance entre le plancher et le point le plus bas de la structure du toit. Elle détermine si l'entrepôt peut accueillir des rayonnages hauts ou des équipements de grande taille. Les entrepôts modernes offrent 28 à 40 pieds de hauteur libre.",
        },
        {
          q: "Quels zonages s'appliquent à l'immobilier industriel à Montréal?",
          a: "Les zones I (industriel), M (mixte), et certaines zones CM s'appliquent selon l'arrondissement. L'analyse de zonage est essentielle pour valider l'usage prévu : fabrication, entreposage, distribution ou flex.",
        },
        {
          q: "Quels sont les facteurs clés d'un bon investissement industriel?",
          a: "Les facteurs déterminants incluent l'accès aux autoroutes et aux réseaux ferroviaires, la capacité électrique (ampérage), le nombre de quais de chargement, la superficie du terrain, et la hauteur libre.",
        },
        {
          q: "La demande pour l'immobilier industriel à Montréal est-elle en hausse?",
          a: "Oui. La croissance du commerce en ligne, la distribution du dernier kilomètre et les besoins en entreposage frigorifique ont entraîné un taux de disponibilité historiquement bas dans le Grand Montréal, poussant les valeurs à la hausse.",
        },
        {
          q: "Comment se compare Centris et LoopNet pour trouver des propriétés industrielles?",
          a: "Centris est la plateforme MLS québécoise obligatoire pour les courtiers locaux. LoopNet et Colliers couvrent surtout les grandes transactions institutionnelles. Un courtier local comme Jeremy Soares accède à des inscriptions hors marché que ces plateformes ne montrent pas.",
        },
        {
          q: "Quelle est la différence entre un espace flex et un entrepôt classique?",
          a: "Un espace flex combine bureaux et zone industrielle légère dans un même bâtiment, souvent avec accès de plain-pied. Idéal pour les PME, les distributeurs et les entreprises technologiques ayant besoin des deux types d'espace.",
        },
      ]
    : [
        {
          q: 'What are the main industrial zones in Montreal?',
          a: "Montreal's key industrial corridors are Saint-Laurent (Canada's largest industrial park), Lachine, Anjou, and the off-island markets of Laval and Longueuil on the North and South Shores.",
        },
        {
          q: 'What is clear height and why does it matter?',
          a: 'Clear height is the usable vertical distance from floor to the lowest point of the roof structure. It determines whether a warehouse can accommodate high-bay racking or large equipment. Modern logistics facilities offer 28 to 40 feet of clear height.',
        },
        {
          q: 'What zoning applies to industrial real estate in Montreal?',
          a: 'Industrial (I), mixed (M), and certain CM zones apply depending on the borough. Zoning analysis is critical to confirm permitted use: manufacturing, warehousing, distribution, or flex.',
        },
        {
          q: 'What are the key factors in a strong industrial investment?',
          a: 'Key factors include proximity to highway networks and rail, electrical capacity (amperage), number of loading docks, lot depth, and clear height. Lease structure and tenant covenant quality matter equally.',
        },
        {
          q: 'Is industrial real estate demand growing in Montreal?',
          a: "Yes. E-commerce growth, last-mile distribution needs, and cold storage requirements have pushed the Greater Montreal industrial availability rate to historic lows, driving both rents and asset values upward.",
        },
        {
          q: 'How does Centris compare to LoopNet for finding industrial properties?',
          a: "Centris is the mandatory MLS platform for Quebec brokers — all licensed listings appear there. LoopNet and Colliers skew toward large institutional transactions. A local broker like Jeremy Soares also accesses off-market inventory those platforms never show.",
        },
        {
          q: 'What is the difference between flex space and a traditional warehouse?',
          a: 'Flex space combines office and light industrial in one footprint, typically with grade-level access. Ideal for SMEs, distributors, and tech companies needing both environments under one roof.',
        },
      ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
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
export default async function IndustrialRealEstatePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr-ca'

  // ── Property type data ────────────────────────────────────────────────────
  const propertyTypes = isFr
    ? [
        {
          number: '01',
          title: 'Entrepôts',
          tag: 'Entreposage',
          description:
            "Bâtiments de grande superficie avec quais de chargement, dalle de béton haute résistance et hauteur libre de 24 à 40 pieds. Adaptés aux centres de distribution, à la logistique e-commerce et à l'entreposage vrac.",
        },
        {
          number: '02',
          title: 'Fabrication',
          tag: 'Industriel lourd',
          description:
            "Locaux avec capacité électrique élevée (600 V triphasé), systèmes de ventilation industrielle, ponts roulants et sols renforcés. Idéaux pour la production manufacturière et les opérations à haute intensité.",
        },
        {
          number: '03',
          title: 'Distribution',
          tag: 'Logistique',
          description:
            "Propriétés situées à proximité des axes autoroutiers 40, 13, 20 et 25 pour la distribution du dernier kilomètre. Cour de manœuvre profonde, quais niveleurs, stationnement poids lourds.",
        },
        {
          number: '04',
          title: 'Espaces Flex',
          tag: 'Mixte',
          description:
            "Combinaison de bureaux et d\u2019atelier léger dans un seul bâtiment avec accès de plain-pied. Idéal pour les PME, les distributeurs régionaux et les entreprises en croissance nécessitant de la flexibilité.",
        },
      ]
    : [
        {
          number: '01',
          title: 'Warehouses',
          tag: 'Storage',
          description:
            'Large-footprint buildings with loading docks, heavy-duty concrete slab, and 24 to 40 feet of clear height. Suited to distribution centres, e-commerce logistics, and bulk storage operations.',
        },
        {
          number: '02',
          title: 'Manufacturing',
          tag: 'Heavy Industrial',
          description:
            'Facilities with high electrical capacity (600V three-phase), industrial ventilation systems, overhead cranes, and reinforced floors. Ideal for production operations and high-intensity manufacturing.',
        },
        {
          number: '03',
          title: 'Distribution',
          tag: 'Logistics',
          description:
            'Properties positioned near Highways 40, 13, 20, and 25 for last-mile delivery. Deep truck court, levelling docks, heavy vehicle parking, and cross-dock configurations.',
        },
        {
          number: '04',
          title: 'Flex Space',
          tag: 'Mixed Use',
          description:
            'Office and light industrial combined in one footprint with grade-level access. Ideal for SMEs, regional distributors, and growth-stage companies that need both environments without committing to two leases.',
        },
      ]

  // ── Key areas data ────────────────────────────────────────────────────────
  const keyAreas = isFr
    ? [
        {
          name: 'Saint-Laurent',
          desc: "Le plus grand parc industriel au Canada. Plus de 2 000 entreprises, accès direct à l\u2019autoroute 40 et à l\u2019aéroport YUL. Taux d\u2019inoccupation historiquement bas, prime de localisation.",
        },
        {
          name: 'Lachine',
          desc: "Zone industrielle revitalisée le long du canal Lachine. Connexion ferroviaire CN, lots de grande superficie, potentiel de transformation. Accès rapide aux ponts vers la Rive-Sud.",
        },
        {
          name: 'Anjou',
          desc: "Secteur industriel mature à l\u2019est de Montréal. Proximité de l\u2019autoroute 25 et de la 40 Est. Prédominance de la fabrication légère et de l\u2019entreposage régional.",
        },
        {
          name: 'Laval',
          desc: "Marché en forte croissance sur la Rive-Nord. Nouveaux parcs industriels le long de l\u2019autoroute 15 et 440. Terrain disponible pour développement clé en main.",
        },
        {
          name: 'Longueuil',
          desc: "Rive-Sud stratégique avec accès aux ponts Champlain et Jacques-Cartier. Zone industrielle du boulevard Industriel, espaces flex modernes, bonne capacité électrique.",
        },
      ]
    : [
        {
          name: 'Saint-Laurent',
          desc: "Canada's largest industrial park. Over 2,000 businesses, direct access to Highway 40 and YUL Airport. Historically low vacancy rate, premium location pricing.",
        },
        {
          name: 'Lachine',
          desc: 'Revitalized industrial zone along the Lachine Canal. CN rail connection, large lot sizes, conversion potential. Fast access to South Shore bridges.',
        },
        {
          name: 'Anjou',
          desc: "Mature industrial corridor in east Montreal. Close to Highways 25 and 40 East. Predominantly light manufacturing and regional warehousing with stable tenancy.",
        },
        {
          name: 'Laval',
          desc: 'High-growth North Shore market. New industrial parks along Highways 15 and 440. Available land for build-to-suit development with fast permitting.',
        },
        {
          name: 'Longueuil',
          desc: 'Strategic South Shore access via Champlain and Jacques-Cartier bridges. Boulevard Industriel corridor, modern flex inventory, strong electrical infrastructure.',
        },
      ]

  // ── Investment metrics ────────────────────────────────────────────────────
  const investmentItems = isFr
    ? [
        {
          number: '01',
          headline: "Taux de capitalisation (cap rate)",
          body: "Les propriétés industrielles à Montréal affichent des cap rates entre 4,5 % et 6,5 % selon le secteur, l\u2019âge du bâtiment et la qualité du locataire. Les actifs de classe A en Saint-Laurent sont à la compression basse.",
        },
        {
          number: '02',
          headline: "Appréciation et demande structurelle",
          body: "La croissance du e-commerce, le rapatriement des chaînes d\u2019approvisionnement et l\u2019essor de l\u2019entreposage frigorifique créent une demande qui dépasse l\u2019offre disponible dans le Grand Montréal — une dynamique favorable aux propriétaires.",
        },
        {
          number: '03',
          headline: "Structure des baux NNN",
          body: "Les baux industriels sont généralement à triple net (NNN) : le locataire assume taxes, assurances et entretien. Revenu locatif net stable, gestion simplifiée pour l\u2019investisseur.",
        },
        {
          number: '04',
          headline: "Analyse comparative vs résidentiel",
          body: "L\u2019industriel offre des durées de bail plus longues (5 à 15 ans), moins de roulement et un encadrement réglementaire moins complexe que le résidentiel multifamilial — tout en générant des rendements comparables ou supérieurs.",
        },
      ]
    : [
        {
          number: '01',
          headline: 'Cap rates and yield landscape',
          body: 'Montreal industrial cap rates range from 4.5% to 6.5% depending on submarket, building age, and tenant covenant. Class A assets in Saint-Laurent are compressing toward the low end of that range.',
        },
        {
          number: '02',
          headline: 'Appreciation and structural demand',
          body: 'E-commerce growth, supply chain nearshoring, and cold storage expansion are generating demand that consistently outpaces available supply in Greater Montreal — a landlord-favourable dynamic with no near-term reversal in sight.',
        },
        {
          number: '03',
          headline: 'Triple net lease structure',
          body: 'Industrial leases are typically NNN: the tenant absorbs taxes, insurance, and maintenance. Stable net income, simplified management, and predictable cash flow for investors.',
        },
        {
          number: '04',
          headline: 'Industrial vs. residential as an asset class',
          body: 'Industrial offers longer lease terms (5 to 15 years), lower turnover, and less regulatory complexity than multifamily residential — while generating comparable or superior yield in the current Montreal market.',
        },
      ]

  // ── FAQ data ──────────────────────────────────────────────────────────────
  const faqs = isFr
    ? [
        {
          q: "Quelles sont les principales zones industrielles de Montréal?",
          a: "Les principaux secteurs sont Saint-Laurent (le plus grand parc industriel au Canada), Lachine, Anjou, ainsi que Laval et Longueuil sur les rives nord et sud.",
        },
        {
          q: "Qu'est-ce que la hauteur libre et pourquoi est-elle importante?",
          a: "La hauteur libre est la distance entre le plancher et la structure du toit. Elle détermine la capacité de rayonnage et d\u2019équipement. Les entrepôts modernes offrent 28 à 40 pieds de hauteur libre.",
        },
        {
          q: "Quels zonages s'appliquent à l'immobilier industriel à Montréal?",
          a: "Les zones I (industriel), M (mixte) et certaines zones CM s\u2019appliquent selon l\u2019arrondissement. L\u2019analyse de zonage est essentielle pour valider l\u2019usage prévu.",
        },
        {
          q: "Quels sont les facteurs clés d'un bon investissement industriel?",
          a: "L\u2019accès aux autoroutes, la capacité électrique, le nombre de quais de chargement, la superficie du terrain et la hauteur libre sont les facteurs déterminants.",
        },
        {
          q: "La demande pour l'immobilier industriel à Montréal est-elle en hausse?",
          a: "Oui. La croissance du commerce en ligne et la distribution du dernier kilomètre ont poussé les taux d\u2019inoccupation à des niveaux historiquement bas dans le Grand Montréal.",
        },
        {
          q: "Comment se compare Jeremy Soares aux grandes firmes comme Colliers ou CBRE?",
          a: "Les grandes firmes se concentrent sur les transactions institutionnelles. Jeremy Soares offre une attention personnalisée, un accès hors marché et une expertise locale du marché montréalais que les grands cabinets délèguent à des équipes juniors.",
        },
        {
          q: "Quelle est la différence entre un espace flex et un entrepôt classique?",
          a: "Un espace flex combine bureaux et zone industrielle légère dans un même bâtiment, avec accès de plain-pied. Idéal pour les PME et les distributeurs ayant besoin des deux types d\u2019espace.",
        },
      ]
    : [
        {
          q: 'What are the main industrial zones in Montreal?',
          a: "Montreal's key industrial corridors are Saint-Laurent (Canada's largest industrial park), Lachine, Anjou, and the off-island markets of Laval and Longueuil.",
        },
        {
          q: 'What is clear height and why does it matter?',
          a: 'Clear height is the usable vertical distance from floor to roof structure — it determines high-bay racking capacity. Modern logistics facilities offer 28 to 40 feet.',
        },
        {
          q: 'What zoning applies to industrial real estate in Montreal?',
          a: 'Industrial (I), mixed (M), and certain CM zones apply depending on the borough. Zoning analysis is critical to confirm permitted use before any offer.',
        },
        {
          q: 'What are the key factors in a strong industrial investment?',
          a: 'Highway access, electrical capacity, loading dock count, lot depth, and clear height are the critical factors — alongside lease structure and tenant covenant quality.',
        },
        {
          q: 'Is industrial real estate demand growing in Montreal?',
          a: 'Yes. E-commerce growth and last-mile distribution needs have pushed the Greater Montreal industrial availability rate to historic lows, driving rents and asset values upward.',
        },
        {
          q: 'How does Jeremy Soares compare to Colliers or CBRE?',
          a: 'Large firms focus on institutional mandates. Jeremy Soares delivers direct broker attention, off-market access, and deep Montreal-specific expertise that major firms delegate to junior teams.',
        },
        {
          q: 'What is the difference between flex space and a traditional warehouse?',
          a: 'Flex space combines office and light industrial in one footprint, typically with grade-level access. Ideal for SMEs and distributors needing both environments under one roof.',
        },
      ]

  return (
    <>
      <IndustrialJsonLd locale={locale} />

      {/* ── Hero — void ──────────────────────────────────────────────────── */}
      <Section theme="void" className="pt-32 pb-20 md:pt-44 md:pb-28" height="tall">
        <Container size="lg">
          <Label className="mb-8">
            {isFr ? '(Industriel — Montréal)' : '(Industrial — Montreal)'}
          </Label>

          <div
            style={{
              fontFamily: FONT_BARLOW,
              fontWeight: 900,
              fontSize: 'clamp(4rem, 10vw, 8.5rem)',
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
              {isFr ? 'Immobilier Industriel' : 'Industrial Real Estate'}
            </TextReveal>
            <TextReveal
              as="div"
              split="lines"
              immediate
              delay={0.25}
              className="leading-none uppercase text-[var(--color-cream)] opacity-25"
            >
              {isFr ? 'Montréal' : 'Montreal'}
            </TextReveal>
          </div>

          <SectionReveal delay={0.4} className="mt-6">
            <p
              className="text-[var(--color-cream)] opacity-35 max-w-sm"
              style={{
                fontFamily: FONT_DM_SERIF,
                fontStyle: 'italic',
                fontSize: 'clamp(1.05rem, 1.8vw, 1.4rem)',
              }}
            >
              {isFr
                ? "Entrepôts, fabrication, distribution et espaces flex — achat, vente et location."
                : "Warehouses, manufacturing, distribution and flex — buy, sell or lease."}
            </p>
          </SectionReveal>

          <SectionReveal delay={0.55} className="mt-8 flex flex-wrap gap-4">
            <Button variant="primary" theme="dark" href={`/${locale}/contact`} size="lg">
              {isFr ? 'Nous contacter' : 'Get in Touch'}
            </Button>
            <Button variant="ghost" theme="dark" href={`/${locale}/real-estate`} size="lg">
              {isFr ? 'Voir les inscriptions' : 'View Listings'}
            </Button>
          </SectionReveal>

          <SectionReveal delay={0.65} className="mt-14 flex flex-wrap gap-10">
            {[
              { value: '5%', label: isFr ? 'Cap rate moyen' : 'Avg. cap rate' },
              { value: '<3%', label: isFr ? 'Taux inoccupation Grand MTL' : 'Greater MTL vacancy' },
              { value: 'NNN', label: isFr ? 'Structure de bail typique' : 'Typical lease structure' },
              { value: 'OACIQ H2731', label: isFr ? 'Licence courtier' : 'Broker licence' },
            ].map((stat) => (
              <div key={stat.label}>
                <p
                  className="text-[var(--color-cream)] leading-none"
                  style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-[var(--color-cream)] opacity-35 mt-1 uppercase"
                  style={{ fontFamily: FONT_DM_SANS, fontSize: '0.625rem', letterSpacing: '0.18em' }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </SectionReveal>
        </Container>
      </Section>

      {/* ── Market overview — cream ───────────────────────────────────────── */}
      <Section theme="cream" className="py-24 md:py-36 relative overflow-hidden">
        <div
          className="wipe pointer-events-none absolute inset-0 bg-[var(--color-cream)] z-10"
          aria-hidden="true"
          style={{ transformOrigin: 'top' }}
        />
        <Container size="lg">
          <Label theme="light" className="mb-10">
            {isFr ? '(Aperçu du marché)' : '(Market Overview)'}
          </Label>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
            <div className="md:col-span-5">
              <div
                style={{
                  fontFamily: FONT_BARLOW,
                  fontWeight: 900,
                  fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
                  letterSpacing: '-0.02em',
                }}
              >
                <TextReveal
                  as="h2"
                  split="words"
                  className="leading-none uppercase text-[var(--color-void)]"
                >
                  {isFr ? 'Le marché en chiffres' : 'The Market in Numbers'}
                </TextReveal>
              </div>

              <SectionReveal delay={0.2} className="mt-6">
                <p
                  className="text-[var(--color-void)] opacity-55 leading-relaxed"
                  style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                >
                  {isFr
                    ? "Le Grand Montréal est l'un des marchés industriels les plus dynamiques du Canada. La demande soutenue par le e-commerce, le rapatriement des chaînes d\u2019approvisionnement et les besoins en entreposage frigorifique crée une pression structurelle sur les loyers et les valeurs d\u2019actifs."
                    : "Greater Montreal is one of Canada's most active industrial markets. Demand driven by e-commerce, nearshoring supply chains, and cold storage requirements creates sustained pressure on rents and asset values across all submarkets."}
                </p>
              </SectionReveal>
            </div>

            <div className="md:col-span-7 grid grid-cols-2 gap-8">
              {[
                {
                  value: isFr ? '< 3 %' : '< 3%',
                  label: isFr ? 'Taux de disponibilité industriel — Grand Montréal' : 'Industrial availability rate — Greater Montreal',
                },
                {
                  value: isFr ? '40 pi' : '40 ft',
                  label: isFr ? 'Hauteur libre des nouveaux entrepôts classe A' : 'Clear height in new Class A warehouses',
                },
                {
                  value: '$18–$28',
                  label: isFr ? 'Fourchette de loyer brut par pi² (Saint-Laurent)' : 'Gross rent range per sq ft (Saint-Laurent)',
                },
                {
                  value: '5–15',
                  label: isFr ? 'Durée typique des baux industriels (années)' : 'Typical industrial lease term (years)',
                },
              ].map((item) => (
                <SectionReveal key={item.label}>
                  <div className="border-t border-[rgba(14,16,17,0.12)] pt-5">
                    <p
                      className="text-[var(--color-void)] leading-none mb-2"
                      style={{
                        fontFamily: FONT_BARLOW,
                        fontWeight: 900,
                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {item.value}
                    </p>
                    <p
                      className="text-[var(--color-void)] opacity-45 leading-snug"
                      style={{ fontFamily: FONT_DM_SANS, fontSize: '0.75rem' }}
                    >
                      {item.label}
                    </p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>

          <SectionReveal delay={0.3} className="mt-16 pt-10 border-t border-[rgba(14,16,17,0.1)]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: isFr ? 'Dernière borne (last-mile)' : 'Last-mile distribution',
                  body: isFr
                    ? "La livraison en 24h exige des entrepôts proches des centres urbains. Les sites montréalais en Saint-Laurent et Anjou sont des actifs stratégiques pour les opérateurs logistiques."
                    : "Same-day and next-day delivery requires urban-adjacent warehousing. Montreal sites in Saint-Laurent and Anjou are strategic assets for logistics operators serving the island.",
                },
                {
                  title: isFr ? 'Entreposage frigorifique' : 'Cold storage',
                  body: isFr
                    ? "La demande en entreposage à température contrôlée croît fortement dans le Grand Montréal, poussée par la distribution alimentaire, pharmaceutique et e-commerce frais."
                    : "Demand for temperature-controlled storage is growing sharply across Greater Montreal, driven by food distribution, pharma cold chain, and fresh e-commerce fulfilment.",
                },
                {
                  title: isFr ? 'Rapatriement industriel' : 'Nearshoring',
                  body: isFr
                    ? "Les entreprises rapatrient leur production au Canada pour réduire les risques géopolitiques. Le Québec bénéficie d\u2019une main-d\u2019œuvre qualifiée, d\u2019énergie abordable et d\u2019incitatifs gouvernementaux."
                    : "Companies are nearshoring production to Canada to reduce geopolitical risk. Quebec benefits from skilled labour, affordable hydro power, and strong government incentives for manufacturing.",
                },
              ].map((trend) => (
                <div key={trend.title}>
                  <h3
                    className="text-[var(--color-void)] uppercase mb-3 leading-tight"
                    style={{
                      fontFamily: FONT_BARLOW,
                      fontWeight: 900,
                      fontSize: 'clamp(1rem, 2vw, 1.375rem)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {trend.title}
                  </h3>
                  <p
                    className="text-[var(--color-void)] opacity-50 leading-relaxed"
                    style={{ fontFamily: FONT_DM_SANS, fontSize: '0.875rem' }}
                  >
                    {trend.body}
                  </p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </Container>
      </Section>

      {/* ── Property types — void ─────────────────────────────────────────── */}
      <Section theme="void" className="py-24 md:py-36">
        <Container size="lg">
          <Label className="mb-10">
            {isFr ? '(Types de propriétés)' : '(Property Types)'}
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
              {isFr ? 'Ce que nous couvrons' : 'What We Cover'}
            </TextReveal>
          </div>

          <div className="border-t" style={{ borderColor: 'rgba(236,234,229,0.08)' }}>
            {propertyTypes.map((pt, i) => (
              <SectionReveal key={pt.number} delay={i * 0.07}>
                <div
                  className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-12 border-b transition-all duration-300 hover:pl-1 md:hover:pl-2"
                  style={{ borderColor: 'rgba(236,234,229,0.08)' }}
                >
                  <div className="md:col-span-1 flex items-start pt-1">
                    <span
                      className="uppercase text-[var(--color-cream)] opacity-25"
                      style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em' }}
                    >
                      {pt.number}
                    </span>
                  </div>
                  <div className="md:col-span-4">
                    <span
                      className="block mb-2 uppercase text-[var(--color-cream)] opacity-30"
                      style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em' }}
                    >
                      {pt.tag}
                    </span>
                    <h3
                      className="leading-tight uppercase text-[var(--color-cream)]"
                      style={{
                        fontFamily: FONT_BARLOW,
                        fontWeight: 900,
                        fontSize: 'clamp(1.5rem, 3vw, 2.75rem)',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {pt.title}
                    </h3>
                  </div>
                  <div className="md:col-span-7">
                    <p
                      className="text-[var(--color-cream)] opacity-50 leading-relaxed"
                      style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                    >
                      {pt.description}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Key areas — cream ─────────────────────────────────────────────── */}
      <Section theme="cream" className="py-24 md:py-36 relative overflow-hidden">
        <div
          className="wipe pointer-events-none absolute inset-0 bg-[var(--color-cream)] z-10"
          aria-hidden="true"
          style={{ transformOrigin: 'top' }}
        />
        <Container size="lg">
          <Label theme="light" className="mb-10">
            {isFr ? '(Secteurs clés)' : '(Key Areas)'}
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
              className="leading-none uppercase text-[var(--color-void)]"
            >
              {isFr ? 'Où chercher' : 'Where to Look'}
            </TextReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[rgba(14,16,17,0.1)]">
            {keyAreas.map((area, i) => (
              <SectionReveal key={area.name} delay={i * 0.07}>
                <div className="bg-[var(--color-cream)] p-10">
                  <h3
                    className="uppercase text-[var(--color-void)] mb-4 leading-none"
                    style={{
                      fontFamily: FONT_BARLOW,
                      fontWeight: 900,
                      fontSize: 'clamp(1.25rem, 2.5vw, 1.875rem)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {area.name}
                  </h3>
                  <p
                    className="text-[var(--color-void)] opacity-50 leading-relaxed"
                    style={{ fontFamily: FONT_DM_SANS, fontSize: '0.875rem' }}
                  >
                    {area.desc}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Investment analysis — void ────────────────────────────────────── */}
      <Section theme="void" className="py-24 md:py-36">
        <Container size="lg">
          <Label className="mb-10">
            {isFr ? '(Analyse d\u2019investissement)' : '(Investment Analysis)'}
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
              {isFr ? 'Investir dans l\u2019industriel' : 'Investing in Industrial'}
            </TextReveal>
          </div>

          <div className="border-t" style={{ borderColor: 'rgba(236,234,229,0.08)' }}>
            {investmentItems.map((item, i) => (
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
                        fontSize: 'clamp(1.05rem, 1.8vw, 1.35rem)',
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

      {/* ── Services — cream ──────────────────────────────────────────────── */}
      <Section theme="cream" className="py-24 md:py-36 relative overflow-hidden">
        <div
          className="wipe pointer-events-none absolute inset-0 bg-[var(--color-cream)] z-10"
          aria-hidden="true"
          style={{ transformOrigin: 'top' }}
        />
        <Container size="lg">
          <Label theme="light" className="mb-10">
            {isFr ? '(Services)' : '(Services)'}
          </Label>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
            <div className="md:col-span-5">
              <div
                style={{
                  fontFamily: FONT_BARLOW,
                  fontWeight: 900,
                  fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
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
              <SectionReveal delay={0.2} className="mt-6">
                <p
                  className="text-[var(--color-void)] opacity-55 leading-relaxed"
                  style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                >
                  {isFr
                    ? "Que vous achetiez, vendiez ou louiez, chaque mandat est traité avec rigueur analytique et connaissance terrain du marché industriel montréalais. OACIQ H2731."
                    : "Whether buying, selling, or leasing, every mandate is handled with analytical rigour and on-the-ground knowledge of the Montreal industrial market. OACIQ H2731."}
                </p>
              </SectionReveal>
              <SectionReveal delay={0.3} className="mt-8 flex flex-wrap gap-4">
                <Button variant="primary" theme="light" href={`/${locale}/contact`} size="md">
                  {isFr ? 'Nous contacter' : 'Get in Touch'}
                </Button>
                <Button variant="ghost" theme="light" href={`/${locale}/services`} size="md">
                  {isFr ? 'Tous les services' : 'All Services'}
                </Button>
              </SectionReveal>
            </div>

            <div className="md:col-span-7 grid grid-cols-1 gap-0 border-t border-[rgba(14,16,17,0.1)]">
              {(isFr
                ? [
                    "Analyse de zonage et d\u2019usage autorisé",
                    "Modélisation des rendements : cap rate, flux de trésorerie, ROI",
                    "Accès aux inscriptions hors marché",
                    "Négociation de baux NNN et de conditions d\u2019acquisition",
                    "Mise en marché pour propriétaires vendeurs ou bailleurs",
                    "Coordination due diligence : inspection, environnement, titre",
                  ]
                : [
                    "Zoning and permitted-use analysis",
                    "Yield modelling: cap rate, cash flow, ROI projections",
                    "Off-market listing access",
                    "NNN lease and acquisition term negotiation",
                    "Listing marketing for sellers and landlords",
                    "Due diligence coordination: inspection, environment, title",
                  ]
              ).map((item, i) => (
                <SectionReveal key={i} delay={i * 0.06}>
                  <div
                    className="flex items-center gap-4 py-5 border-b border-[rgba(14,16,17,0.1)]"
                  >
                    <span
                      className="text-[#e8762a] flex-shrink-0"
                      style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.2em' }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p
                      className="text-[var(--color-void)] opacity-65 leading-snug"
                      style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                    >
                      {item}
                    </p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ── FAQ — void ───────────────────────────────────────────────────── */}
      <Section theme="void" className="py-24 md:py-36">
        <Container size="lg">
          <Label className="mb-10">{isFr ? '(Questions fréquentes)' : '(FAQ)'}</Label>

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
              {isFr ? 'Questions fréquentes' : 'Frequently Asked'}
            </TextReveal>
          </div>

          <div className="border-t" style={{ borderColor: 'rgba(236,234,229,0.08)' }}>
            {faqs.map((faq, i) => (
              <SectionReveal key={i} delay={i * 0.05}>
                <div
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 py-8 border-b"
                  style={{ borderColor: 'rgba(236,234,229,0.08)' }}
                >
                  <div className="md:col-span-5">
                    <h3
                      className="text-[var(--color-cream)] leading-snug"
                      style={{
                        fontFamily: FONT_DM_SANS,
                        fontWeight: 600,
                        fontSize: '0.9375rem',
                      }}
                    >
                      {faq.q}
                    </h3>
                  </div>
                  <div className="md:col-span-7">
                    <p
                      className="text-[var(--color-cream)] opacity-45 leading-relaxed"
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

      {/* ── Internal links band — cream ───────────────────────────────────── */}
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
                  { label: isFr ? 'Préconstruction' : 'Pre-Construction', href: `/${locale}/pre-construction-condos-montreal` },
                  { label: isFr ? 'Services' : 'Services', href: `/${locale}/services` },
                  { label: isFr ? 'Immobilier' : 'Real Estate', href: `/${locale}/real-estate` },
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

      {/* ── CTA — void ───────────────────────────────────────────────────── */}
      <Section theme="void" className="py-28 md:py-36">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12">
            <div className="flex-1 max-w-2xl">
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
                  fontSize: 'clamp(2.75rem, 7vw, 6rem)',
                  letterSpacing: '-0.02em',
                }}
              >
                <TextReveal
                  as="h2"
                  split="words"
                  className="leading-none uppercase text-[var(--color-cream)]"
                >
                  {isFr ? 'Votre prochaine propriété industrielle.' : 'Your next industrial property.'}
                </TextReveal>
              </div>

              <SectionReveal delay={0.2} className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
                <a
                  href="tel:+15145198177"
                  className="text-[var(--color-cream)] opacity-50 hover:opacity-90 transition-opacity"
                  style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                >
                  514-519-8177
                </a>
                <span className="hidden sm:inline text-[var(--color-cream)] opacity-20" aria-hidden="true">·</span>
                <a
                  href="mailto:JeremySoares@icloud.com"
                  className="text-[var(--color-cream)] opacity-50 hover:opacity-90 transition-opacity"
                  style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                >
                  JeremySoares@icloud.com
                </a>
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
