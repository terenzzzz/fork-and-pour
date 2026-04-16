# Fork & Pour

> Fork & Pour 是一个把鸡尾酒配方当作代码协作的开源项目：用 JSON 管理配方、用 PR 贡献内容、用前端自动展示结果。

一个基于 Vue 3 + Vite 的鸡尾酒配方开源集合网站。核心理念是 **Content as Code**:

- 所有配方都存放在 GitHub 仓库的 JSON 文件中
- 社区用户通过 Pull Request 贡献配方
- 前端自动读取 `src/recipes/*.json`
- 使用 AJV + JSON Schema 做数据校验

## 技术栈

- Vue 3 + Composition API
- Vite
- Vue Router
- 原生 CSS
- AJV

## 项目目录

```bash
fork-and-pour/
├── scripts/
│   └── validate-recipes.mjs
├── src/
│   ├── assets/
│   │   └── recipes/
│   ├── components/
│   │   ├── IngredientList.vue
│   │   ├── RecipeCard.vue
│   │   └── TagFilter.vue
│   ├── pages/
│   │   ├── Home.vue
│   │   └── RecipeDetail.vue
│   ├── recipes/
│   │   └── negroni.json
│   ├── router/
│   │   └── index.js
│   ├── schemas/
│   │   └── recipe.schema.json
│   ├── utils/
│   │   ├── recipes.js
│   │   └── validation.js
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── index.html
├── package.json
└── vite.config.js
```

## 运行方式

```bash
npm install
npm run dev
```

校验所有配方:

```bash
npm run validate:recipes
```

构建生产版本:

```bash
npm run build
```

## 数据层设计

### 标准配方结构

每个配方都是一个独立 JSON 文件，位于:

```bash
/src/recipes/
```

字段约定:

- `id`: 唯一标识，同时建议与文件名一致
- `name`: 鸡尾酒名称
- `description`: 简介
- `github`: 作者 GitHub 用户名
- `ingredients`: 原料数组
- `directions`: 步骤数组
- `image`: 本地 WebP 文件名（放在 `src/assets/recipes/`）或 `http(s)` 远程图片地址
- `source`: 可选来源
- `keywords`: 标签数组
- `createdAt`: 可选创建日期

### 示例 JSON

```json
{
  "id": "negroni",
  "name": "尼格罗尼",
  "description": "经典苦甜平衡的意式鸡尾酒，适合餐前饮用，酒体干净利落且带有明显的草本香气。",
  "github": "open-cocktail",
  "ingredients": [
    {
      "quantity": "30",
      "measure": "ml",
      "ingredient": "金酒"
    },
    {
      "quantity": "30",
      "measure": "ml",
      "ingredient": "金巴利"
    },
    {
      "quantity": "30",
      "measure": "ml",
      "ingredient": "甜味美思"
    }
  ],
  "directions": [
    "将所有材料加入装满冰块的调酒杯中。",
    "轻轻搅拌约 20 秒至充分冰镇。",
    "滤入装有大冰块的古典杯中，并以橙皮表达香气后装饰。"
  ],
  "image": "negroni.webp",
  "source": "国际调酒师协会官方配方",
  "keywords": ["经典", "苦味", "搅拌", "金酒"],
  "createdAt": "2026-04-14"
}
```

### `recipe.schema.json`

完整 schema 位于 `src/schemas/recipe.schema.json`，核心规则包括:

- 必填字段校验
- `id` 使用小写 kebab-case
- `ingredients` 中每项都必须包含 `quantity`、`measure`、`ingredient`
- `keywords` 不允许重复
- `createdAt` 支持 `YYYY-MM-DD` 或 ISO UTC 时间

## 前端架构设计

### 页面职责

- `Home.vue`: 配方列表页，负责搜索、标签筛选、排序、卡片展示
- `RecipeDetail.vue`: 配方详情页，负责展示图片、说明、原料、步骤、作者、标签

### 组件职责

