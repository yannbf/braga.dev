import { within, userEvent } from '@storybook/testing-library'

import { Page } from './Page'

export default {
  title: 'Example/Page',
  component: Page,
  parameters: {
    layout: 'fullscreen',
    // rtl: true,
  },
}

export const Default = {}
export const DefaultRTL = {
  parameters: {
    rtl: true,
  },
}

export const LoggedIn = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const loginButton = await canvas.getByRole('button', { name: /Log in/i })
    await userEvent.click(loginButton)
  },
}
