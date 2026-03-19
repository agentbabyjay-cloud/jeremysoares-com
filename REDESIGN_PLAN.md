# JeremySoares.com — Awwwards-Level Redesign Plan
**Authored by Julian, Frontend UX Architect — Soares Agency**
**Date: 2026-03-18**
**Stack: Next.js 16, React 19, Tailwind CSS v4, GSAP 3.14, Vercel**

---

## EXECUTIVE SUMMARY

The current site is a Webflow-to-Next.js migration that ported the old HTML/CSS structure almost verbatim. The Webflow CDN stylesheet is still loaded as an external CDN link — meaning the site's visual layer is entirely outside our control, loads asynchronously, and causes flash-of-unstyled-content. The animation system is functional but naive: class-selector sweeps, no React context, no scroll normalization, no page transitions between routes.

This plan tears out the Webflow CSS dependency completely and rebuilds the entire visual layer in Tailwind v4 + a purpose-built design token system. Every animation is authored in GSAP with proper React 19 context patterns. Lenis handles scroll normalization. The result will be a site that could legitimately compete at Awwwards SOTD level.

The site has a real foundation to build on: the dark/cream alternation is correct, the bilingual routing works, the content is solid, and GSAP is already installed. We are not starting from zero — we are doing a full visual and animation rebuild on a working technical shell.

---

## CURRENT STATE AUDIT

### What exists (keep and build on)
- Next.js 16 App Router with `[locale]` segment — `en-ca` and `fr-ca`
- `generateStaticParams` for both locales — SSG working
- `LocaleLangSetter` — sets `document.documentElement.lang`
- `TypekitLoader` — loads Avenir Next LT Pro Condensed via Typekit `mfd0qkm`
- GSAP 3.14 installed, ScrollTrigger registered
- `useAnimations` hook — page loader, clip-reveal, fade-up, parallax
- `useMobileMenu` hook — toggle logic with DOM class
- Contact API route at `/api/contact` — Resend integration working
- next-sitemap configured, scripts/patch-sitemap.js exists
- Google Analytics (G-2GWNP83S4J + G-C44LY9E9TK) wired in root layout
- JSON-LD structured data — RealEstateAgent + WebSite schema correct
- OG images, verification meta, hreflang alternates all set

### What is broken or absent
- Webflow CSS loaded from external CDN — must be eliminated entirely
- No Lenis smooth scroll
- No page transition system between routes
- No `SmoothScrollProvider` context
- No cursor follower
- No marquee strip
- No TextReveal component (the current `.js-animate-up` pattern is a DOM sweep hack)
- No SectionReveal component
- No design token file — values are scattered as inline styles and magic numbers
- `Navbar.tsx` and `Footer.tsx` are built but NOT used — `app/[locale]/page.tsx` still renders the old Webflow markup inline
- The home page (`app/[locale]/page.tsx`) is 690 lines of inline JSX with Webflow class names — needs full rebuild
- No hooks directory properly wired (hooks/useAnimations.ts exists but is only consumed by the home page)
- Tailwind config doesn't exist as a separate file — using `@import "tailwindcss"` in globals.css with Tailwind v4's CSS-first config
- No `next.config.ts` image domain for `jeremysoares.com` itself

### Pages that exist
- `/[locale]` — Home (inline, Webflow markup)
- `/[locale]/about` — AboutClient.tsx (good structure, needs animation upgrade)
- `/[locale]/service` — ServicePage (clean, cream section works)
- `/[locale]/blog` — BlogPage (placeholder posts, needs real content system)
- `/[locale]/contact` — ContactClient.tsx (form works, styling is Webflow-dependent)

### Pages that do not exist yet
- `/[locale]/technology` — for aimmo + 50 domains showcase
- `/[locale]/portfolio` — dedicated sold properties page with proper grid

---

## PHASE 0: DESIGN SYSTEM FOUNDATION

### 0.1 Typography

**Primary typeface: Avenir Next LT Pro Condensed** (already loaded via Typekit `mfd0qkm`)
This is the site's signature voice. Condensed uppercase at display sizes reads as architectural, precise, confident. It is what Archidomo.fr and the best Montreal design firms use as their display weapon.

**Secondary typeface: DM Sans** (Google Fonts, self-hosted via `next/font/google`)
Body text, UI labels, form inputs. Geometric, neutral, reads cleanly at small sizes. Pairs with Avenir Next Condensed without competing.

**Accent typeface: DM Serif Display** (Google Fonts, self-hosted)
Used sparingly — pull quotes, hero sub-lines where an editorial serif moment is needed. Jeremy's architecture background and artistic practice warrant this. One or two instances per page maximum.

**Type scale — all values in `rem` at 16px root:**

| Token | rem | px equiv | Use |
|-------|-----|----------|-----|
| `--text-xs` | 0.625rem | 10px | Labels, meta, legal |
| `--text-sm` | 0.75rem | 12px | Nav items, captions |
| `--text-base` | 1rem | 16px | Body copy |
| `--text-lg` | 1.25rem | 20px | Lead paragraphs |
| `--text-xl` | 1.5rem | 24px | Section intros |
| `--text-2xl` | 2rem | 32px | h3 level |
| `--text-3xl` | 2.75rem | 44px | h2 level |
| `--text-4xl` | 3.75rem | 60px | Page sub-titles |
| `--text-5xl` | clamp(4rem, 7vw, 7rem) | fluid | Section headers |
| `--text-display` | clamp(5rem, 10vw, 11rem) | fluid | Hero, footer wordmark |
| `--text-giant` | clamp(7rem, 16vw, 18rem) | fluid | Full-screen typographic moments |

**Letter-spacing:**
- Display/uppercase headers: `-0.03em`
- Nav items (small caps): `0.18em`
- Labels/meta: `0.22em`
- Body: `0` (default)

**Line heights:**
- Display: `0.88`
- Headings: `1.05`
- Body: `1.7`
- Labels: `1`

**Font weight conventions:**
- 900 / Black: display headings (Avenir Next Condensed)
- 700 / Bold: h2-h3, nav emphasis
- 400 / Regular: body, form inputs, DM Sans
- 300 / Light: captions, secondary meta

### 0.2 Color Tokens

Defined as CSS custom properties in `app/globals.css`. Tailwind v4 reads these natively via `@theme`.

```css
@theme {
  --color-void: #0e1011;        /* Primary dark — backgrounds, nav, hero */
  --color-cream: #eceae5;       /* Primary light — alternating sections, text on dark */
  --color-cream-dim: #d8d4cb;   /* Muted cream — borders, dividers on cream sections */
  --color-navy: #132030;        /* Accent dark — CTA bands, mid-tone sections */
  --color-gold: #c9a84c;        /* Accent — language toggle dot, hover moments, aimmo */
  --color-void-muted: rgba(14, 16, 17, 0.12);  /* Dividers on cream */
  --color-cream-muted: rgba(236, 234, 229, 0.15); /* Borders on dark */
  --color-cream-subtle: rgba(236, 234, 229, 0.40); /* Secondary text on dark */
}
```

