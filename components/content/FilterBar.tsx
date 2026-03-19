'use client'

import { useState } from 'react'

interface FilterBarProps {
  filters: { label: string; value: string }[]
  defaultValue?: string
  onChange: (value: string) => void
}

export function FilterBar({ filters, defaultValue = 'all', onChange }: FilterBarProps) {
  const [active, setActive] = useState(defaultValue)

  const handleClick = (value: string) => {
    setActive(value)
    onChange(value)
  }

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((f) => (
        <button
          key={f.value}
          type="button"
          onClick={() => handleClick(f.value)}
          className={[
            'text-[0.625rem] tracking-[0.22em] uppercase font-bold px-5 py-2 transition-all duration-300 cursor-pointer',
            active === f.value
              ? 'bg-[#eceae5] text-[#0e1011]'
              : 'border border-[rgba(236,234,229,0.2)] text-[#eceae5] opacity-60 hover:opacity-100',
          ].join(' ')}
        >
          {f.label}
        </button>
      ))}
    </div>
  )
}
