import type { StorybookConfig } from '@storybook/nextjs'

const config = {
  stories: [
    {
      directory: '../components',
    },
    {
      directory: '../layouts',
    },
  ],
  staticDirs: ['../public'],
  addons: ['@storybook/addon-links', '@storybook/addon-docs', '@storybook/addon-mcp'],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    docsPage: false,
  },
}

export default config as StorybookConfig
