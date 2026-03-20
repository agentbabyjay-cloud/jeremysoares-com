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
  const canonical = `${SITE_URL}/${locale}/services/investment-strategy`

  return {
    title: isFr
      ? 'Stratégie Investissement Immobilier Montréal | Cap Rate, ROI — Jeremy Soares'
      : 'Real Estate Investment Strategy Montreal | Cap Rates, ROI — Jeremy Soares',
    description: isFr
      ? "Analyse de rendement locatif, taux de capitalisation, flux de trésorerie prévisionnel et stratégie de sortie pour investisseurs immobiliers à Montréal. Courtier OACIQ H2731."
      : 'Rental yield analysis, cap rates, projected cash flow, and exit strategy for real estate investors in Montreal. OACIQ broker H2731.',
    keywords: isFr
      ? ['investissement immobilier Montréal', 'taux capitalisation Montréal', 'rendement locatif Montréal', 'stratégie investissement immobilier', 'courtier investisseur Montréal', 'Jeremy Soares']
      : ['real estate investment Montreal', 'cap rate Montreal', 'rental yield Montreal', 'investment strategy real estate', 'investor broker Montreal', 'Jeremy Soares'],
    alternates: {
      canonical,
      languages: {
        'en-CA': `${SITE_URL}/en-ca/services/investment-strategy`,
        'fr-CA': `${SITE_URL}/fr-ca/services/investment-strategy`,
      },
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title: isFr
        ? "Stratégie d'Investissement Immobilier Montréal — Jeremy Soares"
        : 'Real Estate Investment Strategy Montreal — Jeremy Soares',
      description: isFr
        ? "Analyse de rendement locatif, taux de capitalisation et stratégie de sortie pour investisseurs à Montréal."
        : 'Rental yield analysis, cap rates, and exit strategy for Montreal real estate investors.',
    },
  }
}

