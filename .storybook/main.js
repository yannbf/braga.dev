module.exports = {
  stories: [
    // Only show demo stories in published storybook
    {
      directory: '../stories',
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
