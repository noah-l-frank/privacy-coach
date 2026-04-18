<template>
  <div class="wrapper">
    <div class="card">
      <h1>Desktop only 💻</h1>
      <p>This application is currently available for desktop and laptop devices only.</p>
      <p>Mobile and tablet devices are not supported at this time.</p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.wrapper {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f172a;
  color: #e5e7eb;
  font-family: system-ui, sans-serif;
}

.card {
  text-align: center;
  padding: 2rem;
  max-width: 400px;
  border-radius: 1rem;
  background: #111827;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}

h1 {
  margin-bottom: 1rem;
  font-size: 1.8rem;
}

p {
  margin: 0.5rem 0;
  color: #9ca3af;
}
</style>
