import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

async function sendTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return

  // Split if > 4000 chars (Telegram limit)
  const chunks: string[] = []
  for (let i = 0; i < text.length; i += 4000) chunks.push(text.slice(i, i + 4000))
  for (const chunk of chunks) {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: chunk, parse_mode: 'HTML' }),
    })
  }
}

const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms))

/**
 * Fetch transcript with retries.
 * ElevenLabs takes a few seconds to process after the call disconnects,
 * so calling immediately always returns an empty transcript.
 */
async function fetchTranscript(apiKey: string, conversationId: string) {
  const delays = [4000, 8000, 15000, 25000]
  for (const delay of delays) {
    await sleep(delay)
    try {
      const res = await fetch(
        `https://api.elevenlabs.io/v1/convai/conversations/${conversationId}`,
        { headers: { 'xi-api-key': apiKey } }
      )
      if (!res.ok) continue
      const data = await res.json()
      const messages: { role: string; message: string }[] = data.transcript ?? []
      if (messages.length > 0) return messages
    } catch {
      // retry
    }
  }
  return []
}

export async function POST(req: Request) {
  const { conversationId } = await req.json()
  if (!conversationId) return NextResponse.json({ ok: false }, { status: 400 })

  const apiKey = process.env.ELEVENLABS_API_KEY
  if (!apiKey) return NextResponse.json({ ok: false }, { status: 500 })

  // Respond to client immediately — transcript fetch + notifications run async
  ;(async () => {
    const messages = await fetchTranscript(apiKey, conversationId)

    const transcript = messages
      .map((m) => `${m.role === 'agent' ? '🤖 Agent' : '👤 Client'}: ${m.message}`)
      .join('\n')

    const now = new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' })

    const telegramMsg = `🎙️ <b>New Voice Lead — Soares Agency</b>
📅 ${now}
🔑 Conversation: <code>${conversationId}</code>

<b>Transcript:</b>
${transcript || '(no transcript — ElevenLabs may still be processing)'}

---
<i>Sent from jeremysoares.com voice agent</i>`

    const emailBody = `
<div style="font-family: monospace; max-width: 600px; margin: 0 auto; padding: 24px; background: #0e1011; color: #eceae5;">
  <h2 style="font-size: 18px; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px;">🎙️ New Voice Lead</h2>
  <p style="opacity: 0.5; font-size: 12px; margin-bottom: 24px;">${now} · ${conversationId}</p>
  <div style="border-top: 1px solid rgba(236,234,229,0.1); padding-top: 16px; white-space: pre-wrap; font-size: 13px; line-height: 1.7; opacity: 0.8;">
${transcript || '(no transcript available)'}
  </div>
</div>`

    await Promise.allSettled([
      sendTelegram(telegramMsg),
      resend.emails.send({
        from: 'noreply@jeremysoares.com',
        to: ['jeremy@jeremysoares.com', 'JeremySoares@icloud.com'],
        subject: `🎙️ Voice Lead — ${now}`,
        html: emailBody,
      }),
    ])
  })().catch(console.error)

  return NextResponse.json({ ok: true })
}
