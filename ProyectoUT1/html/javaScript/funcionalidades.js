// Mostrar el modal con un mensaje
function mostrarModal(mensaje) {
    var modal = document.getElementById("myModal");
    var modalMessage = document.getElementById("modalMessage");
    var closeModalBtn = document.getElementById("closeModalBtn");

    modalMessage.innerText = mensaje;
    modal.style.display = "flex";  // Mostrar el modal

    // Cerrar el modal cuando se haga clic en el botón de cerrar
    closeModalBtn.onclick = function () {
        modal.style.display = "none";
    };

    // Cerrar el modal cuando se haga clic fuera del modal
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}

// Comprobación de las contraseñas
function comprobarContraseña() {
    var pass1 = document.getElementById("contra1").value;
    var pass2 = document.getElementById("contra2").value;

    if (pass1 !== pass2) {
        mostrarModal("Las contraseñas no coinciden.");
        return false;
    } else if (pass1.length < 8) {
        mostrarModal("La contraseña debe tener al menos 8 caracteres.");
        return false;
    } else {
        mostrarModal("Contraseña válida.");
        return true;
    }
}

// Comprobación del DNI
function comprobarDni() {
    var dni = document.getElementById("dni").value;
    const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';

    if (dni.length !== 9 || !/^\d{8}[A-Z]$/.test(dni)) {
        mostrarModal("Formato de DNI incorrecto");
        return false;
    }

    const numero = parseInt(dni.substring(0, 8), 10);
    const letra = dni.charAt(8);
    const letraCorrecta = letras[numero % 23];

    if (letra !== letraCorrecta) {
        mostrarModal("Letra del DNI incorrecta");
        return false;
    }

    mostrarModal("DNI válido");
    return true;
}

// Comprobación de la edad
function comprobarEdad() {
    const fecha = document.getElementById("fechaNacimiento").value;
    const fechaNacimiento = new Date(fecha);
    const hoy = new Date();

    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
    }

    if (edad >= 18) {
        return true;
    } else {
        mostrarModal("Debes tener al menos 18 años para registrarte.");
        return false;
    }
}

// Agrupar todas las validaciones
function comprobarFunciones() {
    return comprobarContraseña() && comprobarDni() && comprobarEdad();
}

// Enviar el formulario
const btn = document.getElementById('enviar');
const form = document.getElementById('form');

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();  // Evita que el formulario se envíe automáticamente

    if (comprobarFunciones()) {
        btn.value = 'Enviando...';  // Cambia el texto del botón mientras se envía

        const serviceID = 'service_tw1i084';
        const templateID = 'template_ajtql0y';

        emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            btn.value = 'Registrar';  // Cambia el texto del botón después del envío
            form.reset();  // Reinicia el formulario
            mostrarModal('Registro exitoso. Se ha enviado un correo de verificación.');
        }, (err) => {
            btn.value = 'Registrar';
            mostrarModal('Error al enviar el correo: ' + JSON.stringify(err));
        });
    } 
});

