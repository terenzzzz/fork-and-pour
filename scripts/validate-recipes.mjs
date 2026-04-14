import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const recipesDir = path.join(projectRoot, 'src/recipes');
const assetsDir = path.join(projectRoot, 'src/assets/recipes');
const schemaPath = path.join(projectRoot, 'src/schemas/recipe.schema.json');

const schema = JSON.parse(await readFile(schemaPath, 'utf8'));
const ajv = new Ajv2020({ allErrors: true, strict: false });
const validate = ajv.compile(schema);

const files = (await readdir(recipesDir)).filter((file) => file.endsWith('.json'));

if (files.length === 0) {
  throw new Error('`src/recipes/` 目录下没有任何 JSON 配方文件。');
}

const ids = new Set();
const names = new Set();
const failures = [];
const supportedImageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

for (const file of files) {
  const fullPath = path.join(recipesDir, file);
  const raw = await readFile(fullPath, 'utf8');
  const recipe = JSON.parse(raw);
  const baseName = path.basename(file, '.json');

  const valid = validate(recipe);

  if (!valid) {
    failures.push(
      `${file} schema 校验失败:\n${validate.errors
        .map((error) => `- ${(error.instancePath || error.schemaPath).trim()} ${error.message}`)
        .join('\n')}`,
    );
    continue;
  }

  if (recipe.id !== baseName) {
    failures.push(`${file} 的 id 必须与文件名一致，当前为 "${recipe.id}"。`);
  }

  if (ids.has(recipe.id)) {
    failures.push(`${file} 存在重复 id: "${recipe.id}"。`);
  }

  if (names.has(recipe.name.toLowerCase())) {
    failures.push(`${file} 存在重复 name: "${recipe.name}"。`);
  }

  ids.add(recipe.id);
  names.add(recipe.name.toLowerCase());

  const imagePath = path.join(assetsDir, recipe.image);
  const imageBaseName = path.basename(recipe.image, path.extname(recipe.image));
  const imageExtension = path.extname(recipe.image).toLowerCase();

  if (!/^https?:\/\//.test(recipe.image)) {
    if (!supportedImageExtensions.has(imageExtension)) {
      failures.push(
        `${file} 的 image 扩展名仅支持 ${[...supportedImageExtensions].join(', ')}。`,
      );
    } else if (imageBaseName !== baseName) {
      failures.push(`${file} 的 image 文件名必须与 JSON 文件同名。`);
    } else {
      try {
        const imageStat = await stat(imagePath);

        if (imageStat.size > 200 * 1024) {
          failures.push(`${recipe.image} 超过 200KB，请压缩后再提交。`);
        }
      } catch {
        failures.push(`${file} 缺少图片文件: src/assets/recipes/${recipe.image}`);
      }
    }
  }
}

if (failures.length > 0) {
  throw new Error(failures.join('\n\n'));
}

console.log(`配方校验通过，共 ${files.length} 个文件。`);
