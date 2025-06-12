import itemsData from './categories.js';

document.addEventListener('DOMContentLoaded', function() {
    const gridContainer = document.querySelector("#categories");
    
    if (!gridContainer) {
        console.error('Elemento #categories não encontrado');
        return;
    }

    gridContainer.innerHTML = '';

    itemsData.forEach((item) => gridContainer.innerHTML += `
    <div class="category-card flex flex-col items-center text-center cursor-pointer">
      <div class="category-image mb-4 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
        <img src="${item.imagePath}" alt="${item.name}" class="category-image">
      </div>
      <h3 class="title-category text-lg font-semibold text-gray-900">${item.name}</h3>
    </div>`)
});
