export function isDesktopDevice(): boolean {
  const ua = navigator.userAgent || ''
  const hasTouch = navigator.maxTouchPoints > 0
  const finePointer = window.matchMedia('(pointer: fine)').matches
  const hover = window.matchMedia('(hover: hover)').matches
  const wideScreen = window.innerWidth >= 1024

  const mobileOrTabletUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)

  const ipadPretendingToBeMac = /Macintosh/i.test(ua) && hasTouch

  if (mobileOrTabletUA || ipadPretendingToBeMac) return false

  return finePointer && hover && wideScreen
}
