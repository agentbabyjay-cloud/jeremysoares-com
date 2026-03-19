import LocaleLangSetter from '@/components/LocaleLangSetter'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import { PageTransitionOverlay } from '@/components/providers/PageTransitionOverlay'
import { CursorFollower } from '@/components/animation/CursorFollower'
import { Preloader } from '@/components/animation/Preloader'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { AIChatWidget } from '@/components/integrations/AIChatWidget'
import { HubSpotTracker } from '@/components/integrations/HubSpotTracker'

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const lang = locale === 'fr-ca' ? 'fr-CA' : 'en-CA'
  return (
    <>
      <LocaleLangSetter lang={lang} />
      <SmoothScrollProvider>
        <PageTransitionOverlay />
        <CursorFollower />
        <Preloader />
        <Navbar locale={locale} />
        <main>{children}</main>
        <Footer locale={locale} />
        <AIChatWidget locale={locale} />
        <HubSpotTracker />
      </SmoothScrollProvider>
    </>
  )
}

export function generateStaticParams() {
  return [{ locale: 'en-ca' }, { locale: 'fr-ca' }]
}
