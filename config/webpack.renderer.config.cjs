const rules = require('./webpack.rules.cjs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';

rules.push({
  test: /\.css$/,
  // use: [
  //   'style-loader',
  //   'css-loader',
  //   'postcss-loader',
  // ],
  // type: isDevelopment ? 'asset/source' : 'asset/resource'
});

module.exports = {
  devServer: {
    static: {
      directory: path.join(__dirname, '../dist'),
    },
    compress: true,
    port: 3001,
    hot: true,
  },
  module: {
    rules,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    alias: {
      '@': path.resolve(__dirname, '..', 'src')
    },
    fallback: {
      "util": false,
      "assert": false,
      "crypto": false,
      "stream": false,
      "timers": false,
      "tty": false,
      "fs": false,
      "path": false,
      "url": false
    },
  },
  externals: {
    electron: 'commonjs electron'
  },
};