let loadMoreBtn = document.querySelector('#load-more');
let currentItem = 4;

loadMoreBtn.onclick = () => {

    let boxes = [...document.querySelectorAll('.box-container .box')];
    for(var i = currentItem; i< currentItem + 4; i++){
        boxes[i].style.display = 'inline-block';
    }
    currentItem +=4;
    if(currentItem >= boxes.length) {
        loadMoreBtn.style.display = 'none'
    }
}

//Carrito

const carrito = document.getElementById('carrito')
const elementos1 = document.getElementById('lista-1');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarcarritoBtn = document.getElementById('vaciar-carrito');
const comprarBtn = document.getElementById('comprar-carrito');
const modal = document.getElementById('modalConfirmacion');
const modalImagen = document.getElementById('modalImagen');
const modalTitulo = document.getElementById('modalTitulo');
const modalPrecio = document.getElementById('modalPrecio');
const confirmarCompra = document.getElementById('confirmarCompra');
const cancelarCompra = document.getElementById('cancelarCompra');
const modalCompra = document.getElementById("modalCompra");
const modalExito = document.getElementById("modalExito");
const resumenCompra = document.getElementById("resumenCompra");
let elementoSeleccionado = null;

cargarEventListeners();
function cargarEventListeners() {
    elementos1.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);
    vaciarcarritoBtn.addEventListener('click', vaciarCarrito);
}

function comprarElemento(e) {

    e.preventDefault();

    const btn = e.target.closest('.agregar-carrito');

    if (!btn) return;

    elementoSeleccionado = btn.closest('.box');

    modalImagen.src =
        elementoSeleccionado.querySelector('img').src;

    modalTitulo.textContent =
        elementoSeleccionado.querySelector('h3').textContent;

    modalPrecio.textContent =
        elementoSeleccionado.querySelector('.precio').textContent;

    modal.style.display = "flex";
}

function leerDatosElemento(elemento) {
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id: elemento.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoElemento)
}

function insertarCarrito(elemento) {

    const row = document.createElement('tr');
    row.innerHTML = `

        <td>
            <img src="${elemento.imagen}" width=100 />
        </td>

        <td>
            ${elemento.titulo}  
        </td>
             
        <td>
            ${elemento.precio}
        </td>

        <td>
            <a href="#" class="borrar" data-id="${elemento.id}" >X</a>

        </td>
    `;

    lista.appendChild(row);
}

function eliminarElemento(e) {

    e.preventDefault();
    let elemento,
        elementoId;

    if(e.target.classList.contains('borrar')) {
        e.target.parentElement.parentElement.remove();
        elemento = e.target.parentElement.parentElement;
        elementoId = elemento.querySelector('a').getAttribute('data-id');
    }
}

function vaciarCarrito(e) {
    if(e) e.preventDefault();

    if(lista.children.length === 0){
        alert('El carrito ya está vacío');
        return;
    }

    while(lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }

    alert('Carrito vaciado correctamente');
}

comprarBtn.addEventListener('click', realizarCompra);


function realizarCompra(e) {
    e.preventDefault();

    if(lista.children.length === 0){
        alert('El carrito está vacío :(');
        return;
    }

    window.location.href = "../4. Registro de informacion/index.html";
}

confirmarCompra.addEventListener('click', () => {

    if (!elementoSeleccionado) return;

    leerDatosElemento(elementoSeleccionado);

    modal.style.display = "none";

    elementoSeleccionado = null;

});


cancelarCompra.addEventListener('click', () => {

    modal.style.display = "none";

});

window.addEventListener('click', (e) => {

    if (e.target === modal) {
        modal.style.display = "none";
    }

});