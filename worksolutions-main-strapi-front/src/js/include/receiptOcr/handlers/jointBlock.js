import { getImageTab, getJsonTab, getResultTab, selectTab } from "./tabService";
import viewModeStore from "../stores/viewModeStore";
import ImageService from "../stores/ImageService";
import { createProductCard, createReceiptTotalResultCard } from "../utils/createProductCard";
import jsonFormatterFunction from "../utils/jsonFormatter";

const spinnerBlock = document.querySelector(".receipt-ocr_joint-block_recognizing");
const resultBlock = document.querySelector(".receipt-ocr_joint-block_results");
const contentWrapper = document.querySelector(".receipt-ocr_joint-block_content");
const processingText = document.querySelector(".receipt-ocr_joint-block_status-text");

let tabListenersAdded = false;

export function addTabListenersJointBlock() {
  if (tabListenersAdded) return;

  const imageTab = getImageTab();
  const resultTab = getResultTab();
  const jsonTab = getJsonTab();
  if (!imageTab || !resultTab || !jsonTab) return;

  imageTab.addEventListener("click", () => {
    viewModeStore.setTabMode("image");
    selectTab("image");
  });
  resultTab.addEventListener("click", () => {
    viewModeStore.setTabMode("result");
    selectTab("result");
  });
  jsonTab.addEventListener("click", () => {
    viewModeStore.setTabMode("json");
    selectTab("json");
  });

  tabListenersAdded = true;
}

export function renderJointBlockResults() {
  selectTab(viewModeStore.tabMode);
  switch (viewModeStore.tabMode) {
    case "image":
      renderImageInJointBlock();
      break;
    case "result":
      hideImageJointBlock();
      renderCardResults();
      break;
    case "json":
      hideImageJointBlock();
      renderJsonResults();
      break;
  }
}

function renderCardResults() {
  if (!resultBlock) return;

  if (ImageService.isLoaderVisibleForCurrentImage()) {
    renderJointSpinner();
    return;
  }

  spinnerBlock.style.display = "none";
  resultBlock.innerHTML = "";
  resultBlock.style.display = "block";
  contentWrapper.style.display = "flex";
  const simplebarContent = document.querySelector(".receipt-ocr_joint-block_wrapper .simplebar-content");
  if (simplebarContent) simplebarContent.style.height = "auto";

  if (ImageService.isResultEmpty()) {
    if (simplebarContent) simplebarContent.style.height = "100%";
    const noResultBlock = document.createElement("div");
    noResultBlock.classList.add("receipt-ocr_no-result_wrapper");
    noResultBlock.innerHTML = "Не удалось ничего распознать";
    resultBlock.append(noResultBlock);
    return;
  }

  for (const product of ImageService.getCurrentProducts()) {
    resultBlock.append(createProductCard(product));
  }

  resultBlock.append(createReceiptTotalResultCard(ImageService.getCurrentReceiptResult()));
}

function renderJsonResults() {
  if (!resultBlock) return;

  if (ImageService.isLoaderVisibleForCurrentImage()) {
    renderJointSpinner();
    return;
  }

  spinnerBlock.style.display = "none";
  resultBlock.style.display = "block";
  contentWrapper.style.display = "flex";
  const simplebarContent = document.querySelector(".receipt-ocr_joint-block_wrapper .simplebar-content");
  if (simplebarContent) simplebarContent.style.height = "auto";

  resultBlock.innerHTML = jsonFormatterFunction(
    JSON.stringify(
      {
        products: [...ImageService.getCurrentProducts()],
        purchase_date: ImageService.getCurrentReceiptResult().purchase_date,
        purchase_time: ImageService.getCurrentReceiptResult().purchase_time,
        total: ImageService.getCurrentReceiptResult().total,
      },
      null,
      4,
    ),
    ["products", "name", "count", "discount_price", "price", "total", "purchase_date", "purchase_time"],
  );
}

function renderJointSpinner() {
  spinnerBlock.style.display = "flex";
  resultBlock.style.display = "none";
  const simplebarContent = document.querySelector(".receipt-ocr_joint-block_wrapper .simplebar-content");
  if (!simplebarContent) return;
  simplebarContent.style.height = "100%";
}

export function renderJointStatusText() {
  processingText.innerHTML = ImageService.imageStore.statusText;
}

export function renderImageInJointBlock() {
  const imageWrapper = document.querySelector(".receipt-ocr_joint-block_image-wrapper");
  const image = document.querySelector(".receipt-ocr_joint-block_image");
  if (!image || !contentWrapper) return;

  const selectedImageIndex = ImageService.imageStore.currentImageIndex;
  const imagesUrl = ImageService.imageStore.imagesUrl;

  contentWrapper.style.display = "none";
  imageWrapper.style.display = "block";
  image.src = `${imagesUrl[selectedImageIndex] || ""}`;
}

export function hideImageJointBlock() {
  const imageWrapper = document.querySelector(".receipt-ocr_joint-block_image-wrapper");
  if (!imageWrapper) return;

  imageWrapper.style.display = "none";
  contentWrapper.style.display = "flex";
}
