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
  effort: 'easy' | 'medium' | 'advanced'
}

export function generateRecommendations(
  result: DetectionResult,
  answers: Record<string, string>,
): Recommendation[] {
  const recommendations: Recommendation[] = []

  const similarity = answers.browser_switch_similarity ?? 'medium'
  const cookiePreference = answers.cookie_preference ?? 'balanced'

  const browser = result.browser.toLowerCase()

  if (browser.includes('chrome') && cookiePreference === 'privacy') {
    if (similarity === 'low') {
      recommendations.push({
        id: 'switch-to-firefox',
        title: 'Switch to a privacy-focused browser',
        description:
          'Since privacy is important to you and you do not mind a different look and feel, consider switching to Firefox for stronger built-in privacy protections.',
        effort: 'medium',
      })
    }

    if (similarity === 'high') {
      recommendations.push({
        id: 'switch-to-brave',
        title: 'Consider a more private Chromium-based browser',
        description:
          'Since you prefer a familiar experience, you might consider a privacy-focused Chromium browser like Brave, which offers better default privacy settings than Chrome.',
        effort: 'easy',
      })
    }
  }

  if (browser.includes('firefox') && cookiePreference === 'privacy') {
    recommendations.push({
      id: 'optimize-firefox',
      title: 'Optimize your Firefox privacy settings',
      description:
        'You are already using Firefox. Reviewing its privacy settings can further improve your protection.',
      effort: 'easy',
    })
  }

  if (!result.dnt && answers.dnt_preference === 'high') {
    recommendations.push({
      id: 'enable-dnt',
      title: 'Enable Do Not Track',
      description:
        'Since tracking protection is important to you, consider enabling Do Not Track in your browser settings.',
      effort: 'easy',
    })
  }

  if (result.cookiesEnabled && cookiePreference === 'privacy') {
    recommendations.push({
      id: 'reduce-cookies',
      title: 'Reduce cookie and tracking exposure',
      description:
        'Since privacy is important to you, consider reducing tracking and third-party cookie usage in your browser.',
      effort: 'medium',
    })
  }

  return recommendations
}
