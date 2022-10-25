import { loadScript } from "../loadFiles/loadScripts";

const yaShareScriptLink = "https://yastatic.net/share2/share.js";

const errCallback = err => console.error(err);

export default function(fn) {
  loadScript(yaShareScriptLink).then(fn, errCallback);
}
