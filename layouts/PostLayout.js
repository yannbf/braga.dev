import ProgressBar from 'react-scroll-progress-bar'

import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import { BlogSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import Comments from '@/components/comments'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import TableOfContents from '../components/TableOfContents'

const editUrl = (fileName) => `${siteMetadata.siteRepo}/blob/main/data/blog/${fileName}`
const discussUrl = (slug) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `${siteMetadata.siteUrl}/blog/${slug}`
  )}`

const postDateTemplate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

export default function PostLayout({
  frontMatter,
  toc,
  authorDetails,
  next,
  prev,
  columnLayout = false,
  stickyLayout = true,
  children,
}) {
  const { slug, fileName, date, title, images, tags, readingTime, readTime } = frontMatter
  const readingTimeText = readTime ? `${readTime} min read` : readingTime.text
  const { theme, resolvedTheme } = useTheme()
  const router = useRouter()

  const progressBarColor = useMemo(() => {
    if (theme === 'dark' || resolvedTheme === 'dark') {
      return '#14b8a6'
    }
    return '#fe3d7a'
  }, [theme, resolvedTheme])

  const sticky = router.query.sticky ? router.query.sticky === 'true' : stickyLayout
  const columns = router.query.columns ? router.query.columns === 'true' : columnLayout || sticky

  const stickyStyles = {
    top: 0,
    position: 'sticky',
    maxHeight: 'calc(100vh - 28px)',
    overflow: 'auto',
    paddingBottom: 16,
    marginLeft: 'auto',
    marginTop: 4,
    marginRight: -70,
  }

  return (
    <SectionContainer>
      <div style={{ position: 'absolute', top: 0, left: 0 }}>
        <ProgressBar bgcolor={progressBarColor} height="1px" />
      </div>
      <BlogSEO
        url={`${siteMetadata.siteUrl}/blog/${slug}`}
        authorDetails={authorDetails}
        {...frontMatter}
      />
      <ScrollTopAndComment />
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header>
            <div className="space-y-2 border-b border-gray-200 pb-3 text-center dark:border-gray-700">
              <dl>
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
              <div className="pt-2 pb-1">
                {'⏳'}
                <span>{readingTimeText}</span>
              </div>
            </div>
          </header>
          <div
            className={`divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:divide-y-0 ${
              columns ? 'xl:grid xl:grid-cols-4 xl:gap-x-6' : ''
            }`}
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pt-10 pb-8 dark:prose-dark">{children}</div>
              <div className="pt-6 pb-6 text-sm text-gray-700 dark:text-gray-300">
                <Link href={discussUrl(slug)} rel="nofollow">
                  {'Discuss on Twitter'}
                </Link>
                {` • `}
                <Link href={editUrl(fileName)}>{'View on GitHub'}</Link>
              </div>
              <Comments frontMatter={frontMatter} />
            </div>
            <footer style={sticky ? stickyStyles : {}} className="md:pl-6">
              {sticky && (
                <div className="hidden divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:block">
                  <TableOfContents toc={toc} />
                </div>
              )}
              <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700">
                {tags && (
                  <div className="py-4 xl:py-8">
                    <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Tags
                    </h2>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                    {prev && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Previous Article
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/blog/${prev.slug}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Next Article
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/blog/${next.slug}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="pt-4 xl:pt-8">
                <Link
                  href="/blog"
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  &larr; Back to the blog
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
