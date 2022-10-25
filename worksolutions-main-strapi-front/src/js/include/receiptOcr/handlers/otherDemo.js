const imagePaths = [
  "../../i/receipt-ocr/other-demo-images/demo1.png",
  "../../i/receipt-ocr/other-demo-images/demo2.png",
  "../../i/receipt-ocr/other-demo-images/demo3.png",
  "../../i/receipt-ocr/other-demo-images/demo1.png",
];

const titles = [
  "Шрифт FE Blud или кровавый перформанс",
  "Шрифт FE Blud или кровавый перформанс",
  "Шрифт FE Blud или кровавый перформанс",
  "Шрифт FE Blud или кровавый перформанс",
];

const texts = [
  "В необычной коллекции шрифтового бутика «Фонт эксорт» есть шрифт, ставший результатом не проектной деятельности, ",
  "В необычной коллекции шрифтового бутика «Фонт эксорт» есть шрифт, ставший результатом не проектной деятельности, ",
  "В необычной коллекции шрифтового бутика «Фонт эксорт» есть шрифт, ставший результатом не проектной деятельности, ",
  "В необычной коллекции шрифтового бутика «Фонт эксорт» есть шрифт, ставший результатом не проектной деятельности, ",
];

const buttonTexts = ["Онлайн-Демо", "Онлайн-Демо", "Онлайн-Демо", "Онлайн-Демо"];

const buttonIcons = [
  "../../i/receipt-ocr/other-demo-images/button-icon.svg",
  "../../i/receipt-ocr/other-demo-images/button-icon.svg",
  "../../i/receipt-ocr/other-demo-images/button-icon.svg",
  "../../i/receipt-ocr/other-demo-images/button-icon.svg",
];

const buttonRefs = ["http://google.com", "http://google.com", "http://google.com", "http://google.com"];

export function setDataForOtherDemoCard() {
  const cardBlock = document.querySelector(".receipt-ocr_other-demo-block-wrapper");
  if (!cardBlock) return;

  cardBlock.childNodes.forEach((card, index) => {
    const imageWrapper = card.querySelector(".receipt-ocr_other-demo-card_image-wrapper");
    const titleBlock = card.querySelector(".receipt-ocr_other-demo-card_title");
    const textBlock = card.querySelector(".receipt-ocr_other-demo-card_text");
    const buttonTextBlock = card.querySelector(".receipt-ocr_other-demo-card_button-text");
    const buttonIconBlock = card.querySelector(".receipt-ocr_other-demo-card_button-icon");
    if (!imageWrapper || !textBlock || !titleBlock) return;

    const img = document.createElement("img");
    img.setAttribute("src", `${imagePaths[index]}`);
    img.classList.add("receipt-ocr_other-demo-card_image");
    imageWrapper.append(img);
    titleBlock.innerHTML = titles[index];
    textBlock.innerHTML = texts[index];
    buttonTextBlock.innerHTML = buttonTexts[index];
    buttonIconBlock.src = buttonIcons[index];
    card.setAttribute("href", buttonRefs[index]);
  });
}
