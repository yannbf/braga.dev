// rehype-citation ships types at dist/node/index.d.ts, but its package.json
// "exports" map has no "types" condition, so bundler-mode module resolution
// can't find them. Re-declared here with a loose signature until upstream
// fixes the exports map.
declare module 'rehype-citation' {
  import type { Plugin } from 'unified'

  interface RehypeCitationOptions {
    path?: string
    bibliography?: string
    csl?: string
    lang?: string
    linkCitations?: boolean
    suppressBibliography?: boolean
    noCite?: string[]
  }

  const rehypeCitation: Plugin<[RehypeCitationOptions?]>
  export default rehypeCitation
}
