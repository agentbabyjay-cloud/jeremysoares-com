import type { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import Image from 'next/image'
import Link from 'next/link'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Label } from '@/components/ui/Label'
import { TextReveal } from '@/components/animation/TextReveal'
import { SectionReveal } from '@/components/animation/SectionReveal'
import { TimelineRow } from '@/components/content/TimelineRow'
import { DomainPill } from '@/components/content/DomainPill'
import { StatCounter } from '@/components/content/StatCounter'
import { Button } from '@/components/ui/Button'
import type { TimelineEntry } from '@/lib/content/types'

// ─── SEO ─────────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale === 'fr-ca'

  const title = isFr
    ? 'À propos de Jeremy Soares | Courtier Immobilier Montréal, Architecte & Artiste'
    : 'About Jeremy Soares | Montreal Real Estate Broker, Architect & Artist'

  const description = isFr
    ? 'Jeremy Soares — courtier immobilier à Montréal, architecte de formation, artiste. Plus de 10 ans entre Montréal et Vancouver. OACIQ H2731.'
    : 'Jeremy Soares — Montreal real estate broker, trained architect, and artist. 10+ years across Montreal and Vancouver. Architecture meets real estate expertise.'

  const canonicalLocale = locale
  const altLocale = isFr ? 'en-ca' : 'fr-ca'

  return {
    title,
    description,
    alternates: {
      canonical: `https://jeremysoares.com/${canonicalLocale}/about`,
      languages: {
        'en-CA': 'https://jeremysoares.com/en-ca/about',
        'fr-CA': 'https://jeremysoares.com/fr-ca/about',
      },
    },
    openGraph: {
      title,
      description,
      url: `https://jeremysoares.com/${canonicalLocale}/about`,
      siteName: 'Jeremy Soares',
      locale: isFr ? 'fr_CA' : 'en_CA',
      type: 'profile',
      images: [
        {
          url: 'https://jeremysoares.com/images/headshots/Jeremy-Soares-Montreal-Realtor.webp',
          width: 1200,
          height: 1600,
          alt: isFr
            ? 'Jeremy Soares — Courtier Immobilier Montréal'
            : 'Jeremy Soares — Montreal Real Estate Broker',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://jeremysoares.com/images/headshots/Jeremy-Soares-Montreal-Realtor.webp'],
    },
  }
}

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

function PersonJsonLd({ isFr }: { isFr: boolean }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Jeremy Soares',
    jobTitle: isFr
      ? 'Courtier Immobilier Agréé — OACIQ H2731'
      : 'Licensed Real Estate Broker — OACIQ H2731',
    description: isFr
      ? 'Courtier immobilier à Montréal, architecte de formation, artiste. Fondateur de Soares Agency et aimmo.'
      : 'Montreal real estate broker, trained architect, artist. Founder of Soares Agency and aimmo.',
    url: 'https://jeremysoares.com',
    image: 'https://jeremysoares.com/images/headshots/Jeremy-Soares-Montreal-Realtor.webp',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Montréal',
      addressRegion: 'QC',
      addressCountry: 'CA',
    },
    sameAs: [
      'https://www.linkedin.com/in/jeremysoares',
      'https://www.centris.ca/en/brokers~jeremy-soares~H2731',
      'https://www.realtor.ca/agent/jeremy-soares',
    ],
    knowsAbout: [
      'Real Estate',
      'Architecture',
      'Montreal Real Estate Market',
      'Luxury Residential',
      'Pre-Sale Condominiums',
      'AI Real Estate Technology',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Soares Agency',
      url: 'https://jeremysoares.com',
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

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr-ca'

  const timelineFile = path.join(process.cwd(), 'content/timeline.json')
  const timeline: TimelineEntry[] = fs.existsSync(timelineFile)
    ? JSON.parse(fs.readFileSync(timelineFile, 'utf-8'))
    : []

  const domainsFile = path.join(process.cwd(), 'content/domains.json')
  const domains: { domain: string; type: string }[] = fs.existsSync(domainsFile)
    ? JSON.parse(fs.readFileSync(domainsFile, 'utf-8'))
    : []

  return (
    <>
      <PersonJsonLd isFr={isFr} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <Section theme="void" className="pt-32 pb-16 md:pt-40 md:pb-20">
        <Container size="lg">
          <Label className="mb-6">{isFr ? '(À propos)' : '(About)'}</Label>

          {/* h1 split across two TextReveal lines — both render the same h1 tag */}
          <TextReveal
            as="h1"
            split="chars"
            immediate
            delay={0.2}
            className="text-[clamp(4rem,10vw,8rem)] leading-none tracking-tight text-[#eceae5] uppercase"
            style={{ fontFamily: "var(--font-barlow), 'Barlow', sans-serif", fontWeight: 900 }}
          >
            JEREMY
          </TextReveal>
          <TextReveal
            as="div"
            split="chars"
            immediate
            delay={0.4}
            aria-hidden="true"
            className="text-[clamp(4rem,10vw,8rem)] leading-none tracking-tight text-[#eceae5] uppercase"
            style={{ fontFamily: "var(--font-barlow), 'Barlow', sans-serif", fontWeight: 900 }}
          >
            SOARES
          </TextReveal>

          <SectionReveal delay={0.65} className="mt-5">
            <p
              className="text-[1rem] tracking-[0.22em] uppercase text-[#eceae5] opacity-30"
              style={{ fontSize: '10px', letterSpacing: '0.22em' }}
            >
              {isFr ? 'Courtier. Architecte. Artiste.' : 'Broker. Architect. Artist.'}
            </p>
          </SectionReveal>
        </Container>
      </Section>

      {/* ── Photo + Bio ──────────────────────────────────────────────────── */}
      <Section theme="cream" className="py-24 md:py-32">
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

            {/* Headshot */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-[8px]">
              <Image
                src="/images/headshots/Jeremy-Soares-Montreal-Realtor.webp"
                alt={
                  isFr
                    ? 'Jeremy Soares — Courtier Immobilier Montréal'
                    : 'Jeremy Soares — Montreal Real Estate Broker'
                }
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>

            {/* Bio copy */}
            <div>
              <SectionReveal>
                {/* Decorative pull quote */}
                <p
                  className="text-[clamp(1.25rem,2vw,1.5rem)] text-[#0e1011] opacity-50 leading-relaxed mb-8"
                  style={{
                    fontFamily: "var(--font-dm-serif), 'DM Serif Display', serif",
                    fontStyle: 'italic',
                  }}
                >
                  {isFr
                    ? "J'ai été formé pour concevoir des bâtiments. J'ai fini par les vendre. L'œil n'a jamais changé — seul le médium a changé."
                    : "I trained to design buildings. I ended up selling them. The eye never changed — only the medium did."}
                </p>

                {/* Body paragraphs */}
                <div className="space-y-6 text-[1rem] text-[#0e1011] opacity-60 leading-relaxed">
                  <p>
                    {isFr
                      ? "J'ai étudié l'architecture à Montréal. Pas parce que je voulais construire des tours, mais parce que j'étais attiré par la façon dont l'espace façonne l'expérience. Cette discipline m'a suivi dans l'immobilier."
                      : 'I studied architecture in Montreal. Not because I wanted to build towers, but because I was drawn to how space shapes experience. That discipline followed me into real estate.'}
                  </p>
                  <p>
                    {isFr
                      ? 'Mon premier marché était Vancouver. Résidentiel de luxe. Condos en prévente. Puis je suis rentré à Montréal. Ma ville. Mon marché.'
                      : 'My first market was Vancouver. Luxury residential. Pre-sale condos with developers who needed someone who could see a building the way a buyer would. Then I came home to Montreal.'}
                  </p>
                  <p>
                    {isFr
                      ? "En cours de route, j'ai construit l'infrastructure que la plupart des courtiers sous-traitent. Plus de 50 domaines. Un réseau de 14 000 courtiers. Et aimmo — une plateforme de mise en scène par IA créée de zéro."
                      : "Along the way, I built the infrastructure most brokers outsource. Over 50 real estate domains. A 14,000 broker email network. And aimmo — an AI staging platform developed from scratch."}
                  </p>
                </div>

                {/* Internal nav links */}
                <nav
                  aria-label={isFr ? 'Navigation rapide' : 'Quick links'}
                  className="mt-10 flex flex-wrap gap-4 text-[11px] tracking-[0.2em] uppercase text-[#0e1011] opacity-40"
                >
                  <Link href={`/${locale}/services`} className="hover:opacity-80 transition-opacity">
                    {isFr ? 'Services' : 'Services'}
                  </Link>
                  <span aria-hidden="true">/</span>
                  <Link href={`/${locale}/tools`} className="hover:opacity-80 transition-opacity">
                    {isFr ? 'Outils' : 'Tools'}
                  </Link>
                  <span aria-hidden="true">/</span>
                  <Link href={`/${locale}/studio`} className="hover:opacity-80 transition-opacity">
                    Studio
                  </Link>
                  <span aria-hidden="true">/</span>
                  <Link href={`/${locale}/contact`} className="hover:opacity-80 transition-opacity">
                    {isFr ? 'Contact' : 'Contact'}
                  </Link>
                </nav>

                {/* External profile links */}
                <nav
                  aria-label={isFr ? 'Profils professionnels' : 'Professional profiles'}
                  className="mt-4 flex flex-wrap gap-4 text-[11px] tracking-[0.2em] uppercase text-[#0e1011] opacity-30"
                >
                  <a
                    href="https://www.linkedin.com/in/jeremysoares"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-70 transition-opacity"
                  >
                    LinkedIn
                  </a>
                  <span aria-hidden="true">/</span>
                  <a
                    href="https://www.centris.ca/en/brokers~jeremy-soares~H2731"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-70 transition-opacity"
                  >
                    Centris
                  </a>
                  <span aria-hidden="true">/</span>
                  <a
                    href="https://www.realtor.ca/agent/jeremy-soares"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-70 transition-opacity"
                  >
                    Realtor.ca
                  </a>
                </nav>
              </SectionReveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Timeline ─────────────────────────────────────────────────────── */}
      <Section theme="void" className="py-24 md:py-32">
        <Container size="lg">
          <TextReveal
            as="h2"
            split="lines"
            className="text-[clamp(2rem,5vw,3.75rem)] leading-none tracking-tight text-[#eceae5] uppercase mb-12"
            style={{ fontFamily: "var(--font-barlow), 'Barlow', sans-serif", fontWeight: 900 }}
          >
            {isFr ? 'Parcours' : 'Experience'}
          </TextReveal>
          <div>
            {timeline.map((entry, i) => (
              <TimelineRow key={i} entry={entry} locale={locale} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Domain Network ───────────────────────────────────────────────── */}
      <Section theme="void" className="py-20 border-t border-[rgba(236,234,229,0.05)]">
        <Container size="lg">
          <Label className="mb-8">{isFr ? '(Réseau de domaines)' : '(Domain Network)'}</Label>
          <div className="flex flex-wrap gap-2">
            {domains.slice(0, 30).map((d) => (
              <DomainPill key={d.domain} domain={d.domain} href={`https://${d.domain}`} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <Section theme="void" className="py-20 border-t border-[rgba(236,234,229,0.05)]">
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

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <Section theme="void" className="py-24 border-t border-[rgba(236,234,229,0.05)]">
        <Container size="sm" className="text-center">
          <Label className="mb-6">{isFr ? '(Commençons)' : "(Let's begin)"}</Label>
          <TextReveal
            as="h2"
            split="words"
            className="text-[clamp(2rem,5vw,3.75rem)] leading-tight tracking-tight text-[#eceae5] uppercase mb-8"
            style={{ fontFamily: "var(--font-barlow), 'Barlow', sans-serif", fontWeight: 900 }}
          >
            {isFr ? 'Travaillons ensemble.' : 'Work Together.'}
          </TextReveal>
          <Button variant="primary" href={`/${locale}/contact`} size="lg">
            {isFr ? 'Contactez-nous' : 'Get in Touch'}
          </Button>
        </Container>
      </Section>
    </>
  )
}
