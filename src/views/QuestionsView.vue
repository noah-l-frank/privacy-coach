<template>
  <main>
    <h1>Follow-up Questions</h1>

    <div v-if="questions.length > 0">
      <div v-for="question in questions" :key="question.id">
        <h2>{{ question.title }}</h2>
        <p>{{ question.description }}</p>

        <div v-for="option in question.options" :key="option.value">
          <label>
            <input
              :name="question.id"
              type="radio"
              :value="option.value"
              :checked="questionsStore.answers[question.id] === option.value"
              @change="updateAnswer(question.id, option.value)"
            />
            {{ option.label }}
          </label>
        </div>
      </div>

      <button @click="goToResults">Continue</button>
    </div>

    <p v-else>No follow-up questions needed.</p>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useScanStore } from '@/stores/scan'
import { useQuestionsStore } from '@/stores/questions'
import { getFollowUpQuestions } from '@/services/questions'

const router = useRouter()
const scanStore = useScanStore()
const questionsStore = useQuestionsStore()

const questions = computed(() => {
  if (!scanStore.result) return []
  return getFollowUpQuestions(scanStore.result)
})

function updateAnswer(questionId: string, value: string) {
  questionsStore.setAnswer(questionId, value)
}

function goToResults() {
  console.log(questionsStore.answers)
  router.push('/results')
}
</script>
