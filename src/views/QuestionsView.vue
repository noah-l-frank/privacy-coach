<template>
  <main class="questions-view">
    <section class="question-card">
      <div class="profile-header">
        <span class="profile-label">Privacy profile</span>

        <span class="profile-progress">Item {{ answeredCount + 1 }}</span>
      </div>

      <div v-if="currentQuestion">
        <h1>{{ currentQuestion.title }}</h1>
        <p class="question-description">
          {{ currentQuestion.description }}
        </p>

        <div v-if="currentQuestion.type === 'toggle_group'" class="toggle-group">
          <label
            v-for="item in currentQuestion.items"
            :key="item.id"
            class="toggle-row"
          >
            <span class="toggle-question">{{ item.label }}</span>

            <span class="toggle-control">
              <span class="toggle-value">
                {{ selectedToggles[item.id] ? 'Yes' : 'No' }}
              </span>

              <input
                v-model="selectedToggles[item.id]"
                class="toggle-input"
                type="checkbox"
                role="switch"
              >

              <span class="toggle-track" aria-hidden="true">
                <span class="toggle-thumb"></span>
              </span>
            </span>
          </label>

          <button class="continue-button" @click="submitToggleAnswers(currentQuestion)">
            Continue
          </button>
        </div>

        <div v-else class="options-list">
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
import { computed, onMounted, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useScanStore } from '@/stores/scanStore'
import { useQuestionsStore } from '@/stores/questionsStore'
import { getNextFollowUpQuestion } from '@/services/questions'
import type { ToggleGroupQuestion } from '@/services/questions/types'

const router = useRouter()
const scanStore = useScanStore()
const questionsStore = useQuestionsStore()
const selectedToggles = reactive<Record<string, boolean>>({})

// Pinia state is reset on page reload, so redirect if no scan result exists

onMounted(() => {
  if (!scanStore.result) {
    questionsStore.resetAnswers()
    router.replace('/')
  }
})

const currentQuestion = computed(() => {
  if (!scanStore.result) return null
  return getNextFollowUpQuestion(scanStore.result, questionsStore.answers)
})

const answeredCount = computed(() => Object.keys(questionsStore.answers).length)

function updateAnswer(questionId: string, value: string) {
  questionsStore.setAnswer(questionId, value)
}

function submitToggleAnswers(question: ToggleGroupQuestion) {
  question.items.forEach((item) => {
    questionsStore.setAnswer(
      item.id,
      selectedToggles[item.id] ? item.yesValue : item.noValue,
    )
  })
}

function goToResults() {
  router.push('/results')
}

watch(
  currentQuestion,
  (question) => {
    if (scanStore.result && question === null) {
      router.push('/results')
      return
    }

    if (question?.type === 'toggle_group') {
      question.items.forEach((item) => {
        selectedToggles[item.id] = questionsStore.answers[item.id] === item.yesValue
      })
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
  background: #111827;
  color: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

.profile-header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.85rem;
}

.profile-label,
.profile-progress {
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.85rem;
  font-weight: 700;
}

.profile-label {
  text-transform: uppercase;
}

h1 {
  font-size: 1.65rem;
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
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.75rem;
}

.toggle-group {
  display: grid;
  gap: 0.75rem;
}

.toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  padding: 1rem 1.1rem;
  background: rgba(255, 255, 255, 0.05);
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.toggle-row:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
}

.toggle-question {
  font-weight: 600;
  line-height: 1.4;
}

.toggle-control {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  flex-shrink: 0;
}

.toggle-value {
  min-width: 2rem;
  font-weight: 700;
  text-align: right;
}

.toggle-input {
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
}

.toggle-track {
  position: relative;
  width: 3.1rem;
  height: 1.7rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.14);
  pointer-events: none;
  transition: background-color 0.2s ease;
}

.toggle-thumb {
  position: absolute;
  top: 0.25rem;
  left: 0.25rem;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 999px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.22);
  transition: transform 0.2s ease;
}

.toggle-input:checked + .toggle-track {
  background: #22c55e;
}

.toggle-input:checked + .toggle-track .toggle-thumb {
  transform: translateX(1.4rem);
}

.toggle-input:focus-visible + .toggle-track {
  outline: 3px solid rgba(255, 255, 255, 0.55);
  outline-offset: 3px;
}

.option-button {
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  min-height: 4rem;
  padding: 0.9rem 1rem;
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

@media (max-width: 640px) {
  .toggle-row {
    align-items: flex-start;
    flex-direction: column;
  }

  .toggle-control {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
