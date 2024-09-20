const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");

module.exports = {
  entry: {
    diqShared:  "./src/index"
  },
  mode: "development",
  devServer: {
    historyApiFallback: true,
    port: 3003,
  },
  output: {
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "diqShared",
      filename: "remoteEntry.js",
      exposes: {
        "./components": "./src/component",
        "./react-router-dom": "react-router-dom"
      },
      shared: {
        "react": {
          singleton: true,
        },
        "react-router-dom": {
            singleton: true,
        },
        "react-dom": {
            singleton: true,
        },
      },
    }),
    new ExternalTemplateRemotesPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
