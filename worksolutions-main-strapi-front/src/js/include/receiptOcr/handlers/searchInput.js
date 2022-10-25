import imageApi from "../api/imageApi";
import ImageService from "../stores/ImageService";
import { renderLastPreviewImage } from "./previewImages";
import { renderStatusText } from "./renderResults";
import { addTooltip } from "../utils/addTooltip";
import { beforeRecognition } from "./selectFileBlock";

const searchButtons = document.querySelectorAll(".receipt-ocr_search-input_button");
const searchInputs = document.querySelectorAll(".receipt-ocr_search-input");

let value = "";

export function disableSearchButtons() {
  if (!searchButtons) return;
  searchButtons.forEach(button => (button.disabled = true));
}

export function enableSearchButtons() {
  if (!searchButtons) return;
  searchButtons.forEach(button => (button.disabled = false));
}

export function setValueForAllInputs(newValue) {
  if (newValue !== undefined) value = newValue;
  searchInputs.forEach(input => (input.value = value));
  removeInputErrors();
}

function setInputErrors() {
  searchInputs.forEach(input => {
    input.classList.add("receipt-ocr_search-input_error");
    addTooltip(input);
  });
  disableSearchButtons();
}

export function removeInputErrors() {
  searchInputs.forEach(input => input.classList.remove("receipt-ocr_search-input_error"));
  enableSearchButtons();
  const tooltips = document.querySelectorAll(".receipt-ocr_tooltip");
  tooltips.forEach(tooltip => tooltip.remove());
}

export function disableInputs() {
  if (!searchInputs || !searchInputs.length) return;

  searchInputs.forEach(input => {
    input.disabled = true;
    disableSearchButtons();
  });
}

export function enableInputs() {
  if (!searchInputs || !searchInputs.length) return;

  searchInputs.forEach(input => {
    input.disabled = false;
    enableSearchButtons();
  });
}

export function setViewOfInputByState() {
  if (!searchInputs || !searchInputs.length) return;

  if (value) {
    enableSearchButtons();
    return;
  }

  disableSearchButtons();
}

export function addSearchInputChangeListener() {
  if (!searchInputs) return;

  searchInputs.forEach(input => {
    input.addEventListener("input", () => {
      value = input.value;
      setValueForAllInputs();

      if (value !== "") {
        enableSearchButtons();
      } else {
        disableSearchButtons();
      }
    });
  });
}

export function addSearchListeners() {
  if (!searchButtons || !searchInputs) return;

  const handler = event => {
    event.preventDefault();
    imageApi.uploadByUrl(value).then(response => {
      if (response.status !== 201) {
        setInputErrors();
        return;
      }

      ImageService.addPreset(value);
      const currentIndex = ImageService.imageStore.imagesUrl.length - 1;
      ImageService.imageStore.imageUploadedInImageView = true;
      ImageService.imageStore.loading[currentIndex] = true;
      ImageService.imageStore.setStatusText("Загрузка изображения");
      renderStatusText();
      renderLastPreviewImage();
      ImageService.selectImage(currentIndex, true);

      beforeRecognition();
      ImageService.handleImageProcessing(response, currentIndex);
    });
  };

  const forms = document.querySelectorAll(".receipt-ocr_file-select-block_inputs");
  if (!forms || !forms.length) return;

  forms.forEach(form => form.addEventListener("submit", handler));
}
