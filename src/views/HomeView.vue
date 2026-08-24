<template>
  <main class="home-page">
    <section class="hero-card">
      <div class="glow glow-blue"></div>
      <div class="glow glow-green"></div>

      <div class="content">
        <p class="eyebrow">Privacy Coach</p>

        <h1>Understand your browser privacy setup.</h1>

        <p class="subtitle">
          Privacy Coach checks basic browser signals locally and turns them into clear, personalized
          recommendations.
        </p>

        <div class="info-grid">
          <article>
            <span>01</span>
            <h2>Scan</h2>
            <p>Checks browser privacy signals locally and asks about habits like ad blocker usage.</p>
          </article>

          <article>
            <span>02</span>
            <h2>Answer</h2>
            <p>Asks a few follow-up questions to understand your privacy preferences.</p>
          </article>

          <article>
            <span>03</span>
            <h2>Improve</h2>
            <p>Shows practical recommendations based on your setup and answers.</p>
          </article>
        </div>

        <button type="button" @click="startScan">Start scan</button>

        <p class="note">
          No account needed. No upload. Progress stays only in this browser tab.
        </p>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useScanStore } from '@/stores/scanStore'

const router = useRouter()
const scanStore = useScanStore()

async function startScan() {
  await scanStore.runScan({ resetAnswers: true })
  router.push('/scan')
}
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: #f7f7f5;
}

.hero-card {
  position: relative;
  width: 100%;
  max-width: 1120px;
  overflow: hidden;
  border-radius: 32px;
  padding: 64px;
  color: white;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  box-shadow: 0 32px 80px rgba(15, 23, 42, 0.28);
}

.content {
  position: relative;
}

.glow {
  position: absolute;
  width: 320px;
  height: 320px;
  border-radius: 999px;
  filter: blur(72px);
  opacity: 0.32;
}

.glow-blue {
  right: -110px;
  top: -120px;
  background: #22d3ee;
}

.glow-green {
  left: -120px;
  bottom: -140px;
  background: #22c55e;
}

.eyebrow {
  margin: 0 0 14px;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.65);
}

h1 {
  max-width: 760px;
  margin: 0;
  font-size: 56px;
  line-height: 1.05;
  font-weight: 700;
}

.subtitle {
  font-size: 20px;
  max-width: 600px;
  margin: 24px 0 0;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.75);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  margin-top: 56px;
}

article {
  padding: 22px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.07);
  transition:
    transform 0.2s ease,
    border-color 0.2s ease;
}

article:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 255, 255, 0.25);
}

article span {
  color: #67e8f9;
  font-size: 14px;
  font-weight: 700;
}

h2 {
  margin: 10px 0 8px;
  font-size: 22px;
}

article p {
  margin: 0;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.68);
}

button {
  margin-top: 56px;
  padding: 16px 28px;
  border: none;
  border-radius: 14px;
  background: linear-gradient(135deg, #22d3ee, #4ade80);
  color: #0f172a;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(34, 211, 238, 0.25);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 40px rgba(34, 211, 238, 0.35);
}

.note {
  margin: 18px 0 0;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.55);
}

@media (max-width: 720px) {
  .home-page {
    align-items: flex-start;
    padding: 16px;
  }

  .hero-card {
    min-height: calc(100vh - 32px);
    border-radius: 24px;
    padding: 36px 20px;
  }

  .glow {
    width: 220px;
    height: 220px;
  }

  .eyebrow {
    font-size: 16px;
  }

  h1 {
    font-size: 40px;
    line-height: 1.08;
  }

  .subtitle {
    font-size: 18px;
  }

  .info-grid {
    grid-template-columns: 1fr;
    gap: 12px;
    margin-top: 36px;
  }

  article {
    padding: 18px;
    border-radius: 18px;
  }

  article:hover {
    transform: none;
  }

  button {
    width: 100%;
    margin-top: 36px;
  }
}
</style>
