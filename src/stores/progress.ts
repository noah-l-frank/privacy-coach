import { defineStore } from 'pinia'

export const useProgressStore = defineStore('progress', {
  getters: {
    userScore: () => 75, // TODO: calculate user score based on scan results, answers to questions, and completed recommendations
  },
})
