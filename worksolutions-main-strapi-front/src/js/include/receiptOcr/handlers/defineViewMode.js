import viewModeStore from "../stores/viewModeStore";
import { setMainImage } from "./mainImage";
import { renderResults } from "./renderResults";
import { removeInputErrors, setViewOfInputByState } from "./searchInput";

export function renderCurrentViewMode() {
  const imageBlock = document.querySelector(".receipt-ocr_image-and-select-file_wrapper");
  const sideBlock = document.querySelector(".receipt-ocr_side-block_wrapper");
  const jointBlock = document.querySelector(".receipt-ocr_joint-block_wrapper");

  removeInputErrors();
  setViewOfInputByState();
  switch (viewModeStore.viewMode) {
    case "split": {
      imageBlock.style.display = "flex";
      sideBlock.style.display = "flex";
      jointBlock.style.display = "none";

      setMainImage();
      renderResults();
      return;
    }
    case "joint": {
      imageBlock.style.display = "none";
      sideBlock.style.display = "none";
      jointBlock.style.display = "flex";

      renderResults();
      return;
    }
  }
}
