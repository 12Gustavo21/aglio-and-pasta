import itemsData from './categories.js';

function filtrar() {
    var input,
        filter,
        ul,
        li,
        a,
        i,
        span,
        txtValue,
        count = 0

    input = document.getElementById('inputBusca');
    ul = document.getElementById('listaProdutos');

    filter = input.value.toUpperCase();

    li = ul.getElementsByTagName("li");

    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
            count++;
            span = li[i].querySelector(".item-name");
            if (span) {
                span.innerHTML = txtValue.replace(new RegExp(filter, "gi"), (match) => {
                    return "<strong>" + match + "</strong>";
                })
            }
        } else {
            li[i].style.display = "none";
        }
    }
    
    if(filter === ""){ 
        ul.style.display = "none";
    } else { 
        ul.style.display = "block";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log(itemsData);
    const ul = document.getElementById('listaProdutos');
    itemsData.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = `
        <a href="#" class="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-amber-50 transition-colors duration-200">
            <img class="w-12 h-12 object-cover rounded-md mr-4" src="${item.imagePath}">
            <span class="item-name font-medium">${item.name}</span>
        </a>
        `;
        ul.appendChild(li);
    });

    document.getElementById('inputBusca').addEventListener('keyup', filtrar);
});