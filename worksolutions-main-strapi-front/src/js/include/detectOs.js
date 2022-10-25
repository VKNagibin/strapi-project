import { isAndroid, isIos } from "./utils";

const $html = $("html");

export default function() {
  if (isAndroid()) {
    $html.addClass("android");
  } else if (isIos()) {
    $html.addClass("ios");
  }
}
