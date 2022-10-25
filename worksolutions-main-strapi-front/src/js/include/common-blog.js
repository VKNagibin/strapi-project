import { isDesktopScreen, isPreMidDesktopScreen } from "./utils/screen-width-breakpoints";

const ENDPOINT = "/blog-api";

const FIRST_PAGE_ARTICLE_COUNT = 11;
const NEXT_PAGE_ARTICLE_COUNT = 9;

const LARGE_SCREEN_ARTICLE_COUNT_PER_ROW = 3;
const MIDDLE_SCREEN_ARTICLE_COUNT_PER_ROW = 2;
const LARGE_SCREEN_ARTICLE_COUNT_AT_TOP = 2;
const MIDDLE_SCREEN_ARTICLE_COUNT_AT_TOP = 1;

function getPositiveGridOffset(articleCount, isMiddleScreen) {
  return isMiddleScreen
      ? (articleCount - MIDDLE_SCREEN_ARTICLE_COUNT_AT_TOP) % MIDDLE_SCREEN_ARTICLE_COUNT_PER_ROW
      : (articleCount - LARGE_SCREEN_ARTICLE_COUNT_AT_TOP) % LARGE_SCREEN_ARTICLE_COUNT_PER_ROW;
}

function getUrlFromSelectedCategories(selectedCategories) {
  const baseUrl = `${window.location.protocol}//${window.location.host}/blog/`;

  if (selectedCategories === null
      || selectedCategories.some(({ id }) => id === "all")) {
    return baseUrl;
  }

  const categoryCodes = selectedCategories.map(({ code }) => code);
  return `${baseUrl}section-${categoryCodes.join("-")}`;
}

export default function() {
  const $filterBtn = $(".js-filter-btn");
  const $articleList = $(".articles__list");
  const $showMoreArticlesBtn = $(".js-show-more-articles");

  let isLoading = false;

  function getCurrentArticleCount() {
    return $articleList[0].childElementCount;
  }

  function getOffsetArticleCountForNextPage() {
    if (!isDesktopScreen()) return NEXT_PAGE_ARTICLE_COUNT;

    const currentArticleCount = getCurrentArticleCount();
    const nextArticleCount = currentArticleCount + NEXT_PAGE_ARTICLE_COUNT;

    const isMiddleScreen = isPreMidDesktopScreen();
    const expectedOffset = getPositiveGridOffset(nextArticleCount, isMiddleScreen)

    return NEXT_PAGE_ARTICLE_COUNT - expectedOffset;
  }

  function getSelectedCategories() {
    const activeButtons = $filterBtn.filter(".active").toArray();
    if (activeButtons.length === 0) return null;

    return activeButtons.map(button => {
      const { filter: id, code } = button.dataset;
      return { id, code };
    });
  }

  function renderShowMoreButton(data) {
    $showMoreArticlesBtn.prop("disabled", false);
    $showMoreArticlesBtn.css("display", data.responseJSON.hasNextPage ? "flex" : "none");
  }

  function renderArticles(data, needToReplace) {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < data.articles.length; i++) {
      const article = data.articles[i];

      const itemDOM = `
        <li class="article">
            <a class="article__link" href="${article.url}/">
                <div class="article__img-wrapper">
                    <picture>
                      <img class="article__img lazyload" data-src="${article.announceImage}" alt="" role="presentation">
                    </picture>
                </div>
                <div class="article__text">
                  <h3 class="article__title">${article.title}</h3>
                  <div class="article__info">
                      <span class="article__author">${article.author}</span>
                      <span class="article__date">${article.date}</span>
                  </div>
                  <p class="article__desc">${article.announce}</p>
                  <span class="article__category ${!article.categoryText && `hidden`}">${article.categoryText}</span>
                </div>
            </a>
        </li>
      `;

      $(itemDOM).appendTo(fragment);
    }

    if (needToReplace) {
      $articleList.empty();
    }

    $articleList.append(fragment);
  }

  function loadArticles(startArticleIndex, articleCountToLoad, needToReplace) {
    isLoading = true;

    const selectedCategories = getSelectedCategories();
    const categoryIds = selectedCategories && selectedCategories.map(({ id }) => id);

    const data = {
      selectedCategories: categoryIds,
      limit: articleCountToLoad,
      start: startArticleIndex,
      excludeIds: null,
    };

    $.ajax({
      url: ENDPOINT,
      type: "GET",
      data,
      contentType: false,
      cache: false,

      success: function(data) {
        renderArticles(data, needToReplace);

        if (history.pushState) {
          const newUrl = getUrlFromSelectedCategories(selectedCategories);
          window.history.replaceState({ path: newUrl }, "", newUrl);
        }
      },

      error: function(e) {
        console.log(e);
      },

      complete: function(data) {
        isLoading = false;
        renderShowMoreButton(data);
      },
    });
  }

  $(window).on("resize", () => {
    if (isLoading || !isDesktopScreen()) return;

    const articleCount = getCurrentArticleCount();
    const isMiddleScreen = isPreMidDesktopScreen();
    const positiveOffset = getPositiveGridOffset(articleCount, isMiddleScreen);

    if (positiveOffset === 0) return;

    const negativeOffset = (isMiddleScreen ? 2 : 3) - positiveOffset;
    loadArticles(articleCount, negativeOffset, false);
  });

  $filterBtn.on("click", function(e) {
    e.preventDefault();
    const $self = $(this);

    if ($self.attr("data-filter") === "all") {
      $filterBtn.not($self).removeClass("active");
      $self.addClass("active");
    } else {
      const parent = $filterBtn.parent();
      $(`[data-filter="all"]`, parent).removeClass("active");
      $self.toggleClass("active");

      if ($filterBtn.filter(".active").length === 0) {
        $(`[data-filter="all"]`, parent).addClass("active");
      }
    }

    loadArticles(0, FIRST_PAGE_ARTICLE_COUNT, true);
  });

  $showMoreArticlesBtn
    .on("touchstart", function() {
      $(this).addClass("hover");
    })
    .on("touchend", function() {
      $(this).removeClass("hover");
    })
    .on("click", function(e) {
      e.preventDefault();
      $(this).prop("disabled", true);
      loadArticles(getCurrentArticleCount(), getOffsetArticleCountForNextPage(), false);
    });
}
