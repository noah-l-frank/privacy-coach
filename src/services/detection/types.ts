// globalPrivacyControl is not yet included in TypeScript's Navigator type
export type NavigatorWithGPC = Navigator & {
  globalPrivacyControl?: boolean
}

export type DetectionResult = {
  browserFamily: string
  browser: string
  os: string
  gpc: boolean
  cookiesEnabled: boolean
  https: boolean,
  fingerprintingExposure: FingerprintingExposure
}

export type FingerprintingExposure = {
  deviceMemory: boolean
  hardwareConcurrency: boolean
  webGl: boolean
  canvas: boolean
  audioContext: boolean
  screen: boolean
  timezone: boolean
  languages: boolean
  platform: boolean
  touchSupport: boolean
}
