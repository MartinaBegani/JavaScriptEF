const carrito = document.getElementById("carrito");
const carteras = document.getElementById("lista-carteras");
const listaCarteras = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

cargarEventListeners();

function cargarEventListeners() {
  carteras.addEventListener("click", comprarCartera);
  carrito.addEventListener("click", eliminarCartera);
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
  document.addEventListener("DOMContentLoaded", leerLocalStorage);
}

function comprarCartera(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cartera = e.target.parentElement.parentElement;
        leerDatosCartera(cartera);
    }
}

function leerDatosCartera(cartera){
    const infoCartera = {
        imagen: cartera.querySelector('img').src,
        titulo: cartera.querySelector('h4').textContent,
        precio: cartera.querySelector('.precio span').textContent,
        id: cartera.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoCartera);
}

function insertarCarrito(cartera) {
    const row = document.createElement('tr');
    row.innerHTML = `
       <td>
           <img src="${cartera.imagen}" width=100> 
       </td> 
       <td>${cartera.titulo}</td>
       <td>${cartera.precio}</td>
       <td>
        <a href="#" class="borrar-cartera" data-id="${cartera.id}">X</a>
       </td>
    `;
    listaCarteras.appendChild(row);
    guardarCarteraLocalStorage(cartera);
}

function eliminarCartera(e) {
    e.preventDefault();

    let cartera,
        carteraId;
    
    if(e.target.classList.contains('borrar-cartera')) {
        e.target.parentElement.parentElement.remove();
        cartera = e.target.parentElement.parentElement;
        carteraId = cartera.querySelector('a').getAttribute('data-id');
    }
    eliminarCarteraLocalStorage(platilloId)
}

function vaciarCarrito(){
    while(listaCarteras.firstChild){
        listaCarteras.removeChild(listaCarteras.firstChild);
    }
    vaciarLocalStorage();

    return false;
}

function guardarCarteraLocalStorage(cartera) {
    let carteras;

    carteras = obtenerCarterasLocalStorage();
    carteras.push(cartera);

    localStorage.setItem('carteras', JSON.stringify(carteras));
}

function obtenerCarterasLocalStorage() {
    let carterasLS;

    if(localStorage.getItem('carteras') === null) {
        carterasLS = [];
    }else {
        carterasLS = JSON.parse(localStorage.getItem('carteras'));
    }
    return carterasLS;
}

function leerLocalStorage() {
    let carterasLS;

    carterasLS = obtenerCarterasLocalStorage();

    carterasLS.forEach(function(cartera){
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${cartera.imagen}" width=100>
            </td>
            <td>${cartera.titulo}</td>
            <td>${cartera.precio}</td>
            <td>
                <a href="#" class="borrar-platillo" data-id="${cartera.id}">X</a>
            </td>
        `;
        listaCarteras.appendChild(row);
    });
}

function eliminarCarteraLocalStorage(cartera) {
    let carterasLS;
    carterasLS = obtenerCarterasLocalStorage();

    carterasLS.forEach(function(carteraLS, index){
        if(carteraLS.id === cartera) {
            carterasLS.splice(index, 1);
        }
    });

    localStorage.setItem('carteras', JSON.stringify(carterasLS));
}

function vaciarLocalStorage() {
    localStorage.clear();
}




