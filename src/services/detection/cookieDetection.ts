export type CookieSettings = {
  cookiesEnabled: boolean
  firstPartyCookieWritable: boolean
  sessionCookieWritable: boolean
  persistentCookieWritable: boolean
}

export function detectCookieSettings(): CookieSettings {
  return {
    cookiesEnabled: navigator.cookieEnabled,
    firstPartyCookieWritable: canWriteCookie('privacy_coach_first_party', '1'),
    sessionCookieWritable: canWriteCookie('privacy_coach_session', '1'),
    persistentCookieWritable: canWritePersistentCookie('privacy_coach_persistent', '1'),
  }
}

function canWriteCookie(name: string, value: string): boolean {
  document.cookie = `${name}=${value}; SameSite=Lax; path=/`

  const exists = document.cookie.includes(`${name}=${value}`)

  document.cookie = `${name}=; Max-Age=0; SameSite=Lax; path=/`

  return exists
}

function canWritePersistentCookie(name: string, value: string): boolean {
  document.cookie = `${name}=${value}; Max-Age=3600; SameSite=Lax; path=/`

  const exists = document.cookie.includes(`${name}=${value}`)

  document.cookie = `${name}=; Max-Age=0; SameSite=Lax; path=/`

  return exists
}
