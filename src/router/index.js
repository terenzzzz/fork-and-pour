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
      meta: { hideNav: true },
    },
    {
      path: '/collection',
      name: 'collection',
      component: Collection,
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