function InvestmentStrategyJsonLd({ locale }: { locale: string }) {
  const isFr = locale === 'fr-ca'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/${locale}/services/investment-strategy`,
        name: isFr ? "Stratégie d'Investissement Immobilier Montréal" : 'Real Estate Investment Strategy Montreal',
        description: isFr
          ? "Analyse complète des investissements immobiliers à Montréal : taux de capitalisation, flux de trésorerie, trajectoire des quartiers et positionnement de sortie."
          : 'Comprehensive real estate investment analysis in Montreal: cap rates, cash flow, neighbourhood trajectory, and exit positioning.',
        url: `${SITE_URL}/${locale}/services/investment-strategy`,
        provider: {
          '@type': 'RealEstateAgent',
          name: 'Jeremy Soares',
          telephone: '+15145198177',
          address: { '@type': 'PostalAddress', addressLocality: 'Montreal', addressRegion: 'QC', addressCountry: 'CA' },
        },
        areaServed: { '@type': 'City', name: 'Montreal', '@id': 'https://www.wikidata.org/wiki/Q340' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: isFr
          ? [
              { '@type': 'Question', name: "Qu'est-ce qu'un bon taux de capitalisation à Montréal?", acceptedAnswer: { '@type': 'Answer', text: "Les taux varient selon le type et l'emplacement : 4–5,5% pour les bureaux/commerces de premier ordre, 5–7% pour l'industriel, 3–5% pour le multifamilial résidentiel. Jeremy analyse chaque transaction dans son contexte spécifique de marché." } },
              { '@type': 'Question', name: "Montréal est-elle une bonne ville pour investir en immobilier?", acceptedAnswer: { '@type': 'Answer', text: "Oui. Montréal offre des prix d'entrée inférieurs à Toronto et Vancouver, une croissance démographique soutenue par l'immigration, une expansion du réseau de transport (REM) et une économie diversifiée axée sur la technologie, l'IA et les sciences de la vie." } },
              { '@type': 'Question', name: "Par où commencer en tant que premier investisseur?", acceptedAnswer: { '@type': 'Answer', text: "Commencez par un duplex ou triplex dans un quartier en transition — Verdun, Villeray, Rosemont est. Jeremy modélise le flux de trésorerie, la mise de fonds requise et le potentiel d'appréciation avant toute offre." } },
            ]
          : [
              { '@type': 'Question', name: 'What is a good cap rate in Montreal?', acceptedAnswer: { '@type': 'Answer', text: 'Rates vary by type and location: 4–5.5% for prime office/retail, 5–7% for industrial, 3–5% for residential multi-family. Jeremy analyses every transaction in its specific market context.' } },
              { '@type': 'Question', name: 'Is Montreal a good city for real estate investment?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Montreal offers lower entry prices than Toronto and Vancouver, sustained population growth driven by immigration, transit network expansion (REM), and a diversified economy anchored in technology, AI, and life sciences.' } },
              { '@type': 'Question', name: 'Where do I start as a first-time investor?', acceptedAnswer: { '@type': 'Answer', text: 'Start with a duplex or triplex in a transitioning neighbourhood — Verdun, Villeray, east Rosemont. Jeremy models cash flow, required down payment, and appreciation potential before any offer is made.' } },
            ],
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default async function InvestmentStrategyPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr-ca'

  const analysis = isFr
    ? [
        { title: 'Taux de capitalisation', body: "Jeremy calcule le taux de cap net pour chaque cible d'acquisition et le compare aux moyennes du sous-marché. Un taux de cap attractif aujourd'hui peut masquer des dépenses en capital imminentes — l'analyse va plus loin que le chiffre de surface." },
        { title: 'Flux de trésorerie', body: "Projection mois par mois du flux de trésorerie après service de la dette : revenus locatifs, taux de vacance anticipé, impôts fonciers, assurances, entretien et réserves. Jeremy livre une feuille de calcul détaillée avant chaque offre." },
        { title: 'Stratégie de sortie', body: "Chaque acquisition est évaluée avec trois stratégies de sortie : revente après valorisation, refinancement pour libérer des capitaux propres, ou conservation à long terme pour le flux de trésorerie. Le timing de sortie est modélisé dès le premier jour." },
        { title: 'Trajectoire du quartier', body: "Investir dans un quartier en transition cinq ans trop tôt peut être aussi coûteux que cinq ans trop tard. Jeremy analyse les permis de construction, les données démographiques, les nouvelles stations du REM et l'activité commerciale pour chronométrer l'entrée." },
      ]
    : [
        { title: 'Cap rates', body: "Jeremy calculates the net cap rate for every acquisition target and benchmarks it against sub-market averages. An attractive cap rate today can mask imminent capital expenditures — the analysis goes deeper than the surface figure." },
        { title: 'Cash flow', body: "Month-by-month cash flow projection after debt service: rental income, anticipated vacancy rate, property taxes, insurance, maintenance, and reserves. Jeremy delivers a detailed spreadsheet before any offer." },
        { title: 'Exit strategy', body: "Every acquisition is evaluated with three exit strategies: resale after value-add, refinancing to release equity, or long-term hold for cash flow. Exit timing is modelled from day one." },
        { title: 'Neighbourhood trajectory', body: "Entering a transitioning neighbourhood five years too early can be as costly as five years too late. Jeremy analyses construction permits, demographic data, new REM stations, and commercial activity to time the entry." },
      ]

  const profiles = isFr
    ? [
        {
          label: 'Premier investisseur',
          body: "Duplex, triplex ou condo locatif dans un quartier stable. Objectif : flux de trésorerie neutre à positif en année 1, appréciation sur 5–7 ans. Jeremy identifie les propriétés sous-évaluées avec potentiel locatif immédiat.",
        },
        {
          label: 'Investisseur de portefeuille',
          body: "Acquisition stratégique pour compléter un portefeuille existant. Diversification par type (résidentiel / commercial / industriel), optimisation fiscale via la structure corporative, et lignes de crédit hypothécaires pour financer les futures acquisitions.",
        },
      ]
    : [
        {
          label: 'First-time investor',
          body: "Duplex, triplex, or investment condo in a stable neighbourhood. Target: neutral to positive cash flow in year 1, appreciation over 5–7 years. Jeremy identifies undervalued properties with immediate rental potential.",
        },
        {
          label: 'Portfolio investor',
          body: "Strategic acquisition to complement an existing portfolio. Diversification by type (residential / commercial / industrial), tax optimisation via corporate structure, and HELOC lines to finance future acquisitions.",
        },
      ]

  const faqs = isFr
    ? [
        { q: "Qu'est-ce qu'un bon taux de capitalisation à Montréal?", a: "Les taux varient selon le type et l'emplacement : 4–5,5% pour les bureaux/commerces de premier ordre, 5–7% pour l'industriel, 3–5% pour le multifamilial résidentiel. Jeremy analyse chaque transaction dans son contexte spécifique de marché." },
        { q: "Montréal est-elle une bonne ville pour investir en immobilier?", a: "Oui. Montréal offre des prix d'entrée inférieurs à Toronto et Vancouver, une croissance démographique soutenue par l'immigration, une expansion du réseau de transport (REM) et une économie diversifiée axée sur la technologie, l'IA et les sciences de la vie." },
        { q: "Par où commencer en tant que premier investisseur?", a: "Commencez par un duplex ou triplex dans un quartier en transition — Verdun, Villeray, Rosemont est. Jeremy modélise le flux de trésorerie, la mise de fonds requise et le potentiel d'appréciation avant toute offre." },
      ]
    : [
        { q: 'What is a good cap rate in Montreal?', a: 'Rates vary by type and location: 4–5.5% for prime office/retail, 5–7% for industrial, 3–5% for residential multi-family. Jeremy analyses every transaction in its specific market context.' },
        { q: 'Is Montreal a good city for real estate investment?', a: 'Yes. Montreal offers lower entry prices than Toronto and Vancouver, sustained population growth driven by immigration, transit network expansion (REM), and a diversified economy anchored in technology, AI, and life sciences.' },
        { q: 'Where do I start as a first-time investor?', a: 'Start with a duplex or triplex in a transitioning neighbourhood — Verdun, Villeray, east Rosemont. Jeremy models cash flow, required down payment, and appreciation potential before any offer is made.' },
      ]

  return (
    <>
      <InvestmentStrategyJsonLd locale={locale} />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <Section theme="void" className="pt-32 pb-20 md:pt-44 md:pb-28">
        <Container size="lg">
          <Label className="mb-8">
            {isFr ? '(Services) — Investissement' : '(Services) — Investment'}
          </Label>

          <div
            style={{
              fontFamily: FONT_BARLOW,
              fontWeight: 900,
              fontSize: 'clamp(3rem, 9vw, 7rem)',
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
              {isFr ? 'Stratégie\nInvestissement' : 'Investment\nStrategy'}
            </TextReveal>
          </div>

          <SectionReveal delay={0.3} className="mt-5">
            <p
              className="text-[var(--color-cream)] opacity-35"
              style={{ fontFamily: FONT_DM_SERIF, fontStyle: 'italic', fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}
            >
              {isFr
                ? "Chaque acquisition modélisée. Chaque sortie planifiée. Aucun chiffre pris pour acquis."
                : 'Every acquisition modelled. Every exit planned. No number taken at face value.'}
            </p>
          </SectionReveal>

          <SectionReveal delay={0.45} className="mt-4 max-w-xl">
            <p
              className="text-[var(--color-cream)] opacity-45 leading-relaxed"
              style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
            >
              {isFr
                ? "L'immobilier à Montréal offre des rendements solides — à condition de choisir la bonne propriété, au bon prix, dans le bon quartier. Jeremy construit l'analyse avant la signature."
                : "Real estate in Montreal delivers solid returns — provided you select the right property, at the right price, in the right neighbourhood. Jeremy builds the analysis before the signature."}
            </p>
          </SectionReveal>
        </Container>
      </Section>

      {/* ── What Jeremy Analyses ────────────────────────────────────────── */}
      <Section theme="cream" className="py-24 md:py-32 relative overflow-hidden">
        <Container size="lg">
          <Label className="mb-10">
            {isFr ? "(Ce que Jeremy analyse)" : '(What Jeremy Analyses)'}
          </Label>

          <div
            className="mb-16"
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
              className="leading-none uppercase text-[var(--color-void)]"
            >
              {isFr ? "Au-delà du prix affiché" : 'Beyond the asking price'}
            </TextReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-l border-[rgba(14,16,17,0.08)]">
            {analysis.map((item, i) => (
              <SectionReveal key={i} delay={i * 0.08}>
                <div className="p-8 md:p-10 border-b border-r border-[rgba(14,16,17,0.08)]">
                  <h3
                    className="text-[var(--color-void)] mb-4"
                    style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', textTransform: 'uppercase', letterSpacing: '0.01em' }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-[var(--color-void)] opacity-55 leading-relaxed"
                    style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                  >
                    {item.body}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.2} className="mt-8">
            <div className="flex flex-wrap gap-4">
              <a
                href="https://quebecre.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 uppercase text-[var(--color-void)] opacity-40 hover:opacity-80 transition-opacity duration-200"
                style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.18em', fontWeight: 500 }}
              >
                quebecre.com <span aria-hidden="true" className="text-[0.6rem]">↗</span>
              </a>
              <a
                href="https://montrealre.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 uppercase text-[var(--color-void)] opacity-40 hover:opacity-80 transition-opacity duration-200"
                style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.18em', fontWeight: 500 }}
              >
                montrealre.ca <span aria-hidden="true" className="text-[0.6rem]">↗</span>
              </a>
            </div>
            <p
              className="mt-2 text-[var(--color-void)] opacity-30 uppercase"
              style={{ fontFamily: FONT_DM_SANS, fontSize: '9px', letterSpacing: '0.18em' }}
            >
              {isFr ? 'Données de marché complémentaires' : 'Supplementary market data'}
            </p>
          </SectionReveal>
        </Container>
      </Section>

      {/* ── Montreal Investment Case ─────────────────────────────────────── */}
      <Section theme="void" className="py-24 md:py-36">
        <Container size="lg">
          <Label className="mb-10">
            {isFr ? '(Pourquoi Montréal)' : '(The Montreal Case)'}
          </Label>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
              <div
                style={{
                  fontFamily: FONT_BARLOW,
                  fontWeight: 900,
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  letterSpacing: '-0.02em',
                }}
              >
                <TextReveal
                  as="h2"
                  split="words"
                  className="leading-none uppercase text-[var(--color-cream)]"
                >
                  {isFr ? 'Pourquoi investir à Montréal' : 'Why invest in Montreal'}
                </TextReveal>
              </div>
            </div>

            <div className="md:col-span-7 flex flex-col gap-6">
              {(isFr
                ? [
                    "Prix d'entrée nettement inférieurs à Toronto et Vancouver — avec des fondamentaux comparables en matière de demande de location.",
                    "Croissance démographique soutenue par des objectifs d'immigration fédéraux, une expansion universitaire et une main-d'œuvre technologique en pleine croissance.",
                    "Expansion du REM transformant l'accessibilité de quartiers entiers — créant des opportunités d'entrée avant que les prix s'ajustent.",
                    "Économie diversifiée : technologie, IA, sciences de la vie, aérospatiale, finance. Moins de volatilité cyclique que les marchés à dominante industrielle unique.",
                  ]
                : [
                    "Entry prices significantly below Toronto and Vancouver — with comparable rental demand fundamentals.",
                    "Population growth sustained by federal immigration targets, university expansion, and a growing technology workforce.",
                    "REM expansion transforming accessibility of entire neighbourhoods — creating entry opportunities before prices adjust.",
                    "Diversified economy: technology, AI, life sciences, aerospace, finance. Less cyclical volatility than single-industry-dominant markets.",
                  ]
              ).map((point, i) => (
                <SectionReveal key={i} delay={i * 0.08}>
                  <div className="flex gap-4">
                    <span
                      className="mt-1 shrink-0 text-[var(--color-cream)] opacity-20"
                      style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em' }}
                    >
                      —
                    </span>
                    <p
                      className="text-[var(--color-cream)] opacity-50 leading-relaxed"
                      style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                    >
                      {point}
                    </p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Investor Profiles ────────────────────────────────────────────── */}
      <Section theme="cream" className="py-24 md:py-32 relative overflow-hidden">
        <Container size="lg">
          <Label className="mb-10">
            {isFr ? '(Profils investisseurs)' : '(Investor Profiles)'}
          </Label>

          <div
            className="mb-14"
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
              className="leading-none uppercase text-[var(--color-void)]"
            >
              {isFr ? 'Où en êtes-vous?' : 'Where are you?'}
            </TextReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {profiles.map((p, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div className="p-10 border border-[rgba(14,16,17,0.1)]">
                  <p
                    className="uppercase text-[var(--color-void)] opacity-35 mb-4"
                    style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em', fontWeight: 500 }}
                  >
                    {p.label}
                  </p>
                  <p
                    className="text-[var(--color-void)] opacity-60 leading-relaxed"
                    style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                  >
                    {p.body}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <Section theme="void" className="py-24 md:py-32">
        <Container size="lg">
          <div
            className="mb-12"
            style={{
              fontFamily: FONT_BARLOW,
              fontWeight: 900,
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              letterSpacing: '-0.02em',
            }}
          >
            <TextReveal
              as="h2"
              split="words"
              className="leading-none uppercase text-[var(--color-cream)]"
            >
              {isFr ? 'Questions fréquentes' : 'FAQ'}
            </TextReveal>
          </div>

          <div className="border-t border-[rgba(236,234,229,0.08)]">
            {faqs.map((faq, i) => (
              <SectionReveal key={i} delay={i * 0.06}>
                <div className="py-8 border-b border-[rgba(236,234,229,0.08)]">
                  <h3
                    className="text-[var(--color-cream)] mb-3"
                    style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '1.05rem', textTransform: 'uppercase', letterSpacing: '0.02em' }}
                  >
                    {faq.q}
                  </h3>
                  <p
                    className="text-[var(--color-cream)] opacity-50 leading-relaxed max-w-3xl"
                    style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                  >
                    {faq.a}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <Section theme="cream" className="py-28 md:py-36 relative overflow-hidden">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12">
            <div className="flex-1 max-w-2xl">
              <SectionReveal>
                <span
                  className="block mb-6 uppercase"
                  style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em', color: '#f55f00' }}
                >
                  {isFr ? '— Votre prochain investissement' : '— Your next investment'}
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
                  className="leading-none uppercase text-[var(--color-void)]"
                >
                  {isFr ? 'Construisons ensemble' : 'Build together'}
                </TextReveal>
              </div>

              <SectionReveal delay={0.2} className="mt-6 max-w-md">
                <p
                  className="text-[var(--color-void)] opacity-40 leading-relaxed"
                  style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                >
                  {isFr
                    ? "Partagez vos critères d'investissement. Jeremy modélise les scénarios et vous présente les acquisitions qui correspondent — avec les chiffres à l'appui."
                    : "Share your investment criteria. Jeremy models the scenarios and presents acquisitions that qualify — with the numbers to back it up."}
                </p>
              </SectionReveal>
            </div>

            <SectionReveal delay={0.15} className="flex-shrink-0">
              <Button variant="primary" theme="light" href={`/${locale}/contact`} size="lg">
                {isFr ? 'Discutons' : "Let's Talk"}
              </Button>
            </SectionReveal>
          </div>
        </Container>
      </Section>
    </>
  )
}
