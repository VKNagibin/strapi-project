import { selectTab } from "./tabService";
import viewModeStore from "../stores/viewModeStore";
import { renderImageInJointBlock } from "./jointBlock";

const contentWrapper = document.querySelector(".receipt-ocr-content-wrapper");

export function endInitialize() {
  if (!contentWrapper) return;

  contentWrapper.style.visibility = "visible";
}

export function setInitialView() {
  if (viewModeStore.viewMode === "split") {
    selectTab("result");
    return;
  }

  viewModeStore.tabMode = "image";
  selectTab("image");
  renderImageInJointBlock();
}
