<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useScanStore } from '@/stores/scan'
import { useQuestionsStore } from '@/stores/questions'
import { calculatePrivacyScore } from '@/services/scoring'
import { generateRecommendations } from '@/services/recommendations'

const router = useRouter()
const scanStore = useScanStore()
const questionsStore = useQuestionsStore()

const recommendations = computed(() => {
  if (!scanStore.result) return []
  return generateRecommendations(scanStore.result, questionsStore.answers)
})

const positiveFindings = computed(() => {
  if (!scanStore.result) return []

  const positives: string[] = []

  if (scanStore.result.https) positives.push('HTTPS is enabled')
  if (scanStore.result.dnt) positives.push('Do Not Track is active')
  if (scanStore.result.adblock) positives.push('Ad blocker is active')

  return positives
})

const privacyScore = computed(() => {
  if (!scanStore.result) return 0
  return calculatePrivacyScore(scanStore.result)
})

const scoreBarStyle = computed(() => ({
  width: `${privacyScore.value}%`,
}))

const scoreMarkerStyle = computed(() => ({
  left: `clamp(0px, calc(${privacyScore.value}% - 11px), calc(100% - 22px))`,
}))

const scoreLabel = computed(() => {
  if (privacyScore.value < 40) return 'Poor'
  if (privacyScore.value < 70) return 'Okay'
  return 'Strong'
})

const scoreColor = computed(() => {
  if (privacyScore.value < 40) return '#ef4444'
  if (privacyScore.value < 70) return '#facc15'
  return '#22c55e'
})

const getEffortStyle = (effort: string) => {
  if (effort === 'easy') {
    return {
      color: '#22c55e',
      background: 'rgba(34, 197, 94, 0.12)',
      border: '1px solid rgba(34, 197, 94, 0.25)',
      boxShadow: '0 0 8px rgba(34, 197, 94, 0.25)',
    }
  }

  if (effort === 'medium') {
    return {
      color: '#facc15',
      background: 'rgba(250, 204, 21, 0.12)',
      border: '1px solid rgba(250, 204, 21, 0.25)',
      boxShadow: '0 0 8px rgba(250, 204, 21, 0.25)',
    }
  }

  return {
    color: '#ef4444',
    background: 'rgba(239, 68, 68, 0.12)',
    border: '1px solid rgba(239, 68, 68, 0.25)',
    boxShadow: '0 0 8px rgba(239, 68, 68, 0.25)',
  }
}

function restartScan() {
  scanStore.$reset()
  questionsStore.$reset()
  router.push('/')
}
</script>

<template>
  <main class="results-view">
    <section class="score-card">
      <div class="score-top-row">
        <div>
          <p class="score-label">Privacy Score</p>
          <h2 class="score-value" :style="{ color: scoreColor }">{{ privacyScore }}/100</h2>
        </div>

        <span
          class="score-pill"
          :style="{
            color: scoreColor,
            borderColor: scoreColor,
            boxShadow: `0 0 12px ${scoreColor}33`,
          }"
        >
          {{ scoreLabel }}
        </span>
      </div>

      <div class="score-bar-wrapper">
        <div class="score-bar">
          <div class="score-bar-fill" :style="scoreBarStyle"></div>
          <div class="score-marker" :style="scoreMarkerStyle"></div>
        </div>

        <div class="score-scale">
          <span>Poor</span>
          <span>Okay</span>
          <span>Strong</span>
        </div>
      </div>
    </section>

    <section class="recommendations-section">
      <h1>Privacy recommendations</h1>
      <p class="subtitle">
        Based on your scan results and answers, here are the most relevant next steps.
      </p>

      <div v-if="recommendations.length" class="recommendations-list">
        <article
          v-for="recommendation in recommendations"
          :key="recommendation.id"
          class="recommendation-card"
        >
          <div class="recommendation-header">
            <h3>{{ recommendation.title }}</h3>
            <span class="effort-badge" :style="getEffortStyle(recommendation.effort)">
              {{ recommendation.effort }}
            </span>
          </div>

          <p>{{ recommendation.description }}</p>
        </article>
      </div>

      <p v-else class="empty-state">No specific recommendations right now.</p>
    </section>

    <section v-if="positiveFindings.length" class="positives-section">
      <h2>You are already doing well here</h2>

      <ul class="positives-list">
        <li v-for="item in positiveFindings" :key="item">
          {{ item }}
        </li>
      </ul>
    </section>

    <section class="actions">
      <button class="primary-button" @click="restartScan">Start new scan</button>
    </section>
  </main>
</template>

<style scoped>
.results-view {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem 1.25rem 4rem;
}

.score-card {
  background: linear-gradient(180deg, #111827 0%, #1f2937 100%);
  color: white;
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

.score-top-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.score-label {
  font-size: 0.95rem;
  opacity: 0.8;
  margin: 0 0 0.35rem;
}

.score-value {
  font-size: 2.4rem;
  line-height: 1;
  font-weight: 800;
  margin: 0;
  letter-spacing: -0.03em;
}

.score-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 36px;
  padding: 0.45rem 0.85rem;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 700;
  background: transparent;
  border: 2px solid;
}

.score-bar-wrapper {
  position: relative;
}

.score-bar {
  position: relative;
  width: 100%;
  height: 18px;
  border-radius: 999px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.12);
}

.score-bar-fill {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #ef4444 0%, #f59e0b 40%, #facc15 60%, #22c55e 100%);
}

.score-marker {
  position: absolute;
  top: 50%;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  transform: translateY(-50%);
  background: white;
  border: 3px solid #111827;
}

.score-scale {
  display: flex;
  justify-content: space-between;
  margin-top: 0.65rem;
  font-size: 0.82rem;
  opacity: 0.78;
}

.recommendations-list {
  display: grid;
  gap: 1rem;
  margin-top: 1.5rem;
}

.recommendation-card {
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 1rem;
  background: white;
}

.recommendation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.effort-badge {
  font-size: 0.8rem;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  font-weight: 600;
  text-transform: capitalize;
}

.positives-list {
  padding-left: 1.25rem;
}

.primary-button {
  border: none;
  border-radius: 12px;
  padding: 0.9rem 1.2rem;
  font-weight: 600;
  cursor: pointer;
  background: #111827;
  color: white;
}
</style>
