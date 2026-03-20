import type { Metadata } from 'next'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Label } from '@/components/ui/Label'
import { TextReveal } from '@/components/animation/TextReveal'
import { SectionReveal } from '@/components/animation/SectionReveal'
import { Button } from '@/components/ui/Button'

const FONT_BARLOW = `var(--font-barlow), 'Barlow', sans-serif`
const FONT_DM_SERIF = `var(--font-dm-serif), 'DM Serif Display', serif`
const FONT_DM_SANS = `var(--font-dm-sans), 'DM Sans', sans-serif`
const SITE_URL = 'https://jeremysoares.com'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale === 'fr-ca'
  const canonical = `${SITE_URL}/${locale}/plex-montreal`
  const title = isFr
    ? 'Duplex, Triplex et Plex à Montréal | Guide d\'investissement — Jeremy Soares'
    : 'Duplex, Triplex & Plex Montreal | Investment Guide — Jeremy Soares'
  const description = isFr
    ? 'Achetez un plex à Montréal avec Jeremy Soares. Guide complet sur les duplex, triplex et multiplex : prix, quartiers, rendements locatifs, financement et stratégie d\'investissement.'
    : 'Buy a plex in Montreal with Jeremy Soares. Complete guide to duplex, triplex, and multiplex properties: prices, neighbourhoods, rental yields, financing, and investment strategy.'
  return {
    title,
    description,
    keywords: ['plex montreal', 'duplex montreal', 'triplex montreal', 'immeuble à revenus montréal', 'plex investissement montréal', 'multiplex montreal'],
    alternates: {
      canonical,
      languages: {
        'en-CA': `${SITE_URL}/en-ca/plex-montreal`,
        'fr-CA': `${SITE_URL}/fr-ca/plex-montreal`,
      },
    },
    openGraph: { type: 'website', url: canonical, title, description },
  }
}

const STATS = [
  { labelEn: 'Average triplex price', labelFr: 'Prix triplex moyen', valueEn: '$1.2M–$2.5M', valueFr: '1,2 M–2,5 M $' },
  { labelEn: 'Typical cap rate', labelFr: 'Taux de cap typique', valueEn: '3–5%', valueFr: '3–5 %' },
  { labelEn: 'Vacancy rate', labelFr: 'Taux d\'inoccupation', valueEn: '<1% island-wide', valueFr: '<1 % sur l\'île' },
  { labelEn: 'Best ROI neighbourhoods', labelFr: 'Meilleurs quartiers ROI', valueEn: 'Rosemont, Villeray, HochelagaPatrie', valueFr: 'Rosemont, Villeray, Hochelaga' },
]

const TYPES = [
  { en: 'Duplex (2 units)', fr: 'Duplex (2 logements)' },
  { en: 'Triplex (3 units)', fr: 'Triplex (3 logements)' },
  { en: 'Quadruplex (4 units)', fr: 'Quadruplex (4 logements)' },
  { en: 'Multiplex (5+ units)', fr: 'Multiplex (5 logements et plus)' },
  { en: 'Revenue property with commercial ground floor', fr: 'Immeuble à revenus avec rez-de-chaussée commercial' },
]

