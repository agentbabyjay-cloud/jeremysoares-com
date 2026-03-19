import type { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import { getAllTools } from '@/lib/content/tools'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Label } from '@/components/ui/Label'
import { TextReveal } from '@/components/animation/TextReveal'
import { SectionReveal } from '@/components/animation/SectionReveal'
import { ToolCard } from '@/components/content/ToolCard'
import { DomainPill } from '@/components/content/DomainPill'
import { StatCounter } from '@/components/content/StatCounter'
import { Button } from '@/components/ui/Button'

// ─── Structured data ─────────────────────────────────────────────────────────

const aimmoJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': 'https://aimmo.ca/#software',
  name: 'aimmo',
  url: 'https://aimmo.ca',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description:
    'AI-powered real estate virtual staging platform. Transforms empty rooms into furnished, design-forward spaces in minutes.',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'CAD',
    availability: 'https://schema.org/InStock',
  },
  creator: {
    '@type': 'Person',
    '@id': 'https://jeremysoares.com/#agent',
    name: 'Jeremy Soares',
    url: 'https://jeremysoares.com',
  },
  sameAs: ['https://aimmo.ca'],
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale === 'fr-ca'

  const title = isFr
    ? 'Technologie immobilière & outils | aimmo IA, calculateur hypothécaire — Jeremy Soares'
    : 'Real Estate Technology & Tools | AI Staging, Mortgage Calculator — Jeremy Soares'

  const description = isFr
    ? "Outils immobiliers au Québec : aimmo mise en scène IA, calculateur hypothécaire Québec, réseau de 14\u202f000 courtiers, 50+ domaines spécialisés — Jeremy Soares Montréal."
    : 'Real estate tools Montreal: aimmo AI staging, mortgage calculator Quebec, 14,000-broker network, 50+ specialist domains — built by Jeremy Soares.'

  const canonical = `https://jeremysoares.com/${locale}/tools`

  return {
    title,
    description,
    keywords: isFr
      ? [
          'aimmo mise en scène IA',
          'outils immobiliers Montréal',
          'calculateur hypothécaire Québec',
          'technologie immobilière',
          'courtier immobilier IA',
          'Jeremy Soares',
        ]
      : [
          'aimmo AI staging',
          'real estate tools Montreal',
          'mortgage calculator Quebec',
          'real estate technology',
          'AI real estate broker',
          'Jeremy Soares',
        ],
    alternates: {
      canonical,
      languages: {
        'en-CA': 'https://jeremysoares.com/en-ca/tools',
        'fr-CA': 'https://jeremysoares.com/fr-ca/tools',
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Jeremy Soares',
      type: 'website',
      locale: isFr ? 'fr_CA' : 'en_CA',
      alternateLocale: isFr ? 'en_CA' : 'fr_CA',
      images: [
        {
          url: 'https://jeremysoares.com/images/og/tools-og.jpg',
          width: 1200,
          height: 630,
          alt: isFr
            ? 'aimmo — mise en scène immobilière par IA | Jeremy Soares'
            : 'aimmo — AI real estate staging | Jeremy Soares',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function ToolsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr-ca'
  const tools = getAllTools()

  const domainsFile = path.join(process.cwd(), 'content/domains.json')
  const domains: { domain: string }[] = fs.existsSync(domainsFile)
    ? JSON.parse(fs.readFileSync(domainsFile, 'utf-8'))
    : []

  return (
    <>
      {/* JSON-LD — aimmo SoftwareApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aimmoJsonLd) }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <Section theme="void" className="pt-32 pb-16 md:pt-40 md:pb-20">
        <Container size="lg">
          <Label className="mb-6">{isFr ? '(Technologie)' : '(Technology)'}</Label>

          {/* h1 — Barlow 900, v7 pattern */}
          <TextReveal
            as="h1"
            split="words"
            immediate
            delay={0.2}
            className="text-[clamp(3rem,8vw,6rem)] leading-none tracking-tight text-[#eceae5] uppercase"
            style={{
              fontFamily: "var(--font-barlow), 'Barlow', sans-serif",
              fontWeight: 900,
            }}
          >
            {isFr ? "Conçu pour l'immobilier" : 'Built for Real Estate'}
          </TextReveal>

          {/* Decorative italic sub-line — DM Serif Display */}
          <SectionReveal delay={0.45}>
            <p
              style={{
                fontFamily: "var(--font-dm-serif), 'DM Serif Display', serif",
                fontStyle: 'italic',
                fontSize: 'clamp(1.1rem,2vw,1.4rem)',
                letterSpacing: '0.04em',
                color: 'rgba(236,234,229,0.45)',
                marginTop: '1.25rem',
              }}
            >
              {isFr
                ? 'Infrastructure technologique pour agents et propriétaires.'
                : 'Technology infrastructure for brokers and property owners.'}
            </p>
          </SectionReveal>
        </Container>
      </Section>

      {/* ── aimmo — h2 section ───────────────────────────────────────────── */}
      <Section theme="void" className="py-24 md:py-32">
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

            {/* Copy */}
            <div>
              {/* h2 — required by brief */}
              <h2
                style={{
                  fontFamily: "var(--font-barlow), 'Barlow', sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(3rem,6vw,5rem)',
                  lineHeight: 1,
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  color: '#eceae5',
                  marginBottom: '1rem',
                }}
              >
                aimmo
              </h2>

              {/* Decorative tagline — DM Serif Display italic */}
              <p
                style={{
                  fontFamily: "var(--font-dm-serif), 'DM Serif Display', serif",
                  fontStyle: 'italic',
                  fontSize: 'clamp(0.95rem,1.6vw,1.2rem)',
                  letterSpacing: '0.06em',
                  color: 'rgba(236,234,229,0.4)',
                  marginBottom: '1.75rem',
                }}
              >
                {isFr ? 'Mise en scène immobilière par IA' : 'AI-Powered Real Estate Staging'}
              </p>

              <SectionReveal>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: '#eceae5',
                    opacity: 0.6,
                    lineHeight: 1.75,
                    marginBottom: '2rem',
                    maxWidth: '46ch',
                  }}
                >
                  {isFr
                    ? "aimmo transforme des pièces vides en espaces meublés et stylisés en quelques minutes grâce à l'IA. Conçu du point de vue d'un courtier — rapide, abordable et précis. La qualité ne diminue pas avec l'échelle."
                    : "aimmo transforms empty rooms into furnished, design-forward spaces in minutes using AI. Built from a broker's perspective — fast, affordable, and precise. Quality does not scale down."}
                </p>
              </SectionReveal>

              <div className="flex flex-wrap gap-3">
                <Button variant="primary" href="https://aimmo.ca" external>
                  {isFr ? 'Découvrir aimmo' : 'Explore aimmo'}
                </Button>
                <Button
                  variant="ghost"
                  href="https://tools.jeremysoares.com/ai-staging"
                  external
                >
                  {isFr ? 'Voir la démo' : 'View demo'}
                </Button>
              </div>
            </div>

            {/* Before / After placeholder */}
            <div
              className="relative aspect-[16/10] overflow-hidden flex items-center justify-center"
              style={{ background: 'rgba(236,234,229,0.06)' }}
            >
              <p
                style={{
                  fontSize: '0.625rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#eceae5',
                  opacity: 0.2,
                  fontFamily: "var(--font-barlow), 'Barlow', sans-serif",
                  fontWeight: 900,
                }}
              >
                {isFr ? 'Avant / Après — Bientôt' : 'Before / After — Coming Soon'}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Tool cards — h2 section ──────────────────────────────────────── */}
      <Section
        theme="void"
        className="py-24 md:py-32 border-t border-[rgba(236,234,229,0.05)]"
      >
        <Container size="lg">
          <Label className="mb-6">{isFr ? '(Outils)' : '(Tools)'}</Label>

          {/* h2 for the tools section */}
          <h2
            style={{
              fontFamily: "var(--font-barlow), 'Barlow', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(2rem,4vw,3.5rem)',
              lineHeight: 1,
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              color: '#eceae5',
              marginBottom: '3rem',
            }}
          >
            {isFr ? (
              <>
                Outils{' '}
                <em
                  style={{
                    fontFamily: "var(--font-dm-serif), 'DM Serif Display', serif",
                    fontStyle: 'italic',
                    fontWeight: 400,
                    textTransform: 'none',
                    letterSpacing: 0,
                    fontSize: '0.9em',
                  }}
                >
                  gratuits.
                </em>
              </>
            ) : (
              <>
                Free{' '}
                <em
                  style={{
                    fontFamily: "var(--font-dm-serif), 'DM Serif Display', serif",
                    fontStyle: 'italic',
                    fontWeight: 400,
                    textTransform: 'none',
                    letterSpacing: 0,
                    fontSize: '0.9em',
                  }}
                >
                  tools.
                </em>
              </>
            )}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} locale={locale} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Domain network ───────────────────────────────────────────────── */}
      <Section theme="void" className="py-20 border-t border-[rgba(236,234,229,0.05)]">
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-12 items-start">
            <div>
              <StatCounter
                value={50}
                suffix="+"
                label={isFr ? 'Domaines immobiliers' : 'Real Estate Domains'}
              />
            </div>
            <div>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: '#eceae5',
                  opacity: 0.5,
                  lineHeight: 1.75,
                  marginBottom: '2rem',
                  maxWidth: '56ch',
                }}
              >
                {isFr
                  ? "Un portefeuille de plus de 50 noms de domaine et sites web immobiliers spécialisés. Chacun cible un quartier, un type de propriété ou une intention d'achat."
                  : 'A portfolio of over 50 specialized real estate domain names and websites. Each one targets a specific neighbourhood, property type, or buyer intent.'}
              </p>
              <div className="flex flex-wrap gap-2">
                {domains.map((d) => (
                  <DomainPill key={d.domain} domain={d.domain} href={`https://${d.domain}`} />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Broker network stat ──────────────────────────────────────────── */}
      <Section theme="void" className="py-20 border-t border-[rgba(236,234,229,0.05)]">
        <Container size="sm" className="text-center">
          <StatCounter
            value={14000}
            label={
              isFr
                ? 'Courtiers québécois rejoints directement'
                : 'Quebec brokers reached directly'
            }
          />
          <SectionReveal delay={0.3} className="mt-8">
            <p
              style={{
                fontSize: '0.875rem',
                color: '#eceae5',
                opacity: 0.5,
                lineHeight: 1.75,
                maxWidth: '44ch',
                margin: '0 auto',
              }}
            >
              {isFr
                ? "Une liste courriel propriétaire bâtie au fil des ans. Quand votre propriété arrive sur le marché, elle atteint chaque courtier actif au Québec — directement."
                : 'A proprietary email list built over years. When your property goes to market, it reaches every active broker in Quebec — directly, the same day.'}
            </p>
          </SectionReveal>
        </Container>
      </Section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <Section theme="cream" className="py-20">
        <Container
          size="lg"
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
        >
          <h2
            style={{
              fontFamily: "var(--font-barlow), 'Barlow', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(1.5rem,3vw,2.5rem)',
              lineHeight: 1,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: '#0e1011',
            }}
          >
            {isFr ? (
              <>
                Accédez à cette{' '}
                <em
                  style={{
                    fontFamily: "var(--font-dm-serif), 'DM Serif Display', serif",
                    fontStyle: 'italic',
                    fontWeight: 400,
                    textTransform: 'none',
                    letterSpacing: 0,
                    fontSize: '1em',
                  }}
                >
                  infrastructure.
                </em>
              </>
            ) : (
              <>
                Want access to this{' '}
                <em
                  style={{
                    fontFamily: "var(--font-dm-serif), 'DM Serif Display', serif",
                    fontStyle: 'italic',
                    fontWeight: 400,
                    textTransform: 'none',
                    letterSpacing: 0,
                    fontSize: '1em',
                  }}
                >
                  infrastructure?
                </em>
              </>
            )}
          </h2>
          <Button
            variant="primary"
            theme="light"
            href={`/${locale}/contact`}
            size="lg"
          >
            {isFr ? 'Contactez-nous' : 'Get in Touch'}
          </Button>
        </Container>
      </Section>
    </>
  )
}
