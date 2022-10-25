import { clearInputValue, nextIndex, preventDefault } from "../utils";
import { addToUrlQueryParams, convertObjectToQuery } from "../utils/addToUrlQueryParams";
import { UrlManager } from "../url/UrlManager";

const urlGeneratePostcard = "/eight-march/generate";

const $inputName = $(`[data-type="name-for-postcard"]`);
const $submitButton = $("[data-submit-button]");

let inputValue = "";

function beforeRequest() {
  inputValue = $inputName.val().trim();
  $inputName.prop("disabled", true);
  $submitButton.prop("disabled", true);
}

function validationRequest(requestCallback) {
  return () => {
    if ($inputName.val().trim() === "") {
      $inputName.addClass("error");
      clearInputValue($inputName);
      return;
    }
    $inputName.removeClass("error");

    return requestCallback();
  };
}

function afterRequest() {
  clearInputValue($inputName);
}

function successCallback({ hash }) {
  afterRequest();

  const urlManager = UrlManager.createInstance();
  const foundIndex = urlManager.findPath("neuro-march");
  let replacedPathIndex;

  if (!urlManager.paths[nextIndex(foundIndex)]) {
    replacedPathIndex = urlManager.paths.length;
  } else {
    replacedPathIndex = urlManager.paths.length - 1;
  }

  urlManager.setPathByIndex(hash, replacedPathIndex);
}

function errorCallback(e) {
  console.log(e);
}

function postData() {
  beforeRequest();
  const params = { name: inputValue };
  $.post(addToUrlQueryParams(urlGeneratePostcard, convertObjectToQuery(params)))
    .done(successCallback)
    .fail(errorCallback);
}

export default function() {
  const $form = $("[data-generate]");

  $form.submit(preventDefault(validationRequest(postData)));
}
