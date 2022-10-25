import ImageService from "../stores/ImageService";
import getPreloadFileInfo from "../other/preloadedFileInfo";

const imagesBlock = document.querySelectorAll(".receipt-ocr_file-select-block_photos");

let imagesDisabled = false;

export function renderPreviewImages() {
  if (!imagesBlock) return;

  for (let i = 0; i < ImageService.imageStore.imagesUrl.length; ++i) {
    for (const imageBlock of imagesBlock) {
      const item = document.createElement("img");
      item.classList.add("receipt-ocr_file-select_image");
      item.src = ImageService.imageStore.imagesUrl[i];
      item.addEventListener("click", () => {
        if (imagesDisabled) return;
        ImageService.selectImage(i);
      });
      imageBlock.appendChild(item);
    }
  }

  paintSelectedImage();
}

export function renderLastPreviewImage() {
  if (!imagesBlock) return;

  for (const imageBlock of imagesBlock) {
    const indexOfLastImage = ImageService.imageStore.imagesUrl.length - 1;
    const item = document.createElement("img");
    item.classList.add("receipt-ocr_file-select_image");
    item.src = ImageService.imageStore.imagesUrl[indexOfLastImage];
    item.addEventListener("click", () => {
      if (imagesDisabled) return;
      ImageService.selectImage(indexOfLastImage);
    });
    imageBlock.appendChild(item);
  }

  paintSelectedImage();
}

export function setPresets() {
  const { products, receiptResults } = getPreloadFileInfo();
  ImageService.addPreset("../../i/receipt-ocr/preloaded1.jpg", { products, receiptResults });
  ImageService.addPreset("../../i/receipt-ocr/preloaded2.jpg");
  ImageService.addPreset("../../i/receipt-ocr/preloaded3.jpg");
}

export function selectFirstImage() {
  const firstImage = document.querySelector(".receipt-ocr_file-select-block_photos")?.firstChild;
  if (!firstImage) return;

  ImageService.selectImage(0);
  paintSelectedImage();
}

export function paintSelectedImage() {
  const currentImageIndex = ImageService.imageStore.currentImageIndex;
  const imageWrappers = document.querySelectorAll(".receipt-ocr_file-select-block_photos");
  if (!imageWrappers || imageWrappers.length === 0) return;

  imageWrappers.forEach(imageWrapper => {
    imageWrapper.childNodes.forEach(node => node.classList.remove("receipt-ocr_file-select_image__active"));
    const imageNode = imageWrapper.childNodes[currentImageIndex];
    if (!imageNode) return;
    imageNode.classList.add("receipt-ocr_file-select_image__active");
  });
}

export function disableAllPreviewImage() {
  const imageWrappers = document.querySelectorAll(".receipt-ocr_file-select-block_photos");
  if (!imageWrappers || imageWrappers.length === 0) return;

  imageWrappers.forEach(imageWrapper => {
    imageWrapper.childNodes.forEach(node => node.classList.add("receipt-ocr_file-select_image__disabled"));
  });

  imagesDisabled = true;
}

export function enableAllPreviewImage() {
  const imageWrappers = document.querySelectorAll(".receipt-ocr_file-select-block_photos");
  if (!imageWrappers || imageWrappers.length === 0) return;

  imageWrappers.forEach(imageWrapper => {
    imageWrapper.childNodes.forEach(node => node.classList.remove("receipt-ocr_file-select_image__disabled"));
  });

  imagesDisabled = false;
}
