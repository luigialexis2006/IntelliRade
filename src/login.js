const correoInput = document.getElementById('correoInput');
const passwordInput = document.getElementById('passwordInput');
const loginButton = document.getElementById('loginButton');
const nombreGuardado = document.getElementById('nombreGuardado');
const mensajeTemporal = document.getElementById('mensaje');
const togglePassword = document.getElementById("togglePassword");

function showMessage(msg, isError = false) {
    mensajeTemporal.textContent = msg;
    mensajeTemporal.style.color = isError ? 'red' : 'green';
    mensajeTemporal.style.display = 'block';
    setTimeout(() => {
        mensajeTemporal.style.display = 'none';
    }, 3000);
}

function verificarUsuario() {
    const entrada = correoInput.value.trim();  // puede ser correo o nombre
    const contraseña = passwordInput.value.trim();

    if (entrada === '' || contraseña === '') {
        showMessage('Por favor diligencia todos los campos', true);
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Buscar por correo (usuario) o por nombre
    const usuarioEncontrado = usuarios.find(u =>
        (u.usuario === entrada || u.nombre === entrada) && u.contraseña === contraseña
    );

    if (usuarioEncontrado) {
        showMessage('✅ Bienvenido', false);
        nombreGuardado.textContent = `Bienvenido ${usuarioEncontrado.nombre}`;

        setTimeout(() => {
            window.location.href = "../vistas/menu.html"; // cámbialo por la página deseada
        }, 2000);

    } else {
        showMessage('⚠️ Usuario o contraseña incorrectos', true);
    }
}

loginButton.addEventListener('click', verificarUsuario);

// Mostrar u ocultar la contraseña
togglePassword.addEventListener("click", () => {
    const isPasswordVisible = passwordInput.type === "text";
    passwordInput.type = isPasswordVisible ? "password" : "text";
    togglePassword.textContent = isPasswordVisible ? "👁️" : "🙈";
});
