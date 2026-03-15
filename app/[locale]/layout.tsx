export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  return <>{children}</>
}

export function generateStaticParams() {
  return [{ locale: 'en-ca' }, { locale: 'fr-ca' }]
}
