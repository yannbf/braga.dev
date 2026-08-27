import Talk from './Talk'
import type { Talk as TalkType } from '@/data/talksData'

interface TalkListProps {
  talks?: TalkType[]
}

const TalkList = ({ talks }: TalkListProps) => {
  if (!talks || !talks.length) {
    return <div>No talks have been found. Please revisit this later!</div>
  }

  return (
    <ul className="-m-4 flex flex-wrap">
      {Object.values(talks).map((talk) => (
        <li key={talk.title} className="w-full p-4 md:w-1/3">
          <Talk {...talk} />
        </li>
      ))}
    </ul>
  )
}

export default TalkList
