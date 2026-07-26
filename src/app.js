import { RecipeModel } from './js/model/recipeModel.js';
import { RecipeView } from './js/views/recipeView.js';
import { RecipeController } from './js/controllers/recipeController.js';

document.addEventListener('DOMContentLoaded', () => {
  const model = new RecipeModel();
  const view = new RecipeView();
  const app = new RecipeController(model, view);

  app.init();
});