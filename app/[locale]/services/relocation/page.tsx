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
  const canonical = `${SITE_URL}/${locale}/services/relocation`

  return {
    title: isFr
      ? 'Services de Relocalisation Montréal | Achat ou Location — Jeremy Soares'
      : 'Montreal Relocation Services | Buy or Rent — Jeremy Soares',
    description: isFr
      ? "Services complets de relocalisation à Montréal pour familles, entreprises, expatriés et étudiants. Achat ou location. Accompagnement bilingue anglais-français. Courtier OACIQ H2731."
      : 'Complete relocation services in Montreal for families, corporations, expats, and students. Buy or rent. Bilingual English-French accompaniment. OACIQ broker H2731.',
    keywords: isFr
      ? ['relocalisation Montréal', 'déménagement Montréal', 'expatrié Montréal', 'transfert corporate Montréal', 'acheter louer Montréal', 'Jeremy Soares OACIQ']
      : ['Montreal relocation services', 'moving to Montreal', 'expat Montreal', 'corporate relocation Montreal', 'buy rent Montreal', 'Jeremy Soares OACIQ'],
    alternates: {
      canonical,
      languages: {
        'en-CA': `${SITE_URL}/en-ca/services/relocation`,
        'fr-CA': `${SITE_URL}/fr-ca/services/relocation`,
      },
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title: isFr
        ? 'Services de Relocalisation Montréal — Jeremy Soares'
        : 'Montreal Relocation Services — Jeremy Soares',
      description: isFr
        ? "Accompagnement complet de la première visite à la remise des clés pour toute relocalisation à Montréal."
        : 'Full accompaniment from first visit to key handover for any relocation to Montreal.',
    },
  }
}

