const usuarioInput = document.getElementById('usuarioInput');
const passwordInput = document.getElementById('passwordInput');
const saveButton = document.getElementById('saveButton');
const nombreGuardado = document.getElementById('nombreGuardado');
const mensajeTemporal = document.getElementById('mensaje');
const togglePassword = document.getElementById("togglePassword");


function showMessage(msg, isError = false){
    mensajeTemporal.textContent = msg;
    mensajeTemporal.style.color = isError ? 'red' : 'green';
    mensajeTemporal.style.display = 'block';
    setTimeout(() => {
        mensajeTemporal.style.display = 'none';
    }, 3000);
}



function guardarUsuario(){
    const usuario = usuarioInput.value.trim();
    const contraseña = passwordInput.value.trim();


    if(usuario === '' || contraseña === ''){
        showMessage('Porfavor diligencia todos los campos', true);
        return;
    }

    

    const nuevoUsuario = { usuario, contraseña };

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuarioExistente = usuarios.some(u => u.usuario === usuario);
    if (usuarioExistente) {
        showMessage('⚠️ El usuario ya existe', true);
        return;
    }

    const contraseñaRepetida = usuarios.some(u => u.contraseña === contraseña);
    if (contraseñaRepetida) {
        showMessage('⚠️ Esa contraseña ya está en uso', true);
        return;
    }
    usuarios.push(nuevoUsuario);

    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    showMessage('Usuario registrado CORRECTAMENTE :) ');
    usuarioInput.value = '';
    passwordInput.value = '';


    mostrarUsuarios(); 
    
}

function mostrarUsuarios(){
    listaUsuarios.innerHTML = '';
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    usuarios.forEach((u, index) => {
        const li = document.createElement('li');
        li.textContent = `Usuario ${index + 1}: ${u.usuario} - Contraseña: ${u.contraseña}`;
        listaUsuarios.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', mostrarUsuarios);
saveButton.addEventListener('click', guardarUsuario);


/**Para el ojito */
togglePassword.addEventListener("click", () => {
  const isPasswordVisible = passwordInput.type === "text";
  passwordInput.type = isPasswordVisible ? "password" : "text";
  togglePassword.textContent = isPasswordVisible ? "👁️" : "🙈";
});