import { useEffect, useMemo, useRef, useState } from 'react'
import { useLenis } from '../../lib/SmoothScroll'
import { fireFx } from '../../lib/effects'
import { personal, contact, socials } from '../../data/portfolio'

/**
 * ⌘K command palette — a developer-grade quick switcher for the site. Open with
 * ⌘K / Ctrl+K (or `/`), fuzzy-filter, arrow-navigate, Enter to run. Jumps to any
 * section through Lenis, copies contact details, opens links — and hides a few
 * commands that fire ambient effects on the bus (Supernova, Pulse), which the
 * aurora and the secret layer react to.
 *
 * Accessibility: combobox + listbox wiring with aria-activedescendant (the active
 * row is announced as you arrow), Tab is trapped within the panel, Escape closes
 * from anywhere in the dialog, and focus returns to the opener on close. Scroll
 * locks robustly on both the Lenis path and the reduced-motion (no-Lenis) path.
 * The shortcuts stay inert until the cold open lifts, matching the rest of chrome.
 */

type Group = 'Navigate' | 'Actions' | 'Secret'
type Command = {
  id: string
  label: string
  hint?: string
  group: Group
  keywords?: string
  run: () => string | void | Promise<string>
}

const LISTBOX_ID = 'cmdpalette-listbox'

// Subsequence test — every query char appears in order.
function isSubsequence(q: string, t: string) {
  let i = 0
  for (let j = 0; j < t.length && i < q.length; j++) if (t[j] === q[i]) i++
  return i === q.length
}

// Relevance score. Higher wins. A contiguous label hit must outrank a scattered
// subsequence hit, so e.g. "contact" picks Contact, not The Decision.
function score(query: string, label: string, haystack: string) {
  const q = query.trim().toLowerCase()
  if (!q) return 1
  const l = label.toLowerCase()
  const h = haystack.toLowerCase()
  if (l.startsWith(q)) return 100
  if (l.includes(q)) return 80
  if (h.includes(q)) return 60
  if (isSubsequence(q, l)) return 40
  if (isSubsequence(q, h)) return 20
  return 0
}

async function copy(text: string, label: string): Promise<string> {
  try {
    await navigator.clipboard.writeText(text)
    return `Copied ${label}`
  } catch {
    return `Couldn’t copy — it’s ${text}`
  }
}

