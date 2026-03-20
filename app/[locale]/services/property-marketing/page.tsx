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
  const canonical = `${SITE_URL}/${locale}/services/property-marketing`

  return {
    title: isFr
      ? 'Marketing Immobilier Montréal | Mise en Scène IA, 14K Courtiers — Jeremy Soares'
      : 'Property Marketing Montreal | AI Staging, 14K Brokers — Jeremy Soares',
    description: isFr
      ? "Marketing immobilier premium à Montréal : photographie professionnelle, mise en scène virtuelle par IA via aimmo, pages d'annonce dédiées et diffusion à 14 000 courtiers québécois. OACIQ H2731."
      : 'Premium property marketing in Montreal: professional photography, AI virtual staging via aimmo, dedicated listing pages, and email reach to 14,000 Quebec brokers. OACIQ broker H2731.',
    keywords: isFr
      ? ['marketing immobilier Montréal', 'mise en scène virtuelle IA Montréal', 'aimmo mise en scène', 'vendre propriété Montréal', 'courtier marketing Montréal', 'Jeremy Soares']
      : ['property marketing Montreal', 'AI virtual staging Montreal', 'aimmo staging', 'sell property Montreal', 'listing broker Montreal', 'Jeremy Soares'],
    alternates: {
      canonical,
      languages: {
        'en-CA': `${SITE_URL}/en-ca/services/property-marketing`,
        'fr-CA': `${SITE_URL}/fr-ca/services/property-marketing`,
      },
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title: isFr
        ? 'Marketing Immobilier Montréal — Jeremy Soares'
        : 'Property Marketing Montreal — Jeremy Soares',
      description: isFr
        ? "Chaque propriété positionnée comme une marque — visuels, texte, stratégie de diffusion."
        : 'Every listing treated as a brand launch — visuals, copy, distribution strategy.',
    },
  }
}

