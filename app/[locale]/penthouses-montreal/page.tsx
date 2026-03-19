import type { Metadata } from 'next'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Label } from '@/components/ui/Label'
import { TextReveal } from '@/components/animation/TextReveal'
import { SectionReveal } from '@/components/animation/SectionReveal'
import { Button } from '@/components/ui/Button'

// ─── Font helpers ─────────────────────────────────────────────────────────────
const FONT_BARLOW = "var(--font-barlow), 'Barlow', sans-serif"
const FONT_DM_SERIF = "var(--font-dm-serif), 'DM Serif Display', serif"
const FONT_DM_SANS = "var(--font-dm-sans), 'DM Sans', sans-serif"

// ─── SEO ──────────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale === 'fr-ca'
  const slug = 'penthouses-montreal'
  const canonical = `https://jeremysoares.com/${locale}/${slug}`

  return {
    title: isFr
      ? 'Penthouse \u00e0 Vendre Montr\u00e9al | Expert Penthouses — Jeremy Soares'
      : 'Penthouse for Sale Montreal | Penthouse Expert — Jeremy Soares',
    description: isFr
      ? 'Achetez un penthouse \u00e0 Montr\u00e9al avec Jeremy Soares, courtier OACIQ H2731. Downtown, Vieux-Montr\u00e9al, Griffintown, Westmount. Terrasses priv\u00e9es, vues panoramiques, concierge.'
      : 'Buy a penthouse in Montreal with Jeremy Soares, OACIQ broker H2731. Downtown, Old Montreal, Griffintown, Westmount. Private terraces, panoramic views, concierge buildings.',
    keywords: isFr
      ? [
          'penthouse \u00e0 vendre Montr\u00e9al',
          'penthouse Montr\u00e9al',
          'appartement penthouse Montr\u00e9al',
          'penthouse luxe Montr\u00e9al',
          'penthouse Downtown Montr\u00e9al',
          'penthouse Vieux-Montr\u00e9al',
          'penthouse Griffintown',
          'courtier penthouse Montr\u00e9al',
          'Jeremy Soares OACIQ H2731',
        ]
      : [
          'penthouse for sale Montreal',
          'Montreal penthouse',
          'penthouse condo Montreal',
          'luxury penthouse Montreal',
          'penthouse Downtown Montreal',
          'penthouse Old Montreal',
          'penthouse Griffintown',
          'penthouse broker Montreal',
          'Jeremy Soares OACIQ H2731',
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
      title: isFr
        ? 'Penthouse \u00e0 Vendre Montr\u00e9al — Jeremy Soares'
        : 'Penthouse for Sale Montreal — Jeremy Soares',
      description: isFr
        ? 'Terrasses priv\u00e9es, vues panoramiques, concierge. Les meilleurs penthouses de Montr\u00e9al avec Jeremy Soares, OACIQ H2731.'
        : 'Private terraces, panoramic views, concierge buildings. Montreal\u2019s finest penthouses with Jeremy Soares, OACIQ H2731.',
      siteName: 'Jeremy Soares',
      locale: isFr ? 'fr_CA' : 'en_CA',
      images: [
        {
          url: 'https://cdn.prod.website-files.com/68ba28534a070e692e441089/68baf35dc28553a17f2d6d78_8-IMG_6610.jpg',
          width: 1218,
          height: 813,
          alt: isFr
            ? 'Penthouse \u00e0 vendre Montr\u00e9al — Jeremy Soares'
            : 'Penthouse for sale Montreal — Jeremy Soares',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isFr
        ? 'Penthouse \u00e0 Vendre Montr\u00e9al — Jeremy Soares'
        : 'Penthouse for Sale Montreal — Jeremy Soares',
      description: isFr
        ? 'Terrasses priv\u00e9es, vues panoramiques, concierge. Expert penthouses Montr\u00e9al OACIQ H2731.'
        : 'Private terraces, panoramic views, concierge buildings. Montreal penthouse expert OACIQ H2731.',
    },
  }
}

// ─── JSON-LD ───────────────────────────────────────────────────────────────────
function PenthouseJsonLd({ locale }: { locale: string }) {
  const isFr = locale === 'fr-ca'
  const baseUrl = 'https://jeremysoares.com'
  const slug = 'penthouses-montreal'

  const agentSchema = {
    '@type': 'RealEstateAgent',
    '@id': `${baseUrl}/#agent`,
    name: 'Jeremy Soares',
    telephone: '+15145198177',
    email: 'JeremySoares@icloud.com',
    url: baseUrl,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Montr\u00e9al',
      addressRegion: 'QC',
      addressCountry: 'CA',
    },
    areaServed: { '@type': 'City', name: 'Montr\u00e9al', '@id': 'https://www.wikidata.org/wiki/Q340' },
    sameAs: [
      'https://www.centris.ca/fr/courtier-immobilier~jeremy-soares~jeremy-soares/h2731',
      'https://www.realtor.ca/agent/2079722/jeremy-soares-106-220-av-des-pins-o-montreal-quebec-h2w1r9',
    ],
    knowsAbout: isFr ? 'Penthouses Montr\u00e9al, immobilier de luxe' : 'Montreal penthouses, luxury real estate',
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${baseUrl}/${locale}/${slug}`,
    name: isFr ? 'Achat Penthouse Montr\u00e9al — Jeremy Soares' : 'Penthouse Purchase Montreal — Jeremy Soares',
    description: isFr
      ? 'Accompagnement expert pour l\u2019achat d\u2019un penthouse \u00e0 Montr\u00e9al : Downtown, Vieux-Montr\u00e9al, Griffintown, Westmount, Golden Square Mile.'
      : 'Expert guidance for buying a penthouse in Montreal: Downtown, Old Montreal, Griffintown, Westmount, Golden Square Mile.',
    url: `${baseUrl}/${locale}/${slug}`,
    provider: agentSchema,
    areaServed: { '@type': 'City', name: 'Montr\u00e9al', '@id': 'https://www.wikidata.org/wiki/Q340' },
    serviceType: isFr ? 'Courtage immobilier — penthouses de luxe' : 'Real estate brokerage — luxury penthouses',
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: isFr
      ? [
          {
            '@type': 'Question',
            name: 'Quel est le prix moyen d\u2019un penthouse \u00e0 Montr\u00e9al?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Les penthouses \u00e0 Montr\u00e9al se vendent g\u00e9n\u00e9ralement entre 900\u202F000\u00a0$ et plus de 5\u202F000\u000000\u00a0$, selon le quartier, la superficie, les am\u00e9nit\u00e9s et l\u2019immeuble. Downtown et le Golden Square Mile affichent les prix les plus \u00e9lev\u00e9s.',
            },
          },
          {
            '@type': 'Question',
            name: 'Quels quartiers offrent les meilleurs penthouses \u00e0 Montr\u00e9al?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Downtown (centre-ville), le Vieux-Montr\u00e9al, Griffintown, Westmount et le Golden Square Mile sont les secteurs phares. Chaque quartier offre une atmosph\u00e8re distincte — des lofts industriels de Griffintown aux tours de prestige du centre-ville.',
            },
          },
          {
            '@type': 'Question',
            name: 'Quelles am\u00e9nit\u00e9s trouve-t-on dans les penthouses \u00e0 Montr\u00e9al?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Les penthouses montr\u00e9alais offrent typiquement des terrasses priv\u00e9es, des vues panoramiques sur le fleuve ou la ville, un service de conciergerie, des stationnements doubles, des plafonds hauts et des finitions de luxe sur mesure.',
            },
          },
          {
            '@type': 'Question',
            name: 'Un penthouse est-il un bon investissement \u00e0 Montr\u00e9al?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Les penthouses tendent \u00e0 pr\u00e9server leur valeur et \u00e0 s\u2019appr\u00e9cier plus rapidement que les unit\u00e9s standard en p\u00e9riode haussire, en raison de leur raret\u00e9. Ils sont \u00e9galement tr\u00e8s demand\u00e9s en location de luxe, g\u00e9n\u00e9rant des revenus locatifs sup\u00e9rieurs \u00e0 la moyenne.',
            },
          },
          {
            '@type': 'Question',
            name: 'Comment acheter un penthouse \u00e0 Montr\u00e9al avec Jeremy Soares?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Contactez Jeremy Soares au 514-519-8177 ou par courriel \u00e0 JeremySoares@icloud.com. Courtier OACIQ H2731, il vous accompagne de la recherche initiale \u00e0 la cl\u00f4ture, avec un acc\u00e8s aux inscriptions hors march\u00e9 et aux propri\u00e9t\u00e9s en pr\u00e9vente.',
            },
          },
          {
            '@type': 'Question',
            name: 'Quelle est la diff\u00e9rence entre un penthouse et un appartement ordinaire?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Un penthouse occupe g\u00e9n\u00e9ralement le ou les derniers \u00e9tages d\u2019un immeuble. Il offre des superficies plus grandes, des plafonds plus hauts, des terrasses ext\u00e9rieures priv\u00e9es, des vues d\u00e9gag\u00e9es et souvent des acc\u00e8s ascenseur privatifs.',
            },
          },
          {
            '@type': 'Question',
            name: 'Y a-t-il des taxes sp\u00e9ciales pour l\u2019achat d\u2019un penthouse \u00e0 Montr\u00e9al?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Les acheteurs sont soumis aux droits de mutation immobili\u00e8re (\u00ab taxe de bienvenue \u00bb). Pour les propri\u00e9t\u00e9s de plus de 500\u202F000\u00a0$, un taux additionnel de 3\u00a0% s\u2019applique \u00e0 la tranche exc\u00e9dant ce seuil. Des droits de mutation plus \u00e9lev\u00e9s s\u2019appliquent \u00e0 la tranche d\u00e9passant 1\u202F500\u202F000\u00a0$.',
            },
          },
        ]
      : [
          {
            '@type': 'Question',
            name: 'What is the average price of a penthouse in Montreal?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Montreal penthouses typically sell between $900,000 and over $5,000,000, depending on neighbourhood, square footage, amenities, and building prestige. Downtown and Golden Square Mile command the highest prices.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which neighbourhoods have the best penthouses in Montreal?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Downtown, Old Montreal, Griffintown, Westmount, and the Golden Square Mile are the premier penthouse markets. Each offers a distinct character — from Griffintown\u2019s industrial-chic lofts to Downtown\u2019s glass towers with river views.',
            },
          },
          {
            '@type': 'Question',
            name: 'What amenities do Montreal penthouses typically offer?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Montreal penthouses commonly feature private terraces, panoramic city or river views, 24/7 concierge service, private elevator access, double parking, high ceilings, and bespoke luxury finishes.',
            },
          },
          {
            '@type': 'Question',
            name: 'Are penthouses a good investment in Montreal?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Penthouses tend to hold value and appreciate faster than standard units during rising markets, due to scarcity. They also command premium rental income, making them strong assets for investors targeting the luxury rental segment.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I buy a penthouse in Montreal with Jeremy Soares?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Contact Jeremy Soares at 514-519-8177 or JeremySoares@icloud.com. As an OACIQ broker (H2731), he guides you from initial search through closing, with access to off-market listings and pre-sale opportunities.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between a penthouse and a regular condo?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A penthouse typically occupies the top floor or floors of a building. It features larger square footage, higher ceilings, private outdoor terraces, unobstructed views, and often a private elevator or dedicated lobby access.',
            },
          },
          {
            '@type': 'Question',
            name: 'Are there special taxes when buying a penthouse in Montreal?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Buyers pay the Quebec land transfer tax ("welcome tax"). For properties above $500,000, an additional 3% bracket applies. Properties above $1,500,000 attract a further higher bracket. Your notary will calculate the exact amount at closing.',
            },
          },
        ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function PenthousesMontrealPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr-ca'

  const buildings = isFr
    ? [
        {
          number: '01',
          area: 'Centre-ville',
          name: 'Tours de prestige',
          desc: 'Les tours de verre du centre-ville offrent des penthouses avec des vues imprenables sur le Saint-Laurent et le mont Royal. Des immeubles comme le 1 Square Phillips et le YUL Condominiums repr\u00e9sentent le summum du prestige urbain.',
        },
        {
          number: '02',
          area: 'Vieux-Montr\u00e9al',
          name: 'Lofts patrimoiniaux',
          desc: 'Le Vieux-Montr\u00e9al convertit des entrepôts du XIX\u1d49 si\u00e8cle en penthouses d\u2019exception. Poutres apparentes, pierres de taille et terrasses sur les toits avec vue sur le port forment un cadre unique au monde.',
        },
        {
          number: '03',
          area: 'Griffintown',
          name: 'Design industriel \u00e9lev\u00e9',
          desc: 'Quartier en plein essor, Griffintown conjugue h\u00e9ritage industriel et architecture contemporaine. Les penthouses y affichent des plafonds de 14 pieds, des fen\u00eatres panoramiques et des terrasses avec vue sur le canal de Lachine.',
        },
        {
          number: '04',
          area: 'Westmount',
          name: '\u00cele de tranquillit\u00e9',
          desc: 'Westmount, enclave r\u00e9sidentielle cossu\u00e9, propose des penthouses dans des immeubles boutique de faible hauteur. Jardins priv\u00e9s, s\u00e9curit\u00e9 discr\u00e8te et proximit\u00e9 des meilleures \u00e9coles et commerces haut de gamme.',
        },
        {
          number: '05',
          area: 'Golden Square Mile',
          name: 'H\u00e9ritage et \u00e9l\u00e9gance',
          desc: 'Le Golden Square Mile, berceau historique de la bourgeoisie montr\u00e9alaise, accueille des penthouses dans des immeubles de pierre class\u00e9s et des constructions contemporaines sur mesure.',
        },
      ]
    : [
        {
          number: '01',
          area: 'Downtown',
          name: 'Prestige towers',
          desc: 'Downtown\u2019s glass towers deliver penthouses with unobstructed sightlines across the St. Lawrence and Mount Royal. Buildings like 1 Square Phillips and YUL Condominiums define the apex of urban prestige in Montreal.',
        },
        {
          number: '02',
          area: 'Old Montreal',
          name: 'Heritage lofts elevated',
          desc: 'Old Montreal transforms 19th-century warehouses into exceptional penthouses. Exposed beams, fieldstone walls, and rooftop terraces overlooking the Old Port create a residential experience found nowhere else in Canada.',
        },
        {
          number: '03',
          area: 'Griffintown',
          name: 'Industrial design, elevated',
          desc: 'Griffintown merges industrial heritage with contemporary architecture. Penthouses here feature 14-foot ceilings, floor-to-ceiling windows, and terraces with views over the Lachine Canal.',
        },
        {
          number: '04',
          area: 'Westmount',
          name: 'Quiet prestige',
          desc: 'Westmount\u2019s residential enclave offers boutique low-rise penthouses with private gardens, discreet security, and proximity to Montreal\u2019s finest schools, restaurants, and boutiques.',
        },
        {
          number: '05',
          area: 'Golden Square Mile',
          name: 'Heritage and elegance',
          desc: 'The Golden Square Mile, Montreal\u2019s historic bourgeois enclave, hosts penthouses in classified stone buildings and bespoke contemporary constructions — the rarest residential real estate in the city.',
        },
      ]

  const processSteps = isFr
    ? [
        { num: '01', title: 'D\u00e9finir', desc: 'Crit\u00e8res de recherche, budget, quartier, \u00e9tage minimum, terrasse, vue, stationnement.' },
        { num: '02', title: 'Acc\u00e8s', desc: 'Inscriptions hors march\u00e9, r\u00e9seau de 14\u202F000 courtiers, pr\u00e9ventes — acc\u00e8s avant la mise en march\u00e9 publique.' },
        { num: '03', title: 'Analyser', desc: 'Comparables r\u00e9cents, \u00e9tude des charges de copropri\u00e9t\u00e9, \u00e9valuation des r\u00e9novations et des coûts de gestion.' },
        { num: '04', title: 'N\u00e9gocier', desc: 'Offre strat\u00e9gique, conditions protectrices, inspection sp\u00e9cialis\u00e9e. Chaque d\u00e9tail est n\u00e9goci\u00e9.' },
        { num: '05', title: 'Conclure', desc: 'Coordination avec le notaire, gestion des d\u00e9lais, remise des cl\u00e9s. Accompagnement complet jusqu\u2019\u00e0 la signature.' },
      ]
    : [
        { num: '01', title: 'Define', desc: 'Search criteria, budget, neighbourhood, minimum floor, terrace, view requirements, parking.' },
        { num: '02', title: 'Access', desc: 'Off-market listings, 14,000-broker network, pre-sales — access before public launch.' },
        { num: '03', title: 'Analyse', desc: 'Recent comparables, condo fee review, renovation assessment, ongoing cost modelling.' },
        { num: '04', title: 'Negotiate', desc: 'Strategic offer, protective conditions, specialized inspection. Every detail negotiated.' },
        { num: '05', title: 'Close', desc: 'Notary coordination, deadline management, key handover. Full accompaniment to signature.' },
      ]

  const faqs = isFr
    ? [
        {
          q: 'Quel est le prix moyen d\u2019un penthouse \u00e0 Montr\u00e9al?',
          a: 'Les penthouses \u00e0 Montr\u00e9al se vendent g\u00e9n\u00e9ralement entre 900\u202F000\u00a0$ et plus de 5\u202F000\u202F000\u00a0$, selon le quartier, la superficie, les am\u00e9nit\u00e9s et le prestige de l\u2019immeuble. Downtown et le Golden Square Mile affichent les prix les plus \u00e9lev\u00e9s.',
        },
        {
          q: 'Quels quartiers offrent les meilleurs penthouses \u00e0 Montr\u00e9al?',
          a: 'Downtown, le Vieux-Montr\u00e9al, Griffintown, Westmount et le Golden Square Mile sont les secteurs phares. Chaque quartier offre une atmosph\u00e8re distincte — des lofts industriels de Griffintown aux tours de prestige du centre-ville.',
        },
        {
          q: 'Quelles am\u00e9nit\u00e9s trouve-t-on dans les penthouses \u00e0 Montr\u00e9al?',
          a: 'Les penthouses montr\u00e9alais offrent typiquement des terrasses priv\u00e9es, des vues panoramiques sur le fleuve ou la ville, un service de conciergerie, des stationnements doubles, des plafonds hauts et des finitions de luxe sur mesure.',
        },
        {
          q: 'Un penthouse est-il un bon investissement \u00e0 Montr\u00e9al?',
          a: 'Les penthouses tendent \u00e0 pr\u00e9server leur valeur et \u00e0 s\u2019appr\u00e9cier plus rapidement que les unit\u00e9s standard en p\u00e9riode haussire, en raison de leur raret\u00e9. Ils g\u00e9n\u00e8rent \u00e9galement des revenus locatifs sup\u00e9rieurs \u00e0 la moyenne dans le segment luxe.',
        },
        {
          q: 'Comment acheter un penthouse \u00e0 Montr\u00e9al avec Jeremy Soares?',
          a: 'Contactez Jeremy Soares au 514-519-8177 ou \u00e0 JeremySoares@icloud.com. Courtier OACIQ H2731, il vous accompagne de la recherche initiale \u00e0 la cl\u00f4ture, avec un acc\u00e8s aux inscriptions hors march\u00e9 et aux propri\u00e9t\u00e9s en pr\u00e9vente.',
        },
        {
          q: 'Quelle est la diff\u00e9rence entre un penthouse et un appartement ordinaire?',
          a: 'Un penthouse occupe g\u00e9n\u00e9ralement le ou les derniers \u00e9tages d\u2019un immeuble. Il offre des superficies plus grandes, des plafonds plus hauts, des terrasses ext\u00e9rieures priv\u00e9es, des vues d\u00e9gag\u00e9es et souvent des acc\u00e8s ascenseur privatifs.',
        },
        {
          q: 'Y a-t-il des taxes sp\u00e9ciales pour l\u2019achat d\u2019un penthouse \u00e0 Montr\u00e9al?',
          a: 'Les acheteurs sont soumis aux droits de mutation immobili\u00e8re (\u00ab taxe de bienvenue \u00bb). Pour les propri\u00e9t\u00e9s de plus de 500\u202F000\u00a0$, un taux additionnel de 3\u00a0% s\u2019applique. Des droits plus \u00e9lev\u00e9s s\u2019appliquent au-del\u00e0 de 1\u202F500\u202F000\u00a0$.',
        },
      ]
    : [
        {
          q: 'What is the average price of a penthouse in Montreal?',
          a: 'Montreal penthouses typically sell between $900,000 and over $5,000,000, depending on neighbourhood, square footage, amenities, and building prestige. Downtown and Golden Square Mile command the highest prices.',
        },
        {
          q: 'Which neighbourhoods have the best penthouses in Montreal?',
          a: 'Downtown, Old Montreal, Griffintown, Westmount, and the Golden Square Mile are the premier markets. Each has a distinct character — from Griffintown\u2019s industrial-chic lofts to Downtown\u2019s glass towers with river views.',
        },
        {
          q: 'What amenities do Montreal penthouses typically offer?',
          a: 'Montreal penthouses commonly feature private terraces, panoramic city or river views, 24/7 concierge service, private elevator access, double parking, high ceilings, and bespoke luxury finishes.',
        },
        {
          q: 'Are penthouses a good investment in Montreal?',
          a: 'Penthouses tend to hold value and appreciate faster than standard units during rising markets, due to scarcity. They also command premium rental income, making them strong assets for investors targeting the luxury rental segment.',
        },
        {
          q: 'How do I buy a penthouse in Montreal with Jeremy Soares?',
          a: 'Contact Jeremy Soares at 514-519-8177 or JeremySoares@icloud.com. As OACIQ broker H2731, he guides you from initial search through closing, with access to off-market listings and pre-sale opportunities.',
        },
        {
          q: 'What is the difference between a penthouse and a regular condo?',
          a: 'A penthouse typically occupies the top floor or floors of a building, featuring larger square footage, higher ceilings, private outdoor terraces, unobstructed views, and often a dedicated private elevator or lobby access.',
        },
        {
          q: 'Are there special taxes when buying a penthouse in Montreal?',
          a: 'Buyers pay the Quebec land transfer tax ("welcome tax"). Properties above $500,000 attract an additional 3% bracket. Properties above $1,500,000 attract a further higher bracket. Your notary calculates the exact amount at closing.',
        },
      ]

  return (
    <>
      <PenthouseJsonLd locale={locale} />

      {/* ── Hero — void ──────────────────────────────────────────────────── */}
      <Section theme="void" className="pt-32 pb-20 md:pt-44 md:pb-28">
        <Container size="lg">
          <Label className="mb-8">{isFr ? '(Penthouses Montr\u00e9al)' : '(Penthouses Montreal)'}</Label>

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
              {isFr ? 'Penthouse\n\u00e0 vendre\nMontr\u00e9al' : 'Penthouse\nfor sale\nMontreal'}
            </TextReveal>
          </div>

          <SectionReveal delay={0.35} className="mt-6">
            <p
              className="text-[var(--color-cream)] opacity-35"
              style={{
                fontFamily: FONT_DM_SERIF,
                fontStyle: 'italic',
                fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
              }}
            >
              {isFr
                ? 'Terrasses priv\u00e9es. Vues panoramiques. Conciergerie. Le summum de l\u2019art de vivre montr\u00e9alais.'
                : 'Private terraces. Panoramic views. Concierge service. The pinnacle of Montreal living.'}
            </p>
          </SectionReveal>

          <SectionReveal delay={0.5} className="mt-4 max-w-lg">
            <p
              className="leading-relaxed text-[var(--color-cream)] opacity-40"
              style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
            >
              {isFr
                ? 'Jeremy Soares, courtier OACIQ H2731. Acc\u00e8s exclusif aux penthouses hors march\u00e9 \u00e0 Montr\u00e9al.'
                : 'Jeremy Soares, OACIQ broker H2731. Exclusive access to off-market penthouses across Montreal.'}
            </p>
          </SectionReveal>

          <SectionReveal delay={0.6} className="mt-10 flex flex-wrap gap-4">
            <Button variant="primary" theme="dark" href={`/${locale}/contact`} size="lg">
              {isFr ? 'Parler \u00e0 Jeremy' : 'Talk to Jeremy'}
            </Button>
            <Button variant="ghost" theme="dark" href={`/${locale}/real-estate`} size="lg">
              {isFr ? 'Voir les inscriptions' : 'View listings'}
            </Button>
          </SectionReveal>
        </Container>
      </Section>

      {/* ── What defines a penthouse — cream ─────────────────────────────── */}
      <Section theme="cream" className="py-24 md:py-36 relative overflow-hidden">
        <Container size="lg">
          <SectionReveal>
            <Label className="mb-10 text-[var(--color-void)]">
              {isFr ? '(D\u00e9finition)' : '(Definition)'}
            </Label>
          </SectionReveal>

          <div
            className="mb-12"
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
              {isFr ? 'Ce qui d\u00e9finit un penthouse' : 'What defines a penthouse'}
            </TextReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
            <SectionReveal className="md:col-span-5">
              <p
                className="text-[var(--color-void)] opacity-60 leading-relaxed"
                style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
              >
                {isFr
                  ? 'Un penthouse n\u2019est pas simplement un appartement en \u00e9tage \u00e9lev\u00e9. C\u2019est une cat\u00e9gorie \u00e0 part : le ou les derniers niveaux d\u2019un immeuble, souvent en duplex, avec des espaces de vie \u00e9tendus et des terrasses priv\u00e9es accessibles directement depuis l\u2019unit\u00e9.'
                  : 'A penthouse is not simply a high-floor apartment. It is a category unto itself: the top level or levels of a building, often duplex, with expansive living spaces and private terraces accessible directly from the unit.'}
              </p>
              <p
                className="text-[var(--color-void)] opacity-60 leading-relaxed mt-4"
                style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
              >
                {isFr
                  ? '\u00c0 Montr\u00e9al, les penthouses repr\u00e9sentent moins de 1\u00a0% du parc condominial. Cette raret\u00e9 structurelle, combin\u00e9e \u00e0 des am\u00e9nit\u00e9s exclusives, explique leur r\u00e9silience de valeur \u00e0 travers les cycles immobiliers.'
                  : 'In Montreal, penthouses represent less than 1% of the condo stock. This structural scarcity, combined with exclusive amenities, explains their value resilience across real estate cycles.'}
              </p>
            </SectionReveal>
            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  label: isFr ? 'Terrasse priv\u00e9e' : 'Private terrace',
                  desc: isFr ? 'Espace ext\u00e9rieur exclusif, non partag\u00e9 avec les autres r\u00e9sidents de l\u2019immeuble.' : 'Exclusive outdoor space, unshared with other building residents.',
                },
                {
                  label: isFr ? 'Plafonds \u00e9lev\u00e9s' : 'High ceilings',
                  desc: isFr ? 'G\u00e9n\u00e9ralement 11 \u00e0 16 pieds, cr\u00e9ant une sensation d\u2019espace unique.' : 'Typically 11 to 16 feet, creating a rare sense of spatial volume.',
                },
                {
                  label: isFr ? 'Vues d\u00e9gag\u00e9es' : 'Unobstructed views',
                  desc: isFr ? 'Position en \u00e9tage sup\u00e9rieur garantissant des perspectives permanentes.' : 'Top-floor position guaranteeing permanent sightlines.',
                },
                {
                  label: isFr ? 'Acc\u00e8s s\u00e9curis\u00e9' : 'Secured access',
                  desc: isFr ? 'Ascenseur priv\u00e9 ou s\u00e9curis\u00e9, hall d\u2019entr\u00e9e exclusif, conciergerie.' : 'Private or secured elevator, exclusive lobby, concierge.',
                },
              ].map((item) => (
                <SectionReveal key={item.label}>
                  <div className="border-t border-[rgba(14,16,17,0.12)] pt-5">
                    <h3
                      className="text-[var(--color-void)] font-black uppercase mb-2 leading-tight"
                      style={{
                        fontFamily: FONT_BARLOW,
                        fontSize: '1rem',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {item.label}
                    </h3>
                    <p
                      className="text-[var(--color-void)] opacity-50 leading-relaxed"
                      style={{ fontFamily: FONT_DM_SANS, fontSize: '0.8125rem' }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Key buildings and areas — void ───────────────────────────────── */}
      <Section theme="void" className="py-24 md:py-36">
        <Container size="lg">
          <Label className="mb-10">
            {isFr ? '(Quartiers)' : '(Neighbourhoods)'}
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
              {isFr ? 'Les meilleurs secteurs' : 'The best areas'}
            </TextReveal>
          </div>

          <div className="border-t" style={{ borderColor: 'rgba(236,234,229,0.08)' }}>
            {buildings.map((item, i) => (
              <SectionReveal key={item.number} delay={i * 0.07}>
                <div
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 py-10 border-b"
                  style={{ borderColor: 'rgba(236,234,229,0.08)' }}
                >
                  <div className="md:col-span-1 flex items-start pt-1">
                    <span
                      className="uppercase text-[var(--color-cream)] opacity-25"
                      style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em', fontWeight: 500 }}
                    >
                      {item.number}
                    </span>
                  </div>
                  <div className="md:col-span-3">
                    <span
                      className="block uppercase text-[#e8762a] mb-1"
                      style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em', fontWeight: 500 }}
                    >
                      {item.area}
                    </span>
                    <h3
                      className="text-[var(--color-cream)] leading-tight"
                      style={{
                        fontFamily: FONT_DM_SERIF,
                        fontStyle: 'italic',
                        fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)',
                      }}
                    >
                      {item.name}
                    </h3>
                  </div>
                  <div className="md:col-span-8">
                    <p
                      className="text-[var(--color-cream)] opacity-50 leading-relaxed"
                      style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Investment value — cream ──────────────────────────────────────── */}
      <Section theme="cream" className="py-24 md:py-36 relative overflow-hidden">
        <Container size="lg">
          <SectionReveal>
            <Label className="mb-10 text-[var(--color-void)]">
              {isFr ? '(Investissement)' : '(Investment)'}
            </Label>
          </SectionReveal>

          <div
            className="mb-10"
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
              {isFr ? 'Valeur et rendement' : 'Value and returns'}
            </TextReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                stat: isFr ? '< 1%' : '< 1%',
                label: isFr ? 'Du parc condominial' : 'Of the condo stock',
                desc: isFr
                  ? 'La raret\u00e9 structure les prix. Moins d\u2019offre signifie moins de comp\u00e9tition \u00e0 la vente.'
                  : 'Scarcity structures pricing. Less supply means less competition at resale.',
              },
              {
                stat: isFr ? '+12%' : '+12%',
                label: isFr ? 'Appr\u00e9ciation sur 5 ans' : '5-year appreciation',
                desc: isFr
                  ? 'Les penthouses en zone centrale ont surperform\u00e9 le march\u00e9 condo standard \u00e0 Montr\u00e9al sur 5 ans.'
                  : 'Penthouses in central zones outperformed the standard Montreal condo market over 5 years.',
              },
              {
                stat: isFr ? '4\u20135%' : '4\u20135%',
                label: isFr ? 'Rendement locatif brut' : 'Gross rental yield',
                desc: isFr
                  ? 'Segment luxe : demande stable de cadres expatri\u00e9s, diplomates et dirigeants d\u2019entreprise.'
                  : 'Luxury segment: steady demand from expatriate executives, diplomats, and corporate leaders.',
              },
            ].map((item) => (
              <SectionReveal key={item.label}>
                <div className="border-t border-[rgba(14,16,17,0.12)] pt-6">
                  <span
                    className="block text-[var(--color-void)] font-black uppercase mb-1 leading-none"
                    style={{
                      fontFamily: FONT_BARLOW,
                      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {item.stat}
                  </span>
                  <span
                    className="block text-[var(--color-void)] uppercase mb-3 opacity-40"
                    style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.18em', fontWeight: 500 }}
                  >
                    {item.label}
                  </span>
                  <p
                    className="text-[var(--color-void)] opacity-55 leading-relaxed"
                    style={{ fontFamily: FONT_DM_SANS, fontSize: '0.8125rem' }}
                  >
                    {item.desc}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Buying process — void ─────────────────────────────────────────── */}
      <Section theme="void" className="py-24 md:py-36">
        <Container size="lg">
          <Label className="mb-10">{isFr ? '(Le processus)' : '(The process)'}</Label>

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
              {isFr ? 'Comment acheter' : 'How to buy'}
            </TextReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {processSteps.map((step) => (
              <SectionReveal key={step.num}>
                <div className="border-t border-[rgba(236,234,229,0.1)] pt-6">
                  <span
                    className="text-[0.625rem] tracking-[0.22em] uppercase text-[#e8762a] font-bold"
                    style={{ fontFamily: FONT_DM_SANS }}
                  >
                    {step.num}
                  </span>
                  <h3
                    className="text-[1.1rem] font-black tracking-tight text-[var(--color-cream)] uppercase mt-4 mb-3"
                    style={{ fontFamily: FONT_BARLOW }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-[0.8125rem] text-[var(--color-cream)] opacity-45 leading-relaxed"
                    style={{ fontFamily: FONT_DM_SANS }}
                  >
                    {step.desc}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── FAQ — cream ───────────────────────────────────────────────────── */}
      <Section theme="cream" className="py-24 md:py-36 relative overflow-hidden">
        <Container size="lg">
          <SectionReveal>
            <Label className="mb-10 text-[var(--color-void)]">
              {isFr ? '(Questions fr\u00e9quentes)' : '(FAQ)'}
            </Label>
          </SectionReveal>

          <div
            className="mb-12"
            style={{
              fontFamily: FONT_BARLOW,
              fontWeight: 900,
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              letterSpacing: '-0.02em',
            }}
          >
            <TextReveal
              as="h2"
              split="words"
              className="leading-none uppercase text-[var(--color-void)]"
            >
              {isFr ? 'Questions fr\u00e9quentes' : 'Frequently asked questions'}
            </TextReveal>
          </div>

          <div className="border-t border-[rgba(14,16,17,0.1)]">
            {faqs.map((faq, i) => (
              <SectionReveal key={i} delay={i * 0.05}>
                <div className="py-8 border-b border-[rgba(14,16,17,0.1)] grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10">
                  <div className="md:col-span-5">
                    <h3
                      className="text-[var(--color-void)] leading-snug"
                      style={{
                        fontFamily: FONT_DM_SERIF,
                        fontStyle: 'italic',
                        fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
                      }}
                    >
                      {faq.q}
                    </h3>
                  </div>
                  <div className="md:col-span-7">
                    <p
                      className="text-[var(--color-void)] opacity-55 leading-relaxed"
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

      {/* ── Internal links band — void ────────────────────────────────────── */}
      <Section theme="void" className="py-14 md:py-16 border-t border-[rgba(236,234,229,0.06)]">
        <Container size="lg">
          <SectionReveal>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <p
                className="text-[var(--color-cream)] opacity-30 uppercase"
                style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em' }}
              >
                {isFr ? 'Explorer' : 'Explore'}
              </p>
              <div className="flex flex-wrap gap-x-10 gap-y-3">
                {[
                  { label: isFr ? 'Lofts Montr\u00e9al' : 'Lofts Montreal', href: `/${locale}/lofts-montreal` },
                  { label: isFr ? 'Terrains \u00e0 vendre' : 'Land for sale', href: `/${locale}/land-for-sale-montreal` },
                  { label: isFr ? 'Immobilier' : 'Real estate', href: `/${locale}/real-estate` },
                  { label: isFr ? 'Services' : 'Services', href: `/${locale}/services` },
                  { label: isFr ? 'Outils' : 'Tools', href: `/${locale}/tools` },
                  { label: isFr ? 'Contact' : 'Contact', href: `/${locale}/contact` },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
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
                  {isFr ? '— Votre penthouse' : '— Your penthouse'}
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
                  {isFr ? 'Trouvons le v\u00f4tre' : 'Let\u2019s find yours'}
                </TextReveal>
              </div>

              <SectionReveal delay={0.2} className="mt-6 max-w-md">
                <p
                  className="text-[var(--color-cream)] opacity-40 leading-relaxed"
                  style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                >
                  {isFr
                    ? "514-519-8177 \u00b7 JeremySoares@icloud.com. Courtier OACIQ H2731. Acc\u00e8s aux inscriptions exclusives et hors march\u00e9."
                    : '514-519-8177 \u00b7 JeremySoares@icloud.com. OACIQ broker H2731. Access to exclusive and off-market listings.'}
                </p>
              </SectionReveal>
            </div>

            <SectionReveal delay={0.15} className="flex-shrink-0 flex flex-col gap-4">
              <Button variant="primary" theme="dark" href={`/${locale}/contact`} size="lg">
                {isFr ? 'Nous contacter' : 'Get in touch'}
              </Button>
              <a
                href="tel:+15145198177"
                className="text-center text-[var(--color-cream)] opacity-40 hover:opacity-70 transition-opacity duration-200 uppercase"
                style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.18em' }}
              >
                514-519-8177
              </a>
            </SectionReveal>
          </div>
        </Container>
      </Section>
    </>
  )
}
