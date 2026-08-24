<script setup lang="ts">
import { computed, ref } from 'vue'

import RecommendationCard from '@/components/results/RecommendationCard.vue'

import { useScanStore } from '@/stores/scanStore'
import { useQuestionsStore } from '@/stores/questionsStore'

import { generateRecommendations } from '@/services/recommendations'
import type { Recommendation } from '@/services/recommendations'

const scanStore = useScanStore()
const questionsStore = useQuestionsStore()

const showRecommendations = ref(true)

const effortOrder = {
  easy: 0,
  medium: 1,
  advanced: 2,
}

type RecommendationGroup = {
  id: string
  title: string
  description: string
  recommendations: Recommendation[]
}

const recommendations = computed(() => {
  if (!scanStore.result) return []

  return generateRecommendations(scanStore.result, questionsStore.answers).sort(
    (a, b) => effortOrder[a.effort] - effortOrder[b.effort],
  )
})

const recommendationGroups = computed<RecommendationGroup[]>(() => {
  const important: Recommendation[] = []
  const optional: Recommendation[] = []
  const maximumPrivacy: Recommendation[] = []

  recommendations.value.forEach((recommendation) => {
    if (
      recommendation.id === 'reduce-cookies' ||
      recommendation.id === 'use-vpn'
    ) {
      maximumPrivacy.push(recommendation)
      return
    }

    if (recommendation.impact === 'high') {
      important.push(recommendation)
      return
    }

    optional.push(recommendation)
  })

  return [
    {
      id: 'important',
      title: 'Important',
      description: 'Start here for the clearest privacy wins.',
      recommendations: important,
    },
    {
      id: 'optional',
      title: 'Optional',
      description: 'Useful when they fit the way you browse.',
      recommendations: optional,
    },
    {
      id: 'maximum-privacy',
      title: 'Maximum Privacy',
      description: 'Stricter actions with clearer tradeoffs.',
      recommendations: maximumPrivacy,
    },
  ].filter((group) => group.recommendations.length > 0)
})
</script>

<template>
  <section id="recommended-actions" class="recommendations-section">
    <div class="section-header">
      <h1 class="section-title">Privacy recommendations</h1>

      <p class="section-subtitle">
        The most relevant changes for this browser and privacy profile.
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

        <span class="toggle-chevron" :class="{ open: showRecommendations }">
          ›
        </span>
      </span>
    </button>

    <div v-if="showRecommendations && recommendations.length" class="recommendations-groups">
      <section
        v-for="group in recommendationGroups"
        :key="group.id"
        class="recommendation-group"
      >
        <div class="group-header">
          <h2>{{ group.title }}</h2>

          <p>{{ group.description }}</p>
        </div>

        <div class="recommendations-list">
          <RecommendationCard
            v-for="recommendation in group.recommendations"
            :key="recommendation.id"
            :recommendation="recommendation"
          />
        </div>
      </section>
    </div>

    <p v-else-if="!recommendations.length" class="empty-state">
      No specific recommendations right now.
    </p>
  </section>
</template>

<style scoped>
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

.recommendations-groups {
  display: grid;
  gap: 1.4rem;
}

.recommendation-group {
  display: grid;
  gap: 0.8rem;
}

.group-header h2 {
  margin: 0 0 0.25rem;
  font-size: 1.05rem;
  line-height: 1.35;
}

.group-header p {
  margin: 0;
  color: #64748b;
  line-height: 1.55;
}

.recommendations-list {
  display: grid;
  gap: 1rem;
}

.empty-state {
  color: #4b5563;
}
</style>