export function CommandPalette() {
  const lenis = useLenis()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [toast, setToast] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const restoreFocus = useRef<HTMLElement | null>(null)
  const closeTimer = useRef(0)
  const lockY = useRef(0)

  const commands = useMemo<Command[]>(() => {
    const go = (id: string) => () => {
      const el = document.getElementById(id)
      if (!el) return
      if (lenis) lenis.scrollTo(el, { offset: -40 })
      else el.scrollIntoView({ behavior: 'smooth' })
    }
    const open_ = (url: string) => () => { window.open(url, '_blank', 'noopener,noreferrer') }
    const social = (name: string) => socials.find((s) => s.name === name)?.url ?? '#'

    return [
      { id: 'story', label: 'Story', hint: 'Approach', group: 'Navigate', run: go('origin') },
      { id: 'journey', label: 'Journey', hint: 'Experience', group: 'Navigate', run: go('journey') },
      { id: 'impact', label: 'Impact', hint: 'The numbers', group: 'Navigate', run: go('impact') },
      { id: 'work', label: 'Selected Work', hint: 'Projects', group: 'Navigate', keywords: 'projects', run: go('work') },
      { id: 'decision', label: 'The Decision', hint: 'Your call', group: 'Navigate', keywords: 'interactive game', run: go('decision') },
      { id: 'craft', label: 'Craft', hint: 'Skills', group: 'Navigate', run: go('craft') },
      { id: 'contact', label: 'Contact', hint: 'Get in touch', group: 'Navigate', run: go('closing') },

      { id: 'cv', label: 'Download CV', hint: 'PDF', group: 'Actions', keywords: 'resume', run: open_(personal.cv) },
      { id: 'email', label: 'Email Sairaj', hint: contact.email, group: 'Actions', run: () => { window.location.href = `mailto:${contact.email}` } },
      { id: 'copy-email', label: 'Copy email', group: 'Actions', keywords: 'clipboard', run: () => copy(contact.email, 'email') },
      { id: 'copy-phone', label: 'Copy phone', hint: contact.phone, group: 'Actions', keywords: 'clipboard number', run: () => copy(contact.phone, 'phone') },
      { id: 'linkedin', label: 'Open LinkedIn', group: 'Actions', run: open_(social('LinkedIn')) },
      { id: 'github', label: 'Open GitHub', group: 'Actions', run: open_(social('GitHub')) },

      { id: 'supernova', label: 'Supernova', hint: '✦ secret', group: 'Secret', keywords: 'aurora explode boom', run: () => { fireFx('supernova'); return 'Detonating the aurora…' } },
      { id: 'pulse', label: 'Pulse the aurora', hint: '✦ secret', group: 'Secret', keywords: 'ripple wave', run: () => fireFx('pulse') },
    ]
  }, [lenis])

  // Group order is fixed (Navigate → Actions → Secret); within a group, sort by
  // relevance. The render walks groups in this same order, so the flat index used
  // for arrow-key navigation lines up with this list exactly.
  const filtered = useMemo(() => {
    const groupOrder: Record<Group, number> = { Navigate: 0, Actions: 1, Secret: 2 }
    return commands
      .map((c) => ({ c, s: score(query, c.label, `${c.label} ${c.keywords ?? ''} ${c.hint ?? ''}`) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => groupOrder[a.c.group] - groupOrder[b.c.group] || b.s - a.s)
      .map((x) => x.c)
  }, [commands, query])

  // Global shortcuts — inert until the cold open lifts (window.__splashDone),
  // matching the pre-bloom gating on the rest of the chrome.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!window.__splashDone) return
      const k = e.key.toLowerCase()
      if ((e.metaKey || e.ctrlKey) && k === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
        return
      }
      const target = e.target as HTMLElement | null
      const typing = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
      if (k === '/' && !typing) {
        e.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Side effects of opening: reset state, lock scroll robustly, manage focus.
  useEffect(() => {
    if (open) {
      restoreFocus.current = document.activeElement as HTMLElement | null
      setQuery('')
      setActive(0)
      setToast(null)
      if (lenis) {
        lenis.stop()
      } else {
        // Reduced-motion path: no Lenis, so lock the real viewport scroller. A
        // position:fixed body lock is the only thing iOS Safari reliably honours.
        lockY.current = window.scrollY
        const b = document.body.style
        b.position = 'fixed'
        b.top = `-${lockY.current}px`
        b.left = '0'
        b.right = '0'
        b.width = '100%'
      }
      const id = window.setTimeout(() => inputRef.current?.focus(), 20)
      return () => window.clearTimeout(id)
    }
    if (lenis) {
      lenis.start()
    } else if (document.body.style.position === 'fixed') {
      const y = lockY.current
      const b = document.body.style
      b.position = ''
      b.top = ''
      b.left = ''
      b.right = ''
      b.width = ''
      window.scrollTo(0, y)
    }
    restoreFocus.current?.focus?.()
  }, [open, lenis])

  useEffect(() => () => window.clearTimeout(closeTimer.current), [])

  const close = () => setOpen(false)
  const runCommand = (cmd: Command | undefined) => {
    if (!cmd) return
    const result = cmd.run()
    const showToastThenClose = (msg: string) => {
      setToast(msg)
      closeTimer.current = window.setTimeout(close, 950)
    }
    if (typeof result === 'string') showToastThenClose(result)
    else if (result && typeof (result as Promise<string>).then === 'function') {
      // Async (clipboard) — keep the panel open so its toast is visible.
      ;(result as Promise<string>).then(showToastThenClose)
    } else close()
  }

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, filtered.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)) }
    else if (e.key === 'Enter') { e.preventDefault(); runCommand(filtered[active]) }
  }

  // Dialog-level keys: Escape closes from anywhere; Tab is trapped in the panel.
  const onDialogKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { e.preventDefault(); close(); return }
    if (e.key !== 'Tab' || !panelRef.current) return
    const focusable = Array.from(
      panelRef.current.querySelectorAll<HTMLElement>('input, button'),
    ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null)
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
  }

  const activeId = filtered[active] ? `cmd-${filtered[active].id}` : undefined

  // Flat, group-labelled render list with a global index that matches `filtered`.
  let runningIndex = -1

  return (
    <>
      {/* Discoverability affordance — fades in once the cold open lifts. Sized for
          a 44px tap target and offset past the mobile home-indicator safe area. */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
        className="pre-bloom btn-ghost fixed z-[60] !rounded-full !p-3"
        style={{
          display: open ? 'none' : undefined,
          bottom: 'calc(1.1rem + env(safe-area-inset-bottom))',
          right: 'calc(1.1rem + env(safe-area-inset-right))',
          minWidth: 44,
          minHeight: 44,
        }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span className="hidden sm:inline">⌘K</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[110] flex items-start justify-center px-4 pt-[14vh]"
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          onKeyDown={onDialogKey}
        >
          {/* Scrim */}
          <button
            type="button"
            aria-label="Close command palette"
            onClick={close}
            className="absolute inset-0 cursor-default"
            style={{ background: 'rgba(5,5,5,0.55)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
            tabIndex={-1}
          />

          <div
            ref={panelRef}
            className="glass glass-refract relative w-full max-w-[560px] overflow-hidden rounded-2xl"
            style={{ boxShadow: '0 32px 80px -24px rgba(0,0,0,0.8)' }}
          >
            {/* Search */}
            <div className="flex items-center gap-3 border-b border-white/8 px-5 py-4">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className="t-mono shrink-0">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setActive(0) }}
                onKeyDown={onInputKey}
                placeholder="Jump to a section, copy a detail, or try a secret…"
                className="t-primary w-full bg-transparent font-display text-[15px] tracking-tight outline-none placeholder:text-[color:var(--color-text-mono)]"
                autoComplete="off"
                spellCheck={false}
                role="combobox"
                aria-expanded="true"
                aria-controls={LISTBOX_ID}
                aria-activedescendant={activeId}
                aria-label="Search commands"
              />
              <kbd className="t-mono hidden shrink-0 rounded border border-white/12 px-1.5 py-0.5 font-mono text-[10px] sm:block">esc</kbd>
            </div>

            {/* Results */}
            <ul id={LISTBOX_ID} className="max-h-[52vh] overflow-y-auto overscroll-contain py-2" role="listbox" aria-label="Commands">
              {filtered.length === 0 && (
                <li className="t-secondary px-5 py-6 text-center font-mono text-[12px]">No matches.</li>
              )}
              {(['Navigate', 'Actions', 'Secret'] as Group[]).map((group) => {
                const items = filtered.filter((c) => c.group === group)
                if (items.length === 0) return null
                return (
                  <li key={group}>
                    <p className="eyebrow px-5 pb-1 pt-3 !text-[9px]">{group === 'Secret' ? '✦ Hidden' : group}</p>
                    <ul>
                      {items.map((c) => {
                        runningIndex += 1
                        const idx = runningIndex
                        const isActive = idx === active
                        return (
                          <li key={c.id} id={`cmd-${c.id}`} role="option" aria-selected={isActive}>
                            <button
                              type="button"
                              onMouseMove={() => setActive(idx)}
                              onClick={() => runCommand(c)}
                              className="flex w-full items-center justify-between px-5 py-2.5 text-left transition-colors"
                              style={{ background: isActive ? 'rgba(255,255,255,0.07)' : 'transparent' }}
                            >
                              <span className={`font-display text-[14px] tracking-tight ${isActive ? 't-primary' : 't-secondary'}`}>
                                {c.label}
                              </span>
                              {c.hint && (
                                <span className="t-mono ml-4 shrink-0 font-mono text-[11px] uppercase tracking-[0.12em]">{c.hint}</span>
                              )}
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </li>
                )
              })}
            </ul>

            {/* Footer / toast */}
            <div className="flex items-center justify-between border-t border-white/8 px-5 py-2.5">
              <span className="t-mono font-mono text-[10px] uppercase tracking-[0.14em]" aria-live="polite">
                {toast ?? 'Sairaj Patil · command palette'}
              </span>
              <span className="t-mono hidden gap-3 font-mono text-[10px] sm:flex">
                <span>↑↓ move</span>
                <span>↵ select</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
