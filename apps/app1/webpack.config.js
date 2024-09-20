const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");

const manifest = require(path.resolve(__dirname, 'manifest.js'))

console.log('manifest',manifest)
module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    historyApiFallback: true,
    port: 3001,
  },
  output: {
    publicPath: "auto",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
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
      name: manifest.name,
      filename: "remoteEntry.js",
      remotes: {
        shared: "diqShared@[window.sharedLibrary]/remoteEntry.js",
      },
      exposes: {
        // expose each component
        ...manifest.exposedComponents,
        "./manifest": "./manifest",
      },
      shared: ["react", "react-dom"],
    }),
    new ExternalTemplateRemotesPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
