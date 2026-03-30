import { NextRequest } from 'next/server'

const SYSTEM_PROMPT = `You are the personal AI assistant for Jeremy Soares — warm, sharp, and genuinely curious. You work for Soares Agency, a boutique Montreal real estate and AI consulting firm (OACIQ H2731).

Your personality: Think of yourself as a knowledgeable friend who works closely with Jeremy. You are enthusiastic, occasionally witty, and genuinely interested in the person you are talking with. You adapt naturally to their energy — relaxed if they are casual, sharp and concise if they are businesslike.

WHAT JEREMY DOES:
- Real estate: buying, selling, renting, investing across Montreal
- Pre-construction advisory (priority access before public launch)
- Commercial, industrial, and multi-unit acquisitions
- Investment strategy: cap rates, cash flow modeling, market timing
- AI consulting: custom websites for real estate developers, AI virtual staging via aimmo.ca
- Relocation services, bilingual EN/FR

CONVERSATION APPROACH:
- First message: open with a warm, genuine question about what they are looking for
- Listen and respond to what they actually said — not a script
- Offer brief, interesting insights when relevant
- After 2–3 exchanges: gently ask for their name and best way to reach them ("Jeremy follows up personally")
- At a natural moment, ask: "Is there anything else on your mind — even something that feels unrelated?"
- When you have their name AND contact info: include a JSON block at the END of your response ONLY:
  {"lead_captured": true, "name": "...", "contact": "...", "intent": "..."}

TONE: Warm, consultative, genuinely curious. Not salesy. Keep responses to 2–4 sentences. Always respond in the language the user writes in.`

async function sendTelegram(message: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'HTML' }),
  }).catch(() => {})
}

async function sendLeadEmail(lead: { name: string; contact: string; intent: string }, conversation: { role: string; content: string }[]) {
  const resendKey = process.env.RESEND_API_KEY
  if (!resendKey) return

  const transcript = conversation
    .map(m => `${m.role === 'user' ? '👤 Client' : '🤖 Agent'}: ${m.content}`)
    .join('\n\n')

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${resendKey}` },
    body: JSON.stringify({
      from: 'Soares Chat <noreply@jeremysoares.com>',
      to: ['JeremySoares@icloud.com'],
      cc: ['JeremySoares@icloud.com'],
      subject: `🔥 New Lead: ${lead.name} — ${lead.intent}`,
      text: `New lead captured via jeremysoares.com chat.\n\nName: ${lead.name}\nContact: ${lead.contact}\nIntent: ${lead.intent}\n\n---\nCONVERSATION TRANSCRIPT\n---\n\n${transcript}`,
    }),
  }).catch(() => {})
}

export async function POST(req: NextRequest) {
  try {
    const { messages, locale } = await req.json()

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return new Response(
        JSON.stringify({ message: locale === 'fr-ca'
          ? "Je vais vous connecter avec Jeremy directement. Appelez le 514 519-8177."
          : "I'll connect you with Jeremy directly. Call 514 519-8177." }),
        { headers: { 'Content-Type': 'application/json' } }
      )
    }

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 500,
        system: SYSTEM_PROMPT,
        messages: messages.map((m: { role: string; content: string }) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    })

    if (!res.ok) throw new Error('Anthropic API error')

    const data = await res.json()
    const rawText: string = data.content[0]?.text ?? ''

    // Extract lead JSON if present, strip it from displayed message
    let displayText = rawText
    let leadData: { name: string; contact: string; intent: string } | null = null

    const jsonMatch = rawText.match(/\{"lead_captured":\s*true[^}]*\}/)
    if (jsonMatch) {
      try {
        leadData = JSON.parse(jsonMatch[0])
        displayText = rawText.replace(jsonMatch[0], '').trim()
      } catch { /* ignore parse errors */ }
    }

    // Fire-and-forget lead notifications
    if (leadData) {
      const allMessages = [...messages, { role: 'assistant', content: displayText }]
      const tgMsg = `🔥 <b>New Lead — jeremysoares.com</b>\n\n👤 <b>${leadData.name}</b>\n📞 ${leadData.contact}\n🏠 ${leadData.intent}`
      sendTelegram(tgMsg)
      sendLeadEmail(leadData, allMessages)
    }

    return new Response(
      JSON.stringify({ message: displayText }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch {
    return new Response(
      JSON.stringify({ message: "I'll connect you with Jeremy directly. Call 514 519-8177 or email JeremySoares@icloud.com." }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  }
}
