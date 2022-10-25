const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const isDev = require("./isDev");

const cssLoaders = [
  {
    loader: MiniCssExtractPlugin.loader,
  },
  {
    loader: "css-loader",
    options: {
      sourceMap: true,
    },
  },
  {
    loader: "postcss-loader",
    options: {
      sourceMap: true,
    },
  },
  {
    loader: "resolve-url-loader",
  },
  {
    loader: "sass-loader",
    options: {
      outputStyle: "expanded",
      sourceMap: true,
      sourceMapContents: true,
    },
  },
];

exports.loaders = [
  {
    test: /\.(scss|css)$/,
    use: cssLoaders,
  },
];

exports.plugins = [
  new MiniCssExtractPlugin({
    filename: "[name].css",
  }),
];

if (!isDev) {
  exports.plugins.push(
    new OptimizeCssAssetsPlugin({
      cssProcessor: require("cssnano"),
      cssProcessorOptions: {
        map: {
          inline: false,
        },
        discardComments: {
          removeAll: true,
        },
        discardUnused: false,
      },
      canPrint: true,
    }),
  );
}