**Usage rules (non-negotiable):**
- `void` sections: background `#0e1011`, text `#eceae5`, dividers `rgba(236,234,229,0.12)`
- `cream` sections: background `#eceae5`, text `#0e1011`, dividers `rgba(14,16,17,0.12)`
- `navy` sections: background `#132030`, text `#eceae5` — used for CTAs and technology section only
- Gold appears only as accent detail — never as a background
- Never use pure white (`#ffffff`) anywhere
- Never use pure black (`#000000`) anywhere

### 0.3 Spacing Scale

```css
@theme {
  --space-1:  0.25rem;   /* 4px */
  --space-2:  0.5rem;    /* 8px */
  --space-3:  0.75rem;   /* 12px */
  --space-4:  1rem;      /* 16px */
  --space-5:  1.25rem;   /* 20px */
  --space-6:  1.5rem;    /* 24px */
  --space-8:  2rem;      /* 32px */
  --space-10: 2.5rem;    /* 40px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-20: 5rem;      /* 80px */
  --space-24: 6rem;      /* 96px */
  --space-32: 8rem;      /* 128px */
  --space-40: 10rem;     /* 160px */
  --space-48: 12rem;     /* 192px */
}
```

**Section vertical rhythm:**
- Hero sections: `padding-block: 0` (full 100vh, content positioned absolutely or via flex)
- Content sections: `padding-block: clamp(5rem, 10vw, 8rem)`
- CTA bands: `padding-block: clamp(4rem, 7vw, 6rem)`
- Section label to heading gap: `1.5rem`
- Heading to body gap: `2rem`

### 0.4 Motion Tokens

All GSAP easing strings. Defined as constants in `lib/motion.ts`.

```typescript
// lib/motion.ts

export const EASE = {
  // Primary — elegant deceleration, used for reveals
  out: 'power3.out',
  // Aggressive entry — used for hero text, large type
  outQuart: 'power4.out',
  // Smooth — used for fades, opacity
  outQuad: 'power2.out',
  // Page transitions — the expensive cinematic one
  inOut: 'expo.inOut',
  // Scroll-driven scrub — no easing
  scrub: 'none',
  // Spring-like — used for hover state snaps
  back: 'back.out(1.4)',
} as const

export const DUR = {
  instant:  0.15,  // Hover micro-interactions
  fast:     0.35,  // Nav scroll shrink, button states
  medium:   0.65,  // Element reveals below fold
  slow:     0.9,   // Hero reveals, page intro
  cinematic: 1.2,  // Page transition overlay
  loader:   2.2,   // Full preloader sequence
} as const

export const DELAY = {
  stagger: 0.07,   // Between sibling reveals
  afterLoader: 0.2, // Post-loader content start
  heroText: 0.1,   // Between hero lines
} as const
```

### 0.5 Breakpoints

```css
@theme {
  --breakpoint-sm:  480px;   /* Large phone landscape */
  --breakpoint-md:  768px;   /* Tablet portrait */
  --breakpoint-lg:  1024px;  /* Tablet landscape / small laptop */
  --breakpoint-xl:  1280px;  /* Desktop */
  --breakpoint-2xl: 1600px;  /* Wide desktop */
}
```

**Grid system:**
- Desktop (1280px+): 12 columns, `gap: 2rem`, `max-width: 1440px`, `padding-inline: clamp(2rem, 5vw, 6rem)`
- Tablet (768px–1279px): 8 columns, `gap: 1.5rem`, `padding-inline: 2.5rem`
- Mobile (< 768px): 4 columns, `gap: 1rem`, `padding-inline: 1.25rem`

### 0.6 Base Component APIs

These are the primitive components that all pages compose from. Define them in `components/ui/`.

**`<Text>` — typography primitive**
```typescript
// components/ui/Text.tsx
interface TextProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'display' | 'giant'
  weight?: 'light' | 'regular' | 'bold' | 'black'
  tracking?: 'tight' | 'normal' | 'wide' | 'widest'
  leading?: 'display' | 'heading' | 'body'
  color?: 'cream' | 'void' | 'muted' | 'gold'
  uppercase?: boolean
  className?: string
  children: React.ReactNode
}
```

**`<Container>` — layout wrapper**
```typescript
// components/ui/Container.tsx
interface ContainerProps {
  size?: 'sm' | 'md' | 'lg' | 'full'  // sm=960, md=1280, lg=1440, full=100%
  padded?: boolean                       // adds padding-inline
  className?: string
  children: React.ReactNode
}
```

**`<Section>` — page section wrapper**
```typescript
// components/ui/Section.tsx
interface SectionProps {
  theme?: 'void' | 'cream' | 'navy'  // controls bg + text color
  height?: 'auto' | 'screen' | 'half' | 'tall'  // auto, 100vh, 50vh, 70vh
  className?: string
  id?: string
  children: React.ReactNode
}
```

**`<Button>` — interactive CTA**
```typescript
// components/ui/Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'ghost' | 'link'
  theme?: 'light' | 'dark'  // controls color on void vs cream sections
  size?: 'sm' | 'md' | 'lg'
  href?: string
  external?: boolean
  onClick?: () => void
  children: React.ReactNode
}
// primary: filled rectangle, no border-radius
// ghost: border-only rectangle
// link: text only with animated underline
```

**`<Label>` — section identifier**
```typescript
// components/ui/Label.tsx
interface LabelProps {
  children: React.ReactNode
  theme?: 'light' | 'dark'
}
// Renders: text-xs tracking-[0.22em] uppercase opacity-40
// Example: "(What we do)" or "(03)"
```

---

## PHASE 1: ANIMATION INFRASTRUCTURE

All files live in `lib/` or `components/providers/`. No animation logic lives directly in page components — pages only consume hooks and components.

### 1.1 Install Lenis

```bash
npm install lenis
```

Lenis replaces native scroll with a normalized inertia scroll. Config:

```typescript
// lib/lenis.ts
export const LENIS_CONFIG = {
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical' as const,
  gestureOrientation: 'vertical' as const,
  smoothWheel: true,
  wheelMultiplier: 0.8,
  touchMultiplier: 1.5,
  infinite: false,
}
```

### 1.2 SmoothScrollProvider

```typescript
// components/providers/SmoothScrollProvider.tsx
'use client'
// - Creates Lenis instance on mount
// - Connects Lenis raf to GSAP ticker: gsap.ticker.add((time) => lenis.raf(time * 1000))
// - Sets gsap.ticker.lagSmoothing(0) to prevent jank after tab switching
// - Connects Lenis to ScrollTrigger: lenis.on('scroll', ScrollTrigger.update)
// - Provides lenis instance via context for programmatic scroll (useLenis hook)
// - Kills instance on unmount
// - Disables itself on mobile (< 768px) — native scroll is better on touch

interface SmoothScrollContextValue {
  lenis: Lenis | null
  scrollTo: (target: string | number | HTMLElement, options?: ScrollToOptions) => void
}

export const SmoothScrollContext = createContext<SmoothScrollContextValue>(...)
export function useLenis() { return useContext(SmoothScrollContext) }
```

