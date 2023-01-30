const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { routers } = require('./routers.dev.json');

const entry = {};

routers.forEach((r) => {
  entry[r.name] = r.entry;
});
const plugins = routers.map(r => new HtmlWebpackPlugin({
  template: r.template,
  filename: r.filename,
  title: r.title,
  chunks: [r.name],
  inject: 'body',
}));
module.exports = {
  mode: 'development',
  context: path.join(__dirname, '..', 'src/'),
  entry,
  devServer: {
    host: '0.0.0.0',
    port: 8060,
    historyApiFallback: true,
    hot: true,
    disableHostCheck: true,
    contentBase: './dist',
  },
  target: 'web',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __DEV__: process.env.NODE_ENV !== 'production', // judge if dev environment.
      __ENV__: JSON.stringify('/api'),
      // __ENV__: JSON.stringify('/api/api'),
    }),
    new CleanWebpackPlugin(),
  ].concat(plugins),
  module: {
    rules: [{
      test: /\.jsx?$/,
      include: [
        path.join(__dirname, '..', 'src'),
      ],
      loader: 'babel-loader',
    }, {
      test: /\.css$/,
      use: ['style-loader',
      {
        loader: 'css-loader',
        // options: {
        //   modules: true,
        // }
      }],
    }, {
      test: /\.less$/,
      use: [{
        loader: 'style-loader'
      }, // creates style nodes from JS strings
      {
        loader: 'css-loader'
      }, // translates CSS into CommonJS
      {
        loader: 'less-loader',
        options: {
          javascriptEnabled: true
        }
      }, // compiles Less to CSS
      ],
    }, {
      test: /\.scss$/,
      use: [{
        loader: 'style-loader'
      },
      {
        loader: 'css-loader'
      },
      {
        loader: 'sass-loader'
      },
      ],
    }, {
      test: /\.(png|jpg|gif|svg|jpeg)$/,
      use: [{
        loader: 'file-loader',
        options: {
          esModule: false,
        },
      }],
    }],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, '..', 'public'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      Components: path.resolve(__dirname, '..', 'src/components/'),
      Constanst: path.resolve(__dirname, '..', 'src/constants/'),
    },
  },
};
