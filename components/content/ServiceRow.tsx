'use client'

import { useState } from 'react'

interface ServiceRowProps {
  number: string
  title: string
  tag: string
  description: string
}

export function ServiceRow({ number, title, tag, description }: ServiceRowProps) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="border-b border-[rgba(236,234,229,0.1)] cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between py-8 group">
        <div className="flex items-center gap-6 md:gap-10">
          <span className="text-[0.75rem] tracking-[0.22em] uppercase text-[#eceae5] opacity-30 font-bold">
            {number}
          </span>
          <h3 className="text-[clamp(1.25rem,3vw,2rem)] font-bold tracking-tight text-[#eceae5] font-['avenir-next-lt-pro-condensed','Avenir_Next_Condensed',sans-serif]">
            {title}
          </h3>
          <span className="hidden md:inline text-[0.625rem] tracking-[0.22em] uppercase text-[#eceae5] opacity-25">
            {tag}
          </span>
        </div>
        <span
          className={`text-[#eceae5] opacity-40 text-xl transition-transform duration-300 ${
            open ? 'rotate-45' : ''
          }`}
        >
          +
        </span>
      </div>
      <div
        className="overflow-hidden transition-all duration-500"
        style={{ maxHeight: open ? '300px' : '0px' }}
      >
        <p className="text-[0.875rem] text-[#eceae5] opacity-60 leading-relaxed pb-8 pl-16 md:pl-24 max-w-2xl">
          {description}
        </p>
      </div>
    </div>
  )
}
