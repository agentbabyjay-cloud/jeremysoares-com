'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { Conversation } from '@elevenlabs/client'
import { ScrambleText } from '@/components/animation/ScrambleText'

/* ── Types ──────────────────────────────────────────────── */
type CallState = 'idle' | 'connecting' | 'active' | 'ended' | 'error'
type SpeakerMode = 'listening' | 'speaking' | 'processing'
type WidgetMode = 'voice' | 'text'
interface Msg { role: 'user' | 'agent' | 'system'; text: string; ts: number }
interface LeadInfo { name?: string; contact?: string; budget?: string; beds?: string }
interface IntentBadge { key: string; label: string; labelFr: string }

/* ── Constants ───────────────────────────────────────────── */
const AGENT_ID = 'agent_6901km9pstseecrsnta2nm3ej67s'
const FONT_BARLOW = "var(--font-barlow),'Barlow',sans-serif"
const ORANGE = '#f55f00'
const CREAM = '#eceae5'

const INTENTS: IntentBadge[] = [
  { key: 'buy',        label: 'Buying',       labelFr: 'Achat' },
  { key: 'sell',       label: 'Selling',      labelFr: 'Vente' },
  { key: 'rent',       label: 'Renting',      labelFr: 'Location' },
  { key: 'invest',     label: 'Investment',   labelFr: 'Investissement' },
  { key: 'plex',       label: 'Plex',         labelFr: 'Plex' },
  { key: 'commercial', label: 'Commercial',   labelFr: 'Commercial' },
  { key: 'industrial', label: 'Industrial',   labelFr: 'Industriel' },
  { key: 'presale',    label: 'Pre-Sale',     labelFr: 'Préconstruction' },
  { key: 'art',        label: 'Art & Studio', labelFr: 'Art & Studio' },
  { key: 'ai',         label: 'AI / Tech',    labelFr: 'IA / Tech' },
  { key: 'luxury',     label: 'Luxury',       labelFr: 'Luxe' },
  { key: 'budget',     label: 'Budget',       labelFr: 'Budget' },
  { key: 'beds',       label: '',             labelFr: '' },
]

const INTENT_KW: Record<string, string[]> = {
  buy:        ['buy','buying','purchase','acquir','acheter','achat','acqu'],
  sell:       ['sell','selling','vendre','vente'],
  rent:       ['rent','renting','louer','location','locataire','lease'],
  invest:     ['invest','investissement','cap rate','cashflow','rendement','yield','revenue'],
  plex:       ['plex','duplex','triplex','quadruplex'],
  commercial: ['commercial','office','bureau','retail','boutique','mixed-use','usage mixte'],
  industrial: ['industrial','industriel','warehouse','entrepôt','logistics'],
  presale:    ['pre-sale','prévente','preconstruction','préconstruction','new construction','developer','promoteur'],
  art:        ['art','studio','paint','peinture','oeuvre','artwork','gallery'],
  ai:         ['ai staging','aimmo','virtual staging','website','site web','technolog','consulting'],
  luxury:     ['luxury','luxe','penthouse','westmount','outremont','million'],
}

function detectIntents(messages: Msg[]): Set<string> {
  const full = messages.map(m => m.text).join(' ').toLowerCase()
  const found = new Set<string>()
  for (const [key, kws] of Object.entries(INTENT_KW)) {
    if (kws.some(kw => full.includes(kw))) found.add(key)
  }
  if (/\$[\d,k]+|\d[\d,]{2,}\s*(dollars?|cad|budget)/i.test(full)) found.add('budget')
  if (/(\d)\s*(bed|bedroom|chambre|pièce)/i.test(full)) found.add('beds')
  return found
}

