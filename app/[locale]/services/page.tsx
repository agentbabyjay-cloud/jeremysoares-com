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

// ─── SEO ──────────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale === 'fr-ca'
  const canonical = `https://jeremysoares.com/${locale}/services`

  return {
    title: isFr
      ? 'Services Immobiliers Montréal | Achat, Vente, Location, Commercial — Jeremy Soares'
      : 'Real Estate Services Montreal | Buy, Sell, Rent, Commercial — Jeremy Soares',
    description: isFr
      ? "Conseil préconstruction, marketing immobilier, stratégie d\u2019investissement, location commerciale et relocalisation à Montréal. Courtier OACIQ H2731."
      : 'Pre-construction advisory, property marketing, investment strategy, commercial leasing and relocation services in Montreal. OACIQ broker H2731.',
    keywords: isFr
      ? [
          'services immobiliers Montréal',
          'courtier immobilier services Montréal',
          'achat vente location Montréal',
          'courtier immobilier commercial Montréal',
          'conseil préconstruction Montréal',
          'Jeremy Soares courtier',
          'OACIQ H2731',
        ]
      : [
          'Montreal real estate services',
          'courtier immobilier services Montréal',
          'buy sell rent Montreal',
          'commercial real estate broker Montreal',
          'pre-construction advisory Montreal',
          'Jeremy Soares broker',
          'OACIQ H2731',
        ],
    alternates: {
      canonical,
      languages: {
        'en-CA': 'https://jeremysoares.com/en-ca/services',
        'fr-CA': 'https://jeremysoares.com/fr-ca/services',
      },
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title: isFr
        ? 'Services Immobiliers Montréal — Jeremy Soares'
        : 'Real Estate Services Montreal — Jeremy Soares',
      description: isFr
        ? "Conseil préconstruction, marketing immobilier, stratégie d\u2019investissement, location commerciale et relocalisation à Montréal."
        : 'Pre-construction advisory, property marketing, investment strategy, commercial leasing and relocation in Montreal.',
      images: [
        {
          url: 'https://cdn.prod.website-files.com/68ba28534a070e692e441089/68baf35dc28553a17f2d6d78_8-IMG_6610.jpg',
          width: 1218,
          height: 813,
          alt: isFr
            ? 'Services immobiliers Jeremy Soares Montréal'
            : 'Jeremy Soares Real Estate Services Montreal',
        },
      ],
    },
  }
}

