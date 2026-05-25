<script setup lang="ts">
import { ref } from 'vue'
import type { Recommendation } from '@/services/recommendations'
import { useProgressStore } from '@/stores/progressStore'

defineProps<{
  recommendation: Recommendation
}>()

const progressStore = useProgressStore()

const expanded = ref(false)

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

const getImpactStyle = (impact: string) => {
  if (impact === 'high') {
    return {
      color: '#2563eb',
      background: 'rgba(37, 99, 235, 0.12)',
      border: '1px solid rgba(37, 99, 235, 0.22)',
    }
  }

  if (impact === 'medium') {
    return {
      color: '#7c3aed',
      background: 'rgba(124, 58, 237, 0.12)',
      border: '1px solid rgba(124, 58, 237, 0.22)',
    }
  }

  return {
    color: '#6b7280',
    background: 'rgba(107, 114, 128, 0.12)',
    border: '1px solid rgba(107, 114, 128, 0.22)',
  }
}
</script>

<template>
  <article
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

        <div class="recommendation-badges">
          <span class="impact-badge" :style="getImpactStyle(recommendation.impact)">
            {{ recommendation.impact }} impact
          </span>

          <span class="effort-badge" :style="getEffortStyle(recommendation.effort)">
            {{ recommendation.effort }}
          </span>
        </div>
      </div>

      <p class="recommendation-description">
        {{ recommendation.description }}
      </p>

      <button class="details-toggle" type="button" @click="expanded = !expanded">
        {{ expanded ? 'Hide details' : 'Show details' }}
      </button>

      <Transition name="details">
        <div v-if="expanded" class="recommendation-details">
          <section class="details-section">
            <h4>Why this matters</h4>
            <p>{{ recommendation.why }}</p>
          </section>

          <section class="details-section">
            <h4>Suggested steps</h4>

            <ol class="steps-list">
              <li v-for="step in recommendation.steps" :key="step">
                {{ step }}
              </li>
            </ol>
          </section>

          <section
            v-if="recommendation.tradeoffs.length"
            class="details-section"
          >
            <h4>Tradeoffs</h4>

            <ul class="tradeoff-list">
              <li
                v-for="tradeoff in recommendation.tradeoffs"
                :key="tradeoff"
              >
                {{ tradeoff }}
              </li>
            </ul>
          </section>

          <section
            v-if="recommendation.links.length"
            class="details-section"
          >
            <h4>Helpful links</h4>

            <ul class="links-list">
              <li
                v-for="link in recommendation.links"
                :key="link.url"
              >
                <a
                  :href="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </section>
        </div>
      </Transition>
    </div>
  </article>
</template>

<style scoped>
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

.recommendation-badges {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.recommendation-description {
  margin: 0;
  line-height: 1.65;
  color: #374151;
}

.effort-badge,
.impact-badge {
  flex-shrink: 0;
  font-size: 0.78rem;
  padding: 0.28rem 0.65rem;
  border-radius: 999px;
  font-weight: 600;
  text-transform: capitalize;
}

.details-toggle {
  margin-top: 1rem;
  padding: 0;
  border: none;
  background: none;
  color: #2563eb;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}

.details-toggle:hover {
  color: #1d4ed8;
}

.recommendation-details {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
  color: #4b5563;
}

.details-section + .details-section {
  margin-top: 1.25rem;
}

.details-section h4 {
  margin: 0 0 0.5rem;
  font-size: 0.92rem;
  color: #111827;
}

.details-section p {
  margin: 0;
  line-height: 1.65;
}

.steps-list,
.tradeoff-list,
.links-list {
  margin: 0;
  padding-left: 1.2rem;
  line-height: 1.7;
}

.links-list a {
  color: #2563eb;
  text-decoration: none;
}

.links-list a:hover {
  text-decoration: underline;
}

.details-enter-active,
.details-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.details-enter-from,
.details-leave-to {
  opacity: 0;
  transform: translateY(-4px);
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
</style>
