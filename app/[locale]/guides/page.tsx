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

// ─── Data ─────────────────────────────────────────────────────────────────────
const guides = [
  { slug: 'how-to-buy-commercial-property-montreal', title: 'How to Buy Commercial Property in Montreal', titleFr: "Comment acheter une propri\u00e9t\u00e9 commerciale \u00e0 Montr\u00e9al", category: 'commercial' },
  { slug: 'how-to-buy-data-center-canada', title: 'How to Buy a Data Center in Canada', titleFr: "Comment acheter un centre de donn\u00e9es au Canada", category: 'data-center' },
  { slug: 'pre-construction-condo-guide-montreal', title: 'Pre-Construction Condo Guide Montreal', titleFr: "Guide pr\u00e9construction condos Montr\u00e9al", category: 'pre-construction' },
  { slug: 'investing-industrial-real-estate-quebec', title: 'Investing in Industrial Real Estate in Quebec', titleFr: "Investir dans l\u2019immobilier industriel au Qu\u00e9bec", category: 'industrial' },
  { slug: 'buying-vs-leasing-commercial-space', title: 'Buying vs Leasing Commercial Space', titleFr: "Acheter ou louer un espace commercial", category: 'commercial' },
  { slug: 'montreal-vs-toronto-real-estate-investment', title: 'Montreal vs Toronto: Real Estate Investment', titleFr: "Montr\u00e9al vs Toronto : investissement immobilier", category: 'comparison' },
  { slug: 'quebec-real-estate-buying-process', title: 'Quebec Real Estate Buying Process', titleFr: "Processus d\u2019achat immobilier au Qu\u00e9bec", category: 'residential' },
]

const categoryDescriptions: Record<string, { en: string; fr: string }> = {
  commercial: {
    en: 'Commercial & office real estate strategy in Montreal',
    fr: "Strat\u00e9gie immobilier commercial et bureaux \u00e0 Montr\u00e9al",
  },
  'data-center': {
    en: 'Data center acquisition and infrastructure investment',
    fr: "Acquisition de centres de donn\u00e9es et investissement en infrastructure",
  },
  'pre-construction': {
    en: 'Pre-construction condo buying strategy and developer analysis',
    fr: "Strat\u00e9gie d\u2019achat en pr\u00e9construction et analyse des promoteurs",
  },
  industrial: {
    en: 'Industrial property investment and logistics real estate',
    fr: "Investissement immobilier industriel et immobilier logistique",
  },
  comparison: {
    en: 'Market comparison and cross-city investment analysis',
    fr: "Comparaison de march\u00e9s et analyse d\u2019investissement",
  },
  residential: {
    en: 'Residential buying process and Quebec transaction law',
    fr: "Processus d\u2019achat r\u00e9sidentiel et droit des transactions au Qu\u00e9bec",
  },
}

// ─── SEO ──────────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale === 'fr-ca'
  const canonical = `https://jeremysoares.com/${locale}/guides`

  return {
    title: isFr
      ? "Guides Immobiliers Montr\u00e9al | Achat Commercial, Industriel, Pr\u00e9construction \u2014 Jeremy Soares"
      : 'Montreal Real Estate Guides | Commercial, Industrial, Pre-Construction — Jeremy Soares',
    description: isFr
      ? "Guides d\u2019achat immobilier au Qu\u00e9bec : immobilier commercial, industriel, centres de donn\u00e9es, pr\u00e9construction et plus. R\u00e9dig\u00e9s par Jeremy Soares, courtier OACIQ H2731."
      : 'Real estate buying guides for Quebec: commercial, industrial, data center, pre-construction and more. Written by Jeremy Soares, OACIQ broker H2731.',
    keywords: isFr
      ? [
          'guide immobilier Montr\u00e9al',
          "guide achat propri\u00e9t\u00e9 commerciale",
          "investissement immobilier Qu\u00e9bec",
          "guide pr\u00e9construction Montr\u00e9al",
          'Jeremy Soares courtier',
        ]
      : [
          'Montreal real estate guide',
          'commercial property buying guide',
          'Quebec real estate investment',
          'pre-construction guide Montreal',
          'Jeremy Soares broker',
        ],
    alternates: {
      canonical,
      languages: {
        'en-CA': 'https://jeremysoares.com/en-ca/guides',
        'fr-CA': 'https://jeremysoares.com/fr-ca/guides',
      },
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title: isFr
        ? "Guides Immobiliers Montr\u00e9al \u2014 Jeremy Soares"
        : 'Montreal Real Estate Guides — Jeremy Soares',
      description: isFr
        ? "Guides pratiques pour acheter, investir et naviguer le march\u00e9 immobilier au Qu\u00e9bec."
        : 'Practical guides for buying, investing, and navigating the Quebec real estate market.',
      siteName: 'Jeremy Soares',
      locale: isFr ? 'fr_CA' : 'en_CA',
    },
  }
}

