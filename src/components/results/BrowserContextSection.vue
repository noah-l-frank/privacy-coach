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
        ? 'Firefox protection signals were detected'
        : 'Firefox gives you strong privacy controls',
      description: hasProtectionSignal
        ? 'Privacy Coach treats those signals as meaningful context, so fingerprinting exposure is not scored as harshly as it would be in a browser without those protections.'
        : 'Enhanced Tracking Protection, cookie controls, and Global Privacy Control are built in, so small settings changes can have a direct effect.',
    }
  }

  if (result.browser === 'brave') {
    return {
      label: 'Brave context',
      title: 'Brave starts from stronger privacy defaults',
      description:
        'The score still checks Chromium-based browser signals, but Brave Shields and built-in blocking usually reduce the amount of setup needed.',
    }
  }

  if (result.browser === 'safari') {
    return {
      label: 'Safari context',
      title: 'Safari has strong platform-level tracking protection',
      description:
        'Privacy Coach still highlights browser signals it can observe, while Safari-specific protections may handle some cross-site tracking behind the scenes.',
    }
  }

  if (result.browserFamily === 'chromium') {
    return {
      label: 'Chromium context',
      title: 'Compatibility is strong, privacy defaults vary',
      description:
        'Chrome-like browsers work almost everywhere, so the most useful improvements are usually tracking protection, GPC, extensions, and third-party cookie settings.',
    }
  }

  return {
    label: 'Browser context',
    title: 'Privacy Coach could not fully classify this browser',
    description:
      'The scan still uses observable privacy signals, but browser-specific recommendations may be more general.',
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
