import Link from '@/components/Link'
import Image from '@/components/Image'
import formatDate from '@/lib/utils/formatDate'
import type { Talk as TalkType } from '@/data/talksData'

// Talk dates are stored as MM-DD-YYYY, which Date.parse does not handle reliably
const parseTalkDate = (date: string) => {
  const [month, day, year] = date.split('-').map(Number)
  return new Date(year, month - 1, day)
}

const Talk = ({ link, thumbnail, title, tags, location, date }: TalkType) => {
  let thumbnailEl = (
    <Image
      alt="illustration"
      className="w-full object-cover object-center md:h-36 lg:h-48"
      src={`/static/images/talks/${thumbnail}`}
      width={640}
      height={400}
    />
  )

  return (
    <Link href={link} title={title} className="hover-scale">
      <div className="border-1 h-full overflow-hidden rounded-2xl border-gray-200 border-opacity-20 bg-white shadow-lg shadow-gray-400/20 dark:bg-[#303030] dark:shadow-gray-800/20">
        {thumbnailEl}

        <div className="p-4">
          <div className="title-font mb-1 text-xs font-bold uppercase tracking-widest text-primary-400">
            {tags.map((t) => '#' + t).join(' ')}
          </div>
          <h2 className="title-font mb-3 text-xl font-medium text-gray-900 dark:text-gray-100">
            {title}
          </h2>
          <div className="flex flex-wrap items-center ">
            <div className="text-gray-500  md:mb-2 lg:mb-0">
              <p className="inline-flex items-center dark:text-gray-400">{location}</p>
            </div>
          </div>
          <time
            dateTime={date.replace(/^(\d{2})-(\d{2})-(\d{4})$/, '$3-$1-$2')}
            className="text-sm text-gray-400 dark:text-gray-500"
            suppressHydrationWarning
          >
            {formatDate(parseTalkDate(date))}
          </time>
        </div>
      </div>
    </Link>
  )
}

export default Talk
