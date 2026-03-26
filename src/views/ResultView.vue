<template>
  <main>
    <h1>Scan Results</h1>

    <pre v-if="scanStore.result">{{ scanStore.result }}</pre>
    <p v-else>No scan result available.</p>
  </main>
</template>

<script setup lang="ts">
import { useScanStore } from '@/stores/scan'

const scanStore = useScanStore()
</script>
