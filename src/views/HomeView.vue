<template>
  <div class="container">
    <h1>Privacy Coach</h1>
    <p>Understand your browser privacy setup and get recommendations.</p>

    <button @click="startScan">Start Scan</button>
  </div>
</template>

<script setup lang="ts">
import { detectEnvironment } from '@/services/detection'
import { useScanStore } from '@/stores/scan'

const scanStore = useScanStore()

function startScan() {
  const result = detectEnvironment()
  scanStore.setResult(result)
  console.log(result)
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 16px;
  text-align: center;
}

button {
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  background: black;
  color: white;
  border: none;
  border-radius: 6px;
}
</style>
