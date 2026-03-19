'use client'

interface InquireButtonProps {
  pieceTitle: string
  locale: string
}

export function InquireButton({ pieceTitle, locale }: InquireButtonProps) {
  const isFr = locale === 'fr-ca'
  const subject = encodeURIComponent(
    isFr ? `Demande: ${pieceTitle}` : `Inquiry: ${pieceTitle}`
  )
  const body = encodeURIComponent(
    isFr
      ? `Bonjour Jeremy,\n\nJe suis intéressé(e) par "${pieceTitle}".\n\n`
      : `Hi Jeremy,\n\nI'm interested in "${pieceTitle}".\n\n`
  )

  return (
    <a
      href={`mailto:JeremySoares@icloud.com?subject=${subject}&body=${body}`}
      className="inline-flex items-center justify-center font-bold tracking-[0.1em] uppercase font-['avenir-next-lt-pro-condensed','Avenir_Next_Condensed',sans-serif] px-8 py-3 text-[0.875rem] bg-[#eceae5] text-[#0e1011] hover:bg-[#d8d4cb] transition-all duration-300 cursor-pointer"
    >
      {isFr ? 'Faire une demande' : 'Inquire'}
    </a>
  )
}
