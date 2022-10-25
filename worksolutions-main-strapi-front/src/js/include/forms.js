import Inputmask from "inputmask";
import autosize from "autosize";

import { openModal, closeModal } from "./modal";
import { getFullUrl } from "./utils";

const REQUEST_COLLECTION_ENDPOINT = "/api/requests";
const REQUEST_COLLECTION_URL = getFullUrl(process.env.API_HOST, REQUEST_COLLECTION_ENDPOINT);
const REQUEST_COLLECTION_MEDIA_FIELD_NAME = "attachedFiles";

let inputCounter = 0; // счетчик полей для прикрепления файлов
const $body = $("body");
const $btnAttach = $(".form__attach-btn");

function createAttachmentContent(filename, fileExtension, fileSize) {
  return `
		<button class="attachment__del close-button">
				<span class="visually-hidden">Удалить прикрепленный файл</span>
				<svg class="icon-block" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.1224 12.0012L24.0023 2.12132L21.8809 0L12.0011 9.87987L2.12132 0.000121355L0 2.12144L9.87975 12.0012L0 21.8809L2.12132 24.0023L12.0011 14.1225L21.8809 24.0024L24.0023 21.8811L14.1224 12.0012Z" fill="inherit"></path>
				</svg>
			</button>
			<div class="attachment__filename">${filename}</div>
			<div class="attachment__info">
				<span class="attachment__extension">${fileExtension}</span>
				<span class="attachment__size">${fileSize}</span>
			</div>
	`;
}

function formatFileSize(fileSize) {
  let formattedFileSize;

  if (fileSize / 1024 < 1024) {
    formattedFileSize = Math.round(parseFloat(fileSize / 1024)) + "кб";
  } else if (fileSize / 1024 > 1024 * 20) {
    formattedFileSize = "> 20мб";
  } else {
    formattedFileSize = Math.round(parseFloat(fileSize / (1024 * 1024))) + "мб";
  }
  return formattedFileSize;
}

function handleFileSelectMulti(e) {
  if (e.target.value === "") {
    return; // IE fix
  }
  const $attachContainer = $(e.target).closest(".form__attach-container");
  if (!$attachContainer.length) {
    return;
  }

  let files = e.target.files;
  for (let i = 0, f; (f = files[i]); i++) {
    let filename = files[i].name;
    let fileExtencionArr = filename.split(".");
    let fileExtencion = fileExtencionArr[fileExtencionArr.length - 1];
    let shortFilename = fileExtencionArr.slice(0, fileExtencionArr.length - 1).join(".");
    let fileSize = formatFileSize(files[i].size);

    let attachmentContent = createAttachmentContent(shortFilename, fileExtencion, fileSize);
    let $attachmentBlock = $("<div>")
      .addClass("attachment")
      .attr("data-input", "file" + inputCounter)
      .html(attachmentContent);

    $attachContainer.append($attachmentBlock);
    let newInp = $("<input>")
      .addClass("form__file")
      .attr({
        type: "file",
        name: "file" + (inputCounter + 1),
      });
    $attachContainer.append(newInp);
    inputCounter++;
  }
}

function deleteAttachedFile(e) {
  e.preventDefault();
  let nameInputToClear = $(e.target)
    .closest(".attachment")
    .attr("data-input");
  let inputToClear = $(e.target)
    .closest(".form__attach-container")
    .find("[name=" + nameInputToClear + "]");
  inputToClear.val("");
  $(e.target)
    .closest(".attachment")
    .remove();
  $(".attachment").removeClass("error");
  $(".form__error-text").remove();
}

function isInputValid(input) {
  function isEmailValid(target) {
    const regMail = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/i;
    return !!target.val().match(regMail);
  }

  function isPhoneValid(target) {
    return target[0].inputmask && target[0].inputmask.unmaskedvalue().length === 10;
  }

  const inputType = input.attr("data-type");
  switch (inputType) {
    case "email":
      return isEmailValid(input);

    case "phone":
      return isPhoneValid(input);

    default:
      return input.val().trim().length > 0;
  }
}

export function validateInput(input, thisSubmitAction = false) {
  const $field = input.closest(".form__field");

  if (!thisSubmitAction && input.val() === "") {
    input.removeClass("error");
    input.next(".form__error-text").remove();
    return;
  }

  if (!isInputValid(input)) {
    closePromptAlert();
    input.addClass("error");
    const inputType = input.attr("data-type");
    let errorTextList = {
      email: "Введите корректный email",
      phone: "Введите корректный номер телефона",
    };

    let errorText = inputType ? errorTextList[inputType] : "Заполните это поле";

    if (!$field.find(".form__error-text").length) {
      const $errorBlock = $("<div>")
        .addClass("form__error-text")
        .text(errorText);
      $field.append($errorBlock);
    }
  } else {
    input.removeClass("error");
    input.next(".form__error-text").remove();
  }
}

export function validateFilesSize(form) {
  let $filesForms = form.find(".form__file");
  const totalSize = $filesForms.toArray().reduce((accum, current) => accum + (current.files[0] ? current.files[0].size : 0), 0);
  const formattedFilesSize = Math.round(parseFloat(totalSize / (1024 * 1024)));
  const attachContainer = form.find(".form__attach-container");

  if (formattedFilesSize < 30) return;

  $(".attachment").addClass("error");

  if ($(attachContainer).next(".form__error-text").is(".form__error-text")) return;

  $("<div class='form__error-text'>Размер вложений не должен превышать 30 Мб</div>").insertAfter(attachContainer);
}

