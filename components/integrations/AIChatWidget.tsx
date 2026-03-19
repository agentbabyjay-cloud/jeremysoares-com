'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export function AIChatWidget({ locale }: { locale: string }) {
  const isFr = locale === 'fr-ca'
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

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
            ? "Désolé, je ne peux pas répondre maintenant. Appelez le 514 519-8177."
            : "Sorry, I can't respond right now. Call 514 519-8177.",
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
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#eceae5] text-[#0e1011] rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer"
        aria-label={isFr ? 'Ouvrir le chat' : 'Open chat'}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[360px] max-h-[500px] flex flex-col bg-[#0e1011] border border-[rgba(236,234,229,0.1)] shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(236,234,229,0.1)]">
        <span className="text-[0.625rem] tracking-[0.22em] uppercase text-[#eceae5] opacity-60 font-bold">
          Soares
        </span>
        <button
          onClick={() => setOpen(false)}
          className="text-[#eceae5] opacity-40 hover:opacity-100 transition-opacity cursor-pointer text-lg"
          aria-label="Close"
        >
          &times;
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px] max-h-[350px]">
        {messages.length === 0 && (
          <p className="text-[0.75rem] text-[#eceae5] opacity-30 text-center mt-8">
            {isFr
              ? "Posez-moi une question sur l'immobilier à Montréal."
              : 'Ask me anything about Montreal real estate.'}
          </p>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`text-[0.8rem] leading-relaxed px-3 py-2 max-w-[85%] ${
              msg.role === 'user'
                ? 'ml-auto bg-[rgba(236,234,229,0.08)] text-[#eceae5]'
                : 'text-[#eceae5] opacity-70'
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="text-[0.75rem] text-[#eceae5] opacity-30">...</div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          sendMessage()
        }}
        className="flex border-t border-[rgba(236,234,229,0.1)]"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isFr ? 'Votre message...' : 'Your message...'}
          className="flex-1 bg-transparent text-[#eceae5] text-[0.8rem] px-4 py-3 outline-none placeholder:text-[rgba(236,234,229,0.2)]"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-4 text-[#eceae5] opacity-50 hover:opacity-100 disabled:opacity-20 transition-opacity cursor-pointer"
        >
          &rarr;
        </button>
      </form>
    </div>
  )
}
