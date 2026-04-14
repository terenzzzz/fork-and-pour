<template>
  <div class="app-shell">
    <header class="site-header">
      <div class="site-header__inner">
        <RouterLink class="brand" to="/">
          <img :src="icon" alt="Fork & Pour 图标" class="brand__icon" />
          <span>Fork & Pour</span>
        </RouterLink>
        <a
          class="tagline"
          href="https://github.com/terenzzzz"
          target="_blank"
          rel="noopener noreferrer"
        >
          @Terence
        </a>
      </div>
    </header>

    <main class="site-main">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import icon from './assets/icon.png';
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  color: #f5f1ea;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(12px);
  background: rgba(20, 15, 12, 0.82);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.site-header__inner {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  padding: 18px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.brand {
  color: #f7c873;
  text-decoration: none;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.brand__icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.tagline {
  margin: 0;
  color: #cabfb3;
  font-size: 0.95rem;
  text-decoration: none;
}

.tagline:hover {
  color: #f7c873;
}

.site-main {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  padding: 32px 0 48px;
}

@media (max-width: 720px) {
  .site-header__inner {
    flex-direction: column;
    align-items: flex-start;
  }

  .site-main {
    width: min(100% - 24px, 1120px);
    padding-top: 24px;
  }
}
</style>
