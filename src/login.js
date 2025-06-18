const usuarioInput = document.getElementById('usuarioInput');
const passwordInput = document.getElementById('passwordInput');
const saveButton = document.getElementById('saveButton');
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

function guardarUsuario(){
    const usuario = usuarioInput.value.trim();
    const contraseña = passwordInput.value.trim();


    if(usuario === '' || contraseña === ''){
        showMessage('Porfavor diligencia todos los campos', true);
        return;
    }

    const nuevoUsuario = { usuario, contraseña };

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

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

document.addEventListener('DomContentLoaded', mostrarUsuarios);
saveButton.addEventListener('click', guardarUsuario);