export function setBackgroundImage() {
  const wrapper = document.querySelector(".receipt-ocr-main-wrapper");
  if (!wrapper) return;

  wrapper.style.background = `url('../../i/receipt-ocr/background-img.jpg') center`;
  wrapper.style["background-size"] = "cover";
}
