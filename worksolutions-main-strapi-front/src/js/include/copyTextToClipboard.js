export default function(textForCopy) {
  const $body = $(document.body);
  const $textarea = $("<textarea/>");

  $body.append($textarea);
  $textarea.val(textForCopy);
  $textarea.select();
  document.execCommand("copy");
  $textarea.remove();
}
