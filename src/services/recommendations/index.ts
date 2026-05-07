import type { DetectionResult } from '@/services/detection'
import type { Recommendation } from './types'
import { recommendationContent } from './recommendationContent'

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
      recommendations.push(recommendationContent.switch_to_firefox)
    }

    if (similarity === 'high') {
      recommendations.push(recommendationContent.switch_to_brave)
    }
  }

  if (browser.includes('firefox') && privacyPreference === 'privacy') {
    recommendations.push(recommendationContent.optimize_firefox)
  }

  if (!result.gpc && answers.tracking_protection_preference === 'high') {
    recommendations.push(recommendationContent.enable_gpc)
  }

  if (result.cookiesEnabled && privacyPreference === 'privacy') {
    recommendations.push(recommendationContent.reduce_cookies)
  }

  if (isPrivacyFocused && answers.adblock_usage === 'no') {
    recommendations.push(recommendationContent.use_adblock)
  }

  if (
    isPrivacyFocused &&
    answers.password_management &&
    answers.password_management !== 'manager'
  ) {
    recommendations.push(recommendationContent.use_password_manager)
  }

  if (privacyPreference === 'privacy' && answers.vpn_usage === 'no') {
    recommendations.push(recommendationContent.use_vpn)
  }

  return recommendations
}
