function setLocalData(scrollTop, loadedItemsCount) {
  localStorage.setItem("scrollTop", scrollTop);
  localStorage.setItem("loadedItemsCount", loadedItemsCount);
}

export default function() {
  $(document).on("click", ".article__link", function() {
    const fromTop = $(window).scrollTop();
    const articlesLength = $(this)
      .parents(".list-articles")
      .find(".article").length;

    setLocalData(fromTop, articlesLength);
  });
}
