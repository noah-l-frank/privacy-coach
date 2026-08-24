import { defineStore } from 'pinia'
import {
  readSessionValue,
  removeSessionValue,
  writeSessionValue,
} from './sessionStorage'

const ANSWERS_STORAGE_KEY = 'privacy-coach.answers'

export const useQuestionsStore = defineStore('questions', {
  state: () => ({
    answers: readSessionValue<Record<string, string>>(ANSWERS_STORAGE_KEY, {}),
  }),
  actions: {
    setAnswer(questionId: string, value: string) {
      this.answers[questionId] = value
      writeSessionValue(ANSWERS_STORAGE_KEY, this.answers)
    },

    resetAnswers() {
      this.answers = {}
      removeSessionValue(ANSWERS_STORAGE_KEY)
    },
  },
})
