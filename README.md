# Sairaj Patil — Portfolio

A cinematic, scroll-driven portfolio that plays like the cold open of a film about an
engineer who decided to stop shipping features and start owning outcomes.

**Aesthetic:** Midnight Aurora — near-black canvas, drifting violet→cyan aurora, glass panels,
a continuous "Outcome Thread" rail that fills as you scroll and ignites a node at each earned
metric. See [`DESIGN_SPEC.md`](./DESIGN_SPEC.md) for the full locked design system.

## Stack

- **Vite + React 18 + TypeScript**
- **GSAP + ScrollTrigger** — pinned scenes, scrubbed reveals, the thread, counters
- **Lenis** — smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in sync
- **Tailwind v4** — CSS-first `@theme` tokens in `src/styles/global.css`

No second animation engine, no UI framework — ~109KB gzip JS.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc + vite build → dist/
npm run preview  # serve the production build
```

## Structure

```
src/
  data/portfolio.ts        # single source of truth for all content
  styles/global.css        # design tokens + bespoke utilities
  lib/                     # SmoothScroll (Lenis<->GSAP), gsap setup, hooks
  components/
    chrome/                # AuroraBackground, OutcomeThread, Nav, Cursor
    ui/                    # Counter, Reveal, SplitText
    sections/              # Hero, Origin, Journey/Chapter, Impact, Work, Craft, Closing
```

Content lives entirely in `src/data/portfolio.ts` — edit there to update the story.

## Accessibility & motion

Fully honours `prefers-reduced-motion` (no smooth scroll, no pins/scrubs, final states
rendered, native cursor kept). Visible keyboard focus, semantic headings, labelled landmarks.

The previous static HTML/CSS site is preserved in [`legacy/`](./legacy).
