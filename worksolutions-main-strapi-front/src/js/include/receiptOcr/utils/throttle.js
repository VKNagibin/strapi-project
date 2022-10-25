export default function throttle(fn, ms) {
  let isCooldown = false;

  return function(...args) {
    if (isCooldown) return;

    fn.apply(args);

    isCooldown = true;

    setTimeout(() => (isCooldown = false), ms);
  };
}
