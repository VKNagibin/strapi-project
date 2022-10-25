const easeOutCubic = t => --t * t * t + 1;

function clamp(value, min, max) {
  return Math.max(Math.min(max, value), min);
}

function lerp(v0, v1, t) {
  t = easeOutCubic(t);
  return v0 * (1 - t) + v1 * t;
}

export function runAutoMoving(deltaX, dragElement) {
  if (deltaX > -150 && deltaX < 150) return;
  deltaX = clamp(deltaX, -300, 300);
  let index = 0;
  const scale = 3;
  const currentPosition = dragElement.scrollLeft();
  function run() {
    let value = lerp(0, deltaX, index / 25) * scale;
    dragElement.scrollLeft(currentPosition + value);
    if (index === 24) return;
    index++;
    requestAnimationFrame(run);
  }
  run();
}

export function applyInertialScroll(element) {
  let startPosition = 0;

  element.on("mousedown touchstart", function() {
    startPosition = $(this).scrollLeft();
  })

  element.on("mouseup touchend touchcancel", function() {
    const finishPosition = $(this).scrollLeft();
    runAutoMoving(finishPosition - startPosition, $(this));
  });
}
