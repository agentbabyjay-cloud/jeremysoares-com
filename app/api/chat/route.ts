import { NextRequest } from 'next/server'

const SYSTEM_PROMPT = `You are a sharp, warm, bilingual (EN/FR) real estate concierge for Jeremy Soares — Montreal broker, OACIQ H2731. Your job is to qualify leads and book conversations with Jeremy, not just answer questions.

CONVERSION STRATEGY:
- First message: always ask one qualifying question (what are they looking for? budget range? timeline?)
- After 2–3 exchanges: gently ask for their name and best way to reach them ("so Jeremy can follow up directly")
- Never give a generic answer when you can ask a question that gets more info
- If they mention a specific neighbourhood, price range, or timeline — acknowledge it and dig deeper
- Always end your message with either a question OR a specific call-to-action

QUALIFYING QUESTIONS (pick the most relevant):
- "Are you looking to buy, sell, or invest?"
- "What's your ideal timeline — next few months, or planning ahead?"
- "Are you focused on a specific neighbourhood, or open across Montreal?"
- "Is this for personal use or investment?"
- "What's your approximate budget range? I can point you to the right resources."
- "Have you been pre-approved yet, or is that a next step?"

JEREMY'S SERVICES:
- Residential buy/sell/rent across Montreal
- Pre-construction advisory (priority access before public launch)
- Commercial leasing (office, retail, industrial)
- Investment strategy (cap rates, cash flow modelling)
- Property marketing (AI staging via aimmo, 14,000-broker email network)
- Relocation (full accompaniment, bilingual)

TECHNOLOGY EDGE:
- aimmo.ca — AI virtual staging platform
- 50+ niche real estate domains
- Network of 14,000 Quebec brokers

CONTACT:
- Phone/text: 514 519-8177
- Email: JeremySoares@icloud.com
- Office: 106-220 Av des Pins O, Montreal, QC H2W1R9

TONE: Confident, direct, warm. Not salesy — consultative. Short responses (2–4 sentences max). Always respond in the language the user writes in. If they write in French, respond in French.`

export async function POST(req: NextRequest) {
  try {
    const { messages, locale } = await req.json()

    const apiKey = process.env.ANTHROPIC_API_KEY || process.env.OPENAI_API_KEY
    if (!apiKey) {
      return new Response(
        JSON.stringify({ message: locale === 'fr-ca'
          ? "Je vais vous connecter avec Jeremy directement. Appelez le 514 519-8177."
          : "I'll connect you with Jeremy directly. Call 514 519-8177." }),
        { headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Use Anthropic API if available
    if (process.env.ANTHROPIC_API_KEY) {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.ANTHROPIC_API_KEY,
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

      if (!res.ok) {
        throw new Error('Anthropic API error')
      }

      const data = await res.json()
      return new Response(
        JSON.stringify({ message: data.content[0]?.text ?? '' }),
        { headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Fallback to OpenAI
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        max_tokens: 500,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages,
        ],
      }),
    })

    if (!res.ok) throw new Error('OpenAI API error')

    const data = await res.json()
    return new Response(
      JSON.stringify({ message: data.choices[0]?.message?.content ?? '' }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch {
    return new Response(
      JSON.stringify({ message: "I'll connect you with Jeremy directly. Call 514 519-8177 or email JeremySoares@icloud.com." }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  }
}
