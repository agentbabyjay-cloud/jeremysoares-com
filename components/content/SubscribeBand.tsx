'use client'

import { useState } from 'react'

interface SubscribeBandProps {
  locale: string
}

export function SubscribeBand({ locale }: SubscribeBandProps) {
  const isFr = locale === 'fr-ca'
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale }),
      })
      if (res.ok) setStatus('success')
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="py-16 border-t border-b border-[rgba(236,234,229,0.1)]">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-[0.625rem] tracking-[0.22em] uppercase text-[#eceae5] opacity-40 mb-4">
          {isFr ? 'Infolettre' : 'Newsletter'}
        </p>
        <h3 className="text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-tight text-[#eceae5] font-['avenir-next-lt-pro-condensed','Avenir_Next_Condensed',sans-serif] mb-6">
          {isFr ? 'Restez informé' : 'Stay informed'}
        </h3>
        {status === 'success' ? (
          <p className="text-[0.875rem] text-[#eceae5] opacity-70">
            {isFr ? 'Merci! Vous êtes inscrit.' : 'Thank you! You\'re subscribed.'}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-0">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={isFr ? 'Votre courriel' : 'Your email'}
              required
              className="flex-1 bg-transparent border border-[rgba(236,234,229,0.2)] text-[#eceae5] text-[0.875rem] px-5 py-3 outline-none focus:border-[rgba(236,234,229,0.5)] transition-colors placeholder:text-[rgba(236,234,229,0.25)]"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-[#eceae5] text-[#0e1011] text-[0.75rem] tracking-[0.22em] uppercase font-bold px-6 py-3 hover:bg-[#d8d4cb] transition-colors disabled:opacity-50"
            >
              {status === 'loading'
                ? '...'
                : isFr
                  ? "S'inscrire"
                  : 'Subscribe'}
            </button>
          </form>
        )}
        {status === 'error' && (
          <p className="text-[0.75rem] text-red-400 opacity-70 mt-3">
            {isFr ? 'Erreur. Réessayez.' : 'Error. Please try again.'}
          </p>
        )}
      </div>
    </div>
  )
}