function extractLead(messages: Msg[]): LeadInfo {
  const full = messages.map(m => m.text).join(' ')
  const lead: LeadInfo = {}
  const nameM = full.match(/(?:my name is|i'?m|je m'?appelle|mon nom est)\s+([A-ZÀ-Ÿa-z]+(?:\s+[A-ZÀ-Ÿa-z]+)?)/i)
  if (nameM) lead.name = nameM[1]
  const emailM = full.match(/[\w.+-]+@[\w-]+\.[a-z]{2,}/i)
  if (emailM) lead.contact = emailM[0]
  const phoneM = full.match(/(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/)
  if (phoneM && !lead.contact) lead.contact = phoneM[0]
  const budgetM = full.match(/\$[\d,k]+(?:\s*[-–]\s*\$[\d,k]+)?|\d{3},\d{3}(?:\s*[-–]\s*\d{3},\d{3})?/)
  if (budgetM) lead.budget = budgetM[0]
  const bedM = full.match(/(\d)\s*(?:bed|bedroom|chambre)/i)
  if (bedM) lead.beds = bedM[1] + ' bed'
  return lead
}

function getPageContext(pathname: string): string {
  if (pathname.includes('/blog/')) return `reading a blog article at ${pathname}`
  if (pathname.includes('/blog')) return 'browsing the blog'
  if (pathname.includes('/real-estate/')) return `viewing a property listing at ${pathname}`
  if (pathname.includes('/real-estate')) return 'browsing property listings'
  if (pathname.includes('/presale')) return 'viewing pre-sale marketing services'
  if (pathname.includes('/commercial')) return 'viewing commercial real estate'
  if (pathname.includes('/studio')) return 'viewing the art studio'
  if (pathname.includes('/contact')) return 'on the contact page'
  if (pathname.includes('/about')) return 'reading about Jeremy Soares'
  if (pathname.includes('/services')) return 'viewing services'
  if (pathname.includes('/neighborhoods')) return 'exploring Montreal neighborhoods'
  return 'on the main jeremysoares.com website'
}

/* ── Particle Orb Canvas ─────────────────────────────────── */

// Pre-compute Fibonacci sphere points (stable across renders)
function fibonacciSphere(n: number): [number, number, number][] {
  const PHI = Math.PI * (3 - Math.sqrt(5))
  return Array.from({ length: n }, (_, i) => {
    const y = 1 - (i / (n - 1)) * 2
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = PHI * i
    return [r * Math.cos(theta), y, r * Math.sin(theta)] as [number, number, number]
  })
}

const BLOB_PTS = fibonacciSphere(480)

const RINGS = [
  { r: 115, tX:  0.30, tZ:  0.10, spd:  0.38, n: 160 },
  { r: 140, tX: -0.40, tZ:  0.18, spd: -0.29, n: 190 },
  { r: 170, tX:  0.55, tZ: -0.08, spd:  0.22, n: 220 },
  { r: 200, tX: -0.20, tZ:  0.38, spd: -0.17, n: 250 },
  { r: 232, tX:  0.12, tZ: -0.28, spd:  0.13, n: 270 },
]

function rotY(x: number, y: number, z: number, a: number): [number, number, number] {
  const c = Math.cos(a), s = Math.sin(a)
  return [x * c + z * s, y, -x * s + z * c]
}
function rotX(x: number, y: number, z: number, a: number): [number, number, number] {
  const c = Math.cos(a), s = Math.sin(a)
  return [x, y * c - z * s, y * s + z * c]
}
function rotZ(x: number, y: number, z: number, a: number): [number, number, number] {
  const c = Math.cos(a), s = Math.sin(a)
  return [x * c - y * s, x * s + y * c, z]
}

// Pre-compute ring base points (before Y rotation applied each frame)
const RING_BASE: [number, number, number][][] = RINGS.map(({ r, tX, tZ, n }) => {
  return Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2
    let p: [number, number, number] = [r * Math.cos(a), 0, r * Math.sin(a)]
    const [x1, y1, z1] = rotX(...p, tX)
    const [x2, y2, z2] = rotZ(x1, y1, z1, tZ)
    return [x2, y2, z2] as [number, number, number]
  })
})

