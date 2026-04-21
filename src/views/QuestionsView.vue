<template>
  <main>
    <h1>Follow-up Questions</h1>

    <div v-if="currentQuestion">
      <h2>{{ currentQuestion.title }}</h2>
      <p>{{ currentQuestion.description }}</p>

      <div v-for="option in currentQuestion.options" :key="option.value">
        <button @click="updateAnswer(currentQuestion.id, option.value)">
          {{ option.label }}
        </button>
      </div>
    </div>

    <p v-else>No follow-up questions needed.</p>
  </main>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useScanStore } from '@/stores/scan'
import { useQuestionsStore } from '@/stores/questions'
import { getNextFollowUpQuestion } from '@/services/questions'

const router = useRouter()
const scanStore = useScanStore()
const questionsStore = useQuestionsStore()

const currentQuestion = computed(() => {
  if (!scanStore.result) return null
  return getNextFollowUpQuestion(scanStore.result, questionsStore.answers)
})

function updateAnswer(questionId: string, value: string) {
  questionsStore.setAnswer(questionId, value)
}

watch(currentQuestion, (question) => {
  if (scanStore.result && question === null) {
    router.push('/results')
  }
})
</script>
