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
  const canonical = `${SITE_URL}/${locale}/new-construction-montreal`
  const title = isFr
    ? 'Nouvelles Constructions Montréal 2026 | Condos Neufs — Jeremy Soares'
    : 'New Construction Montreal 2026 | New Condos — Jeremy Soares'
  const description = isFr
    ? 'Nouvelles constructions et condos neufs à Montréal en 2026. Explorez les projets de préconstruction, les développements en cours et les opportunités d\'achat avec Jeremy Soares, courtier OACIQ H2731.'
    : 'New construction and new condos in Montreal 2026. Explore pre-construction projects, active developments, and buying opportunities with Jeremy Soares, OACIQ broker H2731.'
  return {
    title,
    description,
    keywords: ['new construction montreal', 'new condos montreal 2026', 'nouvelles constructions montréal', 'condo neuf montréal', 'pre-construction montreal', 'preconstruction condo montreal'],
    alternates: {
      canonical,
      languages: {
        'en-CA': `${SITE_URL}/en-ca/new-construction-montreal`,
        'fr-CA': `${SITE_URL}/fr-ca/new-construction-montreal`,
      },
    },
    openGraph: { type: 'website', url: canonical, title, description },
  }
}

const ADVANTAGES = [
  { en: 'Buy at today\'s price, occupy in 2–3 years — potential appreciation built in', fr: 'Achetez au prix d\'aujourd\'hui, occupez dans 2–3 ans — appréciation potentielle intégrée' },
  { en: 'Lower initial deposit (typically 20% spread over construction period)', fr: 'Mise de fonds initiale réduite (généralement 20% répartie sur la période de construction)' },
  { en: 'Brand-new systems, warranties, and energy efficiency', fr: 'Systèmes neufs, garanties et efficacité énergétique' },
  { en: 'Choose finishes, layout options, and upgrades early', fr: 'Choisissez finitions, options de plancher et améliorations en avance' },
  { en: 'No bidding wars — fixed pre-construction pricing', fr: 'Pas de guerres d\'offres — prix de préconstruction fixes' },
]

const RISKS = [
  { en: 'Delivery delays (budget for 6–12 months beyond projected date)', fr: 'Délais de livraison (prévoir 6–12 mois de plus que la date prévue)' },
  { en: 'Market risk — value at completion may differ from purchase price', fr: 'Risque marché — la valeur à la livraison peut différer du prix d\'achat' },
  { en: 'Developer quality matters — research track record before signing', fr: 'La qualité du promoteur compte — vérifiez les antécédents avant de signer' },
  { en: 'Occupancy fees during interim period before title transfer', fr: 'Frais d\'occupation pendant la période intérimaire avant le transfert de titre' },
]

