<script setup lang="ts">
import { computed } from 'vue'

import { useScanStore } from '@/stores/scanStore'

const scanStore = useScanStore()

const positiveFindings = computed(() => {
  if (!scanStore.result) return []

  const positives: string[] = []

  if (scanStore.result.https) {
    positives.push('HTTPS is enabled')
  }

  if (scanStore.result.gpc) {
    positives.push('Global Privacy Control is enabled')
  }

  return positives
})
</script>

<template>
  <section v-if="positiveFindings.length" class="positives-section">
    <div class="positives-divider"></div>

    <div class="positives-header">
      <h2 class="positives-title">
        What is already working well
      </h2>

      <p class="positives-subtitle">
        These settings already support a more privacy-friendly setup.
      </p>
    </div>

    <div class="positives-list">
      <div
        v-for="item in positiveFindings"
        :key="item"
        class="positive-item"
      >
        <span class="positive-icon">✓</span>

        <span>{{ item }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
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
</style>
