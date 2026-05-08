import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useQuestionsStore } from '../questionsStore'

describe('questions store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes with empty answers', () => {
    const questionsStore = useQuestionsStore()

    expect(questionsStore.answers).toEqual({})
  })

  it('stores a single answer', () => {
    const questionsStore = useQuestionsStore()

    questionsStore.setAnswer('cookie_preference', 'privacy')

    expect(questionsStore.answers).toEqual({
      cookie_preference: 'privacy',
    })
  })

  it('stores multiple answers without overwriting previous ones', () => {
    const questionsStore = useQuestionsStore()

    questionsStore.setAnswer('cookie_preference', 'privacy')
    questionsStore.setAnswer('gpc_preference', 'high')

    expect(questionsStore.answers).toEqual({
      cookie_preference: 'privacy',
      gpc_preference: 'high',
    })
  })
})
