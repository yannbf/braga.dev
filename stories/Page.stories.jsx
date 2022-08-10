import { within, userEvent } from '@storybook/testing-library'

import { Page } from './Page'

export default {
  title: 'Example/Page',
  component: Page,
  parameters: {
    layout: 'fullscreen',
  },
}

export const Default = {}
export const DefaultRTL = {
  parameters: {
    textDirection: 'rtl',
  },
}

export const LoggedIn = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const loginButton = await canvas.getByRole('button', { name: /Log in/i })
    await userEvent.click(loginButton)
  },
}
