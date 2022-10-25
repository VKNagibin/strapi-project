import { promisifyCallbackFirst } from "../utils";

export function getImageInstanceBySrc(imageSrc) {
  const image = new Image();
  image.src = imageSrc;
  return image;
}

function onLoadImage(callback, src) {
  const image = getImageInstanceBySrc(src);
  image.crossOrigin = "*";

  image.onload = () => callback(null, image);
  image.onerror = () => callback(new Error(`Image load error for ${src}`));
}

export const loadImage = promisifyCallbackFirst(onLoadImage);
