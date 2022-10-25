const { createArticleRegExp } = require("../utils");

exports.getSubArticlesContent = function(text, articleType, getArticle) {
  const articleMatch = text.match(createArticleRegExp(articleType));
  if (!articleMatch) return [];

  return Promise.all(
    articleMatch.map(match => {
      const articleCodeText = match.split("#")[1];
      return getArticle(articleCodeText.split(":")[1]);
    }),
  );
};
