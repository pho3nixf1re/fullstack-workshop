const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PORT = 8090

const config = {
  cache: true,
  entry: [path.resolve(__dirname, 'app/main.js')],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].entry.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new HtmlWebpackPlugin({
      title: 'Full-stack Workshop TODOS',
      template: path.resolve(__dirname, 'templates/main.html'),
      inject: true,
      hash: true,
      cache: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          babelrc: path.resolve(__dirname, '.babelrc'),
          cacheDirectory: true
        }
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader'
      }
    ],
    noParse: /\.min\.js/
  }
}

switch (process.env.NODE_ENV) {
  case 'development':
    config.entry.unshift('react-hot-loader/patch')
    config.devtool = 'cheap-module-source-map'
    config.devServer = {
      inline: true,
      stats: { chunkModules: false },
      port: PORT,
      historyApiFallback: true
    }
    config.plugins = config.plugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])

    break
  case 'production':
    config.plugins = config.plugins.concat([
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
          screw_ie8: true,
          keep_fnames: true
        },
        compress: {
          screw_ie8: true,
          warnings: true
        },
        comments: false
      })
    ])

    break
}

module.exports = config
