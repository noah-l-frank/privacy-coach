import { defineStore } from 'pinia'

export const useQuestionsStore = defineStore('questions', {
  state: () => ({
    answers: {} as Record<string, string>,
  }),
  actions: {
    setAnswer(questionId: string, value: string) {
      this.answers[questionId] = value
    },
  },
})
