const ArticlesTypes = {
  USEFUL_ARTICLE: "useful",
  BLOG_ARTICLE: "article",
};

const createArticleRegExp = articleType => new RegExp(`#${articleType}:[\-\\w]+#`, "g");
const articlesAcrossLine = Object.values(ArticlesTypes).join("|");

const getArticlesRegExp = code => new RegExp(`#(${articlesAcrossLine}):${code}#`, "g");
const articlesRegExp = new RegExp(`(${articlesAcrossLine})`, "g");

module.exports = { ArticlesTypes, articlesAcrossLine, articlesRegExp, getArticlesRegExp, createArticleRegExp };
