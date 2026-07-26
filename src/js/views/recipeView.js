export class RecipeView {
  constructor() {
    this.container = document.getElementById('recipe-list');
    this.searchInput = document.getElementById('search-input');
  }

  renderRecipes(recipes) {
    this.container.innerHTML = '';

    if (recipes.length === 0) {
      this.container.innerHTML = '<p class="empty-msg">No se encontraron recetas.</p>';
      return;
    }

    recipes.forEach(recipe => {
      const card = document.createElement('article');
      card.className = 'recipe-card';
      card.innerHTML = `
        <h2>${recipe.title}</h2>
        <span class="badge">⏱️ ${recipe.prepTime}</span>
        <h3>Ingredientes:</h3>
        <ul>
          ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
        <h3>Preparación:</h3>
        <p>${recipe.instructions}</p>
      `;
      this.container.appendChild(card);
    });
  }

  bindSearch(handler) {
    this.searchInput.addEventListener('input', (e) => {
      handler(e.target.value);
    });
  }
}