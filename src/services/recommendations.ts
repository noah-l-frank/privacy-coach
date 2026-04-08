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

export function generateRecommendations(result: DetectionResult): Recommendation[] {
  const recommendations: Recommendation[] = []

  if (result.browser === 'chrome') {
    recommendations.push({
      id: 'chrome-privacy',
      title: 'Consider a more privacy-focused browser',
      description:
        'Google Chrome is convenient and widely used, but it is less privacy-friendly than some alternatives.',
    })
  }

  if (result.browser === 'edge') {
    recommendations.push({
      id: 'edge-privacy',
      title: 'Review Microsoft Edge privacy settings',
      description:
        'Microsoft Edge includes tracking prevention features, but some settings may still share data with Microsoft services.',
    })
  }

  if (result.browser === 'firefox') {
    recommendations.push({
      id: 'firefox-privacy',
      title: 'Check Firefox privacy protections',
      description:
        'Firefox already offers strong privacy features. Reviewing its privacy settings can further improve protection.',
    })
  }

  return recommendations
}
