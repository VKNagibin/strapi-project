const { getSubArticlesContent } = require("./getSubArticlesContent");

const { ArticlesTypes } = require("../utils");
const { axiosInstance } = require("../../helpers");

module.exports = async function getSubArticlesData(content) {
  return await Promise.all([
    getSubArticlesContent(content, ArticlesTypes.BLOG_ARTICLE, code =>
      axiosInstance.get("/api/article/" + code).catch(() => null),
    ),
    getSubArticlesContent(content, ArticlesTypes.USEFUL_ARTICLE, code =>
      axiosInstance.get("/api/useful/" + code).catch(() => null),
    ),
  ]);
};
