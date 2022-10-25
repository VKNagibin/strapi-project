import viewModeStore from "../stores/viewModeStore";
import { addTabListenersJointBlock } from "./jointBlock";
import { addSplitTabListeners } from "./sideBlock";
import { getImageTab, getJsonTab, getResultTab, makeTabsCompact, makeTabsNormal } from "./tabService";

const imageBlock = document.querySelector(".receipt-ocr_image-and-select-file_wrapper");
const imageWrapperSplit = document.querySelector(".receipt-ocr_image-wrapper");
const imageWrapperJoint = document.querySelector(".receipt-ocr_joint-block_wrapper");
const sideBlock = document.querySelector(".receipt-ocr_side-block_wrapper");

export function defineBlocksSize() {
  function resizeImageWrapper() {
    if (!imageWrapperSplit) return;
    const ratio = 0.625; // 10 / 16

    if (viewModeStore.viewMode === "joint") {
      if (window.innerWidth <= 526) {
        imageWrapperJoint.style.height = imageWrapperJoint.clientWidth + "px";
        makeTabsCompact();
        return;
      }

      imageWrapperJoint.style.height = ratio * imageWrapperJoint.clientWidth + "px";
      makeTabsNormal();
      return;
    }

    const height = ratio * imageWrapperSplit.clientWidth;
    imageWrapperSplit.style.height = height + "px";

    sideBlock.style.height = imageBlock.getBoundingClientRect().height + "px";
  }

  resizeImageWrapper();
  window.addEventListener("resize", resizeImageWrapper);
}

export function defineViewMode() {
  const handleResize = () => {
    if (window.innerWidth <= 1266) {
      viewModeStore.setViewMode("joint");
      addTabListenersJointBlock();
    } else {
      viewModeStore.setViewMode("split");
      addSplitTabListeners();
    }
  };

  handleResize();
  window.addEventListener("resize", handleResize);
}
