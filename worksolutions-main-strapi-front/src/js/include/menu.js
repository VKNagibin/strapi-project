import { closeModal } from "./modal";
import { isAndroid, isIos } from "./utils";

const menuButton = $("#menuButton");
const menuButtonText = $("#menuButtonText .siteMenu__button-text-inner");
const isOpenedMenuText = "закрыть";
const isClosedMenuText = "меню";
const $menu = $(".siteMenu");

const easeInCubic = [0.55, 0.055, 0.675, 0.19];
const easeOutCubic = [0.215, 0.61, 0.355, 1];

function openMenu(callback) {
  menuButtonText.animate(
    {
      opacity: 0,
    },
    150,
    $.bez(easeOutCubic),
    function() {
      menuButtonText.text(isOpenedMenuText);
      menuButtonText.animate(
        {
          opacity: 1,
        },
        150,
        $.bez(easeInCubic),
        function() {
          menuButton.addClass("opened");
        },
      );
    },
  );

  $("#menuList")
    .addClass("visible")
    .fadeIn(300, function() {
      $("body").addClass("hidden");
      let $activeModal = $(".modal.visible");
      if ($activeModal.length) {
        $activeModal.each(function() {
          closeModal($(this));
        });
      }
      if (!callback) return;
      callback();
    });
}

export function closeMenu(callback) {
  menuButtonText.animate(
    {
      opacity: 0,
    },
    150,
    $.bez(easeOutCubic),
    function() {
      menuButtonText.text(isClosedMenuText);
      menuButtonText.animate(
        {
          opacity: 1,
        },
        150,
        $.bez(easeInCubic),
        function() {
          menuButton.removeClass("opened");
        },
      );
    },
  );

  $("#menuList")
    .removeClass("visible")
    .fadeOut(300, function() {
      $("body").removeClass("hidden");
      if (!callback) return;
      callback();
    });
}

function animateMenuLinks() {
  const elements = $(".js-link-animate");
  const linksLength = elements.length;
  let count = 0;

  function animateLink() {
    if (count === linksLength) return;
    $(elements[count])
      .find("a")
      .addClass("visible");
    count++;
    setTimeout(() => {
      animateLink();
    }, 50);
  }

  animateLink();
}

export function clearAnimate() {
  $(".js-link-animate")
    .find("a")
    .removeClass("visible");
}

function setMenuHeight() {
  if (!$menu.length) {
    return;
  }

  let winHeight = $(window).height();
  $menu.css("height", winHeight);
}

function showMenu() {
  if (!$menu.length) {
    return;
  }

  $menu.addClass("showed");
}

export default function() {
  if (isIos() || isAndroid()) {
    setMenuHeight();
  }
  showMenu();
  $(document)
    .on("click", "#menuButton", function() {
      const button = $(this);
      if (button.hasClass("opened")) {
        closeMenu(clearAnimate);
        return;
      }
      openMenu(animateMenuLinks);
    })
    .on("click", "#closeMenu", function() {
      closeMenu(clearAnimate);
    });
}
