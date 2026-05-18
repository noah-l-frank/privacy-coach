<script setup lang="ts">
import { computed } from 'vue'

import { useScanStore } from '@/stores/scanStore'
import { useProgressStore } from '@/stores/progressStore'

import { calculatePrivacyScore } from '@/services/scoring'

const scanStore = useScanStore()
const progressStore = useProgressStore()

const privacyScore = computed(() => {
  if (!scanStore.result) return 0

  return calculatePrivacyScore(scanStore.result)
})

const userScore = computed(() =>
  progressStore.calculateUserScore([], privacyScore.value),
)
</script>

<template>
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
</template>

<style scoped>
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
</style>
