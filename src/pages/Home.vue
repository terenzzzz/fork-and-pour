<template>
  <main class="landing-page">
    <section id="hero" class="hero noisy">
      <h1 class="hero-title">
        <span
          v-for="(char, index) in heroChars"
          :key="`${char}-${index}`"
          class="char"
          :class="{ 'char--ampersand': char === '&' }"
        >
          {{ char === ' ' ? '\u00A0' : char }}
        </span>
      </h1>
      <img :src="getImage('hero-left-leaf.png')" alt="left-leaf" class="left-leaf" />
      <img :src="getImage('hero-right-leaf.png')" alt="right-leaf" class="right-leaf" />
      <div class="container hero-body">
        <div class="hero-content">
          <div class="hero-intro">
            <p>Fork &amp; Pour</p>
            <p class="subtitle">开源鸡尾酒配方集合</p>
          </div>
          <div class="view-cocktails">
            <p class="subtitle">
              这是一个面向调酒爱好者的配方站点：你可以浏览社区沉淀的配方集合，查看每杯酒的原料与步骤，
              也可以通过 GitHub 持续共建内容。
            </p>
            <div class="hero-actions">
              <a href="/collection">进入配方集合</a>
              <a href="https://github.com/terenzzzz/fork-and-pour" target="_blank" rel="noreferrer">
                查看 GitHub 仓库
              </a>
            </div>
          </div>
        </div>
      </div>
      <div ref="heroVideoShellRef" class="hero-video-shell">
        <video ref="heroVideoRef" muted playsinline preload="auto" :src="heroVideo"></video>
      </div>
    </section>

    <section id="cocktails" class="cocktails noisy">
      <img :src="getImage('cocktail-left-leaf.png')" alt="left-leaf" id="c-left-leaf" />
      <img :src="getImage('cocktail-right-leaf.png')" alt="right-leaf" id="c-right-leaf" />
      <div class="container cocktails-list">
        <div>
          <h2>Built for Contributors</h2>
          <ul>
            <li v-for="item in projectHighlights" :key="item.name">
              <div>
                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>
              </div>
            </li>
          </ul>
        </div>
        <div>
          <h2>Contribution Workflow</h2>
          <ul>
            <li v-for="item in contributionSteps" :key="item.name">
              <div>
                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
<!-- 
    <section id="about" class="about container">
      <div class="about-heading">
        <div>
          <p class="badge">Best Cocktails</p>
          <h2>
            Where every detail matters <span>-</span>
            from muddle to garnish
          </h2>
        </div>
        <div class="sub-content">
          <p>
            Every cocktail we serve is a reflection of our obsession with detail - from the first muddle to
            the final garnish. That care is what turns a simple drink into something truly memorable.
          </p>
          <div>
            <p><strong>4.5</strong>/5</p>
            <p>More than +12000 customers</p>
          </div>
        </div>
      </div>
      <div class="image-grid top-grid">
        <div><div class="noise-layer"></div><img :src="getImage('abt1.png')" alt="abt1" /></div>
        <div><div class="noise-layer"></div><img :src="getImage('abt2.png')" alt="abt2" /></div>
        <div><div class="noise-layer"></div><img :src="getImage('abt5.png')" alt="abt5" /></div>
      </div>
      <div class="image-grid bottom-grid">
        <div><div class="noise-layer"></div><img :src="getImage('abt3.png')" alt="abt3" /></div>
        <div><div class="noise-layer"></div><img :src="getImage('abt4.png')" alt="abt4" /></div>
      </div>
    </section> -->

    <section v-if="menuRecipes.length" id="menu" class="menu">
      <img :src="getImage('slider-left-leaf.png')" alt="left-leaf" id="m-left-leaf" />
      <img :src="getImage('slider-right-leaf.png')" alt="right-leaf" id="m-right-leaf" />
      <div class="container menu-heading">
        <h2 class="menu-title">Newest Recipes</h2>
      </div>
      <div class="container menu-content">
        <div class="menu-layout">
          <div class="cocktail">
            <img :src="currentRecipe.imageUrl" :alt="currentRecipe.name" />
          </div>
          <div class="recipe">
            <div class="info">
              <p>当前配方</p>
              <p id="title">{{ currentRecipe.name }}</p>
            </div>
            <div class="details">
              <h2>{{ recipeKeywordsLine }}</h2>
              <p>{{ currentRecipe.description }}</p>
            </div>
            <div class="arrows">
              <button @click="goToSlide(currentIndex - 1)" aria-label="上一条配方"><span>&larr;</span></button>
              <button @click="goToSlide(currentIndex + 1)" aria-label="下一条配方"><span>&rarr;</span></button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer id="contact" class="contact">
      <img :src="getImage('footer-right-leaf.png')" alt="leaf-right" id="f-right-leaf" />
      <img :src="getImage('footer-left-leaf.png')" alt="leaf-left" id="f-left-leaf" />
      <div class="container contact-content">
        <div>
          <h3>关于项目</h3>
          <p>这是一个开源的鸡尾酒配方收集与检索工具，欢迎自由浏览和使用。</p>
        </div>
        <div>
          <h3>参与贡献</h3>
          <p>欢迎提交新配方、修复问题或提出功能建议。</p>
          <p>你可以通过 Issue 和 Pull Request 一起完善这个项目。</p>
        </div>
        <div>
          <h3>项目状态</h3>
          <p v-for="item in openingHours" :key="item.day">{{ item.day }}：{{ item.time }}</p>
        </div>
        <div>
          <h3>项目链接</h3>
          <p>
            GitHub 仓库：
            <a href="https://github.com/terenzzzz/fork-and-pour" target="_blank" rel="noreferrer">
              github.com/terenzzzz/fork-and-pour
            </a>
          </p>
          <p>
            作者：
            <a href="https://terenzzzz.cn/" target="_blank" rel="noreferrer">@Terence</a>
          </p>
        </div>
      </div>
    </footer>
  </main>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroVideo from '../assets/videos/output.mp4';
