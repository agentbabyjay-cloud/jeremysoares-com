import type { Metadata } from 'next'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Label } from '@/components/ui/Label'
import { TextReveal } from '@/components/animation/TextReveal'
import { SectionReveal } from '@/components/animation/SectionReveal'
import { Button } from '@/components/ui/Button'

const SITE_URL = 'https://jeremysoares.com'
const FONT_BARLOW = `var(--font-barlow), 'Barlow', sans-serif`
const FONT_DM_SANS = `var(--font-dm-sans), 'DM Sans', sans-serif`

export async function generateStaticParams() {
  return [{ locale: 'en-ca' }, { locale: 'fr-ca' }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale === 'fr-ca'
  return {
    title: isFr
      ? 'Acheter une Maison à Montréal | Courtier Acheteur — Jeremy Soares OACIQ H2731'
      : "Buy a Home in Montreal | Buyer's Broker — Jeremy Soares OACIQ H2731",
    description: isFr
      ? 'Représentation acheteur à Montréal. Votre courtier OACIQ H2731 vous accompagne de la recherche à la signature — vos intérêts, pleinement protégés. Consultation gratuite.'
      : 'Expert buyer representation in Montreal. Your OACIQ H2731 broker guides you from search to signing — your interests, fully protected. Free consultation.',
    keywords: isFr
      ? ['acheter maison montréal', 'courtier acheteur montréal', 'représentation acheteur', 'OACIQ H2731', 'immobilier montréal', 'acheter condo montréal']
      : ['buy home montreal', 'buyer broker montreal', 'buyer representation montreal', 'OACIQ H2731', 'montreal real estate', 'buy condo montreal'],
    alternates: {
      canonical: `${SITE_URL}/${locale}/buy`,
      languages: {
        'en-CA': `${SITE_URL}/en-ca/buy`,
        'fr-CA': `${SITE_URL}/fr-ca/buy`,
      },
    },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}/${locale}/buy`,
      title: isFr ? 'Acheter à Montréal — Jeremy Soares' : 'Buy in Montréal — Jeremy Soares',
      description: isFr
        ? 'Votre courtier acheteur à Montréal. OACIQ H2731.'
        : 'Your buyer broker in Montreal. OACIQ H2731.',
      siteName: 'Jeremy Soares',
    },
    robots: { index: true, follow: true },
  }
}

export default async function BuyPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr-ca'

  const steps = isFr
    ? [
        { num: '01', title: 'Consultation gratuite', desc: "On commence par comprendre ce que vous cherchez — budget, quartier, style de vie. Aucune obligation." },
        { num: '02', title: 'Recherche ciblée', desc: "Accès complet au MLS, alertes personnalisées et propriétés hors marché via notre réseau." },
        { num: '03', title: 'Visites & analyse', desc: "Accompagnement lors des visites avec une évaluation objective de chaque propriété." },
        { num: '04', title: 'Offre stratégique', desc: "Rédaction d'une offre compétitive, négociation et protection de vos conditions." },
        { num: '05', title: 'Clôture sans stress', desc: "Coordination notariale, inspections, financement — on gère tout jusqu'aux clés." },
      ]
    : [
        { num: '01', title: 'Free Consultation', desc: "We start by understanding what you need — budget, neighbourhood, lifestyle. No obligation, no pressure." },
        { num: '02', title: 'Targeted Search', desc: "Full MLS access, personalized alerts, and off-market properties through our network." },
        { num: '03', title: 'Visits & Analysis', desc: "Accompanied visits with an honest, objective assessment of every property." },
        { num: '04', title: 'Strategic Offer', desc: "A competitive, well-structured offer and skilled negotiation to protect your conditions." },
        { num: '05', title: 'Stress-Free Closing', desc: "Notarial coordination, inspections, financing — we handle everything through to the keys." },
      ]

  const neighbourhoods = isFr
    ? [
        { name: 'Plateau-Mont-Royal', tag: 'Culturel', desc: 'Duplexes, triplexes et condos dans le cœur culturel de Montréal.' },
        { name: 'Mile-End', tag: 'Branché', desc: 'Immobilier diversifié, vie de quartier unique et communauté artistique.' },
        { name: 'Outremont', tag: 'Prestigieux', desc: 'Maisons unifamiliales et condos de luxe dans un cadre verdoyant.' },
        { name: 'NDG', tag: 'Familial', desc: 'Grandes maisons, excellentes écoles et bon rapport qualité-prix.' },
        { name: 'Rosemont', tag: 'Montée en flèche', desc: 'Propriétés abordables dans un quartier en plein essor.' },
        { name: 'Westmount', tag: 'Premium', desc: "Immobilier haut de gamme, prestige et architecture remarquable." },
      ]
    : [
        { name: 'Plateau-Mont-Royal', tag: 'Cultural', desc: 'Duplexes, triplexes, and condos in the cultural heart of the city.' },
        { name: 'Mile-End', tag: 'Creative', desc: 'Diverse property mix, vibrant street life, and an artistic community.' },
        { name: 'Outremont', tag: 'Prestigious', desc: 'Prestigious single-family homes and luxury condos in a leafy setting.' },
        { name: 'NDG', tag: 'Family', desc: 'Generous homes, top schools, and strong long-term value.' },
        { name: 'Rosemont', tag: 'Up & Coming', desc: 'Affordable properties in a rapidly growing, sought-after neighbourhood.' },
        { name: 'Westmount', tag: 'Premium', desc: 'Premium real estate — prestige, architecture, and unbeatable location.' },
      ]

  const whys = isFr
    ? [
        { title: 'Représentation exclusive', body: "Comme acheteur, vous bénéficiez d'une représentation légale complète sous la loi OACIQ. Je travaille exclusivement pour vous — jamais pour le vendeur." },
        { title: 'Accès hors marché', body: "En 10+ ans à Montréal, j'ai développé un réseau qui donne accès à des propriétés avant même qu'elles soient listées." },
        { title: 'Analyse de marché complète', body: "Chaque propriété est analysée avec des données de ventes comparables, pour que vous sachiez exactement si le prix est juste." },
        { title: 'Pas de conflit d\'intérêts', body: "Je ne représente jamais vendeur et acheteur dans la même transaction. Vos intérêts passent toujours en premier." },
      ]
    : [
        { title: 'Full Buyer Representation', body: "As a buyer, you get complete legal representation under OACIQ law. I work exclusively for you — never for the seller." },
        { title: 'Off-Market Access', body: "10+ years in Montreal means a network that surfaces properties before they hit the market." },
        { title: 'Real Market Analysis', body: "Every property is backed by comparable sales data, so you always know if a price is fair." },
        { title: 'No Conflicts of Interest', body: "I never represent both buyer and seller in the same transaction. Your interests always come first." },
      ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: isFr ? 'Représentation Acheteur — Jeremy Soares' : 'Buyer Representation — Jeremy Soares',
    description: isFr
      ? 'Représentation acheteur experte à Montréal. OACIQ H2731.'
      : 'Expert buyer representation in Montreal. OACIQ H2731.',
    url: `${SITE_URL}/${locale}/buy`,
    provider: { '@type': 'RealEstateAgent', name: 'Jeremy Soares', url: SITE_URL, telephone: '+15145198177' },
    areaServed: { '@type': 'City', name: 'Montréal' },
    serviceType: isFr ? 'Représentation Acheteur' : 'Buyer Representation',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <Section theme="void" className="pt-32 pb-20 md:pt-44 md:pb-24">
        <Container size="lg">
          <Label className="mb-6">{isFr ? '(Acheteurs)' : '(Buyers)'}</Label>
          <TextReveal
            as="h1"
            split="words"
            immediate
            delay={0.15}
            className="text-[clamp(3rem,7vw,6rem)] font-black leading-none tracking-tight text-[#eceae5] uppercase"
            style={{ fontFamily: FONT_BARLOW }}
          >
            {isFr ? 'Acheter\nà Montréal' : 'Buy in\nMontréal'}
          </TextReveal>
          <SectionReveal delay={0.35} className="mt-8 max-w-lg">
            <p className="text-[1rem] text-[#eceae5] opacity-50 leading-relaxed">
              {isFr
                ? "Vous méritez un courtier qui travaille exclusivement pour vous — pas pour la transaction. Je vous trouve la bonne propriété, au bon prix, dans les meilleures conditions."
                : "You deserve a broker who works exclusively for you — not for the deal. I find you the right property, at the right price, with the best conditions."}
            </p>
          </SectionReveal>
          <SectionReveal delay={0.5} className="mt-8 flex flex-wrap gap-4">
            <Button variant="primary" theme="dark" href={`/${locale}/contact`} size="lg">
              {isFr ? 'Consultation gratuite' : 'Free Consultation'}
            </Button>
            <Button variant="ghost" theme="dark" href={`tel:+15145198177`} size="lg">
              514 519-8177
            </Button>
          </SectionReveal>
          <SectionReveal delay={0.6} className="mt-10">
            <p className="text-[0.625rem] tracking-[0.2em] uppercase text-[#eceae5] opacity-25" style={{ fontFamily: FONT_DM_SANS }}>
              OACIQ H2731 &nbsp;·&nbsp; {isFr ? 'Courtier licencié au Québec' : 'Licensed broker in Québec'}
            </p>
          </SectionReveal>
        </Container>
      </Section>

      {/* Hero Image */}
      <img
        src="/images/buy-sell-rent/interior-1.jpg"
        alt={isFr ? 'Maison moderne à Montréal — Jeremy Soares courtier acheteur' : 'Modern home in Montréal — Jeremy Soares buyer broker'}
        style={{ width: '100%', height: '55vh', objectFit: 'cover', display: 'block' }}
      />

      {/* Why Buy With Jeremy */}
      <Section theme="cream" className="py-24 md:py-32">
        <Container size="lg">
          <Label theme="light" className="mb-8">{isFr ? '(Pourquoi choisir Jeremy)' : '(Why Jeremy)'}</Label>
          <TextReveal
            as="h2"
            split="words"
            className="text-[clamp(2rem,4vw,3.25rem)] font-black leading-none tracking-tight text-[#0e1011] uppercase mb-16"
            style={{ fontFamily: FONT_BARLOW }}
          >
            {isFr ? 'Votre achat,\nma priorité' : 'Your purchase,\nmy priority'}
          </TextReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {whys.map((item, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div className="border-t border-[rgba(14,16,17,0.1)] pt-6">
                  <h3
                    className="text-[1.1rem] font-black tracking-tight text-[#0e1011] uppercase mb-3"
                    style={{ fontFamily: FONT_BARLOW }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[0.875rem] text-[#0e1011] opacity-60 leading-relaxed" style={{ fontFamily: FONT_DM_SANS }}>
                    {item.body}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section theme="void" className="py-24 md:py-32">
        <Container size="lg">
          <Label className="mb-8">{isFr ? '(Comment ça marche)' : '(How It Works)'}</Label>
          <TextReveal
            as="h2"
            split="words"
            className="text-[clamp(2rem,4vw,3.25rem)] font-black leading-none tracking-tight text-[#eceae5] uppercase mb-16"
            style={{ fontFamily: FONT_BARLOW }}
          >
            {isFr ? 'De la recherche\naux clés' : 'From search\nto keys'}
          </TextReveal>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {steps.map((step) => (
              <SectionReveal key={step.num}>
                <div className="border-t border-[rgba(236,234,229,0.1)] pt-5">
                  <span className="text-[0.625rem] tracking-[0.22em] uppercase text-[#eceae5] opacity-25 font-bold" style={{ fontFamily: FONT_DM_SANS }}>{step.num}</span>
                  <h3 className="text-[1rem] font-black tracking-tight text-[#eceae5] uppercase mt-3 mb-2" style={{ fontFamily: FONT_BARLOW }}>{step.title}</h3>
                  <p className="text-[0.75rem] text-[#eceae5] opacity-50 leading-relaxed" style={{ fontFamily: FONT_DM_SANS }}>{step.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Meet Jeremy */}
      <Section theme="cream" className="py-24 md:py-32">
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <img
                src="/images/headshots/jeremy-soares.jpg"
                alt={isFr ? 'Jeremy Soares — courtier immobilier Montréal OACIQ H2731' : 'Jeremy Soares — Montreal real estate broker OACIQ H2731'}
                style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', objectPosition: 'top' }}
              />
            </SectionReveal>
            <SectionReveal delay={0.15}>
              <Label theme="light" className="mb-4">{isFr ? '(Votre courtier)' : '(Your Broker)'}</Label>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-black leading-none tracking-tight text-[#0e1011] uppercase mb-6" style={{ fontFamily: FONT_BARLOW }}>
                Jeremy Soares
              </h2>
              <p className="text-[0.9375rem] text-[#0e1011] opacity-65 leading-relaxed mb-4" style={{ fontFamily: FONT_DM_SANS }}>
                {isFr
                  ? "Courtier immobilier licencié au Québec depuis plus de 10 ans, spécialisé dans la représentation acheteur à Montréal. Bilingue, direct et sans pression — mon rôle est de vous protéger dans l'une des plus grandes décisions financières de votre vie."
                  : "Licensed real estate broker in Québec for 10+ years, specializing in buyer representation across Montreal. Bilingual, direct, and pressure-free — my job is to protect you through one of the biggest financial decisions of your life."}
              </p>
              <p className="text-[0.9375rem] text-[#0e1011] opacity-65 leading-relaxed mb-8" style={{ fontFamily: FONT_DM_SANS }}>
                {isFr
                  ? "Je connais chaque quartier, chaque micro-marché et chaque subtilité de la négociation montréalaise. Quand vous achetez avec moi, vous avez un avocat de vos intérêts à chaque étape."
                  : "I know every neighbourhood, every micro-market, and every nuance of Montreal negotiation. When you buy with me, you have a full advocate at every step."}
              </p>
              <Button variant="primary" theme="light" href={`/${locale}/contact`} size="lg">
                {isFr ? 'Parler à Jeremy' : 'Talk to Jeremy'}
              </Button>
              <p className="text-[0.625rem] tracking-[0.18em] uppercase text-[#0e1011] opacity-30 mt-4" style={{ fontFamily: FONT_DM_SANS }}>
                OACIQ H2731 &nbsp;·&nbsp; {isFr ? 'Québec' : 'Québec'}
              </p>
            </SectionReveal>
          </div>
        </Container>
      </Section>

      {/* Neighbourhoods */}
      <Section theme="void" className="py-24 md:py-32">
        <Container size="lg">
          <Label className="mb-8">{isFr ? '(Quartiers)' : '(Neighbourhoods)'}</Label>
          <TextReveal
            as="h2"
            split="words"
            className="text-[clamp(2rem,4vw,3.25rem)] font-black leading-none tracking-tight text-[#eceae5] uppercase mb-12"
            style={{ fontFamily: FONT_BARLOW }}
          >
            {isFr ? 'Où voulez-vous\nhabiter?' : 'Where do you\nwant to live?'}
          </TextReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {neighbourhoods.map((n, i) => (
              <SectionReveal key={i} delay={i * 0.07}>
                <div className="border-t border-[rgba(236,234,229,0.1)] py-6 pr-8">
                  <div className="flex items-baseline gap-3 mb-2">
                    <h3 className="text-[1rem] font-black tracking-tight text-[#eceae5] uppercase" style={{ fontFamily: FONT_BARLOW }}>{n.name}</h3>
                    <span className="text-[0.5rem] tracking-[0.18em] uppercase text-[#f55f00] font-bold" style={{ fontFamily: FONT_DM_SANS }}>{n.tag}</span>
                  </div>
                  <p className="text-[0.75rem] text-[#eceae5] opacity-45 leading-relaxed" style={{ fontFamily: FONT_DM_SANS }}>{n.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section theme="cream" className="py-24 md:py-32">
        <Container size="sm" className="text-center">
          <TextReveal
            as="h2"
            split="words"
            className="text-[clamp(2.5rem,5vw,4rem)] font-black leading-tight tracking-tight text-[#0e1011] uppercase mb-4"
            style={{ fontFamily: FONT_BARLOW }}
          >
            {isFr ? 'Prêt à acheter?' : 'Ready to buy?'}
          </TextReveal>
          <SectionReveal delay={0.2}>
            <p className="text-[0.9375rem] text-[#0e1011] opacity-55 leading-relaxed max-w-sm mx-auto mb-8" style={{ fontFamily: FONT_DM_SANS }}>
              {isFr
                ? "Consultation gratuite — sans engagement. On discute de vos besoins et je vous explique comment je travaille."
                : "Free consultation — no commitment. We talk through your needs and I explain exactly how I work."}
            </p>
          </SectionReveal>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="primary" theme="light" href={`/${locale}/contact`} size="lg">
              {isFr ? 'Démarrer ma recherche' : 'Start My Search'}
            </Button>
            <Button variant="ghost" theme="light" href={`tel:+15145198177`} size="lg">
              514 519-8177
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