// ─── JSON-LD ──────────────────────────────────────────────────────────────────
function GuidesJsonLd({ locale }: { locale: string }) {
  const isFr = locale === 'fr-ca'
  const baseUrl = 'https://jeremysoares.com'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: isFr
      ? 'Guides immobiliers \u2014 Jeremy Soares'
      : 'Real Estate Guides \u2014 Jeremy Soares',
    description: isFr
      ? "Collection de guides pratiques pour l\u2019achat et l\u2019investissement immobilier au Qu\u00e9bec."
      : 'Collection of practical guides for buying and investing in Quebec real estate.',
    url: `${baseUrl}/${locale}/guides`,
    numberOfItems: guides.length,
    itemListElement: guides.map((g, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: isFr ? g.titleFr : g.title,
      url: `${baseUrl}/${locale}/guides/${g.slug}`,
    })),
    author: {
      '@type': 'Person',
      name: 'Jeremy Soares',
      url: baseUrl,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function GuidesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr-ca'

  return (
    <>
      <GuidesJsonLd locale={locale} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <Section theme="void" className="pt-32 pb-20 md:pt-44 md:pb-28">
        <Container size="lg">
          <Label className="mb-8">
            {isFr ? '(Guides)' : '(Guides)'}
          </Label>

          <div
            style={{
              fontFamily: FONT_BARLOW,
              fontWeight: 900,
              fontSize: 'clamp(4.5rem, 11vw, 9rem)',
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
              {isFr ? 'Guides' : 'Guides'}
            </TextReveal>
          </div>

          <SectionReveal delay={0.35} className="mt-5">
            <p
              className="text-[var(--color-cream)] opacity-35"
              style={{
                fontFamily: FONT_DM_SERIF,
                fontStyle: 'italic',
                fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
              }}
            >
              {isFr
                ? "Achat, investissement, n\u00e9gociation \u2014 de l\u2019analyse \u00e0 la signature"
                : 'Buying, investing, negotiating \u2014 from analysis to signature'}
            </p>
          </SectionReveal>

          <SectionReveal delay={0.5} className="mt-4 max-w-lg">
            <p
              className="leading-relaxed text-[var(--color-cream)] opacity-45"
              style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
            >
              {isFr
                ? "Chaque guide est r\u00e9dig\u00e9 par un courtier actif sur le terrain \u2014 pas par un algorithme. OACIQ H2731."
                : 'Every guide is written by a broker active in the field \u2014 not by an algorithm. OACIQ H2731.'}
            </p>
          </SectionReveal>
        </Container>
      </Section>

      {/* ── Guide cards — cream section ───────────────────────────────────── */}
      <Section theme="cream" className="py-20 md:py-28 relative overflow-hidden">
        <Container size="lg">
          <div
            className="border-t"
            style={{ borderColor: 'rgba(14,16,17,0.1)' }}
          >
            {guides.map((guide, i) => {
              const desc = categoryDescriptions[guide.category]
              return (
                <SectionReveal key={guide.slug} delay={i * 0.06}>
                  <a
                    href={`/${locale}/guides/${guide.slug}`}
                    className="group flex flex-col md:flex-row md:items-start gap-4 md:gap-10 py-10 border-b transition-all duration-300 hover:pl-1 md:hover:pl-2"
                    style={{ borderColor: 'rgba(14,16,17,0.1)' }}
                  >
                    {/* Number */}
                    <div className="flex-shrink-0 md:w-10 pt-1">
                      <span
                        className="uppercase text-[var(--color-void)] opacity-25 group-hover:opacity-40 transition-opacity duration-200"
                        style={{
                          fontFamily: FONT_DM_SANS,
                          fontSize: '10px',
                          letterSpacing: '0.22em',
                        }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Category badge */}
                    <div className="flex-shrink-0 md:w-36 pt-1">
                      <span
                        className="inline-block uppercase text-[var(--color-void)] opacity-30 border border-current px-2 py-0.5"
                        style={{
                          fontFamily: FONT_DM_SANS,
                          fontSize: '9px',
                          letterSpacing: '0.2em',
                          borderColor: 'rgba(14,16,17,0.2)',
                        }}
                      >
                        {guide.category.replace('-', '\u2011')}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="flex-1">
                      <h2
                        className="leading-tight uppercase text-[var(--color-void)] group-hover:opacity-70 transition-opacity duration-200 mb-2"
                        style={{
                          fontFamily: FONT_BARLOW,
                          fontWeight: 900,
                          fontSize: 'clamp(1.25rem, 2.5vw, 2.25rem)',
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {isFr ? guide.titleFr : guide.title}
                      </h2>
                      <p
                        className="text-[var(--color-void)] opacity-45 leading-relaxed"
                        style={{ fontFamily: FONT_DM_SANS, fontSize: '0.875rem' }}
                      >
                        {isFr ? desc.fr : desc.en}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="flex-shrink-0 flex items-start pt-2 opacity-0 group-hover:opacity-30 transition-opacity duration-300">
                      <span
                        className="text-[var(--color-void)]"
                        aria-hidden="true"
                        style={{ fontSize: '1.1rem' }}
                      >
                        \u2192
                      </span>
                    </div>
                  </a>
                </SectionReveal>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* ── Context band — void ───────────────────────────────────────────── */}
      <Section theme="void" className="py-24 md:py-32">
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
              <Label className="mb-8">
                {isFr ? '(Pourquoi ces guides)' : '(Why these guides)'}
              </Label>
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
                  className="leading-none uppercase text-[var(--color-cream)]"
                >
                  {isFr ? "Terrain, pas th\u00e9orie" : 'Field, not theory'}
                </TextReveal>
              </div>
            </div>
            <div className="md:col-span-7 flex flex-col gap-8 pt-2 md:pt-16">
              {[
                {
                  en: 'Every guide reflects deals actually negotiated in Quebec \u2014 not research compiled from secondary sources.',
                  fr: "Chaque guide refl\u00e8te des transactions r\u00e9ellement n\u00e9goci\u00e9es au Qu\u00e9bec \u2014 pas une recherche compil\u00e9e depuis des sources secondaires.",
                },
                {
                  en: 'Commercial, industrial, and data center transactions carry nuances that residential-focused resources consistently miss.',
                  fr: "Les transactions commerciales, industrielles et centres de donn\u00e9es comportent des nuances que les ressources orient\u00e9es r\u00e9sidentiel ratent syst\u00e9matiquement.",
                },
                {
                  en: 'Quebec civil law creates a distinct transaction framework. These guides explain it without legal noise.',
                  fr: "Le droit civil qu\u00e9b\u00e9cois cr\u00e9e un cadre transactionnel distinct. Ces guides l\u2019expliquent sans jargon juridique.",
                },
              ].map((item, i) => (
                <SectionReveal key={i} delay={i * 0.1}>
                  <div className="flex gap-5">
                    <span
                      className="flex-shrink-0 text-[#e8762a] mt-1"
                      style={{
                        fontFamily: FONT_DM_SANS,
                        fontSize: '10px',
                        letterSpacing: '0.18em',
                        fontWeight: 700,
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p
                      className="text-[var(--color-cream)] opacity-55 leading-relaxed"
                      style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                    >
                      {isFr ? item.fr : item.en}
                    </p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ── CTA — cream ──────────────────────────────────────────────────── */}
      <Section theme="cream" className="py-20 md:py-28 relative overflow-hidden">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
            <div className="flex-1 max-w-2xl">
              <SectionReveal>
                <span
                  className="block mb-5 uppercase"
                  style={{
                    fontFamily: FONT_DM_SANS,
                    fontSize: '10px',
                    letterSpacing: '0.22em',
                    color: '#e8762a',
                  }}
                >
                  {isFr ? '\u2014 Prochain pas' : '\u2014 Next step'}
                </span>
              </SectionReveal>

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
                  {isFr ? 'Une question\u00a0? Parlons-en.' : 'A question? Let\u2019s talk.'}
                </TextReveal>
              </div>

              <SectionReveal delay={0.2} className="mt-5 max-w-md">
                <p
                  className="text-[var(--color-void)] opacity-50 leading-relaxed"
                  style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                >
                  {isFr
                    ? "Les guides couvrent les bases. Une conversation couvre votre situation sp\u00e9cifique. OACIQ H2731."
                    : 'The guides cover the foundations. A conversation covers your specific situation. OACIQ H2731.'}
                </p>
              </SectionReveal>
            </div>

            <SectionReveal delay={0.15} className="flex-shrink-0 flex flex-col gap-3">
              <Button variant="primary" theme="light" href={`/${locale}/contact`} size="lg">
                {isFr ? 'Contactez-nous' : 'Get in Touch'}
              </Button>
              <Button variant="ghost" theme="light" href={`/${locale}/market-reports`}>
                {isFr ? "Rapports de march\u00e9 \u2192" : 'Market Reports \u2192'}
              </Button>
            </SectionReveal>
          </div>
        </Container>
      </Section>
    </>
  )
}
