import Slider from "./slider";

function initBlogSlider() {
    new Slider({
        elements: {
            wrapper: $('#blogCarouselWrapper'),
            slider: $('#blogList'),
            cards: $('.js-blogCarousel-card'),
        }
    }).init();
}

export default function() {
    if (!$("#blog").length) return;

    initBlogSlider();
}