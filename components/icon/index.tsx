import { useEffect, useRef, useState, type FC, type HTMLAttributes, type SVGProps } from 'react'
import Lottie, { type LottieRefCurrentProps } from 'lottie-react'
import Github from './github.svg'
// import Youtube from './youtube.svg'
import Linkedin from './linkedin.svg'
import Twitter from './twitter.svg'
import Bluesky from './bluesky.svg'
import External from './external.svg'

const components: Record<string, FC<SVGProps<SVGSVGElement>>> = {
  github: Github,
  // youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
  bluesky: Bluesky,
  website: External,
}

const hoverColors: Record<string, string> = {
  github: 'primary',
  linkedin: 'primary',
  twitter: 'primary',
  bluesky: 'primary',
  website: 'primary',
}

// Only these kinds ship a Lottie animation under ./animations — importing a
// nonexistent one rejects at runtime, so the effect below skips the rest.
const animatedKinds = new Set(['github', 'linkedin', 'twitter'])

interface IconProps {
  kind: string
  href?: string
  size?: number | string
  animated?: boolean
}

const Icon = ({ kind, href, size = 8, animated = true }: IconProps) => {
  const [animationData, setAnimationData] = useState()
  const lottieRef = useRef<LottieRefCurrentProps>(null)

  useEffect(() => {
    if (!animatedKinds.has(kind)) return
    // Lazy load animations for better performance
    import(`./animations/${kind}.json`).then(setAnimationData)
  }, [kind])

  if (!href || (kind === 'mail' && !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href)))
    return null

  const SocialSvg = components[kind]

  const iconColor = hoverColors[kind] || 'blue'

  const Wrapper = ({ href, ...rest }: HTMLAttributes<HTMLElement> & { href?: string }) => {
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
