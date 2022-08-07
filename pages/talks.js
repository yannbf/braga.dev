import siteMetadata from '@/data/siteMetadata'
import talksData from '@/data/talksData'
import { PageSEO } from '@/components/SEO'
import Talk from '@/components/Talk'

export default function Projects() {
  return (
    <>
      <PageSEO title={`Talks - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Talks
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Some events I've spread the word around
          </p>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            <ul>
              {talksData.map((talk) => (
                <li key={talk.title} className="py-4">
                  <Talk {...talk} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
