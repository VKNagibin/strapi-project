const blogCategoriesEnum = require("./blogCategoriesEnum");

function prepareBlogDescription(blogDescriptionMap, selectedCategoriesList) {
  if (selectedCategoriesList.length === 0) return blogDescriptionMap[blogCategoriesEnum.DEFAULT];
  if (selectedCategoriesList.length > 1) return blogDescriptionMap[blogCategoriesEnum.DEFAULT];

  const foundKey = Object.keys(blogDescriptionMap).find(key => selectedCategoriesList.includes(key));

  return blogDescriptionMap[foundKey || blogCategoriesEnum.DEFAULT];
}

module.exports = prepareBlogDescription;