function PropertyMarketingJsonLd({ locale }: { locale: string }) {
  const isFr = locale === 'fr-ca'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/${locale}/services/property-marketing`,
    name: isFr ? 'Marketing Immobilier Montréal' : 'Property Marketing Montreal',
    description: isFr
      ? "Stratégie complète de commercialisation immobilière : photographie professionnelle, mise en scène virtuelle par IA, pages d'inscription dédiées et campagnes courriel à 14 000 courtiers."
      : 'Complete property marketing strategy: professional photography, AI virtual staging, dedicated listing pages, and email campaigns to 14,000 brokers.',
    url: `${SITE_URL}/${locale}/services/property-marketing`,
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

export default async function PropertyMarketingPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr-ca'

  const stack = isFr
    ? [
        {
          number: '01',
          title: 'Photographie professionnelle',
          body: "Chaque propriété est photographiée par des photographes immobiliers spécialisés. Lumière naturelle maximisée, composition architecturale soignée. Les premiers visuels déterminent le taux de clics — et le profil d'acheteur attiré.",
        },
        {
          number: '02',
          title: 'Mise en scène virtuelle IA via aimmo',
          body: "aimmo, la plateforme de mise en scène par intelligence artificielle cofondée par Jeremy, transforme les espaces vides ou datés en environnements meublés photoréalistes en quelques heures. Les acheteurs visualisent le potentiel — pas l'état actuel.",
        },
        {
          number: '03',
          title: 'Pages d\'inscription dédiées',
          body: "Chaque propriété reçoit sa propre page de présentation optimisée pour le référencement, avec galerie photos HD, description rédigée par des rédacteurs immobiliers bilingues et formulaire de demande intégré. Disponible en anglais et en français.",
        },
        {
          number: '04',
          title: 'Campagnes courriel — 14 000 courtiers',
          body: "Jeremy diffuse chaque nouvelle inscription à son réseau de 14 000 courtiers québécois via des campagnes courriel ciblées. Le premier jour de mise en marché est le plus puissant — ce réseau maximise la visibilité immédiate.",
        },
        {
          number: '05',
          title: 'Médias sociaux et portails',
          body: "Diffusion sur Centris, Realtor.ca, plus les plateformes sociales adaptées au profil de la propriété. Contenu vidéo, reels et stories créés pour amplifier la portée organique et cibler les acheteurs correspondant au profil démographique.",
        },
      ]
    : [
        {
          number: '01',
          title: 'Professional photography',
          body: "Every property is photographed by specialist real estate photographers. Maximised natural light, considered architectural composition. The first visuals determine click-through rates — and the buyer profile attracted.",
        },
        {
          number: '02',
          title: 'AI virtual staging via aimmo',
          body: "aimmo, the AI staging platform co-founded by Jeremy, transforms vacant or dated spaces into photorealistic furnished environments within hours. Buyers visualise the potential — not the current state.",
        },
        {
          number: '03',
          title: 'Dedicated listing pages',
          body: "Every property receives its own SEO-optimised presentation page with HD photo gallery, copy written by bilingual real estate copywriters, and an integrated inquiry form. Available in English and French.",
        },
        {
          number: '04',
          title: 'Email campaigns — 14,000 brokers',
          body: "Jeremy distributes every new listing to his network of 14,000 Quebec brokers via targeted email campaigns. The first day on market is the most powerful — this network maximises immediate visibility.",
        },
        {
          number: '05',
          title: 'Social media & portals',
          body: "Distribution across Centris, Realtor.ca, plus social platforms matched to the property profile. Video content, reels, and stories created to amplify organic reach and target buyers matching the demographic profile.",
        },
      ]

  const results = isFr
    ? [
        { value: '14K', label: 'Courtiers rejoints par campagne courriel' },
        { value: '50+', label: 'Domaines immobiliers dans le réseau' },
        { value: '2h', label: 'Délai pour mise en scène IA via aimmo' },
        { value: 'EN/FR', label: 'Toutes les annonces bilingues' },
      ]
    : [
        { value: '14K', label: 'Brokers reached per email campaign' },
        { value: '50+', label: 'Real estate domains in the network' },
        { value: '2h', label: 'Turnaround for AI staging via aimmo' },
        { value: 'EN/FR', label: 'All listings fully bilingual' },
      ]

  return (
    <>
      <PropertyMarketingJsonLd locale={locale} />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <Section theme="void" className="pt-32 pb-20 md:pt-44 md:pb-28">
        <Container size="lg">
          <Label className="mb-8">
            {isFr ? '(Services) — Marketing' : '(Services) — Marketing'}
          </Label>

          <div
            style={{
              fontFamily: FONT_BARLOW,
              fontWeight: 900,
              fontSize: 'clamp(3rem, 9vw, 7.5rem)',
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
              {isFr ? 'Marketing\nImmobilier' : 'Property\nMarketing'}
            </TextReveal>
          </div>

          <SectionReveal delay={0.3} className="mt-5">
            <p
              className="text-[var(--color-cream)] opacity-35"
              style={{ fontFamily: FONT_DM_SERIF, fontStyle: 'italic', fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}
            >
              {isFr
                ? "Chaque propriété positionnée comme une marque. Chaque lancement orchestré."
                : 'Every property positioned as a brand. Every launch orchestrated.'}
            </p>
          </SectionReveal>

          <SectionReveal delay={0.45} className="mt-4 max-w-xl">
            <p
              className="text-[var(--color-cream)] opacity-45 leading-relaxed"
              style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
            >
              {isFr
                ? "La différence entre une propriété qui se vend en deux semaines et une qui stagne pendant deux mois n'est pas le prix. C'est la façon dont elle est présentée."
                : "The difference between a property that sells in two weeks and one that lingers for two months is not the price. It is how the property is presented."}
            </p>
          </SectionReveal>
        </Container>
      </Section>

      {/* ── The Marketing Stack ─────────────────────────────────────────── */}
      <Section theme="cream" className="py-24 md:py-32 relative overflow-hidden">
        <Container size="lg">
          <Label className="mb-10">
            {isFr ? '(La pile marketing)' : '(The Marketing Stack)'}
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
              {isFr ? 'Cinq leviers. Un résultat.' : 'Five levers. One outcome.'}
            </TextReveal>
          </div>

          <div className="border-t" style={{ borderColor: 'rgba(14,16,17,0.1)' }}>
            {stack.map((item, i) => (
              <SectionReveal key={item.number} delay={i * 0.08}>
                <div
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 py-10 border-b"
                  style={{ borderColor: 'rgba(14,16,17,0.1)' }}
                >
                  <div className="md:col-span-1 flex items-start pt-1">
                    <span
                      className="uppercase text-[var(--color-void)] opacity-25"
                      style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em', fontWeight: 500 }}
                    >
                      {item.number}
                    </span>
                  </div>
                  <div className="md:col-span-4">
                    <h3
                      className="text-[var(--color-void)] leading-tight"
                      style={{ fontFamily: FONT_DM_SERIF, fontStyle: 'italic', fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)' }}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <div className="md:col-span-7">
                    <p
                      className="text-[var(--color-void)] opacity-55 leading-relaxed"
                      style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                    >
                      {item.body}
                    </p>
                    {item.number === '02' && (
                      <a
                        href="https://aimmo.ca"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-4 uppercase text-[var(--color-void)] opacity-40 hover:opacity-80 transition-opacity duration-200"
                        style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.18em', fontWeight: 500 }}
                      >
                        aimmo.ca <span aria-hidden="true" className="text-[0.6rem]">↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Results / Stat band ──────────────────────────────────────────── */}
      <Section theme="void" className="py-20 md:py-28">
        <Container size="lg">
          <Label className="mb-12">
            {isFr ? '(Résultats)' : '(Results)'}
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {results.map((r, i) => (
              <SectionReveal key={i} delay={i * 0.08}>
                <div>
                  <p
                    className="text-[var(--color-cream)]"
                    style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.02em' }}
                  >
                    {r.value}
                  </p>
                  <p
                    className="mt-2 uppercase text-[var(--color-cream)] opacity-35"
                    style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em' }}
                  >
                    {r.label}
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
                  {isFr ? '— Vendre votre propriété' : '— Sell your property'}
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
                  {isFr ? 'Votre propriété mérite mieux' : 'Your property deserves more'}
                </TextReveal>
              </div>

              <SectionReveal delay={0.2} className="mt-6 max-w-md">
                <p
                  className="text-[var(--color-void)] opacity-40 leading-relaxed"
                  style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                >
                  {isFr
                    ? "Une présentation professionnelle n'est pas un luxe — c'est ce qui détermine votre prix de vente final. Discutons de votre propriété."
                    : "Professional presentation is not a luxury — it determines your final sale price. Let's discuss your property."}
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
