function animateFirstTurn(elements) {
  const elementsLength = elements.length;
  let count = 0;

  function animateElement() {
    if (count === elementsLength) return;
    elements[count].classList.add("showed");
    count++;
    setTimeout(() => {
      animateElement();
    }, 100);
  }

  animateElement();
}

export default function() {
  const firstTurn = document.querySelectorAll("[data-first-animate]");
  const secondTurn = document.querySelectorAll("[data-first-fade]");

  setTimeout(() => animateFirstTurn(firstTurn), 100);
  setTimeout(() => animateFirstTurn(secondTurn), 400);
}