import { filterRecipes, getRecipes } from '../utils/recipes.js';

gsap.registerPlugin(ScrollTrigger);

const projectHighlights = [
  { name: 'independent-json', title: '每个配方都是独立 JSON 文件', description: '内容结构清晰，便于版本管理与协作审阅。' },
  { name: 'clear-schema', title: '清晰字段约定，提交门槛低', description: '按约定填写即可贡献，降低新贡献者上手成本。' },
  { name: 'community-library', title: '从个人收藏到社区知识库', description: '持续积累可复用配方，让内容价值不断增长。' },
];
const contributionSteps = [
  { name: 'create-recipe', title: '创建 recipe 文件并填写必要字段', description: '在 src/recipes/ 新建 JSON，补全 id、name、ingredients 等核心字段。' },
  { name: 'add-image-assets', title: '添加图片到 assets', description: '将配方图片放入 src/assets/images/，并在 JSON 中填写对应 image 文件名。' },
  { name: 'open-pr', title: '发起 Pull Request 并等待 Review', description: '提交变更后由维护者审核，通过后即可合并。' },
];
const openingHours = [
  { day: '维护状态', time: '持续维护中' },
  { day: '内容更新', time: '欢迎社区持续补充' },
  { day: '数据来源', time: '公开提交与协作整理' },
  { day: '许可方式', time: '开源协议发布' },
];
const imageModules = import.meta.glob('../assets/images/*', { eager: true, import: 'default' });
const getImage = (fileName) => imageModules[`../assets/images/${fileName}`] ?? '';

const menuRecipes = ref([]);

const heroChars = 'FORK & POUR'.split('');
const heroVideoRef = ref(null);
const heroVideoShellRef = ref(null);
const currentIndex = ref(0);
const currentRecipe = computed(() => menuRecipes.value[currentIndex.value]);
const recipeKeywordsLine = computed(() => currentRecipe.value?.keywords?.join(' · ') ?? '');

let ctx;

const goToSlide = (index) => {
  const len = menuRecipes.value.length;
  if (!len) return;
  currentIndex.value = (index + len) % len;
};

