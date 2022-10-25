class ImageStore {
  constructor() {
    this.imagesUrl = [];
    this.currentImageIndex = 0;
    this.products = new Map(); // i => массив прдуктов в чеке для каждой i-той картинки
    this.receiptResults = []; // результат для каждого чека(время покупки, общая стоймость)
    this.recognized = []; // изображение уже было распознано?
    this.loading = []; // изображение в текущий момент загружается на сервер/обрабатывается?
    this.imageUploadedInImageView = false; // изображение уже загружено в MainImage или показываем песочные часы
    this.statusText = ""; // текст под крутилкой
  }

  setCurrentImageIndex(index) {
    this.currentImageIndex = index;
  }

  setIndexOfLastImage() {
    this.currentImageIndex = this.imagesUrl.length - 1;
  }

  setStatusText(statusText) {
    this.statusText = statusText;
  }
}

export default ImageStore;
