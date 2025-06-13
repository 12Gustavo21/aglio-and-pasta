import itemsData from './categories.js';

document.addEventListener('DOMContentLoaded', function() {
    const gridContainer = document.querySelector(".container-cats");
    
    if (!gridContainer) {
        console.error('Elemento #categories não encontrado');
        return;
    }

    gridContainer.innerHTML = '';
    const categories = itemsData.slice(0, 6);

    categories.forEach((item) => gridContainer.innerHTML += `
    <a href="category.html" class="group block text-center" data-aos="fade-up" data-aos-duration="1500" data-aos-anchor-placement="top-bottom">
      <figure>
        <div class="relative w-24 h-24 md:w-40 md:h-40 mx-auto">
          <img
            src="${item.imagePath}"
            alt="${item.name}"
            class="w-full h-full object-cover rounded-full shadow-md transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <figcaption class="mt-4">
          <span
            class="font-semibold text-gray-700 transition-colors group-hover:text-red-600"
            >${item.name}</span
          >
        </figcaption>
      </figure>
    </a>`)
});