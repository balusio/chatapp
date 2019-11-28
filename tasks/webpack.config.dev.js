const base = require('./webpack.config.base');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: base.entry,
  output: base.output,
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    compress: false,
    port: 4200,
    open: true,
    hot: true,
    quiet: true,
    historyApiFallback: true,
    disableHostCheck: true,
    openPage: '',
  },
  module: {
    rules: [
      base.module.rules.babel,
      base.module.rules.files,
      base.module.rules.style,
    ],
  },
  resolve: base.resolve,
  plugins: [
    base.plugins.html,
    base.plugins.extract,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  watch: true,
  devtool: 'source-map',
};
