<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import ScoreCard from '@/components/results/ScoreCard.vue'
import RecommendationsSection from '@/components/results/RecommendationsSection.vue'

import { useScanStore } from '@/stores/scanStore'
import { useQuestionsStore } from '@/stores/questionsStore'
import { useProgressStore } from '@/stores/progressStore'

import { calculatePrivacyScore } from '@/services/scoring'

const router = useRouter()

const scanStore = useScanStore()
const questionsStore = useQuestionsStore()
const progressStore = useProgressStore()

const privacyScore = computed(() => {
  if (!scanStore.result) return 0

  return calculatePrivacyScore(scanStore.result)
})

const positiveFindings = computed(() => {
  if (!scanStore.result) return []

  const positives: string[] = []

  if (scanStore.result.https) positives.push('HTTPS is enabled')
  if (scanStore.result.gpc) positives.push('Global Privacy Control is enabled')

  return positives
})

const userScore = computed(() =>
  progressStore.calculateUserScore([], privacyScore.value),
)

// Pinia state is reset on page reload, so redirect if no scan result exists
onMounted(() => {
  if (!scanStore.result) {
    router.push('/')
  }
})

function restartScan() {
  scanStore.$reset()
  questionsStore.$reset()
  scanStore.runScan()
  router.push('/scan')
}
</script>

<template>
  <main class="results-view">
    <ScoreCard />

    <section class="user-score-card">
      <div>
        <p class="score-label">Personal Goal Score</p>

        <h2 class="user-score-value">
          {{ userScore }}/100
        </h2>
      </div>

      <p class="user-score-text">
        This score shows how close you are to your personal privacy goal.
      </p>
    </section>

    <RecommendationsSection />

    <section v-if="positiveFindings.length" class="positives-section">
      <div class="positives-divider"></div>

      <div class="positives-header">
        <h2 class="positives-title">What is already working well</h2>

        <p class="positives-subtitle">
          These settings already support a more privacy-friendly setup.
        </p>
      </div>

      <div class="positives-list">
        <div v-for="item in positiveFindings" :key="item" class="positive-item">
          <span class="positive-icon">✓</span>
          <span>{{ item }}</span>
        </div>
      </div>
    </section>

    <section class="actions">
      <button class="primary-button" @click="restartScan">
        Start new scan
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

.user-score-card {
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  align-items: center;
  border: 1px solid #e5e7eb;
  border-radius: 22px;
  padding: 1.25rem 1.4rem;
  margin: -1.25rem 0 2.75rem;
  background: white;
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.06);
}

.score-label {
  font-size: 0.95rem;
  opacity: 0.82;
  margin: 0 0 0.35rem;
}

.user-score-value {
  font-size: 2rem;
  line-height: 1;
  font-weight: 800;
  margin: 0;
  color: #2563eb;
  letter-spacing: -0.03em;
}

.user-score-text {
  max-width: 60ch;
  margin: 0;
  color: #4b5563;
  line-height: 1.6;
}

.positives-section {
  margin-bottom: 2.25rem;
}

.positives-divider {
  height: 1px;
  background: #e5e7eb;
  margin-bottom: 1.5rem;
}

.positives-header {
  margin-bottom: 1rem;
}

.positives-title {
  font-size: 1.35rem;
  line-height: 1.25;
  margin: 0 0 0.35rem;
}

.positives-subtitle {
  margin: 0;
  color: #4b5563;
  line-height: 1.6;
}

.positives-list {
  display: grid;
  gap: 0.65rem;
}

.positive-item {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.8rem 0.95rem;
  border-radius: 14px;
  background: rgba(34, 197, 94, 0.08);
  color: #166534;
}

.positive-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.35rem;
  height: 1.35rem;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
  background: #22c55e;
  color: white;
  flex-shrink: 0;
}

.actions {
  display: flex;
  justify-content: center;
  margin-top: 2.25rem;
}

.primary-button {
  min-width: 220px;
  border: none;
  border-radius: 14px;
  padding: 0.95rem 1.3rem;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  background: #0f172a;
  color: white;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.14);
  transition:
    transform 0.15s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;
}

.primary-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.18);
  background: #111827;
}

.primary-button:active {
  transform: translateY(0);
}
</style>
