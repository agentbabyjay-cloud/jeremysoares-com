import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
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

interface Guide {
  slug: string; title: string; titleFr: string; category: string
  summaryEn: string; summaryFr: string
  sectionsEn: { heading: string; body: string }[]
  sectionsFr: { heading: string; body: string }[]
  faqEn: { q: string; a: string }[]
  faqFr: { q: string; a: string }[]
  relatedLinks: { label: string; href: string }[]
}

const guides: Guide[] = [
  {
    slug: 'how-to-buy-commercial-property-montreal',
    title: 'How to Buy Commercial Property in Montreal',
    titleFr: "Comment acheter une propri\u00e9t\u00e9 commerciale \u00e0 Montr\u00e9al",
    category: 'commercial',
    summaryEn: "A step-by-step guide to purchasing commercial real estate in Montreal. From due diligence and financing to closing, this guide covers everything a first-time commercial buyer needs to know.",
    summaryFr: "Un guide \u00e9tape par \u00e9tape pour acheter de l\u2019immobilier commercial \u00e0 Montr\u00e9al. De la diligence raisonnable au financement jusqu\u2019\u00e0 la cl\u00f4ture, ce guide couvre tout ce qu\u2019un premier acheteur commercial doit savoir.",
    sectionsEn: [
      { heading: 'Step 1: Define Your Investment Criteria', body: 'Before searching, clarify your goals: income generation, capital appreciation, or owner-occupancy. Define your budget, preferred property type (office, retail, industrial, mixed-use), and target cap rate. Jeremy helps investors build a clear acquisition thesis before viewing a single property.' },
      { heading: 'Step 2: Assemble Your Team', body: "Commercial real estate transactions require a specialized team: a commercial broker (like Jeremy, OACIQ H2731), a commercial mortgage broker, a commercial real estate lawyer, an inspector, and potentially an environmental consultant. Jeremy coordinates with trusted professionals for every deal." },
      { heading: 'Step 3: Due Diligence', body: 'Commercial due diligence is more complex than residential. Expect to review: financial statements and rent rolls, lease agreements, environmental Phase I/II reports, zoning compliance, building condition reports, and municipal tax assessments. Jeremy structures the due diligence timeline and manages deadlines.' },
      { heading: 'Step 4: Financing', body: 'Commercial mortgages typically require 25\u201335% down payment. Interest rates are higher than residential. Key metrics lenders evaluate: Debt Service Coverage Ratio (DSCR), Loan-to-Value (LTV), and Net Operating Income (NOI). Jeremy connects buyers with commercial lending specialists.' },
      { heading: 'Step 5: Offer & Negotiation', body: "Commercial offers include more conditions than residential: financing, inspection, environmental, tenant estoppels, and sometimes zoning verification. Negotiation focuses on price, closing date, deposit structure, and seller representations. Jeremy\u2019s experience ensures favorable terms." },
      { heading: 'Step 6: Closing', body: 'Closing involves title search, notarial deed, transfer tax (welcome tax), and property tax adjustments. Quebec\u2019s notarial system requires a notary (not a lawyer) to execute the deed. Budget for closing costs of 2\u20134% of purchase price.' },
    ],
    sectionsFr: [
      { heading: "\u00c9tape 1 : D\u00e9finir vos crit\u00e8res d\u2019investissement", body: "Avant de chercher, clarifiez vos objectifs : g\u00e9n\u00e9ration de revenus, appr\u00e9ciation du capital ou occupation par le propri\u00e9taire. D\u00e9finissez votre budget, type de propri\u00e9t\u00e9 pr\u00e9f\u00e9r\u00e9 et taux de capitalisation cible. Jeremy aide les investisseurs \u00e0 b\u00e2tir une th\u00e8se d\u2019acquisition claire." },
      { heading: "\u00c9tape 2 : Assembler votre \u00e9quipe", body: "Les transactions commerciales n\u00e9cessitent une \u00e9quipe sp\u00e9cialis\u00e9e : un courtier commercial (comme Jeremy, OACIQ H2731), un courtier hypoth\u00e9caire commercial, un avocat, un inspecteur et potentiellement un consultant environnemental. Jeremy coordonne avec des professionnels de confiance." },
      { heading: "\u00c9tape 3 : Diligence raisonnable", body: "La diligence raisonnable commerciale est plus complexe que r\u00e9sidentielle. Attendez-vous \u00e0 examiner : \u00e9tats financiers et registres de loyers, baux, rapports environnementaux Phase I/II, conformit\u00e9 au zonage, rapports de condition du b\u00e2timent et \u00e9valuations fiscales municipales." },
      { heading: "\u00c9tape 4 : Financement", body: "Les hypoth\u00e8ques commerciales n\u00e9cessitent typiquement 25\u201335\u00a0% de mise de fonds. Les m\u00e9triques cl\u00e9s : ratio de couverture du service de la dette (RCSD), rapport pr\u00eat-valeur (RPV) et revenu net d\u2019exploitation (RNE). Jeremy connecte les acheteurs avec des sp\u00e9cialistes en financement commercial." },
      { heading: "\u00c9tape 5 : Offre et n\u00e9gociation", body: "Les offres commerciales incluent plus de conditions : financement, inspection, environnement, estoppels des locataires et parfois v\u00e9rification du zonage. La n\u00e9gociation porte sur le prix, la date de cl\u00f4ture, la structure du d\u00e9p\u00f4t et les repr\u00e9sentations du vendeur." },
      { heading: "\u00c9tape 6 : Cl\u00f4ture", body: "La cl\u00f4ture implique une recherche de titre, un acte notari\u00e9, les droits de mutation (taxe de bienvenue) et les ajustements de taxes fonci\u00e8res. Le syst\u00e8me notarial du Qu\u00e9bec exige un notaire pour ex\u00e9cuter l\u2019acte. Pr\u00e9voyez des frais de cl\u00f4ture de 2\u20134\u00a0% du prix d\u2019achat." },
    ],
    faqEn: [
      { q: 'How much down payment do I need for commercial property in Montreal?', a: 'Typically 25\u201335% for commercial mortgages. Some lenders offer programs starting at 20% for owner-occupied properties. Jeremy can connect you with commercial lending specialists.' },
      { q: 'What is a good cap rate for commercial property in Montreal?', a: 'Cap rates vary by property type and location: 4\u20135.5% for prime office/retail, 5\u20137% for industrial, 3\u20135% for multi-family. Jeremy analyzes cap rates in context of each specific deal.' },
      { q: 'Do I need a broker to buy commercial property?', a: 'While not legally required, a specialized commercial broker like Jeremy (OACIQ H2731) provides critical market knowledge, negotiation expertise, and deal structuring that can save you significantly on a commercial transaction.' },
    ],
    faqFr: [
      { q: 'Quelle mise de fonds est n\u00e9cessaire pour une propri\u00e9t\u00e9 commerciale \u00e0 Montr\u00e9al\u00a0?', a: "Typiquement 25\u201335\u00a0% pour les hypoth\u00e8ques commerciales. Certains pr\u00eateurs offrent des programmes d\u00e8s 20\u00a0% pour les propri\u00e9t\u00e9s occup\u00e9es par le propri\u00e9taire. Jeremy peut vous connecter avec des sp\u00e9cialistes." },
      { q: "Qu\u2019est-ce qu\u2019un bon taux de capitalisation pour l\u2019immobilier commercial \u00e0 Montr\u00e9al\u00a0?", a: "Les taux varient : 4\u20135,5\u00a0% pour les bureaux/commerces de premier ordre, 5\u20137\u00a0% pour l\u2019industriel, 3\u20135\u00a0% pour le multifamilial. Jeremy analyse les taux dans le contexte de chaque transaction sp\u00e9cifique." },
      { q: "Ai-je besoin d\u2019un courtier pour acheter une propri\u00e9t\u00e9 commerciale\u00a0?", a: "Bien que non l\u00e9galement requis, un courtier commercial sp\u00e9cialis\u00e9 comme Jeremy (OACIQ H2731) apporte une connaissance du march\u00e9 et une expertise en n\u00e9gociation critiques." },
    ],
    relatedLinks: [{ label: 'Commercial Real Estate', href: '/commercial-real-estate-montreal' }, { label: 'Office Space', href: '/office-space-montreal' }, { label: 'Retail Space', href: '/retail-space-montreal' }],
  },
  // Shorter template guides
  ...([
    { slug: 'how-to-buy-data-center-canada', title: 'How to Buy a Data Center in Canada', titleFr: "Comment acheter un centre de donn\u00e9es au Canada", category: 'data-center', links: [{ label: 'Data Center Real Estate', href: '/data-center-real-estate-canada' }] },
    { slug: 'pre-construction-condo-guide-montreal', title: 'Pre-Construction Condo Guide Montreal', titleFr: "Guide pr\u00e9construction condos Montr\u00e9al", category: 'pre-construction', links: [{ label: 'Pre-Construction', href: '/pre-construction-condos-montreal' }, { label: 'Pre-Sale', href: '/presale' }] },
    { slug: 'investing-industrial-real-estate-quebec', title: 'Investing in Industrial Real Estate in Quebec', titleFr: "Investir dans l\u2019immobilier industriel au Qu\u00e9bec", category: 'industrial', links: [{ label: 'Industrial', href: '/industrial-real-estate-montreal' }] },
    { slug: 'buying-vs-leasing-commercial-space', title: 'Buying vs Leasing Commercial Space', titleFr: "Acheter ou louer un espace commercial", category: 'commercial', links: [{ label: 'Office Space', href: '/office-space-montreal' }, { label: 'Retail Space', href: '/retail-space-montreal' }] },
    { slug: 'montreal-vs-toronto-real-estate-investment', title: 'Montreal vs Toronto: Real Estate Investment', titleFr: "Montr\u00e9al vs Toronto : investissement immobilier", category: 'comparison', links: [{ label: 'Market Reports', href: '/market-reports' }] },
    { slug: 'quebec-real-estate-buying-process', title: 'Quebec Real Estate Buying Process', titleFr: "Processus d\u2019achat immobilier au Qu\u00e9bec", category: 'residential', links: [{ label: 'Neighborhoods', href: '/neighborhoods' }, { label: 'Services', href: '/services' }] },
  ] as const).map((g): Guide => ({
    slug: g.slug, title: g.title, titleFr: g.titleFr, category: g.category,
    summaryEn: `A comprehensive guide to ${g.title.toLowerCase()}. Written by Jeremy Soares, OACIQ broker H2731, with insights from years of Montreal real estate experience. Contact Jeremy at 514-519-8177 for personalized guidance.`,
    summaryFr: `Un guide complet sur le sujet : ${g.titleFr.toLowerCase()}. R\u00e9dig\u00e9 par Jeremy Soares, courtier OACIQ H2731, avec des perspectives tir\u00e9es de son exp\u00e9rience immobili\u00e8re montr\u00e9alaise. Contactez Jeremy au 514\u00a0519-8177.`,
    sectionsEn: [
      { heading: 'Overview', body: `This guide provides essential information for anyone looking to navigate ${g.title.toLowerCase()}. Whether you are a first-time buyer, an experienced investor, or exploring options, Jeremy Soares brings the expertise you need.` },
      { heading: 'Key Considerations', body: 'Understanding the Quebec real estate market requires local knowledge. From financing structures to municipal regulations, every transaction has unique considerations. Jeremy analyzes each deal individually to ensure the best outcome.' },
      { heading: 'Why Work With Jeremy', body: 'As one of Montreal\u2019s most versatile brokers, Jeremy covers commercial, industrial, residential, luxury, pre-construction, and data center real estate. His 42-domain network and 14,000-broker reach ensure maximum market exposure for every client.' },
    ],
    sectionsFr: [
      { heading: 'Aper\u00e7u', body: `Ce guide fournit des informations essentielles pour naviguer le sujet : ${g.titleFr.toLowerCase()}. Que vous soyez premier acheteur, investisseur exp\u00e9riment\u00e9 ou en exploration, Jeremy Soares apporte l\u2019expertise n\u00e9cessaire.` },
      { heading: 'Consid\u00e9rations cl\u00e9s', body: "Comprendre le march\u00e9 immobilier qu\u00e9b\u00e9cois n\u00e9cessite une connaissance locale. Du financement aux r\u00e9glementations municipales, chaque transaction a des consid\u00e9rations uniques. Jeremy analyse chaque dossier individuellement." },
      { heading: 'Pourquoi travailler avec Jeremy', body: "En tant que l\u2019un des courtiers les plus polyvalents de Montr\u00e9al, Jeremy couvre le commercial, l\u2019industriel, le r\u00e9sidentiel, le luxe, la pr\u00e9construction et les centres de donn\u00e9es. Son r\u00e9seau de 42 domaines et 14\u00a0000 courtiers assure une exposition maximale." },
    ],
    faqEn: [
      { q: `What is the first step in ${g.title.toLowerCase()}?`, a: 'Start with a free consultation with Jeremy Soares (OACIQ H2731) at 514-519-8177. He will assess your situation and create a tailored strategy.' },
      { q: 'How long does the process typically take?', a: 'Timelines vary by property type and complexity. Jeremy provides a detailed timeline during your initial consultation.' },
    ],
    faqFr: [
      { q: `Quelle est la premi\u00e8re \u00e9tape\u00a0?`, a: "Commencez par une consultation gratuite avec Jeremy Soares (OACIQ H2731) au 514\u00a0519-8177. Il \u00e9valuera votre situation et cr\u00e9era une strat\u00e9gie personnalis\u00e9e." },
      { q: 'Combien de temps le processus prend-il g\u00e9n\u00e9ralement\u00a0?', a: "Les d\u00e9lais varient selon le type de propri\u00e9t\u00e9 et la complexit\u00e9. Jeremy fournit un calendrier d\u00e9taill\u00e9 lors de votre consultation initiale." },
    ],
    relatedLinks: [...g.links],
  })),
]

