const { renderSeeAlsoBlock } = require("./renderSeeAlsoBlock");

const { ArticlesTypes, articlesRegExp, getArticlesRegExp } = require("../utils");

function preparePath(path) {
  if (path === ArticlesTypes.BLOG_ARTICLE) return "blog";
  return path;
}

function getCodeArticle(articleType) {
  return articleType.match(articlesRegExp)[0];
}

module.exports = function subArticlePugRender(articlesData, text) {
  articlesData.forEach(articleData => {
    const template = getArticlesRegExp(articleData.code);
    const [articleType] = text.match(template);

    const seeAlsoBlock = renderSeeAlsoBlock(articleData, preparePath(getCodeArticle(articleType)));
    text = text.replace(template, seeAlsoBlock);
  });

  return text;
};
