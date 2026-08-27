import { addons } from 'storybook/manager-api'
import { create } from 'storybook/theming'

const theme = create({
  base: 'light',
})

addons.setConfig({
  theme,
  showPanel: false, // show addons panel by default
  panelPosition: 'right', // position addons panel on the right by default
})
