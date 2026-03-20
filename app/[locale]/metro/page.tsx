import fs from 'fs'
import path from 'path'
import type { Metadata } from 'next'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Label } from '@/components/ui/Label'
import { TextReveal } from '@/components/animation/TextReveal'
import { SectionReveal } from '@/components/animation/SectionReveal'

const FONT_BARLOW = `var(--font-barlow), 'Barlow', sans-serif`
const FONT_DM_SANS = `var(--font-dm-sans), 'DM Sans', sans-serif`
const SITE_URL = 'https://jeremysoares.com'
const METRO_DIR = path.join(process.cwd(), 'content/metro')

const STATION_SLUGS = [
  'mont-royal', 'berri-uqam', 'square-victoria', 'jean-talon', 'snowdon',
  'cote-des-neiges', 'vendome', 'villa-maria', 'lionel-groulx', 'atwater',
  'laurier', 'rosemont', 'fabre', 'papineau', 'outremont',
]

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale === 'fr-ca'
  const canonical = `${SITE_URL}/${locale}/metro`
  const title = isFr
    ? 'Immobilier par station de métro à Montréal — Jeremy Soares'
    : 'Montreal Real Estate by Metro Station — Jeremy Soares'
  const description = isFr
    ? 'Explorez le marché immobilier de Montréal par station de métro. Prix, types de propriétés et analyses pour chaque secteur desservi par le STM.'
    : 'Explore Montreal real estate by metro station. Prices, property types, and market analysis for every STM station catchment area.'
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        'en-CA': `${SITE_URL}/en-ca/metro`,
        'fr-CA': `${SITE_URL}/fr-ca/metro`,
      },
    },
    openGraph: { type: 'website', url: canonical, title, description },
  }
}

export default async function MetroIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr-ca'

  const stations = STATION_SLUGS.map((slug) => {
    const filePath = path.join(METRO_DIR, `${slug}.json`)
    if (!fs.existsSync(filePath)) return null
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  }).filter(Boolean)

  return (
    <>
      {/* Hero */}
      <Section theme="void" className="pt-32 pb-20 md:pt-44 md:pb-28">
        <Container size="lg">
          <Label className="mb-8">{isFr ? '(Réseau STM)' : '(STM Network)'}</Label>
          <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(3rem,8vw,6.5rem)', letterSpacing: '-0.02em' }}>
            <TextReveal as="h1" split="words" immediate delay={0.15} className="leading-none uppercase text-[var(--color-cream)]">
              {isFr ? 'Immobilier par Métro' : 'Real Estate by Metro'}
            </TextReveal>
          </div>
          <SectionReveal delay={0.35} className="mt-5">
            <p className="text-[var(--color-cream)] opacity-35" style={{ fontFamily: FONT_DM_SANS, fontSize: 'clamp(1rem,1.5vw,1.2rem)', maxWidth: '48ch' }}>
              {isFr
                ? 'Chaque station de métro définit un micro-marché. Trouvez la vôtre.'
                : 'Every metro station defines a micro-market. Find yours.'}
            </p>
          </SectionReveal>
        </Container>
      </Section>

      {/* Station grid */}
      <Section theme="cream" className="py-24 md:py-32">
        <Container size="lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stations.map((station, i) => (
              <SectionReveal key={station.slug} delay={i * 0.04}>
                <a
                  href={`/${locale}/metro/${station.slug}`}
                  className="group block border border-[rgba(14,16,17,0.1)] p-6 hover:border-[rgba(14,16,17,0.35)] transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="inline-block w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: station.colour }}
                    />
                    <span className="text-[var(--color-void)] opacity-40 uppercase" style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em' }}>
                      {station.line}
                    </span>
                  </div>
                  <h2 className="text-[var(--color-void)] group-hover:opacity-70 transition-opacity" style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '1.25rem', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
                    {isFr ? station.nameFr : station.name}
                  </h2>
                  <p className="text-[var(--color-void)] opacity-45 mt-2 text-sm leading-relaxed" style={{ fontFamily: FONT_DM_SANS }}>
                    {station.neighbourhood}
                  </p>
                  <p className="text-[var(--color-void)] opacity-35 mt-3 text-xs" style={{ fontFamily: FONT_DM_SANS }}>
                    {isFr ? station.avgPriceFr : station.avgPriceEn}
                  </p>
                </a>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