function RelocationJsonLd({ locale }: { locale: string }) {
  const isFr = locale === 'fr-ca'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/${locale}/services/relocation`,
    name: isFr ? 'Services de Relocalisation Montréal' : 'Montreal Relocation Services',
    description: isFr
      ? "Services complets de relocalisation à Montréal. Accompagnement bilingue pour familles, entreprises, expatriés et étudiants — achat ou location."
      : 'Complete relocation services in Montreal. Bilingual accompaniment for families, corporations, expats, and students — buy or rent.',
    url: `${SITE_URL}/${locale}/services/relocation`,
    provider: {
      '@type': 'RealEstateAgent',
      name: 'Jeremy Soares',
      telephone: '+15145198177',
      address: { '@type': 'PostalAddress', addressLocality: 'Montreal', addressRegion: 'QC', addressCountry: 'CA' },
    },
    areaServed: { '@type': 'City', name: 'Montreal', '@id': 'https://www.wikidata.org/wiki/Q340' },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default async function RelocationPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr-ca'

  const profiles = isFr
    ? [
        {
          label: 'Transferts corporate',
          body: "Employés relocalisés par leur entreprise depuis Toronto, Vancouver ou l'international. Délais serrés, besoins précis. Jeremy coordonne la recherche, les visites et la logistique administrative pour minimiser l'interruption professionnelle.",
        },
        {
          label: 'Familles',
          body: "Les familles qui s'installent à Montréal jonglent avec les écoles, les services de garde, la proximité du travail et le budget. Jeremy cartographie les quartiers en fonction de vos priorités concrètes — pas d'une liste générique.",
        },
        {
          label: 'Expatriés et nouveaux arrivants',
          body: "Arriver dans une nouvelle ville sans réseau est difficile. Jeremy offre un accompagnement complet : quartiers, processus d'achat québécois, compte bancaire, assurance, notaire. Tout ce que personne ne vous dit avant d'arriver.",
        },
        {
          label: 'Étudiants et jeunes professionnels',
          body: "Montréal est l'une des villes universitaires les plus abordables d'Amérique du Nord. Jeremy aide les étudiants et jeunes professionnels à trouver la bonne location — emplacement, bail, colocataires — sans se faire rouler.",
        },
      ]
    : [
        {
          label: 'Corporate transfers',
          body: "Employees relocated by their company from Toronto, Vancouver, or internationally. Tight timelines, precise requirements. Jeremy coordinates the search, tours, and administrative logistics to minimise professional disruption.",
        },
        {
          label: 'Families',
          body: "Families moving to Montreal juggle schools, daycare, work proximity, and budget. Jeremy maps neighbourhoods against your actual priorities — not a generic list.",
        },
        {
          label: 'Expats & newcomers',
          body: "Arriving in a new city without a network is difficult. Jeremy provides full accompaniment: neighbourhoods, the Quebec buying process, bank account, insurance, notary. Everything no one tells you before you arrive.",
        },
        {
          label: 'Students & young professionals',
          body: "Montreal is one of the most affordable university cities in North America. Jeremy helps students and young professionals find the right rental — location, lease terms, roommates — without getting burned.",
        },
      ]

  const approach = isFr
    ? [
        { number: '01', title: 'Appel de qualification', body: "Budget, délai, quartiers cibles, achat vs location. 30 minutes qui permettent à Jeremy de préparer une recherche ciblée — pas de visites perdues sur des propriétés non adaptées." },
        { number: '02', title: 'Cartographie des quartiers', body: "Jeremy présente une analyse personnalisée des quartiers en fonction de vos contraintes : école francophone vs anglophone, temps de trajet, densité commerciale, budget. En personne ou en visioconférence depuis votre ville actuelle." },
        { number: '03', title: 'Visites ciblées', body: "Présélection rigoureuse. Pour une relocalisation longue distance, Jeremy fait des prévisites vidéo pour filtrer avant votre déplacement. Chaque visite est documentée avec photos, notes et analyse comparative." },
        { number: '04', title: "De l'offre aux clés", body: "Négociation de l'offre ou du bail, coordination avec le notaire ou le propriétaire, suivi des conditions, remise des clés. Jeremy reste disponible après la transaction pour les questions d'installation." },
      ]
    : [
        { number: '01', title: 'Qualification call', body: "Budget, timeline, target neighbourhoods, buy vs rent. 30 minutes that allow Jeremy to prepare a targeted search — no wasted visits on unsuitable properties." },
        { number: '02', title: 'Neighbourhood mapping', body: "Jeremy presents a personalised neighbourhood analysis based on your constraints: French vs English school, commute time, commercial density, budget. In person or via video call from your current city." },
        { number: '03', title: 'Targeted tours', body: "Rigorous shortlisting. For long-distance relocation, Jeremy does video pre-visits to filter before your trip. Every visit is documented with photos, notes, and comparative analysis." },
        { number: '04', title: 'Offer to keys', body: "Offer or lease negotiation, coordination with the notary or landlord, condition follow-up, key handover. Jeremy remains available post-transaction for settling-in questions." },
      ]

  const neighbourhoods = isFr
    ? [
        { name: 'Plateau-Mont-Royal', desc: "Cafés, boutiques, vie de quartier intense. Idéal pour les jeunes professionnels et les familles cultivées." },
        { name: 'Outremont', desc: "Calme, verdure, écoles francophones réputées. Référence pour les familles établies." },
        { name: 'Griffintown', desc: "Développement récent, accès au centre-ville à pied, population jeune. Fort inventaire de condos neufs." },
        { name: 'Verdun', desc: "Abordable, riverain, en forte valorisation. Meilleur rapport qualité-prix de Montréal pour les primo-accédants." },
        { name: 'NDG / Notre-Dame-de-Grâce', desc: "Maisons familiales, bilingue naturellement, proche de l'Université McGill et de l'Université de Montréal." },
        { name: 'Westmount', desc: "Prestige, maisons victorieuses, écoles privées. Le choix premium pour familles et dirigeants relocalisés." },
      ]
    : [
        { name: 'Plateau-Mont-Royal', desc: "Cafés, boutiques, intense neighbourhood life. Ideal for young professionals and creative families." },
        { name: 'Outremont', desc: "Quiet, green, reputed French schools. The reference for established families." },
        { name: 'Griffintown', desc: "Recent development, walkable downtown access, young population. Strong inventory of new condos." },
        { name: 'Verdun', desc: "Affordable, riverside, rapidly appreciating. Best value-for-money in Montreal for first-time buyers." },
        { name: 'NDG / Notre-Dame-de-Grâce', desc: "Family homes, naturally bilingual, close to McGill and Université de Montréal." },
        { name: 'Westmount', desc: "Prestige, Victorian homes, private schools. The premium choice for families and relocated executives." },
      ]

  return (
    <>
      <RelocationJsonLd locale={locale} />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <Section theme="void" className="pt-32 pb-20 md:pt-44 md:pb-28">
        <Container size="lg">
          <Label className="mb-8">
            {isFr ? '(Services) — Relocalisation' : '(Services) — Relocation'}
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
              {isFr ? 'Relocalisation' : 'Relocation'}
            </TextReveal>
          </div>

          <SectionReveal delay={0.3} className="mt-5">
            <p
              className="text-[var(--color-cream)] opacity-35"
              style={{ fontFamily: FONT_DM_SERIF, fontStyle: 'italic', fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}
            >
              {isFr
                ? "De la première visite à la remise des clés. Bilingue tout au long."
                : 'From first visit to key handover. Bilingual throughout.'}
            </p>
          </SectionReveal>

          <SectionReveal delay={0.45} className="mt-4 max-w-xl">
            <p
              className="text-[var(--color-cream)] opacity-45 leading-relaxed"
              style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
            >
              {isFr
                ? "Déménager à Montréal est une décision importante. Jeremy s'assure que vous atterrissez dans le bon quartier, la bonne propriété, dans les bons délais — achat ou location."
                : "Moving to Montreal is a significant decision. Jeremy ensures you land in the right neighbourhood, the right property, on the right timeline — whether buying or renting."}
            </p>
          </SectionReveal>
        </Container>
      </Section>

      {/* ── Who Uses This Service ────────────────────────────────────────── */}
      <Section theme="cream" className="py-24 md:py-32 relative overflow-hidden">
        <Container size="lg">
          <Label className="mb-10">
            {isFr ? '(Qui utilise ce service)' : '(Who Uses This Service)'}
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
              {isFr ? 'Qui Jeremy accompagne' : 'Who Jeremy accompanies'}
            </TextReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-l border-[rgba(14,16,17,0.08)]">
            {profiles.map((p, i) => (
              <SectionReveal key={i} delay={i * 0.08}>
                <div className="p-8 md:p-10 border-b border-r border-[rgba(14,16,17,0.08)]">
                  <p
                    className="uppercase text-[var(--color-void)] opacity-35 mb-4"
                    style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em', fontWeight: 500 }}
                  >
                    {p.label}
                  </p>
                  <p
                    className="text-[var(--color-void)] opacity-55 leading-relaxed"
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

      {/* ── Jeremy's Approach ───────────────────────────────────────────── */}
      <Section theme="void" className="py-24 md:py-36">
        <Container size="lg">
          <Label className="mb-10">
            {isFr ? "(L'approche)" : '(The Approach)'}
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
              {isFr ? 'Comment Jeremy travaille' : "How Jeremy works"}
            </TextReveal>
          </div>

          <div className="border-t border-[rgba(236,234,229,0.08)]">
            {approach.map((step, i) => (
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

      {/* ── Neighbourhoods Overview ──────────────────────────────────────── */}
      <Section theme="cream" className="py-24 md:py-32 relative overflow-hidden">
        <Container size="lg">
          <Label className="mb-10">
            {isFr ? '(Quartiers)' : '(Neighbourhoods)'}
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
              {isFr ? 'Trouver votre quartier' : 'Finding your neighbourhood'}
            </TextReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-[rgba(14,16,17,0.08)]">
            {neighbourhoods.map((n, i) => (
              <SectionReveal key={i} delay={i * 0.06}>
                <div className="p-8 border-b border-r border-[rgba(14,16,17,0.08)]">
                  <h3
                    className="text-[var(--color-void)] mb-3"
                    style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}
                  >
                    {n.name}
                  </h3>
                  <p
                    className="text-[var(--color-void)] opacity-50 leading-relaxed"
                    style={{ fontFamily: FONT_DM_SANS, fontSize: '0.875rem' }}
                  >
                    {n.desc}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.2} className="mt-8">
            <Button variant="ghost" theme="light" href={`/${locale}/neighborhoods`} size="sm">
              {isFr ? 'Explorer tous les quartiers' : 'Explore all neighbourhoods'}
            </Button>
          </SectionReveal>
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
                  {isFr ? '— Votre arrivée à Montréal' : '— Your arrival in Montreal'}
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
                  {isFr ? 'Parlons de votre projet' : 'Tell me about your move'}
                </TextReveal>
              </div>

              <SectionReveal delay={0.2} className="mt-6 max-w-md">
                <p
                  className="text-[var(--color-cream)] opacity-40 leading-relaxed"
                  style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                >
                  {isFr
                    ? "Partagez votre date d'arrivée, votre budget et vos priorités. Jeremy prépare un plan de recherche personnalisé et reste disponible à chaque étape de votre installation."
                    : "Share your arrival date, budget, and priorities. Jeremy prepares a personalised search plan and remains available at every step of your settling-in process."}
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
