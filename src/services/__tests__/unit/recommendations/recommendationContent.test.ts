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

  it('does not expose placeholder content', () => {
    Object.values(recommendationContent).forEach((recommendation) => {
      const copy = [
        recommendation.title,
        recommendation.description,
        recommendation.why,
        ...recommendation.steps,
        ...recommendation.tradeoffs,
        ...recommendation.links.flatMap((link) => [link.label, link.url]),
      ]

      copy.forEach((value) => {
        expect(value).not.toContain('[Dynamic')
        expect(value).not.toContain('example.com')
      })
    })
  })

  it('uses secure web links for every recommendation resource', () => {
    Object.values(recommendationContent).forEach((recommendation) => {
      recommendation.links.forEach((link) => {
        expect(() => new URL(link.url)).not.toThrow()
        expect(new URL(link.url).protocol).toBe('https:')
      })
    })
  })
})
