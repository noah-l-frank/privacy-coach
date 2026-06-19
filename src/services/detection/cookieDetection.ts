import type { CookieSettings, ThirdPartyCookieStatus } from './types'

export function detectCookieSettings(browser = 'unknown'): CookieSettings {
  const cookiesEnabled = navigator.cookieEnabled

  return {
    cookiesEnabled,
    firstPartyCookieWritable: cookiesEnabled && canWriteCookie('privacy_coach_first_party'),
    sessionCookieWritable: cookiesEnabled && canWriteCookie('privacy_coach_session'),
    persistentCookieWritable: cookiesEnabled && canWritePersistentCookie('privacy_coach_persistent'),
    thirdPartyCookieStatus: detectThirdPartyCookieStatus(browser, cookiesEnabled),
  }
}

function detectThirdPartyCookieStatus(
  browser: string,
  cookiesEnabled: boolean,
): ThirdPartyCookieStatus {
  if (!cookiesEnabled) {
    return 'likely-blocked'
  }

  // First-party JavaScript cannot directly read the third-party cookie setting.
  // Use conservative browser-default signals and suppress recommendations for unknowns.
  if (['brave', 'firefox', 'safari'].includes(browser)) {
    return 'likely-blocked'
  }

  if (['chrome', 'edge', 'opera'].includes(browser)) {
    return 'likely-allowed'
  }

  return 'unknown'
}

function createCookieValue(): string {
  return `${Date.now()}_${Math.random().toString(36).slice(2)}`
}

function canWriteCookie(name: string): boolean {
  const value = createCookieValue()

  document.cookie = `${name}=${value}; SameSite=Lax; path=/`

  const exists = document.cookie.includes(`${name}=${value}`)

  document.cookie = `${name}=; Max-Age=0; SameSite=Lax; path=/`

  return exists
}

function canWritePersistentCookie(name: string): boolean {
  const value = createCookieValue()

  document.cookie = `${name}=${value}; Max-Age=3600; SameSite=Lax; path=/`

  const exists = document.cookie.includes(`${name}=${value}`)

  document.cookie = `${name}=; Max-Age=0; SameSite=Lax; path=/`

  return exists
}
