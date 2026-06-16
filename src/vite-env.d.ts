/// <reference types="vite/client" />

declare global {
  interface Window {
    /** set true by the splash once the paper-plane fold completes */
    __splashDone?: boolean
    /** dev-only QA handle to the Lenis instance */
    __lenis?: import('lenis').default
  }
}

export {}
