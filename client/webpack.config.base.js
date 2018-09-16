const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
  entry: {
    app: ['@babel/polyfill', './src/index.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(
      ['dist'],
      {
        exclude: ['base.html']
      }
    ),
    new HtmlWebpackPlugin({
      title: 'ShotSpot',
      // favicon: 'src/assets/img/favicon.png',
      meta: {
        viewport: 'width=device-width, initial-scale=1.0'
      },
      template: "dist/base.html",
      minify: true
    })
  ]
}