function OrbCanvas({ mode, amplitude, callState }: { mode: SpeakerMode; amplitude: number; callState: CallState }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const startRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const W = canvas.width, H = canvas.height
    const cx = W / 2, cy = H / 2

    const draw = (ts: number) => {
      if (!startRef.current) startRef.current = ts
      const t = (ts - startRef.current) / 1000

      ctx.clearRect(0, 0, W, H)

      const isActive = callState === 'active'
      const rawAmp = Math.max(amplitude, 0)

      // When AI is speaking, simulate speech amplitude (mic is quiet, speaker isn't tracked)
      const simulatedSpeakingAmp = isActive && mode === 'speaking'
        ? 18 + 16 * Math.pow(Math.abs(Math.sin(t * 7.3 + 0.5)), 0.35)
              * Math.pow(Math.abs(Math.sin(t * 3.1 + 1.8)), 0.55)
        : 0
      // Cap mic amp at 30 to prevent orb exploding on loud input
      const amp = isActive && mode === 'speaking'
        ? simulatedSpeakingAmp
        : Math.min(rawAmp * 1.4, 30)

      const glowMult = isActive ? 1 + Math.min(amp * 0.014, 0.9) : 1

      // ── Outer ambient glow layers ──
      const glowLayers: [number, number][] = [
        [260, 0.07 * glowMult],
        [200, 0.11 * glowMult],
        [150, 0.16 * glowMult],
        [105, 0.22 * glowMult],
      ]
      for (const [r, a] of glowLayers) {
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
        g.addColorStop(0,   `rgba(255,130,20,${a})`)
        g.addColorStop(0.45,`rgba(245,95,0,${a * 0.4})`)
        g.addColorStop(1,   'rgba(245,95,0,0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.fill()
      }

      // ── Orbital rings ──
      const ringRotY = t  // base Y rotation applied to all ring points
      for (let ri = 0; ri < RINGS.length; ri++) {
        const ring = RINGS[ri]
        const base = RING_BASE[ri]
        const ringAngle = ringRotY * ring.spd

        // Sort points by depth for correct rendering (far to near)
        const projected: { sx: number; sy: number; depth: number; bri: number; idx: number }[] = []
        for (let pi = 0; pi < base.length; pi++) {
          const [bx, by, bz] = base[pi]
          const [rx, ry, rz] = rotY(bx, by, bz, ringAngle)
          // brightness wave: 2 hot spots travel around ring
          const normAngle = (pi / base.length)
          const wave1 = Math.pow(Math.max(0, Math.sin((normAngle - (t * ring.spd * 0.5) % 1) * Math.PI * 2)), 3)
          const wave2 = Math.pow(Math.max(0, Math.sin((normAngle - (t * ring.spd * 0.5 + 0.5) % 1) * Math.PI * 2)), 3)
          const bri = 0.25 + (wave1 + wave2) * 0.75
          projected.push({ sx: cx + rx, sy: cy + ry, depth: rz, bri, idx: pi })
        }
        projected.sort((a, b) => a.depth - b.depth)

        // Draw far (dim) particles
        ctx.shadowBlur = 0
        for (const p of projected) {
          if (p.depth > 0) continue  // near side drawn separately
          const depthFade = Math.max(0.08, 0.5 + p.depth / ring.r * 0.5)
          const alpha = depthFade * p.bri * 0.65
          const size = 0.8 + p.bri * 0.8
          ctx.fillStyle = `rgba(200,80,0,${alpha})`
          ctx.beginPath()
          ctx.arc(p.sx, p.sy, size, 0, Math.PI * 2)
          ctx.fill()
        }

        // Draw near (bright) particles with glow
        ctx.shadowBlur = 5
        ctx.shadowColor = 'rgba(255,150,30,0.8)'
        for (const p of projected) {
          if (p.depth <= 0) continue
          const depthBright = Math.min(1, 0.5 + p.depth / ring.r * 0.5)
          const alpha = depthBright * p.bri
          const size = 1.0 + p.bri * 1.2
          const brightness = Math.round(100 + p.bri * 155)
          const gb = Math.round(60 + p.bri * 60)
          ctx.fillStyle = `rgba(255,${gb},10,${alpha})`
          ctx.beginPath()
          ctx.arc(p.sx, p.sy, size, 0, Math.PI * 2)
          ctx.fill()
          // Extra bright spark on hotspots
          if (p.bri > 0.7) {
            ctx.fillStyle = `rgba(255,220,120,${(p.bri - 0.7) * 2.5})`
            ctx.beginPath()
            ctx.arc(p.sx, p.sy, size * 1.6, 0, Math.PI * 2)
            ctx.fill()
          }
        }
        ctx.shadowBlur = 0
      }

      // ── Blob surface dots ──
      const blobRotY = t * 0.35
      const blobRotX = Math.sin(t * 0.18) * 0.3  // slow tilt

      // Breathing — reacts strongly to amplitude
      const breathFreq = isActive && mode === 'speaking' ? 2.2 : isActive ? 1.3 : 0.55
      const breathAmt = isActive ? 0.07 + amp * 0.003 : 0.04
      const breathR = 1 + Math.sin(t * breathFreq) * breathAmt
      const R = (68 + amp * 0.28) * breathR

      const blobPts: { sx: number; sy: number; z: number; bri: number }[] = []
      for (const [bx, by, bz] of BLOB_PTS) {
        // Organic displacement
        const lat = Math.asin(Math.max(-1, Math.min(1, by)))
        const lon = Math.atan2(bz, bx)
        const noise =
          Math.sin(3 * lat + t * 0.9) * Math.sin(2 * lon + t * 0.7) * 0.5 +
          Math.sin(5 * lon - t * 0.55) * Math.cos(4 * lat + t * 0.35) * 0.3 +
          Math.sin(7 * lat + 3 * lon + t * 0.4) * 0.2
        const disp = 1 + noise * (0.18 + amp * 0.004)

        const rx = bx * R * disp
        const ry = by * R * disp
        const rz = bz * R * disp

        const [rx2, ry2, rz2] = rotX(rx, ry, rz, blobRotX)
        const [rx3, ry3, rz3] = rotY(rx2, ry2, rz2, blobRotY)

        if (rz3 < -5) continue // cull back-facing
        const brightness = (rz3 / (R * 1.2) + 1) / 2  // 0=dark, 1=bright
        blobPts.push({ sx: cx + rx3, sy: cy + ry3, z: rz3, bri: brightness })
      }
      blobPts.sort((a, b) => a.z - b.z)

      // Draw blob in 3 passes by brightness band
      const bands: [number, number, string, number][] = [
        [0,    0.35, `rgba(120,40,0`,   1.0],
        [0.35, 0.65, `rgba(200,70,5`,   1.4],
        [0.65, 1.0,  `rgba(255,140,20`, 1.8],
      ]
      for (const [lo, hi, colorBase, sizeScale] of bands) {
        const pts = blobPts.filter(p => p.bri >= lo && p.bri < hi)
        if (pts.length === 0) continue
        const normBri = (lo + hi) / 2
        ctx.shadowBlur = hi > 0.65 ? 5 : 0
        ctx.shadowColor = 'rgba(255,120,0,0.7)'
        ctx.fillStyle = `${colorBase},${0.4 + normBri * 0.55})`
        ctx.beginPath()
        for (const p of pts) {
          const size = (0.7 + p.bri * 0.9) * sizeScale
          ctx.moveTo(p.sx + size, p.sy)
          ctx.arc(p.sx, p.sy, size, 0, Math.PI * 2)
        }
        ctx.fill()
      }
      ctx.shadowBlur = 0

      // ── Inner core glow ──
      const coreR = R * 0.55 * breathR
      const coreG1 = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 1.8)
      coreG1.addColorStop(0,    `rgba(255,220,120,${0.9 * glowMult})`)
      coreG1.addColorStop(0.15, `rgba(255,150,40,${0.75 * glowMult})`)
      coreG1.addColorStop(0.45, `rgba(245,95,0,${0.45 * glowMult})`)
      coreG1.addColorStop(0.75, `rgba(200,60,0,${0.18 * glowMult})`)
      coreG1.addColorStop(1,    'rgba(245,95,0,0)')
      ctx.fillStyle = coreG1
      ctx.beginPath()
      ctx.arc(cx, cy, coreR * 1.8, 0, Math.PI * 2)
      ctx.fill()

      // White-hot inner core
      const coreG2 = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 0.6)
      coreG2.addColorStop(0,   `rgba(255,255,220,${0.7 * glowMult})`)
      coreG2.addColorStop(0.4, `rgba(255,200,80,${0.4 * glowMult})`)
      coreG2.addColorStop(1,   'rgba(255,150,0,0)')
      ctx.fillStyle = coreG2
      ctx.beginPath()
      ctx.arc(cx, cy, coreR * 0.6, 0, Math.PI * 2)
      ctx.fill()

      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animRef.current)
  }, [mode, amplitude, callState])

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={500}
      style={{ width: '280px', height: '280px' }}
    />
  )
}

