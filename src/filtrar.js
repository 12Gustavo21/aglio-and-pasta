import itemsData from './tabela.js';

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
        // https://meusite.com.br/produto/${item.name.replace(/\s+/g, '-').toLowerCase()}
        li.innerHTML = `
        <a href="#">
            <img width="50" src="${item.imagePath}">
            <span class="item-name">${item.name}</span>
        </a>
        `;
        ul.appendChild(li);
    });

    document.getElementById('inputBusca').addEventListener('keyup', filtrar);
});