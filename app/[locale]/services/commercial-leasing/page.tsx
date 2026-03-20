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
  const canonical = `${SITE_URL}/${locale}/services/commercial-leasing`

  return {
    title: isFr
      ? 'Location Commerciale Montréal | Bureau, Commerce, Industriel — Jeremy Soares'
      : 'Commercial Leasing Montreal | Office, Retail, Industrial — Jeremy Soares',
    description: isFr
      ? "Location de bureaux, locaux commerciaux et entrepôts industriels à Montréal. Analyse du zonage, structuration des baux et négociation des conditions. Courtier OACIQ H2731."
      : 'Office space, retail, and industrial leasing in Montreal. Zoning analysis, lease structuring, and term negotiation. OACIQ broker H2731.',
    keywords: isFr
      ? ['location commerciale Montréal', 'bureau à louer Montréal', 'local commercial Montréal', 'entrepôt Montréal', 'courtier commercial Montréal', 'Jeremy Soares OACIQ']
      : ['commercial leasing Montreal', 'office space Montreal', 'retail space Montreal', 'industrial space Montreal', 'commercial broker Montreal', 'Jeremy Soares OACIQ'],
    alternates: {
      canonical,
      languages: {
        'en-CA': `${SITE_URL}/en-ca/services/commercial-leasing`,
        'fr-CA': `${SITE_URL}/fr-ca/services/commercial-leasing`,
      },
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title: isFr
        ? 'Location Commerciale Montréal — Jeremy Soares'
        : 'Commercial Leasing Montreal — Jeremy Soares',
      description: isFr
        ? "Location de bureaux, locaux commerciaux et entrepôts à Montréal. Analyse du zonage, baux et négociation."
        : 'Office, retail, and industrial leasing in Montreal. Zoning analysis, lease structuring, and negotiation.',
    },
  }
}

