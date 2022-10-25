import { clearAnimate, closeMenu } from "./menu";

const $html = $("html");
const $menu = $(".menu-list");

const easeOutCubic = [0.215, 0.61, 0.355, 1];

let winScrollTop = null;

export const openModal = function(modal) {
  if (!winScrollTop) {
    winScrollTop = $(window).scrollTop();
  }
  modal.animate(
    {
      top: 0,
      opacity: 1,
    },
    400,
    $.bez(easeOutCubic),
  );
  modal.addClass("visible");
  $html.addClass("modal-opened");
  $html.css("margin-right", getScrollbarSize() + "px");

  if ($menu.length && $menu.hasClass("visible")) {
    closeMenu(clearAnimate());
  }
};

export const closeModal = function(modal, isAnotherModalAfter) {
  modal.animate(
    {
      top: $(window).height() * 0.16,
      opacity: 0,
    },
    400,
    $.bez(easeOutCubic),
    function() {
      modal.removeClass("visible active");
    },
  );

  if (!isAnotherModalAfter) {
    $html.removeClass("modal-opened");
    $html.css("margin-right", "");
    $(window).scrollTop(winScrollTop);
    winScrollTop = null;
  }
};

function getScrollbarSize() {
  // получение ширины скролла
  var outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.width = "100px";
  outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

  document.body.appendChild(outer);

  var widthNoScroll = outer.offsetWidth;
  // force scrollbars
  outer.style.overflow = "scroll";

  // add innerdiv
  var inner = document.createElement("div");
  inner.style.width = "100%";
  outer.appendChild(inner);

  var widthWithScroll = inner.offsetWidth;

  // remove divs
  outer.parentNode.removeChild(outer);

  return widthNoScroll - widthWithScroll;
}

export default function() {
  const $closeModalBtn = $(".js-close-modal");

  $closeModalBtn.on("click", function(e) {
    e.preventDefault();
    const $modal = $(this).closest(".modal");
    closeModal($modal);

    const $fileInput = $modal.find(".form__file");
    if ($fileInput.length) {
      $fileInput.val("");
    }

    const $attachment = $modal.find(".attachment");
    if ($attachment.length) {
      $attachment.remove();
    }
  });

  $(".js-modal-call").on("click", function(e) {
    e.preventDefault();
    const modalType = $(this).attr("data-modal");
    let $activeModal = $(".modal.visible");
    if ($activeModal.length) {
      if ($activeModal.attr("data-type") === modalType) {
        return;
      }

      $activeModal.each(function() {
        closeModal($(this));
      });
    }
    openModal($('[data-type="' + modalType + '"]'));
  });

  window.addEventListener("keyup", function(e) {
    if (e.key === "Escape") {
      const $modals = $(".modal");
      const openedModal = $modals.filter(".visible");
      if (openedModal.length) {
        closeModal(openedModal);
      }

      if ($("#menuList").hasClass("visible")) {
        closeMenu(clearAnimate);
      }
    }
  });
}
