import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useProgressStore } from '../../progressStore'

describe('progress store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes with no completed recommendations', () => {
    const progressStore = useProgressStore()

    expect(progressStore.completedRecommendationIds).toEqual([])
  })

  it('marks recommendations as completed', () => {
    const progressStore = useProgressStore()

    progressStore.toggleRecommendation('enable-gpc')

    expect(progressStore.completedRecommendationIds).toEqual(['enable-gpc'])
    expect(progressStore.isRecommendationCompleted('enable-gpc')).toBe(true)
  })

  it('removes recommendations when toggled again', () => {
    const progressStore = useProgressStore()

    progressStore.toggleRecommendation('enable-gpc')
    progressStore.toggleRecommendation('enable-gpc')

    expect(progressStore.completedRecommendationIds).toEqual([])
    expect(progressStore.isRecommendationCompleted('enable-gpc')).toBe(false)
  })
})
