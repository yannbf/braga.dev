import Talk from './Talk'

export default {
  title: 'Components/Talk',
  component: Talk,
}

export const Default = {
  args: {
    title: 'Storybook and Testing',
    date: '01-04-2022',
    location: `React Live ⋅ Amsterdam, The Netherlands`,
    link: 'https://www.youtube.com/watch?v=mbrQYL8FHWM',
    thumbnail: 'storybook-testing-react-live.webp',
    tags: ['testing', 'storybook'],
  },
  decorators: [
    (StoryFn) => (
      <div className="w-96">
        <StoryFn />
      </div>
    ),
  ],
}
