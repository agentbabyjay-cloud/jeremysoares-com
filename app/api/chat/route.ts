import { NextRequest } from 'next/server'

const SYSTEM_PROMPT = `You are a helpful bilingual (English/French) assistant for Jeremy Soares, a Montreal real estate broker (OACIQ H2731). You help potential clients with:
- Buying, selling, or renting property in Montreal
- Information about neighbourhoods and market conditions
- Pre-sale condo inquiries
- Commercial real estate questions
- Jeremy's services and technology (aimmo, 50+ domains, 14K broker network)

Be professional, warm, and concise. If you cannot answer a specific question, offer to connect them with Jeremy directly. Always respond in the language the user writes in.

Jeremy's contact: 514 519-8177, JeremySoares@icloud.com
Office: 106-220 Av des Pins O, Montreal, QC H2W1R9`

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
