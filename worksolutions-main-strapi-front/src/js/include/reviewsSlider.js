import Slider from "./slider"

function initReviewsSlider() {
  const elements = {
    wrapper: $('#reviewsCarouselWrapper'),
    slider: $('#reviewsCarouselLine'),
    cards: $('.reviews-card-container'),
  };

  const setWidth = () => {
    const { slider, cards } = elements;

    const screenWidth = $(window).width();
    const blockWidth = $(".section__in").width();
    const padding = screenWidth < 1152 ? 16 : 24;

    const cardWidth = screenWidth < 768
        ? blockWidth * 0.95
        : Math.max((blockWidth - padding) / 2, 480);

    cards.each(function() {
      $(this).width(cardWidth);
    })

    slider.width((cards.outerWidth() + padding) * cards.length);
  }

  new Slider({
    elements,
    onInit: setWidth,
    onResize: setWidth,
  }).init();
}

export default function() {
  if (!$("#reviews").length) return;

  initReviewsSlider();
}