function isFormValid(form) {
  let $requiredFields = form.find("[data-required]");
  $requiredFields.each(function() {
    validateInput($(this), true);
  });
  validateFilesSize(form);

  return form.find(".error").length === 0;
}

function addClass(selector, className) {
  if (selector.hasClass(className)) return;
  selector.addClass(className);
}

function removeClass(selector, className) {
  if (!selector.hasClass(className)) return;
  selector.removeClass(className);
}

function showScreenSuccessSign() {
  const formElement = $(".sign-form__inner");
  const thanksBlockElement = $(".sign-form__block-with-thanks");
  const showClassName = "visible-block";

  removeClass(formElement, showClassName);
  addClass(thanksBlockElement, showClassName);
}

function parseFormData(form) {
  const formData = new FormData();
  const formElements = form.elements;

  const data = {
    timestamp: new Date().toISOString(),
    sourceUrl: window.location.href,
  };

  for (const formElement of formElements) {
    if (formElement.type === "submit") continue;

    if (formElement.type === "file") {
      for (const file of formElement.files) {
        formData.append(`files.${REQUEST_COLLECTION_MEDIA_FIELD_NAME}`, file, file.name);
      }
    } else {
      data[formElement.name] = formElement.value;
    }
  }

  formData.append('data', JSON.stringify(data));
  return formData;
}

function submitForm($form) {
  const form = $form[0];
  const data = parseFormData(form);

  const $submitBtn = $form.find(".js-submit-btn");
  const $submitTextBlockDesktop = $submitBtn.find(".form__submit-text_desktop");
  const $submitTextBlockMobile = $submitBtn.find(".form__submit-text_mobile");
  const submitTextDesktop = $submitTextBlockDesktop.text();
  const submitTextMobile = $submitTextBlockMobile.text();
  const $modalResult = $(".modal_result");
  let resultText;
  let isSuccessSign;

  $.ajax({
    url: REQUEST_COLLECTION_URL,
    type: "POST",
    data,
    contentType: false,
    cache: false,
    processData: false,
    beforeSend: function() {
      $submitBtn.addClass("loading");
      $submitTextBlockDesktop.text("Отправка...");
      $submitTextBlockMobile.text("Отправка...");
    },
    success: function(data) {
      form.reset();
      resultText = "Спасибо за обращение!";
      isSuccessSign = true;

      if (!process.env.IS_PRODUCTION) return;

      const metricGoal = $form.attr("data-metric-goal");
      const yandexCounterId = $form.attr("data-yandex-counter-id");

      if (metricGoal) {
        ym(yandexCounterId, "reachGoal", metricGoal);
        gtag("event", metricGoal, {'event_category': 'conversion'});
      }
    },
    error: function(e) {
      resultText = "Произошла ошибка. Данные не были отправлены. Пожалуйста, попробуйте позже.";
      isSuccessSign = false;
    },
    complete: function() {
      inputCounter = 0;
      const $parentModal = $form.closest(".modal");
      if ($parentModal.length) {
        closeModal($parentModal, true);
      }

      const $fileInput = $form.find('[type="file"]');
      if ($fileInput.length) {
        $fileInput.val("");
      }
      $submitBtn.removeClass("loading");
      $submitTextBlockDesktop.text(submitTextDesktop);
      $submitTextBlockMobile.text(submitTextMobile);
      const $attachment = $form.find(".attachment");
      if ($attachment.length) {
        $attachment.remove();
      }

      if (isSuccessSign && form.dataset.type === "subscription") {
        showScreenSuccessSign();
        return;
      }

      $(".modal_result .modal__result-text").text(resultText);

      openModal($modalResult);
      setTimeout(function() {
        if ($modalResult.hasClass("visible")) {
          closeModal($modalResult);
          if (!$form.closest(".modal").length) {
            $form
              .find("input")
              .eq(0)
              .focus();
          }
        }
      }, 2000);
    },
  });
}

export function setPhoneMask() {
  let im = new Inputmask({ mask: "+7 (999) 999-99-99", inputmode: "tel" });
  let selector = document.querySelector('[data-type="phone"]');
  let estimatePhone = document.getElementById("estimate_phone");
  let resumePhone = document.getElementById("resume_phone");

  if (selector) {
    im.mask(selector);
  }
  if (estimatePhone) {
    im.mask(estimatePhone);
  }
  if (resumePhone) {
    im.mask(resumePhone);
  }
}

function closePromptAlert() {
  const $promptBlock = $(".form__prompt");
  const $promptText = $(".form__prompt-text");
  const $phoneInput = $(".form__phone-wrapper").find("input");

  $promptText.addClass("hidden");
  $promptText.on("transitionend", () => {
    $promptBlock.addClass("hidden");
    $phoneInput.addClass("hidden");
    setTimeout(() => {
      $promptBlock.remove();
    }, 150);
  });
}

export default function() {
  $btnAttach.on("click", function(e) {
    e.preventDefault();
    let $attachContainer = $(this)
      .closest("form")
      .find(".form__attach-container");
    $attachContainer
      .find(".form__file")
      .eq(inputCounter)
      .trigger("click");
  });

  $body.on("change", ".form__file", handleFileSelectMulti);
  $body.on("click", ".attachment__del", deleteAttachedFile);

  setPhoneMask();

  $(".form__form, .js-form").on("submit", function(e) {
    e.preventDefault();
    if (isFormValid($(this))) {
      submitForm($(this));
    }
  });

  $(".form__input").on("change", function() {
    validateInput($(this));
  });

  const $textarea = $(".form__textarea");
  if ($textarea.length) {
    autosize($(".form__textarea"));
  }

  const $promptBlock = $(".form__prompt");
  $promptBlock.on("click", closePromptAlert);
}
