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
              v-model="answers[question.id]"
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
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useScanStore } from '@/stores/scan'
import { getFollowUpQuestions } from '@/services/questions'

const router = useRouter()
const scanStore = useScanStore()

const answers = reactive<Record<string, string>>({})

const questions = computed(() => {
  if (!scanStore.result) return []
  return getFollowUpQuestions(scanStore.result)
})

function goToResults() {
  console.log(answers)
  router.push('/results')
}
</script>
