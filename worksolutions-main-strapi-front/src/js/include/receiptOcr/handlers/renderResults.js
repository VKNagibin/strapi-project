import viewModeStore from "../stores/viewModeStore";
import { renderJointBlockResults, renderJointStatusText } from "./jointBlock";
import { renderSideBlockResults, renderSideStatusText } from "./sideBlock";

const jointBlock = document.querySelector(".receipt-ocr_joint-block_container");
const sideBlock = document.querySelector(".receipt-ocr_side-block_wrapper");

export function renderResults() {
  switch (viewModeStore.viewMode) {
    case "split":
      toggleToSideBlock();
      renderSideBlockResults();
      break;
    case "joint":
      toggleToJointBlock();
      renderJointBlockResults();
      break;
  }
}

export function renderStatusText() {
  switch (viewModeStore.viewMode) {
    case "split":
      renderSideStatusText();
      break;
    case "joint":
      renderJointStatusText();
      break;
  }
}

function toggleToSideBlock() {
  if (!jointBlock || !sideBlock) return;

  jointBlock.style.display = "none";
  sideBlock.style.display = "block";
}

function toggleToJointBlock() {
  if (!jointBlock || !sideBlock) return;

  jointBlock.style.display = "block";
  sideBlock.style.display = "none";
}
