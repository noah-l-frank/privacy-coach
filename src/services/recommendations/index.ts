import type { DetectionResult } from '@/services/detection'
import type { Recommendation } from './types'

export function generateRecommendations(
  result: DetectionResult,
  answers: Record<string, string>,
): Recommendation[] {
  const recommendations: Recommendation[] = []

  const similarity = answers.browser_switch_similarity ?? 'medium'
  const privacyPreference = answers.privacy_preference
  const isPrivacyFocused = privacyPreference === 'privacy' || privacyPreference === 'balanced'

  const browser = result.browser.toLowerCase()

  if (browser.includes('chrome') && privacyPreference === 'privacy') {
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

  if (browser.includes('firefox') && privacyPreference === 'privacy') {
    recommendations.push({
      id: 'optimize-firefox',
      title: 'Optimize your Firefox privacy settings',
      description:
        'You are already using Firefox. Reviewing its privacy settings can further improve your protection.',
      effort: 'easy',
    })
  }

  if (!result.gpc && answers.tracking_protection_preference === 'high') {
    recommendations.push({
      id: 'enable-gpc',
      title: 'Enable Do Not Track',
      description:
        'Since tracking protection is important to you, consider enabling Do Not Track in your browser settings.',
      effort: 'easy',
    })
  }

  if (result.cookiesEnabled && privacyPreference === 'privacy') {
    recommendations.push({
      id: 'reduce-cookies',
      title: 'Reduce cookie and tracking exposure',
      description:
        'Since privacy is important to you, consider reducing tracking and third-party cookie usage in your browser.',
      effort: 'medium',
    })
  }

  if (isPrivacyFocused && answers.adblock_usage === 'no') {
    recommendations.push({
      id: 'use-adblock',
      title: 'Use an ad blocker',
      description:
        'An ad blocker can reduce tracking, improve privacy, and make browsing less distracting.',
      effort: 'easy',
    })
  }

  if (
    isPrivacyFocused &&
    answers.password_management &&
    answers.password_management !== 'manager'
  ) {
    recommendations.push({
      id: 'use-password-manager',
      title: 'Use a password manager',
      description:
        'A password manager helps you use strong, unique passwords and protects your accounts more effectively.',
      effort: 'easy',
    })
  }

  if (privacyPreference === 'privacy' && answers.vpn_usage === 'no') {
    recommendations.push({
      id: 'use-vpn',
      title: 'Use a VPN for better privacy',
      description:
        'A VPN can hide your IP address and protect your data, especially on public networks.',
      effort: 'advanced',
    })
  }

  return recommendations
}
