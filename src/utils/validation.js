import Ajv2020 from 'ajv/dist/2020';
import recipeSchema from '../schemas/recipe.schema.json';

const ajv = new Ajv2020({
  allErrors: true,
  strict: false,
});

const validateRecipeSchema = ajv.compile(recipeSchema);

export function validateRecipe(recipe) {
  const valid = validateRecipeSchema(recipe);

  return {
    valid,
    errors:
      validateRecipeSchema.errors?.map((error) => {
        const path = error.instancePath || error.schemaPath;
        return `${path} ${error.message}`.trim();
      }) ?? [],
  };
}
