module.exports = {
  stories: [
    {
      directory: '../components',
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
