const path = require("path");
const fs = require("fs");
const rimraf = require("rimraf");

const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const isDev = require("./webpack/isDev");
const css = require("./webpack/css");
const js = require("./webpack/js");
const resources = require("./webpack/resources");
const compression = require("./webpack/compression");

const jsFilesNames = [
  "index",
  "blog",
  "blog_detail",
  "benefit",
  "contacts",
  "outstaffing",
  "tehnicheskiy-audit-frontend",
  "tehnicheskiy-audit-backend",
  "neuroMarch",
  "neuroMarchUnique",
  "receiptOcr",
  "errorPage",
];

const buildFolder = path.join(__dirname, "build");

if (fs.existsSync(buildFolder)) {
  rimraf.sync(buildFolder);
}

const pugCompiler = require("./webpack/pug");
const { cacheGroupsJsFiles } = require("./webpack/groupJsFiles");
const { entryJsFiles } = require("./webpack/groupJsFiles");

if (isDev) {
  pugCompiler.compileFilesCallback = () => require("./server");
}

require("dotenv").config();

const plugins = [
  new webpack.ProgressPlugin(),
  new CopyPlugin([
    { from: "./src/static", to: "." },
    { from: "./src/images", to: "i" },
    { from: "./src/letters", to: "letters" },
  ]),
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
  }),
  new webpack.DefinePlugin({
    "process.env.IS_PRODUCTION": process.env.IS_PRODUCTION === "TRUE",
  }),
  new Dotenv(),
  ...css.plugins,
  ...compression.plugins,
];

module.exports = {
  mode: isDev ? "development" : "production",
  devtool: isDev ? "source-map" : false,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src' )
    }
  },
  entry: entryJsFiles(jsFilesNames),
  optimization: {
    namedChunks: true,
    splitChunks: {
      chunks: "all",
      minChunks: 1,
      name: "vendor",
      cacheGroups: cacheGroupsJsFiles(jsFilesNames),
    },
  },
  output: {
    filename: "js/[name].min.js",
    path: buildFolder,
  },
  module: {
    rules: [...css.loaders, ...js.loaders, ...resources.loaders],
  },
  plugins,
};
