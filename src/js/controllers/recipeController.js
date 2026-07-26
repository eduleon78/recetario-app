export class RecipeController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.currentQuery = '';
    this.currentCategory = 'Todas';
  }

  async init() {
    const recipes = await this.model.fetchRecipes();
    
    // Renderizar categorías dinámicamente y recetas iniciales
    const categories = this.model.getCategories();
    this.view.renderCategories(categories);
    this.view.renderRecipes(recipes);

    // Evento de búsqueda por texto
    this.view.bindSearch((query) => {
      this.currentQuery = query;
      this.updateView();
    });

    // Evento de clic en categorías
    this.view.bindCategoryChange((category) => {
      this.currentCategory = category;
      this.updateView();
    });

    // Evento para abrir detalle
    this.view.bindSelectRecipe((id) => {
      const recipe = this.model.recipes.find(r => r.id === id);
      if (recipe) this.view.renderModal(recipe);
    });
  }

  updateView() {
    const filtered = this.model.filterRecipes(this.currentQuery, this.currentCategory);
    this.view.renderRecipes(filtered);
  }
}