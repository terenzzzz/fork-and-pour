import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Collection from '../pages/Collection.vue';
import RecipeDetail from '../pages/RecipeDetail.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        hideNav: true,
        title: 'Fork & Pour | 开源鸡尾酒配方集合',
        description:
          '浏览经典与现代鸡尾酒配方，支持关键词搜索、标签筛选与开源协作投稿。',
      },
    },
    {
      path: '/collection',
      name: 'collection',
      component: Collection,
      meta: {
        title: '配方集合 | Fork & Pour',
        description: '按名称、原料和标签筛选鸡尾酒配方，快速找到你想调制的一杯。',
      },
    },
    {
      path: '/recipes/:id',
      name: 'recipe-detail',
      component: RecipeDetail,
      props: true,
      meta: {
        title: '配方详情 | Fork & Pour',
        description: '查看鸡尾酒配方详情，包括原料、步骤、关键词与来源信息。',
      },
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
