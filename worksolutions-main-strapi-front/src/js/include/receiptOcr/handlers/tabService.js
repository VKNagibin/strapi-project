import viewModeStore from "../stores/viewModeStore";

export function getResultTab() {
  if (viewModeStore.viewMode === "split") return document.querySelector("#receipt-ocr_tab-result");
  return document.querySelector("#receipt-ocr_tab-result_joint");
}

export function getJsonTab() {
  if (viewModeStore.viewMode === "split") return document.querySelector("#receipt-ocr_tab-json");
  return document.querySelector("#receipt-ocr_tab-json_joint");
}

export function getImageTab() {
  return document.querySelector("#receipt-ocr_tab-image_joint");
}

export function selectTab(tabName) {
  const resultTab = getResultTab();
  const jsonTab = getJsonTab();
  const imageTab = getImageTab();
  if (!resultTab || !jsonTab) return;

  switch (tabName) {
    case "image": {
      if (!imageTab) return;
      imageTab.classList.add("receipt-ocr_tab_wrapper__active");
      resultTab.classList.remove("receipt-ocr_tab_wrapper__active");
      jsonTab.classList.remove("receipt-ocr_tab_wrapper__active");
      return;
    }
    case "result": {
      resultTab.classList.add("receipt-ocr_tab_wrapper__active");
      jsonTab.classList.remove("receipt-ocr_tab_wrapper__active");
      imageTab.classList.remove("receipt-ocr_tab_wrapper__active");
      return;
    }
    case "json": {
      jsonTab.classList.add("receipt-ocr_tab_wrapper__active");
      resultTab.classList.remove("receipt-ocr_tab_wrapper__active");
      imageTab.classList.remove("receipt-ocr_tab_wrapper__active");
      return;
    }
  }
}

export function makeTabsCompact() {
  getImageTab().firstChild.classList.add("receipt-ocr_tab_text__compact");
  getJsonTab().firstChild.classList.add("receipt-ocr_tab_text__compact");
  getResultTab().firstChild.classList.add("receipt-ocr_tab_text__compact");
}

export function makeTabsNormal() {
  getImageTab().firstChild.classList.remove("receipt-ocr_tab_text__compact");
  getJsonTab().firstChild.classList.remove("receipt-ocr_tab_text__compact");
  getResultTab().firstChild.classList.remove("receipt-ocr_tab_text__compact");
}
