export type CookieSettings = {
  cookiesEnabled: boolean
  firstPartyCookieWritable: boolean
  sessionCookieWritable: boolean
  persistentCookieWritable: boolean
}

export function detectCookieSettings(): CookieSettings {
  const cookiesEnabled = navigator.cookieEnabled

  return {
    cookiesEnabled,
    firstPartyCookieWritable: cookiesEnabled && canWriteCookie('privacy_coach_first_party'),
    sessionCookieWritable: cookiesEnabled && canWriteCookie('privacy_coach_session'),
    persistentCookieWritable: cookiesEnabled && canWritePersistentCookie('privacy_coach_persistent'),
  }
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
