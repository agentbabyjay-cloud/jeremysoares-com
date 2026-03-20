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
  const canonical = `${SITE_URL}/${locale}/lofts-montreal`

  const title = isFr
    ? 'Condos & Lofts \u00e0 Vendre \u00e0 Montr\u00e9al | Jeremy Soares \u2014 OACIQ H2731'
    : 'Condos & Lofts for Sale in Montreal | Jeremy Soares \u2014 OACIQ H2731'

  const description = isFr
    ? 'Trouvez le condo ou loft parfait \u00e0 Montr\u00e9al. Plateau, Mile-End, centre-ville, Vieux-Montr\u00e9al. Repr\u00e9sentation acheteur experte pour condos de toutes tailles. OACIQ H2731.'
    : 'Find the perfect condo or loft in Montreal. Plateau, Mile-End, downtown, Old Montreal. Expert buyer representation for condos of all sizes. OACIQ H2731.'

  return {
    title,
    description,
    keywords: isFr
      ? [
          'condos \u00e0 vendre montr\u00e9al',
          'lofts montr\u00e9al',
          'condo plateau montr\u00e9al',
          'loft mile-end',
          'condo centre-ville montr\u00e9al',
          'condo vieux-montr\u00e9al',
          'courtier condo montr\u00e9al',
          'OACIQ H2731',
        ]
      : [
          'condos for sale montreal',
          'lofts montreal',
          'plateau condo',
          'mile-end loft',
          'downtown montreal condo',
          'vieux-montreal condo',
          'condo broker montreal',
          'OACIQ H2731',
        ],
    alternates: {
      canonical,
      languages: {
        'en-CA': `${SITE_URL}/en-ca/lofts-montreal`,
        'fr-CA': `${SITE_URL}/fr-ca/lofts-montreal`,
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
          alt: isFr ? 'Condo Montr\u00e9al Jeremy Soares' : 'Condo Montreal Jeremy Soares',
        },
      ],
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

// ─── JSON-LD ───────────────────────────────────────────────────────────────────
function CondoJsonLd({ locale }: { locale: string }) {
  const isFr = locale === 'fr-ca'
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/${locale}/lofts-montreal#service`,
        serviceType: 'Condo Buyer Representation',
        name: isFr ? 'Repr\u00e9sentation Acheteur Condo Montr\u00e9al' : 'Condo Buyer Representation Montreal',
        description: isFr
          ? 'Services de courtage pour l\u2019achat de condos et lofts \u00e0 Montr\u00e9al. Plateau, Mile-End, centre-ville, Vieux-Montr\u00e9al.'
          : 'Brokerage services for buying condos and lofts in Montreal. Plateau, Mile-End, downtown, Old Montreal.',
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
              ? 'Que sont les frais de condo \u00e0 Montr\u00e9al ?'
              : 'What are condo fees in Montreal?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: isFr
                ? 'Les frais de condo couvrent l\u2019entretien des parties communes, l\u2019assurance de l\u2019immeuble et le fonds de pr\u00e9voyance. Ils varient typiquement entre 0,30\u00a0$ et 0,80\u00a0$/pi\u00b2/mois selon l\u2019\u00e2ge et les commodit\u00e9s de l\u2019immeuble.'
                : 'Condo fees cover common area maintenance, building insurance, and the contingency fund. They typically range from $0.30 to $0.80/sq ft/month depending on the building age and amenities.',
            },
          },
          {
            '@type': 'Question',
            name: isFr
              ? 'Quoi chercher lors de l\u2019achat d\u2019un condo \u00e0 Montr\u00e9al ?'
              : 'What should I look for when buying a condo in Montreal?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: isFr
                ? "Inspectez la sant\u00e9 financi\u00e8re de la syndicat, le fonds de pr\u00e9voyance, l\u2019\u00e9tat du carnet d\u2019entretien, les restrictions locatives et les projets de travaux majeurs \u00e0 venir."
                : 'Examine the condo corporation financial health, contingency fund, maintenance log, rental restrictions, and any upcoming major capital works.',
            },
          },
          {
            '@type': 'Question',
            name: isFr
              ? 'Quel est le processus d\u2019achat d\u2019un condo \u00e0 Montr\u00e9al ?'
              : 'What is the process for buying a condo in Montreal?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: isFr
                ? "Pr\u00e9approbation hypoth\u00e9caire, recherche avec Jeremy, offre d\u2019achat, inspection, \u00e9tude des documents de la copropri\u00e9t\u00e9, conditions, acte notari\u00e9. Jeremy vous guide \u00e0 chaque \u00e9tape."
                : 'Mortgage pre-approval, property search with Jeremy, purchase offer, inspection, condo document review, conditions, notarial deed. Jeremy guides you through each step.',
            },
          },
        ],
      },
    ],
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
}

