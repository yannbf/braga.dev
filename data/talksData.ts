export interface Talk {
  title: string
  date: string
  location: string
  link: string
  thumbnail: string
  tags: string[]
}

const talksData: Talk[] = [
  {
    title: `Storybook's Vitest Integration`,
    date: '10-28-2025',
    location: `ViteConf ⋅ Online`,
    link: 'https://www.youtube.com/watch?v=YNQ_cJ6yy2Q',
    thumbnail: 'viteconf-2025-vitest.webp',
    tags: ['testing'],
  },
  {
    title: 'Component Testing with Storybook and Vitest',
    date: '10-09-2024',
    location: `ViteConf ⋅ Online`,
    link: 'https://www.youtube.com/watch?v=8t5wxrFpCQY',
    thumbnail: 'viteconf-2024-component-testing.webp',
    tags: ['testing'],
  },
  {
    title: 'Maintaining Storybook',
    date: '08-11-2023',
    location: `React Round Up ⋅ Podcast`,
    link: 'https://www.youtube.com/watch?v=wBozVPaggEA',
    thumbnail: 'react-round-up-maintaining-storybook.webp',
    tags: ['testing'],
  },
  {
    title: 'State of Storybook 7',
    date: '08-02-2023',
    location: `JS World ⋅ Amsterdam, The Netherlands`,
    link: '',
    thumbnail: 'state-of-sb-7.webp',
    tags: ['testing'],
  },
  {
    title: 'Testing Components in Storybook 7',
    date: '03-27-2023',
    location: `Storybook Day ⋅ Online`,
    link: 'https://www.youtube.com/watch?v=T9uKKbWYdfU',
    thumbnail: 'storybook-day-2023.webp',
    tags: ['testing'],
  },
  {
    title: 'Live Coding - Storybook 7 Launch',
    date: '03-15-2023',
    location: `Nx ⋅ Online`,
    link: 'https://www.youtube.com/watch?v=9_chJoS-DRw',
    thumbnail: 'nx-live-coding-storybook-7.webp',
    tags: ['testing'],
  },
  {
    title: 'Why You Should Test UIs With Storybook',
    date: '10-05-2022',
    location: `Frontmania ⋅ Utrecht, The Netherlands`,
    link: 'https://www.youtube.com/watch?v=KR_N494HyW4',
    thumbnail: 'frontmania-2022-test-uis.webp',
    tags: ['testing'],
  },
  {
    title: 'Storybook and Testing',
    date: '01-04-2022',
    location: `React Live ⋅ Amsterdam, The Netherlands`,
    link: 'https://www.youtube.com/watch?v=mbrQYL8FHWM',
    thumbnail: 'storybook-testing-react-live.webp',
    tags: ['testing'],
  },
  {
    title: 'Interactive Stories Beta',
    date: '11-25-2021',
    location: `Angular Nation ⋅ Online`,
    link: 'https://www.youtube.com/watch?v=mbrQYL8FHWM',
    thumbnail: 'interactive-stories-angular-nation.webp',
    tags: ['testing'],
  },
  {
    title: 'New Zeplin Storybook integration',
    date: '11-15-2021',
    location: `Zeplin ⋅ Online`,
    link: 'https://www.youtube.com/watch?v=YGQSvf2yNQ8',
    thumbnail: 'storybook-zeplin.webp',
    tags: ['design'],
  },
  {
    title: 'Smooth design handoff with Storybook',
    date: '03-05-2021',
    location: `iO technology ⋅ Online`,
    link: 'https://www.youtube.com/watch?v=2LBBrIulDe0',
    thumbnail: 'smooth-handoff-io.webp',
    tags: ['design'],
  },
  {
    title: 'Monorepo: uma história de sucesso (Portuguese)',
    date: '07-09-2020',
    location: `BrazilJS ⋅ Online`,
    link: 'https://www.youtube.com/watch?v=2lvPT4VyfqE',
    thumbnail: 'monorepos-braziljs.webp',
    tags: ['architecture'],
  },
]

export default talksData
