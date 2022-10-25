import ImageService from "../stores/ImageService";
import { disableAllPreviewImage, enableAllPreviewImage, renderLastPreviewImage } from "./previewImages";
import { disableInputs, disableSearchButtons, enableInputs, setValueForAllInputs } from "./searchInput";

const invisibleInput = document.querySelector(".receipt-ocr_invisible-input");
const selectFileBlock = document.querySelectorAll(".select-file-button_wrapper");

export function addSelectFileButtonClickListener() {
  if (!selectFileBlock || !invisibleInput) return;

  selectFileBlock.forEach(block =>
    block.addEventListener("click", event => {
      invisibleInput.click();
    }),
  );
}

export function addInputChangeListener() {
  if (!invisibleInput) return;

  invisibleInput.addEventListener("change", event => {
    const file = event?.target?.files[0];
    if (!file) return;

    let reader = new FileReader();

    reader.onloadend = () => {
      beforeRecognition();
      ImageService.imageStore.imageUploadedInImageView = true;
      if (!reader.result) return;
      ImageService.addPreset(reader.result);
      renderLastPreviewImage();
      ImageService.selectImage(ImageService.imageStore.imagesUrl.length - 1);
    };

    reader.onloadstart = () => {
      ImageService.startLoading();
    };

    reader.readAsDataURL(file);
  });
}

export function disableButtons() {
  invisibleInput.disabled = true;
  selectFileBlock.forEach(block => {
    block.classList.add("select-file-button_wrapper_disabled");
  });
}

export function enableButtons() {
  invisibleInput.disabled = false;
  selectFileBlock.forEach(block => {
    block.classList.remove("select-file-button_wrapper_disabled");
  });
}

export function beforeRecognition() {
  disableInputs();
  disableButtons();
  disableAllPreviewImage();
}

export function afterRecognition() {
  setValueForAllInputs("");
  enableInputs();
  disableSearchButtons();
  enableButtons();
  enableAllPreviewImage();
}
