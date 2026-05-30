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
const contadorCarrito= document.getElementById('contador-carrito');

cargarEventListeners();
function cargarEventListeners() {
    elementos1.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);
    vaciarcarritoBtn.addEventListener('click', vaciarCarrito);
}
function actualizarContador() {
    const filas = lista.querySelectorAll('tr').length;
    contadorCarrito.textContent = filas;
}

function comprarElemento(e) {
    e.preventDefault();

    const btn = e.target.closest('.agregar-carrito');

    if (btn) {
        const elemento = btn.parentElement.parentElement;
        leerDatosElemento(elemento);

        btn.classList.add('agregado');
        btn.textContent = "Agregado ✔";

        setTimeout(() => {
            btn.classList.remove('agregado');
            btn.textContent = "Agregar al carrito";
        }, 1500);
    }
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
    actualizarContador();
}

function eliminarElemento(e) {

    e.preventDefault();
    let elemento,
        elementoId;

    if(e.target.classList.contains('borrar')) {
        e.target.parentElement.parentElement.remove();
        elemento = e.target.parentElement.parentElement;
        elementoId = elemento.querySelector('a').getAttribute('data-id');
        actualizarContador();
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
    actualizarContador();

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
