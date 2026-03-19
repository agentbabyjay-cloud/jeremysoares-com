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

// ─── Neighborhoods data ───────────────────────────────────────────────────────
const neighborhoods = [
  {
    slug: 'plateau-mont-royal',
    name: 'Plateau Mont-Royal',
    nameFr: 'Plateau Mont-Royal',
    tagline: 'Bohemian soul, rising values.',
    taglineFr: 'Une \u00e2me boh\u00e8me, des valeurs en hausse.',
    tag: 'Culture & Heritage',
    tagFr: 'Culture & Patrimoine',
  },
  {
    slug: 'griffintown',
    name: 'Griffintown',
    nameFr: 'Griffintown',
    tagline: 'Industrial past, condo future.',
    taglineFr: 'Pass\u00e9 industriel, avenir en condos.',
    tag: 'Urban Redevelopment',
    tagFr: 'Red\u00e9veloppement urbain',
  },
  {
    slug: 'old-montreal',
    name: 'Old Montreal',
    nameFr: 'Vieux-Montr\u00e9al',
    tagline: 'Cobblestone prestige.',
    taglineFr: 'Le prestige du pavé.',
    tag: 'Luxury & Heritage',
    tagFr: 'Luxe & Patrimoine',
  },
  {
    slug: 'downtown',
    name: 'Downtown',
    nameFr: 'Centre-ville',
    tagline: 'Walk to everything.',
    taglineFr: 'Tout à pied.',
    tag: 'Central Core',
    tagFr: 'Noyau central',
  },
  {
    slug: 'mile-end',
    name: 'Mile End',
    nameFr: 'Mile End',
    tagline: 'Creatives, cafes, character.',
    taglineFr: 'Cr\u00e9atifs, caf\u00e9s, caract\u00e8re.',
    tag: 'Arts District',
    tagFr: 'Quartier des arts',
  },
  {
    slug: 'saint-laurent',
    name: 'Saint-Laurent',
    nameFr: 'Saint-Laurent',
    tagline: 'Density and accessibility.',
    taglineFr: 'Densit\u00e9 et accessibilit\u00e9.',
    tag: 'Value & Transit',
    tagFr: 'Valeur & Transport',
  },
  {
    slug: 'westmount',
    name: 'Westmount',
    nameFr: 'Westmount',
    tagline: 'Established luxury, enduring demand.',
    taglineFr: 'Luxe \u00e9tabli, demande durable.',
    tag: 'Prestige',
    tagFr: 'Prestige',
  },
  {
    slug: 'outremont',
    name: 'Outremont',
    nameFr: 'Outremont',
    tagline: 'Quiet streets, strong fundamentals.',
    taglineFr: 'Rues tranquilles, fondamentaux solides.',
    tag: 'Family & Luxury',
    tagFr: 'Famille & Luxe',
  },
  {
    slug: 'verdun',
    name: 'Verdun',
    nameFr: 'Verdun',
    tagline: 'Waterfront upside, affordable entry.',
    taglineFr: 'Potentiel riverain, entr\u00e9e abordable.',
    tag: 'Emerging Value',
    tagFr: 'Valeur \u00e9mergente',
  },
  {
    slug: 'rosemont',
    name: 'Rosemont',
    nameFr: 'Rosemont',
    tagline: 'Family neighbourhood, investor grade.',
    taglineFr: 'Quartier familial, qualit\u00e9 investisseur.',
    tag: 'Residential Value',
    tagFr: 'R\u00e9sidentiel de valeur',
  },
  {
    slug: 'villeray',
    name: 'Villeray',
    nameFr: 'Villeray',
    tagline: 'Authentic local life, long runway.',
    taglineFr: 'Vie locale authentique, longue piste.',
    tag: 'Up & Coming',
    tagFr: 'En plein essor',
  },
  {
    slug: 'ndg',
    name: 'Notre-Dame-de-Gr\u00e2ce',
    nameFr: 'Notre-Dame-de-Gr\u00e2ce',
    tagline: 'Bilingual, tree-lined, stable.',
    taglineFr: 'Bilingue, arboris\u00e9, stable.',
    tag: 'Established',
    tagFr: '\u00c9tabli',
  },
  {
    slug: 'lachine',
    name: 'Lachine',
    nameFr: 'Lachine',
    tagline: 'Canal corridor, undervalued.',
    taglineFr: 'Corridor du canal, sous-\u00e9valu\u00e9.',
    tag: 'Canal District',
    tagFr: 'District du Canal',
  },
  {
    slug: 'anjou',
    name: 'Anjou',
    nameFr: 'Anjou',
    tagline: 'East island value play.',
    taglineFr: 'Valeur de l\u2019\u00eele Est.',
    tag: 'East Island',
    tagFr: '\u00cele Est',
  },
  {
    slug: 'laval',
    name: 'Laval',
    nameFr: 'Laval',
    tagline: 'Metro-connected suburban upside.',
    taglineFr: 'Potentiel suburbain connect\u00e9 au m\u00e9tro.',
    tag: 'Greater Montreal',
    tagFr: 'Grand Montr\u00e9al',
  },
  {
    slug: 'south-shore',
    name: 'South Shore',
    nameFr: 'Rive-Sud',
    tagline: 'Space, schools, strong ROI.',
    taglineFr: 'Espace, \u00e9coles, excellent rendement.',
    tag: 'South Shore',
    tagFr: 'Rive-Sud',
  },
]

