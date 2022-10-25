import { promisifyCallbackFirst } from "../utils";

function onLoadScript(callback, src) {
  let script = document.createElement("script");
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.body.insertAdjacentElement("beforeend", script);
}

export const loadScript = promisifyCallbackFirst(onLoadScript);
