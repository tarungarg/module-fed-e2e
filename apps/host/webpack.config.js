const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    historyApiFallback: true,
    port: 3002,
  },
  output: {
    publicPath: "/",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "app2",
      remotes: {
        shared: "diqShared@[window.sharedLibrary]/remoteEntry.js",
      },
      shared: ["react", "react-dom"],
    }),
    new ExternalTemplateRemotesPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
