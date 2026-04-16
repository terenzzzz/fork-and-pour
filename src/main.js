import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style.css';

const siteTitle = 'Fork & Pour';
const fallbackDescription =
  'Fork & Pour 是一个开源鸡尾酒配方网站，支持按名称与原料检索，查看经典与现代配方并参与社区共建。';
const siteOrigin = 'https://fork-and-pour.vercel.app';

const upsertMeta = (selector, attributes) => {
  let node = document.head.querySelector(selector);

  if (!node) {
    node = document.createElement('meta');
    document.head.appendChild(node);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    node.setAttribute(key, value);
  });
};

const updateSeo = (to) => {
  const detailTitle =
    to.name === 'recipe-detail' && typeof to.params?.id === 'string'
      ? `${to.params.id} 配方详情 | Fork & Pour`
      : null;
  const title = detailTitle || to.meta?.title || siteTitle;
  const description = to.meta?.description || fallbackDescription;
  const canonicalHref = `${siteOrigin}${to.fullPath || '/'}`;

  document.title = title;

  upsertMeta('meta[name="description"]', { name: 'description', content: description });
  upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title });
  upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
  upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalHref });
  upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
  upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });

  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', canonicalHref);
};

router.afterEach((to) => {
  updateSeo(to);
});

createApp(App).use(router).mount('#app');
