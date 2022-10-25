import { closeMenu, clearAnimate } from "./menu";

const selectorsToAnimate = [$(".js-animate-title"), $(".section__title-wrapper")];

function animateElements() {
  if (!$(`[data-animated="N"]`).length) {
    return;
  }

  $(`[data-animated="N"]`).each(function() {
    if ($(window).scrollTop() + $(window).height() / 1.2 > $(this).offset().top) {
      $(this).attr("data-animated", "Y");
    }
  });
}

function setInitDataAnimate(elemArr) {
  if (elemArr.length === 0) return;
  for (var i = 0; i < elemArr.length; i++) {
    var elem = elemArr[i];

    if (elem.length === 1) {
      setAttr(elem);
    } else if (elem.length > 1) {
      elem.each(function() {
        setAttr($(this), "data-animated");
      });
    }
  }
}

function setAttr(selector, attrName) {
  var dataAnimated = null;
  if ($(window).scrollTop() + $(window).height() > selector.offset().top) {
    dataAnimated = "Y";
  } else {
    dataAnimated = "N";
  }
  selector.attr(attrName, dataAnimated);
}

export default function() {
  setInitDataAnimate(selectorsToAnimate);

  $(window).on("resize", function() {
    setInitDataAnimate(selectorsToAnimate);
    animateElements();
  });

  $(window).on("scroll", function() {
    animateElements();
  });

  $(".js-anchor-link").on("click", function(e) {
    const target = $(this).attr("href");
    e.preventDefault();
    closeMenu(clearAnimate);
    $("html, body").animate({ scrollTop: $(target).offset().top }, 800);
    location.hash = target;
  });
}
