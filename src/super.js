import tabela from './tabela.js';

document.addEventListener('DOMContentLoaded', function() {
    const principal = document.querySelector("#delicious");
    
    if (!principal) {
        console.error('Elemento #delicious não encontrado');
        return;
    }

    const gridContainer = principal.querySelector('.grid');
    
    if (!gridContainer) {
        console.error('Container grid não encontrado');
        return;
    }

    gridContainer.innerHTML = '';
    let itemsParaMostrar;
    
    if (tabela.length >= 6) {
        itemsParaMostrar = tabela.slice(0, 6);
    } else {
        itemsParaMostrar = tabela.slice(0, Math.min(3, tabela.length));
    }

    console.log(`Total de itens disponíveis: ${tabela.length}`);
    console.log(`Itens que serão exibidos: ${itemsParaMostrar.length}`);

    itemsParaMostrar.forEach((item) => gridContainer.innerHTML += `
    <div class="rounded-lg overflow-hidden shadow-lg" data-aos="fade-up">
      <img
        src="${item.imagePath}"
        alt="${item.name}"
        class="w-full h-48 object-cover"
      />
      <div class="p-4">
        <div class="flex text-orange-500 mb-2">★★★★★</div>
        <h3 class="text-lg font-semibold mb-2">${item.name}</h3>
        <div class="flex items-center">
          <img
            src="https://i.pravatar.cc/40"
            alt="Author"
            class="w-8 h-8 rounded-full mr-2"
          />
          <span class="text-sm text-gray-600">John Doe</span>
        </div>
      </div>
    </div>`)
});