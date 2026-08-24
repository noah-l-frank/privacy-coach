<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { detectEnvironment, type DetectionResult } from '@/services/detection'

const scanResult = ref<DetectionResult | null>(null)
const errorMessage = ref<string | null>(null)

onMounted(async () => {
  try {
    scanResult.value = await detectEnvironment()
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Unknown scan error'
  }
})
</script>

<template>
  <main>
    <pre v-if="scanResult" data-testid="scan-result">{{ JSON.stringify(scanResult, null, 2) }}</pre>
    <pre v-else-if="errorMessage" data-testid="scan-error">{{ errorMessage }}</pre>
    <pre v-else data-testid="scan-loading">Loading scan result...</pre>
  </main>
</template>
