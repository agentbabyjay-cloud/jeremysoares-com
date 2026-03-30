import { NextResponse } from 'next/server'

export async function POST() {
  const agentId = process.env.ELEVENLABS_AGENT_ID
  const apiKey = process.env.ELEVENLABS_API_KEY

  if (!agentId || !apiKey) {
    return NextResponse.json({ error: 'Voice agent not configured' }, { status: 500 })
  }

  const res = await fetch(
    `https://api.elevenlabs.io/v1/convai/conversations/signed_url?agent_id=${agentId}`,
    {
      method: 'POST',
      headers: { 'xi-api-key': apiKey },
    }
  )

  if (!res.ok) {
    const err = await res.text()
    console.error('ElevenLabs signed URL error:', err)
    return NextResponse.json({ error: 'Failed to start session' }, { status: 500 })
  }

  const { signed_url } = await res.json()
  return NextResponse.json({ signedUrl: signed_url })
}
