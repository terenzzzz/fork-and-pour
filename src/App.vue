<template>
  <div class="app-shell">
    <header v-if="showNav" class="site-header">
      <div class="site-header__inner">
        <RouterLink class="brand" to="/">
          <img :src="icon" alt="Fork & Pour 图标" class="brand__icon" />
          <span>Fork &amp; Pour</span>
        </RouterLink>
        <nav class="links">
          <RouterLink to="/collection">集合页</RouterLink>
          <a href="https://github.com/terenzzzz/fork-and-pour" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </nav>
      </div>
    </header>

    <main :class="{ 'site-main': showNav }">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router';
import icon from './assets/icon.webp';

const route = useRoute();
const showNav = computed(() => !route.meta.hideNav);
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  color: #f5f1ea;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(12px);
  background: rgba(20, 15, 12, 0.82);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.site-header__inner {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  padding: 14px 0;
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

.links {
  display: inline-flex;
  align-items: center;
  gap: 18px;
}

.links a {
  color: #cabfb3;
  text-decoration: none;
  font-size: 0.95rem;
}

.links a:hover {
  color: #f7c873;
}

.site-main {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  padding: 24px 0 48px;
}
</style>
