<template>
  <section v-if="loading" class="detail-state">正在加载配方详情...</section>
  <section v-else-if="errorMessage" class="detail-state detail-state--error">{{ errorMessage }}</section>

  <article v-else-if="recipe" class="detail-page">
    <RouterLink class="detail-page__back" to="/collection">← 返回配方列表</RouterLink>

    <section class="detail-page__hero">
      <img class="detail-page__image" :src="recipe.imageUrl" :alt="recipe.name" />

      <div class="detail-page__summary">
        <p class="detail-page__eyebrow">Recipe Detail</p>
        <h1>{{ recipe.name }}</h1>
        <p class="detail-page__description">{{ recipe.description }}</p>

        <div class="detail-page__meta">
          <a
            :href="`https://github.com/${recipe.github}`"
            target="_blank"
            rel="noreferrer"
          >
            @{{ recipe.github }}
          </a>
          <span v-if="recipe.source">来源：{{ recipe.source }}</span>
          <span v-if="recipe.createdAt">创建于 {{ recipe.createdAt }}</span>
        </div>

        <ul class="detail-page__tags">
          <li v-for="tag in recipe.keywords" :key="tag">{{ tag }}</li>
        </ul>
      </div>
    </section>

    <section class="detail-page__content">
      <div class="detail-card">
        <h2>原料清单</h2>
        <IngredientList :ingredients="recipe.ingredients" />
      </div>

      <div class="detail-card">
        <h2>调制步骤</h2>
        <ol class="steps">
          <li v-for="step in recipe.directions" :key="step">{{ step }}</li>
        </ol>
      </div>
    </section>
  </article>

  <section v-else class="detail-state">未找到对应配方。</section>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { RouterLink } from 'vue-router';
import IngredientList from '../components/IngredientList.vue';
import { getRecipeById } from '../utils/recipes';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const recipe = ref(null);
const loading = ref(true);
const errorMessage = ref('');

async function loadRecipe() {
  loading.value = true;
  errorMessage.value = '';

  try {
    recipe.value = await getRecipeById(props.id);
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : '加载详情失败';
  } finally {
    loading.value = false;
  }
}

onMounted(loadRecipe);
watch(() => props.id, loadRecipe);
</script>

<style scoped>
.detail-page {
  display: grid;
  gap: 24px;
}

.detail-page__back {
  color: #cabfb3;
  text-decoration: none;
}

.detail-page__hero {
  display: grid;
  grid-template-columns: minmax(320px, 460px) minmax(0, 1fr);
  gap: 24px;
  padding: 24px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.detail-page__image {
  width: 100%;
  height: 100%;
  min-height: 320px;
  object-fit: cover;
  border-radius: 18px;
  background: linear-gradient(135deg, #55331e, #1e1713);
}

.detail-page__summary {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.detail-page__eyebrow {
  margin: 0;
  color: #f7c873;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.78rem;
}

.detail-page__summary h1 {
  margin: 0;
  font-size: clamp(2rem, 3.5vw, 3rem);
}

.detail-page__description {
  margin: 0;
  color: #ddd2c6;
}

.detail-page__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 18px;
  color: #cabfb3;
}

.detail-page__meta a {
  color: #f7c873;
}

.detail-page__tags {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.detail-page__tags li {
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(247, 200, 115, 0.14);
  color: #f7c873;
}

.detail-page__content {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.detail-card {
  display: grid;
  gap: 16px;
  padding: 22px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.detail-card h2 {
  margin: 0;
}

.steps {
  margin: 0;
  padding-left: 20px;
  display: grid;
  gap: 12px;
  color: #f5f1ea;
}

.detail-state {
  padding: 18px 20px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.detail-state--error {
  color: #ffb4ab;
  border-color: rgba(255, 120, 120, 0.35);
}

@media (max-width: 920px) {
  .detail-page__hero,
  .detail-page__content {
    grid-template-columns: 1fr;
  }
}
</style>
