const CompressionPlugin = require("compression-webpack-plugin");
const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");

const isDev = require("./isDev");

const compressionBase = { minRatio: 0.8 };

exports.plugins = [
  new ImageminWebpWebpackPlugin({
    config: [
      {
        test: /\.(jpe?g|png)/,
        options: {
          quality: 75,
        },
      },
    ],
    overrideExtension: true,
    detailedLogs: !isDev,
    strict: true,
  }),
];

if (!isDev) {
  exports.plugins.push(new CompressionPlugin(compressionBase));
}
