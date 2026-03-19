type EventName =
  | 'page_viewed'
  | 'cta_clicked'
  | 'form_started'
  | 'form_submitted'
  | 'phone_tap'
  | 'chat_opened'
  | 'chat_lead_captured'

interface EventProps {
  [key: string]: string | number | boolean | undefined
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    posthog?: {
      capture?: (event: string, properties?: EventProps) => void
    }
  }
}

export function trackEvent(name: EventName, props?: EventProps) {
  if (typeof window === 'undefined') return

  // GA4
  window.gtag?.('event', name, props)

  // PostHog
  window.posthog?.capture?.(name, props)
}
