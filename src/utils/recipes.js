import { validateRecipe } from './validation';

const recipeModules = import.meta.glob('../recipes/*.json', { eager: true });
const imageModules = import.meta.glob('../assets/recipes/*.webp', {
  eager: true,
  import: 'default',
});

const placeholderImage = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#5f3a24" />
        <stop offset="100%" stop-color="#18110d" />
      </linearGradient>
    </defs>
    <rect width="1200" height="800" fill="url(#bg)" />
    <circle cx="600" cy="300" r="140" fill="rgba(247,200,115,0.18)" />
    <text x="50%" y="46%" text-anchor="middle" fill="#f7c873" font-family="Arial, sans-serif" font-size="54">
      Fork &amp; Pour
    </text>
    <text x="50%" y="56%" text-anchor="middle" fill="#f2e4cf" font-family="Arial, sans-serif" font-size="30">
      Recipe image placeholder
    </text>
  </svg>
`)}`;

function mapRecipeImage(imageName) {
  if (!imageName) {
    return placeholderImage;
  }

  if (/^https?:\/\//.test(imageName)) {
    return imageName;
  }

  const matched = Object.entries(imageModules).find(([path]) => path.endsWith(`/${imageName}`));

  return matched?.[1] ?? placeholderImage;
}

function normalizeRecipe(modulePath, payload) {
  return {
    ...payload,
    filePath: modulePath,
    slug: payload.id,
    imageUrl: mapRecipeImage(payload.image),
  };
}

function ensureUniqueRecipes(recipes) {
  const idSet = new Set();
  const nameSet = new Set();

  recipes.forEach((recipe) => {
    if (idSet.has(recipe.id)) {
      throw new Error(`发现重复 id: ${recipe.id}`);
    }

    if (nameSet.has(recipe.name.toLowerCase())) {
      throw new Error(`发现重复名称: ${recipe.name}`);
    }

    idSet.add(recipe.id);
    nameSet.add(recipe.name.toLowerCase());
  });
}

export async function getRecipes() {
  const recipes = Object.entries(recipeModules).map(([modulePath, mod]) => {
    const payload = mod.default ?? mod;
    const result = validateRecipe(payload);

    if (!result.valid) {
      throw new Error(`${modulePath} 校验失败:\n${result.errors.join('\n')}`);
    }

    return normalizeRecipe(modulePath, payload);
  });

  ensureUniqueRecipes(recipes);

  return recipes.sort((left, right) => left.name.localeCompare(right.name));
}

export async function getRecipeById(id) {
  const recipes = await getRecipes();
  return recipes.find((recipe) => recipe.id === id) ?? null;
}

export function getAllKeywords(recipes) {
  return [...new Set(recipes.flatMap((recipe) => recipe.keywords))].sort((a, b) =>
    a.localeCompare(b),
  );
}

export function filterRecipes(recipes, options) {
  const { search = '', tag = 'all', sort = 'name-asc' } = options;
  const normalizedSearch = search.trim().toLowerCase();

  const filtered = recipes.filter((recipe) => {
    const matchSearch =
      normalizedSearch.length === 0 ||
      recipe.name.toLowerCase().includes(normalizedSearch) ||
      recipe.ingredients.some((item) =>
        item.ingredient.toLowerCase().includes(normalizedSearch),
      );

    const matchTag = tag === 'all' || recipe.keywords.includes(tag);

    return matchSearch && matchTag;
  });

  const sorted = [...filtered];

  if (sort === 'name-desc') {
    sorted.sort((left, right) => right.name.localeCompare(left.name));
  }

  if (sort === 'latest') {
    sorted.sort((left, right) => (right.createdAt || '').localeCompare(left.createdAt || ''));
  }

  if (sort === 'ingredients') {
    sorted.sort((left, right) => left.ingredients.length - right.ingredients.length);
  }

  if (sort === 'name-asc') {
    sorted.sort((left, right) => left.name.localeCompare(right.name));
  }

  return sorted;
}
