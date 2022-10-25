export default function() {
  let start = 0;
  let limit = 6;
  const url = "/useful-api";
  const $benefitList = $("#benefitList");
  const $showMoreBtn = $("#showMoreBenefit");

  function loadArticles(onComplete) {
    const data = {};
    data.start = start;
    data.limit = limit;

    $.ajax({
      url,
      type: "GET",
      data,
      contentType: false,
      cache: false,
      success: function(dataRes) {
        renderArticles(dataRes);
      },
      error: function(e) {
        console.log(e);
      },
      complete: function(data) {
        if (onComplete) onComplete(data);
      },
    });
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
                  <img class="article__img lazyload" data-src="${article.announceImage}" alt="${article.title}" role="presentation">
                </picture>
              </div>
              <div class="article__text">
                <h3 class="article__title">${article.title}</h3>
              </div>
          </a>
        </li>`;
      $(itemDOM).appendTo(fragment);
    }

    if (needToReplace) {
      $benefitList.empty();
    }

    $benefitList.append(fragment);
  }

  $showMoreBtn.on("click", function(e) {
    e.preventDefault();
    const $self = $(this);
    start += 6;
    $self.prop("disabled", true);
    loadArticles(data => {
      $self.prop("disabled", false);
      if (!data.responseJSON.hasNextPage) {
        $self.hide();
      }
    });
  });
}