Mount point: `app/[locale]/layout.tsx` wraps `{children}` in `<SmoothScrollProvider>`.

### 1.3 GSAP React 19 Context Pattern

React 19 strict mode double-invokes effects. The correct GSAP pattern for React 19:

```typescript
// lib/useGSAP.ts — thin wrapper that manages cleanup properly
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
```

All animation hooks and components use `useGSAP` instead of raw `useEffect`. This replaces the current `useAnimations.ts` pattern entirely. The existing `hooks/useAnimations.ts` is deprecated and deleted.

### 1.4 TextReveal Component

The core display primitive. Wraps text, splits into characters or lines, and reveals on scroll (or on command for hero).

```typescript
// components/animation/TextReveal.tsx
'use client'

interface TextRevealProps {
  children: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  split?: 'chars' | 'words' | 'lines'
  delay?: number          // seconds, default 0
  duration?: number       // seconds, default 0.9
  stagger?: number        // seconds per char/word/line, default 0.02 for chars, 0.07 for lines
  immediate?: boolean     // true = plays on mount (hero), false = ScrollTrigger (default)
  start?: string          // ScrollTrigger start, default 'top 88%'
  className?: string
}
```

**Internal behavior:**
1. On mount, split the text content into `<span>` wrappers using a manual split (no SplitText plugin — we do this ourselves with `String.split('')` and wrap each char in `<span style={{display:'inline-block', overflow:'hidden'}}><span class="char">`).
2. Set initial `y: '105%'` on all inner spans.
3. When `immediate=true`, play at `delay` seconds after mount.
4. When `immediate=false`, attach ScrollTrigger to the outer wrapper.
5. Animate with `gsap.to(chars, { y: '0%', duration, stagger, ease: EASE.outQuart })`.

This component replaces every `.js-animate-up` / `.overflow-hidden` pattern in the current codebase.

### 1.5 SectionReveal Component

For non-text elements — images, cards, dividers:

```typescript
// components/animation/SectionReveal.tsx
'use client'

interface SectionRevealProps {
  children: React.ReactNode
  delay?: number
  y?: number          // default 32
  opacity?: boolean   // default true
  start?: string      // default 'top 85%'
  className?: string
}
```

Wraps children, applies `gsap.from({ y, opacity: 0 })` on ScrollTrigger. Replaces every `.js-fade-up` pattern.

### 1.6 PageTransition System

The most architecturally important piece. Uses App Router's layout hierarchy.

**Mechanism:**
- A `<PageTransitionOverlay>` component lives in `app/[locale]/layout.tsx` — above the page content, fixed to viewport, `z-index: 9998`
- It renders a cream-colored (`#eceae5`) full-screen div
- On route change (detected via `usePathname`), it animates:
  - **Out:** `scaleX` from `0` to `1`, origin left, duration `0.55s`, `expo.inOut`
  - **Hold:** `0.1s` at full coverage
  - **In:** `scaleX` from `1` to `0`, origin right, duration `0.55s`, `expo.inOut`
- During the "hold" phase, the new page renders behind the overlay
- Uses `usePathname` from `next/navigation` to detect changes

```typescript
// components/providers/PageTransitionOverlay.tsx
'use client'
// State: isTransitioning
// On pathname change: fire the animation sequence
// The overlay is always in the DOM, just with scaleX: 0 at rest
```

**Layout integration:**
```tsx
// app/[locale]/layout.tsx
export default async function LocaleLayout({ children, params }) {
  return (
    <SmoothScrollProvider>
      <PageTransitionOverlay />
      <LocaleLangSetter lang={lang} />
      {children}
    </SmoothScrollProvider>
  )
}
```

### 1.7 CursorFollower

Desktop only. A small `24px` circle that follows the cursor with a `0.12s` lag.

```typescript
// components/animation/CursorFollower.tsx
'use client'
// - Renders a fixed div, pointer-events: none, z-index: 9997
// - Uses requestAnimationFrame loop to lerp toward mouse position
// - On hovering [data-cursor="expand"] elements: scale to 64px, mix-blend-mode: difference
// - On hovering links: scale to 40px
// - Hidden on touch devices (matchMedia hover: none)
// - Color: #eceae5 at 80% opacity
```

Mount point: inside `SmoothScrollProvider`, renders for all pages.

### 1.8 Parallax Utility Hook

```typescript
// lib/useParallax.ts
export function useParallax(
  ref: React.RefObject<HTMLElement>,
  amount: number = 0.12,  // fraction of element height to shift
  direction: 'up' | 'down' = 'up'
) {
  // Attaches gsap ScrollTrigger scrub to the ref element
  // scrub: 1.2 for smooth follow
  // y shifts by (amount * 100)% from start to end
}
```

### 1.9 Marquee Component

```typescript
// components/animation/Marquee.tsx
'use client'

interface MarqueeProps {
  items: string[]
  speed?: number       // pixels per second, default 60
  direction?: 'left' | 'right'
  separator?: string   // default ' — '
  className?: string
}
// Pure CSS animation: two copies of the items array, CSS @keyframes translateX
// No GSAP — CSS is more performant for infinite loops
// Duplicates the item array twice, animates from 0 to -50% continuously
```

### 1.10 Preloader

```typescript
// components/animation/Preloader.tsx
'use client'
// Sequence:
// 1. Fixed overlay, background #0e1011, z-index 9999
// 2. "SOARES" text: translateY(110%) → translateY(0%), duration 0.9s, power3.out, delay 0.1s
// 3. Hold 0.6s
// 4. "SOARES" text: translateY(0%) → translateY(-110%), duration 0.7s, power3.in
// 5. Overlay: opacity 1 → 0, duration 0.4s, onComplete: display none + set loaded state
// Total: ~2.2s

// State management:
// - useLoaderStore (Zustand or simple context) with { loaded: boolean }
// - Pages check loaded state to know when to start their own animations
// - Preloader only runs on FIRST page load, never on subsequent route changes (check sessionStorage)
```

**Note:** Lenis is paused while the preloader is active. Resume on loader complete.

---

## PHASE 2: LAYOUT SHELL

### 2.1 Header / Navbar — Complete Rebuild

File: `components/layout/Navbar.tsx` (replaces current `components/Navbar.tsx`)

**Desktop design:**
- Position: `fixed` top, full width, `z-index: 200`
- Initial state: `padding-block: 2rem`, `background: transparent`
- Scrolled state (after 80px): `padding-block: 1rem`, `background: rgba(14,16,17,0.88)`, `backdrop-filter: blur(16px)`, `border-bottom: 1px solid rgba(236,234,229,0.08)`
- Transition handled by GSAP `gsap.to(navRef, { ... })` not CSS transitions — smoother

