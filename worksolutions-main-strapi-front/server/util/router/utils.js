const path = require("path");

exports.isDev = process.env.NODE_ENV === "development";

exports.getPugFileFullPath = function(filePathFromPugDir) {
  return path.join(process.cwd(), "src", "pug", filePathFromPugDir);
};
