import { declOfNum } from "./utils";
import { isDesktopScreen } from "./utils/screen-width-breakpoints";
import Slider from "./slider";

function animateCardElementsShow(elements) {
  const elementsLength = elements.length;
  let count = 0;

  function animateElement() {
    if (count === elementsLength) return;
    $(elements[count]).removeClass("hidden");
    count++;
    setTimeout(() => {
      animateElement();
    }, 100);
  }

  animateElement();
}

function setDataToCard(index) {
  const { name, employment, exp, stack, comment } = teamPeople[index];

  const cardBox = $("#personalCard");
  const animationElements = cardBox.find(".js-card-animate");
  animationElements.addClass("hidden");

  setTimeout(() => {
    $("#personalCardName").text(name);
    $("#personalCardEmployment").text(employment);
    $("#personalCardExp").text(`${exp} ${declOfNum(exp, [" год", " года", " лет"])}`);
    $("#personalCardComment").text(comment);

    if (stack) {
      $("#personalCardProjects")
        .text(stack)
        .parents("p")
        .show();
    }

    if (!stack) {
      $("#personalCardProjects")
        .parents("p")
        .hide();
    }

    animateCardElementsShow(animationElements);
  }, 300);
}

function selectNavSlide(index, needAutoScroll = false) {
  const navSlideElement = $(".js-team-slide");
  const navSliderBox = $(".js-team-nav-slider");
  const slideWidth = navSlideElement.outerWidth(true);

  if (needAutoScroll) {
    navSliderBox.animate(
      {
        scrollLeft: slideWidth * (index + 1) - slideWidth,
      },
      200,
    );
  }

  navSlideElement.removeClass("current");
  navSlideElement.eq(index).addClass("current");
}

function mobileDeviceInit() {
  const fullSliderElement = $(".js-team-full-slider");
  const navSlideElement = $(".js-team-slide");

  fullSliderElement.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    fade: true,
  });

  setDataToCard(0);
  navSlideElement.eq(0).addClass("current");

  navSlideElement.on("click", function() {
    const selectedIndex = $(this).index();
    selectNavSlide(selectedIndex);
    fullSliderElement.slick("slickGoTo", selectedIndex);
  });

  fullSliderElement
    .on("beforeChange", function(event, slick, currentSlide, nextSlide) {
      setDataToCard(nextSlide);
    })
    .on("swipe", function(event, slick) {
      selectNavSlide(slick.currentSlide, true);
    });
}

function initDesktopTeamSlider() {
  const elements = {
    wrapper: $("#teamCarouselWrapper"),
    slider: $("#teamCarouselLine"),
    cards: $(".js-teamCarousel-card"),
  };

  const setWidth = () => {
    const { wrapper, slider, cards } = elements;

    const slidesCount = cards.length;
    const slideWidth = cards.outerWidth(true);
    const boxPadding = (wrapper.outerWidth(true) - wrapper.width()) / 2;

    slider.width(slidesCount * slideWidth + boxPadding);
  };

  new Slider({
    elements,
    onInit: setWidth,
    onResize: setWidth,
  }).init();
}

export default function() {
  if (!$("#team").length) return;

  let mobileSliderLoaded = false;
  let desktopSliderLoaded = false;

  $(window).on("resize scroll", () => {
    if (isDesktopScreen() && !desktopSliderLoaded) {
      initDesktopTeamSlider();
      desktopSliderLoaded = true;
    }

    if (!isDesktopScreen() && !mobileSliderLoaded) {
      mobileDeviceInit();
      mobileSliderLoaded = true;
    }
  });
}
