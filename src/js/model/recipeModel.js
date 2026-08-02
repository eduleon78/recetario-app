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

  // Obtener lista única de categorías
  getCategories() {
    const categories = this.recipes.map(r => r.category || 'General');
    return ['Todas', ...new Set(categories)];
  }

  filterRecipes(query = '', category = 'Todas') {
    const q = query.toLowerCase();
    
    return this.recipes.filter(recipe => {
      const matchesSearch = recipe.title.toLowerCase().includes(q) ||
        recipe.ingredients.some(ing => ing.toLowerCase().includes(q));
      
      const matchesCategory = category === 'Todas' || recipe.category === category;

      return matchesSearch && matchesCategory;
    });
  }
}