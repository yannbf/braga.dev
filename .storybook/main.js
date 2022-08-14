module.exports = {
  stories: [
    // Only show demo stories in published storybook
    {
      directory: process.env.NODE_ENV === 'development' ? '../components' : '../stories',
    },
  ],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-variants',
    'storybook-addon-next',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    docsPage: false,
  },
}
