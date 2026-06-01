document.getElementById('formulario-registro').addEventListener('submit', function(e) {
    // 1. Detener el envío automático
    e.preventDefault();

    // 2. Obtener elementos y valores
    const nombreInput = document.getElementById('nombre');
    const nombre = nombreInput.value.trim();
    const cedula = document.getElementById('cedula').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const metodoPago = document.getElementById('pago').value;

    // Regla: Solo letras, tildes, ñ y espacios
    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;

    // 3. Limpiar mensajes de error previos
    document.querySelectorAll('.mensaje-error').forEach(el => el.textContent = '');

    let esValido = true;

    // 4. Validar Nombre
    if (nombre.length < 3 || !soloLetras.test(nombre)) {
        document.getElementById('errorNombre').textContent = "Nombre inválido (mínimo 3 letras, no se aceptan números).";
        esValido = false;
    }

    // 5. Validar Cédula (10 dígitos)
    if (!/^\d{10}$/.test(cedula)) {
        document.getElementById('errorCedula').textContent = "La cédula debe tener 10 dígitos numéricos.";
        esValido = false;
    }

    // 6. Validar Correo
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
        document.getElementById('errorCorreo').textContent = "Correo electrónico no válido.";
        esValido = false;
    }

    // 7. Validar Pago
    if (metodoPago === "") {
        // Nota: Agrega un <span id="errorPago" class="mensaje-error"></span> en tu HTML igual que los otros
        alert("Por favor, selecciona un método de pago."); 
        esValido = false;
    }

    // 8. BLOQUEO FINAL: Si esValido es false, detenemos la ejecución aquí
    if (!esValido) {
        return; // La función se detiene y NO ejecuta el guardado ni la redirección
    }

    // 9. Guardar y Redirigir (Solo si todo es válido)
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("cedula", cedula);
    localStorage.setItem("correo", correo);
    localStorage.setItem("metodoPago", metodoPago);
    
    window.location.href = "../6. Confirmación de compra/index.html";
});