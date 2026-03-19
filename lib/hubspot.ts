const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY

interface ContactData {
  email: string
  firstname?: string
  lastname?: string
  phone?: string
  lifecyclestage?: string
  interest?: string
}

export async function createHubSpotContact(data: ContactData): Promise<boolean> {
  if (!HUBSPOT_API_KEY) return false

  try {
    const res = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${HUBSPOT_API_KEY}`,
      },
      body: JSON.stringify({
        properties: {
          email: data.email,
          firstname: data.firstname ?? '',
          lastname: data.lastname ?? '',
          phone: data.phone ?? '',
          lifecyclestage: data.lifecyclestage ?? 'lead',
          hs_lead_status: 'NEW',
          ...(data.interest ? { message: data.interest } : {}),
        },
      }),
    })

    return res.ok || res.status === 409 // 409 = contact exists
  } catch {
    return false
  }
}
