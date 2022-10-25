export default class CanvasController {
  constructor(canvas) {
    this.canvas = canvas;
  }

  setWidth(width) {
    this.canvas.width = width;
  }

  setHeight(height) {
    this.canvas.height = height;
  }

  toDataURL(type, quality) {
    return this.canvas.toDataURL(type, quality);
  }

  get2DContext() {
    return this.canvas.getContext("2d");
  }
}

export function createCanvasController() {
  const canvas = document.createElement("canvas");
  return new CanvasController(canvas);
}
