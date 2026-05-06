export function isDesktopDevice(): boolean {
  const ua = navigator.userAgent

  const hasTouch = navigator.maxTouchPoints > 0
  const finePointer = window.matchMedia('(pointer: fine)').matches
  const hover = window.matchMedia('(hover: hover)').matches

  const isMobileOrTablet = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)

  const ipadPretendingToBeMac = /Macintosh/i.test(ua) && hasTouch

  if (isMobileOrTablet || ipadPretendingToBeMac) {
    return false
  }

  return finePointer && hover
}
