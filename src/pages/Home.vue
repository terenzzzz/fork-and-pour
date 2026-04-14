<template>
  <section class="home-page">
    <header class="hero">
      <div>
        <p class="hero__eyebrow">Content as Code</p>
        <h1>开源鸡尾酒配方集合</h1>
        <p class="hero__text">
          所有配方都以 JSON 形式托管在 GitHub，任何人都可以通过 PR 提交新饮品。
        </p>
      </div>

      <a class="hero__action" href="https://github.com" target="_blank" rel="noreferrer">
        前往 GitHub 投稿
      </a>
    </header>

    <section class="filters">
      <div class="filters__toolbar">
        <label class="field">
          <span>搜索名称 / 原料</span>
          <input v-model.trim="search" type="search" placeholder="例如 negroni / gin / campari" />
        </label>

        <label class="field">
          <span>排序</span>
          <select v-model="sort">
            <option value="name-asc">名称 A-Z</option>
            <option value="name-desc">名称 Z-A</option>
            <option value="latest">最新投稿</option>
            <option value="ingredients">原料数量</option>
          </select>
        </label>
      </div>

      <TagFilter v-model="selectedTag" :tags="keywords" />
    </section>

    <section v-if="loading" class="state-card">正在加载配方...</section>
    <section v-else-if="errorMessage" class="state-card state-card--error">{{ errorMessage }}</section>

    <section v-else class="results">
      <div class="results__meta">
        <p>共 {{ filteredRecipes.length }} 款配方</p>
      </div>

      <div v-if="filteredRecipes.length" class="results__grid">
        <RecipeCard v-for="recipe in filteredRecipes" :key="recipe.id" :recipe="recipe" />
      </div>

      <div v-else class="state-card">未找到符合条件的配方，请调整搜索词或标签。</div>
    </section>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import RecipeCard from '../components/RecipeCard.vue';
import TagFilter from '../components/TagFilter.vue';
import { filterRecipes, getAllKeywords, getRecipes } from '../utils/recipes';

const recipes = ref([]);
const loading = ref(true);
const errorMessage = ref('');

const search = ref('');
const selectedTag = ref('all');
const sort = ref('name-asc');

const keywords = computed(() => getAllKeywords(recipes.value));
const filteredRecipes = computed(() =>
  filterRecipes(recipes.value, {
    search: search.value,
    tag: selectedTag.value,
    sort: sort.value,
  }),
);

onMounted(async () => {
  try {
    recipes.value = await getRecipes();
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : '加载配方失败';
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.home-page {
  display: grid;
  gap: 28px;
}

.hero {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  padding: 28px;
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(247, 200, 115, 0.13), rgba(255, 255, 255, 0.04));
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.hero h1 {
  margin: 0 0 12px;
  font-size: clamp(2rem, 4vw, 3.4rem);
  line-height: 1.08;
}

.hero__eyebrow {
  margin: 0 0 8px;
  color: #f7c873;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.78rem;
}

.hero__text {
  margin: 0;
  max-width: 62ch;
  color: #ddd2c6;
}

.hero__action {
  align-self: flex-start;
  padding: 12px 18px;
  border-radius: 14px;
  text-decoration: none;
  background: #f7c873;
  color: #1d1612;
  font-weight: 700;
  white-space: nowrap;
}

.filters {
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.filters__toolbar {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 220px;
  gap: 16px;
}

.field {
  display: grid;
  gap: 8px;
}

.field span {
  color: #cabfb3;
  font-size: 0.9rem;
}

.field input,
.field select {
  width: 100%;
  padding: 12px 14px;
  color: #f5f1ea;
  background: rgba(16, 12, 9, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
}

.results {
  display: grid;
  gap: 18px;
}

.results__meta {
  color: #cabfb3;
}

.results__meta p {
  margin: 0;
}

.results__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.state-card {
  padding: 18px 20px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.state-card--error {
  color: #ffb4ab;
  border-color: rgba(255, 120, 120, 0.35);
}

@media (max-width: 820px) {
  .hero {
    flex-direction: column;
  }

  .filters__toolbar {
    grid-template-columns: 1fr;
  }
}
</style>
