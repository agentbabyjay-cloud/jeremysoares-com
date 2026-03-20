import type { Metadata } from 'next'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Label } from '@/components/ui/Label'
import { TextReveal } from '@/components/animation/TextReveal'
import { SectionReveal } from '@/components/animation/SectionReveal'
import { Button } from '@/components/ui/Button'

const FONT_BARLOW = `var(--font-barlow), 'Barlow', sans-serif`
const FONT_DM_SANS = `var(--font-dm-sans), 'DM Sans', sans-serif`
const FONT_DM_SERIF = `var(--font-dm-serif), 'DM Serif Display', serif`
const SITE_URL = 'https://jeremysoares.com'
const TOOLS_URL = 'https://tools.jeremysoares.com'

// ── Tool categories with all 40 tools ─────────────────────────────────────────
const toolCategories = [
  {
    id: 'core',
    labelEn: 'Essential',
    labelFr: 'Essentiels',
    tools: [
      { slug: 'mortgage-calculator', en: 'Mortgage Calculator', fr: 'Calculatrice Hypothécaire', path: '/en/residential/mortgage-calculator', pathFr: '/fr/residentiel/calculatrice-hypothecaire' },
      { slug: 'affordability-calculator', en: 'Affordability Calculator', fr: 'Capacité d\'Achat', path: '/en/affordability-calculator', pathFr: '/fr/calculatrice-capacite-achat' },
      { slug: 'land-transfer-tax', en: 'Land Transfer Tax (Taxe de Bienvenue)', fr: 'Taxe de Bienvenue', path: '/en/residential/land-transfer-tax', pathFr: '/fr/residentiel/taxe-bienvenue' },
      { slug: 'closing-costs', en: 'Closing Costs', fr: 'Frais de Clôture', path: '/en/residential/closing-costs', pathFr: '/fr/residentiel/frais-cloture' },
      { slug: 'stress-test', en: 'Mortgage Stress Test', fr: 'Test de Résistance Hypothécaire', path: '/en/residential/stress-test', pathFr: '/fr/residentiel/test-resistance' },
      { slug: 'rent-vs-buy', en: 'Rent vs. Buy', fr: 'Louer ou Acheter', path: '/en/rent-vs-buy', pathFr: '/fr/louer-vs-acheter' },
    ],
  },
  {
    id: 'buyer',
    labelEn: 'Buyer Tools',
    labelFr: 'Outils Acheteur',
    tools: [
      { slug: 'commission-calculator', en: 'Commission Calculator', fr: 'Calculatrice Commission', path: '/en/residential/commission-calculator', pathFr: '/fr/residentiel/calculatrice-commission' },
      { slug: 'down-payment-tracker', en: 'Down Payment Tracker', fr: 'Suivi Mise de Fonds', path: '/en/residential/down-payment-tracker', pathFr: '/fr/residentiel/suivi-mise-de-fonds' },
      { slug: 'bidding-strategy', en: 'Bidding Strategy', fr: 'Stratégie d\'Offre', path: '/en/residential/bidding-strategy', pathFr: '/fr/residentiel/strategie-offre' },
      { slug: 'debt-to-income', en: 'Debt-to-Income Ratio', fr: 'Ratio d\'Endettement', path: '/en/residential/debt-to-income', pathFr: '/fr/residentiel/ratio-endettement' },
      { slug: 'inspection-cost', en: 'Inspection Cost', fr: 'Coût d\'Inspection', path: '/en/residential/inspection-cost', pathFr: '/fr/residentiel/cout-inspection' },
      { slug: 'moving-cost', en: 'Moving Cost Calculator', fr: 'Calculatrice Déménagement', path: '/en/residential/moving-cost', pathFr: '/fr/residentiel/cout-demenagement' },
    ],
  },
  {
    id: 'seller',
    labelEn: 'Seller Tools',
    labelFr: 'Outils Vendeur',
    tools: [
      { slug: 'seller-net-sheet', en: 'Seller Net Sheet', fr: 'Feuille Nette Vendeur', path: '/en/residential/seller-net-sheet', pathFr: '/fr/residentiel/feuille-nette-vendeur' },
      { slug: 'renovation-roi', en: 'Renovation ROI', fr: 'ROI Rénovation', path: '/en/residential/renovation-roi', pathFr: '/fr/residentiel/roi-renovation' },
      { slug: 'home-insurance', en: 'Home Insurance Estimate', fr: 'Assurance Habitation', path: '/en/residential/home-insurance', pathFr: '/fr/residentiel/assurance-habitation' },
      { slug: 'property-appreciation', en: 'Property Appreciation', fr: 'Appréciation Immobilière', path: '/en/residential/property-appreciation', pathFr: '/fr/residentiel/appreciation-propriete' },
    ],
  },
  {
    id: 'investment',
    labelEn: 'Investment Analysis',
    labelFr: 'Analyse d\'Investissement',
    tools: [
      { slug: 'cap-rate', en: 'Cap Rate Calculator', fr: 'Calculatrice Taux de Cap', path: '/en/residential/cap-rate', pathFr: '/fr/residentiel/taux-capitalisation' },
      { slug: 'cash-flow', en: 'Cash Flow Calculator', fr: 'Calculatrice Flux de Trésorerie', path: '/en/residential/cash-flow', pathFr: '/fr/residentiel/flux-tresorerie' },
      { slug: 'rental-yield', en: 'Rental Yield', fr: 'Rendement Locatif', path: '/en/residential/rental-yield', pathFr: '/fr/residentiel/rendement-locatif' },
      { slug: 'roi-calculator', en: 'ROI Calculator', fr: 'Calculatrice ROI', path: '/en/residential/roi-calculator', pathFr: '/fr/residentiel/calculatrice-roi' },
      { slug: 'investment-analyzer', en: 'Investment Analyzer', fr: 'Analyseur d\'Investissement', path: '/en/residential/investment-analyzer', pathFr: '/fr/residentiel/analyseur-investissement' },
      { slug: 'break-even-rent', en: 'Break-Even Rent', fr: 'Loyer au Seuil de Rentabilité', path: '/en/residential/break-even-rent', pathFr: '/fr/residentiel/loyer-point-mort' },
      { slug: 'house-flipping', en: 'House Flipping Calculator', fr: 'Calculatrice Revente', path: '/en/residential/house-flipping', pathFr: '/fr/residentiel/revente-immobiliere' },
      { slug: '1031-exchange', en: '1031 Exchange', fr: 'Échange 1031', path: '/en/investment/1031-exchange', pathFr: '/fr/investissement/echange-1031' },
    ],
  },
  {
    id: 'mortgage',
    labelEn: 'Mortgage & Financing',
    labelFr: 'Hypothèque & Financement',
    tools: [
      { slug: 'refinance-calculator', en: 'Refinance Calculator', fr: 'Calculatrice Refinancement', path: '/en/residential/refinance-calculator', pathFr: '/fr/residentiel/calculatrice-refinancement' },
      { slug: 'amortization-calculator', en: 'Amortization Schedule', fr: 'Tableau d\'Amortissement', path: '/en/residential/amortization-calculator', pathFr: '/fr/residentiel/calculatrice-amortissement' },
      { slug: 'prepayment-calculator', en: 'Prepayment Calculator', fr: 'Paiements Anticipés', path: '/en/residential/prepayment-calculator', pathFr: '/fr/residentiel/calculatrice-paiements-anticipes' },
      { slug: 'mortgage-points', en: 'Mortgage Points', fr: 'Points Hypothécaires', path: '/en/residential/mortgage-points', pathFr: '/fr/residentiel/points-hypothecaires' },
      { slug: 'bridge-loan', en: 'Bridge Loan Calculator', fr: 'Prêt Relais', path: '/en/residential/bridge-loan', pathFr: '/fr/residentiel/pret-relais' },
      { slug: 'home-equity-calculator', en: 'Home Equity Calculator', fr: 'Valeur Nette Immobilière', path: '/en/residential/home-equity-calculator', pathFr: '/fr/residentiel/calculatrice-valeur-nette' },
    ],
  },
  {
    id: 'pro',
    labelEn: 'Pro / Investor',
    labelFr: 'Pro / Investisseur',
    tools: [
      { slug: 'dscr', en: 'DSCR Calculator', fr: 'Calculatrice RCSD', path: '/en/residential/dscr', pathFr: '/fr/residentiel/rcsd' },
      { slug: 'grm', en: 'Gross Rental Multiplier (GRM)', fr: 'Multiplicateur Revenu Brut', path: '/en/residential/grm', pathFr: '/fr/residentiel/multiplicateur-revenu-brut' },
      { slug: 'property-management-calculator', en: 'Property Management', fr: 'Gestion Immobilière', path: '/en/residential/property-management-calculator', pathFr: '/fr/residentiel/calculatrice-gestion-immobiliere' },
      { slug: 'property-tax', en: 'Property Tax Estimate', fr: 'Taxe Foncière', path: '/en/residential/property-tax', pathFr: '/fr/residentiel/taxe-fonciere' },
      { slug: 'hoa-calculator', en: 'Condo Fees / HOA Calculator', fr: 'Frais de Condo', path: '/en/residential/hoa-calculator', pathFr: '/fr/residentiel/calculatrice-hoa' },
    ],
  },
]

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale === 'fr-ca'
  const canonical = `${SITE_URL}/${locale}/tools`
  return {
    title: isFr
      ? 'Outils Immobiliers Montréal | 40 Calculatrices Gratuites — Jeremy Soares'
      : 'Montreal Real Estate Tools | 40 Free Calculators — Jeremy Soares',
    description: isFr
      ? 'Calculatrices immobilières pour Québec : hypothèque, taxe de bienvenue, cap rate, flux de trésorerie, ROI, test de résistance et plus. Gratuit.'
      : 'Quebec real estate calculators: mortgage, land transfer tax, cap rate, cash flow, ROI, stress test and more. Free, built for Montreal.',
    alternates: {
      canonical,
      languages: {
        'en-CA': `${SITE_URL}/en-ca/tools`,
        'fr-CA': `${SITE_URL}/fr-ca/tools`,
      },
    },
    openGraph: { type: 'website', url: canonical },
  }
}

