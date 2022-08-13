import Link from '@/components/Link'
import Image from '@/components/Image'
import formatDate from '@/lib/utils/formatDate'

const Talk = ({ link, thumbnail, date, title, tags, location }) => {
  let thumbnailEl = (
    <Link href={link} title={title} className="w-full xl:w-auto">
      <Image
        alt="illustration"
        className="rounded object-cover"
        src={`/static/images/talks/${thumbnail}`}
        layout="responsive"
        width={640}
        height={400}
      />
    </Link>
  )

  return (
    <article className="hover-scale">
      <div className="grid gap-2 space-y-2 xl:grid-flow-col xl:grid-cols-4 xl:grid-rows-2 xl:gap-4 xl:space-y-0">
        {thumbnail && <div className="xl:row-span-2">{thumbnailEl}</div>}
        <div className="order-first space-y-6 xl:order-none xl:col-span-2">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold leading-8 tracking-tight">
                <Link href={link} className="text-gray-900 dark:text-gray-100">
                  {title}
                </Link>
              </h2>
            </div>
          </div>
        </div>
        <div className="space-y-5 xl:col-span-3">
          <dl>
            <dt className="sr-only">Given on</dt>
            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
              <time dateTime={date}>
                {formatDate(date)} ⋅ {location}
              </time>
            </dd>
          </dl>
          {tags && (
            <div className="xl:col-span-2 xl:row-span-1">
              <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                {tags.map((t) => '#' + t).join(' ')}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export default Talk
