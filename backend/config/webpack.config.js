const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const path = require('path');

const resolvePathFromRoot = (...pathSegments) =>
  path.resolve(__dirname, '..', ...pathSegments);

module.exports = {
  target: 'node',
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': resolvePathFromRoot('src'),
      '@routes': resolvePathFromRoot('src', 'routes'),
      '@middlewares': resolvePathFromRoot('src', 'middlewares'),
      '@aops': resolvePathFromRoot('src', 'aops'),
      '@controllers': resolvePathFromRoot('src', 'controllers'),
      '@services': resolvePathFromRoot('src', 'services'),
      '@models': resolvePathFromRoot('src', 'models'),
      '@utils': resolvePathFromRoot('src', 'utils'),
    },
  },
  entry: {
    www: resolvePathFromRoot('src', 'www.ts'),
  },
  output: {
    filename: '[name].js',
    path: resolvePathFromRoot('dist'),
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [
          resolvePathFromRoot('node_modules'),
          resolvePathFromRoot('test'),
        ],
        loader: 'ts-loader',
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
  externals: [nodeExternals()],
};
