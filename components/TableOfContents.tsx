import { useActiveId, type ActiveIdItem } from '@/lib/react-utils/useActiveId'
import type { TocHeading } from '@/lib/remark-toc-headings'

const getParentId = (currentItem: TocHeading, previousItem: ActiveIdItem): string | undefined => {
  if (!currentItem || !previousItem) {
    return undefined
  }

  if (currentItem.depth > previousItem.depth) {
    return previousItem.id
  }

  if (currentItem.depth === previousItem.depth && previousItem.parentId) {
    return previousItem.parentId
  }

  return undefined
}

const getIds = (items: TocHeading[]): ActiveIdItem[] => {
  return items.reduce<ActiveIdItem[]>((acc, item, index) => {
    const previousItem = index > 0 ? acc[index - 1] : undefined
    const parentId = previousItem ? getParentId(item, previousItem) : undefined
    const itemId = item.url.slice(1)
    // url has a # as first character, remove it to get the raw CSS-id
    acc.push({ id: itemId, parentId, depth: item.depth })
    return acc
  }, [])
}

interface TableOfContentsProps {
  toc: TocHeading[]
  indentDepth?: number
  fromHeading?: number
  toHeading?: number
  asDisclosure?: boolean
  exclude?: string | string[]
  inline?: boolean
}

/**
 * Generates an inline table of contents.
 * Exclude titles matching this string (new RegExp('^(' + string + ')$', 'i')).
 * If an array is passed the array gets joined with a pipe (new RegExp('^(' + array.join('|') + ')$', 'i')).
 */
const TableOfContents = ({
  toc,
  indentDepth = 3,
  fromHeading = 1,
  toHeading = 6,
  asDisclosure = false,
  exclude = '',
  inline = false,
}: TableOfContentsProps) => {
  const idList = getIds(toc)
  const activeId = useActiveId(idList)
  const re = Array.isArray(exclude)
    ? new RegExp('^(' + exclude.join('|') + ')$', 'i')
    : new RegExp('^(' + exclude + ')$', 'i')

  const filteredToc = toc.filter(
    (heading) =>
      heading.depth >= fromHeading && heading.depth <= toHeading && !re.test(heading.value)
  )

  const tocList = (
    <ul>
      {filteredToc.map((heading) => {
        const { value, depth, url } = heading
        const headingId = url.slice(1)
        const shouldHighlight = activeId?.id === headingId || activeId?.parentId === headingId

        const defaultColors = `text-primary-500 hover:text-primary-600 dark:hover:text-primary-400`
        const activeColors = `text-white`
        return (
          <li
            key={value}
            className={`mt-2 text-sm font-medium ${
              shouldHighlight ? activeColors : defaultColors
            } ${depth >= indentDepth && 'ml-6'}`}
          >
            <a href={url} className="flex items-center">
              {depth >= indentDepth && (
                <svg width="3" height="24" viewBox="0 -9 3 24" className="mr-2 overflow-visible">
                  <path
                    d="M0 0L3 3L0 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></path>
                </svg>
              )}
              {value}
            </a>
          </li>
        )
      })}
    </ul>
  )

  if (inline) {
    return (
      <>
        {asDisclosure ? (
          <details open>
            <summary className="ml-6 pb-2 pt-2 text-xl font-bold">Table of Contents</summary>
            <div className="ml-6">{tocList}</div>
          </details>
        ) : (
          tocList
        )}
      </>
    )
  }

  return (
    <aside>
      <nav>
        <h2 className="pb-2 pt-10 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
          Table of contents
        </h2>
        {tocList}
      </nav>
    </aside>
  )
}

export default TableOfContents
