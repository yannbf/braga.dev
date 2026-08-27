export {}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    plausible?: (...args: unknown[]) => void
    sa_event?: (...args: unknown[]) => void
    disqus_config?: (this: { page: { url: string; identifier: string } }) => void
    DISQUS?: {
      reset: (options: { reload: boolean }) => void
    }
  }
}
