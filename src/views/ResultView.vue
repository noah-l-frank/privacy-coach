<template>
  <main>
    <h1>Scan Results</h1>

    <div v-if="scanStore.result">
      <h2>Detection</h2>
      <pre>{{ scanStore.result }}</pre>

      <h2>Answers</h2>
      <pre>{{ questionsStore.answers }}</pre>
    </div>

    <p v-else>No scan result available.</p>
  </main>
</template>

<script setup lang="ts">
import { useScanStore } from '@/stores/scan'
import { useQuestionsStore } from '@/stores/questions'

const scanStore = useScanStore()
const questionsStore = useQuestionsStore()
</script>
