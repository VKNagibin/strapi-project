import Prism from "prismjs";
import getLoader from "prismjs/dependencies";
import components from "prismjs/components";

export const DEFAULT_LANGUAGE = "plaintext";

class PrismLanguages {
  get languages() {
    return Object.keys(Prism.languages);
  }

  constructor() {
    this._internalInit();
  }

  getLanguageByTest(text) {
    return this.languages.find(language => text === language);
  }

  _internalInit() {
    this._loadLanguages(["php"]);
  }

  _loadLanguages(componentsToLoad) {
    getLoader(components, componentsToLoad, []).load(id => require(`prismjs/components/prism-${id}.min.js`));
  }
}

export const prismLanguages = new PrismLanguages();
