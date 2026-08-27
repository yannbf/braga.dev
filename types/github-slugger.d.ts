declare module 'github-slugger' {
  export function slug(value: string, maintainCase?: boolean): string

  export default class GithubSlugger {
    occurrences: Record<string, number>
    slug(value: string, maintainCase?: boolean): string
    reset(): void
  }
}
