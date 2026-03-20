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
  const canonical = `${SITE_URL}/${locale}/services/pre-construction`

  return {
    title: isFr
      ? 'Conseil Préconstruction Montréal | Accès Prioritaire — Jeremy Soares'
      : 'Pre-Construction Advisory Montreal | Priority Access — Jeremy Soares',
    description: isFr
      ? "Accès prioritaire aux nouvelles phases de condos à Montréal avant l'ouverture publique. Analyse des plans, prix au pied carré et potentiel de revente. Courtier OACIQ H2731."
      : 'Priority access to Montreal pre-construction condo phases before public launch. Floor plan analysis, price-per-square-foot benchmarking, and resale projections. OACIQ broker H2731.',
    keywords: isFr
      ? ['préconstruction Montréal', 'condos préconstruction Montréal', 'accès prioritaire présale', 'courtier préconstruction Montréal', 'Jeremy Soares OACIQ']
      : ['pre-construction Montreal', 'pre-construction condos Montreal', 'priority access presale', 'pre-construction broker Montreal', 'Jeremy Soares OACIQ'],
    alternates: {
      canonical,
      languages: {
        'en-CA': `${SITE_URL}/en-ca/services/pre-construction`,
        'fr-CA': `${SITE_URL}/fr-ca/services/pre-construction`,
      },
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title: isFr
        ? 'Conseil Préconstruction Montréal — Jeremy Soares'
        : 'Pre-Construction Advisory Montreal — Jeremy Soares',
      description: isFr
        ? "Accès prioritaire aux nouvelles phases de condos à Montréal avant l'ouverture publique."
        : 'Priority access to Montreal pre-construction condo phases before public launch.',
    },
  }
}

