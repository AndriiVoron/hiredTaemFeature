const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const cssLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: true,
  },
};

module.exports = {
  entry: [
    './src/index',
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'style-loader',
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'css-loader',
        query: {
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      inject: true,
      template: './src/index.html',
    }),
    new webpack.ProvidePlugin({
      'React': 'react',
    }),
  ],
};
