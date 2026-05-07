<template>
  <main class="questions-view">
    <section class="question-card">
      <p class="question-step">Question {{ answeredCount + 1 }}</p>

      <div v-if="currentQuestion">
        <h1>{{ currentQuestion.title }}</h1>
        <p class="question-description">
          {{ currentQuestion.description }}
        </p>

        <div class="options-list">
          <button
            v-for="option in currentQuestion.options"
            :key="option.value"
            class="option-button"
            @click="updateAnswer(currentQuestion.id, option.value)"
          >
            {{ option.label }}
          </button>
        </div>
      </div>

      <div v-else class="empty-state">
        <p>No follow-up questions needed.</p>
        <button class="continue-button" @click="goToResults">Continue</button>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useScanStore } from '@/stores/scanStore'
import { useQuestionsStore } from '@/stores/questionsStore'
import { getNextFollowUpQuestion } from '@/services/questions'

const router = useRouter()
const scanStore = useScanStore()
const questionsStore = useQuestionsStore()

const currentQuestion = computed(() => {
  if (!scanStore.result) return null
  return getNextFollowUpQuestion(scanStore.result, questionsStore.answers)
})

const answeredCount = computed(() => Object.keys(questionsStore.answers).length)

function updateAnswer(questionId: string, value: string) {
  questionsStore.setAnswer(questionId, value)
}

function goToResults() {
  router.push('/results')
}

watch(
  currentQuestion,
  (question) => {
    if (scanStore.result && question === null) {
      router.push('/results')
    }
  },
  { immediate: true },
)
</script>

<style scoped>
.questions-view {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem 1.25rem 4rem;
}

.question-card {
  background: linear-gradient(180deg, #111827 0%, #1f2937 100%);
  color: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

.question-step {
  font-size: 0.95rem;
  opacity: 0.8;
  margin: 0 0 0.75rem;
}

h1 {
  font-size: 2rem;
  margin: 0 0 0.75rem;
  line-height: 1.2;
}

.question-description {
  font-size: 1rem;
  line-height: 1.6;
  max-width: 80ch;
  opacity: 0.9;
  margin-bottom: 1.5rem;
}

.options-list {
  display: grid;
  gap: 0.9rem;
}

.option-button {
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  padding: 1rem 1.1rem;
  font: inherit;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  color: white;
  background: rgba(255, 255, 255, 0.05);
  transition:
    transform 0.15s ease,
    background-color 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.option-button:hover {
  transform: translateY(-1px);
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
}

.option-button:active {
  transform: translateY(0);
}

.empty-state {
  display: grid;
  gap: 1rem;
}

.continue-button {
  width: fit-content;
  border: none;
  border-radius: 12px;
  padding: 0.9rem 1.2rem;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  background: white;
  color: #111827;
  transition:
    transform 0.15s ease,
    box-shadow 0.2s ease;
}

.continue-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
}
</style>
