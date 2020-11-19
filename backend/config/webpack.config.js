const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const path = require('path');

const resolvePathFromRoot = (...pathSegments) =>
  path.resolve(__dirname, '..', ...pathSegments);

module.exports = {
  target: 'node',
  resolve: {
    extensions: ['.ts', '.js'],
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
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
};