**Logo:**
- SVG logo, `width: 120px`, `height: auto`
- On cream-background pages (service, blog): logo switches to dark variant
- Use `data-theme` attribute on the `<html>` or on the nav itself — set per page via a `useNavTheme` context

**Nav items:**
- 5 items: Home, Real Estate, Art (external), About, Blog
- `font-size: 0.625rem` (10px), `letter-spacing: 0.22em`, `text-transform: uppercase`
- `color: #eceae5` on dark, `color: #0e1011` on light pages
- Hover: custom underline that grows from left via `scaleX` on a `::after` pseudo-element (CSS), `transform-origin: left`, `transition: transform 0.3s ease`
- Active page: underline at full width, no animation needed

**Language toggle:**
- Right side of nav, after the nav items
- Two options: `EN` and `FR`
- Display as `EN / FR` with the active one at full opacity, inactive at 0.25 opacity
- Click inactive one to switch locale — use `router.push` with locale swap
- Not a fixed floating button anymore — integrated into the nav

**CTA button:**
- Far right: "Let's Talk" / "Discutons"
- Style: `border: 1px solid rgba(236,234,229,0.35)`, no fill, `padding: 0.5rem 1.5rem`
- Hover: fill becomes `#eceae5`, text becomes `#0e1011`
- Transition: `background 0.25s ease, color 0.25s ease`

**Mobile design (< 768px):**
- Hamburger: two lines, `width: 28px`, `height: 1px`, `gap: 7px`
- Menu open: clip-path reveal from top
  - Initial: `clip-path: inset(0 0 100% 0)`
  - Open: `clip-path: inset(0 0 0% 0)`, duration `0.65s`, `expo.inOut`
  - Background: `#0e1011`, full viewport
  - Nav items: stagger reveal with TextReveal, each item is large type (`clamp(2.5rem, 8vw, 4rem)`)
  - Language toggle at bottom
  - Close: reverse clip-path

**Navbar component API:**
```typescript
interface NavbarProps {
  locale: string
}
// Does not need locale passed from outside — reads from useParams() internally
// This allows Navbar to live in [locale]/layout.tsx cleanly
```

**Wire into layout:**
`app/[locale]/layout.tsx` renders `<Navbar locale={locale} />` as the first child, before `{children}`.

### 2.2 Footer — Rebuild

File: `components/layout/Footer.tsx` (replaces current `components/Footer.tsx`)

**Design:**
- Background: `#0e1011`
- Top section: the big `JEREMY SOARES` wordmark in `--text-giant` size — this is the design statement
  - Two lines: `JEREMY` and `SOARES` at `clamp(7rem, 16vw, 18rem)` — fills the full width
  - Letter-spacing: `-0.03em`
  - Color: `#eceae5` at full opacity
  - On scroll-into-view: TextReveal with `split: 'chars'`, stagger `0.02s`
- Middle: 4-column link grid (Navigation, Platforms, Contact, Socials)
- Bottom bar: legal, copyright, and a thin `1px` divider

**Marquee strip above the big wordmark:**
- Services marquee: `RESIDENTIAL — COMMERCIAL — PRE-SALES — LEASE — INVEST — MARKET — DEVELOP — ART — DESIGN — MONTREAL`
- Speed: `80px/s`, direction: left
- `font-size: 0.625rem`, `letter-spacing: 0.3em`, `text-transform: uppercase`, `color: rgba(236,234,229,0.3)`
- `border-top: 1px solid rgba(236,234,229,0.08)`, `border-bottom: 1px solid rgba(236,234,229,0.08)`
- `padding-block: 1rem`

### 2.3 PageWrapper

```typescript
// components/layout/PageWrapper.tsx
'use client'
// - Wraps page content
// - On mount, checks if preloader is done (via store)
// - If preloader done, triggers page-specific entry animation after short delay
// - Provides pageReady state via context for child components to key off
```

### 2.4 Language Switcher Design Decision

The language toggle is no longer a fixed floating pill in the corner. It is integrated into the nav. The current `toggle-color` component in the home page JSX is removed.

The locale switching happens via `router.push(`/${altLocale}`)` where `altLocale` is computed from `useParams().locale`.

---

## PHASE 3: HOME PAGE

File: `app/[locale]/page.tsx` — complete rewrite. Remove all Webflow class names.

### Section 1: Hero — `section#home-hero`

**Layout:** Full viewport height (`100svh`). Split into two zones:
- Left zone (60% desktop, full mobile): the big typographic statement
- Right zone (40% desktop, hidden mobile): portrait photograph of Jeremy

**Left zone content:**
- Label: `(Montréal, QC)` — `text-xs tracking-[0.22em] opacity-40`
- Name line 1: `JEREMY` — `--text-display` size, Avenir Next Condensed, weight 900
- Name line 2: `SOARES` — same, but offset right by `2ch` (architectural asymmetry)
- Sub-line: `Montreal Real Estate Services.` / `Services Immobiliers Montréal.` — DM Serif Display, `--text-xl`, italic, `opacity: 0.6`, no uppercase
- Bottom bar: a thin horizontal line, then the scroll indicator — a small circle with a dot that animates downward in a loop

**Right zone content:**
- The hero photo: `68baf35dc28553a17f2d6d78_8-IMG_6610.jpg`
- Positioned absolutely to fill its zone
- On scroll: `useParallax` at `0.15` — image moves up at a slower rate than scroll
- Cover fit, `object-position: center top`
- Overlay: `linear-gradient(to right, #0e1011 0%, transparent 30%)` on the left edge so text reads cleanly

**Hero animations (immediate=true, sequences after preloader):**
1. `delay: 0s` — Left zone image: `opacity: 0 → 1`, `scale: 1.04 → 1`, duration `1.2s`, `power3.out`
2. `delay: 0.1s` — Label: fade up `y: 12 → 0`, `opacity: 0 → 1`, duration `0.6s`
3. `delay: 0.2s` — `JEREMY`: TextReveal chars, stagger `0.025s`
4. `delay: 0.35s` — `SOARES`: TextReveal chars, stagger `0.025s`
5. `delay: 0.65s` — Sub-line: TextReveal words, stagger `0.06s`
6. `delay: 0.9s` — Scroll indicator: fade in

**Mobile adaptation:**
- Single column: photo first (aspect ratio 3:2), then text below
- Name size: `clamp(4rem, 15vw, 7rem)`
- The right/left split collapses to stacked

### Section 2: Services Introduction — `section#home-services-intro`

**Background:** `#eceae5` (first cream section)

**Layout:** Grid `12 columns`. Label left-column, heading mid, body right-column.

**Content:**
- Label: `(02)` and `(What we do)` — two labels at opposite ends of the top bar
- Heading: `Services` — `--text-5xl`, void color, TextReveal on scroll
- Body: "With a decade of experience in the real estate markets of Vancouver and Montreal." — DM Sans, `--text-lg`, `opacity: 0.65`

