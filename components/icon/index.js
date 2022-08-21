import { useEffect, useRef, useState } from 'react'
import Lottie from 'lottie-react'
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
  github: 'primary',
  linkedin: 'primary',
  twitter: 'primary',
}

const Icon = ({ kind, href, size = 8, animated = true }) => {
  const [animationData, setAnimationData] = useState()
  const lottieRef = useRef()

  useEffect(() => {
    // Lazy load animations for better performance
    import(`./animations/${kind}.json`).then(setAnimationData)
  }, [kind])

  if (!href || (kind === 'mail' && !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href)))
    return null

  const SocialSvg = components[kind]

  const iconColor = hoverColors[kind] || 'blue'

  const Wrapper = ({ href, ...rest }) => {
    return href ? (
      <a target="_blank" rel="noopener noreferrer" href={href} {...rest} />
    ) : (
      <div {...rest} />
    )
  }

  return (
    <Wrapper
      href={href}
      className="text-sm text-gray-500 transition hover:text-blue-600"
      onMouseEnter={() => lottieRef.current?.play()}
      onMouseLeave={() => lottieRef.current?.stop()}
    >
      <span className="sr-only">{kind}</span>
      {animated ? (
        <Lottie
          lottieRef={lottieRef}
          className={`currentColor text-gray-700 hover:text-${iconColor}-500 dark:text-gray-200 dark:hover:text-${iconColor}-400`}
          animationData={animationData}
          loop={false}
          autoplay={false}
          width={32}
          height={32}
        />
      ) : (
        <SocialSvg
          className={`text-gray-700 hover:text-${iconColor}-500 dark:text-gray-200 dark:hover:text-${iconColor}-400 h-${size} w-${size}`}
        />
      )}
    </Wrapper>
  )
}

export default Icon