const animateMenuSlide = () => {
  gsap.fromTo('#title', { opacity: 0 }, { opacity: 1, duration: 0.6 });
  gsap.fromTo('.cocktail img', { opacity: 0, xPercent: -30 }, { xPercent: 0, opacity: 1, duration: 0.8, ease: 'power1.inOut' });
  gsap.fromTo('.details h2, .details p', { yPercent: 20, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power1.inOut' });
};

onMounted(async () => {
  try {
    const recipes = await getRecipes();
    menuRecipes.value = filterRecipes(recipes, { sort: 'latest' }).slice(0, 5);
    currentIndex.value = 0;
  } catch (error) {
    console.error('加载首页配方失败:', error);
    menuRecipes.value = [];
  }

  await nextTick();

  ctx = gsap.context(() => {
    gsap.from('.hero-title .char', { yPercent: 100, duration: 1.6, ease: 'expo.out', stagger: 0.06 });
    gsap.from('.subtitle', { opacity: 0, yPercent: 100, duration: 1.2, ease: 'expo.out', stagger: 0.12, delay: 0.6 });
    gsap.timeline({ scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } }).to('.right-leaf', { y: 180 }, 0).to('.left-leaf', { y: -180 }, 0);
    gsap.timeline({ scrollTrigger: { trigger: '#cocktails', start: 'top 30%', end: 'bottom 80%', scrub: true } }).from('#c-left-leaf', { x: -100, y: 100 }).from('#c-right-leaf', { x: 100, y: 100 }, 0);
    gsap.timeline({ scrollTrigger: { trigger: '#about', start: 'top center' } }).from('#about h2', { opacity: 0, yPercent: 100, duration: 1, ease: 'expo.out' }).from('.top-grid > div, .bottom-grid > div', { opacity: 0, duration: 0.9, ease: 'power1.inOut', stagger: 0.07 }, '-=0.4');
    gsap.timeline({ scrollTrigger: { trigger: '#contact', start: 'top center' } }).from('#contact h2, #contact h3, #contact p', { opacity: 0, yPercent: 50, stagger: 0.03 }).to('#f-right-leaf, #f-left-leaf', { y: -50, duration: 1, ease: 'power1.inOut' }, '-=0.3');

    if (heroVideoRef.value && heroVideoShellRef.value) {
      const video = heroVideoRef.value;
      const videoShell = heroVideoShellRef.value;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          pin: videoShell,
        },
      });
      video.onloadedmetadata = () => {
        tl.to(video, { currentTime: video.duration });
      };
    }
    if (menuRecipes.value.length) {
      animateMenuSlide();
    }
  });
});

watch(currentIndex, async () => {
  await nextTick();
  animateMenuSlide();
});

onBeforeUnmount(() => {
  if (ctx) ctx.revert();
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
});
</script>

<style>
.landing-page {
  width: 100%;
  overflow-x: hidden;
  position: relative;
}

.landing-page::after {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 999;
  background-image: url('../assets/images/noise.png');
  background-repeat: repeat;
  background-size: 280px 180px;
  opacity: 0.16;
  mix-blend-mode: soft-light;
}

.container {
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
}

.noisy {
  position: relative;
}

.noisy::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: url('../assets/images/noise.png');
  background-repeat: repeat;
  z-index: 3;
}

.noisy > * {
  position: relative;
  z-index: 2;
}

.noise-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: url('../assets/images/noise.png') repeat;
  background-size: 260px 170px;
  opacity: 0.24;
  z-index: 2;
}

.hero {
  position: relative;
  min-height: 100vh;
  padding-top: 140px;
}

.hero-title {
  margin: 0;
  text-align: center;
  font-size: clamp(3.8rem, 13.8vw, 13.5rem);
  font-family: 'Modern Negra', sans-serif;
  line-height: 0.9;
  position: relative;
  z-index: 5;
}

.char {
  display: inline-block;
  background: linear-gradient(to bottom, #fff, #898989);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.left-leaf,
.right-leaf {
  position: absolute;
  z-index: 2;
}

.left-leaf {
  left: 0;
  top: 80px;
  width: min(220px, 35vw);
}

.right-leaf {
  right: 0;
  top: 200px;
  width: min(140px, 25vw);
}

.hero-body {
  position: relative;
  z-index: 5;
  margin-top: 18vh;
}

.hero-content {
  display: flex;
  justify-content: space-between;
  gap: 32px;
  align-items: flex-end;
}

.hero-intro p:last-child {
  font-family: 'Modern Negra', sans-serif;
  color: #e7d393;
  font-size: clamp(1.9rem, 4.2vw, 3.2rem);
}

.view-cocktails {
  max-width: 360px;
  display: grid;
  gap: 14px;
}

.view-cocktails p {
  font-size: 1.02rem;
  line-height: 1.6;
}

.view-cocktails a {
  color: #e7d393;
  text-decoration: none;
  font-weight: 700;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.hero-actions a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 15px;
  border-radius: 999px;
  border: 1px solid rgba(231, 211, 147, 0.6);
  transition: all 0.2s ease;
  font-size: 0.96rem;
}

.hero-actions a:first-child {
  background: #e7d393;
  color: #111;
}

.hero-actions a:last-child {
  background: rgba(255, 255, 255, 0.04);
  color: #efefef;
}

.hero-actions a:hover {
  transform: translateY(-1px);
}

.hero-video-shell {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: clamp(72vh, 82%, 88vh);
  overflow: hidden;
  z-index: 1;
  pointer-events: none;
}

.hero-video-shell video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center bottom;
  transform: scale(0.82);
  transform-origin: center bottom;
  background: #111;
}

@media (max-width: 767px) {
  .hero-video-shell {
    height: 70%;
  }

  .hero-video-shell video {
    transform: none;
    background: transparent;
    object-position: center;
  }
}

.cocktails {
  position: relative;
  min-height: 100vh;
  padding: 120px 0 80px;
}

.cocktails > img {
  position: absolute;
}

#c-left-leaf {
  left: 0;
  top: 40px;
  width: min(220px, 35vw);
}