// ─── JSON-LD structured data ──────────────────────────────────────────────────
function ServicesJsonLd({ locale }: { locale: string }) {
  const isFr = locale === 'fr-ca'
  const baseUrl = 'https://jeremysoares.com'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${baseUrl}/${locale}/services`,
    name: isFr
      ? 'Services Immobiliers Jeremy Soares'
      : 'Jeremy Soares Real Estate Services',
    description: isFr
      ? 'Services complets de courtage immobilier à Montréal : résidentiel, commercial, préconstruction, location et relocalisation.'
      : 'Full-service real estate brokerage in Montreal: residential, commercial, pre-construction, leasing, and relocation.',
    url: `${baseUrl}/${locale}/services`,
    provider: {
      '@type': 'RealEstateAgent',
      '@id': `${baseUrl}/#agent`,
      name: 'Jeremy Soares',
      telephone: '+15145198177',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Montreal',
        addressRegion: 'QC',
        addressCountry: 'CA',
      },
      sameAs: [
        'https://www.centris.ca/fr/courtier-immobilier~jeremy-soares~jeremy-soares/h2731',
        'https://www.realtor.ca/agent/2079722/jeremy-soares-106-220-av-des-pins-o-montreal-quebec-h2w1r9',
        'https://aimmo.ca',
      ],
    },
    areaServed: {
      '@type': 'City',
      name: 'Montreal',
      '@id': 'https://www.wikidata.org/wiki/Q340',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: isFr ? 'Services Immobiliers' : 'Real Estate Services',
      itemListElement: isFr
        ? [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Conseil Préconstruction' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Marketing Immobilier' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: "Stratégie d'Investissement" } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Location Commerciale' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Services de Relocalisation' } },
          ]
        : [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pre-Construction Advisory' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Property Marketing' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Investment Strategy' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Commercial Leasing' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Relocation Services' } },
          ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

// ─── Data types ───────────────────────────────────────────────────────────────
interface ServiceItem {
  number: string
  title: string
  tag: string
  description: string
  detailHref?: string
  links?: { label: string; href: string; external?: boolean }[]
}

interface ApproachItem {
  number: string
  headline: string
  body: string
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr-ca'

  const services: ServiceItem[] = isFr
    ? [
        {
          number: '01',
          title: 'Conseil Préconstruction',
          tag: 'Préconstruction',
          detailHref: `/${locale}/services/pre-construction`,
          description:
            "Accès prioritaire aux nouvelles phases avant l'ouverture publique. Analyse des plans d'étage, prix par pied carré, positionnement du promoteur et potentiel de revente. Les acheteurs qui s'engagent tôt gagnent sur le prix — et sur le choix.",
          links: [
            { label: 'Voir les présales actives', href: `/${locale}/presale` },
            { label: 'aimmo.ca', href: 'https://aimmo.ca', external: true },
          ],
        },
        {
          number: '02',
          title: 'Marketing Immobilier',
          tag: 'Marketing',
          detailHref: `/${locale}/services/property-marketing`,
          description:
            "Chaque propriété est positionnée comme une marque — visuels, texte, stratégie de diffusion. Photos professionnelles, mise en scène virtuelle par IA via aimmo, pages d'inscription dédiées et campagnes courriel rejoignant 14 000 courtiers québécois.",
          links: [
            { label: 'En savoir plus', href: `/${locale}/about` },
          ],
        },
        {
          number: '03',
          title: "Stratégie d'Investissement",
          tag: 'Investissement',
          detailHref: `/${locale}/services/investment-strategy`,
          description:
            "Analyse de rendement locatif, taux de capitalisation, flux de trésorerie prévisionnel et positionnement de sortie. Que vous constituiez un premier portefeuille ou que vous ajoutiez à un portefeuille existant, chaque acquisition est modélisée avant signature.",
          links: [
            { label: 'Immobilier résidentiel', href: `/${locale}/real-estate` },
            { label: 'Nos outils', href: `/${locale}/tools` },
          ],
        },
        {
          number: '04',
          title: 'Location Commerciale',
          tag: 'Commercial',
          detailHref: `/${locale}/services/commercial-leasing`,
          description:
            "Espaces de bureau, locaux commerciaux, entrepôts. Analyse du zonage, profils de locataires, structure des baux et négociation des conditions. Relations établies à travers le paysage commercial de Montréal.",
          links: [
            { label: 'Centris.ca', href: 'https://www.centris.ca', external: true },
          ],
        },
        {
          number: '05',
          title: 'Services de Relocalisation',
          tag: 'Relocalisation',
          detailHref: `/${locale}/services/relocation`,
          description:
            "Déménagement à Montréal ou départ vers une autre ville. Accompagnement complet de la première visite à la remise des clés : quartier, budget, style de vie, logistique. Bilingue anglais-français.",
          links: [
            { label: 'Nous contacter', href: `/${locale}/contact` },
          ],
        },
      ]
    : [
        {
          number: '01',
          title: 'Pre-Construction Advisory',
          tag: 'Pre-Construction',
          detailHref: `/${locale}/services/pre-construction`,
          description:
            "Priority access to new phases before public launch. Floor plan analysis, price-per-square-foot benchmarking, developer track records, and resale projections. Buyers who commit early win on price — and on selection.",
          links: [
            { label: 'View active pre-sales', href: `/${locale}/presale` },
            { label: 'aimmo.ca', href: 'https://aimmo.ca', external: true },
          ],
        },
        {
          number: '02',
          title: 'Property Marketing',
          tag: 'Marketing',
          detailHref: `/${locale}/services/property-marketing`,
          description:
            "Every listing treated as a brand launch — visuals, copy, distribution strategy. Professional photography, AI virtual staging via aimmo, dedicated listing pages, and targeted email campaigns reaching 14,000 Quebec brokers.",
          links: [
            { label: 'Learn more', href: `/${locale}/about` },
          ],
        },
        {
          number: '03',
          title: 'Investment Strategy',
          tag: 'Investment',
          detailHref: `/${locale}/services/investment-strategy`,
          description:
            "Rental yield analysis, cap rates, projected cash flow, and exit positioning. Whether building a first portfolio or adding to an existing one, every acquisition is modelled before a signature is drawn.",
          links: [
            { label: 'Residential listings', href: `/${locale}/real-estate` },
            { label: 'Our tools', href: `/${locale}/tools` },
          ],
        },
        {
          number: '04',
          title: 'Commercial Leasing',
          tag: 'Commercial',
          detailHref: `/${locale}/services/commercial-leasing`,
          description:
            "Office space, retail, industrial. Zoning analysis, tenant profiling, lease structuring, and term negotiation. Established relationships across Montreal's commercial landscape from Old Port to Laval.",
          links: [
            { label: 'Centris.ca', href: 'https://www.centris.ca', external: true },
            { label: 'Realtor.ca', href: 'https://www.realtor.ca', external: true },
          ],
        },
        {
          number: '05',
          title: 'Relocation Services',
          tag: 'Relocation',
          detailHref: `/${locale}/services/relocation`,
          description:
            "Moving to Montreal or leaving for another city. Full accompaniment from first visit to key handover: neighbourhood fit, budget mapping, lifestyle matching, logistics coordination. Bilingual English-French throughout.",
          links: [
            { label: 'Get in touch', href: `/${locale}/contact` },
          ],
        },
      ]

  const approach: ApproachItem[] = isFr
    ? [
        {
          number: '01',
          headline: 'Chaque propriété est une marque.',
          body: "Elle mérite une stratégie de lancement — pas une simple annonce. Positionnement, visuels, narration : tout est construit pour capter les bons acheteurs.",
        },
        {
          number: '02',
          headline: "Les données guident. L\u2019expérience conclut.",
          body: "L\u2019analyse du marché indique où inscrire et à quel prix. Dix ans de transactions me disent comment négocier quand les conditions changent.",
        },
        {
          number: '03',
          headline: 'Votre échéancier est le mien.',
          body: "Pas de relance à froid, pas de mises à jour génériques. Vous savez où en est votre dossier à chaque étape parce que je vous en informe avant que vous ayez à demander.",
        },
        {
          number: '04',
          headline: "L\u2019infrastructure que les autres sous-traitent.",
          body: "Plus de 50 domaines immobiliers, un réseau de 14\u202F000 courtiers et une plateforme de mise en scène par IA — construits en interne pour que vos biens aient une longueur d\u2019avance.",
        },
      ]
    : [
        {
          number: '01',
          headline: 'Every property is a brand.',
          body: 'It deserves a launch strategy — not just a listing. Positioning, visuals, storytelling: everything built to attract the right buyers, not just any buyers.',
        },
        {
          number: '02',
          headline: 'Data guides. Experience closes.',
          body: "Market analysis tells me where to list and at what price. Ten years of transactions tell me how to negotiate when conditions shift.",
        },
        {
          number: '03',
          headline: 'Your timeline is mine.',
          body: 'No cold follow-ups, no generic status updates. You know where your deal stands at every step because I tell you before you have to ask.',
        },
        {
          number: '04',
          headline: 'The infrastructure others outsource.',
          body: 'Over 50 real estate domains, a 14,000-broker network, and an AI staging platform — built in-house so your properties reach further, faster.',
        },
      ]

  return (
    <>
      <ServicesJsonLd locale={locale} />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <Section theme="void" className="pt-32 pb-20 md:pt-44 md:pb-28">
        <Container size="lg">
          <Label className="mb-8">{isFr ? '(Services)' : '(Services)'}</Label>

          {/* Display heading — Barlow 900 */}
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
              {isFr ? 'Services' : 'Services'}
            </TextReveal>
          </div>

          {/* Decorative italic sub-label — DM Serif Display */}
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
                ? 'Courtage immobilier complet — résidentiel, commercial, préconstruction'
                : 'Full-service real estate brokerage — residential, commercial, pre-construction'}
            </p>
          </SectionReveal>

          {/* Body descriptor — DM Sans */}
          <SectionReveal delay={0.5} className="mt-4 max-w-lg">
            <p
              className="leading-relaxed text-[var(--color-cream)] opacity-45"
              style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
            >
              {isFr
                ? "Cinq offres de service. Une seule plateforme. OACIQ H2731."
                : 'Five service offerings. One integrated platform. OACIQ H2731.'}
            </p>
          </SectionReveal>
        </Container>
      </Section>

      {/* ── Service list — cream section ────────────────────────────────── */}
      <Section theme="cream" className="py-0 relative overflow-hidden">
        {/* GSAP wipe overlay target */}

        <Container size="lg">
          <div
            className="border-t"
            style={{ borderColor: 'rgba(14,16,17,0.1)' }}
          >
            {services.map((s) => (
              <ServiceListRow key={s.number} item={s} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ── The Approach — void section ─────────────────────────────────── */}
      <Section theme="void" className="py-24 md:py-36">
        <Container size="lg">
          {/* Section label */}
          <Label className="mb-10">
            {isFr ? "(L\u2019approche)" : '(The Approach)'}
          </Label>

          {/* Section heading */}
          <div
            className="mb-16"
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
              className="leading-none uppercase text-[var(--color-cream)]"
            >
              {isFr ? 'Philosophie' : 'The Approach'}
            </TextReveal>
          </div>

          <div
            className="border-t"
            style={{ borderColor: 'rgba(236,234,229,0.08)' }}
          >
            {approach.map((item, i) => (
              <SectionReveal key={item.number} delay={i * 0.08}>
                <div
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 py-10 border-b"
                  style={{ borderColor: 'rgba(236,234,229,0.08)' }}
                >
                  {/* Number */}
                  <div className="md:col-span-1 flex items-start pt-1">
                    <span
                      className="uppercase text-[var(--color-cream)] opacity-25"
                      style={{
                        fontFamily: FONT_DM_SANS,
                        fontSize: '10px',
                        letterSpacing: '0.22em',
                        fontWeight: 500,
                      }}
                    >
                      {item.number}
                    </span>
                  </div>

                  {/* Headline */}
                  <div className="md:col-span-4">
                    <h3
                      className="text-[var(--color-cream)] leading-tight"
                      style={{
                        fontFamily: FONT_DM_SERIF,
                        fontStyle: 'italic',
                        fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)',
                      }}
                    >
                      {item.headline}
                    </h3>
                  </div>

                  {/* Body */}
                  <div className="md:col-span-7">
                    <p
                      className="text-[var(--color-cream)] opacity-50 leading-relaxed"
                      style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                    >
                      {item.body}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Internal nav band — cream ────────────────────────────────────── */}
      <Section theme="cream" className="py-16 md:py-20 relative overflow-hidden">
        <Container size="lg">
          <SectionReveal>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <p
                className="text-[var(--color-void)] opacity-40 uppercase"
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
                  { label: isFr ? 'Immobilier' : 'Real Estate', href: `/${locale}/real-estate` },
                  { label: isFr ? 'Outils' : 'Tools', href: `/${locale}/tools` },
                  { label: isFr ? 'À propos' : 'About', href: `/${locale}/about` },
                  { label: isFr ? 'Contact' : 'Contact', href: `/${locale}/contact` },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-[var(--color-void)] opacity-60 hover:opacity-100 transition-opacity duration-200 uppercase"
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
              {/* Accent label */}
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
                  {isFr ? '— Prochaine étape' : '— Next step'}
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
                  className="leading-none uppercase text-[var(--color-cream)]"
                >
                  {isFr ? 'Quel service vous convient?' : 'Which service fits?'}
                </TextReveal>
              </div>

              <SectionReveal delay={0.2} className="mt-6 max-w-md">
                <p
                  className="text-[var(--color-cream)] opacity-40 leading-relaxed"
                  style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                >
                  {isFr
                    ? "Une conversation de 15 minutes suffit généralement à clarifier l'approche la mieux adaptée à votre situation."
                    : "A 15-minute conversation is usually enough to clarify which approach fits your situation best."}
                </p>
              </SectionReveal>
            </div>

            <SectionReveal delay={0.15} className="flex-shrink-0">
              <Button variant="primary" theme="dark" href={`/${locale}/contact`} size="lg">
                {isFr ? 'Discutons' : "Let's Talk"}
              </Button>
            </SectionReveal>
          </div>
        </Container>
      </Section>
    </>
  )
}

// ─── Service list row — inline component ─────────────────────────────────────
// Kept as a server component; hover effects are CSS-only via Tailwind group.

const FONT_BARLOW_ROW = `var(--font-barlow), 'Barlow', sans-serif`
const FONT_DM_SANS_ROW = `var(--font-dm-sans), 'DM Sans', sans-serif`

function ServiceListRow({ item }: { item: ServiceItem }) {
  const WrapperTag = item.detailHref ? 'a' : 'div'
  const wrapperProps = item.detailHref
    ? { href: item.detailHref, 'aria-label': item.title }
    : { 'aria-label': item.title }

  return (
    <WrapperTag
      {...wrapperProps}
      className="group block py-14 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 border-b transition-all duration-300 hover:pl-1 md:hover:pl-2"
      style={{ borderColor: 'rgba(14,16,17,0.1)', textDecoration: 'none' }}
    >
      {/* Number */}
      <div className="md:col-span-1 flex items-start pt-1">
        <span
          className="uppercase text-[var(--color-void)] opacity-25 group-hover:opacity-40 transition-opacity duration-200"
          style={{
            fontFamily: FONT_DM_SANS_ROW,
            fontSize: '10px',
            letterSpacing: '0.22em',
          }}
        >
          {item.number}
        </span>
      </div>

      {/* Title + tag */}
      <div className="md:col-span-4">
        <span
          className="block mb-2 uppercase text-[var(--color-void)] opacity-30"
          style={{
            fontFamily: FONT_DM_SANS_ROW,
            fontSize: '10px',
            letterSpacing: '0.22em',
          }}
        >
          {item.tag}
        </span>
        <h3
          className="leading-tight uppercase text-[var(--color-void)] group-hover:opacity-70 transition-opacity duration-200"
          style={{
            fontFamily: FONT_BARLOW_ROW,
            fontWeight: 900,
            fontSize: 'clamp(1.5rem, 3vw, 2.75rem)',
            letterSpacing: '-0.01em',
          }}
        >
          {item.title}
        </h3>
      </div>

      {/* Description + links */}
      <div className="md:col-span-7 flex flex-col justify-between gap-6">
        <p
          className="text-[var(--color-void)] opacity-55 leading-relaxed"
          style={{ fontFamily: FONT_DM_SANS_ROW, fontSize: '0.9375rem' }}
        >
          {item.description}
        </p>

        {item.links && item.links.length > 0 && (
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {item.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-1.5 uppercase text-[var(--color-void)] opacity-40 hover:opacity-80 transition-opacity duration-200"
                style={{
                  fontFamily: FONT_DM_SANS_ROW,
                  fontSize: '10px',
                  letterSpacing: '0.18em',
                  fontWeight: 500,
                }}
              >
                {link.label}
                <span aria-hidden="true" className="text-[0.6rem]">
                  {link.external ? '↗' : '→'}
                </span>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Detail page arrow — desktop only */}
      <div className="hidden md:flex md:col-span-12 justify-end -mt-4 items-center opacity-0 group-hover:opacity-40 transition-opacity duration-300">
        <span
          className="text-[var(--color-void)]"
          aria-hidden="true"
          style={{ fontSize: '1.1rem' }}
        >
          →
        </span>
      </div>
    </WrapperTag>
  )
}
