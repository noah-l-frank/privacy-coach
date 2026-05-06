<script setup lang="ts">
import { computed } from 'vue'
import { detectEnvironment } from '@/services/detection'

const scanResult = computed(() => detectEnvironment())
</script>

<template>
  <main>
    <pre data-testid="scan-result">{{ JSON.stringify(scanResult, null, 2) }}</pre>
  </main>
</template>
