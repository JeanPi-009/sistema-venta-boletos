document.addEventListener("DOMContentLoaded", () => {
    // 1. Recuperar los datos
    const nombre = localStorage.getItem("nombre");
    const cedula = localStorage.getItem("cedula");
    const correo = localStorage.getItem("correo");
    const metodoPago = localStorage.getItem("metodoPago");

    // 2. Validación: Si no hay datos, redirigir al inicio o mostrar error
    if (!nombre || !cedula || !correo || !metodoPago) {
        alert("No se encontró información de compra. Serás redirigido.");
        window.location.href = "../5. Proceso principal del sistema/index.html";
        return;
    }

    // 3. Mostrar los datos si son válidos
    document.getElementById("nombreResumen").textContent = nombre;
    document.getElementById("cedulaResumen").textContent = cedula;
    document.getElementById("correoResumen").textContent = correo;
    document.getElementById("pagoResumen").textContent = metodoPago;
});

const modalExito = document.getElementById("modalExito");
const btnConfirmar = document.getElementById("confirmar");
const btnCerrar = document.getElementById("cerrarModal");
const btnCancelar = document.getElementById("cancelar");

// Al confirmar compra, realizamos limpieza de datos sensibles
btnConfirmar.addEventListener("click", () => {
    modalExito.style.display = "flex";
});

btnCerrar.addEventListener("click", () => {
    modalExito.style.display = "none";

    // 4. LIMPIEZA FINAL: Borramos los datos temporales tras la compra exitosa
    localStorage.removeItem("nombre");
    localStorage.removeItem("cedula");
    localStorage.removeItem("correo");
    localStorage.removeItem("metodoPago");

    window.location.href = "../5. Proceso principal del sistema/index.html";
});

btnCancelar.addEventListener("click", () => {
    window.history.back();
});