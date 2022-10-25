const TABLET_MAX = 767;
const PRE_MID_DESKTOP_MAX = 1264;

export function isDesktopScreen() {
  return window.innerWidth > TABLET_MAX;
}

export function isPreMidDesktopScreen() {
  return isDesktopScreen() && window.innerWidth < PRE_MID_DESKTOP_MAX;
}