#c-right-leaf {
  right: 0;
  top: 40px;
  width: min(220px, 35vw);
}

.cocktails-list {
  position: relative;
  z-index: 3;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 40px;
}

.cocktails-list ul {
  list-style: none;
  padding: 0;
}

.cocktails-list li {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin: 18px 0;
}

.cocktails-list h2 {
  font-size: clamp(1.8rem, 3.2vw, 2.6rem);
}

.cocktails-list h3 {
  margin: 0;
  font-family: 'Modern Negra', sans-serif;
  color: #e7d393;
  font-size: 1.5rem;
}

.cocktails-list p {
  margin: 4px 0 0;
  font-size: 0.95rem;
}

.about {
  padding: 120px 0;
}

.about-heading {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 28px;
  margin-bottom: 28px;
}

.badge {
  display: inline-block;
  padding: 8px 14px;
  border-radius: 999px;
  background: #efefef;
  color: #111;
}

.about h2 {
  margin: 10px 0;
  font-family: 'Modern Negra', sans-serif;
  font-size: clamp(2.4rem, 5vw, 4.2rem);
}

.image-grid {
  display: grid;
  gap: 16px;
  margin-bottom: 16px;
}

.top-grid {
  grid-template-columns: 3fr 6fr 3fr;
}

.bottom-grid {
  grid-template-columns: 8fr 4fr;
}

.image-grid > div {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  min-height: 290px;
}

.image-grid img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
  z-index: 1;
}

.menu {
  position: relative;
  padding: 120px 0;
}

.menu-heading {
  position: relative;
  z-index: 2;
  margin-bottom: 28px;
}

.menu-title {
  margin: 0;
  text-align: center;
  font-family: 'Modern Negra', sans-serif;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  letter-spacing: 0.04em;
  color: #e7d393;
}

#m-left-leaf,
#m-right-leaf {
  position: absolute;
}

#m-left-leaf {
  left: 0;
  bottom: 0;
  width: min(240px, 30vw);
}

#m-right-leaf {
  right: 0;
  top: 0;
  width: min(220px, 30vw);
}

.menu-content {
  margin-top: 20px;
}

.menu-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: 48px;
  align-items: center;
}

.arrows button {
  border: none;
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
  font-size: 1.6rem;
  width: 48px;
  height: 48px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
}

.cocktail {
  display: flex;
  justify-content: center;
}

.cocktail img {
  max-height: 60vh;
}

.recipe {
  display: grid;
  gap: 22px;
  align-content: center;
}

#title {
  margin: 0;
  font-family: 'Modern Negra', sans-serif;
  font-size: clamp(2.3rem, 5vw, 4rem);
  color: #e7d393;
}

.details h2 {
  margin: 0 0 10px;
  font-family: 'DM Serif Text', serif;
  font-size: clamp(2rem, 4vw, 3rem);
}

.details p {
  max-width: 460px;
}

.arrows {
  display: flex;
  gap: 12px;
}

.contact {
  position: relative;
  padding: 100px 0 40px;
  text-align: center;
  min-height: 100vh;
}

#f-left-leaf,
#f-right-leaf {
  position: absolute;
}

#f-left-leaf {
  left: 0;
  bottom: 0;
  width: min(260px, 34vw);
}

#f-right-leaf {
  right: 0;
  top: 0;
  width: min(240px, 28vw);
}

.contact-content {
  position: relative;
  z-index: 3;
  display: grid;
  gap: 34px;
}

.contact h2 {
  margin: 0;
  font-family: 'Modern Negra', sans-serif;
  font-size: clamp(3.5rem, 9vw, 8rem);
}

.contact h3 {
  margin: 0 0 6px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.contact p {
  margin: 0;
}

.socials {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.socials img {
  width: 28px;
}

@media (max-width: 900px) {
  .hero-content,
  .about-heading,
  .cocktails-list,
  .menu-layout {
    grid-template-columns: 1fr;
  }

  .top-grid,
  .bottom-grid {
    grid-template-columns: 1fr 1fr;
  }

  .recipe {
    gap: 16px;
  }
}
</style>
