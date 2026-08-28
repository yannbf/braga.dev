import { bundleMDX } from 'mdx-bundler'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import readingTime from 'reading-time'
import getAllFilesRecursively from './utils/files'
// Remark packages
// remark-gfm covers GitHub-flavored footnotes; remark-footnotes is no longer needed
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkExtractFrontmatter from './remark-extract-frontmatter'
import remarkTocHeadings, { TocHeading } from './remark-toc-headings'
import remarkImgToJsx from './remark-img-to-jsx'
import remarkGithubAlert from './remark-github-alert'
import { remarkCodeHike } from '@code-hike/mdx'
// Rehype packages
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypeCitation from 'rehype-citation'
import rehypePresetMinify from 'rehype-preset-minify'
import theme from 'shiki/themes/one-dark-pro.json'
import type { RawPostFrontMatter, PostFrontMatter } from './types'

const root = process.cwd()

export function getFiles(type: string): string[] {
  const prefixPaths = path.join(root, 'data', type)
  const files = getAllFilesRecursively(prefixPaths)
  // Only want to return blog/path and ignore root, replace is needed to work on Windows
  return files.map((file) => file.slice(prefixPaths.length + 1).replace(/\\/g, '/'))
}

export function formatSlug(slug: string): string {
  return slug.replace(/\.(mdx|md)/, '')
}

export function dateSortDesc(a: string | null, b: string | null): number {
  if (a! > b!) return -1
  if (a! < b!) return 1
  return 0
}

export async function getFileBySlug<T extends Record<string, any> = RawPostFrontMatter>(
  type: string,
  slug: string | string[]
): Promise<{
  mdxSource: string
  toc: TocHeading[]
  frontMatter: Omit<T, 'date' | 'slug' | 'fileName'> & PostFrontMatter
}> {
  const slugPath = Array.isArray(slug) ? slug.join('/') : slug
  const mdxPath = path.join(root, 'data', type, `${slugPath}.mdx`)
  const mdPath = path.join(root, 'data', type, `${slugPath}.md`)
  const source = fs.existsSync(mdxPath)
    ? fs.readFileSync(mdxPath, 'utf8')
    : fs.readFileSync(mdPath, 'utf8')

  // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
  if (process.platform === 'win32') {
    process.env.ESBUILD_BINARY_PATH = path.join(root, 'node_modules', 'esbuild', 'esbuild.exe')
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(root, 'node_modules', 'esbuild', 'bin', 'esbuild')
  }

  const toc: TocHeading[] = []

  const { code, frontmatter } = await bundleMDX<T>({
    source,
    // mdx imports can be automatically source from the components directory
    cwd: path.join(root, 'components'),
    mdxOptions(options) {
      // this is the recommended way to add custom remark/rehype plugins:
      // The syntax might look weird, but it protects you in case we add/remove
      // plugins in the future.
      // The remark/rehype plugins below come from packages that each pin
      // their own (incompatible) versions of unified/vfile, so the plugin
      // array can't satisfy a single `Pluggable<any[]>` element type.
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkExtractFrontmatter,
        [remarkTocHeadings, { exportRef: toc }],
        remarkGfm,
        [remarkCodeHike, { theme, lineNumbers: false, showCopyButton: true }],
        remarkMath,
        remarkImgToJsx,
        remarkGithubAlert,
      ] as any
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        rehypeAutolinkHeadings,
        rehypeKatex,
        [rehypeCitation, { path: path.join(root, 'data') }],
        rehypePresetMinify,
      ] as any
      return options
    },
    esbuildOptions: (options) => {
      options.loader = {
        ...options.loader,
        '.js': 'jsx',
      }
      return options
    },
  })

  return {
    mdxSource: code,
    toc,
    frontMatter: {
      readingTime: readingTime(code),
      slug: slugPath || null,
      fileName: fs.existsSync(mdxPath) ? `${slugPath}.mdx` : `${slugPath}.md`,
      ...frontmatter,
      date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
    } as unknown as Omit<T, 'date' | 'slug' | 'fileName'> & PostFrontMatter,
  }
}

export async function getAllFilesFrontMatter(folder: string): Promise<PostFrontMatter[]> {
  const prefixPaths = path.join(root, 'data', folder)

  const files = getAllFilesRecursively(prefixPaths)

  const allFrontMatter: PostFrontMatter[] = []

  files.forEach((file) => {
    // Replace is needed to work on Windows
    const fileName = file.slice(prefixPaths.length + 1).replace(/\\/g, '/')
    // Remove Unexpected File
    if (path.extname(fileName) !== '.md' && path.extname(fileName) !== '.mdx') {
      return
    }
    const source = fs.readFileSync(file, 'utf8')
    const { data: frontmatter } = matter(source) as unknown as { data: RawPostFrontMatter }
    if (frontmatter.draft !== true) {
      allFrontMatter.push({
        ...frontmatter,
        slug: formatSlug(fileName),
        date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
      } as PostFrontMatter)
    }
  })

  return allFrontMatter.sort((a, b) => dateSortDesc(a.date, b.date))
}
