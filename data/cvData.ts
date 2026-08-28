export interface CVLink {
  kind: 'github' | 'linkedin' | 'bluesky' | 'website'
  label: string
  href: string
}

export interface CVExperienceEntry {
  company: string
  role: string
  start: string
  end: string
  location: string
  intro?: string
  bullets?: string[]
  techLine?: string
}

export interface CVOpenSourceEntry {
  name: string
  role: string
  description: string
  href: string
}

export interface CVEducationEntry {
  institution: string
  // TODO(yann): confirm degree + years
  degree?: string
}

export interface CVData {
  name: string
  role: string
  location: string
  avatar: string
  links: CVLink[]
  summary: string
  experience: CVExperienceEntry[]
  openSource: CVOpenSourceEntry[]
  skills: string[]
  education: CVEducationEntry[]
}

const cvData: CVData = {
  name: 'Yann Braga',
  role: 'Senior Software Engineer @ Chromatic — Storybook maintainer',
  location: 'Amsterdam, The Netherlands',
  avatar: '/static/images/avatar.png',
  links: [
    { kind: 'github', label: 'yannbf', href: 'https://github.com/yannbf' },
    { kind: 'linkedin', label: 'yannbraga', href: 'https://www.linkedin.com/in/yannbraga/' },
    { kind: 'bluesky', label: 'yannbf', href: 'https://bsky.app/profile/yannbf' },
    { kind: 'website', label: 'yannbraga.dev', href: 'https://yannbraga.dev' },
  ],
  summary:
    'Software engineer since 2013, working across mobile, backend, and frontend before going all-in on open source. Since 2021 I maintain Storybook at Chromatic — focusing on testing, developer experience, and AI-assisted workflows — and I love sharing what I learn with the community through talks, docs, and courses.',
  experience: [
    {
      company: 'Chromatic',
      role: 'Senior Software Engineer · Storybook maintainer',
      start: 'Oct 2021',
      end: 'today',
      location: 'Remote',
      intro:
        'Maintainer of Storybook, the open source UI development workshop used by millions of developers.',
      bullets: [
        'Maintain framework support for React, Angular, Svelte, Vue, and Next.js across their latest releases',
        "Build the Storybook CLI's automigrations and codemods for seamless version upgrades",
        'Maintain the Storybook Test Runner, Vitest plugin, and addons such as MSW, Coverage, and design integrations',
        'Maintain eslint-plugin-storybook, enforcing best practices via AST-based lint rules',
        'Build AI workflows in and around Storybook: MCP servers and skills that help coding agents build UI, plus agentic triage in the Storybook repo',
        'Support the community on Discord and GitHub; write docs and blog posts; speak at global events',
      ],
    },
    {
      company: 'bol.com',
      role: 'Software Engineer',
      start: 'Apr 2021',
      end: 'Oct 2021',
      location: 'Utrecht, The Netherlands',
      intro:
        'Worked on the checkout experience of the largest e-commerce platform in the Netherlands.',
      techLine: 'Java · React · TypeScript · Redux · Jest · Cypress · Storybook · SSR',
    },
    {
      company: 'Frontmen',
      role: 'Senior Frontend Engineer',
      start: 'Feb 2018',
      end: 'Apr 2021',
      location: 'The Randstad, The Netherlands',
      intro: 'Frontend consultancy across long-running client engagements:',
      bullets: [
        'Eneco (2020–2021): hybrid app for smart devices and energy insights — React, Redux, Cordova, Cypress, Storybook',
        'Luggage Care (2020): web application for luggage repair services at Schiphol — React, Redux-Saga, Testing Library',
        "Rabobank (2018–2020): platform team building core tooling for the bank's new app and web platform — Angular, Ionic, RxJS, TypeScript",
        'LeasePlan (2018): global web application — React, SSR, TypeScript, Storybook',
      ],
    },
    {
      company: 'iFactory Solutions',
      role: 'Mobile Solutions Developer',
      start: 'Nov 2016',
      end: 'Dec 2017',
      location: 'Fortaleza, Brazil',
      intro:
        "Native iOS/Android and hybrid apps for clients including Easynvest (one of Brazil's largest home brokers), the DeVry education group (7 apps), and Porto Seguro (largest insurer in Latin America). Swift, Java, Ionic, Angular.",
    },
    {
      company: 'Deway',
      role: 'Mobile Developer',
      start: 'Feb 2016',
      end: 'Jul 2016',
      location: 'Fortaleza, Brazil',
      intro: 'Native and hybrid mobile apps; backend deployments with Python and Django.',
    },
  ],
  openSource: [
    {
      name: 'Storybook',
      role: 'Core maintainer',
      description: 'Day-to-day maintenance of the core repo and its ecosystem',
      href: 'https://github.com/storybookjs/storybook',
    },
    {
      name: 'Storybook MCP',
      role: 'Maintainer',
      description:
        'Model Context Protocol integration that gives coding agents grounded component context',
      href: 'https://github.com/storybookjs/mcp',
    },
    {
      name: 'eslint-plugin-storybook',
      role: 'Author/maintainer',
      description: '',
      href: 'https://github.com/storybookjs/eslint-plugin-storybook',
    },
    {
      name: 'Storybook Test Runner',
      role: 'Maintainer',
      description: '',
      href: 'https://github.com/storybookjs/test-runner',
    },
    {
      name: 'msw-storybook-addon',
      role: 'Maintainer',
      description: '',
      href: 'https://github.com/mswjs/msw-storybook-addon',
    },
    {
      name: 'MealDrop',
      role: 'Author',
      description:
        "Real-world app for teaching Storybook best practices; companion to the 'Storybook for React Apps' video course on newline",
      href: 'https://github.com/yannbf/mealdrop',
    },
  ],
  skills: [
    'TypeScript',
    'React',
    'Vue',
    'Angular',
    'Svelte',
    'Next.js',
    'Node.js',
    'Storybook',
    'Vitest',
    'Playwright',
    'Cypress',
    'Testing Library',
    'MCP / AI tooling',
  ],
  education: [
    {
      institution: 'Universidade de Fortaleza',
    },
  ],
}

export default cvData
