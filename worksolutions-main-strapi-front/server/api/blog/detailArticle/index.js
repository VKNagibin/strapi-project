require("moment/locale/ru");
const fs = require("fs");
const renderSubArticles = require("./helpers/renderSubArticles");

const { prepareImageURL, logError, axiosInstance } = require("../helpers");
const { getSimpleArticleFromServerData, getSimpleBenefitFromServerData } = require("../articlesList");
const { getHtmlFilePath } = require("../../../util/router/makeRoute");

const host = process.env.IS_PRODUCTION === "TRUE" ? "https://worksolutions.ru" : process.env.OG_URL;

const feedbackFormTemp = /<p>#FEEDBACK_FORM#<\/p>/g;
const imageStackTemp = /<p[^>]*?>#IMAGE_STACK#<\/p>/g;
const htmlFeedbackFormPath = getHtmlFilePath("feedbackForm.html");
const htmlFeedbackFormContent = fs.readFileSync(htmlFeedbackFormPath, "UTF-8");

async function prepareArticleContent({ content, imageStack = [], withFeedbackFrom = false, withShareButtons = false }) {
  let result = content;

  if (withShareButtons) {
    const feedbackFormSubstr = "<p>#FEEDBACK_FORM#";
    const index = result.indexOf(feedbackFormSubstr);
    const shareButtonsTemp = `
      <div class="share share_bottom">
          <div class="ya-share2" data-services="vkontakte,whatsapp,telegram"/></div>
      </div>
    `;

    if (index !== -1) {
      result = result.slice(0, index) + shareButtonsTemp + result.slice(index);
    } else {
      result = result + shareButtonsTemp;
    }
  }

  result = result.replace(feedbackFormTemp, withFeedbackFrom ? htmlFeedbackFormContent : "");
  result = result.replace(
    imageStackTemp,
    `<div class="imageStack">${imageStack
      .map(image => {
        const height = ((image.height * 100) / image.width).toFixed(2);

        return `
          <picture style="padding-bottom: ${height}%">
            <img
              class="lazyload"
              data-src="${prepareImageURL(image.url)}"
              data-sizes="auto"
            />
          </picture>
        `;
      })
      .join("")}
    </div>`,
  );

  result = renderSubArticles(result);

  return result;
}

async function getBlogDetailArticle(code) {
  const { data } = await axiosInstance.get("/api/article/" + encodeURIComponent(code));
  
  const result = {
    ...getSimpleArticleFromServerData(data),
    authorImage: data.author.image && prepareImageURL(data.author.image.url),
    authorPosition: data.author.position,
    contentImage: data.contentImageUrl && prepareImageURL(data.contentImageUrl.url),
    imageStack: data?.imageStack || [],
    content: data.content || "",
    externalLink: data.externalLink,
    relatedArticles: data.relatedArticles.slice(0, 3).map(getSimpleArticleFromServerData),
    tagTitle: data.tagTitle || "",
    tagDescription: data.tagDescription || "",
    tagKeywords: data.keywords || "",
  };
  console.log("host: ", host);
  return {
    ...result,
    openGraphMeta: {
      title: result.title,
      type: "article",
      url: host + result.url,
      image: result.announceImage ? host + result.announceImage : null,
      locale: "ru_RU",
      description: result.tagTitle,
      siteName: "Work Solutions",
    },
  };
}

async function getBenefitDetailArticle(code) {
  const { data } = await axiosInstance.get("/api/useful/" + encodeURIComponent(code));

  const result = {
    id: data.id,
    title: data.title,
    contentImage: data.contentImageUrl && prepareImageURL(data.contentImageUrl.url),
    content: data.content || "",
    relatedArticles: data.relatedArticles.slice(0, 3).map(getSimpleBenefitFromServerData),
    imageStack: data?.imageStack || [],
    tagTitle: data.tagTitle || "",
    tagDescription: data.tagDescription || "",
    tagKeywords: data.keywords || "",
    hostname: host,
    announceImage: data.announceImageUrl && prepareImageURL(data.announceImageUrl.url),
    url: "/useful/" + data.code,
  };

  return {
    ...result,
    openGraphMeta: {
      title: result.title,
      type: "article",
      url: host + result.url,
      image: result.announceImage ? host + result.announceImage : null,
      description: result.tagTitle,
      locale: "ru_RU",
      siteName: "Work Solutions",
    },
  };
}

async function getAndConvertContentBlogDetailArticle({ params }) {
  const code = params.code;
  if (!code) return null;
  let { content, imageStack, ...article } = await getBlogDetailArticle(code);
  content = await prepareArticleContent({ content, imageStack });
  return { ...article, content, imageStack };
}

async function getAndConvertContentBenefitDetailArticle({ params }) {
  const code = params.code;
  if (!code) return null;
  let { content, imageStack, ...article } = await getBenefitDetailArticle(code);
  content = await prepareArticleContent({
    content,
    imageStack,
    withFeedbackFrom: true,
    withShareButtons: true,
  });
  return { ...article, content, imageStack };
}

module.exports.blogDetailHandler = async function(req, res, sendResponse, next) {
  try {
    return sendResponse(await getAndConvertContentBlogDetailArticle(req));
  } catch (e) {
    logError(e);
    next();
  }
};

module.exports.benefitDetailHandler = async function(req, res, sendResponse, next) {
  try {
    return sendResponse(await getAndConvertContentBenefitDetailArticle(req));
  } catch (e) {
    logError(e);
    next();
  }
};

module.exports.getAndConvertContentBlogDetailArticle = getAndConvertContentBlogDetailArticle;
