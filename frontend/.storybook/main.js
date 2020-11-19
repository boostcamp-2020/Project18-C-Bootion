const path = require('path');

const resolvePathFromRoot = (...pathSegments) =>
  path.resolve(__dirname, '..', ...pathSegments);

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-actions',
    '@storybook/addon-knobs',
  ],

  webpackFinal: async (config, { configType }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@atoms': resolvePathFromRoot('src', 'components', 'atoms'),
      '@molecules': resolvePathFromRoot('src', 'components', 'molecules'),
      '@organisms': resolvePathFromRoot('src', 'components', 'organisms'),
      '@pages': resolvePathFromRoot('src', 'components', 'pages'),
    };
    return config;
  },
};
