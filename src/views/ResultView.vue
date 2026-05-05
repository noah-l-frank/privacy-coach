<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import confetti from 'canvas-confetti'
import tadaSoundFile from '@/assets/sounds/tada_sound.wav'
import { useRouter } from 'vue-router'
import { useScanStore } from '@/stores/scan'
import { useQuestionsStore } from '@/stores/questions'
import { calculatePrivacyScore } from '@/services/scoring'
import { generateRecommendations } from '@/services/recommendations'
import { useProgressStore } from '@/stores/progress'

const router = useRouter()
const scanStore = useScanStore()
const questionsStore = useQuestionsStore()
const progressStore = useProgressStore()

const showRecommendations = ref(true)

const confettiSound = new Audio(tadaSoundFile)
confettiSound.volume = 0.6

const recommendations = computed(() => {
  if (!scanStore.result) return []
  return generateRecommendations(scanStore.result, questionsStore.answers)
})

const positiveFindings = computed(() => {
  if (!scanStore.result) return []

  const positives: string[] = []

  if (scanStore.result.https) positives.push('HTTPS is enabled')
  if (scanStore.result.dnt) positives.push('Do Not Track is active')

  return positives
})

const privacyScore = computed(() => {
  if (!scanStore.result) return 0
  return calculatePrivacyScore(scanStore.result)
})

const userScore = computed(() =>
  progressStore.calculateUserScore(
    recommendations.value.map((recommendation) => recommendation.id),
    privacyScore.value,
  ),
)