**Marquee strip (inside this section, between heading and service tiles):**
- Items: `BUY · SELL · LEASE · INVEST · COMMERCIAL · RESIDENTIAL · PRE-SALES · MARKETING · BRANDING · RENT`
- Speed: `60px/s`, background: `transparent`, text: `#0e1011`, `opacity: 0.35`
- `padding-block: 1.5rem`, `border-top` and `border-bottom`: `1px solid rgba(14,16,17,0.12)`

### Section 3: Service Feature Tiles — alternating

Three tiles, each full-width, 50/50 split. Alternating image left/right.

**Tile design:**
- Height: `70vh` minimum, `min-height: 500px`
- Image side: fills its half completely, `object-fit: cover`
- Content side: `padding: clamp(3rem, 6vw, 6rem)`, flex column, space-between
- Image hover: `scale: 1.04`, duration `0.7s`, `power2.out`
- Sibling-contrast on tile hover: sibling tiles go to `opacity: 0.4` — this is the Archidomo pattern
  - Implemented by: on `.tiles-wrapper:hover .tile:not(:hover) { opacity: 0.4 }` — pure CSS, no JS needed

**Tile 1 (image left, content right):**
- Image: the marketing video (`HOMEFORSALE_JEREMYAD`)
- Heading: `Unmatched / Marketing Power` — `--text-3xl`, TextReveal on scroll
- Body: "With over 50 specialized real estate domains and direct access to an email list of 14,000 Quebec brokers..."
- List: Residential · Apartment Hunting · Commercial · New Developments

**Tile 2 (image right, content left):**
- Image: Jeremy headshot (`Jeremy-Soares-Montreal-Realtor.webp`)
- Heading: `Proven / Track Record`
- Body: "My background in marketing and branding, combined with relationships with developers..."
- List: Website Design · Website Support · Digital Marketing

**Tile 3 (image left, content right):**
- Image: `1-48912126-F1AA-4FAE-8511-3BF6A11A8D99`
- Heading: `Strong / Local Connections`
- Body: "Strong relationships built across Montreal's development community..."
- List: Downtown · Old Port · Plateau · Westmount

### Section 4: Stats Band — `section#home-stats`

**Background:** `#0e1011`

**Layout:** 4 stats in a horizontal row, full width, `border-top/bottom: 1px solid rgba(236,234,229,0.1)`

**Stats:**
1. `10+` Years Experience
2. `50+` Real Estate Domains
3. `14,000` Quebec Brokers Network
4. `Vancouver · Montreal` Markets

**Number animation:** Counter from `0` to target on ScrollTrigger (`once: true`). DM Serif Display for the numbers, cream color.

**Animation:** SectionReveal with stagger — each stat reveals `0.1s` after the previous.

### Section 5: Portfolio Preview — `section#home-portfolio`

**Background:** `#eceae5`

**Section header:** `(03)` / `Recent Results.` — TextReveal

**Grid:** The sold properties grid. `grid-template-columns: repeat(4, 1fr)` on desktop, `repeat(3, 1fr)` on tablet, `repeat(2, 1fr)` on mobile.

**Sibling-contrast hover:** On `.sold-grid:hover .sold-grid-item:not(:hover)`, opacity drops to `0.4`, transition `0.3s`. On hover item: `scale: 1.04`.

**Images:** The 12 sold template images from `/images/sold/`. Each item is `aspect-ratio: 3/4`.

**"View All" link:** Below the grid, right-aligned. Arrow icon that translates right on hover. Links to `/[locale]/portfolio` (new page in Phase 6).

### Section 6: About Teaser — `section#home-about`

**Background:** `#0e1011`

**Layout:** Two columns. Left: a tall paragraph. Right: a pull quote.

**Left content:**
- Label: `(About Me)`
- Body paragraph: the trusted realtor story — 200 words, DM Sans, `--text-lg`, `opacity: 0.7`
- CTA link: "Read more about Jeremy →" — with hover underline

**Right content:**
- Pull quote: in DM Serif Display italic, `--text-3xl`
- "Not just a broker. An architect. An artist. A builder of digital infrastructure for Montreal real estate."
- Color: `#eceae5` at `0.5` opacity, full opacity on scroll-into-view

**Animation:** The pull quote does a `clip-path: inset(0 100% 0 0) → inset(0 0% 0 0)` reveal, left to right, duration `0.9s`, `expo.out` on ScrollTrigger.

### Section 7: Technology Teaser — `section#home-tech`

**Background:** `#132030` (navy)

**Content:**
- Label: `(Technology)`
- Heading: `aimmo` — in gold `#c9a84c`, `--text-display`
- Sub: `AI-Powered Real Estate Staging` — `--text-xl`, cream
- Body: "Built aimmo to give every agent access to world-class virtual staging. AI meets architectural eye."
- CTA: "Explore Technology →" — links to `/[locale]/technology`

**Visual:** A 3-column mosaic of aimmo renders. Dark background makes the renders pop.

### Footer: As described in Phase 2.2

---

## PHASE 4: ABOUT PAGE

File: `app/[locale]/about/page.tsx` + `AboutClient.tsx` — rebuild client component.

### Section 1: Hero — Full Viewport

**Background:** `#0e1011`

**Layout:** Full `100svh`. The hero image takes the full right half (`50vw`), bleeds to viewport edge. Text lives in the left half.

**Left content:**
- Label: `(About)` — fade in
- `JEREMY` — TextReveal chars, `--text-display`
- `SOARES` — TextReveal chars, `--text-display`, slight delay
- Sub-line: `Courtier · Architecte · Artiste` (bilingual contextual display)

**Right content:**
- Full headshot: `Jeremy-Soares-Montreal-Realtor.webp`
- `clip-path: inset(100% 0 0 0)` reveal on load — image wipes up from bottom, duration `1.1s`, `expo.out`
- Parallax: moves up `10%` on scroll

**Mobile:** Stacked. Photo first (3:2 ratio), then text.

### Section 2: Bio — Cream Section

**Background:** `#eceae5`

**Layout:** Single column, `max-width: 720px`, centered.

**Content:**
- Opening sentence in DM Serif Display, `--text-2xl`, italic — the character statement
- Two body paragraphs in DM Sans, `--text-base`, `line-height: 1.7`
- Contact details beneath (phone, email, location) — minimal, clean

### Section 3: Experience Timeline — Dark Section

**Background:** `#0e1011`

**Layout:** Full-width list. Each row: `border-top: 1px solid rgba(236,234,229,0.1)`.

**Each timeline row:**
- Left: year range in `font-mono`, `text-xs`, `opacity: 0.35`
- Center: role title in Avenir Next Condensed, `--text-2xl`, uppercase
- Right: location + brief note

**Animation:** Each row slides in from left (`x: -32 → 0`, `opacity: 0 → 1`) on ScrollTrigger, stagger `0.08s`.

**Entries (in reverse chronological):**
1. `2019 — Present` / Residential Real Estate Broker / Montréal, QC
2. `2017 — 2020` / Pre-Sale Condo Business Development / Vancouver, BC
3. `2016 — 2021` / Soares/Saniuk Real Estate Team / Montreal + Vancouver
4. `2017 — 2019` / Luxury Residential Broker / Vancouver, BC
5. `2016 — 2018` / Real Estate Marketing Specialist
6. `2013 — 2016` / Student in Architecture

