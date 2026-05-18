<script setup lang="ts">
import { computed } from 'vue'

import { useScanStore } from '@/stores/scanStore'

import { calculatePrivacyScore } from '@/services/scoring'

const scanStore = useScanStore()

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
</script>

<template>
  <section class="score-card">
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
</style>
