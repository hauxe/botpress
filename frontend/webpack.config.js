process.traceDeprecation = true

const chalk = require('chalk')
const webpack = require('webpack')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const webConfig = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  bail: true,
  devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'eval-source-map',
  entry: {
    web: './index.jsx',
    lite: './lite.jsx'
  },
  output: {
    path: path.resolve(__dirname, '../backend/build/js'),
    publicPath: '/js/',
    filename: '[name].bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    alias: {
      '~': path.resolve(__dirname, '.')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: process.env.NODE_ENV === 'production' ? JSON.stringify('production') : JSON.stringify('development')
      }
    }),
    new UglifyJSPlugin({ sourceMap: true, cache: true }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './index.html'),
        to: path.resolve(__dirname, '../backend/build/index.html')
      },
      {
        from: path.resolve(__dirname, './lite.html'),
        to: path.resolve(__dirname, '../backend/build/lite/index.html')
      },
      {
        from: path.resolve(__dirname, './img'),
        to: path.resolve(__dirname, '../backend/build/img')
      },
      {
        from: path.resolve(__dirname, './audio'),
        to: path.resolve(__dirname, '../backend/build/audio')
      }
    ])
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/i,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['stage-3', ['env', { targets: { browsers: ['last 2 versions'] } }], 'react'],
            plugins: ['transform-class-properties'],
            compact: true,
            babelrc: false,
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,
        use: [{ loader: 'file-loader', options: { name: '../fonts/[name].[ext]' } }]
      }
    ]
  },
  optimization: {
    noEmitOnErrors: true
  }
}

const showNodeEnvWarning = () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(
      chalk.yellow('WARNING: You are currently building Botpress in development; NOT generating a production build')
    )
    console.log(chalk.yellow('Run with NODE_ENV=production to create a production build instead'))
  }
}

const compiler = webpack([webConfig])
const postProcess = (err, stats) => {
  if (err) {
    throw err
  }
  console.log(chalk.grey(stats.toString('minimal')))
}

if (process.argv.indexOf('--compile') !== -1) {
  showNodeEnvWarning()
  compiler.run(postProcess)
} else if (process.argv.indexOf('--watch') !== -1) {
  compiler.watch(null, postProcess)
}

module.exports = { web: webConfig}
