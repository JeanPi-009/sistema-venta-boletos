// Cargar datos guardados
document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("nombreResumen").textContent =
        localStorage.getItem("nombre") || "-";

    document.getElementById("cedulaResumen").textContent =
        localStorage.getItem("cedula") || "-";

    document.getElementById("correoResumen").textContent =
        localStorage.getItem("correo") || "-";

    document.getElementById("pagoResumen").textContent =
        localStorage.getItem("metodoPago") || "-";
});

const modalExito = document.getElementById("modalExito");
const btnConfirmar = document.getElementById("confirmar");
const btnCerrar = document.getElementById("cerrarModal");
const btnCancelar = document.getElementById("cancelar");

btnConfirmar.addEventListener("click", () => {

    modalExito.style.display = "flex";

});

btnCerrar.addEventListener("click", () => {

    modalExito.style.display = "none";

    window.location.href =
    "../5. Proceso principal del sistema/index.html";

});

btnCancelar.addEventListener("click", () => {

    window.history.back();

});

