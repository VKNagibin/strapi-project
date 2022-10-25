import SimpleBar from "simplebar";

const sideBlockWrapper = document.querySelector(".receipt-ocr_side-block_wrapper");
const imageWrapper = document.querySelector(".receipt-ocr_image-wrapper");
const jointBlock = document.querySelector(".receipt-ocr_joint-block_wrapper");
const containerBlock = document.querySelector(".receipt-ocr_joint-block_container");

export function setScrollbar() {
  new SimpleBar(sideBlockWrapper, { autoHide: false });
  new SimpleBar(imageWrapper, { autoHide: false });
  new SimpleBar(jointBlock, { autoHide: false });
}
