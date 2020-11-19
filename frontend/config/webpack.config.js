const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

const PUBLIC_PATH = '/';
const resolvePathFromRoot = (...pathSegments) =>
  path.resolve(__dirname, '..', ...pathSegments);

module.exports = {
  target: 'web',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': resolvePathFromRoot('src'),
      '@components': resolvePathFromRoot('src', 'components'),
      '@atoms': resolvePathFromRoot('src', 'components', 'atoms'),
      '@molecules': resolvePathFromRoot('src', 'components', 'molecules'),
      '@organisms': resolvePathFromRoot('src', 'components', 'organisms'),
      '@pages': resolvePathFromRoot('src', 'components', 'pages'),
    },
  },
  entry: {
    index: ['@babel/polyfill', resolvePathFromRoot('src', 'index.tsx')],
  },
  output: {
    path: resolvePathFromRoot('dist'),
    filename: '[name].[hash].js',
    publicPath: PUBLIC_PATH,
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
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolvePathFromRoot('src', 'index.html'),
      favicon: resolvePathFromRoot('src', 'assets', 'favicon.ico'),
    }),
  ],
};