export default async function PlexMontrealPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr-ca'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: isFr ? 'Duplex, Triplex et Plex à Montréal' : 'Duplex, Triplex & Plex Montreal',
    url: `${SITE_URL}/${locale}/plex-montreal`,
    description: isFr
      ? 'Guide complet sur l\'investissement en plex à Montréal avec Jeremy Soares, courtier OACIQ H2731.'
      : 'Complete guide to plex investment in Montreal with Jeremy Soares, OACIQ broker H2731.',
    author: { '@type': 'Person', name: 'Jeremy Soares', url: SITE_URL },
    about: { '@type': 'Thing', name: isFr ? 'Immeuble à revenus Montréal' : 'Revenue property Montreal' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <Section theme="void" className="pt-32 pb-20 md:pt-44 md:pb-28">
        <Container size="lg">
          <Label className="mb-8">{isFr ? '(Immeuble à revenus)' : '(Revenue Property)'}</Label>
          <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(3rem,8vw,6.5rem)', letterSpacing: '-0.02em' }}>
            <TextReveal as="h1" split="words" immediate delay={0.15} className="leading-none uppercase text-[var(--color-cream)]">
              {isFr ? 'Plex Montréal' : 'Plex Montreal'}
            </TextReveal>
          </div>
          <SectionReveal delay={0.35} className="mt-5">
            <p className="text-[var(--color-cream)] opacity-35" style={{ fontFamily: FONT_DM_SERIF, fontStyle: 'italic', fontSize: 'clamp(1.1rem,2vw,1.5rem)' }}>
              {isFr
                ? 'Duplex, triplex et multiplex — l\'investissement immobilier québécois par excellence.'
                : 'Duplex, triplex, and multiplex — Quebec\'s defining real estate investment.'}
            </p>
          </SectionReveal>
        </Container>
      </Section>

      {/* Stats */}
      <Section theme="cream" className="py-24 md:py-32">
        <Container size="lg">
          <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(2rem,5vw,3.5rem)', letterSpacing: '-0.02em' }}>
            <TextReveal as="h2" split="words" className="leading-none uppercase text-[var(--color-void)]">
              {isFr ? 'Le Marché Plex 2026' : 'The Plex Market 2026'}
            </TextReveal>
          </div>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat) => (
              <SectionReveal key={stat.labelEn}>
                <div className="border border-[rgba(14,16,17,0.1)] p-6">
                  <span className="block text-[var(--color-void)] opacity-40 uppercase mb-2" style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em' }}>
                    {isFr ? stat.labelFr : stat.labelEn}
                  </span>
                  <span className="text-[var(--color-void)]" style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '1rem' }}>
                    {isFr ? stat.valueFr : stat.valueEn}
                  </span>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Why plex + types */}
      <Section theme="void" className="py-24 md:py-32">
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-0.02em' }}>
                <TextReveal as="h2" split="words" className="leading-none uppercase text-[var(--color-cream)]">
                  {isFr ? 'Pourquoi un Plex?' : 'Why a Plex?'}
                </TextReveal>
              </div>
              <SectionReveal delay={0.15} className="mt-8">
                <p className="text-[var(--color-cream)] opacity-60 leading-relaxed" style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}>
                  {isFr
                    ? "Le plex est la stratégie d'investissement emblématique de Montréal : habitez un logement, louez les autres. Les revenus locatifs couvrent une partie ou la totalité de l'hypothèque. Avec un taux d'inoccupation sous 1 % à Montréal, la demande locative n'a jamais faibli. Jeremy Soares spécialise dans l'acquisition de plex — du repérage à la négociation."
                    : "The plex is Montreal's signature investment strategy: live in one unit, rent the others. Rental income covers part or all of the mortgage. With vacancy under 1% across Montreal, rental demand has never weakened. Jeremy Soares specializes in plex acquisition — from identifying the right building to closing."}
                </p>
              </SectionReveal>
            </div>
            <div>
              <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-0.02em' }}>
                <TextReveal as="h2" split="words" className="leading-none uppercase text-[var(--color-cream)]">
                  {isFr ? 'Types de Plex' : 'Plex Types'}
                </TextReveal>
              </div>
              <SectionReveal delay={0.15} className="mt-8">
                <ul className="flex flex-col gap-4">
                  {TYPES.map((type) => (
                    <li key={type.en} className="text-[var(--color-cream)] opacity-60 flex items-start gap-3" style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}>
                      <span className="text-[#e8762a] mt-0.5 flex-shrink-0" aria-hidden="true">→</span>
                      {isFr ? type.fr : type.en}
                    </li>
                  ))}
                </ul>
              </SectionReveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Internal links */}
      <Section theme="cream" className="py-16">
        <Container size="lg">
          <SectionReveal className="flex flex-wrap gap-4">
            <Button variant="ghost" theme="light" href={`/${locale}/neighborhoods/plateau-mont-royal`}>
              {isFr ? 'Plex Plateau →' : 'Plateau Plexes →'}
            </Button>
            <Button variant="ghost" theme="light" href={`/${locale}/neighborhoods/rosemont`}>
              {isFr ? 'Plex Rosemont →' : 'Rosemont Plexes →'}
            </Button>
            <Button variant="ghost" theme="light" href={`/${locale}/real-estate`}>
              {isFr ? 'Toutes les propriétés →' : 'All properties →'}
            </Button>
          </SectionReveal>
        </Container>
      </Section>

      {/* CTA */}
      <Section theme="void" className="py-20 md:py-28">
        <Container size="lg" className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h2 style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(1.5rem,3vw,2.5rem)', lineHeight: 1, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--color-cream)' }}>
              {isFr ? (
                <>Prêt à investir dans un{' '}
                  <em style={{ fontFamily: FONT_DM_SERIF, fontStyle: 'italic', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>plex?</em>
                </>
              ) : (
                <>Ready to invest in a{' '}
                  <em style={{ fontFamily: FONT_DM_SERIF, fontStyle: 'italic', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>plex?</em>
                </>
              )}
            </h2>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" theme="dark" href={`/${locale}/contact`} size="lg">
              {isFr ? 'Discutons' : "Let's Talk"}
            </Button>
            <Button variant="ghost" theme="dark" href={`/${locale}/real-estate`}>
              {isFr ? 'Voir les annonces' : 'View listings'}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