// ─── Data ──────────────────────────────────────────────────────────────────────
const condoTypes = [
  {
    titleEn: 'Studio',
    titleFr: 'Studio',
    descEn: 'Efficient, single-space units ideal for solo professionals or investors seeking strong rental yields in central neighbourhoods.',
    descFr: 'Unit\u00e9s compactes id\u00e9ales pour les professionnels solo ou les investisseurs recherchant des rendements locatifs \u00e9lev\u00e9s dans les quartiers centraux.',
  },
  {
    titleEn: '1 Bedroom',
    titleFr: '1 chambre',
    descEn: 'Montreal\u2019s most in-demand condo format. Strong resale demand across all price points, from Griffintown new builds to Plateau heritage conversions.',
    descFr: 'Le format de condo le plus demand\u00e9 \u00e0 Montr\u00e9al. Forte demande \u00e0 la revente \u00e0 tous les prix, des nouvelles constructions de Griffintown aux conversions du Plateau.',
  },
  {
    titleEn: '2+ Bedrooms / Penthouse',
    titleFr: '2 chambres+ / Penthouse',
    descEn: 'Spacious family-friendly units and top-floor penthouses with terraces and panoramic views. Concentrated in downtown, Westmount, and Old Montreal.',
    descFr: 'Unit\u00e9s spacieuses pour familles et penthouses avec terrasses et vues panoramiques. Concentr\u00e9s au centre-ville, Westmount et Vieux-Montr\u00e9al.',
  },
  {
    titleEn: 'Loft Conversions',
    titleFr: 'Lofts industriels',
    descEn: 'Former industrial spaces transformed into dramatic open-plan homes. Exposed brick, high ceilings, oversized windows. Found primarily in Mile-End, Rosemont, and St-Henri.',
    descFr: 'Anciens espaces industriels transform\u00e9s en habitations \u00e0 plan ouvert. Briques apparentes, hauts plafonds, grandes fen\u00eatres. Principalement au Mile-End, Rosemont et St-Henri.',
  },
]

const neighbourhoods = [
  {
    name: 'Plateau-Mont-Royal',
    nameFr: 'Plateau-Mont-Royal',
    descEn: 'The most sought-after address in Montreal. Heritage triplexes converted to condos, tree-lined streets, independent boutiques. High demand drives strong appreciation.',
    descFr: 'L\u2019adresse la plus recherch\u00e9e \u00e0 Montr\u00e9al. Triplex patrimoniaux convert\u00e9s en condos, rues bois\u00e9es, boutiques ind\u00e9pendantes. Forte demande et appr\u00e9ciation soutenue.',
  },
  {
    name: 'Mile-End',
    nameFr: 'Mile-End',
    descEn: 'Creative hub bordering the Plateau. Former warehouses now hold characterful lofts. A magnet for artists, tech workers, and young professionals.',
    descFr: 'P\u00f4le cr\u00e9atif adjacent au Plateau. D\u2019anciens entrep\u00f4ts abritent des lofts de caract\u00e8re. Attire artistes, travailleurs tech et jeunes professionnels.',
  },
  {
    name: 'Downtown (Ville-Marie)',
    nameFr: 'Centre-ville (Ville-Marie)',
    descEn: 'High-rise towers with hotel-style amenities, concierge, rooftop pools. Ideal for buyers seeking lock-and-leave convenience at the centre of everything.',
    descFr: 'Tours \u00e0 haute altitude avec commodit\u00e9s h\u00f4teli\u00e8res, concierge, piscines sur toit. Id\u00e9al pour acheteurs recherchant praticité en plein c\u0153ur de la ville.',
  },
  {
    name: 'Old Montreal',
    nameFr: 'Vieux-Montr\u00e9al',
    descEn: 'Prestige heritage buildings with exposed stone and original wooden beams. A finite, non-reproducible inventory keeps values stable and high.',
    descFr: 'B\u00e2timents patrimoniaux de prestige avec pierres apparentes et poutres originales. Inventaire limit\u00e9 et non reproductible maintient des valeurs stables et \u00e9lev\u00e9es.',
  },
  {
    name: 'Rosemont',
    nameFr: 'Rosemont\u2013La Petite-Patrie',
    descEn: 'One of the best value-for-money markets in Montreal. Excellent transit, family-friendly parks, growing restaurant and cafe scene. Loft conversions available.',
    descFr: "L'un des meilleurs rapports qualit\u00e9-prix \u00e0 Montr\u00e9al. Excellent transport en commun, parcs familiaux, sc\u00e8ne restauration en plein essor. Lofts disponibles.",
  },
  {
    name: 'Westmount',
    nameFr: 'Westmount',
    descEn: 'Upper-end boutique buildings in a prestigious enclave. Limited condo supply alongside stately single-family homes. Strong long-term capital appreciation.',
    descFr: 'Immeubles boutique haut de gamme dans une enclave prestigieuse. Offre limit\u00e9e aux c\u00f4t\u00e9s de majestueuses maisons unifamiliales. Forte appr\u00e9ciation \u00e0 long terme.',
  },
]

