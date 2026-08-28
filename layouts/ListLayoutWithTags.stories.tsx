import type { Meta, StoryObj } from '@storybook/nextjs'
import { expect, within } from 'storybook/test'
import ListLayoutWithTags from './ListLayoutWithTags'
import type { PostFrontMatter } from '@/lib/types'

const readingTime = { text: '3 min read', minutes: 3, time: 180000, words: 600 }

const posts: PostFrontMatter[] = [
  {
    slug: 'storybook-addons-showcase-1',
    fileName: 'storybook-addons-showcase-1.mdx',
    title: 'Storybook Addons Showcase',
    date: '2022-06-01',
    tags: ['storybook', 'tutorial'],
    summary: 'A tour of useful Storybook addons.',
    readingTime,
  },
  {
    slug: 'multi-theme-decorator',
    fileName: 'multi-theme-decorator.mdx',
    title: 'A multi-theme decorator for Storybook',
    date: '2022-03-14',
    tags: ['storybook', 'react'],
    summary: 'Building a decorator to preview every theme at once.',
    readingTime,
  },
]

const tagCounts = { storybook: 2, tutorial: 1, react: 1, recipe: 1 }

const meta: Meta<typeof ListLayoutWithTags> = {
  title: 'Layouts/ListLayoutWithTags',
  component: ListLayoutWithTags,
  args: {
    posts,
    title: 'All Posts',
    tagCounts,
  },
}

export default meta

type Story = StoryObj<typeof ListLayoutWithTags>

export const BlogIndex: Story = {
  parameters: {
    nextjs: {
      router: { pathname: '/blog', asPath: '/blog' },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // "All Posts" renders as plain text (not a link) on the blog index.
    await expect(canvas.getByText('All Posts')).toBeInTheDocument()
    await expect(canvas.queryByRole('link', { name: 'All Posts' })).not.toBeInTheDocument()

    // Every tag in the sidebar shows its post count.
    await expect(canvas.getByLabelText('View posts tagged storybook')).toHaveTextContent(
      'storybook (2)'
    )

    for (const post of posts) {
      await expect(canvas.getByText(post.title)).toBeInTheDocument()
    }
  },
}

export const TagPage: Story = {
  args: {
    posts: [posts[0]],
    title: 'Storybook',
  },
  parameters: {
    nextjs: {
      router: { pathname: '/tags/[tag]', asPath: '/tags/storybook' },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // The active tag renders as a highlighted heading, not a link.
    await expect(canvas.getByText('storybook (2)')).toBeInTheDocument()
    await expect(
      canvas.queryByRole('link', { name: 'View posts tagged storybook' })
    ).not.toBeInTheDocument()

    // "All Posts" links back to the blog index from a tag page.
    await expect(canvas.getByRole('link', { name: 'All Posts' })).toHaveAttribute('href', '/blog')
  },
}

export const WithPagination: Story = {
  args: {
    pagination: { currentPage: 1, totalPages: 3 },
  },
  parameters: {
    nextjs: {
      router: { pathname: '/blog', asPath: '/blog' },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText('1 of 3')).toBeInTheDocument()
    await expect(canvas.getByRole('link', { name: 'Next' })).toHaveAttribute('href', '/blog/page/2')
  },
}

export const Empty: Story = {
  args: {
    posts: [],
  },
  parameters: {
    nextjs: {
      router: { pathname: '/blog', asPath: '/blog' },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText('No posts found.')).toBeInTheDocument()
  },
}
