'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function useGSAP(
  callback: (context: gsap.Context) => void,
  deps: React.DependencyList = []
) {
  const ctx = useRef<gsap.Context | null>(null)
  useEffect(() => {
    ctx.current = gsap.context(() => {
      callback(ctx.current!)
    })
    return () => ctx.current?.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return ctx
}
