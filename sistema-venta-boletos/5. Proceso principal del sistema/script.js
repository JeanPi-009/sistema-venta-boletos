let loadMoreBtn = document.querySelector('#load-more');
let currentItem = 4;

if (loadMoreBtn) {
    loadMoreBtn.onclick = () => {
        let boxes = [...document.querySelectorAll('.box-container .box')];

        for (let i = currentItem; i < currentItem + 4 && i < boxes.length; i++) {
            boxes[i].style.display = 'inline-block';
        }

        currentItem += 4;

        if (currentItem >= boxes.length) {
            loadMoreBtn.style.display = 'none';
        }
    };
}

const carrito = document.getElementById('carrito');
const imgCarrito = document.getElementById('img-carrito'); // Icono del carrito
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
const contadorCarrito = document.getElementById('contador-carrito');
let elementoSeleccionado = null;

// Cargar todos los oyentes de eventos
cargarEventListeners();

function cargarEventListeners() {
    elementos1.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);
    vaciarcarritoBtn.addEventListener('click', vaciarCarrito);
    
    // NUEVO: Abre y cierra el carrito al hacer clic en la imagen del icono
    imgCarrito.addEventListener('click', toggleCarrito);
}

// Función para alternar visible/invisible el carrito sin borrar datos
function toggleCarrito(e) {
    e.preventDefault();
    carrito.classList.toggle('mostrar-carrito');
}

function actualizarContador() {
    const filas = lista.querySelectorAll('tr').length;
    contadorCarrito.textContent = filas;
}

function comprarElemento(e) {
    e.preventDefault();
    const btn = e.target.closest('.agregar-carrito');
    if (!btn) return;

    elementoSeleccionado = btn.closest('.box');

    modalImagen.src = elementoSeleccionado.querySelector('img').src;
    modalTitulo.textContent = elementoSeleccionado.querySelector('h3').textContent;
    modalPrecio.textContent = elementoSeleccionado.querySelector('.precio').textContent;

    modal.style.display = "flex";
}

function leerDatosElemento(elemento) {
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id: elemento.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoElemento);
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
    if(e.target.classList.contains('borrar')) {
        const fila = e.target.parentElement.parentElement;
        fila.remove();
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

    // Cierra la ventana del carrito tras vaciarlo
    carrito.classList.remove('mostrar-carrito');
    alert('Carrito vaciado correctamente');
}

comprarBtn.addEventListener('click', realizarCompra);

function realizarCompra(e) {
    e.preventDefault();

    if(lista.children.length === 0){
        alert('El carrito está vacío :(');
        return;
    }

    // Cierra la ventana del carrito antes de redirigir
    carrito.classList.remove('mostrar-carrito');
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

// Oyente global para cerrar ventanas emergentes
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
    
    // Opcional: Si el usuario hace clic afuera del carrito o del icono, el carrito se cierra solo para no estorbar
    if (!carrito.contains(e.target) && e.target !== imgCarrito && !e.target.classList.contains('agregar-carrito') && !e.target.classList.contains('borrar')) {
        carrito.classList.remove('mostrar-carrito');
    }
});