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
  },
})
