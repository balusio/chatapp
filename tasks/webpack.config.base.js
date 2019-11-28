const path = require('path');
const package = require('../package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * this is base config file to be reused on production and webpack dev mode
 */
module.exports = {
  entry: path.resolve(__dirname,'../src/app.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: {
      eslint: {
        enforce: 'pre',
        test: /\.js$/,
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
            outputPath:'assets/images'
          }
        }],
      },
      style: {
        test:/\.(s*)css$/,
        use:[{
          loader: MiniCssExtractPlugin.loader,
					options: {
						name:'style.css'
					}
        },
        'css-loader', 'sass-loader'],
        exclude: /node_modules/
      },
    },
  },
  resolve: {
    alias: {
      pages: path.resolve(__dirname, '../src/app/pages'),
      components: path.resolve(__dirname, '../src/app/components'),
      containers: path.resolve(__dirname, '../src/app/containers'),
      store: path.resolve(__dirname, '../src/app/store'),
      stylesheets: path.resolve(__dirname, '../src/app/stylesheets'),
    },
    extensions: ['.js','.jsx','.scss'],
    modules: ['node_modules'],
  },
  plugins: {
    html: new HtmlWebpackPlugin({
      title: package.description,
      baseUrl: process.env.BASE_URL || '/',
      minify: {
        collapseWhitespace: true,
      },
      hash: true,
      template: path.resolve(__dirname,'../src/assets/index.ejs'),
    }),
    extract: new MiniCssExtractPlugin({
      path:  'dist/',
      filename: 'css/style.css'
    })
  },
};
