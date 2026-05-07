import { defineStore } from 'pinia'

export const useProgressStore = defineStore('progress', {
  state: () => ({
    completedRecommendationIds: [] as string[],
  }),

  actions: {
    toggleRecommendation(id: string) {
      if (this.completedRecommendationIds.includes(id)) {
        this.completedRecommendationIds = this.completedRecommendationIds.filter(
          (item) => item !== id,
        )
        return
      }

      this.completedRecommendationIds.push(id)
    },

    isRecommendationCompleted(id: string) {
      return this.completedRecommendationIds.includes(id)
    },

    calculateUserScore(recommendationIds: string[], privacyScore: number) {
      if (!recommendationIds.length) return 100

      const completedCount = recommendationIds.filter((id) =>
        this.completedRecommendationIds.includes(id),
      ).length

      const completionRatio = completedCount / recommendationIds.length

      return Math.round(privacyScore + completionRatio * (100 - privacyScore))
    },
  },
})
