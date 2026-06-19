import type {
  FingerprintingExposure,
  FingerprintingProtection,
  FingerprintingProtectionSignals,
  FingerprintingProtectionStatus,
} from './types'

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

export function detectFingerprintingProtection(): FingerprintingProtection {
  const signals: FingerprintingProtectionSignals = {
    canvasNoise: detectCanvasReadbackNoise(),
    hardwareConcurrencyBucketed: detectHardwareConcurrencyBucket(),
    touchPointsBucketed: detectTouchPointBucket(),
    screenDimensionsStandardized: detectStandardizedScreenDimensions(),
  }

  return {
    status: classifyFingerprintingProtectionSignals(signals),
    signals,
  }
}

export function classifyFingerprintingProtectionSignals(
  signals: FingerprintingProtectionSignals,
): FingerprintingProtectionStatus {
  if (signals.canvasNoise) return 'likely-active'

  const weakSignalCount = [
    signals.hardwareConcurrencyBucketed,
    signals.touchPointsBucketed,
    signals.screenDimensionsStandardized,
  ].filter(Boolean).length

  if (weakSignalCount >= 3) return 'likely-active'
  if (weakSignalCount > 0) return 'inconclusive'

  return 'not-detected'
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

function detectCanvasReadbackNoise(): boolean {
  const firstRead = readDeterministicCanvas()
  const secondRead = readDeterministicCanvas()

  return firstRead !== null && secondRead !== null && firstRead !== secondRead
}

function readDeterministicCanvas(): string | null {
  const canvas = document.createElement('canvas')
  canvas.width = 220
  canvas.height = 48

  const context = canvas.getContext('2d')

  if (!context || typeof canvas.toDataURL !== 'function') return null

  context.fillStyle = '#102030'
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = '#f7f7f5'
  context.font = '18px Arial'
  context.fillText('Privacy Coach fingerprint probe', 8, 30)

  try {
    return canvas.toDataURL()
  } catch {
    return null
  }
}

function detectHardwareConcurrencyBucket(): boolean {
  const cores = navigator.hardwareConcurrency

  return typeof cores === 'number' && [4, 8].includes(cores)
}

function detectTouchPointBucket(): boolean {
  const touchPoints = navigator.maxTouchPoints

  return typeof touchPoints === 'number' && [0, 1, 5].includes(touchPoints)
}

function detectStandardizedScreenDimensions(): boolean {
  return (
    typeof screen.width === 'number' &&
    typeof screen.height === 'number' &&
    typeof screen.availWidth === 'number' &&
    typeof screen.availHeight === 'number' &&
    screen.width === screen.availWidth &&
    screen.height === screen.availHeight
  )
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
