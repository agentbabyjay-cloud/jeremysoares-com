import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

async function sendTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return

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

export async function POST(req: Request) {
  let messages, lead, mode
  try {
    const body = await req.json()
    messages = body.messages
    lead = body.lead
    mode = body.mode
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid json' }, { status: 400 })
  }
  if (!messages || messages.length < 2) return NextResponse.json({ ok: false }, { status: 400 })

  const isVoice = mode === 'voice'
  const modeLabel = isVoice ? 'Voice' : 'Text'
  const modeIcon = isVoice ? '🎙️' : '💬'
  const now = new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' })

  const transcript = messages
    .map((m: { role: string; content: string }) =>
      `${m.role === 'user' ? '👤 Client' : '🤖 Agent'}: ${m.content}`
    )
    .join('\n\n')

  const leadSummary = [
    lead?.name && `Name: ${lead.name}`,
    lead?.contact && `Contact: ${lead.contact}`,
    lead?.budget && `Budget: ${lead.budget}`,
    lead?.beds && `Beds: ${lead.beds}`,
  ].filter(Boolean).join('\n')

  const telegramMsg = `${modeIcon} <b>New ${modeLabel} Chat Lead — Soares Agency</b>
📅 ${now}
${leadSummary ? `\n<b>Lead Info:</b>\n${leadSummary}\n` : ''}
<b>Transcript (${messages.length} messages):</b>
${transcript}

---
<i>Sent from jeremysoares.com ${modeLabel.toLowerCase()} chat</i>`

  const emailBody = `
<div style="font-family: monospace; max-width: 600px; margin: 0 auto; padding: 24px; background: #0e1011; color: #eceae5;">
  <h2 style="font-size: 18px; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px;">${modeIcon} New ${modeLabel} Chat Lead</h2>
  <p style="opacity: 0.5; font-size: 12px; margin-bottom: 16px;">${now} · ${messages.length} messages</p>
  ${leadSummary ? `<div style="border: 1px solid rgba(245,95,0,0.2); padding: 12px; margin-bottom: 16px; background: rgba(245,95,0,0.04);"><p style="font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; opacity: 0.4; margin-bottom: 8px;">Lead Info</p><pre style="margin: 0; font-size: 13px; opacity: 0.8;">${leadSummary}</pre></div>` : ''}
  <div style="border-top: 1px solid rgba(236,234,229,0.1); padding-top: 16px; white-space: pre-wrap; font-size: 13px; line-height: 1.7; opacity: 0.8;">
${transcript}
  </div>
</div>`

  await Promise.allSettled([
    sendTelegram(telegramMsg),
    resend.emails.send({
      from: 'Soares Chat <noreply@jeremysoares.com>',
      to: ['jeremy@jeremysoares.com', 'JeremySoares@icloud.com'],
      subject: `${modeIcon} ${modeLabel} Chat${lead?.name ? ` — ${lead.name}` : ''} — ${now}`,
      html: emailBody,
    }),
  ])

  return NextResponse.json({ ok: true })
}