export async function generateStaticParams() {
  const locales = ['en-ca', 'fr-ca']
  return guides.flatMap((g) => locales.map((locale) => ({ locale, slug: g.slug })))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const isFr = locale === 'fr-ca'
  const g = guides.find((x) => x.slug === slug)
  if (!g) return {}
  const title = isFr ? `${g.titleFr} | Jeremy Soares` : `${g.title} | Jeremy Soares`
  const canonical = `${SITE_URL}/${locale}/guides/${slug}`
  return { title, alternates: { canonical, languages: { 'en-CA': `${SITE_URL}/en-ca/guides/${slug}`, 'fr-CA': `${SITE_URL}/fr-ca/guides/${slug}` } } }
}

export default async function GuidePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const isFr = locale === 'fr-ca'
  const g = guides.find((x) => x.slug === slug)
  if (!g) notFound()

  const sections = isFr ? g.sectionsFr : g.sectionsEn
  const faqs = isFr ? g.faqFr : g.faqEn

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Article', headline: isFr ? g.titleFr : g.title, author: { '@type': 'Person', name: 'Jeremy Soares' } },
      { '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Section theme="void" className="pt-32 pb-20 md:pt-44 md:pb-28">
        <Container size="lg">
          <Label className="mb-8">{isFr ? '(Guide)' : '(Guide)'} \u2014 {g.category.toUpperCase()}</Label>
          <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(2.5rem,7vw,5rem)', letterSpacing: '-0.02em' }}>
            <TextReveal as="h1" split="words" immediate delay={0.15} className="leading-none uppercase text-[var(--color-cream)]">
              {isFr ? g.titleFr : g.title}
            </TextReveal>
          </div>
          <SectionReveal delay={0.35} className="mt-8 max-w-3xl">
            <p className="text-[var(--color-cream)] opacity-50 leading-relaxed" style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}>
              {isFr ? g.summaryFr : g.summaryEn}
            </p>
          </SectionReveal>
        </Container>
      </Section>

      {/* Content sections */}
      <Section theme="cream" className="py-24 md:py-32 relative overflow-hidden">
        <div className="wipe pointer-events-none absolute inset-0 bg-[var(--color-cream)] z-10" aria-hidden="true" style={{ transformOrigin: 'top' }} />
        <Container size="lg">
          {sections.map((sec, i) => (
            <SectionReveal key={i} delay={i * 0.08}>
              <div className={`grid grid-cols-1 md:grid-cols-12 gap-8 ${i > 0 ? 'mt-16 pt-16 border-t border-[rgba(14,16,17,0.08)]' : ''}`}>
                <div className="md:col-span-4">
                  <h2 className="text-[var(--color-void)]" style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(1.3rem,2.5vw,2rem)', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                    {sec.heading}
                  </h2>
                </div>
                <div className="md:col-span-8">
                  <p className="text-[var(--color-void)] opacity-55 leading-relaxed" style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}>
                    {sec.body}
                  </p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </Container>
      </Section>

      {/* FAQ */}
      <Section theme="void" className="py-24 md:py-32">
        <Container size="lg">
          <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(2rem,5vw,3.5rem)', letterSpacing: '-0.02em' }}>
            <TextReveal as="h2" split="words" className="leading-none uppercase text-[var(--color-cream)]">
              {isFr ? 'Questions Fr\u00e9quentes' : 'FAQ'}
            </TextReveal>
          </div>
          <div className="mt-12 border-t border-[rgba(236,234,229,0.08)]">
            {faqs.map((faq, i) => (
              <SectionReveal key={i} delay={i * 0.06}>
                <div className="py-8 border-b border-[rgba(236,234,229,0.08)]">
                  <h3 className="text-[var(--color-cream)] mb-3" style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.02em' }}>{faq.q}</h3>
                  <p className="text-[var(--color-cream)] opacity-50 leading-relaxed max-w-3xl" style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}>{faq.a}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA + Related */}
      <Section theme="cream" className="py-20 relative overflow-hidden">
        <div className="wipe pointer-events-none absolute inset-0 bg-[var(--color-cream)] z-10" aria-hidden="true" style={{ transformOrigin: 'top' }} />
        <Container size="lg" className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="block mb-4 text-[var(--color-void)] opacity-30 uppercase" style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em' }}>{isFr ? 'Pages reli\u00e9es' : 'Related'}</span>
            <div className="flex flex-wrap gap-4">
              {g.relatedLinks.map((link) => (
                <Button key={link.href} variant="ghost" theme="light" href={`/${locale}${link.href}`} size="sm">{link.label}</Button>
              ))}
              <Button variant="ghost" theme="light" href={`/${locale}/guides`} size="sm">{isFr ? 'Tous les guides' : 'All Guides'}</Button>
            </div>
          </div>
          <Button variant="primary" theme="light" href={`/${locale}/contact`} size="lg">{isFr ? 'Discutons' : "Let\u2019s Talk"}</Button>
        </Container>
      </Section>
    </>
  )
}
