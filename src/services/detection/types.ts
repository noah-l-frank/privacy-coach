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
  https: boolean
}
