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
  const canonical = `${SITE_URL}/${locale}/services/website-building`

  return {
    title: isFr
      ? 'Création de Sites Web pour PME Montréal | SEO, IA, CRM — Jeremy Soares'
      : 'Website Building for Small Business Montreal | SEO, AI, CRM — Jeremy Soares',
    description: isFr
      ? "Sites web performants pour petites entreprises à Montréal. Référencement SEO avancé, intégration IA, CRM, automatisation marketing et architecture moderne. Résultats mesurables."
      : 'High-performance websites for small businesses in Montreal. Advanced SEO, AI integration, CRM, marketing automation, and modern architecture. Measurable results.',
    keywords: isFr
      ? ['création site web Montréal', 'site web PME Montréal', 'SEO Montréal', 'intégration IA site web', 'CRM petite entreprise', 'automatisation marketing Montréal', 'Jeremy Soares']
      : ['website building Montreal', 'small business website Montreal', 'SEO Montreal', 'AI website integration', 'small business CRM', 'marketing automation Montreal', 'Jeremy Soares'],
    alternates: {
      canonical,
      languages: {
        'en-CA': `${SITE_URL}/en-ca/services/website-building`,
        'fr-CA': `${SITE_URL}/fr-ca/services/website-building`,
      },
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title: isFr
        ? 'Création de Sites Web pour PME — Jeremy Soares'
        : 'Website Building for Small Business — Jeremy Soares',
      description: isFr
        ? "Sites web modernes, rapides et optimisés pour les petites entreprises qui veulent croître."
        : 'Modern, fast, optimised websites for small businesses ready to grow.',
    },
  }
}

