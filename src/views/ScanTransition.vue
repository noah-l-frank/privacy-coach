<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useScanStore } from '@/stores/scanStore'

const router = useRouter()
const scanStore = useScanStore()

onMounted(() => {
  if (!scanStore.result) {
    scanStore.runScan()
  }

  setTimeout(() => {
    router.push('/questions')
  }, 4500)
})
</script>

<template>
  <main class="scan-page">
    <section class="scan-card">
      <div class="glow glow-blue"></div>
      <div class="glow glow-purple"></div>

      <p class="eyebrow">Privacy scan</p>

      <h1>
        Analyzing your setup
        <span class="dot">.</span><span class="dot delay-dot-1">.</span
        ><span class="dot delay-dot-2">.</span>
      </h1>

      <p class="subtitle">Preparing your personalized privacy recommendations.</p>

      <div class="progress-shell">
        <div class="progress-track">
          <div class="progress-bar"></div>
        </div>

        <div class="steps">
          <p class="step step-1">
            Checking browser...
            <span class="check">✓</span>
          </p>

          <p class="step step-2">
            Scanning privacy settings...
            <span class="check">✓</span>
          </p>

          <p class="step step-3">
            Preparing follow-up questions...
            <span class="check">✓</span>
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.scan-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: #f7f7f5;
}

.scan-card {
  position: relative;
  width: 100%;
  max-width: 1024px;
  overflow: hidden;
  border-radius: 32px;
  padding: 56px;
  color: white;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  box-shadow: 0 32px 80px rgba(15, 23, 42, 0.28);
}

.glow {
  position: absolute;
  width: 280px;
  height: 280px;
  border-radius: 999px;
  filter: blur(64px);
  opacity: 0.35;
}

.glow-blue {
  right: -90px;
  top: -100px;
  background: #22d3ee;
}

.glow-purple {
  left: -100px;
  bottom: -120px;
  background: #8b5cf6;
}

.eyebrow,
h1,
.subtitle,
.progress-shell {
  position: relative;
}

.eyebrow {
  margin: 0 0 12px;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.65);
}

h1 {
  margin: 0;
  font-size: 48px;
  line-height: 1.1;
  font-weight: 700;
}

.subtitle {
  max-width: 680px;
  margin: 20px 0 0;
  font-size: 24px;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.65);
}

.progress-shell {
  margin-top: 48px;
  padding: 24px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.06);
}

.progress-track {
  height: 18px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
}

.progress-bar {
  height: 100%;
  width: 0%;
  border-radius: 999px;
  background: linear-gradient(90deg, #ef4444, #facc15, #22c55e);
  animation: progress 3s linear forwards;
}

.steps {
  margin-top: 24px;
  display: grid;
  gap: 14px;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.75);
}

.step {
  display: flex;
  justify-content: space-between;
  align-items: center;
  opacity: 0;
  transform: translateY(8px);
  animation: stepIn 0.35s ease-out forwards;
}

.step-1 {
  animation-delay: 0.1s;
}

.step-2 {
  animation-delay: 1.1s;
}

.step-3 {
  animation-delay: 2.1s;
}

.check {
  width: 28px;
  height: 28px;
  display: inline-grid;
  place-items: center;
  flex: 0 0 28px;
  margin-left: 12px;
  border-radius: 999px;
  color: #052e16;
  background: #4ade80;
  box-shadow: 0 0 0 rgba(74, 222, 128, 0);
  opacity: 0;
  transform: scale(0.4);
  animation: checkPop 0.42s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.step-1 .check {
  animation-delay: 0.4s;
}

.step-2 .check {
  animation-delay: 1.4s;
}

.step-3 .check {
  animation-delay: 2.4s;
}

.dot {
  display: inline-block;
  animation: dot 1.2s ease-in-out infinite;
}

.delay-dot-1 {
  animation-delay: 0.2s;
}

.delay-dot-2 {
  animation-delay: 0.4s;
}

@keyframes progress {
  from {
    width: 0%;
  }

  to {
    width: 100%;
  }
}

@keyframes stepIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes checkPop {
  0% {
    opacity: 0;
    transform: scale(0.4);
    box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.45);
  }

  65% {
    opacity: 1;
    transform: scale(1.18);
    box-shadow: 0 0 0 10px rgba(74, 222, 128, 0);
  }

  100% {
    opacity: 1;
    transform: scale(1);
    box-shadow: 0 0 18px rgba(74, 222, 128, 0.35);
  }
}

@keyframes dot {
  0%,
  80%,
  100% {
    opacity: 0.25;
    transform: translateY(0);
  }

  40% {
    opacity: 1;
    transform: translateY(-5px);
  }
}
</style>
