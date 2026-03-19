export const EASE = {
  out: 'power3.out',
  outQuart: 'power4.out',
  outQuad: 'power2.out',
  inOut: 'expo.inOut',
  scrub: 'none',
  back: 'back.out(1.4)',
} as const

export const DUR = {
  instant: 0.15,
  fast: 0.35,
  medium: 0.65,
  slow: 0.9,
  cinematic: 1.2,
  loader: 2.2,
} as const

export const DELAY = {
  stagger: 0.07,
  afterLoader: 0.2,
  heroText: 0.1,
} as const
