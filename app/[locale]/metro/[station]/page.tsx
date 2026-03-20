import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Label } from '@/components/ui/Label'
import { TextReveal } from '@/components/animation/TextReveal'
import { SectionReveal } from '@/components/animation/SectionReveal'
import { Button } from '@/components/ui/Button'
import { getAllPosts } from '@/lib/content/posts'
import type { Locale } from '@/lib/content/types'

const FONT_BARLOW = `var(--font-barlow), 'Barlow', sans-serif`
const FONT_DM_SERIF = `var(--font-dm-serif), 'DM Serif Display', serif`
const FONT_DM_SANS = `var(--font-dm-sans), 'DM Sans', sans-serif`
const SITE_URL = 'https://jeremysoares.com'

const METRO_DIR = path.join(process.cwd(), 'content/metro')

const STATION_SLUGS = [
  'mont-royal', 'berri-uqam', 'square-victoria', 'jean-talon', 'snowdon',
  'cote-des-neiges', 'vendome', 'villa-maria', 'lionel-groulx', 'atwater',
  'laurier', 'rosemont', 'fabre', 'papineau', 'outremont',
]

interface StationData {
  slug: string
  name: string
  nameFr: string
  line: string
  colour: string
  neighbourhood: string
  neighbourhoodSlug: string
  blurbEn: string
  blurbFr: string
  avgPriceEn: string
  avgPriceFr: string
  keywordsEn: string[]
  keywordsFr: string[]
}

function getStation(slug: string): StationData | null {
  const filePath = path.join(METRO_DIR, `${slug}.json`)
  if (!fs.existsSync(filePath)) return null
  return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as StationData
}

export function generateStaticParams() {
  const locales = ['en-ca', 'fr-ca']
  return STATION_SLUGS.flatMap((station) =>
    locales.map((locale) => ({ locale, station }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; station: string }>
}): Promise<Metadata> {
  const { locale, station: stationSlug } = await params
  const station = getStation(stationSlug)
  if (!station) return {}

  const isFr = locale === 'fr-ca'
  const canonical = `${SITE_URL}/${locale}/metro/${stationSlug}`
  const name = isFr ? station.nameFr : station.name

  const title = isFr
    ? `Immobilier station ${name} | Condos et Propriétés — Jeremy Soares`
    : `Real Estate near ${name} Metro | Condos & Properties — Jeremy Soares`
  const description = isFr
    ? `Guide immobilier de la station ${name} (ligne ${station.line}). ${station.blurbFr.slice(0, 120)}...`
    : `Real estate guide for ${name} metro station (${station.line} Line). ${station.blurbEn.slice(0, 120)}...`
  const keywords = isFr ? station.keywordsFr : station.keywordsEn

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
      languages: {
        'en-CA': `${SITE_URL}/en-ca/metro/${stationSlug}`,
        'fr-CA': `${SITE_URL}/fr-ca/metro/${stationSlug}`,
      },
    },
    openGraph: { type: 'website', url: canonical, title, description },
  }
}

