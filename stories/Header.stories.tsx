import type { Meta, StoryObj } from '@storybook/nextjs'
import { Header } from './Header'

const meta: Meta<typeof Header> = {
  title: 'Example/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj<typeof Header>

export const LoggedIn: Story = {
  args: {
    user: {
      name: 'Jane Doe',
    },
  },
}

export const LoggedOut: Story = {}
