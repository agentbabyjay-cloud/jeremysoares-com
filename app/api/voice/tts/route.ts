import { NextRequest } from 'next/server'

// Charlotte — multilingual, works well for both EN and FR
const VOICE_ID = 'XB0fDUnXU5powFXDhCwa'

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json()
    if (!text?.trim()) {
      return new Response('Missing text', { status: 400 })
    }

    const apiKey = process.env.ELEVENLABS_API_KEY
    if (!apiKey) {
      return new Response('ElevenLabs API key not configured', { status: 503 })
    }

    const res = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/stream`,
      {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
          Accept: 'audio/mpeg',
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.45,
            similarity_boost: 0.80,
            style: 0.3,
            use_speaker_boost: true,
          },
        }),
      }
    )

    if (!res.ok) {
      const err = await res.text()
      console.error('ElevenLabs error:', err)
      return new Response('TTS failed', { status: 502 })
    }

    const audioBuffer = await res.arrayBuffer()
    return new Response(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'no-store',
      },
    })
  } catch (e) {
    console.error('TTS route error:', e)
    return new Response('Internal error', { status: 500 })
  }
}
