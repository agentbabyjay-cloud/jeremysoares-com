import type { Metadata } from 'next'
import { getAllArt } from '@/lib/content/art'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Label } from '@/components/ui/Label'
import { TextReveal } from '@/components/animation/TextReveal'
import { SectionReveal } from '@/components/animation/SectionReveal'
import { ArtCard } from '@/components/content/ArtCard'
import { Button } from '@/components/ui/Button'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale === 'fr-ca'
  return {
    title: isFr
      ? 'Studio | Peintures & Art Mixte — Jeremy Soares'
      : 'Art Studio | Paintings & Mixed Media by Jeremy Soares',
    description: isFr
      ? "L'autre pratique. Peintures et œuvres mixtes originales par Jeremy Soares, artiste et courtier immobilier à Montréal."
      : 'The other practice. Original paintings and mixed media works by Jeremy Soares — Montreal artist and real estate broker.',
    keywords: isFr
      ? ['Jeremy Soares art', 'artiste Montréal', 'peintures mixtes', 'œuvres originales Montréal']
      : ['Jeremy Soares art', 'Montreal artist paintings', 'mixed media art', 'original paintings Montreal'],
    alternates: {
      canonical: `https://jeremysoares.com/${locale}/studio`,
      languages: {
        'en-CA': 'https://jeremysoares.com/en-ca/studio',
        'fr-CA': 'https://jeremysoares.com/fr-ca/studio',
      },
    },
    openGraph: {
      type: 'website',
      url: `https://jeremysoares.com/${locale}/studio`,
      title: isFr
        ? 'Studio | Peintures & Art Mixte — Jeremy Soares'
        : 'Art Studio | Paintings & Mixed Media by Jeremy Soares',
      description: isFr
        ? "L'autre pratique. Peintures et œuvres mixtes originales par Jeremy Soares."
        : 'Original paintings and mixed media works by Jeremy Soares, Montreal artist.',
      siteName: 'Jeremy Soares',
      locale: isFr ? 'fr_CA' : 'en_CA',
    },
  }
}

export default async function StudioPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr-ca'
  const art = getAllArt()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: isFr ? 'Studio — Jeremy Soares' : 'Art Studio — Jeremy Soares',
    description: isFr
      ? 'Collection de peintures et œuvres mixtes originales par Jeremy Soares.'
      : 'Collection of original paintings and mixed media works by Jeremy Soares.',
    url: `https://jeremysoares.com/${locale}/studio`,
    author: {
      '@type': 'Person',
      name: 'Jeremy Soares',
      url: 'https://jeremysoares.com',
      sameAs: ['https://studio.jeremysoares.com'],
    },
    about: {
      '@type': 'VisualArtwork',
      artMedium: isFr ? 'Peinture, techniques mixtes' : 'Painting, mixed media',
      locationCreated: {
        '@type': 'Place',
        name: 'Montréal, QC, Canada',
      },
    },
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
          <Label className="mb-6">(Studio)</Label>
          <TextReveal
            as="h1"
            split="words"
            immediate
            delay={0.2}
            className="text-[clamp(3rem,8vw,6rem)] font-black leading-none tracking-tight text-[#eceae5] uppercase"
            style={{ fontFamily: "var(--font-barlow), 'Barlow', sans-serif" }}
          >
            {isFr ? "L'autre pratique" : 'The Other Practice'}
          </TextReveal>
          <SectionReveal delay={0.4} className="mt-6">
            <p className="text-[1rem] text-[#eceae5] opacity-50 leading-relaxed max-w-xl">
              {isFr
                ? "Je n'ai jamais arrêté de créer de l'art. Cela garde l'œil aiguisé. Cela me rappelle que chaque propriété a une histoire qui mérite d'être bien racontée."
                : "I never stopped making art. It keeps the eye sharp. It reminds me that every property has a story worth telling well."}
            </p>
          </SectionReveal>
        </Container>
      </Section>

      {/* Art grid */}
      <Section theme="void" className="pb-24 md:pb-32">
        <Container size="lg">
          {art.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {art.map((piece) => (
                <ArtCard key={piece.id} piece={piece} locale={locale} />
              ))}
            </div>
          ) : (
            <p className="text-[1rem] text-[#eceae5] opacity-40">
              {isFr ? 'Œuvres à venir.' : 'Works coming soon.'}
            </p>
          )}
        </Container>
      </Section>

      {/* Studio CTA */}
      <Section theme="void" className="py-20 border-t border-[rgba(236,234,229,0.06)]">
        <Container size="sm" className="text-center">
          <SectionReveal>
            <h2
              className="text-[clamp(1.5rem,4vw,2.5rem)] font-black leading-none tracking-tight text-[#eceae5] uppercase mb-4"
              style={{ fontFamily: "var(--font-barlow), 'Barlow', sans-serif" }}
            >
              {isFr ? 'Toutes les pièces sont originales.' : 'All pieces are originals.'}
            </h2>
            <p className="text-[0.875rem] text-[#eceae5] opacity-50 leading-relaxed mb-10 max-w-sm mx-auto">
              {isFr
                ? 'Pour les demandes de renseignements ou acquisitions, contactez le studio directement.'
                : 'For inquiries or acquisitions, contact the studio directly.'}
            </p>
          </SectionReveal>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" href={`/${locale}/contact`}>
              {isFr ? 'Contacter le studio' : 'Contact Studio'}
            </Button>
            <Button variant="ghost" href="https://studio.jeremysoares.com" external>
              studio.jeremysoares.com
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
