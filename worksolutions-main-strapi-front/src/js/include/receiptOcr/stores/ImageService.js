import ImageStore from "./ImageStore";
import blobToFile from "../utils/blobToFile";
import { nanoid } from "nanoid";
import imageApi from "../api/imageApi";
import assocProcessingStatus from "../utils/assocProcessingStatus";
import { renderResults, renderStatusText } from "../handlers/renderResults";
import { paintSelectedImage } from "../handlers/previewImages";
import { setMainImage } from "../handlers/mainImage";
import { afterRecognition, beforeRecognition } from "../handlers/selectFileBlock";

class ImageService {
  constructor(imageStore) {
    this.imageStore = imageStore;
  }

  startLoading() {
    this.imageStore.statusText = "Загрузка изображения";
    this.imageStore.imageUploadedInImageView = false;
  }

  //Получить результаты чека(время, сумма) для текущего изображения
  getCurrentReceiptResult() {
    return this.imageStore.receiptResults[this.imageStore.currentImageIndex] || {};
  }

  //Получить список товаров для текущего изображения
  getCurrentProducts() {
    return this.imageStore.products.get(this.imageStore.currentImageIndex) || [];
  }

  //Видна ли крутилка для текущего изображения
  isLoaderVisibleForCurrentImage() {
    return this.imageStore.loading[this.imageStore.currentImageIndex] || !this.imageStore.imageUploadedInImageView;
  }

  isResultEmpty() {
    return (
      this.getCurrentProducts().length === 0 &&
      !this.getCurrentReceiptResult().purchase_date &&
      !this.getCurrentReceiptResult().purchase_time
    );
  }

  //Добавляет пресет с предзагруженными данными или просто картинку без предзагруженных данных
  addPreset(image, preloadedData) {
    this.imageStore.imageUploadedInImageView = false;
    this.imageStore.imagesUrl.push(image);
    this.imageStore.loading.push(false);

    if (!preloadedData) {
      this.imageStore.recognized.push(false);
      this.imageStore.receiptResults.push({ purchase_date: "", purchase_time: "", total: "" });
      this.imageStore.imageUploadedInImageView = true;
      return;
    }

    const lastIndex = this.imageStore.imagesUrl.length - 1;
    this.imageStore.receiptResults[lastIndex] = preloadedData.receiptResults;
    this.imageStore.recognized.push(true);
    this.imageStore.receiptResults.push(preloadedData.receiptResults);
    this.imageStore.products.set(lastIndex, preloadedData.products);

    this.imageStore.imageUploadedInImageView = true;
  }

  // происходит при выборе изображения
  selectImage(imageIndex, ignoreRecognizing) {
    this.imageStore.setCurrentImageIndex(imageIndex);
    if (!ignoreRecognizing && !this.imageStore.recognized[imageIndex] && !this.imageStore.loading[imageIndex]) {
      beforeRecognition();
      const selectedImage = this.imageStore.imagesUrl[imageIndex];
      if (!selectedImage) return;

      this.imageStore.loading[imageIndex] = true;
      this.imageStore.setStatusText("Загрузка изображения");
      renderStatusText();

      fetch(selectedImage)
        .then(res => res.blob())
        .then(blob => blobToFile(blob, nanoid()))
        .then(file => this.uploadFile(file, imageIndex));
    } else {
      this.imageStore.setCurrentImageIndex(imageIndex);
    }
    renderResults();
    setMainImage();
    paintSelectedImage();
  }

  uploadFile(file, fileIndex) {
    const processingIndex = fileIndex === undefined ? this.imageStore.currentImageIndex : fileIndex;
    this.imageStore.loading[processingIndex] = true;

    try {
      this.imageStore.setStatusText("Загрузка изображения");
      imageApi.uploadReceipt(file).then(response => {
        this.handleImageProcessing(response, processingIndex);
      });
    } catch (e) {
      this.imageStore.loading[processingIndex] = false;
      throw e;
    }
  }

  handleImageProcessing(response, processingIndex) {
    this.imageStore.setStatusText(assocProcessingStatus(response.data.status));
    renderStatusText();
    const receiptId = response.data.id;

    const intervalId = setInterval(() => {
      imageApi.getReceipt(receiptId).then(response => {
        this.imageStore.setStatusText(
          processingIndex === this.imageStore.currentImageIndex
            ? assocProcessingStatus(response.data.status)
            : this.imageStore.statusText,
        );
        renderStatusText();

        if (response.data.status === "COMPLETED") {
          clearInterval(intervalId);
          this.imageStore.products.set(processingIndex, response.data.receipt_data.products);
          const { purchase_time, purchase_date, total } = response.data.receipt_data;
          this.imageStore.receiptResults[processingIndex] = { purchase_date, purchase_time, total };
          this.imageStore.loading[processingIndex] = false;
          this.imageStore.recognized[processingIndex] = true;
          afterRecognition();
          renderResults();
        }
      });
    }, 500);
  }
}

export default new ImageService(new ImageStore());
