const correoInput = document.getElementById('correoInput');
const password = document.getElementById('password');
const loginButton = document.getElementById('loginButton');
const nombreGuardado = document.getElementById('nombreGuardado');
const mensajeTemporal = document.getElementById('mensaje');

function showMessage(msg, isError = false){
    mensajeTemporal.textContent = msg;
    mensajeTemporal.style.color = isError ? 'red' : 'green';
    mensajeTemporal.style.display = 'block';
    setTimeout(() => {
        mensajeTemporal.style.display = 'none';
    }, 3000);
}

function verificarUsuario(){
    const usuario = correoInput.value.trim();
    const contraseña = password.value.trim();

    if(usuario === '' || contraseña === ''){
        showMessage('Porfavor diligencia todos los campos', true);
        return;
    }

    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usuario);
    if(!correoValido){
        showMessage('ingresa un correo electronico valido', true);
        return
    }
    
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuarioEncontrado = usuarios.find(u => u.usuario === correo && u.contraseña === contraseña);
    if (usuarioEncontrado) {
        showMessage('Bienvenido', false);
        nombreGuardado.textContent = `Bienvenido ${usuarioEncontrado.nombre}`;
        setTimeout(() => {
        window.location.href = 'paginaPrincipal.html'; 
        }, 1500);

    } else {
        showMessage('⚠️ Usuario o contraseña incorrectos', true);
    }

    mostrarUsuarios();
}

function mostrarUsuarios(){
    listaUsuarios.innerHTML = '';
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    usuarios.forEach((u, index) => {
        const li = document.createElement('li');
        li.textContent = `Usuario ${index + 1}: ${u.usuario} - Contraseña: ${u.contraseña} - Nombre: ${u.nombre}`;
        listaUsuarios.appendChild(li);
    });
}


document.addEventListener('DOMContentLoaded', mostrarUsuarios);
loginButton.addEventListener('click', verificarUsuario);

togglePassword.addEventListener("click", () => {
  const isPasswordVisible = passwordInput.type === "text";
  passwordInput.type = isPasswordVisible ? "password" : "text";
  togglePassword.textContent = isPasswordVisible ? "👁️" : "🙈";
});
