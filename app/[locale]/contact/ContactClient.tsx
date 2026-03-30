'use client'

import { use, useState } from 'react'
import { ScrambleText } from '@/components/animation/ScrambleText'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Label } from '@/components/ui/Label'
import { TextReveal } from '@/components/animation/TextReveal'
import { SectionReveal } from '@/components/animation/SectionReveal'
import { Button } from '@/components/ui/Button'
import { AsciiScramble } from '@/components/animation/AsciiScramble'

const INTEREST_TAGS_EN = ['Buy', 'Sell', 'Rent', 'Commercial', 'Investment', 'Pre-Sale', 'Urgent']
const INTEREST_TAGS_FR = ['Achat', 'Vente', 'Location', 'Commercial', 'Investissement', 'Prévente', 'Urgent']

const FONT_BARLOW = "var(--font-barlow),'Barlow',sans-serif"
const ORANGE = '#f55f00'
const CREAM = '#eceae5'

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

  const openVoiceWidget = () => {
    window.dispatchEvent(new CustomEvent('soares:open-voice'))
  }

  const inputClasses =
    'w-full bg-transparent border-b border-[rgba(236,234,229,0.15)] text-[#eceae5] text-[0.875rem] py-3 outline-none focus:border-[rgba(236,234,229,0.5)] transition-colors placeholder:text-[rgba(236,234,229,0.2)]'

  return (
    <>
      {/* Hero with ASCII art background */}
      <div style={{ position: 'relative', overflow: 'hidden', minHeight: '80svh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 'clamp(10rem,20vh,14rem)', background: '#0e1011' }}>
        {/* ASCII background — fills the full section */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'auto' }}>
          <AsciiScramble
            src="/images/key-handoff.png"
            cols={200}
            rows={80}
            color="#eceae5"
            highlightColor="#f55f00"
            baseOpacity={0.18}
            radius={200}
            invertBrightness
            cropTop={0.2}
            cropBottom={0}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        {/* Text */}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(2rem,5vw,6rem)', paddingTop: 'clamp(8rem,16vh,12rem)' }}>
          <TextReveal
            as="h1"
            split="lines"
            immediate
            delay={0.2}
            className="text-[clamp(4rem,10vw,8rem)] font-black leading-none tracking-tight text-[#eceae5] uppercase"
            style={{ fontFamily: FONT_BARLOW }}
          >
            {isFr ? 'Discutons.' : "Let's Talk."}
          </TextReveal>

          <SectionReveal delay={0.45} className="mt-8 max-w-2xl">
            <p
              className="text-[clamp(1.1rem,2vw,1.4rem)] leading-relaxed"
              style={{ color: CREAM, opacity: 0.65, fontWeight: 400 }}
            >
              {isFr
                ? "Que vous cherchiez à louer votre premier appartement ou à développer un projet de 300 logements — chaque projet commence par une conversation. Je serais heureux d'entendre parler du vôtre."
                : "Whether you're renting your first apartment or developing a 300-unit building — every project starts with a conversation. I'd be genuinely happy to hear about yours."}
            </p>
          </SectionReveal>
        </div>
      </div>

      {/* Quick contact */}
      <Section theme="void" className="py-8 border-t border-b border-[rgba(236,234,229,0.05)] mt-0">
        <Container size="lg" className="flex flex-wrap gap-4">
          <Button variant="ghost" href="tel:+15145198177" size="sm">
            {isFr ? 'Appeler' : 'Call'} · 514 519-8177
          </Button>
          <Button variant="ghost" href="mailto:JeremySoares@icloud.com" size="sm">
            Email · JeremySoares@icloud.com
          </Button>
          <Button
            variant="ghost"
            href="https://www.linkedin.com/in/jeremysoaresrealestate/"
            size="sm"
            // @ts-expect-error Button passes extra props through
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </Button>
        </Container>
      </Section>

      {/* AI Voice CTA */}
      <Section theme="void" className="py-14 border-b border-[rgba(236,234,229,0.05)]">
        <Container size="lg">
          <div
            className="flex flex-col sm:flex-row sm:items-center gap-8 p-8 md:p-10"
            style={{
              background: 'rgba(245,95,0,0.04)',
              border: '1px solid rgba(245,95,0,0.12)',
            }}
          >
            <div className="flex-1">
              <div
                className="text-[0.6rem] tracking-[0.22em] uppercase mb-3"
                style={{ color: ORANGE, fontFamily: FONT_BARLOW, fontWeight: 900 }}
              >
                <ScrambleText text={isFr ? '(IA Disponible 24/7)' : '(AI Available 24/7)'} trigger="inview" duration={800} />
              </div>
              <p
                className="text-[1.1rem] font-black uppercase tracking-tight leading-snug"
                style={{ fontFamily: FONT_BARLOW, color: CREAM }}
              >
                {isFr
                  ? "Préférez parler directement ?"
                  : "Prefer to talk right now?"}
              </p>
              <p
                className="mt-2 text-[0.875rem] leading-relaxed"
                style={{ color: CREAM, opacity: 0.45 }}
              >
                {isFr
                  ? "Mon assistante IA peut répondre à vos questions, collecter vos infos et me les transmettre — je vous recontacte personnellement."
                  : "My AI assistant can answer your questions, take down your details, and pass them along — I'll follow up personally."}
              </p>
            </div>

            <button
              onClick={openVoiceWidget}
              className="flex items-center gap-3 group shrink-0"
              style={{
                background: `linear-gradient(135deg, #ff7a00, ${ORANGE})`,
                border: 'none',
                cursor: 'pointer',
                padding: '14px 28px',
                color: '#fff',
                fontFamily: FONT_BARLOW,
                fontWeight: 900,
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                transition: 'opacity 0.2s, transform 0.2s',
                boxShadow: `0 0 28px rgba(245,95,0,0.35)`,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.85' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#fff',
                  boxShadow: '0 0 8px rgba(255,255,255,0.9)',
                  animation: 'contact-pulse 2s ease-in-out infinite',
                  flexShrink: 0,
                }}
              />
              <ScrambleText text={isFr ? "Parler à l'IA" : 'Talk to AI'} trigger="hover" duration={500} />
            </button>
          </div>
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
                    style={{ fontFamily: FONT_BARLOW }}
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
                  <div className="flex flex-col gap-3">
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
                        className="flex items-center gap-3 group w-fit"
                      >
                        <span
                          className="text-[0.625rem] tracking-[0.22em] uppercase font-black transition-opacity"
                          style={{
                            color: link.label === 'LinkedIn' ? ORANGE : CREAM,
                            opacity: link.label === 'LinkedIn' ? 0.85 : 0.5,
                            fontFamily: FONT_BARLOW,
                          }}
                        >
                          {link.label}
                        </span>
                        {link.label === 'LinkedIn' && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2" strokeLinecap="round" style={{ opacity: 0.7 }}>
                            <path d="M7 17L17 7M17 7H7M17 7v10"/>
                          </svg>
                        )}
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
                    style={{ fontFamily: FONT_BARLOW }}
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
                          style={{ fontFamily: FONT_BARLOW }}
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
                    style={{ fontFamily: FONT_BARLOW }}
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

      <style>{`
        @keyframes contact-pulse {
          0%, 100% { box-shadow: 0 0 4px rgba(255,255,255,0.8); }
          50% { box-shadow: 0 0 12px rgba(255,255,255,1), 0 0 20px rgba(255,255,255,0.4); }
        }
      `}</style>
    </>
  )
}
