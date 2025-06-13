import tabela from "./data/favorites-massas";

document.addEventListener("DOMContentLoaded", function () {
  const principal = document.querySelector("#collections");

  if (!principal) {
    console.error("Elemento #collections não encontrado");
    return;
  }

  const gridContainer = principal.querySelector(".grid");

  if (!gridContainer) {
    console.error("Container grid não encontrado");
    return;
  }

  gridContainer.innerHTML = "";
  let itemsParaMostrar;

  if (tabela.length >= 8) {
    itemsParaMostrar = tabela.slice(0, 8);
  } else {
    itemsParaMostrar = tabela.slice(0, Math.min(4, tabela.length));
  }

  console.log(`Total de itens disponíveis: ${tabela.length}`);
  console.log(`Itens que serão exibidos: ${itemsParaMostrar.length}`);

  itemsParaMostrar.forEach(
    (item) =>
      (gridContainer.innerHTML += `
    <div class="relative h-64 rounded-lg overflow-hidden group shadow-lg hover:shadow-xl transition-shadow duration-300" data-aos="fade-up" data-aos-duration="1500" data-aos-anchor-placement="top-bottom">
      <img
        src="${item.imagePath}"
        alt="${item.name}" class="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
      />

      <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

      <div class="absolute inset-0 flex items-end p-6">
        <div class="transform transition-transform duration-300 ease-in-out group-hover:-translate-y-2">
          <h3 class="text-white text-xl font-bold mb-2">
            ${item.name}
          </h3>
          <button
            class="bg-white text-black px-4 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            Details
          </button>
        </div>
      </div>
    </div>`)
  );
});
