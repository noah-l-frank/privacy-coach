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
      color: '#166534',
      background: '#dcfce7',
      border: '1px solid #86efac',
      boxShadow: '0 0 10px rgba(22, 101, 52, 0.12)',
    }
  }

  if (effort === 'medium') {
    return {
      color: '#854d0e',
      background: '#fef3c7',
      border: '1px solid #facc15',
      boxShadow: '0 0 10px rgba(133, 77, 14, 0.12)',
    }
  }

  return {
    color: '#991b1b',
    background: '#fee2e2',
    border: '1px solid #fca5a5',
    boxShadow: '0 0 10px rgba(153, 27, 27, 0.12)',
  }
}

const getImpactStyle = (impact: string) => {
  if (impact === 'high') {
    return {
      color: '#1e40af',
      background: '#dbeafe',
      border: '1px solid #93c5fd',
    }
  }

  if (impact === 'medium') {
    return {
      color: '#5b21b6',
      background: '#ede9fe',
      border: '1px solid #c4b5fd',
    }
  }

  return {
    color: '#374151',
    background: '#f3f4f6',
    border: '1px solid #d1d5db',
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
        <h2>{{ recommendation.title }}</h2>

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

.recommendation-header h2 {
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
