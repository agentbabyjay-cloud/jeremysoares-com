import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createHubSpotContact } from '@/lib/hubspot'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message, locale } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { data, error } = await resend.emails.send({
      from: 'JeremySoares.com <noreply@jeremysoares.com>',
      to: ['JeremySoares@icloud.com'],
      replyTo: email,
      subject: `New inquiry from ${name} — JeremySoares.com`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0e1011; color: #eceae5;">
          <h2 style="letter-spacing: 0.1em; text-transform: uppercase; font-size: 1.2rem; margin-bottom: 24px;">
            New Inquiry — JeremySoares.com
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #888; width: 100px;">Name</td><td style="padding: 8px 0;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #888;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #eceae5;">${email}</a></td></tr>
            ${phone ? `<tr><td style="padding: 8px 0; color: #888;">Phone</td><td style="padding: 8px 0;">${phone}</td></tr>` : ''}
            <tr><td style="padding: 8px 0; color: #888;">Language</td><td style="padding: 8px 0;">${locale === 'fr-ca' ? 'French' : 'English'}</td></tr>
          </table>
          <hr style="border: none; border-top: 1px solid #222; margin: 24px 0;" />
          <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          <hr style="border: none; border-top: 1px solid #222; margin: 24px 0;" />
          <p style="color: #555; font-size: 0.75rem;">Sent from JeremySoares.com contact form</p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    // Create HubSpot contact (fire-and-forget)
    const [firstname, ...rest] = name.split(' ')
    createHubSpotContact({
      email,
      firstname,
      lastname: rest.join(' '),
      phone,
      lifecyclestage: 'lead',
    }).catch(() => {})

    return NextResponse.json({ success: true, id: data?.id })
  } catch (err) {
    console.error('Contact route error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
