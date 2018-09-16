const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const baseConfig = require('./webpack.config.base');
const merge = require('webpack-merge');


module.exports =  merge(baseConfig, {
  module: {
    rules: [
      ...baseConfig.module.rules,
      {
        test: /\.s?css$/,
        loaders: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
            options: {
              minimize: true
            }
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
    filename: 'js/bundle.[hash].min.js'
  },
  plugins: [
    ...baseConfig.plugins,
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new MiniCssExtractPlugin({
      filename: "css/style.[contentHash].min.css"
    }),
    new OptimizeCssAssetsPlugin(),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: true,
          ecma: 6,
          output: {
            comments: false
          }
        }
      })
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    }
  }
});
