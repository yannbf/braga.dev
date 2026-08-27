export interface HeaderNavLink {
  href: string
  title: string
}

const headerNavLinks: HeaderNavLink[] = [
  { href: '/blog', title: 'Blog' },
  { href: '/talks', title: 'Talks' },
  // { href: '/projects', title: 'Projects' },
  { href: '/about', title: 'About' },
]

export default headerNavLinks
