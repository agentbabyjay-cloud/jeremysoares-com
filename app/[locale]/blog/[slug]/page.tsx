import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPostBySlug, getPostSlugs } from '@/lib/content/posts'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Label } from '@/components/ui/Label'
import { TextReveal } from '@/components/animation/TextReveal'
import { SubscribeBand } from '@/components/content/SubscribeBand'
import type { Locale } from '@/lib/content/types'

export function generateStaticParams() {
  const enSlugs = getPostSlugs('en').map((slug) => ({ slug }))
  const frSlugs = getPostSlugs('fr').map((slug) => ({ slug }))
  return [...enSlugs, ...frSlugs]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const contentLocale: Locale = locale === 'fr-ca' ? 'fr' : 'en'
  const post = getPostBySlug(slug, contentLocale)
  if (!post) return {}
  const canonical = `https://jeremysoares.com/${locale}/blog/${slug}`
  const ogImage = post.coverImage || '/images/og/blog-default.jpg'
  return {
    title: `${post.title} — Soares`,
    description: post.excerpt,
    keywords: post.tag ? [post.tag, 'Montreal real estate', 'Jeremy Soares', 'immobilier Montréal'] : undefined,
    authors: [{ name: 'Jeremy Soares', url: 'https://jeremysoares.com' }],
    robots: { index: true, follow: true },
    alternates: {
      canonical,
      languages: {
        'en-CA': `https://jeremysoares.com/en-ca/blog/${slug}`,
        'fr-CA': `https://jeremysoares.com/fr-ca/blog/${slug}`,
      },
    },
    openGraph: {
      type: 'article',
      url: canonical,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: ['Jeremy Soares'],
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const contentLocale: Locale = locale === 'fr-ca' ? 'fr' : 'en'
  const post = getPostBySlug(slug, contentLocale)
  if (!post) notFound()

  const canonical = `https://jeremysoares.com/${locale}/blog/${slug}`
  const ogImage = post.coverImage || '/images/og/blog-default.jpg'
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Person', name: 'Jeremy Soares', url: 'https://jeremysoares.com' },
    publisher: { '@type': 'Organization', name: 'Jeremy Soares', url: 'https://jeremysoares.com' },
    image: ogImage.startsWith('http') ? ogImage : `https://jeremysoares.com${ogImage}`,
    description: post.excerpt,
    keywords: post.tag,
    inLanguage: locale === 'fr-ca' ? 'fr-CA' : 'en-CA',
    url: canonical,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Section theme="void" className="pt-32 pb-12 md:pt-40 md:pb-16">
        <Container size="sm">
          <div className="flex items-center gap-4 mb-6">
            <Label>{post.date}</Label>
            <Label>{post.tag}</Label>
            <Label>{post.readTime} min</Label>
          </div>
          <TextReveal
            as="h1"
            split="words"
            immediate
            delay={0.2}
            className="text-[clamp(2rem,5vw,3.75rem)] font-bold leading-tight tracking-tight text-[#eceae5] font-[var(--font-barlow),'Barlow',sans-serif]"
          >
            {post.title}
          </TextReveal>
        </Container>
      </Section>

      <Section theme="void" className="pb-24">
        <Container size="sm">
          <article className="prose prose-invert prose-lg max-w-none [&_h2]:text-[#eceae5] [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:font-[var(--font-barlow),'Barlow',sans-serif] [&_h2]:uppercase [&_h2]:text-2xl [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:text-[#eceae5] [&_h3]:text-xl [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-[#eceae5] [&_p]:opacity-70 [&_p]:leading-relaxed [&_p]:mb-6 [&_ul]:text-[#eceae5] [&_ul]:opacity-70 [&_li]:mb-2 [&_strong]:text-[#eceae5] [&_strong]:opacity-90 [&_a]:text-[#eceae5] [&_a]:underline [&_a]:opacity-80 [&_a:hover]:opacity-100">
            <MDXRemote source={post.content} />
          </article>
        </Container>
      </Section>

      <Section theme="void">
        <Container size="lg">
          <SubscribeBand locale={locale} />
        </Container>
      </Section>
    </>
  )
}