### Section 4: Scroll-Driven Photo Essay

**Background:** alternating — this section is a scroll-pinned sequence.

**Design:** Pin the section for `300vh` of scroll. Inside, cycle through 4 images with text appearing beside each:
- Image 1: Jeremy at a property (architectural framing)
- Image 2: Old Port Montreal
- Image 3: An aimmo render
- Image 4: Jeremy candid / lifestyle

Each image takes `60%` of the viewport width. Text (100-150 words) appears to the left or right as the user scrolls, using `ScrollTrigger` with `scrub: 1`.

**Implementation:** `ScrollTrigger.pin` on the section container, `timeline` of `to` tweens driving opacity and `y` of each image+text pair.

### Section 5: Platforms / Digital Empire — Navy Section

**Background:** `#132030`

**Content:**
- Counter: `50+` Real Estate Domains — DM Serif Display, animates 0→50 on scroll
- Platform tags: displayed as outlined pills
- Selected domains listed with subtle hover reveal

### Section 6: CTA — Cream Section

**Background:** `#eceae5`

**Content:**
- Large heading: `Work Together.` / `Travaillons Ensemble.` — TextReveal
- Contact info
- CTA button: dark fill, cream text

---

## PHASE 5: SERVICE PAGE

File: `app/[locale]/service/page.tsx` — rebuild the page component. Keep `ServiceAnimations.tsx` but upgrade to use `useGSAP`.

### Section 1: Hero

**Background:** `#0e1011`

**Layout:** `100svh`. Left half: text. Right half: a grid of 4 property images (2×2), each revealing on stagger.

**Content:**
- Label: `(Studio)`
- Heading: `Services` — `--text-display`, TextReveal
- Sub: "Full-service real estate brokerage across residential, commercial, and development sectors in Montreal."

### Section 2: Service List — Cream Section

**Background:** `#eceae5`

**Layout:** Each service row is a full-width accordion item. On desktop, they all show their description. On mobile, they collapse and expand.

**Each row:**
- Number: `01`, `02`, etc. — `text-xs`, `opacity: 0.25`
- Title: Avenir Next Condensed, `--text-3xl`, uppercase
- Category tag: small pill — "Residential", "Rental", "Commercial", "Development", "Digital"
- Description: DM Sans, `--text-base`, `max-width: 560px`
- Arrow: `→` that rotates `45°` and translates right on hover

**Hover interaction:** On row hover, the row expands in height by `8px`, and a thin gold `#c9a84c` line animates in from left along the `border-top`. No other color change.

**Services:**
1. Residential Real Estate / Buy & Sell
2. Apartment Hunting / Rentals
3. Commercial Real Estate / Commercial Spaces
4. New Developments / Pre-sales
5. Website Design / Digital Marketing

### Section 3: Approach — Dark Section

**Background:** `#0e1011`

**Content:**
- Heading: `The Approach` — TextReveal
- 3 philosophy statements with large numbers:
  - `01` — "Every property is a brand. I treat it that way."
  - `02` — "Data tells me where to list. Experience tells me how to close."
  - `03` — "Your timeline is my timeline."

### Section 4: CTA

**Background:** `#eceae5`

**Content:** "Which service fits you?" + CTA button

---

## PHASE 6: PORTFOLIO PAGE

**New file:** `app/[locale]/portfolio/page.tsx`

This page does not exist yet. The sold grid on the home page is a preview. This is the full archive.

### Section 1: Hero

**Background:** `#0e1011`

**Content:**
- Label: `(Portfolio)`
- Heading: `Sold & Rented.` — TextReveal `--text-display`
- Sub-stat: "12 recent transactions · Montreal" (updated periodically)

### Section 2: Full Grid — Cream Section

**Background:** `#eceae5`

**Layout:** A masonry-influenced grid. Not a uniform grid — a deliberate arrangement:
- Row 1: `[3 col] [3 col] [6 col]` (small, small, large)
- Row 2: `[6 col] [3 col] [3 col]` (large, small, small)
- Repeat pattern. This creates editorial variety.

**Each grid item:**
- Image fills container, `object-fit: cover`
- Overlay on hover: cream `rgba(236,234,229,0.06)` — very subtle
- No text overlay. The images speak.
- Scale: `1 → 1.04` on hover, duration `0.6s`

**Sibling dimming:** `.portfolio-grid:hover .portfolio-item:not(:hover) { opacity: 0.45 }`

**Filter bar:** Above the grid. Three pill filters: `All · Sold · Rented`. Clicking filters the visible items (CSS opacity/pointer-events toggling). Active pill: filled with `#0e1011`.

### Section 3: CTA

Standard CTA band.

---

## PHASE 7: TECHNOLOGY PAGE

**New file:** `app/[locale]/technology/page.tsx`

This is the page that separates jeremysoares.com from every other broker site in Canada. Jeremy built aimmo. He manages 50+ domains. This is where that story lives.

### Section 1: Hero — Navy Background

**Background:** `#132030`

**Content:**
- Label: `(Technology)`
- `aimmo` wordmark: custom display in `#c9a84c` (gold), `--text-display`
- Sub: `AI Real Estate Staging Platform` — cream, `--text-xl`
- Link: `studio.jeremysoares.com` as a large call-to-action

**Visual:** An aimmo render fills the right `45%` of the viewport. Dark navy + render creates a dramatic contrast.

### Section 2: What is aimmo — Dark Section

**Background:** `#0e1011`

**Content:**
- Heading: "AI-powered virtual staging for real estate." — TextReveal
- Body: 2-3 paragraphs explaining aimmo — before/after staging, AI models, accessible price point
- Before/After image slider: a drag handle that reveals the staged vs. unstaged version
  - `position: relative`, `overflow: hidden`. The after-image is clipped by a draggable handle.
  - On mobile: two stacked images instead of a slider

### Section 3: 50+ Domains — Cream Section

**Background:** `#eceae5`

**Content:**
- Counter: `50+` domains — DM Serif Display, counts up
- Paragraph: "A portfolio of specialized real estate domain names and websites targeting every Montreal neighborhood and property type."
- Domains displayed as a flowing wrap of pills: `ALouerMTL.com`, `ForSaleMTL.com`, `AgentMTL.ca`, `Presalepedia.com`, `MontrealRE.ca`, and others

**Animation on scroll:** Pills reveal from left, stagger `0.04s`.

### Section 4: Email Network

**Background:** `#0e1011`

**Content:**
- Number: `14,000` — counter animation, DM Serif Display, cream
- Sub: "Quebec real estate brokers reached directly"
- Body: "A proprietary email list built over years. When your property goes to market, it reaches every active broker in Quebec."

### Section 5: CTA

**Background:** `#132030` (navy)

