import { RecipeModel } from './js/models/RecipeModel.js';
import { RecipeView } from './js/views/RecipeView.js';
import { RecipeController } from './js/controllers/RecipeController.js';

document.addEventListener('DOMContentLoaded', () => {
  const model = new RecipeModel();
  const view = new RecipeView();
  const app = new RecipeController(model, view);

  app.init();
});