// ─── SEO ──────────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale === 'fr-ca'
  const canonical = `https://jeremysoares.com/${locale}/neighborhoods`

  return {
    title: isFr
      ? 'Guide des quartiers de Montr\u00e9al | Immobilier par quartier — Jeremy Soares'
      : 'Montreal Neighborhoods Guide | Real Estate by Neighborhood — Jeremy Soares',
    description: isFr
      ? 'D\u00e9couvrez les quartiers de Montr\u00e9al : Plateau, Griffintown, Vieux-Montr\u00e9al, Westmount et plus. Analyse immobili\u00e8re, prix, transport et style de vie par Jeremy Soares, courtier OACIQ H2731.'
      : 'Explore Montreal neighborhoods: Plateau, Griffintown, Old Montreal, Westmount and more. Real estate analysis, pricing, transit, and lifestyle by broker Jeremy Soares. OACIQ H2731.',
    keywords: isFr
      ? [
          'quartiers Montr\u00e9al immobilier',
          'guide des quartiers Montr\u00e9al',
          'Plateau Mont-Royal immobilier',
          'Griffintown condos',
          'Westmount maisons',
          'Vieux-Montr\u00e9al appartements',
          'Jeremy Soares courtier',
          'OACIQ H2731',
        ]
      : [
          'Montreal neighborhoods real estate',
          'Montreal neighborhood guide',
          'Plateau Mont-Royal real estate',
          'Griffintown condos',
          'Westmount homes',
          'Old Montreal apartments',
          'Jeremy Soares broker',
          'OACIQ H2731',
        ],
    alternates: {
      canonical,
      languages: {
        'en-CA': 'https://jeremysoares.com/en-ca/neighborhoods',
        'fr-CA': 'https://jeremysoares.com/fr-ca/neighborhoods',
      },
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title: isFr
        ? 'Guide des quartiers de Montr\u00e9al — Jeremy Soares'
        : 'Montreal Neighborhoods Guide — Jeremy Soares',
      description: isFr
        ? 'Analyse immobili\u00e8re, prix, transport et style de vie pour chaque quartier de Montr\u00e9al.'
        : 'Real estate analysis, pricing, transit and lifestyle for every Montreal neighborhood.',
      siteName: 'Jeremy Soares',
      locale: isFr ? 'fr_CA' : 'en_CA',
    },
  }
}