function PreConstructionJsonLd({ locale }: { locale: string }) {
  const isFr = locale === 'fr-ca'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/${locale}/services/pre-construction`,
        name: isFr ? 'Conseil Préconstruction Montréal' : 'Pre-Construction Advisory Montreal',
        description: isFr
          ? "Accès prioritaire aux nouvelles phases de condos à Montréal avant l'ouverture publique. Analyse des plans d'étage, prix au pied carré et potentiel de revente."
          : 'Priority access to new condo phases in Montreal before public launch. Floor plan analysis, price per square foot benchmarking, and resale projections.',
        url: `${SITE_URL}/${locale}/services/pre-construction`,
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
              { '@type': 'Question', name: "Qu'est-ce que la préconstruction à Montréal?", acceptedAnswer: { '@type': 'Answer', text: "La préconstruction désigne l'achat d'un condo avant ou pendant la construction. L'acheteur réserve une unité à un prix fixe, avec une livraison 2 à 4 ans plus tard. L'avantage principal est le prix d'entrée souvent inférieur à la valeur au marché à la livraison." } },
              { '@type': 'Question', name: "Quel dépôt est requis pour un condo en préconstruction?", acceptedAnswer: { '@type': 'Answer', text: "La plupart des promoteurs exigent 20 à 25% de dépôt échelonné sur plusieurs versements — typiquement à la signature, 6 mois, 12 mois et à la mise en chantier. Jeremy analyse la structure de dépôt de chaque projet pour minimiser votre exposition." } },
              { '@type': 'Question', name: "Comment obtenir un accès prioritaire avant l'ouverture publique?", acceptedAnswer: { '@type': 'Answer', text: "Jeremy maintient des relations directes avec les principaux promoteurs montréalais. Ses clients reçoivent l'accès VIP aux plans d'étage et prix plusieurs semaines avant l'ouverture publique, permettant le choix des meilleures unités à des prix de lancement." } },
              { '@type': 'Question', name: "Y a-t-il des risques en préconstruction?", acceptedAnswer: { '@type': 'Answer', text: "Oui : délais de livraison, changements de plan par le promoteur, et fluctuations du marché à la livraison. Jeremy évalue le bilan du promoteur, les garanties financières et les clauses contractuelles avant chaque engagement client." } },
            ]
          : [
              { '@type': 'Question', name: 'What is pre-construction in Montreal?', acceptedAnswer: { '@type': 'Answer', text: 'Pre-construction means purchasing a condo before or during the building phase. You reserve a unit at a fixed price with delivery 2–4 years later. The main advantage is an entry price often below market value at occupancy.' } },
              { '@type': 'Question', name: 'What deposit is required for a pre-construction condo?', acceptedAnswer: { '@type': 'Answer', text: 'Most developers require 20–25% deposited in stages — typically at signing, 6 months, 12 months, and at construction start. Jeremy analyses the deposit structure of every project to minimize your capital exposure.' } },
              { '@type': 'Question', name: 'How do I get priority access before the public launch?', acceptedAnswer: { '@type': 'Answer', text: "Jeremy maintains direct relationships with Montreal's leading developers. His clients receive VIP access to floor plans and pricing several weeks before public launch, allowing first selection of the best units at launch pricing." } },
              { '@type': 'Question', name: 'What are the risks of pre-construction?', acceptedAnswer: { '@type': 'Answer', text: 'Key risks include delivery delays, developer plan changes, and market fluctuations at delivery. Jeremy evaluates developer track records, financial guarantees, and contract clauses before any client commitment.' } },
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

export default async function PreConstructionPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr-ca'

  const steps = isFr
    ? [
        { number: '01', title: 'Accès prioritaire', body: "Jeremy contacte ses partenaires promoteurs avant l'annonce publique. Vous recevez les plans, prix et disponibilités en avant-première — souvent 3 à 6 semaines avant l'ouverture au grand public." },
        { number: '02', title: 'Analyse du projet', body: "Chaque projet est passé au crible : bilan du promoteur, localisation par rapport au REM et aux commodités, ratio qualité-prix au pied carré, et comparaison avec les reventes récentes dans le secteur." },
        { number: '03', title: 'Sélection et négociation', body: "Jeremy vous guide vers les unités offrant le meilleur potentiel selon votre profil — investisseur ou occupant. Il négocie les incitatifs disponibles : réductions, mises à niveau, flexibilité de cession." },
        { number: '04', title: 'Accompagnement jusqu\'à la livraison', body: "De la signature du contrat préliminaire à l'inspection pré-livraison, Jeremy reste présent. Il coordonne avec le notaire, vérifie les ajustements et s'assure que vos droits sont protégés à chaque étape." },
      ]
    : [
        { number: '01', title: 'Priority access', body: "Jeremy contacts his developer partners before the public announcement. You receive floor plans, pricing, and availability in advance — often 3–6 weeks before the public opening." },
        { number: '02', title: 'Project analysis', body: "Every project is scrutinised: developer track record, REM proximity, price-per-square-foot versus comparable resales, unit mix quality, and neighbourhood trajectory." },
        { number: '03', title: 'Selection & negotiation', body: "Jeremy guides you to units with the strongest potential for your profile — investor or end-user. He negotiates available incentives: discounts, upgrades, assignment flexibility." },
        { number: '04', title: 'Accompaniment to delivery', body: "From the preliminary contract through the pre-delivery inspection, Jeremy stays involved. He coordinates with the notary, verifies adjustments, and ensures your rights are protected at every stage." },
      ]

  const faqs = isFr
    ? [
        { q: "Qu'est-ce que la préconstruction à Montréal?", a: "La préconstruction désigne l'achat d'un condo avant ou pendant la construction. L'acheteur réserve une unité à un prix fixe, avec une livraison 2 à 4 ans plus tard. L'avantage principal est le prix d'entrée souvent inférieur à la valeur au marché à la livraison." },
        { q: "Quel dépôt est requis pour un condo en préconstruction?", a: "La plupart des promoteurs exigent 20 à 25% de dépôt échelonné sur plusieurs versements — typiquement à la signature, 6 mois, 12 mois et à la mise en chantier. Jeremy analyse la structure de dépôt de chaque projet pour minimiser votre exposition." },
        { q: "Comment obtenir un accès prioritaire avant l'ouverture publique?", a: "Jeremy maintient des relations directes avec les principaux promoteurs montréalais. Ses clients reçoivent l'accès VIP aux plans d'étage et prix plusieurs semaines avant l'ouverture publique, permettant le choix des meilleures unités à des prix de lancement." },
        { q: "Y a-t-il des risques en préconstruction?", a: "Oui : délais de livraison, changements de plan par le promoteur, et fluctuations du marché à la livraison. Jeremy évalue le bilan du promoteur, les garanties financières et les clauses contractuelles avant chaque engagement client." },
      ]
    : [
        { q: 'What is pre-construction in Montreal?', a: 'Pre-construction means purchasing a condo before or during the building phase. You reserve a unit at a fixed price with delivery 2–4 years later. The main advantage is an entry price often below market value at occupancy.' },
        { q: 'What deposit is required for a pre-construction condo?', a: 'Most developers require 20–25% deposited in stages — typically at signing, 6 months, 12 months, and at construction start. Jeremy analyses the deposit structure of every project to minimize your capital exposure.' },
        { q: 'How do I get priority access before the public launch?', a: "Jeremy maintains direct relationships with Montreal's leading developers. His clients receive VIP access to floor plans and pricing several weeks before public launch, allowing first selection of the best units at launch pricing." },
        { q: 'What are the risks of pre-construction?', a: 'Key risks include delivery delays, developer plan changes, and market fluctuations at delivery. Jeremy evaluates developer track records, financial guarantees, and contract clauses before any client commitment.' },
      ]

  return (
    <>
      <PreConstructionJsonLd locale={locale} />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <Section theme="void" className="pt-32 pb-20 md:pt-44 md:pb-28">
        <Container size="lg">
          <Label className="mb-8">
            {isFr ? '(Services) — Préconstruction' : '(Services) — Pre-Construction'}
          </Label>

          <div
            style={{
              fontFamily: FONT_BARLOW,
              fontWeight: 900,
              fontSize: 'clamp(3.5rem, 9vw, 7.5rem)',
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
              {isFr ? 'Préconstruction' : 'Pre-Construction'}
            </TextReveal>
          </div>

          <SectionReveal delay={0.3} className="mt-5">
            <p
              className="text-[var(--color-cream)] opacity-35"
              style={{ fontFamily: FONT_DM_SERIF, fontStyle: 'italic', fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}
            >
              {isFr
                ? "Accès prioritaire. Analyse rigoureuse. Engagement de la signature à la livraison."
                : 'Priority access. Rigorous analysis. Committed from signing to delivery.'}
            </p>
          </SectionReveal>

          <SectionReveal delay={0.45} className="mt-4 max-w-xl">
            <p
              className="text-[var(--color-cream)] opacity-45 leading-relaxed"
              style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
            >
              {isFr
                ? "À Montréal, les meilleures unités de préconstruction disparaissent avant que la majorité des acheteurs apprennent leur existence. Jeremy vous place à l'avant de la liste."
                : "In Montreal, the best pre-construction units are gone before most buyers learn they exist. Jeremy puts you at the front of the line."}
            </p>
          </SectionReveal>
        </Container>
      </Section>

      {/* ── What is Pre-Construction ────────────────────────────────────── */}
      <Section theme="cream" className="py-24 md:py-32 relative overflow-hidden">
        <Container size="lg">
          <Label className="mb-10">
            {isFr ? '(Définition)' : '(What It Is)'}
          </Label>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
              <div
                style={{
                  fontFamily: FONT_BARLOW,
                  fontWeight: 900,
                  fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                  letterSpacing: '-0.02em',
                }}
              >
                <TextReveal
                  as="h2"
                  split="words"
                  className="leading-none uppercase text-[var(--color-void)]"
                >
                  {isFr ? "L'achat avant construction" : 'Buying before the build'}
                </TextReveal>
              </div>
            </div>

            <div className="md:col-span-7 flex flex-col gap-5">
              <SectionReveal>
                <p
                  className="text-[var(--color-void)] opacity-55 leading-relaxed"
                  style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                >
                  {isFr
                    ? "La préconstruction désigne l'achat d'un condo pendant sa conception ou construction. L'acheteur réserve une unité à un prix fixé aujourd'hui, avec une livraison 2 à 4 ans plus tard. Les premiers signataires obtiennent les meilleurs prix, les meilleurs étages et les meilleures orientations."
                    : 'Pre-construction means purchasing a condo while it is still being designed or built. You lock in a price today, take delivery 2–4 years later. Early signatories capture the best prices, the best floors, and the best orientations.'}
                </p>
              </SectionReveal>

              <SectionReveal delay={0.1}>
                <p
                  className="text-[var(--color-void)] opacity-55 leading-relaxed"
                  style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                >
                  {isFr
                    ? "À Montréal, avec l'expansion du REM et la densification des quartiers centraux, les projets bien positionnés génèrent régulièrement une appréciation de 15 à 25% entre la signature et l'occupation. Pour les investisseurs, le levier sur le dépôt peut produire des rendements non réplicables sur le marché de revente."
                    : 'In Montreal, with REM expansion and central neighbourhood densification, well-positioned projects regularly generate 15–25% appreciation between signing and occupancy. For investors, the leverage on the deposit produces returns unavailable in the resale market.'}
                </p>
              </SectionReveal>

              <SectionReveal delay={0.15} className="pt-2">
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://presalemontreal.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 uppercase text-[var(--color-void)] opacity-40 hover:opacity-80 transition-opacity duration-200"
                    style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.18em', fontWeight: 500 }}
                  >
                    presalemontreal.com <span aria-hidden="true" className="text-[0.6rem]">↗</span>
                  </a>
                  <a
                    href="https://mtlpresales.ca"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 uppercase text-[var(--color-void)] opacity-40 hover:opacity-80 transition-opacity duration-200"
                    style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.18em', fontWeight: 500 }}
                  >
                    mtlpresales.ca <span aria-hidden="true" className="text-[0.6rem]">↗</span>
                  </a>
                </div>
                <p
                  className="mt-2 text-[var(--color-void)] opacity-30 uppercase"
                  style={{ fontFamily: FONT_DM_SANS, fontSize: '9px', letterSpacing: '0.18em' }}
                >
                  {isFr ? 'Outils de recherche complémentaires' : 'Additional research tools'}
                </p>
              </SectionReveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Jeremy's Process — 4 steps ──────────────────────────────────── */}
      <Section theme="void" className="py-24 md:py-36">
        <Container size="lg">
          <Label className="mb-10">
            {isFr ? '(Processus)' : '(Process)'}
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
              className="leading-none uppercase text-[var(--color-cream)]"
            >
              {isFr ? "L'approche Jeremy" : "Jeremy's Process"}
            </TextReveal>
          </div>

          <div className="border-t" style={{ borderColor: 'rgba(236,234,229,0.08)' }}>
            {steps.map((step, i) => (
              <SectionReveal key={step.number} delay={i * 0.08}>
                <div
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 py-10 border-b"
                  style={{ borderColor: 'rgba(236,234,229,0.08)' }}
                >
                  <div className="md:col-span-1 flex items-start pt-1">
                    <span
                      className="uppercase text-[var(--color-cream)] opacity-25"
                      style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em', fontWeight: 500 }}
                    >
                      {step.number}
                    </span>
                  </div>
                  <div className="md:col-span-4">
                    <h3
                      className="text-[var(--color-cream)] leading-tight"
                      style={{ fontFamily: FONT_DM_SERIF, fontStyle: 'italic', fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)' }}
                    >
                      {step.title}
                    </h3>
                  </div>
                  <div className="md:col-span-7">
                    <p
                      className="text-[var(--color-cream)] opacity-50 leading-relaxed"
                      style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                    >
                      {step.body}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Why Early Access Matters ─────────────────────────────────────── */}
      <Section theme="cream" className="py-24 md:py-32 relative overflow-hidden">
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
            <div className="md:col-span-5">
              <Label className="mb-8">
                {isFr ? "(Pourquoi l'accès prioritaire)" : '(Why Early Access)'}
              </Label>
              <div
                style={{
                  fontFamily: FONT_BARLOW,
                  fontWeight: 900,
                  fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                  letterSpacing: '-0.02em',
                }}
              >
                <TextReveal
                  as="h2"
                  split="words"
                  className="leading-none uppercase text-[var(--color-void)]"
                >
                  {isFr ? 'Les premiers gagnent' : 'First movers win'}
                </TextReveal>
              </div>
            </div>

            <div className="md:col-span-7 flex flex-col gap-8">
              {(isFr
                ? [
                    { label: 'Prix de lancement', body: "Les promoteurs offrent leurs prix les plus bas aux premiers acheteurs pour atteindre le seuil de vente requis pour le financement bancaire. Ces prix disparaissent dès les premières semaines." },
                    { label: 'Choix des unités', body: "Les étages élevés, les orientations sud et ouest, les coins — les meilleures unités partent en premier. L'accès VIP vous donne le choix avant que l'inventaire soit amputé." },
                    { label: 'Flexibilité de cession', body: "Certains projets permettent la cession du contrat avant livraison. Cette option est souvent disponible uniquement pour les premiers acheteurs, créant un mécanisme de sortie pour les investisseurs." },
                  ]
                : [
                    { label: 'Launch pricing', body: "Developers offer their lowest prices to early buyers to reach the sales threshold required for construction financing. These prices disappear within the first few weeks." },
                    { label: 'Unit selection', body: "High floors, south and west orientations, corner units — the best inventory goes first. VIP access gives you first selection before the unit mix is depleted." },
                    { label: 'Assignment flexibility', body: "Some projects allow contract assignment before delivery. This option is often reserved for early buyers only, creating an exit mechanism for investors." },
                  ]
              ).map((item, i) => (
                <SectionReveal key={i} delay={i * 0.08}>
                  <div>
                    <p
                      className="uppercase text-[var(--color-void)] opacity-35 mb-2"
                      style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em', fontWeight: 500 }}
                    >
                      {item.label}
                    </p>
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
          </div>
        </Container>
      </Section>

      {/* ── Active Projects teaser ───────────────────────────────────────── */}
      <Section theme="void" className="py-20 md:py-28">
        <Container size="lg">
          <SectionReveal>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div>
                <span
                  className="block mb-4 uppercase"
                  style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em', color: '#f55f00' }}
                >
                  {isFr ? '— Projets actifs' : '— Active projects'}
                </span>
                <div
                  style={{
                    fontFamily: FONT_BARLOW,
                    fontWeight: 900,
                    fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  <TextReveal
                    as="h2"
                    split="words"
                    className="leading-none uppercase text-[var(--color-cream)]"
                  >
                    {isFr ? 'Présales en cours' : 'Current pre-sales'}
                  </TextReveal>
                </div>
                <SectionReveal delay={0.15} className="mt-4 max-w-md">
                  <p
                    className="text-[var(--color-cream)] opacity-40 leading-relaxed"
                    style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                  >
                    {isFr
                      ? "Consultez les projets actuellement en présale auxquels Jeremy a accès prioritaire."
                      : "View the projects currently in pre-sale where Jeremy has priority access."}
                  </p>
                </SectionReveal>
              </div>
              <Button variant="primary" theme="dark" href={`/${locale}/presale`} size="lg">
                {isFr ? 'Voir les présales' : 'View Pre-Sales'}
              </Button>
            </div>
          </SectionReveal>
        </Container>
      </Section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <Section theme="cream" className="py-24 md:py-32 relative overflow-hidden">
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
              className="leading-none uppercase text-[var(--color-void)]"
            >
              {isFr ? 'Questions fréquentes' : 'FAQ'}
            </TextReveal>
          </div>

          <div className="border-t border-[rgba(14,16,17,0.08)]">
            {faqs.map((faq, i) => (
              <SectionReveal key={i} delay={i * 0.06}>
                <div className="py-8 border-b border-[rgba(14,16,17,0.08)]">
                  <h3
                    className="text-[var(--color-void)] mb-3"
                    style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '1.05rem', textTransform: 'uppercase', letterSpacing: '0.02em' }}
                  >
                    {faq.q}
                  </h3>
                  <p
                    className="text-[var(--color-void)] opacity-50 leading-relaxed max-w-3xl"
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
      <Section theme="void" className="py-28 md:py-36">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12">
            <div className="flex-1 max-w-2xl">
              <SectionReveal>
                <span
                  className="block mb-6 uppercase"
                  style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em', color: '#f55f00' }}
                >
                  {isFr ? '— Accès prioritaire' : '— Priority access'}
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
                  {isFr ? 'Rejoignez la liste VIP' : 'Join the VIP list'}
                </TextReveal>
              </div>

              <SectionReveal delay={0.2} className="mt-6 max-w-md">
                <p
                  className="text-[var(--color-cream)] opacity-40 leading-relaxed"
                  style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                >
                  {isFr
                    ? "Contactez Jeremy pour être informé en premier des nouvelles phases. Votre profil d'acheteur est enregistré et vous alerté dès qu'un projet correspond."
                    : "Contact Jeremy to be notified first of upcoming phases. Your buyer profile is registered and you are alerted the moment a matching project comes available."}
                </p>
              </SectionReveal>

              <SectionReveal delay={0.25} className="mt-6">
                <div className="flex flex-wrap gap-4">
                  <Button variant="ghost" theme="dark" href={`/${locale}/guides/pre-construction-condo-guide-montreal`} size="sm">
                    {isFr ? 'Guide préconstruction' : 'Pre-Construction Guide'}
                  </Button>
                </div>
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
