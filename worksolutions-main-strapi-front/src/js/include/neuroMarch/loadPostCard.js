import { clearInputValue, stringConcat } from "../utils";
import { EVENT_FINISH_DRAW_POST_CARD, EVENT_FINISH_PROXY_IMAGE_POST_CARD } from "../constants";
import { UrlManager } from "../url/UrlManager";
import { drawPostcard } from "../drawPostcard";
import { addToUrlQueryParams, convertObjectToQuery } from "../utils/addToUrlQueryParams";

const urlGeneratePostcard = "/eight-march/postcard/";
const urlProxyPostcardImage = "/eight-march/proxy-postcard-image/";

const $inputName = $(`[data-type="name-for-postcard"]`);
const $resultImageContainer = $("[data-result-image-container]");
const $buttonSubmit = $("[data-submit-button]");
const $resultImageWrapper = $("[data-result-image-wrapper]");
const $preloaderResultImage = $("[data-preloader-result-image]");
const $postcard = $("[data-type-postcard]");
const $shareContainer = $("[data-share-container]");
const $title = $(".main-neuro-march__title");

function beforeRequest() {
  $buttonSubmit.addClass("loading");

  $preloaderResultImage.show();

  $postcard.hide();
}

function afterRequest() {
  $buttonSubmit.removeClass("loading");
  $resultImageWrapper.removeClass("load-image");

  $preloaderResultImage.hide();

  $postcard.show();

  clearInputValue($inputName);
}

export function successCallbackProxyImage(image) {
  dispatchEvent(new CustomEvent(EVENT_FINISH_PROXY_IMAGE_POST_CARD, { detail: { image } }));
}

export function successCallbackDrawPostcard(data) {
  $resultImageContainer.show();

  getImage(data.image);

  addEventListener(EVENT_FINISH_PROXY_IMAGE_POST_CARD, e => {
    drawPostcard({ ...data, image: e.detail.image });
  });

  addEventListener(EVENT_FINISH_DRAW_POST_CARD, afterRequest);
}

function failCallback(e) {
  console.log(e);
}
function errorCallback({ responseJSON }) {
  afterRequest();
  $shareContainer.hide();
  $title.hide();
  $resultImageWrapper.text(responseJSON && responseJSON.message ? responseJSON.message : "что-то пошло не так");
}

export default function() {
  const urlManager = UrlManager.createInstance();

  const splitPathName = urlManager.paths;
  const hash = splitPathName[splitPathName.length - 1];

  getData(hash);
}

function getData(hash) {
  beforeRequest();
  $.ajax({
    url: stringConcat([urlGeneratePostcard, hash]),
    error: errorCallback,
    success: successCallbackDrawPostcard,
  });
}

function getImage(imageUrl) {
  const params = { imageUrl };
  $.get(addToUrlQueryParams(urlProxyPostcardImage, convertObjectToQuery(params)))
    .done(successCallbackProxyImage)
    .fail(failCallback);
}
