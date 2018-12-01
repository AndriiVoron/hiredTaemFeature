const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: [
        // require.resolve('react-dev-utils/webpackHotDevClient'),
        './src/index',
      ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      inject: true,
      template: "./src/index.html",
    })
  ]
};