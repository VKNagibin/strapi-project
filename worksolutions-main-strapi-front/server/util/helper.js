const fs = require("fs");
const util = require("util");

exports.readFilePromisy = util.promisify(fs.readFile);

exports.removeFirstItem = array => array.slice(1);

exports.removeAllSpaces = string => string.replace(" ", "");
