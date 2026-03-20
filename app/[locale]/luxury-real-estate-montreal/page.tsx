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
  const canonical = `${SITE_URL}/${locale}/luxury-real-estate-montreal`
  const title = isFr
    ? 'Immobilier de luxe Montréal | Propriétés $1M+ — Jeremy Soares'
    : 'Luxury Real Estate Montreal | $1M+ Properties — Jeremy Soares'
  const description = isFr
    ? 'Propriétés de luxe à Montréal avec Jeremy Soares. Penthouses, maisons Westmount, condos haut de gamme, villas. Service privé et discret pour les acheteurs et vendeurs $1M+.'
    : 'Luxury properties in Montreal with Jeremy Soares. Penthouses, Westmount homes, premium condos, and villas. Private, discreet service for $1M+ buyers and sellers.'
  return {
    title,
    description,
    keywords: ['luxury real estate montreal', 'immobilier luxe montréal', 'Westmount homes for sale', 'penthouse montreal', 'Outremont luxury', '$1 million property montreal'],
    alternates: {
      canonical,
      languages: {
        'en-CA': `${SITE_URL}/en-ca/luxury-real-estate-montreal`,
        'fr-CA': `${SITE_URL}/fr-ca/luxury-real-estate-montreal`,
      },
    },
    openGraph: { type: 'website', url: canonical, title, description },
  }
}

const LUXURY_NEIGHBOURHOODS = [
  { nameEn: 'Westmount', nameFr: 'Westmount', slug: 'westmount', rangeEn: '$1.5M–$8M+', rangeFr: '1,5 M–8 M $+' },
  { nameEn: 'Outremont', nameFr: 'Outremont', slug: 'outremont', rangeEn: '$1.2M–$5M+', rangeFr: '1,2 M–5 M $+' },
  { nameEn: 'Old Montreal', nameFr: 'Vieux-Montréal', slug: 'old-montreal', rangeEn: '$1M–$4M+', rangeFr: '1 M–4 M $+' },
  { nameEn: 'Mile End', nameFr: 'Mile End', slug: 'mile-end', rangeEn: '$800K–$2.5M', rangeFr: '800 K–2,5 M $' },
  { nameEn: 'Downtown', nameFr: 'Centre-ville', slug: 'downtown', rangeEn: '$700K–$3M+', rangeFr: '700 K–3 M $+' },
]

