import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getAllListings, getListingById } from '@/lib/content/listings'

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

  const statusLabel = {
    sold: isFr ? 'Vendu' : 'Sold',
    rented: isFr ? 'Loué' : 'Rented',
    active: isFr ? 'Actif' : 'Active',
  }

  const heroImage = listing.images[0]
  const galleryImages = listing.images.slice(1)
  const mapQuery = encodeURIComponent(`${listing.address}, ${listing.city}, Quebec, Canada`)
  const mapSrc = `https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`

  const specs = [
    listing.price ? { label: isFr ? 'Prix' : 'Price', value: listing.price } : null,
    listing.bedrooms != null ? { label: isFr ? 'Chambres' : 'Bedrooms', value: String(listing.bedrooms) } : null,
    listing.bathrooms != null ? { label: isFr ? 'Sdb' : 'Bathrooms', value: String(listing.bathrooms) } : null,
    listing.area ? { label: isFr ? 'Superficie' : 'Area', value: listing.area } : null,
    { label: isFr ? 'Ville' : 'City', value: listing.city },
    { label: isFr ? 'Statut' : 'Status', value: statusLabel[listing.status] },
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ position: 'relative', height: '90svh', minHeight: '520px', overflow: 'hidden', background: '#0e1011' }}>
        {heroImage ? (
          <>
            <Image
              src={heroImage}
              alt={listing.address}
              fill
              sizes="100vw"
              priority
              style={{ objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.45) contrast(1.05)' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(14,16,17,0.95) 0%, rgba(14,16,17,0.3) 60%, transparent 100%)' }} />
          </>
        ) : (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(236,234,229,0.03)' }} />
        )}

        {/* Back link */}
        <Link
          href={`/${locale}/real-estate`}
          style={{ position: 'absolute', top: 'clamp(5rem,8vw,6rem)', left: 'clamp(2rem,5vw,6rem)', zIndex: 10, display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, color: 'rgba(236,234,229,0.45)', textDecoration: 'none' }}
        >
          ← {isFr ? 'Propriétés' : 'Properties'}
        </Link>

        {/* Bottom content */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10, padding: 'clamp(2rem,5vw,4rem) clamp(2rem,5vw,6rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 700, background: listing.status === 'active' ? 'rgba(236,234,229,0.9)' : 'rgba(236,234,229,0.2)', color: listing.status === 'active' ? '#0e1011' : 'rgba(236,234,229,0.6)', padding: '5px 12px' }}>
                {statusLabel[listing.status]}
              </span>
              <span style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.3 }}>
                {listing.neighbourhood} &mdash; {listing.city}
              </span>
            </div>
            <h1 style={{ fontFamily: "var(--font-barlow), 'Barlow', sans-serif", fontWeight: 900, fontSize: 'clamp(2rem,5vw,4.5rem)', lineHeight: 0.95, letterSpacing: '0.03em', textTransform: 'uppercase', color: '#eceae5', margin: 0 }}>
              {listing.address}
            </h1>
          </div>
          {listing.price && (
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.3, marginBottom: '6px', color: '#eceae5' }}>{isFr ? 'Prix demandé' : 'Asking price'}</p>
              <p style={{ fontFamily: "var(--font-barlow), 'Barlow', sans-serif", fontWeight: 900, fontSize: 'clamp(1.8rem,3.5vw,3rem)', color: '#eceae5', margin: 0 }}>{listing.price}</p>
            </div>
          )}
        </div>
      </section>

      {/* ── SPECS STRIP (cream) ── */}
      <section style={{ background: 'var(--color-cream)', color: 'var(--color-void)', borderBottom: '1px solid rgba(14,16,17,0.08)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(2rem,5vw,6rem)', display: 'flex', flexWrap: 'wrap' }}>
          {specs.map((spec, i) => (
            <div key={i} style={{ flex: '1 1 140px', padding: 'clamp(1.5rem,3vw,2.5rem) 0', borderRight: i < specs.length - 1 ? '1px solid rgba(14,16,17,0.08)' : 'none', paddingRight: 'clamp(1.5rem,3vw,2.5rem)', paddingLeft: i > 0 ? 'clamp(1.5rem,3vw,2.5rem)' : '0' }}>
              <p style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.3, marginBottom: '8px' }}>{spec.label}</p>
              <p style={{ fontFamily: "var(--font-barlow), 'Barlow', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,2vw,1.5rem)', letterSpacing: '0.02em', margin: 0 }}>{spec.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── GALLERY ── */}
      {galleryImages.length > 0 && (
        <section style={{ background: 'var(--color-void)', padding: 'clamp(3rem,5vw,5rem) 0' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(2rem,5vw,6rem)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px' }}>
              {galleryImages.map((img, i) => (
                <div
                  key={i}
                  style={{
                    gridColumn: galleryImages.length === 1 || (i === 0 && galleryImages.length % 2 !== 0) ? 'span 2' : 'span 1',
                    position: 'relative',
                    aspectRatio: galleryImages.length === 1 || (i === 0 && galleryImages.length % 2 !== 0) ? '16/7' : '4/3',
                    overflow: 'hidden',
                    background: 'rgba(236,234,229,0.04)',
                  }}
                >
                  <Image
                    src={img}
                    alt={`${listing.address} — ${i + 2}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover', transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1)' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── DESCRIPTION + CONTACT ── */}
      <section style={{ background: 'var(--color-void)', padding: 'clamp(4rem,7vw,7rem) 0', borderTop: '1px solid rgba(236,234,229,0.06)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(2rem,5vw,6rem)', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 'clamp(3rem,6vw,8rem)', alignItems: 'start' }}>
          {/* Description */}
          <div>
            <p style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.3, marginBottom: '2rem' }}>
              — {isFr ? 'Description' : 'About this property'}
            </p>
            {listing.description ? (
              <p style={{ fontSize: 'clamp(1rem,1.5vw,1.15rem)', lineHeight: 1.8, opacity: 0.55, color: '#eceae5', margin: 0 }}>
                {listing.description[lang]}
              </p>
            ) : (
              <p style={{ fontSize: '1rem', lineHeight: 1.8, opacity: 0.3, color: '#eceae5', fontStyle: 'italic', margin: 0 }}>
                {isFr ? 'Description disponible sur demande.' : 'Description available upon request.'}
              </p>
            )}
          </div>

          {/* Contact card */}
          <div style={{ border: '1px solid rgba(236,234,229,0.08)', padding: 'clamp(2rem,4vw,3rem)' }}>
            <p style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.3, marginBottom: '1.5rem' }}>
              {isFr ? 'Courtier responsable' : 'Listing broker'}
            </p>
            <p style={{ fontFamily: "var(--font-barlow), 'Barlow', sans-serif", fontWeight: 900, fontSize: 'clamp(1.2rem,2vw,1.6rem)', letterSpacing: '0.04em', textTransform: 'uppercase', color: '#eceae5', marginBottom: '4px' }}>
              Jeremy Soares
            </p>
            <p style={{ fontSize: '10px', letterSpacing: '0.15em', opacity: 0.3, marginBottom: '2rem' }}>OACIQ H2731</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '2.5rem' }}>
              <a href="tel:+15145198177" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#eceae5', textDecoration: 'none', opacity: 0.5, transition: 'opacity 0.2s' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
                514 519-8177
              </a>
              <a href="mailto:jeremy@jeremysoares.com" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#eceae5', textDecoration: 'none', opacity: 0.5, transition: 'opacity 0.2s' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 7l-10 6L2 7" /></svg>
                jeremy@jeremysoares.com
              </a>
            </div>

            <Link
              href={`/${locale}/contact`}
              style={{ display: 'block', textAlign: 'center', background: 'var(--color-cream)', color: 'var(--color-void)', fontWeight: 700, fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', padding: '16px 24px', textDecoration: 'none', transition: 'opacity 0.2s' }}
            >
              {isFr ? 'Demander une visite' : 'Book a showing'} →
            </Link>
            <Link
              href={`/${locale}/contact`}
              style={{ display: 'block', textAlign: 'center', border: '1px solid rgba(236,234,229,0.15)', color: '#eceae5', fontWeight: 700, fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', padding: '14px 24px', textDecoration: 'none', marginTop: '8px', opacity: 0.4, transition: 'opacity 0.2s' }}
            >
              {isFr ? 'Poser une question' : 'Ask a question'}
            </Link>
          </div>
        </div>
      </section>

      {/* ── MAP — full bleed ── */}
      <section style={{ background: 'var(--color-void)', borderTop: '1px solid rgba(236,234,229,0.06)', position: 'relative' }}>
        {/* Header row inside max-width */}
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: 'clamp(2.5rem,4vw,4rem) clamp(2rem,5vw,6rem) 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span style={{ fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', opacity: 0.3 }}>
              — {isFr ? 'Localisation' : 'Location'}
            </span>
            <span style={{ fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.2 }}>
              {listing.neighbourhood} &mdash; {listing.city}, QC
            </span>
          </div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#eceae5', opacity: 0.25, textDecoration: 'none' }}
          >
            {isFr ? 'Ouvrir dans Maps' : 'Open in Maps'} →
          </a>
        </div>

        {/* Full-bleed map */}
        <div style={{ position: 'relative', width: '100%', height: 'clamp(380px, 58vw, 620px)', overflow: 'hidden' }}>
          <iframe
            title={listing.address}
            src={mapSrc}
            width="100%"
            height="100%"
            style={{
              border: 0,
              display: 'block',
              filter: 'invert(1) hue-rotate(180deg) brightness(0.82) contrast(1.15) saturate(0.5)',
              marginBottom: '-6px',
            }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen={false}
          />
          {/* Address pin label overlay */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -100%)', zIndex: 10, pointerEvents: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            <div style={{ background: 'var(--color-cream)', color: 'var(--color-void)', padding: '8px 16px', fontFamily: "var(--font-barlow),'Barlow',sans-serif", fontWeight: 900, fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
              {listing.address}
            </div>
            <div style={{ width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '8px solid var(--color-cream)' }} />
          </div>
          {/* Gradient fade at bottom */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(to bottom, transparent, var(--color-void))', zIndex: 5, pointerEvents: 'none' }} />
        </div>
      </section>

      {/* ── AMENITIES ── */}
      {listing.amenities && listing.amenities.length > 0 && (
        <section style={{ background: 'var(--color-void)', padding: 'clamp(4rem,7vw,7rem) 0', borderTop: '1px solid rgba(236,234,229,0.06)' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(2rem,5vw,6rem)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'clamp(2.5rem,4vw,4rem)', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <p style={{ fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', opacity: 0.3, marginBottom: '0.75rem' }}>
                  — {isFr ? 'Ce que vous obtenez' : 'What you get'}
                </p>
                <h2 style={{ fontFamily: "var(--font-barlow),'Barlow',sans-serif", fontWeight: 900, fontSize: 'clamp(2rem,4vw,3.5rem)', letterSpacing: '0.03em', textTransform: 'uppercase', color: '#eceae5', margin: 0, lineHeight: 1 }}>
                  {isFr ? 'Services & Équipements' : 'Amenities & Features'}
                </h2>
              </div>
              <p style={{ fontSize: '0.9rem', opacity: 0.35, maxWidth: '340px', lineHeight: 1.7, color: '#eceae5' }}>
                {isFr
                  ? `${listing.amenities.length} commodités incluses dans ce bâtiment primé du centre-ville de Montréal.`
                  : `${listing.amenities.length} features and amenities included in this award-winning downtown Montreal building.`}
              </p>
            </div>

            {/* Amenity grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1px', background: 'rgba(236,234,229,0.06)' }}>
              {listing.amenities.map((a, i) => (
                <div key={i} style={{ background: 'var(--color-void)', padding: 'clamp(1.5rem,2.5vw,2rem)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {/* Icon */}
                  <div style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.45 }}>
                    {a.icon === 'pool' && <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#eceae5" strokeWidth="1.5" strokeLinecap="round"><path d="M2 12c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0"/><path d="M2 17c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0"/><circle cx="12" cy="5" r="1"/><path d="M12 6v4"/></svg>}
                    {a.icon === 'sauna' && <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#eceae5" strokeWidth="1.5" strokeLinecap="round"><path d="M8 3c0 2-2 3-2 5a4 4 0 008 0c0-2-2-3-2-5"/><path d="M12 3c0 2-2 3-2 5"/><rect x="3" y="14" width="18" height="7" rx="1"/><path d="M3 18h18"/></svg>}
                    {a.icon === 'gym' && <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#eceae5" strokeWidth="1.5" strokeLinecap="round"><path d="M6 8h4M14 8h4M8 8v8M16 8v8M6 16h4M14 16h4"/><rect x="2" y="10" width="3" height="4" rx="1"/><rect x="19" y="10" width="3" height="4" rx="1"/></svg>}
                    {a.icon === 'rooftop' && <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#eceae5" strokeWidth="1.5" strokeLinecap="round"><path d="M3 21h18M5 21V10l7-7 7 7v11"/><rect x="9" y="14" width="6" height="7"/><path d="M8 6l4-4 4 4"/></svg>}
                    {a.icon === 'concierge' && <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#eceae5" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="7" r="4"/><path d="M2 21a10 10 0 0120 0"/><path d="M12 11v4M9 21l3-4 3 4"/></svg>}
                    {a.icon === 'metro' && <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#eceae5" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="4" width="18" height="14" rx="3"/><circle cx="8" cy="15" r="1.5" fill="#eceae5"/><circle cx="16" cy="15" r="1.5" fill="#eceae5"/><path d="M3 9h18M8 4v5M16 4v5M12 20v1M9 21h6"/></svg>}
                    {a.icon === 'balcony' && <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#eceae5" strokeWidth="1.5" strokeLinecap="round"><rect x="4" y="10" width="16" height="3"/><path d="M4 13v5M20 13v5M4 18h16"/><path d="M8 10V5h8v5M11 7h2"/></svg>}
                    {a.icon === 'parking' && <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#eceae5" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V7h5a3 3 0 010 6H9"/></svg>}
                    {a.icon === 'elevator' && <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#eceae5" strokeWidth="1.5" strokeLinecap="round"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 2v20M9 7l3-3 3 3M9 17l3 3 3-3"/></svg>}
                  </div>
                  {/* Label */}
                  <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#eceae5', opacity: 0.7, margin: 0, lineHeight: 1.4 }}>
                    {isFr ? a.fr : a.en}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
