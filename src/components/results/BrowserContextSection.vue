<script setup lang="ts">
import { computed } from 'vue'

import { useScanStore } from '@/stores/scanStore'

const scanStore = useScanStore()

const browserContext = computed(() => {
  const result = scanStore.result

  if (!result) return null

  if (result.browser === 'firefox') {
    const hasProtectionSignal =
      result.fingerprintingProtection?.status === 'likely-active' ||
      result.fingerprintingProtection?.status === 'inconclusive'

    return {
      label: 'Firefox context',
      title: hasProtectionSignal
        ? 'Firefox protections are visible'
        : 'Firefox gives you strong privacy controls',
      description: hasProtectionSignal
        ? 'Those signals reduce the weight of fingerprinting exposure in this result.'
        : 'Enhanced Tracking Protection, cookie controls, and Global Privacy Control are built in.',
    }
  }

  if (result.browser === 'brave') {
    return {
      label: 'Brave context',
      title: 'Brave starts from stronger privacy defaults',
      description:
        'Brave Shields and built-in blocking usually reduce the amount of setup needed.',
    }
  }

  if (result.browser === 'safari') {
    return {
      label: 'Safari context',
      title: 'Safari has strong platform-level tracking protection',
      description:
        'Safari may handle some cross-site tracking behind the scenes, so the scan focuses on visible browser signals.',
    }
  }

  if (result.browserFamily === 'chromium') {
    return {
      label: 'Chromium context',
      title: 'Compatibility is strong, privacy defaults vary',
      description:
        'The highest-value changes are usually tracking protection, GPC, trusted extensions, and third-party cookie settings.',
    }
  }

  return {
    label: 'Browser context',
    title: 'Privacy Coach could not fully classify this browser',
    description:
      'The scan still uses visible privacy signals, but browser-specific guidance may be more general.',
  }
})
</script>

<template>
  <section v-if="browserContext" class="browser-context">
    <span>{{ browserContext.label }}</span>

    <h2>{{ browserContext.title }}</h2>

    <p>{{ browserContext.description }}</p>
  </section>
</template>

<style scoped>
.browser-context {
  margin-bottom: 2.5rem;
  padding: 1rem 1.1rem;
  border: 1px solid #dbeafe;
  border-radius: 14px;
  background: #eff6ff;
  color: #1e3a8a;
}

.browser-context span {
  display: inline-block;
  margin-bottom: 0.4rem;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
}

.browser-context h2 {
  margin: 0 0 0.35rem;
  font-size: 1.1rem;
  line-height: 1.35;
}

.browser-context p {
  margin: 0;
  color: #1e40af;
  line-height: 1.6;
}
</style>
