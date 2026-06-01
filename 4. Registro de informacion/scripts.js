document.getElementById('formulario-registro').addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtener datos del formulario
    let nombre = document.getElementById('nombre').value;
    let cedula = document.getElementById('cedula').value;
    let correo = document.getElementById('correo').value;
    let metodoPago = document.getElementById('pago').value;

    // Guardar información para usarla en la página de confirmación
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("cedula", cedula);
    localStorage.setItem("correo", correo);
    localStorage.setItem("metodoPago", metodoPago);

    // Ir a la página de confirmación
    window.location.href = "../6. Confirmación de compra/index.html";
});