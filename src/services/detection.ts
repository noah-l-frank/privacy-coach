type DetectionResult = {
  browser: string
  os: string
  language: string
  timezone: string
  dnt: boolean
  cookiesEnabled: boolean
  https: boolean
  adblock: boolean
}

export function detectEnvironment(): DetectionResult {
  const userAgent = navigator.userAgent.toLowerCase()

  let browser = 'unknown'
  if (userAgent.includes('firefox')) browser = 'firefox'
  else if (userAgent.includes('chrome') || userAgent.includes('chromium')) browser = 'chromium'

  let os = 'unknown'
  if (userAgent.includes('win')) os = 'windows'
  else if (userAgent.includes('mac')) os = 'macos'
  else if (userAgent.includes('linux')) os = 'linux'

  const language = navigator.language
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const dnt = navigator.doNotTrack === '1'
  const cookiesEnabled = navigator.cookieEnabled
  const https = window.location.protocol === 'https:'

  const adblock = false // TODO: Implement adblock detection logic

  return {
    browser,
    os,
    language,
    timezone,
    dnt,
    cookiesEnabled,
    https,
    adblock,
  }
}
