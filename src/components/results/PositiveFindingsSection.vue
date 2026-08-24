<script setup lang="ts">
import { computed } from 'vue'

import { useScanStore } from '@/stores/scanStore'
import { useQuestionsStore } from '@/stores/questionsStore'

const scanStore = useScanStore()
const questionsStore = useQuestionsStore()

const positiveFindings = computed(() => {
  if (!scanStore.result) return []

  const positives: string[] = []

  if (scanStore.result.https) {
    positives.push('HTTPS is enabled')
  }

  if (scanStore.result.gpc) {
    positives.push('Global Privacy Control is enabled')
  }

  if (
    questionsStore.answers.search_engine === 'duckduckgo' ||
    questionsStore.answers.search_engine === 'startpage'
  ) {
    positives.push('You use a privacy-focused search engine')
  }

  if (questionsStore.answers.search_engine === 'ecosia') {
    positives.push('You use a more privacy-friendly search engine')
  }

  if (questionsStore.answers.password_management === 'manager') {
    positives.push('You use a password manager to protect your accounts')
  }

  if (questionsStore.answers.vpn_usage === 'yes') {
    positives.push('You regularly use a VPN while browsing')
  }

  if (questionsStore.answers.vpn_usage === 'sometimes') {
    positives.push('You sometimes use a VPN while browsing')
  }

  if (questionsStore.answers.adblock_usage === 'yes') {
    positives.push('You use an ad blocker to reduce tracking')
  }

  return positives
})
</script>

<template>
  <section v-if="positiveFindings.length" class="positives-section">
    <div class="positives-divider"></div>

    <div class="positives-header">
      <h2 class="positives-title">
        What you are already doing well
      </h2>

      <p class="positives-subtitle">
        These settings and habits already support a more privacy-friendly browsing setup.
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
