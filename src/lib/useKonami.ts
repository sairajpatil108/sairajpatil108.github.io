import { useEffect, useRef } from 'react'

// The classic code, plus an on-theme word trigger: type "outcomes" anywhere.
const KONAMI = [
  'arrowup', 'arrowup', 'arrowdown', 'arrowdown',
  'arrowleft', 'arrowright', 'arrowleft', 'arrowright',
  'b', 'a',
]
const WORD = 'outcomes'

const isTyping = (el: EventTarget | null) => {
  const node = el as HTMLElement | null
  if (!node) return false
  const tag = node.tagName
  return tag === 'INPUT' || tag === 'TEXTAREA' || node.isContentEditable
}

/**
 * Fires `onUnlock` when the user enters the Konami code (↑↑↓↓←→←→ B A) or types
 * the word "outcomes". Ignores keystrokes while a text field is focused, so the
 * command palette's search box never trips it. Debounced against rapid re-fires.
 */
export function useKonami(onUnlock: () => void) {
  const cb = useRef(onUnlock)
  cb.current = onUnlock

  useEffect(() => {
    let seq = 0
    let word = ''
    let cooldown = false

    const onKey = (e: KeyboardEvent) => {
      if (isTyping(e.target)) return
      const key = e.key.toLowerCase()

      seq = key === KONAMI[seq] ? seq + 1 : key === KONAMI[0] ? 1 : 0
      word = (word + key).slice(-WORD.length)

      if (!cooldown && (seq === KONAMI.length || word === WORD)) {
        seq = 0
        word = ''
        cooldown = true
        window.setTimeout(() => { cooldown = false }, 1500)
        cb.current()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
}