export default async function LuxuryRealEstatePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr-ca'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: isFr ? 'Immobilier de luxe Montréal' : 'Luxury Real Estate Montreal',
    url: `${SITE_URL}/${locale}/luxury-real-estate-montreal`,
    description: isFr
      ? 'Guide de l\'immobilier de luxe à Montréal avec Jeremy Soares, courtier OACIQ H2731.'
      : 'Luxury real estate guide for Montreal with Jeremy Soares, OACIQ broker H2731.',
    author: { '@type': 'Person', name: 'Jeremy Soares', url: SITE_URL },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <Section theme="void" className="pt-32 pb-20 md:pt-44 md:pb-28">
        <Container size="lg">
          <Label className="mb-8">{isFr ? '(Propriétés $1M+)' : '($1M+ Properties)'}</Label>
          <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(3rem,8vw,6.5rem)', letterSpacing: '-0.02em' }}>
            <TextReveal as="h1" split="words" immediate delay={0.15} className="leading-none uppercase text-[var(--color-cream)]">
              {isFr ? 'Immobilier de Luxe' : 'Luxury Real Estate'}
            </TextReveal>
          </div>
          <SectionReveal delay={0.35} className="mt-5">
            <p className="text-[var(--color-cream)] opacity-35" style={{ fontFamily: FONT_DM_SERIF, fontStyle: 'italic', fontSize: 'clamp(1.1rem,2vw,1.5rem)' }}>
              {isFr
                ? 'Penthouses, manoirs, condos haut de gamme — Montréal, Westmount, Outremont.'
                : 'Penthouses, estates, premium condos — Montreal, Westmount, Outremont.'}
            </p>
          </SectionReveal>
        </Container>
      </Section>

      {/* Neighbourhoods */}
      <Section theme="cream" className="py-24 md:py-32">
        <Container size="lg">
          <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(2rem,5vw,3.5rem)', letterSpacing: '-0.02em' }}>
            <TextReveal as="h2" split="words" className="leading-none uppercase text-[var(--color-void)]">
              {isFr ? 'Quartiers de Prestige' : 'Prestige Neighbourhoods'}
            </TextReveal>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {LUXURY_NEIGHBOURHOODS.map((n, i) => (
              <SectionReveal key={n.slug} delay={i * 0.06}>
                <a href={`/${locale}/neighborhoods/${n.slug}`} className="group block border border-[rgba(14,16,17,0.1)] p-6 hover:border-[rgba(14,16,17,0.3)] transition-colors">
                  <h3 className="text-[var(--color-void)] group-hover:opacity-70 transition-opacity" style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '1.25rem', textTransform: 'uppercase' }}>
                    {isFr ? n.nameFr : n.nameEn}
                  </h3>
                  <p className="text-[var(--color-void)] opacity-40 mt-2 text-sm" style={{ fontFamily: FONT_DM_SANS }}>
                    {isFr ? n.rangeFr : n.rangeEn}
                  </p>
                </a>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Value prop */}
      <Section theme="void" className="py-24 md:py-32">
        <Container size="lg">
          <div className="max-w-2xl">
            <Label className="mb-8">{isFr ? '(Service privé)' : '(Private service)'}</Label>
            <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(2rem,5vw,3.5rem)', letterSpacing: '-0.02em' }}>
              <TextReveal as="h2" split="words" className="leading-none uppercase text-[var(--color-cream)]">
                {isFr ? 'Discrétion et Précision' : 'Discretion & Precision'}
              </TextReveal>
            </div>
            <SectionReveal delay={0.15} className="mt-8">
              <p className="text-[var(--color-cream)] opacity-60 leading-relaxed" style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}>
                {isFr
                  ? "Les transactions $1M+ demandent un niveau de service différent — accès aux propriétés off-market, négociation expérimentée, réseau de professionnels (notaires, fiscalistes, architectes). Jeremy Soares (OACIQ H2731) accompagne acheteurs et vendeurs de propriétés de luxe à Montréal avec la discrétion et l'expertise que ce segment requiert."
                  : "$1M+ transactions require a different level of service — off-market access, experienced negotiation, and a professional network (notaries, tax advisors, architects). Jeremy Soares (OACIQ H2731) serves luxury buyers and sellers in Montreal with the discretion and expertise this segment demands."}
              </p>
            </SectionReveal>
          </div>
        </Container>
      </Section>

      {/* Internal links */}
      <Section theme="cream" className="py-16">
        <Container size="lg">
          <SectionReveal className="flex flex-wrap gap-4">
            <Button variant="ghost" theme="light" href={`/${locale}/penthouses-montreal`}>
              {isFr ? 'Penthouses →' : 'Penthouses →'}
            </Button>
            <Button variant="ghost" theme="light" href={`/${locale}/neighborhoods/westmount`}>
              {isFr ? 'Guide Westmount →' : 'Westmount Guide →'}
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
                <>Cherchez une propriété{' '}
                  <em style={{ fontFamily: FONT_DM_SERIF, fontStyle: 'italic', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>d&apos;exception?</em>
                </>
              ) : (
                <>Looking for an{' '}
                  <em style={{ fontFamily: FONT_DM_SERIF, fontStyle: 'italic', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>exceptional property?</em>
                </>
              )}
            </h2>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" theme="dark" href={`/${locale}/contact`} size="lg">
              {isFr ? 'Consultation privée' : 'Private Consultation'}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
