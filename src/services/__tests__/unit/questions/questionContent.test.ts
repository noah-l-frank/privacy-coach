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

  it('provides title, description, and choices for every question', () => {
    Object.values(questionContent).forEach((question) => {
      expect(question.title).toBeTruthy()
      expect(question.description).toBeTruthy()
    })

    const singleChoiceQuestions = Object.values(questionContent).filter(
      (question) => question.type !== 'toggle_group',
    )
    const toggleGroupQuestions = Object.values(questionContent).filter(
      (question) => question.type === 'toggle_group',
    )

    singleChoiceQuestions.forEach((question) => {
      expect(question.options.length).toBeGreaterThan(0)
    })

    toggleGroupQuestions.forEach((question) => {
      expect(question.items.length).toBeGreaterThan(0)
    })
  })

  it('provides value and label for every question option', () => {
    Object.values(questionContent)
      .filter((question) => question.type !== 'toggle_group')
      .forEach((question) => {
      question.options.forEach((option) => {
        expect(option.value).toBeTruthy()
        expect(option.label).toBeTruthy()
      })
    })

    Object.values(questionContent)
      .filter((question) => question.type === 'toggle_group')
      .flatMap((question) => question.items)
      .forEach((item) => {
        expect(item.id).toBeTruthy()
        expect(item.label).toBeTruthy()
        expect(item.yesValue).toBeTruthy()
        expect(item.noValue).toBeTruthy()
      })
  })
})
