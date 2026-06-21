# Sairaj Patil — Portfolio · Locked Design Spec

Synthesized from a 3-director creative panel (all three independently converged on a
continuous vertical light "thread/ledger" + a traveling portrait — that convergence is the
signature). Aesthetic locked by the client: **Midnight Aurora**, motion **Cinematic max**.

## Concept — "The Outcome Thread"

The site plays like the cold open of a prestige film about one engineer's decision to stop
shipping features and start owning outcomes. A single aurora filament runs the full height of
the page; it draws as you scroll and, at each career milestone, an **earned metric posts as a
glowing node** to the thread. The portrait is the constant protagonist, carried by the camera
from chapter to chapter. The arc: lone engineer in near-darkness → advisor whose decisions move
national-scale operations → the thread fully lit, a balance sheet of impact.

**Thesis (the spine):** *I don't just build features. I own outcomes.*

## Signature element

**The Outcome Thread** — one continuous violet→cyan light line on the left margin (desktop)
that scrub-draws with global scroll progress. Glowing **outcome nodes** ignite at each chapter
("−40% DEV TIME", "0→ALPHA <2MO", "10K+ INSTALLS", "3→25 CENTRES"). Paired with the
**traveling portrait** that docks to the thread as the playhead and retints across eras.

## Signature risk (kept)

**Withheld aurora cold open.** Open near-black (#06060A) with one breathing hairline + a serif
line "Most engineers ship features." The aurora is starved for ~2.5s, then *blooms* into the
page as the thesis flips to "I own outcomes." Restraint as plot — it signals product judgment
(knowing what to withhold), the exact trait being sold. De-risked with a breathing line + caret
so it never reads as "failed to load," and a full reduced-motion static fallback.

## Palette (tokens)

| token | hex | usage |
|---|---|---|
| `--ink-void` | `#06060A` | cold-open black, before aurora is earned |
| `--canvas` | `#08080C` | primary near-black stage |
| `--canvas-raised` | `#0D0E14` | elevated bands / chapter backdrops |
| `--panel` | `#0E0E16` | glass panel base fill |
| `--glass-fill` | `rgba(18,20,32,0.55)` | frosted panel fill (backdrop-blur) |
| `--glass-border` | `rgba(255,255,255,0.10)` | 1px top-lit hairline on glass |
| `--aurora-violet` | `#7C5CFF` | primary accent / thread origin |
| `--aurora-indigo` | `#5B3FE0` | deep mid-tone, grounds the violet |
| `--aurora-cyan` | `#22D3EE` | secondary accent / thread terminus |
| `--aurora-deep` | `#3B1E6E` | deep background blob |
| `--outcome` | `#3DF5D0` | resolved-outcome mint — ONLY completed nodes + final counters |
| `--signal-gold` | `#F5C66B` | RARE warm accent — pivot peak + B2G/national only |
| `--text-primary` | `#F4F5FA` | display + high-emphasis (never pure #fff) |
| `--text-secondary`| `#9AA0B4` | connective body copy |
| `--text-mono` | `#8B92A8` | mono eyebrows/labels (kept bright for AA contrast) |

## Type

- **Display / body:** Sora (600/700/800 display, 400/500 body) — tight tracking (-0.02 to -0.04em).
- **Emotional serif:** Instrument Serif *italic* — reserved strictly for one-line emotional beats.
- **Utility mono:** JetBrains Mono (500, +0.18em, uppercase) — eyebrows, slates, node labels, timecodes.

Scale (fluid clamp): hero `clamp(3.5rem,9vw,8.5rem)/0.92`; chapter title `clamp(2.25rem,5.5vw,4.5rem)`;
serif beat `clamp(1.75rem,3.5vw,3rem)`; counter `clamp(3rem,7vw,6rem)` tabular-nums;
body `clamp(1rem,1.15vw,1.25rem)/1.65` ≤62ch; eyebrow `0.75rem/+0.18em`.

## Motion

Lenis smooth scroll drives all GSAP ScrollTrigger. Page-load cold-open timeline runs once, then
scroll takes over. Transform/opacity only. Stagger 30–50ms. ease-out enter, ease-in exit.
Signature moment = the services-to-product pivot bloom (brightest frame). Everything `prefers-reduced-motion`
safe: no Lenis, no pins/scrubs, final states rendered, counters show final values, thread static.

## Sections (order + choreography)

0. **Hero / Cold Open** — withheld-aurora load → flip → bloom → thread ignites → portrait rises
   into glass card → name/title/subhead resolve → scroll cue. On scroll, hero parallaxes up;
   portrait shrinks toward the thread to become the playhead.
1. **Origin** — short pinned serif beat: "He could have just shipped features. He decided to own
   the outcome." Thread thickens (system powering on).
2. **Journey** — three vertical pinned, scrubbed chapters: ScriptAnalytica (−40% dev time) →
   Venoh (0→alpha <2mo, two-sided marketplace) → TellMe (services→product pivot; 10K+ installs,
   3→25 centres). Portrait docked as playhead, retints violet→cyan, white-shirt→black-tee.
   TellMe = emotional peak: gold/mint unlocked, the pivot bloom is the brightest moment;
   "services → product" morph.
3. **Impact** — pinned counter constellation: 10K+ · 5× CPI · 3→25 · 40% · <2mo · 2yrs.
   Numerals count up in `--outcome`, settle to primary; nodes plug into the thread.
4. **Work** — horizontal pinned reel of 6 project cards (mobile → vertical stagger). Cover image
   parallax inside frame; role/period mono meta; B2G/national cards carry a gold seal.
5. **Craft** — Strengths / Craft / Technical / Domains as ledger line-items that draw in left→right and
   pulse-connect to the thread (skills = line items; outcomes = totals).
6. **Closing** — balance sheet: portrait returns full scale, thread fully lit, all nodes reflow
   into a constellation, serif sign-off "The features were never the point. The outcomes always
   were." Contact: email, phone, LinkedIn, GitHub, CV. Final thread shimmer.

## Do-not list

- No generic big-number stat-bar hero; no emoji icons (inline SVG only).
- No pure #fff / #000. Transform/opacity animation only — never width/height/top/left.
- No horizontal-scroll maze on mobile; never trap the scroll. Body measure ≤ ~65ch.
- Gold + mint are scarce: the pivot peak, B2G/national, and resolved outcomes only.
- Always honour prefers-reduced-motion and visible keyboard focus.