**Content:**
- "Want access to this infrastructure?"
- "Whether you're an agent looking to market properties, or a developer seeking reach — let's talk."
- CTA button: cream fill

---

## PHASE 7B: BLOG PAGE

File: `app/[locale]/blog/page.tsx` — content system upgrade.

### Content Architecture Decision

**Decision: MDX files, not a CMS.** Rationale: Jeremy writes occasionally (3-6 posts/year), content is bilingual, and adding a headless CMS adds deployment complexity that isn't justified at this volume. MDX files are version-controlled, fast, and the bilingual approach is simpler (two files per post with a shared slug).

**File structure:**
```
content/
  posts/
    en/
      montreal-market-2026.mdx
      first-condo-guide.mdx
      montreal-investment-2026.mdx
    fr/
      montreal-market-2026.mdx
      first-condo-guide.mdx
      montreal-investment-2026.mdx
```

**MDX frontmatter schema:**
```yaml
---
title: "The State of Montreal's Real Estate Market in 2026"
date: "2026-03-01"
tag: "Market"
excerpt: "An overview of current trends..."
coverImage: "/images/blog/montreal-market-2026.jpg"
---
```

**Data layer:** `lib/posts.ts` — reads MDX files using `fs` at build time, returns typed array. No client-side fetching.

### Blog Page Design

**Section 1: Hero**
- Background: `#0e1011`
- Heading: `Journal` / `Articles` — TextReveal

**Section 2: Post List — Cream Section**
- Each post: full-width row with `border-top`
- Columns: `date` (2 cols) | `tag pill` + `title` + `excerpt` (8 cols) | `→` arrow (2 cols)
- Hover: row background shifts to `rgba(14,16,17,0.04)`, arrow translates right `8px`
- Click: navigate to `/[locale]/blog/[slug]`

**Section 3: Subscribe**
- Keep the subscribe CTA — it's the right move

### Blog Post Page

**New file:** `app/[locale]/blog/[slug]/page.tsx`

**Design:** Single column editorial. `max-width: 680px`, centered.
- Cover image: full-width, `aspect-ratio: 16/9`, parallax
- Title: `--text-4xl`, TextReveal
- Date + tag below title
- Body: DM Sans `--text-base`, `line-height: 1.8`, generous vertical rhythm
- Prose styles: `h2`, `h3`, `blockquote` (left border, `#c9a84c`), code, links

---

## PHASE 7C: CONTACT PAGE

File: `app/[locale]/contact/ContactClient.tsx` — rebuild. The form logic works, keep it.

### Section 1: Hero

**Background:** `#0e1011`

**Content:**
- Heading: `Let's Talk.` / `Discutons.` — TextReveal, `--text-display`
- Sub: "Share a few details and I'll get back to you promptly." — DM Sans, `--text-lg`, `opacity: 0.6`

### Section 2: Contact Layout — Cream Background

**Background:** `#eceae5`

**Layout:** Two columns, `col 5:7` split.

**Left (5 cols):**
- Label: `(Reach out)`
- Phone as large type: `514 519-8177` — `--text-2xl`, clickable `tel:` link
- Email — `--text-xl`
- Office address
- Socials: LinkedIn, Centris, Realtor.ca — link rows with hover underlines
- A small map embed or stylized Montreal neighborhood illustration (SVG outline)

**Right (7 cols):**
- Label: `(Inquiry Form)`
- Form fields: Name, Email, Phone (optional), Message
- Field style: `background: transparent`, `border: none`, `border-bottom: 1px solid rgba(14,16,17,0.2)`, `padding-block: 1rem`
- Focus state: border-bottom becomes `#0e1011` at full opacity
- Submit button: dark fill, cream text, full width
- Success state: the form collapses and "Message sent." appears with TextReveal

---

## PHASE 8: CONTENT AND ASSETS

### 8.1 Photography Needs

The current photography is functional. These are the shots we need or can improve:

**Already have (from Webflow CDN + /public/images/):**
- Hero photo: `68baf35dc28553a17f2d6d78_8-IMG_6610.jpg` — good, keep
- Jeremy headshot: `Jeremy-Soares-Montreal-Realtor.webp` — good
- Old Port Montreal: `68ba5ef5db548016dd9a1ed9_old port.jpg` — good
- Montreal building: `68bb1433116d7d6929d3342a` — good
- 12 sold template PNGs — functional, all local in `/public/images/sold/`

**Need (new photography):**
1. Jeremy in an architectural/design setting — looking at blueprints, at a development site, something that speaks to the architecture background. Not a suit-and-tie headshot.
2. 2-3 aimmo before/after pairs — staged vs. unstaged renders for the technology page slider
3. A lifestyle shot — Jeremy in Montreal, casual, city context

**For now:** Use existing images creatively. The hero photo is strong. The headshot is professional.

**Image optimization:**
- All local images move to `next/image` with proper `sizes` prop
- Webflow CDN images: add `cdn.prod.website-files.com` to `remotePatterns` (already done in `next.config.ts`)
- Add `images.formats: ['image/avif', 'image/webp']` to `next.config.ts`
- Add `images.deviceSizes: [640, 828, 1080, 1200, 1920, 2048]` to `next.config.ts`

### 8.2 Copy Requirements

**Home page copy (EN + FR):**
- Hero sub-line — refine to be less generic, more Jeremy's voice
- About teaser paragraph — 150-200 words, first person
- Technology teaser — 80 words

**About page copy (EN + FR):**
- Opening character statement — DM Serif Display moment, 30-40 words
- Bio paragraphs — 250 words total, first-person, covers architecture → art → Vancouver RE → Montreal RE → digital infrastructure

**Technology page copy (EN + FR):**
- aimmo explanation — 200 words
- Domain portfolio description — 100 words
- Email network description — 80 words

**Services page copy (EN + FR):**
- Approach philosophy — 3 statements, 25 words each

**All copy goes to Amélie for EN/FR bilingual writing. Arthur reviews any legal-adjacent claims ("Realtor®", license numbers, etc.).**

### 8.3 Content Management

- Blog posts: MDX files in `content/posts/[locale]/`
- Site copy: hardcoded in component files with `isFr` ternaries — manageable at this scale
- Images: `/public/images/` structured as:
  ```
  /public/images/
    hero/
    headshots/
    sold/
    blog/
    aimmo/
    montreal/
  ```

---

## PHASE 9: BRAND MANUAL

Zara owns this. Julian produces the technical specification; Zara reviews and approves.

### 9.1 Deliverables

**Typography specimen:**
- Every size in the scale rendered at actual size
- Font pairing examples: Avenir Next Condensed + DM Sans + DM Serif Display
- Letter-spacing and line-height demonstrated

**Color palette card:**
- 5 swatches with exact hex, RGB, and HSL values
- Usage context for each

**Motion reference:**
- GIF/video of each key animation: TextReveal, page transition, marquee, sibling dimming
- Duration and easing values documented

**Component reference:**
- Button variants (primary, ghost, link) in both themes (light/dark)
- Label component examples
- Form field states (empty, focus, filled, error, success)

