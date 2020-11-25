const resolvePathFromRoot = (...pathSegments) =>
  path.resolve(__dirname, '..', ...pathSegments);

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/': resolvePathFromRoot('src', 'components'),
      '@schemes/': resolvePathFromRoot('src', 'schemes'),
      '@utils/': resolvePathFromRoot('src', 'utils'),
    };
    return config;
  },
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-actions',
    '@storybook/addon-knobs',
    '@storybook/preset-create-react-app',
  ],
};
