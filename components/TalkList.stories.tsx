import type { Meta, StoryObj } from '@storybook/nextjs'
import talks from '@/data/talksData'
import TalkList from './TalkList'

const meta: Meta<typeof TalkList> = {
  title: 'Components/TalkList',
  component: TalkList,
}

export default meta

type Story = StoryObj<typeof TalkList>

export const Default: Story = {
  args: {
    talks,
  },
}

export const Empty: Story = {}
