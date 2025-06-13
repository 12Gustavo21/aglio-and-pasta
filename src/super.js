import tabela from "./tabela.js";

function estrelas(nota) {
  let estrela = "";
  if (nota % 2 === 0) {
    for (let i = 0; i < nota / 2; i++) {
      estrela += '<i class="fa-solid fa-star"></i>';
    }
    let nota2 = 10 - nota;
    for (let i = 0; i < nota2 / 2; i++) {
      estrela += '<i class="fa-regular fa-star"></i>';
    }
  } else {
    nota -= 1;
    for (let i = 0; i < nota / 2; i++) {
      estrela += '<i class="fa-solid fa-star"></i>';
    }
    estrela += '<i class="fa-solid fa-star-half-stroke"></i>';
    let nota2 = 10 - nota;
    for (let i = 0; i < nota2 / 2 - 1; i++) {
      estrela += '<i class="fa-regular fa-star"></i>';
    }
  }
  return estrela;
}

function desconto(preco, desconto) {
  let tirar = (100 - desconto) / 100;
  let valorFinal = preco * tirar;
  valorFinal = Math.ceil(valorFinal)
  valorFinal = valorFinal-0.1
  return valorFinal.toFixed(2);
}
// Proposta 1: Design Limpo e Moderno
document.addEventListener("DOMContentLoaded", function () {
  const principal = document.querySelector("#delicious");
  const gridContainer = principal.querySelector(".grid");

  gridContainer.innerHTML = "";
  let itemsParaMostrar = tabela.slice(0, 6);

  itemsParaMostrar.forEach((item) => {
    const card = document.createElement("div");
    card.className =
      "group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300";

    card.innerHTML = `
        <div class="relative">
            <img 
                src="${item.imagePath}" 
                alt="${item.name}" 
                class="w-full h-48 object-cover" />
            
            <div class="absolute top-3 right-3 bg-black/50 text-white text-[10px] font-semibold py-1 px-2 rounded-md">
                ${item.desconto}% OFF
            </div>
            
            <button class="favorite-btn absolute top-3 left-3 w-8 h-8 flex items-center justify-center bg-white/70 backdrop-blur-sm rounded-full text-gray-600 hover:text-red-500 transition-colors">
                <i class="far fa-heart text-base"></i>
            </button>
        </div>
        
        <div class="p-4"> <div class="flex justify-between items-start mb-2">
                <div>
                  <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider">${
                    item.category
                  }</span>
                  <h3 class="text-lg font-bold text-gray-800 group-hover:text-orange-600 transition-colors">${
                    item.name
                  }</h3>
                </div>
                <div class="flex mt-1">
                    ${estrelas(item.rating)}
                </div>
            </div>
            
            <div class="flex items-center justify-between mt-4">
                <div class="flex items-baseline space-x-2">
                    <span class="text-xl font-bold text-gray-900">R$${desconto(
                      item.price,
                      item.desconto
                    )}</span>
                    <del class="text-gray-400 text-sm">R$${item.price}</del>
                </div>
                
                <button class="bg-orange-100 text-orange-600 hover:bg-orange-500 hover:text-white transition-all duration-300 font-bold w-10 h-10 rounded-full flex items-center justify-center">
                    <i class="fa-solid fa-cart-plus"></i>
                </button>
            </div>
        </div>
        `;
    gridContainer.appendChild(card);
  });

  document.querySelectorAll(".favorite-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const icon = this.querySelector("i");
      if (icon.classList.contains("far")) {
        icon.classList.replace("far", "fas");
        icon.classList.add("text-red-500");
      } else {
        icon.classList.replace("fas", "far");
        icon.classList.remove("text-red-500");
      }
    });
  });
});
