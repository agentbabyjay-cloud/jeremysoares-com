import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/content/posts'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Label } from '@/components/ui/Label'
import { TextReveal } from '@/components/animation/TextReveal'
import { BlogFilter } from '@/components/content/BlogFilter'
import { SubscribeBand } from '@/components/content/SubscribeBand'
import type { Locale } from '@/lib/content/types'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale === 'fr-ca'
  return {
    title: isFr
      ? 'Blogue Immobilier Montréal | Analyses de Marché & Conseils — Jeremy Soares'
      : 'Montreal Real Estate Blog | Market Insights & Tips — Jeremy Soares',
    description: isFr
      ? "Analyses de marché, conseils d'achat et stratégies d'investissement immobilier à Montréal par Jeremy Soares, courtier expert."
      : 'Market insights, buying tips, and investment analysis for Montreal real estate by broker Jeremy Soares.',
    keywords: isFr
      ? ['blogue immobilier Montréal', 'analyse marché immobilier', 'conseils achat Montréal', 'investissement immobilier Québec', 'Jeremy Soares']
      : ['Montreal real estate blog', 'property market analysis', 'buying tips Montreal', 'real estate investment Quebec', 'Jeremy Soares'],
    alternates: {
      canonical: `https://jeremysoares.com/${locale}/blog`,
      languages: {
        'en-CA': 'https://jeremysoares.com/en-ca/blog',
        'fr-CA': 'https://jeremysoares.com/fr-ca/blog',
      },
    },
    openGraph: {
      type: 'website',
      url: `https://jeremysoares.com/${locale}/blog`,
      title: isFr
        ? 'Blogue Immobilier Montréal — Jeremy Soares'
        : 'Montreal Real Estate Blog — Jeremy Soares',
      description: isFr
        ? "Analyses de marché, conseils d'achat et stratégies d'investissement à Montréal."
        : 'Market insights, buying tips, and investment analysis for Montreal real estate.',
      siteName: 'Jeremy Soares',
      locale: isFr ? 'fr_CA' : 'en_CA',
    },
  }
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr-ca'
  const contentLocale: Locale = isFr ? 'fr' : 'en'
  const posts = getAllPosts(contentLocale)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: isFr ? 'Blogue — Jeremy Soares' : 'Blog — Jeremy Soares',
    description: isFr
      ? 'Analyses de marché immobilier, conseils et perspectives par Jeremy Soares à Montréal.'
      : 'Real estate market analysis, tips, and insights by Jeremy Soares in Montreal.',
    url: `https://jeremysoares.com/${locale}/blog`,
    author: {
      '@type': 'Person',
      name: 'Jeremy Soares',
      url: 'https://jeremysoares.com',
    },
    publisher: {
      '@type': 'Person',
      name: 'Jeremy Soares',
      url: 'https://jeremysoares.com',
    },
    inLanguage: isFr ? 'fr-CA' : 'en-CA',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <Section theme="void" className="pt-32 pb-16 md:pt-40 md:pb-20">
        <Container size="lg">
          <Label className="mb-6">{isFr ? '(Journal)' : '(Blog)'}</Label>
          <TextReveal
            as="h1"
            split="lines"
            immediate
            delay={0.2}
            className="text-[clamp(4rem,10vw,8rem)] font-black leading-none tracking-tight text-[#eceae5] uppercase"
            style={{ fontFamily: "var(--font-barlow), 'Barlow', sans-serif" }}
          >
            {isFr ? 'Articles' : 'Articles'}
          </TextReveal>
        </Container>
      </Section>

      {/* Post list with search + tag filter */}
      <Section theme="void" className="pb-24">
        <Container size="lg">
          <BlogFilter posts={posts} locale={locale} isFr={isFr} />
        </Container>
      </Section>

      {/* Subscribe */}
      <Section theme="void">
        <Container size="lg">
          <SubscribeBand locale={locale} />
        </Container>
      </Section>
    </>
  )
}
