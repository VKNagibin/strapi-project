export function getMaxHeightListElement(selector) {
  let maxElementHeight = 0;
  $(selector).each(function() {
    const elementHeight = $(this).outerHeight();
    if (elementHeight > maxElementHeight) {
      maxElementHeight = elementHeight;
    }
  });
  return maxElementHeight;
}

export function getMaxHeightListHiddenElement(selector) {
  const elements = document.querySelectorAll(selector);
  const maxElementHeight = [];
  elements.forEach(function(el) {
    if (el.scrollHeight === 0) {
      el.style.display = "block";
      el.style.height = "auto";
      setTimeout(() => {
        maxElementHeight.push(el.scrollHeight);
        el.style.removeProperty("display");
        el.style.removeProperty("height");
      }, 100);
    }
    if (el.scrollHeight > 0) {
      maxElementHeight.push(el.scrollHeight);
    }
  });
  return Math.max.apply(null, maxElementHeight);
}

export function isIos() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

export function isAndroid() {
  return navigator.userAgent.toLowerCase().indexOf("android") !== -1;
}

export function createPictureElementWithFallback(primaryImageUrl, fallbackImageUrl, imageAttributes) {
  const $picture = $(`
    <picture>
        <source srcset="${primaryImageUrl}" type="image/webp">
    </picture>
  `)

  const $fallbackImage = $('<img>').attr({
    ...imageAttributes,
    src: fallbackImageUrl,
  });

  return $picture.append($fallbackImage);
}

export function isAnyPartOfElementInViewport(el, offsetTop = 0) {
  const rect = el.getBoundingClientRect();
  // DOMRect { x: 8, y: 8, width: 100, height: 100, top: 8, right: 108, bottom: 108, left: 8 }
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  // http://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap
  const vertInView = rect.top <= windowHeight + offsetTop && rect.top + rect.height >= 0;
  const horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;

  return vertInView && horInView;
}

export function declOfNum(number, titles) {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
}

export function preventDefault(func) {
  return function(ev) {
    if (ev) {
      ev.preventDefault();
    }
    func && func(ev);
  };
}

export function stringConcat(strings) {
  return strings.reduce((acc, string) => acc + string, "");
}

export function addSpaceToEnd(word) {
  if (word.endsWith(" ")) return word;
  return word + " ";
}

export function clearInputValue($elem) {
  $elem.val("");
}

export function splitStringBySpace(string) {
  return string.split(" ");
}

export function interrupt(iterable, callback) {
  for (let i = 0; i < iterable.length; i++) {
    if (callback(iterable[i])) break;
  }
}

export function promisifyCallbackFirst(f) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      function callback(err, result) {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      }
      f.call(this, callback, ...args);
    });
  };
}

export function insertHTML(position, parentElem, childHtml) {
  return parentElem.insertAdjacentHTML(position, childHtml);
}

export function nextIndex(index) {
  return index + 1;
}

export function getFullUrl(baseUrl, endpoint) {
  const deslashedBaseUrl = baseUrl.replace(/[/\s]*$/, "");
  const deslashedEndpoint = endpoint.replace(/^[/\s]*/, "");
  return `${deslashedBaseUrl}/${deslashedEndpoint}`
}