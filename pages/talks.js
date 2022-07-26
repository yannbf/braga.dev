import siteMetadata from '@/data/siteMetadata'
import talksData from '@/data/talksData'
import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import formatDate from '../lib/utils/formatDate'

export default function Projects() {
  return (
    <>
      <PageSEO title={`Talks - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Talks
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">Some of my talks</p>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            <ul>
              {talksData.map((d) => (
                <li key={d.title} className="py-4">
                  <article className="space-y-2 space-x-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Given on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={d.date}>{formatDate(d.date)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-3 xl:col-span-3">
                      <div>
                        <h3 className="text-2xl font-bold leading-8 tracking-tight">
                          <Link href={d.link} className="text-gray-900 dark:text-gray-100">
                            {d.title}
                          </Link>
                        </h3>
                        {/* <div className="flex flex-wrap">
                          {tags.map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div> */}
                      </div>
                      <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                        {d.description}
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
