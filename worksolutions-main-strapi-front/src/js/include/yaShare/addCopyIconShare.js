import { insertHTML } from "../utils";
import copyTextToClipboard from "../copyTextToClipboard";
import { Tooltip } from "../tooltip";
import { timeCopyTooltipAppeared } from "../constants";

const copyIconHTML = `<li data-tooltip-text="Ссылка скопирована" class="copy-url" data-copy-url title="Скопировать ссылку"></li>`;

function copyHandlerFactory(copyElement) {
  let tooltip = null;

  return () => {
    if (tooltip) return;

    copyElement.setAttribute("data-copy", window.location.href);
    const textForCopy = copyElement.getAttribute("data-copy");

    copyTextToClipboard(textForCopy);

    tooltip = new Tooltip(copyElement, 5);

    if (tooltip) {
      setTimeout(() => {
        tooltip.removeTooltip();
        tooltip = null;
      }, timeCopyTooltipAppeared);
    }
  };
}

export default function() {
  const listShare = document.querySelector(".ya-share2__list_direction_horizontal");
  insertHTML("afterbegin", listShare, copyIconHTML);

  const copyElement = document.querySelector("[data-copy-url]");
  copyElement.addEventListener("click", copyHandlerFactory(copyElement));
}
