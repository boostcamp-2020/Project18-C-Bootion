const { HotModuleReplacementPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const path = require('path');

const MODE = { prod: 'production', dev: 'development' };
const PUBLIC_PATH = '/';
const resolvePathFromRoot = (...pathSegments) =>
  path.resolve(__dirname, '..', ...pathSegments);

const config = {
  mode: MODE.dev,
  target: 'web',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  entry: {
    index: ['@babel/polyfill', resolvePathFromRoot('src', 'index.tsx')],
  },
  output: {
    path: resolvePathFromRoot('dist'),
    filename: '[name].[hash].js',
    publicPath: PUBLIC_PATH,
  },
  devtool: 'source-map',
  devServer: {
    port: 4000,
    inline: true,
    compress: true,
    hot: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
      },
    },
    historyApiFallback: {
      rewrites: [{ from: /^\/*$/, to: '/index.html' }],
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
        options: {
          useBabel: true,
          babelCore: '@babel/core',
        },
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              publicPath: PUBLIC_PATH,
              name: '[name].[ext]?[hash]',
              // esModule: false
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolvePathFromRoot('src', 'index.html'),
    }),
  ],
};

if (process.env.NODE_ENV === MODE.prod) {
  config.mode = MODE.prod;
  delete config.devtool;
  delete config.devServer;
}

module.exports = config;
