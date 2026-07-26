export class RecipeModel {
  constructor() {
    this.recipes = [];
  }

  async fetchRecipes() {
    try {
      const response = await fetch('./data/recipes.json');
      this.recipes = await response.json();
      return this.recipes;
    } catch (error) {
      console.error('Error cargando las recetas:', error);
      return [];
    }
  }

  filterRecipes(query) {
    const q = query.toLowerCase();
    return this.recipes.filter(recipe => 
      recipe.title.toLowerCase().includes(q) ||
      recipe.ingredients.some(ing => ing.toLowerCase().includes(q))
    );
  }
}