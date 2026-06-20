<script setup lang="ts">
import { computed } from 'vue'

import { useQuestionsStore } from '@/stores/questionsStore'
import { useScanStore } from '@/stores/scanStore'

import {
  calculatePrivacyScore,
  getScoreDeductions,
  getSkippedScoreFactors,
} from '@/services/scoring'

const scanStore = useScanStore()
const questionsStore = useQuestionsStore()

const scoringContext = computed(() => ({
  answers: questionsStore.answers,
  isDevelopmentServer: import.meta.env.DEV,
}))

const privacyScore = computed(() => {
  if (!scanStore.result) return 0

  return calculatePrivacyScore(scanStore.result, scoringContext.value)
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

const privacyProfile = computed(() => {
  const preference = questionsStore.answers.privacy_preference

  if (preference === 'maximum_privacy') {
    return {
      label: 'Maximum privacy profile',
      description:
        'This result is judged against a strict privacy setup, so tracking and fingerprinting signals matter more.',
    }
  }

  if (preference === 'privacy') {
    return {
      label: 'Privacy-oriented profile',
      description:
        'This result favors privacy improvements while keeping practical browser compatibility in mind.',
    }
  }

  if (preference === 'balanced') {
    return {
      label: 'Balanced profile',
      description:
        'This result focuses on meaningful privacy wins without pushing every strict setting.',
    }
  }

  if (preference === 'convenience') {
    return {
      label: 'Convenience profile',
      description:
        'This result keeps compatibility and low-friction browsing ahead of stricter privacy tradeoffs.',
    }
  }

  return {
    label: 'Browser privacy profile',
    description:
      'This result combines your browser scan with the privacy preferences you selected.',
  }
})

const scoreDeductions = computed(() => {
  if (!scanStore.result) return []

  return getScoreDeductions(scanStore.result, scoringContext.value)
})

const skippedScoreFactors = computed(() => {
  if (!scanStore.result) return []

  return getSkippedScoreFactors(scanStore.result, scoringContext.value)
})

const scoreDeductionSummary = computed(() => {
  const count = scoreDeductions.value.length

  if (count === 0) return 'No deductions'
  if (count === 1) return '1 deduction'

  return `${count} deductions`
})
</script>

<template>
  <section class="score-card">
    <div class="profile-summary">
      <span class="profile-eyebrow">Your result</span>

      <h1>{{ privacyProfile.label }}</h1>

      <p>{{ privacyProfile.description }}</p>
    </div>

    <div class="score-top-row">
      <div>
        <p class="score-label">Privacy Score</p>

        <h2 class="score-value" :style="{ color: scoreColor }">
          {{ privacyScore }}/100
        </h2>
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

    <div class="score-breakdown">
      <details class="factor-section score-deductions-panel">
        <summary>
          <h3>Score deductions</h3>

          <span>{{ scoreDeductionSummary }}</span>
        </summary>

        <div v-if="scoreDeductions.length" class="factor-list">
          <article
            v-for="deduction in scoreDeductions"
            :key="deduction.id"
            class="factor-item deduction"
          >
            <div>
              <h4>{{ deduction.title }}</h4>
              <p>{{ deduction.description }}</p>
              <p class="factor-reason">
                Counts because this signal matched your scan and selected profile.
              </p>
            </div>

            <strong>-{{ deduction.penalty }}</strong>
          </article>
        </div>

        <p v-else class="factor-empty">
          No score deductions were applied.
        </p>
      </details>

      <details
        v-if="skippedScoreFactors.length"
        class="factor-section skipped-factors-panel"
      >
        <summary>
          <h3>Not counted</h3>

          <span>{{ skippedScoreFactors.length }} explained</span>
        </summary>

        <div class="factor-list">
          <article
            v-for="factor in skippedScoreFactors"
            :key="factor.id"
            class="factor-item skipped"
          >
            <div>
              <h4>{{ factor.title }}</h4>
              <p>{{ factor.description }}</p>
            </div>
          </article>
        </div>
      </details>
    </div>
  </section>
</template>

<style scoped>
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

.profile-summary {
  margin-bottom: 1.5rem;
}

.profile-eyebrow {
  display: inline-block;
  margin-bottom: 0.45rem;
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.82rem;
  font-weight: 700;
  text-transform: uppercase;
}

.profile-summary h1 {
  margin: 0 0 0.45rem;
  font-size: 1.65rem;
  line-height: 1.2;
}

.profile-summary p {
  max-width: 66ch;
  margin: 0;
  color: rgba(255, 255, 255, 0.76);
  line-height: 1.6;
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
  background: linear-gradient(
    90deg,
    #ef4444 0%,
    #f59e0b 40%,
    #facc15 60%,
    #22c55e 100%
  );
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

.score-breakdown {
  display: grid;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.factor-section {
  min-width: 0;
}

.factor-section summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem 0.95rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  cursor: pointer;
  list-style: none;
  transition:
    background 0.2s ease,
    border-color 0.2s ease;
}

.factor-section summary::-webkit-details-marker {
  display: none;
}

.factor-section summary::after {
  content: '+';
  display: inline-grid;
  place-items: center;
  width: 1.4rem;
  height: 1.4rem;
  flex: 0 0 1.4rem;
  border-radius: 999px;
  color: #0f172a;
  background: rgba(255, 255, 255, 0.78);
  font-weight: 800;
  line-height: 1;
}

.factor-section[open] summary {
  margin-bottom: 0.8rem;
  border-color: rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.09);
}

.factor-section[open] summary::after {
  content: '-';
}

.factor-section summary span {
  margin-left: auto;
  color: rgba(255, 255, 255, 0.68);
  font-size: 0.84rem;
  white-space: nowrap;
}

.factor-section h3 {
  margin: 0;
  font-size: 1rem;
}

.factor-list {
  display: grid;
  gap: 0.7rem;
}

.factor-item {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.8rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.factor-item h4 {
  margin: 0 0 0.25rem;
  font-size: 0.92rem;
  line-height: 1.35;
}

.factor-item p,
.factor-empty {
  margin: 0;
  color: rgba(255, 255, 255, 0.68);
  font-size: 0.84rem;
  line-height: 1.45;
}

.factor-item strong {
  color: #fca5a5;
  font-size: 0.95rem;
  white-space: nowrap;
}

.factor-reason {
  margin-top: 0.35rem;
}

.factor-item.skipped {
  border-color: rgba(147, 197, 253, 0.18);
}
</style>
