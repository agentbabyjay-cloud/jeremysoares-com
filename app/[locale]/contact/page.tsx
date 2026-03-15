'use client'

import { use, useState } from 'react'

export default function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = use(params)
  const isFr = locale === 'fr-ca'

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, locale }),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', phone: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="page-wrapper">
      <main className="main-wrapper">
        {/* HERO */}
        <section className="section-home-hero" style={{ minHeight: '40vh', alignItems: 'flex-end', paddingBottom: '4rem' }}>
          <div style={{ padding: '0 4vw' }}>
            <div className="overflow-hidden">
              <h1 className="heading-style-large js-animate-up">
                {isFr ? "Discutons." : "Let's Talk."}
              </h1>
            </div>
            <p className="heading-alt-small js-fade-up" style={{ marginTop: '1.5rem', maxWidth: '480px' }}>
              {isFr
                ? "Partagez quelques détails et je vous répondrai rapidement."
                : "Share a few details and I'll get back to you promptly."}
            </p>
          </div>
        </section>

        {/* CONTACT GRID */}
        <section style={{ padding: '6rem 4vw', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem' }} className="contact-grid">
          {/* INFO */}
          <div>
            <div className="text-meta text-color-muted" style={{ marginBottom: '3rem' }}>
              (Contact)
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <div>
                <div className="text-meta text-color-muted" style={{ marginBottom: '0.5rem' }}>
                  (Phone)
                </div>
                <a href="tel:5145198177" className="heading-style-h2" style={{ textDecoration: 'none' }}>
                  514 519-8177
                </a>
              </div>
              <div>
                <div className="text-meta text-color-muted" style={{ marginBottom: '0.5rem' }}>
                  (Email)
                </div>
                <a href="mailto:JeremySoares@icloud.com" className="heading-style-h2" style={{ textDecoration: 'none', fontSize: 'clamp(1rem, 2vw, 1.4rem)' }}>
                  JeremySoares@icloud.com
                </a>
              </div>
              <div>
                <div className="text-meta text-color-muted" style={{ marginBottom: '0.5rem' }}>
                  (Office)
                </div>
                <p className="heading-alt-h3">
                  106–220 Av des Pins O<br />Montréal, QC H2W1R9
                </p>
              </div>
              <div>
                <div className="text-meta text-color-muted" style={{ marginBottom: '1rem' }}>
                  (Socials)
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <a href="https://www.linkedin.com/in/jeremysoaresrealestate/" target="_blank" className="nav-item w-inline-block">
                    <div className="nav-item-text">LinkedIn</div><div className="nav-item-line"></div>
                  </a>
                  <a href="https://www.centris.ca/fr/courtier-immobilier~jeremy-soares~jeremy-soares/h2731" target="_blank" className="nav-item w-inline-block">
                    <div className="nav-item-text">Centris</div><div className="nav-item-line"></div>
                  </a>
                  <a href="https://www.realtor.ca/agent/2079722/jeremy-soares-106-220-av-des-pins-o-montreal-quebec-h2w1r9" target="_blank" className="nav-item w-inline-block">
                    <div className="nav-item-text">Realtor.ca</div><div className="nav-item-line"></div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div>
            <div className="text-meta text-color-muted" style={{ marginBottom: '3rem' }}>
              ({isFr ? 'Formulaire' : 'Inquiry Form'})
            </div>

            {status === 'success' ? (
              <div>
                <div className="overflow-hidden">
                  <h2 className="heading-style-h2 js-animate-up">
                    {isFr ? 'Message envoyé.' : 'Message sent.'}
                  </h2>
                </div>
                <p className="heading-alt-h3" style={{ marginTop: '1.5rem', opacity: 0.6 }}>
                  {isFr
                    ? "Je vous répondrai dans les plus brefs délais."
                    : "I'll be in touch shortly."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="form-field">
                  <label className="text-meta text-color-muted">
                    ({isFr ? 'Nom' : 'Name'})
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="contact-input"
                    placeholder={isFr ? 'Votre nom' : 'Your name'}
                  />
                </div>
                <div className="form-field">
                  <label className="text-meta text-color-muted">
                    (Email)
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="contact-input"
                    placeholder={isFr ? 'votre@email.com' : 'your@email.com'}
                  />
                </div>
                <div className="form-field">
                  <label className="text-meta text-color-muted">
                    ({isFr ? 'Téléphone' : 'Phone'}) <span style={{ opacity: 0.4 }}>(optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="contact-input"
                    placeholder="514 000-0000"
                  />
                </div>
                <div className="form-field">
                  <label className="text-meta text-color-muted">
                    ({isFr ? 'Message' : 'Message'})
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="contact-input"
                    placeholder={isFr
                      ? 'Décrivez votre projet ou vos besoins...'
                      : 'Tell me about your project or needs...'}
                    style={{ resize: 'vertical' }}
                  />
                </div>
                {status === 'error' && (
                  <p style={{ color: '#ff6b6b', fontSize: '0.85rem' }}>
                    {isFr ? 'Une erreur est survenue. Veuillez réessayer.' : 'Something went wrong. Please try again.'}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="button primary w-inline-block"
                  style={{ cursor: status === 'loading' ? 'wait' : 'pointer', border: 'none' }}
                >
                  <div className="button-inner-2">
                    <div className="button-inner-text">
                      {status === 'loading'
                        ? (isFr ? 'Envoi...' : 'Sending...')
                        : (isFr ? 'Envoyer' : 'Send Message')}
                    </div>
                  </div>
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
