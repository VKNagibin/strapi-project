const optimization = require("./optimization");

const pathToJsFiles = "./src/js/";

exports.entryJsFiles = function(arrayOfJsNames) {
  const entryJs = {};
  arrayOfJsNames.forEach(nameFile => (entryJs[nameFile] = generatePathJsFile(nameFile)));
  return entryJs;
};

function generatePathJsFile(nameFile) {
  return `${pathToJsFiles}${nameFile}.js`;
}

exports.cacheGroupsJsFiles = function(arrayOfJsNames) {
  const cacheGroups = {};
  arrayOfJsNames.forEach(nameFile => (cacheGroups[nameFile] = optimization.makeCacheGroup(nameFile)));
  return cacheGroups;
};
