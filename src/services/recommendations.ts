export type DetectionResult = {
  browserFamily: string
  browser: string
  os: string
  language: string
  timezone: string
  dnt: boolean
  cookiesEnabled: boolean
  https: boolean
  adblock: boolean
}

export type Recommendation = {
  id: string
  title: string
  description: string
}

export function generateRecommendations(
  result: DetectionResult,
  answers: Record<string, string>,
): Recommendation[] {
  const recommendations: Recommendation[] = []

  const similarity = answers.browser_switch_similarity ?? 'medium'
  const cookiePreference = answers.cookie_preference ?? 'balanced'

  if (result.browser === 'chrome' && cookiePreference === 'privacy') {
    if (similarity === 'low') {
      recommendations.push({
        id: 'switch-to-firefox',
        title: 'Switch to a privacy-focused browser',
        description:
          'Since privacy is important to you and you do not mind a different look and feel, consider switching to Firefox for stronger built-in privacy protections.',
      })
    }

    if (similarity === 'high') {
      recommendations.push({
        id: 'switch-to-brave',
        title: 'Consider a more private Chromium-based browser',
        description:
          'Since you prefer a familiar experience, you might consider a privacy-focused Chromium browser like Brave, which offers better default privacy settings than Chrome.',
      })
    }
  }

  return recommendations
}