/* ── Main Widget ─────────────────────────────────────────── */
export function AIChatWidget({ locale }: { locale: string }) {
  const isFr = locale === 'fr-ca'
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const [open, setOpen] = useState(false)
  const [widgetMode, setWidgetMode] = useState<WidgetMode>('voice')
  const [callState, setCallState] = useState<CallState>('idle')
  const [speakerMode, setSpeakerMode] = useState<SpeakerMode>('listening')
  const [amplitude, setAmplitude] = useState(0)
  const [messages, setMessages] = useState<Msg[]>([])
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [detectedIntents, setDetectedIntents] = useState<Set<string>>(new Set())
  const [lead, setLead] = useState<LeadInfo>({})
  const [textInput, setTextInput] = useState('')
  const [textLoading, setTextLoading] = useState(false)

  const convRef = useRef<Awaited<ReturnType<typeof Conversation.startSession>> | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const micStreamRef = useRef<MediaStream | null>(null)
  const ampAnimRef = useRef<number>(0)
  const msgEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    msgEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (messages.length === 0) return
    setDetectedIntents(detectIntents(messages))
    setLead(extractLead(messages))
  }, [messages])

  // Allow external pages (e.g. contact page) to open the widget in voice mode
  useEffect(() => {
    const handler = () => {
      setOpen(true)
      setWidgetMode('voice')
    }
    window.addEventListener('soares:open-voice', handler)
    return () => window.removeEventListener('soares:open-voice', handler)
  }, [])

  const startAmplitudeTracking = useCallback((stream: MediaStream) => {
    const actx = new AudioContext()
    if (actx.state === 'suspended') actx.resume().catch(() => {})
    const analyser = actx.createAnalyser()
    analyser.fftSize = 512   // more bins = smoother average
    analyser.smoothingTimeConstant = 0.6
    actx.createMediaStreamSource(stream).connect(analyser)
    audioCtxRef.current = actx
    analyserRef.current = analyser
    micStreamRef.current = stream
    const data = new Uint8Array(analyser.frequencyBinCount)
    const tick = () => {
      if (actx.state === 'suspended') actx.resume().catch(() => {})
      analyser.getByteFrequencyData(data)
      // Focus on speech frequencies (roughly bins 4–40 out of 256 at 44kHz)
      const speechBins = data.slice(4, 40)
      const avg = speechBins.reduce((a, b) => a + b, 0) / speechBins.length
      setAmplitude(avg)
      ampAnimRef.current = requestAnimationFrame(tick)
    }
    ampAnimRef.current = requestAnimationFrame(tick)
  }, [])

  const stopAmplitudeTracking = useCallback(() => {
    cancelAnimationFrame(ampAnimRef.current)
    micStreamRef.current?.getTracks().forEach(t => t.stop())
    audioCtxRef.current?.close()
    audioCtxRef.current = null
    analyserRef.current = null
    setAmplitude(0)
  }, [])

  const startCall = useCallback(async () => {
    setCallState('connecting')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      startAmplitudeTracking(stream)

      const pageCtx = getPageContext(pathname)
      const lang = isFr ? 'French' : 'English'
      const firstMsg = isFr
        ? "Bonjour! Je suis l'assistante IA de Jeremy. Comment puis-je vous aider?"
        : "Hi! I'm Jeremy's AI assistant. How can I help you today?"

      const conv = await Conversation.startSession({
        agentId: AGENT_ID,
        connectionType: 'websocket' as const,
        dynamicVariables: { page_context: pageCtx, language: lang },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        overrides: { agent: { firstMessage: firstMsg, language: (isFr ? 'fr' : 'en') as any } },
        onConnect: ({ conversationId: cid }: { conversationId: string }) => {
          setConversationId(cid)
          setCallState('active')
          setMessages([{ role: 'system', text: 'connected', ts: Date.now() }])
        },
        onDisconnect: () => { setCallState('ended'); stopAmplitudeTracking() },
        onModeChange: ({ mode: m }: { mode: string }) => { setSpeakerMode(m as SpeakerMode) },
        onMessage: (msg: { source: string; message: string }) => {
          setMessages(prev => [...prev, {
            role: msg.source === 'user' ? 'user' : 'agent',
            text: msg.message,
            ts: Date.now(),
          }])
        },
        onError: (err: unknown) => {
          console.error('Voice error:', err)
          setCallState('error')
          stopAmplitudeTracking()
        },
      })
      convRef.current = conv
    } catch (err) {
      console.error('Start call error:', err)
      setCallState('error')
      stopAmplitudeTracking()
    }
  }, [pathname, isFr, startAmplitudeTracking, stopAmplitudeTracking])

  const endCall = useCallback(async () => {
    if (convRef.current) { await convRef.current.endSession(); convRef.current = null }
    stopAmplitudeTracking()
    setCallState('ended')
  }, [stopAmplitudeTracking])

  useEffect(() => {
    if (callState !== 'ended' || !conversationId) return
    fetch('/api/voice/end', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversationId }),
    }).catch(console.error)
  }, [callState, conversationId])

  const sendText = useCallback(async () => {
    const text = textInput.trim()
    if (!text || textLoading) return
    setTextInput('')
    const userMsg: Msg = { role: 'user', text, ts: Date.now() }
    setMessages(prev => [...prev, userMsg])
    setTextLoading(true)
    try {
      const history = messages.filter(m => m.role !== 'system').map(m => ({
        role: m.role === 'agent' ? 'assistant' : 'user',
        content: m.text,
      }))
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...history, { role: 'user', content: text }],
          locale,
        }),
      })
      const data = await res.json()
      const reply = data.message || (isFr ? 'Désolé, une erreur est survenue.' : 'Sorry, something went wrong.')
      setMessages(prev => [...prev, { role: 'agent', text: reply, ts: Date.now() }])
    } catch {
      setMessages(prev => [...prev, { role: 'agent', text: isFr ? 'Désolé, une erreur est survenue.' : 'Sorry, something went wrong.', ts: Date.now() }])
    } finally {
      setTextLoading(false)
    }
  }, [textInput, textLoading, messages, locale, isFr])

  useEffect(() => {
    return () => { convRef.current?.endSession().catch(() => {}); stopAmplitudeTracking() }
  }, [stopAmplitudeTracking])

  // Track whether we already sent a notification for this conversation
  const notifiedRef = useRef(false)

  // Reset notification flag when messages are cleared (new conversation)
  useEffect(() => {
    if (messages.length === 0) notifiedRef.current = false
  }, [messages.length])

  // Notify on every conversation (text or voice)
  const notifyConversation = useCallback(() => {
    if (notifiedRef.current) return
    const textMsgs = messages.filter(m => m.role !== 'system')
    if (textMsgs.length < 2) return
    notifiedRef.current = true
    const payload = JSON.stringify({
      messages: textMsgs.map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.text,
      })),
      lead,
      mode: widgetMode,
    })
    // Use fetch with keepalive (works reliably on page close, unlike sendBeacon with JSON)
    fetch('/api/chat/end', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true,
    }).catch(console.error)
  }, [messages, widgetMode, lead])

  // Fire notification on page unload / tab close / navigation away
  useEffect(() => {
    const onBeforeUnload = () => notifyConversation()
    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') notifyConversation()
    }
    window.addEventListener('beforeunload', onBeforeUnload)
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [notifyConversation])

  const bedsIntent = messages.map(m => m.text).join(' ').match(/(\d)\s*(bed|bedroom|chambre)/i)

  const statusLabel = () => {
    if (callState === 'connecting') return isFr ? 'Connexion…' : 'Connecting…'
    if (callState === 'ended') return isFr ? 'Appel terminé' : 'Call ended'
    if (callState === 'error') return isFr ? 'Erreur de connexion' : 'Connection error'
    if (speakerMode === 'speaking') return isFr ? 'En train de parler…' : 'Speaking…'
    if (speakerMode === 'processing') return isFr ? 'Traitement…' : 'Processing…'
    return isFr ? 'À l\'écoute…' : 'Listening…'
  }

  const glassBase: React.CSSProperties = {
    background: 'rgba(10, 12, 14, 0.68)',
    backdropFilter: 'blur(36px) saturate(180%) brightness(0.92)',
    WebkitBackdropFilter: 'blur(36px) saturate(180%) brightness(0.92)',
    border: '1px solid rgba(255,255,255,0.07)',
    boxShadow: [
      '0 40px 120px rgba(0,0,0,0.7)',
      'inset 0 1px 0 rgba(255,255,255,0.09)',   // top light edge
      'inset 0 -1px 0 rgba(0,0,0,0.3)',          // bottom shadow edge
      'inset 1px 0 0 rgba(255,255,255,0.04)',    // left edge
      '0 0 0 1px rgba(245,95,0,0.05)',            // faint orange rim
    ].join(', '),
  }

  const panelStyle: React.CSSProperties = isMobile
    ? { ...glassBase, position: 'fixed', inset: 0, zIndex: 9000, width: '100vw', height: '100svh', display: 'flex', flexDirection: 'column', overflow: 'hidden', border: 'none', boxShadow: 'none' }
    : { ...glassBase, position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9000, width: 'clamp(540px, 46vw, 720px)', display: 'flex', flexDirection: 'column', maxHeight: 'min(760px, 92svh)', overflow: 'hidden' }

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9000, display: 'flex', alignItems: 'center', gap: '10px', background: '#0a0c0d', border: '1px solid rgba(236,234,229,0.1)', color: CREAM, cursor: 'pointer', padding: '13px 22px', boxShadow: '0 8px 40px rgba(0,0,0,0.6)', transition: 'border-color 0.25s, box-shadow 0.25s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = `rgba(245,95,0,0.5)`; e.currentTarget.style.boxShadow = `0 8px 40px rgba(245,95,0,0.25)` }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(236,234,229,0.1)'; e.currentTarget.style.boxShadow = '0 8px 40px rgba(0,0,0,0.6)' }}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: ORANGE, boxShadow: `0 0 10px ${ORANGE}`, flexShrink: 0, animation: 'orb-pulse 2s ease-in-out infinite' }} />
          <ScrambleText
            text={isFr ? "Parler à l'IA" : 'Talk to AI'}
            trigger="hover"
            duration={500}
            style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase' }}
          />
        </button>
      )}

      {open && (
        <div style={panelStyle}>

          {/* Glass sheen — top-left light catch */}
          <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.01) 35%, rgba(0,0,0,0) 60%)', borderRadius: 'inherit' }} />

          {/* Header */}
          <div style={{ padding: '15px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: callState === 'active' ? '#4ade80' : ORANGE, boxShadow: callState === 'active' ? '0 0 8px #4ade80' : `0 0 8px ${ORANGE}`, flexShrink: 0, animation: callState === 'active' ? 'none' : 'orb-pulse 2s ease-in-out infinite' }} />
              <div>
                <ScrambleText
                  text={isFr ? 'Assistante IA de Jeremy' : "Jeremy's AI Assistant"}
                  trigger="inview"
                  duration={900}
                  style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', color: CREAM, display: 'block' }}
                />
                <div style={{ fontSize: '11px', opacity: 0.28, color: CREAM, marginTop: '1px', letterSpacing: '0.08em' }}>
                  Soares Agency · OACIQ H2731
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ display: 'flex', background: 'rgba(236,234,229,0.04)', padding: '2px', gap: '2px' }}>
                {(['voice', 'text'] as WidgetMode[]).map(m => (
                  <button key={m} onClick={() => setWidgetMode(m)} style={{ background: widgetMode === m ? 'rgba(245,95,0,0.15)' : 'none', border: widgetMode === m ? `1px solid rgba(245,95,0,0.3)` : '1px solid transparent', color: widgetMode === m ? ORANGE : 'rgba(236,234,229,0.35)', fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '5px 14px', cursor: 'pointer', transition: 'all 0.2s' }}>
                    {m === 'voice' ? (isFr ? 'Voix' : 'Voice') : (isFr ? 'Texte' : 'Text')}
                  </button>
                ))}
              </div>
              <button onClick={() => { notifyConversation(); endCall(); setOpen(false) }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(236,234,229,0.25)', fontSize: '22px', lineHeight: 1, padding: '2px 4px', transition: 'color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'rgba(236,234,229,0.7)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(236,234,229,0.25)' }}
              >×</button>
            </div>
          </div>

          {/* Intent badges */}
          {detectedIntents.size > 0 && (
            <div style={{ padding: '8px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'relative', zIndex: 1, display: 'flex', flexWrap: 'wrap', gap: '5px', flexShrink: 0 }}>
              {INTENTS.filter(i => detectedIntents.has(i.key)).map(intent => (
                <span key={intent.key} style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, background: 'rgba(245,95,0,0.08)', border: '1px solid rgba(245,95,0,0.22)', color: ORANGE, padding: '3px 10px', display: 'inline-block', animation: 'badge-pop 0.3s cubic-bezier(0.34,1.56,0.64,1)' }}>
                  {intent.key === 'beds' && bedsIntent ? `${bedsIntent[1]} ${isFr ? 'ch.' : 'bd'}` : (isFr ? intent.labelFr : intent.label)}
                </span>
              ))}
            </div>
          )}

          {/* Voice panel */}
          {widgetMode === 'voice' && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative', zIndex: 1 }}>

              {/* Orb — positioned behind messages */}
              <div style={{ position: 'sticky', top: 0, zIndex: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 20px 4px', flexShrink: 0 }}>
                <OrbCanvas mode={speakerMode} amplitude={amplitude} callState={callState} />
                <p style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: CREAM, opacity: callState === 'active' ? 0.5 : 0.22, marginTop: '2px', transition: 'opacity 0.4s' }}>
                  {statusLabel()}
                </p>
              </div>

              {/* Messages — scroll over the orb */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 12px', display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative', zIndex: 1, marginTop: '-60px' }}>
                {messages.filter(m => m.role !== 'system').map((msg, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', animation: 'fade-in 0.3s ease' }}>
                    <div style={{ maxWidth: '86%', padding: '10px 14px', background: msg.role === 'user' ? 'rgba(245,95,0,0.12)' : 'rgba(10,12,14,0.82)', border: `1px solid ${msg.role === 'user' ? 'rgba(245,95,0,0.18)' : 'rgba(236,234,229,0.06)'}`, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
                      <p style={{ fontSize: '15px', lineHeight: 1.6, color: CREAM, margin: 0, opacity: msg.role === 'user' ? 0.9 : 0.75 }}>{msg.text}</p>
                    </div>
                  </div>
                ))}
                <div ref={msgEndRef} />
              </div>

              {(lead.name || lead.contact || lead.budget) && (
                <div style={{ margin: '0 20px 12px', padding: '10px 14px', background: 'rgba(245,95,0,0.05)', border: '1px solid rgba(245,95,0,0.13)', flexShrink: 0 }}>
                  <p style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.3, color: CREAM, marginBottom: '7px' }}>
                    {isFr ? 'Notes enregistrées' : 'Notes captured'}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px 18px' }}>
                    {lead.name    && <span style={{ fontSize: '14px', color: CREAM, opacity: 0.72 }}>Name — {lead.name}</span>}
                    {lead.contact && <span style={{ fontSize: '14px', color: CREAM, opacity: 0.72 }}>Contact — {lead.contact}</span>}
                    {lead.budget  && <span style={{ fontSize: '14px', color: CREAM, opacity: 0.72 }}>Budget — {lead.budget}</span>}
                    {lead.beds    && <span style={{ fontSize: '14px', color: CREAM, opacity: 0.72 }}>{lead.beds}</span>}
                  </div>
                </div>
              )}

              <div style={{ padding: '12px 20px 22px', borderTop: '1px solid rgba(236,234,229,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {callState === 'idle' && (
                  <button onClick={startCall} style={{ width: '64px', height: '64px', borderRadius: '50%', background: `linear-gradient(135deg, #ff7a00, ${ORANGE})`, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 32px rgba(245,95,0,0.5)`, transition: 'transform 0.2s, box-shadow 0.2s', animation: 'orb-pulse 2.5s ease-in-out infinite' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.07)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)' }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"/></svg>
                  </button>
                )}
                {callState === 'connecting' && (
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(245,95,0,0.08)', border: `2px solid rgba(245,95,0,0.3)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83">
                        <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/>
                      </path>
                    </svg>
                  </div>
                )}
                {callState === 'active' && (
                  <button onClick={endCall} style={{ width: '58px', height: '58px', borderRadius: '50%', background: '#ef4444', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 22px rgba(239,68,68,0.45)', transition: 'transform 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.05)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)' }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                  </button>
                )}
                {callState === 'ended' && (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <p style={{ fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', color: CREAM, opacity: 0.35 }}>
                      {isFr ? 'Jeremy vous contactera sous peu' : 'Jeremy will follow up personally'}
                    </p>
                    <button onClick={() => { setCallState('idle'); setMessages([]); setDetectedIntents(new Set()); setLead({}) }} style={{ marginTop: '10px', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: ORANGE, opacity: 0.6, background: 'none', border: 'none', cursor: 'pointer' }}>
                      {isFr ? 'Nouvel appel' : 'New call'}
                    </button>
                  </div>
                )}
                {callState === 'error' && (
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '14px', color: '#fca5a5', marginBottom: '10px' }}>
                      {isFr ? 'Connexion échouée. Vérifiez votre micro.' : 'Connection failed. Check microphone access.'}
                    </p>
                    <button onClick={() => setCallState('idle')} style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: ORANGE, background: 'none', border: `1px solid rgba(245,95,0,0.3)`, padding: '8px 18px', cursor: 'pointer' }}>
                      {isFr ? 'Réessayer' : 'Try again'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Text panel */}
          {widgetMode === 'text' && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative', zIndex: 1 }}>
              <div style={{ flex: 1, overflowY: 'auto', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {messages.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '36px 0' }}>
                    <p style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: '1.15rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: CREAM, marginBottom: '10px' }}>
                      {isFr ? 'Comment puis-je vous aider ?' : 'How can I help you?'}
                    </p>
                    <p style={{ fontSize: '14px', opacity: 0.3, color: CREAM, lineHeight: 1.6 }}>
                      {isFr ? 'Immobilier, investissement, IA, consultation…' : 'Real estate, investment, AI consulting…'}
                    </p>
                  </div>
                )}
                {messages.filter(m => m.role !== 'system').map((msg, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', animation: 'fade-in 0.25s ease' }}>
                    <div style={{ maxWidth: '86%', padding: '11px 15px', background: msg.role === 'user' ? 'rgba(245,95,0,0.1)' : 'rgba(236,234,229,0.04)', border: `1px solid ${msg.role === 'user' ? 'rgba(245,95,0,0.18)' : 'rgba(236,234,229,0.06)'}` }}>
                      <p style={{ fontSize: '15px', lineHeight: 1.65, color: CREAM, margin: 0, opacity: msg.role === 'user' ? 0.92 : 0.78 }}>{msg.text}</p>
                    </div>
                  </div>
                ))}
                {textLoading && (
                  <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <div style={{ padding: '11px 16px', background: 'rgba(236,234,229,0.04)', border: '1px solid rgba(236,234,229,0.06)', display: 'flex', gap: '5px', alignItems: 'center' }}>
                      {[0, 1, 2].map(i => (
                        <span key={i} style={{ width: '5px', height: '5px', borderRadius: '50%', background: ORANGE, animation: `dot-bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={msgEndRef} />
              </div>

              {(lead.name || lead.contact || lead.budget) && (
                <div style={{ margin: '0 20px 10px', padding: '10px 14px', background: 'rgba(245,95,0,0.05)', border: '1px solid rgba(245,95,0,0.12)', flexShrink: 0 }}>
                  <p style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.28, color: CREAM, marginBottom: '6px' }}>Notes</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px' }}>
                    {lead.name    && <span style={{ fontSize: '14px', color: CREAM, opacity: 0.72 }}>Name — {lead.name}</span>}
                    {lead.contact && <span style={{ fontSize: '14px', color: CREAM, opacity: 0.72 }}>Contact — {lead.contact}</span>}
                    {lead.budget  && <span style={{ fontSize: '14px', color: CREAM, opacity: 0.72 }}>Budget — {lead.budget}</span>}
                  </div>
                </div>
              )}

              <div style={{ padding: '10px 20px 18px', borderTop: '1px solid rgba(236,234,229,0.06)', display: 'flex', gap: '8px', flexShrink: 0 }}>
                <input
                  value={textInput}
                  onChange={e => setTextInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendText() } }}
                  placeholder={isFr ? 'Écrivez votre message…' : 'Type your message…'}
                  style={{ flex: 1, background: 'rgba(236,234,229,0.04)', border: '1px solid rgba(236,234,229,0.1)', color: CREAM, fontFamily: 'inherit', fontSize: '16px', padding: '12px 15px', outline: 'none', caretColor: ORANGE }}
                  disabled={textLoading}
                />
                <button onClick={sendText} disabled={textLoading || !textInput.trim()} style={{ background: textInput.trim() ? `linear-gradient(135deg, #ff7a00, ${ORANGE})` : 'rgba(236,234,229,0.04)', border: 'none', cursor: textInput.trim() ? 'pointer' : 'default', padding: '0 18px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', opacity: textInput.trim() ? 1 : 0.3 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                </button>
              </div>
            </div>
          )}

          <div style={{ padding: '8px 20px', borderTop: '1px solid rgba(255,255,255,0.04)', flexShrink: 0, position: 'relative', zIndex: 1 }}>
            <span style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.12, color: CREAM }}>OACIQ H2731 · 514 519-8177</span>
          </div>
        </div>
      )}

      <style>{`
        @keyframes orb-pulse {
          0%,100% { box-shadow: 0 0 6px ${ORANGE}, 0 0 14px rgba(245,95,0,0.3); }
          50% { box-shadow: 0 0 16px ${ORANGE}, 0 0 32px rgba(245,95,0,0.5); }
        }
        @keyframes fade-in { from { opacity:0; transform:translateY(4px) } to { opacity:1; transform:none } }
        @keyframes badge-pop { from { opacity:0; transform:scale(0.75) } to { opacity:1; transform:scale(1) } }
        @keyframes dot-bounce {
          0%,80%,100% { transform:translateY(0); opacity:0.35 }
          40% { transform:translateY(-5px); opacity:1 }
        }
      `}</style>
    </>
  )
}