function WebsiteBuildingJsonLd({ locale }: { locale: string }) {
  const isFr = locale === 'fr-ca'

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/${locale}/services/website-building`,
    name: isFr ? 'Création de Sites Web pour PME' : 'Website Building for Small Business',
    description: isFr
      ? "Conception et développement de sites web performants pour petites entreprises : SEO avancé, intégration IA, CRM et automatisation marketing."
      : 'Design and development of high-performance websites for small businesses: advanced SEO, AI integration, CRM, and marketing automation.',
    url: `${SITE_URL}/${locale}/services/website-building`,
    provider: {
      '@type': 'ProfessionalService',
      name: 'Soares Agency',
      telephone: '+15145198177',
      address: { '@type': 'PostalAddress', addressLocality: 'Montreal', addressRegion: 'QC', addressCountry: 'CA' },
    },
    areaServed: { '@type': 'City', name: 'Montreal', '@id': 'https://www.wikidata.org/wiki/Q340' },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: isFr ? 'Combien coûte un site web pour PME ?' : 'How much does a small business website cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isFr
            ? "Chaque projet est sur mesure. Les sites vitrines démarrent à partir de quelques milliers de dollars, les plateformes avec CRM et automatisation IA sont tarifées selon la complexité. Contactez-nous pour un devis précis."
            : 'Every project is custom. Brochure sites start from a few thousand dollars; platforms with CRM and AI automation are priced by complexity. Contact us for an accurate quote.',
        },
      },
      {
        '@type': 'Question',
        name: isFr ? "Combien de temps prend la création d'un site web ?" : 'How long does it take to build a website?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isFr
            ? "Un site vitrine est livré en 2 à 3 semaines. Les plateformes avec intégrations CRM, IA et automatisation prennent 4 à 8 semaines selon la complexité."
            : 'A brochure site is delivered in 2–3 weeks. Platforms with CRM, AI, and automation integrations take 4–8 weeks depending on complexity.',
        },
      },
      {
        '@type': 'Question',
        name: isFr ? 'Est-ce que le SEO est inclus ?' : 'Is SEO included?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isFr
            ? "Oui. Chaque site est construit avec une architecture SEO dès la fondation : balises structurées, maillage interne, Core Web Vitals optimisés et stratégie de mots-clés adaptée à votre marché."
            : 'Yes. Every site is built with SEO architecture from the ground up: structured markup, internal linking, optimised Core Web Vitals, and a keyword strategy tailored to your market.',
        },
      },
      {
        '@type': 'Question',
        name: isFr ? "Qu'est-ce que l'intégration IA apporte à mon site ?" : 'What does AI integration bring to my website?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isFr
            ? "Agents de chat intelligents, génération de contenu, qualification de leads automatisée, traduction bilingue et recommandations personnalisées — le tout fonctionnant 24/7 sans intervention manuelle."
            : 'Intelligent chat agents, content generation, automated lead qualification, bilingual translation, and personalised recommendations — all running 24/7 without manual intervention.',
        },
      },
      {
        '@type': 'Question',
        name: isFr ? 'Quelles plateformes CRM supportez-vous ?' : 'Which CRM platforms do you support?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isFr
            ? "HubSpot, Salesforce, Pipedrive, ou solutions sur mesure. Nous intégrons votre CRM existant ou en configurons un nouveau avec des flux automatisés adaptés à votre processus de vente."
            : 'HubSpot, Salesforce, Pipedrive, or custom-built solutions. We integrate your existing CRM or set up a new one with automated workflows tailored to your sales process.',
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  )
}

export default async function WebsiteBuildingPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr-ca'

  const features = isFr
    ? [
        {
          number: '01',
          title: 'Architecture SEO avancée',
          body: "Chaque site est construit sur une architecture de référencement solide dès la première ligne de code. Balises structurées (Schema.org), maillage interne stratégique, Core Web Vitals optimisés, sitemaps bilingues et stratégie de mots-clés ciblée. Votre site ne sera pas seulement beau — il sera trouvé.",
        },
        {
          number: '02',
          title: 'Intégration IA native',
          body: "Agents conversationnels intelligents qui répondent à vos clients 24/7. Qualification automatique de leads, recommandations personnalisées, traduction bilingue en temps réel et génération de contenu assistée par IA. Votre site travaille même quand vous ne travaillez pas.",
        },
        {
          number: '03',
          title: 'CRM & automatisation marketing',
          body: "Intégration HubSpot, Salesforce ou solution sur mesure. Formulaires intelligents, séquences email automatisées, suivi des leads du premier contact à la conversion. Chaque interaction est captée, chaque opportunité est suivie.",
        },
        {
          number: '04',
          title: 'Design performant & responsive',
          body: "Interfaces sur mesure qui chargent en moins d'une seconde. Design adaptatif mobile-first, typographie soignée, animations fluides. Pas de templates génériques — chaque pixel est conçu pour convertir.",
        },
        {
          number: '05',
          title: 'CTA & conversion optimisés',
          body: "Chaque page est conçue avec un objectif de conversion clair. Appels à l'action stratégiquement positionnés, formulaires optimisés, tests A/B intégrés et analytique de parcours utilisateur pour maximiser votre taux de conversion.",
        },
        {
          number: '06',
          title: 'Infrastructure moderne & évolutive',
          body: "Hébergement sur Vercel avec CDN mondial, déploiements automatisés via GitHub, monitoring de performance en temps réel. Votre site est construit pour évoluer avec votre entreprise — pas pour devenir obsolète dans deux ans.",
        },
      ]
    : [
        {
          number: '01',
          title: 'Advanced SEO architecture',
          body: "Every site is built on a solid search engine foundation from the first line of code. Structured markup (Schema.org), strategic internal linking, optimised Core Web Vitals, bilingual sitemaps, and a targeted keyword strategy. Your site won't just look good — it will be found.",
        },
        {
          number: '02',
          title: 'Native AI integration',
          body: "Intelligent conversational agents that respond to your customers 24/7. Automated lead qualification, personalised recommendations, real-time bilingual translation, and AI-assisted content generation. Your website works even when you don't.",
        },
        {
          number: '03',
          title: 'CRM & marketing automation',
          body: "HubSpot, Salesforce, or custom-built integration. Smart forms, automated email sequences, lead tracking from first contact to conversion. Every interaction is captured, every opportunity is followed.",
        },
        {
          number: '04',
          title: 'High-performance responsive design',
          body: "Custom interfaces that load in under a second. Mobile-first adaptive design, refined typography, fluid animations. No generic templates — every pixel is designed to convert.",
        },
        {
          number: '05',
          title: 'Optimised CTAs & conversion',
          body: "Every page is designed with a clear conversion goal. Strategically placed calls-to-action, optimised forms, built-in A/B testing, and user journey analytics to maximise your conversion rate.",
        },
        {
          number: '06',
          title: 'Modern & scalable infrastructure',
          body: "Hosted on Vercel with global CDN, automated deployments via GitHub, real-time performance monitoring. Your site is built to scale with your business — not to become obsolete in two years.",
        },
      ]

  const results = isFr
    ? [
        { value: '< 1s', label: 'Temps de chargement moyen' },
        { value: '100', label: 'Score Lighthouse performance' },
        { value: '21', label: 'Agents IA dans notre système' },
        { value: 'EN/FR', label: 'Tous les sites bilingues' },
      ]
    : [
        { value: '< 1s', label: 'Average load time' },
        { value: '100', label: 'Lighthouse performance score' },
        { value: '21', label: 'AI agents in our system' },
        { value: 'EN/FR', label: 'All sites fully bilingual' },
      ]

  const industries = isFr
    ? [
        { name: 'Restaurants & hôtellerie', desc: 'Réservations en ligne, commandes, programmes de fidélité' },
        { name: 'Commerce de détail', desc: 'E-commerce Shopify, inventaire, paniers abandonnés' },
        { name: 'Services professionnels', desc: 'Cabinets, portails clients, prise de rendez-vous' },
        { name: 'Immobilier', desc: "Portails d'annonces, mise en scène IA, outils courtiers" },
        { name: 'Construction & industriel', desc: 'Catalogues, devis en ligne, tableaux de bord' },
        { name: 'Santé & bien-être', desc: 'Planification de rendez-vous, portails patients, conformité' },
      ]
    : [
        { name: 'Restaurants & hospitality', desc: 'Online reservations, ordering, loyalty programs' },
        { name: 'Retail & e-commerce', desc: 'Shopify storefronts, inventory, abandoned cart recovery' },
        { name: 'Professional services', desc: 'Firm sites, client portals, appointment booking' },
        { name: 'Real estate', desc: 'Listing portals, AI staging, broker tools' },
        { name: 'Construction & industrial', desc: 'Catalogs, online quoting, operational dashboards' },
        { name: 'Health & wellness', desc: 'Appointment scheduling, patient portals, compliance' },
      ]

  const faqs = isFr
    ? [
        { q: 'Combien coûte un site web pour PME ?', a: "Chaque projet est sur mesure. Les sites vitrines démarrent à partir de quelques milliers de dollars. Les plateformes avec CRM et automatisation IA sont tarifées selon la complexité. Contactez-nous pour un devis." },
        { q: "Combien de temps prend la création d'un site ?", a: "Un site vitrine est livré en 2 à 3 semaines. Les plateformes avec intégrations CRM, IA et automatisation prennent 4 à 8 semaines." },
        { q: 'Est-ce que le SEO est inclus ?', a: "Oui. Architecture SEO intégrée dès la fondation : balises structurées, Core Web Vitals, maillage interne et stratégie de mots-clés." },
        { q: "Qu'est-ce que l'intégration IA apporte ?", a: "Chat intelligent 24/7, qualification de leads, traduction bilingue automatique, recommandations personnalisées et génération de contenu." },
        { q: 'Quelles plateformes CRM supportez-vous ?', a: "HubSpot, Salesforce, Pipedrive ou solutions sur mesure. Intégration de votre CRM existant ou configuration d'un nouveau." },
      ]
    : [
        { q: 'How much does a small business website cost?', a: "Every project is custom. Brochure sites start from a few thousand dollars. Platforms with CRM and AI automation are priced by complexity. Contact us for a quote." },
        { q: 'How long does it take to build a website?', a: "A brochure site is delivered in 2–3 weeks. Platforms with CRM, AI, and automation integrations take 4–8 weeks." },
        { q: 'Is SEO included?', a: "Yes. SEO architecture is built in from the foundation: structured markup, Core Web Vitals, internal linking, and keyword strategy." },
        { q: 'What does AI integration bring?', a: "24/7 intelligent chat, lead qualification, automatic bilingual translation, personalised recommendations, and content generation." },
        { q: 'Which CRM platforms do you support?', a: "HubSpot, Salesforce, Pipedrive, or custom-built solutions. We integrate your existing CRM or set up a new one." },
      ]

  const techStack = [
    { category: isFr ? 'Frontend' : 'Frontend', items: 'Next.js, React, TypeScript, Tailwind CSS, GSAP' },
    { category: isFr ? 'Backend' : 'Backend', items: 'FastAPI, Node.js, PostgreSQL, Supabase' },
    { category: isFr ? 'IA & Automatisation' : 'AI & Automation', items: 'Claude AI, OpenClaw, ElevenLabs, Vapi' },
    { category: isFr ? 'Marketing' : 'Marketing', items: 'HubSpot, Resend, PostHog, Stripe' },
    { category: isFr ? 'Infrastructure' : 'Infrastructure', items: 'Vercel, Railway, Docker, GitHub Actions' },
  ]

  return (
    <>
      <WebsiteBuildingJsonLd locale={locale} />

      {/* ── H1 Hero ────────────────────────────────────────────────────── */}
      <Section theme="void" className="pt-32 pb-20 md:pt-44 md:pb-28">
        <Container size="lg">
          <Label className="mb-8">
            {isFr ? '(Services) — Sites Web' : '(Services) — Websites'}
          </Label>

          <div
            style={{
              fontFamily: FONT_BARLOW,
              fontWeight: 900,
              fontSize: 'clamp(2.5rem, 8vw, 7rem)',
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
              {isFr ? 'Sites Web\npour PME' : 'Websites for\nSmall Business'}
            </TextReveal>
          </div>

          <SectionReveal delay={0.3} className="mt-5">
            <p
              className="text-[var(--color-cream)] opacity-35"
              style={{ fontFamily: FONT_DM_SERIF, fontStyle: 'italic', fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}
            >
              {isFr
                ? "Pas un template. Une machine de croissance."
                : 'Not a template. A growth engine.'}
            </p>
          </SectionReveal>

          <SectionReveal delay={0.45} className="mt-4 max-w-xl">
            <p
              className="text-[var(--color-cream)] opacity-45 leading-relaxed"
              style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
            >
              {isFr
                ? "Votre site web ne devrait pas être une brochure numérique. Il devrait générer des leads, qualifier des prospects et convertir des visiteurs en clients — automatiquement, 24 heures sur 24."
                : "Your website shouldn't be a digital brochure. It should generate leads, qualify prospects, and convert visitors into customers — automatically, around the clock."}
            </p>
          </SectionReveal>

          <SectionReveal delay={0.6} className="mt-8">
            <Button variant="primary" theme="dark" href={`/${locale}/contact`} size="lg">
              {isFr ? 'Démarrer un projet' : 'Start a Project'}
            </Button>
          </SectionReveal>
        </Container>
      </Section>

      {/* ── H2: What We Build — Features ──────────────────────────────── */}
      <Section theme="cream" className="py-24 md:py-32 relative overflow-hidden">
        <Container size="lg">
          <Label className="mb-10">
            {isFr ? '(Ce que nous construisons)' : '(What We Build)'}
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
              {isFr ? 'Six piliers. Zéro compromis.' : 'Six pillars. Zero compromise.'}
            </TextReveal>
          </div>

          <div className="border-t" style={{ borderColor: 'rgba(14,16,17,0.1)' }}>
            {features.map((item, i) => (
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
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── H2: Results / Stats ───────────────────────────────────────── */}
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

      {/* ── H2: Industries ────────────────────────────────────────────── */}
      <Section theme="cream" className="py-24 md:py-32 relative overflow-hidden">
        <Container size="lg">
          <Label className="mb-10">
            {isFr ? '(Industries)' : '(Industries)'}
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
              {isFr ? 'Votre secteur. Notre expertise.' : 'Your industry. Our expertise.'}
            </TextReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {industries.map((ind, i) => (
              <SectionReveal key={i} delay={i * 0.06}>
                <div
                  className="p-6 md:p-8 border"
                  style={{ borderColor: 'rgba(14,16,17,0.1)' }}
                >
                  <h4
                    className="text-[var(--color-void)] mb-3"
                    style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '-0.01em' }}
                  >
                    {ind.name}
                  </h4>
                  <p
                    className="text-[var(--color-void)] opacity-50 leading-relaxed"
                    style={{ fontFamily: FONT_DM_SANS, fontSize: '0.875rem' }}
                  >
                    {ind.desc}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── H2: Tech Stack ────────────────────────────────────────────── */}
      <Section theme="void" className="py-24 md:py-32">
        <Container size="lg">
          <Label className="mb-10">
            {isFr ? '(Stack technologique)' : '(Tech Stack)'}
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
              {isFr ? 'Construit pour durer.' : 'Built to last.'}
            </TextReveal>
          </div>

          <div className="border-t" style={{ borderColor: 'rgba(236,234,229,0.08)' }}>
            {techStack.map((stack, i) => (
              <SectionReveal key={i} delay={i * 0.08}>
                <div
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 py-8 border-b"
                  style={{ borderColor: 'rgba(236,234,229,0.08)' }}
                >
                  <div className="md:col-span-4">
                    <h5
                      className="text-[var(--color-cream)] uppercase"
                      style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em', fontWeight: 700 }}
                    >
                      {stack.category}
                    </h5>
                  </div>
                  <div className="md:col-span-8">
                    <p
                      className="text-[var(--color-cream)] opacity-50 leading-relaxed"
                      style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                    >
                      {stack.items}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.3} className="mt-10">
            <p
              className="text-[var(--color-cream)] opacity-30 leading-relaxed"
              style={{ fontFamily: FONT_DM_SANS, fontSize: '0.8125rem' }}
            >
              {isFr
                ? "Nous n'utilisons pas WordPress, Wix ou Squarespace. Chaque site est codé sur mesure avec les mêmes technologies que les grandes plateformes SaaS."
                : "We don't use WordPress, Wix, or Squarespace. Every site is custom-coded with the same technologies powering major SaaS platforms."}
            </p>
          </SectionReveal>
        </Container>
      </Section>

      {/* ── H2: FAQ ───────────────────────────────────────────────────── */}
      <Section theme="cream" className="py-24 md:py-32 relative overflow-hidden">
        <Container size="lg">
          <Label className="mb-10">
            {isFr ? '(Questions fréquentes)' : '(FAQ)'}
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
              {isFr ? 'Questions fréquentes' : 'Frequently asked'}
            </TextReveal>
          </div>

          <div className="border-t" style={{ borderColor: 'rgba(14,16,17,0.1)' }}>
            {faqs.map((faq, i) => (
              <SectionReveal key={i} delay={i * 0.06}>
                <div
                  className="py-8 md:py-10 border-b grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10"
                  style={{ borderColor: 'rgba(14,16,17,0.1)' }}
                >
                  <div className="md:col-span-5">
                    <h6
                      className="text-[var(--color-void)] leading-tight"
                      style={{ fontFamily: FONT_DM_SERIF, fontStyle: 'italic', fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}
                    >
                      {faq.q}
                    </h6>
                  </div>
                  <div className="md:col-span-7">
                    <p
                      className="text-[var(--color-void)] opacity-55 leading-relaxed"
                      style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                    >
                      {faq.a}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Internal nav band ─────────────────────────────────────────── */}
      <Section theme="void" className="py-16 md:py-20">
        <Container size="lg">
          <SectionReveal>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <p
                className="text-[var(--color-cream)] opacity-40 uppercase"
                style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em' }}
              >
                {isFr ? 'Explorer' : 'Explore'}
              </p>
              <div className="flex flex-wrap gap-x-10 gap-y-3">
                {[
                  { label: isFr ? 'Tous les services' : 'All Services', href: `/${locale}/services` },
                  { label: isFr ? 'Studio Web' : 'Web Studio', href: `/${locale}/studio/web` },
                  { label: isFr ? 'Agence' : 'Agency', href: `/${locale}/agency` },
                  { label: isFr ? 'À propos' : 'About', href: `/${locale}/about` },
                  { label: isFr ? 'Contact' : 'Contact', href: `/${locale}/contact` },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-[var(--color-cream)] opacity-60 hover:opacity-100 transition-opacity duration-200 uppercase"
                    style={{ fontFamily: FONT_DM_SANS, fontSize: '0.75rem', letterSpacing: '0.12em', fontWeight: 500 }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </SectionReveal>
        </Container>
      </Section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <Section theme="cream" className="py-28 md:py-36 relative overflow-hidden">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12">
            <div className="flex-1 max-w-2xl">
              <SectionReveal>
                <span
                  className="block mb-6 uppercase"
                  style={{ fontFamily: FONT_DM_SANS, fontSize: '10px', letterSpacing: '0.22em', color: '#f55f00' }}
                >
                  {isFr ? '— Votre site web' : '— Your website'}
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
                  {isFr ? 'Prêt à croître?' : 'Ready to grow?'}
                </TextReveal>
              </div>

              <SectionReveal delay={0.2} className="mt-6 max-w-md">
                <p
                  className="text-[var(--color-void)] opacity-40 leading-relaxed"
                  style={{ fontFamily: FONT_DM_SANS, fontSize: '0.9375rem' }}
                >
                  {isFr
                    ? "Un appel de 15 minutes suffit pour comprendre votre projet et vous proposer l'approche la plus efficace."
                    : "A 15-minute call is all it takes to understand your project and propose the most effective approach."}
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