// ─── Page ──────────────────────────────────────────────────────────────────────
export default async function LoftsMontralPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr-ca'

  return (
    <>
      <CondoJsonLd locale={locale} />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <Section theme="void" className="pt-32 pb-16 md:pt-40 md:pb-20">
        <Container size="lg">
          <Label className="mb-8">{isFr ? '(Condos & Lofts)' : '(Condos & Lofts)'}</Label>
          <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, letterSpacing: '-0.02em' }}>
            <TextReveal
              as="h1"
              split="words"
              immediate
              delay={0.15}
              className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-tight tracking-tight text-[#eceae5] uppercase"
            >
              {isFr ? 'Condos & Lofts\nMontr\u00e9al' : 'Condos & Lofts\nMontr\u00e9al'}
            </TextReveal>
          </div>
          <SectionReveal delay={0.35} className="mt-6 max-w-lg">
            <p className="text-[#eceae5] opacity-50 leading-relaxed" style={{ fontFamily: FONT_DM_SANS, fontSize: 'clamp(0.9375rem,1.5vw,1.125rem)' }}>
              {isFr
                ? 'Connaissance approfondie du march\u00e9 des condos de Montr\u00e9al. Du studio au penthouse, Jeremy vous repr\u00e9sente avec pr\u00e9cision. OACIQ H2731.'
                : 'Deep knowledge of the Montreal condo market. From studio to penthouse, Jeremy represents you with precision. OACIQ H2731.'}
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

      {/* ── Hero image ─────────────────────────────────────────────────────── */}
      <Section theme="cream" className="py-0">
        <img
          src="/images/buy-sell-rent/condo.jpg"
          alt="Condo for sale in Montreal — Jeremy Soares"
          style={{ width: '100%', height: '480px', objectFit: 'cover' }}
        />
      </Section>

      {/* ── Why condos ─────────────────────────────────────────────────────── */}
      <Section theme="void" className="py-24 md:py-32">
        <Container size="lg">
          <Label className="mb-8">{isFr ? '(Pourquoi Montr\u00e9al)' : '(Why Montreal)'}</Label>
          <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, letterSpacing: '-0.02em' }}>
            <TextReveal as="h2" split="words" className="text-[clamp(2rem,5vw,3.75rem)] font-black leading-none tracking-tight text-[#eceae5] uppercase mb-12">
              {isFr ? "Pourquoi les Condos \u00e0 Montr\u00e9al" : 'Why Condos in Montreal'}
            </TextReveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                num: '01',
                titleEn: 'Urban Lifestyle',
                titleFr: 'Mode de vie urbain',
                descEn: 'Montreal condo living puts you steps from world-class restaurants, independent boutiques, and the metro. Walkability scores rank among the highest in Canada, making car-free living genuinely viable.',
                descFr: 'La vie en condo \u00e0 Montr\u00e9al vous place \u00e0 deux pas de restaurants de classe mondiale, de boutiques ind\u00e9pendantes et du m\u00e9tro. Les scores de marchabilit\u00e9 comptent parmi les plus \u00e9lev\u00e9s au Canada.',
              },
              {
                num: '02',
                titleEn: 'Investment Value',
                titleFr: 'Valeur d\u2019investissement',
                descEn: "Montreal condos have demonstrated consistent long-term appreciation, outpacing inflation across most central neighbourhoods. The city\u2019s growing tech sector and international student population underpin durable rental demand.",
                descFr: "Les condos montr\u00e9alais ont d\u00e9montr\u00e9 une appr\u00e9ciation stable \u00e0 long terme, surpassant l\u2019inflation dans la plupart des quartiers centraux. La croissance du secteur tech et la population \u00e9tudiante internationale soutiennent la demande locative.",
              },
              {
                num: '03',
                titleEn: 'Low Maintenance',
                titleFr: 'Entretien minimal',
                descEn: 'Condo living eliminates exterior maintenance, landscaping, and major repair liability. Ideal for busy professionals, frequent travellers, and anyone who wants a high-quality home without the burden of a full property.',
                descFr: "La vie en condo \u00e9limine l\u2019entretien ext\u00e9rieur, le jardinage et la responsabilit\u00e9 des r\u00e9parations majeures. Id\u00e9al pour les professionnels occup\u00e9s et les grands voyageurs.",
              },
            ].map((item, i) => (
              <SectionReveal key={item.num} delay={i * 0.1}>
                <div className="p-8 border border-[rgba(236,234,229,0.08)] h-full">
                  <span
                    className="block mb-5"
                    style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '2.5rem', color: 'rgba(236,234,229,0.15)' }}
                  >
                    {item.num}
                  </span>
                  <h3
                    className="text-[#eceae5] mb-4 uppercase"
                    style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '1.1rem', letterSpacing: '0.04em' }}
                  >
                    {isFr ? item.titleFr : item.titleEn}
                  </h3>
                  <p className="text-[#eceae5] opacity-50 leading-relaxed" style={{ fontFamily: FONT_DM_SANS, fontSize: '0.875rem' }}>
                    {isFr ? item.descFr : item.descEn}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Condo types ────────────────────────────────────────────────────── */}
      <Section theme="cream" className="py-24 md:py-32">
        <Container size="lg">
          <Label className="mb-8">{isFr ? '(Types de condos)' : '(Condo Types)'}</Label>
          <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, letterSpacing: '-0.02em' }}>
            <TextReveal as="h2" split="words" className="text-[clamp(2rem,5vw,3.75rem)] font-black leading-none tracking-tight text-[#0e1011] uppercase mb-12">
              {isFr ? 'Types de Condos' : 'Condo Types'}
            </TextReveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {condoTypes.map((type, i) => (
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

      {/* ── Key neighbourhoods ─────────────────────────────────────────────── */}
      <Section theme="void" className="py-24 md:py-32">
        <Container size="lg">
          <Label className="mb-8">{isFr ? '(Quartiers)' : '(Neighbourhoods)'}</Label>
          <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, letterSpacing: '-0.02em' }}>
            <TextReveal as="h2" split="words" className="text-[clamp(2rem,5vw,3.75rem)] font-black leading-none tracking-tight text-[#eceae5] uppercase mb-12">
              {isFr ? 'Quartiers Cl\u00e9s' : 'Key Condo Neighbourhoods'}
            </TextReveal>
          </div>
          <div className="mt-12 border-t border-[rgba(236,234,229,0.08)]">
            {neighbourhoods.map((n, i) => (
              <SectionReveal key={n.name} delay={i * 0.06}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-10 border-b border-[rgba(236,234,229,0.08)]">
                  <div className="md:col-span-4">
                    <h3
                      className="text-[#eceae5]"
                      style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(1.1rem,2vw,1.4rem)', textTransform: 'uppercase' }}
                    >
                      {isFr ? n.nameFr : n.name}
                    </h3>
                  </div>
                  <div className="md:col-span-8">
                    <p className="text-[#eceae5] opacity-50 leading-relaxed" style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}>
                      {isFr ? n.descFr : n.descEn}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <Section theme="cream" className="py-24 md:py-32">
        <Container size="lg">
          <Label className="mb-8">{isFr ? '(FAQ)' : '(FAQ)'}</Label>
          <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, letterSpacing: '-0.02em' }}>
            <TextReveal as="h2" split="words" className="text-[clamp(2rem,5vw,3.75rem)] font-black leading-none tracking-tight text-[#0e1011] uppercase mb-12">
              {isFr ? 'Questions Fr\u00e9quentes' : 'Frequently Asked Questions'}
            </TextReveal>
          </div>
          <div className="mt-12 border-t border-[rgba(14,16,17,0.1)]">
            {[
              {
                q: isFr ? 'Que sont les frais de condo \u00e0 Montr\u00e9al ?' : 'What are condo fees in Montreal?',
                a: isFr
                  ? 'Les frais de condo couvrent l\u2019entretien des parties communes, l\u2019assurance de l\u2019immeuble et le fonds de pr\u00e9voyance. Ils varient typiquement entre 0,30\u00a0$ et 0,80\u00a0$/pi\u00b2/mois selon l\u2019\u00e2ge et les commodit\u00e9s de l\u2019immeuble. Jeremy analyse la sant\u00e9 financi\u00e8re du syndicat avant toute offre.'
                  : 'Condo fees cover common area maintenance, building insurance, and the contingency fund. They typically range from $0.30 to $0.80/sq ft/month depending on building age and amenities. Jeremy reviews the corporation\u2019s financial health before any offer.',
              },
              {
                q: isFr ? 'Quoi chercher lors de l\u2019achat d\u2019un condo \u00e0 Montr\u00e9al ?' : 'What should I look for when buying a condo in Montreal?',
                a: isFr
                  ? "Inspectez la sant\u00e9 financi\u00e8re du syndicat, le fonds de pr\u00e9voyance, l\u2019\u00e9tat du carnet d\u2019entretien, les restrictions locatives et tout projet de travaux majeurs \u00e0 venir. Un courtier exp\u00e9riment\u00e9 \u00e9vite les mauvaises surprises en interpr\u00e9tant les documents de copropri\u00e9t\u00e9."
                  : 'Examine the condo corporation financial health, contingency fund balance, maintenance log, rental restrictions, and any upcoming major capital works. An experienced broker avoids unpleasant surprises by interpreting condo documents accurately.',
              },
              {
                q: isFr ? 'Quel est le processus d\u2019achat d\u2019un condo \u00e0 Montr\u00e9al ?' : 'What is the process for buying a condo in Montreal?',
                a: isFr
                  ? "Pr\u00e9approbation hypoth\u00e9caire, recherche cibl\u00e9e avec Jeremy, offre d\u2019achat, inspection b\u00e2timent, \u00e9tude des documents de la copropri\u00e9t\u00e9, lev\u00e9e des conditions, signature de l\u2019acte notari\u00e9. Le processus complet prend g\u00e9n\u00e9ralement 60 \u00e0 90 jours."
                  : 'Mortgage pre-approval, targeted property search with Jeremy, purchase offer, building inspection, condo document review, condition removal, notarial deed signing. The complete process typically takes 60 to 90 days.',
              },
            ].map((faq, i) => (
              <SectionReveal key={i} delay={i * 0.06}>
                <div className="py-8 border-b border-[rgba(14,16,17,0.1)]">
                  <h3
                    className="text-[#0e1011] mb-3"
                    style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.02em' }}
                  >
                    {faq.q}
                  </h3>
                  <p className="text-[#0e1011] opacity-60 leading-relaxed max-w-3xl" style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}>
                    {faq.a}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <Section theme="void" className="py-28 md:py-36">
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
                <TextReveal as="h2" split="words" className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-none tracking-tight text-[#eceae5] uppercase">
                  {isFr ? 'Trouvez votre condo' : 'Find Your Condo'}
                </TextReveal>
              </div>
              <SectionReveal delay={0.2} className="mt-6 max-w-lg">
                <p className="text-[#eceae5] opacity-50 leading-relaxed" style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}>
                  {isFr
                    ? "Que vous achetiez votre premier condo ou que vous agrandissiez votre portefeuille, une conversation de 15\u00a0minutes suffit pour d\u00e9finir vos options. OACIQ H2731."
                    : "Whether you\u2019re buying your first condo or expanding your portfolio, a 15-minute conversation is enough to map your options. OACIQ H2731."}
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
              <p
                className="text-[#eceae5] opacity-30 uppercase"
                style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em' }}
              >
                {isFr ? 'Explorer' : 'Explore'}
              </p>
              <div className="flex flex-wrap gap-x-10 gap-y-3">
                {[
                  { label: isFr ? 'Penthouses' : 'Penthouses', href: `/${locale}/penthouses-montreal` },
                  { label: isFr ? 'Pr\u00e9construction' : 'Pre-Construction', href: `/${locale}/presale` },
                  { label: isFr ? 'Quartiers' : 'Neighbourhoods', href: `/${locale}/neighborhoods` },
                  { label: isFr ? 'Immobilier' : 'Real Estate', href: `/${locale}/real-estate` },
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
