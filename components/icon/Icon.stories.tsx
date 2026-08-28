import type { Meta, StoryObj } from '@storybook/nextjs'
import { expect } from 'storybook/test'
import Icon from './index'

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
}

export default meta

type Story = StoryObj<typeof Icon>

export const AllKinds: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon kind="github" href="https://github.com/yannbf" size="6" />
      <Icon kind="linkedin" href="https://www.linkedin.com/in/yannbraga/" size="6" />
      <Icon kind="twitter" href="https://twitter.com/yannbf" size="6" />
      <Icon kind="bluesky" href="https://bsky.app/profile/yannbf" size="6" animated={false} />
      <Icon kind="website" href="https://yannbraga.dev" size="6" animated={false} />
    </div>
  ),
  play: async ({ canvas }) => {
    const bluesky = canvas.getByRole('link', { name: 'bluesky' })
    await expect(bluesky).toHaveAttribute('href', 'https://bsky.app/profile/yannbf')
    const svg = bluesky.querySelector('svg')
    await expect(svg).not.toBeNull()
    // Static icons size via inline style; Tailwind cannot generate h-${size} at runtime
    await expect(svg).toHaveStyle({ width: '24px', height: '24px' })
  },
}
