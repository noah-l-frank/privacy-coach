<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import ScoreCard from '@/components/results/ScoreCard.vue'
import RecommendationsSection from '@/components/results/RecommendationsSection.vue'
import PositiveFindingsSection from '@/components/results/PositiveFindingsSection.vue'
import BrowserContextSection from '@/components/results/BrowserContextSection.vue'

import { useScanStore } from '@/stores/scanStore'
import { useQuestionsStore } from '@/stores/questionsStore'
import { generateRecommendations } from '@/services/recommendations'

const router = useRouter()

const scanStore = useScanStore()
const questionsStore = useQuestionsStore()
const copiedChecklist = ref(false)

const recommendations = computed(() => {
  if (!scanStore.result) return []

  return generateRecommendations(scanStore.result, questionsStore.answers)
})

// Pinia state is reset on page reload, so redirect if no scan result exists
onMounted(() => {
  if (!scanStore.result) {
    router.push('/')
  }
})

async function restartScan() {
  await scanStore.restartScan()
  router.push('/scan')
}

function focusRecommendations() {
  document.querySelector('#recommended-actions')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

async function copySettingsChecklist() {
  const checklist = recommendations.value
    .flatMap((recommendation) => [
      recommendation.title,
      ...recommendation.steps.map((step) => `- ${step}`),
    ])
    .join('\n')

  await navigator.clipboard.writeText(checklist || 'No specific recommendations right now.')
  copiedChecklist.value = true

  window.setTimeout(() => {
    copiedChecklist.value = false
  }, 2200)
}
</script>

<template>
  <main class="results-view">
    <ScoreCard />

    <BrowserContextSection />

    <RecommendationsSection />

    <PositiveFindingsSection />

    <section class="actions">
      <button
        v-if="recommendations.length"
        class="primary-button"
        type="button"
        @click="focusRecommendations"
      >
        Open top recommendation
      </button>

      <button
        class="secondary-button"
        type="button"
        @click="copySettingsChecklist"
      >
        {{ copiedChecklist ? 'Checklist copied' : 'Copy checklist' }}
      </button>

      <button class="secondary-button" type="button" @click="restartScan">
        Run scan again
      </button>
    </section>
  </main>
</template>

<style scoped>
.results-view {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem 1.25rem 4rem;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-top: 2.25rem;
}

.primary-button,
.secondary-button {
  min-width: 220px;
  border-radius: 12px;
  padding: 0.95rem 1.3rem;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;
}

.primary-button {
  border: none;
  background: #0f172a;
  color: white;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.14);
}

.secondary-button {
  border: 1px solid #cbd5e1;
  background: white;
  color: #0f172a;
}

.primary-button:hover,
.secondary-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.18);
}

.primary-button:hover {
  background: #111827;
}

.secondary-button:hover {
  background: #f8fafc;
}

.primary-button:active,
.secondary-button:active {
  transform: translateY(0);
}
</style>
