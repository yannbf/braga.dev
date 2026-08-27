import type { Meta, StoryObj } from '@storybook/nextjs'
import { within, userEvent } from 'storybook/test'

import { Page } from './Page'

const meta: Meta<typeof Page> = {
  title: 'Example/Page',
  component: Page,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj<typeof Page>

export const Default: Story = {}
export const DefaultRTL: Story = {
  parameters: {
    textDirection: 'rtl',
  },
}

export const LoggedIn: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const loginButton = await canvas.getByRole('button', { name: /Log in/i })
    await userEvent.click(loginButton)
  },
}
