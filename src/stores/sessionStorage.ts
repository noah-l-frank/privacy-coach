export function readSessionValue<T>(key: string, fallback: T): T {
  if (typeof sessionStorage === 'undefined') return fallback

  const value = sessionStorage.getItem(key)

  if (!value) return fallback

  try {
    return JSON.parse(value) as T
  } catch {
    sessionStorage.removeItem(key)

    return fallback
  }
}

export function writeSessionValue(key: string, value: unknown) {
  if (typeof sessionStorage === 'undefined') return

  sessionStorage.setItem(key, JSON.stringify(value))
}

export function removeSessionValue(key: string) {
  if (typeof sessionStorage === 'undefined') return

  sessionStorage.removeItem(key)
}
