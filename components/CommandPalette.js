import Icon from '@/components/icon'

import * as React from 'react'
import {
  KBarResults,
  KBarSearch,
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  useDeepMatches,
} from 'kbar'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'

const searchStyle = {
  padding: '12px 16px',
  fontSize: '16px',
  width: '100%',
  boxSizing: 'border-box',
  outline: 'none',
  border: 'none',
  background: 'var(--background)',
  color: 'var(--foreground)',
}

const groupNameStyle = {
  padding: '8px 16px',
  fontSize: '10px',
  textTransform: 'uppercase',
  opacity: 0.5,
  background: 'var(--background)',
}

const CommandPalette = ({ children, blogPosts }) => {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const { isMobile, setIsMobile } = React.useState()

  React.useEffect(() => {
    setIsMobile && setIsMobile(/Mobi/i.test(window.navigator.userAgent))
  }, [setIsMobile])

  const animatorStyle = {
    maxWidth: isMobile ? '300px' : '500px',
    width: '100%',
    marginRight: isMobile ? '32px' : '0px',
    background: theme === 'light' ? 'white' : 'black',
    borderRadius: '8px',
    boxShadow:
      theme === 'light'
        ? '0 30px 60px rgba(0, 0, 0, 0.12)'
        : '0px -1px 143px 31px rgba(250,240,240,0.2)',
  }

  const postsActions = React.useMemo(() => {
    const actions = blogPosts.reduce((acc, post) => {
      return [
        ...acc,
        {
          id: post.slug,
          name: post.title,
          keywords: post.tags.join(' '),
          perform: () => router.push(`/blog/${post.slug}`),
          subtitle: '',
          section: 'Blog posts',
          parent: 'searchBlogAction',
        },
      ]
    }, [])

    return actions
  }, [blogPosts, router])

  const navigationActions = [
    {
      id: 'homeAction',
      name: 'Home',
      shortcut: ['g', 'h'],
      keywords: 'back',
      section: 'Navigation',
      perform: () => router.push('/'),
      path: '/',
      icon: <Icon kind="github" />,
    },
    {
      id: 'talksAction',
      name: 'Talks',
      shortcut: ['g', 't'],
      keywords: 'talk',
      section: 'Navigation',
      perform: () => router.push('/talks'),
      path: '/talks',
      icon: <Icon kind="github" />,
    },
    {
      id: 'aboutAction',
      name: 'About me',
      shortcut: ['g', 'a'],
      keywords: 'yann about',
      section: 'Navigation',
      perform: () => router.push('/about'),
      path: '/about',
      icon: <Icon kind="github" />,
    },
  ]

  return (
    <KBarProvider
      actions={[
        {
          id: 'searchBlogAction',
          name: 'Search article…',
          keywords: 'find',
          section: '',
        },
        ...postsActions,
        ...navigationActions,
        {
          id: 'changeThemeAction',
          name: 'Change theme…',
          shortcut: [],
          keywords: 'interface color dark light theme',
          section: 'Preferences',
        },
        {
          id: 'connectTwitterAction',
          name: 'Twitter',
          keywords: 'twitter',
          section: 'Connect',
          perform: () => window.open('https://twitter.com/yannbf', '_blank'),
          icon: <Icon kind="twitter" />,
          subtitle: 'follow me on Twitter',
        },
        {
          id: 'connectGithubAction',
          name: 'Github',
          keywords: 'github',
          section: 'Connect',
          perform: () => window.open('https://github.com/yannbf', '_blank'),
          icon: <Icon kind="github" />,
          subtitle: 'check out my projects on Github',
        },
        {
          id: 'darkTheme',
          name: 'Dark',
          shortcut: [],
          keywords: 'dark',
          section: '',
          perform: () => setTheme('dark'),
          parent: 'changeThemeAction',
        },
        {
          id: 'lightTheme',
          name: 'Light',
          shortcut: [],
          keywords: 'light',
          section: '',
          perform: () => setTheme('light'),
          parent: 'changeThemeAction',
        },
      ]}
      options={{
        animations: {
          enterMs: 200,
          exitMs: 100,
        },
      }}
    >
      <KBarPortal>
        <KBarPositioner className="backdrop-blur-lg">
          <KBarAnimator style={animatorStyle}>
            <KBarSearch style={searchStyle} placeholder="Type a command or search…" />
            <RenderResults />
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>

      {children}
    </KBarProvider>
  )
}

function RenderResults() {
  const { results, rootActionId } = useDeepMatches()
  const router = useRouter()

  const filteredResults = results.reduce((acc, curr) => {
    const isCurrentPageNavItem =
      typeof curr === 'object' && curr.section === 'Navigation' && curr.path === router.pathname

    if (isCurrentPageNavItem) {
      return acc
    }

    return acc.concat(curr)
  }, [])

  return (
    <KBarResults
      items={filteredResults}
      onRender={({ item, active }) =>
        typeof item === 'string' ? (
          <div style={groupNameStyle}>{item}</div>
        ) : (
          <ResultItem action={item} active={active} currentRootActionId={rootActionId} />
        )
      }
    />
  )
}

// eslint-disable-next-line react/display-name
const ResultItem = React.forwardRef(({ action, active, currentRootActionId }, ref) => {
  const { theme } = useTheme()
  const isLight = theme === 'light'

  const ancestors = React.useMemo(() => {
    return (function collect(action, ancestors = []) {
      if (action.parent && action.parent.id !== currentRootActionId) {
        ancestors.push(action.parent)
        if (action.parent.parent) {
          collect(action.parent.parent, ancestors)
        }
      }
      return ancestors
    })(action)
  }, [action, currentRootActionId])

  return (
    <div
      key={action.name}
      ref={ref}
      style={{
        padding: '12px 16px',
        background: active ? (isLight ? '#EAEAEA' : '#2F2F2F') : 'transparent',
        borderLeft: `2px solid ${active ? (isLight ? 'black' : 'white') : 'transparent'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          fontSize: 14,
        }}
      >
        {action.icon && action.icon}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            {ancestors.length > 0 &&
              ancestors.map((ancestor) => (
                <React.Fragment key={ancestor.id}>
                  <span
                    style={{
                      opacity: 0.5,
                      marginRight: 8,
                    }}
                  >
                    {ancestor.name}
                  </span>
                  <span
                    style={{
                      marginRight: 8,
                    }}
                  >
                    &rsaquo;
                  </span>
                </React.Fragment>
              ))}
            <span>{action.name}</span>
          </div>
          {action.subtitle && <span style={{ fontSize: 12 }}>{action.subtitle}</span>}
        </div>
      </div>
      {action.shortcut?.length ? (
        <div aria-hidden style={{ display: 'grid', gridAutoFlow: 'column', gap: '4px' }}>
          {action.shortcut.map((sc) => (
            <kbd
              key={sc}
              style={{
                padding: '4px 8px',
                background: 'rgba(0 0 0 / .1)',
                borderRadius: '4px',
                fontSize: 14,
                textTransform: 'uppercase',
              }}
            >
              {sc}
            </kbd>
          ))}
        </div>
      ) : null}
    </div>
  )
})

export default CommandPalette
