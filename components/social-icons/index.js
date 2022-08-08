import Github from './github.svg'
// import Youtube from './youtube.svg'
import Linkedin from './linkedin.svg'
import Twitter from './twitter.svg'

const components = {
  github: Github,
  // youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
}

const hoverColors = {
  github: 'blue',
  linkedin: 'blue',
  twitter: 'blue',
}

const SocialIcon = ({ kind, href, size = 8 }) => {
  if (!href || (kind === 'mail' && !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href)))
    return null

  const SocialSvg = components[kind]

  const iconColor = hoverColors[kind] || 'blue'

  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg
        className={`text-gray-700 hover:text-${iconColor}-500 dark:text-gray-200 dark:hover:text-${iconColor}-400 h-${size} w-${size}`}
      />
    </a>
  )
}

export default SocialIcon
