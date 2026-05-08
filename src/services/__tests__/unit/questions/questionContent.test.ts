import { describe, expect, it } from 'vitest'
import { questionContent } from '../../../questions/questionContent'
import { questionFlow } from '../../../questions/questionFlow'

describe('questionContent', () => {
  it('contains content for every question flow rule', () => {
    const contentIds = Object.keys(questionContent)
    const flowIds = questionFlow.map((rule) => rule.id)

    expect(contentIds.sort()).toEqual(flowIds.sort())
  })

  it('uses matching ids for every question content entry', () => {
    Object.entries(questionContent).forEach(([id, question]) => {
      expect(question.id).toBe(id)
    })
  })

  it('provides title, description, and options for every question', () => {
    Object.values(questionContent).forEach((question) => {
      expect(question.title).toBeTruthy()
      expect(question.description).toBeTruthy()
      expect(question.options.length).toBeGreaterThan(0)
    })
  })

  it('provides value and label for every question option', () => {
    Object.values(questionContent).forEach((question) => {
      question.options.forEach((option) => {
        expect(option.value).toBeTruthy()
        expect(option.label).toBeTruthy()
      })
    })
  })
})
