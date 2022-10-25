import { getMaxHeightListElement, getMaxHeightListHiddenElement, isAndroid, isIos } from "./utils";

const differenceBox = $("#differenceBox");
const differenceBoxMobile = $("#differenceMobile");
const dragElement = $("#differenceDrag");
const differenceResize = $("#differenceResize");

let winWidth = $(window).width();

function setHeight() {
  const diffElements = $(".js-diff-card");
  diffElements.height("auto");
  const maxElementHeight = getMaxHeightListElement(".js-diff-card");
  setTimeout(() => {
    differenceBox.height(maxElementHeight + 120);
    diffElements.css("height", maxElementHeight);
  }, 100);
}

function setHeightMobile() {
  const diffElements = $(".js-diff-mobile-card");
  differenceBoxMobile.height("auto");
  const maxElementHeight = getMaxHeightListHiddenElement(".js-diff-mobile-card");
  setTimeout(() => {
    differenceBoxMobile.height(maxElementHeight + 120);
    diffElements.css("height", maxElementHeight);
  }, 100);
}

const easeOutCubic = t => --t * t * t + 1;

function lerp(v0, v1, t) {
  t = easeOutCubic(t);
  return v0 * (1 - t) + v1 * t;
}

function clamp(value, min, max) {
  return Math.max(Math.min(max, value), min);
}

function desktopDiff() {
  setListWidth();
  setTimeout(function() {
    setHeight();
  }, 100);
  let startAnimate = true;

  $(window)
    .resize(function() {
      if (isIos() || isAndroid()) {
        if ($(window).width() !== winWidth) {
          winWidth = $(window).width();
          setListWidth();
          setHeight();
        }
      } else {
        setListWidth();
        setHeight();
      }
    })
    .scroll(function() {
      const window = $(this);
      const fromTop = window.scrollTop();
      const windowHeight = window.height();
      const elementPosition = differenceBox.offset().top;
      if (fromTop + windowHeight / 2 >= elementPosition) {
        if (!startAnimate) return;
        startAnimate = false;
        inertialSwing();
      }
    });

  function setListWidth() {
    const sliderWidth = $(differenceBox).outerWidth();
    differenceBox.find(".difference__wrapper").width(sliderWidth - 20);
  }

  function inertialSwing() {
    const animateParams = [0.4, 0.95, 0.5, 0.9];
    const easingTimer = 1000;

    dragElement.parent().animate(
      {
        left: "50%",
      },
      easingTimer,
      $.bez(animateParams),
    );
    differenceResize.animate(
      {
        width: "50%",
      },
      easingTimer,
      $.bez(animateParams),
    );
  }

  function runAutoMoving(deltaX, currentWidth, dragElement, resizeElement) {
    if (deltaX > -3 && deltaX < 3) return;
    deltaX = clamp(deltaX, -40, 40);
    let index = 0;
    const scale = 12;
    const draggableParents = dragElement.parent();
    function run() {
      let value = `calc(${currentWidth} + ${lerp(0, deltaX, index / 50) * scale}px)`;
      value = `min(calc(100% - 25px), max(${value}, 25px))`;

      draggableParents.css("left", value);
      resizeElement.css("width", value);

      if (index === 49) return;
      index++;
      requestAnimationFrame(run);
    }
    run();
  }

  function drags(dragElement, resizeElement, container) {
    let deltaX = 0;
    let currentWidth = 0;

    dragElement
      .on("mousedown touchstart", function(e) {
        dragElement.addClass("draggable");
        resizeElement.addClass("resizable");

        const startX = e.pageX ? e.pageX : e.originalEvent.touches[0].pageX;
        const dragWidth = dragElement.outerWidth();
        const posX = dragElement.offset().left + dragWidth - startX;
        const containerOffset = container.offset().left;
        const containerWidth = container.outerWidth();
        const minLeft = containerOffset;
        const maxLeft = containerOffset + containerWidth - dragWidth - 5;

        let lastMoveEventX = startX;
        let i = 0;

        dragElement
          .parents()
          .on("mousemove touchmove", function(e) {
            const moveX = e.pageX ? e.pageX : e.originalEvent.touches[0].pageX;

            if (i % 7 === 0) {
              deltaX = moveX - lastMoveEventX;
              lastMoveEventX = moveX;
            }
            i++;

            let leftValue = moveX + posX - dragWidth;
            if (leftValue < minLeft) {
              leftValue = minLeft;
            } else if (leftValue > maxLeft) {
              leftValue = maxLeft;
            }
            let widthValue = ((leftValue + dragWidth / 2 - containerOffset) * 100) / containerWidth + "%";
            currentWidth = widthValue;
            $(".draggable")
              .parent()
              .css("left", widthValue)
              .on("mouseup touchend touchcancel", function() {
                $(this).removeClass("draggable");
                resizeElement.removeClass("resizable");
              });
            $(".resizable").css("width", widthValue);
          })
          .on("mouseup touchend touchcancel", function() {
            dragElement.removeClass("draggable");
            resizeElement.removeClass("resizable");
            runAutoMoving(deltaX, currentWidth, dragElement, resizeElement);
          });

        e.preventDefault();
      })
      .on("mouseup touchend touchcancel", function(e) {
        dragElement.removeClass("draggable");
        resizeElement.removeClass("resizable");
        dragElement
          .parents()
          .off("mousemove touchmove")
          .off("mouseup touchend touchcancel");
        runAutoMoving(deltaX, currentWidth, dragElement, resizeElement);
      });
  }

  drags(dragElement, differenceResize, differenceBox);
}

function mobileDiff() {
  let startAnimate = true;
  setTimeout(function() {
    setHeightMobile();
  }, 100);
  $(window)
    .resize(function() {
      if (isAndroid() || isIos()) {
        if ($(window).width() !== winWidth) {
          winWidth = $(window).width();
          setHeightMobile();
        }
      } else {
        setHeightMobile();
      }
    })
    .scroll(function() {
      const window = $(this);
      const fromTop = window.scrollTop();
      const windowHeight = window.height();
      const elementPosition = differenceBoxMobile.offset().top;
      if (fromTop + windowHeight / 2 >= elementPosition) {
        if (!startAnimate) return;
        startAnimate = false;
        // differenceBoxMobile.animate({
        //   scrollLeft: 150
        // }, 1000, function () {
        //   differenceBoxMobile.find("[data-demo]").removeClass("reverse");
        // });
        differenceBoxMobile.find("[data-demo]").addClass("reverse");
        setTimeout(() => {
          differenceBoxMobile.find("[data-demo]").removeClass("reverse");
        }, 1000);
      }
    });

  $(document).on("click", ".js-toggle-card", function() {
    const card = $(this);
    card.toggleClass("reverse");
  });
}

export default function() {
  if (!differenceBox.length || !differenceBoxMobile.length) return;
  mobileDiff();
  desktopDiff();
}
