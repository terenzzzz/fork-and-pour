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
      <video ref="heroVideoRef" muted playsinline preload="auto" :src="heroVideo"></video>
    </section>

    <section id="cocktails" class="cocktails noisy">
      <img :src="getImage('cocktail-left-leaf.png')" alt="left-leaf" id="c-left-leaf" />
      <img :src="getImage('cocktail-right-leaf.png')" alt="right-leaf" id="c-right-leaf" />
      <div class="container cocktails-list">
        <div>
          <h2>Most popular cocktails:</h2>
          <ul>
            <li v-for="item in cocktailLists" :key="item.name">
              <div>
                <h3>{{ item.name }}</h3>
                <p>{{ item.country }} | {{ item.detail }}</p>
              </div>
              <span>- {{ item.price }}</span>
            </li>
          </ul>
        </div>
        <div>
          <h2>Most loved mocktails:</h2>
          <ul>
            <li v-for="item in mocktailLists" :key="item.name">
              <div>
                <h3>{{ item.name }}</h3>
                <p>{{ item.country }} | {{ item.detail }}</p>
              </div>
              <span>- {{ item.price }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

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
    </section>

    <section id="art" class="art">
      <div class="container art-inner">
        <h2 class="will-fade">The ART</h2>
        <div class="art-content">
          <ul class="will-fade">
            <li v-for="feature in goodLists" :key="feature">
              <img :src="getImage('check.png')" alt="check" />{{ feature }}
            </li>
          </ul>
          <div class="cocktail-image">
            <img :src="getImage('under-img.jpg')" alt="cocktail" class="masked-img" />
          </div>
          <ul class="will-fade">
            <li v-for="feature in featureLists" :key="feature">
              <img :src="getImage('check.png')" alt="check" />{{ feature }}
            </li>
          </ul>
        </div>
        <div class="masked-container">
          <h2 class="will-fade">Sip-Worthy Perfection</h2>
          <div id="masked-content">
            <h3>Made with Craft, Poured with Passion</h3>
            <p>This is not just a drink. It is a carefully crafted moment made just for you.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="menu" class="menu">
      <img :src="getImage('slider-left-leaf.png')" alt="left-leaf" id="m-left-leaf" />
      <img :src="getImage('slider-right-leaf.png')" alt="right-leaf" id="m-right-leaf" />
      <nav class="cocktail-tabs">
        <button
          v-for="(cocktail, index) in allCocktails"
          :key="cocktail.id"
          :class="{ active: index === currentIndex }"
          @click="goToSlide(index)"
        >
          {{ cocktail.name }}
        </button>
      </nav>
      <div class="container menu-content">
        <div class="arrows">
          <button @click="goToSlide(currentIndex - 1)"><span>{{ prevCocktail.name }}</span></button>
          <button @click="goToSlide(currentIndex + 1)"><span>{{ nextCocktail.name }}</span></button>
        </div>
        <div class="cocktail">
          <img :src="getImage(currentCocktail.image)" :alt="currentCocktail.name" />
        </div>
        <div class="recipe">
          <div class="info">
            <p>Recipe for:</p>
            <p id="title">{{ currentCocktail.name }}</p>
          </div>
          <div class="details">
            <h2>{{ currentCocktail.title }}</h2>
            <p>{{ currentCocktail.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <footer id="contact" class="contact">
      <img :src="getImage('footer-right-leaf.png')" alt="leaf-right" id="f-right-leaf" />
      <img :src="getImage('footer-left-leaf.png')" alt="leaf-left" id="f-left-leaf" />
      <div class="container contact-content">
        <h2>Where to Find Us</h2>
        <div>
          <h3>Visit Our Bar</h3>
          <p>456, Raq Blvd. #404, Los Angeles, CA 90210</p>
        </div>
        <div>
          <h3>Contact Us</h3>
          <p>(555) 987-6543</p>
          <p>hello@jsmcocktail.com</p>
        </div>
        <div>
          <h3>Open Every Day</h3>
          <p v-for="item in openingHours" :key="item.day">{{ item.day }} : {{ item.time }}</p>
        </div>
        <div>
          <h3>Socials</h3>
          <div class="socials">
            <a v-for="item in socials" :key="item.name" :href="item.url" target="_blank" rel="noreferrer">
              <img :src="getImage(item.icon)" :alt="item.name" />
            </a>
          </div>
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

gsap.registerPlugin(ScrollTrigger);

const cocktailLists = [
  { name: 'Chapel Hill Shiraz', country: 'AU', detail: 'Battle', price: '$10' },
  { name: 'Caten Malbee', country: 'AU', detail: 'Battle', price: '$49' },
  { name: 'Rhino Pale Ale', country: 'CA', detail: '750 ml', price: '$20' },
  { name: 'Irish Guinness', country: 'IE', detail: '600 ml', price: '$29' },
];
const mocktailLists = [
  { name: 'Tropical Bloom', country: 'US', detail: 'Battle', price: '$10' },
  { name: 'Passionfruit Mint', country: 'US', detail: 'Battle', price: '$49' },
  { name: 'Citrus Glow', country: 'CA', detail: '750 ml', price: '$20' },
  { name: 'Lavender Fizz', country: 'IE', detail: '600 ml', price: '$29' },
];
const featureLists = [
  'Perfectly balanced blends',
  'Garnished to perfection',
  'Ice-cold every time',
  'Expertly shaken & stirred',
];
const goodLists = ['Handpicked ingredients', 'Signature techniques', 'Bartending artistry in action', 'Freshly muddled flavors'];
const openingHours = [
  { day: 'Mon-Thu', time: '11:00am - 12am' },
  { day: 'Fri', time: '11:00am - 2am' },
  { day: 'Sat', time: '9:00am - 2am' },
  { day: 'Sun', time: '9:00am - 1am' },
];
const socials = [
  { name: 'Instagram', icon: 'insta.png', url: '#' },
  { name: 'X', icon: 'x.png', url: '#' },
  { name: 'Facebook', icon: 'fb.png', url: '#' },
];
const allCocktails = [
  { id: 1, name: 'Classic Mojito', image: 'drink1.png', title: 'Simple Ingredients, Bold Flavor', description: 'Made with tequila, lime juice, and orange liqueur. A crisp, easy cocktail with strong character.' },
  { id: 2, name: 'Raspberry Mojito', image: 'drink2.png', title: 'A Zesty Classic That Never Fails', description: 'Tangy lime, smooth tequila, and a touch of sweetness. Shaken, frozen, or on the rocks.' },
  { id: 3, name: 'Violet Breeze', image: 'drink3.png', title: 'Simple Ingredients, Bold Flavor', description: 'Fresh citrus and floral notes combine to create a bright, refreshing signature profile.' },
  { id: 4, name: 'Curacao Mojito', image: 'drink4.png', title: 'Crafted With Care, Poured With Love', description: 'Every pour is made with fresh ingredients and attention to detail for a balanced finish.' },
];
const imageModules = import.meta.glob('../assets/images/*', { eager: true, import: 'default' });
const getImage = (fileName) => imageModules[`../assets/images/${fileName}`] ?? '';

const heroChars = 'FORK & POUR'.split('');
const heroVideoRef = ref(null);
const currentIndex = ref(0);
const currentCocktail = computed(() => allCocktails[currentIndex.value]);
const prevCocktail = computed(() => allCocktails[(currentIndex.value - 1 + allCocktails.length) % allCocktails.length]);
const nextCocktail = computed(() => allCocktails[(currentIndex.value + 1) % allCocktails.length]);

let ctx;

const goToSlide = (index) => {
  currentIndex.value = (index + allCocktails.length) % allCocktails.length;
};

const animateMenuSlide = () => {
  gsap.fromTo('#title', { opacity: 0 }, { opacity: 1, duration: 0.6 });
  gsap.fromTo('.cocktail img', { opacity: 0, xPercent: -30 }, { xPercent: 0, opacity: 1, duration: 0.8, ease: 'power1.inOut' });
  gsap.fromTo('.details h2, .details p', { yPercent: 20, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power1.inOut' });
};

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from('.hero-title .char', { yPercent: 100, duration: 1.6, ease: 'expo.out', stagger: 0.06 });
    gsap.from('.subtitle', { opacity: 0, yPercent: 100, duration: 1.2, ease: 'expo.out', stagger: 0.12, delay: 0.6 });
    gsap.timeline({ scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } }).to('.right-leaf', { y: 180 }, 0).to('.left-leaf', { y: -180 }, 0);
    gsap.timeline({ scrollTrigger: { trigger: '#cocktails', start: 'top 30%', end: 'bottom 80%', scrub: true } }).from('#c-left-leaf', { x: -100, y: 100 }).from('#c-right-leaf', { x: 100, y: 100 }, 0);
    gsap.timeline({ scrollTrigger: { trigger: '#about', start: 'top center' } }).from('#about h2', { opacity: 0, yPercent: 100, duration: 1, ease: 'expo.out' }).from('.top-grid > div, .bottom-grid > div', { opacity: 0, duration: 0.9, ease: 'power1.inOut', stagger: 0.07 }, '-=0.4');
    gsap.timeline({ scrollTrigger: { trigger: '#art', start: 'top top', end: 'bottom center', scrub: 1.2, pin: true } }).to('.will-fade', { opacity: 0, stagger: 0.2, ease: 'power1.inOut' }).to('.masked-img', { scale: 1.3, duration: 1, ease: 'power1.inOut' }).to('#masked-content', { opacity: 1, duration: 1, ease: 'power1.inOut' });
    gsap.timeline({ scrollTrigger: { trigger: '#contact', start: 'top center' } }).from('#contact h2, #contact h3, #contact p', { opacity: 0, yPercent: 50, stagger: 0.03 }).to('#f-right-leaf, #f-left-leaf', { y: -50, duration: 1, ease: 'power1.inOut' }, '-=0.3');

    if (heroVideoRef.value) {
      const video = heroVideoRef.value;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: video, start: 'center 60%', end: 'bottom top', scrub: true, pin: true },
      });
      video.onloadedmetadata = () => {
        tl.to(video, { currentTime: video.duration });
      };
    }
    animateMenuSlide();
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

.char--ampersand {
  font-family: 'DM Serif Text', serif;
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
  font-size: 0.95rem;
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
  padding: 9px 14px;
  border-radius: 999px;
  border: 1px solid rgba(231, 211, 147, 0.6);
  transition: all 0.2s ease;
  font-size: 0.9rem;
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

.hero video {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 70%;
  object-fit: cover;
  z-index: 1;
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

.cocktails-list h3 {
  margin: 0;
  font-family: 'Modern Negra', sans-serif;
  color: #e7d393;
  font-size: 1.9rem;
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

.art {
  position: relative;
  min-height: 100vh;
  background: radial-gradient(circle at center, #434343 0%, #000 50%, transparent 100%);
}

.art-inner {
  padding: 100px 0;
}

.art h2 {
  margin: 0;
  text-align: center;
  font-family: 'Modern Negra', sans-serif;
  font-size: clamp(5rem, 16vw, 14rem);
  color: #505050;
}

.art-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  gap: 24px;
}

.art-content ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 14px;
}

.art-content li {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cocktail-image {
  width: min(760px, 60vw);
  height: 70vh;
  border-radius: 28px;
  overflow: hidden;
}

.masked-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  mask-image: url('../assets/images/mask-img.png');
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: 50%;
}

.masked-container {
  position: relative;
  margin-top: 40px;
  text-align: center;
}

#masked-content {
  opacity: 0;
}

#masked-content h3 {
  font-family: 'DM Serif Text', serif;
  font-size: clamp(1.8rem, 4vw, 3.2rem);
  margin: 0;
}

.menu {
  position: relative;
  padding: 120px 0;
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

.cocktail-tabs {
  width: min(980px, calc(100% - 32px));
  margin: 0 auto 60px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
}

.cocktail-tabs button {
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  background: transparent;
  color: rgba(255, 255, 255, 0.6);
  padding-bottom: 8px;
  font-family: 'Modern Negra', sans-serif;
  font-size: 1.6rem;
  cursor: pointer;
}

.cocktail-tabs button.active {
  color: #fff;
  border-color: #fff;
}

.menu-content {
  position: relative;
}

.arrows {
  position: absolute;
  inset: 0;
  z-index: 3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
}

.arrows button {
  pointer-events: auto;
  border: none;
  background: transparent;
  color: #fff;
  font-family: 'Modern Negra', sans-serif;
  font-size: 2rem;
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
  display: flex;
  justify-content: space-between;
  gap: 30px;
  margin-top: 10px;
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
  max-width: 520px;
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
  .art-content,
  .recipe {
    grid-template-columns: 1fr;
    flex-direction: column;
  }

  .top-grid,
  .bottom-grid,
  .cocktail-tabs {
    grid-template-columns: 1fr 1fr;
  }

  .arrows {
    display: none;
  }
}
</style>
