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

const reports = [
  { slug: 'commercial-q1-2026', title: 'Commercial Real Estate Q1 2026', titleFr: 'Immobilier commercial T1 2026', category: 'commercial', quarter: 'Q1 2026' },
  { slug: 'industrial-q1-2026', title: 'Industrial Real Estate Q1 2026', titleFr: 'Immobilier industriel T1 2026', category: 'industrial', quarter: 'Q1 2026' },
  { slug: 'residential-q1-2026', title: 'Residential Market Q1 2026', titleFr: 'March\u00e9 r\u00e9sidentiel T1 2026', category: 'residential', quarter: 'Q1 2026' },
  { slug: 'pre-construction-q1-2026', title: 'Pre-Construction Market Q1 2026', titleFr: 'March\u00e9 pr\u00e9construction T1 2026', category: 'pre-construction', quarter: 'Q1 2026' },
  { slug: 'data-center-market-canada-2026', title: 'Data Center Market Canada 2026', titleFr: 'March\u00e9 centres de donn\u00e9es Canada 2026', category: 'data-center', quarter: '2026' },
]

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale === 'fr-ca'
  const canonical = `${SITE_URL}/${locale}/market-reports`
  return {
    title: isFr ? 'Rapports de March\u00e9 Immobilier Montr\u00e9al | Jeremy Soares' : 'Montreal Real Estate Market Reports | Jeremy Soares',
    description: isFr ? "Analyses trimestrielles du march\u00e9 immobilier : commercial, industriel, r\u00e9sidentiel, pr\u00e9construction. Courtier OACIQ H2731." : 'Quarterly real estate market analysis: commercial, industrial, residential, pre-construction. OACIQ broker H2731.',
    alternates: { canonical, languages: { 'en-CA': `${SITE_URL}/en-ca/market-reports`, 'fr-CA': `${SITE_URL}/fr-ca/market-reports` } },
    openGraph: { type: 'website', url: canonical },
  }
}

export default async function MarketReportsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isFr = locale === 'fr-ca'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: isFr ? 'Rapports de march\u00e9' : 'Market Reports',
    numberOfItems: reports.length,
    itemListElement: reports.map((r, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'Article', name: isFr ? r.titleFr : r.title, url: `${SITE_URL}/${locale}/market-reports/${r.slug}` } })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Section theme="void" className="pt-32 pb-20 md:pt-44 md:pb-28">
        <Container size="lg">
          <Label className="mb-8">{isFr ? '(Rapports)' : '(Reports)'}</Label>
          <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(3rem,8vw,6rem)', letterSpacing: '-0.02em' }}>
            <TextReveal as="h1" split="words" immediate delay={0.15} className="leading-none uppercase text-[var(--color-cream)]">
              {isFr ? 'Rapports de March\u00e9' : 'Market Reports'}
            </TextReveal>
          </div>
          <SectionReveal delay={0.35} className="mt-5">
            <p className="text-[var(--color-cream)] opacity-35" style={{ fontFamily: FONT_DM_SERIF, fontStyle: 'italic', fontSize: 'clamp(1.1rem,2vw,1.5rem)' }}>
              {isFr ? "Analyses trimestrielles bas\u00e9es sur les donn\u00e9es du march\u00e9 qu\u00e9b\u00e9cois" : 'Quarterly analysis driven by Quebec market data'}
            </p>
          </SectionReveal>
        </Container>
      </Section>

      <Section theme="cream" className="py-24 md:py-32 relative overflow-hidden">
        <div className="wipe pointer-events-none absolute inset-0 bg-[var(--color-cream)] z-10" aria-hidden="true" style={{ transformOrigin: 'top' }} />
        <Container size="lg">
          <div className="border-t" style={{ borderColor: 'rgba(14,16,17,0.1)' }}>
            {reports.map((r, i) => (
              <SectionReveal key={r.slug} delay={i * 0.06}>
                <a href={`/${locale}/market-reports/${r.slug}`} className="group grid grid-cols-1 md:grid-cols-12 gap-4 py-10 border-b transition-all duration-300 hover:pl-2" style={{ borderColor: 'rgba(14,16,17,0.1)', textDecoration: 'none' }}>
                  <div className="md:col-span-2">
                    <span className="text-[var(--color-void)] opacity-30 uppercase" style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em' }}>{r.quarter}</span>
                  </div>
                  <div className="md:col-span-7">
                    <h2 className="text-[var(--color-void)] group-hover:opacity-70 transition-opacity" style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(1.2rem,2.5vw,1.8rem)', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                      {isFr ? r.titleFr : r.title}
                    </h2>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-[var(--color-void)] opacity-25 uppercase" style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em' }}>{r.category}</span>
                  </div>
                  <div className="md:col-span-1 flex items-center justify-end">
                    <span className="text-[#e8762a] opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">{'\u2192'}</span>
                  </div>
                </a>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section theme="void" className="py-20 md:py-28">
        <Container size="lg" className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(1.5rem,3vw,2.5rem)', letterSpacing: '-0.02em' }}>
            <TextReveal as="h2" split="words" className="leading-none uppercase text-[var(--color-cream)]">
              {isFr ? "Besoin d\u2019une analyse sur mesure ?" : 'Need a custom analysis?'}
            </TextReveal>
          </div>
          <Button variant="primary" href={`/${locale}/contact`} size="lg">{isFr ? 'Discutons' : "Let\u2019s Talk"}</Button>
        </Container>
      </Section>
    </>
  )
}
