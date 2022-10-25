export default function() {
  const pageTypesInputs = document.querySelectorAll(`[data-type="page_type"]`);
  pageTypesInputs.forEach(pageTypesInput => (pageTypesInput.value = window.location.href));
}
