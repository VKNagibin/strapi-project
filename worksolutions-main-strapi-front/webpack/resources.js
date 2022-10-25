module.exports.loaders = [
  {
    test: /\.(png|jp?eg|gif|svg)$/,
    use: [
      {
        loader: "url-loader",
        options: {
          name: "[path][name].[ext]?hash=[hash:20]",
          limit: 8192,
        },
      },
    ],
  },
  {
    test: /\.(eot|woff|woff2|ttf)([\?]?.*)$/,
    use: [
      {
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },
      },
    ],
  },
];
