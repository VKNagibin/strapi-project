export class Tooltip {
  static get dataTooltip() {
    return "data-tooltip";
  }

  static get dataTooltipText() {
    return "data-tooltip-text";
  }

  constructor(targetElement, offset = 0) {
    this.tooltipText = targetElement.getAttribute(Tooltip.dataTooltipText);
    if (!this.tooltipText) return;

    this.targetElement = targetElement;
    this.coords = targetElement.getBoundingClientRect();
    this.tooltipElem = null;
    this.offset = offset;
    this.targetWidth = 0;
    this.tooltipWidth = 0;
    this.tooltipHeight = 0;
    this.init();
  }

  init() {
    this.createTooltip();
    this.setTooltipSize();
    this.setTargetSize();
    this.offsetTooltipHeight = this.tooltipHeight + this.offset;
    this.offsetTooltipWidth = (this.targetWidth - this.tooltipWidth) / 2;
    this.leftCoors();
    this.topCoords();
    this.setStyleTooltip();
  }

  isTouchesTopViewport() {
    return 0 > this.coords.top - this.offsetTooltipHeight;
  }

  isTouchesLeftViewport() {
    return 0 > this.coords.left + this.offsetTooltipWidth;
  }

  createTooltip() {
    this.tooltipElem = document.createElement("span");
    this.tooltipElem.setAttribute(Tooltip.dataTooltip, "");
    this.tooltipElem.innerHTML = this.tooltipText;
    document.body.append(this.tooltipElem);
  }

  setTooltipSize() {
    this.tooltipWidth = this.tooltipElem.offsetWidth;
    this.tooltipHeight = this.tooltipElem.offsetHeight;
  }

  setTargetSize() {
    this.targetWidth = this.targetElement.offsetWidth;
    this.targetHeight = this.targetElement.offsetHeight;
  }

  leftCoors() {
    if (this.isTouchesLeftViewport()) {
      this.left = 0;
      return;
    }
    this.left = this.getCoordsLeftFromPage() + this.offsetTooltipWidth;
  }

  topCoords() {
    if (this.isTouchesTopViewport()) {
      this.top = this.getCoordsTopFromPage() + this.targetHeight + this.offset;
      return;
    }

    this.top = this.getCoordsTopFromPage() - this.offsetTooltipHeight;
  }

  getCoordsTopFromPage() {
    return this.coords.top + pageYOffset;
  }

  getCoordsLeftFromPage() {
    return this.coords.left + pageXOffset;
  }

  setStyleTooltip() {
    this.tooltipElem.style.position = "absolute";
    this.tooltipElem.style.left = this.left + "px";
    this.tooltipElem.style.top = this.top + "px";
  }

  removeTooltip() {
    this.tooltipElem.remove();
    this.tooltipElem = null;
  }
}
