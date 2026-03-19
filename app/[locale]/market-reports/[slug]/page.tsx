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

interface Report {
  slug: string; title: string; titleFr: string; category: string; quarter: string
  summaryEn: string; summaryFr: string
  statsEn: { label: string; value: string }[]
  statsFr: { label: string; value: string }[]
  sectionsEn: { heading: string; body: string }[]
  sectionsFr: { heading: string; body: string }[]
  relatedLinks: { label: string; href: string }[]
}

const reports: Report[] = [
  {
    slug: 'commercial-q1-2026', title: 'Commercial Real Estate Q1 2026', titleFr: 'Immobilier commercial T1 2026', category: 'commercial', quarter: 'Q1 2026',
    summaryEn: "Montreal\u2019s commercial real estate market in Q1 2026 shows mixed signals: office vacancy remains elevated while retail and mixed-use segments demonstrate recovery. Investment activity is picking up as interest rates stabilize, creating opportunities for strategic buyers.",
    summaryFr: "Le march\u00e9 immobilier commercial de Montr\u00e9al au T1 2026 montre des signaux mixtes : la vacance des bureaux reste \u00e9lev\u00e9e tandis que les segments commerce de d\u00e9tail et usage mixte d\u00e9montrent une reprise. L\u2019activit\u00e9 d\u2019investissement reprend avec la stabilisation des taux.",
    statsEn: [{ label: 'Office vacancy', value: '14.8%' }, { label: 'Avg cap rate', value: '5.2%' }, { label: 'Retail recovery', value: '+8% YoY' }, { label: 'Investment volume', value: '$2.1B' }],
    statsFr: [{ label: 'Vacance bureaux', value: '14,8\u00a0%' }, { label: 'Taux cap. moyen', value: '5,2\u00a0%' }, { label: 'Reprise commerce', value: '+8\u00a0% A/A' }, { label: 'Volume investissement', value: '2,1\u00a0G\u00a0$' }],
    sectionsEn: [
      { heading: 'Office Market', body: "Downtown office vacancy sits at 14.8%, creating a tenant\u2019s market with generous concessions. Class A buildings maintain stronger occupancy while Class B/C face conversion pressure. Sublease space is declining, a positive leading indicator." },
      { heading: 'Retail Recovery', body: 'Street-level retail along Sainte-Catherine, Mont-Royal, and Old Montreal corridors has rebounded 8% year-over-year. Pop-up and experiential retail are driving new lease signings. Food and beverage tenants continue to dominate demand.' },
      { heading: 'Investment Activity', body: 'Transaction volume reached $2.1B in Q1, up 15% from Q4 2025. Stabilized interest rates are bringing institutional buyers back. Mixed-use properties with residential components command the highest pricing.' },
    ],
    sectionsFr: [
      { heading: 'March\u00e9 des bureaux', body: "La vacance des bureaux au centre-ville se situe \u00e0 14,8\u00a0%, cr\u00e9ant un march\u00e9 favorable aux locataires. Les immeubles de classe A maintiennent une meilleure occupation tandis que les classes B/C font face \u00e0 des pressions de conversion." },
      { heading: 'Reprise du commerce de d\u00e9tail', body: "Le commerce de d\u00e9tail de rue le long de Sainte-Catherine, Mont-Royal et le Vieux-Montr\u00e9al a rebondi de 8\u00a0% d\u2019une ann\u00e9e \u00e0 l\u2019autre. Les commerces pop-up et exp\u00e9rientiels stimulent les nouvelles locations." },
      { heading: "Activit\u00e9 d\u2019investissement", body: "Le volume de transactions a atteint 2,1\u00a0G\u00a0$ au T1, en hausse de 15\u00a0% par rapport au T4 2025. La stabilisation des taux ram\u00e8ne les acheteurs institutionnels. Les propri\u00e9t\u00e9s \u00e0 usage mixte avec composante r\u00e9sidentielle commandent les prix les plus \u00e9lev\u00e9s." },
    ],
    relatedLinks: [{ label: 'Commercial Real Estate', href: '/commercial-real-estate-montreal' }, { label: 'Office Space', href: '/office-space-montreal' }, { label: 'Retail Space', href: '/retail-space-montreal' }],
  },
  {
    slug: 'industrial-q1-2026', title: 'Industrial Real Estate Q1 2026', titleFr: 'Immobilier industriel T1 2026', category: 'industrial', quarter: 'Q1 2026',
    summaryEn: "Montreal\u2019s industrial market remains the tightest segment with vacancy below 3%. E-commerce logistics, cold storage, and last-mile distribution continue to drive demand. Saint-Laurent and Laval lead in absorption.",
    summaryFr: "Le march\u00e9 industriel de Montr\u00e9al reste le segment le plus serr\u00e9 avec une vacance inf\u00e9rieure \u00e0 3\u00a0%. La logistique e-commerce, le stockage frigorifique et la distribution dernier kilometre continuent de stimuler la demande.",
    statsEn: [{ label: 'Vacancy rate', value: '2.8%' }, { label: 'Avg rent/sq ft', value: '$12.50' }, { label: 'New supply', value: '1.2M sq ft' }, { label: 'Absorption', value: '95%' }],
    statsFr: [{ label: 'Taux de vacance', value: '2,8\u00a0%' }, { label: 'Loyer moy./pi\u00b2', value: '12,50\u00a0$' }, { label: 'Nouvelle offre', value: '1,2\u00a0M pi\u00b2' }, { label: 'Absorption', value: '95\u00a0%' }],
    sectionsEn: [
      { heading: 'Supply & Demand', body: 'Vacancy remains historically low at 2.8%. New construction of 1.2M sq ft is 95% pre-leased, indicating demand far exceeds supply. Developers are pivoting to speculative builds in secondary markets.' },
      { heading: 'Key Submarkets', body: "Saint-Laurent continues to dominate with its proximity to the airport and highway access. Laval\u2019s industrial parks are absorbing overflow demand. Lachine\u2019s canal-adjacent properties attract mixed industrial-creative uses." },
      { heading: 'Pricing Trends', body: 'Industrial lease rates have increased 18% over two years. Sale prices for modern logistics facilities exceed $200/sq ft in prime locations. Cap rates have compressed to 4.5\u20135.5%.' },
    ],
    sectionsFr: [
      { heading: 'Offre et demande', body: "La vacance reste historiquement basse \u00e0 2,8\u00a0%. Les nouvelles constructions de 1,2\u00a0M\u00a0pi\u00b2 sont pr\u00e9-lou\u00e9es \u00e0 95\u00a0%, indiquant que la demande d\u00e9passe largement l\u2019offre." },
      { heading: 'Sous-march\u00e9s cl\u00e9s', body: "Saint-Laurent continue de dominer avec sa proximit\u00e9 de l\u2019a\u00e9roport. Les parcs industriels de Laval absorbent le surplus de demande. Lachine attire des usages mixtes industriels-cr\u00e9atifs." },
      { heading: 'Tendances de prix', body: "Les loyers industriels ont augment\u00e9 de 18\u00a0% en deux ans. Les prix de vente pour les installations logistiques modernes d\u00e9passent 200\u00a0$/pi\u00b2. Les taux de capitalisation se sont compress\u00e9s \u00e0 4,5\u20135,5\u00a0%." },
    ],
    relatedLinks: [{ label: 'Industrial Real Estate', href: '/industrial-real-estate-montreal' }, { label: 'Land for Sale', href: '/land-for-sale-montreal' }],
  },
  {
    slug: 'residential-q1-2026', title: 'Residential Market Q1 2026', titleFr: 'March\u00e9 r\u00e9sidentiel T1 2026', category: 'residential', quarter: 'Q1 2026',
    summaryEn: "Montreal\u2019s residential market shows renewed activity as spring approaches. Inventory remains below the 10-year average while immigration-driven demand keeps prices firm. The condo market is split: new builds face absorption challenges while resale condos in established neighborhoods remain competitive.",
    summaryFr: "Le march\u00e9 r\u00e9sidentiel de Montr\u00e9al montre une activit\u00e9 renouvel\u00e9e \u00e0 l\u2019approche du printemps. L\u2019inventaire reste sous la moyenne de 10 ans tandis que la demande li\u00e9e \u00e0 l\u2019immigration maintient les prix fermes.",
    statsEn: [{ label: 'Median price', value: '$525K' }, { label: 'Sales volume', value: '+12% YoY' }, { label: 'Days on market', value: '38' }, { label: 'New listings', value: '-5% YoY' }],
    statsFr: [{ label: 'Prix m\u00e9dian', value: '525\u00a0K\u00a0$' }, { label: 'Volume ventes', value: '+12\u00a0% A/A' }, { label: 'Jours sur march\u00e9', value: '38' }, { label: 'Nouvelles inscriptions', value: '-5\u00a0% A/A' }],
    sectionsEn: [
      { heading: 'Price Trends', body: 'The median residential price reached $525K, up 6% year-over-year. Single-family homes in the Plateau, Outremont, and Westmount continue to command premiums. The $400K\u2013$600K condo segment sees the most activity.' },
      { heading: 'Inventory & Demand', body: 'Active listings are 5% below last year, keeping the market in balanced-to-seller territory. Immigration continues to fuel rental and purchase demand, particularly in the condo segment.' },
      { heading: 'Neighborhood Highlights', body: 'Verdun and Villeray offer the best value for first-time buyers. Griffintown condo resales have stabilized after 2024\u2019s correction. The Plateau and Mile End remain perpetually tight.' },
    ],
    sectionsFr: [
      { heading: 'Tendances de prix', body: "Le prix m\u00e9dian r\u00e9sidentiel a atteint 525\u00a0K\u00a0$, en hausse de 6\u00a0% d\u2019une ann\u00e9e \u00e0 l\u2019autre. Les maisons unifamiliales du Plateau, Outremont et Westmount continuent de commander des primes." },
      { heading: 'Inventaire et demande', body: "Les inscriptions actives sont 5\u00a0% sous le niveau de l\u2019an dernier, maintenant le march\u00e9 en territoire \u00e9quilibr\u00e9 \u00e0 favorable aux vendeurs. L\u2019immigration continue d\u2019alimenter la demande." },
      { heading: 'Quartiers en vedette', body: "Verdun et Villeray offrent le meilleur rapport qualit\u00e9-prix pour les premiers acheteurs. Les reventes de condos \u00e0 Griffintown se sont stabilis\u00e9es. Le Plateau et le Mile End restent perp\u00e9tuellement serr\u00e9s." },
    ],
    relatedLinks: [{ label: 'Neighborhoods', href: '/neighborhoods' }, { label: 'Lofts', href: '/lofts-montreal' }, { label: 'Penthouses', href: '/penthouses-montreal' }],
  },
  {
    slug: 'pre-construction-q1-2026', title: 'Pre-Construction Market Q1 2026', titleFr: 'March\u00e9 pr\u00e9construction T1 2026', category: 'pre-construction', quarter: 'Q1 2026',
    summaryEn: 'Pre-construction condo sales in Montreal are rebounding after a slow 2025. Developers are adjusting pricing and offering incentives. The REM extension is creating new hotspots along the transit corridor.',
    summaryFr: "Les ventes de condos en pr\u00e9construction \u00e0 Montr\u00e9al rebondissent apr\u00e8s un 2025 lent. Les promoteurs ajustent les prix et offrent des incitatifs. L\u2019extension du REM cr\u00e9e de nouveaux points chauds.",
    statsEn: [{ label: 'Active projects', value: '45+' }, { label: 'Avg price/sq ft', value: '$650' }, { label: 'Absorption Q1', value: '62%' }, { label: 'REM-adjacent premium', value: '+12%' }],
    statsFr: [{ label: 'Projets actifs', value: '45+' }, { label: 'Prix moy./pi\u00b2', value: '650\u00a0$' }, { label: 'Absorption T1', value: '62\u00a0%' }, { label: 'Prime proximit\u00e9 REM', value: '+12\u00a0%' }],
    sectionsEn: [
      { heading: 'Market Recovery', body: 'Absorption rates improved to 62% in Q1, up from 48% in Q4 2025. Developer incentives including reduced deposits, assignment flexibility, and design upgrades are driving buyer confidence.' },
      { heading: 'REM Impact', body: "Projects within 800m of REM stations are commanding a 12% premium over comparable non-transit-adjacent units. The Bois-Franc and Du Ruisseau stations are creating new pre-construction hotspots." },
      { heading: 'Investment Outlook', body: 'Pre-construction remains attractive for investors willing to hold through delivery. The 15\u201320% appreciation from purchase to occupancy continues for well-located projects. Assignment opportunities are available at select developments.' },
    ],
    sectionsFr: [
      { heading: 'Reprise du march\u00e9', body: "Les taux d\u2019absorption se sont am\u00e9lior\u00e9s \u00e0 62\u00a0% au T1, en hausse par rapport \u00e0 48\u00a0% au T4 2025. Les incitatifs des promoteurs incluant des d\u00e9p\u00f4ts r\u00e9duits et la flexibilit\u00e9 de cession stimulent la confiance des acheteurs." },
      { heading: 'Impact du REM', body: "Les projets \u00e0 moins de 800\u00a0m des stations du REM commandent une prime de 12\u00a0% par rapport aux unit\u00e9s comparables non adjacentes au transport. Les stations Bois-Franc et Du Ruisseau cr\u00e9ent de nouveaux points chauds." },
      { heading: "Perspectives d\u2019investissement", body: "La pr\u00e9construction reste attrayante pour les investisseurs pr\u00eats \u00e0 d\u00e9tenir jusqu\u2019\u00e0 la livraison. L\u2019appr\u00e9ciation de 15\u201320\u00a0% de l\u2019achat \u00e0 l\u2019occupation se poursuit pour les projets bien situ\u00e9s." },
    ],
    relatedLinks: [{ label: 'Pre-Construction', href: '/pre-construction-condos-montreal' }, { label: 'Pre-Sale', href: '/presale' }],
  },
  {
    slug: 'data-center-market-canada-2026', title: 'Data Center Market Canada 2026', titleFr: 'March\u00e9 centres de donn\u00e9es Canada 2026', category: 'data-center', quarter: '2026',
    summaryEn: "Canada\u2019s data center market is experiencing unprecedented growth driven by AI workloads, cloud migration, and hyperscale expansion. Montreal\u2019s hydroelectric advantage positions it as a leading destination for power-intensive facilities.",
    summaryFr: "Le march\u00e9 canadien des centres de donn\u00e9es conna\u00eet une croissance sans pr\u00e9c\u00e9dent, stimul\u00e9e par les charges de travail IA, la migration cloud et l\u2019expansion hyperscale. L\u2019avantage hydro\u00e9lectrique de Montr\u00e9al le positionne comme destination de premier plan.",
    statsEn: [{ label: 'Market growth', value: '+28% YoY' }, { label: 'Quebec power cost', value: '$0.05/kWh' }, { label: 'Pipeline capacity', value: '450MW' }, { label: 'Vacancy', value: '<5%' }],
    statsFr: [{ label: 'Croissance march\u00e9', value: '+28\u00a0% A/A' }, { label: 'Co\u00fbt \u00e9nergie QC', value: '0,05\u00a0$/kWh' }, { label: 'Capacit\u00e9 pipeline', value: '450\u00a0MW' }, { label: 'Vacance', value: '<5\u00a0%' }],
    sectionsEn: [
      { heading: 'Growth Drivers', body: 'AI model training, enterprise cloud migration, and Canadian data sovereignty requirements are driving 28% year-over-year growth. Hyperscalers (AWS, Google, Microsoft) are all expanding Canadian presence.' },
      { heading: 'Quebec Advantage', body: "Quebec offers North America\u2019s cheapest electricity at ~$0.05/kWh, cool climate reducing cooling costs, political stability, and proximity to US Tier 1 markets. Montreal is emerging as a global data center hub alongside Toronto and Calgary." },
      { heading: 'Investment Opportunity', body: 'Data center real estate commands premium pricing with long-term triple-net leases (10\u201320 years). Cap rates of 5\u20137% with built-in escalation clauses. Jeremy Soares is one of the few Canadian brokers specializing in data center properties.' },
    ],
    sectionsFr: [
      { heading: 'Moteurs de croissance', body: "L\u2019entra\u00eenement de mod\u00e8les IA, la migration cloud et les exigences de souverainet\u00e9 des donn\u00e9es canadiennes stimulent une croissance de 28\u00a0% d\u2019une ann\u00e9e \u00e0 l\u2019autre. Les hyperscalers (AWS, Google, Microsoft) \u00e9largissent tous leur pr\u00e9sence canadienne." },
      { heading: 'Avantage qu\u00e9b\u00e9cois', body: "Le Qu\u00e9bec offre l\u2019\u00e9lectricit\u00e9 la moins ch\u00e8re en Am\u00e9rique du Nord \u00e0 ~0,05\u00a0$/kWh, un climat frais r\u00e9duisant les co\u00fbts de refroidissement, la stabilit\u00e9 politique et la proximit\u00e9 des march\u00e9s am\u00e9ricains Tier 1." },
      { heading: "Opportunit\u00e9 d\u2019investissement", body: "L\u2019immobilier de centres de donn\u00e9es commande des prix premium avec des baux triple net \u00e0 long terme (10\u201320 ans). Taux de capitalisation de 5\u20137\u00a0% avec clauses d\u2019indexation int\u00e9gr\u00e9es. Jeremy Soares est l\u2019un des rares courtiers canadiens sp\u00e9cialis\u00e9s." },
    ],
    relatedLinks: [{ label: 'Data Center Real Estate', href: '/data-center-real-estate-canada' }],
  },
]

