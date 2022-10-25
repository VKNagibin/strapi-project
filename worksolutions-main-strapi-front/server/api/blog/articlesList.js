const MetaTags = require("../../metaTags/MetaTags");
const OpenGraph = require("../../openGraph/OpenGraph");

const prepareMetaValues = require("../../util/blogHelpers/prepareMetaValues");
const blogTitleMap = require("../../util/maps/blogTitleMap");
const blogDescriptionMap = require("../../util/maps/blogDescriptionMap");
const { prepareBlogUrl } = require("../../util/blogHelpers/prepareBlogUrl");

const {
  prepareImageURL,
  axiosInstance,
  logError,
  resolveArticleUrl,
  formatUnixDate,
} = require("./helpers");

exports.getSimpleArticleFromServerData = function({
  id,
  announceImageUrl,
  title,
  code,
  announce = "",
  category,
  author,
  publishedAt,
  pageLink,
} = {}) {
  return {
    id,
    announceImage: announceImageUrl.url && prepareImageURL(announceImageUrl.url),
    title,
    code,
    announce: announce.length <= 120 ? announce : `${announce.slice(0, 117).trim()}...`,
    fullAnnounce: announce,
    categoryId: category?.id,
    categoryText: category?.name || "",
    author: author.name + " " + author.surname,
    date: formatUnixDate(publishedAt),
    url: resolveArticleUrl(pageLink, code),
  };
};

exports.getSimpleBenefitFromServerData = function(article) {
  return {
    id: article.id,
    announceImage: article.announceImageUrl.url && prepareImageURL(article.announceImageUrl.url),
    title: article.title,
    code: article.code,
    announce: article.announce || "",
    url: "/useful/" + article.code,
  };
};

async function getBlogArticles(query) {
  const selectedCategories = query.selectedCategories ? query.selectedCategories : [];
  const currentQuery = {
    _start: query.start ? +query.start : 0,
    _limit: +query.limit,
    _sort: "publishedAt:DESC",
    "category.id_in": selectedCategories.includes("all") ? [] : selectedCategories,
  };
  const counterQuery = {
    "category.id_in": selectedCategories.includes("all") ? [] : selectedCategories,
  };
  const { data: articleCount } = await axiosInstance.get("/api/articles/count", { params: counterQuery });
  const response = await axiosInstance.get("/api/articles", { params: currentQuery });
  const hasNextPage = currentQuery._limit + currentQuery._start < articleCount;
  return {
    selectedCategories,
    articles: response.data.map(exports.getSimpleArticleFromServerData),
    hasNextPage,
  };
}

async function getBenefitArticles(query) {
  const currentQuery = {
    _start: query.start ? +query.start : 0,
    _limit: +query.limit,
    _sort: "publishedAt:DESC",
  };

  const { data: articleCount } = await axiosInstance.get("/api/useful/count");
  const { data: response } = await axiosInstance.get("/api/useful", { params: currentQuery });
  const hasNextPage = currentQuery._limit + currentQuery._start < articleCount;
  return {
    articles: response.map(exports.getSimpleBenefitFromServerData),
    hasNextPage,
  };
}

exports.getBlogArticles = getBlogArticles;
exports.getBenefitArticles = getBenefitArticles;

async function getCategories() {
  const listQuery = {
    _sort: "ordinalIndex:ASC",
  };
  const { data: response } = await axiosInstance.get("/api/categories", { params: listQuery });
  const categoryList = response.map(category => ({
    value: category.id.toString(),
    text: category.name,
    code: category.code,
    count: category.articles.length,
  }));
  return categoryList.filter(category => category.count > 0);
}

exports.benefitPageHandler = async function(req, res, sendResponse) {
  try {
    const listQuery = {
      limit: 6,
    };

    const response = await getBenefitArticles(listQuery);

    return sendResponse(response);
  } catch (e) {
    logError(e);
    return sendResponse({ articles: [] });
  }
};

exports.blogPageHandler = async function(req, res, sendResponse) {
  const categories = req.params ? req.params.categories : null;
  const selectedCategoriesList = categories ? categories.split("-") : [];

  try {
    const categories = await getCategories();
    const selectedCategoriesIds = [];
    categories.forEach(cat => {
      selectedCategoriesList.forEach(category => {
        if (cat.code.includes(category) && !selectedCategoriesIds.includes(+cat.value)) {
          selectedCategoriesIds.push(+cat.value);
        }
      });
    });
    const listQuery = {
      limit: 11,
      selectedCategories: selectedCategoriesIds,
    };
    const response = await getBlogArticles(listQuery);

    const openGraph = new OpenGraph()
      .setDescription(prepareMetaValues(blogDescriptionMap, selectedCategoriesList))
      .setUrl(prepareBlogUrl(selectedCategoriesList.join("-")))
      .setLocale(OpenGraph.locales.ru)
      .setTitle(prepareMetaValues(blogTitleMap, selectedCategoriesList))
      .setImage("/i/og/og-image.png")
      .setType("article");

    response.openGraphMeta = openGraph.value;

    response.categories = [{ value: "all", text: "Все статьи" }, ...categories];

    response.limit = listQuery.limit;

    const metaTags = new MetaTags()
      .setDescription(prepareMetaValues(blogDescriptionMap, selectedCategoriesList))
      .setTitle(prepareMetaValues(blogTitleMap, selectedCategoriesList));

    response.metaTags = metaTags.value;
    return sendResponse(response);
  } catch (e) {
    logError(e);
    return sendResponse({ selectedCategories: [], articles: [], categories: [], openGraphMeta: {} });
  }
};

exports.blogPageApiHandler = async function(req, res) {
  try {
    const listQuery = {
      ...req.query,
    };

    const response = await getBlogArticles(listQuery);

    res.send(response);
    return response;
  } catch (e) {
    logError(e);
    res.send({ selectedCategories: [], articles: [], categories: [] });
  }
};

exports.benefitPageApiHandler = async function(req, res) {
  try {
    const listQuery = {
      ...req.query,
    };
    res.send(await getBenefitArticles(listQuery));
  } catch (e) {
    logError(e);
    res.send({ articles: [] });
  }
};
