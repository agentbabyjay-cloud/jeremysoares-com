import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createHubSpotContact } from '@/lib/hubspot'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { email, locale } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }

    // Add to Resend audience
    const audienceId = process.env.RESEND_AUDIENCE_ID
    if (audienceId) {
      await resend.contacts.create({
        audienceId,
        email,
        unsubscribed: false,
      }).catch(() => {})
    }

    // Create HubSpot subscriber
    createHubSpotContact({
      email,
      lifecyclestage: 'subscriber',
    }).catch(() => {})

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Subscribe error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
