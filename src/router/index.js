import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import RecipeDetail from '../pages/RecipeDetail.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/recipes/:id',
      name: 'recipe-detail',
      component: RecipeDetail,
      props: true,
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
