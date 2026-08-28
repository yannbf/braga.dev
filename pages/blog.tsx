import { getAllFilesFrontMatter } from '@/lib/mdx'
import { getAllTags } from '@/lib/tags'
import siteMetadata from '@/data/siteMetadata'
import ListLayoutWithTags from '@/layouts/ListLayoutWithTags'
import { PageSEO } from '@/components/SEO'
import type { InferGetStaticPropsType } from 'next'

export const POSTS_PER_PAGE = 5

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')
  const tagCounts = await getAllTags('blog')
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return { props: { initialDisplayPosts, posts, pagination, tagCounts } }
}

export default function Blog({
  posts,
  initialDisplayPosts,
  pagination,
  tagCounts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />
      <ListLayoutWithTags
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        tagCounts={tagCounts}
        title="All Posts"
      />
    </>
  )
}