- `RecipeCard.vue`
  - `props`: `recipe`
  - 职责: 展示卡片摘要，包含封面、简介、标签、详情入口
- `IngredientList.vue`
  - `props`: `ingredients`
  - 职责: 标准化展示原料和用量
- `TagFilter.vue`
  - `props`: `tags`, `modelValue`
  - 职责: 渲染标签筛选按钮并通过 `update:modelValue` 回传选中值

### `utils` 职责

- `validation.js`: 封装 AJV schema 校验逻辑
- `recipes.js`: 读取 JSON、处理图片地址、执行重复数据校验、完成搜索和排序

## 页面功能

### 首页

- 卡片网格布局
- 支持按名称 / 原料搜索
- 支持标签筛选
- 支持名称、最新投稿、原料数量排序

### 详情页

- 图片展示
- 配方描述
- 原料列表
- 操作步骤
- 标签展示
- GitHub 作者链接

## AJV 校验示例

```js
import { validateRecipe } from './src/utils/validation';

const recipe = {
  id: 'example-drink',
  name: 'Example Drink',
  description: 'A demo cocktail recipe.',
  github: 'your-github-name',
  ingredients: [{ quantity: '45', measure: 'ml', ingredient: 'Gin' }],
  directions: ['Shake with ice', 'Strain into glass'],
  image: 'example-drink.webp',
  keywords: ['demo']
};

const result = validateRecipe(recipe);

if (!result.valid) {
  console.error(result.errors);
}
```

## 投稿规范

### 🍸 提交你的鸡尾酒配方

所有配方存储在:

```bash
/src/recipes/
```

### 🧾 提交流程

1. Fork 本仓库
2. 在 `/src/recipes/` 新建 JSON 文件
3. 在 `/src/assets/recipes/` 放入对应图片
4. 本地执行 `npm run validate:recipes`
5. 提交 Pull Request

### 🧷 文件命名规则

- 全小写
- 使用 `-` 分隔
- 示例: `example-drink.json`

### 🧩 JSON 模板

```json
{
  "id": "example-drink",
  "name": "<饮品名称>",
  "description": "<描述>",
  "github": "<你的 GitHub 用户名>",
  "ingredients": [
    {
      "quantity": "<用量>",
      "measure": "<单位>",
      "ingredient": "<原料>"
    }
  ],
  "directions": [
    "<步骤1>",
    "<步骤2>"
  ],
  "image": "example-drink.webp",
  "source": "<可选>",
  "keywords": ["<关键词>"],
  "createdAt": "2026-04-14"
}
```

### 🖼️ 图片要求

路径:

```bash
/src/assets/recipes/
```

规则:

- 文件名必须与 JSON 文件同名
- 统一使用 **WebP**，扩展名必须为 `.webp`
- 建议尺寸: `600 x 400`
- 文件体积 `<= 200KB`

### ✅ 校验要求

- JSON 必须合法
- 字段必须符合 `recipe.schema.json`
- 不允许重复 `id`
- 不允许重复 `name`
- `id` 必须与文件名一致
- `image` 必须引用 `src/assets/recipes/` 中与 `id` 同名的 `.webp` 文件（或使用 `http(s)` 外链）

### 🚀 提交 PR

- 创建 Pull Request
- 推荐接入 Vercel 或 Netlify 以自动生成预览链接
- PR 合并后自动触发生产环境发布

## 推荐 CI / 发布策略

- `pull_request`
  - 执行 `npm install`
  - 执行 `npm run validate:recipes`
  - 执行 `npm run build`
- `push main`
  - 自动发布到 Vercel / Netlify / GitHub Pages

## 工程落地建议

- 仓库把 `src/recipes/` 作为唯一内容源
- PR 检查必须拦截 schema 不合法、重名、重复 id 和图片命名错误
- 页面层不要手写业务数据，全部通过 JSON 导入生成
- 后续可扩展:
  - 多语言字段
  - 按基酒分类
  - 收藏与分享
  - 自动生成 sitemap 和 RSS
