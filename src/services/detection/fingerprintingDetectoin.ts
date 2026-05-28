import type { FingerprintingExposure } from './types'

// deviceMemory is currently not included in TypeScript's default Navigator type
type NavigatorWithDeviceMemory = Navigator & {
  deviceMemory?: number
}

export function detectFingerprintingExposure(): FingerprintingExposure {
  return {
    deviceMemory: typeof (navigator as NavigatorWithDeviceMemory).deviceMemory === 'number',

    hardwareConcurrency: typeof navigator.hardwareConcurrency === 'number',

    webGl: detectWebGlExposure(),

    canvas: detectCanvasExposure(),

    audioContext: detectAudioContextExposure(),

    screen: detectScreenExposure(),

    timezone: detectTimezoneExposure(),

    languages: Array.isArray(navigator.languages) && navigator.languages.length > 0,

    platform: typeof navigator.platform === 'string' && navigator.platform.length > 0,

    touchSupport: typeof navigator.maxTouchPoints === 'number',
  }
}

function detectWebGlExposure(): boolean {
  const canvas = document.createElement('canvas')

  return (
    canvas.getContext('webgl') !== null ||
    canvas.getContext('experimental-webgl') !== null
  )
}

function detectCanvasExposure(): boolean {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  return context !== null && typeof canvas.toDataURL === 'function'
}

function detectAudioContextExposure(): boolean {
  return 'AudioContext' in window || 'webkitAudioContext' in window
}

function detectScreenExposure(): boolean {
  return (
    typeof screen.width === 'number' &&
    typeof screen.height === 'number' &&
    typeof screen.colorDepth === 'number'
  )
}

function detectTimezoneExposure(): boolean {
  return typeof Intl.DateTimeFormat().resolvedOptions().timeZone === 'string'
}
