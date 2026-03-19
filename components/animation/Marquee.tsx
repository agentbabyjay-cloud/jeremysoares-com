'use client'
import React from 'react'

interface MarqueeProps {
  items: string[]
  speed?: number
  direction?: 'left' | 'right'
  separator?: string
  className?: string
}

export function Marquee({
  items,
  speed = 60,
  direction = 'left',
  separator = ' — ',
  className = '',
}: MarqueeProps) {
  const duration = `${(items.length * 200) / speed}s`
  const animationName = direction === 'left' ? 'marquee-left' : 'marquee-right'

  const content = items.join(separator) + separator

  return (
    <>
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation-play-state: paused !important; }
        }
      `}</style>
      <div
        className={['overflow-hidden whitespace-nowrap', className].filter(Boolean).join(' ')}
        aria-hidden="true"
      >
        <span
          className="marquee-track inline-block"
          style={{
            animation: `${animationName} ${duration} linear infinite`,
          }}
        >
          {content}
          {content}
        </span>
      </div>
    </>
  )
}
