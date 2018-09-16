const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.config.base');
const merge = require('webpack-merge');


module.exports = merge(baseConfig, {
  devServer: {
    inline: true,
    host: '0.0.0.0',
    port: 3000,
    contentBase: './dist'
  },
  module: {
    rules: [
      ...baseConfig.module.rules,
      {
        test: /\.s?css$/,
        loaders: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader' // compiles Sass to CSS
          }
        ]
      },
      {
        test: /\.(pdf|jpe?g|png|gif|svg|eot|ttf|woff|woff2)$/i,
        use: [{
          loader: "image-webpack-loader",
          options: {
            bypassOnDebug: true,
            optipng: {
              optimizationLevel: 7,
            },
            gifsicle: {
              interlaced: false
            }
          }
        }, {
          loader: 'file-loader?hash=sha512&digest=hex&name=[hash].[ext]'
        }]
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/bundle.min.js'
  },
  plugins: [
    ...baseConfig.plugins,
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
});

