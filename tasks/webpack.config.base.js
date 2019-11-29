const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const packageJson = require('../package.json');

/**
 * this is base config file to be reused on production and webpack dev mode
 */
module.exports = {
  entry: path.resolve(__dirname, '../src/app.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: {
      eslint: {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'eslint-loader',
        ],
      },
      babel: {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: [
          'babel-loader',
        ],
      },
      files: {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/images',
          },
        }],
      },
      style: {
        test: /\.(s*)css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            name: 'style.css',
          },
        },
        'css-loader', 'sass-loader'],
        exclude: /node_modules/,
      },
    },
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, '../src/components'),
      containers: path.resolve(__dirname, '../src/containers'),
      services: path.resolve(__dirname, '../src/services'),
      context: path.resolve(__dirname, '../src/context'),
      lib: path.resolve(__dirname, '../src/lib'),
      stylesheets: path.resolve(__dirname, '../src/stylesheets'),
    },
    extensions: ['.js', '.jsx', '.scss'],
    modules: ['node_modules'],
  },
  plugins: {
    html: new HtmlWebpackPlugin({
      title: packageJson.description,
      baseUrl: process.env.BASE_URL || '/',
      minify: {
        collapseWhitespace: true,
      },
      hash: true,
      template: path.resolve(__dirname, '../src/assets/index.ejs'),
    }),
    extract: new MiniCssExtractPlugin({
      path: 'dist/',
      filename: 'css/style.css',
    }),
  },
};
