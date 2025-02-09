// webpack.main.config.cjs
const path = require('path');

module.exports = {
  entry: {
    main: './main.cjs',
    preload: './src/preload.cjs'
  },
  output: {
    filename: '[name].js'
  },
  module: {
    rules: require('./webpack.rules.cjs'),
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
    alias: {
      '@': path.resolve(__dirname, '..', 'src')
    },
  },
  externals: {
    electron: 'commonjs electron',
    path: 'commonjs path',
    fs: 'commonjs fs',
    'fs/promises': 'commonjs fs/promises',
    'child_process': 'commonjs child_process'
  },
};