const subArticlePugRender = require("./subArticlePugRender.js");
const getSubArticlesData = require("./getSubArticlesData");

module.exports = async function renderSubArticles(text) {
  const [articles, usefulArticles] = await getSubArticlesData(text);

  const articlesData = articles.filter(Boolean).map(article => article.data);
  const usefulArticlesData = usefulArticles.filter(Boolean).map(article => article.data);

  return subArticlePugRender([...articlesData, ...usefulArticlesData], text);
};