export default async function ToolsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr-ca'
  const lang = isFr ? 'fr' : 'en'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: isFr ? 'Outils Immobiliers — Jeremy Soares' : 'Real Estate Tools — Jeremy Soares',
    url: `${SITE_URL}/${locale}/tools`,
    numberOfItems: 40,
    description: isFr
      ? 'Suite complète de calculatrices immobilières pour le marché québécois.'
      : 'Complete suite of real estate calculators for the Quebec market.',
    itemListElement: toolCategories.flatMap((cat, ci) =>
      cat.tools.map((t, ti) => ({
        '@type': 'ListItem',
        position: ci * 10 + ti + 1,
        item: {
          '@type': 'WebApplication',
          name: isFr ? t.fr : t.en,
          url: `${TOOLS_URL}${isFr ? t.pathFr : t.path}`,
        },
      }))
    ),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── Hero ── */}
      <Section theme="void" className="pt-32 pb-20 md:pt-44 md:pb-28">
        <Container size="lg">
          <Label className="mb-8">{isFr ? '(Outils)' : '(Tools)'}</Label>
          <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(3.5rem, 9vw, 7.5rem)', letterSpacing: '-0.02em' }}>
            <TextReveal as="h1" split="words" immediate delay={0.15} className="leading-none uppercase text-[var(--color-cream)]">
              {isFr ? '40 Outils. Gratuits.' : '40 Tools. Free.'}
            </TextReveal>
          </div>
          <SectionReveal delay={0.35} className="mt-5 max-w-xl">
            <p style={{ fontFamily: FONT_DM_SERIF, fontStyle: 'italic', fontSize: 'clamp(1.05rem, 2vw, 1.4rem)', color: 'var(--color-cream)', opacity: 0.4 }}>
              {isFr
                ? 'Calculatrices immobilières construites pour le marché québécois — hypothèque, taxe de bienvenue, ROI, flux de trésorerie et plus.'
                : 'Real estate calculators built for the Quebec market — mortgage, land transfer tax, ROI, cash flow and more.'}
            </p>
          </SectionReveal>
          <SectionReveal delay={0.5} className="mt-8">
            <Button variant="primary" href="https://tools.jeremysoares.com" external>
              {isFr ? 'Accéder aux outils →' : 'Open Tools Platform →'}
            </Button>
          </SectionReveal>
        </Container>
      </Section>

      {/* ── aimmo callout ── */}
      <Section theme="void" className="py-0 pb-16">
        <Container size="lg">
          <SectionReveal>
            <a
              href="https://aimmo.ca"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <div
                style={{
                  background: '#f55f00',
                  padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(1.5rem, 3vw, 3rem)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  flexWrap: 'wrap',
                }}
              >
                <div>
                  <p style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', letterSpacing: '0.04em', textTransform: 'uppercase', color: '#0e1011', margin: 0 }}>
                    aimmo — AI Virtual Staging
                  </p>
                  <p style={{ fontFamily: FONT_DM_SANS, fontSize: '12px', letterSpacing: '0.12em', color: 'rgba(14,16,17,0.6)', margin: '4px 0 0', textTransform: 'uppercase' }}>
                    {isFr ? 'Mise en scène virtuelle par IA · aimmo.ca' : 'Transform empty rooms in minutes · aimmo.ca'}
                  </p>
                </div>
                <span style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '1.5rem', color: '#0e1011' }}>→</span>
              </div>
            </a>
          </SectionReveal>
        </Container>
      </Section>

      {/* ── Tool categories ── */}
      {toolCategories.map((cat, ci) => (
        <Section key={cat.id} theme={ci % 2 === 0 ? 'cream' : 'void'} className="py-16 md:py-20">
          <Container size="lg">
            <SectionReveal>
              <div style={{ borderBottom: `1px solid ${ci % 2 === 0 ? 'rgba(14,16,17,0.12)' : 'rgba(236,234,229,0.08)'}`, paddingBottom: '1rem', marginBottom: '2rem' }}>
                <p style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: ci % 2 === 0 ? 'rgba(14,16,17,0.4)' : 'rgba(236,234,229,0.35)', margin: 0 }}>
                  {isFr ? cat.labelFr : cat.labelEn}
                </p>
              </div>
            </SectionReveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0' }}>
              {cat.tools.map((tool, i) => {
                const href = `${TOOLS_URL}${isFr ? tool.pathFr : tool.path}`
                const label = isFr ? tool.fr : tool.en
                return (
                  <SectionReveal key={tool.slug} delay={i * 0.04}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', padding: '1rem 0', borderBottom: `1px solid ${ci % 2 === 0 ? 'rgba(14,16,17,0.07)' : 'rgba(236,234,229,0.06)'}` }}
                    >
                      <span style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)', textTransform: 'uppercase', letterSpacing: '0.02em', color: ci % 2 === 0 ? 'var(--color-void)' : 'var(--color-cream)', opacity: 0.8, transition: 'opacity 0.2s' }}>
                        {label}
                      </span>
                      <span style={{ color: '#f55f00', fontSize: '14px', flexShrink: 0, opacity: 0.6 }}>→</span>
                    </a>
                  </SectionReveal>
                )
              })}
            </div>
          </Container>
        </Section>
      ))}

      {/* ── Stats ── */}
      <Section theme="void" className="py-20 md:py-28 border-t border-[rgba(236,234,229,0.06)]">
        <Container size="lg">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(1.5rem, 4vw, 3rem)', textAlign: 'center' }}>
            {[
              { n: '40', label: isFr ? 'Outils gratuits' : 'Free tools' },
              { n: '2', label: isFr ? 'Langues' : 'Languages' },
              { n: '80+', label: isFr ? 'Pages de calculatrices' : 'Calculator pages' },
            ].map((s) => (
              <SectionReveal key={s.label}>
                <p style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', letterSpacing: '-0.02em', color: 'var(--color-cream)', margin: 0, lineHeight: 1 }}>{s.n}</p>
                <p style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-cream)', opacity: 0.3, marginTop: '0.5rem' }}>{s.label}</p>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── CTA ── */}
      <Section theme="cream" className="py-20 md:py-28">
        <Container size="lg" className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(1.5rem, 3.5vw, 2.8rem)', letterSpacing: '-0.02em' }}>
            <TextReveal as="h2" split="words" className="leading-none uppercase text-[var(--color-void)]">
              {isFr ? 'Prêt à calculer votre prochain move ?' : 'Ready to run the numbers?'}
            </TextReveal>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button variant="primary" href="https://tools.jeremysoares.com" external>
              {isFr ? 'Tous les outils' : 'All tools'}
            </Button>
            <Button variant="ghost" href={`/${locale}/contact`}>
              {isFr ? 'Parler à Jeremy' : 'Talk to Jeremy'}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