**Grid reference:**
- 12/8/4 column system illustrated
- Container sizes illustrated
- Typical section layout at each breakpoint

**Iconography:**
- Arrow style: `→` — a simple right-arrow, no filled icon libraries
- External link indicator: `↗`
- Hamburger: two lines (not three — more architectural)

---

## BUILD ORDER AND EXECUTION PLAN

### Dependencies Map

```
Phase 0 (Design System)
  → Phase 1 (Animation Infrastructure) depends on Phase 0 tokens
    → Phase 2 (Layout Shell) depends on Phase 1 providers
      → Phase 3-7 (Pages) depend on Phase 2 shell
        → Phase 8 (Content) can run parallel to page builds
          → Phase 9 (Brand Manual) runs after pages are visually stable
```

### What can be parallelized

- Phase 0 and Phase 8 (copy writing by Amélie) run in parallel
- Phase 1 and Phase 9 spec can be drafted in parallel
- Once Phase 2 is done, ALL pages (Phase 3-7) can be built by separate agents in parallel
- Blog MDX content (`Phase 7B`) and blog infrastructure are independent tasks

### Execution Phases for Agents

**Sprint 1 (Julian):**
1. Delete Webflow CSS CDN link from `app/layout.tsx`
2. Build `app/globals.css` with full design token layer using `@theme`
3. Create `lib/motion.ts` with all easing/duration constants
4. Build `components/ui/Text.tsx`, `Container.tsx`, `Section.tsx`, `Button.tsx`, `Label.tsx`
5. Install Lenis
6. Build `components/providers/SmoothScrollProvider.tsx`
7. Build `lib/useGSAP.ts`
8. Build `components/animation/TextReveal.tsx`
9. Build `components/animation/SectionReveal.tsx`
10. Build `components/animation/Marquee.tsx`
11. Build `components/animation/CursorFollower.tsx`
12. Build `components/animation/Preloader.tsx`
13. Build `components/providers/PageTransitionOverlay.tsx`
14. Update `app/[locale]/layout.tsx` to wire everything in
15. Delete `hooks/useAnimations.ts`

**Sprint 2 (Julian):**
1. Rebuild `components/layout/Navbar.tsx` — full design
2. Rebuild `components/layout/Footer.tsx` with wordmark + marquee
3. Create `components/layout/PageWrapper.tsx`
4. QA checkpoint: nav, footer, transitions working on all existing pages

**Sprint 3 (Julian):**
1. Rebuild `app/[locale]/page.tsx` — home page, all 7 sections
2. QA: home page animations, mobile, FR/EN

**Sprint 4 (Julian + parallel agents):**
- Julian: Rebuild About page
- Parallel: Rebuild Service page
- Parallel: Rebuild Contact page

**Sprint 5 (Julian):**
1. Build Portfolio page (new)
2. Build Technology page (new)
3. Build Blog infrastructure (MDX setup)
4. Build Blog list page
5. Build Blog post page

**Sprint 6 (Nix — QA):**
- Cross-browser testing: Safari, Chrome, Firefox, Edge
- Mobile testing: iOS Safari, Android Chrome
- Lighthouse audit — target 90+ performance, 100 accessibility
- Animation performance audit — confirm no layout thrash, no dropped frames
- FR/EN language parity check

**Sprint 7 (Harper — Deploy):**
- Vercel deploy with environment variables
- Domain DNS confirmation
- BetterStack uptime monitoring setup
- Core Web Vitals monitoring

### QA Checkpoints

**After Phase 1:** Lenis scroll works, page transition fires between routes, preloader plays once, cursor follower visible on desktop

**After Phase 2:** Nav collapses on mobile correctly, language switch routes correctly, footer wordmark TextReveal fires on scroll, marquee runs continuously

**After Phase 3 (Home):** Hero animations sequence correctly after preloader, sibling dimming works on service tiles, stats counter fires once, parallax on hero image works

**After each page:** Lighthouse score, mobile responsiveness, bilingual content parity

---

## TECHNICAL DEBT TO CLEAR IN SPRINT 1

These are things in the current codebase that must be fixed before building on top of them:

1. **Remove Webflow CDN CSS link** from `app/layout.tsx` line 137-140. This is blocking. Everything after this depends on Tailwind being the sole styling layer.

2. **The home page** (`app/[locale]/page.tsx`) uses the Webflow components (`Navbar.tsx` and `Footer.tsx` exist but are not wired in — the page renders its own inline nav and footer). The rebuilt home page must use `components/layout/Navbar.tsx` and `components/layout/Footer.tsx` exclusively.

3. **`next.config.ts`** needs `images.formats` and `images.deviceSizes` added.

4. **`app/layout.tsx`** has the Typekit script loaded via `TypekitLoader` (correct), but the `<html lang="en">` is hardcoded — should remain `"en"` at root level since `LocaleLangSetter` handles the override. This is fine, leave it.

5. **The `hooks/` directory**: `useAnimations.ts` is deprecated in full. Delete it in Sprint 1 Step 15.

6. **`app/page.tsx`** (root, no locale) — redirect to `/en-ca`. Confirm this is already happening. If not, add `redirect('/en-ca')`.

---

## AWWWARDS CRITERIA MAPPING

For nomination consideration, the site needs to score in these categories:

| Category | Our play |
|----------|----------|
| Design | Dark/cream restraint, typography precision, white space |
| Creativity | Architecture-meets-real-estate narrative, aimmo technology story |
| Usability | Lenis scroll, accessible animations, mobile-first responsiveness |
| Content | Bilingual EN/FR, real content (not lorem ipsum), SEO-structured |
| Mobile | Full mobile design, clip-path menu, touch-appropriate parallax |

**The single differentiator:** The Technology page + aimmo story. No other Montreal broker has built an AI staging platform. This is the narrative that wins awards because it is genuinely true and genuinely unusual.

---

## NOTES FOR EXECUTING AGENTS

- **Never use Webflow class names** in any new component. Those classes only exist in the CDN stylesheet which will be removed in Sprint 1.
- **All new CSS** lives either in `@theme` tokens in `globals.css` or as Tailwind utilities. Zero arbitrary inline styles except for dynamic values (GSAP-animated properties).
- **All new animations** use `useGSAP` from `lib/useGSAP.ts`. No raw `useEffect` for GSAP.
- **Locale** is read from `useParams()` inside components — do not thread it as props unless absolutely necessary.
- **Images**: prefer `next/image` for all images. Only use `<img>` for GSAP-animated elements that need to bypass Next.js image processing.
- **The bilingual system** is `isFr = locale === 'fr-ca'` and inline ternaries. Keep this pattern — do not introduce i18n libraries.
- **Zara must approve** all visual designs before shipping. Share screenshots of each section as built.
- **Jeremy must approve** the home page hero and about page — these are personal brand statements.

---

*Plan authored by Julian, Frontend UX Architect. Contact Marcus for sprint assignments. Contact Zara for design review. Contact Nix for QA coordination.*
