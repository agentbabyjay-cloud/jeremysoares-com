import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getArtBySlug, getArtSlugs } from '@/lib/content/art'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Label } from '@/components/ui/Label'
import { InquireButton } from '@/components/content/InquireButton'

export function generateStaticParams() {
  return getArtSlugs().map((slug) => ({ slug }))
}

export default async function ArtDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const piece = getArtBySlug(slug)
  if (!piece) notFound()

  const isFr = locale === 'fr-ca'
  const lang = isFr ? 'fr' : 'en'

  return (
    <>
      <Section theme="void" className="pt-32 pb-24 md:pt-40">
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              {piece.images.map((img, i) => (
                <div key={i} className="relative aspect-[3/4] overflow-hidden bg-[rgba(236,234,229,0.06)] mb-4">
                  <Image
                    src={img}
                    alt={piece.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="sticky top-32 self-start">
              <Label className="mb-6">(Studio)</Label>
              <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight text-[#eceae5] font-[var(--font-barlow),'Barlow',sans-serif] uppercase mb-4">
                {piece.title}
              </h1>
              <div className="space-y-2 mb-8">
                <p className="text-[0.75rem] tracking-[0.15em] uppercase text-[#eceae5] opacity-40">
                  {piece.medium}
                </p>
                <p className="text-[0.75rem] tracking-[0.15em] uppercase text-[#eceae5] opacity-40">
                  {piece.dimensions}
                </p>
                <p className="text-[0.75rem] tracking-[0.15em] uppercase text-[#eceae5] opacity-40">
                  {piece.year}
                </p>
                {piece.editions && (
                  <p className="text-[0.75rem] tracking-[0.15em] uppercase text-[#eceae5] opacity-40">
                    {piece.editions === 1
                      ? (isFr ? 'Original' : 'Original')
                      : `${isFr ? 'Édition de' : 'Edition of'} ${piece.editions}`}
                  </p>
                )}
              </div>
              <p className="text-[0.875rem] text-[#eceae5] opacity-60 leading-relaxed mb-10">
                {piece.description[lang]}
              </p>
              <InquireButton pieceTitle={piece.title} locale={locale} />
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
