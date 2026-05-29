import { describe, expect, it } from 'vitest'
import { recommendationContent } from '../../../recommendations/recommendationContent'
import { recommendationRules } from '../../../recommendations/recommendationRules'

describe('recommendationContent', () => {
  it('contains content for every recommendation rule', () => {
    const contentIds = Object.keys(recommendationContent)

    const ruleIds = recommendationRules.map((rule) => rule.recommendation)

    expect(contentIds.sort()).toEqual(ruleIds.sort())
  })

  it('provides title, description, and effort for every recommendation', () => {
    Object.values(recommendationContent).forEach((recommendation) => {
      expect(recommendation.title).toBeTruthy()
      expect(recommendation.description).toBeTruthy()
      expect(recommendation.effort).toBeTruthy()
    })
  })

  it('uses only valid effort levels', () => {
    const validEffortLevels = ['easy', 'medium', 'advanced']

    Object.values(recommendationContent).forEach((recommendation) => {
      expect(validEffortLevels).toContain(recommendation.effort)
    })
  })

  it('does not expose placeholder content in static recommendation copy', () => {
    Object.values(recommendationContent).forEach((recommendation) => {
      expect(recommendation.title).not.toContain('[Dynamic')
      expect(recommendation.description).not.toContain('[Dynamic')
      expect(recommendation.why).not.toContain('[Dynamic')

      recommendation.tradeoffs.forEach((tradeoff) => {
        expect(tradeoff).not.toContain('[Dynamic')
      })
    })
  })

})