export default async function NewConstructionMontrealPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr-ca'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: isFr ? 'Nouvelles constructions Montréal 2026' : 'New Construction Montreal 2026',
    url: `${SITE_URL}/${locale}/new-construction-montreal`,
    description: isFr
      ? 'Guide des nouvelles constructions à Montréal avec Jeremy Soares, courtier OACIQ H2731.'
      : 'New construction guide for Montreal with Jeremy Soares, OACIQ broker H2731.',
    author: { '@type': 'Person', name: 'Jeremy Soares', url: SITE_URL },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <Section theme="void" className="pt-32 pb-20 md:pt-44 md:pb-28">
        <Container size="lg">
          <Label className="mb-8">{isFr ? '(Projets 2026)' : '(2026 Projects)'}</Label>
          <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(3rem,8vw,6.5rem)', letterSpacing: '-0.02em' }}>
            <TextReveal as="h1" split="words" immediate delay={0.15} className="leading-none uppercase text-[var(--color-cream)]">
              {isFr ? 'Nouvelles Constructions' : 'New Construction'}
            </TextReveal>
          </div>
          <SectionReveal delay={0.35} className="mt-5">
            <p className="text-[var(--color-cream)] opacity-35" style={{ fontFamily: FONT_DM_SERIF, fontStyle: 'italic', fontSize: 'clamp(1.1rem,2vw,1.5rem)' }}>
              {isFr
                ? 'Condos neufs, préconstructions et développements actifs à Montréal.'
                : 'New condos, pre-construction projects, and active developments in Montreal.'}
            </p>
          </SectionReveal>
        </Container>
      </Section>

      {/* Advantages + Risks */}
      <Section theme="cream" className="py-24 md:py-32">
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-0.02em' }}>
                <TextReveal as="h2" split="words" className="leading-none uppercase text-[var(--color-void)]">
                  {isFr ? 'Avantages' : 'Advantages'}
                </TextReveal>
              </div>
              <SectionReveal delay={0.15} className="mt-8">
                <ul className="flex flex-col gap-4">
                  {ADVANTAGES.map((item) => (
                    <li key={item.en} className="text-[var(--color-void)] opacity-60 flex items-start gap-3" style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem', lineHeight: 1.6 }}>
                      <span className="text-[#e8762a] mt-0.5 flex-shrink-0" aria-hidden="true">→</span>
                      {isFr ? item.fr : item.en}
                    </li>
                  ))}
                </ul>
              </SectionReveal>
            </div>
            <div>
              <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-0.02em' }}>
                <TextReveal as="h2" split="words" className="leading-none uppercase text-[var(--color-void)]">
                  {isFr ? 'Risques à Connaître' : 'Risks to Know'}
                </TextReveal>
              </div>
              <SectionReveal delay={0.15} className="mt-8">
                <ul className="flex flex-col gap-4">
                  {RISKS.map((item) => (
                    <li key={item.en} className="text-[var(--color-void)] opacity-60 flex items-start gap-3" style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem', lineHeight: 1.6 }}>
                      <span className="text-[var(--color-void)] opacity-40 mt-0.5 flex-shrink-0" aria-hidden="true">→</span>
                      {isFr ? item.fr : item.en}
                    </li>
                  ))}
                </ul>
              </SectionReveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* How Jeremy helps */}
      <Section theme="void" className="py-24 md:py-32">
        <Container size="lg">
          <div className="max-w-2xl">
            <Label className="mb-8">{isFr ? '(Accompagnement)' : '(Guidance)'}</Label>
            <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(2rem,5vw,3.5rem)', letterSpacing: '-0.02em' }}>
              <TextReveal as="h2" split="words" className="leading-none uppercase text-[var(--color-cream)]">
                {isFr ? 'Naviguer la Préconstruction' : 'Navigating Pre-Construction'}
              </TextReveal>
            </div>
            <SectionReveal delay={0.15} className="mt-8">
              <p className="text-[var(--color-cream)] opacity-60 leading-relaxed" style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}>
                {isFr
                  ? "Acheter en préconstruction sans courtier, c'est négocier seul contre les équipes juridiques et commerciales du promoteur. Jeremy Soares représente les acheteurs dans les projets de préconstruction à Montréal — sans frais supplémentaires pour vous (la commission est payée par le promoteur). Il analyse les contrats, compare les projets, et négocie les upgrades et conditions."
                  : "Buying pre-construction without a broker means negotiating alone against the developer's legal and sales teams. Jeremy Soares represents buyers in Montreal pre-construction projects — at no extra cost to you (the developer pays the commission). He reviews contracts, compares projects, and negotiates upgrades and conditions."}
              </p>
            </SectionReveal>
          </div>
        </Container>
      </Section>

      {/* Internal links */}
      <Section theme="cream" className="py-16">
        <Container size="lg">
          <SectionReveal className="flex flex-wrap gap-4">
            <Button variant="ghost" theme="light" href={`/${locale}/presale`}>
              {isFr ? 'Projets préconstruction →' : 'Pre-construction projects →'}
            </Button>
            <Button variant="ghost" theme="light" href={`/${locale}/neighborhoods/griffintown`}>
              {isFr ? 'Guide Griffintown →' : 'Griffintown Guide →'}
            </Button>
            <Button variant="ghost" theme="light" href={`/${locale}/blog`}>
              {isFr ? 'Articles de marché →' : 'Market articles →'}
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
                <>Intéressé par la{' '}
                  <em style={{ fontFamily: FONT_DM_SERIF, fontStyle: 'italic', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>préconstruction?</em>
                </>
              ) : (
                <>Interested in{' '}
                  <em style={{ fontFamily: FONT_DM_SERIF, fontStyle: 'italic', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>pre-construction?</em>
                </>
              )}
            </h2>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" theme="dark" href={`/${locale}/contact`} size="lg">
              {isFr ? 'Discutons' : "Let's Talk"}
            </Button>
            <Button variant="ghost" theme="dark" href={`/${locale}/presale`}>
              {isFr ? 'Voir les projets' : 'View projects'}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
