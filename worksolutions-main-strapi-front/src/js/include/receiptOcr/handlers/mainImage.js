import ImageService from "../stores/ImageService";

const imageSubWrapper = document.querySelector(".receipt-ocr_image-sub-wrapper");
const image = document.querySelector(".receipt-ocr_main-image");

let isFirstLoad = true;

export const setMainImage = () => {
  if (!imageSubWrapper || !image) return;
  const simplebarContent = document.querySelector(".receipt-ocr_image-wrapper .simplebar-content");

  const selectedImageIndex = ImageService.imageStore.currentImageIndex;
  const imagesUrl = ImageService.imageStore.imagesUrl;
  const imageUploaded = ImageService.imageStore.imageUploadedInImageView;

  const handleImageUpload = () => {
    const src = imagesUrl[selectedImageIndex];
    if (!src) return;

    image.src = src;
    imageSubWrapper.classList.remove("receipt-ocr_clock-wrapper");
    image.style.width = "100%";
    image.style.objectFit = "cover";
    if (simplebarContent) simplebarContent.style.height = "auto";
  };

  if (imageUploaded) {
    if (isFirstLoad) {
      setTimeout(handleImageUpload, 100);
      isFirstLoad = false;
      return;
    }

    handleImageUpload();
  }
};
