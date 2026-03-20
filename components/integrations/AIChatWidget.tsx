'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const FONT_BARLOW = "var(--font-barlow), 'Barlow', sans-serif"
const FONT_DM_SANS = "var(--font-dm-sans), 'DM Sans', sans-serif"

export function AIChatWidget({ locale }: { locale: string }) {
  const isFr = locale === 'fr-ca'
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
      // Send opening message if no messages yet
      if (messages.length === 0) {
        setMessages([{
          role: 'assistant',
          content: isFr
            ? "Bonjour ! Je suis là pour vous aider. Vous cherchez à acheter, vendre ou investir ?"
            : "Hey — looking to buy, sell, or invest? I can point you in the right direction.",
        }])
      }
    }
  }, [open, isFr, messages.length])

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userMsg: Message = { role: 'user', content: input.trim() }
    const updated = [...messages, userMsg]
    setMessages(updated)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated, locale }),
      })
      const data = await res.json()
      setMessages([...updated, { role: 'assistant', content: data.message }])
    } catch {
      setMessages([
        ...updated,
        {
          role: 'assistant',
          content: isFr
            ? "Je vous connecte avec Jeremy directement — 514 519-8177."
            : "Let me connect you with Jeremy directly — 514 519-8177.",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 50,
          width: '52px',
          height: '52px',
          background: '#f55f00',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(245,95,0,0.35)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.06)'
          e.currentTarget.style.boxShadow = '0 12px 40px rgba(245,95,0,0.5)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(245,95,0,0.35)'
        }}
        aria-label={isFr ? 'Ouvrir le chat' : 'Open chat'}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0e1011" strokeWidth="2.5">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      </button>
    )
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 50,
        width: 'clamp(320px, 92vw, 420px)',
        display: 'flex',
        flexDirection: 'column',
        background: '#0e1011',
        border: '1px solid rgba(236,234,229,0.1)',
        boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 1.25rem',
          borderBottom: '1px solid rgba(236,234,229,0.08)',
          background: '#f55f00',
        }}
      >
        <div>
          <span
            style={{
              fontFamily: FONT_BARLOW,
              fontWeight: 900,
              fontSize: '14px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#0e1011',
            }}
          >
            Soares
          </span>
          <span
            style={{
              display: 'block',
              fontFamily: FONT_DM_SANS,
              fontSize: '10px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(14,16,17,0.6)',
              marginTop: '1px',
            }}
          >
            {isFr ? 'Courtier immobilier · Montréal' : 'Real estate · Montreal'}
          </span>
        </div>
        <button
          onClick={() => setOpen(false)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'rgba(14,16,17,0.5)',
            fontSize: '20px',
            lineHeight: 1,
            padding: '4px',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#0e1011' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(14,16,17,0.5)' }}
          aria-label="Close"
        >
          &times;
        </button>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.875rem',
          minHeight: '260px',
          maxHeight: '380px',
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              maxWidth: '88%',
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <p
              style={{
                fontFamily: FONT_DM_SANS,
                fontSize: '0.8125rem',
                lineHeight: 1.6,
                color: '#eceae5',
                padding: msg.role === 'user' ? '0.6rem 0.9rem' : '0',
                background: msg.role === 'user' ? 'rgba(236,234,229,0.07)' : 'transparent',
                opacity: msg.role === 'assistant' ? 0.75 : 1,
                margin: 0,
              }}
            >
              {msg.content}
            </p>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', gap: '4px', paddingLeft: '2px', alignSelf: 'flex-start' }}>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  width: '5px',
                  height: '5px',
                  background: 'rgba(236,234,229,0.3)',
                  borderRadius: '50%',
                  animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => { e.preventDefault(); sendMessage() }}
        style={{
          display: 'flex',
          borderTop: '1px solid rgba(236,234,229,0.08)',
          alignItems: 'center',
        }}
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isFr ? 'Votre message...' : 'Type your message...'}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#eceae5',
            fontFamily: FONT_DM_SANS,
            fontSize: '0.8125rem',
            padding: '1rem 1.25rem',
          }}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          style={{
            background: 'none',
            border: 'none',
            cursor: input.trim() ? 'pointer' : 'default',
            padding: '1rem 1.25rem',
            color: input.trim() ? '#f55f00' : 'rgba(236,234,229,0.2)',
            fontSize: '18px',
            transition: 'color 0.2s',
          }}
        >
          &#8594;
        </button>
      </form>

      <style>{`
        @keyframes pulse {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.9); }
          40% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>
    </div>
  )
}