export async function generateStaticParams() {
  const locales = ['en-ca', 'fr-ca']
  return reports.flatMap((r) => locales.map((locale) => ({ locale, slug: r.slug })))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const isFr = locale === 'fr-ca'
  const r = reports.find((x) => x.slug === slug)
  if (!r) return {}
  const title = isFr ? `${r.titleFr} | Jeremy Soares` : `${r.title} | Jeremy Soares`
  const canonical = `${SITE_URL}/${locale}/market-reports/${slug}`
  return { title, alternates: { canonical, languages: { 'en-CA': `${SITE_URL}/en-ca/market-reports/${slug}`, 'fr-CA': `${SITE_URL}/fr-ca/market-reports/${slug}` } } }
}

export default async function MarketReportPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const isFr = locale === 'fr-ca'
  const r = reports.find((x) => x.slug === slug)
  if (!r) notFound()

  const stats = isFr ? r.statsFr : r.statsEn
  const sections = isFr ? r.sectionsFr : r.sectionsEn

  const jsonLd = { '@context': 'https://schema.org', '@type': 'Article', headline: isFr ? r.titleFr : r.title, author: { '@type': 'Person', name: 'Jeremy Soares' }, publisher: { '@type': 'Organization', name: 'Soares Agency' } }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Section theme="void" className="pt-32 pb-20 md:pt-44 md:pb-28">
        <Container size="lg">
          <Label className="mb-8">{r.quarter} \u2014 {r.category.toUpperCase()}</Label>
          <div style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(2.5rem,7vw,5.5rem)', letterSpacing: '-0.02em' }}>
            <TextReveal as="h1" split="words" immediate delay={0.15} className="leading-none uppercase text-[var(--color-cream)]">
              {isFr ? r.titleFr : r.title}
            </TextReveal>
          </div>
          <SectionReveal delay={0.35} className="mt-8 max-w-3xl">
            <p className="text-[var(--color-cream)] opacity-50 leading-relaxed" style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}>
              {isFr ? r.summaryFr : r.summaryEn}
            </p>
          </SectionReveal>
        </Container>
      </Section>

      {/* Stats band */}
      <Section theme="cream" className="py-16 relative overflow-hidden">
        <div className="wipe pointer-events-none absolute inset-0 bg-[var(--color-cream)] z-10" aria-hidden="true" style={{ transformOrigin: 'top' }} />
        <Container size="lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <SectionReveal key={i} delay={i * 0.08}>
                <div className="text-center">
                  <p className="text-[var(--color-void)]" style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(2rem,4vw,3rem)' }}>{s.value}</p>
                  <p className="text-[var(--color-void)] opacity-40 uppercase mt-2" style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em' }}>{s.label}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Content sections */}
      <Section theme="void" className="py-24 md:py-32">
        <Container size="lg">
          {sections.map((sec, i) => (
            <SectionReveal key={i} delay={i * 0.08}>
              <div className={`grid grid-cols-1 md:grid-cols-12 gap-8 ${i > 0 ? 'mt-16 pt-16 border-t border-[rgba(236,234,229,0.08)]' : ''}`}>
                <div className="md:col-span-4">
                  <h2 className="text-[var(--color-cream)]" style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(1.3rem,2.5vw,2rem)', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                    {sec.heading}
                  </h2>
                </div>
                <div className="md:col-span-8">
                  <p className="text-[var(--color-cream)] opacity-55 leading-relaxed" style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}>
                    {sec.body}
                  </p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </Container>
      </Section>

      {/* Related + CTA */}
      <Section theme="cream" className="py-20 relative overflow-hidden">
        <div className="wipe pointer-events-none absolute inset-0 bg-[var(--color-cream)] z-10" aria-hidden="true" style={{ transformOrigin: 'top' }} />
        <Container size="lg" className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="block mb-4 text-[var(--color-void)] opacity-30 uppercase" style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em' }}>
              {isFr ? 'Pages reli\u00e9es' : 'Related pages'}
            </span>
            <div className="flex flex-wrap gap-4">
              {r.relatedLinks.map((link) => (
                <Button key={link.href} variant="ghost" theme="light" href={`/${locale}${link.href}`} size="sm">{link.label}</Button>
              ))}
              <Button variant="ghost" theme="light" href={`/${locale}/market-reports`} size="sm">{isFr ? 'Tous les rapports' : 'All Reports'}</Button>
            </div>
          </div>
          <Button variant="primary" theme="light" href={`/${locale}/contact`} size="lg">{isFr ? 'Discutons' : "Let\u2019s Talk"}</Button>
        </Container>
      </Section>
    </>
  )
}