export default async function MetroStationPage({
  params,
}: {
  params: Promise<{ locale: string; station: string }>
}) {
  const { locale, station: stationSlug } = await params
  const isFr = locale === 'fr-ca'
  const station = getStation(stationSlug)
  if (!station) notFound()

  const contentLocale: Locale = isFr ? 'fr' : 'en'
  const allPosts = getAllPosts(contentLocale)
  const relatedPosts = allPosts
    .filter((p) =>
      p.slug.includes(station.neighbourhoodSlug.split('-')[0]) ||
      p.tag === 'Neighborhoods' ||
      p.tag === 'Quartiers'
    )
    .slice(0, 3)

  const canonical = `${SITE_URL}/${locale}/metro/${stationSlug}`
  const name = isFr ? station.nameFr : station.name

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Place',
        name: `Station de métro ${name}`,
        description: isFr ? station.blurbFr : station.blurbEn,
        containedInPlace: { '@type': 'City', name: 'Montréal' },
        geo: { '@type': 'GeoCoordinates' },
      },
      {
        '@type': 'RealEstateAgent',
        name: 'Jeremy Soares',
        url: SITE_URL,
        areaServed: {
          '@type': 'Place',
          name: isFr ? station.nameFr : station.name,
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <Section theme="void" className="pt-32 pb-20 md:pt-44 md:pb-28">
        <Container size="lg">
          <Label className="mb-8">
            {isFr ? `(Station ${station.line})` : `(${station.line} Line Station)`}
          </Label>
          <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(3rem,8vw,6.5rem)', letterSpacing: '-0.02em' }}>
            <TextReveal as="h1" split="words" immediate delay={0.15} className="leading-none uppercase text-[var(--color-cream)]">
              {name}
            </TextReveal>
          </div>
          <SectionReveal delay={0.35} className="mt-5">
            <p className="text-[var(--color-cream)] opacity-35" style={{ fontFamily: FONT_DM_SERIF, fontStyle: 'italic', fontSize: 'clamp(1.1rem,2vw,1.5rem)' }}>
              {isFr
                ? `Immobilier autour de la station ${name} — ${station.neighbourhood}`
                : `Real estate near ${name} station — ${station.neighbourhood}`}
            </p>
          </SectionReveal>
        </Container>
      </Section>

      {/* Market Overview — cream */}
      <Section theme="cream" className="py-24 md:py-32">
        <Container size="lg">
          <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(2rem,5vw,3.5rem)', letterSpacing: '-0.02em' }}>
            <TextReveal as="h2" split="words" className="leading-none uppercase text-[var(--color-void)]">
              {isFr ? 'Le Marché' : 'The Market'}
            </TextReveal>
          </div>
          <SectionReveal delay={0.15} className="mt-8">
            <p className="text-[var(--color-void)] opacity-55 leading-relaxed max-w-3xl" style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}>
              {isFr ? station.blurbFr : station.blurbEn}
            </p>
          </SectionReveal>
          <SectionReveal delay={0.25} className="mt-8">
            <div className="inline-block px-6 py-4 border border-[rgba(14,16,17,0.1)]">
              <span className="block text-[var(--color-void)] opacity-40 uppercase mb-1" style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em' }}>
                {isFr ? 'Fourchette de prix' : 'Price range'}
              </span>
              <span className="text-[var(--color-void)]" style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '1.1rem' }}>
                {isFr ? station.avgPriceFr : station.avgPriceEn}
              </span>
            </div>
          </SectionReveal>
        </Container>
      </Section>

      {/* Neighbourhood link — void */}
      <Section theme="void" className="py-24 md:py-32">
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <Label className="mb-6">{isFr ? '(Quartier)' : '(Neighbourhood)'}</Label>
              <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-0.02em' }}>
                <TextReveal as="h2" split="words" className="leading-none uppercase text-[var(--color-cream)]">
                  {station.neighbourhood}
                </TextReveal>
              </div>
              <SectionReveal delay={0.15} className="mt-6">
                <p className="text-[var(--color-cream)] opacity-50 leading-relaxed mb-6" style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}>
                  {isFr
                    ? `La station ${name} dessert le quartier ${station.neighbourhood}. Explorez le guide complet du quartier pour les prix détaillés, les rues clés et les analyses d'investissement.`
                    : `${name} station serves ${station.neighbourhood}. Explore the full neighbourhood guide for detailed pricing, key streets, and investment analysis.`}
                </p>
                <Button variant="ghost" theme="dark" href={`/${locale}/neighborhoods/${station.neighbourhoodSlug}`}>
                  {isFr ? `Guide de ${station.neighbourhood} →` : `${station.neighbourhood} Guide →`}
                </Button>
              </SectionReveal>
            </div>
            <div>
              <Label className="mb-6">{isFr ? '(Propriétés)' : '(Properties)'}</Label>
              <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-0.02em' }}>
                <TextReveal as="h2" split="words" className="leading-none uppercase text-[var(--color-cream)]">
                  {isFr ? 'Voir les Annonces' : 'Browse Listings'}
                </TextReveal>
              </div>
              <SectionReveal delay={0.15} className="mt-6">
                <p className="text-[var(--color-cream)] opacity-50 leading-relaxed mb-6" style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}>
                  {isFr
                    ? `Consultez les propriétés disponibles dans le secteur de la station ${name} et ses environs.`
                    : `Browse available properties in the ${name} station area and surrounding streets.`}
                </p>
                <Button variant="ghost" theme="dark" href={`/${locale}/real-estate`}>
                  {isFr ? 'Voir les propriétés →' : 'View properties →'}
                </Button>
              </SectionReveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related blog posts */}
      {relatedPosts.length > 0 && (
        <Section theme="cream" className="py-24 md:py-32">
          <Container size="lg">
            <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(2rem,5vw,3.5rem)', letterSpacing: '-0.02em' }}>
              <TextReveal as="h2" split="words" className="leading-none uppercase text-[var(--color-void)]">
                {isFr ? 'Articles de Marché' : 'Market Insights'}
              </TextReveal>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((post) => (
                <SectionReveal key={post.slug}>
                  <a href={`/${locale}/blog/${post.slug}`} className="group block border border-[rgba(14,16,17,0.1)] p-6 hover:border-[rgba(14,16,17,0.3)] transition-colors">
                    <span className="block text-[var(--color-void)] opacity-40 uppercase mb-2" style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em' }}>
                      {post.tag}
                    </span>
                    <h3 className="text-[var(--color-void)] font-bold leading-snug group-hover:opacity-70 transition-opacity" style={{ fontFamily: FONT_BARLOW, fontSize: '1rem', textTransform: 'uppercase' }}>
                      {post.title}
                    </h3>
                    <span className="block mt-4 text-[var(--color-void)] opacity-40 text-sm" style={{ fontFamily: FONT_DM_SANS }}>
                      {isFr ? 'Lire →' : 'Read →'}
                    </span>
                  </a>
                </SectionReveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* CTA */}
      <Section theme="void" className="py-20 md:py-28">
        <Container size="lg" className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h2 style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(1.5rem,3vw,2.5rem)', lineHeight: 1, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--color-cream)' }}>
              {isFr ? (
                <>Cherchez dans le secteur{' '}
                  <em style={{ fontFamily: FONT_DM_SERIF, fontStyle: 'italic', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>{name}?</em>
                </>
              ) : (
                <>Looking near{' '}
                  <em style={{ fontFamily: FONT_DM_SERIF, fontStyle: 'italic', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>{name}?</em>
                </>
              )}
            </h2>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" theme="dark" href={`/${locale}/contact`} size="lg">
              {isFr ? 'Discutons' : "Let's Talk"}
            </Button>
            <Button variant="ghost" theme="dark" href={`/${locale}/metro`}>
              {isFr ? 'Toutes les stations' : 'All Stations'}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
