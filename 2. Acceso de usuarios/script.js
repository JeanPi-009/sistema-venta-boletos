const form = document.getElementById('form-login');
const mensaje = document.getElementById('mensaje');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const correo = document.getElementById('correo').value;
    const password = document.getElementById('password').value;

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuarioValido = usuarios.find(user => 
        user.correo === correo && user.password === password
    );

    if(usuarioValido){
        mensaje.style.color = "lightgreen";
        mensaje.textContent = "Acceso correcto ✔";

        localStorage.setItem('usuarioActivo', JSON.stringify(usuarioValido));

        setTimeout(() => {
            window.location.href = "../5. Proceso principal del sistema/index.html";
        }, 1500);

    } else {
        mensaje.style.color = "red";
        mensaje.textContent = "Correo o contraseña incorrectos ❌";
    }
});