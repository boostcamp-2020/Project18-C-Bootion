const { merge } = require('webpack-merge');
const { HotModuleReplacementPlugin } = require('webpack');

const config = require('./webpack.config');

module.exports = merge(config, {
  mode: 'development',
  devtool: 'inline-source-map',
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
  plugins: [
    new HotModuleReplacementPlugin(),
  ],
});
