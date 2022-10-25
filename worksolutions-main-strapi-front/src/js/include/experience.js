const easeOutCubic = [0.215, 0.61, 0.355, 1];

function toggleGalleryModal(button, direction) {
  let nextModalType = button.attr("data-scrollto");
  let $curremtModal = button.closest(".modal");
  let $nextModal = $('.modal[data-type="' + nextModalType + '"]');
  if (!$nextModal.length) {
    return;
  }

  let leftCoord;
  switch (direction) {
    case "prev":
      leftCoord = "-100%";
      break;

    case "next":
      leftCoord = "100%";
      break;

    default:
      leftCoord = 0;
  }

  $nextModal.find(".modal__in").scrollTop(0);

  $nextModal.css({
    top: 0,
    left: leftCoord,
    opacity: 1,
  });

  $curremtModal.removeClass("active");
  $nextModal.addClass("active visible");

  $nextModal.animate(
    {
      left: 0,
    },
    250,
    $.bez(easeOutCubic),
    function() {
      $curremtModal.removeClass("visible");
      $curremtModal.css({
        top: "16%",
        opacity: 0,
      });
      $curremtModal.find(".modal__in").scrollTop(0);
    },
  );
}

export default function() {
  $(".js-prev-modal").on("click", function() {
    toggleGalleryModal($(this), "prev");
  });
  $(".js-next-modal").on("click", function() {
    toggleGalleryModal($(this), "next");
  });
}
