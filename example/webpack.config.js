const HtmlWebPackPlugin = require("html-webpack-plugin");
const ReactRefreshLoader = require('react-refresh-loader');

module.exports = {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [ "@babel/preset-env", "@babel/preset-react" ],
              plugins: [ require("react-refresh/babel"), '@babel/plugin-proposal-class-properties' ]
            }
          },
          {
            loader: ReactRefreshLoader.path()
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new ReactRefreshLoader.Plugin(),
  ]
};
