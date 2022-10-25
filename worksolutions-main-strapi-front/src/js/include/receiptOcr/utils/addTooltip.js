import { createPopper } from "@popperjs/core";

export function addTooltip(node) {
  const tooltip = document.createElement("div");
  tooltip.innerHTML = "Не удалось получить изображение. Проверьте правильность указанной ссылки";
  tooltip.classList.add("receipt-ocr_tooltip");
  tooltip.setAttribute("role", "tooltip");
  const arrow = document.createElement("div");
  arrow.classList.add("receipt-ocr_tooltip_arrow");
  arrow.setAttribute("data-popper-arrow", "");
  tooltip.append(arrow);
  document.body.append(tooltip);

  if (!node.offsetParent) return;
  createPopper(node, tooltip, {
    placement: "top",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 8],
        },
      },
      {
        name: "flip",
        options: {
          fallbackPlacements: ["top"],
        },
      },
    ],
  });
}
