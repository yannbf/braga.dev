import type { StorybookConfig } from '@storybook/nextjs'

const config = {
  stories: [
    {
      directory: '../components',
    },
  ],
  staticDirs: ['../public'],
  addons: ['@storybook/addon-links', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    docsPage: false,
  },
}

export default config as StorybookConfig
