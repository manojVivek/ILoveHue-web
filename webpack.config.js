const webpack = require('webpack')
const path = require('path')

module.exports = {
  context: __dirname + "/src",
  entry: "./app",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
    publicPath: '/dist/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname),
    hot: true,
    inline: true,
    historyApiFallback: false,
  },
}