// ─── JSON-LD ──────────────────────────────────────────────────────────────────
function NeighborhoodsJsonLd({ locale }: { locale: string }) {
  const isFr = locale === 'fr-ca'
  const baseUrl = 'https://jeremysoares.com'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: isFr
      ? 'Guide des quartiers de Montr\u00e9al — Jeremy Soares'
      : 'Montreal Neighborhoods Guide — Jeremy Soares',
    description: isFr
      ? 'Analyse immobili\u00e8re compl\u00e8te pour les principaux quartiers de Montr\u00e9al.'
      : 'Comprehensive real estate analysis for Montreal\u2019s key neighborhoods.',
    url: `${baseUrl}/${locale}/neighborhoods`,
    numberOfItems: neighborhoods.length,
    itemListElement: neighborhoods.map((n, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: isFr ? n.nameFr : n.name,
      url: `${baseUrl}/${locale}/neighborhoods/${n.slug}`,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

// ─── Neighborhood Card ────────────────────────────────────────────────────────
function NeighborhoodCard({
  slug,
  name,
  tagline,
  tag,
  locale,
}: {
  slug: string
  name: string
  tagline: string
  tag: string
  locale: string
}) {
  return (
    <a
      href={`/${locale}/neighborhoods/${slug}`}
      className="group block border border-[rgba(236,234,229,0.08)] p-8 md:p-10 transition-all duration-300 hover:border-[rgba(236,234,229,0.22)] hover:bg-[rgba(236,234,229,0.03)]"
      aria-label={name}
    >
      {/* Tag */}
      <span
        className="block mb-5 uppercase text-[#eceae5] opacity-25 group-hover:opacity-40 transition-opacity duration-200"
        style={{
          fontFamily: FONT_DM_SANS,
          fontSize: '9px',
          letterSpacing: '0.24em',
          fontWeight: 500,
        }}
      >
        {tag}
      </span>

      {/* Name */}
      <h2
        className="leading-none uppercase text-[#eceae5] mb-4 group-hover:opacity-80 transition-opacity duration-200"
        style={{
          fontFamily: FONT_BARLOW,
          fontWeight: 900,
          fontSize: 'clamp(1.5rem, 2.8vw, 2.25rem)',
          letterSpacing: '-0.01em',
        }}
      >
        {name}
      </h2>

      {/* Tagline */}
      <p
        className="text-[#eceae5] opacity-35 leading-snug group-hover:opacity-50 transition-opacity duration-200"
        style={{
          fontFamily: FONT_DM_SERIF,
          fontStyle: 'italic',
          fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)',
        }}
      >
        {tagline}
      </p>

      {/* Arrow */}
      <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-30 transition-opacity duration-300">
        <span
          className="uppercase text-[#eceae5]"
          style={{ fontFamily: FONT_DM_SANS, fontSize: '9px', letterSpacing: '0.18em' }}
        >
          Explore
        </span>
        <span className="text-[#eceae5] text-xs" aria-hidden="true">
          →
        </span>
      </div>
    </a>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function NeighborhoodsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr-ca'

  return (
    <>
      <NeighborhoodsJsonLd locale={locale} />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <Section theme="void" className="pt-32 pb-20 md:pt-44 md:pb-28">
        <Container size="lg">
          <Label className="mb-8">
            {isFr ? '(Quartiers)' : '(Neighborhoods)'}
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
              className="leading-none uppercase text-[#eceae5]"
            >
              {isFr ? 'Quartiers' : 'Neighborhoods'}
            </TextReveal>
            <TextReveal
              as="div"
              split="lines"
              immediate
              delay={0.25}
              className="leading-none uppercase text-[#eceae5]"
            >
              {isFr ? 'Montr\u00e9al' : 'Montreal'}
            </TextReveal>
          </div>

          <SectionReveal delay={0.4} className="mt-6 max-w-xl">
            <p
              className="text-[#eceae5] opacity-40 leading-relaxed"
              style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
            >
              {isFr
                ? 'Seize quartiers analys\u00e9s en profondeur : march\u00e9, style de vie, transport et potentiel d\u2019investissement. Par Jeremy Soares, courtier OACIQ H2731.'
                : '16 neighborhoods analyzed in depth: market conditions, lifestyle, transit, and investment potential. By Jeremy Soares, OACIQ broker H2731.'}
            </p>
          </SectionReveal>
        </Container>
      </Section>

      {/* ── Grid — cream ────────────────────────────────────────────────── */}
      <Section theme="cream" className="py-20 md:py-28 relative overflow-hidden">
        <Container size="lg">
          <SectionReveal className="mb-12">
            <div className="flex items-end justify-between gap-6">
              <p
                className="uppercase text-[#0e1011] opacity-35"
                style={{
                  fontFamily: FONT_DM_SANS,
                  fontSize: '10px',
                  letterSpacing: '0.22em',
                }}
              >
                {isFr
                  ? `${neighborhoods.length} quartiers couverts`
                  : `${neighborhoods.length} neighborhoods covered`}
              </p>
            </div>
          </SectionReveal>

          {/* Neighborhood cards — dark cards on cream background */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-[rgba(14,16,17,0.08)]">
            {neighborhoods.map((n) => (
              <div key={n.slug} className="bg-[#0e1011]">
                <NeighborhoodCard
                  slug={n.slug}
                  name={isFr ? n.nameFr : n.name}
                  tagline={isFr ? n.taglineFr : n.tagline}
                  tag={isFr ? n.tagFr : n.tag}
                  locale={locale}
                />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Context band — void ──────────────────────────────────────────── */}
      <Section theme="void" className="py-24 md:py-32">
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
            <div className="md:col-span-5">
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
                  {isFr ? '— Approche locale' : '— Local expertise'}
                </span>
              </SectionReveal>

              <div
                style={{
                  fontFamily: FONT_BARLOW,
                  fontWeight: 900,
                  fontSize: 'clamp(2.25rem, 5vw, 4rem)',
                  letterSpacing: '-0.02em',
                }}
              >
                <TextReveal
                  as="h2"
                  split="words"
                  className="leading-none uppercase text-[#eceae5]"
                >
                  {isFr ? 'Chaque quartier a ses r\u00e8gles.' : 'Every neighborhood has its own rules.'}
                </TextReveal>
              </div>
            </div>

            <div className="md:col-span-7 flex flex-col justify-center gap-6">
              <SectionReveal delay={0.1}>
                <p
                  className="text-[#eceae5] opacity-50 leading-relaxed"
                  style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                >
                  {isFr
                    ? "Les prix au pied carr\u00e9, la vitesse de vente et le type d\u2019acheteur varient consid\u00e9rablement d\u2019un quartier \u00e0 l\u2019autre. Ce qui fonctionne dans Griffintown ne s\u2019applique pas n\u00e9cessairement au Plateau \u2014 et encore moins \u00e0 Westmount."
                    : "Price-per-square-foot, days on market, and buyer profile vary dramatically block by block. What works in Griffintown doesn't necessarily apply on the Plateau \u2014 and Westmount plays by different rules entirely."}
                </p>
              </SectionReveal>
              <SectionReveal delay={0.2}>
                <p
                  className="text-[#eceae5] opacity-50 leading-relaxed"
                  style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                >
                  {isFr
                    ? "Ces guides sont con\u00e7us pour vous donner un avantage informationnel avant votre premi\u00e8re visite \u2014 que vous achetiez, investissiez ou explorez simplement le march\u00e9."
                    : "These guides are built to give you an information edge before your first showing \u2014 whether you're buying, investing, or just mapping the market."}
                </p>
              </SectionReveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Internal links — cream ───────────────────────────────────────── */}
      <Section theme="cream" className="py-16 md:py-20 relative overflow-hidden">
        <Container size="lg">
          <SectionReveal>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <p
                className="text-[#0e1011] opacity-40 uppercase"
                style={{
                  fontFamily: FONT_DM_SANS,
                  fontSize: '10px',
                  letterSpacing: '0.22em',
                }}
              >
                {isFr ? 'Explorer' : 'Explore'}
              </p>
              <div className="flex flex-wrap gap-x-10 gap-y-3">
                {[
                  {
                    label: isFr ? 'Immobilier' : 'Real Estate',
                    href: `/${locale}/real-estate`,
                  },
                  {
                    label: isFr ? 'Services' : 'Services',
                    href: `/${locale}/services`,
                  },
                  {
                    label: isFr ? 'Contact' : 'Contact',
                    href: `/${locale}/contact`,
                  },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-[#0e1011] opacity-60 hover:opacity-100 transition-opacity duration-200 uppercase"
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

      {/* ── CTA — void ──────────────────────────────────────────────────── */}
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
                  className="leading-none uppercase text-[#eceae5]"
                >
                  {isFr
                    ? 'Quel quartier vous convient?'
                    : 'Which neighborhood fits?'}
                </TextReveal>
              </div>

              <SectionReveal delay={0.2} className="mt-6 max-w-md">
                <p
                  className="text-[#eceae5] opacity-40 leading-relaxed"
                  style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                >
                  {isFr
                    ? "Une conversation de 15 minutes suffit g\u00e9n\u00e9ralement \u00e0 cibler les quartiers correspondant \u00e0 votre budget et \u00e0 votre style de vie."
                    : "A 15-minute conversation is usually enough to narrow down the neighborhoods that match your budget and lifestyle."}
                </p>
              </SectionReveal>
            </div>

            <SectionReveal delay={0.15} className="flex-shrink-0">
              <Button variant="primary" theme="dark" href={`/${locale}/contact`} size="lg">
                {isFr ? 'Discutons' : "Let\u2019s Talk"}
              </Button>
            </SectionReveal>
          </div>
        </Container>
      </Section>
    </>
  )
}
