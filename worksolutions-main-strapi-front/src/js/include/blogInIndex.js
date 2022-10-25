import { isAnyPartOfElementInViewport } from "./utils";
import initAnimation from "./blogSlider";

const url = "/blog-api";

function renderBlogItem(data) {
  const tempList = document.createDocumentFragment();

  data.forEach(item => {
    const { title, url, announceImage, announce, categoryText, author, date } = item;

    const listElement = `
      <li class="blog__item js-blogCarousel-card hidden">
          <a class="blog__link" href="${url}" target="_blank">
            <div class="blog__img-wrapper">
              <picture>
                <img class="lazyload" data-src="${announceImage}" alt="${title}" />
              </picture>
            </div>
            <div class="blog__text">
              <h3 class="blog__item-title">${title}</h3>
              <div class="blog__item-data">
                <span class="blog__item-data__author">${author}</span> 
                <span class="blog__item-data__date">${date}</span>
              </div>
              <p class="blog__item-desc">${announce}</p>
              <div class="blog__item-bottom">
                <span class="blog__read">Читать</span>
                <span class="blog__category ${!categoryText && `hidden`}">${categoryText}</span>
              </div>
            </div>
          </a>
        </li>
      `;
    $(listElement).appendTo(tempList);
  });

  return tempList;
}

function loadBlogItemsInIndex() {
  const blogBox = $("#blogList");

  if (isAnyPartOfElementInViewport($(blogBox)[0], 500) && blogBox.attr("data-loaded") === "false") {
    blogBox.attr("data-loaded", "true");

    const data = {
      limit: 3,
      start: 0,
    };

    $.ajax({
      url,
      type: "GET",
      data,
      contentType: false,
      cache: false,
      success: function(data) {
        blogBox.append(renderBlogItem(data.articles));
        blogBox.removeClass("hidden");
        initAnimation();
      },
      error: function(e) {
        console.log(e);
      },
    });
  }
}

export default function() {
  $(window)
    .on("scroll", loadBlogItemsInIndex)
    .on("resize", loadBlogItemsInIndex);
}
