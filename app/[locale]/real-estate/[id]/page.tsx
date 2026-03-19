import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getAllListings, getListingById } from '@/lib/content/listings'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Label } from '@/components/ui/Label'
import { Button } from '@/components/ui/Button'

export function generateStaticParams() {
  return getAllListings().map((l) => ({ id: l.id }))
}

export default async function ListingPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}) {
  const { locale, id } = await params
  const listing = getListingById(id)
  if (!listing) notFound()

  const isFr = locale === 'fr-ca'
  const lang = isFr ? 'fr' : 'en'
  const statusLabel = { sold: isFr ? 'Vendu' : 'Sold', rented: isFr ? 'Loué' : 'Rented', active: isFr ? 'Actif' : 'Active' }

  return (
    <>
      <Section theme="void" className="pt-32 pb-16 md:pt-40">
        <Container size="lg">
          <Label className="mb-4">({statusLabel[listing.status]})</Label>
          <h1 className="text-[clamp(2rem,5vw,3.75rem)] font-bold leading-tight tracking-tight text-[#eceae5] font-[var(--font-barlow),'Barlow',sans-serif] uppercase mb-4">
            {listing.address}
          </h1>
          <p className="text-[0.75rem] tracking-[0.22em] uppercase text-[#eceae5] opacity-40">
            {listing.neighbourhood} &middot; {listing.city}
          </p>
        </Container>
      </Section>

      <Section theme="void" className="pb-24">
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {listing.images.map((img, i) => (
              <div key={i} className="relative aspect-[4/3] overflow-hidden bg-[rgba(236,234,229,0.06)]">
                <Image
                  src={img}
                  alt={`${listing.address} - ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          {listing.description && (
            <p className="text-[1rem] text-[#eceae5] opacity-60 leading-relaxed mt-10 max-w-2xl">
              {listing.description[lang]}
            </p>
          )}
          <div className="mt-10">
            <Button variant="primary" href={`/${locale}/contact`}>
              {isFr ? 'Contactez-nous' : 'Get in Touch'}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
