import { DEFAULT_LANGUAGE, prismLanguages } from "./PrismLanguages";
import Prism from "prismjs";

const DATA_CODE_SUBSTR = "data-code-";
const DATA_LANGUAGE = "data-language-text";

const brRegExp = /<br ?\/?>/g;
const carryover = "\n";

const rightArrowRegExp = /&gt;/g;
const rightArrow = ">";

const leftArrowRegExp = /&lt;/g;
const leftArrow = "<";

function findBlockCodeElements() {
  return document.querySelectorAll("pre code");
}

const htmlCodeFormat = innerHTML =>
  innerHTML
    .replace(brRegExp, carryover)
    .replace(rightArrowRegExp, rightArrow)
    .replace(leftArrowRegExp, leftArrow);

const getLanguage = element => prismLanguages.getLanguageByTest(element.className.replace(DATA_CODE_SUBSTR, ""));

const setLanguageAttribute = (element, language) =>
  element.setAttribute(DATA_LANGUAGE, (language || DEFAULT_LANGUAGE).toUpperCase());

export default function() {
  findBlockCodeElements().forEach(element => {
    const language = getLanguage(element);
    setLanguageAttribute(element, language);
    if (!language) return;

    element.innerHTML = Prism.highlight(htmlCodeFormat(element.innerHTML), Prism.languages[language], language);
  });
}
