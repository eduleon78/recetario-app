export class RecipeController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  async init() {
    const recipes = await this.model.fetchRecipes();
    this.view.renderRecipes(recipes);

    // Conectar el evento de búsqueda
    this.view.bindSearch((query) => {
      const filtered = this.model.filterRecipes(query);
      this.view.renderRecipes(filtered);
    });
  }
}