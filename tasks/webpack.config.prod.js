const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const base = require('./webpack.config.base');

module.exports = {
  entry: base.entry,
  output: base.output,
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  module: {
    rules: [
      base.module.rules.eslint,
      base.module.rules.babel,
      base.module.rules.files,
      base.module.rules.style,
    ],
  },
  resolve: base.resolve,
  plugins: [
    base.plugins.html,
    base.plugins.extract,
  ],
};
