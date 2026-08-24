import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useQuestionsStore } from '../../questionsStore'

describe('questions store', () => {
  beforeEach(() => {
    sessionStorage.clear()
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
    expect(JSON.parse(sessionStorage.getItem('privacy-coach.answers') ?? '{}')).toEqual({
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

  it('initializes with stored answers', () => {
    sessionStorage.setItem(
      'privacy-coach.answers',
      JSON.stringify({
        privacy_preference: 'balanced',
      }),
    )
    setActivePinia(createPinia())

    const questionsStore = useQuestionsStore()

    expect(questionsStore.answers).toEqual({
      privacy_preference: 'balanced',
    })
  })

  it('resets answers and clears session storage', () => {
    const questionsStore = useQuestionsStore()

    questionsStore.setAnswer('privacy_preference', 'privacy')
    questionsStore.resetAnswers()

    expect(questionsStore.answers).toEqual({})
    expect(sessionStorage.getItem('privacy-coach.answers')).toBeNull()
  })
})
