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
    '@storybook/preset-create-react-app',
  ],
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': resolvePathFromRoot('src'),
      '@assets': resolvePathFromRoot('src', 'assets'),
      '@utils': resolvePathFromRoot('src', 'utils'),
      '@components': resolvePathFromRoot('src', 'components'),
      '@atoms': resolvePathFromRoot('src', 'components', 'atoms'),
      '@molecules': resolvePathFromRoot('src', 'components', 'molecules'),
      '@organisms': resolvePathFromRoot('src', 'components', 'organisms'),
      '@pages': resolvePathFromRoot('src', 'components', 'pages'),
    };
    return config;
  },
};
