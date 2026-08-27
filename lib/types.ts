import type readingTime from 'reading-time'

export type ReadTimeResults = ReturnType<typeof readingTime>

/**
 * The frontmatter fields as authored at the top of a `data/blog/**\/*.mdx`
 * (or `.md`) file, before `getFileBySlug`/`getAllFilesFrontMatter` enrich it
 * with derived fields (`slug`, `fileName`, `readingTime`, normalized `date`).
 */
export interface RawPostFrontMatter {
  title: string
  date: string
  tags: string[]
  draft?: boolean
  summary?: string
  images?: string[]
  layout?: string
  canonicalUrl?: string
  authors?: string[]
  lastUpdated?: string
  readTime?: string
}

/**
 * The frontmatter shape used across pages/layouts/components once a post
 * has been read: the raw frontmatter plus the fields derived at read time.
 */
export interface PostFrontMatter extends RawPostFrontMatter {
  slug: string
  fileName: string
  readingTime: ReadTimeResults
}

/**
 * The frontmatter shape for `data/authors/*.md` files, used by AuthorLayout
 * and any page/component rendering author details (About page, post byline).
 */
export interface AuthorFrontMatter {
  name: string
  avatar?: string
  occupation?: string
  company?: string
  email?: string
  twitter?: string
  linkedin?: string
  github?: string
  layout?: string
}
