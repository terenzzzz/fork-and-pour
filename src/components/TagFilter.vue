<template>
  <div class="tag-filter">
    <button
      v-for="tag in ['all', ...tags]"
      :key="tag"
      type="button"
      class="tag-filter__button"
      :class="{ 'tag-filter__button--active': modelValue === tag }"
      @click="$emit('update:modelValue', tag)"
    >
      {{ tag === 'all' ? '全部' : tag }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  tags: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
    default: 'all',
  },
});

defineEmits(['update:modelValue']);
</script>

<style scoped>
.tag-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag-filter__button {
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
  color: #f5f1ea;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease;
}

.tag-filter__button:hover {
  transform: translateY(-1px);
  border-color: rgba(247, 200, 115, 0.4);
}

.tag-filter__button--active {
  background: rgba(247, 200, 115, 0.18);
  border-color: rgba(247, 200, 115, 0.45);
  color: #f7c873;
}
</style>
