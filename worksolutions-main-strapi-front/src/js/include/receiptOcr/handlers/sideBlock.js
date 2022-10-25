import ImageService from "../stores/ImageService";
import { createProductCard, createReceiptTotalResultCard } from "../utils/createProductCard";
import jsonFormatterFunction from "../utils/jsonFormatter";
import viewModeStore from "../stores/viewModeStore";
import { getJsonTab, getResultTab, selectTab } from "./tabService";

const imageBlock = document.querySelector(".receipt-ocr_image-and-select-file_wrapper");
const sideBlock = document.querySelector(".receipt-ocr_side-block_wrapper");
const spinnerBlock = document.querySelector(".receipt-ocr_side-block_recognizing");
const resultBlock = document.querySelector(".receipt-ocr_side-block_results");
const processingText = document.querySelector(".receipt-ocr_side-block_status-text");
const sideBlockHeader = document.querySelector(".receipt-ocr_side-block_header");

let tabListenersAdded = false;

export function defineSideBlockSize() {
  function resizeSideBlock() {
    if (!imageBlock || !sideBlock) return;
    sideBlock.style.height = imageBlock.clientHeight + "px";
    resultBlock.style.height = imageBlock.clientHeight + "px";
  }

  resizeSideBlock();
  window.addEventListener("resize", resizeSideBlock);
}

export function renderSideBlockResults() {
  // setMainImage();
  selectTab(viewModeStore.tabMode === "image" ? "result" : viewModeStore.tabMode);
  viewModeStore.setTabMode(viewModeStore.tabMode === "image" ? "result" : viewModeStore.tabMode);
  if (viewModeStore.tabMode === "result") {
    renderCardResults();
  } else {
    renderJsonResults();
  }
}

function renderCardResults() {
  if (!resultBlock) return;

  if (ImageService.isLoaderVisibleForCurrentImage()) {
    renderSplitSpinner();
    return;
  }

  spinnerBlock.style.display = "none";
  resultBlock.innerHTML = "";
  resultBlock.style.display = "block";
  sideBlockHeader.style.display = "flex";
  sideBlock.style.overflow = "auto";
  const simplebarContent = document.querySelector(".receipt-ocr_side-block_wrapper .simplebar-content");
  if (simplebarContent) simplebarContent.style.height = "auto";

  if (ImageService.isResultEmpty()) {
    if (simplebarContent) simplebarContent.style.height = "100%";
    sideBlock.style.overflow = "hidden";
    resultBlock.classList.add("receipt-ocr_side-block_results__no_result");
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
    renderSplitSpinner();
    return;
  }

  spinnerBlock.style.display = "none";
  resultBlock.style.display = "block";
  sideBlockHeader.style.display = "flex";
  const simplebarContent = document.querySelector(".receipt-ocr_side-block_wrapper .simplebar-content");
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

function renderSplitSpinner() {
  sideBlockHeader.style.display = "none";
  spinnerBlock.style.display = "flex";
  resultBlock.style.display = "none";
  sideBlock.style.overflow = "hidden";
  const simplebarContent = document.querySelector(".receipt-ocr_side-block_wrapper .simplebar-content");
  if (simplebarContent) simplebarContent.style.height = "100%";
}

export function renderSideStatusText() {
  processingText.innerHTML = ImageService.imageStore.statusText;
}

export function addSplitTabListeners() {
  if (tabListenersAdded) return;
  const resultTab = getResultTab();
  const jsonTab = getJsonTab();
  if (!resultTab || !jsonTab) return;

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
