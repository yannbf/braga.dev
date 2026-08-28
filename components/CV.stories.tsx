import type { Meta, StoryObj } from '@storybook/nextjs'
import { expect } from 'storybook/test'
import CV from './CV'
import cvData from '@/data/cvData'

const meta: Meta<typeof CV> = {
  title: 'Components/CV',
  component: CV,
}

export default meta

type Story = StoryObj<typeof CV>

export const Default: Story = {
  args: {
    data: cvData,
  },
  decorators: [
    (StoryFn) => (
      <div className="max-w-3xl">
        <StoryFn />
      </div>
    ),
  ],
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText('Senior Software Engineer @ Chromatic — Storybook maintainer')
    ).toBeInTheDocument()
    await expect(canvas.getByText('Work Experience')).toBeInTheDocument()
  },
}