watch(userScore, (newScore, oldScore) => {
  if (newScore === 100 && oldScore !== 100) {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
    })

    confettiSound.currentTime = 0
    confettiSound.play().catch(() => {})
  }
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
      border: '1px solid rgba(34, 197, 94, 0.22)',
      boxShadow: '0 0 10px rgba(34, 197, 94, 0.16)',
    }
  }

  if (effort === 'medium') {
    return {
      color: '#eab308',
      background: 'rgba(234, 179, 8, 0.12)',
      border: '1px solid rgba(234, 179, 8, 0.22)',
      boxShadow: '0 0 10px rgba(234, 179, 8, 0.14)',
    }
  }

  return {
    color: '#ef4444',
    background: 'rgba(239, 68, 68, 0.12)',
    border: '1px solid rgba(239, 68, 68, 0.22)',
    boxShadow: '0 0 10px rgba(239, 68, 68, 0.14)',
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
            boxShadow: `0 0 12px ${scoreColor}26`,
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

    <section class="user-score-card">
      <div>
        <p class="score-label">Personal Goal Score</p>
        <h2 class="user-score-value">{{ userScore }}/100</h2>
      </div>

      <p class="user-score-text">
        This score shows how close you are to your personal privacy goal.
      </p>
    </section>

    <section class="recommendations-section">
      <div class="section-header">
        <h1 class="section-title">Privacy recommendations</h1>
        <p class="section-subtitle">
          Based on your scan results and answers, here are the most relevant next steps.
        </p>
      </div>

      <button
        v-if="recommendations.length"
        class="recommendations-toggle"
        type="button"
        @click="showRecommendations = !showRecommendations"
      >
        <span class="toggle-title">Recommended actions</span>

        <span class="toggle-meta">
          {{ recommendations.length }} items
          <span class="toggle-chevron" :class="{ open: showRecommendations }">›</span>
        </span>
      </button>

      <div v-if="showRecommendations && recommendations.length" class="recommendations-list">
        <article
          v-for="recommendation in recommendations"
          :key="recommendation.id"
          class="recommendation-card"
          :class="{ completed: progressStore.isRecommendationCompleted(recommendation.id) }"
        >
          <button
            class="recommendation-check"
            type="button"
            :aria-label="`Mark ${recommendation.title} as completed`"
            @click="progressStore.toggleRecommendation(recommendation.id)"
          >
            <span v-if="progressStore.isRecommendationCompleted(recommendation.id)">✓</span>
          </button>

          <div class="recommendation-content">
            <div class="recommendation-header">
              <h3>{{ recommendation.title }}</h3>
              <span class="effort-badge" :style="getEffortStyle(recommendation.effort)">
                {{ recommendation.effort }}
              </span>
            </div>

            <p class="recommendation-description">{{ recommendation.description }}</p>
          </div>
        </article>
      </div>

      <p v-else-if="!recommendations.length" class="empty-state">
        No specific recommendations right now.
      </p>
    </section>

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
  background: linear-gradient(180deg, #111827 0%, #1e293b 100%);
  color: white;
  border-radius: 24px;
  padding: 1.5rem;
  margin-bottom: 2.5rem;
  box-shadow:
    0 18px 40px rgba(15, 23, 42, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
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
  opacity: 0.82;
  margin: 0 0 0.35rem;
}

.score-value {
  font-size: 2.5rem;
  line-height: 1;
  font-weight: 800;
  margin: 0;
  letter-spacing: -0.03em;
}

.score-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 38px;
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  font-size: 0.95rem;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.02);
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
  background: rgba(255, 255, 255, 0.14);
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
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.score-scale {
  display: flex;
  justify-content: space-between;
  margin-top: 0.7rem;
  font-size: 0.84rem;
  opacity: 0.8;
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

.recommendations-section {
  margin-bottom: 2.5rem;
}

.section-header {
  margin-bottom: 1.2rem;
}

.section-title {
  font-size: 2.1rem;
  line-height: 1.15;
  margin: 0 0 0.55rem;
  letter-spacing: -0.02em;
}

.section-subtitle {
  font-size: 1.02rem;
  line-height: 1.65;
  color: #4b5563;
  max-width: 70ch;
  margin: 0;
}

.recommendations-toggle {
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.95rem 1.15rem;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  background: #f8fafc;
  color: #111827;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font: inherit;
  cursor: pointer;
  box-shadow: 0 8px 22px rgba(15, 23, 42, 0.04);
  transition:
    transform 0.15s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.recommendations-toggle:hover {
  transform: translateY(-1px);
  border-color: #cbd5e1;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.07);
}

.toggle-title {
  font-weight: 700;
}

.toggle-meta {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  color: #64748b;
  font-size: 0.95rem;
  font-weight: 600;
}

.toggle-chevron {
  display: grid;
  place-items: center;
  width: 1.35rem;
  height: 1.35rem;
  border-radius: 999px;
  background: white;
  color: #64748b;
  font-size: 1rem;
  line-height: 1;
  box-shadow: inset 0 0 0 1px #e5e7eb;
  transform: rotate(90deg);
  transition:
    transform 0.2s ease,
    color 0.2s ease;
}

.toggle-chevron.open {
  transform: rotate(-90deg);
  color: #0f172a;
}

.recommendations-list {
  display: grid;
  gap: 1rem;
}

.recommendation-card {
  border: 1px solid #e5e7eb;
  border-radius: 18px;
  padding: 1.15rem 1.2rem;
  background: white;
  box-shadow:
    0 8px 24px rgba(15, 23, 42, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease,
    opacity 0.2s ease;
}

.recommendation-check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.45rem;
  height: 1.45rem;
  margin-top: 0.1rem;
  border-radius: 999px;
  border: 2px solid #cbd5e1;
  background: white;
  color: white;
  font: inherit;
  font-size: 0.8rem;
  font-weight: 800;
  cursor: pointer;
  flex-shrink: 0;
}

.recommendation-check:hover {
  border-color: #22c55e;
}

.recommendation-content {
  flex: 1;
}

.recommendation-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 0.8rem;
}

.recommendation-header h3 {
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.35;
}

.recommendation-description {
  margin: 0;
  line-height: 1.65;
  color: #374151;
}

.effort-badge {
  flex-shrink: 0;
  font-size: 0.78rem;
  padding: 0.28rem 0.65rem;
  border-radius: 999px;
  font-weight: 600;
  text-transform: capitalize;
}

.recommendation-card.completed {
  background: #f8fafc;
  opacity: 0.72;
}

.recommendation-card.completed .recommendation-check {
  background: #22c55e;
  border-color: #22c55e;
}

.recommendation-card.completed h3,
.recommendation-card.completed .recommendation-description {
  text-decoration: line-through;
}

.empty-state {
  color: #4b5563;
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
