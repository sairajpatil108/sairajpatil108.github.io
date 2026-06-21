// Tiny client-side effect bus. Lets the command palette, the Konami code, and
// in-page interactions all trigger the same ambient moments — a supernova
// bloom, a soft aurora pulse — without prop-drilling through the tree.
// Mirrors the existing `window` CustomEvent convention used for 'splash:done'.

export type FxName = 'supernova' | 'pulse'

/** Fire an ambient effect. Anything listening via `onFx` reacts. */
export function fireFx(name: FxName) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(`fx:${name}`))
}

/** Subscribe to an effect. Returns an unsubscribe function. */
export function onFx(name: FxName, handler: () => void): () => void {
  const evt = `fx:${name}`
  window.addEventListener(evt, handler)
  return () => window.removeEventListener(evt, handler)
}
