// globalPrivacyControl is not yet included in TypeScript's Navigator type
export type NavigatorWithGPC = Navigator & {
  globalPrivacyControl?: boolean
}

export type DetectionResult = {
  browserFamily: string
  browser: string
  os: string
  deviceType?: DeviceType
  gpc: boolean
  cookiesEnabled: boolean
  https: boolean
  fingerprintingExposure: FingerprintingExposure
  fingerprintingProtection?: FingerprintingProtection
  cookieSettings: CookieSettings
}

export type DeviceType = 'desktop' | 'mobile' | 'tablet' | 'unknown'

export type FingerprintingRiskLevel = 'low' | 'medium' | 'high'

export type FingerprintingProtectionStatus = 'likely-active' | 'not-detected' | 'inconclusive'

export type FingerprintingProtectionSignals = {
  canvasNoise: boolean
  hardwareConcurrencyBucketed: boolean
  touchPointsBucketed: boolean
  screenDimensionsStandardized: boolean
}

export type FingerprintingProtection = {
  status: FingerprintingProtectionStatus
  signals: FingerprintingProtectionSignals
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

export type CookieSettings = {
  cookiesEnabled: boolean
  firstPartyCookieWritable: boolean
  persistentCookieWritable: boolean
  sessionCookieWritable: boolean
  thirdPartyCookieStatus?: ThirdPartyCookieStatus
}

export type ThirdPartyCookieStatus = 'likely-allowed' | 'likely-blocked' | 'unknown'
