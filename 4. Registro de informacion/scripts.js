document.getElementById('formulario-registro').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let nombre = document.getElementById('nombre').value;
    alert('¡Gracias ' + nombre + '! Tu información ha sido registrada con éxito. Procesando tus boletos en el sistema...');
    
    this.submit();
});