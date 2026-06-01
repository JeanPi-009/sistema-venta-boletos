const form = document.getElementById('form-registro');
const mensaje = document.getElementById('mensaje');
const nombreInput = document.getElementById('nombre');
const errorNombre = document.getElementById('errorNombre');

// 1. Bloqueo en tiempo real: Borra números apenas el usuario los escribe
nombreInput.addEventListener('input', function() {
    this.value = this.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúñÑ\s]/g, '');
    errorNombre.textContent = ""; // Limpia el error al escribir
});

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre = nombreInput.value.trim();
    const correo = document.getElementById('correo').value.trim();
    const password = document.getElementById('password').value;

    // 2. Validación de nombre (mínimo 3 letras)
    if (nombre.length < 3) {
        errorNombre.textContent = "El nombre debe tener al menos 3 letras.";
        return; // Detiene el registro aquí
    }

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // 3. Validación de correo duplicado
    const existe = usuarios.some(user => user.correo === correo);
    if(existe){
        mensaje.style.display = "block";
        mensaje.style.background = "#dc3545";
        mensaje.style.color = "white";
        mensaje.textContent = "Este correo ya está registrado ❌";
        return;
    }

    // 4. Registro exitoso
    const nuevoUsuario = { nombre, correo, password };
    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    mensaje.style.display = "block";
    mensaje.style.background = "#28a745";
    mensaje.textContent = "Usuario registrado correctamente ✔";

    setTimeout(() => {
        window.location.href = "../2. Acceso de usuarios/index.html";
    }, 1500);
});