/**
 * One-time script — creates the ElevenLabs Convai agent for the website voice widget.
 * Run: npx tsx scripts/create-elevenlabs-agent.ts
 * Paste the returned agent_id into .env.local as ELEVENLABS_AGENT_ID
 */
import { readFileSync } from 'fs'
import { resolve } from 'path'

// Load .env.local manually
const envPath = resolve(process.cwd(), '.env.local')
const envContent = readFileSync(envPath, 'utf-8')
for (const line of envContent.split('\n')) {
  const [k, ...rest] = line.split('=')
  if (k && rest.length) process.env[k.trim()] = rest.join('=').trim()
}

const API_KEY = process.env.ELEVENLABS_API_KEY
if (!API_KEY) throw new Error('ELEVENLABS_API_KEY not set in .env.local')

const SYSTEM_PROMPT = `You are the AI voice assistant for Soares Agency — Jeremy Soares's Montreal real estate firm (OACIQ H2731).

Your role is to have a warm, natural conversation with potential clients, understand what they need, and collect their contact info so Jeremy can follow up personally.

OPENING: Greet the caller and ask how you can help. Keep it short — this is voice, not text.

DURING THE CALL — naturally collect:
- Their first name
- What they're looking to do: buy, sell, rent, or invest
- Type of property (condo, plex, house, commercial, land)
- Neighbourhood or city they're interested in
- Approximate budget (don't push if they're not ready to share)
- Their timeline (urgent, within a few months, exploring)
- Best contact method — phone number or email

STYLE:
- Conversational and warm, never robotic
- Speak in whatever language the client uses (English or French)
- Keep each response SHORT — this is a phone call, not a lecture
- Never ask multiple questions at once
- If they seem hesitant to share contact info, reassure them: "Jeremy reaches out personally, no sales team"

CLOSING: Once you have their name and at least one way to reach them, thank them warmly and confirm that Jeremy will personally follow up within 24 hours.

IMPORTANT: Do not invent facts about the Montreal real estate market. If asked a specific market question, say you'll have Jeremy follow up with current data.`

async function main() {
  const res = await fetch('https://api.elevenlabs.io/v1/convai/agents/create', {
    method: 'POST',
    headers: {
      'xi-api-key': API_KEY!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'Soares Agency — Website Assistant',
      conversation_config: {
        agent: {
          prompt: {
            prompt: SYSTEM_PROMPT,
            llm: 'claude-haiku-4-5',
            temperature: 0.7,
          },
          first_message: "Hi, you've reached Soares Agency. I'm the AI assistant — how can I help you today?",
          language: 'en',
        },
        tts: {
          voice_id: 'XB0fDUnXU5powFXDhCwa', // Charlotte — warm, professional
          model_id: 'eleven_turbo_v2',           // lowest latency for English agents
          optimize_streaming_latency: 4,
        },
        asr: {
          quality: 'high',
          user_input_audio_format: 'pcm_16000',
        },
        turn: {
          turn_timeout: 7,
          mode: 'turn',
        },
      },
      platform_settings: {
        auth: {
          enable_auth: false,
        },
      },
    }),
  })

  const data = await res.json()
  if (!res.ok) {
    console.error('Error:', JSON.stringify(data, null, 2))
    process.exit(1)
  }

  console.log('\n✅ Agent created successfully!')
  console.log(`\nAdd this to your .env.local:\n`)
  console.log(`ELEVENLABS_AGENT_ID=${data.agent_id}`)
  console.log(`\nFull response:`, JSON.stringify(data, null, 2))
}

main()
