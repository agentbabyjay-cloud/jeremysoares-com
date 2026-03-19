import type { Metadata } from 'next'
import ContactClient from './ContactClient'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale === 'fr-ca'
  return {
    title: isFr
      ? 'Contacter Jeremy Soares — Courtier Montréal'
      : 'Contact Jeremy Soares — Montreal Realtor',
    description: isFr
      ? 'Contactez Jeremy Soares pour vos besoins immobiliers à Montréal. Appelez le 514 519-8177 ou remplissez le formulaire.'
      : 'Get in touch with Jeremy Soares for real estate services in Montreal. Call 514 519-8177 or fill out the contact form.',
    alternates: {
      canonical: `https://jeremysoares.com/${locale}/contact`,
      languages: {
        'en-CA': 'https://jeremysoares.com/en-ca/contact',
        'fr-CA': 'https://jeremysoares.com/fr-ca/contact',
      },
    },
  }
}

export default function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  return <ContactClient params={params} />
}
