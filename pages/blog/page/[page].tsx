import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { getAllTags } from '@/lib/tags'
import ListLayoutWithTags from '@/layouts/ListLayoutWithTags'
import { POSTS_PER_PAGE } from '../../blog'
import type { InferGetStaticPropsType } from 'next'

export async function getStaticPaths() {
  const totalPosts = await getAllFilesFrontMatter('blog')
  const totalPages = Math.ceil(totalPosts.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }: { params: { page: string } }) {
  const { page } = params
  const posts = await getAllFilesFrontMatter('blog')
  const tagCounts = await getAllTags('blog')
  const pageNumber = parseInt(page)
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return {
    props: {
      posts,
      initialDisplayPosts,
      pagination,
      tagCounts,
    },
  }
}

export default function PostPage({
  posts,
  initialDisplayPosts,
  pagination,
  tagCounts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
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
