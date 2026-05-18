<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import ScoreCard from '@/components/results/ScoreCard.vue'
import PersonalGoalCard from '@/components/results/PersonalGoalCard.vue'
import RecommendationsSection from '@/components/results/RecommendationsSection.vue'
import PositiveFindingsSection from '@/components/results/PositiveFindingsSection.vue'

import { useScanStore } from '@/stores/scanStore'

const router = useRouter()

const scanStore = useScanStore()

// Pinia state is reset on page reload, so redirect if no scan result exists
onMounted(() => {
  if (!scanStore.result) {
    router.push('/')
  }
})

function restartScan() {
  scanStore.restartScan()
  router.push('/scan')
}
</script>

<template>
  <main class="results-view">
    <ScoreCard />

    <PersonalGoalCard />

    <RecommendationsSection />

    <PositiveFindingsSection />

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
