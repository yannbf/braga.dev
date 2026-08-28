/* eslint-disable react/display-name */
import { useMemo, type ComponentType } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import { CH } from '@code-hike/mdx/components'
import Image from './Image'
import CustomLink from './Link'
import TableOfContents from './TableOfContents'
import Pre from './Pre'
import TableWrapper from './TableWrapper'
import { BlogNewsletterForm } from './NewsletterForm'
import PostLayout from '@/layouts/PostLayout'
import PostSimple from '@/layouts/PostSimple'
import AuthorLayout from '@/layouts/AuthorLayout'
import type { ImageProps } from 'next/image'

// The layouts an MDX file's `layout:` frontmatter can select. Kept as a
// static map (rather than `require(`../layouts/${layout}`)`) so webpack can
// tell which layout files a page actually uses — a template-string require
// pulls in every file under layouts/, story files included.
const mdxLayouts: Record<string, ComponentType<any>> = {
  PostLayout,
  PostSimple,
  AuthorLayout,
}

// `CH` (from @code-hike/mdx) is a namespace of sub-components, not a single
// component, so this map doesn't fit the MDXComponents type MDX packages
// expect (one component per tag name) — left loosely typed.
export const MDXComponents: Record<string, any> = {
  CH,
  // eslint-disable-next-line jsx-a11y/alt-text
  Image: (props: ImageProps) => <Image placeholder="blur" {...props} />,
  TableOfContents,
  a: CustomLink,
  pre: Pre,
  table: TableWrapper,
  BlogNewsletterForm: BlogNewsletterForm,
  wrapper: ({ components, layout, ...rest }: { components?: unknown; layout: string }) => {
    const Layout = mdxLayouts[layout] ?? PostLayout
    return <Layout {...rest} />
  },
}

interface MDXLayoutRendererProps {
  layout: string
  mdxSource: string
  [key: string]: unknown
}

export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }: MDXLayoutRendererProps) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])

  return <MDXLayout layout={layout} components={MDXComponents} {...rest} />
}
