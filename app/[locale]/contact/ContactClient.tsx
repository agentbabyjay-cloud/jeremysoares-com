'use client'

import { use, useState } from 'react'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Label } from '@/components/ui/Label'
import { TextReveal } from '@/components/animation/TextReveal'
import { SectionReveal } from '@/components/animation/SectionReveal'
import { Button } from '@/components/ui/Button'

const INTEREST_TAGS_EN = ['Buy', 'Sell', 'Rent', 'Commercial', 'Investment', 'Pre-Sale', 'Urgent']
const INTEREST_TAGS_FR = ['Achat', 'Vente', 'Location', 'Commercial', 'Investissement', 'Prévente', 'Urgent']

export default function ContactClient({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = use(params)
  const isFr = locale === 'fr-ca'
  const tags = isFr ? INTEREST_TAGS_FR : INTEREST_TAGS_EN

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', interest: '' })
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
        setForm({ name: '', email: '', phone: '', message: '', interest: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClasses =
    'w-full bg-transparent border-b border-[rgba(236,234,229,0.15)] text-[#eceae5] text-[0.875rem] py-3 outline-none focus:border-[rgba(236,234,229,0.5)] transition-colors placeholder:text-[rgba(236,234,229,0.2)]'

  return (
    <>
      {/* Hero */}
      <Section theme="void" className="pt-32 pb-12 md:pt-40 md:pb-16">
        <Container size="lg">
          <TextReveal
            as="h1"
            split="lines"
            immediate
            delay={0.2}
            className="text-[clamp(4rem,10vw,8rem)] font-black leading-none tracking-tight text-[#eceae5] uppercase"
            style={{ fontFamily: "var(--font-barlow), 'Barlow', sans-serif" }}
          >
            {isFr ? 'Discutons.' : "Let's Talk."}
          </TextReveal>
          <SectionReveal delay={0.4} className="mt-6">
            <p className="text-[1rem] text-[#eceae5] opacity-50 leading-relaxed max-w-md">
              {isFr
                ? 'Partagez quelques détails et je vous répondrai rapidement.'
                : "Share a few details and I'll get back to you promptly."}
            </p>
          </SectionReveal>
        </Container>
      </Section>

      {/* Quick contact */}
      <Section theme="void" className="py-8 border-t border-b border-[rgba(236,234,229,0.05)]">
        <Container size="lg" className="flex flex-wrap gap-4">
          <Button variant="ghost" href="tel:+15145198177" size="sm">
            {isFr ? 'Appeler' : 'Call'} &middot; 514 519-8177
          </Button>
          <Button variant="ghost" href="mailto:JeremySoares@icloud.com" size="sm">
            {isFr ? 'Courriel' : 'Email'} &middot; JeremySoares@icloud.com
          </Button>
        </Container>
      </Section>

      {/* Contact grid */}
      <Section theme="void" className="py-20 md:py-28">
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            {/* Left: Info */}
            <div>
              <Label className="mb-8">(Contact)</Label>

              <div className="space-y-10">
                <div>
                  <Label className="mb-2 block">({isFr ? 'Téléphone' : 'Phone'})</Label>
                  <a
                    href="tel:+15145198177"
                    className="text-[clamp(1.5rem,3vw,2rem)] font-black tracking-tight text-[#eceae5] hover:opacity-70 transition-opacity"
                    style={{ fontFamily: "var(--font-barlow), 'Barlow', sans-serif" }}
                  >
                    514 519-8177
                  </a>
                </div>

                <div>
                  <Label className="mb-2 block">(Email)</Label>
                  <a
                    href="mailto:JeremySoares@icloud.com"
                    className="text-[1rem] text-[#eceae5] opacity-70 hover:opacity-100 transition-opacity"
                  >
                    JeremySoares@icloud.com
                  </a>
                </div>

                <div>
                  <Label className="mb-2 block">(Office)</Label>
                  <p className="text-[0.875rem] text-[#eceae5] opacity-60 leading-relaxed">
                    106–220 Av des Pins O<br />
                    Montréal, QC H2W1R9
                  </p>
                </div>

                <div>
                  <Label className="mb-3 block">(Socials)</Label>
                  <div className="flex flex-col gap-2">
                    {[
                      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jeremysoaresrealestate/' },
                      { label: 'Centris', href: 'https://www.centris.ca/fr/courtier-immobilier~jeremy-soares~jeremy-soares/h2731' },
                      { label: 'Realtor.ca', href: 'https://www.realtor.ca/agent/2079722/jeremy-soares-106-220-av-des-pins-o-montreal-quebec-h2w1r9' },
                    ].map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[0.625rem] tracking-[0.22em] uppercase text-[#eceae5] opacity-50 hover:opacity-100 transition-opacity"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>

                {/* OACIQ badge */}
                <div className="pt-6 border-t border-[rgba(236,234,229,0.05)]">
                  <span className="text-[0.5rem] tracking-[0.22em] uppercase text-[#eceae5] opacity-25 border border-[rgba(236,234,229,0.15)] px-3 py-1.5">
                    OACIQ H2731
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div>
              <Label className="mb-8">
                ({isFr ? 'Formulaire' : 'Inquiry Form'})
              </Label>

              {status === 'success' ? (
                <div>
                  <h2
                    className="text-[clamp(1.5rem,3vw,2.5rem)] font-black tracking-tight text-[#eceae5] uppercase mb-4"
                    style={{ fontFamily: "var(--font-barlow), 'Barlow', sans-serif" }}
                  >
                    {isFr ? 'Message envoyé.' : 'Message sent.'}
                  </h2>
                  <p className="text-[0.875rem] text-[#eceae5] opacity-50 leading-relaxed">
                    {isFr
                      ? 'Je vous répondrai dans les plus brefs délais.'
                      : "I'll be in touch shortly."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Interest tags */}
                  <div>
                    <Label className="mb-3 block">
                      ({isFr ? 'Intérêt' : 'Interest'})
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => setForm({ ...form, interest: tag })}
                          className={[
                            'text-[0.625rem] tracking-[0.22em] uppercase font-black px-4 py-2 transition-all duration-300 cursor-pointer',
                            form.interest === tag
                              ? 'bg-[#eceae5] text-[#0e1011]'
                              : 'border border-[rgba(236,234,229,0.15)] text-[#eceae5] opacity-50 hover:opacity-100',
                          ].join(' ')}
                          style={{ fontFamily: "var(--font-barlow), 'Barlow', sans-serif" }}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[0.625rem] tracking-[0.22em] uppercase text-[#eceae5] opacity-40 mb-1 block">
                      {isFr ? 'Nom' : 'Name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={inputClasses}
                      placeholder={isFr ? 'Votre nom' : 'Your name'}
                    />
                  </div>

                  <div>
                    <label className="text-[0.625rem] tracking-[0.22em] uppercase text-[#eceae5] opacity-40 mb-1 block">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputClasses}
                      placeholder={isFr ? 'votre@email.com' : 'your@email.com'}
                    />
                  </div>

                  <div>
                    <label className="text-[0.625rem] tracking-[0.22em] uppercase text-[#eceae5] opacity-40 mb-1 block">
                      {isFr ? 'Téléphone' : 'Phone'}{' '}
                      <span className="opacity-50">({isFr ? 'optionnel' : 'optional'})</span>
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={inputClasses}
                      placeholder="514 000-0000"
                    />
                  </div>

                  <div>
                    <label className="text-[0.625rem] tracking-[0.22em] uppercase text-[#eceae5] opacity-40 mb-1 block">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={`${inputClasses} resize-y`}
                      placeholder={isFr
                        ? 'Décrivez votre projet ou vos besoins...'
                        : 'Tell me about your project or needs...'}
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-[0.75rem] text-red-400">
                      {isFr ? 'Erreur. Veuillez réessayer.' : 'Something went wrong. Please try again.'}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="bg-[#eceae5] text-[#0e1011] text-[0.625rem] tracking-[0.22em] uppercase font-black px-10 py-4 hover:bg-[#d8d4cb] transition-all duration-300 disabled:opacity-50 cursor-pointer"
                    style={{ fontFamily: "var(--font-barlow), 'Barlow', sans-serif" }}
                  >
                    {status === 'loading'
                      ? (isFr ? 'Envoi...' : 'Sending...')
                      : (isFr ? 'Envoyer' : 'Send Message')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
