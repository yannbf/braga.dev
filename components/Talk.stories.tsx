import type { Meta, StoryObj } from '@storybook/nextjs'
import Talk from './Talk'

const meta: Meta<typeof Talk> = {
  title: 'Components/Talk',
  component: Talk,
}

export default meta

type Story = StoryObj<typeof Talk>

export const Default: Story = {
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
