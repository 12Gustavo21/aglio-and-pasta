import tabela from './tabela2.js';

function estrelas(nota){
  let estrela = ''
  if (nota%2===0){
    for (let i=0; i<nota/2; i++){
      estrela += '<i class="fa-solid fa-star"></i>'
    }
    let nota2 = 10 - nota    
    for (let i=0; i<nota2/2; i++){
      estrela += '<i class="fa-regular fa-star"></i>'
    }
  }
  else{
    nota -= 1
    for (let i=0; i<nota/2; i++){
      estrela += '<i class="fa-solid fa-star"></i>'
    }
    estrela += '<i class="fa-solid fa-star-half-stroke"></i>'
    let nota2 = 10 - nota    
    for (let i=0; i<nota2/2-1; i++){
      estrela += '<i class="fa-regular fa-star"></i>'
    }
  }
  return estrela
}

document.addEventListener('DOMContentLoaded', function() {
    const principal = document.querySelector("#collections");
    
    if (!principal) {
        console.error('Elemento #collections não encontrado');
        return;
    }

    const gridContainer = principal.querySelector('.grid');
    
    if (!gridContainer) {
        console.error('Container grid não encontrado');
        return;
    }

    gridContainer.innerHTML = '';
    let itemsParaMostrar;
    
    if (tabela.length >= 8) {
        itemsParaMostrar = tabela.slice(0, 8);
    } else {
        itemsParaMostrar = tabela.slice(0, Math.min(4, tabela.length));
    }

    console.log(`Total de itens disponíveis: ${tabela.length}`);
    console.log(`Itens que serão exibidos: ${itemsParaMostrar.length}`);


    itemsParaMostrar.forEach((item) => gridContainer.innerHTML += `
    <div class="relative h-64 rounded-lg overflow-hidden group">
          <img
            src="${item.imagePath}"
            alt="Sushi"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-black opacity-50"></div>
          <div class="absolute inset-0 flex items-end p-6">
            <div>
              <h3 class="text-white text-xl font-bold mb-2">
              ${item.name}
              </h3>
              <button
                class="bg-white text-black px-4 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity"
              >
                View Collection
              </button>
            </div>
          </div>
        </div>`)
});
