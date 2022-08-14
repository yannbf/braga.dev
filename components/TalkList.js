import Talk from './Talk'

const TalkList = ({ talks }) => {
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
