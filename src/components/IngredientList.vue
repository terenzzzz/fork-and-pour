<template>
  <ul class="ingredient-list">
    <li v-for="item in ingredients" :key="`${item.ingredient}-${item.quantity}-${item.measure}`">
      <span class="ingredient-list__amount">{{ item.quantity }} {{ item.measure }}</span>
      <span class="ingredient-list__name">{{ item.ingredient }}</span>
    </li>
  </ul>
</template>

<script setup>
defineProps({
  ingredients: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.ingredient-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
}

.ingredient-list li {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 16px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.ingredient-list__amount {
  color: #f7c873;
  font-weight: 600;
}

.ingredient-list__name {
  color: #f5f1ea;
  text-align: right;
}

@media (max-width: 640px) {
  .ingredient-list li {
    flex-direction: column;
    gap: 6px;
  }

  .ingredient-list__name {
    text-align: left;
  }
}
</style>