function CommercialLeasingJsonLd({ locale }: { locale: string }) {
  const isFr = locale === 'fr-ca'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/${locale}/services/commercial-leasing`,
        name: isFr ? 'Location Commerciale Montréal' : 'Commercial Leasing Montreal',
        description: isFr
          ? "Services de location commerciale à Montréal : bureaux, commerces de détail, entrepôts industriels. Analyse de zonage, structuration de baux et négociation des conditions."
          : 'Commercial leasing services in Montreal: offices, retail spaces, industrial warehouses. Zoning analysis, lease structuring, and term negotiation.',
        url: `${SITE_URL}/${locale}/services/commercial-leasing`,
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
              { '@type': 'Question', name: "Quel est le prix de location moyen pour des bureaux à Montréal?", acceptedAnswer: { '@type': 'Answer', text: "Les loyers de bureaux varient de 18 à 45 $/pi² net selon le quartier et la classe. Le centre-ville classe A se situe entre 35 et 45 $/pi², Griffintown et Mile-Ex offrent des alternatives à 20–30 $/pi². Jeremy compare les offres disponibles dans votre sous-marché cible." } },
              { '@type': 'Question', name: "Quelle est la durée typique d'un bail commercial à Montréal?", acceptedAnswer: { '@type': 'Answer', text: "Les baux commerciaux à Montréal durent typiquement 3 à 10 ans pour les bureaux, 5 à 15 ans pour le commerce de détail, et 5 à 20 ans pour l'industriel. Des options de renouvellement sont standard. Jeremy négocie des conditions flexibles pour les locataires en croissance." } },
              { '@type': 'Question', name: "Qu'est-ce qu'un bail net vs brut au Québec?", acceptedAnswer: { '@type': 'Answer', text: "Dans un bail net, le locataire paie le loyer de base plus sa part des taxes, assurances et entretien. Dans un bail brut, ces coûts sont inclus dans le loyer. La plupart des baux commerciaux québécois sont semi-nets ou nets. Jeremy explique la structure exacte de chaque offre." } },
            ]
          : [
              { '@type': 'Question', name: 'What is the average office rental price in Montreal?', acceptedAnswer: { '@type': 'Answer', text: 'Office rents range from $18–45/sq ft net depending on neighbourhood and class. Downtown Class A sits at $35–45/sq ft, while Griffintown and Mile-Ex offer alternatives at $20–30/sq ft. Jeremy benchmarks available options within your target sub-market.' } },
              { '@type': 'Question', name: 'What is a typical commercial lease term in Montreal?', acceptedAnswer: { '@type': 'Answer', text: 'Commercial leases in Montreal typically run 3–10 years for office, 5–15 years for retail, and 5–20 years for industrial. Renewal options are standard. Jeremy negotiates flexible terms for growing tenants.' } },
              { '@type': 'Question', name: 'What is a net vs gross lease in Quebec?', acceptedAnswer: { '@type': 'Answer', text: "In a net lease, the tenant pays base rent plus their share of taxes, insurance, and maintenance. In a gross lease, these costs are included in the rent. Most Quebec commercial leases are semi-net or net. Jeremy explains the exact structure of every offer." } },
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

export default async function CommercialLeasingPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr-ca'

  const propertyTypes = isFr
    ? [
        {
          type: 'Bureaux',
          tag: 'OFFICE',
          body: "Du poste de travail individuel à l'étage entier : bureaux clés en main, espaces bruts à aménager, sous-locations. Centre-ville, Griffintown, Mile-Ex, Laval. Jeremy analyse le coût total d'occupation incluant les charges et améliorations locatives négociées.",
        },
        {
          type: 'Commerce de détail',
          tag: 'RETAIL',
          body: "Locaux en rez-de-chaussée sur les artères commerciales de Montréal — Sainte-Catherine, Mont-Royal, Saint-Denis, Place Ville Marie. Analyse de la densité de passage, du zonage municipal et de la compatibilité avec votre concept commercial.",
        },
        {
          type: 'Industriel',
          tag: 'INDUSTRIAL',
          body: "Entrepôts, locaux de fabrication légère, plateformes de distribution. Saint-Laurent, Lachine, Pointe-Saint-Charles, Laval, Longueuil. Spécifications techniques : hauteur libre, accès quais de chargement, puissance électrique, zonage industriel.",
        },
      ]
    : [
        {
          type: 'Office',
          tag: 'OFFICE',
          body: "From individual workstation to full floor: turnkey office suites, raw space to fit out, sublease opportunities. Downtown, Griffintown, Mile-Ex, Laval. Jeremy analyses total occupancy cost including operating costs and negotiated tenant improvement allowances.",
        },
        {
          type: 'Retail',
          tag: 'RETAIL',
          body: "Ground-floor spaces on Montreal's commercial corridors — Sainte-Catherine, Mont-Royal, Saint-Denis, Place Ville Marie. Analysis of pedestrian density, municipal zoning, and compatibility with your commercial concept.",
        },
        {
          type: 'Industrial',
          tag: 'INDUSTRIAL',
          body: "Warehouses, light manufacturing, distribution platforms. Saint-Laurent, Lachine, Pointe-Saint-Charles, Laval, Longueuil. Technical specs: clear height, loading dock access, electrical capacity, industrial zoning compliance.",
        },
      ]

  const process = isFr
    ? [
        { number: '01', title: 'Définir les besoins', body: "Surface, configuration, emplacement, accès, budget. Jeremy traduit vos opérations en critères techniques précis avant de commencer la recherche." },
        { number: '02', title: 'Marchés et présélection', body: "Analyse des disponibilités sur Centris, réseaux hors-marché et relations directes avec les propriétaires. Une présélection qualifiée — pas une liste exhaustive non filtrée." },
        { number: '03', title: 'Visites et analyse comparative', body: "Chaque espace visité est évalué sur le coût total d'occupation, le potentiel d'aménagement et l'adéquation opérationnelle. Jeremy prépare une grille comparative." },
        { number: '04', title: 'Négociation et rédaction du bail', body: "Loyer de base, contribution aux améliorations locatives, franchises de loyer, option de renouvellement, clause de résiliation anticipée. Jeremy protège vos intérêts à chaque article du bail." },
      ]
    : [
        { number: '01', title: 'Define requirements', body: "Square footage, configuration, location, access, budget. Jeremy translates your operations into precise technical criteria before the search begins." },
        { number: '02', title: 'Market survey & shortlist', body: "Availability analysis across Centris, off-market networks, and direct landlord relationships. A qualified shortlist — not an unfiltered exhaustive list." },
        { number: '03', title: 'Tours & comparative analysis', body: "Each visited space is evaluated on total occupancy cost, fit-out potential, and operational fit. Jeremy prepares a comparative grid." },
        { number: '04', title: 'Negotiation & lease review', body: "Base rent, tenant improvement allowance, free-rent periods, renewal option, early termination clause. Jeremy protects your interests on every article of the lease." },
      ]

  const faqs = isFr
    ? [
        { q: "Quel est le prix de location moyen pour des bureaux à Montréal?", a: "Les loyers de bureaux varient de 18 à 45 $/pi² net selon le quartier et la classe. Le centre-ville classe A se situe entre 35 et 45 $/pi², Griffintown et Mile-Ex offrent des alternatives à 20–30 $/pi². Jeremy compare les offres disponibles dans votre sous-marché cible." },
        { q: "Quelle est la durée typique d'un bail commercial à Montréal?", a: "Les baux commerciaux à Montréal durent typiquement 3 à 10 ans pour les bureaux, 5 à 15 ans pour le commerce de détail, et 5 à 20 ans pour l'industriel. Des options de renouvellement sont standard. Jeremy négocie des conditions flexibles pour les locataires en croissance." },
        { q: "Qu'est-ce qu'un bail net vs brut au Québec?", a: "Dans un bail net, le locataire paie le loyer de base plus sa part des taxes, assurances et entretien. Dans un bail brut, ces coûts sont inclus dans le loyer. La plupart des baux commerciaux québécois sont semi-nets ou nets. Jeremy explique la structure exacte de chaque offre." },
      ]
    : [
        { q: 'What is the average office rental price in Montreal?', a: 'Office rents range from $18–45/sq ft net depending on neighbourhood and class. Downtown Class A sits at $35–45/sq ft, while Griffintown and Mile-Ex offer alternatives at $20–30/sq ft. Jeremy benchmarks available options within your target sub-market.' },
        { q: 'What is a typical commercial lease term in Montreal?', a: 'Commercial leases in Montreal typically run 3–10 years for office, 5–15 years for retail, and 5–20 years for industrial. Renewal options are standard. Jeremy negotiates flexible terms for growing tenants.' },
        { q: 'What is a net vs gross lease in Quebec?', a: "In a net lease, the tenant pays base rent plus their share of taxes, insurance, and maintenance. In a gross lease, these costs are included in the rent. Most Quebec commercial leases are semi-net or net. Jeremy explains the exact structure of every offer." },
      ]

  return (
    <>
      <CommercialLeasingJsonLd locale={locale} />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <Section theme="void" className="pt-32 pb-20 md:pt-44 md:pb-28">
        <Container size="lg">
          <Label className="mb-8">
            {isFr ? '(Services) — Commercial' : '(Services) — Commercial'}
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
              {isFr ? 'Location\nCommerciale' : 'Commercial\nLeasing'}
            </TextReveal>
          </div>

          <SectionReveal delay={0.3} className="mt-5">
            <p
              className="text-[var(--color-cream)] opacity-35"
              style={{ fontFamily: FONT_DM_SERIF, fontStyle: 'italic', fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}
            >
              {isFr
                ? "Bureaux, commerces, entrepôts. Du besoin à la clé en main."
                : 'Office, retail, industrial. From brief to keys in hand.'}
            </p>
          </SectionReveal>

          <SectionReveal delay={0.45} className="mt-4 max-w-xl">
            <p
              className="text-[var(--color-cream)] opacity-45 leading-relaxed"
              style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
            >
              {isFr
                ? "Le bon espace commercial transforme l'efficacité opérationnelle et le recrutement. Jeremy connaît le marché commercial de Montréal de l'Ouest de l'île au Vieux-Port."
                : "The right commercial space transforms operational efficiency and hiring. Jeremy knows Montreal's commercial market from the West Island to Old Port."}
            </p>
          </SectionReveal>
        </Container>
      </Section>

      {/* ── Property Types ───────────────────────────────────────────────── */}
      <Section theme="cream" className="py-24 md:py-32 relative overflow-hidden">
        <Container size="lg">
          <Label className="mb-10">
            {isFr ? '(Types de propriétés)' : '(Property Types)'}
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
              {isFr ? 'Trois segments. Une expertise.' : 'Three segments. One expertise.'}
            </TextReveal>
          </div>

          <div className="flex flex-col gap-0 border-t border-[rgba(14,16,17,0.08)]">
            {propertyTypes.map((pt, i) => (
              <SectionReveal key={i} delay={i * 0.08}>
                <div
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 py-12 border-b border-[rgba(14,16,17,0.08)]"
                >
                  <div className="md:col-span-1 flex items-start pt-1">
                    <span
                      className="uppercase text-[var(--color-void)] opacity-25"
                      style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em', fontWeight: 500 }}
                    >
                      {pt.tag}
                    </span>
                  </div>
                  <div className="md:col-span-4">
                    <h3
                      className="text-[var(--color-void)] leading-tight"
                      style={{ fontFamily: FONT_DM_SERIF, fontStyle: 'italic', fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}
                    >
                      {pt.type}
                    </h3>
                  </div>
                  <div className="md:col-span-7">
                    <p
                      className="text-[var(--color-void)] opacity-55 leading-relaxed"
                      style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                    >
                      {pt.body}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.2} className="mt-8">
            <div className="flex flex-wrap gap-4">
              <a
                href="https://commercialrealestatemtl.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 uppercase text-[var(--color-void)] opacity-40 hover:opacity-80 transition-opacity duration-200"
                style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.18em', fontWeight: 500 }}
              >
                commercialrealestatemtl.ca <span aria-hidden="true" className="text-[0.6rem]">↗</span>
              </a>
              <a
                href="https://officemontreal.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 uppercase text-[var(--color-void)] opacity-40 hover:opacity-80 transition-opacity duration-200"
                style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.18em', fontWeight: 500 }}
              >
                officemontreal.ca <span aria-hidden="true" className="text-[0.6rem]">↗</span>
              </a>
            </div>
          </SectionReveal>
        </Container>
      </Section>

      {/* ── The Leasing Process ──────────────────────────────────────────── */}
      <Section theme="void" className="py-24 md:py-36">
        <Container size="lg">
          <Label className="mb-10">
            {isFr ? '(Le processus)' : '(The Process)'}
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
              {isFr ? 'Du besoin au bail signé' : 'From brief to signed lease'}
            </TextReveal>
          </div>

          <div className="border-t border-[rgba(236,234,229,0.08)]">
            {process.map((step, i) => (
              <SectionReveal key={step.number} delay={i * 0.08}>
                <div
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 py-10 border-b border-[rgba(236,234,229,0.08)]"
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

      {/* ── Market Context ───────────────────────────────────────────────── */}
      <Section theme="cream" className="py-24 md:py-32 relative overflow-hidden">
        <Container size="lg">
          <Label className="mb-10">
            {isFr ? '(Contexte de marché)' : '(Market Context)'}
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
                  {isFr ? 'Le marché commercial MTL' : 'Montreal commercial today'}
                </TextReveal>
              </div>
            </div>

            <div className="md:col-span-7 flex flex-col gap-5">
              {(isFr
                ? [
                    "Le marché des bureaux du centre-ville montre un taux de vacance de 14–16% — une opportunité historique pour les locataires. Les propriétaires accordent des concessions importantes : contributions aux améliorations locatives, franchises de loyer et flexibilité contractuelle.",
                    "Le commerce de détail de rue rebondit sur les corridors établis. Les espaces de classe B dans des emplacements de premier ordre se négocient avec des réductions par rapport à leurs précédents niveaux — idéal pour les concepts en croissance.",
                    "L'industriel reste le segment le plus serré avec moins de 3% de vacance. Les taux de location ont augmenté de 15–20% en deux ans. L'entrée rapide exige une veille active — Jeremy maintient des contacts directs avec les propriétaires de parcs industriels.",
                  ]
                : [
                    "The downtown office market shows 14–16% vacancy — a historic opportunity for tenants. Landlords are conceding significantly: tenant improvement allowances, free-rent periods, and contractual flexibility.",
                    "Street retail is rebounding on established corridors. Class B spaces in prime locations are negotiating below their previous levels — ideal for growing concepts.",
                    "Industrial remains the tightest segment with under 3% vacancy. Lease rates have increased 15–20% over two years. Fast entry requires active monitoring — Jeremy maintains direct contacts with industrial park owners.",
                  ]
              ).map((point, i) => (
                <SectionReveal key={i} delay={i * 0.08}>
                  <p
                    className="text-[var(--color-void)] opacity-55 leading-relaxed"
                    style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                  >
                    {point}
                  </p>
                </SectionReveal>
              ))}
            </div>
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
                  {isFr ? '— Votre espace commercial' : '— Your commercial space'}
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
                  {isFr ? 'Décrivez vos besoins' : 'Describe your needs'}
                </TextReveal>
              </div>

              <SectionReveal delay={0.2} className="mt-6 max-w-md">
                <p
                  className="text-[var(--color-void)] opacity-40 leading-relaxed"
                  style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                >
                  {isFr
                    ? "Surface, localisation, budget, date d'occupation. Jeremy présente des options dans les 48 heures et négocie les conditions pour vous."
                    : "Square footage, location, budget, occupancy date. Jeremy presents options within 48 hours and negotiates terms on your behalf."}
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
