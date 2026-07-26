export class RecipeView {
  constructor() {
    this.container = document.getElementById('recipe-list');
    this.searchInput = document.getElementById('search-input');
    this.categoriesContainer = document.getElementById('category-filters');
    this.activeCategory = 'Todas';
  }

  renderCategories(categories) {
    this.categoriesContainer.innerHTML = '';
    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = `btn-category ${cat === this.activeCategory ? 'active' : ''}`;
      btn.textContent = cat;
      btn.dataset.category = cat;
      this.categoriesContainer.appendChild(btn);
    });
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
        <div class="card-image-wrapper">
          <img src="${recipe.image || 'https://via.placeholder.com/600x400?text=Receta'}" alt="${recipe.title}" loading="lazy">
          <span class="badge-category">${recipe.category || 'General'}</span>
        </div>
        <div class="card-body">
          <h2>${recipe.title}</h2>
          <span class="badge-time">⏱️ ${recipe.prepTime}</span>
          <h3>Ingredientes:</h3>
          <ul>
            ${recipe.ingredients.slice(0, 3).map(ing => `<li>${ing}</li>`).join('')}
            ${recipe.ingredients.length > 3 ? `<li><em>+ ${recipe.ingredients.length - 3} más...</em></li>` : ''}
          </ul>
          <button class="btn-detail" data-id="${recipe.id}">Ver Receta Completa</button>
        </div>
      `;
      this.container.appendChild(card);
    });
  }

  renderModal(recipe) {
    const oldModal = document.getElementById('recipe-modal');
    if (oldModal) oldModal.remove();

    const modal = document.createElement('div');
    modal.id = 'recipe-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-content">
        <button class="modal-close">&times;</button>
        <img src="${recipe.image}" alt="${recipe.title}" class="modal-image">
        <h2>${recipe.title}</h2>
        <p class="modal-meta">📁 <strong>${recipe.category}</strong> | ⏱️ <strong>${recipe.prepTime}</strong></p>
        
        <h3>Ingredientes</h3>
        <ul>
          ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
        </ul>

        <h3>Instrucciones de Preparación</h3>
        <ol>
          ${recipe.instructions.map(step => `<li>${step}</li>`).join('')}
        </ol>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });
  }

  bindSearch(handler) {
    this.searchInput.addEventListener('input', (e) => handler(e.target.value));
  }

  bindCategoryChange(handler) {
    this.categoriesContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn-category')) {
        this.activeCategory = e.target.dataset.category;
        
        // Actualizar clase activa en botones
        document.querySelectorAll('.btn-category').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        handler(this.activeCategory);
      }
    });
  }

  bindSelectRecipe(handler) {
    this.container.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn-detail')) {
        handler(e.target.getAttribute('data-id'));
      }
    });
  }
}