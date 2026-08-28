import { useRouter } from 'next/router'
import Link from '@/components/Link'
import Article from '@/components/Article'
import Pagination from '@/components/Pagination'
import kebabCase from '@/lib/utils/kebabCase'
import type { PostFrontMatter } from '@/lib/types'

interface PaginationInfo {
  currentPage: number
  totalPages: number
}

interface ListLayoutWithTagsProps {
  posts: PostFrontMatter[]
  title: string
  tagCounts: Record<string, number>
  initialDisplayPosts?: PostFrontMatter[]
  pagination?: PaginationInfo
}

export default function ListLayoutWithTags({
  posts,
  title,
  tagCounts,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutWithTagsProps) {
  const router = useRouter()
  const sortedTags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a])
  const activeTag = router.asPath.split('/tags/')[1]?.split(/[?#]/)[0]

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <>
      <div>
        <div className="pb-6 pt-6">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
        </div>
        <div className="flex sm:space-x-24">
          <div className="hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded bg-gray-50 pt-5 shadow-md dark:bg-gray-900/70 dark:shadow-gray-800/40 sm:flex">
            <div className="px-6 py-4">
              {router.pathname.startsWith('/blog') ? (
                <h3 className="font-bold uppercase text-primary-500">All Posts</h3>
              ) : (
                <Link
                  href="/blog"
                  className="font-bold uppercase text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                >
                  All Posts
                </Link>
              )}
              <ul>
                {sortedTags.map((tag) => {
                  const tagSlug = kebabCase(tag)
                  const isActive = activeTag === tagSlug
                  return (
                    <li key={tag} className="my-3">
                      {isActive ? (
                        <h3 className="inline px-3 py-2 text-sm font-bold uppercase text-primary-500">
                          {`${tag} (${tagCounts[tag]})`}
                        </h3>
                      ) : (
                        <Link
                          href={`/tags/${tagSlug}`}
                          className="px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                          aria-label={`View posts tagged ${tag}`}
                        >
                          {`${tag} (${tagCounts[tag]})`}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <ul>
              {!displayPosts.length && <li className="py-4">No posts found.</li>}
              {displayPosts.map((frontMatter) => (
                <li key={frontMatter.slug} className="py-5">
                  <Article {...frontMatter} />
                </li>
              ))}
            </ul>
            {pagination && pagination.totalPages > 1 && (
              <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
