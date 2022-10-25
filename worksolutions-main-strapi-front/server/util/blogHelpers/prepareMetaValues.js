const blogCategoriesEnum = require("./blogCategoriesEnum");

function prepareMetaValues(map, selectedCategoriesList) {
  if (selectedCategoriesList.length === 0) return map[blogCategoriesEnum.DEFAULT];
  if (selectedCategoriesList.length > 1) return map[blogCategoriesEnum.DEFAULT];

  const foundKey = Object.keys(map).find(key => selectedCategoriesList.includes(key));

  return map[foundKey || blogCategoriesEnum.DEFAULT];
}

module.exports = prepareMetaValues;
