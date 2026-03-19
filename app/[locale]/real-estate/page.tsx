import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { getAllListings } from '@/lib/content/listings'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Label } from '@/components/ui/Label'
import { TextReveal } from '@/components/animation/TextReveal'
import { SectionReveal } from '@/components/animation/SectionReveal'
import { PropertyGrid } from '@/components/content/PropertyGrid'
import { StatCounter } from '@/components/content/StatCounter'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

/* ── Constants ──────────────────────────────────────────── */
const SITE_URL = 'https://jeremysoares.com'

const FONT_BARLOW: CSSProperties = {
  fontFamily: "var(--font-barlow), 'Barlow', sans-serif",
  fontWeight: 900,
}

/* ── Metadata ───────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale === 'fr-ca'
  const canonical = `${SITE_URL}/${locale}/real-estate`

  const title = isFr
    ? "Portfolio Immobilier Montréal | Propriétés Vendues, Louées & Actives — Jeremy Soares"
    : "Montreal Real Estate Portfolio | Sold, Rented & Active Properties — Jeremy Soares"

  const description = isFr
    ? "Portfolio immobilier complet à Montréal — propriétés vendues, louées et actives. Résidentiel, commercial et préventes. Courtier OACIQ H2731 spécialisé à Montréal."
    : "Full real estate portfolio in Montreal — sold properties, rented units, and active listings. Residential, commercial and pre-sales. OACIQ broker H2731 serving greater Montreal."

  return {
    title,
    description,
    keywords: isFr
      ? ['immobilier Montréal', 'propriétés vendues Montréal', 'louer appartement Montréal', 'courtier immobilier Montréal', 'investissement immobilier Montréal', 'préventes Montréal']
      : ['sold properties Montreal', 'Montreal real estate portfolio', 'buy sell rent Montreal', 'Montreal realtor', 'Montreal real estate broker', 'invest Montreal real estate'],
    alternates: {
      canonical,
      languages: {
        'en-CA': `${SITE_URL}/en-ca/real-estate`,
        'fr-CA': `${SITE_URL}/fr-ca/real-estate`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Jeremy Soares',
      locale: isFr ? 'fr_CA' : 'en_CA',
      alternateLocale: isFr ? 'en_CA' : 'fr_CA',
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/images/og/real-estate.jpg`,
          width: 1200,
          height: 630,
          alt: isFr ? 'Portfolio immobilier — Jeremy Soares' : 'Real estate portfolio — Jeremy Soares',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

/* ── JSON-LD ─────────────────────────────────────────────── */
function JsonLd({ locale }: { locale: string }) {
  const isFr = locale === 'fr-ca'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Jeremy Soares',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.svg`,
    image: `${SITE_URL}/images/headshots/68ba5e4e80122c482c8397a9_Jeremy-Soares-Montreal-Realtor.webp`,
    description: isFr
      ? "Courtier immobilier OACIQ H2731 à Montréal. Spécialisé en résidentiel, commercial, location et préventes."
      : "OACIQ broker H2731 in Montreal. Specializing in residential, commercial, rentals and pre-sales.",
    telephone: '+1-438-533-8788',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Montreal',
      addressRegion: 'QC',
      addressCountry: 'CA',
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Montreal',
        sameAs: 'https://www.wikidata.org/wiki/Q340',
      },
      {
        '@type': 'City',
        name: 'Laval',
        sameAs: 'https://www.wikidata.org/wiki/Q202584',
      },
      {
        '@type': 'City',
        name: 'Longueuil',
        sameAs: 'https://www.wikidata.org/wiki/Q202573',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Greater Montreal',
      },
    ],
    knowsAbout: [
      'Residential Real Estate',
      'Commercial Real Estate',
      'Pre-sale Condominiums',
      'Real Estate Investment',
      'Montreal Real Estate Market',
    ],
    sameAs: [
      'https://aimmo.ca',
      `${SITE_URL}/en-ca/real-estate`,
      `${SITE_URL}/fr-ca/real-estate`,
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/* ── Page ────────────────────────────────────────────────── */
export default async function RealEstatePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr-ca'
  const listings = getAllListings()

  const filters = isFr
    ? [
        { label: 'Tout', value: 'all' },
        { label: 'Vendu', value: 'sold' },
        { label: 'Loué', value: 'rented' },
        { label: 'Actif', value: 'active' },
        { label: 'Commercial', value: 'commercial' },
      ]
    : [
        { label: 'All', value: 'all' },
        { label: 'Sold', value: 'sold' },
        { label: 'Rented', value: 'rented' },
        { label: 'Active', value: 'active' },
        { label: 'Commercial', value: 'commercial' },
      ]

  return (
    <>
      <JsonLd locale={locale} />

      {/* ── Hero ─────────────────────────────────────────── */}
      <Section theme="void" className="pt-32 pb-16 md:pt-40 md:pb-20" id="portfolio-hero">
        <Container size="lg">
          <Label className="mb-6">
            {isFr ? '(Immobilier)' : '(Real Estate)'}
          </Label>

          {/*
            Heading uses a raw h1 so we can mix Barlow 900 for "Portfolio"
            with DM Serif Display italic for the decorative word.
            TextReveal only accepts a plain string so we drop to native HTML here.
          */}
          <h1
            className="text-[clamp(4rem,10vw,8rem)] leading-none tracking-tight text-[#eceae5] uppercase overflow-hidden"
            style={FONT_BARLOW}
          >
            <span className="block overflow-hidden">
              <span className="block translate-y-0 animate-[slideUp_0.8s_cubic-bezier(0.16,1,0.3,1)_0.15s_both]">
                {isFr ? 'Portfolio' : 'Portfolio'}
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="block translate-y-0 animate-[slideUp_0.8s_cubic-bezier(0.16,1,0.3,1)_0.3s_both]">
                {isFr ? (
                  <>
                    Montréal{' '}
                    <em
                      className="not-italic"
                      style={{
                        fontFamily: "'DM Serif Display', 'Georgia', serif",
                        fontStyle: 'italic',
                        fontWeight: 400,
                        textTransform: 'none',
                      }}
                    >
                      Livré.
                    </em>
                  </>
                ) : (
                  <>
                    Montreal{' '}
                    <em
                      className="not-italic"
                      style={{
                        fontFamily: "'DM Serif Display', 'Georgia', serif",
                        fontStyle: 'italic',
                        fontWeight: 400,
                        textTransform: 'none',
                      }}
                    >
                      Delivered.
                    </em>
                  </>
                )}
              </span>
            </span>
          </h1>

          <SectionReveal delay={0.5} className="mt-8">
            <p className="text-[1rem] text-[#eceae5] opacity-50 leading-relaxed max-w-xl">
              {isFr
                ? "Un portfolio de propriétés vendues, louées et actives à Montréal — résidentiel, commercial et préventes."
                : 'A portfolio of sold, rented, and active properties across Montreal — residential, commercial and pre-sales.'}
            </p>
            <nav
              aria-label={isFr ? 'Liens rapides' : 'Quick links'}
              className="flex gap-6 mt-5"
            >
              <Link
                href={`/${locale}/services`}
                className="text-[0.625rem] tracking-[0.22em] uppercase text-[#eceae5] opacity-40 hover:opacity-80 transition-opacity duration-200"
              >
                {isFr ? 'Services' : 'Services'}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="text-[0.625rem] tracking-[0.22em] uppercase text-[#eceae5] opacity-40 hover:opacity-80 transition-opacity duration-200"
              >
                {isFr ? 'Contact' : 'Contact'}
              </Link>
              <a
                href="https://aimmo.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.625rem] tracking-[0.22em] uppercase text-[#eceae5] opacity-40 hover:opacity-80 transition-opacity duration-200"
              >
                aimmo.ca
              </a>
            </nav>
          </SectionReveal>
        </Container>
      </Section>

      {/* ── Property Grid ────────────────────────────────── */}
      <Section theme="void" className="pb-24 md:pb-32" id="portfolio-grid">
        <Container size="lg">
          <PropertyGrid
            listings={listings}
            locale={locale}
            showFilter
            filters={filters}
            columns={4}
          />
        </Container>
      </Section>

      {/* ── Stats ────────────────────────────────────────── */}
      <Section
        theme="void"
        className="py-20 border-t border-[rgba(236,234,229,0.05)]"
        id="portfolio-stats"
      >
        <Container size="lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <StatCounter
              value={10}
              suffix="+"
              label={isFr ? "Années d'expérience" : 'Years Experience'}
            />
            <StatCounter
              value={50}
              suffix="+"
              label={isFr ? 'Domaines' : 'Domains'}
            />
            <StatCounter
              value={14000}
              label={isFr ? 'Réseau courtiers' : 'Broker Network'}
            />
            <StatCounter
              value={2}
              label={isFr ? 'Marchés' : 'Markets'}
            />
          </div>
        </Container>
      </Section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <Section theme="void" className="py-20 border-t border-[rgba(236,234,229,0.05)]" id="portfolio-cta">
        <Container size="lg" className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div>
            <Label className="mb-5 block">
              {isFr ? '(Travaillons ensemble)' : '(Work With Us)'}
            </Label>
            <div style={FONT_BARLOW}>
              <TextReveal
                as="h2"
                split="words"
                className="text-[clamp(2rem,5vw,3.75rem)] leading-tight tracking-tight text-[#eceae5] uppercase"
              >
                {isFr ? 'Vendez avec nous' : 'List With Us'}
              </TextReveal>
            </div>
            <SectionReveal delay={0.2} className="mt-4">
              <p className="text-[0.875rem] text-[#eceae5] opacity-40 leading-relaxed max-w-sm">
                {isFr
                  ? "OACIQ H2731 — Montréal et grande région."
                  : 'OACIQ H2731 — Montreal and greater region.'}
              </p>
            </SectionReveal>
          </div>
          <Button variant="primary" href={`/${locale}/contact`} size="lg">
            {isFr ? 'Contactez-nous' : 'Get in Touch'}
          </Button>
        </Container>
      </Section>
    </>
  )
}
