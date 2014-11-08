/*!
 * module deps
 */

var path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  cache: true,
  entry: './lib/app/index.js',

  devtool: 'source-map',

  output: {
    path: path.join(__dirname, 'assets'),
    filename: '[name].js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'jsx-loader?harmony'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!rework-loader'
      },

      // { test: /\.woff$/,   loader: "url-loader?prefix=font/&limit=5000&mimetype=application/font-woff" },
      { test: /\.woff$/,   loader: "file-loader?prefix=../&limit=5000&mimetype=application/font-woff" },
      { test: /\.ttf$/,    loader: "file-loader" },
      { test: /\.eot$/,    loader: "file-loader" },
      { test: /\.svg$/,    loader: "file-loader" },




      // {
      //   test: /\.css$/,
      //   loader: ExtractTextPlugin.extract('style-loader', 'css-loader!rework-loader')
      // }
    ]
  },

  plugins: [
    new ExtractTextPlugin('[name].css')
  ],

  resolve: {
    alias: {
      'famous':'famous/src'
    },
    modulesDirectories: ['lib', 'web_modules', 'node_modules'],
    extensions: ['', '.web.js', '.js']
  },

 resolveLoader: {
    modulesDirectories: ['webpack', 'node_modules']
  }
};