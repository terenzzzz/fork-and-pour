<template>
  <section class="collection-page">
    <section class="filters">
      <div class="filters__toolbar">
        <label class="field">
          <span>搜索名称 / 原料</span>
          <input v-model.trim="search" type="search" placeholder="例如 尼格罗尼 / 金酒 / 柠檬" />
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

      <div v-if="filteredRecipes.length" ref="resultsGridRef" class="results__grid">
        <RecipeCard v-for="recipe in paginatedRecipes" :key="recipe.id" :recipe="recipe" />
      </div>

      <div v-if="filteredRecipes.length > itemsPerPage" class="pagination">
        <button type="button" :disabled="currentPage === 1" @click="currentPage -= 1">上一页</button>
        <div class="pagination__numbers">
          <button
            v-for="page in visiblePages"
            :key="page"
            type="button"
            :class="['pagination__number', { 'pagination__number--active': page === currentPage }]"
            @click="currentPage = page"
          >
            {{ page }}
          </button>
        </div>
        <span>第 {{ currentPage }} / {{ totalPages }} 页</span>
        <button type="button" :disabled="currentPage === totalPages" @click="currentPage += 1">下一页</button>
      </div>

      <div v-else class="state-card">未找到符合条件的配方，请调整搜索词或标签。</div>
    </section>
  </section>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RecipeCard from '../components/RecipeCard.vue';
import TagFilter from '../components/TagFilter.vue';
import { filterRecipes, getAllKeywords, getRecipes } from '../utils/recipes';

const recipes = ref([]);
const loading = ref(true);
const errorMessage = ref('');
const search = ref('');
const selectedTag = ref('all');
const sort = ref('name-asc');
const itemsPerPage = 6;
const currentPage = ref(1);
const resultsGridRef = ref(null);
let animationContext;
gsap.registerPlugin(ScrollTrigger);

const keywords = computed(() => getAllKeywords(recipes.value));
const filteredRecipes = computed(() =>
  filterRecipes(recipes.value, {
    search: search.value,
    tag: selectedTag.value,
    sort: sort.value,
  }),
);
const totalPages = computed(() => Math.max(1, Math.ceil(filteredRecipes.value.length / itemsPerPage)));
const paginatedRecipes = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredRecipes.value.slice(start, start + itemsPerPage);
});
const visiblePages = computed(() => {
  const maxVisible = 7;
  if (totalPages.value <= maxVisible) {
    return Array.from({ length: totalPages.value }, (_, index) => index + 1);
  }

  const half = Math.floor(maxVisible / 2);
  let start = Math.max(1, currentPage.value - half);
  let end = Math.min(totalPages.value, start + maxVisible - 1);

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
});

const setupCardAnimations = async () => {
  if (!resultsGridRef.value || !paginatedRecipes.value.length) return;

  animationContext?.revert();
  await nextTick();
  animationContext = gsap.context(() => {
    gsap.utils.toArray('.recipe-card').forEach((card) => {
      gsap.from(card, {
        opacity: 0,
        duration: 1,
        ease: 'none',
        clearProps: 'opacity',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          once: true,
        },
      });
    });
  }, resultsGridRef.value);
};

watch([search, selectedTag, sort], () => {
  currentPage.value = 1;
});

watch(filteredRecipes, () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value;
  }
});

watch([currentPage, paginatedRecipes], () => {
  setupCardAnimations();
});

onMounted(async () => {
  try {
    recipes.value = await getRecipes();
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : '加载配方失败';
  } finally {
    loading.value = false;
  }

  await setupCardAnimations();
});

onBeforeUnmount(() => {
  animationContext?.revert();
});
</script>

<style scoped>
.collection-page {
  display: grid;
  gap: 28px;
  padding: 8px 0 8px;
}

.hero {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  padding: 32px;
  overflow: hidden;
  position: relative;
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(247, 200, 115, 0.13), rgba(255, 255, 255, 0.04));
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.hero::after {
  content: '';
  position: absolute;
  right: -40px;
  top: -40px;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(247, 200, 115, 0.2), transparent 70%);
  pointer-events: none;
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
  grid-template-columns: repeat(3, 1fr);
  justify-content: start;
  align-content: start;
  gap: 20px;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
}

.pagination button {
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 10px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.04);
  color: #f5f1ea;
  cursor: pointer;
}

.pagination button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.pagination span {
  color: #cabfb3;
}

.pagination__numbers {
  display: flex;
  gap: 8px;
}

.pagination__number {
  min-width: 40px;
}

.pagination button.pagination__number--active {
  background: rgba(247, 200, 115, 0.18);
  border-color: rgba(247, 200, 115, 0.45);
  color: #f7c873;
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
    padding: 24px;
  }

  .filters__toolbar {
    grid-template-columns: 1fr;
  }
}
</style>
