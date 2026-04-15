<template>
  <RouterLink class="recipe-card" :to="`/recipes/${recipe.id}`">
    <img class="recipe-card__image" :src="recipe.imageUrl" :alt="recipe.name" loading="lazy" />

    <div class="recipe-card__body">
      <div class="recipe-card__meta">
        <span class="recipe-card__author">@{{ recipe.github }}</span>
        <span class="recipe-card__count">{{ recipe.ingredients.length }} 种原料</span>
      </div>

      <h3 class="recipe-card__title">{{ recipe.name }}</h3>
      <p class="recipe-card__description">{{ recipe.description }}</p>

      <ul class="recipe-card__tags">
        <li v-for="tag in recipe.keywords.slice(0, 4)" :key="tag">
          {{ tag }}
        </li>
      </ul>
    </div>
  </RouterLink>
</template>

<script setup>
import { RouterLink } from 'vue-router';

defineProps({
  recipe: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.recipe-card {
  display: grid;
  grid-template-rows: 220px 1fr;
  text-decoration: none;
  color: inherit;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.22);
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.recipe-card:hover,
.recipe-card:focus-visible {
  transform: translateY(-2px);
  border-color: rgba(247, 200, 115, 0.45);
}

.recipe-card:focus-visible {
  outline: 2px solid rgba(247, 200, 115, 0.7);
  outline-offset: 2px;
}

.recipe-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: linear-gradient(135deg, #55331e, #1e1713);
}

.recipe-card__body {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 18px;
}

.recipe-card__meta {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  color: #cabfb3;
  font-size: 0.85rem;
}

.recipe-card__title {
  margin: 0;
  font-size: 1.35rem;
}

.recipe-card__description {
  margin: 0;
  color: #dfd4c9;
  flex: 1;
}

.recipe-card__tags {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.recipe-card__tags li {
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(247, 200, 115, 0.14);
  color: #f7c873;
  font-size: 0.85rem;
}
</style>
