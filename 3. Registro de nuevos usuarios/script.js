const form = document.getElementById('form-registro');
const mensaje = document.getElementById('mensaje');

mensaje.style.display = "none";

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const password = document.getElementById('password').value;

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const existe = usuarios.some(user => user.correo === correo);

    if(existe){
        mensaje.style.display = "block";
        mensaje.style.background = "#dc3545";
        mensaje.style.color = "white";
        mensaje.style.padding = "10px";
        mensaje.style.borderRadius = "8px";
        mensaje.textContent = "Este correo ya está registrado ❌";
        return;
    }

    const nuevoUsuario = {
        nombre,
        correo,
        password
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    mensaje.style.display = "block";
    mensaje.style.background = "#28a745";
    mensaje.style.color = "white";
    mensaje.style.padding = "10px";
    mensaje.style.borderRadius = "8px";
    mensaje.textContent = "Usuario registrado correctamente ✔";

    setTimeout(() => {
        window.location.href = "../2. Acceso de usuarios/index.html";
    }, 1500);
});